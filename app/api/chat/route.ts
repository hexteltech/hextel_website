import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { BRAND_CONFIG } from "@/lib/constants";
import type { SupportedLanguage } from "@/lib/i18n/types";

interface SourceItem {
  title: string;
  url?: string;
  similarity?: number;
}

interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

interface LocalizedResponse {
  answer: string;
  sources: SourceItem[];
  suggestedQuestions: string[];
}

interface IntentPattern {
  id: string;
  keywords: string[];
  responses: Record<SupportedLanguage, LocalizedResponse>;
  needsHumanHandoff?: boolean;
}

// Match whole words or multi-word phrases safely with Unicode-aware boundaries
function matchesKeyword(text: string, keyword: string): boolean {
  const escaped = keyword
    .trim()
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");
  const regex = new RegExp(
    `(?:^|[^\\p{L}\\p{N}])${escaped}(?:$|[^\\p{L}\\p{N}])`,
    "iu"
  );
  return regex.test(text);
}

// Detect if the user's message is written in a specific language (overrides UI tab if clearly typed in another language)
function detectQueryLanguage(
  query: string,
  uiLanguage: SupportedLanguage
): SupportedLanguage | "other" {
  const q = query.trim().toLowerCase();

  // Check for non-Latin scripts (Arabic, Urdu, Cyrillic, CJK, Hindi, etc.) -> route to Gemini in user's own language
  if (/[\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u4E00-\u9FFF\u3040-\u30FF]/.test(q)) {
    return "other";
  }

  // Polish markers
  if (
    /[ąćęłńśćźż]/i.test(q) ||
    /\b(cześć|dzień dobry|jak się masz|co słychać|dziękuję|dzięki|do widzenia|usługi|wycenę|wycena|jak budujemy|opinie klientów|ile kosztuje|ile czasu|zajmuje|stworzenie|aplikacje|aplikacji|tworzycie|zespół|założyciele|kontakt|projekt|czas realizacji)\b/i.test(
      q
    )
  ) {
    return "pl";
  }

  // German markers
  if (
    /[äöüß]/i.test(q) ||
    /\b(hallo|guten tag|guten morgen|wie geht es|wie gehts|danke|vielen dank|tschüss|auf wiedersehen|leistungen|angebot anfordern|wie wir bauen|kundenbewertungen|wie viel kostet|kosten|entwicklung|können sie|zeitplan|gründer|kontakt|projekte)\b/i.test(
      q
    )
  ) {
    return "de";
  }

  // Spanish markers
  if (
    /[¿¡ñáéíóú]/i.test(q) ||
    /\b(hola|buenos días|buenas tardes|cómo estás|como estas|qué tal|que tal|gracias|adiós|hasta luego|servicios|solicitar presupuesto|cómo construimos|reseñas de clientes|cuánto cuesta|precio|presupuesto|desarrollo|pueden|proyectos|fundadores|contacto)\b/i.test(
      q
    )
  ) {
    return "es";
  }

  // Clear multi-word English phrases when user is on a non-English UI tab
  if (
    uiLanguage !== "en" &&
    /\b(what services|how much|can you build|tell me about|who are the|how long does|request a quote|web & app development|how we build|client reviews)\b/i.test(
      q
    )
  ) {
    return "en";
  }

  return uiLanguage;
}

const GREETING_RESPONSES: Record<SupportedLanguage, LocalizedResponse> = {
  en: {
    answer:
      "Hello! Welcome to Hextel Tech. How can I help you today with our web & mobile engineering, custom AI agents, startup MVPs, or project estimates?",
    sources: [{ title: "Hextel Tech Overview", url: "/" }],
    suggestedQuestions: [
      "What services do you offer?",
      "How much does an MVP cost?",
      "Show me your portfolio projects",
    ],
  },
  pl: {
    answer:
      "Cześć! Witamy w Hextel Tech. W czym mogę Ci dzisiaj pomóc w zakresie aplikacji webowych i mobilnych, agentów AI, budowy MVP dla startupów lub wyceny projektu?",
    sources: [{ title: "Przegląd Hextel Tech", url: "/" }],
    suggestedQuestions: [
      "Jakie usługi oferujecie?",
      "Ile kosztuje budowa MVP?",
      "Pokaż Wasze projekty z portfolio",
    ],
  },
  de: {
    answer:
      "Hallo! Willkommen bei Hextel Tech. Wie kann ich Ihnen heute bei Web- und Mobile-Entwicklung, individuellen KI-Agenten, Startup-MVPs oder Projektschätzungen helfen?",
    sources: [{ title: "Hextel Tech Übersicht", url: "/" }],
    suggestedQuestions: [
      "Welche Leistungen bieten Sie an?",
      "Wie viel kostet ein MVP?",
      "Zeigen Sie mir Ihre Portfolio-Projekte",
    ],
  },
  es: {
    answer:
      "¡Hola! Bienvenido a Hextel Tech. ¿Cómo puedo ayudarte hoy con nuestro desarrollo web y móvil, agentes de IA personalizados, MVPs para startups o presupuestos?",
    sources: [{ title: "Resumen de Hextel Tech", url: "/" }],
    suggestedQuestions: [
      "¿Qué servicios ofrecen?",
      "¿Cuánto cuesta un MVP?",
      "Muéstrame sus proyectos de portafolio",
    ],
  },
};

const FALLBACK_RESPONSES: Record<SupportedLanguage, LocalizedResponse> = {
  en: {
    answer: `At Hextel Tech, our founding engineers build custom web applications, iOS/Android mobile apps, AI copilots, and startup MVPs (delivered in 2–6 weeks). Feel free to ask about our 17 services, pricing ($1,000–$15,000+), or case studies—or reach us directly at ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}.`,
    sources: [
      { title: "All 17 Services", url: "/services" },
      { title: "Our Projects", url: "/projects" },
      { title: "Contact Us", url: "/contact" },
    ],
    suggestedQuestions: [
      "What services do you offer?",
      "How much does an MVP cost?",
      "Request a Quote",
    ],
  },
  pl: {
    answer: `W Hextel Tech nasi inżynierowie założyciele tworzą dedykowane aplikacje webowe, aplikacje mobilne iOS/Android, agentów AI oraz MVP dla startupów (w 2–6 tygodni). Zapytaj o nasze 17 usług, cennik ($1,000–$15,000+) lub projekty, albo skontaktuj się bezpośrednio: ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}.`,
    sources: [
      { title: "Wszystkie 17 Usług", url: "/services" },
      { title: "Nasze Projekty", url: "/projects" },
      { title: "Kontakt", url: "/contact" },
    ],
    suggestedQuestions: [
      "Jakie usługi oferujecie?",
      "Ile kosztuje budowa MVP?",
      "Poproś o wycenę",
    ],
  },
  de: {
    answer: `Bei Hextel Tech entwickeln unsere Gründer maßgeschneiderte Webanwendungen, iOS-/Android-Apps, KI-Copiloten und Startup-MVPs (in 2–6 Wochen). Fragen Sie gerne nach unseren 17 Leistungen, Preisen ($1.000–$15.000+) oder Fallstudien – oder erreichen Sie uns direkt unter ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}.`,
    sources: [
      { title: "Alle 17 Leistungen", url: "/services" },
      { title: "Unsere Projekte", url: "/projects" },
      { title: "Kontakt", url: "/contact" },
    ],
    suggestedQuestions: [
      "Welche Leistungen bieten Sie an?",
      "Wie viel kostet ein MVP?",
      "Angebot anfordern",
    ],
  },
  es: {
    answer: `En Hextel Tech, nuestros ingenieros fundadores desarrollan aplicaciones web a medida, apps móviles iOS/Android, copilotos de IA y MVPs para startups (en 2 a 6 semanas). Pregúntanos sobre nuestros 17 servicios, precios ($1,000–$15,000+) o casos de estudio, o contáctanos en ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}.`,
    sources: [
      { title: "Los 17 Servicios", url: "/services" },
      { title: "Nuestros Proyectos", url: "/projects" },
      { title: "Contacto", url: "/contact" },
    ],
    suggestedQuestions: [
      "¿Qué servicios ofrecen?",
      "¿Cuánto cuesta un MVP?",
      "Solicitar presupuesto",
    ],
  },
};

// Comprehensive multilingual intent knowledge bank (English, Polish, German, Spanish)
const INTENT_PATTERNS: IntentPattern[] = [
  // 1. Explicit Quote / Lead Form Requests (ONLY pattern with needsHumanHandoff: true)
  {
    id: "action-request",
    keywords: [
      // EN
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
      // PL
      "poproś o wycenę",
      "zamów wycenę",
      "poproś o konsultację",
      "umów rozmowę",
      "zatrudnij inżynierów",
      // DE
      "angebot anfordern",
      "kostenvoranschlag anfordern",
      "beratungsgespräch buchen",
      "entwickler einstellen",
      // ES
      "solicitar presupuesto",
      "pedir presupuesto",
      "solicitar cotización",
      "agendar consultoría",
      "contratar ingenieros",
    ],
    responses: {
      en: {
        answer: `Please fill out the quick project scope form below (or reach us directly at ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}). Our founding engineering team will review your requirements and get back to you with a tailored roadmap and estimate within 24 hours.`,
        sources: [
          { title: "Contact Hextel Tech", url: "/contact" },
          { title: "Services Overview", url: "/services" },
        ],
        suggestedQuestions: [
          "What services do you offer?",
          "What is your development process?",
          "Can we sign an NDA?",
        ],
      },
      pl: {
        answer: `Wypełnij poniższy formularz zakresu projektu (lub napisz bezpośrednio na ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}). Nasz zespół założycieli przeanalizuje Twoje wymagania i przygotuje dedykowaną wycenę oraz plan działania w ciągu 24 godzin.`,
        sources: [
          { title: "Kontakt z Hextel Tech", url: "/contact" },
          { title: "Przegląd Usług", url: "/services" },
        ],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Jak wygląda proces tworzenia?",
          "Czy podpisujecie NDA?",
        ],
      },
      de: {
        answer: `Bitte füllen Sie das untenstehende Projektformular aus (oder kontaktieren Sie uns direkt unter ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}). Unser Gründerteam prüft Ihre Anforderungen und sendet Ihnen innerhalb von 24 Stunden eine maßgeschneiderte Roadmap und Kostenschätzung.`,
        sources: [
          { title: "Hextel Tech Kontakt", url: "/contact" },
          { title: "Leistungsübersicht", url: "/services" },
        ],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Wie läuft Ihr Entwicklungsprozess ab?",
          "Können wir ein NDA unterzeichnen?",
        ],
      },
      es: {
        answer: `Por favor completa el formulario rápido de alcance de proyecto a continuación (o escríbenos directamente a ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}). Nuestro equipo de ingenieros fundadores revisará tus requisitos y te enviará una propuesta y hoja de ruta en menos de 24 horas.`,
        sources: [
          { title: "Contactar a Hextel Tech", url: "/contact" },
          { title: "Resumen de Servicios", url: "/services" },
        ],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "¿Cuál es su proceso de desarrollo?",
          "¿Podemos firmar un NDA?",
        ],
      },
    },
    needsHumanHandoff: true,
  },

  // 2. Specific Case Studies (Nayyab Jewellers, Al Moman, Job Hunt Copilot, TraceLens)
  {
    id: "case-study-nayyab",
    keywords: [
      "nayyab",
      "nayyab jewellers",
      "jewellers",
      "jewelry",
      "jewellery",
      "jubiler",
      "biżuteria",
      "schmuck",
      "joyería",
    ],
    responses: {
      en: {
        answer:
          "Nayyab Jewellers is a bespoke luxury jewelry e-commerce platform we engineered with Next.js, featuring a high-speed product catalog, dynamic multi-attribute filtering, interactive galleries, and seamless checkout flows to drive online conversions.",
        sources: [
          { title: "Nayyab Jewellers Case Study", url: "/projects#project-1" },
          { title: "All Projects", url: "/projects" },
        ],
        suggestedQuestions: [
          "How much does an e-commerce platform cost?",
          "Tell me about Job Hunt Copilot",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Nayyab Jewellers to luksusowa platforma e-commerce z biżuterią, którą zbudowaliśmy w Next.js. Zawiera ultraszybki katalog produktów, dynamiczne filtrowanie, interaktywne galerie oraz zoptymalizowany proces zakupowy.",
        sources: [
          { title: "Case Study Nayyab Jewellers", url: "/projects#project-1" },
          { title: "Wszystkie Projekty", url: "/projects" },
        ],
        suggestedQuestions: [
          "Ile kosztuje platforma e-commerce?",
          "Opowiedz o Job Hunt Copilot",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Nayyab Jewellers ist eine maßgeschneiderte Luxus-Schmuck-E-Commerce-Plattform auf Basis von Next.js mit ultraschnellem Produktkatalog, dynamischer Filterung, interaktiven Galerien und optimiertem Checkout.",
        sources: [
          { title: "Nayyab Jewellers Fallstudie", url: "/projects#project-1" },
          { title: "Alle Projekte", url: "/projects" },
        ],
        suggestedQuestions: [
          "Wie viel kostet eine E-Commerce-Plattform?",
          "Erzählen Sie mir von Job Hunt Copilot",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Nayyab Jewellers es una plataforma de comercio electrónico de joyería de lujo desarrollada con Next.js, con catálogo ultrarrápido, filtrado dinámico, galerías interactivas y flujo de pago optimizado para maximizar conversiones.",
        sources: [
          { title: "Caso de Estudio Nayyab Jewellers", url: "/projects#project-1" },
          { title: "Todos los Proyectos", url: "/projects" },
        ],
        suggestedQuestions: [
          "¿Cuánto cuesta una plataforma e-commerce?",
          "Háblame sobre Job Hunt Copilot",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },
  {
    id: "case-study-almoman",
    keywords: ["al moman", "almoman", "frozen foods"],
    responses: {
      en: {
        answer:
          "Al Moman Frozen Foods is a full-stack e-commerce and live order tracking system we built to streamline digital product ordering, real-time inventory management, and fast checkout experiences.",
        sources: [
          { title: "Al Moman Case Study", url: "/projects#project-almoman" },
          { title: "All Projects", url: "/projects" },
        ],
        suggestedQuestions: [
          "Tell me about the Nayyab Jewellers case study",
          "How much does an e-commerce platform cost?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Al Moman Frozen Foods to pełny system e-commerce ze śledzeniem zamówień na żywo, który zaprojektowaliśmy do obsługi sprzedaży online, zarządzania stanami magazynowymi w czasie rzeczywistym i szybkich płatności.",
        sources: [
          { title: "Case Study Al Moman", url: "/projects#project-almoman" },
          { title: "Wszystkie Projekty", url: "/projects" },
        ],
        suggestedQuestions: [
          "Opowiedz o projekcie Nayyab Jewellers",
          "Ile kosztuje platforma e-commerce?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Al Moman Frozen Foods ist ein Full-Stack-E-Commerce- und Live-Bestellverfolgungssystem für schnelle digitale Bestellungen, Echtzeit-Bestandsverwaltung und reibungslose Checkout-Prozesse.",
        sources: [
          { title: "Al Moman Fallstudie", url: "/projects#project-almoman" },
          { title: "Alle Projekte", url: "/projects" },
        ],
        suggestedQuestions: [
          "Erzählen Sie mir von Nayyab Jewellers",
          "Wie viel kostet eine E-Commerce-Plattform?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Al Moman Frozen Foods es un sistema e-commerce full-stack con seguimiento de pedidos en vivo, diseñado para agilizar pedidos digitales, gestión de inventario en tiempo real y pagos rápidos.",
        sources: [
          { title: "Caso de Estudio Al Moman", url: "/projects#project-almoman" },
          { title: "Todos los Proyectos", url: "/projects" },
        ],
        suggestedQuestions: [
          "Háblame del caso Nayyab Jewellers",
          "¿Cuánto cuesta una plataforma e-commerce?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },
  {
    id: "case-study-jobhunt",
    keywords: ["job hunt", "job hunt copilot", "career engineering"],
    responses: {
      en: {
        answer:
          "Job Hunt Copilot is our proprietary in-house SaaS platform—an autonomous career engineering command center powered by Google Gemini 2.5 Flash, Playwright browser automation, intelligent resume tailoring, and a 5-layer zero-hallucination safety gate.",
        sources: [
          { title: "Job Hunt Copilot", url: "/projects#project-jobhunt" },
          { title: "Custom AI Agents", url: "/services/custom-ai-agents" },
        ],
        suggestedQuestions: [
          "Tell me about TraceLens",
          "Can you build custom AI agents?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Job Hunt Copilot to nasza autorska platforma SaaS — autonomiczne centrum inżynierii kariery napędzane przez Google Gemini 2.5 Flash, automatyzację Playwright, inteligentne dopasowywanie CV oraz 5-warstwową bramkę bezpieczeństwa eliminującą halucynacje AI.",
        sources: [
          { title: "Job Hunt Copilot", url: "/projects#project-jobhunt" },
          { title: "Dedykowani Agenci AI", url: "/services/custom-ai-agents" },
        ],
        suggestedQuestions: [
          "Opowiedz o TraceLens",
          "Czy tworzycie dedykowanych agentów AI?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Job Hunt Copilot ist unsere hauseigene SaaS-Plattform – ein autonomes Karriere-Command-Center auf Basis von Google Gemini 2.5 Flash, Playwright-Browserautomatisierung, intelligenter CV-Anpassung und einem 5-stufigen Zero-Halluzinations-Sicherheitsgate.",
        sources: [
          { title: "Job Hunt Copilot", url: "/projects#project-jobhunt" },
          { title: "Individuelle KI-Agenten", url: "/services/custom-ai-agents" },
        ],
        suggestedQuestions: [
          "Erzählen Sie mir von TraceLens",
          "Können Sie individuelle KI-Agenten entwickeln?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Job Hunt Copilot es nuestra plataforma SaaS propia: un centro de comando autónomo de ingeniería profesional impulsado por Google Gemini 2.5 Flash, automatización con Playwright, adaptación inteligente de CV y una puerta de seguridad de 5 capas sin alucinaciones.",
        sources: [
          { title: "Job Hunt Copilot", url: "/projects#project-jobhunt" },
          { title: "Agentes de IA a Medida", url: "/services/custom-ai-agents" },
        ],
        suggestedQuestions: [
          "Háblame sobre TraceLens",
          "¿Pueden crear agentes de IA personalizados?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },
  {
    id: "case-study-tracelens",
    keywords: ["tracelens", "trace lens", "telemetry", "observability", "telemetria"],
    responses: {
      en: {
        answer:
          "TraceLens is our in-house SaaS observability engine engineered for high-throughput telemetry, real-time service dependency topology mapping, and AI-powered incident & anomaly detection.",
        sources: [
          { title: "TraceLens SaaS", url: "/projects#project-tracelens" },
          { title: "All Projects", url: "/projects" },
        ],
        suggestedQuestions: [
          "Tell me about Job Hunt Copilot",
          "What tech stack do you use?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "TraceLens to nasz autorski silnik SaaS do obserwowalności systemów, zaprojektowany do wysokowydajnej telemetrii, mapowania topologii zależności mikroserwisów w czasie rzeczywistym oraz wykrywania anomalii z pomocą AI.",
        sources: [
          { title: "TraceLens SaaS", url: "/projects#project-tracelens" },
          { title: "Wszystkie Projekty", url: "/projects" },
        ],
        suggestedQuestions: [
          "Opowiedz o Job Hunt Copilot",
          "Jakiego stacku technologicznego używacie?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "TraceLens ist unsere hauseigene SaaS-Observability-Engine für Hochdurchsatz-Telemetrie, Echtzeit-Service-Topologie-Mapping und KI-gestützte Anomalie- und Vorfallerkennung.",
        sources: [
          { title: "TraceLens SaaS", url: "/projects#project-tracelens" },
          { title: "Alle Projekte", url: "/projects" },
        ],
        suggestedQuestions: [
          "Erzählen Sie mir von Job Hunt Copilot",
          "Welchen Tech-Stack nutzen Sie?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "TraceLens es nuestro motor SaaS de observabilidad de alto rendimiento para telemetría en tiempo real, mapeo de topología de dependencias de servicios y detección de incidentes y anomalías con IA.",
        sources: [
          { title: "TraceLens SaaS", url: "/projects#project-tracelens" },
          { title: "Todos los Proyectos", url: "/projects" },
        ],
        suggestedQuestions: [
          "Háblame sobre Job Hunt Copilot",
          "¿Qué tecnologías utilizan?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 3. Timelines, Turnaround, Time Required & Onboarding Speed (Placed BEFORE pricing so "how much time is required?" matches Timeline!)
  {
    id: "timeline",
    keywords: [
      // EN
      "how much time",
      "time is required",
      "time required",
      "time does it take",
      "time will it take",
      "time it takes",
      "time to build",
      "time to develop",
      "time to deliver",
      "time to complete",
      "take to build",
      "takes to build",
      "timeline",
      "timelines",
      "how long",
      "duration",
      "turnaround",
      "delivery time",
      "how quickly",
      "how fast",
      "onboard developers",
      "weeks",
      "months",
      "days",
      "deadline",
      // PL
      "czas realizacji",
      "ile czasu",
      "jak długo",
      "termin",
      "tygodnie",
      "dni",
      // DE
      "wie viel zeit",
      "zeitplan",
      "wie lange",
      "dauer",
      "lieferzeit",
      "wochen",
      "tage",
      // ES
      "tiempo de entrega",
      "tiempo se requiere",
      "tiempo requerido",
      "tiempo toma",
      "cuánto tiempo",
      "cuanto tiempo",
      "cuánto tarda",
      "cuanto tarda",
      "plazo",
      "duración",
      "semanas",
      "días",
    ],
    responses: {
      en: {
        answer:
          "Startup MVPs take 2 to 6 weeks from concept to launch, while full enterprise platforms typically take 4 to 8 weeks in transparent 2-week agile sprints with bi-weekly preview deployments. For IT staff augmentation, we can onboard dedicated senior engineers within 48 to 72 hours.",
        sources: [
          { title: "How We Build", url: "/how-we-build" },
          { title: "MVP Development", url: "/services/mvp-development" },
        ],
        suggestedQuestions: [
          "How much does an MVP cost?",
          "What is your development process?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Budowa MVP dla startupu zajmuje od 2 do 6 tygodni od koncepcji do wdrożenia, a rozbudowane platformy enterprise od 4 do 8 tygodni w przejrzystych 2-tygodniowych sprintach z regularnymi wersjami demo. W ramach IT Staff Augmentation wdrażamy dedykowanych inżynierów w 48–72 godziny.",
        sources: [
          { title: "Jak budujemy", url: "/how-we-build" },
          { title: "Budowa MVP", url: "/services/mvp-development" },
        ],
        suggestedQuestions: [
          "Ile kosztuje budowa MVP?",
          "Jak wygląda proces tworzenia?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Startup-MVPs dauern 2 bis 6 Wochen vom Konzept bis zum Launch, während umfassende Enterprise-Plattformen in 4 bis 8 Wochen in transparenten 2-Wochen-Sprints umgesetzt werden. Für IT-Staff-Augmentation können wir Senior-Entwickler innerhalb von 48 bis 72 Stunden integrieren.",
        sources: [
          { title: "Wie wir bauen", url: "/how-we-build" },
          { title: "MVP-Entwicklung", url: "/services/mvp-development" },
        ],
        suggestedQuestions: [
          "Wie viel kostet ein MVP?",
          "Wie läuft Ihr Entwicklungsprozess ab?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Los MVPs para startups toman de 2 a 6 semanas desde el concepto hasta el lanzamiento, mientras que las plataformas empresariales toman de 4 a 8 semanas en sprints ágiles de 2 semanas. Para staff augmentation, incorporamos ingenieros sénior en 48 a 72 horas.",
        sources: [
          { title: "Cómo construimos", url: "/how-we-build" },
          { title: "Desarrollo de MVP", url: "/services/mvp-development" },
        ],
        suggestedQuestions: [
          "¿Cuánto cuesta un MVP?",
          "¿Cuál es su proceso de desarrollo?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 4. Experience & Track Record (Placed before pricing so "how much experience" matches Track Record!)
  {
    id: "experience-stats",
    keywords: [
      "how much experience",
      "years of experience",
      "your experience",
      "how many projects",
      "how many clients",
      "how many years",
      "ile lat doświadczenia",
      "ile projektów",
      "wie viel erfahrung",
      "wie viele projekte",
      "cuánta experiencia",
      "cuántos proyectos",
    ],
    responses: {
      en: {
        answer:
          "Hextel Tech has 3+ years of commercial software engineering experience, 2,000+ product engineering hours, and 25+ delivered platforms that have generated over $100K+ in client revenue, maintaining a 4.7 / 5.0 client satisfaction rating and 95% on-time milestone SLA.",
        sources: [
          { title: "Our Projects", url: "/projects" },
          { title: "About Hextel Tech", url: "/about" },
        ],
        suggestedQuestions: [
          "Show me your portfolio projects",
          "Who are the founders?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Hextel Tech posiada ponad 3 lata doświadczenia komercyjnego, 2,000+ godzin inżynieryjnych oraz 25+ wdrożonych produktów, które wygenerowały ponad $100K+ przychodu dla klientów przy średniej ocenie 4.7 / 5.0 i 95% terminowości SLA.",
        sources: [
          { title: "Nasze Projekty", url: "/projects" },
          { title: "O Hextel Tech", url: "/about" },
        ],
        suggestedQuestions: [
          "Pokaż Wasze projekty z portfolio",
          "Kim są założyciele?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Hextel Tech verfügt über mehr als 3 Jahre Erfahrung im Software-Engineering, 2.000+ Produktstunden und 25+ gelieferte Plattformen mit über $100K+ generiertem Kundenumsatz, einer Bewertung von 4,7 / 5,0 und 95% pünktlicher SLA-Erfüllung.",
        sources: [
          { title: "Unsere Projekte", url: "/projects" },
          { title: "Über Hextel Tech", url: "/about" },
        ],
        suggestedQuestions: [
          "Zeigen Sie mir Ihre Portfolio-Projekte",
          "Wer sind die Gründer?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Hextel Tech cuenta con más de 3 años de experiencia en ingeniería de software, 2,000+ horas de producto y más de 25 plataformas entregadas que han generado más de $100K+ en ingresos para clientes, con una calificación de 4.7 / 5.0 y 95% de cumplimiento puntual de SLA.",
        sources: [
          { title: "Nuestros Proyectos", url: "/projects" },
          { title: "Sobre Hextel Tech", url: "/about" },
        ],
        suggestedQuestions: [
          "Muéstrame sus proyectos de portafolio",
          "¿Quiénes son los fundadores?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 5. Pricing, Costs, Rates & Budgets
  {
    id: "pricing",
    keywords: [
      // EN
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
      // PL
      "koszt",
      "koszty",
      "kosztuje",
      "ile kosztuje",
      "cena",
      "ceny",
      "cennik",
      "budżet",
      "stawka",
      // DE
      "kosten",
      "kostet",
      "wie viel kostet",
      "preis",
      "preise",
      "stundensatz",
      "festpreis",
      // ES
      "costo",
      "costos",
      "cuesta",
      "cuánto cuesta",
      "cuanto cuesta",
      "precio",
      "precios",
      "tarifa",
      "tarifas",
    ],
    responses: {
      en: {
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
      },
      pl: {
        answer:
          "Ceny naszych projektów zaczynają się od $1,000 za dedykowane moduły lub sprinty UI/UX oraz $3,000–$15,000+ za kompleksowe platformy webowe/mobilne, sklepy e-commerce i MVP dla startupów. Przygotowujemy dokładną specyfikację i ofertę fixed-price w ciągu 24 godzin.",
        sources: [
          { title: "Budowa MVP", url: "/services/mvp-development" },
          { title: "Kontakt", url: "/contact" },
        ],
        suggestedQuestions: [
          "Jaki jest czas realizacji projektu?",
          "Jakie usługi oferujecie?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Unsere Projektpreise beginnen typischerweise bei $1.000 für fokussierte Module oder UI/UX-Sprints und liegen bei $3.000–$15.000+ für komplette Web-/Mobile-Plattformen, E-Commerce-Shops und Startup-MVPs. Wir erstellen innerhalb von 24 Stunden ein detailliertes Festpreisangebot.",
        sources: [
          { title: "MVP-Entwicklung", url: "/services/mvp-development" },
          { title: "Kontakt", url: "/contact" },
        ],
        suggestedQuestions: [
          "Wie sieht Ihr Entwicklungszeitplan aus?",
          "Welche Leistungen bieten Sie an?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Nuestros precios suelen comenzar desde $1,000 para módulos específicos o sprints de UI/UX, y entre $3,000 y $15,000+ para plataformas web/móviles completas, tiendas e-commerce y MVPs para startups. Entregamos propuestas de alcance y precio fijo en menos de 24 horas.",
        sources: [
          { title: "Desarrollo de MVP", url: "/services/mvp-development" },
          { title: "Contacto", url: "/contact" },
        ],
        suggestedQuestions: [
          "¿Cuál es el tiempo de entrega?",
          "¿Qué servicios ofrecen?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 5. How We Build / Development Process
  {
    id: "how-we-build",
    keywords: [
      // EN
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
      // PL
      "jak budujemy",
      "proces tworzenia",
      "proces realizacji",
      "metodologia",
      "etapy",
      "jak zacząć",
      // DE
      "wie wir bauen",
      "entwicklungsprozess",
      "methodik",
      "ablauf",
      "phasen",
      "wie starten wir",
      // ES
      "cómo construimos",
      "como construimos",
      "proceso de desarrollo",
      "metodología",
      "etapas",
      "cómo empezamos",
    ],
    responses: {
      en: {
        answer:
          "We follow a disciplined 4-phase engineering framework: 01. Discovery & Blueprint (system architecture, data models & roadmap), 02. Experience & Design (Figma design systems & interactive prototypes), 03. High-Performance Engineering (Next.js 15, React 19, TypeScript & scalable APIs), and 04. Verification & Evolution (Lighthouse 95+ audits, automated CI/CD & 24/7 SLA support).",
        sources: [
          { title: "How We Build", url: "/how-we-build" },
          { title: "Start a Project", url: "/contact" },
        ],
        suggestedQuestions: [
          "What is your development timeline?",
          "How much does an MVP cost?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Pracujemy według sprawdzonego, 4-etapowego procesu inżynieryjnego: 01. Discovery & Architektura (specyfikacja techniczna, modele danych i mapa drogowa), 02. UX/UI & Prototypowanie (systemy designu w Figma), 03. Inżynieria Full-Stack (Next.js 15, React 19, TypeScript i skalowalne API) oraz 04. Weryfikacja & Wdrożenie (audyty Lighthouse 95+, automatyczne CI/CD i wsparcie SLA 24/7).",
        sources: [
          { title: "Jak budujemy", url: "/how-we-build" },
          { title: "Rozpocznij projekt", url: "/contact" },
        ],
        suggestedQuestions: [
          "Jaki jest czas realizacji projektu?",
          "Ile kosztuje budowa MVP?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Wir arbeiten nach einem strukturierten 4-Phasen-Engineering-Framework: 01. Discovery & Architektur (Systemspezifikation, Datenmodelle & Roadmap), 02. Experience & Design (Figma-Designsysteme & interaktive Prototypen), 03. High-Performance Engineering (Next.js 15, React 19, TypeScript & APIs) und 04. Verifizierung & Evolution (Lighthouse 95+ Audits, CI/CD & 24/7 SLA-Support).",
        sources: [
          { title: "Wie wir bauen", url: "/how-we-build" },
          { title: "Projekt starten", url: "/contact" },
        ],
        suggestedQuestions: [
          "Wie sieht Ihr Entwicklungszeitplan aus?",
          "Wie viel kostet ein MVP?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Seguimos una metodología de ingeniería de 4 fases: 01. Descubrimiento y Arquitectura (especificaciones, modelos de datos y hoja de ruta), 02. Experiencia y Diseño (sistemas de diseño en Figma y prototipos interactivos), 03. Ingeniería de Alto Rendimiento (Next.js 15, React 19, TypeScript y APIs escalables) y 04. Verificación y Evolución (auditorías Lighthouse 95+, CI/CD automatizado y soporte SLA 24/7).",
        sources: [
          { title: "Cómo construimos", url: "/how-we-build" },
          { title: "Iniciar proyecto", url: "/contact" },
        ],
        suggestedQuestions: [
          "¿Cuál es el tiempo de entrega?",
          "¿Cuánto cuesta un MVP?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 6. Client Reviews, Testimonials & Track Record
  {
    id: "client-reviews",
    keywords: [
      // EN
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
      // PL
      "opinie klientów",
      "opinie",
      "rekomendacje",
      "referencje",
      "oceny",
      // DE
      "kundenbewertungen",
      "bewertungen",
      "referenzen",
      "kundenstimmen",
      // ES
      "reseñas de clientes",
      "reseñas",
      "testimonios",
      "opiniones",
      "calificaciones",
    ],
    responses: {
      en: {
        answer:
          "Hextel Tech holds a 4.7 / 5.0 average client rating across 25+ delivered products, with a 95% on-time milestone SLA, 90% repeat & retainer rate, and $100K+ in client revenue generated. Every engagement includes direct founder access, shared GitHub repositories, and 100% IP ownership.",
        sources: [
          { title: "Client Reviews & Metrics", url: "/reviews" },
          { title: "Our Projects", url: "/projects" },
        ],
        suggestedQuestions: [
          "Show me your portfolio projects",
          "Who are the founders?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Hextel Tech posiada średnią ocenę 4.7 / 5.0 na podstawie 25+ wdrożonych produktów, 95% terminowości kamieni milowych SLA, 90% powracających klientów oraz $100K+ wygenerowanego przychodu dla klientów. Każda współpraca gwarantuje bezpośredni kontakt z założycielami i 100% własności kodu.",
        sources: [
          { title: "Opinie i Wyniki", url: "/reviews" },
          { title: "Nasze Projekty", url: "/projects" },
        ],
        suggestedQuestions: [
          "Pokaż Wasze projekty z portfolio",
          "Kim są założyciele?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Hextel Tech erreicht eine durchschnittliche Kundenbewertung von 4,7 / 5,0 über 25+ gelieferte Produkte, mit 95% pünktlicher Meilenstein-SLA, 90% Folgeauftragsquote und über $100K+ generiertem Kundenumsatz. Sie arbeiten direkt mit unseren Gründern und behalten 100% der Code- und IP-Rechte.",
        sources: [
          { title: "Kundenbewertungen", url: "/reviews" },
          { title: "Unsere Projekte", url: "/projects" },
        ],
        suggestedQuestions: [
          "Zeigen Sie mir Ihre Portfolio-Projekte",
          "Wer sind die Gründer?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Hextel Tech cuenta con una calificación promedio de 4.7 / 5.0 en más de 25 productos entregados, con un 95% de cumplimiento puntual de SLA, 90% de tasa de retención y más de $100K+ en ingresos generados para clientes. Garantizamos trato directo con los fundadores y 100% de propiedad del código.",
        sources: [
          { title: "Reseñas de Clientes", url: "/reviews" },
          { title: "Nuestros Proyectos", url: "/projects" },
        ],
        suggestedQuestions: [
          "Muéstrame sus proyectos de portafolio",
          "¿Quiénes son los fundadores?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 7. Founders, Leadership & Team
  {
    id: "founders-team",
    keywords: [
      // EN
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
      // PL
      "założyciele",
      "współzałożyciele",
      "zespół",
      "kto założył",
      // DE
      "gründer",
      "mitgründer",
      "leitung",
      // ES
      "fundadores",
      "cofundadores",
      "equipo",
      "quiénes son los fundadores",
    ],
    responses: {
      en: {
        answer:
          "Hextel Tech was built by 3 co-founders and engineers: Hasaan Ahmad (CEO & Business Development), Muhammad Faseeh Altaf (Marketing Expert & Full-Stack Developer), and Moman Salman (Full-Stack Developer & AI Automation Expert). You collaborate directly with our founding engineers—zero corporate bureaucracy.",
        sources: [
          { title: "About Hextel Tech", url: "/about" },
          { title: "Contact Our Team", url: "/contact" },
        ],
        suggestedQuestions: [
          "What services do you offer?",
          "Show me your portfolio projects",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Hextel Tech tworzy 3 współzałożycieli i inżynierów: Hasaan Ahmad (CEO & Business Development), Muhammad Faseeh Altaf (Ekspert Marketingu & Full-Stack Developer) oraz Moman Salman (Full-Stack Developer & Ekspert Automatyzacji AI). Współpracujesz bezpośrednio z założycielami budującymi Twoje oprogramowanie.",
        sources: [
          { title: "O Hextel Tech", url: "/about" },
          { title: "Kontakt z Zespołem", url: "/contact" },
        ],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Pokaż Wasze projekty z portfolio",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Hextel Tech wurde von 3 Mitgründern und Ingenieuren aufgebaut: Hasaan Ahmad (CEO & Business Development), Muhammad Faseeh Altaf (Marketing-Experte & Full-Stack-Entwickler) und Moman Salman (Full-Stack-Entwickler & KI-Automatisierungsexperte). Sie arbeiten direkt mit den Gründern zusammen – ohne Bürokratie.",
        sources: [
          { title: "Über Hextel Tech", url: "/about" },
          { title: "Team kontaktieren", url: "/contact" },
        ],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Zeigen Sie mir Ihre Portfolio-Projekte",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Hextel Tech fue fundada por 3 ingenieros cofundadores: Hasaan Ahmad (CEO y Desarrollo de Negocios), Muhammad Faseeh Altaf (Experto en Marketing y Desarrollador Full-Stack) y Moman Salman (Desarrollador Full-Stack y Experto en Automatización con IA). Colaboras directamente con los fundadores sin burocracia.",
        sources: [
          { title: "Sobre Hextel Tech", url: "/about" },
          { title: "Contactar al Equipo", url: "/contact" },
        ],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "Muéstrame sus proyectos de portafolio",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 8. General Portfolio & Case Studies
  {
    id: "portfolio",
    keywords: [
      // EN
      "portfolio",
      "case study",
      "case studies",
      "projects",
      "past work",
      "previous work",
      "examples",
      "our projects",
      "saas",
      // PL
      "projekty",
      "nasze projekty",
      "realizacje",
      // DE
      "fallstudien",
      "fallstudie",
      "projekte",
      "unsere projekte",
      // ES
      "portafolio",
      "casos de estudio",
      "proyectos",
      "nuestros proyectos",
    ],
    responses: {
      en: {
        answer:
          "We have delivered 25+ production platforms generating over $100K+ in client revenue. Our portfolio includes proprietary in-house SaaS platforms like Job Hunt Copilot (autonomous AI career command center) and TraceLens (high-throughput telemetry & observability engine), alongside client e-commerce platforms like Nayyab Jewellers and Al Moman Frozen Foods.",
        sources: [
          { title: "Our Projects", url: "/projects" },
          { title: "Client Reviews", url: "/reviews" },
        ],
        suggestedQuestions: [
          "Tell me about Job Hunt Copilot",
          "Tell me about the Nayyab Jewellers case study",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Wdrożyliśmy ponad 25 platform produkcyjnych, które wygenerowały ponad $100K+ przychodu dla klientów. Nasze portfolio obejmuje własne platformy SaaS — Job Hunt Copilot (autonomiczne centrum kariery AI) i TraceLens (silnik telemetrii i obserwowalności) — oraz platformy e-commerce takie jak Nayyab Jewellers i Al Moman Frozen Foods.",
        sources: [
          { title: "Nasze Projekty", url: "/projects" },
          { title: "Opinie Klientów", url: "/reviews" },
        ],
        suggestedQuestions: [
          "Opowiedz o Job Hunt Copilot",
          "Opowiedz o projekcie Nayyab Jewellers",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Wir haben über 25 Produktionsplattformen geliefert und mehr als $100K+ Kundenumsatz generiert. Unser Portfolio umfasst eigene SaaS-Plattformen wie Job Hunt Copilot (autonomes KI-Karriere-Command-Center) und TraceLens (Telemetrie- & Observability-Engine) sowie E-Commerce-Plattformen wie Nayyab Jewellers und Al Moman Frozen Foods.",
        sources: [
          { title: "Unsere Projekte", url: "/projects" },
          { title: "Kundenbewertungen", url: "/reviews" },
        ],
        suggestedQuestions: [
          "Erzählen Sie mir von Job Hunt Copilot",
          "Erzählen Sie mir von Nayyab Jewellers",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Hemos entregado más de 25 plataformas en producción generando más de $100K+ en ingresos para nuestros clientes. Nuestro portafolio incluye plataformas SaaS propias como Job Hunt Copilot (centro de comando profesional con IA) y TraceLens (motor de telemetría y observabilidad), además de plataformas e-commerce como Nayyab Jewellers y Al Moman Frozen Foods.",
        sources: [
          { title: "Nuestros Proyectos", url: "/projects" },
          { title: "Reseñas de Clientes", url: "/reviews" },
        ],
        suggestedQuestions: [
          "Háblame sobre Job Hunt Copilot",
          "Háblame del caso Nayyab Jewellers",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "sklep internetowy",
      "sklepy internetowe",
      "onlineshop",
      "tienda online",
      "comercio electrónico",
    ],
    responses: {
      en: {
        answer:
          "Yes! At Hextel Tech, we engineer custom, high-converting e-commerce platforms (such as Nayyab Jewellers and Al Moman Frozen Foods). We build responsive product catalogs, dynamic filtering, real-time order tracking, secure checkout gateways (Stripe/PayPal), and inventory dashboards.",
        sources: [
          { title: "Our Projects", url: "/projects" },
          { title: "Web Application Development", url: "/services/web-application-development" },
        ],
        suggestedQuestions: [
          "How much does an e-commerce platform cost?",
          "Tell me about the Nayyab Jewellers case study",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Tak! W Hextel Tech tworzymy dedykowane, wysokokonwertujące platformy e-commerce (jak Nayyab Jewellers czy Al Moman Frozen Foods). Budujemy responsywne katalogi produktów, dynamiczne filtry, śledzenie zamówień na żywo, bezpieczne płatności (Stripe/PayPal) i panele magazynowe.",
        sources: [
          { title: "Nasze Projekty", url: "/projects" },
          { title: "Aplikacje Webowe", url: "/services/web-application-development" },
        ],
        suggestedQuestions: [
          "Ile kosztuje platforma e-commerce?",
          "Opowiedz o projekcie Nayyab Jewellers",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Ja! Bei Hextel Tech entwickeln wir maßgeschneiderte, konversionsstarke E-Commerce-Plattformen (wie Nayyab Jewellers und Al Moman Frozen Foods) mit schnellen Produktkatalogen, dynamischen Filtern, Live-Bestellverfolgung, sicheren Zahlungsgateways (Stripe/PayPal) und Inventar-Dashboards.",
        sources: [
          { title: "Unsere Projekte", url: "/projects" },
          { title: "Webanwendungs-Entwicklung", url: "/services/web-application-development" },
        ],
        suggestedQuestions: [
          "Wie viel kostet eine E-Commerce-Plattform?",
          "Erzählen Sie mir von Nayyab Jewellers",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "¡Sí! En Hextel Tech desarrollamos plataformas e-commerce personalizadas de alta conversión (como Nayyab Jewellers y Al Moman Frozen Foods), con catálogos responsivos, filtros dinámicos, seguimiento de pedidos en vivo, pasarelas de pago seguras (Stripe/PayPal) y paneles de inventario.",
        sources: [
          { title: "Nuestros Proyectos", url: "/projects" },
          { title: "Desarrollo Web", url: "/services/web-application-development" },
        ],
        suggestedQuestions: [
          "¿Cuánto cuesta una plataforma e-commerce?",
          "Háblame del caso Nayyab Jewellers",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 10. Web & App Development
  {
    id: "web-and-app-dev",
    keywords: [
      // EN
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
      // PL
      "aplikacje web i mobile",
      "aplikacje webowe",
      "strony internetowe",
      "oprogramowanie dedykowane",
      // DE
      "web- & app-entwicklung",
      "webentwicklung",
      "webanwendungen",
      "web-plattformen",
      "individualsoftware",
      // ES
      "desarrollo web y apps",
      "desarrollo web",
      "aplicaciones web",
      "plataformas web",
      "software a medida",
    ],
    responses: {
      en: {
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
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Projektujemy ultraszybkie, skalowalne aplikacje webowe, systemy ERP oraz wieloplatformowe aplikacje mobilne i desktopowe w oparciu o Next.js 15, React 19, TypeScript, Node.js, Python oraz React Native/Flutter — zoptymalizowane pod kątem wydajności Lighthouse 95+ i najwyższego bezpieczeństwa.",
        sources: [
          { title: "Aplikacje Webowe", url: "/services/web-application-development" },
          { title: "Aplikacje Mobilne", url: "/services/mobile-app-development" },
          { title: "Wszystkie 17 Usług", url: "/services" },
        ],
        suggestedQuestions: [
          "Ile kosztuje budowa MVP?",
          "Jaki jest czas realizacji projektu?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Wir entwickeln blitzschnelle, skalierbare Webanwendungen, Enterprise-ERP-Systeme sowie plattformübergreifende Mobile- und Desktop-Apps mit Next.js 15, React 19, TypeScript, Node.js, Python und React Native/Flutter – optimiert für Ladezeiten unter einer Sekunde und Lighthouse-Scores über 95.",
        sources: [
          { title: "Webanwendungs-Entwicklung", url: "/services/web-application-development" },
          { title: "Mobile App-Entwicklung", url: "/services/mobile-app-development" },
          { title: "Alle 17 Leistungen", url: "/services" },
        ],
        suggestedQuestions: [
          "Wie viel kostet ein MVP?",
          "Wie sieht Ihr Entwicklungszeitplan aus?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Desarrollamos aplicaciones web ultrarrápidas y escalables, sistemas ERP empresariales y aplicaciones móviles y de escritorio multiplataforma utilizando Next.js 15, React 19, TypeScript, Node.js, Python y React Native/Flutter, optimizadas para puntuaciones Lighthouse 95+ y máxima seguridad.",
        sources: [
          { title: "Desarrollo de Aplicaciones Web", url: "/services/web-application-development" },
          { title: "Desarrollo de Apps Móviles", url: "/services/mobile-app-development" },
          { title: "Los 17 Servicios", url: "/services" },
        ],
        suggestedQuestions: [
          "¿Cuánto cuesta un MVP?",
          "¿Cuál es el tiempo de entrega?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "aplikacje mobilne",
      "aplikacja mobilna",
      "mobile-apps",
      "apps móviles",
      "aplicaciones móviles",
    ],
    responses: {
      en: {
        answer:
          "Yes, we build reactive, cross-platform mobile applications for iOS and Android using React Native and Flutter. Our apps feature smooth 60fps native performance, offline data sync, push notifications, and secure backend API integrations.",
        sources: [
          { title: "Mobile App Development", url: "/services/mobile-app-development" },
        ],
        suggestedQuestions: [
          "What is your mobile development timeline?",
          "How much does a mobile app cost?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Tak, tworzymy wydajne, wieloplatformowe aplikacje mobilne na systemy iOS i Android przy użyciu React Native i Flutter. Nasze aplikacje zapewniają płynność 60fps, synchronizację offline, powiadomienia push oraz bezpieczne integracje z API.",
        sources: [
          { title: "Aplikacje Mobilne", url: "/services/mobile-app-development" },
        ],
        suggestedQuestions: [
          "Jaki jest czas realizacji projektu?",
          "Ile kosztuje budowa MVP?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Ja, wir entwickeln reaktive, plattformübergreifende Mobile-Apps für iOS und Android mit React Native und Flutter – inklusive flüssiger 60fps-Performance, Offline-Synchronisation, Push-Benachrichtigungen und sicherer Backend-Integration.",
        sources: [
          { title: "Mobile App-Entwicklung", url: "/services/mobile-app-development" },
        ],
        suggestedQuestions: [
          "Wie sieht Ihr Entwicklungszeitplan aus?",
          "Wie viel kostet ein MVP?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Sí, creamos aplicaciones móviles multiplataforma para iOS y Android con React Native y Flutter, con rendimiento nativo a 60fps, sincronización offline, notificaciones push e integraciones seguras de backend.",
        sources: [
          { title: "Desarrollo de Apps Móviles", url: "/services/mobile-app-development" },
        ],
        suggestedQuestions: [
          "¿Cuál es el tiempo de entrega?",
          "¿Cuánto cuesta un MVP?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "sztuczna inteligencja",
      "agenci ai",
      "automatyzacja ai",
      "künstliche intelligenz",
      "ki-agenten",
      "ki",
      "inteligencia artificial",
      "agentes de ia",
    ],
    responses: {
      en: {
        answer:
          "Yes! We build custom AI agents, autonomous copilots, RAG vector search pipelines (with pgvector, Gemini, and OpenAI), and AI workflow automations—and we can seamlessly integrate them into your existing web or mobile application.",
        sources: [
          { title: "Custom AI Agents & Copilots", url: "/services/custom-ai-agents" },
          { title: "AI Workflow Automation", url: "/services/ai-workflow-automation" },
        ],
        suggestedQuestions: [
          "Tell me about Job Hunt Copilot",
          "What is your development process?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Tak! Budujemy dedykowanych agentów AI, autonomiczne copiloty, systemy wyszukiwania wektorowego RAG (pgvector, Gemini, OpenAI) oraz automatyzację procesów biznesowych AI — i integrujemy je z Twoją aplikacją webową lub mobilną.",
        sources: [
          { title: "Agenci AI i Copiloty", url: "/services/custom-ai-agents" },
          { title: "Automatyzacja Procesów AI", url: "/services/ai-workflow-automation" },
        ],
        suggestedQuestions: [
          "Opowiedz o Job Hunt Copilot",
          "Jak wygląda proces tworzenia?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Ja! Wir entwickeln maßgeschneiderte KI-Agenten, autonome Copiloten, RAG-Vektorsuchpipelines (mit pgvector, Gemini und OpenAI) sowie KI-Workflow-Automatisierungen und integrieren diese nahtlos in Ihre bestehenden Systeme.",
        sources: [
          { title: "Individuelle KI-Agenten", url: "/services/custom-ai-agents" },
          { title: "KI-Workflow-Automatisierung", url: "/services/ai-workflow-automation" },
        ],
        suggestedQuestions: [
          "Erzählen Sie mir von Job Hunt Copilot",
          "Wie läuft Ihr Entwicklungsprozess ab?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "¡Sí! Desarrollamos agentes de IA personalizados, copilotos autónomos, pipelines de búsqueda vectorial RAG (con pgvector, Gemini y OpenAI) y automatización de flujos de trabajo con IA, integrándolos directamente en tu aplicación web o móvil.",
        sources: [
          { title: "Agentes de IA y Copilotos", url: "/services/custom-ai-agents" },
          { title: "Automatización con IA", url: "/services/ai-workflow-automation" },
        ],
        suggestedQuestions: [
          "Háblame sobre Job Hunt Copilot",
          "¿Cuál es su proceso de desarrollo?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "modernizacja",
      "migracja",
      "chmura",
      "modernisierung",
      "modernización",
      "migración",
    ],
    responses: {
      en: {
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
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Modernizujemy starsze systemy monolityczne do ultraszybkich architektur Next.js 15 i chmurowych, osiągających wyniki 95+ w Google Lighthouse i czasy ładowania poniżej sekundy, wraz z automatyzacją CI/CD, Docker/Kubernetes i monitoringiem 24/7.",
        sources: [
          { title: "Modernizacja Oprogramowania", url: "/services/legacy-software-modernization" },
          { title: "DevOps i CI/CD", url: "/services/devops-ci-cd" },
          { title: "Jak budujemy", url: "/how-we-build" },
        ],
        suggestedQuestions: [
          "Jakiego stacku technologicznego używacie?",
          "Ile kosztuje budowa MVP?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Wir modernisieren Legacy-Systeme zu hochperformanten Next.js 15- und Cloud-nativen Architekturen mit 95+ Google Lighthouse-Scores, Ladezeiten unter einer Sekunde, automatisierten CI/CD-Pipelines, Docker/Kubernetes und 24/7-Monitoring.",
        sources: [
          { title: "Legacy-Modernisierung", url: "/services/legacy-software-modernization" },
          { title: "DevOps & CI/CD", url: "/services/devops-ci-cd" },
          { title: "Wie wir bauen", url: "/how-we-build" },
        ],
        suggestedQuestions: [
          "Welchen Tech-Stack nutzen Sie?",
          "Wie viel kostet ein MVP?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Modernizamos sistemas heredados hacia arquitecturas ultrarrápidas con Next.js 15 y nube nativa, logrando puntuaciones de 95+ en Google Lighthouse, tiempos de carga menores a un segundo, pipelines CI/CD automatizados, Docker/Kubernetes y observabilidad 24/7.",
        sources: [
          { title: "Modernización de Software", url: "/services/legacy-software-modernization" },
          { title: "DevOps y CI/CD", url: "/services/devops-ci-cd" },
          { title: "Cómo construimos", url: "/how-we-build" },
        ],
        suggestedQuestions: [
          "¿Qué tecnologías utilizan?",
          "¿Cuánto cuesta un MVP?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "technologie",
      "stack technologiczny",
      "technologien",
      "tecnologías",
    ],
    responses: {
      en: {
        answer:
          "Our core engineering stack includes Next.js 15, React 19, TypeScript, Tailwind CSS, Node.js, Python (FastAPI/Django), PostgreSQL (Neon/Supabase with pgvector), React Native, Flutter, and cloud infrastructure on AWS, Vercel, and Docker.",
        sources: [
          { title: "How We Build", url: "/how-we-build" },
          { title: "Services", url: "/services" },
        ],
        suggestedQuestions: [
          "Can you build web applications?",
          "Do you provide dedicated developers?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Nasz główny stack inżynieryjny obejmuje Next.js 15, React 19, TypeScript, Tailwind CSS, Node.js, Python (FastAPI/Django), PostgreSQL (Neon/Supabase z pgvector), React Native, Flutter oraz infrastrukturę chmurową AWS, Vercel i Docker.",
        sources: [
          { title: "Jak budujemy", url: "/how-we-build" },
          { title: "Usługi", url: "/services" },
        ],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Czy oferujecie dedykowanych programistów?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Unser Kern-Tech-Stack umfasst Next.js 15, React 19, TypeScript, Tailwind CSS, Node.js, Python (FastAPI/Django), PostgreSQL (Neon/Supabase mit pgvector), React Native, Flutter sowie Cloud-Infrastruktur auf AWS, Vercel und Docker.",
        sources: [
          { title: "Wie wir bauen", url: "/how-we-build" },
          { title: "Leistungen", url: "/services" },
        ],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Bieten Sie dedizierte Entwickler an?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Nuestro stack tecnológico principal incluye Next.js 15, React 19, TypeScript, Tailwind CSS, Node.js, Python (FastAPI/Django), PostgreSQL (Neon/Supabase con pgvector), React Native, Flutter e infraestructura cloud en AWS, Vercel y Docker.",
        sources: [
          { title: "Cómo construimos", url: "/how-we-build" },
          { title: "Servicios", url: "/services" },
        ],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "¿Ofrecen desarrolladores dedicados?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "dedykowani programiści",
      "dedizierte entwickler",
      "desarrolladores dedicados",
    ],
    responses: {
      en: {
        answer:
          "We provide vetted senior software engineers, DevOps specialists, and UI/UX designers who integrate directly into your workflow within 48–72 hours with zero recruiting overhead and flexible monthly engagement models.",
        sources: [
          { title: "IT Staff Augmentation", url: "/services/it-staff-augmentation" },
        ],
        suggestedQuestions: [
          "What tech stacks do you cover?",
          "How quickly can we onboard developers?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Zapewniamy sprawdzonych starszych inżynierów oprogramowania, specjalistów DevOps oraz projektantów UI/UX, którzy dołączają bezpośrednio do Twojego zespołu w 48–72 godziny bez kosztów rekrutacji i w elastycznym modelu rozliczeń.",
        sources: [
          { title: "IT Staff Augmentation", url: "/services/it-staff-augmentation" },
        ],
        suggestedQuestions: [
          "Jakiego stacku technologicznego używacie?",
          "Jaki jest czas realizacji projektu?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Wir stellen geprüfte Senior-Softwareentwickler, DevOps-Spezialisten und UI/UX-Designer bereit, die sich innerhalb von 48–72 Stunden nahtlos und ohne Recruiting-Aufwand in Ihr Team integrieren.",
        sources: [
          { title: "IT-Staff-Augmentation", url: "/services/it-staff-augmentation" },
        ],
        suggestedQuestions: [
          "Welchen Tech-Stack nutzen Sie?",
          "Wie sieht Ihr Entwicklungszeitplan aus?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Proporcionamos ingenieros de software sénior, especialistas DevOps y diseñadores UI/UX verificados que se integran directamente en tu equipo en 48 a 72 horas, sin costos de reclutamiento y con modelos flexibles.",
        sources: [
          { title: "IT Staff Augmentation", url: "/services/it-staff-augmentation" },
        ],
        suggestedQuestions: [
          "¿Qué tecnologías utilizan?",
          "¿Cuál es el tiempo de entrega?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "poufność",
      "bezpieczeństwo",
      "geheimhaltung",
      "sicherheit",
      "confidencialidad",
      "seguridad",
    ],
    responses: {
      en: {
        answer:
          "Yes, absolutely. We gladly sign Non-Disclosure Agreements (NDAs) before reviewing any proprietary specs, wireframes, or business logic. You retain 100% ownership of all source code, repositories, and intellectual property.",
        sources: [
          { title: "Security & Compliance", url: "/security-and-compliance" },
          { title: "Cybersecurity Audits", url: "/services/cybersecurity-compliance" },
        ],
        suggestedQuestions: [
          "How do we start a project?",
          "How much does an MVP cost?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Tak, oczywiście. Chętnie podpisujemy umowy o zachowaniu poufności (NDA) przed zapoznaniem się z dokumentacją czy logiką biznesową. Zachowujesz 100% praw własności intelektualnej (IP) oraz pełny kod źródłowy.",
        sources: [
          { title: "Bezpieczeństwo i Compliance", url: "/security-and-compliance" },
          { title: "Audyty Cyberbezpieczeństwa", url: "/services/cybersecurity-compliance" },
        ],
        suggestedQuestions: [
          "Jak wygląda proces tworzenia?",
          "Ile kosztuje budowa MVP?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Ja, selbstverständlich. Wir unterzeichnen gerne Geheimhaltungsvereinbarungen (NDAs), bevor wir vertrauliche Spezifikationen oder Geschäftslogik prüfen. Sie behalten 100% der Eigentumsrechte an Quellcode und geistigem Eigentum (IP).",
        sources: [
          { title: "Sicherheit & Compliance", url: "/security-and-compliance" },
          { title: "Cybersecurity-Audits", url: "/services/cybersecurity-compliance" },
        ],
        suggestedQuestions: [
          "Wie läuft Ihr Entwicklungsprozess ab?",
          "Wie viel kostet ein MVP?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Sí, por supuesto. Firmamos acuerdos de confidencialidad (NDA) antes de revisar cualquier especificación o lógica de negocio. Conservas el 100% de la propiedad intelectual y del código fuente.",
        sources: [
          { title: "Seguridad y Cumplimiento", url: "/security-and-compliance" },
          { title: "Auditorías de Ciberseguridad", url: "/services/cybersecurity-compliance" },
        ],
        suggestedQuestions: [
          "¿Cuál es su proceso de desarrollo?",
          "¿Cuánto cuesta un MVP?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "utrzymanie",
      "wsparcie",
      "wartung",
      "mantenimiento",
      "soporte",
    ],
    responses: {
      en: {
        answer:
          "Yes, we offer dedicated post-launch maintenance and SLA tiers covering 24/7 uptime monitoring, security patching, performance audits, and continuous feature development as your product scales.",
        sources: [
          { title: "Server & Cloud Infrastructure", url: "/services/server-cloud-infrastructure" },
          { title: "How We Build", url: "/how-we-build" },
        ],
        suggestedQuestions: [
          "What services do you offer?",
          "How much does an MVP cost?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Tak, oferujemy dedykowane pakiety utrzymaniowe i umowy SLA po wdrożeniu, obejmujące monitoring dostępności 24/7, aktualizacje bezpieczeństwa, audyty wydajności oraz ciągły rozwój nowych funkcji.",
        sources: [
          { title: "Infrastruktura Chmurowa", url: "/services/server-cloud-infrastructure" },
          { title: "Jak budujemy", url: "/how-we-build" },
        ],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Ile kosztuje budowa MVP?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Ja, wir bieten dedizierte Post-Launch-Wartung und SLA-Pakete mit 24/7-Uptime-Monitoring, Sicherheitsupdates, Performance-Audits und kontinuierlicher Weiterentwicklung.",
        sources: [
          { title: "Server & Cloud-Infrastruktur", url: "/services/server-cloud-infrastructure" },
          { title: "Wie wir bauen", url: "/how-we-build" },
        ],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Wie viel kostet ein MVP?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Sí, ofrecemos planes de mantenimiento post-lanzamiento y acuerdos SLA con monitoreo 24/7, parches de seguridad, auditorías de rendimiento y desarrollo continuo de nuevas funcionalidades.",
        sources: [
          { title: "Infraestructura Cloud", url: "/services/server-cloud-infrastructure" },
          { title: "Cómo construimos", url: "/how-we-build" },
        ],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "¿Cuánto cuesta un MVP?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 18. Services Overview
  {
    id: "services-overview",
    keywords: [
      // EN
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
      // PL
      "usługi",
      "usługa",
      "jakie usługi oferujecie",
      "co oferujecie",
      "czym się zajmujecie",
      // DE
      "leistungen",
      "welche leistungen",
      "was bieten sie an",
      // ES
      "servicios",
      "qué servicios ofrecen",
      "que servicios ofrecen",
      "qué hacen",
    ],
    responses: {
      en: {
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
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Oferujemy 17 wyspecjalizowanych usług inżynieryjnych w 3 filarach: 1. Dedykowane Aplikacje i Oprogramowanie (Aplikacje Webowe Full-Stack, Aplikacje Mobilne iOS/Android, Aplikacje Desktopowe, Systemy ERP), 2. Chmura, DevOps i AI (Agenci AI i Copiloty, Automatyzacja Procesów AI, Infrastruktura Chmurowa, CI/CD, UI/UX Design, Modernizacja Systemów) oraz 3. Talent i Inżynieria (Budowa MVP dla Startupów w 2–6 tygodni, IT Staff Augmentation, Inżynieria Danych, API, QA i Cyberbezpieczeństwo).",
        sources: [
          { title: "Wszystkie 17 Usług", url: "/services" },
          { title: "Budowa MVP", url: "/services/mvp-development" },
          { title: "Agenci AI", url: "/services/custom-ai-agents" },
        ],
        suggestedQuestions: [
          "Ile kosztuje budowa MVP?",
          "Pokaż Wasze projekty z portfolio",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Wir bieten 17 spezialisierte Engineering-Leistungen in 3 Kernbereichen: 1. Custom Apps & Software (Full-Stack-Web-Apps, iOS/Android Mobile Apps, Desktop-Apps, ERP-Systeme), 2. Cloud, DevOps & KI (Individuelle KI-Agenten & Copiloten, KI-Workflow-Automatisierung, Cloud-Infrastruktur, CI/CD, UI/UX-Design, Legacy-Modernisierung) und 3. Talent & Core Engineering (Startup-MVP-Entwicklung in 2–6 Wochen, IT-Staff-Augmentation, Data Engineering, APIs, QA & Cybersecurity).",
        sources: [
          { title: "Alle 17 Leistungen", url: "/services" },
          { title: "MVP-Entwicklung", url: "/services/mvp-development" },
          { title: "KI-Agenten", url: "/services/custom-ai-agents" },
        ],
        suggestedQuestions: [
          "Wie viel kostet ein MVP?",
          "Zeigen Sie mir Ihre Portfolio-Projekte",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "Ofrecemos 17 servicios especializados de ingeniería en 3 pilares: 1. Apps y Software a Medida (Aplicaciones Web Full-Stack, Apps Móviles iOS/Android, Apps de Escritorio, Sistemas ERP), 2. Nube, DevOps e IA (Agentes de IA y Copilotos, Automatización con IA, Infraestructura Cloud, CI/CD, Diseño UI/UX, Modernización de Sistemas) y 3. Talento e Ingeniería Base (Desarrollo de MVP para Startups en 2–6 semanas, IT Staff Augmentation, Ingeniería de Datos, APIs, QA y Ciberseguridad).",
        sources: [
          { title: "Los 17 Servicios", url: "/services" },
          { title: "Desarrollo de MVP", url: "/services/mvp-development" },
          { title: "Agentes de IA", url: "/services/custom-ai-agents" },
        ],
        suggestedQuestions: [
          "¿Cuánto cuesta un MVP?",
          "Muéstrame sus proyectos de portafolio",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "kontakt",
      "telefon",
      "spotkanie",
      "termin",
      "anruf",
      "contacto",
      "teléfono",
      "correo",
      "reunión",
    ],
    responses: {
      en: {
        answer: `You can reach our founding team directly by email at ${BRAND_CONFIG.email} or by phone/WhatsApp at ${BRAND_CONFIG.phone}, or visit our Contact page to schedule a discovery call within 24 hours.`,
        sources: [{ title: "Contact Hextel Tech", url: "/contact" }],
        suggestedQuestions: [
          "What services do you offer?",
          "How much does an MVP cost?",
          "Request a Quote",
        ],
      },
      pl: {
        answer: `Możesz skontaktować się bezpośrednio z naszym zespołem założycieli mailowo pod adresem ${BRAND_CONFIG.email}, telefonicznie / przez WhatsApp pod numerem ${BRAND_CONFIG.phone} lub przez stronę Kontakt, aby umówić rozmowę w ciągu 24 godzin.`,
        sources: [{ title: "Kontakt z Hextel Tech", url: "/contact" }],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Ile kosztuje budowa MVP?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer: `Sie erreichen unser Gründerteam direkt per E-Mail unter ${BRAND_CONFIG.email}, telefonisch / per WhatsApp unter ${BRAND_CONFIG.phone} oder über unsere Kontaktseite für ein Erstgespräch innerhalb von 24 Stunden.`,
        sources: [{ title: "Hextel Tech Kontakt", url: "/contact" }],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Wie viel kostet ein MVP?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer: `Puedes contactar directamente a nuestro equipo fundador por correo en ${BRAND_CONFIG.email}, por teléfono/WhatsApp al ${BRAND_CONFIG.phone} o visitar nuestra página de Contacto para agendar una llamada en menos de 24 horas.`,
        sources: [{ title: "Contactar a Hextel Tech", url: "/contact" }],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "¿Cuánto cuesta un MVP?",
          "Solicitar presupuesto",
        ],
      },
    },
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
      "what are you",
      "what is your name",
      "whats your name",
      "your name",
      "are you a bot",
      "are you ai",
      "are you human",
      "about hextel",
      "about us",
      "company",
      "hextel",
      "lokalizacja",
      "siedziba",
      "gdzie jesteście",
      "kim jesteś",
      "o nas",
      "standort",
      "wer bist du",
      "wer sind sie",
      "über uns",
      "ubicación",
      "dónde están",
      "quién eres",
      "sobre nosotros",
    ],
    responses: {
      en: {
        answer: `I'm the Hextel Assistant, the AI Digital Consultant for Hextel Tech—a digital engineering consultancy headquartered in ${BRAND_CONFIG.address} and led by co-founders Hasaan Ahmad, Muhammad Faseeh Altaf, and Moman Salman. We partner with startups and enterprises across the US, UK, Europe, and the Middle East, with 25+ delivered products and $100K+ in client revenue generated.`,
        sources: [
          { title: "About Hextel Tech", url: "/about" },
          { title: "Contact Us", url: "/contact" },
        ],
        suggestedQuestions: [
          "What services do you offer?",
          "Show me your portfolio projects",
          "Request a Quote",
        ],
      },
      pl: {
        answer: `Jestem Asystentem Hextel — cyfrowym konsultantem AI firmy Hextel Tech z siedzibą w ${BRAND_CONFIG.address}, prowadzonej przez współzałożycieli: Hasaana Ahmada, Muhammada Faseeha Altafa i Momana Salmana. Współpracujemy ze startupami i firmami z Europy, USA, Wielkiej Brytanii i Bliskiego Wschodu (25+ wdrożonych produktów i $100K+ wygenerowanego przychodu).`,
        sources: [
          { title: "O Hextel Tech", url: "/about" },
          { title: "Kontakt", url: "/contact" },
        ],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Pokaż Wasze projekty z portfolio",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer: `Ich bin der Hextel Assistent, der digitale KI-Berater von Hextel Tech – einem Digital-Engineering-Unternehmen mit Hauptsitz in ${BRAND_CONFIG.address} unter der Leitung der Mitgründer Hasaan Ahmad, Muhammad Faseeh Altaf und Moman Salman. Wir arbeiten mit Startups und Unternehmen in Europa, den USA, Großbritannien und dem Nahen Osten zusammen (25+ gelieferte Produkte, $100K+ Kundenumsatz).`,
        sources: [
          { title: "Über Hextel Tech", url: "/about" },
          { title: "Kontakt", url: "/contact" },
        ],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Zeigen Sie mir Ihre Portfolio-Projekte",
          "Angebot anfordern",
        ],
      },
      es: {
        answer: `Soy el Asistente Hextel, el consultor digital de IA de Hextel Tech, una consultora de ingeniería digital con sede en ${BRAND_CONFIG.address}, liderada por sus cofundadores Hasaan Ahmad, Muhammad Faseeh Altaf y Moman Salman. Colaboramos con startups y empresas en Europa, EE. UU., Reino Unido y Medio Oriente (25+ productos entregados y $100K+ en ingresos generados).`,
        sources: [
          { title: "Sobre Hextel Tech", url: "/about" },
          { title: "Contacto", url: "/contact" },
        ],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "Muéstrame sus proyectos de portafolio",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 21. "How are you?" & Conversational Small Talk
  {
    id: "how-are-you-smalltalk",
    keywords: [
      // EN
      "how are you",
      "how are u",
      "how r u",
      "how r you",
      "how are you doing",
      "how is it going",
      "hows it going",
      "how's it going",
      "how do you do",
      "how are things",
      "how have you been",
      "whats up",
      "what's up",
      "what is up",
      "wassup",
      "sup",
      "are you there",
      "anyone there",
      // PL
      "jak się masz",
      "jak sie masz",
      "co słychać",
      "co slychac",
      "jak leci",
      "co tam",
      "wszystko dobrze",
      // DE
      "wie geht es",
      "wie gehts",
      "wie geht's",
      "alles gut",
      "was geht",
      // ES
      "cómo estás",
      "como estas",
      "qué tal",
      "que tal",
      "cómo va",
      "como va",
      "todo bien",
    ],
    responses: {
      en: {
        answer:
          "I'm doing great, thank you for asking! I'm ready to help you explore Hextel Tech's software engineering services, project case studies, or pricing estimates. What are you looking to build today?",
        sources: [{ title: "Hextel Tech Overview", url: "/" }],
        suggestedQuestions: [
          "What services do you offer?",
          "How much does an MVP cost?",
          "Show me your portfolio projects",
        ],
      },
      pl: {
        answer:
          "Dziękuję, świetnie! Jestem gotowy, aby pomóc Ci poznać usługi programistyczne Hextel Tech, nasze projekty lub przygotować wycenę. Jaki projekt planujesz zrealizować?",
        sources: [{ title: "Przegląd Hextel Tech", url: "/" }],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Ile kosztuje budowa MVP?",
          "Pokaż Wasze projekty z portfolio",
        ],
      },
      de: {
        answer:
          "Mir geht es hervorragend, vielen Dank der Nachfrage! Ich helfe Ihnen gerne bei Fragen zu unseren Software-Engineering-Leistungen, Fallstudien oder Kostenschätzungen. Welches Projekt planen Sie?",
        sources: [{ title: "Hextel Tech Übersicht", url: "/" }],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Wie viel kostet ein MVP?",
          "Zeigen Sie mir Ihre Portfolio-Projekte",
        ],
      },
      es: {
        answer:
          "¡Todo muy bien, gracias por preguntar! Estoy listo para ayudarte a explorar los servicios de ingeniería de software de Hextel Tech, nuestros casos de estudio o presupuestos. ¿Qué proyecto tienes en mente?",
        sources: [{ title: "Resumen de Hextel Tech", url: "/" }],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "¿Cuánto cuesta un MVP?",
          "Muéstrame sus proyectos de portafolio",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 22. Assalamu Alaikum / Salam Greeting
  {
    id: "islamic-greeting",
    keywords: [
      "assalamu alaikum",
      "assalam o alaikum",
      "assalam u alaikum",
      "asalamualaikum",
      "assalamualaikum",
      "salam",
      "salaam",
      "slaam",
      "aoa",
      "wa alaikum assalam",
      "walaikum assalam",
    ],
    responses: {
      en: {
        answer:
          "Wa Alaikum Assalam! Welcome to Hextel Tech. How can I assist you today with our web & mobile development, custom AI agents, startup MVPs, or project estimates?",
        sources: [{ title: "Hextel Tech Overview", url: "/" }],
        suggestedQuestions: [
          "What services do you offer?",
          "How much does an MVP cost?",
          "Show me your portfolio projects",
        ],
      },
      pl: {
        answer:
          "Wa Alaikum Assalam! Witamy w Hextel Tech. W czym mogę Ci dzisiaj pomóc w zakresie aplikacji webowych i mobilnych, agentów AI, budowy MVP lub wyceny projektu?",
        sources: [{ title: "Przegląd Hextel Tech", url: "/" }],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Ile kosztuje budowa MVP?",
          "Pokaż Wasze projekty z portfolio",
        ],
      },
      de: {
        answer:
          "Wa Alaikum Assalam! Willkommen bei Hextel Tech. Wie kann ich Ihnen heute bei Web- und Mobile-Entwicklung, KI-Agenten, Startup-MVPs oder Projektschätzungen helfen?",
        sources: [{ title: "Hextel Tech Übersicht", url: "/" }],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Wie viel kostet ein MVP?",
          "Zeigen Sie mir Ihre Portfolio-Projekte",
        ],
      },
      es: {
        answer:
          "¡Wa Alaikum Assalam! Bienvenido a Hextel Tech. ¿Cómo puedo ayudarte hoy con desarrollo web y móvil, agentes de IA, MVPs para startups o presupuestos?",
        sources: [{ title: "Resumen de Hextel Tech", url: "/" }],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "¿Cuánto cuesta un MVP?",
          "Muéstrame sus proyectos de portafolio",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 23. General Help & Project Starter Prompts
  {
    id: "help-starter",
    keywords: [
      "can you help",
      "can you help me",
      "help me",
      "i need help",
      "need help",
      "i have a question",
      "can i ask",
      "help",
      "pomoc",
      "potrzebuję pomocy",
      "pomożesz",
      "hilfe",
      "können sie mir helfen",
      "ich brauche hilfe",
      "ayuda",
      "necesito ayuda",
      "puedes ayudarme",
    ],
    responses: {
      en: {
        answer:
          "Of course! I'd love to help. Tell me a bit about what you're looking to build—whether it's a web platform, iOS/Android mobile app, custom AI agent, e-commerce store, or startup MVP—or pick one of the topics below!",
        sources: [{ title: "All 17 Services", url: "/services" }],
        suggestedQuestions: [
          "What services do you offer?",
          "How much does an MVP cost?",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Oczywiście! Chętnie pomogę. Opowiedz krótko, co chcesz zbudować — aplikację webową, mobilną iOS/Android, agenta AI, sklep e-commerce czy MVP dla startupu — albo wybierz jeden z poniższych tematów!",
        sources: [{ title: "Wszystkie 17 Usług", url: "/services" }],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Ile kosztuje budowa MVP?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Natürlich, sehr gerne! Erzählen Sie mir kurz, was Sie entwickeln möchten – ob Webplattform, iOS-/Android-App, KI-Agent, E-Commerce-Shop oder Startup-MVP – oder wählen Sie eines der Themen unten!",
        sources: [{ title: "Alle 17 Leistungen", url: "/services" }],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Wie viel kostet ein MVP?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "¡Por supuesto, encantado de ayudarte! Cuéntame qué te gustaría construir —ya sea una plataforma web, app móvil iOS/Android, agente de IA, tienda e-commerce o MVP— o elige uno de los temas a continuación:",
        sources: [{ title: "Los 17 Servicios", url: "/services" }],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "¿Cuánto cuesta un MVP?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 24. Thanks, Appreciation & Positive Acknowledgements
  {
    id: "thanks-acknowledgement",
    keywords: [
      "thank you",
      "thanks",
      "many thanks",
      "thx",
      "tysm",
      "ty",
      "appreciate it",
      "awesome",
      "great",
      "perfect",
      "cool",
      "nice",
      "sounds good",
      "got it",
      "understood",
      "ok thanks",
      "okay thanks",
      "dziękuję",
      "dziekuje",
      "dzięki",
      "dzieki",
      "świetnie",
      "danke",
      "vielen dank",
      "dankeschön",
      "prima",
      "klasse",
      "gracias",
      "muchas gracias",
      "genial",
      "perfecto",
      "excelente",
    ],
    responses: {
      en: {
        answer:
          "You're very welcome! Let me know if you have any other questions about our services, tech stack, or pricing—we're always happy to help.",
        sources: [{ title: "Contact Us", url: "/contact" }],
        suggestedQuestions: [
          "What services do you offer?",
          "Show me your portfolio projects",
          "Request a Quote",
        ],
      },
      pl: {
        answer:
          "Cała przyjemność po mojej stronie! Daj znać, jeśli masz jeszcze jakieś pytania dotyczące naszych usług, technologii lub wyceny.",
        sources: [{ title: "Kontakt", url: "/contact" }],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Pokaż Wasze projekty z portfolio",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer:
          "Sehr gerne! Lassen Sie mich wissen, wenn Sie weitere Fragen zu unseren Leistungen, Technologien oder Preisen haben – wir helfen jederzeit gerne.",
        sources: [{ title: "Kontakt", url: "/contact" }],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Zeigen Sie mir Ihre Portfolio-Projekte",
          "Angebot anfordern",
        ],
      },
      es: {
        answer:
          "¡De nada, es un placer ayudar! Avísame si tienes cualquier otra pregunta sobre nuestros servicios, tecnologías o presupuestos.",
        sources: [{ title: "Contacto", url: "/contact" }],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "Muéstrame sus proyectos de portafolio",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 25. Goodbyes & Farewells
  {
    id: "goodbye-farewell",
    keywords: [
      "bye",
      "bye bye",
      "goodbye",
      "good bye",
      "see you",
      "see ya",
      "cya",
      "talk to you later",
      "take care",
      "have a good day",
      "have a great day",
      "good night",
      "goodnight",
      "do widzenia",
      "na razie",
      "dobranoc",
      "tschüss",
      "auf wiedersehen",
      "bis bald",
      "gute nacht",
      "adiós",
      "adios",
      "hasta luego",
      "hasta pronto",
      "chao",
      "buenas noches",
    ],
    responses: {
      en: {
        answer: `Thank you for visiting Hextel Tech! Have a wonderful day, and feel free to reach out anytime at ${BRAND_CONFIG.email} or ${BRAND_CONFIG.phone} when you're ready to build.`,
        sources: [{ title: "Contact Hextel Tech", url: "/contact" }],
        suggestedQuestions: [
          "What services do you offer?",
          "Request a Quote",
        ],
      },
      pl: {
        answer: `Dziękujemy za odwiedzenie Hextel Tech! Życzymy wspaniałego dnia i zapraszamy do kontaktu pod adresem ${BRAND_CONFIG.email} lub ${BRAND_CONFIG.phone}.`,
        sources: [{ title: "Kontakt z Hextel Tech", url: "/contact" }],
        suggestedQuestions: [
          "Jakie usługi oferujecie?",
          "Poproś o wycenę",
        ],
      },
      de: {
        answer: `Vielen Dank für Ihren Besuch bei Hextel Tech! Ich wünsche Ihnen einen großartigen Tag. Sie erreichen uns jederzeit unter ${BRAND_CONFIG.email} oder ${BRAND_CONFIG.phone}.`,
        sources: [{ title: "Hextel Tech Kontakt", url: "/contact" }],
        suggestedQuestions: [
          "Welche Leistungen bieten Sie an?",
          "Angebot anfordern",
        ],
      },
      es: {
        answer: `¡Gracias por visitar Hextel Tech! Que tengas un excelente día. Puedes contactarnos en cualquier momento en ${BRAND_CONFIG.email} o al ${BRAND_CONFIG.phone}.`,
        sources: [{ title: "Contactar a Hextel Tech", url: "/contact" }],
        suggestedQuestions: [
          "¿Qué servicios ofrecen?",
          "Solicitar presupuesto",
        ],
      },
    },
    needsHumanHandoff: false,
  },

  // 26. General Greetings (Hi, Hello, Hey, Good morning/afternoon/evening)
  {
    id: "general-greeting",
    keywords: [
      "hi",
      "hello",
      "hey",
      "hi there",
      "hello there",
      "hey there",
      "hi team",
      "hello team",
      "hey team",
      "good morning",
      "good afternoon",
      "good evening",
      "morning",
      "afternoon",
      "evening",
      "greetings",
      "howdy",
      "hiya",
      "yo",
      "cześć",
      "czesc",
      "hej",
      "dzień dobry",
      "dzien dobry",
      "dobry wieczór",
      "witam",
      "hallo",
      "guten morgen",
      "guten tag",
      "guten abend",
      "servus",
      "moin",
      "grüß gott",
      "hola",
      "buenos días",
      "buenos dias",
      "buenas tardes",
      "buenas",
    ],
    responses: GREETING_RESPONSES,
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

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: "English",
  pl: "Polish (Polski)",
  de: "German (Deutsch)",
  es: "Spanish (Español)",
};

// Query Gemini with full Hextel Tech identity, conversation context, and automatic language matching
async function generateGeminiAnswer(
  question: string,
  apiKey: string,
  targetLanguage: SupportedLanguage | "other",
  conversation: ConversationTurn[] = [],
  extraContext?: string
): Promise<string | null> {
  const langInstruction =
    targetLanguage === "other"
      ? "ALWAYS reply in the EXACT SAME LANGUAGE that the user wrote their question in."
      : `ALWAYS reply in ${LANGUAGE_NAMES[targetLanguage]} (unless the user explicitly wrote their question in a different language, in which case reply in the user's language).`;

  const systemPrompt = `You are the official AI Digital Consultant representing Hextel Tech.
Guidelines:
1. ${langInstruction}
2. ALWAYS represent Hextel Tech in the first person ("we", "our founding team", "Hextel Tech").
3. NEVER say "I am an AI and cannot build websites" or "I cannot schedule calls". Hextel Tech IS a full-stack software engineering consultancy that builds web apps, mobile apps, AI agents, e-commerce, and enterprise software.
4. Answer the user's question directly, accurately, and concisely in 2 to 4 sentences using the verified company knowledge below.
5. If the user asks for a quote, custom build, or meeting, invite them to click "Request a Quote" or contact us at ${BRAND_CONFIG.email} / ${BRAND_CONFIG.phone}.

Verified Hextel Tech Knowledge:
${HEXTEL_KNOWLEDGE_SUMMARY}
${extraContext ? `\nAdditional Retrieved Context:\n${extraContext}` : ""}`;

  const recentTurns = Array.isArray(conversation)
    ? conversation
        .filter(
          (t) => t && typeof t.content === "string" && t.content.trim().length > 0
        )
        .slice(-6)
        .map((t) => ({
          role: t.role === "assistant" ? "model" : "user",
          parts: [{ text: t.content }],
        }))
    : [];

  const contents =
    recentTurns.length > 0 &&
    recentTurns[recentTurns.length - 1].parts[0].text === question
      ? recentTurns
      : [...recentTurns, { role: "user", parts: [{ text: question }] }];

  const candidateModels = [
    {
      name: "gemini-3.5-flash-lite",
      generationConfig: {
        temperature: 0.25,
        thinkingConfig: { thinkingLevel: "MINIMAL" },
      },
    },
    {
      name: "gemini-3.1-flash-lite",
      generationConfig: {
        temperature: 0.25,
      },
    },
    {
      name: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.25,
      },
    },
  ];

  for (const model of candidateModels) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model.name}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: model.generationConfig,
          }),
        }
      );
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        const parts: Array<{ text?: string; thought?: boolean }> =
          data.candidates?.[0]?.content?.parts || [];
        const nonThoughtText = parts
          .filter((p) => !p.thought && typeof p.text === "string")
          .map((p) => p.text)
          .join("");
        const text =
          nonThoughtText ||
          parts.map((p) => p.text || "").join("");
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

// Exact UI button labels (Quick Actions & Suggested Questions) for 0ms instant response
const INSTANT_UI_BUTTON_QUERIES = new Set([
  // EN
  "web & app development",
  "how we build",
  "client reviews",
  "what services do you offer?",
  "how much does an mvp cost?",
  "show me your portfolio projects",
  "what is your development timeline?",
  "what is your development process?",
  "can we sign an nda?",
  "who are the founders?",
  "tell me about job hunt copilot",
  "tell me about tracelens",
  "tell me about the nayyab jewellers case study",
  "how much does an e-commerce platform cost?",
  "what is your mobile development timeline?",
  "how much does a mobile app cost?",
  "what tech stack do you use?",
  "can you build custom ai agents?",
  "can you build web applications?",
  "do you provide dedicated developers?",
  "what tech stacks do you cover?",
  "how quickly can we onboard developers?",
  "how do we start a project?",
  // PL
  "aplikacje web i mobile",
  "jak budujemy",
  "opinie klientów",
  "jakie usługi oferujecie?",
  "ile kosztuje budowa mvp?",
  "pokaż wasze projekty z portfolio",
  "jaki jest czas realizacji projektu?",
  "jak wygląda proces tworzenia?",
  "czy podpisujecie nda?",
  "kim są założyciele?",
  "opowiedz o job hunt copilot",
  "opowiedz o tracelens",
  "opowiedz o projekcie nayyab jewellers",
  "ile kosztuje platforma e-commerce?",
  "jakiego stacku technologicznego używacie?",
  "czy tworzycie dedykowanych agentów ai?",
  "czy oferujecie dedykowanych programistów?",
  // DE
  "web- & app-entwicklung",
  "wie wir bauen",
  "kundenbewertungen",
  "welche leistungen bieten sie an?",
  "wie viel kostet ein mvp?",
  "zeigen sie mir ihre portfolio-projekte",
  "wie sieht ihr entwicklungszeitplan aus?",
  "wie läuft ihr entwicklungsprozess ab?",
  "können wir ein nda unterzeichnen?",
  "wer sind die gründer?",
  "erzählen sie mir von job hunt copilot",
  "erzählen sie mir von tracelens",
  "erzählen sie mir von nayyab jewellers",
  "wie viel kostet eine e-commerce-plattform?",
  "welchen tech-stack nutzen sie?",
  "können sie individuelle ki-agenten entwickeln?",
  "bieten sie dedizierte entwickler an?",
  // ES
  "desarrollo web y apps",
  "cómo construimos",
  "reseñas de clientes",
  "¿qué servicios ofrecen?",
  "¿cuánto cuesta un mvp?",
  "muéstrame sus proyectos de portafolio",
  "¿cuál es el tiempo de entrega?",
  "¿cuál es su proceso de desarrollo?",
  "¿podemos firmar un nda?",
  "¿quiénes son los fundadores?",
  "háblame sobre job hunt copilot",
  "háblame sobre tracelens",
  "háblame del caso nayyab jewellers",
  "¿cuánto cuesta una plataforma e-commerce?",
  "¿qué tecnologías utilizan?",
  "¿pueden crear agentes de ia personalizados?",
  "¿ofrecen desarrolladores dedicados?",
]);

const CONVERSATIONAL_INTENT_IDS = new Set([
  "action-request",
  "how-are-you-smalltalk",
  "islamic-greeting",
  "thanks-acknowledgement",
  "goodbye-farewell",
  "general-greeting",
]);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, conversation = [], language, lang } = body;
    const rawLang = language || lang;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "A valid question string is required." },
        { status: 400 }
      );
    }

    const uiLanguage: SupportedLanguage =
      rawLang && ["en", "pl", "de", "es"].includes(rawLang)
        ? (rawLang as SupportedLanguage)
        : "en";

    const qTrimmed = question.trim();
    const qLower = qTrimmed.toLowerCase();

    const detectedLang = detectQueryLanguage(qTrimmed, uiLanguage);
    const activeLang: SupportedLanguage =
      detectedLang === "other" ? uiLanguage : detectedLang;

    // 1. Instant Pure Greeting Filter (0ms delay) in all supported languages
    if (
      detectedLang !== "other" &&
      /^(hi|hello|hey|hi\s+there|hello\s+there|hey\s+there|howdy|hiya|yo|greetings|good\s+morning|good\s+afternoon|good\s+evening|morning|afternoon|evening|cześć|czesc|hej|dzień\s+dobry|dzien\s+dobry|dobry\s+wieczór|witam|hallo|guten\s+morgen|guten\s+tag|guten\s+abend|servus|moin|hola|buenos\s+días|buenos\s+dias|buenas\s+tardes|buenas)([!.,?\s]*)$/iu.test(
        qTrimmed
      )
    ) {
      const greet = GREETING_RESPONSES[activeLang] || GREETING_RESPONSES.en;
      return NextResponse.json({
        answer: greet.answer,
        sources: greet.sources,
        suggestedQuestions: greet.suggestedQuestions,
        needsHumanHandoff: false,
      });
    }

    // 2. Find matching intent pattern (used immediately for UI buttons, quote actions & greetings, or as context/fallback for natural typed queries)
    let matchedPattern: IntentPattern | null = null;
    if (detectedLang !== "other") {
      for (const pattern of INTENT_PATTERNS) {
        const matched = pattern.keywords.some((kw) => matchesKeyword(qLower, kw));
        if (matched) {
          matchedPattern = pattern;
          break;
        }
      }
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const isInstantQuery =
      INSTANT_UI_BUTTON_QUERIES.has(qLower) ||
      (matchedPattern !== null && CONVERSATIONAL_INTENT_IDS.has(matchedPattern.id));

    // Return instant response (<5ms) for UI button clicks, quote form requests, greetings/small talk, or if Gemini key is not configured
    if (matchedPattern && (isInstantQuery || !geminiKey)) {
      const localized =
        matchedPattern.responses[activeLang] || matchedPattern.responses.en;
      return NextResponse.json({
        answer: localized.answer,
        sources: localized.sources,
        suggestedQuestions: localized.suggestedQuestions,
        needsHumanHandoff: Boolean(matchedPattern.needsHumanHandoff),
      });
    }

    // 3. For natural typed questions, query Gemini 3.5 Flash Lite with full Hextel Tech knowledge + conversation memory
    const dbUrl = process.env.DATABASE_URL;
    const fallback = FALLBACK_RESPONSES[activeLang] || FALLBACK_RESPONSES.en;
    const matchedLocalized = matchedPattern
      ? matchedPattern.responses[activeLang] || matchedPattern.responses.en
      : null;

    let extraContext = matchedLocalized ? matchedLocalized.answer : "";
    let sources: SourceItem[] = matchedLocalized
      ? matchedLocalized.sources
      : fallback.sources;
    const suggestedQuestions: string[] = matchedLocalized
      ? matchedLocalized.suggestedQuestions
      : fallback.suggestedQuestions;

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
        detectedLang,
        conversation,
        extraContext
      );
      if (aiAnswer) {
        return NextResponse.json({
          answer: aiAnswer,
          sources,
          suggestedQuestions,
          needsHumanHandoff: false,
        });
      }
    }

    // 4. If Gemini is unavailable, fall back to matched intent pattern first, then general fallback
    if (matchedLocalized && matchedPattern) {
      return NextResponse.json({
        answer: matchedLocalized.answer,
        sources: matchedLocalized.sources,
        suggestedQuestions: matchedLocalized.suggestedQuestions,
        needsHumanHandoff: Boolean(matchedPattern.needsHumanHandoff),
      });
    }

    return NextResponse.json({
      answer: fallback.answer,
      sources: fallback.sources,
      suggestedQuestions: fallback.suggestedQuestions,
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
