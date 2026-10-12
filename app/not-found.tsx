import type { Metadata } from "next";
import NotFoundClient from "@/components/ui/NotFoundClient";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Hextel Tech",
  description: "The requested route or resource could not be found.",
};

export default function NotFound() {
  return <NotFoundClient />;
}
