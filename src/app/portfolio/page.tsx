import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Sparkles, Terminal, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Selected Work & Case Studies | AIVSTACK",
  description:
    "Explore verified commercial software, mobile apps, and full-stack systems engineered by AIVSTACK.",
};

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-[#00A859] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-1/3 w-[600px] h-[300px] bg-gradient-to-br from-[#00A859]/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#00A859] text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Selected Works & Production Case Studies</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-gray-950 tracking-tight leading-[1.08] uppercase">
                Work that ships. <br />
                <span className="text-[#00A859]">Ideas into code.</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Explore real software, mobile apps, and systems built by AIVSTACK.
                Every case study breaks down the actual technical architecture, engineering choices, and verifiable QA results.
              </p>

              {/* Engineering Metrics Strip */}
              <div className="mt-10 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
                <div>
                  <div className="font-heading text-2xl font-black text-gray-950">14 Suites</div>
                  <div className="text-xs text-gray-500 font-medium">100% QA Passed (Zero Fails)</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-black text-gray-950">&lt; 5ms</div>
                  <div className="text-xs text-gray-500 font-medium">On-Device Local AI Evaluation</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-black text-gray-950">100% IP</div>
                  <div className="text-xs text-gray-500 font-medium">Client Source Code Ownership</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Gallery */}
        <section className="py-16 sm:py-24 bg-[#FAFAFC]">
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