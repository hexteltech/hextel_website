import type { Metadata } from "next";
import Link from "next/link";
import { ALL_SERVICES_DATA } from "@/lib/servicesData";
import { ServiceIcon } from "@/components/layout/ServicesDropdown";

export const metadata: Metadata = {
  title: "Services & Capabilities — Hextel Tech",
  description:
    "Explore our complete suite of 17 digital engineering capabilities: from IT staff augmentation and AI agents to high-throughput web apps and cloud DevOps.",
  openGraph: {
    title: "Services & Capabilities — Hextel Tech",
    description: "Complete full-spectrum technology and software engineering catalog.",
  },
};

export default function ServicesPage() {
  const categories = [
    { name: "All Capabilities", count: 17 },
    { name: "Talent & Core Engineering", count: 6 },
    { name: "Cloud, DevOps & AI", count: 6 },
    { name: "Custom Apps & Software", count: 5 },
  ];

  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Full-Spectrum Capabilities
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
          Architectural rigor across every layer of the modern digital stack
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          Founded and driven by 3 dedicated partners combining full-stack development, AI automation, and growth marketing. We engineer high-performance web systems and digital products with direct founder accountability on every delivery.
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10 sm:mt-12 pt-8 border-t border-brand-dark/10 dark:border-white/10">
          <div>
            <div className="font-heading text-2xl xs:text-3xl font-bold text-brand-accent">25+</div>
            <div className="text-[11px] xs:text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1 uppercase tracking-wider font-semibold">Projects Delivered</div>
          </div>
          <div>
            <div className="font-heading text-2xl xs:text-3xl font-bold text-brand-accent">3+</div>
            <div className="text-[11px] xs:text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1 uppercase tracking-wider font-semibold">Years Experience</div>
          </div>
          <div>
            <div className="font-heading text-2xl xs:text-3xl font-bold text-brand-accent">2,000+</div>
            <div className="text-[11px] xs:text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1 uppercase tracking-wider font-semibold">Product Hours</div>
          </div>
          <div>
            <div className="font-heading text-2xl xs:text-3xl font-bold text-brand-accent">3</div>
            <div className="text-[11px] xs:text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1 uppercase tracking-wider font-semibold">Dedicated Founders</div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_SERVICES_DATA.map((service, index) => (
            <article
              key={service.slug}
              className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-brand-accent/50 dark:hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Header row: Icon & Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-dark/5 dark:bg-white/5 flex items-center justify-center text-brand-dark dark:text-brand-light group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                    <ServiceIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    {service.tag && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-accent/15 text-brand-accent">
                        {service.tag}
                      </span>
                    )}
                    <span className="text-xs font-mono text-brand-dark/40 dark:text-white/40">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                  </div>
                </div>

                {/* Category & Title */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-accent mb-2">
                  {service.category}
                </div>
                <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors mb-3 leading-snug">
                  <Link href={`/services/${service.slug}`} className="focus:outline-none">
                    {service.title}
                  </Link>
                </h2>
                <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Key Deliverables Highlights */}
                <div className="space-y-2 border-t border-brand-dark/5 dark:border-white/5 pt-4 mb-6">
                  {service.deliverables.slice(0, 2).map((del) => (
                    <div key={del.title} className="flex items-start gap-2 text-xs text-brand-dark/80 dark:text-brand-light/80">
                      <span className="text-brand-accent font-bold">✓</span>
                      <span>{del.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-brand-dark/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-brand-dark/60 dark:text-brand-light/60 truncate max-w-[180px] xs:max-w-none">
                  {service.techStack.slice(0, 3).join(" • ")}
                </span>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent group-hover:translate-x-1 transition-transform shrink-0"
                >
                  <span>Explore</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Enterprise Consultation CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="relative rounded-3xl bg-brand-dark text-brand-light p-8 sm:p-12 lg:p-16 overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3 block">
              Architectural Advisory
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Need a multi-disciplinary squad or custom architectural audit?
            </h2>
            <p className="text-base text-brand-light/70 mb-8 leading-relaxed">
              We offer technical roadmapping, legacy modernization evaluations, and fixed-cost feasibility audits within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg active:scale-95"
              >
                Schedule Technical Consultation
              </Link>
              <Link
                href="/how-we-build"
                className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                Learn How We Build →
              </Link>
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
