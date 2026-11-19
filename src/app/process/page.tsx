"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import {
  Search,
  Compass,
  Code2,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  Clock,
  FileCode2,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  {
    step: "01",
    title: "Discovery & Scope Blueprint",
    subtitle: "Understanding Requirements & Strategy",
    duration: "Week 1",
    icon: Search,
    color: "from-indigo-600 to-purple-600",
    summary:
      "We begin with active listening and deep technical interrogation. We define user personas, map user flows, audit existing software APIs, and establish rigid business goals.",
    deliverables: [
      "Technical Scope & Architecture Brief",
      "Interactive User Flow Wireframes",
      "API & Third-Party Integration Matrix",
      "Fixed Sprint Milestone Schedule",
    ],
    roles: ["Lead Solutions Architect", "Product Designer"],
    clientCheckpoint: "Scope sign-off & fixed sprint timeline alignment",
  },
  {
    step: "02",
    title: "System Design & Architecture",
    subtitle: "Database Schemas & High-Fidelity UI",
    duration: "Week 2",
    icon: Compass,
    color: "from-purple-600 to-fuchsia-600",
    summary:
      "Before writing production code, we lay down robust foundations. We construct relational or NoSQL database schemas, design modular Figma component systems, and design auth boundaries.",
    deliverables: [
      "High-Fidelity Figma Component System",
      "Normalized Database Schemas & Migrations",
      "API Contract Specifications (OpenAPI / Swagger)",
      "Security & Data Sovereignty Plan",
    ],
    roles: ["Principal Engineer", "Senior UI/UX Designer"],
    clientCheckpoint: "Interactive Figma prototype walkthrough & architectural approval",
  },
  {
    step: "03",
    title: "High-Velocity Agile Engineering",
    subtitle: "Clean Code & Bi-Weekly Sprints",
    duration: "Weeks 3 – 5",
    icon: Code2,
    color: "from-fuchsia-600 to-pink-600",
    summary:
      "Our senior engineers write clean, typed code in focused 2-week sprint cycles. We provide staging URL previews and daily Slack/Loom progress updates so you never wonder where things stand.",
    deliverables: [
      "Modular, Typed Next.js / Flutter Codebase",
      "Secured API Endpoints & Serverless Handlers",
      "Live Private Staging Preview Deployments",
      "Daily Async Loom / Pull-Request Walkthroughs",
    ],
    roles: ["Senior Full-Stack Engineers", "Mobile Lead"],
    clientCheckpoint: "Weekly staging demos with real, testable software",
  },
  {
    step: "04",
    title: "Rigorous QA & Edge Verification",
    subtitle: "Zero-Fluff Automated Testing",
    duration: "Week 6",
    icon: CheckCircle2,
    color: "from-pink-600 to-rose-600",
    summary:
      "We subject your application to automated unit test suites, multi-device cross-browser validation, accessibility audits, and real-world network edge condition testing.",
    deliverables: [
      "100% Automated Test Suite Report",
      "Lighthouse 95+ Core Web Vitals Audit",
      "Cross-Device Verification (iOS, Android, Web)",
      "Security Penetration & Input Sanitation Review",
    ],
    roles: ["QA Automation Engineer", "Performance Specialist"],
    clientCheckpoint: "Comprehensive QA report review and final UAT approval",
  },
  {
    step: "05",
    title: "Production Launch & Handover",
    subtitle: "Zero-Downtime Deployment & Evolution",
    duration: "Ongoing",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-600",
    summary:
      "We orchestrate smooth production DNS cuts, cloud deployments, Search Console indexation, and full IP handover. Then we monitor telemetry to ensure peak real-world uptime.",
    deliverables: [
      "100% IP & Git Repository Full Ownership",
      "Automated CI/CD Pipeline Configuration",
      "Production Cloud Deployment & SSL / DNS Cut",
      "30-Day Post-Launch Warranty & Support",
    ],
    roles: ["DevOps Engineer", "Account Lead"],
    clientCheckpoint: "Final keys handover and ongoing growth roadmap",
  },
];

export default function ProcessPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activePhase = PHASES[activeStepIndex];

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-[#00A859] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-gradient-to-br from-[#00A859]/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#00A859] text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The AIVSTACK Sprint Methodology</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-gray-950 tracking-tight leading-[1.08] uppercase">
                Predictable sprints. <br />
                <span className="text-[#00A859]">Zero guesswork.</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                We believe true craftsmanship requires a structured, repeatable delivery model.
                Every phase has clear deliverables, tangible artifacts, and direct engineer accountability.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Sprint Pipeline Stage Explorer */}
        <section className="py-16 sm:py-24 bg-[#FAFAFC] border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Step Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
              {PHASES.map((phase, idx) => {
                const isActive = activeStepIndex === idx;
                const Icon = phase.icon;

                return (
                  <button
                    key={phase.step}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 border flex flex-col justify-between ${
                      isActive
                        ? "bg-white border-[#00A859] shadow-lg shadow-emerald-950/5 ring-1 ring-[#00A859] -translate-y-1"
                        : "bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-mono text-xs font-bold ${isActive ? "text-[#00A859]" : "text-gray-400"}`}>
                        {phase.step}
                      </span>
                      <Icon className={`h-4 w-4 ${isActive ? "text-[#00A859]" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <div className="font-heading text-sm font-bold text-gray-950 truncate">
                        {phase.title.split(" ")[0]}
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                        {phase.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Stage Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left Column: Narrative */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#00A859] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 uppercase">
                        Phase {activePhase.step} • {activePhase.duration}
                      </span>
                      <span className="text-xs font-medium text-gray-400">
                        {activePhase.subtitle}
                      </span>
                    </div>

                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-950 uppercase leading-snug">
                      {activePhase.title}
                    </h2>

                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                      {activePhase.summary}
                    </p>

                    {/* Client Checkpoint Box */}
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-[#00A859] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                          Client Checkpoint
                        </span>
                        <span className="text-xs sm:text-sm text-emerald-950 font-medium mt-0.5 block">
                          {activePhase.clientCheckpoint}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Tangible Deliverables & Roles */}
                  <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200/80 space-y-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                        Tangible Artifacts Produced
                      </h4>
                      <ul className="space-y-3">
                        {activePhase.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                            <CheckCircle2 className="h-4 w-4 text-[#00A859] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                        Squad Members Assigned
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activePhase.roles.map((role) => (
                          <span
                            key={role}
                            className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-800 text-xs font-mono font-semibold"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Our Guarantees Section */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00A859] font-bold">
                Standards of Excellence
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-gray-950 mt-2 tracking-tight uppercase">
                The AIVSTACK Engineering Pledge
              </h2>
              <p className="mt-4 text-base text-gray-600">
                Non-negotiable technical standards enforced on every sprint and deliverable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-[#00A859] flex items-center justify-center font-bold">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-950">
                  100% Code & IP Ownership
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  You own every line of code, design file, and database migration from day one. Zero proprietary vendor lock-in or licensing fees.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-[#00A859] flex items-center justify-center font-bold">
                  <Terminal className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-950">
                  Automated QA & Test Coverage
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We don't ship untested code. Automated unit, integration, and static analysis pipelines run on every pull request before deployment.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-[#00A859] flex items-center justify-center font-bold">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-950">
                  Async Visibility & Direct Access
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Communicate directly with your lead engineers on Slack. Receive short Loom demo videos on every sprint release.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}