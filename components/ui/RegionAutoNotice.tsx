"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function RegionAutoNotice() {
  const { showAutoNotice, dismissAutoNotice, setLanguage, detectedRegion, t } = useLanguage();

  if (!showAutoNotice) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-4 sm:left-6 z-50 max-w-sm sm:max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div className="rounded-2xl p-4 bg-brand-light/95 dark:bg-[#1A1414]/95 backdrop-blur-xl border border-brand-accent/40 shadow-2xl text-brand-dark dark:text-brand-light flex items-start gap-3.5">
        {/* Globe pulse icon */}
        <div className="w-9 h-9 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              {t.regionNotice.title}
            </h4>
            <button
              type="button"
              onClick={dismissAutoNotice}
              className="text-brand-dark/40 dark:text-brand-light/40 hover:text-brand-dark dark:hover:text-brand-light transition-colors p-0.5 -mr-1"
              aria-label="Dismiss notification"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-xs text-brand-dark/80 dark:text-brand-light/80 leading-relaxed">
            {detectedRegion?.regionName
              ? `${t.regionNotice.message} (${detectedRegion.regionName})`
              : t.regionNotice.message}
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setLanguage("en", true)}
              className="px-3 py-1.5 rounded-lg bg-brand-dark text-brand-light dark:bg-white/10 dark:text-brand-light text-[11px] font-semibold hover:bg-brand-accent dark:hover:bg-brand-accent hover:text-white transition-all shadow-sm"
            >
              🇺🇸 {t.regionNotice.switchBack}
            </button>
            <button
              type="button"
              onClick={dismissAutoNotice}
              className="px-3 py-1.5 rounded-lg border border-brand-dark/15 dark:border-white/15 text-[11px] font-medium text-brand-dark/70 dark:text-brand-light/70 hover:text-brand-dark dark:hover:text-brand-light transition-colors"
            >
              {t.regionNotice.dismiss}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
