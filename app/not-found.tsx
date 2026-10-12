"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NotFound() {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentPath, setCurrentPath] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname || "/unknown-route");
      setTimestamp(new Date().toUTCString());
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.dispatchEvent(
        new CustomEvent("open-site-search", {
          detail: { initialQuery: searchQuery.trim() },
        })
      );
    } else {
      window.dispatchEvent(new CustomEvent("open-site-search"));
    }
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Ambient Cosmic Radial Background Lights */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-tr from-brand-accent/20 via-brand-dark/15 to-transparent dark:from-brand-accent/15 dark:via-red-950/20 blur-3xl opacity-70 animate-pulse duration-1000" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-500/10 blur-2xl opacity-50" />
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(184,136,73,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="max-w-4xl mx-auto w-full text-center space-y-10 relative z-10">
        {/* Futuristic System Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/10 dark:bg-brand-accent/15 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span className="font-mono text-xs font-semibold tracking-widest text-brand-accent uppercase">
            {t.notFound.badge}
          </span>
        </div>

        {/* Dynamic 404 Glowing Digital Display */}
        <div className="relative select-none py-2">
          <div className="font-heading font-black text-8xl sm:text-9xl md:text-[13rem] leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-brand-dark via-brand-dark/70 to-brand-accent dark:from-white dark:via-brand-light/70 dark:to-brand-accent drop-shadow-2xl">
            {t.notFound.code}
          </div>
          {/* Subtle floating overlay accent */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="font-mono text-xs sm:text-sm tracking-[0.5em] uppercase text-brand-dark dark:text-brand-light">
              COORDINATES_UNRESOLVED
            </span>
          </div>
        </div>

        {/* Text Header & Subtitle */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark dark:text-brand-light">
            {t.notFound.heading}
          </h1>
          <p className="text-base sm:text-lg text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
            {t.notFound.description}
          </p>
        </div>

        {/* Integrated Quick Search on 404 Page */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.notFound.searchPlaceholder}
              className="w-full pl-11 pr-24 py-3.5 rounded-2xl border border-brand-dark/15 dark:border-white/15 bg-brand-light/80 dark:bg-[#1A1414]/80 backdrop-blur-md text-sm text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 shadow-lg focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all hover:border-brand-accent/50"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/50 dark:text-brand-light/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-brand-dark dark:bg-brand-accent text-brand-light dark:text-brand-dark text-xs font-semibold hover:opacity-90 transition-all shadow-sm active:scale-95"
            >
              {t.notFound.searchButton}
            </button>
          </form>
        </div>

        {/* Primary Interactive CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] group"
          >
            <span>{t.notFound.returnHome}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-brand-dark/20 dark:border-white/20 text-brand-dark dark:text-brand-light hover:bg-brand-dark/5 dark:hover:bg-white/5 active:scale-[0.98]"
          >
            <span>← {t.notFound.goBack}</span>
          </button>
        </div>

        {/* Quick Navigation Cards Grid */}
        <div className="pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark/50 dark:text-brand-light/50 mb-6">
            {t.notFound.helpfulLinks}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {/* Card 1: Home */}
            <Link
              href="/"
              className="p-5 rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-brand-dark/5 dark:bg-white/5 hover:border-brand-accent hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-sm text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors">
                {t.notFound.links.home.title}
              </h3>
              <p className="text-xs text-brand-dark/65 dark:text-brand-light/65 mt-1 leading-relaxed">
                {t.notFound.links.home.desc}
              </p>
            </Link>

            {/* Card 2: Services */}
            <Link
              href="/#services"
              className="p-5 rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-brand-dark/5 dark:bg-white/5 hover:border-brand-accent hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="3" strokeWidth={2} />
                  <line x1="2" y1="9" x2="22" y2="9" strokeWidth={2} />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-sm text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors">
                {t.notFound.links.services.title}
              </h3>
              <p className="text-xs text-brand-dark/65 dark:text-brand-light/65 mt-1 leading-relaxed">
                {t.notFound.links.services.desc}
              </p>
            </Link>

            {/* Card 3: Portfolio */}
            <Link
              href="/#projects"
              className="p-5 rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-brand-dark/5 dark:bg-white/5 hover:border-brand-accent hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-sm text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors">
                {t.notFound.links.projects.title}
              </h3>
              <p className="text-xs text-brand-dark/65 dark:text-brand-light/65 mt-1 leading-relaxed">
                {t.notFound.links.projects.desc}
              </p>
            </Link>

            {/* Card 4: Contact */}
            <Link
              href="/#contact"
              className="p-5 rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-brand-dark/5 dark:bg-white/5 hover:border-brand-accent hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-sm text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors">
                {t.notFound.links.contact.title}
              </h3>
              <p className="text-xs text-brand-dark/65 dark:text-brand-light/65 mt-1 leading-relaxed">
                {t.notFound.links.contact.desc}
              </p>
            </Link>
          </div>
        </div>

        {/* Diagnostic Telemetry Accordion / Footer Box */}
        <div className="max-w-xl mx-auto pt-6 text-left">
          <details className="group rounded-xl border border-brand-dark/10 dark:border-white/10 bg-brand-dark/[0.03] dark:bg-white/[0.03] p-4 text-xs transition-colors">
            <summary className="font-mono font-semibold uppercase tracking-wider text-brand-dark/60 dark:text-brand-light/60 cursor-pointer flex items-center justify-between group-hover:text-brand-accent">
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t.notFound.diagnosticTitle}</span>
              </span>
              <span className="text-[10px] text-brand-dark/40 dark:text-brand-light/40 font-mono">
                [Expand ▾]
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-brand-dark/10 dark:border-white/10 font-mono space-y-1.5 text-brand-dark/70 dark:text-brand-light/70 text-[11px]">
              <div className="flex justify-between">
                <span>{t.notFound.diagnosticStatus}:</span>
                <span className="font-bold text-red-500 dark:text-red-400">404 NOT_FOUND</span>
              </div>
              <div className="flex justify-between">
                <span>{t.notFound.diagnosticPath}:</span>
                <span className="text-brand-accent break-all">{currentPath || "/"}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.notFound.diagnosticTime}:</span>
                <span>{timestamp || "Realtime"}</span>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
