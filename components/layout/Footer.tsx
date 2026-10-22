"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const openCookies = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("open-site-search"));
  };

  const openClientPortal = () => {
    window.dispatchEvent(new CustomEvent("open-client-portal"));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark dark:bg-[#0E0A0A] text-brand-light border-t border-white/10 pt-16 pb-12 transition-colors">
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-block group"
              aria-label={BRAND_CONFIG.name}
            >
              <Image
                src="/images/hextel-logo-v3-white.png"
                alt={BRAND_CONFIG.name}
                width={180}
                height={102}
                quality={100}
                className="h-14 xs:h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-brand-light/60 max-w-sm leading-relaxed">
              {BRAND_CONFIG.tagline}. Architecting next-generation digital products and web ecosystems for high-growth enterprises.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={openSearch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-brand-light/75 hover:text-white transition-colors"
              >
                <span>Quick Search</span>
                <kbd className="text-[10px] bg-white/10 px-1 py-0.5 rounded">⌘K</kbd>
              </button>

              <button
                type="button"
                onClick={openClientPortal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-brand-light/75 hover:text-white transition-colors"
              >
                <span>Client Portal</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links with hover transitions */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-light/75 hover:text-brand-accent hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="text-sm text-brand-light/75 hover:text-brand-accent hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Back to top ↑
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Contact Info */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">
                Contact
              </h4>
              <div className="space-y-1.5 text-xs text-brand-light/75">
                <p>
                  <a href={`mailto:${BRAND_CONFIG.email}`} className="hover:text-brand-accent transition-colors font-medium">
                    {BRAND_CONFIG.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${BRAND_CONFIG.phone.replace(/\s+/g, "")}`} className="hover:text-brand-accent transition-colors font-medium">
                    {BRAND_CONFIG.phone}
                  </a>
                </p>
                <p className="text-brand-light/60">
                  {BRAND_CONFIG.address}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">
                Social
              </h4>
              <div className="flex flex-wrap gap-3 text-xs text-brand-light/75">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-accent transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-accent transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-accent transition-colors"
                >
                  X ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Privacy / Cookies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-light/50 text-center sm:text-left">
          <p>© {currentYear} {BRAND_CONFIG.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <Link
              href="/security-and-compliance"
              className="hover:text-brand-light transition-colors"
            >
              Security & Compliance
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-brand-light transition-colors"
            >
              Cookie Policy
            </Link>
            <button
              type="button"
              onClick={openCookies}
              className="hover:text-brand-light transition-colors underline underline-offset-4"
            >
              Cookie Settings
            </button>
            <Link href="/privacy-policy" className="hover:text-brand-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-brand-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
