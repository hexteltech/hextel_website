"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

const TEAM_AVATARS = [
  { src: "/images/hasaan-ahmad-avatar.jpg", alt: "Hasaan Ahmad - CEO & Business Development" },
  { src: "/images/faseeh-altaf-v2-avatar.jpg", alt: "Muhammad Faseeh Altaf - Marketing Expert & Full Stack Developer" },
  { src: "/images/moman-salman-avatar.jpg", alt: "Moman Salman - Full Stack Developer & AI Automation Expert" },
];

const DEFAULT_VALUE_PROPS = [
  "Strategic engineering & architecture",
  "Tailored, human-centered UX design",
  "Dedicated ongoing support & SLAs",
];

export default function TeamSection() {
  const { t } = useLanguage();
  const values = t.team?.values && t.team.values.length > 0 ? t.team.values : DEFAULT_VALUE_PROPS;

  return (
    <section id="about" className="bg-brand-light dark:bg-[#120E0E] py-20 sm:py-28 transition-colors">
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Team Photo with Soft Zoom & Reveal */}
          <FadeIn direction="right" duration={0.7}>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 shadow-xl">
              <Image
                src="/images/t001-nova-about-team-1280.webp"
                alt="Hextel Tech team collaborating in modern workspace"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn direction="left" delay={0.15} duration={0.7} className="flex flex-col space-y-6 lg:space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {t.team?.badge || "Our Founders & Values"}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
                {t.team?.heading || "Built by 3 dedicated founders"}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-brand-dark/80 dark:text-brand-light/80 leading-relaxed">
              {t.team?.description || "We are 3 friends and builders combining full-stack development, AI automation, and business growth. When you work with Hextel Tech, you collaborate directly with the founders building your software—zero corporate bureaucracy, pure velocity."}
            </p>

            {/* Avatar Stack & Credentials with Hover Animation */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex -space-x-3 overflow-hidden">
                {TEAM_AVATARS.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="relative w-12 h-12 rounded-full ring-2 ring-brand-light dark:ring-[#120E0E] overflow-hidden shadow-sm hover:scale-110 hover:z-10 transition-transform duration-200"
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                <span>{t.team?.specialistsBadge || "3 Co-Founders & Builders"}</span>
                <p className="text-xs text-brand-dark/60 dark:text-brand-light/60 font-normal">
                  {t.team?.specialistsSub || "Hasaan · Muhammad Faseeh · Moman"}
                </p>
              </div>
            </div>

            {/* Value Pillars List with Stagger */}
            <StaggerContainer staggerDelay={0.1} className="space-y-3 pt-2">
              {values.map((prop, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-3 text-sm font-medium text-brand-dark/90 dark:text-brand-light/90 hover:translate-x-1 transition-transform duration-200">
                    <span className="w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </span>
                    <span>{prop}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA with Hover Animation */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
              >
                {t.team?.cta || "Start a conversation"}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
