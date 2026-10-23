"use client";

import { FAQS } from "@/lib/constants";
import Accordion from "@/components/ui/Accordion";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function FaqSection() {
  const { t } = useLanguage();
  const faqItems = t.faq?.items && t.faq.items.length > 0 ? t.faq.items : FAQS;

  return (
    <section id="faq" className="bg-surface dark:bg-[#120E0E] py-20 sm:py-28 border-b border-brand-dark/10 dark:border-white/10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn direction="up" duration={0.6}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {t.faq?.badge || "Clarity & Process"}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-brand-light tracking-tight mt-2 mb-4">
              {t.faq?.heading || "Frequently asked questions"}
            </h2>
            <p className="text-base text-brand-dark/70 dark:text-brand-light/70 leading-relaxed">
              {t.faq?.description || "Everything you need to know about our engineering process, engagement models, and project deliverables."}
            </p>
          </div>
        </FadeIn>

        {/* Declarative React Accordion */}
        <FadeIn direction="up" delay={0.15} duration={0.6}>
          <Accordion items={faqItems} />
        </FadeIn>

        {/* Bottom prompt */}
        <FadeIn direction="up" delay={0.25} duration={0.6} className="mt-12 text-center">
          <p className="text-sm text-brand-dark/70 dark:text-brand-light/70">
            {t.faq?.unansweredPrompt || "Have a question that isn't answered here?"}{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-dark dark:text-brand-light underline underline-offset-4 hover:text-brand-accent dark:hover:text-brand-accent transition-colors"
            >
              {t.faq?.contactLink || "Contact our solutions team"}
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
