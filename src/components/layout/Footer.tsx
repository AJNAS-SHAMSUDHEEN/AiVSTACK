"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ArrowUpRight, ArrowUp, Activity } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[var(--bg)] border-t border-[var(--line)] transition-colors duration-300">
      {/* Centered Structural Column with Hairline Borders */}
      <div className="relative mx-auto max-w-[1280px] border-x border-[var(--line)] bg-[var(--bg-raised)]">
        {/* Corner Registration Crosshair Ticks (+) */}
        <span aria-hidden="true" className="tick -top-[5px] -left-[5px]" />
        <span aria-hidden="true" className="tick -top-[5px] -right-[5px]" />
        <span aria-hidden="true" className="tick -bottom-[5px] -left-[5px]" />
        <span aria-hidden="true" className="tick -bottom-[5px] -right-[5px]" />

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 divide-y md:divide-y-0 lg:divide-x divide-[var(--line)]">
          {/* Brand & Corporate Column */}
          <div className="lg:col-span-5 p-8 sm:p-10 space-y-5">
            <Logo variant="horizontal" size="sm" />

            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-sm leading-relaxed font-normal">
              A specialized digital engineering studio. We architect resilient full-stack web platforms,
              Flutter mobile ecosystems, and real-time AI automation with absolute craftsmanship.
            </p>

            <div className="inline-flex items-center gap-2 border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hud-label text-[10px] text-[var(--ink)]">
                ALL SYSTEMS OPERATIONAL // PROD
              </span>
            </div>
          </div>

          {/* Directory Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 divide-x divide-[var(--line)]">
            {/* Disciplines */}
            <div className="p-6 sm:p-8 space-y-3">
              <div className="hud-label text-[10px] text-[var(--accent-ink)] font-bold">
                01 // DISCIPLINES
              </div>
              <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
                <li>
                  <Link href="/services/web-development" className="hover:text-[var(--ink-strong)] transition-colors">
                    Web Engineering
                  </Link>
                </li>
                <li>
                  <Link href="/services/software-app-development" className="hover:text-[var(--ink-strong)] transition-colors">
                    Flutter &amp; Mobile
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-automation" className="hover:text-[var(--ink-strong)] transition-colors">
                    AI &amp; Autonomous
                  </Link>
                </li>
                <li>
                  <Link href="/services/graphic-design-branding" className="hover:text-[var(--ink-strong)] transition-colors">
                    Design Systems
                  </Link>
                </li>
              </ul>
            </div>

            {/* Lineup */}
            <div className="p-6 sm:p-8 space-y-3">
              <div className="hud-label text-[10px] text-[var(--accent-ink)] font-bold">
                02 // LINEUP
              </div>
              <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
                <li>
                  <Link href="/portfolio/personal-money-manager" className="hover:text-[var(--ink-strong)] transition-colors">
                    Money Manager
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio/community-fund-portal" className="hover:text-[var(--ink-strong)] transition-colors">
                    Community Fund
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio/youtube-downloader" className="hover:text-[var(--ink-strong)] transition-colors">
                    Media Extraction
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-[var(--ink-strong)] transition-colors">
                    All Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Agency */}
            <div className="p-6 sm:p-8 space-y-3 col-span-2 sm:col-span-1 border-t sm:border-t-0 border-[var(--line)]">
              <div className="hud-label text-[10px] text-[var(--accent-ink)] font-bold">
                03 // STUDIO
              </div>
              <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
                <li>
                  <Link href="/about" className="hover:text-[var(--ink-strong)] transition-colors">
                    About Studio
                  </Link>
                </li>
                <li>
                  <Link href="/process" className="hover:text-[var(--ink-strong)] transition-colors">
                    Sprint Process
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[var(--ink-strong)] transition-colors">
                    Client Contact
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-[var(--ink-strong)] transition-colors">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Copyright Strip */}
        <div className="border-t border-[var(--line)] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--faint)]">
          <div>
            © {new Date().getFullYear()} AIVSTACK INC. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hud-label text-[10px]">COORDINATES: IN // GLOBAL</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[var(--ink-strong)] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
