import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch (e) {}
}

loadEnvLocal();

const databaseUrl = process.env.DATABASE_URL;
const geminiApiKey = process.env.GEMINI_API_KEY;
const openAiApiKey = process.env.OPENAI_API_KEY;

if (!databaseUrl) {
  console.error("❌ Error: DATABASE_URL is missing in your .env.local file.");
  process.exit(1);
}

if (!geminiApiKey && !openAiApiKey) {
  console.error("❌ Error: GEMINI_API_KEY or OPENAI_API_KEY is required in your .env.local file.");
  process.exit(1);
}

async function getEmbedding(text) {
  if (geminiApiKey) {
    // Primary: Gemini Embedding 2 (latest 3072-dimension)
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${geminiApiKey}`,
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

    // Fallback: Gemini Embedding 001
    const fallbackRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${geminiApiKey}`,
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

    const err = await res.text();
    throw new Error(`Gemini embedding error: ${err}`);
  }

  // OpenAI fallback
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input: text }),
  });

  if (!res.ok) throw new Error(`OpenAI embedding failed: ${res.status}`);
  const data = await res.json();
  return data.data[0].embedding;
}

const vectorDimension = geminiApiKey ? 3072 : 1536;

const KNOWLEDGE_CHUNKS = [
  {
    title: "About Hextel Tech",
    url: "/about",
    content:
      "Hextel Tech is a premier digital engineering consultancy that crafts high-performance web platforms, design systems, and digital ecosystems for ambitious brands. With over 25+ delivered products and $100K+ in client revenue generated, our mission is to deliver bulletproof software with modern tech stacks.",
  },
  {
    title: "Web & Mobile App Development",
    url: "/services",
    content:
      "Hextel Tech specializes in Full-Stack Web Development using Next.js 15, React 19, TypeScript, and Node.js, alongside cross-platform Mobile App Development for iOS and Android using React Native and Flutter. We build scalable, reactive, accessible, and ultra-fast digital products.",
  },
  {
    title: "MVP Development for Startups",
    url: "/services/mvp-development",
    content:
      "Our rapid MVP development cycle launches startups from concept to market in 2 to 6 weeks. We build production-ready software with authentication, payment integrations, interactive dashboards, and optimized databases so founders can validate ideas quickly without sacrificing quality.",
  },
  {
    title: "IT Staff Augmentation & Dedicated Engineers",
    url: "/services/it-staff-augmentation",
    content:
      "We provide vetted senior developers, DevOps specialists, and UI/UX designers to seamlessly integrate into client teams, scaling engineering capacity with zero hiring overhead and complete transparency.",
  },
  {
    title: "How We Build - 4 Stage Engineering Methodology",
    url: "/how-we-build",
    content:
      "Our engineering lifecycle consists of: 1. Discovery & Architecture (system specs and database schemas), 2. Agile Sprints (bi-weekly production milestones with CI/CD), 3. Rigorous Quality & Security (Lighthouse 95+ performance, security audits), and 4. Cloud Deployment & Observability (AWS, Vercel, Docker).",
  },
  {
    title: "Portfolio - Nayyab Jewellers",
    url: "/projects",
    content:
      "One of our flagship case studies is Nayyab Jewellers, a bespoke luxury jewelry e-commerce platform built with Next.js, headless architecture, dynamic filtering, and custom checkout flows, driving exceptional sales growth and customer satisfaction.",
  },
  {
    title: "Contact & Getting Started",
    url: "/contact",
    content:
      "Clients can contact Hextel Tech via email at hexteltech@gmail.com, phone at +92 303 5696807, or by filling out the project inquiry lead form on our website. We are glad to sign NDAs before discussing proprietary concepts.",
  },
];

async function main() {
  console.log(`🔌 Connecting to Neon Postgres with ${vectorDimension}-dimension vectors...`);
  const sql = neon(databaseUrl);

  console.log("⚙️  Ensuring pgvector extension and schema exist...");
  await sql.query("CREATE EXTENSION IF NOT EXISTS vector;");

  await sql.query(`
    CREATE TABLE IF NOT EXISTS documents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      content TEXT NOT NULL,
      embedding VECTOR(${vectorDimension}),
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // Clear previous sample chunks if any
  await sql.query("TRUNCATE TABLE documents;");

  console.log(`📚 Ingesting ${KNOWLEDGE_CHUNKS.length} knowledge chunks into Neon...`);

  for (const chunk of KNOWLEDGE_CHUNKS) {
    process.stdout.write(`  Embedding: "${chunk.title}"... `);
    const vector = await getEmbedding(chunk.content);
    const vectorStr = `[${vector.join(",")}]`;

    await sql.query(
      `INSERT INTO documents (content, embedding, metadata) VALUES ($1, $2::vector, $3::jsonb);`,
      [chunk.content, vectorStr, JSON.stringify({ title: chunk.title, url: chunk.url })]
    );
    console.log("✅ Saved!");
    // Short 200ms delay to respect free-tier API rate limits
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log("\n🎉 All knowledge chunks have been successfully embedded and saved into Neon Postgres!");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
