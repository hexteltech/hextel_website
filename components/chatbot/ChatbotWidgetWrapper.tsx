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

const BOT_NAME = "Hextel Assistant";
const BOT_EYEBROW = "AI Digital Consultant";
const TOGGLE_LABEL = "Chat with us";
const INPUT_PLACEHOLDER = "Ask about our services, tech stack, or quote...";
const WELCOME_MSG =
  "Hi! Welcome to Hextel Tech. I can help answer questions about our software development services, project estimates, technologies, or schedule an executive consultation. How can I help you today?";
const FALLBACK_MSG =
  "At Hextel Tech, our founding engineers build custom web applications, mobile apps, AI copilots, and startup MVPs. Reach us at hexteltech@gmail.com or +92 303 5696807, or ask me about our services and pricing!";

const QUICK_ACTIONS = [
  "Web & App Development",
  "Request a Quote",
  "How We Build",
  "Client Reviews",
];

const LEAD_FORM_CONFIG: LeadFormConfig = {
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
};

const STORAGE_KEY = `chatbot-history-${BOT_NAME}-v2`;

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

function createInitialMessage(): ChatMessage {
  return {
    id: safeUUID(),
    role: "assistant",
    content: WELCOME_MSG,
  };
}

export default function ChatbotWidgetWrapper() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createInitialMessage()]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // Clear legacy session key that may have persisted old needsHumanHandoff states
      sessionStorage.removeItem(`chatbot-history-${BOT_NAME}`);
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
        content: result.answer || FALLBACK_MSG,
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
          content: FALLBACK_MSG,
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
        content:
          "Thanks! Your project details have been received. Our founding engineering team will review your scope and get in touch within 24 hours.",
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
        <span className="chatbot-toggle-label">{TOGGLE_LABEL}</span>
        <span className="chatbot-toggle-spark" aria-hidden="true">
          ✦
        </span>
      </button>

      <ChatWindow
        open={open}
        messages={messages}
        quickActions={QUICK_ACTIONS}
        input={input}
        botName={BOT_NAME}
        botEyebrow={BOT_EYEBROW}
        inputPlaceholder={INPUT_PLACEHOLDER}
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
            config={LEAD_FORM_CONFIG}
            onCancel={() => setLeadFormOpen(false)}
            onSubmit={handleLeadSubmit}
          />
        ) : null}
      </ChatWindow>
    </div>
  );
}
