"use client";

import { useEffect, useRef, useState } from "react";

interface Point3D {
  x0: number;
  y0: number;
  z0: number;
  // Current 3D position
  x: number;
  y: number;
  z: number;
  // Dynamic displacement & velocity for explosion / magnetic spring
  dx: number;
  dy: number;
  dz: number;
  vx: number;
  vy: number;
  vz: number;
  // Screen projected
  sx: number;
  sy: number;
  scale: number;
  size: number;
  isAccent: boolean;
}

export function InteractiveGlobe({
  radius = 150,
  className = "",
}: {
  radius?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 460;
    let height = 460;

    const updateSize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const size = rect ? Math.min(rect.width, 480) : 460;
      width = size;
      height = size;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // 1. Generate Points on a 3D Sphere (Fibonacci distribution + Lat/Long orbital rings)
    const points: Point3D[] = [];
    const numPoints = 175;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    // Fibonacci sphere nodes
    for (let i = 0; i < numPoints; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      points.push({
        x0: x,
        y0: y,
        z0: z,
        x,
        y,
        z,
        dx: 0,
        dy: 0,
        dz: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        sx: 0,
        sy: 0,
        scale: 1,
        size: Math.random() > 0.75 ? 3.4 : 2.1,
        isAccent: Math.random() > 0.7,
      });
    }

    // Latitude & Longitude Geodesic Rings (creating clear Earth meridian lines)
    const addRing = (latAngle: number, count: number) => {
      const ringRadius = radius * Math.cos(latAngle);
      const ringY = radius * Math.sin(latAngle);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = ringRadius * Math.cos(angle);
        const z = ringRadius * Math.sin(angle);
        points.push({
          x0: x,
          y0: ringY,
          z0: z,
          x,
          y: ringY,
          z,
          dx: 0,
          dy: 0,
          dz: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          sx: 0,
          sy: 0,
          scale: 1,
          size: 2.2,
          isAccent: i % 4 === 0,
        });
      }
    };

    addRing(0, 36); // Equator
    addRing(Math.PI / 4, 24); // Tropic North
    addRing(-Math.PI / 4, 24); // Tropic South

    // Interactive State: Continuous spin + drag rotation
    let angleY = 0;
    let angleX = 0.26; // ~15 deg axial tilt

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let velX = 0;
    let velY = 0.005; // Idle rotational velocity

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseOver = false;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      lastMouseX = clientX;
      lastMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouseX = clientX - rect.left;
      mouseY = clientY - rect.top;
      isMouseOver = true;

      if (isDragging) {
        const deltaX = clientX - lastMouseX;
        const deltaY = clientY - lastMouseY;
        velY = deltaX * 0.004;
        velX = -deltaY * 0.004;
        angleY += velY;
        angleX += velX;
        lastMouseX = clientX;
        lastMouseY = clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerLeave = () => {
      isDragging = false;
      isMouseOver = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("mouseleave", onPointerLeave);

    canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Continuous Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 420;

      // Inertia & Continuous rotation
      if (!isDragging) {
        velY = velY * 0.95 + 0.005 * 0.05; // Return to standard slow rotation
        velX = velX * 0.95;
        angleY += velY;
        angleX += velX;
      }

      // Restrict vertical pitch to prevent flipping
      angleX = Math.max(-0.8, Math.min(0.8, angleX));

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Spring physics constants for reverse-magnetic explosion
      const spring = 0.07;
      const friction = 0.85;
      const explosionThreshold = 95;
      const explosionForce = 34;

      // 1. Update Physics and Project 3D to 2D
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Explode / Reverse Magnetic Force on Mouse Pointer
        if (isMouseOver && !isDragging) {
          const distX = p.sx - mouseX;
          const distY = p.sy - mouseY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < explosionThreshold && dist > 0.001) {
            // Repulsive radial blast away from cursor (reverse magnetic)
            const factor = (explosionThreshold - dist) / explosionThreshold;
            const push = factor * explosionForce;
            const dirX = distX / dist;
            const dirY = distY / dist;

            p.vx += dirX * push;
            p.vy += dirY * push;
            p.vz += (Math.random() - 0.4) * push * 1.6; // 3D volumetric scatter
          }
        }

        // Restorative spring physics back to sphere surface
        p.vx = (p.vx - p.dx * spring) * friction;
        p.vy = (p.vy - p.dy * spring) * friction;
        p.vz = (p.vz - p.dz * spring) * friction;

        p.dx += p.vx;
        p.dy += p.vy;
        p.dz += p.vz;

        // Current 3D point (base on sphere + dynamic displacement)
        const curX = p.x0 + p.dx;
        const curY = p.y0 + p.dy;
        const curZ = p.z0 + p.dz;

        // 3D Rotation (around Y axis then X axis)
        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX;

        // Perspective Projection
        const scale = focalLength / (focalLength + z2);
        p.sx = cx + x1 * scale;
        p.sy = cy + y2 * scale;
        p.scale = scale;
        p.z = z2; // for depth sorting and opacity
      }

      // 2. Draw Connected Constellation Lines (Matching Reference Image)
      const maxConnectDist = radius * 0.45;
      ctx.lineWidth = 0.95;

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        if (p1.z < -radius * 0.65) continue; // Skip back hemisphere for clarity

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          if (p2.z < -radius * 0.65) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxConnectDist) {
            const distFactor = 1 - dist3D / maxConnectDist;
            const depthFactor = (p1.z + p2.z + radius * 1.5) / (radius * 3);
            const alpha = Math.max(0, Math.min(1, distFactor * depthFactor * 0.8));

            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha * 0.7})`; // Electric Cyan Lines
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Nodes (Points with Luminous Halos)
      const sortedPoints = [...points].sort((a, b) => a.z - b.z);

      for (let i = 0; i < sortedPoints.length; i++) {
        const p = sortedPoints[i];
        const depthFactor = (p.z + radius) / (radius * 2); // 0 (back) to 1 (front)
        const alpha = Math.max(0.12, Math.min(1, depthFactor * 1.25));
        const nodeRadius = Math.max(1, p.size * p.scale);

        // Foreground Glowing Halo
        if (depthFactor > 0.45) {
          const glowGrad = ctx.createRadialGradient(
            p.sx,
            p.sy,
            0,
            p.sx,
            p.sy,
            nodeRadius * 4.2
          );
          if (p.isAccent) {
            glowGrad.addColorStop(0, `rgba(0, 168, 89, ${alpha * 0.8})`); // Emerald accent node
            glowGrad.addColorStop(1, "rgba(0, 168, 89, 0)");
          } else {
            glowGrad.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.75})`); // Cyan node
            glowGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
          }
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius * 4.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core Solid Node
        ctx.fillStyle = p.isAccent
          ? `rgba(0, 168, 89, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // High-contrast rim for sharp fidelity
        ctx.strokeStyle = `rgba(14, 165, 233, ${alpha * 0.85})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 4. Subtle Volumetric Central Atmosphere
      const centerGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.1,
        cx,
        cy,
        radius * 1.15
      );
      centerGrad.addColorStop(0, "rgba(14, 165, 233, 0.07)");
      centerGrad.addColorStop(0.5, "rgba(0, 168, 89, 0.03)");
      centerGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("mouseleave", onPointerLeave);
      canvas.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [radius]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Soft Luminous Aura Behind Earth */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-cyan-400/15 via-[#00A859]/10 to-blue-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Pure 3D Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing transition-transform duration-300"
      />
    </div>
  );
}
