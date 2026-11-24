"use client";

import {
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Zap,
} from "lucide-react";
import { BlueprintSection } from "@/components/layout/BlueprintSection";

export function WhyChooseUs() {
  const PRINCIPLES = [
    {
      code: "01",
      title: "Native & Unwrapped",
      subtitle: "Zero WebView wrappers",
      description:
        "We compile directly to native arm64/x86 binaries and optimized web bundles. Native performance, instantaneous 60fps frame rates, and direct hardware API integration.",
      icon: Code2,
    },
    {
      code: "02",
      title: "Integer Mathematical Rigor",
      subtitle: "Zero floating-point calculation drift",
      description:
        "In financial and civic treasury ledgers, monetary values are strictly processed as integer paise (amountPaise). Zero rounding errors, double-entry balance verification, and tamper-resistant audit trails.",
      icon: ShieldCheck,
    },
    {
      code: "03",
      title: "100% Sovereign Client IP",
      subtitle: "Complete repository ownership",
      description:
        "Every line of source code, database migration script, and container manifest belongs entirely to you. No proprietary runtime lock-in, no hidden recurring framework royalties.",
      icon: Cpu,
    },
    {
      code: "04",
      title: "Zero-Leak Ephemeral Runtimes",
      subtitle: "Resource-constrained optimization",
      description:
        "From media transcoding to intensive I/O, we enforce dual-layer cleanup pipelines and asynchronous thread-pool offloading that run continuously under strict memory ceilings (512MB RAM).",
      icon: Layers,
    },
    {
      code: "05",
      title: "Agent & Automation Ready",
      subtitle: "CLI, JSON, & MCP Protocols",
      description:
        "Every system we architect is designed for headless automation and AI agent control via RESTful APIs, webhooks, or Model Context Protocol (MCP) servers.",
      icon: Terminal,
    },
    {
      code: "06",
      title: "Sub-Second Telemetry Sync",
      subtitle: "< 500ms reactive listeners",
      description:
        "Live status progress, POS transactions, and dashboard aggregates synchronize instantaneously across screens and admin terminals without heavy broker overhead.",
      icon: Zap,
    },
  ];

  return (
    <BlueprintSection
      id="principles"
      eyebrow="03 // ENGINEERING ETHOS"
      index="STANDARDS"
      className="bg-[var(--bg)]"
    >
      {/* Section Header */}
      <div className="p-8 sm:p-12 border-b border-[var(--line)]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 border border-[var(--line-strong)] bg-[var(--bg-raised)] px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="hud-label text-[var(--accent-ink)]">BUILT THE HARD WAY</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold text-[var(--ink-strong)] tracking-[-0.03em] leading-[1.08]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Engineered with <br />
            <span
              className="font-serif italic font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              absolute craftsmanship.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-normal pt-1">
            Six architectural rules that guide every platform, mobile app, and backend pipeline shipped by AIVSTACK.
          </p>
        </div>
      </div>

      {/* 3-Column Bento Principles Grid (Exact ArtCraft #principles style) */}
      <div
        data-reveal-group="true"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 divide-[var(--line)] md:divide-x bg-[var(--bg)]"
      >
        {PRINCIPLES.map((principle, idx) => {
          const Icon = principle.icon;
          return (
            <div
              key={principle.code}
              data-reveal="true"
              className={`p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:bg-[var(--bg-raised)] ${
                idx >= 3 ? "lg:border-t border-[var(--line)]" : ""
              } ${idx % 2 === 0 && idx >= 2 ? "md:border-t border-[var(--line)]" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--accent-ink)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="hud-label text-[var(--faint)] font-bold">{principle.code}</span>
                </div>

                <div className="text-[11px] font-mono text-[var(--accent-ink)] uppercase tracking-wider mb-1">
                  {principle.subtitle}
                </div>
                <h3
                  className="text-xl font-bold text-[var(--ink-strong)] tracking-tight mb-2.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </BlueprintSection>
  );
}
