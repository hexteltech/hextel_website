"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "hextel_cookie_consent";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has already been made
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        // Small delay so it animates in gracefully
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}

    // Listen for custom trigger to reopen cookie settings from footer
    const handleReopen = () => {
      setIsOpen(true);
      setShowPreferences(true);
    };
    window.addEventListener("open-cookie-settings", handleReopen);
    return () => window.removeEventListener("open-cookie-settings", handleReopen);
  }, []);

  const saveConsent = (choice: "all" | "essential" | "custom") => {
    try {
      const value = {
        choice,
        preferences: choice === "all" 
          ? { necessary: true, analytics: true, marketing: true }
          : choice === "essential" 
          ? { necessary: true, analytics: false, marketing: false }
          : preferences,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } catch {}
    setIsOpen(false);
    setShowPreferences(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 w-[calc(100%-2rem)] max-w-md"
      style={{
        bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.5rem))",
        left: "max(1rem, calc(env(safe-area-inset-left) + 0.5rem))",
      }}
    >
      <div className="rounded-2xl border border-brand-dark/15 dark:border-white/15 bg-brand-light/95 dark:bg-[#1A1414]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-xl text-brand-dark dark:text-brand-light">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-heading text-sm font-bold tracking-tight">
              Privacy & Cookies
            </h4>
            <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
              We use minimal cookies to optimize site performance, remember theme preferences, and analyze anonymized platform traffic. Read our{" "}
              <Link
                href="/cookie-policy"
                onClick={() => setIsOpen(false)}
                className="underline underline-offset-2 text-brand-accent hover:opacity-80"
              >
                Cookie Policy
              </Link>.
            </p>
          </div>
        </div>

        {/* Preferences Toggle view */}
        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-brand-dark/10 dark:border-white/10 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold block">Essential Cookies</span>
                <span className="text-[11px] text-brand-dark/60 dark:text-brand-light/60">Strictly required for site navigation</span>
              </div>
              <span className="text-[11px] font-bold text-brand-accent">Always Active</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold block">Performance Analytics</span>
                <span className="text-[11px] text-brand-dark/60 dark:text-brand-light/60">Anonymous speed & usage tracking</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                className="h-4 w-4 rounded border-brand-dark/20 text-brand-accent focus:ring-brand-accent"
              />
            </div>
          </div>
        )}

        {/* Buttons Action Bar */}
        <div className="mt-4 flex flex-col xs:flex-row items-stretch xs:items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => saveConsent("all")}
            className="flex-1 py-2 px-3.5 rounded-xl bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98] text-center"
          >
            Accept All
          </button>
          
          <button
            type="button"
            onClick={() => saveConsent(showPreferences ? "custom" : "essential")}
            className="py-2 px-3 rounded-xl border border-brand-dark/20 dark:border-white/20 text-xs font-medium hover:bg-brand-dark/5 dark:hover:bg-white/5 transition-colors text-center"
          >
            {showPreferences ? "Save Preferences" : "Essential Only"}
          </button>

          {!showPreferences && (
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="text-xs text-brand-dark/70 dark:text-brand-light/70 underline underline-offset-2 hover:text-brand-accent px-1 text-center"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
