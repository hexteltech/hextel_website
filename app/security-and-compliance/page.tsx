import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Security & Compliance — Hextel Tech | Enterprise Trust & Data Protection",
  description:
    "Learn about Hextel Tech's enterprise security architecture, SOC 2 alignment, GDPR compliance, zero-trust infrastructure, and vulnerability disclosure policies.",
  openGraph: {
    title: "Security & Compliance — Hextel Tech",
    description: "Enterprise security architecture, data governance, and regulatory compliance at Hextel Tech.",
  },
};

const SECURITY_PILLARS = [
  {
    icon: (
      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Zero-Trust Infrastructure",
    subtitle: "Defense-in-depth isolation across all cloud environments",
    points: [
      "Strict least-privilege IAM policies with multi-factor authentication (MFA) enforcement",
      "Network micro-segmentation with isolated Virtual Private Clouds (VPCs)",
      "Automated ephemeral credential rotation and short-lived SSH certificate authorities",
      "Continuous runtime container monitoring and Kubernetes pod hardening",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Data Encryption & Privacy",
    subtitle: "Cryptographic safeguards for data in transit and at rest",
    points: [
      "AES-256 encryption at rest across databases, block stores, and cloud backups",
      "TLS 1.3 enforced for all web and API traffic with strict HTTP Strict Transport Security (HSTS)",
      "Field-level encryption for sensitive client records and PII data fields",
      "Automated key management via hardware security modules (HSM) and AWS KMS",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Secure Software Development (SDLC)",
    subtitle: "Security built into every commit, review, and deployment",
    points: [
      "Automated Static and Dynamic Application Security Testing (SAST & DAST) in CI/CD pipelines",
      "Daily automated dependency vulnerability auditing via Snyk and Dependabot",
      "Mandatory dual-peer review for every codebase merge and infrastructure modification",
      "Zero tolerance for hardcoded credentials with automated secret scanning alerts",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Regulatory Compliance & Audits",
    subtitle: "Aligned with international data protection frameworks",
    points: [
      "Full GDPR & EU Data Protection compliance with standard Data Processing Agreements (DPA)",
      "SOC 2 Type II architectural alignment and controls verification",
      "Annual third-party black-box and white-box penetration testing by CREST-certified auditors",
      "CCPA & HIPAA technical readiness for North American enterprise engagements",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Business Continuity & SRE",
    subtitle: "Guaranteed recovery objectives and high resilience",
    points: [
      "Multi-region database read replicas and automated failover mechanics",
      "Immutable snapshot backups with cross-region isolation and disaster recovery tests",
      "Recovery Time Objective (RTO) < 15 minutes; Recovery Point Objective (RPO) < 1 minute",
      "24/7/365 site reliability engineering monitoring with pager escalation protocols",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Responsible Disclosure",
    subtitle: "Transparent partnership with the global security community",
    points: [
      "Dedicated security response mailbox with SLA acknowledgment under 24 hours",
      "PGP-encrypted communications for vulnerability reporting",
      "Safe harbor protection for researchers operating in good faith",
      "Rapid turnaround patch cycles with coordinated vulnerability disclosure",
    ],
  },
];

const COMPLIANCE_BADGES = [
  { label: "SOC 2 Type II", desc: "Security, Availability & Confidentiality controls" },
  { label: "GDPR Compliant", desc: "European Union General Data Protection Regulation" },
  { label: "ISO 27001 Ready", desc: "Information Security Management System framework" },
  { label: "OWASP Top 10", desc: "Rigorous prevention against common web vulnerabilities" },
  { label: "TLS 1.3 & AES-256", desc: "High-grade cryptographic transport and storage" },
  { label: "99.99% Availability", desc: "Enterprise SLA backed by redundant infrastructure" },
];

export default function SecurityCompliancePage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          Enterprise Trust & Governance
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark dark:text-brand-light tracking-tight max-w-4xl mx-auto mb-6">
          Security & Compliance at Hextel Tech
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          We engineer enterprise software with uncompromising security standards. From zero-trust cloud infrastructure to GDPR data governance, trust is the baseline of everything we deliver.
        </p>

        {/* Quick Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-12 max-w-6xl mx-auto">
          {COMPLIANCE_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm text-left hover:border-brand-accent/40 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-brand-accent mb-2" />
              <div className="font-heading text-xs sm:text-sm font-bold text-brand-dark dark:text-brand-light">
                {badge.label}
              </div>
              <p className="text-[11px] text-brand-dark/60 dark:text-brand-light/60 mt-1 line-clamp-2">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Pillars Grid */}
      <section className="bg-surface-dim dark:bg-[#161111] py-20 border-y border-brand-dark/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Architectural Defense
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2">
              The 6 Pillars of Our Security Posture
            </h2>
            <p className="text-sm sm:text-base text-brand-dark/70 dark:text-brand-light/70 mt-3">
              Comprehensive safeguards spanning physical infrastructure, application development, and human governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SECURITY_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-brand-accent/50 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-dark dark:text-brand-light mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brand-accent font-medium mb-4">
                    {pillar.subtitle}
                  </p>
                  <ul className="space-y-2.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
                    {pillar.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-brand-accent shrink-0 mt-0.5">✓</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vulnerability Reporting & Contact Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl bg-brand-dark dark:bg-[#140E0E] text-brand-light p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Security Operations & Inquiries
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Request Compliance Documentation or Report a Finding
              </h2>
              <p className="text-sm text-brand-light/70 leading-relaxed max-w-xl">
                Need our standard Data Processing Addendum (DPA), vendor security questionnaire responses, or SOC 2 report summaries for enterprise due diligence? Our security committee is ready to assist.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-brand-light/80">
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  📧 hexteltech@gmail.com
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  🔒 PGP Key ID: 0x8F4E2D1A
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  ⏱ SLA: &lt; 24h Response
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full py-3 px-5 rounded-xl bg-brand-accent text-brand-dark font-semibold text-xs uppercase tracking-wider text-center hover:opacity-90 transition-opacity shadow-lg"
              >
                Schedule Security Review
              </Link>
              <a
                href="mailto:hexteltech@gmail.com?subject=Enterprise%20Compliance%20Inquiry"
                className="w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs text-center transition-colors border border-white/10"
              >
                Email Security Team
              </a>
              <Link
                href="/cookie-policy"
                className="text-center text-xs text-brand-light/60 hover:text-white underline underline-offset-4 pt-1 transition-colors"
              >
                View Cookie Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
