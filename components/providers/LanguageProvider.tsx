"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SupportedLanguage, DetectedRegionInfo, LanguageOption, TranslationSchema } from "@/lib/i18n/types";
import {
  SUPPORTED_LANGUAGES,
  STORAGE_KEY,
  DISMISSED_NOTICE_KEY,
  getInitialLanguageSync,
  detectRegionFromIp,
} from "@/lib/i18n/detector";
import { translations } from "@/lib/i18n/translations";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage, isManual?: boolean) => void;
  t: TranslationSchema;
  detectedRegion: DetectedRegionInfo | null;
  showAutoNotice: boolean;
  dismissAutoNotice: () => void;
  supportedLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [detectedRegion, setDetectedRegion] = useState<DetectedRegionInfo | null>(null);
  const [showAutoNotice, setShowAutoNotice] = useState(false);

  // Initialize language on client mount
  useEffect(() => {
    const initial = getInitialLanguageSync();
    setLanguageState(initial.language);
    setDetectedRegion(initial);

    // If auto-detected (not manually stored before) and not previously dismissed
    if (initial.detected && initial.language !== "en") {
      try {
        const dismissed = sessionStorage.getItem(DISMISSED_NOTICE_KEY);
        if (!dismissed) {
          setShowAutoNotice(true);
        }
      } catch {
        setShowAutoNotice(true);
      }
    }

    // Async background refinement: Check IP country if no user manual override exists
    if (initial.method !== "stored") {
      const controller = new AbortController();
      detectRegionFromIp(controller.signal).then((geo) => {
        if (!geo) return;

        // If user already manually selected something in this session, don't overwrite
        const currentStored = localStorage.getItem(STORAGE_KEY);
        if (currentStored) return;

        // If geo detected a language different from english or matched poland/germany/spain
        if (geo.language && geo.language !== initial.language) {
          setLanguageState(geo.language);
          setDetectedRegion({
            detected: true,
            regionName: geo.country,
            countryCode: geo.countryCode,
            language: geo.language,
            method: "ip-geo",
          });
          setShowAutoNotice(true);
        }
      });

      return () => controller.abort();
    }
  }, []);

  // Sync document lang attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((newLang: SupportedLanguage, isManual = true) => {
    setLanguageState(newLang);
    if (isManual) {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        setShowAutoNotice(false);
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  const dismissAutoNotice = useCallback(() => {
    setShowAutoNotice(false);
    try {
      sessionStorage.setItem(DISMISSED_NOTICE_KEY, "true");
    } catch {
      // ignore storage errors
    }
  }, []);

  const currentTranslation = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: currentTranslation,
        detectedRegion,
        showAutoNotice,
        dismissAutoNotice,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
