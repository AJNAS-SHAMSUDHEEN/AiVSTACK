import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SERVICES } from "@/data/services";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Bot,
  Palette,
  Video,
  Megaphone,
  LifeBuoy,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Services & Capabilities | AIVSTACK",
  description:
    "Explore AIVSTACK's seven specialized service categories: Web Development, Software & App Development, AI & Automation, Graphic Design, Video Production, Digital Marketing, and Technical Support.",
};

const SERVICE_THEMES: Record<
  string,
  {
    icon: React.ElementType;
    badgeBg: string;
    shadowColor: string;
  }
> = {
  "web-development": {
    icon: Globe,
    badgeBg: "bg-gradient-to-tr from-[#4338CA] to-[#6366F1]",
    shadowColor: "shadow-indigo-500/30",
  },
  "software-app-development": {
    icon: Smartphone,
    badgeBg: "bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA]",
    shadowColor: "shadow-purple-500/30",
  },
  "ai-automation": {
    icon: Bot,
    badgeBg: "bg-gradient-to-tr from-[#D97706] to-[#FBBF24]",
    shadowColor: "shadow-amber-500/30",
  },
  "graphic-design-branding": {
    icon: Palette,
    badgeBg: "bg-gradient-to-tr from-[#E11D48] to-[#FB7185]",
    shadowColor: "shadow-rose-500/30",
  },
  "video-creative-production": {
    icon: Video,
    badgeBg: "bg-gradient-to-tr from-[#9333EA] to-[#C084FC]",
    shadowColor: "shadow-fuchsia-500/30",
  },
  "digital-marketing": {
    icon: Megaphone,
    badgeBg: "bg-gradient-to-tr from-[#059669] to-[#34D399]",
    shadowColor: "shadow-emerald-500/30",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Centered Hero Header (Aligned with Reference Design) */}
        <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24 border-b border-[#A78BFA]/15 bg-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F2EEFF]/80 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#24202D] tracking-tight leading-[1.16]">
                Choose the service that fits your vision and schedule.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[#706B7D] leading-relaxed max-w-2xl mx-auto">
                Our flexible, modular solutions make it easy to engineer, automate, and elevate your digital
                presence, exactly when you need it.
              </p>
            </div>
          </div>
        </section>

        {/* 3-Column Visual Grid Section (Matching Reference Image) */}
        <section className="py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
              {SERVICES.map((service) => {
                const theme = SERVICE_THEMES[service.slug] || {
                  icon: Globe,
                  badgeBg: "bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA]",
                  shadowColor: "shadow-purple-500/30",
                };
                const Icon = theme.icon;

                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group relative flex flex-col items-center text-center p-9 sm:p-10 rounded-[32px] sm:rounded-[36px] bg-white border border-[#A78BFA]/18 shadow-[0_10px_35px_-12px_rgba(48,34,77,0.06)] hover:shadow-[0_22px_50px_-10px_rgba(167,139,250,0.18)] hover:border-[#A78BFA]/60 hover:-translate-y-2 transition-all duration-300"
                  >
                    {/* Circular Centered Icon Badge */}
                    <div
                      className={`flex h-16 w-16 sm:h-[68px] sm:w-[68px] items-center justify-center rounded-full ${theme.badgeBg} text-white ${theme.shadowColor} shadow-lg mb-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.2]" />
                    </div>

                    {/* Card Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#24202D] group-hover:text-[#6D28D9] transition-colors mb-3">
                      {service.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-sm sm:text-[15px] text-[#706B7D] leading-relaxed max-w-xs mx-auto mb-6 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Subtle explore indicator */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] group-hover:text-[#30224D] transition-colors mt-auto pt-2">
                      <span>View Specifications</span>
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Vertical Breakdown */}
        <section className="py-20 bg-white border-t border-[#A78BFA]/15">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                Scope & Deliverables
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-[#24202D]">
                Detailed Technical Specifications
              </h2>
              <p className="mt-3 text-base text-[#706B7D]">
                Every domain is delivered with clear architectural standards, verified deliverables, and transparent scoping.
              </p>
            </div>

            <div className="space-y-12">
              {SERVICES.map((service, index) => {
                const theme = SERVICE_THEMES[service.slug] || {
                  icon: Globe,
                  badgeBg: "bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA]",
                  shadowColor: "shadow-purple-500/30",
                };
                const Icon = theme.icon;

                return (
                  <div
                    key={service.id}
                    id={service.slug}
                    className="rounded-[32px] border border-[#A78BFA]/20 bg-[#FAFAFF] p-8 sm:p-12 shadow-xs transition-all duration-300 hover:border-[#A78BFA] hover:shadow-md"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Left: Info */}
                      <div className="lg:col-span-7">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.badgeBg} text-white shadow-md`}>
                            <Icon className="h-6 w-6 stroke-[2.2]" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-semibold text-[#A78BFA]">
                              0{index + 1}
                            </span>
                            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#24202D]">
                              {service.title}
                            </h2>
                          </div>
                        </div>

                        <p className="text-sm font-semibold text-[#7C3AED] mb-4">
                          {service.tagline}
                        </p>

                        <p className="text-[#706B7D] text-sm sm:text-base leading-relaxed mb-6">
                          {service.fullDescription}
                        </p>

                        {/* Deliverables */}
                        <div className="space-y-2 mb-6">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#30224D]">
                            Key Deliverables:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.deliverables.map((item) => (
                              <div
                                key={item}
                                className="flex items-start gap-2 text-xs sm:text-sm text-[#24202D]"
                              >
                                <CheckCircle2 className="h-4 w-4 text-[#A78BFA] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          <Link
                            href={`/services/${service.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#30224D] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#201535] transition-colors"
                          >
                            <span>Detailed Capabilities & FAQs</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href={`/start-a-project?service=${service.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#A78BFA]/30 bg-[#F2EEFF]/60 px-5 py-2.5 text-xs font-semibold text-[#30224D] hover:bg-[#F2EEFF] transition-colors"
                          >
                            <span>Request This Service</span>
                          </Link>
                        </div>
                      </div>

                      {/* Right: Sub-services checklist */}
                      <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#A78BFA]/15 shadow-xs">
                        <h4 className="font-heading text-sm font-bold text-[#30224D] uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                          Specialized Sub-Services
                        </h4>
                        <ul className="space-y-2.5">
                          {service.subServices.map((sub) => (
                            <li
                              key={sub}
                              className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#24202D] bg-[#FAFAFF] px-3.5 py-2.5 rounded-xl border border-gray-100"
                            >
                              <span>{sub}</span>
                              <span className="h-2 w-2 rounded-full bg-[#A78BFA]" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
