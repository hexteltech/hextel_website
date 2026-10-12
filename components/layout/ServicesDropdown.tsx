"use client";

import React from "react";
import Link from "next/link";
import { SERVICE_COLUMNS, DetailedService } from "@/lib/constants";

export function ServiceIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  switch (name) {
    case "users":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "rocket":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m-.12-4.8a14.94 14.94 0 012.58-5.84M8.41 9.63A14.98 14.98 0 002.25 15.79a14.98 14.98 0 0012.12 6.16v-4.8" />
        </svg>
      );
    case "database":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3m18 7c0 1.66-4 3-9 3s-9-1.34-9-3" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "plug":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "check-circle":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "palette":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4 4 4 0 014-4c2 0 2-2 4-2s2 2 4 2a4 4 0 014 4 4 4 0 01-4 4H7z" />
          <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "cpu":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.8} />
          <rect x="9" y="9" width="6" height="6" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      );
    case "refresh":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "zap":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "layers":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "code":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "monitor":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 21h8m-4-4v4" />
        </svg>
      );
    case "smartphone":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth={1.8} />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "globe":
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
  }
}

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesDropdown({ isOpen, onClose }: ServicesDropdownProps) {
  if (!isOpen) return null;

  return (
    <div
      role="menu"
      aria-label="Services Catalog"
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[880px] xl:w-[960px] max-w-[95vw] z-50 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="relative rounded-2xl bg-brand-light/95 dark:bg-[#161111]/95 backdrop-blur-2xl border border-brand-dark/15 dark:border-white/15 shadow-2xl p-6 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-dark/10 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark/80 dark:text-brand-light/80">
              Complete Services & Solutions Catalog
            </span>
          </div>
          <span className="text-xs text-brand-dark/50 dark:text-brand-light/50 font-medium">
            17 Tailored Capabilities
          </span>
        </div>

        {/* 3 Columns Grid (Equal Parts: 6, 6, 5) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-brand-dark/10 dark:divide-white/10">
          {SERVICE_COLUMNS.map((column, colIdx) => (
            <div
              key={column.title}
              className={colIdx > 0 ? "md:pl-6 pt-4 md:pt-0" : "pt-4 md:pt-0"}
            >
              {/* Column Title */}
              <div className="mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  {column.title}
                </h4>
                <p className="text-[11px] text-brand-dark/50 dark:text-brand-light/50">
                  {column.subtitle}
                </p>
              </div>

              {/* Service Items */}
              <ul className="space-y-1">
                {column.services.map((service: DetailedService) => (
                  <li key={service.id}>
                    <Link
                      href={`/#services`}
                      onClick={onClose}
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-dark/5 dark:hover:bg-white/5 transition-all duration-200"
                    >
                      <div className="w-7 h-7 rounded-lg bg-brand-dark/5 dark:bg-white/5 flex items-center justify-center shrink-0 text-brand-dark/70 dark:text-brand-light/70 group-hover:text-brand-accent group-hover:bg-brand-accent/10 transition-colors mt-0.5">
                        <ServiceIcon name={service.icon} className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors leading-snug">
                            {service.title}
                          </span>
                          {service.tag && (
                            <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-brand-accent/15 text-brand-accent">
                              {service.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-brand-dark/50 dark:text-brand-light/50 line-clamp-1 group-hover:text-brand-dark/80 dark:group-hover:text-brand-light/80 transition-colors mt-0.5">
                          {service.shortDesc}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar Call-to-Action */}
        <div className="mt-5 pt-4 border-t border-brand-dark/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-brand-dark/[0.02] dark:bg-white/[0.02] -mx-6 -mb-6 px-6 py-3.5">
          <div className="flex items-center gap-2 text-xs text-brand-dark/70 dark:text-brand-light/70">
            <span className="font-medium">Need a specialized tech stack or dedicated architects?</span>
          </div>
          <Link
            href="/#contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:underline transition-all"
          >
            <span>Request custom consultation</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
