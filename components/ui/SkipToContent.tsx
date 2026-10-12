"use client";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-5 py-3 rounded-xl bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark font-semibold text-xs tracking-wider uppercase shadow-2xl ring-2 ring-brand-accent transition-all focus:outline-none"
    >
      Skip to content
    </a>
  );
}
