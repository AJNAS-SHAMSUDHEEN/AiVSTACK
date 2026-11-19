"use client";

import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function CtaBanner() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#24173D]/95 via-[#1B1130]/95 to-[#0E081C]/95 p-8 sm:p-14 lg:p-20 text-white shadow-2xl border border-white/15 backdrop-blur-2xl">
            {/* Luminous liquid glow orbs inside the banner */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#A78BFA]/25 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#7C3AED]/25 blur-[90px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Ready To Turn Your Vision Into Digital Reality?
              </h2>

              <p className="mt-5 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
                Whether you need a custom web application, enterprise ERP, Flutter mobile app, or an
                intelligent AI workflow, our team is ready to engineer your solution.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start-a-project"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-bold text-[#30224D] shadow-xl hover:bg-[#F2EEFF] hover:scale-103 transition-all duration-300"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="h-4 w-4 text-[#7C3AED]" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
                >
                  <MessageSquare className="h-4 w-4 text-[#A78BFA]" />
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
