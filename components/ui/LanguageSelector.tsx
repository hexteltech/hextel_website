"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SupportedLanguage } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  variant?: "dropdown" | "pill-list";
  className?: string;
}

export default function LanguageSelector({
  variant = "dropdown",
  className,
}: LanguageSelectorProps) {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const currentOption = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  if (variant === "pill-list") {
    return (
      <div className={cn("flex items-center gap-1.5 flex-wrap", className)}>
        {supportedLanguages.map((item) => {
          const isActive = item.code === language;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5",
                isActive
                  ? "bg-brand-accent text-white dark:text-brand-dark shadow-sm"
                  : "bg-brand-dark/5 dark:bg-white/5 text-brand-dark/70 dark:text-brand-light/70 hover:bg-brand-dark/10 dark:hover:bg-white/10"
              )}
            >
              <span>{item.flag}</span>
              <span>{item.code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-brand-dark/5 dark:bg-white/5 hover:bg-brand-dark/10 dark:hover:bg-white/10 text-brand-dark dark:text-brand-light text-xs font-medium transition-all group active:scale-95"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Select site language"
      >
        <span className="text-sm">{currentOption.flag}</span>
        <span className="font-semibold uppercase text-[11px] tracking-wider">
          {currentOption.code}
        </span>
        <svg
          className={cn(
            "w-3 h-3 text-brand-dark/60 dark:text-brand-light/60 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-brand-light/95 dark:bg-[#1A1414]/95 backdrop-blur-md border border-brand-dark/15 dark:border-white/15 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-brand-dark/10 dark:border-white/10 text-[10px] font-semibold uppercase tracking-wider text-brand-dark/50 dark:text-brand-light/50">
            Select Language / Region
          </div>
          <div className="py-1">
            {supportedLanguages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors",
                    isSelected
                      ? "bg-brand-accent/15 text-brand-dark dark:text-brand-light font-bold"
                      : "text-brand-dark/80 dark:text-brand-light/80 hover:bg-brand-dark/5 dark:hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.flag}</span>
                    <div>
                      <span className="block leading-tight">{item.nativeName}</span>
                      <span className="text-[10px] text-brand-dark/50 dark:text-brand-light/50 font-normal">
                        {item.region}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
