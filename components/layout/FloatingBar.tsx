"use client";

import { useState, useEffect } from "react";
import { BRAND_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FloatingBar() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY > 200);
      setShowScrollTop(currentScrollY > 300 && currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Scroll-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          "w-12 h-12 rounded-full border border-brand-dark/10 bg-white/90 text-brand-dark/70 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark hover:scale-105 active:scale-95",
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none hidden"
        )}
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Call CTA Button */}
      <a
        href={`tel:${BRAND_CONFIG.phone.replace(/\s+/g, "")}`}
        className="w-12 h-12 rounded-full border border-brand-dark/10 bg-white/90 text-brand-dark/70 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark hover:scale-105 active:scale-95"
        aria-label="Call Hextel Tech"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </a>
    </div>
  );
}
