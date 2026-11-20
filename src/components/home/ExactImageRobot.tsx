"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Web Audio API Synthesizer for Cute Robotic Chirps
function playRobotChirp() {
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
  } catch {
    // Ignore audio policy restrictions
  }
}

export function ExactImageRobot({
  variant = 1, // 1 for Image 1 (Floating Torpedo Bot) or 2 for Image 2 (Chibi Antenna Bot)
  size = "normal",
  initialSpeech = "ONLINE • AI V4.2",
  className = "",
}: {
  variant?: 1 | 2;
  size?: "normal" | "compact";
  initialSpeech?: string | null;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<string | null>(initialSpeech);

  useEffect(() => {
    if (initialSpeech !== undefined) {
      setActiveSpeech(initialSpeech);
    }
  }, [initialSpeech]);

  // Normalized cursor coordinates (-1 to 1)
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);

  // Smooth springs for realistic 3D head and body tilt
  const springConfig = { stiffness: 140, damping: 18 };
  const smoothX = useSpring(mouseNormX, springConfig);
  const smoothY = useSpring(mouseNormY, springConfig);

  // 3D Euler Rotations tracking the cursor
  const rotateY = useTransform(smoothX, [-1, 1], [-24, 24]);
  const rotateX = useTransform(smoothY, [-1, 1], [18, -18]);

  // Dynamic Eye Pupil Shift (Moving inside the visor towards cursor)
  const eyeShiftX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const eyeShiftY = useTransform(smoothY, [-1, 1], [-7, 7]);

  // Continuous Mouse Tracking Loop
  useEffect(() => {
    let animId: number;
    let latestMouseX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
    let latestMouseY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

    const onMove = (e: MouseEvent) => {
      latestMouseX = e.clientX;
      latestMouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const trackLoop = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (latestMouseX - centerX) / (window.innerWidth / 2);
        const deltaY = (latestMouseY - centerY) / (window.innerHeight / 2);

        mouseNormX.set(Math.max(-1, Math.min(1, deltaX)));
        mouseNormY.set(Math.max(-1, Math.min(1, deltaY)));
      }
      animId = requestAnimationFrame(trackLoop);
    };

    animId = requestAnimationFrame(trackLoop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, [mouseNormX, mouseNormY]);

  // Periodic Natural Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150);
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    playRobotChirp();
    setActiveSpeech("HELLO HUMAN! READY TO BUILD?");
    setTimeout(() => setActiveSpeech(null), 2800);
  };

  const isCompact = size === "compact";
  const imageSrc = variant === 2 ? "/brand/exact_robot_2.png" : "/brand/exact_robot_1.png";

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${
        isCompact ? "w-[180px] h-[190px]" : "w-[300px] sm:w-[340px] h-[340px]"
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

      {/* Ambient Radial Cyan Glow */}
      <div className="absolute w-[260px] h-[260px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-teal-400/10 to-blue-500/10 blur-3xl -z-10 pointer-events-none" />

      {/* Floating 3D Robot Container with Levitation Bob */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.6,
          ease: "easeInOut",
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex items-center justify-center"
      >
        {/* EXACT 3D RENDERED ROBOT IMAGE (Extracted to Pure Transparency) */}
        <div className="relative w-[210px] sm:w-[250px] h-[210px] sm:h-[250px]">
          <Image
            src={imageSrc}
            alt="AIVSTACK 3D Digital Robot"
            fill
            sizes="(max-width: 768px) 210px, 250px"
            className="object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.14)]"
            priority
          />

          {/* DYNAMIC EYE-POINTING LAYER (Inside Visor Coordinates) */}
          {variant === 1 && (
            <motion.div
              style={{
                x: eyeShiftX,
                y: eyeShiftY,
              }}
              className="absolute top-[31%] left-[23%] w-[54%] h-[28%] flex items-center justify-between px-2.5 pointer-events-none"
            >
              {/* Left Dynamic Glowing Eye Ring */}
              <div className="relative w-8 h-8 rounded-full border-[2.8px] border-[#00f0ff] shadow-[0_0_12px_#00f0ff,inset_0_0_8px_rgba(0,240,255,0.6)] flex items-center justify-center bg-[#070b14]/90">
                <div className="w-4 h-4 rounded-full bg-[#080d16] relative flex items-center justify-center">
                  <div className="absolute top-0.5 left-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_3px_#fff]" />
                </div>
              </div>

              {/* Right Dynamic Glowing Eye Ring */}
              <div className="relative w-8 h-8 rounded-full border-[2.8px] border-[#00f0ff] shadow-[0_0_12px_#00f0ff,inset_0_0_8px_rgba(0,240,255,0.6)] flex items-center justify-center bg-[#070b14]/90">
                <div className="w-4 h-4 rounded-full bg-[#080d16] relative flex items-center justify-center">
                  <div className="absolute top-0.5 left-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_3px_#fff]" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Natural Eye Blink Overlay */}
          {isBlinking && (
            <div className="absolute top-[38%] left-[26%] w-[48%] h-2 bg-[#05080e] rounded-full flex items-center justify-between px-3 pointer-events-none">
              <div className="w-7 h-1 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
              <div className="w-7 h-1 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
            </div>
          )}
        </div>

        {/* Soft Ambient Floating Shadow on Ground */}
        <motion.div
          animate={{
            scale: [1, 0.88, 1],
            opacity: [0.22, 0.12, 0.22],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.6,
            ease: "easeInOut",
          }}
          className="absolute -bottom-4 w-28 h-3.5 rounded-full bg-gray-900 blur-md -z-20 pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
