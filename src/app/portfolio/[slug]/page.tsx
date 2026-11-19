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
} from "lucide-react";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study | AIVSTACK`,
    description: project.shortDescription,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = INITIAL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified Commercial Delivery
          </span>
        );
      case "In Development":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Clock className="h-3.5 w-3.5" />
            Currently In Development
          </span>
        );
      case "Concept / Prototype":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
            <Lightbulb className="h-3.5 w-3.5" />
            Internal Concept / Prototype
          </span>
        );
      case "Completed – Not Publicly Deployed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />
            Completed – Not Publicly Deployed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200">
            {status}
          </span>
        );
    }
  };

  const related = INITIAL_PROJECTS.filter(
    (p) => p.category === project.category && p.slug !== project.slug
  ).slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-20 border-b border-[#A78BFA]/15 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#706B7D] hover:text-[#30224D] transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio Gallery</span>
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED] bg-[#F2EEFF] px-3 py-1 rounded-md">
                  {project.category}
                </span>
                {getStatusBadge(project.projectStatus)}
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#24202D] tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="mt-5 text-lg text-[#706B7D] leading-relaxed">
                {project.shortDescription}
              </p>

              {/* Project Meta details */}
              <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-gray-100 text-sm">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                    Client / Organization
                  </span>
                  <span className="font-semibold text-[#24202D]">
                    {project.clientName || "Confidential Client"}
                  </span>
                </div>
                {project.completionDate && (
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                      Timeline
                    </span>
                    <span className="font-semibold text-[#24202D]">
                      {project.completionDate}
                    </span>
                  </div>
                )}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#706B7D]">
                    Deliverables
                  </span>
                  <span className="font-semibold text-[#24202D]">
                    Full Architecture & Deployment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Core Deep-Dive */}
        <section className="py-16 sm:py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Content Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* 1. Overview */}
                <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                  <h2 className="font-heading text-2xl font-bold text-[#30224D] mb-4">
                    Project Overview
                  </h2>
                  <p className="text-base text-[#706B7D] leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* 2. Problem & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-3xl border border-red-100 bg-white p-8 shadow-xs">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-4">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#24202D] mb-3">
                      The Challenge
                    </h3>
                    <p className="text-sm text-[#706B7D] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-xs">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#24202D] mb-3">
                      Our Solution
                    </h3>
                    <p className="text-sm text-[#706B7D] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* 3. Key Architectural Features */}
                <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                  <h2 className="font-heading text-2xl font-bold text-[#30224D] mb-6">
                    Key Features & Capabilities
                  </h2>
                  <div className="space-y-4">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#7C3AED] shrink-0 mt-0.5" />
                        <span className="text-base font-medium text-[#24202D]">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Real Mobile Screenshots Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-10 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div>
                        <h2 className="font-heading text-2xl font-bold text-[#30224D]">
                          Application UI & Workflow Gallery
                        </h2>
                        <p className="text-sm text-[#706B7D] mt-1">
                          Verified production mobile screens captured from native Android execution.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-[#7C3AED] bg-[#F2EEFF] px-3.5 py-1.5 rounded-full">
                        <Smartphone className="h-3.5 w-3.5" />
                        <span>{project.galleryImages.length} Screens Verified</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                      {project.galleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#A78BFA] hover:-translate-y-1"
                        >
                          <div className="aspect-[9/19.5] relative w-full overflow-hidden bg-[#0F172A]/5">
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${idx + 1}`}
                              fill
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-104"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            />
                          </div>
                          <div className="p-2 text-center bg-white border-t border-gray-100">
                            <span className="text-[11px] font-semibold text-[#706B7D] group-hover:text-[#7C3AED] transition-colors">
                              Screen #{idx + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-4 space-y-8">
                {/* QA Verification Certificate Box (If supplied) */}
                {project.qaMetrics && (
                  <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-white p-7 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-800 mb-4 pb-2 border-b border-emerald-100">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                      <h3 className="font-heading text-base font-bold">
                        QA Verification Report
                      </h3>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between py-1 border-b border-emerald-100/60">
                        <span className="text-emerald-900/70 font-medium">Test Suites:</span>
                        <span className="font-bold text-emerald-950">{project.qaMetrics.testSuites} Suites</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-emerald-100/60">
                        <span className="text-emerald-900/70 font-medium">Tests Passed:</span>
                        <span className="font-bold text-emerald-600">{project.qaMetrics.testsPassed} / {project.qaMetrics.testsPassed} (100%)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-emerald-100/60">
                        <span className="text-emerald-900/70 font-medium">Tests Failed:</span>
                        <span className="font-bold text-emerald-950">{project.qaMetrics.testsFailed}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-emerald-100/60">
                        <span className="text-emerald-900/70 font-medium">flutter analyze:</span>
                        <span className="font-bold text-emerald-700">{project.qaMetrics.analyzeStatus}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-emerald-900/70 font-medium">Toolchain:</span>
                        <span className="font-bold text-emerald-950">{project.qaMetrics.flutterVersion} • {project.qaMetrics.dartVersion}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Deployment Lifecycle Status Box */}
                {project.deploymentDetails && (
                  <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/60 via-white to-white p-7 shadow-xs">
                    <div className="flex items-center gap-2 text-blue-900 mb-4 pb-2 border-b border-blue-100">
                      <Terminal className="h-5 w-5 text-blue-600" />
                      <h3 className="font-heading text-base font-bold">
                        Lifecycle & Distribution
                      </h3>
                    </div>
                    <div className="space-y-2.5 text-xs text-blue-950">
                      <div>
                        <span className="text-blue-900/70 block">Development:</span>
                        <span className="font-semibold text-emerald-700">✓ {project.deploymentDetails.development}</span>
                      </div>
                      <div>
                        <span className="text-blue-900/70 block">Testing:</span>
                        <span className="font-semibold text-emerald-700">✓ {project.deploymentDetails.testing}</span>
                      </div>
                      <div>
                        <span className="text-blue-900/70 block">Private Distribution:</span>
                        <span className="font-semibold text-[#30224D]">{project.deploymentDetails.distribution}</span>
                      </div>
                      <div>
                        <span className="text-blue-900/70 block">Usage Status:</span>
                        <span className="font-semibold text-[#30224D]">{project.deploymentDetails.usage}</span>
                      </div>
                      <div>
                        <span className="text-blue-900/70 block">Google Play Store:</span>
                        <span className="font-semibold text-amber-800">{project.deploymentDetails.playStore}</span>
                      </div>
                      <div>
                        <span className="text-blue-900/70 block">Signing Configuration:</span>
                        <span className="font-semibold text-gray-700">{project.deploymentDetails.signing}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech Stack Box */}
                <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-7 shadow-xs">
                  <h3 className="font-heading text-lg font-bold text-[#30224D] mb-4 pb-2 border-b border-gray-100">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologyStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#F2EEFF] text-[#30224D] text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Brief CTA Box */}
                <div className="rounded-3xl border border-[#A78BFA]/30 bg-gradient-to-br from-[#30224D] to-[#201535] p-7 text-white shadow-md">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    Need a Similar Solution?
                  </h3>
                  <p className="text-sm text-[#C4B5FD] mb-6 leading-relaxed">
                    We can tailor an architecture specifically for your operational requirements.
                  </p>
                  <Link
                    href={`/start-a-project?reference=${encodeURIComponent(project.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#30224D] hover:bg-[#F2EEFF] transition-colors"
                  >
                    <span>Start a Similar Project</span>
                    <ArrowUpRight className="h-4 w-4 text-[#7C3AED]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            {related.length > 0 && (
              <div className="mt-20 pt-12 border-t border-[#A78BFA]/20">
                <h3 className="font-heading text-2xl font-bold text-[#24202D] mb-8">
                  Related Projects in {project.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {related.map((rel) => (
                    <div
                      key={rel.id}
                      className="rounded-3xl border border-[#A78BFA]/20 bg-white p-7 shadow-xs hover:shadow-md transition-all duration-300"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED] bg-[#F2EEFF] px-2.5 py-1 rounded-md">
                        {rel.category}
                      </span>
                      <h4 className="font-heading text-xl font-bold text-[#24202D] mt-3">
                        {rel.title}
                      </h4>
                      <p className="text-sm text-[#706B7D] mt-2 line-clamp-2">
                        {rel.shortDescription}
                      </p>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end">
                        <Link
                          href={`/portfolio/${rel.slug}`}
                          className="text-xs font-semibold text-[#7C3AED] hover:underline inline-flex items-center gap-1"
                        >
                          View Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
