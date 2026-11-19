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
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  Code2,
  Terminal,
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
    title: `${service.title} — Capabilities & Architecture | AIVSTACK`,
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
  const relatedProjects = INITIAL_PROJECTS.filter(
    (p) =>
      p.category.toLowerCase().includes(service.title.split(" ")[0].toLowerCase()) ||
      service.capabilities.some((tech) => p.technologyStack.includes(tech))
  ).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-[#00A859] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Navigation Breadcrumb */}
        <div className="border-b border-gray-100 bg-[#FAFAFC] py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#00A859] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all capabilities</span>
            </Link>
          </div>
        </div>

        {/* Editorial Service Header */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00A859]/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Heading & Humanised Narrative */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#00A859] text-xs font-bold uppercase tracking-widest">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{service.tagline}</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-6xl font-black text-gray-950 tracking-tight leading-[1.08] uppercase">
                  {service.title}
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal max-w-2xl">
                  {service.fullDescription}
                </p>

                {/* Scope deliverables checklist */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-gray-400">
                    Tangible Artifacts Produced
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#00A859] shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Quick-Sprint Summary */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 rounded-3xl border border-gray-200 bg-[#FAFAFC] p-6 sm:p-8 space-y-6 shadow-sm">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold">
                    Engagement Profile
                  </span>
                  <div className="font-heading text-xl font-bold text-gray-950 mt-1">
                    Sprint Deployment
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200 text-xs font-medium text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#00A859]" />
                      <span>Timeline:</span>
                    </span>
                    <span className="font-bold text-gray-900">2 – 6 Weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#00A859]" />
                      <span>IP Ownership:</span>
                    </span>
                    <span className="font-bold text-gray-900">100% Client Owned</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="h-4 w-4 text-[#00A859]" />
                      <span>QA Verification:</span>
                    </span>
                    <span className="font-bold text-gray-900">100% Test Suites</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Primary Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.capabilities.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-800 text-xs font-mono font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/start-a-project?service=${service.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A859] hover:bg-[#008f4c] py-3.5 text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Start a Sprint</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Real Relevant Portfolio Showcases */}
        {relatedProjects.length > 0 && (
          <section className="py-16 sm:py-24 bg-[#FAFAFC] border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00A859] font-bold">
                    Proven Output
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-gray-950 mt-1 uppercase">
                    Deliveries In This Vertical
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00A859] hover:underline"
                >
                  <span>All Projects</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/portfolio/${p.slug}`}
                    className="group rounded-2xl bg-white border border-gray-200 p-6 flex flex-col justify-between hover:border-[#00A859] hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                        <span>{p.category}</span>
                        <span>{p.completionDate || "2026"}</span>
                      </div>
                      <h4 className="font-heading text-lg font-bold text-gray-950 group-hover:text-[#00A859] transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {p.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#00A859]">
                      <span>Read Case Study</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
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