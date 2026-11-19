"use client";

import { motion } from "framer-motion";

export function LiquidBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 1. Fluid Violet/Lavender Liquid Blob (Top Center) */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -45, 30, 0],
          scale: [1, 1.15, 0.95, 1],
          borderRadius: [
            "50% 50% 40% 60% / 40% 60% 50% 50%",
            "60% 40% 50% 50% / 50% 50% 40% 60%",
            "40% 60% 60% 40% / 60% 40% 50% 50%",
            "50% 50% 40% 60% / 40% 60% 50% 50%",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 left-1/4 h-[700px] w-[700px] opacity-70 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.55) 0%, rgba(139, 92, 246, 0.35) 45%, rgba(196, 181, 253, 0.15) 70%, transparent 85%)",
        }}
      />

      {/* 2. Fluid Deep Amethyst & Indigo Liquid Blob (Top Right) */}
      <motion.div
        animate={{
          x: [0, -50, 35, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.2, 0.9, 1],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 40% 60% 60%",
            "70% 30% 50% 50% / 30% 30% 70% 70%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-12 -right-40 h-[680px] w-[680px] opacity-65 blur-[105px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 80%)",
        }}
      />

      {/* 3. Fluid Blush Rose & Pink Glass Blob (Middle Left) */}
      <motion.div
        animate={{
          x: [0, 45, -35, 0],
          y: [0, -50, 40, 0],
          scale: [0.95, 1.18, 1, 0.95],
          borderRadius: [
            "50% 50% 60% 40% / 50% 40% 60% 50%",
            "40% 60% 40% 60% / 60% 50% 50% 40%",
            "60% 40% 50% 50% / 40% 60% 50% 60%",
            "50% 50% 60% 40% / 50% 40% 60% 50%",
          ],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[38%] -left-36 h-[640px] w-[640px] opacity-55 blur-[105px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244, 114, 182, 0.35) 0%, rgba(167, 139, 250, 0.25) 55%, transparent 80%)",
        }}
      />

      {/* 4. Fluid Electric Cyan & Lavender Orb (Lower Middle) */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -35, 0],
          scale: [1, 1.12, 0.95, 1],
          borderRadius: [
            "70% 30% 50% 50% / 30% 30% 70% 70%",
            "50% 50% 40% 60% / 40% 60% 50% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "70% 30% 50% 50% / 30% 30% 70% 70%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[65%] right-10 h-[620px] w-[620px] opacity-60 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(167, 139, 250, 0.35) 45%, transparent 75%)",
        }}
      />

      {/* 5. Liquid Lavender Wave (Bottom Center) */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 45, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-36 left-1/3 h-[750px] w-[750px] opacity-60 blur-[115px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.45) 0%, rgba(124, 58, 237, 0.3) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}
