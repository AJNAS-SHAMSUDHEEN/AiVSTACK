"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function ProcessSection() {
  const STEPS = [
    {
      number: "01",
      title: "Discovery",
      description:
        "understand the business, its customers and what technical success looks like",
      rotation: "lg:-rotate-1",
      isHero: false,
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "agree the scope, the technical stack, database models and the pages to build",
      rotation: "lg:rotate-1",
      isHero: false,
    },
    {
      number: "03",
      title: "Design & build",
      description:
        "structured, fast, accessible pages with modern UI/UX and scalable code",
      rotation: "lg:rotate-0",
      isHero: true, // Special glowing neon aura matching reference
    },
    {
      number: "04",
      title: "Launch",
      description:
        "go live with analytics, QA verification, Search Console and schema in place",
      rotation: "lg:-rotate-1",
      isHero: false,
    },
    {
      number: "05",
      title: "Improve",
      description:
        "review the numbers monthly, scale features and act on what they show",
      rotation: "lg:rotate-1.5",
      isHero: false,
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden border-b border-[#A78BFA]/15">
      {/* Subtle Ambient Liquid Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-gradient-to-r from-[#7C3AED]/10 via-[#EC4899]/10 to-[#A78BFA]/10 blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Clean & Confident matching reference) */}
        <MotionReveal>
          <div className="mb-14 sm:mb-20 text-left sm:text-left">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#24202D] tracking-tight">
              How we work
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#706B7D] max-w-xl leading-relaxed">
              A structured, repeatable sprint methodology designed to deliver predictability, engineering integrity, and high-impact digital products.
            </p>
          </div>
        </MotionReveal>

        {/* 5-Step Connected Pipeline Cards */}
        <div className="relative pt-6">
          {/* Continuous Connecting Guide Line (Desktop) */}
          <div className="hidden lg:block absolute top-[2px] left-12 right-12 h-[2px] bg-gradient-to-r from-[#7C3AED]/35 via-[#EC4899]/60 to-[#8B5CF6]/35 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6 relative z-10">
            {STEPS.map((step, idx) => (
              <MotionReveal key={step.number} delay={0.1 * idx}>
                <div
                  className={`relative rounded-[26px] sm:rounded-[28px] p-6 sm:p-7 pt-12 sm:pt-14 h-full flex flex-col justify-start transition-all duration-300 group cursor-default ${
                    step.isHero
                      ? "liquid-glass-card border-pink-400/60 shadow-[0_0_45px_-5px_rgba(236,72,153,0.4)] bg-gradient-to-b from-white/95 to-pink-50/25 lg:-translate-y-2 hover:shadow-[0_0_55px_-5px_rgba(236,72,153,0.55)]"
                      : "liquid-glass-card border-white/90 shadow-md hover:shadow-2xl hover:border-[#A78BFA]"
                  } ${step.rotation} hover:rotate-0 hover:-translate-y-2`}
                >
                  {/* Floating Number Badge Overlapping Top Rim */}
                  <div className="absolute -top-5 left-5 sm:left-6 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-gradient-to-tr from-[#6D28D9] via-[#7C3AED] to-[#EC4899] text-white font-mono text-sm sm:text-base font-bold shadow-lg shadow-purple-500/25 border-2 border-white transition-transform duration-300 group-hover:scale-110">
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#24202D] mb-2.5 group-hover:text-[#7C3AED] transition-colors leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-[#706B7D] leading-relaxed font-normal">
                    {step.description}
                  </p>

                  {/* Subtle Accent Glow on Hover */}
                  <div className="mt-auto pt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7C3AED] flex items-center gap-1">
                      <span>Phase {step.number}</span>
                      <Sparkles className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>

        {/* Explore Methodology CTA */}
        <MotionReveal delay={0.4} className="mt-14 sm:mt-16 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-full liquid-glass px-8 py-3.5 text-xs sm:text-sm font-bold text-[#30224D] shadow-sm hover:scale-104 hover:border-[#A78BFA] hover:shadow-md transition-all duration-300"
          >
            <span>Explore our full 5-step methodology</span>
            <ArrowRight className="h-4 w-4 text-[#7C3AED]" />
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}