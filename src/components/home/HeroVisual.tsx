"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Activity, Layers, Cpu, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none select-none">
      {/* Ambient Multi-Layer Radial Glow Backdrop (Purple & Emerald) */}
      <div className="absolute -top-12 -right-10 w-96 h-96 bg-gradient-to-br from-purple-600/25 via-fuchsia-600/15 to-[#00A859]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-tr from-[#00A859]/20 via-purple-700/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Showcase Curved Outer Frame */}
      <div className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden border border-gray-100/80 bg-white/80 backdrop-blur-xl shadow-2xl shadow-purple-950/10 p-3 sm:p-4">
        {/* Deep Obsidian Canvas for 3D Cosmic Contrast */}
        <div className="relative aspect-[4/5] sm:aspect-[4/4.8] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-[#090614] via-[#0d071a] to-[#06030b] flex flex-col justify-between p-5 sm:p-7 text-white">
          
          {/* Subtle Cyber Grid Background Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#A855F7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Top HUD Telemetry Bar */}
          <div className="relative z-20 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A859]" />
              </span>
              <span className="text-white/90 text-[11px] sm:text-xs tracking-wider uppercase font-mono">
                3D Neural Core
              </span>
            </div>

            <span className="text-[11px] font-mono tracking-widest text-purple-300/80 border border-purple-500/20 px-2.5 py-1 rounded-full bg-purple-950/30">
              v4.2 ACTIVE
            </span>
          </div>

          {/* Central 3D Animated Orb Stage */}
          <div className="relative z-10 my-auto flex items-center justify-center py-4">
            {/* Pulsing Concentric Energy Waves */}
            <motion.div
              animate={{
                scale: [0.85, 1.25, 0.85],
                opacity: [0.3, 0.08, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-purple-500/40 pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-[#00A859]/30 pointer-events-none"
            />

            {/* 3D Orbital Gyro Ring 1 */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-dashed border-purple-400/30 [transform:rotateX(72deg)_rotateY(15deg)] pointer-events-none"
            />

            {/* 3D Orbital Gyro Ring 2 (Emerald Accented) */}
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-dotted border-[#00A859]/40 [transform:rotateX(65deg)_rotateY(-25deg)] pointer-events-none"
            />

            {/* 3D Floating Particle Sphere (The User Provided 3D Element) */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                scale: [1, 1.03, 0.99, 1],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative group cursor-pointer"
            >
              {/* Outer Radiant Corona */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-[#00A859] blur-2xl opacity-40 group-hover:opacity-65 transition-opacity duration-700 pointer-events-none" />

              {/* 3D Orb Graphic */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.5)] border border-purple-400/30 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/brand/hero_3d_orb.jpg"
                  alt="AIVSTACK 3D Interactive Animated Element"
                  fill
                  className="object-cover object-center scale-105 group-hover:scale-115 transition-transform duration-700"
                  priority
                />

                {/* Subtle Spherical Vignette & Glass Specular Highlight */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30 pointer-events-none" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none" />
              </div>

              {/* Floating Spatial Micro-Badge */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-purple-400/40 shadow-xl flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
                <span className="text-[10px] font-mono tracking-wide text-purple-200">
                  REALTIME 3D
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Floating Architecture Telemetry Card */}
          <div className="relative z-20 space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-600 to-[#00A859] flex items-center justify-center text-white shadow-md">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-white tracking-wide">
                    Autonomous Intelligence Stack
                  </h4>
                  <p className="text-[10px] text-purple-200/70 font-mono">
                    Next.js 16 • Flutter • Cloud AI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00A859] bg-[#00A859]/10 border border-[#00A859]/30 px-2 py-1 rounded-lg">
                <Activity className="h-3 w-3 animate-pulse" />
                <span>99.9%</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00A859]" />
                <span>Available for New Projects</span>
              </div>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-purple-300 hover:text-white transition-colors group"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}