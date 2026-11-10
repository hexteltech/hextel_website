"use client";

import React, { useState } from "react";
import { BRAND_CONFIG } from "@/lib/constants";
import EmailCardBoard, { EmailCardData } from "@/components/ui/EmailCardBoard";

interface FounderPreset extends EmailCardData {
  id: string;
}

const PRESETS: FounderPreset[] = [
  {
    id: "hasaan",
    name: "Hasaan Ahmad",
    role: "CEO & Business Development",
    company: "HEXTEL TECH",
    studio: "Hextel Tech Studio",
    avatar: "/images/hasaan-ahmad-avatar.jpg",
    email: BRAND_CONFIG.email,
    phone: BRAND_CONFIG.phone,
    website: "hexteltech.com",
    linkedin: "https://linkedin.com/company/hexteltech",
    twitter: "https://twitter.com",
  },
  {
    id: "faseeh",
    name: "Muhammad Faseeh Altaf",
    role: "Co-Founder & Full Stack Lead",
    company: "HEXTEL TECH",
    studio: "Hextel Tech Studio",
    avatar: "/images/faseeh-altaf-v2-avatar.jpg",
    email: BRAND_CONFIG.email,
    phone: BRAND_CONFIG.phone,
    website: "hexteltech.com",
    linkedin: "https://linkedin.com/company/hexteltech",
    twitter: "https://twitter.com",
  },
  {
    id: "moman",
    name: "Moman Salman",
    role: "Co-Founder & AI Systems Lead",
    company: "HEXTEL TECH",
    studio: "Hextel Tech Studio",
    avatar: "/images/moman-salman-avatar.jpg",
    email: BRAND_CONFIG.email,
    phone: BRAND_CONFIG.phone,
    website: "hexteltech.com",
    linkedin: "https://linkedin.com/company/hexteltech",
    twitter: "https://twitter.com",
  },
  {
    id: "team",
    name: "Hextel Tech Team",
    role: "Digital Engineering & Solutions",
    company: "HEXTEL TECH",
    studio: "Hextel Tech Studio",
    avatar: "/images/hextel-mark.png",
    email: BRAND_CONFIG.email,
    phone: BRAND_CONFIG.phone,
    website: "hexteltech.com",
    linkedin: "https://linkedin.com/company/hexteltech",
    twitter: "https://twitter.com",
  },
];

export default function SignaturePage() {
  const [selectedPreset, setSelectedPreset] = useState<FounderPreset>(PRESETS[0]);
  const [name, setName] = useState(PRESETS[0].name);
  const [role, setRole] = useState(PRESETS[0].role);
  const [company, setCompany] = useState(PRESETS[0].company);
  const [studio, setStudio] = useState(PRESETS[0].studio);
  const [email, setEmail] = useState(PRESETS[0].email);
  const [phone, setPhone] = useState(PRESETS[0].phone);
  const [website, setWebsite] = useState(PRESETS[0].website);
  const [avatar, setAvatar] = useState(PRESETS[0].avatar);

  const applyPreset = (preset: FounderPreset) => {
    setSelectedPreset(preset);
    setName(preset.name);
    setRole(preset.role);
    setCompany(preset.company);
    setStudio(preset.studio);
    setEmail(preset.email);
    setPhone(preset.phone);
    setWebsite(preset.website);
    setAvatar(preset.avatar);
  };

  const currentCardData: EmailCardData = {
    name,
    role,
    company,
    studio,
    avatar,
    email,
    phone,
    website,
    linkedin: selectedPreset.linkedin,
    twitter: selectedPreset.twitter,
  };

  return (
    <div className="min-h-screen bg-[#120E0E] text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B88849]/40 bg-[#B88849]/10 text-[#B88849] text-xs font-semibold tracking-wider uppercase mb-3">
            Hextel Tech Signature Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Official Brand Email Card Board
          </h1>
          <p className="mt-2 text-neutral-400 text-sm max-w-xl mx-auto">
            Engineered precisely according to Hextel Tech brand specifications. Live interactive preview board with 1-click clipboard export for Gmail, Apple Mail, and Outlook.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-[#1A1414] border border-[#2A2020] rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#B88849] mb-3">
                1. Select Member Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p)}
                    className={`text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                      selectedPreset.id === p.id
                        ? "border-[#B88849] bg-[#B88849]/15 text-white font-semibold shadow-sm"
                        : "border-[#2E2424] bg-[#140E0E] text-neutral-400 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    <div className="truncate font-semibold">{p.name}</div>
                    <div className="truncate text-[10px] text-neutral-500">{p.role.split("&")[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#2A2020]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#B88849]">
                2. Customize Details
              </label>
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">Full Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#120E0E] border border-[#2E2424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B88849]"
                />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">Role / Designation</span>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#120E0E] border border-[#2E2424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B88849]"
                />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">Brand Tagline</span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-[#120E0E] border border-[#2E2424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B88849]"
                />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">Studio / Department</span>
                <input
                  type="text"
                  value={studio}
                  onChange={(e) => setStudio(e.target.value)}
                  className="w-full bg-[#120E0E] border border-[#2E2424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B88849]"
                />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">Direct Phone</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#120E0E] border border-[#2E2424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B88849]"
                />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block mb-1">Direct Email</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#120E0E] border border-[#2E2424] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B88849]"
                />
              </div>
            </div>
          </div>

          {/* Email Card Board Preview Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1A1414] border border-[#2A2020] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-6 pb-3 border-b border-[#2A2020]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B88849]">
                  Live Email Card Board
                </span>
                <span className="text-[11px] text-neutral-400">
                  Exact Board Ratio
                </span>
              </div>

              {/* RENDER THE EXACT CARD BOARD */}
              <EmailCardBoard data={currentCardData} showCopyButton={true} className="w-full" />
            </div>

            {/* Steps Guide */}
            <div className="bg-[#1A1414] border border-[#2A2020] rounded-2xl p-6 text-xs text-neutral-400 space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <span>⚡</span> Adding to Gmail in 30 Seconds:
              </h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-neutral-300">
                <li>Click <strong>&quot;Copy Signature for Gmail / Outlook&quot;</strong> above.</li>
                <li>Open <a href="https://mail.google.com/mail/u/0/#settings/general" target="_blank" rel="noreferrer" className="text-[#B88849] hover:underline font-semibold">Gmail Settings &rarr; General &rarr; Signature</a>.</li>
                <li>Click <strong>+ Create new</strong>, enter a signature name, then click into the text box and press <strong>Ctrl + V</strong> (Paste).</li>
                <li>Under <em>Signature defaults</em>, select your new signature and click <strong>Save Changes</strong> at the bottom of the page!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
