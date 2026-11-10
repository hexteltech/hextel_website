import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBar from "@/components/layout/FloatingBar";
import SkipToContent from "@/components/ui/SkipToContent";
import CookieBanner from "@/components/ui/CookieBanner";
import SearchModal from "@/components/ui/SearchModal";
import ClientPortalModal from "@/components/ui/ClientPortalModal";
import LoadingBar from "@/components/ui/LoadingBar";
import ChatbotWidgetWrapper from "@/components/chatbot/ChatbotWidgetWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { UtmProvider } from "@/components/providers/UtmTracker";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDE9E1" },
    { media: "(prefers-color-scheme: dark)", color: "#120E0E" },
  ],
};

export const metadata: Metadata = {
  title: "Hextel Tech — Engineering Digital Excellence for Ambitious Brands",
  description:
    "We create modern web platforms, design systems, and digital ecosystems that strengthen your market position and drive business growth.",
  openGraph: {
    title: "Hextel Tech — Engineering Digital Excellence",
    description: "Modern websites & platforms for ambitious brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${headingFont.variable}`}
    >
      <head>
        {/* Anti-FOUC zero-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('hextel_theme_preference');
                  var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen min-h-dvh flex flex-col bg-brand-light dark:bg-[#120E0E] font-sans text-brand-dark dark:text-brand-light antialiased selection:bg-brand-accent/30 selection:text-inherit overflow-x-clip">
        <ThemeProvider>
          <LanguageProvider>
            <UtmProvider>
              {/* 12. Skip to content accessibility link */}
              <SkipToContent />

              {/* 6. Top Loading Animation Bar */}
              <LoadingBar />

              {/* 11. Sticky Header & Navigation */}
              <Navbar />

              {/* Main Content Area */}
              <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
                {children}
              </main>

              {/* Site Footer */}
              <Footer />

              {/* 4. Back to top button toggle & floating actions (bottom-left) */}
              <FloatingBar />

              {/* AI Chatbot Widget (bottom-right) */}
              <ChatbotWidgetWrapper />

              {/* 2. Simple cookie banner */}
              <CookieBanner />

              {/* 3. Site search modal (Cmd+K) */}
              <SearchModal />

              {/* 13. Password visibility toggle: Client NDA Portal */}
              <ClientPortalModal />

              {/* Vercel Web Analytics */}
              <Analytics />

            </UtmProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
