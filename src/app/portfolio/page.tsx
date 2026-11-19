import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Portfolio & Case Studies | AIVSTACK",
  description:
    "Explore completed commercial platforms, in-development software, and innovative prototypes by AIVSTACK across Web, Mobile, AI, and Creative Design.",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 border-b border-[#A78BFA]/15 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#24202D] tracking-tight leading-tight">
                Engineering & Design{" "}
                <span className="bg-gradient-to-r from-[#30224D] via-[#6D28D9] to-[#A78BFA] bg-clip-text text-transparent">
                  Portfolio.
                </span>
              </h1>
              <p className="mt-6 text-lg text-[#706B7D] leading-relaxed">
                Explore our commercial deliveries, active developments, and exploratory prototypes.
                Every case study outlines the core problem, our architectural solution, and the technologies utilized.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 sm:py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PortfolioGallery />
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
