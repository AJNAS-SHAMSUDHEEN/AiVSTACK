"use client";

import { Target, Compass } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          {/* Header & Narrative Block (Matching Screenshot) */}
          <div className="space-y-5 text-left sm:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00A859]">
              WHO WE ARE
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.12]">
              Who We Are & What Drives Our Engineering
            </h2>

            <div className="space-y-4 pt-2 text-base text-gray-600 leading-relaxed">
              <p>
                AIVSTACK was founded on a singular core premise: to make world-class software engineering,
                conversational AI, and human-centered design accessible to creators, scaleups, and visionary enterprises.
                We reject bloated corporate fluff and rigid templates, choosing instead to write typed, modular, and maintainable
                codebases tailored directly to your operational bottlenecks.
              </p>
              <p>
                From offline-first Flutter mobile apps with on-device AI to multi-tenant cloud platforms, our engineers
                bring deep technical rigor to every sprint. We prioritize zero-data-loss database architectures, sub-second
                render times, and absolute privacy compliance across all client deliverables.
              </p>
            </div>
          </div>
        </MotionReveal>

        {/* Two Prominent Side-by-Side Mission & Vision Cards (Matching Screenshot) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <MotionReveal delay={0.1}>
            <div className="group rounded-[28px] border border-gray-200/80 bg-gray-50/60 p-8 shadow-xs hover:shadow-xl hover:border-[#00A859]/40 hover:bg-white transition-all duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F7EF] text-[#00A859] border border-[#00A859]/20 transition-transform duration-300 group-hover:scale-110">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-950 mb-3 group-hover:text-[#00A859] transition-colors">
                Our Mission
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To architect reliable, privacy-first, and high-performance digital systems that eliminate operational
                friction, protect client sovereignty, and drive tangible commercial outcomes.
              </p>
            </div>
          </MotionReveal>

          {/* Vision Card */}
          <MotionReveal delay={0.2}>
            <div className="group rounded-[28px] border border-gray-200/80 bg-gray-50/60 p-8 shadow-xs hover:shadow-xl hover:border-[#00A859]/40 hover:bg-white transition-all duration-300">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F7EF] text-[#00A859] border border-[#00A859]/20 transition-transform duration-300 group-hover:scale-110">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-950 mb-3 group-hover:text-[#00A859] transition-colors">
                Our Vision
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To stand as the premier international technology studio where complex software architecture,
                autonomous AI intelligence, and striking creative branding coalesce seamlessly.
              </p>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}