"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, BRAND_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MobileDrawer from "./MobileDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300",
          isScrolled
            ? "bg-brand-light/95 backdrop-blur-md py-3 shadow-sm border-b border-brand-dark/10"
            : "bg-transparent py-4 sm:py-5"
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
              <span className="font-heading text-lg font-bold tracking-[0.2em] text-brand-dark uppercase">
                {BRAND_CONFIG.name.split(" ")[0]}
                <span className="text-brand-accent ml-1">
                  {BRAND_CONFIG.name.split(" ")[1] || ""}
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-brand-dark/75 transition-colors hover:text-brand-dark"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions: Language Switch & CTA */}
            <div className="flex items-center gap-3">
              <div
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-dark/60"
                aria-label="Language selector"
              >
                <button
                  type="button"
                  className="hover:text-brand-dark transition-colors"
                >
                  PL
                </button>
                <span className="opacity-40">/</span>
                <button
                  type="button"
                  className="text-brand-dark font-bold underline underline-offset-4"
                >
                  EN
                </button>
              </div>

              {/* Start a Project CTA Button */}
              <Link
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 bg-brand-dark text-brand-light hover:bg-brand-accent hover:text-brand-light active:scale-[0.98]"
              >
                Start a project
              </Link>

              {/* Mobile Drawer Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-brand-dark/5 transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
              >
                <span className="w-5 h-0.5 bg-brand-dark mb-1 transition-all" />
                <span className="w-5 h-0.5 bg-brand-dark mb-1 transition-all" />
                <span className="w-3.5 h-0.5 bg-brand-dark self-start ml-2.5 transition-all" />
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
