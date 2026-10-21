"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  phase: string;
  title: string;
  summary: string;
  deliverables: string[];
  techStack: string[];
  codeQuality: string;
  qualityPercentage: number;
  icon: string;
}

const PHASES: Step[] = [
  {
    number: "01",
    phase: "Discovery & Blueprint",
    title: "Strategic Discovery & Architecture Mapping",
    summary:
      "We unpack your business objectives, map technical requirements, establish database domain models, and architect a future-proof system design before writing a single line of code.",
    deliverables: [
      "Technical Architecture Specification",
      "Domain Data Model & API Blueprints",
      "Cloud Infrastructure & Security Plan",
      "Milestone-Driven Delivery Roadmap",
    ],
    techStack: ["System Architecture", "OpenAPI", "Security Audit", "AWS / Vercel"],
    codeQuality: "25% - Architecture & Spec Alignment",
    qualityPercentage: 25,
    icon: "compass",
  },
  {
    number: "02",
    phase: "Experience & Design",
    title: "Design Systems & Interactive Prototyping",
    summary:
      "We design bespoke design systems with pixel-level precision. Every interaction, motion transition, and component is optimized for conversion, brand authority, and WCAG accessibility.",
    deliverables: [
      "Modular Component Design System",
      "High-Fidelity Interactive Prototypes",
      "Dark / Light Responsive Token System",
      "Micro-interaction & Animation Guidelines",
    ],
    techStack: ["Figma Systems", "Design Tokens", "Framer Motion", "WCAG 2.1 AA"],
    codeQuality: "50% - Design Tokens & WCAG Validation",
    qualityPercentage: 50,
    icon: "palette",
  },
  {
    number: "03",
    phase: "Engineering & Build",
    title: "High-Performance Full-Stack Engineering",
    summary:
      "We build modular, type-safe web applications utilizing modern server-first architectures. Engineered for sub-second page loads, zero runtime flaws, and seamless integration.",
    deliverables: [
      "Next.js App Router & React 19 Core",
      "Strict TypeScript Type Coverage",
      "Resilient Server-Side Email & APIs",
      "Internationalization (i18n) Engine",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Resend API"],
    codeQuality: "75% - Strict TypeScript & Server Core",
    qualityPercentage: 75,
    icon: "code",
  },
  {
    number: "04",
    phase: "Verification & Evolution",
    title: "Quality Assurance & Production Deployment",
    summary:
      "We run automated test suites, performance benchmarks, and automated CI/CD deployments. Post-launch, we provide continuous maintenance, SLA uptime, and incremental growth audits.",
    deliverables: [
      "Lighthouse 95+ Performance Auditing",
      "Automated CI/CD Pipeline Deployment",
      "Production Environment Hardening",
      "Ongoing Maintenance & Growth SLA",
    ],
    techStack: ["Automated CI/CD", "Lighthouse", "Edge CDN", "24/7 Monitoring"],
    codeQuality: "100% - Production Grade & SLA Verified",
    qualityPercentage: 100,
    icon: "rocket",
  },
];

export default function HowWeBuildSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-we-build"
      className="relative z-10 bg-surface-dim dark:bg-[#150F0F] py-20 sm:py-28 border-y border-brand-dark/10 dark:border-white/10 transition-colors"
    >
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <FadeIn direction="up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 dark:bg-brand-accent/15 backdrop-blur-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                <span className="font-mono text-xs font-semibold tracking-widest text-brand-accent uppercase">
                  Engineering Framework
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight">
                How we build digital products
              </h2>
              <p className="mt-4 text-base sm:text-lg text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                A structured, disciplined engineering methodology refined across 200+ deployments. Every phase ensures velocity, precision, and measurable business impact.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 shadow-sm hover:shadow-lg active:scale-95 group"
            >
              <span>Discuss Your Build</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </FadeIn>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8">
          {PHASES.map((phase, idx) => (
            <button
              key={phase.number}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={cn(
                "p-3 xs:p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer",
                activeStep === idx
                  ? "border-brand-accent bg-brand-light dark:bg-[#1E1717] shadow-lg -translate-y-0.5 ring-1 ring-brand-accent/30"
                  : "border-brand-dark/10 dark:border-white/10 bg-brand-light/40 dark:bg-[#181212]/40 hover:border-brand-dark/20 dark:hover:border-white/20 hover:bg-brand-light/70 dark:hover:bg-[#1c1515]"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-brand-accent">
                  PHASE {phase.number}
                </span>
                {activeStep === idx && (
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                )}
              </div>
              <h3 className="font-heading font-semibold text-xs sm:text-sm text-brand-dark dark:text-brand-light truncate">
                {phase.phase}
              </h3>
            </button>
          ))}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-brand-dark/10 dark:border-white/10 bg-brand-light dark:bg-[#1A1414] p-5 xs:p-7 sm:p-10 lg:p-12 shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-brand-accent">
                  {PHASES[activeStep].number}
                </span>
                <span className="h-6 w-px bg-brand-dark/20 dark:bg-white/20" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60">
                  {PHASES[activeStep].phase}
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light">
                {PHASES[activeStep].title}
              </h3>

              <p className="text-base text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
                {PHASES[activeStep].summary}
              </p>

              {/* Key Deliverables List */}
              <div className="pt-2 space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-accent font-mono">
                  Core Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {PHASES[activeStep].deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-dark/80 dark:text-brand-light/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual / Tech Badges & Dynamic Guaranteed Code Quality Bar */}
            <div className="lg:col-span-5 rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-surface-dim dark:bg-[#120E0E] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-brand-dark/10 dark:border-white/10">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60">
                  Tooling & Standards
                </span>
                <span className="text-xs font-mono text-brand-accent">Production Grade</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {PHASES[activeStep].techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg border border-brand-dark/10 dark:border-white/10 bg-brand-light dark:bg-[#1A1414] text-xs font-medium text-brand-dark dark:text-brand-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Dynamic Guaranteed Code Quality matching the progress bar */}
              <div className="pt-4 border-t border-brand-dark/10 dark:border-white/10">
                <div className="flex items-center justify-between text-xs text-brand-dark/60 dark:text-brand-light/60">
                  <span>Guaranteed Code Quality</span>
                  <span className="font-bold text-brand-accent font-mono">
                    {PHASES[activeStep].codeQuality}
                  </span>
                </div>
                <div className="mt-2.5 w-full h-2 rounded-full bg-brand-dark/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-brand-accent transition-all duration-500 rounded-full shadow-sm"
                    style={{ width: `${PHASES[activeStep].qualityPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
