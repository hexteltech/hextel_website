"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUtm } from "@/components/providers/UtmTracker";
import { COUNTRY_CODES, CountryCode } from "@/lib/countryCodes";
import { useLanguage } from "@/components/providers/LanguageProvider";

export const SERVICE_OPTIONS = [
  "IT Staff Augmentation / Dedicated Developers",
  "MVP Development for Startups",
  "Database & Data Engineering",
  "Cybersecurity & Compliance Audits",
  "API Development & Integration",
  "QA & Automated Testing",
  "UI/UX Design & Product Strategy",
  "DevOps & CI/CD Engineering",
  "Legacy Software Modernization",
  "Server & Cloud Infrastructure",
  "Custom AI Agents & Copilots",
  "AI Workflow Automation",
  "ERP Systems & Solutions",
  "Custom Software Development",
  "Windows / Desktop App Development",
  "Mobile App Development",
  "Web Application Development",
  "Brand Systems & Identity",
  "Other Enterprise Consulting",
];

interface SubmittedReceipt {
  referenceId: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  timestamp: string;
  utmSource?: string;
}

export default function ContactForm() {
  const { utmData, hasUtm } = useUtm();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    service: "",
    message: "",
    consentData: false,
    consentComm: false,
    honeypot: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES[0]); // Default to US (+1)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  // Close country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opening country dropdown
  useEffect(() => {
    if (isCountryDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isCountryDropdownOpen]);

  const filteredCountries = COUNTRY_CODES.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.dial.includes(countrySearch) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

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

    if (!formData.firstName.trim()) {
      setStatus("error");
      setStatusMessage("Please enter your First Name.");
      return;
    }

    if (!formData.email.trim()) {
      setStatus("error");
      setStatusMessage("Please enter your Business Email.");
      return;
    }

    if (!formData.company.trim()) {
      setStatus("error");
      setStatusMessage("Please enter your Company name.");
      return;
    }

    if (!formData.service) {
      setStatus("error");
      setStatusMessage("Please select the service you are looking for.");
      return;
    }

    if (!formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please provide some details about your project.");
      return;
    }

    if (!formData.consentData) {
      setStatus("error");
      setStatusMessage("Please check the required consent box to proceed.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    const generatedRef = `HEX-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullPhone = formData.phoneNumber.trim()
      ? `${selectedCountry.dial} ${formData.phoneNumber.trim()}`
      : undefined;
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    const payload = {
      ...formData,
      name: fullName,
      phone: fullPhone,
      phoneCountry: selectedCountry.dial,
      referenceId: generatedRef,
      utm: utmData,
    };

    try {
      // 1. Direct mailing via EmailJS if configured
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
              from_name: fullName,
              from_email: formData.email,
              company: formData.company,
              phone: fullPhone || "N/A",
              service: formData.service,
              message: formData.message,
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

      // 2. Server API Route dispatch
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
        name: fullName,
        email: formData.email,
        company: formData.company,
        phone: fullPhone,
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
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      service: "",
      message: "",
      consentData: false,
      consentComm: false,
      honeypot: "",
    });
    setReceipt(null);
    setStatus("idle");
    setStatusMessage("");
  };

  return (
    <div className="w-full">
      {/* UTM Tracking Indicator */}
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
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1A1414] border border-emerald-500/30 p-6 sm:p-10 shadow-2xl text-brand-dark dark:text-brand-light space-y-6 animate-in zoom-in-95 duration-300">
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
            Your project details have been safely received by our founding team. We will review your goals and reach out directly to <strong className="text-brand-accent">{receipt.email}</strong> within 24 hours.
          </p>

          {/* Receipt Details Card */}
          <div className="p-4 rounded-xl bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-brand-dark/5 dark:border-white/5">
              <span className="text-brand-dark/60 dark:text-brand-light/60">Reference Code</span>
              <span className="font-mono font-bold text-brand-accent">{receipt.referenceId}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-brand-dark/5 dark:border-white/5">
              <span className="text-brand-dark/60 dark:text-brand-light/60">Company</span>
              <span className="font-semibold">{receipt.company}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-brand-dark/5 dark:border-white/5">
              <span className="text-brand-dark/60 dark:text-brand-light/60">Service</span>
              <span className="font-semibold text-brand-dark dark:text-brand-light">{receipt.service}</span>
            </div>
            {receipt.phone && (
              <div className="flex justify-between items-center py-1 border-b border-brand-dark/5 dark:border-white/5">
                <span className="text-brand-dark/60 dark:text-brand-light/60">Phone</span>
                <span>{receipt.phone}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-1">
              <span className="text-brand-dark/60 dark:text-brand-light/60">Submitted At</span>
              <span>{receipt.timestamp}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 active:scale-[0.98] transition-all shadow-md"
          >
            {t.contact?.submitAnother || "Submit another inquiry"}
          </button>
        </div>
      ) : (
        /* Form Cohesive with Hextel Tech Brand Theme */
        <div className="space-y-4">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 p-5 xs:p-7 sm:p-10 shadow-2xl text-brand-dark dark:text-brand-light space-y-4 sm:space-y-5 transition-colors"
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

            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={`${t.contact?.nameLabel || "First Name"} *`}
                  className="w-full px-4 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t.contact?.nameLabel ? (t.contact.nameLabel.includes("First") ? t.contact.nameLabel.replace("First", "Last") : "Last Name") : "Last Name"}
                  className="w-full px-4 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
                />
              </div>
            </div>

            {/* Row 2: Business email * */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={`${t.contact?.emailLabel || "Business email"} *`}
                className="w-full px-4 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
              />
            </div>

            {/* Row 3: Country Flag & Dial code + Phone number */}
            <div className="flex gap-3 items-stretch relative">
              {/* Country Code Dropdown */}
              <div ref={countryDropdownRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                  className="h-full px-3 sm:px-4 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] hover:border-brand-accent/50 text-brand-dark dark:text-brand-light flex items-center gap-2.5 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all whitespace-nowrap min-w-[110px] justify-between shadow-xs"
                  aria-haspopup="listbox"
                  aria-expanded={isCountryDropdownOpen}
                >
                  <div className="flex items-center gap-2">
                    {/* Real HD Flag Image */}
                    <img
                      src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                      alt={selectedCountry.name}
                      width={22}
                      height={15}
                      className="rounded-xs object-cover shrink-0 shadow-xs inline-block"
                      loading="lazy"
                    />
                    <span className="font-semibold text-xs sm:text-sm text-brand-dark dark:text-brand-light">
                      {selectedCountry.dial}
                    </span>
                  </div>
                  <svg
                    className={cn(
                      "w-3.5 h-3.5 text-brand-dark/50 dark:text-brand-light/50 transition-transform duration-200",
                      isCountryDropdownOpen && "rotate-180 text-brand-accent"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Country Search Popover */}
                {isCountryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 max-h-80 bg-white dark:bg-[#1A1414] border border-brand-dark/15 dark:border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2.5 border-b border-brand-dark/10 dark:border-white/10 bg-brand-light/50 dark:bg-[#140E0E]">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country or dial code..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#1A1414] border border-brand-dark/15 dark:border-white/15 text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div className="overflow-y-auto max-h-60 divide-y divide-brand-dark/5 dark:divide-white/5">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryDropdownOpen(false);
                              setCountrySearch("");
                            }}
                            className={cn(
                              "w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between hover:bg-brand-accent/10 hover:text-brand-accent transition-colors",
                              selectedCountry.code === c.code
                                ? "bg-brand-accent/15 text-brand-accent font-semibold"
                                : "text-brand-dark dark:text-brand-light"
                            )}
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              <img
                                src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                                alt={c.name}
                                width={20}
                                height={14}
                                className="rounded-xs object-cover shrink-0 shadow-xs inline-block"
                                loading="lazy"
                              />
                              <span className="truncate">{c.name}</span>
                            </span>
                            <span className="font-mono text-brand-dark/50 dark:text-brand-light/50 shrink-0 ml-2 font-medium">
                              {c.dial}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-brand-dark/50 dark:text-brand-light/50">
                          No matching countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="flex-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full px-4 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
                />
              </div>
            </div>

            {/* Row 4: Company * & I am looking for * */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company *"
                  className="w-full px-4 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
                />
              </div>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 pr-10 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] text-brand-dark dark:text-brand-light text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all appearance-none cursor-pointer hover:border-brand-accent/50"
                >
                  <option value="" disabled className="text-brand-dark/40 dark:text-brand-light/40">
                    {t.contact?.serviceLabel || "I am looking for"} *
                  </option>
                  {(t.contact?.servicesOptions && t.contact.servicesOptions.length > 0 ? t.contact.servicesOptions : SERVICE_OPTIONS).map((srv) => (
                    <option key={srv} value={srv} className="bg-white dark:bg-[#1A1414] text-brand-dark dark:text-brand-light">
                      {srv}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-dark/50 dark:text-brand-light/50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 5: Tell us more about your project */}
            <div>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact?.messagePlaceholder || "Tell us more about your project"}
                className="w-full px-4 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#120E0E] text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all resize-y min-h-[110px] hover:border-brand-accent/50"
              />
            </div>

            {/* Row 6: Consent section */}
            <div className="space-y-3 pt-1">
              <p className="text-xs text-brand-dark/60 dark:text-brand-light/60 leading-relaxed">
                To process your request, we need your permission to store and process your personal data. Please check the box below to confirm your consent:
              </p>

              {/* Checkbox 1: Store & Process (Required) */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="consentData"
                  checked={formData.consentData}
                  onChange={handleChange}
                  required
                  className="mt-0.5 h-4 w-4 rounded border-brand-dark/20 dark:border-white/20 bg-white dark:bg-[#120E0E] text-brand-accent focus:ring-brand-accent focus:ring-offset-0 cursor-pointer accent-brand-accent"
                />
                <span className="text-xs text-brand-dark/80 dark:text-brand-light/80 group-hover:text-brand-dark dark:group-hover:text-brand-light transition-colors">
                  I agree to allow Hextel Tech to store and process my personal data. <span className="text-brand-accent">*</span>
                </span>
              </label>

              {/* Checkbox 2: Receive other communications (Optional) */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="consentComm"
                  checked={formData.consentComm}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-brand-dark/20 dark:border-white/20 bg-white dark:bg-[#120E0E] text-brand-accent focus:ring-brand-accent focus:ring-offset-0 cursor-pointer accent-brand-accent"
                />
                <span className="text-xs text-brand-dark/80 dark:text-brand-light/80 group-hover:text-brand-dark dark:group-hover:text-brand-light transition-colors">
                  I agree to receive other communications from Hextel Tech.
                </span>
              </label>

              {/* Privacy disclaimer */}
              <p className="text-xs text-brand-dark/60 dark:text-brand-light/60 pt-1">
                We care about your privacy. Learn how we handle your data in our{" "}
                <Link href="/privacy-policy" className="text-brand-dark dark:text-brand-light font-medium underline hover:text-brand-accent dark:hover:text-brand-accent transition-colors">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Status Error Message */}
            {status === "error" && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium animate-in fade-in">
                {statusMessage}
              </div>
            )}

            {/* Row 7: Submit Button matching Hextel Theme */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg",
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
                  <span>{t.contact?.submittingButton || "Submitting inquiry..."}</span>
                </>
              ) : (
                <span>{t.contact?.submitButton || "Submit"}</span>
              )}
            </button>
          </form>

          {/* Row 8: Bottom Auxiliary Cards matching Hextel Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Explore Careers */}
            <Link
              href="/about#careers"
              className="group p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-white dark:bg-[#1A1414] hover:border-brand-accent/50 dark:hover:border-brand-accent/50 hover:bg-brand-light/60 dark:hover:bg-[#1E1717] transition-all duration-200 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-accent group-hover:text-brand-light dark:group-hover:text-brand-dark transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth={1.75} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors">
                    Explore Careers
                  </h4>
                  <p className="text-xs text-brand-dark/60 dark:text-brand-light/60">Apply for open roles</p>
                </div>
              </div>
              <span className="text-brand-dark/40 dark:text-brand-light/40 text-sm group-hover:text-brand-accent group-hover:translate-x-1 transition-all">
                →
              </span>
            </Link>

            {/* Partner With Us */}
            <a
              href="mailto:hexteltech@gmail.com?subject=Partner%20Program%20Inquiry"
              className="group p-4 rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-white dark:bg-[#1A1414] hover:border-brand-accent/50 dark:hover:border-brand-accent/50 hover:bg-brand-light/60 dark:hover:bg-[#1E1717] transition-all duration-200 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-accent group-hover:text-brand-light dark:group-hover:text-brand-dark transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors">
                    Partner With Us
                  </h4>
                  <p className="text-xs text-brand-dark/60 dark:text-brand-light/60">Join our partner program</p>
                </div>
              </div>
              <span className="text-brand-dark/40 dark:text-brand-light/40 text-sm group-hover:text-brand-accent group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
