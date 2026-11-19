"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, Star, ShieldCheck, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { HeroVisual } from "./HeroVisual";

const SERVICES_LIST = [
  "DIGITAL",
  "SOFTWARE",
  "WEB & APP",
  "AI & AUTOMATION",
  "FINTECH",
  "CLOUD TECH",
  "FULL-STACK",
];

function TypewriterService() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("DIGITAL");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const activeWord = SERVICES_LIST[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < activeWord.length) {
          setCurrentText(activeWord.slice(0, currentText.length + 1));
          setTypingSpeed(100);
        } else {
          // Pause when word complete
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting backward
        if (currentText.length > 0) {
          setCurrentText(activeWord.slice(0, currentText.length - 1));
          setTypingSpeed(50);
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % SERVICES_LIST.length);
          setTypingSpeed(350);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <span className="text-[#00A859] inline-flex items-center flex-nowrap align-baseline">
      <span className="text-[#00A859] select-none">[&nbsp;</span>
      <span className="relative text-[#00A859] font-black tracking-tight">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
          className="inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.78em] bg-[#00A859] ml-1 align-baseline rounded-full shadow-[0_0_8px_rgba(0,168,89,0.8)]"
        />
      </span>
      <span className="text-[#00A859] select-none">&nbsp;]</span>
    </span>
  );
}

export function Hero() {
  const METRICS = [
    {
      number: "150+",
      label: "Projects Delivered",
      icon: FolderGit2,
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: Star,
    },
    {
      number: "10+",
      label: "Years Combined Expertise",
      icon: ShieldCheck,
    },
    {
      number: "100%",
      label: "On-Time Sprint Handover",
      icon: Rocket,
    },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, Subtitle & 4-Metric Grid */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Kicker / Subtitle Tag */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00A859]">
                INNOVATION • TECHNOLOGY • CREATIVITY
              </span>
            </div>

            {/* Giant Heading with dynamic Typewriter animation inside [ ] */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-gray-950 tracking-tight leading-[1.12] uppercase">
              WE ARE A <br />
              <TypewriterService />
              <br />
              AGENCY
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              AIVSTACK engineers next-generation software, scalable web platforms, Flutter mobile apps,
              and conversational AI systems designed to turn ambitious ideas into high-performing digital realities.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/start-a-project"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#00A859] hover:bg-[#008f4c] px-8 py-4 text-xs sm:text-sm font-bold text-white uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all duration-300"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 px-8 py-4 text-xs sm:text-sm font-bold text-gray-800 transition-all duration-300"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* 4-Metric Grid (2x2) with Circular Mint Badges */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-2 gap-5 sm:gap-7 max-w-lg">
              {METRICS.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 group">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-[#E6F7EF] text-[#00A859] flex items-center justify-center border border-[#00A859]/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-heading text-xl sm:text-2xl font-black text-gray-950 leading-none">
                        {metric.number}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-1 leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Visual Frame with 3D Animated Element */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}