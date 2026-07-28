import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import Groq from "groq-sdk";
import * as nodemailer from "nodemailer";

admin.initializeApp();

type InquiryAnalysis = {
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

export const analyzeClientInquiry = onDocumentCreated(
  "contactMessages/{docId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();

    if (data.status !== "new") {
      console.log(`⏭️  Skipping — status is "${data.status}", not "new"`);
      return;
    }

    const GROQ_API_KEY       = process.env.GROQ_API_KEY;
    const GMAIL_USER         = process.env.GMAIL_USER;
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
    const OWNER_EMAIL        = process.env.OWNER_EMAIL ?? "one8one.studios@gmail.com";

    if (!GROQ_API_KEY || !GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error("❌ Missing env variables. Check your functions/.env file.");
      return;
    }

    console.log(`📬 New inquiry from: ${data.name} <${data.email}>`);

    try {
      await snap.ref.update({
        status: "processing",
        processingStartedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // ── Groq AI call ──────────────────────────────────────────
      const groq = new Groq({ apiKey: GROQ_API_KEY });

      console.log("🤖 Calling Groq AI...");
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",   // Free, fast, very capable
        temperature: 0.3,                    // Lower = more consistent JSON
        max_tokens: 2000,
        response_format: { type: "json_object" }, // Forces clean JSON output
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

      const rawText = completion.choices[0]?.message?.content ?? "{}";
      const analysis = JSON.parse(rawText) as InquiryAnalysis;

      console.log(`✅ AI analysis done. Lead Score: ${analysis.leadScore}/10`);

      await sendEmailReport({ data, analysis, gmailUser: GMAIL_USER, gmailPass: GMAIL_APP_PASSWORD, ownerEmail: OWNER_EMAIL });

      await snap.ref.update({
        status: "analyzed",
        aiAnalysis: analysis,
        leadScore: analysis.leadScore,
        estimatedPriceMin: analysis.priceEstimate?.minINR,
        estimatedPriceMax: analysis.priceEstimate?.maxINR,
        recommendedAction: analysis.recommendedAction,
        analyzedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`🎉 Done! Report sent for inquiry from ${data.name}.`);

    } catch (err) {
      console.error("❌ Agent error:", err);
      await snap.ref.update({ status: "analysis_failed", errorMessage: String(err) });
    }
  }
);

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

async function sendEmailReport({ data, analysis, gmailUser, gmailPass, ownerEmail }: {
  data: FirebaseFirestore.DocumentData;
  analysis: InquiryAnalysis;
  gmailUser: string;
  gmailPass: string;
  ownerEmail: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const scoreColor = analysis.leadScore >= 7 ? "#22c55e" : analysis.leadScore >= 4 ? "#f59e0b" : "#ef4444";
  const cxColor: Record<string, string> = { Low: "#22c55e", Medium: "#f59e0b", High: "#f97316", "Very High": "#ef4444" };
  const fmt = (n: number) => "₹" + Number(n).toLocaleString("en-IN");
  const safe = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
            <span class="badge" style="background:#4f46e5;color:#fff">🤖 AI Qualification Report</span>
          </div>
          <div style="color:#f1f5f9;font-size:24px;font-weight:800;margin-bottom:4px">${safe(data.name)}</div>
          <div style="color:#6b7280;font-size:14px">${safe(data.email)}${data.company ? ` · ${safe(data.company)}` : ""}</div>
        </div>
        <div class="ring">
          <span style="font-size:22px;font-weight:800;line-height:1">${analysis.leadScore}</span>
          <span style="font-size:11px;color:#6b7280">/10</span>
        </div>
      </div>
      <div class="hr"></div>
      <div style="color:#cbd5e1;font-size:15px;line-height:1.7;margin-bottom:14px">${safe(analysis.projectSummary)}</div>
      <div class="banner">⚡ ${safe(analysis.recommendedAction)}</div>
    </div>

    <div class="card">
      <div class="h2">📊 Project Metrics</div>
      <div class="g2">
        <div><div class="lbl">Project Type</div><div class="val">${safe(analysis.projectType)}</div></div>
        <div><div class="lbl">Complexity</div><div class="val"><span class="badge" style="background:${(cxColor[analysis.complexity] ?? "#6b7280")}22;color:${cxColor[analysis.complexity] ?? "#6b7280"}">${safe(analysis.complexity)}</span></div></div>
        <div><div class="lbl">Timeline</div><div class="val">${safe(analysis.timeEstimate?.min)} – ${safe(analysis.timeEstimate?.max)}</div></div>
        <div><div class="lbl">Price Estimate</div><div class="val" style="color:#4ade80;font-weight:700">${fmt(analysis.priceEstimate?.minINR)} – ${fmt(analysis.priceEstimate?.maxINR)}</div></div>
        <div><div class="lbl">Client Tone</div><div class="val">${safe(analysis.clientTone)}</div></div>
        <div><div class="lbl">Score Reason</div><div class="val" style="color:${scoreColor};font-size:13px">${safe(analysis.leadScoreReason)}</div></div>
      </div>
      <div class="hr"></div>
      <div class="lbl">Complexity Analysis</div><div class="val" style="font-size:13px;color:#94a3b8;margin-top:4px">${safe(analysis.complexityReason)}</div>
      <div class="hr"></div>
      <div class="lbl">Pricing Rationale</div><div class="val" style="font-size:13px;color:#94a3b8;margin-top:4px">${safe(analysis.priceEstimate?.reasoning)}</div>
    </div>

    <div class="card">
      <div class="h2">⏱️ Development Phases</div>
      <div style="color:#94a3b8;font-size:14px;line-height:1.8">${safe(analysis.timeEstimate?.phases)}</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      ${(analysis.greenFlags?.length > 0) ? `<div class="card" style="border-color:rgba(34,197,94,.3)"><div class="h2" style="color:#4ade80">✅ Green Flags</div>${(analysis.greenFlags ?? []).map((f: string) => `<span class="tag" style="background:rgba(34,197,94,.12);color:#4ade80">✓ ${safe(f)}</span>`).join("")}</div>` : ""}
      ${(analysis.redFlags?.length > 0) ? `<div class="card" style="border-color:rgba(239,68,68,.3)"><div class="h2" style="color:#f87171">🚩 Red Flags</div>${(analysis.redFlags ?? []).map((f: string) => `<span class="tag" style="background:rgba(239,68,68,.12);color:#f87171">⚠ ${safe(f)}</span>`).join("")}</div>` : ""}
    </div>

    <div class="card">
      <div class="h2">❓ Ask the Client These</div>
      <ol>${(analysis.clarifyingQuestions ?? []).map((q: string) => `<li>${safe(q)}</li>`).join("")}</ol>
    </div>

    <div class="card">
      <div class="h2">📩 Original Inquiry</div>
      <div class="lbl" style="margin-bottom:6px">Project Type (self-reported)</div>
      <div class="val" style="margin-bottom:16px">${safe(data.projectType)}</div>
      <div class="lbl" style="margin-bottom:8px">Full Message</div>
      <div class="pre">${safe(data.message)}</div>
    </div>

    <div class="card" style="border-color:rgba(34,197,94,.4)">
      <div class="h2">✉️ AI-Drafted Reply — Ready to Send</div>
      <div style="color:#4b5563;font-size:12px;margin-bottom:12px">Review, personalize if needed, then copy-paste to send.</div>
      <div class="pre">${safe(analysis.draftReply)}</div>
    </div>

    <div style="text-align:center;color:#374151;font-size:12px;padding:8px 0">
      🤖 One8One Studios AI Agent · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST<br>
      Powered by Groq (Llama 3.3 70B) + Firebase Cloud Functions
    </div>

  </div></body></html>`;

  await transporter.sendMail({
    from: `"One8One AI Agent 🤖" <${gmailUser}>`,
    to: ownerEmail,
    subject: `🤖 [Score ${analysis.leadScore}/10] ${data.name} — ${analysis.projectType} | ${fmt(analysis.priceEstimate?.minINR)}–${fmt(analysis.priceEstimate?.maxINR)}`,
    html,
  });
}
