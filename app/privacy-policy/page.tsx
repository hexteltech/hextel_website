import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — Hextel Tech | Data Governance & Protection",
  description:
    "Review Hextel Tech's Privacy Policy regarding data collection, processing standards, client confidentiality, and your rights under GDPR and international privacy regulations.",
  openGraph: {
    title: "Privacy Policy — Hextel Tech",
    description: "Enterprise privacy policy, GDPR compliance, and data governance standards.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent" />
          Data Governance
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          {BRAND_CONFIG.name} is dedicated to protecting client confidentiality and personal data with stringent enterprise-grade governance.
        </p>
        <p className="text-xs text-brand-dark/50 dark:text-brand-light/50 mt-3 font-mono">
          Last Updated: October 2026 • GDPR, ePrivacy & CCPA Compliant
        </p>
      </section>

      {/* Policy Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-brand-dark/80 dark:text-brand-light/80 leading-relaxed text-sm">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            1. Information We Collect
          </h2>
          <p>
            We collect information strictly necessary to provide engineering services, respond to enterprise inquiries, and ensure platform performance:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
            <li><strong>Inquiry Data:</strong> Name, work email address, company name, project brief, budget requirements, and timeline.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized IP addresses, browser user agent, device screen dimensions, and latency diagnostics.</li>
            <li><strong>Client Portal Credentials:</strong> Encrypted access credentials, authenticated project access tokens, and NDA verification states.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            2. Purpose & Legal Basis for Processing
          </h2>
          <p>
            We process data in strict adherence to Article 6 of the General Data Protection Regulation (GDPR):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
            <li><strong>Contractual Performance:</strong> Delivering software development, architecture advisory, and technical support.</li>
            <li><strong>Legitimate Interests:</strong> Preventing cyberattacks, monitoring infrastructure reliability, and detecting unauthorized access.</li>
            <li><strong>Explicit Consent:</strong> Sending requested project estimates, architecture roadmaps, or newsletter updates.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            3. Data Sharing & Sub-Processors
          </h2>
          <p>
            We never sell, rent, or monetize client or visitor personal information. Data is shared exclusively with vetted infrastructure sub-processors under signed Data Processing Agreements:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
            <li><strong>Cloud Infrastructure:</strong> AWS (EU Frankurt / Ireland), Vercel Inc. (Edge Network), Cloudflare.</li>
            <li><strong>Database & Storage:</strong> Encrypted PostgreSQL and AWS S3 with hardware encryption keys.</li>
            <li><strong>Transactional Communication:</strong> Resend / SendGrid with TLS delivery enforcement.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            4. Your Rights Under GDPR & CCPA
          </h2>
          <p>
            You hold comprehensive rights over your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
            <li>Right of access and data portability</li>
            <li>Right to rectification of incomplete or inaccurate records</li>
            <li>Right to erasure (&quot;Right to be Forgotten&quot;)</li>
            <li>Right to restrict or object to data processing</li>
          </ul>
          <p className="text-xs text-brand-dark/60 dark:text-brand-light/60">
            To exercise these rights, email our Data Privacy Officer at <a href={`mailto:${BRAND_CONFIG.email}`} className="text-brand-accent underline">{BRAND_CONFIG.email}</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            5. Related Policies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Link
              href="/security-and-compliance"
              className="p-4 rounded-xl bg-surface-dim dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 hover:border-brand-accent/50 transition-colors block"
            >
              <div className="font-heading font-bold text-brand-dark dark:text-brand-light text-sm">
                Security & Compliance →
              </div>
              <div className="text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1">
                Zero-trust cloud architecture, SOC 2 controls & vulnerability disclosure.
              </div>
            </Link>

            <Link
              href="/cookie-policy"
              className="p-4 rounded-xl bg-surface-dim dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 hover:border-brand-accent/50 transition-colors block"
            >
              <div className="font-heading font-bold text-brand-dark dark:text-brand-light text-sm">
                Cookie Policy →
              </div>
              <div className="text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1">
                Detailed inventory of cookies, durations, and interactive preferences.
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
