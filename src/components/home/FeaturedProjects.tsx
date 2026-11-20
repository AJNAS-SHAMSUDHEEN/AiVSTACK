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
    name: "YouTube Downloader",
    category: "Web Utility Application",
    shortCategory: "UTILITY",
    description:
      "A web-based utility application developed to provide YouTube video downloading functionality.",
    status: "Completed – Not Publicly Deployed",
    technologies: ["React", "Vite", "FastAPI", "Python", "yt-dlp", "FFmpeg"],
    slug: "youtube-downloader",
    image: "/portfolio/placeholders/youtube-downloader-preview.svg",
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case "Completed – Not Publicly Deployed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span>Completed – Not Publicly Deployed</span>
          </span>
        );
      case "In Development":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
            <Clock className="h-3.5 w-3.5 text-blue-600" />
            <span>In Development</span>
          </span>
        );
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative bg-[#FAFAFA] border-b border-gray-100 ${
        isDesktop ? "min-h-[320vh]" : "py-20 sm:py-28"
      }`}
    >
      {/* Pinned Sticky Viewport on Desktop; Standard Container on Mobile */}
      <div
        className={`${
          isDesktop
            ? "sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
            : "w-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Introduction (Matching Specific Requirements) */}
          <div className="mb-8 lg:mb-10 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00A859]">
                OUR WORK / SELECTED PROJECTS
              </span>
            </div>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.12]">
              Ideas Into Digital Experiences.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
              Explore a selection of digital products and creative solutions developed by AIVSTACK.
            </p>
          </div>

          {/* Main Interactive Portfolio: Left Info • Center Visual Stack • Right Vertical Indicator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT / INFORMATION AREA (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-5"
                >
                  {/* Project Count & Category */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gray-400">
                      {activeProject.number} / {activeProject.total}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00A859]">
                      {activeProject.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight leading-tight">
                    {activeProject.name}
                  </h3>

                  {/* Short Project Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {activeProject.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-white border border-gray-200 text-gray-700 text-xs font-semibold shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Status */}
                  <div className="pt-2">
                    {getStatusBadge(activeProject.status)}
                  </div>

                  {/* View Case Study CTA Button */}
                  <div className="pt-3 flex items-center gap-4">
                    <Link
                      href={`/portfolio/${activeProject.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#00A859] hover:bg-[#008f4c] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 hover:scale-102 active:scale-98"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    {/* Interactive Prev/Next Step Buttons */}
                    <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full p-1 shadow-2xs">
                      <button
                        onClick={() => handleManualSelect(Math.max(0, activeIdx - 1))}
                        disabled={activeIdx === 0}
                        className="h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-950 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        aria-label="Previous Project"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleManualSelect(Math.min(PROJECTS.length - 1, activeIdx + 1))
                        }
                        disabled={activeIdx === PROJECTS.length - 1}
                        className="h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-950 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        aria-label="Next Project"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CENTER / MAIN VISUAL AREA (6 Columns: Cascading Deck Layout Matching Reference) */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]">
              <div className="relative w-full max-w-[420px] aspect-[4/5] mx-auto">
                {PROJECTS.map((project, idx) => {
                  const offset = idx - activeIdx;
                  // Only render cards that are active or in the upcoming stack
                  const isVisible = offset >= 0 && offset <= 3;
                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={project.slug}
                      initial={false}
                      animate={{
                        y: -offset * 22,
                        scale: 1 - offset * 0.05,
                        zIndex: 30 - offset,
                        opacity: offset === 0 ? 1 : 1 - offset * 0.22,
                      }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0 rounded-[32px] overflow-hidden border border-gray-200/90 bg-white shadow-2xl shadow-gray-900/10 flex flex-col justify-between"
                      style={{
                        transformOrigin: "bottom center",
                      }}
                    >
                      {/* Image Preview Container */}
                      <div className="relative w-full h-full bg-[#0F172A]">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover object-top transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                          priority={idx === 0}
                        />

                        {/* Top Overlay Strip (Matching Reference 08/11 and Category Tag) */}
                        <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white z-10 pointer-events-none">
                          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                            {project.number} / {project.total}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-white/90">
                            {project.shortCategory}
                          </span>
                        </div>

                        {/* Bottom Editorial Content Overlay inside Card */}
                        <div className="absolute bottom-0 inset-x-0 p-6 pt-12 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-10">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold block mb-1">
                            PROJECT {project.number}
                          </span>
                          <h4 className="font-heading text-xl sm:text-2xl font-black text-white leading-tight">
                            {project.name}
                          </h4>
                          <p className="text-xs text-white/70 line-clamp-1 mt-1 font-normal">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT / VERTICAL PROGRESS INDICATOR (1 Column - Matching Reference Screenshot) */}
            <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center pl-4">
              {/* Bold Current Project Number Counter (Matching "08 / 11" in Screenshot) */}
              <div className="flex items-baseline gap-0.5 font-heading text-center mb-6">
                <span className="text-3xl font-black text-gray-950 leading-none">
                  {activeProject.number}
                </span>
                <span className="text-xs font-bold text-gray-400">
                  /{activeProject.total}
                </span>
              </div>

              {/* Vertical Progress Track with Gliding Marker */}
              <div className="relative h-64 w-[2px] bg-gray-200 rounded-full flex flex-col justify-between items-center my-2">
                {/* Active Progress Fill */}
                <motion.div
                  className="absolute top-0 w-[2px] bg-[#00A859] rounded-full"
                  animate={{
                    height: `${(activeIdx / (PROJECTS.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />

                {/* Sliding Marker Orb */}
                <motion.div
                  className="absolute -left-[5px] h-3 w-3 rounded-full bg-[#00A859] shadow-md shadow-emerald-500/50 border-2 border-white cursor-pointer z-10"
                  animate={{
                    top: `calc(${(activeIdx / (PROJECTS.length - 1)) * 100}% - 6px)`,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />

                {/* 5 Project Click Nodes */}
                {PROJECTS.map((p, idx) => (
                  <button
                    key={p.slug}
                    onClick={() => handleManualSelect(idx)}
                    className="relative z-20 h-4 w-4 -left-[7px] flex items-center justify-center cursor-pointer group"
                    aria-label={`Jump to project ${idx + 1}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-200 ${
                        idx === activeIdx
                          ? "bg-[#00A859] scale-125"
                          : "bg-gray-300 group-hover:bg-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Vertical Rotated Project Label (Matching "DELTA" in Screenshot) */}
              <div className="mt-6 [writing-mode:vertical-rl] text-[10px] uppercase font-mono tracking-[0.25em] text-gray-400 font-bold select-none">
                {activeProject.shortCategory}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}