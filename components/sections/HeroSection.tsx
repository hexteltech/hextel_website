import Image from "next/image";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem, FloatingElement } from "@/components/ui/Motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-light dark:bg-[#120E0E] pt-8 sm:pt-12 pb-0 transition-colors"
    >
      <div id="hero" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-t-2xl bg-surface-dim dark:bg-[#1A1414] border border-brand-dark/5 dark:border-white/5 p-5 xs:p-6 sm:p-10 lg:p-16 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content Column with Staggered Entrance */}
            <div className="flex flex-col justify-center space-y-5 sm:space-y-6 lg:space-y-8">
              <FadeIn direction="down" duration={0.5}>
                <span className="text-[11px] xs:text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark/60 dark:text-brand-light/60">
                  Strategy / Design / Technology
                </span>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} duration={0.65}>
                <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-dark dark:text-brand-light leading-[1.08] sm:leading-[1.05]">
                  New possibilities for{" "}
                  <span className="text-brand-accent underline decoration-brand-accent/30 decoration-wavy underline-offset-8">
                    ambitious brands
                  </span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} duration={0.65}>
                <p className="text-sm sm:text-base lg:text-lg text-brand-dark/80 dark:text-brand-light/80 leading-relaxed max-w-xl">
                  {BRAND_CONFIG.lead}
                </p>
              </FadeIn>

              {/* CTAs with Rich Hover States */}
              <FadeIn direction="up" delay={0.3} duration={0.65}>
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 pt-2">
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-center"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="#about"
                    className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 border border-brand-dark/20 dark:border-white/20 text-brand-dark dark:text-brand-light hover:bg-brand-dark/5 dark:hover:bg-white/5 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-center"
                  >
                    Meet the team
                  </Link>
                </div>
              </FadeIn>

              {/* Trusted By Client Logos */}
              <FadeIn direction="up" delay={0.4} duration={0.65}>
                <div className="pt-6 sm:pt-8 border-t border-brand-dark/10 dark:border-white/10">
                  <p className="text-[11px] xs:text-xs font-medium text-brand-dark/50 dark:text-brand-light/50 uppercase tracking-widest mb-3 sm:mb-4">
                    Trusted by industry leaders
                  </p>
                  <div className="flex flex-wrap items-center gap-4 xs:gap-6 sm:gap-8 opacity-75">
                    {BRAND_CONFIG.trustedBy.map((brand) => (
                      <span
                        key={brand}
                        className="font-heading font-bold text-xs xs:text-sm tracking-wider text-brand-dark/80 dark:text-brand-light/80 hover:text-brand-accent dark:hover:text-brand-accent hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Visual Column with Organic Floating Element */}
            <FadeIn direction="left" delay={0.2} duration={0.8} className="relative flex items-center justify-center min-h-[300px] xs:min-h-[360px] sm:min-h-[440px] lg:min-h-[520px]">
              <FloatingElement distance={10} duration={5} className="w-full">
                <div className="relative w-full max-w-[480px] h-[300px] xs:h-[360px] sm:h-[440px] lg:h-[520px] mx-auto overflow-hidden hero-photo-blob shadow-2xl">
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
          className="grid grid-cols-2 lg:grid-cols-4 rounded-t-2xl bg-brand-dark dark:bg-[#1A1414] border-t border-x border-white/10 text-brand-light px-4 py-6 sm:px-12 sm:py-10 gap-4 sm:gap-8 -mt-2 shadow-xl"
        >
          {BRAND_CONFIG.stats.map((stat, idx) => (
            <StaggerItem
              key={idx}
              className="flex flex-col items-center text-center space-y-1 group"
            >
              <strong className="font-heading text-2xl xs:text-3xl sm:text-4xl font-bold text-brand-accent tracking-tight group-hover:scale-110 group-hover:text-amber-400 transition-transform duration-300 inline-block">
                {stat.value}
              </strong>
              <span className="text-[11px] xs:text-xs sm:text-sm text-brand-light/75 font-medium leading-tight">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
