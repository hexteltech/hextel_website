"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
}

const ARTICLES: BlogPost[] = [
  {
    id: "post-1",
    category: "Architecture & Next.js",
    date: "October 2026",
    readTime: "5 min read",
    title: "Next.js 15 & React 19: Architecting Zero-Latency Enterprise Platforms",
    excerpt:
      "How server components, standalone build optimizations, and partial pre-rendering unlock sub-second global performance for modern commercial applications.",
    author: {
      name: "Alex V.",
      role: "Principal Systems Architect",
    },
    content: [
      "Modern web platforms require more than just aesthetic excellence; they demand enterprise resilience, instant interactivity, and scalable architecture.",
      "With Next.js 15 and React 19, the boundary between client reactivity and server computation has been streamlined. By leveraging React Server Components (RSC) and standalone server traces, bundle payloads delivered to mobile clients decrease dramatically.",
      "At Hextel Tech, we combine aggressive caching topologies with type-safe server actions, ensuring sensitive credentials remain isolated while delivering dynamic content at edge speeds.",
    ],
  },
  {
    id: "post-2",
    category: "Design Engineering",
    date: "September 2026",
    readTime: "4 min read",
    title: "Design Systems in Practice: Bridging Figma and Production React",
    excerpt:
      "A pragmatic guide to eliminating design debt, standardizing semantic color tokens, and orchestrating fluid Framer Motion micro-interactions.",
    author: {
      name: "Maya L.",
      role: "Lead UI/UX Engineer",
    },
    content: [
      "A design system is not merely a Figma library; it is a live contract between design intent and production implementation.",
      "By establishing semantic HSL design tokens that transition seamlessly between light and dark modes, development teams eliminate visual regressions and accelerate feature rollouts.",
      "Micro-interactions provide cognitive feedback. Subtle button hover elevations, progress indicators, and spring physics elevate digital products from functional tools to memorable brand experiences.",
    ],
  },
  {
    id: "post-3",
    category: "Infrastructure & AI",
    date: "August 2026",
    readTime: "6 min read",
    title: "From Monolith to Resilient Microservices: The Strangler-Fig Playbook",
    excerpt:
      "How high-growth technology enterprises transition legacy monolithic architectures into decoupled cloud-native ecosystems with zero customer-facing downtime.",
    author: {
      name: "Dmitri K.",
      role: "Cloud DevOps Director",
    },
    content: [
      "Attempting a total ground-up rewrite of a legacy enterprise monolith frequently leads to missed deadlines and unexpected regressions.",
      "The Strangler-Fig pattern enables teams to safely peel off bounded contexts into independent Next.js and Go microservices. Reverse proxies transparently route traffic without requiring cutover downtime.",
      "Paired with automated integration test suites and canary deployments, systems undergo painless transformation while daily transaction processing remains 100% stable.",
    ],
  },
  {
    id: "post-4",
    category: "Autonomous AI",
    date: "August 2026",
    readTime: "7 min read",
    title: "Building Production-Grade AI Copilots with RAG and Strict Guardrails",
    excerpt:
      "A deep dive into vector database indexing, hybrid semantic search, and deterministic prompt engineering to build enterprise copilots with zero hallucinations.",
    author: {
      name: "Hasaan A.",
      role: "Head of AI Architecture",
    },
    content: [
      "Enterprise clients love generative AI until an ungrounded model hallucinates pricing or leaks proprietary context.",
      "Building resilient RAG requires hybrid search combining BM25 keyword matching with dense vector embeddings in pgvector, followed by cross-encoder re-ranking.",
      "With deterministic fallback queues and human-in-the-loop triggers, AI agents perform autonomous complex workflows reliably.",
    ],
  },
  {
    id: "post-5",
    category: "Architecture & Next.js",
    date: "July 2026",
    readTime: "5 min read",
    title: "Micro-Frontends vs. Modular Monorepos in 2026",
    excerpt:
      "Why Turborepo and Next.js multi-zones outperform legacy micro-frontends in developer ergonomics, build times, and runtime reliability.",
    author: {
      name: "Alex V.",
      role: "Principal Systems Architect",
    },
    content: [
      "Micro-frontends promised independent team deployments but often resulted in fragmented runtime dependencies and CSS conflicts.",
      "Modern Next.js monorepos with Turborepo cache build artifacts across teams, enabling fast multi-zone routing with unified design tokens and strict type-safety.",
    ],
  },
  {
    id: "post-6",
    category: "Design Engineering",
    date: "June 2026",
    readTime: "4 min read",
    title: "Accessibility as a Performance Lever: High-Converting Accessible UX",
    excerpt:
      "How compliant keyboard navigation, semantic HTML5 tags, and color contrast standards directly reduce churn and increase organic search rankings.",
    author: {
      name: "Maya L.",
      role: "Lead UI/UX Engineer",
    },
    content: [
      "Accessibility is not an afterthought or compliance checklist; it is the cornerstone of intuitive digital interfaces.",
      "Clean semantic hierarchy and proper ARIA landmarks dramatically improve search engine crawling while delighting keyboard and screen reader users alike.",
    ],
  },
];

const CATEGORIES = ["All", "Architecture & Next.js", "Design Engineering", "Infrastructure & AI", "Autonomous AI"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Lock background body scroll so reading long articles only scrolls the article modal
  useEffect(() => {
    if (activeArticle) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [activeArticle]);

  const filteredPosts = ARTICLES.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Engineering & Design Journal
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-3xl mx-auto mb-6">
          Technical insights from the architects on the front lines
        </h1>
        <p className="text-base sm:text-lg text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          In-depth architectural post-mortems, design system blueprints, and practical guidance on Next.js, cloud systems, and AI automation.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by keyword or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-2xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#1A1414] text-sm text-brand-dark dark:text-brand-light placeholder:text-brand-dark/40 dark:placeholder:text-brand-light/40 focus:outline-none focus:border-brand-accent transition-colors shadow-sm"
            />
            <svg
              className="w-4 h-4 text-brand-accent absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
                selectedCategory === cat
                  ? "bg-brand-accent text-white shadow-md"
                  : "bg-brand-dark/5 dark:bg-white/5 text-brand-dark/70 dark:text-brand-light/70 hover:bg-brand-dark/10 dark:hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-base text-brand-dark/60 dark:text-brand-light/60">
              No articles found matching &quot;{searchQuery}&quot;. Try a different query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-brand-accent/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-dark/50 dark:text-brand-light/50 mb-4">
                    <span className="font-semibold text-brand-accent">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-dark/10 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-brand-dark dark:text-brand-light">{post.author.name}</div>
                    <div className="text-[10px] text-brand-dark/50 dark:text-brand-light/50">{post.author.role}</div>
                  </div>
                  <button
                    onClick={() => setActiveArticle(post)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-accent hover:underline"
                  >
                    <span>Read Full</span>
                    <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto overscroll-contain bg-brand-light dark:bg-[#1A1414] rounded-3xl p-5 xs:p-6 sm:p-10 border border-brand-dark/10 dark:border-white/10 shadow-2xl text-brand-dark dark:text-brand-light"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl bg-brand-dark/5 dark:bg-white/5 hover:bg-brand-dark/10 text-brand-dark/70 dark:text-brand-light/70 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 xs:gap-3 flex-wrap text-xs text-brand-accent font-semibold mb-3 pr-10">
              <span>{activeArticle.category}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              {activeArticle.title}
            </h2>

            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-brand-dark/10 dark:border-white/10">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 text-brand-accent font-bold flex items-center justify-center text-sm">
                {activeArticle.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold">{activeArticle.author.name}</div>
                <div className="text-xs text-brand-dark/60 dark:text-brand-light/60">{activeArticle.author.role}</div>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-brand-dark/80 dark:text-brand-light/80">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-brand-dark/10 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs text-brand-dark/50 dark:text-brand-light/50">Hextel Tech Engineering Library</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-brand-accent text-white text-xs font-semibold hover:brightness-110 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

          </div>
  );
}
