import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SERVICES } from "@/data/services";
import { INITIAL_PROJECTS } from "@/data/projects";
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
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Bot,
  Palette,
  Video,
  Megaphone,
  LifeBuoy,
};

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | AIVSTACK Services`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = ICON_MAP[service.iconName] || Globe;

  // Find related projects if any
  const relatedProjects = INITIAL_PROJECTS.filter((p) =>
    p.category.toLowerCase().includes(service.title.split(" ")[0].toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Service Hero */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 border-b border-[#A78BFA]/15 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EEFF] text-[#30224D] text-xs font-semibold tracking-wider uppercase mb-5">
                <Icon className="h-3.5 w-3.5 text-[#7C3AED]" />
                <span>Service Vertical</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#24202D] tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="mt-4 text-xl font-medium text-[#7C3AED]">
                {service.tagline}
              </p>
              <p className="mt-6 text-base sm:text-lg text-[#706B7D] leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/start-a-project?service=${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#30224D] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#201535] transition-colors shadow-sm"
                >
                  <span>Start a {service.title} Project</span>
                  <ArrowUpRight className="h-4 w-4 text-[#A78BFA]" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-medium text-[#706B7D] hover:bg-gray-50 transition-colors"
                >
                  <span>All Services</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables & Capabilities */}
        <section className="py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Deliverables Card */}
              <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                <h2 className="font-heading text-2xl font-bold text-[#30224D] mb-6 pb-2 border-b border-gray-100">
                  What We Deliver
                </h2>
                <div className="space-y-4">
                  {service.deliverables.map((del) => (
                    <div key={del} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#7C3AED] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-[#24202D] font-medium leading-relaxed">
                        {del}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capabilities & Tech Stack */}
              <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                <h2 className="font-heading text-2xl font-bold text-[#30224D] mb-6 pb-2 border-b border-gray-100">
                  Key Technical Capabilities
                </h2>
                <div className="space-y-4">
                  {service.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-[#A78BFA] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-[#24202D] font-medium leading-relaxed">
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scope / Sub-services breakdown */}
            <div className="mt-12 rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
              <h2 className="font-heading text-2xl font-bold text-[#30224D] mb-6 pb-2 border-b border-gray-100">
                Specializations Included in This Domain
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {service.subServices.map((sub) => (
                  <div
                    key={sub}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFF] border border-gray-100 text-sm font-semibold text-[#24202D]"
                  >
                    <span>{sub}</span>
                    <span className="h-2 w-2 rounded-full bg-[#A78BFA]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-20 bg-white border-y border-[#A78BFA]/15">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                  Common Questions
                </span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-[#24202D]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-6">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#A78BFA]/20 bg-[#FAFAFF] p-6 sm:p-7"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-[#7C3AED] shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading text-base sm:text-lg font-bold text-[#24202D]">
                          {faq.question}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-[#706B7D] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
