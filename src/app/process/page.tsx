import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Sparkles, Search, Compass, PenTool, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Our 5-Step Process | AIVSTACK",
  description:
    "Explore AIVSTACK's systematic 5-step development workflow: Discovery, Planning, Design & Development, Testing & Review, and Delivery & Support.",
};

export default function ProcessPage() {
  const PHASES = [
    {
      step: "01",
      name: "Discovery",
      subtitle: "Understanding Requirements & Strategy",
      icon: Search,
      summary:
        "Every project begins with active listening. We dive deep into your organization's goals, existing pain points, user personas, and technical specifications.",
      activities: [
        "In-depth stakeholder interviews and requirement gathering",
        "Analysis of competitive benchmarks and operational workflows",
        "Technical feasibility study and third-party API assessment",
        "Preliminary timeline, milestone definition, and budget alignment",
      ],
      output: "Approved Project Brief & Scope Summary",
    },
    {
      step: "02",
      name: "Planning",
      subtitle: "Technical Architecture & System Design",
      icon: Compass,
      summary:
        "Before writing a line of production code, we architect the foundation. We map out database schemas, API routes, interactive wireframes, and design design systems.",
      activities: [
        "Relational database schema modeling and normalization",
        "Component design system and high-fidelity Figma prototypes",
        "Security, authentication, and data privacy architecture",
        "Sprint roadmap with clearly defined deliverables",
      ],
      output: "Architecture Specification & Design Prototypes",
    },
    {
      step: "03",
      name: "Design & Development",
      subtitle: "Agile Engineering & Sprint Iterations",
      icon: PenTool,
      summary:
        "Our engineers build your solution using modern, typed stacks (Next.js, Flutter, Python, PostgreSQL). We run iterative sprints with continuous progress visibility.",
      activities: [
        "Modular, typed frontend and responsive layout engineering",
        "Robust server-side APIs, database integration, and microservices",
        "Frequent staging environment previews for stakeholder feedback",
        "Adherence to clean code principles and documentation",
      ],
      output: "Functional Staging Deployment & Modular Codebase",
    },
    {
      step: "04",
      name: "Testing & Review",
      subtitle: "Comprehensive Quality Assurance",
      icon: CheckCircle2,
      summary:
        "We subject the product to thorough multi-device testing, performance profiling, security audits, and real-world edge case validation.",
      activities: [
        "Cross-browser and responsive device verification (Desktop, Tablet, Mobile)",
        "End-to-end form validation, rate-limiting, and error-handling tests",
        "Core Web Vitals and Lighthouse speed optimization",
        "Client acceptance testing (UAT) and revision implementation",
      ],
      output: "QA Verification Report & Launch-Ready Candidate",
    },
    {
      step: "05",
      name: "Delivery & Support",
      subtitle: "Production Deployment & Ongoing Evolution",
      icon: ShieldCheck,
      summary:
        "We execute a flawless production release, configure domain DNS, establish automated backups, and provide ongoing technical maintenance.",
      activities: [
        "Production server provisioning (Vercel, AWS, Cloudflare, Database)",
        "Domain DNS mapping, SSL certification, and email routing",
        "Administrative onboarding and CMS walkthrough documentation",
        "Dedicated maintenance retainers, security patches, and upgrades",
      ],
      output: "Live Production Product & Admin Handover",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-24 border-b border-[#A78BFA]/15 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#24202D] tracking-tight leading-tight">
                Our 5-Step{" "}
                <span className="bg-gradient-to-r from-[#30224D] via-[#6D28D9] to-[#A78BFA] bg-clip-text text-transparent">
                  Development Process.
                </span>
              </h1>
              <p className="mt-6 text-lg text-[#706B7D] leading-relaxed">
                We believe that reliable digital products are born from structured discipline.
                Our five-stage workflow eliminates ambiguity, aligns expectations, and ensures predictable,
                high-quality software delivery.
              </p>
            </div>
          </div>
        </section>

        {/* 5-Step Deep Dive */}
        <section className="py-20 bg-[#FAFAFF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {PHASES.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div
                    key={phase.step}
                    className="rounded-3xl border border-[#A78BFA]/20 bg-white p-8 sm:p-12 shadow-xs"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Left: Step Info */}
                      <div className="lg:col-span-6">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-mono text-3xl sm:text-4xl font-bold text-[#A78BFA]">
                            {phase.step}
                          </span>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2EEFF] text-[#30224D]">
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>

                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#24202D]">
                          {phase.name}
                        </h2>
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED] mt-1 mb-4">
                          {phase.subtitle}
                        </div>

                        <p className="text-[#706B7D] text-base leading-relaxed mb-6">
                          {phase.summary}
                        </p>

                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F2EEFF] text-[#30224D] text-xs font-bold">
                          <span>Key Deliverable:</span>
                          <span className="text-[#7C3AED]">{phase.output}</span>
                        </div>
                      </div>

                      {/* Right: Activities list */}
                      <div className="lg:col-span-6 bg-[#FAFAFF] rounded-2xl p-6 sm:p-8 border border-gray-100">
                        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#30224D] mb-4 pb-2 border-b border-gray-200">
                          Execution Checklist
                        </h3>
                        <ul className="space-y-3">
                          {phase.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-[#24202D]">
                              <CheckCircle2 className="h-4 w-4 text-[#A78BFA] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{act}</span>
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
