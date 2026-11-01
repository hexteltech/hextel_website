"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { LeadFormValues } from "@hasaan_6/rag-chatbot-widget";

// Dynamically import the widget with ssr disabled to ensure smooth client-side hydration
const ChatbotWidget = dynamic(
  () =>
    import("@hasaan_6/rag-chatbot-widget").then((mod) => mod.ChatbotWidget),
  { ssr: false }
);

export default function ChatbotWidgetWrapper() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLeadSubmit = async (values: LeadFormValues) => {
    try {
      const response = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }
    } catch (err) {
      console.error("[Chatbot Lead Error]:", err);
      throw err;
    }
  };

  return (
    <ChatbotWidget
      chatEndpoint="/api/chat"
      leadEndpoint="/api/chat/lead"
      botName="Hextel Assistant"
      botEyebrow="AI Digital Consultant"
      toggleLabel="Chat with us"
      inputPlaceholder="Ask about our services, tech stack, or quote..."
      welcomeMsg="Hi! Welcome to Hextel Tech. I can help answer questions about our software development services, project estimates, technologies, or schedule an executive consultation. How can I help you today?"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      quickActions={[
        "Web & App Development",
        "Request a Quote",
        "How We Build",
        "Client Reviews",
      ]}
      leadFormConfig={{
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
      }}
      onLeadSubmit={handleLeadSubmit}
      persistence="session"
    />
  );
}
