import Image from "next/image";
import { REVIEWS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-brand-light dark:bg-[#120E0E] py-20 sm:py-28 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn direction="up" duration={0.6}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Testimonials
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2 mb-4">
              Reviews that say more
            </h2>
            <p className="text-base text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
              See how collaborating with Hextel Tech translated into tangible market differentiation and measurable revenue.
            </p>
          </div>
        </FadeIn>

        {/* 3-Column Testimonials Grid with Stagger Reveal & Hover Micro-Interactions */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {REVIEWS.map((review, idx) => (
            <StaggerItem key={idx}>
              <article className="flex flex-col justify-between p-8 rounded-2xl bg-surface-dim dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-2 h-full group">
                <div>
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 text-brand-accent mb-6" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-base sm:text-lg text-brand-dark/85 dark:text-brand-light/85 leading-relaxed font-normal mb-8 italic">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Row */}
                <div className="flex items-center gap-4 pt-6 border-t border-brand-dark/10 dark:border-white/10">
                  {review.avatar && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-brand-dark/10 dark:ring-white/10 group-hover:ring-2 group-hover:ring-brand-accent transition-all">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-dark dark:text-brand-light">
                      {review.author}
                    </h4>
                    <p className="text-xs text-brand-dark/60 dark:text-brand-light/60">
                      {review.role}, <span className="font-medium text-brand-accent">{review.company}</span>
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
