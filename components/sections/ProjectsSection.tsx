"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, ProjectItem } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

function ProjectCardMedia({ project }: { project: ProjectItem }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!project.gallery || project.gallery.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % project.gallery!.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [project.gallery]);

  if (!project.gallery || project.gallery.length <= 1) {
    return (
      <Image
        src={project.image}
        alt={project.alt}
        fill
        quality={95}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <>
      {project.gallery.map((img, i) => (
        <div
          key={img}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            index === i ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
          )}
        >
          <Image
            src={img}
            alt={project.alt}
            fill
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ))}
      {/* 3s Auto-cycle indicator dots */}
      <div className="absolute top-3 right-3 xs:top-4 xs:right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
        {project.gallery.map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              index === i ? "bg-brand-accent scale-125" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="relative z-10 bg-brand-light dark:bg-[#120E0E] py-20 sm:py-28 transition-colors">
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <FadeIn direction="up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {t.projects?.badge || "Portfolio"}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
                {t.projects?.heading || "Turning ideas into real outcomes"}
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-base text-brand-dark/70 dark:text-brand-light/70 leading-relaxed mb-4">
                {t.projects?.description || "We combine strategic engineering, refined design, and modern technology to deliver scalable web platforms."}
              </p>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-dark dark:text-brand-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors"
              >
                <span>{t.projects?.cta || "Explore all case studies"}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-brand-accent">
                  →
                </span>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Projects Grid with Stagger Reveal & Rich Hover States */}
        <StaggerContainer
          staggerDelay={0.2}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >
          {PROJECTS.map((project, idx) => {
            const title = project.title;
            const category = project.category;

            return (
              <StaggerItem key={project.id}>
                <Link
                  href={project.link}
                  className="group relative block overflow-hidden rounded-2xl bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2 h-full"
                >
                  {/* Floating In-House SaaS badge */}
                  {project.badge && (
                    <div className="absolute top-3 left-3 xs:top-4 xs:left-4 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent text-brand-dark font-extrabold text-[11px] tracking-wider uppercase shadow-lg border border-white/20 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-pulse" />
                        {project.badge}
                      </span>
                    </div>
                  )}

                  <div className="relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden">
                    <ProjectCardMedia project={project} />
                    {/* Gradient overlay for title legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent dark:from-black/95 dark:via-black/40 opacity-90 transition-opacity duration-300 group-hover:opacity-95 pointer-events-none z-10" />
                  </div>

                  {/* Card Footer Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-6 sm:p-8 flex items-end justify-between text-brand-light">
                    <div>
                      <span className="text-[11px] xs:text-xs font-semibold tracking-wider uppercase text-brand-accent mb-1 xs:mb-1.5 block">
                        {category}
                      </span>
                      <h3 className="font-heading text-lg xs:text-xl sm:text-2xl font-bold leading-snug max-w-sm group-hover:text-brand-accent transition-colors duration-300">
                        {title}
                      </h3>
                    </div>

                    <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 ml-3 xs:ml-4 group-hover:bg-brand-accent group-hover:text-brand-light dark:group-hover:text-brand-dark transition-all duration-300 group-hover:scale-110 shadow-md">
                      <span className="text-base xs:text-lg leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
