"use client";

import { useState, useEffect } from "react";
import { BRAND_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FloatingBar() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowScrollTop(currentScrollY > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className="fixed z-40 flex flex-col items-center gap-2 sm:gap-2.5"
      style={{
        bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))",
        right: "max(1rem, calc(env(safe-area-inset-right) + 0.5rem))",
      }}
    >
      {/* Scroll-to-Top Button Toggle with Circular Progress */}
      <button
        type="button"
        onClick={scrollToTop}
        className={cn(
          "relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-brand-dark/15 dark:border-white/15 bg-brand-light/95 dark:bg-[#1A1414]/95 text-brand-dark dark:text-brand-light shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:border-brand-accent hover:scale-105 active:scale-95 group",
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll back to top"
        title={`Back to top (${Math.round(scrollProgress)}%)`}
      >
        {/* SVG Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="18"
            className="stroke-brand-dark/10 dark:stroke-white/10"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            className="stroke-brand-accent transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Up Arrow Icon */}
        <svg
          className="w-4 h-4 text-brand-dark dark:text-brand-light group-hover:text-brand-accent group-hover:-translate-y-0.5 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Direct Call Floating CTA */}
      <a
        href={`tel:${BRAND_CONFIG.phone.replace(/\s+/g, "")}`}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-brand-dark/15 dark:border-white/15 bg-brand-light/95 dark:bg-[#1A1414]/95 text-brand-dark dark:text-brand-light shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-light dark:hover:text-brand-dark hover:scale-105 active:scale-95 group"
        aria-label={`Call ${BRAND_CONFIG.name}`}
        title={`Call ${BRAND_CONFIG.phone}`}
      >
        <svg
          className="w-4 h-4 text-brand-accent group-hover:text-white dark:group-hover:text-brand-dark transition-colors"
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
