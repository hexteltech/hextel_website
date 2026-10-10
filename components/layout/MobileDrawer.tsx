"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, BRAND_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Sheet */}
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-sm bg-brand-light shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header: Logo and Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-brand-dark/10">
          <span className="font-heading text-lg font-bold tracking-[0.2em] text-brand-dark uppercase">
            {BRAND_CONFIG.name}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-brand-dark/70 hover:text-brand-dark hover:bg-brand-dark/5 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 py-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="text-2xl font-heading font-medium text-brand-dark hover:text-brand-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Bottom Actions: Language & CTA */}
        <div className="space-y-4 pt-6 border-t border-brand-dark/10">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-brand-dark/70">
            <span>Language:</span>
            <button type="button" className="hover:text-brand-dark">PL</button>
            <span className="opacity-40">/</span>
            <button type="button" className="text-brand-dark font-bold underline">EN</button>
          </div>

          <Link
            href="#contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase bg-brand-dark text-brand-light hover:bg-brand-accent hover:text-brand-dark transition-all active:scale-[0.98]"
          >
            Start a project
          </Link>
        </div>
      </aside>
    </div>
  );
}
