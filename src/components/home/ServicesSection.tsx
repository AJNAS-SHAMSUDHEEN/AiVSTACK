"use client";

import Link from "next/link";
import {
  Globe,
  Smartphone,
  Bot,
  Palette,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function ServicesSection() {
  const PILLARS = [
    {
      slug: "web-development",
      title: "Web Development",
      description:
        "High-performance Next.js 16 platforms, reactive web portals, and scalable cloud architectures engineered for speed and conversion.",
      icon: Globe,
    },
    {
      slug: "software-app-development",
      title: "Mobile Applications",
      description:
        "Native performance iOS & Android apps built with Flutter and Dart, supporting offline-first persistence and secure hardware integration.",
      icon: Smartphone,
    },
    {
      slug: "ai-automation",
      title: "AI & Automation",
      description:
        "Custom conversational AI agents, on-device NLP processing, predictive workflow automations, and intelligent business logic.",
      icon: Bot,
    },
    {
      slug: "graphic-design-branding",
      title: "Branding & UI/UX",
      description:
        "Distinctive brand identity systems, intuitive UI/UX design tokens, 3D interactive motion, and high-retention digital visual assets.",
      icon: Palette,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Narrative Introduction (Matching Screenshot) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00A859]">
                CORE ENGINEERING PILLARS
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[1.12]">
              Premier Software & Digital Innovation Company
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              At AIVSTACK, we bridge the gap between creative vision and enterprise engineering.
              We specialize in architecting resilient, future-ready digital ecosystems that solve complex operational
              bottlenecks and accelerate business growth.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Whether you are launching a flagship cross-platform mobile application, migrating legacy systems to
              serverless architectures, or deploying intelligent AI workflows, our team executes with absolute craftsmanship.
            </p>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00A859] hover:text-[#008f4c] group transition-colors"
              >
                <span>Explore all services</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Clean Services Grid (Matching Screenshot) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((service, idx) => {
              const Icon = service.icon;
              return (
                <MotionReveal key={service.slug} delay={idx * 0.1}>
                  <div className="group rounded-[28px] border border-gray-200/80 bg-white p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#00A859]/40 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div>
                      {/* Circular Mint Icon Badge matching screenshot */}
                      <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E6F7EF] text-[#00A859] border border-[#00A859]/20 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-950 mb-2.5 group-hover:text-[#00A859] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A859] group-hover:underline"
                      >
                        <span>Learn More</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}