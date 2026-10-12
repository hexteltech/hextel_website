import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import BlogSection from "@/components/sections/BlogSection";
import HowWeBuildSection from "@/components/sections/HowWeBuildSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FaqSection from "@/components/sections/FaqSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <BlogSection />
      <HowWeBuildSection />
      <ProjectsSection />
      <FaqSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
