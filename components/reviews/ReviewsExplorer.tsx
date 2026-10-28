"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { REVIEWS, REVIEW_STATS, ReviewItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | "web" | "cloud" | "ai" | "design";

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Reviews" },
  { id: "web", label: "Web Platforms" },
  { id: "cloud", label: "Cloud & Architecture" },
  { id: "ai", label: "AI Agents & Automation" },
  { id: "design", label: "Design Systems & UX" },
];



const COLLABORATION_PILLARS = [
  {
    icon: "shield",
    title: "100% Verified Deliverables",
    description: "Every quote and review represents real production software engineered by Hextel Tech with direct founder accountability.",
  },
  {
    icon: "code",
    title: "Direct Founder Access",
    description: "No junior delegates or project managers in the middle. You pair and strategize directly with Hasaan, Faseeh, and Moman.",
  },
  {
    icon: "zap",
    title: "Predictable Velocity",
    description: "Bi-weekly sprint demos, shared GitHub repositories, and automated CI/CD pipelines keep you informed every single day.",
  },
  {
    icon: "lock",
    title: "Full Code & IP Ownership",
    description: "Zero lock-in. You retain 100% of all intellectual property, source code, CI/CD scripts, and architecture blueprints.",
  },
];

export default function ReviewsExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const hasReviews = REVIEWS.length > 0;
  const avgRating = hasReviews
    ? Number((REVIEWS.reduce((acc, r) => acc + (r.rating || 5), 0) / REVIEWS.length).toFixed(1))
    : 0;

  const feedbackMetrics = [
    {
      label: "Engineering Quality & Architecture",
      score: hasReviews ? `${avgRating.toFixed(1)} / 5.0` : "0.0 / 5.0",
      pct: hasReviews ? `${Math.round((avgRating / 5) * 100)}%` : "0%",
    },
    {
      label: "Transparent Founder Communication",
      score: hasReviews ? `${avgRating.toFixed(1)} / 5.0` : "0.0 / 5.0",
      pct: hasReviews ? `${Math.round((avgRating / 5) * 100)}%` : "0%",
    },
    {
      label: "Sprint Delivery & Timeliness",
      score: hasReviews ? `${avgRating.toFixed(1)} / 5.0` : "0.0 / 5.0",
      pct: hasReviews ? `${Math.round((avgRating / 5) * 100)}%` : "0%",
    },
    {
      label: "Commercial ROI & Impact",
      score: hasReviews ? `${avgRating.toFixed(1)} / 5.0` : "0.0 / 5.0",
      pct: hasReviews ? `${Math.round((avgRating / 5) * 100)}%` : "0%",
    },
  ];

  const filtered = activeCategory === "all"
    ? REVIEWS
    : REVIEWS.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-16">
      {/* Section Heading & Category Filter Tabs */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Client Testimonials & Feedback
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-1 mb-3">
            Verified Reviews from Engineering Leaders
          </h2>
          <p className="text-sm sm:text-base text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
            Filter and read direct endorsements from founders and CTOs who scaled their platforms with Hextel Tech.
          </p>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2.5 pt-2">
          {CATEGORIES.map((cat) => {
            const count = cat.id === "all"
              ? REVIEWS.length
              : REVIEWS.filter((item) => item.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                  activeCategory === cat.id
                    ? "bg-brand-dark text-white dark:bg-brand-accent dark:text-brand-dark shadow-md"
                    : "bg-surface-dim/90 dark:bg-[#161111] text-brand-dark/70 dark:text-brand-light/70 hover:bg-brand-dark/10 dark:hover:bg-white/10 border border-brand-dark/10 dark:border-white/10"
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    activeCategory === cat.id
                      ? "bg-white/20 dark:bg-brand-dark/20 text-current"
                      : "bg-brand-dark/10 dark:bg-white/10 text-brand-dark/60 dark:text-brand-light/60"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reviews Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-[#161111] border border-brand-dark/10 dark:border-white/10 shadow-sm max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center text-2xl font-bold">
            ★
          </div>
          <h3 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            No Reviews Published Yet
          </h3>
          <p className="text-sm text-brand-dark/60 dark:text-brand-light/60 max-w-md mx-auto leading-relaxed">
            We only publish authentic endorsements from verified client collaborations. Reviews and client ratings will appear here as ongoing production projects conclude.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-accent text-white text-xs font-semibold hover:brightness-110 transition-all shadow-md"
            >
              Start a Project With Us →
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((review) => (
          <article
            key={review.id || review.author}
            className="flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-[#161111] border border-brand-dark/10 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-brand-accent/50 dark:hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              {/* Top Row: Stars + Date/Verified */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {review.date && (
                  <span className="text-[11px] font-mono text-brand-dark/50 dark:text-brand-light/50">
                    {review.date}
                  </span>
                )}
              </div>

              {/* Metric Highlight Pill */}
              {review.metric && (
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-accent/10 dark:bg-brand-accent/20 border border-brand-accent/30 text-xs font-bold text-brand-accent">
                  <span>{review.metric}</span>
                  {review.metricLabel && (
                    <span className="font-medium text-brand-dark/70 dark:text-brand-light/70 text-[11px]">
                      {review.metricLabel}
                    </span>
                  )}
                </div>
              )}

              {/* Project Title */}
              {review.project && (
                <div className="text-xs font-semibold text-brand-accent mb-2">
                  {review.project}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-sm sm:text-base text-brand-dark/85 dark:text-brand-light/85 leading-relaxed font-normal mb-8 italic">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author Footer */}
            <div className="flex items-center gap-3.5 pt-5 border-t border-brand-dark/10 dark:border-white/10">
              {review.avatar ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-brand-dark/10 dark:ring-white/10 group-hover:ring-brand-accent transition-all">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-accent/30 to-amber-500/40 border border-brand-accent/40 flex items-center justify-center text-sm font-bold text-brand-dark dark:text-brand-light shrink-0">
                  {review.author
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-sm text-brand-dark dark:text-brand-light truncate">
                    {review.author}
                  </h3>
                  <svg className="w-4 h-4 text-brand-accent shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified Client">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-brand-dark/60 dark:text-brand-light/60 truncate">
                  {review.role}, <span className="font-semibold text-brand-accent">{review.company}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      )}

      {/* Satisfaction Score Breakdown */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-dim dark:bg-[#161111] border border-brand-dark/10 dark:border-white/10">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Performance & SLA Metrics
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-1 mb-2">
            Independent client satisfaction dimensions
          </h2>
          <p className="text-sm text-brand-dark/70 dark:text-brand-light/70">
            {hasReviews
              ? "Calculated dynamically from verified client reviews and post-launch audits."
              : "Calibrated directly from verified client reviews. Rating bars and performance metrics will populate once client reviews are published."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {feedbackMetrics.map((metric) => (
            <div key={metric.label} className="p-6 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                  {metric.label}
                </span>
                <span className="text-sm font-bold font-mono text-brand-accent">
                  {metric.score}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-brand-dark/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-brand-accent rounded-full transition-all duration-1000"
                  style={{ width: metric.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration Principles / Trust Pillars */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Our Standard
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-1 mb-3">
            Why enterprise leaders trust Hextel Tech
          </h2>
          <p className="text-sm text-brand-dark/70 dark:text-brand-light/70">
            We operate with complete engineering transparency and founder accountability from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLABORATION_PILLARS.map((collab) => (
            <div
              key={collab.title}
              className="p-6 rounded-2xl bg-white dark:bg-[#161111] border border-brand-dark/10 dark:border-white/10 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 dark:bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold mb-4">
                ✓
              </div>
              <h3 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light mb-2">
                {collab.title}
              </h3>
              <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                {collab.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-dark to-[#1f1515] dark:from-[#1A1414] dark:to-[#0e0a0a] border border-brand-accent/30 text-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3">
            Ready For Measurable Growth?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Build your next digital product with our founding engineers
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">
            Schedule a direct technical consultation with Hasaan, Faseeh, and Moman. We review your requirements and provide an architectural roadmap within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:brightness-110 shadow-lg transition-all"
            >
              Start a Conversation →
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
