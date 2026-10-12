"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SERVICES, PROJECTS, FAQS, NAV_LINKS, BRAND_CONFIG } from "@/lib/constants";
import { useTheme } from "@/components/providers/ThemeProvider";

interface SearchItem {
  id: string;
  category: "Navigation" | "Services" | "Projects" | "FAQ" | "Actions";
  title: string;
  subtitle?: string;
  href?: string;
  action?: () => void;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toggleTheme } = useTheme();

  // Search items index
  const items: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [];

    // Quick Actions
    list.push({
      id: "act-contact",
      category: "Actions",
      title: "Start a project",
      subtitle: "Open contact form to request a quote",
      href: "#contact",
    });
    list.push({
      id: "act-theme",
      category: "Actions",
      title: "Toggle Dark / Light Mode",
      subtitle: "Switch between light and dark visual themes",
      action: () => toggleTheme(),
    });
    list.push({
      id: "act-call",
      category: "Actions",
      title: `Call Office (${BRAND_CONFIG.phone})`,
      subtitle: "Connect with our direct support line",
      href: `tel:${BRAND_CONFIG.phone.replace(/\s+/g, "")}`,
    });
    list.push({
      id: "act-email",
      category: "Actions",
      title: `Email Us (${BRAND_CONFIG.email})`,
      subtitle: "Send an email inquiry directly",
      href: `mailto:${BRAND_CONFIG.email}`,
    });

    // Navigation links
    NAV_LINKS.forEach((link) => {
      list.push({
        id: `nav-${link.label}`,
        category: "Navigation",
        title: link.label,
        subtitle: `Jump to ${link.label} section`,
        href: link.href,
      });
    });

    // Services
    SERVICES.forEach((srv) => {
      list.push({
        id: `srv-${srv.number}`,
        category: "Services",
        title: `${srv.number} ${srv.title}`,
        subtitle: srv.description,
        href: "#services",
      });
    });

    // Projects
    PROJECTS.forEach((prj) => {
      list.push({
        id: `prj-${prj.id}`,
        category: "Projects",
        title: prj.title,
        subtitle: prj.category,
        href: prj.link,
      });
    });

    // FAQs
    FAQS.forEach((faq, i) => {
      list.push({
        id: `faq-${i}`,
        category: "FAQ",
        title: faq.question,
        subtitle: faq.answer,
        href: "#faq",
      });
    });

    return list;
  }, [toggleTheme]);

  // Global shortcut Cmd+K or Ctrl+K & custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-site-search", handleOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-site-search", handleOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter items
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q))
      );
    });
  }, [items, query, activeCategory]);

  // Keyboard navigation within list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      executeItem(filtered[selectedIndex]);
    }
  };

  const executeItem = (item: SearchItem) => {
    setIsOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      if (item.href.startsWith("#")) {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(item.href);
      }
    }
  };

  if (!isOpen) return null;

  const categories = ["All", "Services", "Projects", "FAQ", "Actions", "Navigation"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-brand-dark/70 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Site search dialog"
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-brand-light dark:bg-[#1A1414] border border-brand-dark/15 dark:border-white/15 shadow-2xl overflow-hidden text-brand-dark dark:text-brand-light animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleListKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-brand-dark/10 dark:border-white/10">
          <svg
            className="w-5 h-5 text-brand-dark/50 dark:text-brand-light/50 mr-3 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search services, case studies, questions, or actions..."
            className="w-full bg-transparent text-sm sm:text-base outline-none placeholder-brand-dark/40 dark:placeholder-brand-light/40"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs text-brand-dark/50 dark:text-brand-light/50 hover:text-brand-dark dark:hover:text-brand-light px-2"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-brand-dark/50 dark:text-brand-light/50 bg-brand-dark/5 dark:bg-white/10 rounded border border-brand-dark/10 dark:border-white/10 ml-2">
            ESC
          </kbd>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto border-b border-brand-dark/5 dark:border-white/5 bg-brand-dark/[0.02] dark:bg-white/[0.02]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark"
                  : "text-brand-dark/60 dark:text-brand-light/60 hover:text-brand-dark dark:hover:text-brand-light hover:bg-brand-dark/5 dark:hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-brand-dark/60 dark:text-brand-light/60">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-brand-dark/10 dark:bg-white/10 text-brand-dark dark:text-brand-light"
                      : "hover:bg-brand-dark/5 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">{item.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider bg-brand-dark/5 dark:bg-white/10 text-brand-accent">
                        {item.category}
                      </span>
                    </div>
                    {item.subtitle && (
                      <p className="text-xs text-brand-dark/60 dark:text-brand-light/60 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-brand-accent opacity-75">↵</span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-brand-dark/10 dark:border-white/10 bg-brand-dark/[0.02] dark:bg-white/[0.02] flex items-center justify-between text-[11px] text-brand-dark/50 dark:text-brand-light/50">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to close</span>
          </div>
          <span>Hextel Tech Command Palette</span>
        </div>
      </div>
    </div>
  );
}
