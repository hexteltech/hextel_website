"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const SERVICES_OPTIONS = [
  "UX/UI Design",
  "Web Platforms",
  "Brand Systems",
  "Cloud & Evolution",
  "Other Consulting",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: SERVICES_OPTIONS[0],
    message: "",
    consent: false,
    honeypot: "", // anti-spam bot trap
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trap
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    if (!formData.consent) {
      setStatus("error");
      setStatusMessage("Please accept the privacy policy to proceed.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setStatus("success");
      setStatusMessage("Thank you! Your inquiry has been received. Our team will contact you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        service: SERVICES_OPTIONS[0],
        message: "",
        consent: false,
        honeypot: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again or reach out directly."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-brand-light/95 backdrop-blur-md p-6 sm:p-10 border border-brand-dark/10 shadow-2xl text-brand-dark space-y-6"
    >
      {/* Honeypot hidden input */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-1">
        <h3 className="font-heading text-2xl font-bold tracking-tight">
          Let&apos;s start a project
        </h3>
        <p className="text-sm text-brand-dark/70">
          Tell us about your technical goals and we will prepare a tailored proposal.
        </p>
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80">
          Your Name <span className="text-brand-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white text-brand-dark placeholder-brand-dark/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80">
          Work Email <span className="text-brand-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. john@company.com"
          className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white text-brand-dark placeholder-brand-dark/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
        />
      </div>

      {/* Service Selector */}
      <div>
        <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80">
          Interested Service
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white text-brand-dark text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
        >
          {SERVICES_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80">
          Project Details <span className="text-brand-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about timeline, scope, and key deliverables..."
          className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white text-brand-dark placeholder-brand-dark/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all resize-y"
        />
      </div>

      {/* Privacy Consent */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-brand-dark/20 text-brand-accent focus:ring-brand-accent"
        />
        <label htmlFor="consent" className="text-xs text-brand-dark/70 leading-relaxed cursor-pointer">
          I consent to Hextel Tech processing my details to reply to this project inquiry in accordance with the Privacy Policy.
        </label>
      </div>

      {/* Status Messages */}
      {status === "error" && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-medium">
          {statusMessage}
        </div>
      )}

      {status === "success" && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-medium flex items-start gap-2">
          <span className="text-emerald-600 font-bold text-sm">✓</span>
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full py-4 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2",
          status === "loading"
            ? "bg-brand-dark/60 text-white cursor-not-allowed"
            : "bg-brand-dark text-brand-light hover:bg-brand-accent hover:text-brand-light shadow-lg active:scale-[0.98]"
        )}
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Sending inquiry...</span>
          </>
        ) : (
          <span>Send project inquiry</span>
        )}
      </button>
    </form>
  );
}
