import assert from "node:assert/strict";
import { test } from "node:test";

import contactAgent from "../lib/index.js";

const {
  DEFAULT_GROQ_CONTACT_MODEL,
  createFallbackInquiryAnalysis,
  getGroqContactModel,
  parseInquiryAnalysis,
  processContactInquiry,
  requestGroqInquiryAnalysis,
  resolveInquiryAnalysis,
  safeGroqDiagnostic,
} = contactAgent;

const sampleInquiry = {
  name: "Avery Client",
  email: "avery@example.com",
  company: "Avery Co",
  projectType: "Website",
  message: "We need a new bookings website with payments and admin tools.",
  status: "new",
};

const sampleAnalysis = {
  leadScore: 8,
  leadScoreReason: "Clear project scope and commercial intent.",
  projectSummary: "The client wants a bookings website with payments and admin workflows.",
  projectType: "Website",
  complexity: "Medium",
  complexityReason: "The project includes payments and admin tooling.",
  timeEstimate: {
    min: "6 weeks",
    max: "10 weeks",
    phases: "Discovery, design, build, payment testing and launch.",
  },
  priceEstimate: {
    minINR: 120000,
    maxINR: 240000,
    reasoning: "Bookings and payments add moderate implementation scope.",
  },
  greenFlags: ["Clear goals"],
  redFlags: [],
  clarifyingQuestions: ["Which payment provider should be used?"],
  clientTone: "Professional",
  recommendedAction: "Respond & Schedule Discovery Call",
  draftReply: "Dear Avery Client, thanks for reaching out.",
};

const createMockGroqClient = (handler) => {
  const requests = [];
  const client = {
    chat: {
      completions: {
        create: async (request) => {
          requests.push(request);
          return handler(request);
        },
      },
    },
  };

  return { client, requests };
};

const createLogger = () => {
  const calls = [];
  return {
    calls,
    log: (...args) => calls.push(["log", ...args]),
    warn: (...args) => calls.push(["warn", ...args]),
    error: (...args) => calls.push(["error", ...args]),
  };
};

test("uses openai/gpt-oss-20b as the default Groq contact model", async () => {
  const { client, requests } = createMockGroqClient(async () => ({
    choices: [{ message: { content: JSON.stringify(sampleAnalysis) } }],
  }));

  const analysis = await requestGroqInquiryAnalysis({
    data: sampleInquiry,
    groqClient: client,
  });

  assert.equal(DEFAULT_GROQ_CONTACT_MODEL, "openai/gpt-oss-20b");
  assert.equal(getGroqContactModel({ GROQ_MODEL: "" }), "openai/gpt-oss-20b");
  assert.equal(requests[0].model, "openai/gpt-oss-20b");
  assert.equal(requests[0].response_format.type, "json_object");
  assert.equal(analysis.leadScore, 8);
  assert.equal(analysis.projectType, "Website");
});

test("parses a successful Groq JSON response", () => {
  const analysis = parseInquiryAnalysis(JSON.stringify(sampleAnalysis));

  assert.equal(analysis.recommendedAction, "Respond & Schedule Discovery Call");
  assert.equal(analysis.priceEstimate.minINR, 120000);
});

test("falls back when Groq returns malformed output", async () => {
  const logger = createLogger();
  const { client } = createMockGroqClient(async () => ({
    choices: [{ message: { content: "not json" } }],
  }));

  const result = await resolveInquiryAnalysis({
    data: sampleInquiry,
    groqClient: client,
    logger,
  });

  assert.equal(result.source, "fallback");
  assert.equal(result.analysis.leadScoreReason, "AI enrichment was unavailable, so this inquiry needs manual review.");
  assert.equal(logger.calls.some(([level]) => level === "warn"), true);
});

test("logs only safe Groq diagnostics without leaking secret-like values", async () => {
  const logger = createLogger();
  const { client } = createMockGroqClient(async () => {
    const error = new Error("sk-test-secret should never appear in logs");
    error.status = 400;
    error.code = "model_error";
    throw error;
  });

  const result = await resolveInquiryAnalysis({
    data: sampleInquiry,
    groqClient: client,
    logger,
  });

  assert.equal(result.source, "fallback");
  assert.deepEqual(safeGroqDiagnostic({ status: 404, code: "not_found", error: { type: "invalid_request_error" } }), {
    status: 404,
    code: "not_found",
    type: "invalid_request_error",
  });
  assert.equal(JSON.stringify(logger.calls).includes("sk-test-secret"), false);
});

test("preserves the saved enquiry and sends one fallback report when optional AI fails", async () => {
  const logger = createLogger();
  const updates = [];
  const sentReports = [];
  const { client } = createMockGroqClient(async () => {
    const error = new Error("retired model");
    error.status = 400;
    throw error;
  });

  const result = await processContactInquiry({
    data: sampleInquiry,
    docId: "contact-123",
    ref: {
      update: async (update) => {
        updates.push(update);
      },
    },
    emailConfig: {
      gmailUser: "agent@example.com",
      gmailPass: "app-password",
      ownerEmail: "owner@example.com",
    },
    groqClient: client,
    logger,
    sendReport: async (report) => {
      sentReports.push(report);
    },
  });

  assert.equal(result.status, "analyzed");
  assert.equal(result.analysisSource, "fallback");
  assert.equal(result.emailSent, true);
  assert.equal(sentReports.length, 1);
  assert.equal(updates.length, 2);
  assert.equal(updates[0].status, "processing");
  assert.equal(updates[1].status, "analyzed");
  assert.equal(updates[1].aiAnalysisSource, "fallback");
  assert.equal(updates[1].aiAnalysisFallbackReason, "Groq enrichment unavailable; non-AI fallback used.");
});

test("fallback analysis keeps the enquiry reviewable", () => {
  const analysis = createFallbackInquiryAnalysis({
    ...sampleInquiry,
    projectType: "web/ios/android App",
  });

  assert.equal(analysis.projectType, "Mobile App");
  assert.equal(analysis.recommendedAction, "Respond & Schedule Discovery Call");
  assert.match(analysis.draftReply, /Dear Avery Client/);
});
