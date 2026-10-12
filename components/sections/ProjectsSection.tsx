import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 bg-brand-light dark:bg-[#120E0E] py-20 sm:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn direction="up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Portfolio
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
                Turning ideas into real outcomes
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-base text-brand-dark/70 dark:text-brand-light/70 leading-relaxed mb-4">
                We combine strategic engineering, refined design, and modern technology to deliver scalable web platforms.
              </p>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-dark dark:text-brand-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors"
              >
                <span>Explore all case studies</span>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.id}>
              <Link
                href={project.link}
                className="group relative block overflow-hidden rounded-2xl bg-brand-dark/5 dark:bg-white/5 border border-brand-dark/10 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay for title legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/25 to-transparent dark:from-black/90 dark:via-black/30 opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
                </div>

                {/* Card Footer Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between text-brand-light">
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-brand-accent mb-1.5 block">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold leading-snug max-w-sm group-hover:text-brand-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 ml-4 group-hover:bg-brand-accent group-hover:text-brand-light dark:group-hover:text-brand-dark transition-all duration-300 group-hover:scale-110 shadow-md">
                    <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
