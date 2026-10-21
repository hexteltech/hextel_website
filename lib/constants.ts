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
  alt: string;
  link: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  iconName: "palette" | "browser" | "paintbrush" | "lifebuoy";
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
    { value: "$500K+", label: "Client revenue generated" },
  ] as StatItem[],
  trustedBy: ["MODO", "LUMI", "KOVO", "NOMA", "ASPEKT"],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "project-1",
    title: "A premium brand with a new digital ecosystem",
    category: "Full-Stack Web Application",
    image: "/images/t001-nova-project-laptop.webp",
    alt: "Laptop showcasing responsive web application",
    link: "#projects",
  },
  {
    id: "project-2",
    title: "A modern identity and infrastructure for high-growth tech",
    category: "Design System & Platform",
    image: "/images/t001-nova-project-building.webp",
    alt: "Modern architecture representing enterprise tech identity",
    link: "#projects",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: "01.",
    title: "UX/UI Design",
    description:
      "Modern and functional interfaces tailored to your audience. We engineer intuitive experiences that elevate engagement and drive conversion.",
    iconName: "palette",
  },
  {
    number: "02.",
    title: "Web Platforms",
    description:
      "Blazing-fast, responsive, and SEO-optimized web applications built with modern architectures. Every screen is engineered for performance.",
    iconName: "browser",
  },
  {
    number: "03.",
    title: "Brand Systems",
    description:
      "A coherent visual identity that distinguishes your company in competitive markets through refined typography, color harmony, and style guides.",
    iconName: "paintbrush",
  },
  {
    number: "04.",
    title: "Cloud & Evolution",
    description:
      "Continuous optimization, monitoring, and proactive engineering after launch to ensure resilience and adaptability as your organization scales.",
    iconName: "lifebuoy",
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
  { value: "4.9 / 5.0", label: "Average Client Rating", sub: "Based on 25+ verified enterprise solutions" },
  { value: "100%", label: "On-Time Milestone SLA", sub: "Strict sprint adherence & transparent commits" },
  { value: "94%", label: "Repeat & Retainer Rate", sub: "Long-term engineering partnerships" },
  { value: "$500K+", label: "Client Revenue Generated", sub: "Direct commercial value delivered" },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    quote:
      "Hextel Tech completely transformed our digital presence. The new web application loaded 3x faster and directly increased our inbound qualified leads by 42%. The architectural precision of their 3 founders is second to none.",
    author: "Elena Rostova",
    role: "Head of Product",
    company: "LUMI Technologies",
    avatar: "/images/t001-nova-avatar-01-220.webp",
    rating: 5,
    metric: "+42%",
    metricLabel: "Inbound Qualified Leads",
    project: "Next.js Enterprise SaaS Platform",
    category: "web",
    date: "January 2026",
    verified: true,
  },
  {
    id: "rev-2",
    quote:
      "Their architectural precision, attention to design detail, and execution speed exceeded every expectation. They eliminated technical debt and built a cloud system that scales without a hitch.",
    author: "Marek Kowalski",
    role: "CEO & Founder",
    company: "MODO Systems",
    avatar: "/images/t001-nova-avatar-02-220.webp",
    rating: 5,
    metric: "99.99%",
    metricLabel: "Production Uptime",
    project: "Kubernetes & Microservices Cloud",
    category: "cloud",
    date: "December 2025",
    verified: true,
  },
  {
    id: "rev-3",
    quote:
      "Partnering with Hextel Tech was the best technology investment we made this year. Flawless execution from concept to launch, with a brand design system that makes us stand out in a crowded market.",
    author: "Sofia Chen",
    role: "VP of Marketing",
    company: "NOMA Group",
    avatar: "/images/t001-nova-avatar-03-220.webp",
    rating: 5,
    metric: "+210%",
    metricLabel: "Organic Web Traffic",
    project: "Design System & Web Platform",
    category: "design",
    date: "November 2025",
    verified: true,
  },
  {
    id: "rev-4",
    quote:
      "Hextel Tech built custom autonomous AI agents that automated 80% of our customer query routing and internal ticket triaging. The founders delivered in 5 weeks what other studios quoted 6 months for.",
    author: "Alexander Wright",
    role: "CTO & Co-Founder",
    company: "ApexFin Solutions",
    rating: 5,
    metric: "80%",
    metricLabel: "Automated Workflow Routing",
    project: "Custom AI Agents & Copilots",
    category: "ai",
    date: "February 2026",
    verified: true,
  },
  {
    id: "rev-5",
    quote:
      "Direct collaboration with Hasaan, Faseeh, and Moman meant zero corporate bureaucracy. When we needed high-throughput API integrations under tight deadlines, they executed flawlessly without a single hitch.",
    author: "David Ben-Ami",
    role: "COO",
    company: "KOVO Logistics",
    rating: 5,
    metric: "3.5x",
    metricLabel: "Faster Processing Velocity",
    project: "API & Event-Driven Architecture",
    category: "web",
    date: "January 2026",
    verified: true,
  },
  {
    id: "rev-6",
    quote:
      "Security, performance, and HIPAA compliance were non-negotiable for our patient platform. Hextel Tech delivered clean code, thorough documentation, and passed our 3rd-party penetration test on the first pass.",
    author: "Dr. Julian Vance",
    role: "Chief Digital Officer",
    company: "ASPEKT Health",
    rating: 5,
    metric: "100%",
    metricLabel: "Security Audit Clearance",
    project: "HIPAA Cloud & Portal Engineering",
    category: "cloud",
    date: "March 2026",
    verified: true,
  },
];
