export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  gallery?: string[];
  alt: string;
  link: string;
  badge?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  iconName: "palette" | "browser" | "paintbrush" | "lifebuoy";
  slug: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
  metric?: string;
  metricLabel?: string;
  project?: string;
  category?: "web" | "ai" | "cloud" | "design";
  date?: string;
  verified?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "How We Build", href: "/how-we-build" },
  { label: "Our Projects", href: "/projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact Us", href: "/contact" },
];

export interface DetailedService {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  tag?: string;
}

export interface ServiceColumn {
  title: string;
  subtitle: string;
  services: DetailedService[];
}

export const DETAILED_SERVICES: DetailedService[] = [
  // Column 1 (6 items)
  {
    id: "staff-aug",
    slug: "it-staff-augmentation",
    title: "IT Staff Augmentation / Dedicated Developers",
    shortDesc: "Vetted senior engineers & dedicated talent",
    icon: "users",
    tag: "Popular",
  },
  {
    id: "mvp-dev",
    slug: "mvp-development",
    title: "MVP Development for Startups",
    shortDesc: "Fast-track launch from concept to market",
    icon: "rocket",
    tag: "Speed",
  },
  {
    id: "data-eng",
    slug: "database-data-engineering",
    title: "Database & Data Engineering",
    shortDesc: "High-throughput pipelines & architecture",
    icon: "database",
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity-compliance",
    title: "Cybersecurity & Compliance Audits",
    shortDesc: "Vulnerability audits & compliance reviews",
    icon: "shield",
  },
  {
    id: "api-integrations",
    slug: "api-development-integration",
    title: "API Development & System Integration",
    shortDesc: "Robust REST & GraphQL microservices",
    icon: "plug",
  },
  {
    id: "qa-testing",
    slug: "qa-automated-testing",
    title: "QA & Automated Testing",
    shortDesc: "End-to-end regression & stress testing",
    icon: "check-circle",
  },

  // Column 2 (6 items)
  {
    id: "ui-ux",
    slug: "ui-ux-design",
    title: "UI/UX Design & Product Discovery",
    shortDesc: "User journey mapping & high-converting UX",
    icon: "palette",
  },
  {
    id: "devops",
    slug: "devops-ci-cd",
    title: "DevOps & CI/CD Engineering",
    shortDesc: "Kubernetes, Docker & GitOps automation",
    icon: "cpu",
  },
  {
    id: "legacy-modernization",
    slug: "legacy-software-modernization",
    title: "Legacy Software Maintenance & Modernization",
    shortDesc: "Monolith migration to modern cloud stacks",
    icon: "refresh",
  },
  {
    id: "cloud-mgmt",
    slug: "server-cloud-infrastructure",
    title: "Server & Cloud Infrastructure Management",
    shortDesc: "AWS, GCP & Azure 24/7 reliability",
    icon: "cloud",
  },
  {
    id: "ai-agents",
    slug: "custom-ai-agents",
    title: "Custom AI Agents & Copilots",
    shortDesc: "Autonomous LLM agents & customized AI",
    icon: "sparkles",
    tag: "AI",
  },
  {
    id: "ai-automation",
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    shortDesc: "Intelligent process & workflow robotics",
    icon: "zap",
    tag: "Hot",
  },

  // Column 3 (5 items)
  {
    id: "erp",
    slug: "erp-systems-solutions",
    title: "ERP Systems & Solutions",
    shortDesc: "Unified business operations & enterprise data",
    icon: "layers",
  },
  {
    id: "custom-software",
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDesc: "Bespoke full-stack enterprise systems",
    icon: "code",
  },
  {
    id: "desktop-app",
    slug: "desktop-app-development",
    title: "Windows / Desktop App Development",
    shortDesc: "High-performance native & desktop apps",
    icon: "monitor",
  },
  {
    id: "mobile-app",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDesc: "Smooth iOS & Android mobile applications",
    icon: "smartphone",
  },
  {
    id: "web-app",
    slug: "web-application-development",
    title: "Web Application Development",
    shortDesc: "Scalable, reactive & secure web platforms",
    icon: "globe",
  },
];

export const SERVICE_COLUMNS: ServiceColumn[] = [
  {
    title: "Talent & Core Engineering",
    subtitle: "Scale engineering & core foundation",
    services: DETAILED_SERVICES.slice(0, 6),
  },
  {
    title: "Cloud, DevOps & AI",
    subtitle: "Intelligent systems & cloud resilience",
    services: DETAILED_SERVICES.slice(6, 12),
  },
  {
    title: "Custom Apps & Software",
    subtitle: "Tailored multi-platform products",
    services: DETAILED_SERVICES.slice(12, 17),
  },
];

export const BRAND_CONFIG = {
  name: "Hextel Tech",
  tagline: "Engineering Digital Excellence for Ambitious Brands",
  lead: "We create modern web applications and digital ecosystems that strengthen your market position, accelerate customer acquisition, and drive measurable enterprise growth.",
  phone: "+92 303 5696807",
  email: "hexteltech@gmail.com",
  address: "Master City, Gujranwala, Pakistan",
  stats: [
    { value: "25+", label: "Projects delivered" },
    { value: "3+", label: "Years of experience" },
    { value: "2,000+", label: "Product hours" },
    { value: "$100K+", label: "Client revenue generated" },
  ] as StatItem[],
  trustedBy: ["MODO", "LUMI", "KOVO", "NOMA", "ASPEKT"],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "project-jobhunt",
    title: "Job Hunt Copilot — Autonomous Career Engineering Command Center",
    category: "In-House SaaS • AI Command Center",
    image: "/images/jobhunt-hero.jpg",
    gallery: [
      "/images/jobhunt-hero.jpg",
      "/images/jobhunt-playwright.jpg",
      "/images/jobhunt-sync.jpg",
      "/images/jobhunt-ledger.jpg",
    ],
    alt: "Job Hunt Copilot autonomous career engineering command center with Gemini 2.5 Flash",
    link: "/projects#project-jobhunt",
    badge: "Our SaaS Product",
  },
  {
    id: "project-tracelens",
    title: "TraceLens — High-Throughput Telemetry & Observability Engine",
    category: "In-House SaaS • AI Observability",
    image: "/images/tracelens-hero.jpg",
    gallery: [
      "/images/tracelens-hero.jpg",
      "/images/tracelens-topology.jpg",
      "/images/tracelens-incidents.jpg",
    ],
    alt: "TraceLens telemetry, service dependency topology, and observability SaaS engine",
    link: "/projects#project-tracelens",
    badge: "Our SaaS Product",
  },
  {
    id: "project-1",
    title: "Nayyab Jewellers – Bespoke Luxury E-Commerce",
    category: "Full-Stack Web Application",
    image: "/images/nayyab-hero.jpg",
    alt: "Nayyab Jewellers bespoke luxury jewelry website",
    link: "/projects#project-1",
  },
  {
    id: "project-2",
    title: "Al Moman Frozen Foods — E-Commerce & Live Order System",
    category: "Full-Stack Web Application",
    image: "/images/almoman-hero.jpg",
    alt: "Al Moman Frozen Foods e-commerce and live order tracking platform",
    link: "/projects#project-almoman",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: "01.",
    title: "UX/UI Design",
    description:
      "Modern and functional interfaces tailored to your audience. We engineer intuitive experiences that elevate engagement and drive conversion.",
    iconName: "palette",
    slug: "ui-ux-design",
  },
  {
    number: "02.",
    title: "Web Platforms",
    description:
      "Blazing-fast, responsive, and SEO-optimized web applications built with modern architectures. Every screen is engineered for performance.",
    iconName: "browser",
    slug: "web-application-development",
  },
  {
    number: "03.",
    title: "Brand Systems",
    description:
      "A coherent visual identity that distinguishes your company in competitive markets through refined typography, color harmony, and style guides.",
    iconName: "paintbrush",
    slug: "custom-software-development",
  },
  {
    number: "04.",
    title: "Cloud & Evolution",
    description:
      "Continuous optimization, monitoring, and proactive engineering after launch to ensure resilience and adaptability as your organization scales.",
    iconName: "lifebuoy",
    slug: "server-cloud-infrastructure",
  },
];

export const FAQS: FaqItem[] = [
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
];

export const REVIEW_STATS = [
  { value: "4.7 / 5.0", label: "Average Client Rating", sub: "Based on 25+ verified enterprise solutions" },
  { value: "95%", label: "On-Time Milestone SLA", sub: "Strict sprint adherence & transparent commits" },
  { value: "90%", label: "Repeat & Retainer Rate", sub: "Long-term engineering partnerships" },
  { value: "$100K+", label: "Client Revenue Generated", sub: "Direct commercial value delivered" },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "review-nayyab",
    quote:
      "Hextel Tech engineered our luxury jewelry e-commerce platform from the ground up with Next.js. Page load speeds dropped below 1 second, our mobile checkout conversion increased significantly, and working directly with the founding engineers made every sprint effortless.",
    author: "Nayyab Jewellers Management",
    role: "Managing Director",
    company: "Nayyab Jewellers",
    rating: 5,
    metric: "98 / 100",
    metricLabel: "Lighthouse Performance",
    project: "Bespoke Luxury E-Commerce Platform",
    category: "web",
    date: "2026",
    verified: true,
  },
  {
    id: "review-almoman",
    quote:
      "Our frozen food distribution needed real-time catalog management and live order tracking that works seamlessly on mobile devices. Hasaan, Faseeh, and Moman delivered a rock-solid full-stack platform ahead of schedule with complete source code handover.",
    author: "Al Moman Operations Team",
    role: "Head of Operations",
    company: "Al Moman Frozen Foods",
    rating: 5,
    metric: "3.2x",
    metricLabel: "Faster Order Processing",
    project: "Full-Stack E-Commerce & Live Order System",
    category: "web",
    date: "2026",
    verified: true,
  },
  {
    id: "review-ai-copilot",
    quote:
      "The custom Gemini RAG pipeline and Playwright automation workflows built by Hextel Tech eliminated hours of manual triage every day. Their 5-layer zero-hallucination safety architecture gave us complete confidence in production.",
    author: "Enterprise Product Lead",
    role: "VP of Engineering",
    company: "SaaS Automation Partner",
    rating: 5,
    metric: "85%",
    metricLabel: "Workflow Automation Rate",
    project: "Autonomous AI Command Center & RAG Pipeline",
    category: "ai",
    date: "2026",
    verified: true,
  },
];
