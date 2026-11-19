"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for cursor spotlight
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(-500, springConfig);
  const cursorY = useSpring(-500, springConfig);

  // Trailing ring springs (slightly more damp for fluid lag)
  const ringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(-500, ringConfig);
  const ringY = useSpring(-500, ringConfig);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hover on interactive elements to scale cursor ring
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.classList.contains("clickable");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* 1. Large Ambient Background Spotlight Glow */}
      <motion.div
        className="fixed top-0 left-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10"
        style={{
          x: ringX,
          y: ringY,
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.16) 0%, rgba(196, 181, 253, 0.08) 40%, rgba(242, 238, 255, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* 2. Fluid Interactive Outer Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A78BFA]/50 transition-all duration-150 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? 52 : 34,
          height: isHovered ? 52 : 34,
          backgroundColor: isHovered
            ? "rgba(167, 139, 250, 0.15)"
            : "rgba(167, 139, 250, 0.04)",
          borderColor: isHovered ? "#7C3AED" : "rgba(167, 139, 250, 0.5)",
          boxShadow: isHovered
            ? "0 0 20px 2px rgba(124, 58, 237, 0.25)"
            : "0 0 10px rgba(167, 139, 250, 0.1)",
        }}
      />

      {/* 3. Precision Central Dot with Pulse */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 6 : 5,
          height: isHovered ? 6 : 5,
          backgroundColor: "#6D28D9",
        }}
      />
    </div>
  );
}
