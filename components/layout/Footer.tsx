import Link from "next/link";
import { BRAND_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-light border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="font-heading text-xl font-bold tracking-[0.2em] text-brand-light uppercase"
            >
              {BRAND_CONFIG.name.split(" ")[0]}
              <span className="text-brand-accent ml-1">
                {BRAND_CONFIG.name.split(" ")[1] || ""}
              </span>
            </Link>
            <p className="text-sm text-brand-light/60 max-w-sm leading-relaxed">
              {BRAND_CONFIG.tagline}. Architecting next-generation digital products and web ecosystems for high-growth enterprises.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-light/75 hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Connect
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-brand-light/75">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-light/50">
          <p>© {currentYear} {BRAND_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-brand-light/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-brand-light/80 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
