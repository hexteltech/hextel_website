"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface EmailCardData {
  name: string;
  role: string;
  company: string;
  studio: string;
  avatar: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter?: string;
}

const DEFAULT_CARD_DATA: EmailCardData = {
  name: "Hasaan Ahmad",
  role: "CEO & Business Development",
  company: "HEXTEL TECH",
  studio: "Hextel Tech Studio",
  avatar: "/images/hasaan-ahmad-avatar.jpg",
  email: "hexteltech@gmail.com",
  phone: "+92 303 5696807",
  website: "hexteltech.com",
  linkedin: "https://linkedin.com/company/hexteltech",
  twitter: "https://twitter.com",
};

interface EmailCardBoardProps {
  data?: Partial<EmailCardData>;
  showCopyButton?: boolean;
  className?: string;
}

export default function EmailCardBoard({
  data = {},
  showCopyButton = true,
  className = "",
}: EmailCardBoardProps) {
  const card: EmailCardData = { ...DEFAULT_CARD_DATA, ...data };
  const [copied, setCopied] = useState(false);

  const handleCopySignature = async () => {
    // Generate clean, inline-styled HTML compatible with Gmail, Apple Mail, Outlook
    const signatureHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="width: 480px; max-width: 480px; background-color: #FFFFFF; border: 1.5px solid #E2DDD5; border-radius: 14px; padding: 18px 22px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #18181B; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
  <tr>
    <td valign="middle" align="center" style="width: 130px; text-align: center; vertical-align: middle; padding-right: 16px;">
      <img src="https://hexteltech.com/images/hasaan-ahmad-avatar.jpg" alt="${card.name}" width="70" height="70" style="display: block; margin: 0 auto; border-radius: 50%; object-fit: cover; border: 2.5px solid #5C1F1F;" />
      <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #5C1F1F; margin: 10px 0 8px 0; text-align: center;">
        ${card.company}
      </div>
      <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td style="padding: 0 3px;">
            <a href="${card.linkedin}" target="_blank" style="text-decoration: none; display: inline-block;">
              <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="18" height="18" style="display: block; border-radius: 50%;" />
            </a>
          </td>
          <td style="padding: 0 3px;">
            <a href="https://${card.website.replace(/^https?:\/\//, '')}" target="_blank" style="text-decoration: none; display: inline-block;">
              <img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" alt="Website" width="18" height="18" style="display: block; border-radius: 50%;" />
            </a>
          </td>
          <td style="padding: 0 3px;">
            <a href="${card.twitter || 'https://twitter.com'}" target="_blank" style="text-decoration: none; display: inline-block;">
              <img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" alt="X" width="18" height="18" style="display: block; border-radius: 50%;" />
            </a>
          </td>
        </tr>
      </table>
    </td>
    <td style="width: 1px; background-color: #EBE5DB; padding: 0;"></td>
    <td valign="middle" style="padding-left: 18px; vertical-align: middle;">
      <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: bold; color: #141212; line-height: 1.2;">
        ${card.name}
      </div>
      <div style="font-size: 12.5px; color: #B88849; font-weight: 600; margin-top: 3px;">
        ${card.role}
      </div>
      <div style="font-size: 11.5px; color: #71717A; margin-top: 1px; margin-bottom: 8px;">
        ${card.studio}
      </div>
      <div style="height: 1px; background-color: #EBE5DB; margin-bottom: 9px; width: 100%;"></div>
      <table cellpadding="0" cellspacing="0" border="0" style="font-size: 11.5px; line-height: 19px; color: #4B5563;">
        <tr>
          <td style="padding-right: 8px; vertical-align: middle; color: #B88849; font-size: 13px;">✉</td>
          <td style="vertical-align: middle;">
            <a href="mailto:${card.email}" style="color: #4B5563; text-decoration: none; font-weight: 500;">${card.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding-right: 8px; vertical-align: middle; color: #B88849; font-size: 13px;">☎</td>
          <td style="vertical-align: middle;">
            <a href="tel:${card.phone.replace(/\\s+/g, '')}" style="color: #4B5563; text-decoration: none; font-weight: 500;">${card.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding-right: 8px; vertical-align: middle; color: #38BDF8; font-size: 13px;">🌐</td>
          <td style="vertical-align: middle;">
            <a href="https://${card.website.replace(/^https?:\/\//, '')}" target="_blank" style="color: #4B5563; text-decoration: none; font-weight: 500;">${card.website}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();

    try {
      if (typeof window !== "undefined" && navigator.clipboard && window.ClipboardItem) {
        const textBlob = new Blob([`${card.name} | ${card.role} | ${card.company}\n${card.email} | ${card.phone} | ${card.website}`], { type: "text/plain" });
        const htmlBlob = new Blob([signatureHtml], { type: "text/html" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": textBlob,
            "text/html": htmlBlob,
          }),
        ]);
      } else {
        // Fallback for older browsers
        const el = document.getElementById("hextelCardBoardContent");
        if (el) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(el);
          selection?.removeAllRanges();
          selection?.addRange(range);
          document.execCommand("copy");
          selection?.removeAllRanges();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      // In case clipboard permissions fail
      setCopied(false);
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Outer Card Board Frame (Matches Screenshot) */}
      <div className="relative w-full max-w-[620px] bg-[#F4F4F6] dark:bg-[#1E1A1A] p-6 sm:p-10 rounded-[32px] sm:rounded-[36px] border-[2.5px] border-[#221F1F] dark:border-[#382E2E] shadow-2xl transition-all duration-300">
        
        {/* The Email Card */}
        <div
          id="hextelCardBoardContent"
          className="relative bg-white rounded-[14px] border border-[#E2DDD5] p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] select-text"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-6">
            
            {/* Left Column: Avatar + HEXTEL TECH + Socials */}
            <div className="flex flex-col items-center justify-center shrink-0 w-full sm:w-[135px] text-center">
              {/* Circular Avatar */}
              <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden border-[2.5px] border-[#5C1F1F] shadow-sm">
                <Image
                  src={card.avatar}
                  alt={card.name}
                  fill
                  sizes="72px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Brand Title */}
              <div className="font-serif text-[11px] font-bold tracking-[2px] uppercase text-[#5C1F1F] mt-2.5 mb-2 leading-none">
                {card.company}
              </div>

              {/* Social Badges Row */}
              <div className="flex items-center justify-center gap-2">
                {/* LinkedIn Badge */}
                <a
                  href={card.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-[18px] h-[18px] rounded-full bg-[#0077B5] flex items-center justify-center hover:opacity-85 transition-opacity"
                >
                  <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>

                {/* Website / Globe Badge */}
                <a
                  href={`https://${card.website.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Official Website"
                  className="w-[18px] h-[18px] rounded-full border border-neutral-700 bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  <svg
                    className="w-3 h-3 text-neutral-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>

                {/* X / Twitter Badge */}
                <a
                  href={card.twitter || "https://twitter.com"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X Profile"
                  className="w-[18px] h-[18px] rounded-full bg-black flex items-center justify-center hover:opacity-85 transition-opacity"
                >
                  <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div className="hidden sm:block w-[1px] bg-[#EBE5DB] self-stretch my-1" />

            {/* Right Column: Name, Role, Studio & Contacts */}
            <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
              {/* Executive Name */}
              <h3 className="font-serif text-[22px] sm:text-[23px] font-bold text-[#141212] tracking-tight leading-tight">
                {card.name}
              </h3>

              {/* Title / Role */}
              <div className="text-[12.5px] font-semibold text-[#B88849] mt-0.5 leading-snug">
                {card.role}
              </div>

              {/* Studio */}
              <div className="text-[11.5px] text-[#71717A] mt-0.5">
                {card.studio}
              </div>

              {/* Subtle Horizontal Divider */}
              <div className="h-[1px] bg-[#EBE5DB] w-full my-2 sm:my-2.5" />

              {/* Contact Information Rows */}
              <div className="space-y-1.5 text-[11.5px] leading-tight">
                {/* Email */}
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-4 flex items-center justify-center text-[#B88849]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <a
                    href={`mailto:${card.email}`}
                    className="text-[#4B5563] hover:text-[#B88849] font-medium transition-colors"
                  >
                    {card.email}
                  </a>
                </div>

                {/* Telephone */}
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-4 flex items-center justify-center text-[#B88849]">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </span>
                  <a
                    href={`tel:${card.phone.replace(/\s+/g, "")}`}
                    className="text-[#4B5563] hover:text-[#B88849] font-medium transition-colors"
                  >
                    {card.phone}
                  </a>
                </div>

                {/* Website */}
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-4 flex items-center justify-center text-[#38BDF8]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <a
                    href={`https://${card.website.replace(/^https?:\/\//, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#4B5563] hover:text-[#38BDF8] font-medium transition-colors"
                  >
                    {card.website}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Copy Actions & Feedback */}
      {showCopyButton && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleCopySignature}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B88849] hover:bg-[#a4763a] active:scale-95 text-[#120E0E] font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? "Copied to Clipboard!" : "Copy Signature for Gmail / Outlook"}
          </button>

          {copied && (
            <span className="text-xs font-semibold text-emerald-400 animate-fade-in">
              ✓ Formatted signature copied! Ready to paste into Gmail or Outlook.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
