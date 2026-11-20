"use client";

import { useEffect, useRef } from "react";

interface WavePoint {
  // Spherical base coordinates
  u: number; // azimuth 0..2pi
  v: number; // elevation 0..pi
  baseR: number;
  // 3D dynamic physics displacement
  dx: number;
  dy: number;
  dz: number;
  vx: number;
  vy: number;
  vz: number;
  // Projected screen coords
  sx: number;
  sy: number;
  scale: number;
  z: number;
  r: number;
  color: string;
  size: number;
  glow: number;
}

export function FluidParticleSphere({
  radius = 135,
  className = "",
}: {
  radius?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const size = 420;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const focalLength = 380;

    // Generate High-Density Grid of Pure Micro-Particles (Matching Reference Exactly)
    const points: WavePoint[] = [];
    const numRings = 50; // Concentric latitudinal tracks
    const dotsPerRing = 80;

    for (let i = 1; i < numRings; i++) {
      const v = (i / numRings) * Math.PI; // 0 to pi
      const ringDotCount = Math.max(16, Math.round(dotsPerRing * Math.sin(v)));

      for (let j = 0; j < ringDotCount; j++) {
        const u = (j / ringDotCount) * Math.PI * 2;

        points.push({
          u,
          v,
          baseR: radius,
          dx: 0,
          dy: 0,
          dz: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          sx: 0,
          sy: 0,
          scale: 1,
          z: 0,
          r: radius,
          color: "#00b4d8",
          size: 1.15,
          glow: 0,
        });
      }
    }

    // Interactive 3D Rotation & Parallax
    let angleY = 0.4;
    let angleX = 0.5; // Tilted angle matching reference image
    let targetAngleX = 0.5;
    let targetAngleY = 0.4;

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let dragVelX = 0;
    let dragVelY = 0.004;

    // Smooth Cursor Tracking
    let rawMouseX = -9999;
    let rawMouseY = -9999;
    let smoothMouseX = -9999;
    let smoothMouseY = -9999;
    let isHovered = false;

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

      rawMouseX = clientX - rect.left;
      rawMouseY = clientY - rect.top;
      isHovered = true;

      if (isDragging) {
        const deltaX = clientX - lastMouseX;
        const deltaY = clientY - lastMouseY;
        dragVelY = deltaX * 0.003;
        dragVelX = -deltaY * 0.003;
        angleY += dragVelY;
        angleX += dragVelX;
        lastMouseX = clientX;
        lastMouseY = clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerLeave = () => {
      isDragging = false;
      isHovered = false;
      rawMouseX = -9999;
      rawMouseY = -9999;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("mouseleave", onPointerLeave);

    canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    let time = 0;

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.02;

      // Smooth cursor interpolation
      if (isHovered && rawMouseX > -500) {
        if (smoothMouseX < -500) {
          smoothMouseX = rawMouseX;
          smoothMouseY = rawMouseY;
        } else {
          smoothMouseX += (rawMouseX - smoothMouseX) * 0.15;
          smoothMouseY += (rawMouseY - smoothMouseY) * 0.15;
        }

        // 3D Parallax tilt toward cursor
        const tiltX = ((smoothMouseY - cy) / cy) * 0.2;
        const tiltY = ((smoothMouseX - cx) / cx) * 0.2;
        targetAngleX = 0.5 + tiltX;
        targetAngleY = angleY + tiltY * 0.08;
      } else {
        smoothMouseX += (-9999 - smoothMouseX) * 0.1;
        smoothMouseY += (-9999 - smoothMouseY) * 0.1;
        targetAngleX = 0.5;
      }

      // Smooth idle rotation
      if (!isDragging) {
        dragVelY = dragVelY * 0.95 + 0.0035 * 0.05;
        dragVelX = dragVelX * 0.95;
        angleY += dragVelY;
        angleX += (targetAngleX - angleX) * 0.05;
      }

      angleX = Math.max(-0.9, Math.min(0.9, angleX));

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 3D Cursor Projection on Sphere Surface (True 3D Magnetic Fluid Repulsion)
      let mouse3DX = 0;
      let mouse3DY = 0;
      let mouse3DZ = 0;
      let hasMouseHit = false;

      if (isHovered && smoothMouseX > -500) {
        const mx = (smoothMouseX - cx) / (focalLength / (focalLength + 0));
        const my = (smoothMouseY - cy) / (focalLength / (focalLength + 0));
        const distFromCenterSq = mx * mx + my * my;

        if (distFromCenterSq < radius * radius * 1.5) {
          hasMouseHit = true;
          const mz = Math.sqrt(Math.max(0, radius * radius - distFromCenterSq));

          // Invert 3D camera rotation to get local sphere coordinates
          const unrotY2 = my;
          const unrotZ2 = mz * cosX - my * sinX;
          const unrotY1 = my * cosX + mz * sinX;

          mouse3DX = mx * cosY + unrotZ2 * sinY;
          mouse3DY = unrotY1;
          mouse3DZ = unrotZ2 * cosY - mx * sinY;
        }
      }

      // Spring physics parameters
      const spring = 0.09;
      const friction = 0.84;
      const repulsionRadius = radius * 0.65;

      // 1. Calculate Elegant 3D Harmonic Wave Coordinates
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // 5-Lobe Harmonic Standing Wave with Smooth Polar Damping (Preserves Spherical Geometry)
        const polarDamping = Math.pow(Math.sin(p.v), 1.4);
        const wave1 = Math.sin(p.u * 5 + time * 1.2) * polarDamping * 20;
        const wave2 = Math.cos(p.u * 3 - time * 0.85 + p.v * 2.5) * polarDamping * 12;
        const wave3 = Math.sin(p.v * 4 + time * 0.7) * 7;
        const ripple = Math.sin(p.u * 8 + p.v * 6 - time * 1.6) * 3.5;

        const currentR = p.baseR + wave1 + wave2 + wave3 + ripple;
        p.r = currentR;

        // Base 3D Coordinates
        const bx = currentR * Math.sin(p.v) * Math.cos(p.u);
        const by = currentR * Math.cos(p.v);
        const bz = currentR * Math.sin(p.v) * Math.sin(p.u);

        // 3D Magnetic Fluid Interaction (Smoothly Parts Micro-Dots Across 3D Surface)
        if (hasMouseHit) {
          const d3x = bx - mouse3DX;
          const d3y = by - mouse3DY;
          const d3z = bz - mouse3DZ;
          const dist3D = Math.sqrt(d3x * d3x + d3y * d3y + d3z * d3z);

          if (dist3D < repulsionRadius && dist3D > 0.01) {
            const norm = (repulsionRadius - dist3D) / repulsionRadius;
            const force = norm * norm * 18;

            // Outward repulsion along surface vector
            p.vx += (d3x / dist3D) * force;
            p.vy += (d3y / dist3D) * force;
            p.vz += (d3z / dist3D) * force;

            p.glow = Math.max(p.glow, norm);
          }
        }

        // Damped spring restoration towards natural wave contour
        p.vx = (p.vx - p.dx * spring) * friction;
        p.vy = (p.vy - p.dy * spring) * friction;
        p.vz = (p.vz - p.dz * spring) * friction;

        p.dx += p.vx;
        p.dy += p.vy;
        p.dz += p.vz;
        p.glow *= 0.92;

        const curX = bx + p.dx;
        const curY = by + p.dy;
        const curZ = bz + p.dz;

        // 3D Rotation
        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX;

        // Perspective Projection
        const scale = focalLength / (focalLength + z2);
        p.sx = cx + x1 * scale;
        p.sy = cy + y2 * scale;
        p.scale = scale;
        p.z = z2;

        // Color Mapping: Rich, Saturated Electric Cyan to Vibrant Magenta (High Contrast on White)
        const elevation = (currentR - (radius - 18)) / 48;
        const isUpperCrest = y2 < -15;

        if (elevation > 0.55) {
          if (isUpperCrest && Math.sin(p.u * 2 + time * 0.7) > -0.1) {
            p.color = "#c026d3"; // Intense Vivid Fuchsia/Magenta
          } else {
            p.color = "#00b4d8"; // Rich Electric Cyan
          }
          p.size = 1.35; // Fine crisp crest dot
        } else if (elevation > 0.3) {
          p.color = isUpperCrest ? "#9333ea" : "#0284c7"; // Violet to Deep Sky Blue
          p.size = 1.15;
        } else {
          p.color = "#1e3a8a"; // Deep Sapphire Navy in valleys
          p.size = 0.95; // Tiny background dot
        }
      }

      // 2. Sort Points by Depth (Back to Front) for Flawless Volumetric Occlusion
      const sorted = [...points].sort((a, b) => a.z - b.z);

      // 3. Render Pure, Crisp Micro-Dots (No muddy blur halos)
      for (let i = 0; i < sorted.length; i++) {
        const p = sorted[i];
        const depth = (p.z + radius * 1.1) / (radius * 2.2); // 0 (back) to 1 (front)
        const alpha = Math.max(0.18, Math.min(1, depth * 1.35));
        const dotR = Math.max(0.65, p.size * p.scale);

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, dotR, 0, Math.PI * 2);

        if (p.glow > 0.25) {
          // Hovered points sparkle with pure electric turquoise / bright core
          ctx.fillStyle = "#00f0ff";
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
        }
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
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
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Pure Frameless 3D Fluid Particle Wave Sphere (100% Transparent, Pure Micro-Particles) */}
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
