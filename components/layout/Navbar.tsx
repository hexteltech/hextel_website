"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MobileDrawer from "./MobileDrawer";
import ServicesDropdown from "./ServicesDropdown";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import LanguageSelector from "@/components/ui/LanguageSelector";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.services, href: "/services", isServices: true },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.howWeBuild, href: "/how-we-build" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 w-full z-40 transition-all duration-300",
          isScrolled
            ? "bg-brand-light/90 dark:bg-[#120E0E]/90 backdrop-blur-md py-2.5 shadow-md border-b border-brand-dark/10 dark:border-white/10"
            : "bg-brand-light/60 dark:bg-[#120E0E]/60 backdrop-blur-sm py-3.5 sm:py-4 border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={navContainerRef} className="flex items-center justify-between gap-4">
            {/* Brand Logo - 1.5x larger */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none shrink-0 py-0.5"
              aria-label={BRAND_CONFIG.name}
            >
              {/* Light Mode Logo */}
              <Image
                src="/images/hextel-logo-horizontal.png"
                alt="Hextel Technologies"
                width={260}
                height={90}
                priority
                className="h-[52px] sm:h-[60px] w-auto object-contain block dark:hidden transition-transform duration-300 group-hover:scale-105"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/hextel-logo-horizontal-white.png"
                alt="Hextel Technologies"
                width={260}
                height={90}
                priority
                className="h-[52px] sm:h-[60px] w-auto object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation Links with Services Mega-Dropdown */}
            <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6">
              {navLinks.map((link) => {
                if (link.isServices) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        className="relative flex items-center gap-1.5 text-xs xl:text-sm font-medium text-brand-dark/75 dark:text-brand-light/75 hover:text-brand-dark dark:hover:text-brand-light transition-colors py-1 group whitespace-nowrap focus:outline-none"
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                      >
                        <span>{link.label}</span>
                        <svg
                          className={cn(
                            "w-3.5 h-3.5 text-brand-dark/50 dark:text-brand-light/50 transition-transform duration-200 group-hover:text-brand-accent",
                            servicesOpen && "rotate-180 text-brand-accent"
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 h-0.5 bg-brand-accent transition-all duration-300",
                            servicesOpen ? "w-full" : "w-0 group-hover:w-full"
                          )}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setServicesOpen(false)}
                    className="relative text-xs xl:text-sm font-medium text-brand-dark/75 dark:text-brand-light/75 hover:text-brand-dark dark:hover:text-brand-light transition-colors py-1 group whitespace-nowrap"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions: Language Selector and Dark Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Selector Dropdown */}
              <LanguageSelector variant="dropdown" />

              {/* Dark Mode Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-brand-dark/5 dark:bg-white/5 text-brand-dark dark:text-brand-light hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-all active:scale-95"
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

            {/* Services Dropdown anchored to container center */}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block"
            >
              <ServicesDropdown
                isOpen={servicesOpen}
                onClose={() => setServicesOpen(false)}
              />
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
