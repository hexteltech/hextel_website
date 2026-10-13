"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUtm } from "@/components/providers/UtmTracker";
import PasswordInput from "@/components/ui/PasswordInput";

const SERVICES_OPTIONS = [
  "UX/UI Design",
  "Web Platforms",
  "Brand Systems",
  "Cloud & Evolution",
  "Other Consulting",
];

interface SubmittedReceipt {
  referenceId: string;
  name: string;
  email: string;
  service: string;
  timestamp: string;
  utmSource?: string;
}

export default function ContactForm() {
  const { utmData, hasUtm } = useUtm();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: SERVICES_OPTIONS[0],
    ndaPassword: "",
    message: "",
    consent: false,
    honeypot: "", // anti-spam bot trap
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

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

    // Generate random reference code
    const generatedRef = `HEX-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload = {
      ...formData,
      referenceId: generatedRef,
      utm: utmData,
    };

    try {
      // 1. Direct mailing via EmailJS if configured on client
      const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
        try {
          const emailjs = (await import("@emailjs/browser")).default;
          await emailjs.send(
            emailJsServiceId,
            emailJsTemplateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              service: formData.service,
              message: formData.message,
              nda_password: formData.ndaPassword || "None",
              reference_id: generatedRef,
              utm_source: utmData.utm_source || "direct",
              reply_to: formData.email,
            },
            emailJsPublicKey
          );
        } catch (emailJsErr) {
          console.warn("[Hextel Tech] EmailJS direct dispatch warning:", emailJsErr);
        }
      }

      // 2. Server API Route dispatch (with Resend integration)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setReceipt({
        referenceId: generatedRef,
        name: formData.name,
        email: formData.email,
        service: formData.service,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        utmSource: utmData.utm_source,
      });

      setStatus("success");
      setStatusMessage("Your inquiry has been received. Our team will contact you within 24 hours.");
    } catch (err: unknown) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again or reach out directly."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      service: SERVICES_OPTIONS[0],
      ndaPassword: "",
      message: "",
      consent: false,
      honeypot: "",
    });
    setReceipt(null);
    setStatus("idle");
    setStatusMessage("");
  };

  return (
    <div className="w-full">
      {/* UTM Tracking Indicator Badge */}
      {hasUtm && (
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-[11px] font-medium text-brand-accent">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span>
            Attribution Active: {utmData.utm_source || "campaign"} 
            {utmData.utm_campaign ? ` (${utmData.utm_campaign})` : ""}
          </span>
        </div>
      )}

      {/* Form Success State View */}
      {status === "success" && receipt ? (
        <div className="rounded-2xl bg-brand-light/95 dark:bg-[#1A1414]/95 backdrop-blur-md p-5 xs:p-6 sm:p-10 border border-emerald-500/30 dark:border-emerald-500/40 shadow-2xl text-brand-dark dark:text-brand-light space-y-5 sm:space-y-6 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Inquiry Received Successfully
              </span>
              <h3 className="font-heading text-2xl font-bold tracking-tight">
                Thank you, {receipt.name}!
              </h3>
            </div>
          </div>

          <p className="text-sm text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
            Your project details have been safely routed to our engineering leadership. A senior solutions architect will review your scope and follow up with a tailored timeline at <strong className="text-brand-accent">{receipt.email}</strong> within 24 hours.
          </p>

          {/* Receipt Details Card */}
          <div className="p-4 rounded-xl bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-brand-dark/5 dark:border-white/5">
              <span className="text-brand-dark/60 dark:text-brand-light/60">Reference Ticket</span>
              <span className="font-mono font-bold text-brand-accent">{receipt.referenceId}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-brand-dark/5 dark:border-white/5">
              <span className="text-brand-dark/60 dark:text-brand-light/60">Selected Domain</span>
              <span className="font-semibold">{receipt.service}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-brand-dark/5 dark:border-white/5">
              <span className="text-brand-dark/60 dark:text-brand-light/60">Submitted At</span>
              <span>{receipt.timestamp}</span>
            </div>
            {receipt.utmSource && (
              <div className="flex justify-between items-center py-1">
                <span className="text-brand-dark/60 dark:text-brand-light/60">Campaign Source</span>
                <span className="font-medium text-brand-accent">{receipt.utmSource}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        /* Normal Interactive Form */
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-brand-light/95 dark:bg-[#1A1414]/95 backdrop-blur-md p-5 xs:p-6 sm:p-10 border border-brand-dark/10 dark:border-white/10 shadow-2xl text-brand-dark dark:text-brand-light space-y-5 sm:space-y-6"
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
            <p className="text-sm text-brand-dark/70 dark:text-brand-light/70">
              Tell us about your technical goals and we will prepare a tailored proposal.
            </p>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80 dark:text-brand-light/80">
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
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#201919] text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80 dark:text-brand-light/80">
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
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#201919] text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
            />
          </div>

          {/* Service Selector */}
          <div>
            <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80 dark:text-brand-light/80">
              Interested Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#201919] text-brand-dark dark:text-brand-light text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
            >
              {SERVICES_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-white dark:bg-[#1A1414] text-brand-dark dark:text-brand-light">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* NDA Password Field with Eye Visibility Toggle */}
          <PasswordInput
            id="ndaPassword"
            name="ndaPassword"
            label="Optional NDA / Client Code"
            placeholder="Confidential access key (if provided)"
            value={formData.ndaPassword}
            onChange={handleChange}
          />

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-brand-dark/80 dark:text-brand-light/80">
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
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#201919] text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all resize-y hover:border-brand-accent/50"
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
            <label htmlFor="consent" className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed cursor-pointer">
              I consent to Hextel Tech processing my details to reply to this project inquiry in accordance with the Privacy Policy.
            </label>
          </div>

          {/* Status Error Message */}
          {status === "error" && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-medium animate-in fade-in">
              {statusMessage}
            </div>
          )}

          {/* Submit Button with Loading Spinner and Hover Animation */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "w-full py-4 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg",
              status === "loading"
                ? "bg-brand-dark/60 dark:bg-brand-accent/50 text-white cursor-not-allowed"
                : "bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            )}
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Submitting inquiry...</span>
              </>
            ) : (
              <span>Send project inquiry</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
