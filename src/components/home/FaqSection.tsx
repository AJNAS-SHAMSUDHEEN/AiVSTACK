"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default matching screenshot

  const FAQS = [
    {
      q: "What core technologies and frameworks does AIVSTACK specialize in?",
      a: "We specialize in modern, typed, high-performance tech stacks: Next.js 16 (React 19, TypeScript) for ultra-fast web platforms; Flutter & Dart for native iOS and Android mobile apps; Python (FastAPI, PyTorch) for custom AI pipelines; and PostgreSQL, SQLite, and Supabase for ACID-compliant data persistence.",
    },
    {
      q: "How does your 5-step development methodology ensure predictable delivery?",
      a: "Our structured 5-stage sprint methodology (Discovery, Strategy, Design & Build, Launch, and Improve) guarantees aligned expectations and clear deliverables. We run iterative weekly sprints with interactive staging previews, ensuring zero scope surprises.",
    },
    {
      q: "Can you develop completely offline-first applications with on-device AI?",
      a: "Yes. As demonstrated in our Personal Money Manager case study, we architect zero-cloud applications that operate 100% on-device. All sensitive data is stored in encrypted local SQLite databases, and natural language queries are parsed locally in <5ms without sending data to third-party servers.",
    },
    {
      q: "How do you handle intellectual property (IP) and code ownership?",
      a: "You retain 100% exclusive intellectual property ownership of all custom source code, design assets, database schemas, and documentation produced during the engagement. We sign mutual Non-Disclosure Agreements (NDAs) prior to technical discovery.",
    },
    {
      q: "What post-launch maintenance, security retainers, and SLA support do you offer?",
      a: "We provide tailored monthly maintenance retainers covering framework version upgrades, vulnerability patching, database backups, uptime monitoring, and continuous feature development with guaranteed SLA turnaround times.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F4F9F6] border-b border-gray-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00A859]">
              GOT QUESTIONS?
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.12]">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Transparent answers regarding our engineering standards, project pricing, and post-launch SLA commitments.
            </p>
          </div>
        </MotionReveal>

        {/* Interactive Accordion Stack (Matching Screenshot) */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <MotionReveal key={idx} delay={idx * 0.08}>
                <div
                  className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${
                    isOpen
                      ? "border-[#00A859]/50 shadow-md ring-1 ring-[#00A859]/20"
                      : "border-gray-200/80 hover:border-gray-300 shadow-xs"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base sm:text-lg font-bold text-gray-950 pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isOpen
                          ? "bg-[#E6F7EF] text-[#00A859] rotate-180"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}