"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "hextel_theme_preference";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  const applyThemeToDOM = useCallback((resolved: "light" | "dark") => {
    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      const initialTheme = (saved === "light" || saved === "dark" || saved === "system") ? saved : "system";
      setThemeState(initialTheme);

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const computedResolved = initialTheme === "system"
        ? (mediaQuery.matches ? "dark" : "light")
        : initialTheme;

      setResolvedTheme(computedResolved);
      applyThemeToDOM(computedResolved);

      const handleMediaChange = (e: MediaQueryListEvent) => {
        const currentSaved = localStorage.getItem(THEME_STORAGE_KEY);
        if (!currentSaved || currentSaved === "system") {
          const next = e.matches ? "dark" : "light";
          setResolvedTheme(next);
          applyThemeToDOM(next);
        }
      };

      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    } catch {
      // fallback
    }
  }, [applyThemeToDOM]);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const nextResolved = nextTheme === "system"
      ? (mediaQuery.matches ? "dark" : "light")
      : nextTheme;

    setResolvedTheme(nextResolved);
    applyThemeToDOM(nextResolved);
  };

  const toggleTheme = () => {
    const currentIsDark = document.documentElement.classList.contains("dark") || resolvedTheme === "dark";
    const next: "light" | "dark" = currentIsDark ? "light" : "dark";

    // Immediate DOM update for instantaneous feedback
    applyThemeToDOM(next);
    setResolvedTheme(next);
    setThemeState(next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
