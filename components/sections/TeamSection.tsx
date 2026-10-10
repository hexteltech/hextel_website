import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

const TEAM_AVATARS = [
  { src: "/images/t001-nova-avatar-01-220.webp", alt: "Hextel Tech team member" },
  { src: "/images/t001-nova-avatar-02-220.webp", alt: "Hextel Tech team member" },
  { src: "/images/t001-nova-avatar-03-220.webp", alt: "Hextel Tech team member" },
];

const VALUE_PROPS = [
  "Strategic engineering & architecture",
  "Tailored, human-centered UX design",
  "Dedicated ongoing support & SLAs",
];

export default function TeamSection() {
  return (
    <section id="about" className="bg-brand-light py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Team Photo with Soft Zoom & Reveal */}
          <FadeIn direction="right" duration={0.7}>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-dark/5 shadow-xl">
              <Image
                src="/images/t001-nova-about-team.webp"
                alt="Hextel Tech team collaborating in modern workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn direction="left" delay={0.15} duration={0.7} className="flex flex-col space-y-6 lg:space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Our Team & Values
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight mt-2">
                People who create value
              </h2>
            </div>

            <p className="text-base sm:text-lg text-brand-dark/80 leading-relaxed">
              We are a dedicated team of engineers, architects, and visual designers who combine deep passion for modern cloud technology with a sharp eye for functional design. Every digital solution is engineered around your enterprise goals and target audience.
            </p>

            {/* Avatar Stack & Credentials with Hover Animation */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex -space-x-3 overflow-hidden">
                {TEAM_AVATARS.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="relative w-12 h-12 rounded-full ring-2 ring-brand-light overflow-hidden shadow-sm hover:scale-110 hover:z-10 transition-transform duration-200"
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
              <div className="text-sm font-semibold text-brand-dark">
                <span>10+ Senior Specialists</span>
                <p className="text-xs text-brand-dark/60 font-normal">
                  Distributed across product & systems
                </p>
              </div>
            </div>

            {/* Value Pillars List with Stagger */}
            <StaggerContainer staggerDelay={0.1} className="space-y-3 pt-2">
              {VALUE_PROPS.map((prop, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-3 text-sm font-medium text-brand-dark/90 hover:translate-x-1 transition-transform duration-200">
                    <span className="w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </span>
                    <span>{prop}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light hover:bg-brand-accent hover:text-brand-light shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                Start a conversation
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
