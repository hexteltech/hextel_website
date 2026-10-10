import Image from "next/image";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-light pt-[calc(var(--site-header-height,5.75rem)+1.5rem)] pb-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-t-2xl bg-surface-dim border border-brand-dark/5 p-6 sm:p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark/60">
                Strategy / Design / Technology
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-dark leading-[1.05]">
                New possibilities for{" "}
                <span className="text-brand-accent underline decoration-brand-accent/30 decoration-wavy underline-offset-8">
                  ambitious brands
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-dark/80 leading-relaxed max-w-xl">
                {BRAND_CONFIG.lead}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-200 bg-brand-dark text-brand-light hover:bg-brand-accent hover:text-brand-dark shadow-md active:scale-[0.98]"
                >
                  Start a project
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-200 border border-brand-dark/20 text-brand-dark hover:bg-brand-dark/5 active:scale-[0.98]"
                >
                  Meet the team
                </Link>
              </div>

              {/* Trusted By Client Logos */}
              <div className="pt-8 border-t border-brand-dark/10">
                <p className="text-xs font-medium text-brand-dark/50 uppercase tracking-widest mb-4">
                  Trusted by industry leaders
                </p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-70">
                  {BRAND_CONFIG.trustedBy.map((brand) => (
                    <span
                      key={brand}
                      className="font-heading font-bold text-sm tracking-wider text-brand-dark/80"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Column with SVG Blob Mask */}
            <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
              <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] overflow-hidden hero-photo-blob shadow-2xl">
                <Image
                  src="/images/t001-nova-hero.webp"
                  alt="Hextel Tech team architecting digital product"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-t-2xl bg-brand-dark text-brand-light px-6 py-8 sm:px-12 sm:py-10 gap-6 sm:gap-8 -mt-2 shadow-xl">
          {BRAND_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-1"
            >
              <strong className="font-heading text-3xl sm:text-4xl font-bold text-brand-accent tracking-tight">
                {stat.value}
              </strong>
              <span className="text-xs sm:text-sm text-brand-light/75 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
