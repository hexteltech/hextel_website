"use client";

import Image from "next/image";
import { BRAND_CONFIG } from "@/lib/constants";
import ContactForm from "./ContactForm";
import { FadeIn } from "@/components/ui/Motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative z-10 overflow-hidden bg-brand-dark dark:bg-[#120E0E] py-24 sm:py-32 text-brand-light transition-colors">
      {/* Background Mountain Image */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/images/t001-nova-cta-mountains-1920.webp"
          alt="Atmospheric mountain landscape backdrop"
          fill
          quality={95}
          sizes="100vw"
          className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct Coordinates & Value */}
          <FadeIn direction="right" duration={0.7} className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
                {t.contact?.badge || "Start a Conversation"}
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-light mt-3 leading-tight">
                {t.contact?.heading || "Let's build something remarkable together."}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-brand-light/75 leading-relaxed">
              {t.contact?.description || "Whether you are architecting a new web platform, integrating AI automation, or scaling your digital products, our 3 founders (Hasaan, Muhammad Faseeh, and Moman) work directly with you at every stage."}
            </p>

            {/* Direct Contact Coordinates */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-brand-light transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <span className="text-xs text-brand-light/50 uppercase tracking-wider block">
                    {t.contact?.directEmail || "Direct Email"}
                  </span>
                  <a href={`mailto:${BRAND_CONFIG.email}`} className="text-sm font-semibold hover:text-brand-accent transition-colors">
                    {BRAND_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-brand-light transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <span className="text-xs text-brand-light/50 uppercase tracking-wider block">
                    {t.contact?.directLine || "Direct Line"}
                  </span>
                  <a href={`tel:${BRAND_CONFIG.phone.replace(/\s+/g, "")}`} className="text-sm font-semibold hover:text-brand-accent transition-colors">
                    {BRAND_CONFIG.phone}
                  </a>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND_CONFIG.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group focus:outline-none cursor-pointer"
                title="Open headquarters location in Google Maps"
                aria-label={`Open ${BRAND_CONFIG.address} in Google Maps`}
              >
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-brand-light transition-all duration-300 group-hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <span className="text-xs text-brand-light/50 uppercase tracking-wider block group-hover:text-brand-accent transition-colors">
                    {t.contact?.headquarters || "Headquarters"}
                  </span>
                  <span className="text-sm font-medium text-brand-light/85 group-hover:text-brand-light group-hover:underline transition-colors flex items-center gap-1.5">
                    <span>{BRAND_CONFIG.address}</span>
                    <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Right Column: Contact Form with FadeIn */}
          <FadeIn direction="left" delay={0.2} duration={0.7} className="lg:col-span-7">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
