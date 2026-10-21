import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_SERVICES_DATA, getServiceBySlug } from "@/lib/servicesData";
import { ServiceIcon } from "@/components/layout/ServicesDropdown";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found — Hextel Tech",
    };
  }

  return {
    title: `${service.title} — Hextel Tech Services`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | Hextel Tech`,
      description: service.overview,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = ALL_SERVICES_DATA.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);

  return (
    <div className="min-h-screen py-12 sm:py-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-dark/60 dark:text-brand-light/60">
          <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-brand-accent transition-colors">Services</Link>
          <span>/</span>
          <span className="text-brand-dark dark:text-brand-light font-medium truncate max-w-xs">{service.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span>{service.category}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-lg sm:text-xl text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
              {service.heroTagline}
            </p>

            <p className="text-base text-brand-dark/65 dark:text-brand-light/65 leading-relaxed pt-2">
              {service.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="px-6 py-3.5 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Engage This Discipline</span>
                <span>→</span>
              </Link>
              <Link
                href="#deliverables"
                className="px-6 py-3.5 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-brand-dark/5 dark:bg-white/5 text-brand-dark dark:text-brand-light font-semibold text-sm hover:border-brand-accent transition-all"
              >
                View Deliverables & Process
              </Link>
            </div>
          </div>

          {/* Metrics & Performance Box */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 p-5 xs:p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-brand-dark/10 dark:border-white/10 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <ServiceIcon name={service.icon} className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                  Verified Benchmarks
                </span>
              </div>

              <div className="space-y-6">
                {service.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-brand-dark/70 dark:text-brand-light/70">{metric.label}</span>
                    <span className="font-heading text-2xl font-bold text-brand-accent">{metric.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-brand-dark/10 dark:border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-dark/50 dark:text-brand-light/50 mb-3">
                  Core Technologies & Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-brand-dark/5 dark:bg-white/5 text-xs font-semibold text-brand-dark/80 dark:text-brand-light/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section id="deliverables" className="bg-surface-dim dark:bg-[#161111] py-20 border-y border-brand-dark/10 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Scope of Delivery
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
              What you receive with {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={item.title}
                className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#1E1717] border border-brand-dark/10 dark:border-white/10 shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-accent/15 text-brand-accent flex items-center justify-center font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-dark dark:text-brand-light mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Phase Delivery Process */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Methodology
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
            How we execute from day one
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl bg-brand-light dark:bg-[#181313] border border-brand-dark/10 dark:border-white/10"
            >
              <span className="font-mono text-2xl font-bold text-brand-accent block mb-3">
                {step.step}
              </span>
              <h4 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-brand-dark/65 dark:text-brand-light/65 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-brand-dark dark:text-brand-light mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm"
              >
                <h4 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light mb-2">
                  {faq.question}
                </h4>
                <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-dark/10 dark:border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
              Related Services in {service.category}
            </h3>
            <Link href="/services" className="text-xs font-semibold text-brand-accent hover:underline">
              View All 17 Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group p-6 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 hover:border-brand-accent transition-all block shadow-sm hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-dark/5 dark:bg-white/5 flex items-center justify-center text-brand-dark dark:text-brand-light group-hover:bg-brand-accent group-hover:text-white transition-colors mb-4">
                  <ServiceIcon name={rel.icon} className="w-5 h-5" />
                </div>
                <h4 className="font-heading text-base font-bold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-brand-dark/65 dark:text-brand-light/65 line-clamp-2">
                  {rel.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl bg-brand-dark text-brand-light p-8 sm:p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="font-heading text-3xl font-bold">
              Ready to deploy {service.title}?
            </h2>
            <p className="text-sm text-brand-light/70 leading-relaxed">
              Book a direct consultation with our 3 founders (Hasaan, Muhammad Faseeh, and Moman). We will analyze your specifications and provide a clear, founder-led roadmap.
            </p>
            <div className="pt-2">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
              >
                <span>Start This Project Now</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
