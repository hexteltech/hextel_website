"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChatWindow,
  LeadForm,
  type ChatMessage,
  type LeadFormConfig,
  type LeadFormValues,
} from "@hasaan_6/rag-chatbot-widget";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { SupportedLanguage } from "@/lib/i18n/types";

interface LocalizedChatbotCopy {
  botName: string;
  botEyebrow: string;
  toggleLabel: string;
  inputPlaceholder: string;
  welcomeMsg: string;
  fallbackMsg: string;
  leadSuccessMsg: string;
  quickActions: string[];
  leadFormConfig: LeadFormConfig;
}

const CHATBOT_I18N: Record<SupportedLanguage, LocalizedChatbotCopy> = {
  en: {
    botName: "Hextel Assistant",
    botEyebrow: "AI Digital Consultant",
    toggleLabel: "Chat with us",
    inputPlaceholder: "Ask about our services, tech stack, or quote...",
    welcomeMsg:
      "Hi! Welcome to Hextel Tech. I can help answer questions about our software development services, project estimates, technologies, or schedule an executive consultation. How can I help you today?",
    fallbackMsg:
      "At Hextel Tech, our founding engineers build custom web applications, mobile apps, AI copilots, and startup MVPs. Reach us at hexteltech@gmail.com or +92 303 5696807, or ask me about our services and pricing!",
    leadSuccessMsg:
      "Thanks! Your project details have been received. Our founding engineering team will review your scope and get in touch within 24 hours.",
    quickActions: [
      "Web & App Development",
      "Request a Quote",
      "How We Build",
      "Client Reviews",
    ],
    leadFormConfig: {
      serviceOptions: [
        "Web Application Development",
        "Mobile App Development (iOS & Android)",
        "MVP Development for Startups",
        "IT Staff Augmentation & Dedicated Devs",
        "Cloud, DevOps & AI Integration",
        "UI/UX Design & Digital Platforms",
      ],
      budgetOptions: [
        "$1,000 - $3,000",
        "$3,000 - $7,000",
        "$7,000 - $15,000",
        "$15,000+",
      ],
      contactTimeOptions: [
        "Morning (EST / PKT)",
        "Afternoon",
        "Evening",
        "Flexible / Anytime",
      ],
      showCompanyField: true,
      showPhoneField: true,
      leadKicker: "Fast-Track Project Scope & Quote",
    },
  },
  pl: {
    botName: "Asystent Hextel",
    botEyebrow: "Cyfrowy Konsultant AI",
    toggleLabel: "Porozmawiaj z nami",
    inputPlaceholder: "Zapytaj o usługi, technologie lub wycenę...",
    welcomeMsg:
      "Cześć! Witamy w Hextel Tech. Chętnie odpowiem na pytania dotyczące tworzenia aplikacji webowych i mobilnych, wyceny projektów, technologii lub umówię konsultację z naszymi inżynierami. W czym mogę pomóc?",
    fallbackMsg:
      "W Hextel Tech nasi założyciele tworzą aplikacje webowe, mobilne, agentów AI oraz MVP dla startupów. Napisz na hexteltech@gmail.com lub zadzwoń +92 303 5696807!",
    leadSuccessMsg:
      "Dziękujemy! Otrzymaliśmy szczegóły Twojego projektu. Nasz zespół inżynierów przeanalizuje zakres i skontaktuje się w ciągu 24 godzin.",
    quickActions: [
      "Aplikacje Web i Mobile",
      "Poproś o wycenę",
      "Jak budujemy",
      "Opinie klientów",
    ],
    leadFormConfig: {
      serviceOptions: [
        "Tworzenie Aplikacji Webowych",
        "Aplikacje Mobilne (iOS i Android)",
        "Budowa MVP dla Startupów",
        "IT Staff Augmentation / Dedykowani Programiści",
        "Chmura, DevOps i Integracje AI",
        "Projektowanie UI/UX i Platformy Cyfrowe",
      ],
      budgetOptions: [
        "$1,000 - $3,000",
        "$3,000 - $7,000",
        "$7,000 - $15,000",
        "$15,000+",
      ],
      contactTimeOptions: [
        "Rano (CET / EST)",
        "Po południu",
        "Wieczorem",
        "Elastycznie / Dowolna pora",
      ],
      showCompanyField: true,
      showPhoneField: true,
      leadKicker: "Szybka Wycena i Zakres Projektu",
    },
  },
  de: {
    botName: "Hextel Assistent",
    botEyebrow: "KI-Digitalberater",
    toggleLabel: "Chatte mit uns",
    inputPlaceholder: "Fragen Sie nach Leistungen, Tech-Stack oder Angebot...",
    welcomeMsg:
      "Hallo! Willkommen bei Hextel Tech. Ich beantworte gerne Ihre Fragen zu unserer Softwareentwicklung, Projektschätzungen, Technologien oder vereinbare ein Beratungsgespräch. Wie kann ich Ihnen heute helfen?",
    fallbackMsg:
      "Bei Hextel Tech entwickeln unsere Gründer maßgeschneiderte Webanwendungen, Mobile Apps, KI-Agenten und Startup-MVPs. Kontaktieren Sie uns unter hexteltech@gmail.com oder +92 303 5696807!",
    leadSuccessMsg:
      "Vielen Dank! Ihre Projektdetails sind eingegangen. Unser Gründer- und Entwicklerteam prüft Ihren Umfang und meldet sich innerhalb von 24 Stunden.",
    quickActions: [
      "Web- & App-Entwicklung",
      "Angebot anfordern",
      "Wie wir bauen",
      "Kundenbewertungen",
    ],
    leadFormConfig: {
      serviceOptions: [
        "Webanwendungs-Entwicklung",
        "Mobile App-Entwicklung (iOS & Android)",
        "MVP-Entwicklung für Startups",
        "IT-Staff-Augmentation & Dedizierte Entwickler",
        "Cloud, DevOps & KI-Integration",
        "UI/UX-Design & Digitale Plattformen",
      ],
      budgetOptions: [
        "$1,000 - $3,000",
        "$3,000 - $7,000",
        "$7,000 - $15,000",
        "$15,000+",
      ],
      contactTimeOptions: [
        "Vormittags (MEZ / EST)",
        "Nachmittags",
        "Abends",
        "Flexibel / Jederzeit",
      ],
      showCompanyField: true,
      showPhoneField: true,
      leadKicker: "Schnellangebot & Projektumfang",
    },
  },
  es: {
    botName: "Asistente Hextel",
    botEyebrow: "Consultor Digital IA",
    toggleLabel: "Chatea con nosotros",
    inputPlaceholder: "Pregunta sobre servicios, tecnologías o presupuesto...",
    welcomeMsg:
      "¡Hola! Bienvenido a Hextel Tech. Puedo responder preguntas sobre nuestros servicios de desarrollo de software, presupuestos, tecnologías o agendar una consultoría ejecutiva. ¿Cómo puedo ayudarte hoy?",
    fallbackMsg:
      "En Hextel Tech, nuestros ingenieros fundadores crean aplicaciones web a medida, apps móviles, agentes de IA y MVPs para startups. ¡Contáctanos en hexteltech@gmail.com o al +92 303 5696807!",
    leadSuccessMsg:
      "¡Gracias! Hemos recibido los detalles de tu proyecto. Nuestro equipo de ingenieros fundadores revisará el alcance y te contactará en menos de 24 horas.",
    quickActions: [
      "Desarrollo Web y Apps",
      "Solicitar presupuesto",
      "Cómo construimos",
      "Reseñas de clientes",
    ],
    leadFormConfig: {
      serviceOptions: [
        "Desarrollo de Aplicaciones Web",
        "Desarrollo de Apps Móviles (iOS y Android)",
        "Desarrollo de MVP para Startups",
        "Staff Augmentation y Desarrolladores Dedicados",
        "Nube, DevOps e Integración de IA",
        "Diseño UI/UX y Plataformas Digitales",
      ],
      budgetOptions: [
        "$1,000 - $3,000",
        "$3,000 - $7,000",
        "$7,000 - $15,000",
        "$15,000+",
      ],
      contactTimeOptions: [
        "Mañana (CET / EST)",
        "Tarde",
        "Noche",
        "Flexible / Cualquier horario",
      ],
      showCompanyField: true,
      showPhoneField: true,
      leadKicker: "Presupuesto Rápido y Alcance de Proyecto",
    },
  },
};

const STORAGE_KEY = "chatbot-history-hextel-v3";

function safeUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function createInitialMessage(lang: SupportedLanguage): ChatMessage {
  return {
    id: safeUUID(),
    role: "assistant",
    content: (CHATBOT_I18N[lang] || CHATBOT_I18N.en).welcomeMsg,
  };
}

export default function ChatbotWidgetWrapper() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const copy = CHATBOT_I18N[language] || CHATBOT_I18N.en;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createInitialMessage("en"),
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      sessionStorage.removeItem("chatbot-history-Hextel Assistant");
      sessionStorage.removeItem("chatbot-history-Hextel Assistant-v2");
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed as ChatMessage[]);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Automatically translate the initial welcome message when the user switches site language
  useEffect(() => {
    setMessages((current) => {
      if (current.length <= 1 && current[0]?.role === "assistant") {
        return [
          {
            ...current[0],
            content: (CHATBOT_I18N[language] || CHATBOT_I18N.en).welcomeMsg,
          },
        ];
      }
      return current;
    });
  }, [language]);

  useEffect(() => {
    if (!mounted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages, mounted]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  if (!mounted) {
    return null;
  }

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  async function submitQuestion(question: string) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || loading) {
      return;
    }

    const nextUserMessage: ChatMessage = {
      id: safeUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    const nextConversation = [...messages, nextUserMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Always close any open lead form when a new question is asked
    setLeadFormOpen(false);
    setMessages((current) => [...current, nextUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmedQuestion,
          conversation: nextConversation,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
      }

      const result = await response.json();
      const shouldShowLeadForm = Boolean(result.needsHumanHandoff);

      const assistantMessage: ChatMessage = {
        id: safeUUID(),
        role: "assistant",
        content: result.answer || copy.fallbackMsg,
        needsHumanHandoff: shouldShowLeadForm,
        sources: result.sources,
        suggestedQuestions: result.suggestedQuestions,
      };

      setMessages((current) => [...current, assistantMessage]);
      setLeadFormOpen(shouldShowLeadForm);
    } catch (err) {
      console.error("[ChatbotWidget Error]:", err);
      setMessages((current) => [
        ...current,
        {
          id: safeUUID(),
          role: "assistant",
          content: copy.fallbackMsg,
          needsHumanHandoff: false,
        },
      ]);
      setLeadFormOpen(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleLeadSubmit(values: LeadFormValues) {
    const response = await fetch("/api/chat/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to submit lead");
    }

    setLeadFormOpen(false);
    setMessages((current) => [
      ...current,
      {
        id: safeUUID(),
        role: "assistant",
        content: copy.leadSuccessMsg,
      },
    ]);
  }

  const sourcePage =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div
      ref={containerRef}
      className={`chatbot-widget-shell chatbot-theme-${theme}`}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="chatbot-toggle"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <span className="chatbot-toggle-icon" aria-hidden="true">
          <span className="chatbot-toggle-dot" />
        </span>
        <span className="chatbot-toggle-label">{copy.toggleLabel}</span>
        <span className="chatbot-toggle-spark" aria-hidden="true">
          ✦
        </span>
      </button>

      <ChatWindow
        open={open}
        messages={messages}
        quickActions={copy.quickActions}
        input={input}
        botName={copy.botName}
        botEyebrow={copy.botEyebrow}
        inputPlaceholder={copy.inputPlaceholder}
        loading={loading}
        onClose={() => setOpen(false)}
        onInputChange={setInput}
        onSubmit={(event) => {
          event.preventDefault();
          void submitQuestion(input);
        }}
        onQuickAction={(action) => {
          void submitQuestion(action);
        }}
      >
        {leadFormOpen ? (
          <LeadForm
            sourcePage={sourcePage}
            config={copy.leadFormConfig}
            onCancel={() => setLeadFormOpen(false)}
            onSubmit={handleLeadSubmit}
          />
        ) : null}
      </ChatWindow>
    </div>
  );
}
