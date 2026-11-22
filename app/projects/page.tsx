"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { REVIEWS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

interface ProjectCaseStudy {
  id: string;
  title: string;
  client: string;
  category: "SaaS Product" | "Full-Stack Web" | "AI Ecosystems" | "Cloud & DevOps" | "ERP & Software";
  image: string;
  secondaryImage?: string;
  gallery?: {
    label: string;
    src: string;
    alt: string;
  }[];
  alt: string;
  liveUrl?: string;
  badge?: string;
  isOurSaaS?: boolean;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
}

const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "project-jobhunt",
    title: "Job Hunt Copilot — Autonomous Career Engineering Command Center",
    client: "Hextel Tech (In-House SaaS)",
    isOurSaaS: true,
    badge: "Our In-House SaaS",
    category: "SaaS Product",
    image: "/images/jobhunt-hero.jpg",
    gallery: [
      {
        label: "01. XYZ Tailoring",
        src: "/images/jobhunt-tailoring.jpg",
        alt: "Gemini XYZ Tailoring and 5-layer anti-hallucination safety gate studio",
      },
      {
        label: "02. Playwright Prefill",
        src: "/images/jobhunt-playwright.jpg",
        alt: "Playwright assisted prefill runner with zero-submit hardware interlock",
      },
      {
        label: "03. Mobile & Sync",
        src: "/images/jobhunt-sync.jpg",
        alt: "Discord mobile bot, ntfy.sh push alerts, and live syntax-highlighted webhook inspector",
      },
      {
        label: "04. Ledger & CRM",
        src: "/images/jobhunt-ledger.jpg",
        alt: "Immutable application ledger and 404-proof job description vault",
      },
    ],
    alt: "Job Hunt Copilot autonomous career engineering command center with Gemini 2.5 Flash",
    challenge:
      "Modern job seekers are caught between blind spam bots that spray generic resumes and fabricate metrics—triggering ATS blacklists and ruining candidate reputations—and spending 15–20 hours weekly manually tailoring resumes across Greenhouse, Lever, and job boards. Moreover, expired job listings that turn into 404s leave candidates blind when recruiters reach out weeks later.",
    solution:
      "We conceived, architected, and built Job Hunt Copilot — our industrial career engineering command center operating on a strict Human-in-the-Loop model with Zero Blind Submissions. It autonomously ingests verified remote roles via rate-limited Greenhouse, Lever, and RemoteOK APIs, evaluates technical taxonomy matches deterministically, and restructures resume bullets using Google Gemini 2.5 Flash under Google's XYZ formula ('Accomplished [X] as measured by [Y], by doing [Z]'). A 5-layer programmatic safety radar prevents fabricated numbers and limits JD-echo overlap (< 30%), while an assisted Playwright runner auto-prefills portal applications and pauses before final submission.",
    metrics: [
      { label: "ATS Keyword Match Lift", value: "61% → 94%" },
      { label: "Anti-Hallucination Gate", value: "100% Grounded" },
      { label: "Human-in-the-Loop Lock", value: "Zero Blind Spam" },
    ],
    techStack: [
      "Python 3.13",
      "FastAPI",
      "Google Gemini 2.5 Flash",
      "Playwright",
      "SQLite (jobs.db)",
      "Discord.py",
      "ntfy.sh",
      "TypeScript",
    ],
  },
  {
    id: "project-tracelens",
    title: "TraceLens — High-Throughput Telemetry & Observability Engine",
    client: "Hextel Tech (In-House SaaS)",
    isOurSaaS: true,
    badge: "Our In-House SaaS",
    category: "SaaS Product",
    image: "/images/tracelens-hero.jpg",
    secondaryImage: "/images/tracelens-topology.jpg",
    gallery: [
      {
        label: "01. Live Ingestion",
        src: "/images/tracelens-hero.jpg",
        alt: "TraceLens live telemetry ingestion stream with sub-ms execution and WebSocket processing",
      },
      {
        label: "02. Dependency Graph",
        src: "/images/tracelens-topology.jpg",
        alt: "TraceLens automated microservice dependency topology graph with risk detection",
      },
      {
        label: "03. AI Incident Reports",
        src: "/images/tracelens-incidents.jpg",
        alt: "TraceLens automated incident postmortem reports with Z-score root cause analysis",
      },
    ],
    alt: "TraceLens high-throughput telemetry, service topology & AI observability SaaS engine",
    challenge:
      "Modern cloud architectures and microservices generate millions of asynchronous requests daily, making cascading failures, latent bottlenecks, and inter-service dependency stalls difficult to isolate. Traditional APMs often suffer from heavy compute overhead, complex vendor lock-in, and noisy alerts without automated root-cause explanations.",
    solution:
      "We engineered TraceLens — our flagship in-house SaaS observability engine. Built for high-velocity engineering organizations, it features sub-millisecond WebSocket and BullMQ ingestion, an automated microservice dependency topology discovery graph, continuous Z-Score AI anomaly detection against 24-hour historical baselines, and one-click incident postmortem reports complete with mitigation playbooks.",
    metrics: [
      { label: "Ingestion Latency", value: "< 1ms" },
      { label: "Anomaly Engine", value: "Z-Score 24h" },
      { label: "Incident Postmortems", value: "Instant AI" },
    ],
    techStack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "BullMQ & Redis",
      "Z-Score AI Engine",
      "Distributed Tracing",
    ],
  },
  {
    id: "project-1",
    title: "Nayyab Jewellers — Bespoke Luxury E-Commerce & Digital Storefront",
    client: "Nayyab Jewellers",
    category: "Full-Stack Web",
    image: "/images/nayyab-hero.jpg",
    secondaryImage: "/images/nayyab-catalog.jpg",
    alt: "Nayyab Jewellers luxury bespoke e-commerce and catalog platform",
    challenge:
      "A heritage bespoke jewelry brand needed to modernise its presence beyond physical store visits and manual social inquiries. They required a fast, luxury digital storefront to showcase authentic gold-plated and sterling silver bridal collections while capturing custom consultation leads.",
    solution:
      "Engineered an ultra-fast Next.js 15 e-commerce catalog featuring real-time category filtering (Necklaces, Rings, Earrings, Mala & Chains), rich high-resolution zoom views of intricate craftsmanship, responsive cart management, and automated bridal consultation bookings.",
    metrics: [
      { label: "Page Speed Uplift", value: "3.5x Faster" },
      { label: "Inbound Inquiries", value: "+78%" },
      { label: "Lighthouse Performance", value: "99/100" },
    ],
    techStack: ["Next.js", "React 19", "Tailwind CSS", "TypeScript", "Vercel Edge"],
  },
  {
    id: "project-almoman",
    title: "Al Moman Frozen Foods — E-Commerce & Real-Time Order Tracking",
    client: "Al Moman Frozen Foods",
    category: "Full-Stack Web",
    image: "/images/almoman-hero.jpg",
    secondaryImage: "/images/almoman-catalog.jpg",
    alt: "Al Moman Frozen Foods e-commerce and live order tracking platform",
    liveUrl: "https://almomanfrozenfoods.vercel.app",
    challenge:
      "A high-volume halal food brand required an agile direct-to-consumer digital ordering ecosystem. Manual phone calls and WhatsApp messaging led to order dispatch bottlenecks, delayed customer delivery updates, and lost sales during peak weekend and holiday surges.",
    solution:
      "Architected a Next.js 15 e-commerce and dispatch platform featuring dynamic menu catalogs (Rolls, Samosas, Nuggets, Kebabs), integrated WhatsApp quick ordering, live order status tracking (#ALM-...), and automated instant customer receipts.",
    metrics: [
      { label: "Direct Sales Uplift", value: "+115%" },
      { label: "Order Dispatch Time", value: "< 3 mins" },
      { label: "Lighthouse Performance", value: "99/100" },
    ],
    techStack: ["Next.js", "React 19", "Tailwind CSS", "TypeScript", "Vercel", "WhatsApp API"],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(CASE_STUDIES.map((p) => p.category)))];

function ProjectMediaCard({ project }: { project: ProjectCaseStudy }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 3-second automatic transition timer
  useEffect(() => {
    if (!project.gallery || project.gallery.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % project.gallery!.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [project.gallery, isPaused]);

  if (project.gallery && project.gallery.length > 0) {
    const total = project.gallery.length;
    const activeImage = project.gallery[activeGalleryIndex];

    const handlePrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveGalleryIndex((prev) => (prev - 1 + total) % total);
    };

    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveGalleryIndex((prev) => (prev + 1) % total);
    };

    return (
      <div
        className="space-y-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative aspect-[4/3] xs:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#0D0A0A] border border-brand-dark/15 dark:border-white/10 shadow-2xl group select-none">
          {/* Stacked Images with 700ms Smooth Crossfade Transition */}
          {project.gallery.map((img, idx) => (
            <div
              key={img.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                activeGalleryIndex === idx ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                priority={idx === 0}
              />
            </div>
          ))}

          {/* Vignette & contrast overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/35 pointer-events-none z-20" />

          {/* Left Arrow Navigation */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous screenshot"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer text-lg leading-none"
          >
            ‹
          </button>

          {/* Right Arrow Navigation */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next screenshot"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer text-lg leading-none"
          >
            ›
          </button>

          {/* Bottom Bar: Active view title */}
          <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-md bg-black/85 backdrop-blur-md text-[11px] font-medium text-brand-accent border border-brand-accent/30 shadow-md">
              Screen {activeGalleryIndex + 1}/{total}: {activeImage.label}
            </span>
          </div>
        </div>

        {/* Gallery Tab Switcher with Progress Lines */}
        <div
          className={cn(
            "grid gap-2 w-full",
            total === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
          )}
        >
          {project.gallery.map((tab, idx) => {
            const isActive = activeGalleryIndex === idx;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveGalleryIndex(idx)}
                className={cn(
                  "relative px-2.5 py-2 rounded-xl text-xs font-semibold transition-all border text-left overflow-hidden flex flex-col justify-between",
                  isActive
                    ? "bg-brand-accent/15 text-brand-accent font-bold border-brand-accent/60 shadow-sm ring-1 ring-brand-accent/30"
                    : "bg-brand-dark/5 dark:bg-white/5 text-brand-dark/70 dark:text-brand-light/70 border-brand-dark/10 dark:border-white/10 hover:bg-brand-dark/10 dark:hover:bg-white/10"
                )}
              >
                <span className="block truncate text-[11px] leading-tight">{tab.label}</span>
                {/* Visual indicator bar */}
                <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      isActive
                        ? "bg-brand-accent w-full duration-300"
                        : "w-0 duration-300"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (project.secondaryImage) {
    return (
      <div className="relative aspect-[4/3] xs:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1817] via-[#141010] to-[#0a0808] border border-brand-dark/10 dark:border-white/10 p-3 sm:p-5 flex items-center justify-center group shadow-md">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Second Page (Catalog) - In Background (z-10) */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-[78%] aspect-[16/8] rounded-xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 z-10">
          <Image
            src={project.secondaryImage}
            alt={`${project.client} Collection Showcase`}
            fill
            quality={95}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* Main Page (Hero) - In Foreground (z-20) */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-[78%] aspect-[16/8] rounded-xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.9)] border border-brand-accent/40 ring-1 ring-black/60 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.02] z-20">
          <Image
            src={project.image}
            alt={`${project.client} Hero Showcase`}
            fill
            quality={95}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* Floating Client Badge & Live Link */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 backdrop-blur-md text-xs font-bold text-white border border-emerald-400/30 shadow-md flex items-center gap-1 transition-all"
            >
              <span>Live Site</span>
              <span className="text-[11px]">↗</span>
            </a>
          )}
          <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-xs font-bold text-white border border-white/20 shadow-lg">
            Client: {project.client}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] xs:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md group">
      <Image
        src={project.image}
        alt={project.alt}
        fill
        quality={95}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 xs:p-6">
        <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-bold text-white border border-white/20">
          Client: {project.client}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = CASE_STUDIES.filter((proj) => {
    return selectedCategory === "All" || proj.category === selectedCategory;
  });

  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <FadeIn direction="down" duration={0.5}>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            Engineered Outcomes
          </span>
        </FadeIn>
        <FadeIn direction="up" delay={0.1} duration={0.65}>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
            Case studies in technical scale and architectural transformation
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.18} duration={0.65}>
          <p className="text-base sm:text-lg text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
            Explore how we build production-grade platforms, engineering tools, and in-house SaaS ecosystems that deliver measurable business and technical impact.
          </p>
        </FadeIn>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
                selectedCategory === cat
                  ? "bg-brand-accent text-white shadow-md font-bold"
                  : "bg-brand-dark/5 dark:bg-white/5 text-brand-dark/70 dark:text-brand-light/70 hover:bg-brand-dark/10 dark:hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Case Studies List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredProjects.map((project, idx) => (
          <FadeIn key={project.id} direction="up" delay={idx * 0.08} duration={0.65}>
            <article
              id={project.id}
              className="rounded-3xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-accent/40 transition-all duration-300 p-5 xs:p-6 sm:p-10 lg:p-12 scroll-mt-28"
            >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Media image with 3-sec Auto Transition Gallery (positioned a little bit down from the title) */}
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""} lg:pt-8`}>
                <ProjectMediaCard project={project} />
              </div>

              {/* Content info */}
              <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-accent">
                  <span>{project.category}</span>
                  {project.isOurSaaS && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-extrabold text-[10px] tracking-wide">
                      ★ Proprietary SaaS Platform
                    </span>
                  )}
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light leading-snug">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-accent transition-colors inline-flex items-baseline gap-2 group/title"
                    >
                      <span>{project.title}</span>
                      <span className="text-base text-brand-accent transition-transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5">↗</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h2>

                <div className="space-y-3 text-sm text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
                  <p>
                    <strong className="text-brand-dark dark:text-brand-light">The Challenge: </strong>
                    {project.challenge}
                  </p>
                  <p>
                    <strong className="text-brand-dark dark:text-brand-light">Engineered Solution: </strong>
                    {project.solution}
                  </p>
                </div>

                {/* Verified Metrics */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 py-4 border-y border-brand-dark/10 dark:border-white/10">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-heading text-lg xs:text-xl sm:text-2xl font-bold text-brand-accent">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-brand-dark/60 dark:text-brand-light/60 mt-0.5 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-brand-dark/5 dark:bg-white/5 text-[11px] font-semibold text-brand-dark/70 dark:text-brand-light/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-accent text-white hover:brightness-110 text-xs font-bold transition-all shadow-sm"
                      >
                        <span>Visit Live Site</span>
                        <span className="text-sm">↗</span>
                      </a>
                    )}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark dark:text-brand-light hover:text-brand-accent transition-colors"
                    >
                      <span>{project.isOurSaaS ? "Request SaaS Architecture Demo" : "Request Similar Build"}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </article>
          </FadeIn>
        ))}
      </section>

      {/* Verified Client Testimonials */}
      {REVIEWS.length > 0 && (
        <section className="bg-surface-dim dark:bg-[#161111] py-20 mt-24 border-y border-brand-dark/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Client Testimonials
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
                Endorsed by engineering leaders
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS.slice(0, 3).map((review) => (
                <div
                  key={review.id || review.author}
                  className="p-8 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm flex flex-col justify-between"
                >
                  <p className="text-sm text-brand-dark/80 dark:text-brand-light/80 leading-relaxed italic mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-brand-dark/5 dark:border-white/5">
                    {review.avatar ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center text-xs font-bold shrink-0">
                        {review.author.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-brand-dark dark:text-brand-light">{review.author}</div>
                      <div className="text-[11px] text-brand-dark/50 dark:text-brand-light/50">{review.role}, {review.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:underline underline-offset-4"
              >
                <span>Explore all verified client reviews & metrics</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-dark dark:text-brand-light mb-4">
          Have an enterprise application or SaaS to build?
        </h2>
        <p className="text-base text-brand-dark/70 dark:text-brand-light/70 mb-8 max-w-xl mx-auto">
          Share your brief with our solution architects. We will provide an engineering feasibility review within 48 hours.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-accent text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
        >
          <span>Submit Project Brief</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}
