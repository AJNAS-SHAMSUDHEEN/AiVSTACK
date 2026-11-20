"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { WebGLRobot } from "@/components/home/WebGLRobot";

export function FloatingRobotCompanion() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isResting, setIsResting] = useState(true);
  const [speechText, setSpeechText] = useState<string | null>(null);

  // Robot Position Coordinates (Spring-damped for smooth cinematic transit between perches)
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Flying spring physics (gentle takeoff, smooth glide, soft landing)
  const flightSpring = { damping: 26, stiffness: 65, mass: 0.9 };
  const smoothX = useSpring(targetX, flightSpring);
  const smoothY = useSpring(targetY, flightSpring);
  const smoothBank = useSpring(0, { damping: 18, stiffness: 90 });

  const currentPerchIndex = useRef(0);
  const isTransitioning = useRef(false);

  // Visibility: On home only after hero scrolls away, on other pages always
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setIsVisible(window.scrollY > 400);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Safe Blank Whitespace Perch Locations (Strictly in the outer gutters, NEVER covering content)
  const getSafePerches = () => {
    if (typeof window === "undefined") return [{ x: 1000, y: 500 }];
    const w = window.innerWidth;
    const h = window.innerHeight;

    return [
      // Perch 0: Bottom-right outer gutter (cleanly inside viewport)
      { x: w - 110, y: h - 130 },
      // Perch 1: Mid-right outer gutter
      { x: w - 105, y: Math.max(140, h * 0.42) },
      // Perch 2: Lower-right outer gutter
      { x: w - 110, y: Math.max(160, h * 0.68) },
      // Perch 3: Upper-right outer gutter (cleanly below navbar)
      { x: w - 110, y: 130 },
      // Perch 4: Bottom-left outer gutter
      { x: 95, y: h - 130 },
    ];
  };

  // Autonomous "Perch & Wander" State Machine:
  // Stands/rests in a free whitespace area for 2.5-3 seconds, then flies to another free space
  useEffect(() => {
    if (!isVisible) return;

    let timer: NodeJS.Timeout;
    const perches = getSafePerches();

    // Initial perch setup
    const initial = perches[0];
    targetX.set(initial.x);
    targetY.set(initial.y);

    const runPerchCycle = () => {
      // 1. STAND & REST in current free space for 2.5 - 3.2 seconds
      setIsResting(true);
      smoothBank.set(0);

      const restDuration = 2600 + Math.random() * 800; // 2.6s to 3.4s rest

      timer = setTimeout(() => {
        // 2. TIME TO MOVE: Pick a new different free whitespace perch
        const currentPerches = getSafePerches();
        let nextIndex = Math.floor(Math.random() * currentPerches.length);
        while (nextIndex === currentPerchIndex.current) {
          nextIndex = Math.floor(Math.random() * currentPerches.length);
        }
        currentPerchIndex.current = nextIndex;

        const nextPerch = currentPerches[nextIndex];
        setIsResting(false);

        // Bank tilt into flight direction
        const deltaX = nextPerch.x - targetX.get();
        const bankAngle = Math.min(20, Math.max(-20, deltaX * 0.08));
        smoothBank.set(bankAngle);

        // Fly to the new safe perch
        targetX.set(nextPerch.x);
        targetY.set(nextPerch.y);

        // Transit time ~ 1.8 seconds, then land and rest again
        setTimeout(() => {
          smoothBank.set(0);
          runPerchCycle();
        }, 1800);
      }, restDuration);
    };

    runPerchCycle();

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, targetX, targetY, smoothBank]);

  // Handle window resizing dynamically
  useEffect(() => {
    const handleResize = () => {
      const perches = getSafePerches();
      const current = perches[currentPerchIndex.current] || perches[0];
      targetX.set(current.x);
      targetY.set(current.y);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [targetX, targetY]);

  // Contextual Greetings on Route Navigation
  useEffect(() => {
    let greeting = "PATROLLING FREE SPACE!";
    if (pathname.includes("/portfolio")) {
      greeting = "CHECKING OUR BUILDS?";
    } else if (pathname.includes("/services")) {
      greeting = "NEED SOFTWARE OR AI DEV?";
    } else if (pathname.includes("/process")) {
      greeting = "HOW WE SHIP CODE!";
    } else if (pathname.includes("/about")) {
      greeting = "MEET THE AIVSTACK TEAM!";
    } else if (pathname.includes("/contact") || pathname.includes("/start-a-project")) {
      greeting = "READY TO BUILD?";
    }

    setSpeechText(greeting);
    const timer = setTimeout(() => {
      setSpeechText(null);
    }, 3200);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Robot Container positioned smoothly in Safe Whitespace Gutters */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotateZ: smoothBank,
        }}
        className="absolute top-0 left-0 flex flex-col items-center select-none"
      >
        {/* Soft Organic Breathing Bob while Standing/Resting */}
        <motion.div
          animate={
            isResting
              ? {
                y: [-2, 2, -2],
              }
              : {
                y: [-5, 5, -5],
              }
          }
          transition={{
            repeat: Infinity,
            duration: isResting ? 3.0 : 1.8,
            ease: "easeInOut",
          }}
          className="relative pointer-events-auto cursor-pointer"
        >
          {/* Compact WebGL Scale (~35%) - Very Small, Pristine, Never Overlaps Content */}
          <div className="transform scale-[0.38] origin-center -m-16">
            <WebGLRobot
              key="v4-tracker-companion"
              size="compact"
              initialSpeech={speechText}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
