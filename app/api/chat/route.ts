import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { BRAND_CONFIG } from "@/lib/constants";

interface SourceItem {
  title: string;
  url?: string;
  similarity?: number;
}

interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

interface IntentPattern {
  id: string;
  keywords: string[];
  answer: string;
  sources: SourceItem[];
  suggestedQuestions: string[];
  needsHumanHandoff?: boolean;
}

// Helper: Match whole words or multi-word phrases safely with word boundaries
// Prevents false positives like "ai" in "email"/"details", "rate" in "integrate", "call" in "specifically", or "ip" in "partnership"
function matchesKeyword(text: string, keyword: string): boolean {
  const escaped = keyword
    .trim()
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");
  const regex = new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "i");
  return regex.test(text);
}

// Comprehensive, priority-ordered agency knowledge bank
const INTENT_PATTERNS: IntentPattern[] = [
  // 1. Direct Lead / Quote / Action Requests (Highest priority so action buttons & CTAs always open the lead form)
  {
    id: "action-request",
    keywords: [
      "request a quote",
      "get a quote",
      "request a custom quote",
      "request a custom estimate",
      "request an e-commerce estimate",
      "request a mobile app quote",
      "request an ai project quote",
      "request a project quote",
      "request a project estimate",
      "request a project consultation",
      "request a technical consultation",
      "request a consultation",
      "request an nda",
      "request a website performance audit",
      "request a project timeline",
      "book a project discovery call",
      "book a free consultation",
      "submit a project inquiry",
      "start a project inquiry",
      "hire dedicated engineers",
      "hire dedicated developers",
      "contact support team",
      "talk to human support",
    ],
    answer:
      `Please fill out the quick project scope form below (or reach us directly at ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}). Our founding engineering team will review your requirements and get back to you with a tailored roadmap and estimate within 24 hours.`,
    sources: [
      { title: "Contact Hextel Tech", url: "/contact" },
      { title: "Services Overview", url: "/services" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "What is your development process?",
      "Can we sign an NDA?",
    ],
    needsHumanHandoff: true,
  },

  // 2. Specific Case Studies (Job Hunt Copilot, TraceLens, Nayyab Jewellers, Al Moman)
  {
    id: "case-study-nayyab",
    keywords: ["nayyab", "nayyab jewellers", "jewellers", "jewelry", "jewellery"],
    answer:
      "Nayyab Jewellers is a bespoke luxury jewelry e-commerce platform we engineered with Next.js, featuring a high-speed product catalog, dynamic multi-attribute filtering, interactive galleries, and seamless checkout flows to drive online conversions.",
    sources: [
      { title: "Nayyab Jewellers Case Study", url: "/projects#project-1" },
      { title: "All Projects", url: "/projects" },
    ],
    suggestedQuestions: [
      "How much does an e-commerce platform cost?",
      "Tell me about Job Hunt Copilot",
      "Request a custom estimate",
    ],
    needsHumanHandoff: false,
  },
  {
    id: "case-study-almoman",
    keywords: ["al moman", "almoman", "frozen foods"],
    answer:
      "Al Moman Frozen Foods is a full-stack e-commerce and live order tracking system we built to streamline digital product ordering, real-time inventory management, and fast checkout experiences.",
    sources: [
      { title: "Al Moman Case Study", url: "/projects#project-almoman" },
      { title: "All Projects", url: "/projects" },
    ],
    suggestedQuestions: [
      "Tell me about the Nayyab Jewellers case study",
      "How much does an e-commerce platform cost?",
      "Request a custom estimate",
    ],
    needsHumanHandoff: false,
  },
  {
    id: "case-study-jobhunt",
    keywords: ["job hunt", "job hunt copilot", "career engineering"],
    answer:
      "Job Hunt Copilot is our proprietary in-house SaaS platform—an autonomous career engineering command center powered by Google Gemini 2.5 Flash, Playwright browser automation, intelligent resume tailoring, and a 5-layer zero-hallucination safety gate.",
    sources: [
      { title: "Job Hunt Copilot", url: "/projects#project-jobhunt" },
      { title: "Custom AI Agents", url: "/services/custom-ai-agents" },
    ],
    suggestedQuestions: [
      "Tell me about TraceLens",
      "Can you build custom AI agents?",
      "Request an AI project quote",
    ],
    needsHumanHandoff: false,
  },
  {
    id: "case-study-tracelens",
    keywords: ["tracelens", "trace lens", "telemetry", "observability"],
    answer:
      "TraceLens is our in-house SaaS observability engine engineered for high-throughput telemetry, real-time service dependency topology mapping, and AI-powered incident & anomaly detection.",
    sources: [
      { title: "TraceLens SaaS", url: "/projects#project-tracelens" },
      { title: "All Projects", url: "/projects" },
    ],
    suggestedQuestions: [
      "Tell me about Job Hunt Copilot",
      "What tech stack do you use?",
      "Request a technical consultation",
    ],
    needsHumanHandoff: false,
  },

  // 3. Pricing, Costs, Rates & Budgets (Placed before product categories so "How much does a mobile app / e-commerce cost?" matches Pricing!)
  {
    id: "pricing",
    keywords: [
      "cost",
      "costs",
      "price",
      "prices",
      "pricing",
      "budget",
      "quote",
      "rates",
      "hourly rate",
      "fixed price",
      "how much",
      "fee",
      "fees",
      "charge",
      "estimate",
    ],
    answer:
      "Our project pricing typically starts from $1,000 for focused modules or UI/UX sprints, and $3,000–$15,000+ for complete end-to-end web/mobile platforms, e-commerce stores, and startup MVPs. We provide detailed scope specifications and fixed-price proposals within 24 hours.",
    sources: [
      { title: "MVP Development", url: "/services/mvp-development" },
      { title: "Contact Us", url: "/contact" },
    ],
    suggestedQuestions: [
      "What is your development timeline?",
      "What services do you offer?",
      "Request a Quote",
    ],
    needsHumanHandoff: false,
  },

  // 4. Timelines, Turnaround & Onboarding Speed (Placed before product categories so "What is your mobile development timeline?" matches Timelines!)
  {
    id: "timeline",
    keywords: [
      "timeline",
      "timelines",
      "how long",
      "duration",
      "turnaround",
      "delivery time",
      "how quickly",
      "onboard developers",
      "weeks",
      "months",
      "deadline",
    ],
    answer:
      "Startup MVPs take 2 to 6 weeks from concept to launch, while full enterprise platforms typically take 4 to 8 weeks in transparent 2-week agile sprints with bi-weekly preview deployments. For IT staff augmentation, we can onboard dedicated senior engineers within 48 to 72 hours.",
    sources: [
      { title: "How We Build", url: "/how-we-build" },
      { title: "MVP Development", url: "/services/mvp-development" },
    ],
    suggestedQuestions: [
      "How much does an MVP cost?",
      "What is your development process?",
      "Request a custom estimate",
    ],
    needsHumanHandoff: false,
  },

  // 5. How We Build / Development Process & Methodology (Matches Quick Action "How We Build")
  {
    id: "how-we-build",
    keywords: [
      "how we build",
      "how do you build",
      "development process",
      "engineering process",
      "methodology",
      "workflow",
      "phases",
      "sprints",
      "agile",
      "how do we start",
      "start a project",
      "getting started",
    ],
    answer:
      "We follow a disciplined 4-phase engineering framework: 01. Discovery & Blueprint (system architecture, data models & roadmap), 02. Experience & Design (Figma design systems & interactive prototypes), 03. High-Performance Engineering (Next.js 15, React 19, TypeScript & scalable APIs), and 04. Verification & Evolution (Lighthouse 95+ audits, automated CI/CD & 24/7 SLA support).",
    sources: [
      { title: "How We Build", url: "/how-we-build" },
      { title: "Start a Project", url: "/contact" },
    ],
    suggestedQuestions: [
      "What is your development timeline?",
      "How much does an MVP cost?",
      "Request a project consultation",
    ],
    needsHumanHandoff: false,
  },

  // 6. Client Reviews, Testimonials & Track Record (Matches Quick Action "Client Reviews")
  {
    id: "client-reviews",
    keywords: [
      "client reviews",
      "reviews",
      "review",
      "testimonials",
      "testimonial",
      "ratings",
      "rating",
      "feedback",
      "satisfaction",
      "track record",
    ],
    answer:
      "Hextel Tech holds a 4.7 / 5.0 average client rating across 25+ delivered products, with a 95% on-time milestone SLA, 90% repeat & retainer rate, and $100K+ in client revenue generated. Every engagement includes direct founder access, shared GitHub repositories, and 100% IP ownership.",
    sources: [
      { title: "Client Reviews & Metrics", url: "/reviews" },
      { title: "Our Projects", url: "/projects" },
    ],
    suggestedQuestions: [
      "Show me your portfolio projects",
      "Who are the founders?",
      "Request a project consultation",
    ],
    needsHumanHandoff: false,
  },

  // 7. Founders, Leadership & Team
  {
    id: "founders-team",
    keywords: [
      "founders",
      "founder",
      "co-founders",
      "team",
      "leadership",
      "who founded",
      "ceo",
      "hasaan",
      "faseeh",
      "moman",
    ],
    answer:
      "Hextel Tech was built by 3 co-founders and engineers: Hasaan Ahmad (CEO & Business Development), Muhammad Faseeh Altaf (Marketing Expert & Full-Stack Developer), and Moman Salman (Full-Stack Developer & AI Automation Expert). You collaborate directly with our founding engineers—zero corporate bureaucracy.",
    sources: [
      { title: "About Hextel Tech", url: "/about" },
      { title: "Contact Our Team", url: "/contact" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "Show me your portfolio projects",
      "Book a project discovery call",
    ],
    needsHumanHandoff: false,
  },

  // 8. General Portfolio & Case Studies
  {
    id: "portfolio",
    keywords: [
      "portfolio",
      "case study",
      "case studies",
      "projects",
      "past work",
      "previous work",
      "examples",
      "our projects",
      "saas",
    ],
    answer:
      "We have delivered 25+ production platforms generating over $100K+ in client revenue. Our portfolio includes proprietary in-house SaaS platforms like Job Hunt Copilot (autonomous AI career command center) and TraceLens (high-throughput telemetry & observability engine), alongside client e-commerce platforms like Nayyab Jewellers and Al Moman Frozen Foods.",
    sources: [
      { title: "Our Projects", url: "/projects" },
      { title: "Client Reviews", url: "/reviews" },
    ],
    suggestedQuestions: [
      "Tell me about Job Hunt Copilot",
      "Tell me about the Nayyab Jewellers case study",
      "Request a custom estimate",
    ],
    needsHumanHandoff: false,
  },

  // 9. E-Commerce & Online Stores
  {
    id: "ecommerce",
    keywords: [
      "e-commerce",
      "ecommerce",
      "online store",
      "online shop",
      "shopping cart",
      "checkout",
      "stripe",
      "paypal",
      "shopify",
      "marketplace",
    ],
    answer:
      "Yes! At Hextel Tech, we engineer custom, high-converting e-commerce platforms (such as Nayyab Jewellers and Al Moman Frozen Foods). We build responsive product catalogs, dynamic filtering, real-time order tracking, secure checkout gateways (Stripe/PayPal), and inventory dashboards.",
    sources: [
      { title: "Our Projects", url: "/projects" },
      { title: "Web Application Development", url: "/services/web-application-development" },
    ],
    suggestedQuestions: [
      "How much does an e-commerce platform cost?",
      "Tell me about the Nayyab Jewellers case study",
      "Request an e-commerce estimate",
    ],
    needsHumanHandoff: false,
  },

  // 10. Web & App Development (Matches Quick Action "Web & App Development" & "Can you build web applications?")
  {
    id: "web-and-app-dev",
    keywords: [
      "web & app development",
      "web and app development",
      "web application",
      "web applications",
      "web development",
      "web platform",
      "web platforms",
      "web app",
      "web apps",
      "website development",
      "build a website",
      "custom software",
      "desktop app",
      "windows app",
      "erp",
    ],
    answer:
      "We engineer blazing-fast, scalable web applications, enterprise ERP systems, and cross-platform mobile & desktop apps using Next.js 15, React 19, TypeScript, Node.js, Python, and React Native/Flutter—all architected for sub-second load times, 95+ Lighthouse scores, and strong security.",
    sources: [
      { title: "Web Application Development", url: "/services/web-application-development" },
      { title: "Mobile App Development", url: "/services/mobile-app-development" },
      { title: "All 17 Services", url: "/services" },
    ],
    suggestedQuestions: [
      "How much does an MVP cost?",
      "What is your development timeline?",
      "Request a custom estimate",
    ],
    needsHumanHandoff: false,
  },

  // 11. Mobile App Development
  {
    id: "mobile-dev",
    keywords: [
      "mobile app",
      "mobile apps",
      "mobile applications",
      "mobile development",
      "ios",
      "android",
      "react native",
      "flutter",
      "play store",
      "app store",
      "cross-platform",
      "iphone",
    ],
    answer:
      "Yes, we build reactive, cross-platform mobile applications for iOS and Android using React Native and Flutter. Our apps feature smooth 60fps native performance, offline data sync, push notifications, and secure backend API integrations.",
    sources: [
      { title: "Mobile App Development", url: "/services/mobile-app-development" },
    ],
    suggestedQuestions: [
      "What is your mobile development timeline?",
      "How much does a mobile app cost?",
      "Request a mobile app quote",
    ],
    needsHumanHandoff: false,
  },

  // 12. AI, Machine Learning, Copilots, RAG & Workflow Automation
  {
    id: "ai-agents",
    keywords: [
      "ai",
      "artificial intelligence",
      "machine learning",
      "chatbot",
      "chatbots",
      "copilot",
      "copilots",
      "llm",
      "rag",
      "ai agents",
      "custom ai",
      "workflow automation",
      "vector search",
      "gpt",
      "openai",
      "gemini",
      "integrate ai",
    ],
    answer:
      "Yes! We build custom AI agents, autonomous copilots, RAG vector search pipelines (with pgvector, Gemini, and OpenAI), and AI workflow automations—and we can seamlessly integrate them into your existing web or mobile application.",
    sources: [
      { title: "Custom AI Agents & Copilots", url: "/services/custom-ai-agents" },
      { title: "AI Workflow Automation", url: "/services/ai-workflow-automation" },
    ],
    suggestedQuestions: [
      "Tell me about Job Hunt Copilot",
      "What is your development process?",
      "Request an AI project quote",
    ],
    needsHumanHandoff: false,
  },

  // 13. Legacy Modernization, Cloud, DevOps & Performance/SEO
  {
    id: "modernization-cloud-seo",
    keywords: [
      "modernize",
      "modernization",
      "legacy",
      "migrate",
      "migration",
      "seo",
      "performance",
      "lighthouse",
      "core web vitals",
      "load time",
      "devops",
      "ci/cd",
      "cloud infrastructure",
      "aws",
      "docker",
      "kubernetes",
    ],
    answer:
      "We modernize legacy monoliths into blazing-fast Next.js 15 & cloud-native architectures engineered for 95+ Google Lighthouse scores and sub-second load times, complete with automated CI/CD pipelines, Docker/Kubernetes, and 24/7 cloud observability.",
    sources: [
      { title: "Legacy Modernization", url: "/services/legacy-software-modernization" },
      { title: "DevOps & CI/CD", url: "/services/devops-ci-cd" },
      { title: "How We Build", url: "/how-we-build" },
    ],
    suggestedQuestions: [
      "What tech stack do you use?",
      "How much does an MVP cost?",
      "Request a website performance audit",
    ],
    needsHumanHandoff: false,
  },

  // 14. Technologies & Tech Stack
  {
    id: "tech-stack",
    keywords: [
      "python",
      "django",
      "fastapi",
      "node",
      "nodejs",
      "node.js",
      "react",
      "next.js",
      "nextjs",
      "typescript",
      "javascript",
      "tailwind",
      "php",
      "laravel",
      "tech stack",
      "tech stacks",
      "technologies",
      "technology",
      "database",
      "postgresql",
      "postgres",
      "neon",
      "supabase",
    ],
    answer:
      "Our core engineering stack includes Next.js 15, React 19, TypeScript, Tailwind CSS, Node.js, Python (FastAPI/Django), PostgreSQL (Neon/Supabase with pgvector), React Native, Flutter, and cloud infrastructure on AWS, Vercel, and Docker.",
    sources: [
      { title: "How We Build", url: "/how-we-build" },
      { title: "Services", url: "/services" },
    ],
    suggestedQuestions: [
      "Can you build web applications?",
      "Do you provide dedicated developers?",
      "Request a technical consultation",
    ],
    needsHumanHandoff: false,
  },

  // 15. IT Staff Augmentation & Dedicated Engineers
  {
    id: "staff-augmentation",
    keywords: [
      "staff augmentation",
      "hire developers",
      "dedicated developers",
      "dedicated developer",
      "hire engineer",
      "hire engineers",
      "dedicated team",
      "contract developers",
      "senior engineers",
      "talent",
    ],
    answer:
      "We provide vetted senior software engineers, DevOps specialists, and UI/UX designers who integrate directly into your workflow within 48–72 hours with zero recruiting overhead and flexible monthly engagement models.",
    sources: [
      { title: "IT Staff Augmentation", url: "/services/it-staff-augmentation" },
    ],
    suggestedQuestions: [
      "What tech stacks do you cover?",
      "How quickly can we onboard developers?",
      "Hire dedicated engineers",
    ],
    needsHumanHandoff: false,
  },

  // 16. NDAs, Security, Privacy & Confidentiality
  {
    id: "nda-security",
    keywords: [
      "nda",
      "non disclosure",
      "non-disclosure",
      "confidential",
      "confidentiality",
      "security",
      "cybersecurity",
      "compliance",
      "intellectual property",
      "ip ownership",
      "gdpr",
      "soc 2",
    ],
    answer:
      "Yes, absolutely. We gladly sign Non-Disclosure Agreements (NDAs) before reviewing any proprietary specs, wireframes, or business logic. You retain 100% ownership of all source code, repositories, and intellectual property.",
    sources: [
      { title: "Security & Compliance", url: "/security-and-compliance" },
      { title: "Cybersecurity Audits", url: "/services/cybersecurity-compliance" },
    ],
    suggestedQuestions: [
      "How do we start a project?",
      "How much does an MVP cost?",
      "Request an NDA & project discovery",
    ],
    needsHumanHandoff: false,
  },

  // 17. Maintenance, Support & SLAs
  {
    id: "maintenance-support",
    keywords: [
      "maintenance",
      "ongoing support",
      "post launch",
      "post-launch",
      "sla",
      "bug fix",
      "monitoring",
      "uptime",
      "retainer",
    ],
    answer:
      "Yes, we offer dedicated post-launch maintenance and SLA tiers covering 24/7 uptime monitoring, security patching, performance audits, and continuous feature development as your product scales.",
    sources: [
      { title: "Server & Cloud Infrastructure", url: "/services/server-cloud-infrastructure" },
      { title: "How We Build", url: "/how-we-build" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "How much does an MVP cost?",
      "Contact support team",
    ],
    needsHumanHandoff: false,
  },

  // 18. Services Overview (Matches "What services do you offer?", "Services", "UI/UX", etc.)
  {
    id: "services-overview",
    keywords: [
      "service",
      "services",
      "what do you offer",
      "what services do you offer",
      "what do you do",
      "what can you do",
      "capabilities",
      "solutions",
      "mvp",
      "ui/ux",
      "ui ux",
      "design system",
      "api integration",
      "qa testing",
    ],
    answer:
      "We offer 17 specialized engineering services across 3 core pillars: 1. Custom Apps & Software (Full-Stack Web Apps, iOS/Android Mobile Apps, Desktop Apps, ERP Systems), 2. Cloud, DevOps & AI (Custom AI Agents & Copilots, AI Workflow Automation, Cloud Infrastructure, CI/CD, UI/UX Design, Legacy Modernization), and 3. Talent & Core Engineering (Startup MVP Development in 2–6 weeks, IT Staff Augmentation, Data Engineering, APIs, QA & Cybersecurity).",
    sources: [
      { title: "All 17 Services", url: "/services" },
      { title: "MVP Development", url: "/services/mvp-development" },
      { title: "Custom AI Agents", url: "/services/custom-ai-agents" },
    ],
    suggestedQuestions: [
      "How much does an MVP cost?",
      "Show me your portfolio projects",
      "Request a custom estimate",
    ],
    needsHumanHandoff: false,
  },

  // 19. Scheduling, Calls & Contact Info
  {
    id: "contact-schedule",
    keywords: [
      "call",
      "schedule",
      "meeting",
      "zoom",
      "google meet",
      "appointment",
      "consultation",
      "contact",
      "email",
      "phone",
      "phone number",
      "whatsapp",
      "reach out",
    ],
    answer:
      `You can reach our founding team directly by email at ${BRAND_CONFIG.email} or by phone/WhatsApp at ${BRAND_CONFIG.phone}, or visit our Contact page to schedule a discovery call within 24 hours.`,
    sources: [{ title: "Contact Hextel Tech", url: "/contact" }],
    suggestedQuestions: [
      "What services do you offer?",
      "How much does an MVP cost?",
      "Request a Quote",
    ],
    needsHumanHandoff: false,
  },

  // 20. Location, Office & Company Background
  {
    id: "company-about",
    keywords: [
      "where are you",
      "location",
      "office",
      "based",
      "address",
      "pakistan",
      "gujranwala",
      "who are you",
      "about hextel",
      "about us",
      "company",
      "hextel",
    ],
    answer:
      `Hextel Tech is a digital engineering consultancy headquartered in ${BRAND_CONFIG.address}, led by co-founders Hasaan Ahmad, Muhammad Faseeh Altaf, and Moman Salman. We partner with startups and enterprises across the US, UK, Europe, and the Middle East, with 25+ delivered products and $100K+ in client revenue generated.`,
    sources: [
      { title: "About Hextel Tech", url: "/about" },
      { title: "Contact Us", url: "/contact" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "Show me your portfolio projects",
      "Request a project consultation",
    ],
    needsHumanHandoff: false,
  },
];

const HEXTEL_KNOWLEDGE_SUMMARY = `
Company: Hextel Tech (https://hexteltech.com)
Tagline: ${BRAND_CONFIG.tagline}
Location: ${BRAND_CONFIG.address} (serving clients globally across the US, UK, Europe, and Middle East)
Contact: Email ${BRAND_CONFIG.email} | Phone/WhatsApp ${BRAND_CONFIG.phone}
Founders (3 Co-Founders & Builders):
- Hasaan Ahmad: CEO & Business Development
- Muhammad Faseeh Altaf: Marketing Expert & Full-Stack Developer
- Moman Salman: Full-Stack Developer & AI Automation Expert
Track Record: 25+ projects delivered, 3+ years experience, 4.7/5.0 average client rating, 95% on-time milestone SLA, 90% repeat/retainer rate, $100K+ client revenue generated.
17 Services:
- IT Staff Augmentation / Dedicated Developers (48-72h onboarding)
- MVP Development for Startups (2-6 weeks launch)
- Web Application Development (Next.js 15, React 19, TypeScript, Node.js)
- Mobile App Development (iOS & Android with React Native & Flutter)
- Windows / Desktop App Development
- Custom AI Agents & Copilots (LLM, RAG, pgvector, Gemini, OpenAI)
- AI Workflow Automation
- UI/UX Design & Product Discovery (Figma design systems, WCAG 2.1 AA)
- ERP Systems & Solutions
- Custom Software Development
- Database & Data Engineering
- API Development & System Integration (REST & GraphQL)
- DevOps & CI/CD Engineering (Docker, Kubernetes, GitOps)
- Server & Cloud Infrastructure Management (AWS, GCP, Azure, Vercel)
- Legacy Software Maintenance & Modernization
- Cybersecurity & Compliance Audits (Zero-trust, SOC 2, GDPR, full NDA & 100% client IP ownership)
- QA & Automated Testing
Flagship Projects & SaaS Products:
1. Job Hunt Copilot (In-House SaaS): Autonomous career engineering command center powered by Google Gemini 2.5 Flash, Playwright automation, and a 5-layer zero-hallucination safety gate.
2. TraceLens (In-House SaaS): High-throughput telemetry, service dependency topology, and AI anomaly detection observability engine.
3. Nayyab Jewellers: Bespoke luxury jewelry e-commerce platform built with Next.js, dynamic filtering, and custom checkout flows.
4. Al Moman Frozen Foods: Full-stack e-commerce and live order tracking platform.
Pricing: Starts at $1,000 for focused modules/sprints, and $3,000-$15,000+ for full end-to-end platforms and startup MVPs. Fixed-price proposals delivered within 24 hours.
`.trim();

// Helper to query Gemini with full Hextel Tech identity, conversation context, and model fallback
async function generateGeminiAnswer(
  question: string,
  apiKey: string,
  conversation: ConversationTurn[] = [],
  extraContext?: string
): Promise<string | null> {
  const systemPrompt = `You are the official AI Digital Consultant representing Hextel Tech.
Guidelines:
1. ALWAYS represent Hextel Tech in the first person ("we", "our founding team", "Hextel Tech").
2. NEVER say "I am an AI and cannot build websites" or "I cannot schedule calls". Hextel Tech IS a full-stack software engineering consultancy that builds web apps, mobile apps, AI agents, e-commerce, and enterprise software.
3. Answer the user's question directly, accurately, and concisely in 2 to 4 sentences using the verified company knowledge below.
4. If the user asks for a quote, custom build, or meeting, invite them to submit the inquiry form in the chat or contact us at ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}.

Verified Hextel Tech Knowledge:
${HEXTEL_KNOWLEDGE_SUMMARY}
${extraContext ? `\nAdditional Retrieved Context:\n${extraContext}` : ""}`;

  const recentTurns = Array.isArray(conversation)
    ? conversation
        .filter((t) => t && typeof t.content === "string" && t.content.trim().length > 0)
        .slice(-6)
        .map((t) => ({
          role: t.role === "assistant" ? "model" : "user",
          parts: [{ text: t.content }],
        }))
    : [];

  const contents =
    recentTurns.length > 0 && recentTurns[recentTurns.length - 1].parts[0].text === question
      ? recentTurns
      : [...recentTurns, { role: "user", parts: [{ text: question }] }];

  const candidateModels = [
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
    "gemini-flash-lite-latest",
  ];

  for (const model of candidateModels) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.25,
            },
          }),
        }
      );
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      }
    } catch {
      clearTimeout(timeout);
    }
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, conversation = [] } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "A valid question string is required." },
        { status: 400 }
      );
    }

    const qTrimmed = question.trim();
    const qLower = qTrimmed.toLowerCase();

    // 1. Instant Greeting Filter (0ms delay)
    if (
      /^(hi|hello|hey|greetings|good\s+morning|good\s+afternoon|good\s+evening|help|assalamu\s*alaikum|salam)([!.,?\s]*)$/i.test(
        qTrimmed
      )
    ) {
      return NextResponse.json({
        answer:
          "Hello! Welcome to Hextel Tech. How can I help you today with our web & mobile engineering, custom AI agents, startup MVPs, or project estimates?",
        sources: [{ title: "Hextel Tech Overview", url: "/" }],
        suggestedQuestions: [
          "What services do you offer?",
          "How much does an MVP cost?",
          "Show me your portfolio projects",
        ],
        needsHumanHandoff: false,
      });
    }

    // 2. Priority-Ordered Word-Boundary Intent Matcher (< 5ms response, 100% accurate)
    for (const pattern of INTENT_PATTERNS) {
      const matched = pattern.keywords.some((kw) => matchesKeyword(qLower, kw));

      if (matched) {
        return NextResponse.json({
          answer: pattern.answer,
          sources: pattern.sources,
          suggestedQuestions: pattern.suggestedQuestions,
          needsHumanHandoff: Boolean(pattern.needsHumanHandoff),
        });
      }
    }

    // 3. For any other open-ended question, query Gemini (with optional Neon pgvector enrichment)
    const geminiKey = process.env.GEMINI_API_KEY;
    const dbUrl = process.env.DATABASE_URL;

    let extraContext = "";
    let sources: SourceItem[] = [
      { title: "Hextel Tech Services", url: "/services" },
      { title: "Our Projects", url: "/projects" },
    ];

    if (dbUrl && geminiKey) {
      try {
        const embedModels = ["gemini-embedding-001", "text-embedding-004"];
        let embeddingValues: number[] | null = null;

        for (const embedModel of embedModels) {
          const embedRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${embedModel}:embedContent?key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: `models/${embedModel}`,
                content: { parts: [{ text: qTrimmed }] },
              }),
            }
          );

          if (embedRes.ok) {
            const embedData = await embedRes.json();
            if (Array.isArray(embedData?.embedding?.values)) {
              embeddingValues = embedData.embedding.values;
              break;
            }
          }
        }

        if (embeddingValues) {
          const vecStr = `[${embeddingValues.join(",")}]`;
          const sql = neon(dbUrl);
          const rows = (await sql.query(
            `SELECT content, metadata FROM documents ORDER BY embedding <=> $1::vector LIMIT 2;`,
            [vecStr]
          )) as Array<{
            content: string;
            metadata: { title?: string; url?: string };
          }>;

          if (rows && rows.length > 0) {
            extraContext = rows.map((r) => r.content).join("\n");
            sources = rows.map((r) => ({
              title: r.metadata?.title || "Hextel Tech",
              url: r.metadata?.url || "/services",
            }));
          }
        }
      } catch {
        // Ignore vector DB errors and proceed with built-in knowledge base
      }
    }

    if (geminiKey) {
      const aiAnswer = await generateGeminiAnswer(
        qTrimmed,
        geminiKey,
        conversation,
        extraContext
      );
      if (aiAnswer) {
        return NextResponse.json({
          answer: aiAnswer,
          sources,
          suggestedQuestions: [
            "What services do you offer?",
            "How much does an MVP cost?",
            "Request a Quote",
          ],
          needsHumanHandoff: false,
        });
      }
    }

    // 4. Intelligent Fallback Response
    return NextResponse.json({
      answer:
        `At Hextel Tech, our founding engineers build custom web applications, iOS/Android mobile apps, AI copilots, and startup MVPs (delivered in 2–6 weeks). Feel free to ask about our 17 services, pricing ($1,000–$15,000+), or case studies—or reach us directly at ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}.`,
      sources: [
        { title: "All 17 Services", url: "/services" },
        { title: "Our Projects", url: "/projects" },
        { title: "Contact Us", url: "/contact" },
      ],
      suggestedQuestions: [
        "What services do you offer?",
        "How much does an MVP cost?",
        "Request a custom estimate",
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
