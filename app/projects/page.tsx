"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { REVIEWS } from "@/lib/constants";

interface ProjectCaseStudy {
  id: string;
  title: string;
  client: string;
  category: "Full-Stack Web" | "AI Ecosystems" | "Cloud & DevOps" | "ERP & Software";
  image: string;
  secondaryImage?: string;
  alt: string;
  liveUrl?: string;
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
  {
    id: "project-2",
    title: "High-Throughput Autonomous AI Copilot & Knowledge Retrieval Engine",
    client: "MODO Systems",
    category: "AI Ecosystems",
    image: "/images/t001-nova-project-building-1280.webp",
    alt: "Modern architecture representing enterprise tech identity",
    challenge:
      "Over 40,000 weekly support tickets overwhelmed operations, with domain knowledge locked in disparate PDFs, internal wikis, and databases.",
    solution:
      "Architected an enterprise RAG pipeline combining pgvector with LangGraph orchestration, automating 68% of support resolutions with zero hallucinations.",
    metrics: [
      { label: "Support Volume Automated", value: "68%" },
      { label: "Average Response Time", value: "< 1.4s" },
      { label: "Operational Cost Cut", value: "-52%" },
    ],
    techStack: ["Python", "pgvector", "LangChain", "OpenAI", "FastAPI", "Docker"],
  },
  {
    id: "project-3",
    title: "Custom Multi-Entity ERP & Supply Chain Management Platform",
    client: "NOMA Group",
    category: "ERP & Software",
    image: "/images/t001-nova-project-laptop-1280.webp",
    alt: "Modern dashboard interface for NOMA Group",
    challenge:
      "Disconnected legacy spreadsheets caused order fulfillment discrepancies and delayed monthly financial reconciliations across 12 warehouses.",
    solution:
      "Built a unified, real-time web ERP application with multi-currency ledgers, inventory tracking, and role-based access control.",
    metrics: [
      { label: "Fulfillment Velocity", value: "+85%" },
      { label: "Reconciliation Time", value: "Real-time" },
      { label: "Warehouse Parity", value: "100%" },
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "AWS RDS"],
  },
  {
    id: "project-4",
    title: "Cloud Infrastructure Modernization & Kubernetes GitOps Migration",
    client: "ASPEKT Global",
    category: "Cloud & DevOps",
    image: "/images/t001-nova-project-building-1280.webp",
    alt: "Cloud datacenter architecture concept",
    challenge:
      "Frequent manual deployments caused unexpected outages and scaling bottlenecks during seasonal peak traffic surges.",
    solution:
      "Implemented automated GitHub Actions pipelines, containerized all services via Docker, and deployed auto-scaling Kubernetes (EKS) clusters.",
    metrics: [
      { label: "Deployment Frequency", value: "8x Daily" },
      { label: "System Uptime Record", value: "99.99%" },
      { label: "Cloud Spend Saved", value: "38%" },
    ],
    techStack: ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "AWS"],
  },
];

const CATEGORIES = ["All", "Full-Stack Web", "AI Ecosystems", "Cloud & DevOps", "ERP & Software"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = CASE_STUDIES.filter((proj) => {
    return selectedCategory === "All" || proj.category === selectedCategory;
  });

  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Engineered Outcomes
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
          Case studies in technical scale and architectural transformation
        </h1>
        <p className="text-base sm:text-lg text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          Explore how we partner with ambitious enterprises and high-growth technology companies to engineer measurable commercial impact.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
                selectedCategory === cat
                  ? "bg-brand-accent text-white shadow-md"
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
          <article
            key={project.id}
            className="rounded-3xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 overflow-hidden shadow-lg p-5 xs:p-6 sm:p-10 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Media image */}
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                {project.secondaryImage ? (
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
                ) : (
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
                )}
              </div>

              {/* Content info */}
              <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-accent">
                  <span>{project.category}</span>
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
                      <span>Request Similar Build</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Verified Client Testimonials */}
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

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-dark dark:text-brand-light mb-4">
          Have an enterprise application to build?
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
