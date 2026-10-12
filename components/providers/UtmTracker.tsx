"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { extractUtmParams, persistUtmData, getStoredUtmData, type UtmData } from "@/lib/utm";

interface UtmContextType {
  utmData: UtmData;
  hasUtm: boolean;
  clearUtm: () => void;
}

const UtmContext = createContext<UtmContextType>({
  utmData: {},
  hasUtm: false,
  clearUtm: () => {},
});

function UtmCaptureInner({ onCapture }: { onCapture: (data: UtmData) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    const extracted = extractUtmParams(searchParams);
    if (Object.keys(extracted).length > 0) {
      persistUtmData(extracted);
      onCapture(extracted);
    }
  }, [searchParams, onCapture]);

  return null;
}

export function UtmProvider({ children }: { children: React.ReactNode }) {
  const [utmData, setUtmData] = useState<UtmData>({});

  useEffect(() => {
    // Initial load from sessionStorage
    const stored = getStoredUtmData();
    if (Object.keys(stored).length > 0) {
      setUtmData(stored);
    }
  }, []);

  const handleCapture = (data: UtmData) => {
    setUtmData((prev) => ({ ...prev, ...data }));
  };

  const clearUtm = () => {
    try {
      sessionStorage.removeItem("hextel_utm_data");
    } catch {}
    setUtmData({});
  };

  const hasUtm = Boolean(
    utmData.utm_source ||
    utmData.utm_medium ||
    utmData.utm_campaign ||
    utmData.utm_content ||
    utmData.ref
  );

  return (
    <UtmContext.Provider value={{ utmData, hasUtm, clearUtm }}>
      <Suspense fallback={null}>
        <UtmCaptureInner onCapture={handleCapture} />
      </Suspense>
      {children}
    </UtmContext.Provider>
  );
}

export function useUtm() {
  return useContext(UtmContext);
}
