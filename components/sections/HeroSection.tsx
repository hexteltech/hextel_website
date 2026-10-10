import Image from "next/image";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem, FloatingElement } from "@/components/ui/Motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-light pt-[calc(var(--site-header-height,5.75rem)+1.5rem)] pb-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-t-2xl bg-surface-dim border border-brand-dark/5 p-6 sm:p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Content Column with Staggered Entrance */}
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
              <FadeIn direction="down" duration={0.5}>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark/60">
                  Strategy / Design / Technology
                </span>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} duration={0.65}>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-dark leading-[1.05]">
                  New possibilities for{" "}
                  <span className="text-brand-accent underline decoration-brand-accent/30 decoration-wavy underline-offset-8">
                    ambitious brands
                  </span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} duration={0.65}>
                <p className="text-base sm:text-lg text-brand-dark/80 leading-relaxed max-w-xl">
                  {BRAND_CONFIG.lead}
                </p>
              </FadeIn>

              {/* CTAs */}
              <FadeIn direction="up" delay={0.3} duration={0.65}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light hover:bg-brand-accent hover:text-brand-light shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="#about"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 border border-brand-dark/20 text-brand-dark hover:bg-brand-dark/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  >
                    Meet the team
                  </Link>
                </div>
              </FadeIn>

              {/* Trusted By Client Logos */}
              <FadeIn direction="up" delay={0.4} duration={0.65}>
                <div className="pt-8 border-t border-brand-dark/10">
                  <p className="text-xs font-medium text-brand-dark/50 uppercase tracking-widest mb-4">
                    Trusted by industry leaders
                  </p>
                  <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-70">
                    {BRAND_CONFIG.trustedBy.map((brand) => (
                      <span
                        key={brand}
                        className="font-heading font-bold text-sm tracking-wider text-brand-dark/80 hover:text-brand-accent transition-colors duration-200 cursor-default"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Visual Column with Organic Floating Element */}
            <FadeIn direction="left" delay={0.2} duration={0.8} className="relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
              <FloatingElement distance={10} duration={5} className="w-full">
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
              </FloatingElement>
            </FadeIn>
          </div>
        </div>

        {/* Hero Stats Strip with Sequential Stagger */}
        <StaggerContainer
          staggerDelay={0.12}
          delayChildren={0.2}
          className="grid grid-cols-2 lg:grid-cols-4 rounded-t-2xl bg-brand-dark text-brand-light px-6 py-8 sm:px-12 sm:py-10 gap-6 sm:gap-8 -mt-2 shadow-xl"
        >
          {BRAND_CONFIG.stats.map((stat, idx) => (
            <StaggerItem
              key={idx}
              className="flex flex-col items-center text-center space-y-1"
            >
              <strong className="font-heading text-3xl sm:text-4xl font-bold text-brand-accent tracking-tight hover:scale-110 transition-transform duration-300 inline-block">
                {stat.value}
              </strong>
              <span className="text-xs sm:text-sm text-brand-light/75 font-medium">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
