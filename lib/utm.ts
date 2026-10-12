"use client";

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref?: string;
  capturedAt?: string;
}

const STORAGE_KEY = "hextel_utm_data";

/**
 * Extracts UTM parameters from URL search params.
 */
export function extractUtmParams(searchParams: URLSearchParams): UtmData {
  const data: UtmData = {};
  const source = searchParams.get("utm_source");
  const medium = searchParams.get("utm_medium");
  const campaign = searchParams.get("utm_campaign");
  const term = searchParams.get("utm_term");
  const content = searchParams.get("utm_content");
  const ref = searchParams.get("ref");

  if (source) data.utm_source = source;
  if (medium) data.utm_medium = medium;
  if (campaign) data.utm_campaign = campaign;
  if (term) data.utm_term = term;
  if (content) data.utm_content = content;
  if (ref) data.ref = ref;

  if (Object.keys(data).length > 0) {
    data.capturedAt = new Date().toISOString();
  }

  return data;
}

/**
 * Saves UTM parameters to sessionStorage.
 */
export function persistUtmData(data: UtmData): void {
  if (typeof window === "undefined" || Object.keys(data).length === 0) return;
  try {
    const existing = getStoredUtmData();
    const merged = { ...existing, ...data };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn("[UTM] Unable to save to sessionStorage:", e);
  }
}

/**
 * Retrieves saved UTM data from sessionStorage.
 */
export function getStoredUtmData(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
