import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBar from "@/components/layout/FloatingBar";
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
    <html lang="en" className={`${sansFont.variable} ${headingFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-light font-sans text-brand-dark antialiased">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <FloatingBar />
      </body>
    </html>
  );
}
