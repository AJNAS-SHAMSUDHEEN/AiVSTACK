"use client";

import { useEffect, useRef, useState } from "react";

interface GlobePoint {
  x0: number;
  y0: number;
  z0: number;
  dx: number;
  dy: number;
  dz: number;
  vx: number;
  vy: number;
  vz: number;
  sx: number;
  sy: number;
  scale: number;
  z: number;
  isContinent: boolean;
  size: number;
}

interface NetworkNode {
  x0: number;
  y0: number;
  z0: number;
  dx: number;
  dy: number;
  dz: number;
  vx: number;
  vy: number;
  vz: number;
  sx: number;
  sy: number;
  scale: number;
  z: number;
  size: number;
}

export function RealDigitalEarth({
  radius = 155,
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

    let animId: number;
    const size = 460;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const focalLength = 400;

    // 1. Generate Realistic Continents on Sphere using lat/long sampling
    const isLand = (lat: number, lon: number): boolean => {
      // Europe & UK
      if (lat >= 36 && lat <= 70 && lon >= -10 && lon <= 42) return true;
      // Africa
      if (lat >= -35 && lat <= 36 && lon >= -17 && lon <= 51) {
        if (lat < 10 && lon > 42) return false;
        return true;
      }
      // Asia, Middle East, India
      if (lat >= 5 && lat <= 72 && lon >= 40 && lon <= 145) {
        if (lat > 40 && lon < 50) return false;
        return true;
      }
      // North America & Central America
      if (lat >= 10 && lat <= 72 && lon >= -168 && lon <= -52) {
        if (lat < 25 && lon < -105) return false;
        return true;
      }
      // South America
      if (lat >= -56 && lat <= 12 && lon >= -82 && lon <= -34) return true;
      // Australia & NZ
      if (lat >= -42 && lat <= -11 && lon >= 113 && lon <= 154) return true;
      return false;
    };

    const globePoints: GlobePoint[] = [];

    // Dense grid across continents
    for (let lat = -80; lat <= 80; lat += 5.5) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const cosLat = Math.cos((lat * Math.PI) / 180);
      const stepLon = Math.max(5.5, 6 / Math.max(0.1, cosLat));

      for (let lon = -180; lon < 180; lon += stepLon) {
        const onLand = isLand(lat, lon);
        // Include land points, plus sparse ocean lattice for wireframe structure
        if (onLand || (lat % 16 === 0 && lon % 24 === 0)) {
          const theta = ((lon + 180) * Math.PI) / 180;

          const x = -radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          globePoints.push({
            x0: x,
            y0: y,
            z0: z,
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
            isContinent: onLand,
            size: onLand ? (Math.random() > 0.85 ? 2.6 : 1.8) : 1.1,
          });
        }
      }
    }

    // 2. Generate Outer Constellation Shell (The glowing network nodes & connecting lines)
    const networkNodes: NetworkNode[] = [];
    const outerRadius = radius * 1.14;
    const numNodes = 72;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numNodes; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numNodes);

      const x = outerRadius * Math.sin(phi) * Math.cos(theta);
      const y = outerRadius * Math.sin(phi) * Math.sin(theta);
      const z = outerRadius * Math.cos(phi);

      networkNodes.push({
        x0: x,
        y0: y,
        z0: z,
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
        size: Math.random() > 0.6 ? 3.8 : 2.6,
      });
    }

    // Interactive State: Continuous rotation + mouse drag
    let angleY = 1.2; // Start viewing Europe/Africa/Asia
    let angleX = 0.35; // ~20 deg axial tilt

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let velX = 0;
    let velY = 0.005;

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

    // Continuous Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, size, size);

      if (!isDragging) {
        velY = velY * 0.96 + 0.005 * 0.04;
        velX = velX * 0.96;
        angleY += velY;
        angleX += velX;
      }

      angleX = Math.max(-0.7, Math.min(0.7, angleX));

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Spring physics for reverse magnetic / explosion
      const spring = 0.07;
      const friction = 0.86;
      const blastRadius = 110;
      const blastForce = 34;

      // 1. Draw Deep Atmospheric Inner Core (Glowing Blue Holographic Earth)
      const coreGrad = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      coreGrad.addColorStop(0, "rgba(30, 58, 138, 0.45)"); // Deep blue light
      coreGrad.addColorStop(0.65, "rgba(15, 23, 42, 0.65)"); // Rich twilight
      coreGrad.addColorStop(0.92, "rgba(14, 165, 233, 0.35)"); // Atmospheric rim
      coreGrad.addColorStop(1, "rgba(14, 165, 233, 0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.98, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric outer glow halo
      const haloGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.85,
        cx,
        cy,
        radius * 1.35
      );
      haloGrad.addColorStop(0, "rgba(56, 189, 248, 0.22)");
      haloGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.08)");
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Project and Draw Continental Landmass Points
      for (let i = 0; i < globePoints.length; i++) {
        const p = globePoints[i];

        // Explode / Reverse Magnetic Force on hover
        if (isMouseOver && !isDragging) {
          const distX = p.sx - mouseX;
          const distY = p.sy - mouseY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < blastRadius && dist > 0.001) {
            const factor = (blastRadius - dist) / blastRadius;
            const push = factor * (p.isContinent ? blastForce * 0.7 : blastForce);
            p.vx += (distX / dist) * push;
            p.vy += (distY / dist) * push;
            p.vz += (Math.random() - 0.4) * push * 1.4;
          }
        }

        p.vx = (p.vx - p.dx * spring) * friction;
        p.vy = (p.vy - p.dy * spring) * friction;
        p.vz = (p.vz - p.dz * spring) * friction;

        p.dx += p.vx;
        p.dy += p.vy;
        p.dz += p.vz;

        const curX = p.x0 + p.dx;
        const curY = p.y0 + p.dy;
        const curZ = p.z0 + p.dz;

        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX;

        const scale = focalLength / (focalLength + z2);
        p.sx = cx + x1 * scale;
        p.sy = cy + y2 * scale;
        p.scale = scale;
        p.z = z2;
      }

      // Draw Continental Points
      for (let i = 0; i < globePoints.length; i++) {
        const p = globePoints[i];
        if (p.z < -radius * 0.7) continue; // Skip back side

        const depth = (p.z + radius) / (radius * 2); // 0 (back) to 1 (front)
        const alpha = Math.max(0.1, Math.min(1, depth * 1.3));

        if (p.isContinent) {
          // Vibrant white/cyan continent nodes
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, p.size * p.scale, 0, Math.PI * 2);
          ctx.fill();

          if (depth > 0.6) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.7})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        } else {
          // Oceanic grid dots
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, p.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Project and Draw Outer Constellation Network Shell (Lines + Dots)
      for (let i = 0; i < networkNodes.length; i++) {
        const n = networkNodes[i];

        if (isMouseOver && !isDragging) {
          const distX = n.sx - mouseX;
          const distY = n.sy - mouseY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < blastRadius && dist > 0.001) {
            const factor = (blastRadius - dist) / blastRadius;
            const push = factor * blastForce * 1.2;
            n.vx += (distX / dist) * push;
            n.vy += (distY / dist) * push;
            n.vz += (Math.random() - 0.4) * push * 1.8;
          }
        }

        n.vx = (n.vx - n.dx * spring) * friction;
        n.vy = (n.vy - n.dy * spring) * friction;
        n.vz = (n.vz - n.dz * spring) * friction;

        n.dx += n.vx;
        n.dy += n.vy;
        n.dz += n.vz;

        const curX = n.x0 + n.dx;
        const curY = n.y0 + n.dy;
        const curZ = n.z0 + n.dz;

        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;

        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX;

        const scale = focalLength / (focalLength + z2);
        n.sx = cx + x1 * scale;
        n.sy = cy + y2 * scale;
        n.scale = scale;
        n.z = z2;
      }

      // Draw Network Connecting Lines
      const maxConnect = outerRadius * 0.55;
      ctx.lineWidth = 1;

      for (let i = 0; i < networkNodes.length; i++) {
        const n1 = networkNodes[i];
        if (n1.z < -outerRadius * 0.5) continue;

        for (let j = i + 1; j < networkNodes.length; j++) {
          const n2 = networkNodes[j];
          if (n2.z < -outerRadius * 0.5) continue;

          const dx = n1.x0 + n1.dx - (n2.x0 + n2.dx);
          const dy = n1.y0 + n1.dy - (n2.y0 + n2.dy);
          const dz = n1.z0 + n1.dz - (n2.z0 + n2.dz);
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxConnect) {
            const distFactor = 1 - dist3D / maxConnect;
            const depthFactor = (n1.z + n2.z + outerRadius * 1.5) / (outerRadius * 3);
            const alpha = Math.max(0, Math.min(1, distFactor * depthFactor * 0.9));

            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha * 0.75})`; // Glowing cyan line
            ctx.beginPath();
            ctx.moveTo(n1.sx, n1.sy);
            ctx.lineTo(n2.sx, n2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Network Nodes
      for (let i = 0; i < networkNodes.length; i++) {
        const n = networkNodes[i];
        if (n.z < -outerRadius * 0.5) continue;

        const depth = (n.z + outerRadius) / (outerRadius * 2);
        const alpha = Math.max(0.15, Math.min(1, depth * 1.3));
        const r = Math.max(1.2, n.size * n.scale);

        // Radial Neon Halo
        const glow = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, r * 4);
        glow.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.85})`);
        glow.addColorStop(0.5, `rgba(14, 165, 233, ${alpha * 0.4})`);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core White Node
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
        ctx.fill();

        // Sharp Cyan Rim
        ctx.strokeStyle = `rgba(14, 165, 233, ${alpha * 0.9})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

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
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
