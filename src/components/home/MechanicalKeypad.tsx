"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Web Audio API Synthesizer for Authentic Mechanical Switch Clicks
function playMechanicalClick(type: "blue" | "brown" | "spacebar" | "knob" = "blue") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    const now = ctx.currentTime;

    if (type === "spacebar") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    } else if (type === "knob") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    } else {
      // Crisp mechanical click
      osc.type = "square";
      osc.frequency.setValueAtTime(type === "blue" ? 1800 : 900, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    }

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Ignore audio permission or context restrictions
  }
}

export function MechanicalKeypad() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Knob Rotation State
  const [knobRotation, setKnobRotation] = useState(35);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // 3D Parallax Tilt with Framer Motion Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Dynamic 3D Isometric View: base tilt + cursor responsiveness
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [52, 44]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, -4]);
  const rotateZ = useTransform(smoothMouseX, [-0.5, 0.5], [16, 24]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleKnobClick = () => {
    playMechanicalClick("knob");
    setKnobRotation((prev) => (prev + 45) % 360);
    setActiveToast("ROTARY ENCODER TICK");
    setTimeout(() => setActiveToast(null), 1200);
  };

  const handleKeyAction = (keyId: string, sound: "blue" | "brown" | "spacebar", route?: string) => {
    playMechanicalClick(sound);
    setPressedKey(keyId);
    setTimeout(() => setPressedKey(null), 200);

    if (route) {
      setTimeout(() => router.push(route), 260);
    } else if (keyId === "lab") {
      setActiveToast("AIVSTACK INNOVATION LAB");
      setTimeout(() => setActiveToast(null), 1600);
    } else if (keyId === "star") {
      setActiveToast("STACK V4.2 ACTIVATED");
      setTimeout(() => setActiveToast(null), 1600);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[460px] h-[380px] flex items-center justify-center select-none py-4"
      style={{ perspective: 1200 }}
    >
      {/* Interactive Status Tooltip Toast */}
      {activeToast && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-2 z-50 px-4 py-1.5 rounded-full bg-gray-950 text-white text-xs font-mono font-bold tracking-wider shadow-xl flex items-center gap-2 border border-gray-800"
        >
          <span className="w-2 h-2 rounded-full bg-[#00A859] animate-pulse" />
          {activeToast}
        </motion.div>
      )}

      {/* Main 3D Isometric Keyboard Pad Chassis */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[340px] sm:w-[370px] h-[225px] sm:h-[240px] rounded-[38px] p-5 transition-shadow duration-300 cursor-default"
      >
        {/* Deep Multi-Layer Drop Shadow simulating real desk contact */}
        <div
          className="absolute inset-0 rounded-[40px] bg-gray-900/25 blur-2xl transform translate-y-12 translate-x-4 -z-20 pointer-events-none"
          style={{ transform: "translateZ(-40px)" }}
        />
        <div
          className="absolute inset-0 rounded-[40px] bg-blue-900/10 blur-3xl transform translate-y-16 -z-30 pointer-events-none"
          style={{ transform: "translateZ(-60px)" }}
        />

        {/* Outer Aluminum Tray / Chassis (Light Metallic Chamfered Edges) */}
        <div
          className="absolute inset-0 rounded-[38px] border border-gray-200/90 shadow-[0_12px_24px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-4px_8px_rgba(0,0,0,0.1)] -z-10"
          style={{
            background: "linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)",
            transform: "translateZ(0px)",
          }}
        >
          {/* Subtle Ambient LED Status Strip on Bottom Right Rim */}
          <div className="absolute bottom-4 right-8 w-6 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
        </div>

        {/* Recessed Switch Plate Well (Dark Inner Bezel) */}
        <div
          className="relative w-full h-full rounded-[26px] p-3 shadow-[inset_0_4px_10px_rgba(0,0,0,0.2),inset_0_-2px_4px_rgba(255,255,255,0.6)] border border-gray-300/80"
          style={{
            background: "linear-gradient(160deg, #e4e7eb 0%, #d8dce2 100%)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Key Layout Grid */}
          <div className="w-full h-full flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
            
            {/* ROW 1: Rotary Knob | Asterisk Key | Projects Key */}
            <div className="flex items-center justify-between gap-3" style={{ transformStyle: "preserve-3d" }}>
              {/* 1. Metallic Rotary Encoder Knob */}
              <div
                onClick={handleKnobClick}
                className="relative w-14 h-14 rounded-full cursor-pointer group flex items-center justify-center transition-transform active:scale-95"
                style={{
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="Rotate Knob"
              >
                {/* Knob Base Shadow */}
                <div className="absolute inset-0 rounded-full bg-black/30 blur-[3px] transform translate-y-2" />

                {/* Knurled Outer Ring */}
                <div
                  className="absolute inset-0 rounded-full border border-gray-300 shadow-[0_6px_12px_rgba(0,0,0,0.2),inset_0_2px_3px_rgba(255,255,255,0.9)]"
                  style={{
                    background: "linear-gradient(135deg, #eef0f3 0%, #cbd2d9 50%, #9aa5b1 100%)",
                  }}
                />

                {/* Top Brushed Metal Cap with Dynamic Indicator Notch */}
                <motion.div
                  animate={{ rotate: knobRotation }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(255,255,255,0.9),0_2px_4px_rgba(0,0,0,0.15)]"
                  style={{
                    background: "conic-gradient(from 0deg, #f1f3f5, #cbd2d9, #e9ecef, #f8f9fa, #cbd2d9, #f1f3f5)",
                  }}
                >
                  {/* Blue Position Line */}
                  <div className="absolute top-1.5 w-1 h-3 rounded-full bg-blue-600 shadow-[0_0_4px_#2563eb]" />
                </motion.div>
              </div>

              {/* 2. Matte Black Asterisk Keycap (*) */}
              <motion.button
                onClick={() => handleKeyAction("star", "brown")}
                animate={{
                  y: pressedKey === "star" ? 5 : 0,
                  boxShadow:
                    pressedKey === "star"
                      ? "0 2px 4px rgba(0,0,0,0.4)"
                      : "0 8px 16px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.2)",
                }}
                className="relative w-14 h-13 rounded-2xl cursor-pointer flex items-center justify-center text-white/90 font-mono text-xl font-black border border-gray-800 transition-all active:scale-98"
                style={{
                  background: "linear-gradient(165deg, #2b2e35 0%, #1a1c22 60%, #111216 100%)",
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="System Asterisk"
              >
                <span className="transform -translate-y-0.5 tracking-tighter text-gray-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  ✱
                </span>
              </motion.button>

              {/* 3. Wide Cream/White Projects Keycap */}
              <motion.button
                onClick={() => handleKeyAction("projects", "blue", "/portfolio")}
                animate={{
                  y: pressedKey === "projects" ? 5 : 0,
                  boxShadow:
                    pressedKey === "projects"
                      ? "0 2px 4px rgba(0,0,0,0.15)"
                      : "0 9px 18px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)",
                }}
                className="relative flex-1 h-13 rounded-2xl cursor-pointer flex items-center justify-center px-4 border border-gray-200/90 transition-all active:scale-98"
                style={{
                  background: "linear-gradient(170deg, #ffffff 0%, #f7f9fa 60%, #e9ecef 100%)",
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="Navigate to Projects"
              >
                <span className="font-sans text-xs sm:text-sm font-bold tracking-tight text-gray-800 lowercase">
                  projects
                </span>
              </motion.button>
            </div>

            {/* ROW 2: About Key | Chrome Lab Key | Acrylic Transparent Switch Key */}
            <div className="flex items-center justify-between gap-3" style={{ transformStyle: "preserve-3d" }}>
              {/* 4. Cream/White About Keycap */}
              <motion.button
                onClick={() => handleKeyAction("about", "blue", "/about")}
                animate={{
                  y: pressedKey === "about" ? 5 : 0,
                  boxShadow:
                    pressedKey === "about"
                      ? "0 2px 4px rgba(0,0,0,0.15)"
                      : "0 9px 18px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)",
                }}
                className="relative flex-1 h-13 rounded-2xl cursor-pointer flex items-center justify-center px-4 border border-gray-200/90 transition-all active:scale-98"
                style={{
                  background: "linear-gradient(170deg, #ffffff 0%, #f7f9fa 60%, #e9ecef 100%)",
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="Navigate to About"
              >
                <span className="font-sans text-xs sm:text-sm font-bold tracking-tight text-gray-800 lowercase">
                  about
                </span>
              </motion.button>

              {/* 5. Polished Reflective Chrome "Lab" Keycap */}
              <motion.button
                onClick={() => handleKeyAction("lab", "brown")}
                animate={{
                  y: pressedKey === "lab" ? 5 : 0,
                  boxShadow:
                    pressedKey === "lab"
                      ? "0 2px 4px rgba(0,0,0,0.3)"
                      : "0 9px 18px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,1)",
                }}
                className="relative w-16 sm:w-18 h-13 rounded-2xl cursor-pointer flex items-center justify-center border border-gray-300 transition-all active:scale-98"
                style={{
                  background: "linear-gradient(140deg, #ffffff 0%, #d8dde3 25%, #8a94a2 50%, #f1f3f5 75%, #ffffff 100%)",
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="Innovation Lab"
              >
                <span className="font-mono text-xs sm:text-sm font-black tracking-tight text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] lowercase">
                  lab
                </span>
              </motion.button>

              {/* 6. Transparent Polycarbonate Acrylic Keycap (Exposing Switch Stem) */}
              <motion.button
                onClick={() => handleKeyAction("acrylic", "blue")}
                animate={{
                  y: pressedKey === "acrylic" ? 5 : 0,
                  boxShadow:
                    pressedKey === "acrylic"
                      ? "0 2px 4px rgba(0,0,0,0.15)"
                      : "0 9px 18px rgba(0,0,0,0.18), inset 0 2px 5px rgba(255,255,255,0.9)",
                }}
                className="relative w-15 sm:w-16 h-13 rounded-2xl cursor-pointer flex items-center justify-center border border-blue-200/50 backdrop-blur-md overflow-hidden transition-all active:scale-98"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(200,225,255,0.4) 60%, rgba(180,210,255,0.6) 100%)",
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="Mechanical Switch Preview"
              >
                {/* Visible Internal Mechanical Switch Stem (Cyan/Blue Cross) */}
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="w-4 h-1.5 bg-blue-500 rounded-sm shadow-[0_0_6px_#3b82f6]" />
                  <div className="absolute w-1.5 h-4 bg-blue-500 rounded-sm shadow-[0_0_6px_#3b82f6]" />
                  <div className="absolute w-2 h-2 rounded-full bg-blue-300" />
                </div>
              </motion.button>
            </div>

            {/* ROW 3: Enter Key (↵) | Big Vibrant Blue Spacebar (say hello) */}
            <div className="flex items-center justify-between gap-3" style={{ transformStyle: "preserve-3d" }}>
              {/* 7. Enter Key with Arrow (↵) */}
              <motion.button
                onClick={() => handleKeyAction("enter", "blue")}
                animate={{
                  y: pressedKey === "enter" ? 5 : 0,
                  boxShadow:
                    pressedKey === "enter"
                      ? "0 2px 4px rgba(0,0,0,0.15)"
                      : "0 9px 18px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)",
                }}
                className="relative w-14 sm:w-16 h-13 rounded-2xl cursor-pointer flex items-center justify-center border border-gray-200/90 transition-all active:scale-98"
                style={{
                  background: "linear-gradient(170deg, #ffffff 0%, #f7f9fa 60%, #e9ecef 100%)",
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="Enter"
              >
                <span className="font-mono text-base font-black text-gray-800">↵</span>
              </motion.button>

              {/* 8. Vibrant Royal Blue Spacebar "say hello" */}
              <motion.button
                onClick={() => handleKeyAction("hello", "spacebar", "/start-a-project")}
                animate={{
                  y: pressedKey === "hello" ? 5 : 0,
                  boxShadow:
                    pressedKey === "hello"
                      ? "0 2px 4px rgba(29,78,216,0.5)"
                      : "0 10px 22px rgba(29,78,216,0.4), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.2)",
                }}
                className="relative flex-1 h-13 rounded-2xl cursor-pointer flex items-center justify-center px-6 border border-blue-400/40 transition-all active:scale-98 group overflow-hidden"
                style={{
                  background: "linear-gradient(165deg, #3b82f6 0%, #2563eb 55%, #1d4ed8 100%)",
                  transform: "translateZ(18px)",
                  transformStyle: "preserve-3d",
                }}
                title="Contact AIVSTACK (Say Hello)"
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className="font-sans text-xs sm:text-sm font-bold tracking-wider text-white lowercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  say hello
                </span>
              </motion.button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
