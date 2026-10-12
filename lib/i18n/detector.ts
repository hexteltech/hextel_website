import { SupportedLanguage, DetectedRegionInfo, LanguageOption } from "./types";

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    nativeName: "English",
    flag: "🇺🇸",
    region: "Global / United States",
  },
  {
    code: "pl",
    label: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    region: "Poland",
  },
  {
    code: "de",
    label: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    region: "Germany / Austria / Switzerland",
  },
  {
    code: "es",
    label: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    region: "Spain / Latin America",
  },
];

export const STORAGE_KEY = "hextel_language_preference";
export const DISMISSED_NOTICE_KEY = "hextel_region_notice_dismissed";

export function detectLanguageFromTimezone(): { language: SupportedLanguage; region: string } | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Warsaw") || tz.includes("Poland")) {
      return { language: "pl", region: "Poland (Warsaw)" };
    }
    if (tz.includes("Berlin") || tz.includes("Vienna") || tz.includes("Zurich")) {
      return { language: "de", region: "DACH Region" };
    }
    if (tz.includes("Madrid") || tz.includes("Buenos_Aires") || tz.includes("Bogota") || tz.includes("Mexico")) {
      return { language: "es", region: "Spain / Latin America" };
    }
  } catch {
    // fallback if Intl is unsupported
  }
  return null;
}

export function detectLanguageFromBrowser(): { language: SupportedLanguage; region: string } | null {
  if (typeof window === "undefined" || !navigator) return null;

  const candidateLocales = navigator.languages || [navigator.language || ""];

  for (const loc of candidateLocales) {
    if (!loc) continue;
    const lower = loc.toLowerCase();

    if (lower.startsWith("pl")) {
      return { language: "pl", region: "Browser Locale (pl)" };
    }
    if (lower.startsWith("de")) {
      return { language: "de", region: "Browser Locale (de)" };
    }
    if (lower.startsWith("es")) {
      return { language: "es", region: "Browser Locale (es)" };
    }
    if (lower.startsWith("en")) {
      return { language: "en", region: "Browser Locale (en)" };
    }
  }

  return null;
}

export async function detectRegionFromIp(
  signal?: AbortSignal
): Promise<{ language: SupportedLanguage; country: string; countryCode: string } | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const mergedSignal = signal || controller.signal;
    const res = await fetch("https://api.country.is", {
      signal: mergedSignal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    const country = (data.country || "").toUpperCase();

    if (country === "PL") {
      return { language: "pl", country: "Poland", countryCode: "PL" };
    }
    if (["DE", "AT", "CH"].includes(country)) {
      return { language: "de", country: country === "DE" ? "Germany" : country === "AT" ? "Austria" : "Switzerland", countryCode: country };
    }
    if (["ES", "MX", "AR", "CO", "CL", "PE"].includes(country)) {
      return { language: "es", country: "Hispanic Region", countryCode: country };
    }
    if (["US", "GB", "CA", "AU", "NZ", "IE"].includes(country)) {
      return { language: "en", country: "English Region", countryCode: country };
    }
  } catch {
    // Ignore network timeouts / errors silently
  }
  return null;
}

/**
 * High-precision synchronous initial language detection
 */
export function getInitialLanguageSync(): DetectedRegionInfo {
  if (typeof window === "undefined") {
    return {
      detected: false,
      language: "en",
      method: "default",
    };
  }

  // 1. Explicitly saved user choice takes highest priority
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (stored && ["en", "pl", "de", "es"].includes(stored)) {
      return {
        detected: false,
        language: stored,
        method: "stored",
      };
    }
  } catch {
    // localStorage unavailable
  }

  // 2. Region detection via TimeZone
  const tzMatch = detectLanguageFromTimezone();
  if (tzMatch) {
    return {
      detected: true,
      regionName: tzMatch.region,
      language: tzMatch.language,
      method: "timezone",
    };
  }

  // 3. Region detection via Browser Language header / navigator.languages
  const browserMatch = detectLanguageFromBrowser();
  if (browserMatch) {
    return {
      detected: true,
      regionName: browserMatch.region,
      language: browserMatch.language,
      method: "browser",
    };
  }

  // 4. Default fallback
  return {
    detected: false,
    regionName: "International",
    language: "en",
    method: "default",
  };
}
