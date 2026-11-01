import { NextResponse } from "next/server";
import {
  runRagPipeline,
  createGeminiLLMAdapter,
  createOpenAIEmbeddingAdapter,
  createOpenAILLMAdapter,
  createSupabaseVectorStore,
} from "@hasaan_6/rag-chatbot-widget/server";
import { createNeonVectorStore } from "@/lib/neonVectorStore";
import { BRAND_CONFIG } from "@/lib/constants";

// Robust Gemini embedding adapter supporting gemini-embedding-2 (3072 dims)
function createCustomGeminiEmbeddingAdapter(apiKey: string) {
  return async (text: string): Promise<number[]> => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "models/gemini-embedding-2",
            content: { parts: [{ text }] },
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.embedding.values;
      }
    } catch (e) {
      // fallback
    }

    const fallbackRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "models/gemini-embedding-001",
          content: { parts: [{ text }] },
        }),
      }
    );

    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      return data.embedding.values;
    }

    throw new Error("Failed to generate Gemini vector embedding.");
  };
}

// Fallback Knowledge Base documents used if AI rate limits or network issues occur
const HEXTEL_KNOWLEDGE = [
  {
    keywords: ["service", "services", "offer", "what do you do", "capabilities", "stack"],
    answer:
      "At Hextel Tech, we engineer high-performance digital products and scalable systems. Our core service categories include:\n\n• Web Application Development (Next.js, React, Node.js, TypeScript)\n• Mobile App Development (iOS & Android with React Native / Flutter)\n• MVP Development for Startups (rapid 2–6 week production delivery)\n• IT Staff Augmentation & Dedicated Senior Engineers\n• Cloud Infrastructure, DevOps & Containerization (AWS, Docker, CI/CD)\n• AI Integration & Enterprise Custom Software\n\nWould you like a custom quote or more information on a specific service?",
    sources: [
      { title: "Hextel Tech Services", url: "/services" },
      { title: "How We Build", url: "/how-we-build" },
    ],
    suggestedQuestions: [
      "How much does an MVP cost?",
      "Can I hire dedicated developers?",
      "Tell me about your tech stack.",
    ],
  },
  {
    keywords: ["mvp", "startup", "quote", "cost", "price", "pricing", "budget", "timeline", "how long"],
    answer:
      "Our MVP development cycles are structured for rapid market validation, typically delivering a production-ready application within 2 to 6 weeks. Project pricing starts from $1,000 for focused modules to $7,000–$15,000+ for complete end-to-end platforms with custom backend, authentication, billing, and admin dashboards.\n\nWe would love to review your requirements and provide a detailed estimate. Would you like to schedule an inquiry?",
    sources: [
      { title: "MVP Development for Startups", url: "/services/mvp-development" },
      { title: "Start a Project", url: "/contact" },
    ],
    suggestedQuestions: [
      "What is your development process?",
      "Can we sign an NDA?",
      "Request a project estimate",
    ],
  },
  {
    keywords: ["how we build", "process", "methodology", "lifecycle", "agile", "development process"],
    answer:
      "We follow a transparent 4-stage engineering methodology:\n\n1. Discovery & Architecture: We map out your product specifications, system design, and database schema.\n2. Agile Sprints: We deliver iterative milestones with automated CI/CD and preview deployments.\n3. Rigorous Quality & Security: Full unit tests, Lighthouse optimization (95+ score), and enterprise security audits.\n4. Seamless Deployment & Post-Launch Support: Cloud deployment, observability monitoring, and continuous maintenance.",
    sources: [
      { title: "Engineering Methodology", url: "/how-we-build" },
      { title: "Security & Compliance", url: "/security-and-compliance" },
    ],
    suggestedQuestions: [
      "Can I see your past projects?",
      "How do we get started?",
      "What technologies do you use?",
    ],
  },
  {
    keywords: ["project", "projects", "portfolio", "work", "case study", "nayyab", "jeweller"],
    answer:
      "We have delivered 25+ successful products generating over $100K+ in client revenue. One of our signature projects is 'Nayyab Jewellers', a bespoke luxury high-converting e-commerce web platform engineered with Next.js, headless catalog architecture, ultra-fast filter systems, and seamless checkout experience.",
    sources: [
      { title: "Our Projects", url: "/projects" },
      { title: "Client Reviews", url: "/reviews" },
    ],
    suggestedQuestions: [
      "What client reviews do you have?",
      "Can we build a custom app?",
      "Contact the team",
    ],
  },
  {
    keywords: ["review", "reviews", "testimonial", "testimonials", "client feedback", "rating"],
    answer:
      "Our clients rate us 5.0/5 across web engineering and digital transformation projects. We take pride in delivering on time, maintaining clean test-covered codebases, and driving tangible business metrics for brands like Nayyab Jewellers and modern tech startups.",
    sources: [
      { title: "Verified Client Reviews", url: "/reviews" },
    ],
    suggestedQuestions: [
      "How do we contact Hextel Tech?",
      "Do you provide post-launch support?",
    ],
  },
  {
    keywords: ["contact", "email", "phone", "hire", "talk", "reach", "call", "location", "address", "nda"],
    answer:
      `You can reach our leadership team directly:\n\n• Email: ${BRAND_CONFIG.email}\n• Phone: ${BRAND_CONFIG.phone}\n• Location: ${BRAND_CONFIG.address}\n\nYou can also click the button below to submit your project details directly, or book a consultation through our contact page. We are also happy to sign an NDA before reviewing proprietary specs.`,
    sources: [
      { title: "Contact Hextel Tech", url: "/contact" },
    ],
    needsHumanHandoff: true,
    suggestedQuestions: [
      "Request a project estimate",
      "What services do you offer?",
    ],
  },
];

function findFallbackAnswer(question: string) {
  const qLower = question.toLowerCase().trim();

  if (
    qLower === "hi" ||
    qLower === "hello" ||
    qLower === "hey" ||
    qLower.startsWith("good morning") ||
    qLower.startsWith("good evening") ||
    qLower === "help"
  ) {
    return {
      answer:
        "Hello! I'm the Hextel Tech digital assistant. I can guide you through our software services, MVP delivery, past client work, or connect you with our engineering leads. How can I assist your project today?",
      sources: [{ title: "Hextel Tech Overview", url: "/" }],
      suggestedQuestions: [
        "What services do you offer?",
        "How much does an MVP cost?",
        "How do we get started?",
      ],
      needsHumanHandoff: false,
    };
  }

  let bestMatch = null;
  let maxScore = 0;

  for (const item of HEXTEL_KNOWLEDGE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (qLower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return {
      answer: bestMatch.answer,
      sources: bestMatch.sources,
      suggestedQuestions: bestMatch.suggestedQuestions,
      needsHumanHandoff: Boolean(bestMatch.needsHumanHandoff),
    };
  }

  return {
    answer:
      "Thank you for asking! At Hextel Tech, we specialize in high-impact web applications, mobile platforms, MVP rollouts, and custom AI engineering. I would love to connect you directly with one of our tech leads to discuss the exact scope and pricing for your requirements.",
    sources: [
      { title: "Services Overview", url: "/services" },
      { title: "Contact Us", url: "/contact" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "Tell me about your projects",
      "Request a custom quote",
    ],
    needsHumanHandoff: true,
  };
}

export async function POST(req: Request) {
  try {
    const { question, conversation } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "A valid question string is required." },
        { status: 400 }
      );
    }

    const databaseUrl = process.env.DATABASE_URL;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    const hasLLM = Boolean(geminiKey || openAiKey);

    // 1. Neon Postgres Vector DB (Serverless, Auto-Wakeup, Never Pauses)
    if (databaseUrl && hasLLM) {
      try {
        const embeddingAdapter = geminiKey
          ? createCustomGeminiEmbeddingAdapter(geminiKey)
          : createOpenAIEmbeddingAdapter(openAiKey!);

        const llmAdapter = geminiKey
          ? createGeminiLLMAdapter(geminiKey, "gemini-flash-latest")
          : createOpenAILLMAdapter(openAiKey!);

        const vectorStore = createNeonVectorStore(databaseUrl);

        const result = await runRagPipeline(question, conversation || [], {
          embeddingAdapter,
          llmAdapter,
          vectorStore,
          matchThreshold: 0.3, // Accommodate semantic vector distances
        });

        if (result && result.answer && result.answer.trim().length > 0) {
          return NextResponse.json(result);
        }
      } catch (neonErr) {
        console.warn("[Neon RAG Info]: Vector query fallback engaged:", neonErr);
      }
    }

    // 2. Supabase Vector DB (if configured instead)
    if (supabaseUrl && supabaseKey && hasLLM) {
      try {
        const embeddingAdapter = geminiKey
          ? createCustomGeminiEmbeddingAdapter(geminiKey)
          : createOpenAIEmbeddingAdapter(openAiKey!);

        const llmAdapter = geminiKey
          ? createGeminiLLMAdapter(geminiKey, "gemini-flash-latest")
          : createOpenAILLMAdapter(openAiKey!);

        const vectorStore = createSupabaseVectorStore(supabaseUrl, supabaseKey);

        const result = await runRagPipeline(question, conversation || [], {
          embeddingAdapter,
          llmAdapter,
          vectorStore,
        });

        if (result && result.answer && result.answer.trim().length > 0) {
          return NextResponse.json(result);
        }
      } catch (ragError) {
        console.warn("[Supabase RAG Info]:", ragError);
      }
    }

    // 3. Built-in Knowledge Base Responder
    const fallbackResult = findFallbackAnswer(question);
    return NextResponse.json(fallbackResult);
  } catch (error) {
    console.error("[Chatbot API Error]:", error);
    return NextResponse.json(
      { error: "Internal chatbot server error." },
      { status: 500 }
    );
  }
}
