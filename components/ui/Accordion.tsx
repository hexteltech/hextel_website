"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/constants";

interface AccordionProps {
  items: FaqItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `faq-trigger-${index}`;
        const contentId = `faq-content-${index}`;

        return (
          <div
            key={index}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden",
              isOpen
                ? "bg-brand-light border-brand-accent shadow-sm"
                : "bg-surface-dim border-brand-dark/10 hover:border-brand-dark/20"
            )}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <span className="font-heading text-lg sm:text-xl font-bold text-brand-dark">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "w-8 h-8 rounded-full border border-brand-dark/15 flex items-center justify-center shrink-0 text-brand-dark transition-transform duration-300",
                    isOpen && "rotate-180 bg-brand-accent text-brand-light border-brand-accent"
                  )}
                  aria-hidden="true"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            {/* Accessible CSS Grid-based smooth expansion */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-brand-dark/75 leading-relaxed border-t border-brand-dark/5 mt-1">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
