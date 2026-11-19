"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Calendar,
  Sparkles,
  Terminal,
  Globe,
  Database,
  PieChart,
  CheckCircle2,
  Code2,
  Cpu,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function InsightsSection() {
  const [activeCategory, setActiveCategory] = useState("All Topics");

  const CATEGORIES = [
    "All Topics",
    "Mobile & AI",
    "Web Architecture",
    "Database Engineering",
    "Fintech & UX",
  ];

  const FEATURED_STORY = {
    title: "Why We Built an Offline-First AI Assistant in Flutter Without Cloud Dependencies",
    category: "Mobile & AI",
    date: "Nov 18, 2026",
    readTime: "5 min read",
    author: "AIVSTACK Core Architecture Team",
    excerpt:
      "Modern finance applications transmit sensitive user behavior to cloud brokers. In this architectural deep dive, we explore how deterministic on-device NLP processing in Dart executes natural language queries in <5ms with 100% data sovereignty.",
    codeSnippet: `// On-device deterministic NLP evaluation
final intent = await localAiEngine.resolve(
  query: "ബാലൻസ് എത്രയുണ്ട്?",
  locale: AppLocale.malayalam,
);
// Executed in 4.2ms • 0 bytes transmitted`,
    slug: "personal-money-manager",
  };

  const SECONDARY_STORIES = [
    {
      id: "story-1",
      title: "Next.js 16 & Serverless: Architecting Ultra-Fast Enterprise Portals",
      category: "Web Architecture",
      icon: Globe,
      date: "Nov 12, 2026",
      readTime: "4 min read",
      metric: "TTFB < 45ms • Zero Cold-Start",
      excerpt:
        "Leveraging incremental static regeneration, edge runtime workers, and typed route handlers to eliminate database round-trip bottlenecks.",
      slug: "apex-erp-operations-platform",
    },
    {
      id: "story-2",
      title: "Designing Resilient SQLite Schemas for High-Concurrency Mobile Apps",
      category: "Database Engineering",
      icon: Database,
      date: "Nov 04, 2026",
      readTime: "6 min read",
      metric: "ACID Guaranteed • WAL Mode",
      excerpt:
        "Techniques for zero-data-loss mobile apps using atomic dual-account transfer transactions, write-ahead logging, and foreign key cascades.",
      slug: "personal-money-manager",
    },
    {
      id: "story-3",
      title: "The 50/30/20 Budgeting Algorithm: Translating Financial Rules into Code",
      category: "Fintech & UX",
      icon: PieChart,
      date: "Oct 28, 2026",
      readTime: "4 min read",
      metric: "50% Needs • 30% Wants • 20% Save",
      excerpt:
        "How programmatic budget guardrails and progressive visual feedback prevent consumer cash leakage without creating cognitive fatigue.",
      slug: "personal-money-manager",
    },
  ];

  const filteredSecondary =
    activeCategory === "All Topics"
      ? SECONDARY_STORIES
      : SECONDARY_STORIES.filter((s) => s.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block with Topic Filter Chips */}
        <MotionReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00A859]">
                  ENGINEERING KNOWLEDGE & INNOVATION
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.12]">
                From Our Tech Journal
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
                Architectural breakdowns, engineering decisions, and research case studies authored by AIVSTACK developers.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#00A859] text-white shadow-sm shadow-emerald-600/20 font-bold"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </MotionReveal>

        {/* Asymmetric Editorial Grid (Lead Story on Left, Curated Feed on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lead Featured Story (7 Columns) */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.1}>
              <div className="group rounded-[32px] border border-gray-200/90 bg-white p-7 sm:p-9 shadow-sm hover:shadow-2xl hover:border-[#00A859]/50 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Lead Story Top Metadata & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E6F7EF] text-[#00A859]">
                        {FEATURED_STORY.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Sparkles className="h-3 w-3 text-[#00A859]" />
                        <span>Featured Breakdown</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{FEATURED_STORY.date}</span>
                      <span>•</span>
                      <Clock className="h-3.5 w-3.5" />
                      <span>{FEATURED_STORY.readTime}</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-gray-950 group-hover:text-[#00A859] transition-colors leading-tight mb-4">
                    {FEATURED_STORY.title}
                  </h3>

                  {/* Narrative Excerpt */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    {FEATURED_STORY.excerpt}
                  </p>

                  {/* High-Tech Terminal / Code Architecture Preview */}
                  <div className="rounded-2xl bg-[#0B1510] border border-emerald-900/40 p-4 sm:p-5 font-mono text-xs text-emerald-300 shadow-inner relative overflow-hidden group-hover:border-[#00A859]/60 transition-colors mb-6">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-900/40 text-[11px] text-emerald-400/80">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                        <span className="ml-2 text-gray-400 font-sans text-[11px]">
                          local_nlp_engine.dart
                        </span>
                      </div>
                      <span className="text-emerald-400/80 text-[10px] uppercase font-bold tracking-wider">
                        Latency: 4.2ms
                      </span>
                    </div>

                    <pre className="text-emerald-200/90 whitespace-pre-wrap leading-relaxed text-[11.5px]">
                      {FEATURED_STORY.codeSnippet}
                    </pre>
                  </div>
                </div>

                {/* Footer with Author and CTA */}
                <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#E6F7EF] text-[#00A859] flex items-center justify-center font-bold text-xs">
                      AV
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-900">
                        {FEATURED_STORY.author}
                      </span>
                      <span className="block text-[11px] text-gray-400">
                        Production Verified System
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/portfolio/${FEATURED_STORY.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00A859] group-hover:text-[#008f4c] transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Curated Secondary Stories Feed (5 Columns) */}
          <div className="lg:col-span-5 space-y-5">
            {filteredSecondary.map((story, idx) => {
              const Icon = story.icon;
              return (
                <MotionReveal key={story.id} delay={0.15 + idx * 0.1}>
                  <Link
                    href={`/portfolio/${story.slug}`}
                    className="group block rounded-[26px] border border-gray-200/80 bg-white p-6 shadow-xs hover:shadow-xl hover:border-[#00A859]/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      {/* Domain Icon Disc */}
                      <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#E6F7EF] text-[#00A859] flex items-center justify-center border border-[#00A859]/20 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 space-y-2">
                        {/* Tag & Reading Time */}
                        <div className="flex items-center justify-between text-[11px] text-gray-500">
                          <span className="font-bold uppercase tracking-wider text-[#00A859]">
                            {story.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {story.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-heading text-base font-bold text-gray-950 group-hover:text-[#00A859] transition-colors leading-snug">
                          {story.title}
                        </h4>

                        {/* Key Metric Highlight Badge */}
                        <div className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[11px] font-mono font-medium">
                          {story.metric}
                        </div>

                        {/* Excerpt */}
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 pt-1">
                          {story.excerpt}
                        </p>

                        <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#00A859] group-hover:underline">
                          <span>Explore Insights</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </MotionReveal>
              );
            })}

            {/* Newsletter / RSS Callout Card */}
            <div className="rounded-[26px] bg-[#00A859] p-6 text-white shadow-md flex items-center justify-between">
              <div>
                <h4 className="font-heading text-sm font-bold uppercase tracking-wide">
                  Stay Updated With Our Engineering Lab
                </h4>
                <p className="text-xs text-emerald-100 mt-1">
                  Bi-weekly tech insights, architecture blueprints, and code releases.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 px-4 py-2 rounded-full bg-white text-[#00A859] text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors shadow-sm"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}