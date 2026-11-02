import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { BRAND_CONFIG } from "@/lib/constants";

interface SourceItem {
  title: string;
  url?: string;
  similarity?: number;
}

// Helper with retry for Gemini Embeddings
async function getEmbeddingWithRetry(text: string, apiKey: string, retries = 2): Promise<number[]> {
  for (let attempt = 0; attempt <= retries; attempt++) {
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
        if (data.embedding?.values) {
          return data.embedding.values;
        }
      }
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  throw new Error("Embedding generation failed after retries.");
}

// Helper with retry for Gemini Generation
async function generateAnswerWithRetry(
  systemPrompt: string,
  userMessage: string,
  conversation: Array<{ role: string; content: string }>,
  apiKey: string,
  retries = 2
): Promise<string> {
  const contents = [
    ...conversation.map((turn) => ({
      role: turn.role === "assistant" ? "model" : "user",
      parts: [{ text: turn.content }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  throw new Error("Generation failed after retries.");
}

export async function POST(req: Request) {
  try {
    const { question, conversation = [] } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "A valid question string is required." },
        { status: 400 }
      );
    }

    const qTrimmed = question.trim();
    const qLower = qTrimmed.toLowerCase();

    // Fast reply for friendly greetings
    if (
      qLower === "hi" ||
      qLower === "hello" ||
      qLower === "hey" ||
      qLower === "good morning" ||
      qLower === "good evening" ||
      qLower.startsWith("hi ") ||
      qLower.startsWith("hello ")
    ) {
      return NextResponse.json({
        answer:
          "Hello! Welcome to Hextel Tech. I am your AI digital consultant. How can I assist you today with our web engineering, mobile apps, startup MVP development, or project inquiries?",
        sources: [{ title: "Hextel Tech Overview", url: "/" }],
        suggestedQuestions: [
          "What services do you offer?",
          "Can you build mobile applications?",
          "How much does an MVP cost?",
        ],
        needsHumanHandoff: false,
      });
    }

    const dbUrl = process.env.DATABASE_URL;
    const geminiKey = process.env.GEMINI_API_KEY;

    let matchedChunks: Array<{
      title: string;
      url: string;
      content: string;
      similarity: number;
    }> = [];

    // 1. Vector Search in Neon Postgres
    if (dbUrl && geminiKey) {
      try {
        const queryEmbedding = await getEmbeddingWithRetry(qTrimmed, geminiKey);
        const vectorStr = `[${queryEmbedding.join(",")}]`;

        const sql = neon(dbUrl);
        const rows = (await sql.query(
          `SELECT 
             content, 
             metadata, 
             1 - (embedding <=> $1::vector) as similarity 
           FROM documents 
           ORDER BY embedding <=> $1::vector 
           LIMIT 4;`,
          [vectorStr]
        )) as Array<{
          content: string;
          metadata: { title?: string; url?: string };
          similarity: number;
        }>;

        if (Array.isArray(rows) && rows.length > 0) {
          matchedChunks = rows.map((r) => ({
            title: r.metadata?.title || "Hextel Tech",
            url: r.metadata?.url || "/services",
            content: String(r.content || ""),
            similarity: Number(r.similarity || 0),
          }));
        }
      } catch (dbErr) {
        console.warn("[Neon Search Warning]:", dbErr);
      }
    }

    const sources: SourceItem[] = matchedChunks.slice(0, 3).map((c) => ({
      title: c.title,
      url: c.url,
      similarity: c.similarity,
    }));

    // 2. Synthesize Context for AI Generation
    const contextText = matchedChunks
      .map((c, i) => `[Document ${i + 1} - ${c.title}]\n${c.content}`)
      .join("\n\n---\n\n");

    const systemPrompt = `You are the official, helpful AI Consultant representing Hextel Tech (https://hexteltech.com).
Your role is to accurately answer questions about Hextel Tech's services, engineering methodology, tech stack, case studies (like Nayyab Jewellers), and contact details.

Guidelines:
1. Always speak on behalf of Hextel Tech in the first person ("we", "our team", "Hextel Tech").
2. Answer the user's question clearly, thoroughly, and professionally using the context documents provided below.
3. If the user asks about quotes, estimates, or hiring, explain our process and encourage them to fill out the lead form or contact our leadership at ${BRAND_CONFIG.email}.
4. At the very end of your response, ALWAYS suggest 2 or 3 relevant follow-up questions wrapped strictly inside XML tags:
<suggestions>
  <suggest>Question 1</suggest>
  <suggest>Question 2</suggest>
</suggestions>

Context Documents:
${contextText || "Hextel Tech is a premier digital engineering consultancy crafting web platforms, mobile apps, and startup MVPs."}`;

    // 3. Generate Answer using Gemini
    if (geminiKey) {
      try {
        const rawAnswer = await generateAnswerWithRetry(
          systemPrompt,
          qTrimmed,
          conversation.slice(-4),
          geminiKey
        );

        let cleanAnswer = rawAnswer;
        let suggestedQuestions: string[] = [];

        const suggMatch = rawAnswer.match(/<suggestions>([\s\S]*?)<\/suggestions>/i);
        if (suggMatch) {
          cleanAnswer = rawAnswer.replace(/<suggestions>[\s\S]*?<\/suggestions>/gi, "").trim();
          const matches = suggMatch[1].match(/<suggest>([\s\S]*?)<\/suggest>/gi);
          if (matches) {
            suggestedQuestions = matches.map((m) =>
              m.replace(/<\/?suggest>/gi, "").trim()
            );
          }
        }

        const needsHandoff =
          cleanAnswer.toLowerCase().includes("contact") ||
          cleanAnswer.toLowerCase().includes("quote") ||
          cleanAnswer.toLowerCase().includes("estimate") ||
          cleanAnswer.toLowerCase().includes("reach out");

        return NextResponse.json({
          answer: cleanAnswer,
          sources: sources.length > 0 ? sources : [{ title: "Hextel Tech", url: "/services" }],
          suggestedQuestions:
            suggestedQuestions.length > 0
              ? suggestedQuestions
              : [
                  "What services do you offer?",
                  "Can you build mobile apps?",
                  "Request a project quote",
                ],
          needsHumanHandoff: needsHandoff,
        });
      } catch (genErr) {
        console.warn("[Gemini Generation Warning]:", genErr);
      }
    }

    // 4. Reliable Direct Fallback from Matched Neon Chunks if LLM is offline
    if (matchedChunks.length > 0) {
      const topChunk = matchedChunks[0];
      return NextResponse.json({
        answer: `At Hextel Tech: ${topChunk.content}\n\nWould you like more details, or should we schedule a consultation for your project?`,
        sources,
        suggestedQuestions: [
          "How much does an MVP cost?",
          "Tell me about your tech stack",
          "Contact the team",
        ],
        needsHumanHandoff: false,
      });
    }

    // Default Fallback
    return NextResponse.json({
      answer:
        "At Hextel Tech, we engineer high-performance web applications, mobile platforms, and startup MVPs with modern technologies like Next.js, React, Node.js, and Cloud Infrastructure. How can our engineering team assist you today?",
      sources: [{ title: "Services", url: "/services" }],
      suggestedQuestions: [
        "What services do you offer?",
        "Tell me about your projects",
        "Request a custom quote",
      ],
      needsHumanHandoff: true,
    });
  } catch (error) {
    console.error("[Chatbot Route Error]:", error);
    return NextResponse.json(
      { error: "Internal chatbot server error." },
      { status: 500 }
    );
  }
}
