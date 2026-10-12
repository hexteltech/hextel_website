"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MobileDrawer from "./MobileDrawer";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import LanguageSelector from "@/components/ui/LanguageSelector";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.projects, href: "/#projects" },
    { label: t.nav.reviews, href: "/#reviews" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("open-site-search"));
  };

  const openClientPortal = () => {
    window.dispatchEvent(new CustomEvent("open-client-portal"));
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 w-full z-40 transition-all duration-300",
          isScrolled
            ? "bg-brand-light/90 dark:bg-[#120E0E]/90 backdrop-blur-md py-3 shadow-md border-b border-brand-dark/10 dark:border-white/10"
            : "bg-brand-light/60 dark:bg-[#120E0E]/60 backdrop-blur-sm py-4 sm:py-5 border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
              aria-label={BRAND_CONFIG.name}
            >
              <span className="font-heading text-lg font-bold tracking-[0.2em] text-brand-dark dark:text-brand-light uppercase transition-colors">
                {BRAND_CONFIG.name.split(" ")[0]}
                <span className="text-brand-accent ml-1 group-hover:text-amber-500 transition-colors">
                  {BRAND_CONFIG.name.split(" ")[1] || ""}
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links with animated hover states */}
            <nav className="hidden lg:flex items-center justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium text-brand-dark/75 dark:text-brand-light/75 hover:text-brand-dark dark:hover:text-brand-light transition-colors py-1 group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right Actions: Search, Language, Theme Toggle, Client NDA, CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language Selector Dropdown */}
              <LanguageSelector variant="dropdown" />

              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={openSearch}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-brand-dark/5 dark:bg-white/5 hover:bg-brand-dark/10 dark:hover:bg-white/10 text-brand-dark/75 dark:text-brand-light/75 text-xs font-medium transition-all group"
                aria-label={`${t.common.quickSearch} (Cmd+K)`}
                title={`${t.common.quickSearch} (Cmd+K)`}
              >
                <svg className="w-4 h-4 text-brand-dark/70 dark:text-brand-light/70 group-hover:text-brand-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden md:inline">{t.common.quickSearch}</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-brand-dark/10 dark:bg-white/10 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Dark Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-brand-dark/5 dark:bg-white/5 text-brand-dark dark:text-brand-light hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-all active:scale-95"
                aria-label={resolvedTheme === "dark" ? t.common.lightMode : t.common.darkMode}
                title={resolvedTheme === "dark" ? t.common.lightMode : t.common.darkMode}
              >
                {resolvedTheme === "dark" ? (
                  // Sun icon
                  <svg className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" strokeWidth={2} />
                    <path strokeLinecap="round" strokeWidth={2} d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  // Moon icon
                  <svg className="w-4 h-4 text-brand-dark transition-transform duration-300 hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Client Portal NDA Trigger */}
              <button
                type="button"
                onClick={openClientPortal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-dark/75 dark:text-brand-light/75 hover:text-brand-dark dark:hover:text-brand-light border border-transparent hover:border-brand-dark/15 dark:hover:border-white/15 transition-all"
                title="Client NDA & Deliverables Portal"
              >
                <svg className="w-3.5 h-3.5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>{t.nav.portalLabel}</span>
              </button>

              {/* Start a Project CTA Button */}
              <Link
                href="/#contact"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {t.common.startProject}
              </Link>

              {/* Mobile Drawer Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-brand-dark/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
              >
                <span className="w-5 h-0.5 bg-brand-dark dark:bg-brand-light mb-1 transition-all" />
                <span className="w-5 h-0.5 bg-brand-dark dark:bg-brand-light mb-1 transition-all" />
                <span className="w-3.5 h-0.5 bg-brand-dark dark:bg-brand-light self-start ml-2.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Component */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
