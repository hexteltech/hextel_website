"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { SupportedLanguage } from "@/lib/i18n/types";

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

interface HowWeBuildCopy {
  badge: string;
  heading: string;
  subtitle: string;
  cta: string;
  phaseLabel: string;
  deliverablesLabel: string;
  toolingLabel: string;
  gradeLabel: string;
  qualityLabel: string;
  phases: Step[];
}

const HOW_WE_BUILD_I18N: Record<SupportedLanguage, HowWeBuildCopy> = {
  en: {
    badge: "Engineering Framework",
    heading: "How we build digital products",
    subtitle:
      "A structured, disciplined engineering methodology refined across 25+ deployments. Every phase ensures velocity, precision, and measurable business impact.",
    cta: "Discuss Your Build",
    phaseLabel: "PHASE",
    deliverablesLabel: "Core Deliverables",
    toolingLabel: "Tooling & Standards",
    gradeLabel: "Production Grade",
    qualityLabel: "Guaranteed Code Quality",
    phases: [
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
    ],
  },
  pl: {
    badge: "Proces Inżynieryjny",
    heading: "Jak tworzymy produkty cyfrowe",
    subtitle:
      "Uporządkowana metodologia inżynieryjna dopracowana w ponad 25 wdrożeniach. Każdy etap gwarantuje szybkość, precyzję i mierzalny efekt biznesowy.",
    cta: "Omów swój projekt",
    phaseLabel: "ETAP",
    deliverablesLabel: "Główne Rezultaty",
    toolingLabel: "Narzędzia i Standardy",
    gradeLabel: "Klasa Produkcyjna",
    qualityLabel: "Gwarantowana Jakość Kodu",
    phases: [
      {
        number: "01",
        phase: "Discovery i Architektura",
        title: "Analiza Strategiczna i Projektowanie Architektury",
        summary:
          "Analizujemy cele biznesowe, mapujemy wymagania techniczne, projektujemy modele baz danych i tworzymy skalowalną architekturę systemu przed napisaniem pierwszej linii kodu.",
        deliverables: [
          "Specyfikacja Architektury Technicznej",
          "Model Danych i Schematy API",
          "Plan Infrastruktury Chmurowej i Bezpieczeństwa",
          "Harmonogram Wdrożenia oparty o Kamienie Milowe",
        ],
        techStack: ["Architektura Systemu", "OpenAPI", "Audyt Bezpieczeństwa", "AWS / Vercel"],
        codeQuality: "25% - Zgodność Architektury i Specyfikacji",
        qualityPercentage: 25,
        icon: "compass",
      },
      {
        number: "02",
        phase: "UX i Design System",
        title: "Systemy Designu i Interaktywne Prototypy",
        summary:
          "Projektujemy dedykowane systemy designu z precyzją co do piksela. Każda interakcja, animacja i komponent są zoptymalizowane pod kątem konwersji i dostępności WCAG.",
        deliverables: [
          "Modułowy Design System Komponentów",
          "Interaktywne Prototypy High-Fidelity",
          "Responsywne Tokeny Trybu Jasnego i Ciemnego",
          "Wytyczne Mikrointerakcji i Animacji",
        ],
        techStack: ["Figma Systems", "Design Tokens", "Framer Motion", "WCAG 2.1 AA"],
        codeQuality: "50% - Walidacja Designu i WCAG",
        qualityPercentage: 50,
        icon: "palette",
      },
      {
        number: "03",
        phase: "Inżynieria i Budowa",
        title: "Wysokowydajne Programowanie Full-Stack",
        summary:
          "Budujemy modułowe, bezpieczne typologicznie aplikacje webowe w nowoczesnych architekturach server-first, zapewniając ładowanie poniżej sekundy i pełną stabilność.",
        deliverables: [
          "Next.js App Router i React 19 Core",
          "Ścisłe Typowanie TypeScript",
          "Bezpieczne API Serwerowe i Systemy Mailowe",
          "Silnik Wielojęzyczności (i18n)",
        ],
        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Resend API"],
        codeQuality: "75% - Ścisły TypeScript i Rdzeń Serwerowy",
        qualityPercentage: 75,
        icon: "code",
      },
      {
        number: "04",
        phase: "Weryfikacja i Rozwój",
        title: "Testy Jakości QA i Wdrożenie Produkcyjne",
        summary:
          "Uruchamiamy testy automatyczne, benchmarki wydajności i wdrożenia CI/CD. Po starcie zapewniamy ciągłe utrzymanie, gwarancję SLA oraz rozwój funkcji.",
        deliverables: [
          "Audyt Wydajności Lighthouse 95+",
          "Automatyczne Wdrożenia CI/CD",
          "Utwardzanie Środowiska Produkcyjnego",
          "Stałe Utrzymanie i Umowa SLA",
        ],
        techStack: ["Automatyczne CI/CD", "Lighthouse", "Edge CDN", "Monitoring 24/7"],
        codeQuality: "100% - Gotowość Produkcyjna i SLA",
        qualityPercentage: 100,
        icon: "rocket",
      },
    ],
  },
  de: {
    badge: "Engineering-Framework",
    heading: "Wie wir digitale Produkte entwickeln",
    subtitle:
      "Eine strukturierte, disziplinierte Engineering-Methodik, bewährt in über 25 Projekten. Jede Phase sichert Geschwindigkeit, Präzision und messbaren Geschäftserfolg.",
    cta: "Projekt besprechen",
    phaseLabel: "PHASE",
    deliverablesLabel: "Kernergebnisse",
    toolingLabel: "Tools & Standards",
    gradeLabel: "Produktionsreif",
    qualityLabel: "Garantierte Code-Qualität",
    phases: [
      {
        number: "01",
        phase: "Discovery & Architektur",
        title: "Strategische Analyse & Systemarchitektur",
        summary:
          "Wir analysieren Ihre Geschäftsziele, definieren technische Anforderungen, entwerfen Datenmodelle und planen eine zukunftssichere Systemarchitektur vor der ersten Codezeile.",
        deliverables: [
          "Technische Architekturspezifikation",
          "Domänen-Datenmodell & API-Blueprints",
          "Cloud-Infrastruktur- & Sicherheitsplan",
          "Meilensteinbasierte Delivery-Roadmap",
        ],
        techStack: ["Systemarchitektur", "OpenAPI", "Security-Audit", "AWS / Vercel"],
        codeQuality: "25% - Architektur- & Spezifikationsabgleich",
        qualityPercentage: 25,
        icon: "compass",
      },
      {
        number: "02",
        phase: "Experience & Design",
        title: "Designsysteme & Interaktives Prototyping",
        summary:
          "Wir gestalten maßgeschneiderte Designsysteme mit pixelgenauer Präzision. Jede Interaktion und Komponente wird für Konversion, Markenautorität und WCAG-Barrierefreiheit optimiert.",
        deliverables: [
          "Modulares Komponenten-Designsystem",
          "Interaktive High-Fidelity-Prototypen",
          "Dark-/Light-Mode Token-System",
          "Mikrointeraktions- & Animationsrichtlinien",
        ],
        techStack: ["Figma Systems", "Design Tokens", "Framer Motion", "WCAG 2.1 AA"],
        codeQuality: "50% - Design-Tokens & WCAG-Validierung",
        qualityPercentage: 50,
        icon: "palette",
      },
      {
        number: "03",
        phase: "Engineering & Build",
        title: "Hochperformantes Full-Stack-Engineering",
        summary:
          "Wir entwickeln modulare, typsichere Webanwendungen mit modernen Server-First-Architekturen – für Ladezeiten unter einer Sekunde und nahtlose Integration.",
        deliverables: [
          "Next.js App Router & React 19 Core",
          "Strikte TypeScript-Typabdeckung",
          "Sichere Server-APIs & E-Mail-Systeme",
          "Mehrsprachigkeits-Engine (i18n)",
        ],
        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Resend API"],
        codeQuality: "75% - Striktes TypeScript & Server-Core",
        qualityPercentage: 75,
        icon: "code",
      },
      {
        number: "04",
        phase: "Verifizierung & Evolution",
        title: "Qualitätssicherung & Produktions-Deployment",
        summary:
          "Wir führen automatisierte Tests, Performance-Benchmarks und CI/CD-Deployments durch. Nach dem Launch sichern wir Wartung, SLA-Verfügbarkeit und Skalierung.",
        deliverables: [
          "Lighthouse 95+ Performance-Audits",
          "Automatisiertes CI/CD-Deployment",
          "Härtung der Produktionsumgebung",
          "Laufende Wartung & Wachstums-SLA",
        ],
        techStack: ["Automatisiertes CI/CD", "Lighthouse", "Edge CDN", "24/7 Monitoring"],
        codeQuality: "100% - Produktionsreif & SLA-geprüft",
        qualityPercentage: 100,
        icon: "rocket",
      },
    ],
  },
  es: {
    badge: "Metodología de Ingeniería",
    heading: "Cómo construimos productos digitales",
    subtitle:
      "Una metodología de ingeniería estructurada y disciplinada perfeccionada en más de 25 despliegues. Cada fase garantiza velocidad, precisión e impacto comercial medible.",
    cta: "Hablemos de tu proyecto",
    phaseLabel: "FASE",
    deliverablesLabel: "Entregables Clave",
    toolingLabel: "Herramientas y Estándares",
    gradeLabel: "Grado Producción",
    qualityLabel: "Calidad de Código Garantizada",
    phases: [
      {
        number: "01",
        phase: "Descubrimiento y Planos",
        title: "Descubrimiento Estratégico y Mapeo de Arquitectura",
        summary:
          "Analizamos tus objetivos comerciales, definimos requisitos técnicos, diseñamos modelos de bases de datos y estructuramos una arquitectura escalable antes de escribir código.",
        deliverables: [
          "Especificación de Arquitectura Técnica",
          "Modelo de Datos y Planos de API",
          "Plan de Infraestructura Cloud y Seguridad",
          "Hoja de Ruta de Entrega por Hitos",
        ],
        techStack: ["Arquitectura de Sistemas", "OpenAPI", "Auditoría de Seguridad", "AWS / Vercel"],
        codeQuality: "25% - Alineación de Arquitectura y Especificaciones",
        qualityPercentage: 25,
        icon: "compass",
      },
      {
        number: "02",
        phase: "Experiencia y Diseño",
        title: "Sistemas de Diseño y Prototipado Interactivo",
        summary:
          "Diseñamos sistemas visuales a medida con precisión milimétrica. Cada interacción, transición y componente se optimiza para conversión y accesibilidad WCAG.",
        deliverables: [
          "Sistema de Diseño Modular de Componentes",
          "Prototipos Interactivos de Alta Fidelidad",
          "Sistema de Tokens Responsivo Claro / Oscuro",
          "Guías de Microinteracciones y Animación",
        ],
        techStack: ["Figma Systems", "Design Tokens", "Framer Motion", "WCAG 2.1 AA"],
        codeQuality: "50% - Tokens de Diseño y Validación WCAG",
        qualityPercentage: 50,
        icon: "palette",
      },
      {
        number: "03",
        phase: "Ingeniería y Desarrollo",
        title: "Ingeniería Full-Stack de Alto Rendimiento",
        summary:
          "Construimos aplicaciones web modulares y tipadas utilizando arquitecturas modernas server-first, diseñadas para tiempos de carga menores a un segundo.",
        deliverables: [
          "Next.js App Router y Núcleo React 19",
          "Cobertura Estricta con TypeScript",
          "APIs de Servidor y Correo Resilientes",
          "Motor de Internacionalización (i18n)",
        ],
        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Resend API"],
        codeQuality: "75% - TypeScript Estricto y Núcleo Server",
        qualityPercentage: 75,
        icon: "code",
      },
      {
        number: "04",
        phase: "Verificación y Evolución",
        title: "Control de Calidad QA y Despliegue a Producción",
        summary:
          "Ejecutamos pruebas automatizadas, auditorías de rendimiento y despliegues CI/CD. Tras el lanzamiento, brindamos mantenimiento continuo y soporte SLA 24/7.",
        deliverables: [
          "Auditoría de Rendimiento Lighthouse 95+",
          "Despliegue Automatizado con CI/CD",
          "Blindaje de Entorno de Producción",
          "Mantenimiento Continuo y SLA de Crecimiento",
        ],
        techStack: ["CI/CD Automatizado", "Lighthouse", "Edge CDN", "Monitoreo 24/7"],
        codeQuality: "100% - Grado Producción y SLA Verificado",
        qualityPercentage: 100,
        icon: "rocket",
      },
    ],
  },
};

export default function HowWeBuildSection() {
  const [activeStep, setActiveStep] = useState(0);
  const { language } = useLanguage();
  const copy = HOW_WE_BUILD_I18N[language] || HOW_WE_BUILD_I18N.en;
  const phases = copy.phases;

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
                  {copy.badge}
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight">
                {copy.heading}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
                {copy.subtitle}
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:bg-brand-accent hover:text-brand-light dark:hover:bg-amber-400 shadow-sm hover:shadow-lg active:scale-95 group"
            >
              <span>{copy.cta}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </FadeIn>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8">
          {phases.map((phase, idx) => (
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
                  {copy.phaseLabel} {phase.number}
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
                  {phases[activeStep].number}
                </span>
                <span className="h-6 w-px bg-brand-dark/20 dark:bg-white/20" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60">
                  {phases[activeStep].phase}
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light">
                {phases[activeStep].title}
              </h3>

              <p className="text-base text-brand-dark/75 dark:text-brand-light/75 leading-relaxed">
                {phases[activeStep].summary}
              </p>

              {/* Key Deliverables List */}
              <div className="pt-2 space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-accent font-mono">
                  {copy.deliverablesLabel}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {phases[activeStep].deliverables.map((item) => (
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
                  {copy.toolingLabel}
                </span>
                <span className="text-xs font-mono text-brand-accent">{copy.gradeLabel}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {phases[activeStep].techStack.map((tech) => (
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
                  <span>{copy.qualityLabel}</span>
                  <span className="font-bold text-brand-accent font-mono">
                    {phases[activeStep].codeQuality}
                  </span>
                </div>
                <div className="mt-2.5 w-full h-2 rounded-full bg-brand-dark/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-brand-accent transition-all duration-500 rounded-full shadow-sm"
                    style={{ width: `${phases[activeStep].qualityPercentage}%` }}
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
