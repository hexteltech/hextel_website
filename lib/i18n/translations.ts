import { SupportedLanguage, TranslationSchema } from "./types";

export const translations: Record<SupportedLanguage, TranslationSchema> = {
  en: {
    common: {
      siteName: "Hextel Tech",
      tagline: "Engineering Digital Excellence for Ambitious Brands",
      backToTop: "Back to top",
      quickSearch: "Quick Search",
      clientPortal: "Client Portal",
      startProject: "Start a project",
      meetTeam: "Meet the team",
      contactUs: "Contact us",
      learnMore: "Learn more",
      viewAll: "View all",
      loading: "Loading...",
      appearance: "Appearance",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      language: "Language",
    },
    regionNotice: {
      title: "Language Adapted to Your Region",
      message: "We detected your location and automatically switched your language.",
      switchBack: "Switch to English",
      dismiss: "Dismiss",
    },
    nav: {
      home: "Home",
      services: "Services",
      about: "About Us",
      blog: "Blog",
      howWeBuild: "How We Build",
      projects: "Our Projects",
      contact: "Contact Us",
      searchPlaceholder: "Search sections & services...",
      portalLabel: "Portal",
    },
    hero: {
      badge: "Strategy / Design / Technology",
      headlinePart1: "New possibilities for",
      headlineHighlight: "ambitious brands",
      description:
        "We create modern web applications and digital ecosystems that strengthen your market position, accelerate customer acquisition, and drive measurable enterprise growth.",
      trustedBy: "Trusted by industry leaders",
      stats: {
        projects: "Projects delivered",
        years: "Years of experience",
        hours: "Product hours",
        revenue: "Client revenue generated",
      },
    },
    projects: {
      badge: "Portfolio",
      heading: "Turning ideas into real outcomes",
      description:
        "We combine strategic engineering, refined design, and modern technology to deliver scalable web platforms.",
      cta: "Explore all case studies",
      items: [
        {
          id: "project-1",
          title: "A premium brand with a new digital ecosystem",
          category: "Full-Stack Web Application",
        },
        {
          id: "project-2",
          title: "A modern identity and infrastructure for high-growth tech",
          category: "Design System & Platform",
        },
      ],
    },
    services: {
      badge: "Expertise",
      heading: "Our core services",
      description:
        "End-to-end technical leadership, from initial product architecture to deployment and continuous growth.",
      cta: "Explore services roadmap",
      items: [
        {
          number: "01.",
          title: "UX/UI Design",
          description:
            "Modern and functional interfaces tailored to your audience. We engineer intuitive experiences that elevate engagement and drive conversion.",
        },
        {
          number: "02.",
          title: "Web Platforms",
          description:
            "Blazing-fast, responsive, and SEO-optimized web applications built with modern architectures. Every screen is engineered for performance.",
        },
        {
          number: "03.",
          title: "Brand Systems",
          description:
            "A coherent visual identity that distinguishes your company in competitive markets through refined typography, color harmony, and style guides.",
        },
        {
          number: "04.",
          title: "Cloud & Evolution",
          description:
            "Continuous optimization, monitoring, and proactive engineering after launch to ensure resilience and adaptability as your organization scales.",
        },
      ],
    },
    team: {
      badge: "Our Team & Values",
      heading: "People who create value",
      description:
        "We are a dedicated team of engineers, architects, and visual designers who combine deep passion for modern cloud technology with a sharp eye for functional design. Every digital solution is engineered around your enterprise goals and target audience.",
      specialistsBadge: "10+ Senior Specialists",
      specialistsSub: "Distributed across product & systems",
      values: [
        "Strategic engineering & architecture",
        "Tailored, human-centered UX design",
        "Dedicated ongoing support & SLAs",
      ],
      cta: "Start a conversation",
    },
    faq: {
      badge: "Clarity & Process",
      heading: "Frequently asked questions",
      description:
        "Everything you need to know about our engineering process, engagement models, and project deliverables.",
      unansweredPrompt: "Have a question that isn't answered here?",
      contactLink: "Contact our solutions team",
      items: [
        {
          question: "What does the typical development process look like?",
          answer:
            "We begin with in-depth technical and strategic discovery, map architecture and wireframes, design interactive prototypes, build modular code with rigorous automated testing, and execute seamless deployment with CI/CD pipelines.",
        },
        {
          question: "How long does a typical web application project take?",
          answer:
            "Most enterprise and custom agency web platforms take between 4 to 8 weeks depending on scope, integrations, and content readiness.",
        },
        {
          question: "Do you provide maintenance and ongoing support after delivery?",
          answer:
            "Yes, we offer dedicated monthly SLA tiers covering infrastructure monitoring, security updates, feature expansions, and performance audits.",
        },
        {
          question: "Can you modernize our existing monolithic codebase to Next.js?",
          answer:
            "Absolutely. We specialize in incremental and complete migrations, converting legacy HTML/CSS/PHP/Java templates into high-performance Next.js App Router applications.",
        },
      ],
    },
    reviews: {
      badge: "Testimonials",
      heading: "Reviews that say more",
      description:
        "See how collaborating with Hextel Tech translated into tangible market differentiation and measurable revenue.",
      items: [
        {
          quote:
            "Hextel Tech completely transformed our digital presence. The new web application loaded 3x faster and directly increased our inbound qualified leads by 42%.",
          author: "Elena Rostova",
          role: "Head of Product",
          company: "LUMI Technologies",
        },
        {
          quote:
            "Their architectural precision, attention to design detail, and execution speed exceeded every expectation. True senior engineering leadership.",
          author: "Marek Kowalski",
          role: "CEO & Founder",
          company: "MODO Systems",
        },
        {
          quote:
            "Partnering with Hextel Tech was the best technology investment we made this year. Flawless execution from concept to launch.",
          author: "Sofia Chen",
          role: "VP of Marketing",
          company: "NOMA Group",
        },
      ],
    },
    contact: {
      badge: "Start a Conversation",
      heading: "Let's build something remarkable together.",
      description:
        "Whether you are architecting a new web platform from scratch or migrating an existing system to Next.js, our senior engineering team is here to guide every phase.",
      directEmail: "Direct Email",
      directLine: "Direct Line",
      headquarters: "Headquarters",
      formTitle: "Let's start a project",
      formSubtitle: "Tell us about your technical goals and we will prepare a tailored proposal.",
      nameLabel: "Your Name",
      namePlaceholder: "e.g. John Doe",
      emailLabel: "Work Email",
      emailPlaceholder: "e.g. john@company.com",
      serviceLabel: "Interested Service",
      ndaLabel: "Optional NDA / Client Code",
      ndaPlaceholder: "Confidential access key (if provided)",
      messageLabel: "Project Details",
      messagePlaceholder: "Tell us about timeline, scope, and key deliverables...",
      consentText:
        "I consent to Hextel Tech processing my details to reply to this project inquiry in accordance with the Privacy Policy.",
      submitButton: "Send project inquiry",
      submittingButton: "Submitting inquiry...",
      successBadge: "Inquiry Received Successfully",
      thankYou: "Thank you",
      confirmationText:
        "Your project details have been safely routed to our engineering leadership. A senior solutions architect will review your scope and follow up with a tailored timeline at",
      referenceTicket: "Reference Ticket",
      selectedDomain: "Selected Domain",
      submittedAt: "Submitted At",
      campaignSource: "Campaign Source",
      submitAnother: "Submit another inquiry",
      validationRequired: "Please fill in all required fields.",
      validationConsent: "Please accept the privacy policy to proceed.",
      servicesOptions: [
        "UX/UI Design",
        "Web Platforms",
        "Brand Systems",
        "Cloud & Evolution",
        "Other Consulting",
      ],
    },
    footer: {
      tagline: "Engineering Digital Excellence for Ambitious Brands",
      navHeading: "Navigation",
      connectHeading: "Connect",
      rightsReserved: "All rights reserved.",
      cookieSettings: "Cookie Settings",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
    },
    notFound: {
      badge: "SYSTEM STATUS: 404 // ROUTE_NOT_FOUND",
      code: "404",
      heading: "Lost in digital space?",
      description:
        "The requested node or page does not exist, has been decommissioned, or was migrated to a new coordinate.",
      searchPrompt: "Search our ecosystem directly:",
      searchPlaceholder: "Search services, case studies, insights...",
      searchButton: "Search",
      returnHome: "Return to Home",
      goBack: "Go back",
      helpfulLinks: "Explore core destinations",
      links: {
        home: {
          title: "Main Headquarters",
          desc: "Return to our digital front door & company overview",
        },
        services: {
          title: "Engineering Services",
          desc: "Explore UX/UI, Web Platforms, and Cloud Solutions",
        },
        projects: {
          title: "Selected Work",
          desc: "Inspect case studies, architecture, and client results",
        },
        contact: {
          title: "Direct Engineering",
          desc: "Start a project inquiry or schedule a discovery call",
        },
      },
      diagnosticTitle: "Diagnostic Telemetry",
      diagnosticStatus: "HTTP Status",
      diagnosticPath: "Requested Endpoint",
      diagnosticTime: "Timestamp",
    },
  },

  pl: {
    common: {
      siteName: "Hextel Tech",
      tagline: "Inżynieria Cyfrowej Doskonałości dla Ambitnych Marek",
      backToTop: "Na górę",
      quickSearch: "Szybkie szukanie",
      clientPortal: "Portal Klienta",
      startProject: "Rozpocznij projekt",
      meetTeam: "Poznaj zespół",
      contactUs: "Kontakt",
      learnMore: "Więcej informacji",
      viewAll: "Zobacz wszystkie",
      loading: "Ładowanie...",
      appearance: "Wygląd",
      lightMode: "Tryb jasny",
      darkMode: "Tryb ciemny",
      language: "Język",
    },
    regionNotice: {
      title: "Język dopasowany do Twojego regionu",
      message: "Wykryliśmy Twoją lokalizację (Polska) i automatycznie przełączyliśmy stronę na język polski.",
      switchBack: "Zmień na angielski",
      dismiss: "Zamknij",
    },
    nav: {
      home: "Strona główna",
      services: "Usługi",
      about: "O nas",
      blog: "Blog",
      howWeBuild: "Jak budujemy",
      projects: "Nasze projekty",
      contact: "Kontakt",
      searchPlaceholder: "Szukaj sekcji i usług...",
      portalLabel: "Portal",
    },
    hero: {
      badge: "Strategia / Design / Technologia",
      headlinePart1: "Nowe możliwości dla",
      headlineHighlight: "ambitnych marek",
      description:
        "Tworzymy nowoczesne aplikacje internetowe i ekosystemy cyfrowe, które umacniają pozycję rynkową, przyspieszają pozyskiwanie klientów i generują mierzalny wzrost biznesowy.",
      trustedBy: "Zaufali nam liderzy branży",
      stats: {
        projects: "Zrealizowanych projektów",
        years: "Lat doświadczenia",
        hours: "Godzin produktowych",
        revenue: "Wygenerowanych przychodów",
      },
    },
    projects: {
      badge: "Portfolio",
      heading: "Przekształcamy idee w realne rezultaty",
      description:
        "Łączymy inżynierię strategiczną, dopracowany design i najnowsze technologie, aby dostarczać skalowalne platformy webowe.",
      cta: "Zobacz wszystkie case study",
      items: [
        {
          id: "project-1",
          title: "Marka premium z nowym ekosystemem cyfrowym",
          category: "Aplikacja Webowa Full-Stack",
        },
        {
          id: "project-2",
          title: "Nowoczesna tożsamość i infrastruktura dla technologii",
          category: "Design System & Platforma",
        },
      ],
    },
    services: {
      badge: "Kompetencje",
      heading: "Nasze kluczowe usługi",
      description:
        "Kompleksowe przywództwo technologiczne — od koncepcji architektury produktu po wdrożenie i ciągły rozwój.",
      cta: "Zobacz mapę usług",
      items: [
        {
          number: "01.",
          title: "Projektowanie UX/UI",
          description:
            "Nowoczesne i funkcjonalne interfejsy dopasowane do Twoich odbiorców. Projektujemy intuicyjne doświadczenia zwiększające zaangażowanie i konwersję.",
        },
        {
          number: "02.",
          title: "Platformy Webowe",
          description:
            "Błyskawiczne, responsywne i zoptymalizowane pod SEO aplikacje webowe w nowoczesnych architekturach. Każdy ekran zaprojektowany z myślą o wydajności.",
        },
        {
          number: "03.",
          title: "Systemy Identyfikacji",
          description:
            "Spójna tożsamość wizualna wyróżniająca Twoją firmę na konkurencyjnym rynku dzięki precyzyjnej typografii, harmonii barw i wytycznym brandu.",
        },
        {
          number: "04.",
          title: "Chmura & Ewolucja",
          description:
            "Ciągła optymalizacja, monitorowanie i proaktywne wsparcie techniczne po wdrożeniu, gwarantujące stabilność wraz ze wzrostem Twojej organizacji.",
        },
      ],
    },
    team: {
      badge: "Nasz Zespół i Wartości",
      heading: "Ludzie, którzy tworzą wartość",
      description:
        "Jesteśmy dedykowanym zespołem inżynierów, architektów i projektantów wizualnych łączących pasję do nowoczesnych technologii chmurowych z wyczuciem funkcjonalnego designu. Każde rozwiązanie jest dostosowane do celów Twojej firmy.",
      specialistsBadge: "10+ Doświadczonych Specjalistów",
      specialistsSub: "Zespoły produktowe i systemowe",
      values: [
        "Strategiczna inżynieria i architektura",
        "Dopasowany, zorientowany na człowieka UX",
        "Dedykowane wsparcie ciągłe i umowy SLA",
      ],
      cta: "Rozpocznij rozmowę",
    },
    faq: {
      badge: "Przejrzystość & Proces",
      heading: "Najczęściej zadawane pytania",
      description:
        "Wszystko, co warto wiedzieć o naszym procesie inżynieryjnym, modelach współpracy i rezultatach projektów.",
      unansweredPrompt: "Masz pytanie, na które nie ma tutaj odpowiedzi?",
      contactLink: "Skontaktuj się z naszym zespołem",
      items: [
        {
          question: "Jak wygląda typowy proces realizacji projektu?",
          answer:
            "Rozpoczynamy od dogłębnego discovery technicznego i strategicznego, projektujemy architekturę i makiety, tworzymy interaktywne prototypy, piszemy modułowy kod z testami automatycznymi i wdrażamy w środowisku CI/CD.",
        },
        {
          question: "Ile czasu zajmuje realizacja dedykowanej platformy webowej?",
          answer:
            "Większość platform agencyjnych i korporacyjnych realizujemy w czasie od 4 do 8 tygodni, zależnie od zakresu, integracji i gotowości materiałów.",
        },
        {
          question: "Czy zapewniacie utrzymanie i wsparcie powdrożeniowe?",
          answer:
            "Tak, oferujemy miesięczne pakiety SLA obejmujące monitoring infrastruktury, aktualizacje bezpieczeństwa, rozwój funkcji oraz audyty wydajności.",
        },
        {
          question: "Czy możecie zmigrować istniejący monolit do Next.js?",
          answer:
            "Zdecydowanie. Specjalizujemy się w stopniowych oraz kompleksowych migracjach ze starszych szablonów HTML/PHP do wydajnych aplikacji Next.js App Router.",
        },
      ],
    },
    reviews: {
      badge: "Rekomendacje",
      heading: "Opinie, które mówią same za siebie",
      description:
        "Zobacz, jak współpraca z Hextel Tech przełożyła się na realną przewagę rynkową i wzrost przychodów.",
      items: [
        {
          quote:
            "Hextel Tech całkowicie odmienił naszą obecność w sieci. Nowa aplikacja ładuje się 3x szybciej i bezpośrednio zwiększyła napływ kwalifikowanych leadów o 42%.",
          author: "Elena Rostova",
          role: "Dyrektor Produktu",
          company: "LUMI Technologies",
        },
        {
          quote:
            "Precyzja architektoniczna, dbałość o detal graficzny i tempo realizacji przekroczyły wszelkie oczekiwania. Prawdziwe inżynieryjne przywództwo.",
          author: "Marek Kowalski",
          role: "CEO & Założyciel",
          company: "MODO Systems",
        },
        {
          quote:
            "Współpraca z Hextel Tech była najlepszą inwestycją technologiczną w tym roku. Bezbłędna realizacja od pomysłu aż po wdrożenie.",
          author: "Sofia Chen",
          role: "Wiceprezes ds. Marketingu",
          company: "NOMA Group",
        },
      ],
    },
    contact: {
      badge: "Nawiąż Kontakt",
      heading: "Zbudujmy razem coś wyjątkowego.",
      description:
        "Niezależnie od tego, czy tworzysz nową platformę od zera, czy migrujesz istniejący system do Next.js, nasz zespół inżynierów poprowadzi każdy etap.",
      directEmail: "Bezpośredni Email",
      directLine: "Infolinia",
      headquarters: "Siedziba Główna",
      formTitle: "Rozpocznijmy projekt",
      formSubtitle: "Opowiedz nam o celach technologicznych, a przygotujemy dedykowaną propozycję.",
      nameLabel: "Twoje Imię i Nazwisko",
      namePlaceholder: "np. Jan Kowalski",
      emailLabel: "Służbowy Adres Email",
      emailPlaceholder: "np. jan@firma.pl",
      serviceLabel: "Interesująca Usługa",
      ndaLabel: "Opcjonalny Kod NDA / Klienta",
      ndaPlaceholder: "Poufny klucz dostępu (jeśli posiadasz)",
      messageLabel: "Szczegóły Projektu",
      messagePlaceholder: "Opisz ramy czasowe, zakres i kluczowe wymagania...",
      consentText:
        "Wyrażam zgodę na przetwarzanie moich danych przez Hextel Tech w celu odpowiedzi na zapytanie ofertowe zgodnie z Polityką Prywatności.",
      submitButton: "Wyślij zapytanie projektowe",
      submittingButton: "Wysyłanie zapytania...",
      successBadge: "Zapytanie Zostało Przyjęte",
      thankYou: "Dziękujemy",
      confirmationText:
        "Szczegóły Twojego projektu trafiły do liderów inżynierii. Nasz główny architekt rozwiązań przeanalizuje zakres i skontaktuje się z Tobą pod adresem",
      referenceTicket: "Numer Zgłoszenia",
      selectedDomain: "Wybrany Obszar",
      submittedAt: "Godzina Złożenia",
      campaignSource: "Źródło Kampanii",
      submitAnother: "Wyślij kolejne zapytanie",
      validationRequired: "Proszę uzupełnić wszystkie wymagane pola.",
      validationConsent: "Wymagana jest akceptacja polityki prywatności.",
      servicesOptions: [
        "Projektowanie UX/UI",
        "Platformy Webowe",
        "Systemy Identyfikacji",
        "Chmura & Ewolucja",
        "Inne Doradztwo IT",
      ],
    },
    footer: {
      tagline: "Inżynieria Cyfrowej Doskonałości dla Ambitnych Marek",
      navHeading: "Nawigacja",
      connectHeading: "Kontakt & Społeczność",
      rightsReserved: "Wszelkie prawa zastrzeżone.",
      cookieSettings: "Ustawienia Cookies",
      privacyPolicy: "Polityka Prywatności",
      termsOfService: "Regulamin Usług",
    },
    notFound: {
      badge: "STATUS SYSTEMU: 404 // ROUTE_NOT_FOUND",
      code: "404",
      heading: "Zagubiony w przestrzeni cyfrowej?",
      description:
        "Żądany węzeł lub strona nie istnieje, została wycofana lub przeniesiona pod nowy adres.",
      searchPrompt: "Przeszukaj nasz ekosystem bezpośrednio:",
      searchPlaceholder: "Szukaj usług, portfolio, technologii...",
      searchButton: "Szukaj",
      returnHome: "Wróć do strony głównej",
      goBack: "Wróć do poprzedniej",
      helpfulLinks: "Główne obszary portalu",
      links: {
        home: {
          title: "Strona Główna",
          desc: "Powrót do głównego widoku i przeglądu firmy",
        },
        services: {
          title: "Usługi Inżynieryjne",
          desc: "Poznaj UX/UI, platformy webowe i rozwiązania chmurowe",
        },
        projects: {
          title: "Wybrane Projekty",
          desc: "Zobacz studia przypadków, architekturę i rezultaty",
        },
        contact: {
          title: "Kontakt z Inżynierami",
          desc: "Wyślij zapytanie lub umów spotkanie strategiczne",
        },
      },
      diagnosticTitle: "Telemetria Diagnostyczna",
      diagnosticStatus: "Kod Statusu HTTP",
      diagnosticPath: "Żądany Adres URL",
      diagnosticTime: "Czas Zdarzenia",
    },
  },

  de: {
    common: {
      siteName: "Hextel Tech",
      tagline: "Digitale Spitzenleistungen für ambitionierte Marken",
      backToTop: "Nach oben",
      quickSearch: "Schnellsuche",
      clientPortal: "Kundenportal",
      startProject: "Projekt starten",
      meetTeam: "Team kennenlernen",
      contactUs: "Kontakt aufnehmen",
      learnMore: "Mehr erfahren",
      viewAll: "Alle ansehen",
      loading: "Laden...",
      appearance: "Erscheinungsbild",
      lightMode: "Heller Modus",
      darkMode: "Dunkler Modus",
      language: "Sprache",
    },
    regionNotice: {
      title: "Sprache an Ihre Region angepasst",
      message: "Wir haben Ihren Standort erkannt und die Sprache automatisch auf Deutsch umgestellt.",
      switchBack: "Zu Englisch wechseln",
      dismiss: "Schließen",
    },
    nav: {
      home: "Startseite",
      services: "Leistungen",
      about: "Über uns",
      blog: "Blog",
      howWeBuild: "Wie wir bauen",
      projects: "Unsere Projekte",
      contact: "Kontakt",
      searchPlaceholder: "Bereiche und Leistungen durchsuchen...",
      portalLabel: "Portal",
    },
    hero: {
      badge: "Strategie / Design / Technologie",
      headlinePart1: "Neue Möglichkeiten für",
      headlineHighlight: "ambitionierte Marken",
      description:
        "Wir entwickeln moderne Webanwendungen und digitale Ökosysteme, die Ihre Marktposition stärken, Neukunden gewinnen und messbares Unternehmenswachstum vorantreiben.",
      trustedBy: "Führende Unternehmen vertrauen uns",
      stats: {
        projects: "Abgeschlossene Projekte",
        years: "Jahre Erfahrung",
        hours: "Produktstunden",
        revenue: "Erzielter Kundenumsatz",
      },
    },
    projects: {
      badge: "Portfolio",
      heading: "Ideen in messbare Erfolge verwandeln",
      description:
        "Wir verbinden strategische Entwicklung, präzises Design und moderne Technologien für skalierbare Webplattformen.",
      cta: "Alle Fallstudien ansehen",
      items: [
        {
          id: "project-1",
          title: "Premium-Marke mit neuem digitalem Ökosystem",
          category: "Full-Stack Webanwendung",
        },
        {
          id: "project-2",
          title: "Moderne Identität und Infrastruktur für Tech-Wachstum",
          category: "Design System & Plattform",
        },
      ],
    },
    services: {
      badge: "Expertise",
      heading: "Unsere Kernleistungen",
      description:
        "Ganzheitliche technische Führung – von der Produktarchitektur bis zur Bereitstellung und kontinuierlichen Weiterentwicklung.",
      cta: "Leistungsübersicht ansehen",
      items: [
        {
          number: "01.",
          title: "UX/UI Design",
          description:
            "Moderne und intuitive Benutzeroberflächen, die auf Ihre Zielgruppe abgestimmt sind und Interaktionen in Abschlüsse verwandeln.",
        },
        {
          number: "02.",
          title: "Web-Plattformen",
          description:
            "Blitzschnelle, responsive und SEO-optimierte Webanwendungen auf Basis zukunftssicherer Architekturen.",
        },
        {
          number: "03.",
          title: "Markensysteme",
          description:
            "Eine kohärente visuelle Identität mit fein abgestimmter Typografie und Farbharmonie für nachhaltige Differenzierung.",
        },
        {
          number: "04.",
          title: "Cloud & Weiterentwicklung",
          description:
            "Kontinuierliche Optimierung, Überwachung und proaktive Wartung für dauerhafte Stabilität bei steigender Skalierung.",
        },
      ],
    },
    team: {
      badge: "Team & Werte",
      heading: "Menschen, die Werte schaffen",
      description:
        "Wir sind ein engagiertes Team von Ingenieuren, Architekten und Designern, die Leidenschaft für moderne Cloud-Technologien mit Sinn für funktionale Gestaltung vereinen.",
      specialistsBadge: "10+ Senior-Spezialisten",
      specialistsSub: "Fokussiert auf Produkte und Systeme",
      values: [
        "Strategische Softwarearchitektur",
        "Menschzentriertes UX-Design",
        "Dedizierte SLAs und Support",
      ],
      cta: "Gespräch beginnen",
    },
    faq: {
      badge: "Transparenz & Ablauf",
      heading: "Häufig gestellte Fragen",
      description:
        "Hier finden Sie Antworten zu unseren Entwicklungsabläufen, Kooperationsmodellen und Projektergebnissen.",
      unansweredPrompt: "Haben Sie eine Frage, die hier nicht aufgeführt ist?",
      contactLink: "Unser Lösungsteam kontaktieren",
      items: [
        {
          question: "Wie läuft der Entwicklungsprozess ab?",
          answer:
            "Wir beginnen mit einer gründlichen strategischen und technischen Analyse, entwerfen Architektur und Wireframes, erstellen Prototypen und implementieren modularen Code mit CI/CD-Pipelines.",
        },
        {
          question: "Wie viel Zeit nimmt ein Webprojekt typischerweise in Anspruch?",
          answer:
            "Die meisten maßgeschneiderten Plattformen dauern je nach Funktionsumfang und Integrationen zwischen 4 und 8 Wochen.",
        },
        {
          question: "Bieten Sie fortlaufende Wartung und Betreuung an?",
          answer:
            "Ja, wir bieten monatliche SLA-Pläne für Infrastrukturüberwachung, Sicherheitsupdates und Leistungsprüfungen.",
        },
        {
          question: "Können Sie bestehende Systeme auf Next.js migrieren?",
          answer:
            "Selbstverständlich. Wir haben umfassende Erfahrung bei schrittweisen und vollständigen Modernisierungen auf den Next.js App Router.",
        },
      ],
    },
    reviews: {
      badge: "Referenzen",
      heading: "Kundenstimmen, die überzeugen",
      description:
        "Erfahren Sie, wie Hextel Tech echten Marktvorsprung und nachhaltiges Wachstum ermöglicht hat.",
      items: [
        {
          quote:
            "Hextel Tech hat unsere digitale Präsenz revolutioniert. Die Ladezeit sank um den Faktor 3, und unsere qualifizierten Anfragen stiegen um 42%.",
          author: "Elena Rostova",
          role: "Head of Product",
          company: "LUMI Technologies",
        },
        {
          quote:
            "Präzise Architektur, Liebe zum visuellen Detail und schnelles Arbeitstempo. Erstklassige technische Führung.",
          author: "Marek Kowalski",
          role: "CEO & Founder",
          company: "MODO Systems",
        },
        {
          quote:
            "Die Partnerschaft mit Hextel Tech war unsere beste Investition in diesem Geschäftsjahr. Reibungslose Umsetzung.",
          author: "Sofia Chen",
          role: "VP of Marketing",
          company: "NOMA Group",
        },
      ],
    },
    contact: {
      badge: "Kontakt aufnehmen",
      heading: "Lassen Sie uns Großartiges erschaffen.",
      description:
        "Ob Neuentwicklung einer Plattform oder Migration auf Next.js: Unser Engineering-Team begleitet Sie Schritt für Schritt.",
      directEmail: "Direkte E-Mail",
      directLine: "Telefon",
      headquarters: "Hauptsitz",
      formTitle: "Projekt anfragen",
      formSubtitle: "Beschreiben Sie Ihre technischen Ziele und wir erstellen ein maßgeschneidertes Angebot.",
      nameLabel: "Ihr Name",
      namePlaceholder: "z.B. Max Mustermann",
      emailLabel: "Geschäftliche E-Mail",
      emailPlaceholder: "z.B. max@unternehmen.de",
      serviceLabel: "Gewünschte Leistung",
      ndaLabel: "Optionaler Geheimhaltungs- / Kundenschlüssel",
      ndaPlaceholder: "Vertraulicher Zugriffsschlüssel (falls vorhanden)",
      messageLabel: "Projektdetails",
      messagePlaceholder: "Projektumfang, Zeitplan und Ziele beschreiben...",
      consentText:
        "Ich willige ein, dass Hextel Tech meine Daten zur Bearbeitung dieser Anfrage gemäß Datenschutzerklärung verarbeitet.",
      submitButton: "Projektanfrage senden",
      submittingButton: "Wird gesendet...",
      successBadge: "Anfrage erfolgreich übermittelt",
      thankYou: "Vielen Dank",
      confirmationText:
        "Ihre Projektdaten wurden sicher an unsere Entwicklungsleitung übermittelt. Wir melden uns innerhalb von 24 Stunden unter",
      referenceTicket: "Referenznummer",
      selectedDomain: "Gewählter Bereich",
      submittedAt: "Übermittelt um",
      campaignSource: "Kampagnenquelle",
      submitAnother: "Weitere Anfrage senden",
      validationRequired: "Bitte füllen Sie alle erforderlichen Felder aus.",
      validationConsent: "Bitte akzeptieren Sie die Datenschutzhinweise.",
      servicesOptions: [
        "UX/UI Design",
        "Web-Plattformen",
        "Markensysteme",
        "Cloud & Weiterentwicklung",
        "IT-Beratung",
      ],
    },
    footer: {
      tagline: "Digitale Spitzenleistungen für ambitionierte Marken",
      navHeading: "Navigation",
      connectHeading: "Verbinden",
      rightsReserved: "Alle Rechte vorbehalten.",
      cookieSettings: "Cookie-Einstellungen",
      privacyPolicy: "Datenschutzerklärung",
      termsOfService: "Nutzungsbedingungen",
    },
    notFound: {
      badge: "SYSTEMSTATUS: 404 // ROUTE_NOT_FOUND",
      code: "404",
      heading: "Im digitalen Raum verloren?",
      description:
        "Die gewünschte Seite existiert nicht, wurde archiviert oder unter einer neuen Adresse veröffentlicht.",
      searchPrompt: "Direkt im System suchen:",
      searchPlaceholder: "Leistungen, Projekte, Themen suchen...",
      searchButton: "Suchen",
      returnHome: "Zur Startseite",
      goBack: "Zurück",
      helpfulLinks: "Wichtige Seiten",
      links: {
        home: {
          title: "Startseite",
          desc: "Zurück zur Hauptübersicht unseres Unternehmens",
        },
        services: {
          title: "Ingenieurleistungen",
          desc: "UX/UI, Web-Plattformen und Cloud-Lösungen",
        },
        projects: {
          title: "Portfolio & Arbeiten",
          desc: "Fallstudien, Architektur und Projekterfolge ansehen",
        },
        contact: {
          title: "Direkter Kontakt",
          desc: "Projekt besprechen oder Beratungsgespräch vereinbaren",
        },
      },
      diagnosticTitle: "Systemtelemetrie",
      diagnosticStatus: "HTTP-Statuscode",
      diagnosticPath: "Aufgerufene URL",
      diagnosticTime: "Zeitpunkt",
    },
  },

  es: {
    common: {
      siteName: "Hextel Tech",
      tagline: "Ingeniería de Excelencia Digital para Marcas Ambiciosas",
      backToTop: "Volver arriba",
      quickSearch: "Búsqueda Rápida",
      clientPortal: "Portal de Clientes",
      startProject: "Iniciar proyecto",
      meetTeam: "Conoce al equipo",
      contactUs: "Contáctanos",
      learnMore: "Saber más",
      viewAll: "Ver todo",
      loading: "Cargando...",
      appearance: "Apariencia",
      lightMode: "Modo claro",
      darkMode: "Modo oscuro",
      language: "Idioma",
    },
    regionNotice: {
      title: "Idioma Adaptado a tu Región",
      message: "Detectamos tu ubicación geográfica y cambiamos automáticamente al español.",
      switchBack: "Cambiar a inglés",
      dismiss: "Cerrar",
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Nosotros",
      blog: "Blog",
      howWeBuild: "Cómo construimos",
      projects: "Nuestros proyectos",
      contact: "Contacto",
      searchPlaceholder: "Buscar servicios y secciones...",
      portalLabel: "Portal",
    },
    hero: {
      badge: "Estrategia / Diseño / Tecnología",
      headlinePart1: "Nuevas posibilidades para",
      headlineHighlight: "marcas ambiciosas",
      description:
        "Creamos aplicaciones web modernas y ecosistemas digitales que refuerzan su posicionamiento, aceleran la captación de clientes e impulsan el crecimiento empresarial medible.",
      trustedBy: "Líderes de la industria confían en nosotros",
      stats: {
        projects: "Proyectos entregados",
        years: "Años de experiencia",
        hours: "Horas de producto",
        revenue: "Ingresos generados para clientes",
      },
    },
    projects: {
      badge: "Portafolio",
      heading: "Transformamos ideas en resultados tangibles",
      description:
        "Combinamos ingeniería estratégica, diseño refinado y tecnologías avanzadas para plataformas web escalables.",
      cta: "Explorar todos los casos de estudio",
      items: [
        {
          id: "project-1",
          title: "Marca premium con un nuevo ecosistema digital",
          category: "Aplicación Web Full-Stack",
        },
        {
          id: "project-2",
          title: "Identidad moderna e infraestructura para empresas tech",
          category: "Design System & Plataforma",
        },
      ],
    },
    services: {
      badge: "Especialidades",
      heading: "Nuestros servicios esenciales",
      description:
        "Liderazgo técnico de extremo a extremo, desde la arquitectura inicial hasta el despliegue y crecimiento continuo.",
      cta: "Ver hoja de ruta de servicios",
      items: [
        {
          number: "01.",
          title: "Diseño UX/UI",
          description:
            "Interfaces modernas y funcionales adaptadas a su audiencia, diseñadas para elevar la conversión y retención.",
        },
        {
          number: "02.",
          title: "Plataformas Web",
          description:
            "Aplicaciones web ultrarrápidas, responsivas y optimizadas para SEO creadas con tecnologías de vanguardia.",
        },
        {
          number: "03.",
          title: "Sistemas de Marca",
          description:
            "Una identidad visual coherente que destaca a su empresa mediante tipografía refinada y guías de estilo completas.",
        },
        {
          number: "04.",
          title: "Nube & Evolución",
          description:
            "Optimización y monitorización continua pospuesta en producción para garantizar la máxima resiliencia.",
        },
      ],
    },
    team: {
      badge: "Equipo & Valores",
      heading: "Personas que crean valor",
      description:
        "Somos un equipo dedicado de ingenieros, arquitectos y diseñadores que combinan pasión por la nube con sensibilidad para el diseño funcional.",
      specialistsBadge: "10+ Especialistas Senior",
      specialistsSub: "Distribuidos en sistemas y producto",
      values: [
        "Ingeniería estratégica y arquitectura robusta",
        "Diseño UX centrado en las personas",
        "Soporte continuo y acuerdos de nivel de servicio (SLA)",
      ],
      cta: "Iniciar una conversación",
    },
    faq: {
      badge: "Transparencia & Proceso",
      heading: "Preguntas frecuentes",
      description:
        "Todo lo que necesita saber sobre nuestra metodología de ingeniería, modelos de trabajo y entregables.",
      unansweredPrompt: "¿Tiene alguna duda que no se responda aquí?",
      contactLink: "Contacte a nuestro equipo técnico",
      items: [
        {
          question: "¿Cómo es el proceso de desarrollo habitual?",
          answer:
            "Iniciamos con una fase de descubrimiento estratégico y técnico, definimos la arquitectura, creamos prototipos interactivos y programamos código modular con pruebas automatizadas y despliegue CI/CD.",
        },
        {
          question: "¿Cuánto tiempo toma desarrollar una plataforma web?",
          answer:
            "La mayoría de proyectos corporativos se completan en un plazo de 4 a 8 semanas, según complejidad e integraciones.",
        },
        {
          question: "¿Ofrecen mantenimiento y soporte tras el lanzamiento?",
          answer:
            "Sí, ofrecemos planes SLA mensuales de supervisión de infraestructura, parches de seguridad y mejoras de rendimiento.",
        },
        {
          question: "¿Pueden migrar nuestro sistema actual a Next.js?",
          answer:
            "Por supuesto. Nos especializamos en migraciones completas o graduales desde arquitecturas heredadas hacia Next.js App Router.",
        },
      ],
    },
    reviews: {
      badge: "Testimonios",
      heading: "Opiniones que hablan por sí solas",
      description:
        "Vea cómo colaborar con Hextel Tech impulsó la diferenciación y generó un crecimiento medible.",
      items: [
        {
          quote:
            "Hextel Tech transformó por completo nuestra presencia digital. La nueva aplicación carga 3 veces más rápido y aumentó un 42% nuestros clientes potenciales calificados.",
          author: "Elena Rostova",
          role: "Head of Product",
          company: "LUMI Technologies",
        },
        {
          quote:
            "Su precisión arquitectónica, cuidado del diseño y velocidad superaron cualquier expectativa. Liderazgo técnico impecable.",
          author: "Marek Kowalski",
          role: "CEO & Fundador",
          company: "MODO Systems",
        },
        {
          quote:
            "Asociarnos con Hextel Tech fue la mejor decisión de inversión tecnológica este año. Ejecución impecable.",
          author: "Sofia Chen",
          role: "VP de Marketing",
          company: "NOMA Group",
        },
      ],
    },
    contact: {
      badge: "Iniciar Conversación",
      heading: "Construyamos algo extraordinario juntos.",
      description:
        "Tanto si va a desarrollar una plataforma desde cero como a migrar a Next.js, nuestro equipo sénior está listo para guiar cada fase.",
      directEmail: "Email Directo",
      directLine: "Línea Telefónica",
      headquarters: "Sede Principal",
      formTitle: "Comencemos su proyecto",
      formSubtitle: "Cuéntenos sobre sus metas tecnológicas y formularemos una propuesta a medida.",
      nameLabel: "Su Nombre",
      namePlaceholder: "ej. Carlos Gómez",
      emailLabel: "Email Corporativo",
      emailPlaceholder: "ej. carlos@empresa.com",
      serviceLabel: "Servicio de Interés",
      ndaLabel: "Código NDA / Clave de Cliente (Opcional)",
      ndaPlaceholder: "Clave confidencial de acceso (si dispone de una)",
      messageLabel: "Detalles del Proyecto",
      messagePlaceholder: "Comparta detalles sobre plazos, alcance y requisitos...",
      consentText:
        "Acepto que Hextel Tech procese mis datos para responder a esta solicitud conforme a la Política de Privacidad.",
      submitButton: "Enviar consulta de proyecto",
      submittingButton: "Enviando consulta...",
      successBadge: "Consulta Recibida con Éxito",
      thankYou: "Muchas gracias",
      confirmationText:
        "Los detalles de su proyecto han sido asignados a nuestra dirección técnica. Nos comunicaremos en menos de 24 horas a",
      referenceTicket: "Código de Referencia",
      selectedDomain: "Área Seleccionada",
      submittedAt: "Hora de Envío",
      campaignSource: "Fuente de Campaña",
      submitAnother: "Enviar otra consulta",
      validationRequired: "Por favor complete todos los campos obligatorios.",
      validationConsent: "Debe aceptar la política de privacidad.",
      servicesOptions: [
        "Diseño UX/UI",
        "Plataformas Web",
        "Sistemas de Marca",
        "Nube & Evolución",
        "Consultoría IT",
      ],
    },
    footer: {
      tagline: "Ingeniería de Excelencia Digital para Marcas Ambiciosas",
      navHeading: "Navegación",
      connectHeading: "Contacto y Redes",
      rightsReserved: "Todos los derechos reservados.",
      cookieSettings: "Configuración de Cookies",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
    },
    notFound: {
      badge: "ESTADO DEL SISTEMA: 404 // RUTA_NO_ENCONTRADA",
      code: "404",
      heading: "¿Perdido en el espacio digital?",
      description:
        "La página solicitada no existe, ha sido retirada o ha cambiado de dirección.",
      searchPrompt: "Buscar en nuestro ecosistema:",
      searchPlaceholder: "Buscar servicios, portafolio, tecnologías...",
      searchButton: "Buscar",
      returnHome: "Volver al Inicio",
      goBack: "Regresar",
      helpfulLinks: "Secciones principales",
      links: {
        home: {
          title: "Página Principal",
          desc: "Regresar a la portada principal y resumen corporativo",
        },
        services: {
          title: "Servicios de Ingeniería",
          desc: "Descubra diseño UX/UI, plataformas web y nube",
        },
        projects: {
          title: "Proyectos Seleccionados",
          desc: "Consulte casos de estudio, arquitectura y resultados",
        },
        contact: {
          title: "Contacto Directo",
          desc: "Inicie una consulta o agende una sesión técnica",
        },
      },
      diagnosticTitle: "Telemetría de Diagnóstico",
      diagnosticStatus: "Código HTTP",
      diagnosticPath: "Ruta Solicitada",
      diagnosticTime: "Marca de Tiempo",
    },
  },
};
