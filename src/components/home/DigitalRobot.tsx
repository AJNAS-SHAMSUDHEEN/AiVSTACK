"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Web Audio API Synthesizer for Cute Robotic Chirps & Whistles
function playRobotChirp(mood: "happy" | "curious" | "blink" = "happy") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (mood === "happy") {
      // Cheerful rising two-tone chirp
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.08);
      osc.frequency.setValueAtTime(920, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(1650, now + 0.18);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else {
      // Soft digital blip
      osc.type = "triangle";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {
    // Ignore audio policy restrictions
  }
}

export function DigitalRobot({
  size = "normal",
  initialSpeech = "ONLINE • AI V4.2",
  className = "",
}: {
  size?: "normal" | "compact";
  initialSpeech?: string | null;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<string | null>(initialSpeech);

  useEffect(() => {
    if (initialSpeech !== undefined) {
      setActiveSpeech(initialSpeech);
    }
  }, [initialSpeech]);

  // Normalized cursor coordinates (-1 to 1 relative to robot center)
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);

  // Smooth Springs for Organic Head & Eye Tracking
  const springHead = { stiffness: 130, damping: 20 };
  const smoothHeadX = useSpring(mouseNormX, springHead);
  const smoothHeadY = useSpring(mouseNormY, springHead);

  const springEye = { stiffness: 380, damping: 26 };
  const smoothEyeX = useSpring(mouseNormX, springEye);
  const smoothEyeY = useSpring(mouseNormY, springEye);

  // 3D Head Euler Rotations
  const headRotateY = useTransform(smoothHeadX, [-1, 1], [-25, 25]);
  const headRotateX = useTransform(smoothHeadY, [-1, 1], [18, -18]);
  const headTranslateX = useTransform(smoothHeadX, [-1, 1], [-14, 14]);
  const headTranslateY = useTransform(smoothHeadY, [-1, 1], [-10, 10]);

  // Eye Ring & Pupil Tracking inside the Visor (Accurate Eye Pointing)
  const eyeOffsetX = useTransform(smoothEyeX, [-1, 1], [-20, 20]);
  const eyeOffsetY = useTransform(smoothEyeY, [-1, 1], [-14, 14]);

  // Continuous Frame-by-Frame Mouse Tracking (Locks eyes on cursor even if mouse is still)
  useEffect(() => {
    let animId: number;
    let latestMouseX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
    let latestMouseY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      latestMouseX = e.clientX;
      latestMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

    const eyeTrackLoop = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (latestMouseX - centerX) / (window.innerWidth / 2);
        const deltaY = (latestMouseY - centerY) / (window.innerHeight / 2);

        mouseNormX.set(Math.max(-1, Math.min(1, deltaX)));
        mouseNormY.set(Math.max(-1, Math.min(1, deltaY)));
      }
      animId = requestAnimationFrame(eyeTrackLoop);
    };

    animId = requestAnimationFrame(eyeTrackLoop);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [mouseNormX, mouseNormY]);

  // Periodic Natural Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        if (Math.random() > 0.65) {
          setTimeout(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 110);
          }, 140);
        }
      }, 150);
    }, 3600);

    return () => clearInterval(blinkInterval);
  }, []);

  // Robot Click Reaction (Cheer, Arc Smile, Audio Chirp)
  const handleRobotClick = () => {
    playRobotChirp("happy");
    setIsHappy(true);
    setActiveSpeech("HELLO HUMAN! READY TO BUILD?");
    setTimeout(() => {
      setIsHappy(false);
      setActiveSpeech(null);
    }, 2800);
  };

  const isCompact = size === "compact";

  return (
    <div
      ref={containerRef}
      onClick={handleRobotClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${
        isCompact ? "w-[260px] h-[280px]" : "w-full max-w-[420px] h-[400px]"
      } ${className}`}
      style={{ perspective: 1000 }}
      title="Click me!"
    >
      {/* Speech Bubble Pill */}
      {activeSpeech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-3 z-30 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#00f0ff]/40 text-gray-900 text-[11px] font-mono font-bold tracking-wide shadow-lg flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          {activeSpeech}
        </motion.div>
      )}

      {/* Ambient Radial Cyan/Teal Glow Behind Robot */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-teal-400/10 to-blue-500/10 blur-3xl -z-10 pointer-events-none" />

      {/* Floating Robot Body with Organic Levitation Bob */}
      <motion.div
        animate={{
          y: [0, -9, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ================= ROBOT HEAD ================= */}
        <motion.div
          style={{
            rotateX: headRotateX,
            rotateY: headRotateY,
            x: headTranslateX,
            y: headTranslateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[215px] h-[180px] flex items-center justify-center"
        >
          {/* Main White Ceramic Helmet Dome (Matching Reference Shape Exactly) */}
          <div
            className="absolute inset-0 rounded-[64px] border border-gray-200/90 shadow-[0_16px_36px_rgba(0,0,0,0.12),inset_0_3px_8px_rgba(255,255,255,1),inset_0_-5px_10px_rgba(0,0,0,0.06)] -z-10"
            style={{
              background: "linear-gradient(155deg, #ffffff 0%, #f6f8fa 50%, #e8edf3 100%)",
            }}
          />

          {/* Left Cylindrical Ear Pod with Concentric Dark Grooves */}
          <div
            className="absolute -left-5 w-6 h-20 rounded-[14px] border border-gray-300 shadow-[0_6px_14px_rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(140deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)",
              transform: "translateZ(-8px)",
            }}
          >
            {/* Dark Concentric Inner Rings */}
            <div className="w-3.5 h-14 rounded-[8px] bg-[#1e293b] flex items-center justify-center">
              <div className="w-1.5 h-8 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            </div>
          </div>

          {/* Right Cylindrical Ear Pod with Concentric Dark Grooves */}
          <div
            className="absolute -right-5 w-6 h-20 rounded-[14px] border border-gray-300 shadow-[0_6px_14px_rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(140deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)",
              transform: "translateZ(-8px)",
            }}
          >
            {/* Dark Concentric Inner Rings */}
            <div className="w-3.5 h-14 rounded-[8px] bg-[#1e293b] flex items-center justify-center">
              <div className="w-1.5 h-8 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            </div>
          </div>

          {/* Top Forehead Glowing Cyan LED Strip */}
          <div
            className="absolute top-2 w-8 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-pulse"
            style={{ transform: "translateZ(10px)" }}
          />

          {/* Chin Bevel Screws */}
          <div
            className="absolute bottom-2.5 left-16 w-1.5 h-1.5 rounded-full bg-gray-400 border border-gray-500 shadow-inner"
            style={{ transform: "translateZ(8px)" }}
          />
          <div
            className="absolute bottom-2.5 right-16 w-1.5 h-1.5 rounded-full bg-gray-400 border border-gray-500 shadow-inner"
            style={{ transform: "translateZ(8px)" }}
          />

          {/* Wide Glossy Curved Obsidian Glass Visor */}
          <div
            className="relative w-[174px] h-[132px] rounded-[48px] bg-[#070b12] border-2 border-[#161f30] shadow-[inset_0_4px_16px_rgba(0,0,0,0.9),inset_0_-2px_6px_rgba(255,255,255,0.12)] flex items-center justify-center overflow-hidden"
            style={{ transform: "translateZ(14px)" }}
          >
            {/* Visor Specular Glass Arc Reflection */}
            <div className="absolute -top-10 -left-6 w-36 h-20 rounded-full bg-gradient-to-b from-white/22 to-transparent rotate-[-24deg] pointer-events-none blur-[0.8px]" />
            <div className="absolute bottom-1 right-3 w-24 h-6 rounded-full bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />

            {/* ================= ROBOT EYES (POINTING AT MOUSE) ================= */}
            <motion.div
              style={{
                x: eyeOffsetX,
                y: eyeOffsetY,
              }}
              className="relative flex items-center justify-center gap-6 z-10"
            >
              {/* LEFT EYE (GLOWING NEON CYAN CIRCLE RING WITH PUPIL) */}
              <div className="relative flex items-center justify-center">
                {isBlinking ? (
                  // Blinking Glow Line
                  <div className="w-10 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_14px_#00f0ff]" />
                ) : isHappy ? (
                  // Happy Arc Eye (^_^)
                  <div className="w-11 h-8 border-t-[4.5px] border-[#00f0ff] rounded-t-full shadow-[0_-2px_14px_#00f0ff]" />
                ) : (
                  // CIRCULAR NEON CYAN RING EYE (Exact Match to Image 1)
                  <div className="relative w-12 h-12 rounded-full border-[3.8px] border-[#00f0ff] shadow-[0_0_20px_#00f0ff,inset_0_0_14px_rgba(0,240,255,0.4)] flex items-center justify-center bg-[#05080e]/90">
                    {/* Dark Center Pupil */}
                    <div className="w-7 h-7 rounded-full bg-[#0a0f18] flex items-center justify-center relative">
                      {/* Crisp White Specular Catchlight Highlight */}
                      <div className="absolute top-1 left-1.5 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_5px_#ffffff]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-cyan-900/60" />
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT EYE (GLOWING NEON CYAN CIRCLE RING WITH PUPIL) */}
              <div className="relative flex items-center justify-center">
                {isBlinking ? (
                  // Blinking Glow Line
                  <div className="w-10 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_14px_#00f0ff]" />
                ) : isHappy ? (
                  // Happy Arc Eye (^_^)
                  <div className="w-11 h-8 border-t-[4.5px] border-[#00f0ff] rounded-t-full shadow-[0_-2px_14px_#00f0ff]" />
                ) : (
                  // CIRCULAR NEON CYAN RING EYE (Exact Match to Image 1)
                  <div className="relative w-12 h-12 rounded-full border-[3.8px] border-[#00f0ff] shadow-[0_0_20px_#00f0ff,inset_0_0_14px_rgba(0,240,255,0.4)] flex items-center justify-center bg-[#05080e]/90">
                    {/* Dark Center Pupil */}
                    <div className="w-7 h-7 rounded-full bg-[#0a0f18] flex items-center justify-center relative">
                      {/* Crisp White Specular Catchlight Highlight */}
                      <div className="absolute top-1 left-1.5 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_5px_#ffffff]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-cyan-900/60" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Glowing Cyan Cute Horizontal Mouth / Smile Bar */}
            <div className="absolute bottom-4 w-7 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
          </div>
        </motion.div>

        {/* ================= ROBOT NECK JOINT ================= */}
        {/* Accordion / Ribbed Black Mechanical Neck Rings */}
        <div
          className="relative w-16 h-5 -mt-1 rounded-full bg-[#111827] border border-gray-700 shadow-md flex flex-col items-center justify-center gap-0.5 overflow-hidden"
          style={{ transform: "translateZ(-4px)" }}
        >
          <div className="w-14 h-1 rounded-full bg-gray-800" />
          <div className="w-12 h-1 rounded-full bg-gray-900" />
        </div>

        {/* ================= ROBOT TORSO (WHITE FLOATING POD BODY) ================= */}
        <motion.div
          style={{
            rotateX: useTransform(headRotateX, (val) => val * 0.3),
            rotateY: useTransform(headRotateY, (val) => val * 0.3),
            x: useTransform(headTranslateX, (val) => val * 0.25),
            transformStyle: "preserve-3d",
            background: "linear-gradient(160deg, #ffffff 0%, #f1f4f8 50%, #dbe2ec 100%)",
          }}
          className="relative w-[130px] h-[105px] -mt-1 rounded-t-[38px] rounded-b-[50px] border border-gray-200/90 shadow-[0_14px_30px_rgba(0,0,0,0.12),inset_0_2px_5px_rgba(255,255,255,1)] flex flex-col items-center justify-center"
        >
          {/* Left Shoulder Nub */}
          <div className="absolute -left-2.5 top-4 w-3.5 h-9 rounded-full bg-[#1e293b] border border-gray-600 shadow-sm" />
          {/* Right Shoulder Nub */}
          <div className="absolute -right-2.5 top-4 w-3.5 h-9 rounded-full bg-[#1e293b] border border-gray-600 shadow-sm" />

          {/* Central Black Capsule Vent Grille (Exact Match to Image 1) */}
          <div className="relative w-9 h-15 rounded-full bg-[#0d121c] border-2 border-gray-400/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
            {/* Vertical Grille Louver Lines */}
            <div className="flex gap-1 opacity-70">
              <div className="w-1 h-9 bg-gray-700 rounded-full" />
              <div className="w-1 h-11 bg-gray-600 rounded-full" />
              <div className="w-1 h-9 bg-gray-700 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Soft Ambient Ground Floating Shadow */}
        <motion.div
          animate={{
            scale: [1, 0.88, 1],
            opacity: [0.22, 0.12, 0.22],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.8,
            ease: "easeInOut",
          }}
          className="w-28 h-3.5 rounded-full bg-gray-900 blur-md mt-4 -z-20"
        />
      </motion.div>
    </div>
  );
}
