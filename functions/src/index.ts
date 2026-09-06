import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import Groq from "groq-sdk";
import * as nodemailer from "nodemailer";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const DEFAULT_GROQ_CONTACT_MODEL = "openai/gpt-oss-20b";

const DEFAULT_OWNER_EMAIL = "one8one.studios@gmail.com";
const CONTACT_NOTIFICATION_FAILURE_MESSAGE = "Contact notification failed. The inquiry is saved for manual review.";
const MISSING_EMAIL_CONFIG_MESSAGE = "Contact email configuration is incomplete. The inquiry is saved for manual review.";

export type InquiryAnalysis = {
  leadScore: number;
  leadScoreReason: string;
  projectSummary: string;
  projectType: string;
  complexity: string;
  complexityReason: string;
  timeEstimate?: {
    min?: string;
    max?: string;
    phases?: string;
  };
  priceEstimate?: {
    minINR?: number;
    maxINR?: number;
    reasoning?: string;
  };
  greenFlags?: string[];
  redFlags?: string[];
  clarifyingQuestions?: string[];
  clientTone: string;
  recommendedAction: string;
  draftReply: string;
};

export type InquiryAnalysisSource = "groq" | "fallback";

type GroqChatCompletionRequest = {
  model: string;
  temperature: number;
  max_tokens: number;
  response_format: { type: "json_object" };
  messages: Array<{
    role: "system" | "user";
    content: string;
  }>;
};

type GroqChatCompletionResponse = {
  choices: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

export type GroqChatClient = {
  chat: {
    completions: {
      create: (request: GroqChatCompletionRequest) => Promise<GroqChatCompletionResponse>;
    };
  };
};

type ContactDocRef = {
  update: (data: FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>) => Promise<unknown>;
};

type ContactEmailConfig = {
  gmailUser?: string;
  gmailPass?: string;
  ownerEmail: string;
};

type RequiredContactEmailConfig = {
  gmailUser: string;
  gmailPass: string;
  ownerEmail: string;
};

type EmailReportParams = RequiredContactEmailConfig & {
  data: FirebaseFirestore.DocumentData;
  analysis: InquiryAnalysis;
  analysisSource: InquiryAnalysisSource;
  groqModel: string;
};

type Logger = Pick<Console, "error" | "log" | "warn">;

export type ProcessContactInquiryResult =
  | { status: "analyzed"; analysisSource: InquiryAnalysisSource; emailSent: true }
  | { status: "invalid"; emailSent: false }
  | { status: "missing-email-config"; emailSent: false }
  | { status: "notification-failed"; analysisSource: InquiryAnalysisSource; emailSent: false }
  | { status: "status-update-failed"; emailSent: boolean };

type ProcessContactInquiryOptions = {
  data: FirebaseFirestore.DocumentData;
  docId: string;
  ref: ContactDocRef;
  emailConfig: ContactEmailConfig;
  groqClient?: GroqChatClient;
  groqModel?: string;
  logger?: Logger;
  sendReport?: (params: EmailReportParams) => Promise<void>;
};

export const analyzeClientInquiry = onDocumentCreated(
  "contactMessages/{docId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const docId = event.params.docId;

    if (data.status !== "new") {
      console.log("Skipping contact inquiry because status is not new.", {
        docId,
        status: String(data.status ?? "missing"),
      });
      return;
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    await processContactInquiry({
      data,
      docId,
      ref: snap.ref,
      emailConfig: {
        gmailUser: process.env.GMAIL_USER,
        gmailPass: process.env.GMAIL_APP_PASSWORD,
        ownerEmail: process.env.OWNER_EMAIL ?? DEFAULT_OWNER_EMAIL,
      },
      groqClient: groqApiKey ? new Groq({ apiKey: groqApiKey }) : undefined,
      groqModel: getGroqContactModel(),
    });
  }
);

export function getGroqContactModel(env: NodeJS.ProcessEnv = process.env): string {
  return env.GROQ_MODEL?.trim() || DEFAULT_GROQ_CONTACT_MODEL;
}

export async function processContactInquiry({
  data,
  docId,
  ref,
  emailConfig,
  groqClient,
  groqModel = getGroqContactModel(),
  logger = console,
  sendReport = sendEmailReport,
}: ProcessContactInquiryOptions): Promise<ProcessContactInquiryResult> {
  if (!isValidContactInquiryData(data)) {
    logger.warn("Invalid contact inquiry payload.", { docId });
    await ref.update({
      status: "invalid",
      errorMessage: "Invalid contact inquiry payload.",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { status: "invalid", emailSent: false };
  }

  if (!emailConfig.gmailUser || !emailConfig.gmailPass) {
    logger.error("Missing contact email environment configuration.", { docId });
    await ref.update({
      status: "notification_config_missing",
      errorMessage: MISSING_EMAIL_CONFIG_MESSAGE,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { status: "missing-email-config", emailSent: false };
  }

  logger.log("New contact inquiry received.", { docId });

  try {
    await ref.update({
      status: "processing",
      processingStartedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    logger.error("Unable to mark contact inquiry as processing.", {
      docId,
      error: safeGroqDiagnostic(err),
    });
    return { status: "status-update-failed", emailSent: false };
  }

  const { analysis, source: analysisSource } = await resolveInquiryAnalysis({
    data,
    groqClient,
    model: groqModel,
    logger,
  });

  try {
    await sendReport({
      data,
      analysis,
      analysisSource,
      groqModel,
      gmailUser: emailConfig.gmailUser,
      gmailPass: emailConfig.gmailPass,
      ownerEmail: emailConfig.ownerEmail,
    });
  } catch (err) {
    logger.error("Contact notification email failed.", {
      docId,
      error: safeGroqDiagnostic(err),
    });
    await ref.update({
      status: "notification_failed",
      errorMessage: CONTACT_NOTIFICATION_FAILURE_MESSAGE,
      aiAnalysis: analysis,
      aiAnalysisSource: analysisSource,
      groqModel,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { status: "notification-failed", analysisSource, emailSent: false };
  }

  try {
    await ref.update({
      status: "analyzed",
      aiAnalysis: analysis,
      aiAnalysisSource: analysisSource,
      groqModel,
      leadScore: analysis.leadScore,
      estimatedPriceMin: analysis.priceEstimate?.minINR,
      estimatedPriceMax: analysis.priceEstimate?.maxINR,
      recommendedAction: analysis.recommendedAction,
      analyzedAt: admin.firestore.FieldValue.serverTimestamp(),
      ...(analysisSource === "fallback"
        ? { aiAnalysisFallbackReason: "Groq enrichment unavailable; non-AI fallback used." }
        : {}),
    });
  } catch (err) {
    logger.error("Contact report sent, but status update failed.", {
      docId,
      error: safeGroqDiagnostic(err),
    });
    return { status: "status-update-failed", emailSent: true };
  }

  logger.log("Contact report sent.", { docId, analysisSource });
  return { status: "analyzed", analysisSource, emailSent: true };
}

export async function resolveInquiryAnalysis({
  data,
  groqClient,
  model = getGroqContactModel(),
  logger = console,
}: {
  data: FirebaseFirestore.DocumentData;
  groqClient?: GroqChatClient;
  model?: string;
  logger?: Logger;
}): Promise<{ analysis: InquiryAnalysis; source: InquiryAnalysisSource }> {
  if (!groqClient) {
    logger.warn("Groq enrichment unavailable; using non-AI fallback.");
    return { analysis: createFallbackInquiryAnalysis(data), source: "fallback" };
  }

  try {
    const analysis = await requestGroqInquiryAnalysis({ data, groqClient, model });
    logger.log("Groq enrichment completed.", { leadScore: analysis.leadScore });
    return { analysis, source: "groq" };
  } catch (err) {
    logger.warn("Groq enrichment failed; using non-AI fallback.", {
      error: safeGroqDiagnostic(err),
    });
    return { analysis: createFallbackInquiryAnalysis(data), source: "fallback" };
  }
}

export async function requestGroqInquiryAnalysis({
  data,
  groqClient,
  model = getGroqContactModel(),
}: {
  data: FirebaseFirestore.DocumentData;
  groqClient: GroqChatClient;
  model?: string;
}): Promise<InquiryAnalysis> {
  const completion = await groqClient.chat.completions.create({
    model,
    temperature: 0.3,
    max_tokens: 2000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You are a senior business development consultant at One8One Studios, a software company in Hyderabad, India. You analyze client inquiries and return structured JSON qualification reports. Always respond with valid JSON only — no extra text, no markdown.",
      },
      {
        role: "user",
        content: buildPrompt(data),
      },
    ],
  });

  return parseInquiryAnalysis(completion.choices[0]?.message?.content);
}

export function parseInquiryAnalysis(rawText: string | null | undefined): InquiryAnalysis {
  if (!rawText?.trim()) {
    throw new Error("Groq returned empty analysis content.");
  }

  const parsed = JSON.parse(rawText) as InquiryAnalysis;

  if (!Number.isFinite(parsed.leadScore) || !parsed.recommendedAction || !parsed.draftReply) {
    throw new Error("Groq returned malformed analysis content.");
  }

  return parsed;
}

export function createFallbackInquiryAnalysis(data: FirebaseFirestore.DocumentData): InquiryAnalysis {
  const projectType = normalizeProjectType(data.projectType);
  const clientName = safeText(data.name) || "there";

  return {
    leadScore: 5,
    leadScoreReason: "AI enrichment was unavailable, so this inquiry needs manual review.",
    projectSummary: "A new One8One Studios contact inquiry was saved successfully and should be reviewed manually.",
    projectType,
    complexity: "Medium",
    complexityReason: "Complexity could not be assessed automatically; confirm scope, integrations and timeline with the client.",
    timeEstimate: {
      min: "Manual review",
      max: "Manual review",
      phases: "Review the saved inquiry, confirm requirements, estimate scope and then prepare a discovery call or written proposal.",
    },
    priceEstimate: {
      reasoning: "No automated price estimate was generated because AI enrichment was unavailable.",
    },
    greenFlags: ["Inquiry saved successfully for manual review"],
    redFlags: ["AI enrichment unavailable during backend processing"],
    clarifyingQuestions: [
      "What business outcome should this project achieve first?",
      "Which platforms, integrations or admin tools are required for launch?",
      "What timeline and budget range should One8One plan around?",
    ],
    clientTone: "Unclear",
    recommendedAction: "Respond & Schedule Discovery Call",
    draftReply: `Dear ${clientName},

Thanks for reaching out to One8One Studios. We received your enquiry and would like to understand the goals, must-have features, timeline and launch priorities before suggesting the best path forward.

Could you share any reference links, current workflows, required platforms and an approximate budget range? Once we have those details, we can recommend a practical scope and next steps.

Best,
One8One Studios`,
  };
}

export function isValidContactInquiryData(data: FirebaseFirestore.DocumentData): boolean {
  return (
    isNonEmptyString(data.name) &&
    isNonEmptyString(data.email) &&
    isNonEmptyString(data.projectType) &&
    isNonEmptyString(data.message) &&
    isValidEmail(data.email)
  );
}

export function safeGroqDiagnostic(error: unknown): Record<string, string | number | boolean> {
  const details: Record<string, string | number | boolean> = {};
  const record = typeof error === "object" && error !== null ? error as Record<string, unknown> : {};

  if (error instanceof Error) {
    details.name = error.name;
  }

  if (typeof record.status === "number" || typeof record.status === "string") {
    details.status = record.status;
  }

  if (typeof record.code === "string") {
    details.code = record.code;
  }

  const nestedError = typeof record.error === "object" && record.error !== null ? record.error as Record<string, unknown> : undefined;

  if (typeof nestedError?.type === "string") {
    details.type = nestedError.type;
  }

  return Object.keys(details).length > 0 ? details : { name: "UnknownError" };
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const email = value.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  const [localPart, domain] = email.split("@");

  return Boolean(
    localPart &&
    domain &&
    localPart.length <= 64 &&
    domain.length <= 253 &&
    !domain.includes(".."),
  );
}

function normalizeProjectType(value: unknown): string {
  const text = safeText(value);
  const lowered = text.toLowerCase();

  if (lowered.includes("website") || lowered.includes("portfolio") || lowered.includes("landing")) {
    return "Website";
  }

  if (lowered.includes("app") || lowered.includes("android") || lowered.includes("ios")) {
    return "Mobile App";
  }

  if (lowered.includes("saas")) {
    return "SaaS Product";
  }

  if (lowered.includes("commerce") || lowered.includes("store")) {
    return "E-commerce";
  }

  if (lowered.includes("software") || lowered.includes("automation") || lowered.includes("dashboard")) {
    return "Custom Software";
  }

  return "Unclear";
}

function safeText(value: unknown): string {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

function safeHtml(value: unknown): string {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatINR(value: unknown): string {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? "₹" + value.toLocaleString("en-IN")
    : "Manual review";
}

function formatPriceRange(priceEstimate: InquiryAnalysis["priceEstimate"]): string {
  const min = priceEstimate?.minINR;
  const max = priceEstimate?.maxINR;

  return typeof min === "number" && Number.isFinite(min) && typeof max === "number" && Number.isFinite(max)
    ? `${formatINR(min)}–${formatINR(max)}`
    : "Manual review";
}

// ── Prompt Builder ────────────────────────────────────────────────

function buildPrompt(data: FirebaseFirestore.DocumentData): string {
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short",
  });

  return `Analyze this client inquiry for One8One Studios and return a JSON qualification report.

=== CLIENT INQUIRY ===
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Project Type (self-reported): ${data.projectType}
Message: ${data.message}
Submitted: ${submittedAt}

Return ONLY this exact JSON structure:

{
  "leadScore": <integer 1-10, 10 = ideal high-value lead>,
  "leadScoreReason": "<one sentence explaining the score>",
  "projectSummary": "<2-3 sentences: what does this client want to build, in plain English>",
  "projectType": "<one of: Website / Mobile App / SaaS Product / E-commerce / Custom Software / Unclear>",
  "complexity": "<one of: Low / Medium / High / Very High>",
  "complexityReason": "<1-2 sentences>",
  "timeEstimate": {
    "min": "<e.g. 3 weeks>",
    "max": "<e.g. 8 weeks>",
    "phases": "<brief paragraph describing key development phases>"
  },
  "priceEstimate": {
    "minINR": <integer no commas>,
    "maxINR": <integer no commas>,
    "reasoning": "<1-2 sentences explaining the price range>"
  },
  "greenFlags": ["<positive signal>", "<positive signal>"],
  "redFlags": ["<concern>"],
  "clarifyingQuestions": ["<question 1>", "<question 2>", "<question 3>"],
  "clientTone": "<one of: Professional / Casual / Urgent / Technical / Vague / Enthusiastic / Enterprise>",
  "recommendedAction": "<one of: High Priority — Call Today / Respond & Schedule Discovery Call / Send Questionnaire First / Low Priority — Template Response>",
  "draftReply": "<Full email reply body. Start with Dear ${data.name}, — warm, professional, specific to their project, mention relevant One8One experience, clear next steps, 150-250 words>"
}

PRICING REFERENCE (India market, 2025):
- Simple landing/portfolio site: ₹20k–50k (2-3 weeks)
- Business website with CMS: ₹60k–1.5L (4-8 weeks)
- E-commerce website: ₹80k–2.5L (6-12 weeks)
- Mobile app, single platform: ₹1.5L–4L (8-16 weeks)
- Mobile app, iOS + Android: ₹2.5L–7L (12-20 weeks)
- SaaS MVP: ₹3L–10L (12-24 weeks)
- Custom enterprise software: ₹5L+ (20+ weeks)
- Vague/unclear inquiry: always use a wider range`;
}

// ── Email Report ──────────────────────────────────────────────────

async function sendEmailReport({
  data,
  analysis,
  analysisSource,
  groqModel,
  gmailUser,
  gmailPass,
  ownerEmail,
}: EmailReportParams) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const scoreColor = analysis.leadScore >= 7 ? "#22c55e" : analysis.leadScore >= 4 ? "#f59e0b" : "#ef4444";
  const cxColor: Record<string, string> = { Low: "#22c55e", Medium: "#f59e0b", High: "#f97316", "Very High": "#ef4444" };
  const reportTitle = analysisSource === "groq" ? "AI Qualification Report" : "Fallback Qualification Report";
  const replyTitle = analysisSource === "groq" ? "AI-Drafted Reply — Ready to Send" : "Fallback Reply — Ready to Review";
  const footerLine = analysisSource === "groq"
    ? `Powered by Groq (${safeHtml(groqModel)}) + Firebase Cloud Functions`
    : "Non-AI fallback used after Groq enrichment was unavailable + Firebase Cloud Functions";
  const priceRange = formatPriceRange(analysis.priceEstimate);

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0a0f1e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e2e8f0;padding:24px 16px}
    .w{max-width:660px;margin:0 auto}
    .card{background:#111827;border:1px solid #1f2937;border-radius:16px;padding:24px;margin-bottom:14px}
    .lbl{color:#4b5563;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}
    .val{color:#f1f5f9;font-size:14px;font-weight:500;line-height:1.5}
    .badge{display:inline-block;padding:3px 11px;border-radius:20px;font-size:12px;font-weight:700}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:18px}
    .ring{width:70px;height:70px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:3px solid ${scoreColor};color:${scoreColor};flex-shrink:0}
    .h2{color:#f1f5f9;font-size:16px;font-weight:700;margin-bottom:14px}
    .tag{display:inline-block;padding:4px 10px;border-radius:8px;font-size:12px;margin:3px 3px 3px 0}
    .pre{background:#0a0f1e;border:1px solid #1f2937;border-radius:10px;padding:16px;font-size:13px;line-height:1.8;color:#cbd5e1;white-space:pre-wrap;font-family:'Courier New',monospace}
    .hr{border:none;border-top:1px solid #1f2937;margin:18px 0}
    .banner{background:rgba(79,70,229,.15);border:1px solid rgba(79,70,229,.35);border-radius:10px;padding:12px 16px;font-size:14px;color:#a5b4fc;font-weight:600}
    ol{padding-left:18px}ol li{color:#94a3b8;font-size:14px;line-height:2.2}
  </style></head><body><div class="w">

    <div class="card" style="background:linear-gradient(135deg,#0d0b2a,#111827);border-color:#312e81">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
        <div style="flex:1">
          <div style="margin-bottom:14px">
            <span class="badge" style="background:#4f46e5;color:#fff">🤖 ${reportTitle}</span>
          </div>
          <div style="color:#f1f5f9;font-size:24px;font-weight:800;margin-bottom:4px">${safeHtml(data.name)}</div>
          <div style="color:#6b7280;font-size:14px">${safeHtml(data.email)}${data.company ? ` · ${safeHtml(data.company)}` : ""}</div>
        </div>
        <div class="ring">
          <span style="font-size:22px;font-weight:800;line-height:1">${analysis.leadScore}</span>
          <span style="font-size:11px;color:#6b7280">/10</span>
        </div>
      </div>
      <div class="hr"></div>
      <div style="color:#cbd5e1;font-size:15px;line-height:1.7;margin-bottom:14px">${safeHtml(analysis.projectSummary)}</div>
      <div class="banner">⚡ ${safeHtml(analysis.recommendedAction)}</div>
    </div>

    <div class="card">
      <div class="h2">📊 Project Metrics</div>
      <div class="g2">
        <div><div class="lbl">Project Type</div><div class="val">${safeHtml(analysis.projectType)}</div></div>
        <div><div class="lbl">Complexity</div><div class="val"><span class="badge" style="background:${(cxColor[analysis.complexity] ?? "#6b7280")}22;color:${cxColor[analysis.complexity] ?? "#6b7280"}">${safeHtml(analysis.complexity)}</span></div></div>
        <div><div class="lbl">Timeline</div><div class="val">${safeHtml(analysis.timeEstimate?.min)} – ${safeHtml(analysis.timeEstimate?.max)}</div></div>
        <div><div class="lbl">Price Estimate</div><div class="val" style="color:#4ade80;font-weight:700">${priceRange}</div></div>
        <div><div class="lbl">Client Tone</div><div class="val">${safeHtml(analysis.clientTone)}</div></div>
        <div><div class="lbl">Score Reason</div><div class="val" style="color:${scoreColor};font-size:13px">${safeHtml(analysis.leadScoreReason)}</div></div>
      </div>
      <div class="hr"></div>
      <div class="lbl">Complexity Analysis</div><div class="val" style="font-size:13px;color:#94a3b8;margin-top:4px">${safeHtml(analysis.complexityReason)}</div>
      <div class="hr"></div>
      <div class="lbl">Pricing Rationale</div><div class="val" style="font-size:13px;color:#94a3b8;margin-top:4px">${safeHtml(analysis.priceEstimate?.reasoning)}</div>
    </div>

    <div class="card">
      <div class="h2">⏱️ Development Phases</div>
      <div style="color:#94a3b8;font-size:14px;line-height:1.8">${safeHtml(analysis.timeEstimate?.phases)}</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      ${((analysis.greenFlags?.length ?? 0) > 0) ? `<div class="card" style="border-color:rgba(34,197,94,.3)"><div class="h2" style="color:#4ade80">✅ Green Flags</div>${(analysis.greenFlags ?? []).map((f: string) => `<span class="tag" style="background:rgba(34,197,94,.12);color:#4ade80">✓ ${safeHtml(f)}</span>`).join("")}</div>` : ""}
      ${((analysis.redFlags?.length ?? 0) > 0) ? `<div class="card" style="border-color:rgba(239,68,68,.3)"><div class="h2" style="color:#f87171">🚩 Red Flags</div>${(analysis.redFlags ?? []).map((f: string) => `<span class="tag" style="background:rgba(239,68,68,.12);color:#f87171">⚠ ${safeHtml(f)}</span>`).join("")}</div>` : ""}
    </div>

    <div class="card">
      <div class="h2">❓ Ask the Client These</div>
      <ol>${(analysis.clarifyingQuestions ?? []).map((q: string) => `<li>${safeHtml(q)}</li>`).join("")}</ol>
    </div>

    <div class="card">
      <div class="h2">📩 Original Inquiry</div>
      <div class="lbl" style="margin-bottom:6px">Project Type (self-reported)</div>
      <div class="val" style="margin-bottom:16px">${safeHtml(data.projectType)}</div>
      <div class="lbl" style="margin-bottom:8px">Full Message</div>
      <div class="pre">${safeHtml(data.message)}</div>
    </div>

    <div class="card" style="border-color:rgba(34,197,94,.4)">
      <div class="h2">✉️ ${replyTitle}</div>
      <div style="color:#4b5563;font-size:12px;margin-bottom:12px">Review, personalize if needed, then copy-paste to send.</div>
      <div class="pre">${safeHtml(analysis.draftReply)}</div>
    </div>

    <div style="text-align:center;color:#374151;font-size:12px;padding:8px 0">
      🤖 One8One Studios AI Agent · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST<br>
      ${footerLine}
    </div>

  </div></body></html>`;

  await transporter.sendMail({
    from: `"One8One AI Agent 🤖" <${gmailUser}>`,
    to: ownerEmail,
    subject: `🤖 [Score ${analysis.leadScore}/10] ${safeText(data.name)} — ${safeText(analysis.projectType)} | ${priceRange}`,
    html,
  });
}
