"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
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

const POSTS: BlogPost[] = [
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
    category: "Security & Cloud",
    date: "August 2026",
    readTime: "6 min read",
    title: "Server-Side Isolation: Hardening API Routes & Direct Mailers",
    excerpt:
      "Essential defensive patterns for securing API keys, preventing client leaks with server-only guards, and mitigating bot traffic on high-volume contact routes.",
    author: {
      name: "David K.",
      role: "Security & DevOps Lead",
    },
    content: [
      "Exposing third-party API keys in client-side bundles remains one of the most common vulnerabilities in frontend web development.",
      "Utilizing React's official 'server-only' package guarantees that internal dispatcher routines and provider credentials cannot accidentally leak into the client bundle at compile time.",
      "Combined with honeypot fields, input sanitization, and structured internal logging, web applications maintain enterprise security posture without adding friction to genuine users.",
    ],
  },
];

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <section
        id="blog"
        className="relative z-10 bg-brand-light dark:bg-[#120E0E] py-20 sm:py-28 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <FadeIn direction="up" duration={0.6}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 dark:bg-brand-accent/15 backdrop-blur-sm mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  <span className="font-mono text-xs font-semibold tracking-widest text-brand-accent uppercase">
                    Insights & Strategy
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight">
                  Articles, perspectives & engineering thoughts
                </h2>
                <p className="mt-4 text-base sm:text-lg text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                  Deep dives into modern full-stack development, design system architecture, and scalable digital product strategies from our engineering team.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-brand-dark/20 dark:border-white/20 text-brand-dark dark:text-brand-light hover:border-brand-accent hover:text-brand-accent active:scale-95 group"
                >
                  <span>Request Topic</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Blog Cards Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POSTS.map((post) => (
              <StaggerItem key={post.id}>
                <article
                  className="rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-surface-dim dark:bg-[#1A1414] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-brand-accent hover:shadow-xl hover:-translate-y-1.5 group"
                >
                  <div>
                    {/* Meta Header */}
                    <div className="flex items-center justify-between text-xs font-mono text-brand-dark/60 dark:text-brand-light/60 pb-4 mb-4 border-b border-brand-dark/10 dark:border-white/10">
                      <span className="text-brand-accent font-semibold">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Author & Read CTA */}
                  <div className="pt-6 border-t border-brand-dark/10 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-brand-dark dark:text-brand-light">
                        {post.author.name}
                      </div>
                      <div className="text-[11px] text-brand-dark/50 dark:text-brand-light/50">
                        {post.date}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-brand-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Article</span>
                      <span>→</span>
                    </button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interactive Modal Reader for Selected Post */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-brand-dark/15 dark:border-white/15 bg-brand-light dark:bg-[#1A1414] p-6 sm:p-10 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-dark/10 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-brand-accent/15 text-brand-accent text-xs font-mono font-semibold">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-brand-dark/60 dark:text-brand-light/60 font-mono">
                  {selectedPost.readTime} • {selectedPost.date}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-full border border-brand-dark/15 dark:border-white/15 flex items-center justify-center text-brand-dark/60 dark:text-brand-light/60 hover:text-brand-dark dark:hover:text-brand-light hover:border-brand-accent transition-colors"
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            {/* Modal Title */}
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-dark dark:text-brand-light leading-tight">
              {selectedPost.title}
            </h2>

            {/* Author Byline */}
            <div className="flex items-center gap-3 text-xs text-brand-dark/70 dark:text-brand-light/70">
              <span className="w-2 h-2 rounded-full bg-brand-accent" />
              <span>
                By <strong className="text-brand-dark dark:text-brand-light">{selectedPost.author.name}</strong>, {selectedPost.author.role}
              </span>
            </div>

            {/* Body Content */}
            <div className="space-y-4 text-sm sm:text-base text-brand-dark/85 dark:text-brand-light/85 leading-relaxed pt-2">
              {selectedPost.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-brand-dark/10 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs text-brand-dark/50 dark:text-brand-light/50 font-mono">
                Hextel Tech Engineering Publications
              </span>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-brand-dark dark:bg-brand-accent text-brand-light dark:text-brand-dark text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
