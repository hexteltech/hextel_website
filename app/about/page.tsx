import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us — Hextel Tech | Engineering Digital Excellence",
  description:
    "Learn about Hextel Tech's mission, our 3 founding partners, our core architectural values, and our journey building digital products.",
  openGraph: {
    title: "About Us — Hextel Tech",
    description: "Built by 3 dedicated founders delivering modern engineering and digital excellence for ambitious brands.",
  },
};

const VALUES = [
  {
    number: "01",
    title: "Architectural Precision",
    description:
      "We reject shortcuts and brittle workarounds. Every database schema, API contract, and component hierarchy is engineered to withstand production workloads and evolve seamlessly.",
  },
  {
    number: "02",
    title: "Transparent Velocity",
    description:
      "No corporate smoke and mirrors. You get direct access to our 3 founders via dedicated Slack channels, weekly sprint demos, and real-time GitHub repositories.",
  },
  {
    number: "03",
    title: "Commercial Impact First",
    description:
      "Technology is an engine for growth, not a vanity exercise. Every architectural choice is tied directly to customer acquisition, transaction speed, or operational efficiency.",
  },
  {
    number: "04",
    title: "Craft & Aesthetic Distinction",
    description:
      "Functional systems deserve beautiful execution. We craft bespoke typography scales, micro-interactions, and accessible designs that elevate enterprise brand equity.",
  },
];

const LEADERSHIP = [
  {
    name: "Hasaan Ahmad",
    role: "CEO & Business Development",
    bio: "Co-founder leading enterprise business development, strategic partnerships, and client success. Focused on transforming ambitious business visions into high-impact digital ventures.",
    image: "/images/t001-nova-avatar-01-220.webp",
  },
  {
    name: "Muhammad Faseeh Altaf",
    role: "Marketing Expert & Full Stack Developer",
    bio: "Co-founder combining deep full-stack engineering expertise with data-driven growth marketing, performance funnels, and scalable web architectures.",
    image: "/images/t001-nova-avatar-02-220.webp",
  },
  {
    name: "Moman Salman",
    role: "Full Stack Developer & AI Automation Expert",
    bio: "Co-founder specializing in end-to-end full stack web platforms, intelligent AI workflows, automated systems, and next-generation cloud solutions.",
    image: "/images/t001-nova-avatar-03-220.webp",
  },
];

const TIMELINE = [
  {
    year: "Founding",
    title: "Three Friends, One Vision",
    description: "Three friends united complementary strengths in full-stack software development, growth marketing, and AI automation to build an agile tech studio.",
  },
  {
    year: "Scaling",
    title: "25+ Delivered Solutions",
    description: "Engineered and deployed 25+ production-grade web platforms and custom applications with direct founder involvement on every project.",
  },
  {
    year: "Next Horizon",
    title: "Autonomous AI & Intelligent Cloud",
    description: "Empowering businesses with custom AI agents, automated pipelines, and high-performance Next.js architectures.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Who We Are
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
          Engineers and designers driven by a single standard: excellence without compromise
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          {BRAND_CONFIG.lead}
        </p>

        {/* Hero Photo Card */}
        <div className="relative mt-8 sm:mt-12 aspect-[16/10] sm:aspect-[21/9] max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/10 dark:border-white/10">
          <Image
            src="/images/t001-nova-about-team-1280.webp"
            quality={95}
            alt="Hextel Technologies Engineering Squad"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4 xs:p-6 sm:p-8 lg:p-12">
            <div className="text-left text-white max-w-md">
              <div className="font-heading text-lg sm:text-xl font-bold">Warsaw Engineering Lab</div>
              <div className="text-xs text-white/80">Where enterprise architectures and modern digital platforms are conceived.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-surface-dim dark:bg-[#161111] py-20 border-y border-brand-dark/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Our Principles
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
              The values that govern every commit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((val) => (
              <div
                key={val.number}
                className="p-8 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm"
              >
                <div className="text-sm font-mono font-bold text-brand-accent mb-3">
                  {val.number}.
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light mb-3">
                  {val.title}
                </h3>
                <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Technical Leadership
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
            Meet the minds shaping your software
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((leader) => (
            <div
              key={leader.name}
              className="p-7 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm text-center group hover:border-brand-accent transition-all duration-300"
            >
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-6 ring-4 ring-brand-accent/20 group-hover:scale-105 transition-transform">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-lg font-bold text-brand-dark dark:text-brand-light mb-1">
                {leader.name}
              </h3>
              <div className="text-xs font-semibold text-brand-accent mb-3">
                {leader.role}
              </div>
              <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="bg-surface-dim dark:bg-[#161111] py-20 border-y border-brand-dark/10 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-dark dark:text-brand-light mt-2">
              A decade of compounding engineering expertise
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-brand-dark/10 dark:before:bg-white/10">
            {TIMELINE.map((item, idx) => (
              <div
                key={item.year}
                className={`relative flex flex-col sm:flex-row items-start ${
                  idx % 2 === 0 ? "sm:flex-row-reverse" : ""
                } gap-6`}
              >
                <div className="flex-1 w-full pl-10 sm:pl-0">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm">
                    <span className="font-mono text-sm font-bold text-brand-accent mb-1 block">
                      {item.year}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-brand-dark dark:text-brand-light mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute left-2 sm:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-brand-accent border-4 border-brand-light dark:border-[#120E0E]" />
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-dark dark:text-brand-light mb-4">
          Want to engineer your next milestone with us?
        </h2>
        <p className="text-base text-brand-dark/70 dark:text-brand-light/70 mb-8 max-w-xl mx-auto">
          Let’s discuss your technical roadmap, infrastructure requirements, and squad configuration.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
        >
          <span>Initiate Contact</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}
