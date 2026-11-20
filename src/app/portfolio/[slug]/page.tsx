import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { INITIAL_PROJECTS, ProjectStatus } from "@/data/projects";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Lightbulb,
  Sparkles,
  Layers,
  Cpu,
  Target,
  ShieldCheck,
  Terminal,
  Smartphone,
  Lock,
  Calendar,
  ExternalLink,
} from "lucide-react";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = INITIAL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
  slugs.push({ slug: "fundraising-website" });
  return slugs;
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = INITIAL_PROJECTS.find(
    (p) => p.slug === slug || (slug === "fundraising-website" && p.slug === "community-fund-portal")
  );
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Architectural Case Study | AIVSTACK`,
    description: project.shortDescription,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = INITIAL_PROJECTS.find(
    (p) => p.slug === slug || (slug === "fundraising-website" && p.slug === "community-fund-portal")
  );

  if (!project) {
    notFound();
  }

  // Find next project in list for bottom navigation
  const currentIndex = INITIAL_PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = INITIAL_PROJECTS[(currentIndex + 1) % INITIAL_PROJECTS.length];

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00A859] text-xs font-bold border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified Commercial Delivery
          </span>
        );
      case "In Development":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Clock className="h-3.5 w-3.5" />
            Active Sprint Cycle
          </span>
        );
      case "Concept / Prototype":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
            <Lightbulb className="h-3.5 w-3.5" />
            R&D Innovation Lab
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-[#00A859] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Back Link Bar */}
        <div className="border-b border-gray-100 bg-[#FAFAFC] py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#00A859] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all projects</span>
            </Link>
          </div>
        </div>

        {/* Editorial Case Study Hero */}
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00A859]/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00A859] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  {project.category}
                </span>
                {getStatusBadge(project.projectStatus)}
                <span className="text-xs font-mono font-bold text-gray-400">
                  // {project.completionDate || "2026"}
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-gray-950 tracking-tight leading-[1.08] uppercase">
                {project.title}
              </h1>

              <p className="text-lg sm:text-2xl text-gray-600 leading-relaxed font-normal">
                {project.shortDescription}
              </p>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100 text-xs">
                <div>
                  <span className="block font-mono uppercase tracking-wider text-gray-400 font-bold">
                    Client / Organization
                  </span>
                  <span className="font-heading text-sm font-bold text-gray-900 mt-1 block">
                    {project.clientName || "Proprietary"}
                  </span>
                </div>
                <div>
                  <span className="block font-mono uppercase tracking-wider text-gray-400 font-bold">
                    Timeline
                  </span>
                  <span className="font-heading text-sm font-bold text-gray-900 mt-1 block">
                    {project.completionDate || "Continuous"}
                  </span>
                </div>
                <div>
                  <span className="block font-mono uppercase tracking-wider text-gray-400 font-bold">
                    Core Architecture
                  </span>
                  <span className="font-heading text-sm font-bold text-gray-900 mt-1 block">
                    {project.technologyStack.slice(0, 2).join(" • ")}
                  </span>
                </div>
                <div>
                  <span className="block font-mono uppercase tracking-wider text-gray-400 font-bold">
                    Release State
                  </span>
                  <span className="font-heading text-sm font-bold text-[#00A859] mt-1 block">
                    Production Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Deep Dive Breakdown */}
        <section className="py-16 sm:py-24 bg-[#FAFAFC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Main Narrative Column */}
              <div className="lg:col-span-8 space-y-12">
                {/* 1. Overview */}
                <div className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-10 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00A859]">
                    <Layers className="h-4 w-4" />
                    <span>01. Project Brief & Overview</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-gray-950 uppercase">
                    The Objective
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed font-normal">
                    {project.overview}
                  </p>
                </div>

                {/* 2. Challenge vs Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-3xl bg-white border border-red-200/70 p-8 shadow-sm space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-950">
                      The Challenge
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white border border-emerald-200/70 p-8 shadow-sm space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#00A859] flex items-center justify-center font-bold">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-950">
                      Engineering Solution
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* 3. Features & Architecture Checklist */}
                <div className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-10 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00A859]">
                    <Sparkles className="h-4 w-4" />
                    <span>02. Architectural Features</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-gray-950 uppercase">
                    Core Capabilities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <CheckCircle2 className="h-4 w-4 text-[#00A859] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Production UI/UX Screenshots Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <div className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-10 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00A859]">
                          <Smartphone className="h-4 w-4" />
                          <span>03. Verified Interface Artifacts</span>
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-black text-gray-950 mt-1 uppercase">
                          UI/UX Production Gallery
                        </h2>
                      </div>
                      <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-[#00A859] text-xs font-bold border border-emerald-200/60">
                        {project.galleryImages.length} Native Screens
                      </span>
                    </div>

                    {(() => {
                      const isMobileApp = project.category.toLowerCase().includes("mobile");
                      return (
                        <div
                          className={`grid gap-6 ${
                            isMobileApp
                              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                              : "grid-cols-1 md:grid-cols-2"
                          }`}
                        >
                          {project.galleryImages.map((img, idx) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-sm hover:shadow-xl hover:border-[#00A859] transition-all duration-300"
                            >
                              <div
                                className={`${
                                  isMobileApp ? "aspect-[9/19.5]" : "aspect-[16/10]"
                                } relative w-full overflow-hidden bg-gray-50`}
                              >
                                <Image
                                  src={img}
                                  alt={`${project.title} screenshot ${idx + 1}`}
                                  fill
                                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                              </div>
                              <div className="p-3 text-center bg-white border-t border-gray-100">
                                <span className="text-xs font-mono font-bold text-gray-500 group-hover:text-[#00A859] transition-colors">
                                  {idx === 0 && !isMobileApp
                                    ? "Administrative Dashboard"
                                    : idx === 1 && !isMobileApp
                                    ? "Finance & Treasury Custody"
                                    : `Screen #${idx + 1}`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Sticky Sidebar: QA Certificate & Stack Specs */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
                {/* Verified QA Report Certificate */}
                {project.qaMetrics && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7 space-y-5 shadow-sm">
                    <div className="flex items-center gap-2.5 pb-4 border-b border-emerald-200/60">
                      <ShieldCheck className="h-5 w-5 text-[#00A859]" />
                      <div>
                        <h4 className="font-heading text-sm font-bold text-gray-950 uppercase">
                          QA Telemetry Report
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-700">VERIFIED AUTOMATED TEST PASS</span>
                      </div>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between py-1 border-b border-emerald-100">
                        <span className="text-gray-500">Test Suites:</span>
                        <span className="font-bold text-gray-900">{project.qaMetrics.testSuites} Suites</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-emerald-100">
                        <span className="text-gray-500">Tests Passed:</span>
                        <span className="font-bold text-[#00A859]">{project.qaMetrics.testsPassed} Passed (100%)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-emerald-100">
                        <span className="text-gray-500">Failed Tests:</span>
                        <span className="font-bold text-gray-900">{project.qaMetrics.testsFailed}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-emerald-100">
                        <span className="text-gray-500">Static Analysis:</span>
                        <span className="font-bold text-emerald-700">{project.qaMetrics.analyzeStatus}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-500">SDK Toolchain:</span>
                        <span className="font-bold text-gray-900">
                          {project.qaMetrics.flutterVersion ||
                            project.qaMetrics.frameworkVersion ||
                            "Production Stack"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech Stack Spec Box */}
                <div className="rounded-3xl bg-white border border-gray-200 p-7 space-y-4 shadow-sm">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-gray-400">
                    Technology Manifest
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologyStack.map((t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-gray-800 font-mono text-xs font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Start a Sprint CTA Box */}
                <div className="rounded-3xl bg-gradient-to-br from-[#0B3B24] via-[#104830] to-[#0A2617] p-8 text-white space-y-4 shadow-xl border border-[#00A859]/30">
                  <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                    Build Similar Architecture
                  </span>
                  <h3 className="font-heading text-xl font-black text-white uppercase leading-snug">
                    Need a system engineered like this?
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    Our team can architect, build, and test a tailored system for your exact requirements.
                  </p>
                  <Link
                    href={`/start-a-project?reference=${encodeURIComponent(project.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A859] hover:bg-[#008f4c] py-3.5 text-xs font-bold text-white uppercase tracking-wider transition-all shadow-md"
                  >
                    <span>Request Technical Proposal</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Next Project Magnetic Navigation Footer */}
            <div className="mt-20 pt-12 border-t border-gray-200">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold block mb-4">
                Next Case Study
              </span>
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#00A859] hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#00A859]">
                    {nextProject.category} // {nextProject.completionDate || "2026"}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-4xl font-black text-gray-950 mt-1 group-hover:text-[#00A859] transition-colors uppercase">
                    {nextProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl">
                    {nextProject.shortDescription}
                  </p>
                </div>

                <div className="h-12 w-12 rounded-full bg-gray-100 group-hover:bg-[#00A859] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}