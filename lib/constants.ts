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
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About Us", href: "/#about" },
  { label: "Blog", href: "/#blog" },
  { label: "How We Build", href: "/#how-we-build" },
  { label: "Our Projects", href: "/#projects" },
  { label: "Contact Us", href: "/#contact" },
];

export interface DetailedService {
  id: string;
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
    title: "IT Staff Augmentation / Dedicated Developers",
    shortDesc: "Vetted senior engineers & dedicated talent",
    icon: "users",
    tag: "Popular",
  },
  {
    id: "mvp-dev",
    title: "MVP Development for Startups",
    shortDesc: "Fast-track launch from concept to market",
    icon: "rocket",
    tag: "Speed",
  },
  {
    id: "data-eng",
    title: "Database & Data Engineering",
    shortDesc: "High-throughput pipelines & architecture",
    icon: "database",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Compliance Audits",
    shortDesc: "Vulnerability audits & compliance reviews",
    icon: "shield",
  },
  {
    id: "api-integrations",
    title: "API Development & System Integration",
    shortDesc: "Robust REST & GraphQL microservices",
    icon: "plug",
  },
  {
    id: "qa-testing",
    title: "QA & Automated Testing",
    shortDesc: "End-to-end regression & stress testing",
    icon: "check-circle",
  },

  // Column 2 (6 items)
  {
    id: "ui-ux",
    title: "UI/UX Design & Product Discovery",
    shortDesc: "User journey mapping & high-converting UX",
    icon: "palette",
  },
  {
    id: "devops",
    title: "DevOps & CI/CD Engineering",
    shortDesc: "Kubernetes, Docker & GitOps automation",
    icon: "cpu",
  },
  {
    id: "legacy-modernization",
    title: "Legacy Software Maintenance & Modernization",
    shortDesc: "Monolith migration to modern cloud stacks",
    icon: "refresh",
  },
  {
    id: "cloud-mgmt",
    title: "Server & Cloud Infrastructure Management",
    shortDesc: "AWS, GCP & Azure 24/7 reliability",
    icon: "cloud",
  },
  {
    id: "ai-agents",
    title: "Custom AI Agents & Copilots",
    shortDesc: "Autonomous LLM agents & customized AI",
    icon: "sparkles",
    tag: "AI",
  },
  {
    id: "ai-automation",
    title: "AI Workflow Automation",
    shortDesc: "Intelligent process & workflow robotics",
    icon: "zap",
    tag: "Hot",
  },

  // Column 3 (5 items)
  {
    id: "erp",
    title: "ERP Systems & Solutions",
    shortDesc: "Unified business operations & enterprise data",
    icon: "layers",
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    shortDesc: "Bespoke full-stack enterprise systems",
    icon: "code",
  },
  {
    id: "desktop-app",
    title: "Windows / Desktop App Development",
    shortDesc: "High-performance native & desktop apps",
    icon: "monitor",
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    shortDesc: "Smooth iOS & Android mobile applications",
    icon: "smartphone",
  },
  {
    id: "web-app",
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
  phone: "+48 123 456 789",
  email: "contact@hexteltech.com",
  address: "123 Innovation Boulevard, Warsaw, Poland",
  stats: [
    { value: "2000+", label: "Projects delivered" },
    { value: "10+", label: "Years of experience" },
    { value: "800+", label: "Product hours" },
    { value: "150M+", label: "Client revenue generated" },
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

export const REVIEWS: ReviewItem[] = [
  {
    quote:
      "Hextel Tech completely transformed our digital presence. The new web application loaded 3x faster and directly increased our inbound qualified leads by 42%.",
    author: "Elena Rostova",
    role: "Head of Product",
    company: "LUMI Technologies",
    avatar: "/images/t001-nova-avatar-01-220.webp",
  },
  {
    quote:
      "Their architectural precision, attention to design detail, and execution speed exceeded every expectation. True senior engineering leadership.",
    author: "Marek Kowalski",
    role: "CEO & Founder",
    company: "MODO Systems",
    avatar: "/images/t001-nova-avatar-02-220.webp",
  },
  {
    quote:
      "Partnering with Hextel Tech was the best technology investment we made this year. Flawless execution from concept to launch.",
    author: "Sofia Chen",
    role: "VP of Marketing",
    company: "NOMA Group",
    avatar: "/images/t001-nova-avatar-03-220.webp",
  },
];
