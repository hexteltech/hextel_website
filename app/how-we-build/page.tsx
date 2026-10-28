"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Phase {
  number: string;
  name: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  tools: string[];
  duration: string;
}

const PHASES: Phase[] = [
  {
    number: "01",
    name: "Strategic Discovery & Architecture Mapping",
    tagline: "De-risk technical assumptions before writing a single line of code.",
    summary:
      "We unpack your commercial objectives, map out database entity models, establish OpenAPI contracts, and architect resilient cloud topology. This ensures every sprint has unambiguous targets and zero technical debt.",
    deliverables: [
      "Technical Architecture Specification (TAS)",
      "Domain Entity Relationship Diagram (ERD)",
      "OpenAPI 3.0 Contract Specification",
      "Cloud Security & Compliance Roadmap",
    ],
    tools: ["PostgreSQL Schema", "OpenAPI", "AWS Architecture", "Figma", "Docker"],
    duration: "Week 1 - 2",
  },
  {
    name: "Design Systems & Interactive Prototyping",
    number: "02",
    tagline: "Unify brand aesthetics with production-ready design tokens.",
    summary:
      "We build modular Figma design systems linked directly to CSS custom properties. Dual-mode color tokens, accessible typography scales, and clickable prototypes guarantee user validation before frontend build.",
    deliverables: [
      "Figma Component Library & Token System",
      "Interactive 60fps Clickable Prototypes",
      "WCAG 2.1 AA Accessibility Validation",
      "Developer Hand-Off Token Mapping",
    ],
    tools: ["Figma Tokens", "Tailwind CSS", "Framer Motion", "Storybook"],
    duration: "Week 2 - 3",
  },
  {
    name: "Agile Sprint Execution & Pair Reviews",
    number: "03",
    tagline: "High-velocity bi-weekly sprints with full client visibility.",
    summary:
      "Working in 2-week iterations, our senior squad builds clean, modular code with strict TypeScript and comprehensive unit tests. You receive live preview URLs and participate in weekly demo walk-throughs.",
    deliverables: [
      "Bi-Weekly Production-Grade Releases",
      "Interactive Vercel Preview Deployments",
      "Direct Slack & GitHub Squad Communication",
      "Transparent Jira/Linear Sprint Backlog",
    ],
    tools: ["Next.js 15", "TypeScript Strict", "Prisma / Drizzle", "Node.js / Go"],
    duration: "Week 3 - 6+",
  },
  {
    name: "Automated QA & Security Hardening",
    number: "04",
    tagline: "Zero-regression testing and adversarial penetration audits.",
    summary:
      "Every pull request passes through automated Playwright end-to-end tests, static code analysis, and dependency security scanners. We stress-test APIs under high simulated concurrent loads.",
    deliverables: [
      "Automated End-to-End Test Suite",
      "API Load Benchmark (50,000+ Concurrency)",
      "OWASP Security Vulnerability Audit",
      "Zero-Regression Guarantee Certification",
    ],
    tools: ["Playwright", "Vitest", "k6 Load Testing", "SonarQube", "Snyk"],
    duration: "Continuous",
  },
  {
    name: "Zero-Downtime CI/CD & Cloud Deployment",
    number: "05",
    tagline: "Automated blue-green pipelines and global edge CDN caching.",
    summary:
      "We automate deployments through GitHub Actions and Kubernetes with blue-green canary strategies. Zero dropped connections, automatic health-check rollbacks, and instant SSL provisioning.",
    deliverables: [
      "Production CI/CD Automated Pipelines",
      "Multi-Region Cloud Load Balancers",
      "Global Edge CDN Configuration",
      "Automated Snapshot & Failover Runbook",
    ],
    tools: ["GitHub Actions", "Docker", "Kubernetes", "AWS CloudFront", "Vercel"],
    duration: "Pre-Launch",
  },
  {
    name: "24/7 Observability & Continuous SLA Evolution",
    number: "06",
    tagline: "Proactive telemetry and dedicated post-launch support.",
    summary:
      "Software does not stop at deployment. We configure real-time telemetry dashboards, error tracking with instant pager alerts, and monthly performance optimization audits under guaranteed SLAs.",
    deliverables: [
      "24/7 Grafana & Datadog Health Dashboards",
      "Instant PagerDuty Critical Escalations",
      "Monthly Security Patching & Upgrades",
      "Quarterly Scalability & FinOps Audits",
    ],
    tools: ["Datadog", "Grafana", "Prometheus", "Sentry", "PagerDuty"],
    duration: "Ongoing SLA",
  },
];

export default function HowWeBuildPage() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = PHASES[activePhaseIndex];

  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          The Hextel Engineering Lifecycle
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
          How we turn ambitious technical challenges into production realities
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          Predictable delivery schedules, zero technical debt, and transparent code reviews. Discover our disciplined 6-phase engineering lifecycle.
        </p>
      </section>

      {/* Interactive 6-Phase Lifecycle Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 mb-10">
          {PHASES.map((phase, idx) => (
            <button
              key={phase.number}
              onClick={() => setActivePhaseIndex(idx)}
              className={cn(
                "p-4 rounded-2xl text-left border transition-all flex flex-col justify-between",
                activePhaseIndex === idx
                  ? "bg-brand-accent text-white border-brand-accent shadow-xl scale-[1.02]"
                  : "bg-white dark:bg-[#1A1414] border-brand-dark/10 dark:border-white/10 text-brand-dark/70 dark:text-brand-light/70 hover:border-brand-accent/50"
              )}
            >
              <div className="font-mono text-xs font-bold opacity-80">
                Phase {phase.number}
              </div>
              <div className="text-xs font-bold mt-2 line-clamp-2 leading-tight">
                {phase.name.split(" ")[0]} {phase.name.split(" ")[1]}
              </div>
            </button>
          ))}
        </div>

        {/* Active Phase Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-bold text-brand-accent">
                  Phase {activePhase.number}
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-semibold">
                  {activePhase.duration}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light">
                {activePhase.name}
              </h2>

              <p className="text-base font-medium text-brand-accent">
                {activePhase.tagline}
              </p>

              <p className="text-sm sm:text-base text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
                {activePhase.summary}
              </p>


            </div>

            {/* Deliverables Checklist Box */}
            <div className="lg:w-96 p-6 sm:p-8 rounded-2xl bg-surface-dim dark:bg-[#201919] border border-brand-dark/5 dark:border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-4">
                Phase Deliverables
              </h3>
              <ul className="space-y-3">
                {activePhase.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-brand-dark/80 dark:text-brand-light/80 leading-snug">
                    <span className="text-brand-accent font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

            {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-dark dark:text-brand-light mb-4">
          Ready to experience structured engineering execution?
        </h2>
        <p className="text-base text-brand-dark/70 dark:text-brand-light/70 mb-8 max-w-xl mx-auto">
          Start with our Strategic Architecture Blueprint session. In 5 business days, we provide system models, tech stack recommendations, and fixed-timeline sprint milestones.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
        >
          <span>Schedule Architecture Discovery</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}
