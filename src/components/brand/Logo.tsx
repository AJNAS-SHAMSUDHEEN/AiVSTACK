"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "full" | "horizontal" | "monogram";
  size?: "sm" | "md" | "lg" | "xl";
  lightMode?: boolean;
}

export function Logo({
  className = "",
  variant = "horizontal",
  size = "md",
  lightMode = false,
}: LogoProps) {
  const dimensions = {
    sm: { height: 32, width: 110, icon: "h-9 w-9" },
    md: { height: 42, width: 145, icon: "h-11 w-11" },
    lg: { height: 56, width: 190, icon: "h-14 w-14" },
    xl: { height: 80, width: 280, icon: "h-20 w-20" },
  }[size];

  if (variant === "monogram") {
    return (
      <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
        <div className={`relative ${dimensions.icon} overflow-hidden rounded-xl border border-[#A78BFA]/30 bg-white p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0`}>
          <Image
            src="/brand/logo.jpg"
            alt="AIVSTACK"
            width={120}
            height={120}
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>
      </Link>
    );
  }

  if (variant === "full") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center group ${className}`}>
        <div className="relative rounded-2xl overflow-hidden bg-white p-3 border border-[#A78BFA]/20 shadow-sm max-w-[280px]">
          <Image
            src="/brand/logo.jpg"
            alt="AIVSTACK — Innovation • Technology • Creativity"
            width={320}
            height={200}
            className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-102"
            priority
          />
        </div>
      </Link>
    );
  }

  // Default horizontal lockup for navigation
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Official AIVSTACK Monogram Icon */}
      <div className={`relative ${dimensions.icon} overflow-hidden rounded-xl border border-white/40 bg-white p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0`}>
        <Image
          src="/brand/logo.jpg"
          alt="AIVSTACK Logo"
          width={100}
          height={100}
          className="h-full w-full object-cover object-top"
          priority
        />
      </div>

      {/* Typography Brand Title */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-wider text-[22px] font-bold font-heading leading-none">
          <span className={lightMode ? "text-white" : "text-[#30224D]"}>AIV</span>
          <span className={lightMode ? "text-[#C4B5FD]" : "text-[#6D28D9]"}>STACK</span>
        </div>
        <span className={`text-[8.5px] font-semibold uppercase tracking-[0.22em] mt-1 ${lightMode ? "text-white/60" : "text-[#706B7D]"}`}>
          Innovation • Technology • Creativity
        </span>
      </div>
    </Link>
  );
}
