import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FaqSection } from "@/components/home/FaqSection";
import { TechLogos } from "@/components/home/TechLogos";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col relative bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <WhyChooseUs />
        <FeaturedProjects />
        <ProcessSection />
        <FaqSection />
        <TechLogos />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
