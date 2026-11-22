"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { SupportedLanguage } from "@/lib/i18n/types";

interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
}

interface BlogCopy {
  badge: string;
  heading: string;
  subtitle: string;
  requestTopic: string;
  readArticle: string;
  byLabel: string;
  publicationsLabel: string;
  closeLabel: string;
  posts: BlogPost[];
}

const BLOG_I18N: Record<SupportedLanguage, BlogCopy> = {
  en: {
    badge: "Insights & Strategy",
    heading: "Articles, perspectives & engineering thoughts",
    subtitle:
      "Deep dives into modern full-stack development, design system architecture, and scalable digital product strategies from our engineering team.",
    requestTopic: "Request Topic",
    readArticle: "Read Article",
    byLabel: "By",
    publicationsLabel: "Hextel Tech Engineering Publications",
    closeLabel: "Close",
    posts: [
      {
        id: "post-1",
        category: "Architecture & Next.js",
        date: "October 2026",
        readTime: "5 min read",
        title: "Next.js 15 & React 19: Architecting Zero-Latency Enterprise Platforms",
        excerpt:
          "How server components, standalone build optimizations, and partial pre-rendering unlock sub-second global performance for modern commercial applications.",
        author: { name: "Hasaan Ahmad", role: "CEO & Co-Founder" },
        content: [
          "Modern web platforms require more than just aesthetic excellence; they demand enterprise resilience, instant interactivity, and scalable architecture.",
          "With Next.js 15 and React 19, the boundary between client reactivity and server computation has been streamlined. By leveraging React Server Components (RSC) and standalone server traces, bundle payloads delivered to mobile clients decrease dramatically.",
          "At Hextel Tech, we combine aggressive caching topologies with type-safe server actions, ensuring sensitive credentials remain isolated while delivering dynamic content at edge speeds.",
        ],
      },
      {
        id: "post-2",
        category: "Design Engineering",
        date: "September 2026",
        readTime: "4 min read",
        title: "Design Systems in Practice: Bridging Figma and Production React",
        excerpt:
          "A pragmatic guide to eliminating design debt, standardizing semantic color tokens, and orchestrating fluid Framer Motion micro-interactions.",
        author: { name: "Muhammad Faseeh Altaf", role: "Co-Founder & Full-Stack Lead" },
        content: [
          "A design system is not merely a Figma library; it is a live contract between design intent and production implementation.",
          "By establishing semantic design tokens that transition seamlessly between light and dark modes, development teams eliminate visual regressions and accelerate feature rollouts.",
          "Micro-interactions provide cognitive feedback. Subtle button hover elevations, progress indicators, and spring physics elevate digital products from functional tools to memorable brand experiences.",
        ],
      },
      {
        id: "post-3",
        category: "AI & Cloud Security",
        date: "August 2026",
        readTime: "6 min read",
        title: "Server-Side Isolation: Hardening AI Agents, API Routes & Direct Mailers",
        excerpt:
          "Essential defensive patterns for securing API keys, preventing client leaks with server-only guards, and mitigating bot traffic on high-volume endpoints.",
        author: { name: "Moman Salman", role: "Co-Founder & AI Automation Lead" },
        content: [
          "Exposing third-party API keys in client-side bundles remains one of the most common vulnerabilities in frontend web development.",
          "Utilizing React's official 'server-only' package guarantees that internal dispatcher routines and provider credentials cannot accidentally leak into the client bundle at compile time.",
          "Combined with honeypot fields, input sanitization, and structured internal logging, web applications maintain enterprise security posture without adding friction to genuine users.",
        ],
      },
    ],
  },
  pl: {
    badge: "Wiedza i Strategia",
    heading: "Artykuły, perspektywy i publikacje inżynieryjne",
    subtitle:
      "Praktyczne analizy nowoczesnego programowania full-stack, architektury design systemów oraz skalowalnych produktów cyfrowych od naszego zespołu.",
    requestTopic: "Zaproponuj temat",
    readArticle: "Czytaj artykuł",
    byLabel: "Autor:",
    publicationsLabel: "Publikacje Inżynieryjne Hextel Tech",
    closeLabel: "Zamknij",
    posts: [
      {
        id: "post-1",
        category: "Architektura i Next.js",
        date: "Październik 2026",
        readTime: "5 min czytania",
        title: "Next.js 15 i React 19: Projektowanie Platform Enterprise o Zerowym Opóźnieniu",
        excerpt:
          "Jak komponenty serwerowe (RSC) i optymalizacje buildu odblokowują czasy ładowania poniżej sekundy w nowoczesnych aplikacjach komercyjnych.",
        author: { name: "Hasaan Ahmad", role: "CEO & Współzałożyciel" },
        content: [
          "Nowoczesne platformy webowe wymagają nie tylko doskonałej estetyki, ale również odporności klasy enterprise, natychmiastowej interaktywności i skalowalnej architektury.",
          "Dzięki Next.js 15 i React 19 granica między reaktywnością klienta a obliczeniami po stronie serwera została zoptymalizowana. Wykorzystanie React Server Components (RSC) radykalnie zmniejsza rozmiar paczek JS wysyłanych do przeglądarki.",
          "W Hextel Tech łączymy zaawansowane strategie cachowania z bezpiecznymi akcjami serwerowymi, izolując klucze API i dostarczając dynamiczną treść z prędkością sieci Edge.",
        ],
      },
      {
        id: "post-2",
        category: "Inżynieria Designu",
        date: "Wrzesień 2026",
        readTime: "4 min czytania",
        title: "Design Systemy w Praktyce: Łączenie Figmy z Produkcyjnym Reactem",
        excerpt:
          "Praktyczny przewodnik po eliminacji długu projektowego, standaryzacji tokenów kolorystycznych i płynnych mikrointerakcjach Framer Motion.",
        author: { name: "Muhammad Faseeh Altaf", role: "Współzałożyciel & Full-Stack Lead" },
        content: [
          "Design system to nie tylko biblioteka w Figmie — to żywy kontrakt między intencją projektową a wdrożeniem produkcyjnym.",
          "Wprowadzenie semantycznych tokenów kolorystycznych dla trybu jasnego i ciemnego eliminuje błędy wizualne i przyspiesza wdrażanie nowych funkcji.",
          "Mikrointerakcje zapewniają natychmiastową informację zwrotną, podnosząc produkty cyfrowe do rangi zapadających w pamięć doświadczeń marki.",
        ],
      },
      {
        id: "post-3",
        category: "AI i Bezpieczeństwo Chmury",
        date: "Sierpień 2026",
        readTime: "6 min czytania",
        title: "Izolacja Serwerowa: Zabezpieczanie Agentów AI, Endpointów API i Mailerów",
        excerpt:
          "Kluczowe wzorce ochrony kluczy API, blokowania wycieków do klienta za pomocą strażników server-only oraz ochrony przed botami.",
        author: { name: "Moman Salman", role: "Współzałożyciel & AI Automation Lead" },
        content: [
          "Wyciek kluczy API do paczek klienckich pozostaje jednym z najczęstszych zagrożeń w aplikacjach webowych.",
          "Zastosowanie pakietu 'server-only' gwarantuje już na etapie kompilacji, że poufne moduły serwerowe i poświadczenia nigdy nie trafią do kodu przeglądarki.",
          "W połączeniu z polami typu honeypot i walidacją danych wejściowych aplikacje zachowują najwyższy poziom bezpieczeństwa bez utrudnień dla użytkowników.",
        ],
      },
    ],
  },
  de: {
    badge: "Einblicke & Strategie",
    heading: "Artikel, Perspektiven & Engineering-Insights",
    subtitle:
      "Fachbeiträge zu moderner Full-Stack-Entwicklung, Designsystem-Architektur und skalierbaren digitalen Produktstrategien unseres Entwicklerteams.",
    requestTopic: "Thema vorschlagen",
    readArticle: "Artikel lesen",
    byLabel: "Von",
    publicationsLabel: "Hextel Tech Engineering-Publikationen",
    closeLabel: "Schließen",
    posts: [
      {
        id: "post-1",
        category: "Architektur & Next.js",
        date: "Oktober 2026",
        readTime: "5 Min. Lesezeit",
        title: "Next.js 15 & React 19: Architektur latenzfreier Enterprise-Plattformen",
        excerpt:
          "Wie Server Components und Build-Optimierungen globale Ladezeiten unter einer Sekunde für moderne kommerzielle Webanwendungen ermöglichen.",
        author: { name: "Hasaan Ahmad", role: "CEO & Mitgründer" },
        content: [
          "Moderne Webplattformen erfordern mehr als nur hervorragendes Design – sie verlangen Enterprise-Stabilität, sofortige Interaktivität und skalierbare Architektur.",
          "Mit Next.js 15 und React 19 wird das Zusammenspiel zwischen Client-Reaktivität und Server-Berechnung optimal abgestimmt. Durch React Server Components (RSC) sinkt die JavaScript-Bundle-Größe auf Mobilgeräten drastisch.",
          "Bei Hextel Tech kombinieren wir intelligente Caching-Strategien mit typsicheren Server-Actions, sodass sensible Zugangsdaten geschützt bleiben.",
        ],
      },
      {
        id: "post-2",
        category: "Design-Engineering",
        date: "September 2026",
        readTime: "4 Min. Lesezeit",
        title: "Designsysteme in der Praxis: Die Brücke zwischen Figma und React",
        excerpt:
          "Ein praxisnaher Leitfaden zur Vermeidung von Design-Schulden, Standardisierung semantischer Farb-Tokens und flüssigen Framer-Motion-Animationen.",
        author: { name: "Muhammad Faseeh Altaf", role: "Mitgründer & Full-Stack Lead" },
        content: [
          "Ein Designsystem ist mehr als eine Figma-Datei – es ist ein verbindlicher Vertrag zwischen Design und Produktionscode.",
          "Semantische Design-Tokens für den hellen und dunklen Modus verhindern visuelle Regressionen und beschleunigen neue Feature-Releases.",
          "Durchdachte Mikrointeraktionen verwandeln funktionale Anwendungen in überzeugende Markenerlebnisse.",
        ],
      },
      {
        id: "post-3",
        category: "KI- & Cloud-Sicherheit",
        date: "August 2026",
        readTime: "6 Min. Lesezeit",
        title: "Serverseitige Isolierung: Absicherung von KI-Agenten, API-Routen & Mailern",
        excerpt:
          "Bewährte Sicherheitsmuster zum Schutz von API-Schlüsseln mit Server-Only-Guards und effektiver Bot-Abwehr.",
        author: { name: "Moman Salman", role: "Mitgründer & KI-Automatisierungs-Lead" },
        content: [
          "Die versehentliche Offenlegung von API-Schlüsseln im Client-Bundle zählt zu den häufigsten Sicherheitsrisiken moderner Webanwendungen.",
          "Der Einsatz des offiziellen 'server-only'-Pakets stellt bereits zur Compile-Zeit sicher, dass Server-Logik und Zugangsdaten niemals im Browser landen.",
          "Kombiniert mit Honeypot-Feldern und strikter Eingabevalidierung bleibt Ihre Plattform dauerhaft geschützt.",
        ],
      },
    ],
  },
  es: {
    badge: "Perspectivas y Estrategia",
    heading: "Artículos, perspectivas y reflexiones de ingeniería",
    subtitle:
      "Análisis profundos sobre desarrollo full-stack moderno, arquitectura de sistemas de diseño y estrategias de productos digitales escalables.",
    requestTopic: "Sugerir tema",
    readArticle: "Leer artículo",
    byLabel: "Por",
    publicationsLabel: "Publicaciones de Ingeniería de Hextel Tech",
    closeLabel: "Cerrar",
    posts: [
      {
        id: "post-1",
        category: "Arquitectura y Next.js",
        date: "Octubre 2026",
        readTime: "5 min de lectura",
        title: "Next.js 15 y React 19: Arquitectura de Plataformas Empresariales sin Latencia",
        excerpt:
          "Cómo los componentes de servidor y las optimizaciones de compilación desbloquean tiempos de carga inferiores a un segundo a escala global.",
        author: { name: "Hasaan Ahmad", role: "CEO y Cofundador" },
        content: [
          "Las plataformas web modernas requieren mucho más que excelencia estética: exigen resiliencia empresarial, interactividad instantánea y arquitectura escalable.",
          "Con Next.js 15 y React 19, la frontera entre la reactividad del cliente y el cómputo en servidor se ha optimizado. Al aprovechar React Server Components (RSC), el peso de los paquetes entregados a dispositivos móviles se reduce drásticamente.",
          "En Hextel Tech combinamos topologías avanzadas de caché con acciones de servidor tipadas, manteniendo las credenciales aisladas y seguras.",
        ],
      },
      {
        id: "post-2",
        category: "Ingeniería de Diseño",
        date: "Septiembre 2026",
        readTime: "4 min de lectura",
        title: "Sistemas de Diseño en la Práctica: Uniendo Figma y React en Producción",
        excerpt:
          "Guía práctica para eliminar la deuda de diseño, estandarizar tokens semánticos de color y orquestar microinteracciones fluidas con Framer Motion.",
        author: { name: "Muhammad Faseeh Altaf", role: "Cofundador y Líder Full-Stack" },
        content: [
          "Un sistema de diseño no es solo una librería en Figma; es un contrato vivo entre la intención visual y la implementación en código.",
          "Al establecer tokens semánticos que alternan de forma fluida entre modo claro y oscuro, los equipos eliminan regresiones visuales y aceleran entregas.",
          "Las microinteracciones proporcionan retroalimentación inmediata, elevando las herramientas digitales a experiencias de marca memorables.",
        ],
      },
      {
        id: "post-3",
        category: "IA y Seguridad Cloud",
        date: "Agosto 2026",
        readTime: "6 min de lectura",
        title: "Aislamiento en Servidor: Blindaje de Agentes de IA, Rutas API y Correo",
        excerpt:
          "Patrones defensivos esenciales para proteger claves API, prevenir filtraciones al cliente con guardias server-only y mitigar tráfico de bots.",
        author: { name: "Moman Salman", role: "Cofundador y Líder de Automatización IA" },
        content: [
          "Exponer claves API de terceros en paquetes del cliente sigue siendo una de las vulnerabilidades más comunes en el desarrollo web.",
          "Utilizar el paquete oficial 'server-only' garantiza en tiempo de compilación que las credenciales y despachadores internos jamás se filtren al navegador.",
          "Combinado con campos honeypot y validación estricta, las aplicaciones mantienen una postura de seguridad empresarial sin fricción para el usuario.",
        ],
      },
    ],
  },
};

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { language } = useLanguage();
  const copy = BLOG_I18N[language] || BLOG_I18N.en;

  // Lock background body scroll when reading an article so only the article scrolls
  useEffect(() => {
    if (selectedPost) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [selectedPost]);

  return (
    <>
      <section
        id="blog"
        className="relative z-10 bg-brand-light dark:bg-[#120E0E] py-20 sm:py-28 transition-colors"
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

              <div className="flex items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-brand-dark/20 dark:border-white/20 text-brand-dark dark:text-brand-light hover:border-brand-accent hover:text-brand-accent active:scale-95 group"
                >
                  <span>{copy.requestTopic}</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Blog Cards Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.posts.map((post) => (
              <StaggerItem key={post.id}>
                <article
                  className="rounded-2xl border border-brand-dark/10 dark:border-white/10 bg-surface-dim dark:bg-[#1A1414] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-brand-accent hover:shadow-xl hover:-translate-y-1.5 group"
                >
                  <div>
                    {/* Meta Header */}
                    <div className="flex items-center justify-between text-xs font-mono text-brand-dark/60 dark:text-brand-light/60 pb-4 mb-4 border-b border-brand-dark/10 dark:border-white/10">
                      <span className="text-brand-accent font-semibold">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light group-hover:text-brand-accent transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-brand-dark/70 dark:text-brand-light/70 leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Author & Read CTA */}
                  <div className="pt-6 border-t border-brand-dark/10 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-brand-dark dark:text-brand-light">
                        {post.author.name}
                      </div>
                      <div className="text-[11px] text-brand-dark/50 dark:text-brand-light/50">
                        {post.date}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-brand-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{copy.readArticle}</span>
                      <span>→</span>
                    </button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interactive Modal Reader for Selected Post */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overscroll-contain"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto overscroll-contain rounded-2xl border border-brand-dark/15 dark:border-white/15 bg-brand-light dark:bg-[#1A1414] p-5 xs:p-6 sm:p-10 shadow-2xl space-y-5 sm:space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start xs:items-center justify-between gap-3 pb-4 border-b border-brand-dark/10 dark:border-white/10">
              <div className="flex items-center gap-2 xs:gap-3 flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-brand-accent/15 text-brand-accent text-xs font-mono font-semibold">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-brand-dark/60 dark:text-brand-light/60 font-mono">
                  {selectedPost.readTime} • {selectedPost.date}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-full border border-brand-dark/15 dark:border-white/15 flex items-center justify-center text-brand-dark/60 dark:text-brand-light/60 hover:text-brand-dark dark:hover:text-brand-light hover:border-brand-accent transition-colors shrink-0"
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            {/* Modal Title */}
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-dark dark:text-brand-light leading-tight">
              {selectedPost.title}
            </h2>

            {/* Author Byline */}
            <div className="flex items-center gap-3 text-xs text-brand-dark/70 dark:text-brand-light/70">
              <span className="w-2 h-2 rounded-full bg-brand-accent" />
              <span>
                {copy.byLabel}{" "}
                <strong className="text-brand-dark dark:text-brand-light">
                  {selectedPost.author.name}
                </strong>
                , {selectedPost.author.role}
              </span>
            </div>

            {/* Body Content */}
            <div className="space-y-4 text-sm sm:text-base text-brand-dark/85 dark:text-brand-light/85 leading-relaxed pt-2">
              {selectedPost.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-brand-dark/10 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs text-brand-dark/50 dark:text-brand-light/50 font-mono">
                {copy.publicationsLabel}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-brand-dark dark:bg-brand-accent text-brand-light dark:text-brand-dark text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                {copy.closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
