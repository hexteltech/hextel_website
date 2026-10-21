import type { Metadata } from "next";
import { BRAND_CONFIG } from "@/lib/constants";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Hextel Tech | Start a Project",
  description:
    "Get in touch with Hextel Tech. Request an engineering consultation, technical architecture audit, or discuss your upcoming web, cloud, or AI software project.",
  openGraph: {
    title: "Contact Us — Hextel Tech",
    description: "Start a conversation with our engineering leads.",
  },
};

const LOCATIONS = [
  {
    city: "Gujranwala (HQ)",
    address: "Master City, Gujranwala, Pakistan",
    phone: "+92 303 5696807",
    timezone: "PKT (UTC+5)",
    role: "Headquarters & Core Engineering Studio",
  },
  {
    city: "Global Remote",
    address: "Worldwide Client Delivery",
    phone: "+92 303 5696807",
    timezone: "Flexible / Global Hours",
    role: "International Client Partnerships & Delivery",
  },
];

const CONTACT_FAQS = [
  {
    q: "How quickly will we hear back after submitting an inquiry?",
    a: "Our founding team (Hasaan Ahmad, Muhammad Faseeh Altaf, or Moman Salman) reviews your inquiry and replies directly within 24 business hours.",
  },
  {
    q: "Can we execute a Non-Disclosure Agreement (NDA) before sharing specs?",
    a: "Absolutely. We are happy to execute your standard mutual NDA or provide our studio mutual NDA prior to discovery calls.",
  },
  {
    q: "What information should we prepare for the initial discovery call?",
    a: "Briefly outline your core commercial objective, existing technology stack, target launch timeline, and approximate budget tier.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Direct Access to Founders
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
          Let&apos;s engineer something remarkable together
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          Whether you need full-stack web applications, AI automation pipelines, or bespoke digital products, work directly with the 3 builders of Hextel Tech.
        </p>
      </section>

      {/* Main Form & Direct Info Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct info & Guarantee */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 p-8 sm:p-10 shadow-lg space-y-6">
              <h2 className="font-heading text-2xl font-bold text-brand-dark dark:text-brand-light">
                Direct Contact
              </h2>
              <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                Skip the sales reps. You will speak directly with one of our 3 founders who understands code, architecture, and business realities.
              </p>

              <div className="space-y-4 pt-4 border-t border-brand-dark/10 dark:border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                    ✉
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-brand-dark/50 dark:text-brand-light/50 block">Email Us</span>
                    <a href={`mailto:${BRAND_CONFIG.email}`} className="text-sm font-bold text-brand-dark dark:text-brand-light hover:text-brand-accent transition-colors">
                      {BRAND_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                    ☎
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-brand-dark/50 dark:text-brand-light/50 block">Direct Telephone</span>
                    <a href={`tel:${BRAND_CONFIG.phone}`} className="text-sm font-bold text-brand-dark dark:text-brand-light hover:text-brand-accent transition-colors">
                      {BRAND_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-brand-dark/50 dark:text-brand-light/50 block">Response Time SLA</span>
                    <span className="text-sm font-bold text-brand-accent">
                      Guaranteed within 24 Business Hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations Cards */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-brand-dark dark:text-brand-light px-2">
                Global Delivery Hubs
              </h3>
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.city}
                  className="p-5 rounded-2xl bg-surface-dim dark:bg-[#161111] border border-brand-dark/10 dark:border-white/10 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-brand-dark dark:text-brand-light">
                    <span>{loc.city}</span>
                    <span className="text-brand-accent font-mono text-[11px]">{loc.timezone}</span>
                  </div>
                  <div className="text-brand-dark/60 dark:text-brand-light/60">{loc.address}</div>
                  <div className="text-brand-dark/50 dark:text-brand-light/50 italic pt-1">{loc.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 p-8 sm:p-12 shadow-2xl">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Project Inquiry
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light mt-1">
                  Tell us about your project
                </h2>
                <p className="text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1">
                  Fill in the details below and we will prepare a technical feasibility assessment.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Project FAQs */}
      <section className="bg-surface-dim dark:bg-[#161111] py-20 border-y border-brand-dark/10 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Clear Expectations
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light mt-2">
              Frequently asked onboarding questions
            </h2>
          </div>

          <div className="space-y-4">
            {CONTACT_FAQS.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm"
              >
                <h4 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light mb-2">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
