"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProcessSection() {
  const STEPS = [
    {
      number: "01",
      title: "Discovery",
      description:
        "understand the business, its customers and what success looks like",
      badgeColor: "from-[#6366F1] via-[#7C3AED] to-[#8B5CF6]",
      cardGlow: false,
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "agree the scope, the technical stack, database models and the pages to build",
      badgeColor: "from-[#7C3AED] via-[#9333EA] to-[#C026D3]",
      cardGlow: false,
    },
    {
      number: "03",
      title: "Design & build",
      description:
        "structured, fast, accessible pages with modern UI/UX and scalable code",
      badgeColor: "from-[#C026D3] via-[#DB2777] to-[#E11D48]",
      cardGlow: true, // Vivid neon magenta backlight matching reference
    },
    {
      number: "04",
      title: "Launch",
      description:
        "go live with analytics, QA verification, Search Console and schema in place",
      badgeColor: "from-[#E11D48] via-[#DB2777] to-[#9333EA]",
      cardGlow: true, // Vivid neon pink/magenta aura matching reference
    },
    {
      number: "05",
      title: "Improve",
      description:
        "review the numbers monthly, scale features and act on what they show",
      badgeColor: "from-[#9333EA] via-[#7C3AED] to-[#6366F1]",
      cardGlow: false,
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAFAFE] overflow-hidden border-b border-gray-100">
      {/* Soft Ambient Horizon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-72 bg-gradient-to-r from-purple-500/10 via-pink-500/15 to-indigo-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
            How we work
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed">
            Our structured, milestone-driven delivery process engineered for quality, speed, and long-term scalability.
          </p>
        </div>

        {/* 5-Step Connected Workflow Pipeline */}
        <div className="relative pt-6">
          {/* Continuous Glowing Rail Line (Desktop) */}
          <div className="hidden lg:block absolute top-[22px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[#7C3AED]/40 via-[#EC4899] to-[#8B5CF6]/40 z-0 pointer-events-none shadow-[0_0_12px_rgba(236,72,153,0.6)]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 sm:gap-6 relative z-10">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group pt-4"
              >
                {/* Backlight Neon Glow for middle cards (matching reference design) */}
                {step.cardGlow && (
                  <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-[#EC4899]/50 via-[#F43F5E]/40 to-[#A855F7]/50 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
                )}

                {/* White Card Surface with rounded corners */}
                <div
                  className={`relative rounded-[22px] sm:rounded-[24px] bg-white p-6 sm:p-7 pt-10 sm:pt-12 h-full flex flex-col justify-start transition-all duration-300 border ${
                    step.cardGlow
                      ? "border-pink-300/80 shadow-lg shadow-pink-500/10 hover:shadow-2xl hover:shadow-pink-500/20"
                      : "border-gray-200/90 shadow-sm hover:shadow-xl hover:border-purple-300"
                  } hover:-translate-y-1.5`}
                >
                  {/* Floating Circular Number Badge Passing Over the Line */}
                  <div
                    className={`absolute -top-5 left-6 sm:left-7 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-gradient-to-tr ${step.badgeColor} text-white flex items-center justify-center font-mono text-sm sm:text-base font-bold shadow-md shadow-purple-900/20 border-2 border-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-950 mb-2.5 group-hover:text-purple-700 transition-colors leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Context Link */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-purple-300 px-7 py-3.5 text-xs sm:text-sm font-bold text-gray-800 transition-all duration-300 shadow-sm hover:shadow"
          >
            <span>Explore our full sprint roadmap</span>
            <ArrowUpRight className="h-4 w-4 text-purple-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}