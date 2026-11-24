"use client";

import { BlueprintSection } from "@/components/layout/BlueprintSection";

export function TechLogos() {
  const STACK_MANIFEST = [
    { name: "Next.js 16", tag: "App Router / SSR", category: "WEB" },
    { name: "TypeScript 5.8", tag: "Strict Types", category: "LANG" },
    { name: "Flutter 3.47", tag: "Native Engine", category: "MOBILE" },
    { name: "Dart 3.13", tag: "Native JIT/AOT", category: "LANG" },
    { name: "Python 3.12", tag: "FastAPI / Async", category: "BACKEND" },
    { name: "Cloud Firestore", tag: "Reactive Listeners", category: "DB" },
    { name: "PostgreSQL", tag: "ACID Relational", category: "DB" },
    { name: "SQLite", tag: "On-Device ACID", category: "EMBEDDED" },
    { name: "FFmpeg & FFprobe", tag: "Lossless Remux", category: "MEDIA" },
    { name: "Docker", tag: "Multi-Runtime", category: "DEVOPS" },
    { name: "HTML5 Canvas 2D", tag: "300 DPI Vector", category: "GRAPHICS" },
    { name: "Tailwind CSS", tag: "Design Tokens", category: "UI" },
    { name: "GSAP & ScrollTrigger", tag: "Choreography", category: "MOTION" },
  ];

  return (
    <BlueprintSection
      id="stack"
      eyebrow="05 // TECHNOLOGY MANIFEST"
      index="36s TICKER"
      className="bg-[var(--bg)]"
    >
      {/* Ticker Container with Hairline Dividers */}
      <div className="py-8 sm:py-10 overflow-hidden relative">
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee">
            <div className="marquee-track flex items-center gap-6 sm:gap-8">
              {[...STACK_MANIFEST, ...STACK_MANIFEST, ...STACK_MANIFEST].map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3 px-4 py-2 border border-[var(--line)] bg-[var(--bg-raised)] hover:border-[var(--line-strong)] hover:bg-[var(--bg-sunken)] transition-colors cursor-default shrink-0 group"
                >
                  <span className="hud-label text-[9px] text-[var(--accent-ink)] font-bold">
                    {item.category}
                  </span>
                  <span
                    className="font-bold text-sm sm:text-base text-[var(--ink-strong)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--faint)]">
                    // {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BlueprintSection>
  );
}
