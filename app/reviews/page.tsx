import type { Metadata } from "next";
import ReviewsExplorer from "@/components/reviews/ReviewsExplorer";
import { REVIEW_STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials — Hextel Tech | Engineering Digital Excellence",
  description:
    "Read verified client reviews and ratings from engineering leaders who scaled their web platforms, AI systems, and cloud infrastructure with Hextel Tech.",
  openGraph: {
    title: "Client Reviews & Testimonials — Hextel Tech",
    description:
      "4.9/5 average rating across 25+ production-grade web solutions and AI platforms built directly with our 3 founding engineers.",
  },
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Verified Client Endorsements
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
          Real software. Real metrics. Endorsements that speak for themselves.
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed mb-12">
          Discover how direct collaboration with Hextel Tech&apos;s 3 founding engineers accelerates delivery, slashes technical debt, and drives measurable business growth.
        </p>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {REVIEW_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-surface-dim/80 dark:bg-[#161111] border border-brand-dark/10 dark:border-white/10 text-center shadow-sm"
            >
              <div className="font-heading text-2xl sm:text-4xl font-bold text-brand-accent mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-dark dark:text-brand-light">
                {stat.label}
              </div>
              <div className="text-[11px] text-brand-dark/50 dark:text-brand-light/50 mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Reviews Explorer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewsExplorer />
      </section>
    </div>
  );
}
