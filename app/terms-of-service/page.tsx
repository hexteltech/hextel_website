import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service — Hextel Tech | Enterprise Engagement & IP Governance",
  description:
    "Review Hextel Tech's Terms of Service covering software engineering engagements, 100% client intellectual property ownership, confidentiality, and SLA commitments.",
  openGraph: {
    title: "Terms of Service — Hextel Tech",
    description:
      "Enterprise software development terms, intellectual property handover, and service level guarantees.",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider text-brand-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent" />
          Legal &amp; Engagement Terms
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-brand-dark/70 dark:text-brand-light/70 max-w-2xl mx-auto leading-relaxed">
          Clear, founder-led terms governing our software engineering services, intellectual property ownership, and delivery guarantees at {BRAND_CONFIG.name}.
        </p>
        <p className="text-xs text-brand-dark/50 dark:text-brand-light/50 mt-3 font-mono">
          Last Updated: November 2026 • Enterprise MSA &amp; SOW Framework
        </p>
      </section>

      {/* Terms Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-brand-dark/80 dark:text-brand-light/80 leading-relaxed text-sm">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            1. Scope of Engineering Services
          </h2>
          <p>
            {BRAND_CONFIG.name} provides custom web application development, mobile application engineering, AI agents &amp; workflow automation, UI/UX design systems, cloud infrastructure management, and dedicated IT staff augmentation. Specific project deliverables, sprint schedules, and fixed-price or retainer terms are defined in each mutually signed Statement of Work (SOW) or Master Services Agreement (MSA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            2. 100% Client Intellectual Property (IP) Ownership
          </h2>
          <p>
            Upon full settlement of agreed milestone invoices, clients receive <strong>100% ownership and exclusive rights</strong> to all custom source code, repository commits, database schemas, Figma design systems, CI/CD pipelines, and architectural documentation produced under the engagement:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
            <li><strong>Zero Vendor Lock-In:</strong> All repositories, cloud environments, and deployment keys are transferred directly to your organization.</li>
            <li><strong>Confidentiality &amp; NDA:</strong> We execute mutual Non-Disclosure Agreements (NDAs) prior to technical discovery and architecture reviews.</li>
            <li><strong>Proprietary SaaS Exception:</strong> {BRAND_CONFIG.name} retains ownership of its independent in-house SaaS products (including Job Hunt Copilot and TraceLens) unless explicitly licensed under a separate enterprise agreement.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            3. Delivery Milestones, Warranties &amp; SLAs
          </h2>
          <p>
            We engineer every system to strict production quality gates, including automated testing, Lighthouse 95+ performance benchmarks, and zero-trust security controls:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-dark/75 dark:text-brand-light/75">
            <li><strong>Transparent Sprints:</strong> Clients receive direct access to shared GitHub repositories, staging deployments, and bi-weekly founder demos.</li>
            <li><strong>Post-Launch Warranty:</strong> Every fixed-scope project includes a post-deployment stabilization window to resolve any defects against agreed specifications at zero additional cost.</li>
            <li><strong>Ongoing SLA Support:</strong> Optional 24/7 infrastructure monitoring, feature evolution, and security patching are available via monthly retainer tiers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            4. Acceptable Use &amp; Website Content
          </h2>
          <p>
            Visitors may browse our website, case studies, technical articles, and AI consultant widget for informational and business evaluation purposes. Automated scraping, unauthorized penetration testing without prior coordination under our Responsible Disclosure policy, or misrepresentation of {BRAND_CONFIG.name} branding is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-brand-dark dark:text-brand-light">
            5. Contact &amp; Legal Inquiries
          </h2>
          <p>
            For custom MSA/NDA templates, procurement documentation, or legal questions, contact our founding team directly at{" "}
            <a href={`mailto:${BRAND_CONFIG.email}`} className="text-brand-accent underline font-medium">
              {BRAND_CONFIG.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${BRAND_CONFIG.phone.replace(/\s+/g, "")}`} className="text-brand-accent underline font-medium">
              {BRAND_CONFIG.phone}
            </a>.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-brand-dark/10 dark:border-white/10">
          <h2 className="font-heading text-lg font-bold text-brand-dark dark:text-brand-light">
            Related Governance Documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Link
              href="/privacy-policy"
              className="p-4 rounded-xl bg-surface-dim dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 hover:border-brand-accent/50 transition-colors block"
            >
              <div className="font-heading font-bold text-brand-dark dark:text-brand-light text-sm">
                Privacy Policy →
              </div>
              <div className="text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1">
                GDPR &amp; CCPA data protection standards.
              </div>
            </Link>
            <Link
              href="/security-and-compliance"
              className="p-4 rounded-xl bg-surface-dim dark:bg-[#1A1414] border border-brand-dark/10 dark:border-white/10 hover:border-brand-accent/50 transition-colors block"
            >
              <div className="font-heading font-bold text-brand-dark dark:text-brand-light text-sm">
                Security &amp; Compliance →
              </div>
              <div className="text-xs text-brand-dark/60 dark:text-brand-light/60 mt-1">
                Zero-trust architecture &amp; SOC 2 controls.
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
                Cookie inventory &amp; consent preferences.
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
