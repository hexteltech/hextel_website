"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import LanguageSelector from "@/components/ui/LanguageSelector";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/#home" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.blog, href: "/#blog" },
    { label: t.nav.howWeBuild, href: "/#how-we-build" },
    { label: t.nav.projects, href: "/#projects" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  // Prevent background scroll when modal is open and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  const openSearch = () => {
    onClose();
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-site-search"));
    }, 150);
  };

  const openClientPortal = () => {
    onClose();
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-client-portal"));
    }, 150);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/75 dark:bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Sheet */}
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-sm bg-brand-light dark:bg-[#1A1414] shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out text-brand-dark dark:text-brand-light border-l border-brand-dark/10 dark:border-white/10",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header: Logo and Close Button */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-brand-dark/10 dark:border-white/10">
            <span className="font-heading text-lg font-bold tracking-[0.2em] uppercase">
              {BRAND_CONFIG.name}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-brand-dark/70 dark:text-brand-light/70 hover:text-brand-dark dark:hover:text-brand-light hover:bg-brand-dark/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Bar in Mobile Menu */}
          <div className="mt-6">
            <button
              type="button"
              onClick={openSearch}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-brand-dark/5 dark:bg-white/5 text-sm text-brand-dark/70 dark:text-brand-light/70 hover:border-brand-accent transition-all"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{t.nav.searchPlaceholder}</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-brand-dark/10 dark:bg-white/10 rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="text-xl font-heading font-medium text-brand-dark dark:text-brand-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors py-1 flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Bottom Actions: Dark Mode, Client Portal, Language & CTA */}
        <div className="space-y-4 pt-6 border-t border-brand-dark/10 dark:border-white/10">
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark/70 dark:text-brand-light/70">
              {t.common.appearance}
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-brand-dark/15 dark:border-white/15 text-xs font-semibold hover:border-brand-accent transition-colors"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <span className="text-amber-400">☀ {t.common.lightMode}</span>
                </>
              ) : (
                <>
                  <span>☾ {t.common.darkMode}</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={openClientPortal}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-brand-dark/15 dark:border-white/15 text-xs font-semibold uppercase tracking-wider text-brand-dark dark:text-brand-light hover:border-brand-accent transition-colors"
          >
            <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{t.common.clientPortal}</span>
          </button>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-brand-dark/70 dark:text-brand-light/70">
              <span>{t.common.language}:</span>
            </div>
            <LanguageSelector variant="pill-list" />
          </div>

          <Link
            href="/#contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:opacity-90 transition-all active:scale-[0.98] shadow-lg"
          >
            {t.common.startProject}
          </Link>
        </div>
      </aside>
    </div>
  );
}
