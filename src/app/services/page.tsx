"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SERVICES, ServiceCategory } from "@/data/services";
import {
  Globe,
  Smartphone,
  Bot,
  Palette,
  Video,
  Megaphone,
  LifeBuoy,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Clock,
  Layers,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Bot,
  Palette,
  Video,
  Megaphone,
  LifeBuoy,
};

const CATEGORIES = [
  { id: "all", label: "All Disciplines" },
  { id: "engineering", label: "Core Engineering", slugs: ["web-development", "software-app-development"] },
  { id: "ai", label: "AI & Intelligence", slugs: ["ai-automation"] },
  { id: "design", label: "Creative & Brand", slugs: ["graphic-design-branding", "video-creative-production"] },
  { id: "growth", label: "Growth & Support", slugs: ["digital-marketing", "technical-support-maintenance"] },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>("web-development");

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === "all") return true;
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    return cat?.slugs?.includes(s.slug);
  });

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-[#00A859] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-gray-100 overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-br from-[#00A859]/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#00A859] text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Capabilities & Engineering Disciplines</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-gray-950 tracking-tight leading-[1.08] uppercase"
              >
                We build what others <br />
                <span className="text-[#00A859]">deem complex.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed"
              >
                No bloated agency layers or generic AI templates. Just direct collaboration with senior engineers,
                delivering robust digital platforms in fast, milestone-driven sprints.
              </motion.p>

              {/* Quick Filter Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-[#00A859] text-white shadow-md shadow-emerald-500/20"
                        : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Services Showcase List */}
        <section className="py-16 sm:py-24 bg-[#FAFAFC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {filteredServices.map((service, idx) => {
                const Icon = SERVICE_ICONS[service.iconName] || Code2;
                const isExpanded = expandedSlug === service.slug;

                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className={`rounded-[28px] border bg-white transition-all duration-500 overflow-hidden ${
                      isExpanded
                        ? "border-[#00A859] shadow-xl shadow-emerald-950/5 ring-1 ring-[#00A859]"
                        : "border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {/* Header Row (Click to toggle) */}
                    <div
                      onClick={() => setExpandedSlug(isExpanded ? null : service.slug)}
                      className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none group"
                    >
                      <div className="flex items-start sm:items-center gap-5">
                        <div
                          className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                            isExpanded
                              ? "bg-[#00A859] text-white shadow-lg shadow-emerald-500/25"
                              : "bg-emerald-50 text-[#00A859] border border-emerald-200/50"
                          }`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-gray-400">
                              0{idx + 1}
                            </span>
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#00A859] font-bold">
                              {service.tagline}
                            </span>
                          </div>
                          <h3 className="font-heading text-xl sm:text-2xl font-black text-gray-950 mt-1 group-hover:text-[#00A859] transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Brief description + Expand Icon */}
                      <div className="flex items-center justify-between md:justify-end gap-6 md:max-w-md w-full">
                        <p className="text-sm text-gray-500 line-clamp-2 hidden sm:block">
                          {service.shortDescription}
                        </p>
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center border transition-transform duration-300 shrink-0 ${
                            isExpanded
                              ? "bg-[#00A859] text-white border-[#00A859] rotate-180"
                              : "border-gray-200 text-gray-400 group-hover:border-gray-300 group-hover:text-gray-900"
                          }`}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Deep-Dive Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="border-t border-gray-100 bg-gray-50/50 p-6 sm:p-8 md:p-10"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            {/* Left: What We Deliver */}
                            <div className="lg:col-span-7 space-y-6">
                              <div>
                                <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                                  Scope of Deliverables
                                </h4>
                                <p className="text-base text-gray-700 leading-relaxed font-medium">
                                  {service.fullDescription}
                                </p>
                              </div>

                              <div className="pt-2">
                                <h5 className="font-heading text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                                  Tangible Artifacts
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {service.deliverables.map((item, fIdx) => (
                                    <div
                                      key={fIdx}
                                      className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-[#00A859] shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right: Technical Stack & Direct Engagement */}
                            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                              <div>
                                <h5 className="font-heading text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                                  Technologies & Architecture
                                </h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {service.capabilities.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-mono text-xs font-semibold"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-[#00A859]" />
                                    <span>Typical Sprint Cycle:</span>
                                  </span>
                                  <span className="font-bold text-gray-900">2 – 6 Weeks</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                                  <span className="flex items-center gap-1.5">
                                    <ShieldCheck className="h-3.5 w-3.5 text-[#00A859]" />
                                    <span>Code Ownership:</span>
                                  </span>
                                  <span className="font-bold text-gray-900">100% Client-Owned</span>
                                </div>
                              </div>

                              <div className="pt-2 flex items-center gap-3">
                                <Link
                                  href={`/start-a-project?service=${service.slug}`}
                                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A859] hover:bg-[#008f4c] py-3 text-xs font-bold text-white uppercase tracking-wider transition-colors shadow-md"
                                >
                                  <span>Request Quote</span>
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <span>Deep Dive</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Humanised Comparison: The Anti-Agency Model */}
        <section className="py-20 sm:py-28 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00A859] font-bold">
                Transparent Engagement
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-gray-950 mt-2 tracking-tight uppercase">
                The Anti-Agency Difference
              </h2>
              <p className="mt-4 text-base text-gray-600">
                Why forward-thinking founders and enterprise teams choose our agile engineering model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Traditional Agency Card */}
              <div className="rounded-3xl p-8 sm:p-10 bg-gray-50 border border-gray-200 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                  Traditional Agencies
                </div>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Layers of non-technical account managers filtering communications.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>6-month bloated timelines with endless discovery decks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Junior developers doing the work while billing senior rates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>Vendor lock-in with proprietary closed hosting environments.</span>
                  </li>
                </ul>
              </div>

              {/* AIVSTACK Model */}
              <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0B3B24] to-[#0A2617] text-white border border-[#00A859]/30 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A859]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="inline-block px-3 py-1 rounded-full bg-[#00A859] text-white text-xs font-bold uppercase tracking-wider">
                  AIVSTACK Sprints
                </div>
                <ul className="space-y-4 text-sm text-emerald-100">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#00A859] shrink-0 mt-0.5" />
                    <span>Direct collaboration with senior engineers on Slack & GitHub.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#00A859] shrink-0 mt-0.5" />
                    <span>Rapid 2 to 4-week iterative production releases.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#00A859] shrink-0 mt-0.5" />
                    <span>100% test-verified code with documented architectures.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#00A859] shrink-0 mt-0.5" />
                    <span>Full IP and source code repository ownership transferred on day one.</span>
                  </li>
                </ul>
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