"use client";

import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";

export default function CookiePolicyPage() {
  const triggerCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  const COOKIE_TABLE = [
    {
      name: "hextel_cookie_consent",
      category: "Strictly Necessary",
      duration: "1 Year",
      purpose: "Stores user's cookie consent preference and category choices across sessions.",
      provider: "First-Party (hexteltech.com)",
    },
    {
      name: "hextel_theme_preference",
      category: "Strictly Necessary",
      duration: "Persistent",
      purpose: "Stores dark or light mode preference to prevent screen flickering (anti-FOUC).",
      provider: "First-Party (hexteltech.com)",
    },
    {
      name: "hextel_language",
      category: "Functional",
      duration: "6 Months",
      purpose: "Remembers the preferred internationalization language for localized content.",
      provider: "First-Party (hexteltech.com)",
    },
    {
      name: "_hextel_analytics_session",
      category: "Performance & Analytics",
      duration: "Session / 24h",
      purpose: "Anonymized diagnostic telemetry to analyze server latency and page load speeds.",
      provider: "First-Party (hexteltech.com)",
    },
  ];

  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent" />
          Transparency & Privacy
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mb-4">
          Cookie Policy
        </h1>
        <p className="text-sm sm:text-base text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          This Cookie Policy explains how {BRAND_CONFIG.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar tracking technologies when you browse our website and digital services.
        </p>
        <p className="text-xs text-brand-dark/50 dark:text-brand-light/50 mt-3 font-mono">
          Last Updated: October 2026 • In compliance with EU ePrivacy & GDPR
        </p>
      </section>

      {/* Interactive Control Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-dim dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h2 className="font-heading text-lg font-bold text-brand-dark dark:text-brand-light">
              Your Cookie Preferences
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
              You can adjust or revoke your cookie choices at any time. Strictly necessary cookies cannot be disabled as they are required for fundamental site operation.
            </p>
          </div>
          <button
            type="button"
            onClick={triggerCookieSettings}
            className="shrink-0 py-2.5 px-5 rounded-xl bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            Manage Cookie Settings
          </button>
        </div>
      </section>

      {/* Content Document */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-brand-dark/80 dark:text-brand-light/80 leading-relaxed text-sm">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files placed on your computer, tablet, or smartphone when you visit a website. They allow websites to remember your device, preserve preferences (such as color themes and language selections), and understand how visitors interact with the site to enhance performance.
          </p>
          <p>
            We also use similar client-side storage technologies, such as HTML5 <code className="font-mono text-xs bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">localStorage</code>, which behave similarly to cookies but store data securely on your local device without being automatically transmitted with every network request.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            2. Categories of Cookies We Use
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-white dark:bg-[#181212] border border-brand-dark/10 dark:border-white/10 space-y-2">
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block">Always Active</span>
              <h3 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light">
                Strictly Necessary
              </h3>
              <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                Essential for core navigation, anti-FOUC theme rendering, CSRF protection, and recording your consent choices.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#181212] border border-brand-dark/10 dark:border-white/10 space-y-2">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block">Configurable</span>
              <h3 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light">
                Performance & Analytics
              </h3>
              <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                Collects fully anonymized metrics on page response times and Core Web Vitals to help us optimize system responsiveness.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#181212] border border-brand-dark/10 dark:border-white/10 space-y-2">
              <span className="text-xs font-bold text-green-500 uppercase tracking-wider block">Configurable</span>
              <h3 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light">
                Functional Preferences
              </h3>
              <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                Enables personalization features like preserving interactive workspace states, region selection, and form draft recovery.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Cookie Inventory Table */}
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            3. Detailed Cookie Inventory
          </h2>
          <div className="overflow-x-auto rounded-xl border border-brand-dark/10 dark:border-white/10">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-dim dark:bg-[#1A1414] border-b border-brand-dark/10 dark:border-white/10 text-brand-dark dark:text-brand-light font-semibold">
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Lifespan</th>
                  <th className="p-3.5">Provider</th>
                  <th className="p-3.5">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark/10 dark:divide-white/10 font-mono text-[11px]">
                {COOKIE_TABLE.map((c) => (
                  <tr key={c.name} className="hover:bg-brand-dark/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-brand-accent">{c.name}</td>
                    <td className="p-3.5 font-sans">{c.category}</td>
                    <td className="p-3.5">{c.duration}</td>
                    <td className="p-3.5 font-sans">{c.provider}</td>
                    <td className="p-3.5 font-sans text-brand-dark/70 dark:text-brand-light/70 max-w-xs">{c.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            4. Managing Cookies in Your Browser
          </h2>
          <p>
            Most web browsers allow you to control cookies through their browser settings. You can configure your browser to reject all cookies, notify you when a cookie is placed, or delete existing cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
            <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection & Cookies</li>
            <li><strong>Apple Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
          </ul>
          <p className="text-xs text-brand-dark/60 dark:text-brand-light/60">
            Note: Disabling strictly necessary cookies may impair the visual layout and accessibility features of our website.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            5. Contact Our Privacy Office
          </h2>
          <p>
            If you have questions regarding this Cookie Policy or how we handle data privacy, contact our team:
          </p>
          <div className="p-4 rounded-xl bg-white dark:bg-[#181212] border border-brand-dark/10 dark:border-white/10 text-xs space-y-1">
            <p><strong>Entity:</strong> {BRAND_CONFIG.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${BRAND_CONFIG.email}`} className="text-brand-accent hover:underline">{BRAND_CONFIG.email}</a></p>
            <p><strong>Address:</strong> {BRAND_CONFIG.address}</p>
          </div>
        </section>

        {/* Quick Links Footer Bar */}
        <div className="pt-8 border-t border-brand-dark/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <Link href="/security-and-compliance" className="text-brand-accent hover:underline">
              ← Security & Compliance
            </Link>
            <Link href="/privacy-policy" className="hover:underline text-brand-dark/70 dark:text-brand-light/70">
              Privacy Policy
            </Link>
          </div>
          <button
            type="button"
            onClick={triggerCookieSettings}
            className="text-brand-accent hover:underline font-semibold"
          >
            Reopen Cookie Banner ⚙
          </button>
        </div>

      </div>
    </div>
  );
}
