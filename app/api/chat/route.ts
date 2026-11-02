import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { BRAND_CONFIG } from "@/lib/constants";

interface SourceItem {
  title: string;
  url?: string;
  similarity?: number;
}

// Ultra-fast curated responses (Instant sub-10ms response, concise, 0 fluff)
const FAST_TOPICS = [
  {
    triggers: ["service", "services", "what do you do", "offer", "capabilities", "what can you do"],
    answer:
      "We provide Full-Stack Web Development (Next.js, React, Node.js), Mobile Apps (iOS & Android with React Native/Flutter), Startup MVP Development (2–6 weeks), and IT Staff Augmentation with dedicated senior engineers.",
    sources: [
      { title: "Services Overview", url: "/services" },
      { title: "How We Build", url: "/how-we-build" },
    ],
    suggestedQuestions: [
      "How much does an MVP cost?",
      "Tell me about Nayyab Jewellers",
      "Request a project estimate",
    ],
    needsHumanHandoff: false,
  },
  {
    triggers: ["cost", "price", "pricing", "budget", "quote", "rate", "how much"],
    answer:
      "Our project pricing typically starts from $1,000 for focused modules, and $3,000–$15,000+ for complete end-to-end platforms and startup MVPs. We provide customized scope proposals within 24 hours.",
    sources: [
      { title: "MVP Development", url: "/services/mvp-development" },
      { title: "Contact Us", url: "/contact" },
    ],
    suggestedQuestions: [
      "What is your development timeline?",
      "Can we sign an NDA?",
      "Start a project inquiry",
    ],
    needsHumanHandoff: true,
  },
  {
    triggers: ["timeline", "how long", "duration", "turnaround", "delivery time"],
    answer:
      "Our startup MVPs are delivered in 2 to 6 weeks. For ongoing enterprise platforms, we work in 2-week agile sprints with bi-weekly preview deployments and automated CI/CD.",
    sources: [
      { title: "How We Build", url: "/how-we-build" },
      { title: "MVP Development", url: "/services/mvp-development" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "How much does an MVP cost?",
      "Request a custom estimate",
    ],
    needsHumanHandoff: false,
  },
  {
    triggers: ["nayyab", "jeweller", "jewellery", "case study", "portfolio", "projects", "work"],
    answer:
      "We engineered Nayyab Jewellers as a bespoke luxury e-commerce web platform using Next.js and headless architecture, featuring dynamic filter systems and custom checkout flows to maximize sales.",
    sources: [
      { title: "Our Projects", url: "/projects" },
      { title: "Client Reviews", url: "/reviews" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "What tech stack do you use?",
      "Request a consultation",
    ],
    needsHumanHandoff: false,
  },
  {
    triggers: ["tech stack", "stack", "technology", "technologies", "nextjs", "react", "language"],
    answer:
      "Our primary tech stack includes Next.js 15, React 19, TypeScript, Node.js, Tailwind CSS, PostgreSQL, React Native, Flutter, and cloud infrastructure on AWS and Vercel.",
    sources: [
      { title: "How We Build", url: "/how-we-build" },
      { title: "Services", url: "/services" },
    ],
    suggestedQuestions: [
      "Can you build mobile apps?",
      "Do you provide dedicated developers?",
      "Request a project quote",
    ],
    needsHumanHandoff: false,
  },
  {
    triggers: ["mobile", "app", "ios", "android", "flutter", "react native"],
    answer:
      "We build reactive, high-performance cross-platform mobile apps for iOS and Android using React Native and Flutter, with offline capabilities, push notifications, and native hardware integration.",
    sources: [
      { title: "Mobile App Development", url: "/services/mobile-app-development" },
    ],
    suggestedQuestions: [
      "What is your development timeline?",
      "How much does a mobile app cost?",
      "Request an app quote",
    ],
    needsHumanHandoff: false,
  },
  {
    triggers: ["staff", "augmentation", "hire", "developer", "developers", "dedicated", "talent"],
    answer:
      "We provide vetted senior software engineers, DevOps specialists, and UI/UX designers to integrate directly into your engineering team with zero recruiting overhead and complete transparency.",
    sources: [
      { title: "IT Staff Augmentation", url: "/services/it-staff-augmentation" },
    ],
    suggestedQuestions: [
      "What tech stacks do you cover?",
      "How quickly can we start?",
      "Hire dedicated developers",
    ],
    needsHumanHandoff: true,
  },
  {
    triggers: ["contact", "email", "phone", "call", "reach", "talk", "location", "address", "nda"],
    answer:
      `You can reach our leadership directly at ${BRAND_CONFIG.email} or call ${BRAND_CONFIG.phone}. We are also pleased to sign an NDA before reviewing any proprietary specs.`,
    sources: [{ title: "Contact Us", url: "/contact" }],
    suggestedQuestions: [
      "What services do you offer?",
      "Request a project estimate",
    ],
    needsHumanHandoff: true,
  },
];

// Helper to query Gemini with a strict fast timeout (max 3 seconds)
async function fastGeminiGenerate(
  prompt: string,
  question: string,
  apiKey: string
): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: prompt }] },
          contents: [{ role: "user", parts: [{ text: question }] }],
          generationConfig: {
            maxOutputTokens: 140,
            temperature: 0.2,
          },
        }),
      }
    );
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text.trim();
    }
  } catch (err) {
    clearTimeout(timeout);
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "A valid question string is required." },
        { status: 400 }
      );
    }

    const qTrimmed = question.trim();
    const qLower = qTrimmed.toLowerCase();

    // 1. Instant Greeting Response (0ms delay)
    if (
      qLower === "hi" ||
      qLower === "hello" ||
      qLower === "hey" ||
      qLower.startsWith("hi ") ||
      qLower.startsWith("hello ") ||
      qLower.startsWith("hey ") ||
      qLower === "good morning" ||
      qLower === "good evening"
    ) {
      return NextResponse.json({
        answer:
          "Hello! Welcome to Hextel Tech. How can I help you today with our web engineering, mobile apps, or project estimates?",
        sources: [{ title: "Hextel Tech Overview", url: "/" }],
        suggestedQuestions: [
          "What services do you offer?",
          "How much does an MVP cost?",
          "Tell me about Nayyab Jewellers",
        ],
        needsHumanHandoff: false,
      });
    }

    // 2. High-Speed Topic Matcher (Sub-10ms response, ultra-concise, zero extra fluff)
    for (const item of FAST_TOPICS) {
      const matched = item.triggers.some((trig) => qLower.includes(trig));
      if (matched) {
        return NextResponse.json({
          answer: item.answer,
          sources: item.sources,
          suggestedQuestions: item.suggestedQuestions,
          needsHumanHandoff: item.needsHumanHandoff,
        });
      }
    }

    // 3. Neon Postgres Vector Search for Custom Queries (Sub-200ms)
    const dbUrl = process.env.DATABASE_URL;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (dbUrl && geminiKey) {
      try {
        // Fast embedding
        const embedRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "models/gemini-embedding-2",
              content: { parts: [{ text: qTrimmed }] },
            }),
          }
        );

        if (embedRes.ok) {
          const embedData = await embedRes.json();
          const vecStr = `[${embedData.embedding.values.join(",")}]`;

          const sql = neon(dbUrl);
          const rows = (await sql.query(
            `SELECT content, metadata, 1 - (embedding <=> $1::vector) as similarity 
             FROM documents 
             ORDER BY embedding <=> $1::vector 
             LIMIT 2;`,
            [vecStr]
          )) as Array<{
            content: string;
            metadata: { title?: string; url?: string };
            similarity: number;
          }>;

          if (rows && rows.length > 0) {
            const topChunk = rows[0];
            const sources: SourceItem[] = rows.map((r) => ({
              title: r.metadata?.title || "Hextel Tech",
              url: r.metadata?.url || "/services",
              similarity: Number(r.similarity || 0),
            }));

            // Try fast generation with 3s limit
            const systemPrompt = `You are the AI assistant for Hextel Tech. Be concise, direct, and brief (2-3 sentences max). No fluff or extra details.
Context:
${rows.map((r) => r.content).join("\n")}`;

            const fastAnswer = await fastGeminiGenerate(systemPrompt, qTrimmed, geminiKey);

            if (fastAnswer) {
              return NextResponse.json({
                answer: fastAnswer,
                sources,
                suggestedQuestions: [
                  "What services do you offer?",
                  "How much does an MVP cost?",
                  "Request a project quote",
                ],
                needsHumanHandoff: false,
              });
            }

            // If Gemini times out or is slow, return the direct factual answer instantly
            return NextResponse.json({
              answer: topChunk.content,
              sources,
              suggestedQuestions: [
                "What services do you offer?",
                "How much does an MVP cost?",
                "Contact the team",
              ],
              needsHumanHandoff: false,
            });
          }
        }
      } catch (err) {
        console.warn("[Fast Search Info]:", err);
      }
    }

    // 4. Fallback Concise Response
    return NextResponse.json({
      answer:
        "At Hextel Tech, we engineer high-performance web platforms, mobile apps, and startup MVPs. How can our team assist your project today?",
      sources: [{ title: "Services", url: "/services" }],
      suggestedQuestions: [
        "What services do you offer?",
        "How much does an MVP cost?",
        "Request a custom quote",
      ],
      needsHumanHandoff: false,
    });
  } catch (error) {
    console.error("[Chatbot Error]:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
