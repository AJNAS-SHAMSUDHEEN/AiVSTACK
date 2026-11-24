"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Terminal, Sparkles, Shield, Cpu, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { HeroVisual } from "./HeroVisual";

const SERVICES_LIST = [
  "MOBILE & FLUTTER APPS",
  "FULL-STACK WEB PLATFORMS",
  "ENTERPRISE AI AUTOMATION",
  "CIVIC & FINTECH TREASURIES",
  "REAL-TIME ASYNC SYSTEMS",
];

function TypewriterService() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("MOBILE & FLUTTER APPS");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activeWord = SERVICES_LIST[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < activeWord.length) {
          setCurrentText(activeWord.slice(0, currentText.length + 1));
          setTypingSpeed(80);
        } else {
          setTypingSpeed(2200);
          setIsDeleting(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(activeWord.slice(0, currentText.length - 1));
          setTypingSpeed(40);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % SERVICES_LIST.length);
          setTypingSpeed(300);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <span className="inline-flex items-center text-[var(--accent-ink)] font-mono font-medium">
      <span>[&nbsp;</span>
      <span className="relative">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-1.5 h-[0.8em] bg-[var(--accent)] ml-1 align-baseline"
        />
      </span>
      <span>&nbsp;]</span>
    </span>
  );
}

export function Hero() {
  const TELEMETRY_METRICS = [
    {
      code: "01",
      number: "150+",
      label: "Commercial Deliveries",
      sub: "Zero failed sprints",
    },
    {
      code: "02",
      number: "100%",
      label: "Client Source IP Ownership",
      sub: "No vendor lock-in",
    },
    {
      code: "03",
      number: "< 500ms",
      label: "Real-Time Telemetry Sync",
      sub: "Sub-second responsiveness",
    },
    {
      code: "04",
      number: "99.98%",
      label: "Production Uptime",
      sub: "Enterprise-grade resilience",
    },
  ];

  return (
    <section id="hero" data-choreo="true" className="relative bg-[var(--bg)] transition-colors duration-300">
      {/* Top Hairline Drawing Rule */}
      <span
        aria-hidden="true"
        data-draw-rule="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line)]"
      />

      {/* Main Structural Container flanked by 1px vertical borders */}
      <div className="relative mx-auto max-w-[1280px] border-x border-[var(--line)]">
        {/* Corner Registration Crosshair Ticks (+) */}
        <span aria-hidden="true" data-draw-tick="true" className="tick -top-[5px] -left-[5px]" />
        <span aria-hidden="true" data-draw-tick="true" className="tick -top-[5px] -right-[5px]" />
        <span aria-hidden="true" data-draw-tick="true" className="tick -bottom-[5px] -left-[5px]" />
        <span aria-hidden="true" data-draw-tick="true" className="tick -bottom-[5px] -right-[5px]" />

        {/* Section Top Header Strip (HUD Eyebrow) */}
        <div data-draw-eyebrow="true" className="flex items-center justify-between border-b border-[var(--line)] px-6 py-2.5 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span className="hud-label text-[var(--accent-ink)]">AIVSTACK ENGINE v2.6 // PRODUCTION</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--faint)]">
            <span className="hidden sm:inline">SYS:ONLINE</span>
            <span className="hud-label">COORDINATES [1280px GRID]</span>
          </div>
        </div>

        {/* Hero Body Content */}
        <div className="relative px-6 py-12 sm:px-10 md:py-20 overflow-hidden">
          {/* Giant Background Watermark (getartcraft container-type cqw style) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden text-center opacity-[0.06] dark:opacity-[0.08]"
            style={{ containerType: "inline-size" }}
          >
            <div
              className="font-black tracking-tighter text-[var(--ink-strong)]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20cqw",
                lineHeight: 0.9,
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              AIVSTACK
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Technical Narrative & Call-to-Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 border border-[var(--line-strong)] bg-[var(--bg-raised)] px-3 py-1">
                <Activity className="h-3 w-3 text-[var(--accent)]" />
                <span className="hud-label text-[var(--ink)]">ENGINEERING CAPABLE DIGITAL ECOSYSTEMS</span>
              </div>

              {/* Main Headline: Archivo Geometric Sans + Instrument Serif classical italic accent */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[var(--ink-strong)] tracking-[-0.03em] leading-[1.06]">
                Crafting capable <br />
                <span
                  className="font-serif italic font-normal text-[var(--ink-strong)]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  software, apps &amp;
                </span>{" "}
                <br />
                intelligent systems.
              </h1>

              {/* Dynamic Typewriter HUD sub-strip */}
              <div className="text-xs sm:text-sm font-mono text-[var(--muted)] flex flex-wrap items-center gap-1.5 py-1">
                <span className="text-[var(--faint)] font-mono uppercase tracking-wider">SPECIALTY:</span>
                <TypewriterService />
              </div>

              <p className="text-sm sm:text-base text-[var(--muted)] max-w-xl leading-relaxed font-normal">
                A specialized software engineering studio architecting resilient, production-grade web
                platforms, Flutter mobile applications, and high-throughput real-time AI automation. Built
                cleanly from day one with zero bloat.
              </p>

              {/* Technical ArtCraft Dual CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/start-a-project"
                  className="inline-flex items-center gap-2 bg-[var(--invert-bg)] text-[var(--invert-fg)] px-6 py-3.5 hud-label text-xs hover:opacity-90 transition-opacity group"
                >
                  <span>Initiate Project Scope</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 border border-[var(--line-strong)] bg-[var(--bg-raised)] text-[var(--ink)] px-6 py-3.5 hud-label text-xs hover:bg-[var(--invert-bg)] hover:text-[var(--invert-fg)] transition-all"
                >
                  <span>Explore Lineup (5)</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Robot Visual companion with Technical HUD Border */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Visual framing box */}
                <HeroVisual />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-Column Divided Telemetry Matrix (Exact ArtCraft division grid) */}
        <div className="border-t border-[var(--line)] grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--line)] bg-[var(--bg-raised)]">
          {TELEMETRY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              data-reveal="true"
              className="p-5 sm:p-6 transition-colors hover:bg-[var(--bg-sunken)]"
            >
              <div className="flex items-center justify-between text-[var(--faint)] mb-2">
                <span className="hud-label font-bold text-[var(--accent-ink)]">{metric.code}</span>
                <span className="hud-label text-[10px]">TELEMETRY</span>
              </div>
              <div
                className="text-2xl sm:text-3xl font-bold text-[var(--ink-strong)] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {metric.number}
              </div>
              <div className="text-xs font-semibold text-[var(--ink)] mt-1">{metric.label}</div>
              <div className="text-[11px] text-[var(--faint)] font-mono mt-0.5">{metric.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
