"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseR: number;
  currentR: number;
  alpha: number;
  targetAlpha: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export function HiddenDotReveal({
  width = 500,
  height = 420,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    // Responsive Canvas Dimensions
    let rectWidth = width;
    let rectHeight = height;

    const updateSize = () => {
      if (containerRef.current) {
        rectWidth = containerRef.current.clientWidth || width;
        rectHeight = containerRef.current.clientHeight || height;
      }
      canvas.width = rectWidth * dpr;
      canvas.height = rectHeight * dpr;
      canvas.style.width = `${rectWidth}px`;
      canvas.style.height = `${rectHeight}px`;
      ctx.scale(dpr, dpr);
    };

    updateSize();

    // Create 2D Matrix Grid of Dots (Spaced evenly across the canvas)
    const spacing = 22; // Distance between dots
    const dots: Dot[] = [];

    const initDots = () => {
      dots.length = 0;
      const cols = Math.floor(rectWidth / spacing);
      const rows = Math.floor(rectHeight / spacing);
      const startX = (rectWidth - (cols - 1) * spacing) / 2;
      const startY = (rectHeight - (rows - 1) * spacing) / 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: startX + c * spacing,
            y: startY + r * spacing,
            baseR: 1.6,
            currentR: 1.6,
            alpha: 0,
            targetAlpha: 0,
            color: "#00A859",
          });
        }
      }
    };

    initDots();

    // Mouse Tracking State
    let mouseX = -9999;
    let mouseY = -9999;
    let smoothMouseX = -9999;
    let smoothMouseY = -9999;
    let isHovered = false;

    // Interactive Shockwaves on Click
    const ripples: Ripple[] = [];

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouseX = clientX - rect.left;
      mouseY = clientY - rect.top;
      isHovered = true;
    };

    const onPointerLeave = () => {
      isHovered = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const onClick = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      ripples.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        radius: 5,
        maxRadius: 220,
        alpha: 1,
        speed: 7,
      });
    };

    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("mouseleave", onPointerLeave);
    canvas.addEventListener("click", onClick);

    canvas.addEventListener("touchmove", onPointerMove, { passive: true });
    canvas.addEventListener("touchend", onPointerLeave);

    const revealRadius = 135; // Mouse pointer reveal radius

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, rectWidth, rectHeight);

      // Smooth cursor interpolation for fluid reveal experience
      if (isHovered && mouseX > -500) {
        if (smoothMouseX < -500) {
          smoothMouseX = mouseX;
          smoothMouseY = mouseY;
        } else {
          smoothMouseX += (mouseX - smoothMouseX) * 0.22;
          smoothMouseY += (mouseY - smoothMouseY) * 0.22;
        }
      } else {
        smoothMouseX += (-9999 - smoothMouseX) * 0.1;
        smoothMouseY += (-9999 - smoothMouseY) * 0.1;
      }

      // Update and propagate Click Shockwave Ripples
      for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
        const rip = ripples[rIdx];
        rip.radius += rip.speed;
        rip.alpha *= 0.94;

        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          ripples.splice(rIdx, 1);
        }
      }

      // Soft ambient pointer radial spotlight glow
      if (isHovered && smoothMouseX > -500) {
        const spotlight = ctx.createRadialGradient(
          smoothMouseX,
          smoothMouseY,
          0,
          smoothMouseX,
          smoothMouseY,
          revealRadius
        );
        spotlight.addColorStop(0, "rgba(0, 168, 89, 0.08)");
        spotlight.addColorStop(0.5, "rgba(0, 168, 89, 0.03)");
        spotlight.addColorStop(1, "rgba(0, 168, 89, 0)");
        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(smoothMouseX, smoothMouseY, revealRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and render dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // 1. Proximity to Mouse Pointer Radius
        let proximityInfluence = 0;
        if (isHovered && smoothMouseX > -500) {
          const dx = dot.x - smoothMouseX;
          const dy = dot.y - smoothMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < revealRadius) {
            const norm = (revealRadius - dist) / revealRadius;
            proximityInfluence = norm * norm * (3 - 2 * norm); // Smooth cubic hermite curve
          }
        }

        // 2. Proximity to Click Ripples
        let rippleInfluence = 0;
        for (let j = 0; j < ripples.length; j++) {
          const rip = ripples[j];
          const rdx = dot.x - rip.x;
          const rdy = dot.y - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rdist - rip.radius);

          if (diff < 35) {
            const rNorm = (35 - diff) / 35;
            rippleInfluence = Math.max(rippleInfluence, rNorm * rip.alpha);
          }
        }

        // Calculate Target Visibility (Total influence)
        const totalInfluence = Math.min(1, proximityInfluence + rippleInfluence);

        // Smooth fade-in & graceful lingering trail fade-out
        if (totalInfluence > dot.alpha) {
          dot.alpha += (totalInfluence - dot.alpha) * 0.35; // Fast responsive reveal
        } else {
          dot.alpha += (totalInfluence - dot.alpha) * 0.08; // Smooth trailing persistence
        }

        // Dynamic Dot Radius & Color
        dot.currentR = dot.baseR + dot.alpha * 1.5; // Expands from 1.6px to 3.1px

        // Render dot only when visible
        if (dot.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.currentR, 0, Math.PI * 2);

          // Color gradient from AIVSTACK emerald to deep cyan near center
          if (dot.alpha > 0.6) {
            ctx.fillStyle = `rgba(0, 168, 89, ${dot.alpha * 0.95})`; // Crisp brand emerald
          } else if (dot.alpha > 0.3) {
            ctx.fillStyle = `rgba(16, 185, 129, ${dot.alpha * 0.85})`; // Mint green
          } else {
            ctx.fillStyle = `rgba(52, 211, 153, ${dot.alpha * 0.65})`; // Soft mint
          }

          ctx.fill();

          // Luminous aura for dots directly under cursor center
          if (dot.alpha > 0.75) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.currentR * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 168, 89, ${dot.alpha * 0.25})`;
            ctx.fill();
          }
        }
      }

      // Draw subtle connecting constellation lines between intensely lit neighboring dots
      ctx.lineWidth = 0.8;
      for (let i = 0; i < dots.length; i++) {
        const d1 = dots[i];
        if (d1.alpha < 0.45) continue;

        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          if (d2.alpha < 0.45) continue;

          const dx = d1.x - d2.x;
          const dy = d1.y - d2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < spacing * 1.5) {
            const lineAlpha = Math.min(d1.alpha, d2.alpha) * 0.35;
            ctx.strokeStyle = `rgba(0, 168, 89, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mouseleave", onPointerLeave);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchmove", onPointerMove);
      canvas.removeEventListener("touchend", onPointerLeave);
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden flex items-center justify-center select-none bg-gradient-to-br from-gray-50/50 via-white to-emerald-50/20 border border-gray-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] ${className}`}
    >
      {/* Subtle Hint Pill when not hovering */}
      <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-ping" />
        <span className="text-[11px] font-mono font-medium text-gray-500 uppercase tracking-wider">
          Hover to Reveal Matrix
        </span>
      </div>

      {/* Hidden Interactive Dot Reveal Canvas */}
      <canvas
        ref={canvasRef}
        className="cursor-crosshair w-full h-full"
      />
    </div>
  );
}
