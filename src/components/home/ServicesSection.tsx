"use client";

import Link from "next/link";
import {
  Globe,
  Smartphone,
  Bot,
  Palette,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Layers,
} from "lucide-react";
import { BlueprintSection } from "@/components/layout/BlueprintSection";

export function ServicesSection() {
  const PILLARS = [
    {
      code: "01",
      slug: "web-development",
      title: "Web Engineering",
      subtitle: "Full-Stack Next.js 16 & Serverless",
      description:
        "High-performance Next.js 16 platforms, reactive web portals, and scalable cloud architectures engineered for speed, SEO, and enterprise conversion.",
      icon: Globe,
    },
    {
      code: "02",
      slug: "software-app-development",
      title: "Mobile Platforms",
      subtitle: "Flutter & Native Dart Systems",
      description:
        "Cross-platform iOS and Android applications built with Flutter and Dart, supporting offline-first SQLite persistence, on-device AI, and hardware telemetry.",
      icon: Smartphone,
    },
    {
      code: "03",
      slug: "ai-automation",
      title: "AI & Autonomous Systems",
      subtitle: "LLM Orchestration & Agent Workflows",
      description:
        "Custom conversational AI agents, on-device NLP processing, predictive workflow automations, and intelligent business logic pipelines.",
      icon: Bot,
    },
    {
      code: "04",
      slug: "graphic-design-branding",
      title: "Brand Identity & UI/UX",
      subtitle: "Design Tokens & Design Systems",
      description:
        "Distinctive brand identity systems, intuitive UI/UX design tokens, 3D interactive motion, and high-retention digital visual assets.",
      icon: Palette,
    },
  ];

  return (
    <BlueprintSection
      id="services"
      eyebrow="02 // CAPABILITIES & DISCIPLINES"
      index="MANIFEST v2.6"
      className="bg-[var(--bg)]"
    >
      {/* Intro Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[var(--line)] border-b border-[var(--line)]">
        <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
          <div className="inline-flex items-center gap-2 border border-[var(--line-strong)] bg-[var(--bg-raised)] px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="hud-label text-[var(--accent-ink)]">FULL-LIFECYCLE ENGINEERING</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold text-[var(--ink-strong)] tracking-[-0.03em] leading-[1.08]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Engineering capable <br />
            <span
              className="font-serif italic font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              solutions from concept
            </span>{" "}
            to scale.
          </h2>
        </div>

        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-normal">
            At AIVSTACK, we bridge the gap between creative ambition and enterprise software engineering.
            We reject bloated templates and fragile shortcuts, choosing instead to write typed, maintainable,
            and modular codebases tailored directly to your operational bottlenecks.
          </p>
          <div className="pt-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[var(--invert-bg)] text-[var(--invert-fg)] px-5 py-2.5 hud-label text-xs hover:opacity-90 transition-opacity"
            >
              <span>Explore All Capabilities</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2x2 High-Precision Divided Services Grid */}
      <div
        data-reveal-group="true"
        className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)] bg-[var(--bg)]"
      >
        {PILLARS.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={service.slug}
              data-reveal="true"
              className={`p-8 sm:p-10 flex flex-col justify-between transition-colors duration-200 hover:bg-[var(--bg-raised)] group ${
                idx >= 2 ? "border-t border-[var(--line)]" : ""
              }`}
            >
              <div>
                {/* Top Header Row with Icon & HUD Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--accent-ink)] group-hover:border-[var(--line-strong)] transition-colors">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="hud-label text-[var(--faint)] font-bold">{service.code}</span>
                </div>

                <div className="text-[11px] font-mono text-[var(--accent-ink)] uppercase tracking-wider mb-1">
                  {service.subtitle}
                </div>
                <h3
                  className="text-2xl font-bold text-[var(--ink-strong)] tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 hud-label text-xs text-[var(--ink-strong)] group-hover:text-[var(--accent-ink)] transition-colors"
                >
                  <span>Inspect Spec</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </BlueprintSection>
  );
}
