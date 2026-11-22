"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerNavLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.howWeBuild, href: "/how-we-build" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.reviews, href: "/reviews" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const openCookies = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
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
              {t.footer?.tagline || BRAND_CONFIG.tagline}
            </p>

          </div>

          {/* Quick Navigation Links with hover transitions */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              {t.footer?.navHeading || "Navigation"}
            </h4>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
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
                  {t.common?.backToTop || "Back to top"} ↑
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Contact Info */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">
                {t.footer?.connectHeading || "Contact"}
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
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND_CONFIG.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-accent transition-colors inline-flex items-center gap-1 group"
                    title="View headquarters on Google Maps"
                  >
                    <span>{BRAND_CONFIG.address}</span>
                    <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
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
          <p>© {currentYear} {BRAND_CONFIG.name}. {t.footer?.rightsReserved || "All rights reserved."}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <Link
              href="/security-and-compliance"
              className="hover:text-brand-light transition-colors"
            >
              {t.nav.about === "O nas"
                ? "Bezpieczeństwo i Compliance"
                : t.nav.about === "Über uns"
                ? "Sicherheit & Compliance"
                : t.nav.about === "Nosotros"
                ? "Seguridad y Cumplimiento"
                : "Security & Compliance"}
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-brand-light transition-colors"
            >
              {t.nav.about === "O nas"
                ? "Polityka Cookies"
                : t.nav.about === "Über uns"
                ? "Cookie-Richtlinie"
                : t.nav.about === "Nosotros"
                ? "Política de Cookies"
                : "Cookie Policy"}
            </Link>
            <button
              type="button"
              onClick={openCookies}
              className="hover:text-brand-light transition-colors underline underline-offset-4"
            >
              {t.footer?.cookieSettings || "Cookie Settings"}
            </button>
            <Link href="/privacy-policy" className="hover:text-brand-light transition-colors">
              {t.footer?.privacyPolicy || "Privacy Policy"}
            </Link>
            <Link href="/contact" className="hover:text-brand-light transition-colors">
              {t.footer?.termsOfService || "Terms of Service"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
