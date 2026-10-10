import Link from "next/link";
import { SERVICES, type ServiceItem } from "@/lib/constants";

function ServiceIcon({ iconName }: { iconName: ServiceItem["iconName"] }) {
  switch (iconName) {
    case "palette":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4 4 4 0 014-4c2 0 2-2 4-2s2 2 4 2a4 4 0 014 4 4 4 0 01-4 4H7z" />
          <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "browser":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="3" strokeWidth={1.75} />
          <line x1="2" y1="9" x2="22" y2="9" strokeWidth={1.75} />
          <circle cx="5" cy="6.5" r="0.75" fill="currentColor" />
          <circle cx="8" cy="6.5" r="0.75" fill="currentColor" />
          <circle cx="11" cy="6.5" r="0.75" fill="currentColor" />
        </svg>
      );
    case "paintbrush":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.828-2.828m2.828 2.828L12 21.05m-6.364-2.686a9 9 0 010-12.728m0 0l2.828 2.828M5.636 5.636L12 2.95" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "lifebuoy":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={1.75} />
          <circle cx="12" cy="12" r="4" strokeWidth={1.75} />
          <line x1="5.636" y1="5.636" x2="9.172" y2="9.172" strokeWidth={1.75} />
          <line x1="14.828" y1="14.828" x2="18.364" y2="18.364" strokeWidth={1.75} />
          <line x1="5.636" y1="18.364" x2="9.172" y2="14.828" strokeWidth={1.75} />
          <line x1="14.828" y1="9.172" x2="18.364" y2="5.636" strokeWidth={1.75} />
        </svg>
      );
  }
}

export default function ServicesSection() {
  return (
    <section id="services" className="bg-surface-dim py-20 sm:py-28 border-y border-brand-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Expertise
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight mt-2">
              Our core services
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base text-brand-dark/70 leading-relaxed mb-4">
              End-to-end technical leadership, from initial product architecture to deployment and continuous growth.
            </p>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-brand-accent transition-colors"
            >
              <span>Explore services roadmap</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <article
              key={service.number}
              className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-brand-light border border-brand-dark/10 shadow-sm hover:border-brand-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Icon & Number Row */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-dark/5 flex items-center justify-center text-brand-dark group-hover:bg-brand-accent group-hover:text-brand-light transition-colors duration-300">
                    <ServiceIcon iconName={service.iconName} />
                  </div>
                  <span className="text-sm font-semibold tracking-wider text-brand-dark/40 group-hover:text-brand-accent transition-colors">
                    {service.number}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-brand-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-dark/75 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action Arrow */}
              <div className="pt-6 mt-6 border-t border-brand-dark/5 flex justify-end">
                <span className="text-base font-bold text-brand-dark/40 group-hover:text-brand-accent group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
