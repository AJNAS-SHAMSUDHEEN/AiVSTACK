"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { BlueprintSection } from "@/components/layout/BlueprintSection";

const PROJECTS = [
  {
    number: "01",
    total: "05",
    name: "Personal Money Manager",
    category: "Finance Management / Mobile Application",
    shortCategory: "FINANCE",
    description:
      "A personal finance management application designed to help users manage income, expenses and financial activities.",
    status: "Completed",
    technologies: ["Flutter", "Dart", "Riverpod", "SQLite", "On-Device AI"],
    slug: "personal-money-manager",
    image: "/portfolio/money-manager/01_dashboard_home.jpg",
    accent: "#00A859",
  },
  {
    number: "02",
    total: "05",
    name: "Community Fund Portal",
    category: "Fundraising & Treasury Management",
    shortCategory: "CIVIC FINTECH",
    description:
      "A specialized, enterprise-grade civic fundraising, on-ground volunteer cash POS, and multi-tier double-entry treasury custody management platform.",
    status: "Completed",
    technologies: ["Next.js 15", "TypeScript", "Cloud Firestore", "HTML5 Canvas"],
    slug: "community-fund-portal",
    image: "/portfolio/community-fund/01_administrative_dashboard.jpg",
    accent: "#059669",
  },
  {
    number: "03",
    total: "05",
    name: "YouTube Media Platform & PWA",
    category: "Media Processing & Distributed Async Systems",
    shortCategory: "ASYNC SYSTEMS & PWA",
    description:
      "An asynchronous media extraction platform and PWA pairing React 19 with a non-blocking FastAPI backend, tiered FFmpeg remuxing, and headless cipher runtimes.",
    status: "Completed",
    technologies: ["React 19", "FastAPI", "Python 3.12", "FFmpeg", "Docker"],
    slug: "youtube-downloader",
    image: "/portfolio/youtube-downloader/01_pwa_interface.png",
    accent: "#DC2626",
  },
  {
    number: "04",
    total: "05",
    name: "Wedding Invitation Website",
    category: "Creative Web Development",
    shortCategory: "CREATIVE",
    description:
      "A professionally designed digital wedding invitation website combining creative presentation and interactive web experiences.",
    status: "Completed",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    slug: "wedding-invitation-website",
    image: "/portfolio/placeholders/wedding-invitation-preview.svg",
    accent: "#E11D48",
  },
  {
    number: "05",
    total: "05",
    name: "Madrasa Management System",
    category: "Education Management Software",
    shortCategory: "EDUCATION",
    description:
      "A management system designed to support the administrative and operational needs of Madrasa institutions.",
    status: "In Development",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    slug: "madrasa-management-system",
    image: "/portfolio/placeholders/madrasa-management-preview.svg",
    accent: "#2563EB",
  },
];

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Scroll Progress Tracking for Desktop Sticky Presentation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    const count = PROJECTS.length;
    // Map scroll progress (0.0 to 1.0) into discrete project indexes (0 to 4)
    const nextIdx = Math.min(count - 1, Math.max(0, Math.floor(latest * count * 0.999)));
    if (nextIdx !== activeIdx) {
      setActiveIdx(nextIdx);
    }
  });

  const activeProject = PROJECTS[activeIdx];

  const handleManualSelect = (idx: number) => {
    setActiveIdx(idx);
    if (isDesktop && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const containerTop = currentScrollY + rect.top;
      const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = containerTop + (idx / (PROJECTS.length - 1)) * scrollableDistance;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[var(--line-strong)] bg-[var(--bg-raised)] text-[var(--ink)] hud-label text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>Verified Commercial Delivery</span>
          </span>
        );
      case "Completed – Not Publicly Deployed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--muted)] hud-label text-[10px]">
            <Clock className="h-3 w-3 text-[var(--faint)]" />
            <span>Private Deployment</span>
          </span>
        );
      case "In Development":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--accent-ink)] hud-label text-[10px]">
            <Clock className="h-3 w-3 text-[var(--accent)]" />
            <span>Active Sprint Cycle</span>
          </span>
        );
    }
  };

  return (
    <BlueprintSection
      id="lineup"
      eyebrow="04 // PRODUCTION LINEUP"
      index="5 CASE STUDIES"
      className="bg-[var(--bg)]"
    >
      <div
        ref={containerRef}
        className={`relative ${
          isDesktop ? "min-h-[300vh]" : "py-12 sm:py-16"
        }`}
      >
        {/* Pinned Sticky Viewport on Desktop */}
        <div
          className={`${
            isDesktop
              ? "sticky top-12 h-[calc(100vh-3rem)] flex flex-col justify-center overflow-hidden"
              : "w-full"
          }`}
        >
          <div className="w-full px-6 sm:px-10 py-6">
            {/* Section Introduction */}
            <div className="mb-6 lg:mb-8 text-left border-b border-[var(--line)] pb-6">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--ink-strong)] tracking-[-0.03em] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Production works. <br />
                <span
                  className="font-serif italic font-normal"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Shipped, tested &amp; verified.
                </span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed font-normal">
                Explore verified commercial software, mobile apps, and full-stack systems engineered by AIVSTACK.
              </p>
            </div>

            {/* Main Interactive Portfolio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* LEFT / INFORMATION AREA */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {/* Project Count & Category */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="hud-label text-xs font-bold text-[var(--accent-ink)]">
                        {activeProject.number} / {activeProject.total}
                      </span>
                      <span className="text-[var(--line-strong)]">•</span>
                      <span className="hud-label text-[10px] text-[var(--faint)]">
                        {activeProject.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-[var(--ink-strong)] tracking-tight leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {activeProject.name}
                    </h3>

                    {/* Short Project Description */}
                    <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-normal">
                      {activeProject.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--ink)] font-mono text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Status */}
                    <div className="pt-1">{getStatusBadge(activeProject.status)}</div>

                    {/* View Case Study CTA Button */}
                    <div className="pt-2 flex items-center gap-3">
                      <Link
                        href={`/portfolio/${activeProject.slug}`}
                        className="inline-flex items-center gap-2 bg-[var(--invert-bg)] text-[var(--invert-fg)] px-6 py-3 hud-label text-xs hover:opacity-90 transition-opacity group"
                      >
                        <span>View Architectural Case Study</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>

                      {/* Interactive Prev/Next Step Buttons */}
                      <div className="flex items-center border border-[var(--line)] bg-[var(--bg-raised)]">
                        <button
                          onClick={() => handleManualSelect(Math.max(0, activeIdx - 1))}
                          disabled={activeIdx === 0}
                          className="h-9 w-9 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--bg-sunken)] disabled:opacity-20 transition-colors cursor-pointer border-r border-[var(--line)]"
                          aria-label="Previous Project"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleManualSelect(Math.min(PROJECTS.length - 1, activeIdx + 1))
                          }
                          disabled={activeIdx === PROJECTS.length - 1}
                          className="h-9 w-9 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--bg-sunken)] disabled:opacity-20 transition-colors cursor-pointer"
                          aria-label="Next Project"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CENTER / MAIN VISUAL AREA */}
              <div className="lg:col-span-6 relative flex items-center justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
                <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto">
                  {PROJECTS.map((project, idx) => {
                    const offset = idx - activeIdx;
                    const isVisible = offset >= 0 && offset <= 3;
                    if (!isVisible) return null;

                    return (
                      <motion.div
                        key={project.slug}
                        initial={false}
                        animate={{
                          y: -offset * 18,
                          scale: 1 - offset * 0.04,
                          zIndex: 30 - offset,
                          opacity: offset === 0 ? 1 : 1 - offset * 0.25,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 overflow-hidden border border-[var(--line-strong)] bg-[var(--bg-raised)] shadow-xl flex flex-col justify-between"
                        style={{
                          transformOrigin: "bottom center",
                        }}
                      >
                        {/* Image Preview Container */}
                        <div className="relative w-full h-full bg-[#101014]">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover object-top transition-transform duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                            priority={idx === 0}
                          />

                          {/* Top Overlay Strip */}
                          <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white z-10 pointer-events-none">
                            <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/20">
                              {project.number} / {project.total}
                            </span>
                            <span className="hud-label text-[10px] text-white/90">
                              {project.shortCategory}
                            </span>
                          </div>

                          {/* Bottom Content Overlay inside Card */}
                          <div className="absolute bottom-0 inset-x-0 p-5 pt-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-10">
                            <span className="hud-label text-[10px] text-[var(--accent)] font-bold block mb-1">
                              CASE ARTIFACT // {project.number}
                            </span>
                            <h4
                              className="text-lg sm:text-xl font-bold text-white leading-tight"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {project.name}
                            </h4>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT / VERTICAL PROGRESS TRACK */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center pl-4">
                <div className="flex items-baseline gap-0.5 font-mono text-center mb-6">
                  <span className="text-2xl font-bold text-[var(--ink-strong)] leading-none">
                    {activeProject.number}
                  </span>
                  <span className="text-xs text-[var(--faint)]">/{activeProject.total}</span>
                </div>

                {/* Vertical Progress Track */}
                <div className="relative h-56 w-px bg-[var(--line)] flex flex-col justify-between items-center my-2">
                  <motion.div
                    className="absolute top-0 w-px bg-[var(--accent)]"
                    animate={{
                      height: `${(activeIdx / (PROJECTS.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />

                  {PROJECTS.map((p, idx) => (
                    <button
                      key={p.slug}
                      onClick={() => handleManualSelect(idx)}
                      className="relative z-20 h-4 w-4 -left-[7px] flex items-center justify-center cursor-pointer group"
                      aria-label={`Jump to project ${idx + 1}`}
                    >
                      <span
                        className={`h-2 w-2 transition-all duration-200 ${
                          idx === activeIdx
                            ? "bg-[var(--accent)] scale-125"
                            : "bg-[var(--line-strong)] group-hover:bg-[var(--ink)]"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-6 [writing-mode:vertical-rl] hud-label text-[9px] text-[var(--faint)] select-none">
                  {activeProject.shortCategory}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlueprintSection>
  );
}