"use client";

import { WebGLRobot } from "./WebGLRobot";

export function HeroVisual() {
  return (
    <div className="relative w-full flex items-center justify-center select-none py-2">
      {/* Real WebGL 3D Robot with Three.js (True 3D Geometry, PBR Ceramic Materials & Real-Time Eye Tracking) */}
      <WebGLRobot key="v4-tracker-live" size="normal" />
    </div>
  );
}
