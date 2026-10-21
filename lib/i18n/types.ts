export type SupportedLanguage = "en" | "pl" | "de" | "es";

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
  region: string;
}

export interface DetectedRegionInfo {
  detected: boolean;
  regionName?: string;
  countryCode?: string;
  language: SupportedLanguage;
  method: "stored" | "timezone" | "browser" | "ip-geo" | "default";
}

export interface TranslationSchema {
  common: {
    siteName: string;
    tagline: string;
    backToTop: string;
    quickSearch: string;
    clientPortal: string;
    startProject: string;
    meetTeam: string;
    contactUs: string;
    learnMore: string;
    viewAll: string;
    loading: string;
    appearance: string;
    lightMode: string;
    darkMode: string;
    language: string;
  };
  regionNotice: {
    title: string;
    message: string;
    switchBack: string;
    dismiss: string;
  };
  nav: {
    home: string;
    services: string;
    about: string;
    blog: string;
    howWeBuild: string;
    projects: string;
    reviews: string;
    contact: string;
    searchPlaceholder: string;
    portalLabel: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    description: string;
    trustedBy: string;
    stats: {
      projects: string;
      years: string;
      hours: string;
      revenue: string;
    };
  };
  projects: {
    badge: string;
    heading: string;
    description: string;
    cta: string;
    items: {
      id: string;
      title: string;
      category: string;
    }[];
  };
  services: {
    badge: string;
    heading: string;
    description: string;
    cta: string;
    items: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  team: {
    badge: string;
    heading: string;
    description: string;
    specialistsBadge: string;
    specialistsSub: string;
    values: string[];
    cta: string;
  };
  faq: {
    badge: string;
    heading: string;
    description: string;
    unansweredPrompt: string;
    contactLink: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  reviews: {
    badge: string;
    heading: string;
    description: string;
    items: {
      quote: string;
      author: string;
      role: string;
      company: string;
    }[];
  };
  contact: {
    badge: string;
    heading: string;
    description: string;
    directEmail: string;
    directLine: string;
    headquarters: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    ndaLabel: string;
    ndaPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    consentText: string;
    submitButton: string;
    submittingButton: string;
    successBadge: string;
    thankYou: string;
    confirmationText: string;
    referenceTicket: string;
    selectedDomain: string;
    submittedAt: string;
    campaignSource: string;
    submitAnother: string;
    validationRequired: string;
    validationConsent: string;
    servicesOptions: string[];
  };
  footer: {
    tagline: string;
    navHeading: string;
    connectHeading: string;
    rightsReserved: string;
    cookieSettings: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  notFound: {
    badge: string;
    code: string;
    heading: string;
    description: string;
    searchPrompt: string;
    searchPlaceholder: string;
    searchButton: string;
    returnHome: string;
    goBack: string;
    helpfulLinks: string;
    links: {
      home: { title: string; desc: string };
      services: { title: string; desc: string };
      projects: { title: string; desc: string };
      contact: { title: string; desc: string };
    };
    diagnosticTitle: string;
    diagnosticStatus: string;
    diagnosticPath: string;
    diagnosticTime: string;
  };
}
