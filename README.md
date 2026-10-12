# Hextel Tech 🚀

A modern, high-performance web platform built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Features

- **App Router & Server Components (RSC)**: Maximizes performance and SEO with 0kB runtime JS on content sections.
- **Interactive UI Primitives**: Accessible mobile slide-over drawer, CSS-grid animated accordion, and sticky navbar.
- **Image & Font Optimization**: Routed through `next/image` (WebP/AVIF) and `next/font/google` (`Plus_Jakarta_Sans` & `Space_Grotesk`).
- **Lead Capture API**: Native Next.js Route Handler (`/api/contact`) with payload validation and honeypot spam protection.
- **Responsive Design**: Designed for mobile, tablet, and ultra-wide screens.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: Inline SVG icons with Tailwind micro-interactions

---

## 📁 Project Structure

```text
├── app/
│   ├── api/contact/route.ts    # Lead capture API endpoint
│   ├── globals.css             # Design tokens & base styles
│   ├── layout.tsx              # Root HTML shell & fonts
│   └── page.tsx                # Page composition
├── components/
│   ├── layout/                 # Navbar, MobileDrawer, Footer, FloatingBar
│   ├── sections/               # Hero, Projects, Services, Team, FAQ, Reviews, Contact
│   └── ui/                     # Primitives (Accordion)
├── lib/
│   ├── constants.ts            # Content & brand constants
│   └── utils.ts                # cn() helper
└── public/
    └── images/                 # Optimized static assets
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Configure Direct Mailing (Resend or EmailJS)

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

#### Option A: Resend (Recommended Server-Side Mailer)
1. Get a free API key at [resend.com](https://resend.com).
2. Set in `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_TO_EMAIL=your_inbox@yourdomain.com
   CONTACT_FROM_EMAIL="Hextel Tech <onboarding@resend.dev>"
   SEND_CLIENT_RECEIPT=true
   ```

#### Option B: EmailJS (Client-Side Direct Mailer)
1. Sign up at [emailjs.com](https://www.emailjs.com/).
2. Create an Email Service & Template, then set in `.env.local`:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_public_key_xxxxxxx
   ```

---

### 4. Build for Production
```bash
npm run build
npm run start
```

