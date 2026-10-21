"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { REVIEWS, REVIEW_STATS, ReviewItem } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "web" | "cloud" | "ai" | "design";

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Reviews" },
  { id: "web", label: "Web & SaaS" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "ai", label: "AI Agents" },
  { id: "design", label: "Design Systems" },
];

export default function ReviewsSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredReviews = activeCategory === "all"
    ? REVIEWS
    : REVIEWS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="reviews"
      aria-label="Client Testimonials and Reviews"
      className="relative py-24 sm:py-32 overflow-hidden bg-brand-light dark:bg-[#0E0A0A] transition-colors border-y border-brand-dark/10 dark:border-white/10"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-accent/5 dark:bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <FadeIn direction="up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 dark:bg-brand-accent/15 border border-brand-accent/25 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span>{t.reviews?.badge || "Verified Client Reviews"}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-1 mb-4">
              {t.reviews?.heading || "Reviews that say more"}
            </h2>

            <p className="text-base sm:text-lg text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
              {t.reviews?.description ||
                "See how collaborating with Hextel Tech translated into tangible market differentiation and measurable revenue."}
            </p>
          </div>
        </FadeIn>

        {/* Filter Tabs */}
        <FadeIn direction="up" delay={0.1} duration={0.6}>
          <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none",
                  activeCategory === cat.id
                    ? "bg-brand-dark text-white dark:bg-brand-accent dark:text-brand-dark shadow-md"
                    : "bg-surface-dim/80 dark:bg-[#161111] text-brand-dark/70 dark:text-brand-light/70 hover:bg-brand-dark/5 dark:hover:bg-white/5 border border-brand-dark/10 dark:border-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Testimonials Grid with Stagger Reveal */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredReviews.map((review, idx) => (
            <StaggerItem key={review.id || idx}>
              <article className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#161111]/90 backdrop-blur-sm border border-brand-dark/10 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-brand-accent/50 dark:hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-1.5 h-full group relative">
                <div>
                  {/* Top Bar: Stars + Metric Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400" aria-label="5 out of 5 stars">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {review.metric && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-brand-accent/10 text-brand-accent dark:bg-brand-accent/20 border border-brand-accent/30">
                        <span>{review.metric}</span>
                        {review.metricLabel && (
                          <span className="hidden sm:inline font-normal text-brand-dark/70 dark:text-brand-light/70 truncate max-w-[120px]">
                            {review.metricLabel}
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Project Tag */}
                  {review.project && (
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-dark/50 dark:text-brand-light/50 mb-3">
                      Project: <span className="text-brand-dark/80 dark:text-brand-light/85">{review.project}</span>
                    </div>
                  )}

                  {/* Quote */}
                  <blockquote className="text-sm sm:text-base text-brand-dark/85 dark:text-brand-light/85 leading-relaxed font-normal mb-6 italic">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Row */}
                <div className="flex items-center gap-3.5 pt-5 border-t border-brand-dark/10 dark:border-white/10">
                  {review.avatar ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-brand-dark/10 dark:ring-white/10 group-hover:ring-brand-accent transition-all">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-accent/30 to-amber-500/40 border border-brand-accent/40 flex items-center justify-center text-sm font-bold text-brand-dark dark:text-brand-light shrink-0">
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading font-bold text-sm text-brand-dark dark:text-brand-light truncate">
                        {review.author}
                      </h4>
                      {review.verified !== false && (
                        <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified Client">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-brand-dark/60 dark:text-brand-light/60 truncate">
                      {review.role}, <span className="font-medium text-brand-accent">{review.company}</span>
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Section Highlights / Stats Band */}
        <FadeIn direction="up" delay={0.2} duration={0.6}>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-surface-dim/60 dark:bg-[#161111]/70 border border-brand-dark/10 dark:border-white/10">
            {REVIEW_STATS.map((stat, idx) => (
              <div key={idx} className="text-center p-2">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-brand-accent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-brand-dark dark:text-brand-light mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-brand-dark/50 dark:text-brand-light/50 mt-0.5 hidden sm:block">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA Row */}
        <FadeIn direction="up" delay={0.25} duration={0.6}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm">
            <div>
              <h3 className="font-heading text-base sm:text-lg font-bold text-brand-dark dark:text-brand-light">
                Looking for verified case studies and detailed client stories?
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/70 dark:text-brand-light/70">
                Explore comprehensive technical breakdowns, metrics, and architecture reviews.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/reviews"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-brand-dark dark:text-brand-light bg-surface-dim dark:bg-white/10 hover:bg-brand-accent hover:text-white dark:hover:bg-brand-accent dark:hover:text-brand-dark transition-all duration-200"
              >
                <span>Read Full Reviews</span>
                <span className="ml-1.5">→</span>
              </Link>

              <Link
                href="/contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-accent hover:brightness-110 shadow-md transition-all duration-200"
              >
                <span>Work With Us</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
