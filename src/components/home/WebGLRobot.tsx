"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Web Audio API Synthesizer for Cute Robot Chirps
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
    osc.frequency.setValueAtTime(640, now);
    osc.frequency.exponentialRampToValueAtTime(1300, now + 0.08);
    osc.frequency.setValueAtTime(980, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.18);

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

export function WebGLRobot({
  size = "normal",
  initialSpeech = null,
  className = "",
}: {
  size?: "normal" | "compact";
  initialSpeech?: string | null;
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSpeech, setActiveSpeech] = useState<string | null>(initialSpeech);
  const triggerHappyFaceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setActiveSpeech(initialSpeech);
  }, [initialSpeech]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 380;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    cyanRimLight.position.set(-6, -2, -4);
    scene.add(cyanRimLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    fillLight.position.set(-4, 3, 4);
    scene.add(fillLight);

    // 3. Materials
    const whiteCeramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xfcfdff,
      roughness: 0.15,
      metalness: 0.04,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.32,
      metalness: 0.85,
    });

    const visorGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x030712, // Deep obsidian black glass
      roughness: 0.06,
      metalness: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // SOLID GLOWING CYAN EYE MATERIALS (Matches Reference Image Exactly)
    const cyanSolidEyeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Pure vivid solid glowing cyan
      depthTest: false,
      transparent: true,
      opacity: 0.98,
    });

    const cyanAuraMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      depthTest: false,
      transparent: true,
      opacity: 0.38,
    });

    // 4. Construct Robot Hierarchy (Facing Forward, Vertically Centered)
    const robotRoot = new THREE.Group();
    robotRoot.position.set(0, 0.32, 0); // Perfectly centered in viewport
    scene.add(robotRoot);

    // ================= HEAD GROUP =================
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.45, 0);
    robotRoot.add(headGroup);

    // Main Helmet Dome (Glossy White Ceramic)
    const helmetGeo = new THREE.SphereGeometry(1.22, 48, 48);
    helmetGeo.scale(1.0, 0.88, 0.95);
    const helmetMesh = new THREE.Mesh(helmetGeo, whiteCeramicMat);
    headGroup.add(helmetMesh);

    // Helmet Fine Seam Accent Ring
    const seamGeo = new THREE.TorusGeometry(1.21, 0.012, 16, 64);
    seamGeo.rotateX(Math.PI / 2);
    const seamMesh = new THREE.Mesh(seamGeo, darkMetalMat);
    seamMesh.position.set(0, 0.28, 0);
    headGroup.add(seamMesh);

    // Forehead Indicator Strip (Glowing Cyan Capsule Pill)
    const foreheadGeo = new THREE.BoxGeometry(0.24, 0.06, 0.04);
    const foreheadMesh = new THREE.Mesh(foreheadGeo, cyanSolidEyeMat);
    foreheadMesh.position.set(0, 0.94, 0.86);
    headGroup.add(foreheadMesh);

    // Ear Pod Stripes Material
    const earStripeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });

    // Left Ear Pod with Two Black Signature Stripes
    const earOuterGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 32);
    earOuterGeo.rotateZ(Math.PI / 2);
    const leftEar = new THREE.Mesh(earOuterGeo, whiteCeramicMat);
    leftEar.position.set(-1.22, 0.05, 0);
    headGroup.add(leftEar);

    const leftStripe1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.382, 0.016, 16, 32),
      earStripeMat
    );
    leftStripe1.rotateY(Math.PI / 2);
    leftStripe1.position.set(-1.18, 0.05, 0);
    headGroup.add(leftStripe1);

    const leftStripe2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.382, 0.016, 16, 32),
      earStripeMat
    );
    leftStripe2.rotateY(Math.PI / 2);
    leftStripe2.position.set(-1.28, 0.05, 0);
    headGroup.add(leftStripe2);

    const earCoreGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.32, 32);
    earCoreGeo.rotateZ(Math.PI / 2);
    const leftEarCore = new THREE.Mesh(earCoreGeo, darkMetalMat);
    leftEarCore.position.set(-1.23, 0.05, 0);
    headGroup.add(leftEarCore);

    const earTorusGeo = new THREE.TorusGeometry(0.18, 0.025, 16, 32);
    earTorusGeo.rotateY(Math.PI / 2);
    const leftEarTorus = new THREE.Mesh(earTorusGeo, cyanSolidEyeMat);
    leftEarTorus.position.set(-1.38, 0.05, 0);
    headGroup.add(leftEarTorus);

    // Right Ear Pod with Two Black Signature Stripes
    const rightEar = leftEar.clone();
    rightEar.position.set(1.22, 0.05, 0);
    headGroup.add(rightEar);

    const rightStripe1 = leftStripe1.clone();
    rightStripe1.position.set(1.18, 0.05, 0);
    headGroup.add(rightStripe1);

    const rightStripe2 = leftStripe2.clone();
    rightStripe2.position.set(1.28, 0.05, 0);
    headGroup.add(rightStripe2);

    const rightEarCore = leftEarCore.clone();
    rightEarCore.position.set(1.23, 0.05, 0);
    headGroup.add(rightEarCore);

    const rightEarTorus = leftEarTorus.clone();
    rightEarTorus.position.set(1.38, 0.05, 0);
    headGroup.add(rightEarTorus);

    // Visor Glass (Wide Glossy Obsidian Rounded Face Screen)
    const visorGeo = new THREE.SphereGeometry(1.08, 40, 40);
    visorGeo.scale(0.92, 0.68, 0.36);
    const visorMesh = new THREE.Mesh(visorGeo, visorGlassMat);
    visorMesh.position.set(0, 0.04, 0.82);
    headGroup.add(visorMesh);

    // Dark Visor Bezel Ring Border
    const visorRimGeo = new THREE.TorusGeometry(0.85, 0.035, 16, 48);
    visorRimGeo.scale(1.08, 0.82, 1.0);
    const visorRimMesh = new THREE.Mesh(visorRimGeo, darkMetalMat);
    visorRimMesh.position.set(0, 0.04, 0.88);
    headGroup.add(visorRimMesh);

    // ================= EXACT FACE EYES (SOLID CYAN CAPSULES & SMILE ARCHES) =================
    // 1. Normal Idle Eye Shape (Exact Match to Face 3: Solid Cyan Soft Vertical Oval/Capsule)
    const normalEyeShape = new THREE.Shape();
    const ew = 0.11; // width 0.22
    const eh = 0.15; // height 0.30
    const er = 0.09; // smooth pill corner radius
    normalEyeShape.moveTo(-ew + er, -eh);
    normalEyeShape.lineTo(ew - er, -eh);
    normalEyeShape.quadraticCurveTo(ew, -eh, ew, -eh + er);
    normalEyeShape.lineTo(ew, eh - er);
    normalEyeShape.quadraticCurveTo(ew, eh, ew - er, eh);
    normalEyeShape.lineTo(-ew + er, eh);
    normalEyeShape.quadraticCurveTo(-ew, eh, -ew, eh - er);
    normalEyeShape.lineTo(-ew, -eh + er);
    normalEyeShape.quadraticCurveTo(-ew, -eh, -ew + er, -eh);

    const normalEyeGeo = new THREE.ShapeGeometry(normalEyeShape);

    // Outer Aura Shape for Glow
    const auraEyeShape = new THREE.Shape();
    const aw = 0.14;
    const ah = 0.18;
    const ar = 0.10;
    auraEyeShape.moveTo(-aw + ar, -ah);
    auraEyeShape.lineTo(aw - ar, -ah);
    auraEyeShape.quadraticCurveTo(aw, -ah, aw, -ah + ar);
    auraEyeShape.lineTo(aw, ah - ar);
    auraEyeShape.quadraticCurveTo(aw, ah, aw - ar, ah);
    auraEyeShape.lineTo(-aw + ar, ah);
    auraEyeShape.quadraticCurveTo(-aw, ah, -aw, ah - ar);
    auraEyeShape.lineTo(-aw, -ah + ar);
    auraEyeShape.quadraticCurveTo(-aw, -ah, -aw + ar, -ah);

    const auraEyeGeo = new THREE.ShapeGeometry(auraEyeShape);

    // 2. Happy Smile Eye Shape (Exact Match to Face 1 & 2: Curved Upward Arches `^ ^` / `( ◠ ◠ )`)
    const happyEyeShape = new THREE.Shape();
    const hw = 0.14;
    const hh = 0.12;
    const th = 0.042;
    happyEyeShape.moveTo(-hw, 0);
    happyEyeShape.quadraticCurveTo(-hw * 0.4, hh, 0, hh);
    happyEyeShape.quadraticCurveTo(hw * 0.4, hh, hw, 0);
    happyEyeShape.quadraticCurveTo(hw + th * 0.5, -th * 0.3, hw - th * 0.2, -th * 0.6);
    happyEyeShape.quadraticCurveTo(hw * 0.4, hh - th, 0, hh - th);
    happyEyeShape.quadraticCurveTo(-hw * 0.4, hh - th, -hw + th * 0.2, -th * 0.6);
    happyEyeShape.quadraticCurveTo(-hw - th * 0.5, -th * 0.3, -hw, 0);

    const happyEyeGeo = new THREE.ShapeGeometry(happyEyeShape);

    // Eyes Groups Container
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, 0.06, 1.20);
    eyesGroup.renderOrder = 999;
    headGroup.add(eyesGroup);

    // Left Eye (Normal)
    const leftEyeContainer = new THREE.Group();
    leftEyeContainer.position.set(-0.38, 0, 0);
    eyesGroup.add(leftEyeContainer);

    const leftAura = new THREE.Mesh(auraEyeGeo, cyanAuraMat);
    leftAura.renderOrder = 998;
    leftEyeContainer.add(leftAura);

    const leftNormalEye = new THREE.Mesh(normalEyeGeo, cyanSolidEyeMat);
    leftNormalEye.renderOrder = 999;
    leftNormalEye.position.set(0, 0, 0.005);
    leftEyeContainer.add(leftNormalEye);

    // Left Happy Eye (Hidden by default, shown on click/happy)
    const leftHappyEye = new THREE.Mesh(happyEyeGeo, cyanSolidEyeMat);
    leftHappyEye.renderOrder = 999;
    leftHappyEye.position.set(0, 0, 0.005);
    leftHappyEye.visible = false;
    leftEyeContainer.add(leftHappyEye);

    // Right Eye (Normal)
    const rightEyeContainer = new THREE.Group();
    rightEyeContainer.position.set(0.38, 0, 0);
    eyesGroup.add(rightEyeContainer);

    const rightAura = new THREE.Mesh(auraEyeGeo, cyanAuraMat);
    rightAura.renderOrder = 998;
    rightEyeContainer.add(rightAura);

    const rightNormalEye = new THREE.Mesh(normalEyeGeo, cyanSolidEyeMat);
    rightNormalEye.renderOrder = 999;
    rightNormalEye.position.set(0, 0, 0.005);
    rightEyeContainer.add(rightNormalEye);

    // Right Happy Eye (Hidden by default)
    const rightHappyEye = new THREE.Mesh(happyEyeGeo, cyanSolidEyeMat);
    rightHappyEye.renderOrder = 999;
    rightHappyEye.position.set(0, 0, 0.005);
    rightHappyEye.visible = false;
    rightEyeContainer.add(rightHappyEye);

    // ================= MOUTH SHAPES =================
    // 1. Normal Mouth: Clean Horizontal Cyan Pill `—` (Face 3)
    const normalMouthShape = new THREE.Shape();
    const mw = 0.08;
    const mh = 0.024;
    const mr = 0.012;
    normalMouthShape.moveTo(-mw + mr, -mh);
    normalMouthShape.lineTo(mw - mr, -mh);
    normalMouthShape.quadraticCurveTo(mw, -mh, mw, 0);
    normalMouthShape.quadraticCurveTo(mw, mh, mw - mr, mh);
    normalMouthShape.lineTo(-mw + mr, mh);
    normalMouthShape.quadraticCurveTo(-mw, mh, -mw, 0);
    normalMouthShape.quadraticCurveTo(-mw, -mh, -mw + mr, -mh);

    const normalMouthGeo = new THREE.ShapeGeometry(normalMouthShape);
    const normalMouthMesh = new THREE.Mesh(normalMouthGeo, cyanSolidEyeMat);
    normalMouthMesh.position.set(0, -0.22, 1.20);
    normalMouthMesh.renderOrder = 999;
    headGroup.add(normalMouthMesh);

    // 2. Smile Mouth: Cute upward arc `‿` (Face 2)
    const smileMouthShape = new THREE.Shape();
    smileMouthShape.moveTo(-0.09, 0.02);
    smileMouthShape.quadraticCurveTo(0, -0.06, 0.09, 0.02);
    smileMouthShape.quadraticCurveTo(0, -0.03, -0.09, 0.02);

    const smileMouthGeo = new THREE.ShapeGeometry(smileMouthShape);
    const smileMouthMesh = new THREE.Mesh(smileMouthGeo, cyanSolidEyeMat);
    smileMouthMesh.position.set(0, -0.22, 1.20);
    smileMouthMesh.renderOrder = 999;
    smileMouthMesh.visible = false;
    headGroup.add(smileMouthMesh);

    // ================= RIBBED ACCORDION NECK =================
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, -0.58, 0);
    robotRoot.add(neckGroup);

    const neckCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.40, 0.44, 0.28, 32),
      darkMetalMat
    );
    neckGroup.add(neckCore);

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.042, 16, 32), darkMetalMat);
    ring1.rotateX(Math.PI / 2);
    ring1.position.set(0, 0.08, 0);
    neckGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.042, 16, 32), darkMetalMat);
    ring2.rotateX(Math.PI / 2);
    ring2.position.set(0, 0.0, 0);
    neckGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.042, 16, 32), darkMetalMat);
    ring3.rotateX(Math.PI / 2);
    ring3.position.set(0, -0.08, 0);
    neckGroup.add(ring3);

    // ================= TORSO WITH CAPSULE GRILL VENT =================
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -1.28, 0);
    robotRoot.add(torsoGroup);

    const torsoGeo = new THREE.SphereGeometry(0.88, 36, 36);
    torsoGeo.scale(0.92, 1.18, 0.78);
    const torsoMesh = new THREE.Mesh(torsoGeo, whiteCeramicMat);
    torsoGroup.add(torsoMesh);

    const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.50, 0.035, 16, 32), darkMetalMat);
    collarMesh.rotateX(Math.PI / 2);
    collarMesh.position.set(0, 0.58, 0);
    torsoGroup.add(collarMesh);

    const ventOuterGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.56, 24);
    ventOuterGeo.scale(0.75, 1.0, 0.35);
    const ventOuterMesh = new THREE.Mesh(ventOuterGeo, darkMetalMat);
    ventOuterMesh.position.set(0, 0.08, 0.62);
    torsoGroup.add(ventOuterMesh);

    for (let i = -1; i <= 1; i++) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.42, 0.02),
        new THREE.MeshBasicMaterial({ color: 0x050a14 })
      );
      slat.position.set(i * 0.05, 0.08, 0.68);
      torsoGroup.add(slat);
    }

    const leftShoulderGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.38, 16);
    leftShoulderGeo.rotateX(Math.PI / 4);
    const leftShoulder = new THREE.Mesh(leftShoulderGeo, darkMetalMat);
    leftShoulder.position.set(-0.84, 0.22, 0);
    torsoGroup.add(leftShoulder);

    const rightShoulder = leftShoulder.clone();
    rightShoulder.position.set(0.84, 0.22, 0);
    torsoGroup.add(rightShoulder);

    // Ground Shadow Disc
    const shadowGeo = new THREE.CircleGeometry(1.15, 32);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.15,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -2.15, 0);
    scene.add(shadowMesh);

    // ================= REAL-TIME MOUSE POINTER TRACKING & NATURAL BLINK =================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isBlinking = false;
    let isHappyFace = false;
    let blinkTimer: NodeJS.Timeout;

    // Track mouse pointer across the entire screen relative to the robot's center
    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Distance from robot center to cursor normalized
      // dx < 0 when cursor is to the left; dx > 0 when to the right
      // dy < 0 when cursor is above; dy > 0 when below
      const screenHalfW = Math.max(300, window.innerWidth * 0.5);
      const screenHalfH = Math.max(200, window.innerHeight * 0.5);

      const dx = (e.clientX - cx) / screenHalfW;
      const dy = (e.clientY - cy) / screenHalfH;

      targetMouseX = Math.max(-1.15, Math.min(1.15, dx));
      targetMouseY = Math.max(-1.15, Math.min(1.15, dy));
    };

    // Attach to both window and document to guarantee 100% pointer capture
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mousemove", onPointerMove, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    // Periodic 3-Second Natural Blinking Loop
    const triggerBlink = () => {
      if (!isHappyFace) {
        isBlinking = true;
        setTimeout(() => {
          isBlinking = false;
        }, 130);
      }
      blinkTimer = setTimeout(triggerBlink, 3000);
    };
    blinkTimer = setTimeout(triggerBlink, 3000);

    // Interactive Click: Switch to Happy Face `( ◠ ◠ )` + Smile `‿` (Face 2 from user image!)
    triggerHappyFaceRef.current = () => {
      isHappyFace = true;
      leftNormalEye.visible = false;
      rightNormalEye.visible = false;
      normalMouthMesh.visible = false;

      leftHappyEye.visible = true;
      rightHappyEye.visible = true;
      smileMouthMesh.visible = true;

      // Revert back to normal face after 2.5 seconds
      setTimeout(() => {
        isHappyFace = false;
        leftHappyEye.visible = false;
        rightHappyEye.visible = false;
        smileMouthMesh.visible = false;

        leftNormalEye.visible = true;
        rightNormalEye.visible = true;
        normalMouthMesh.visible = true;
      }, 2500);
    };

    // Resize Handler
    const onResize = () => {
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render Loop (Prominent Dynamic Gaze Following Cursor Everywhere on Screen)
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // 1. Organic Smooth Levitation Bob
      const bobY = Math.sin(elapsedTime * 2.0) * 0.08;
      robotRoot.position.y = 0.32 + bobY;
      shadowMesh.scale.setScalar(1.0 - bobY * 0.4);

      // 2. Real-Time Head Rotation (Gentle, Natural & Controlled - Never Over-Rotates Left)
      const targetHeadRotY = Math.max(-0.22, Math.min(0.22, targetMouseX * 0.22)); // Max ~12 deg turn
      const targetHeadRotX = Math.max(-0.16, Math.min(0.18, targetMouseY * 0.18)); // Max ~10 deg pitch

      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetHeadRotY, 0.08);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetHeadRotX, 0.08);
      headGroup.position.x = THREE.MathUtils.lerp(headGroup.position.x, targetMouseX * 0.05, 0.08);

      // Torso follow lag (Subtle & organic)
      torsoGroup.rotation.y = THREE.MathUtils.lerp(torsoGroup.rotation.y, targetMouseX * 0.08, 0.05);
      torsoGroup.rotation.x = THREE.MathUtils.lerp(torsoGroup.rotation.x, targetMouseY * 0.06, 0.05);

      // 3. Eyes Point Directly at Mouse Pointer (Focused Gaze within Visor)
      const eyeOffsetX = Math.max(-0.18, Math.min(0.18, targetMouseX * 0.18));
      const eyeOffsetY = Math.max(-0.11, Math.min(0.11, -targetMouseY * 0.11));

      leftEyeContainer.position.x = THREE.MathUtils.lerp(leftEyeContainer.position.x, -0.38 + eyeOffsetX, 0.15);
      leftEyeContainer.position.y = THREE.MathUtils.lerp(leftEyeContainer.position.y, eyeOffsetY, 0.15);

      rightEyeContainer.position.x = THREE.MathUtils.lerp(rightEyeContainer.position.x, 0.38 + eyeOffsetX, 0.15);
      rightEyeContainer.position.y = THREE.MathUtils.lerp(rightEyeContainer.position.y, eyeOffsetY, 0.15);

      // Mouth follows gaze subtly
      const mouthTargetX = eyeOffsetX * 0.35;
      const mouthTargetY = -0.22 + eyeOffsetY * 0.30;
      normalMouthMesh.position.x = THREE.MathUtils.lerp(normalMouthMesh.position.x, mouthTargetX, 0.12);
      normalMouthMesh.position.y = THREE.MathUtils.lerp(normalMouthMesh.position.y, mouthTargetY, 0.12);
      smileMouthMesh.position.x = normalMouthMesh.position.x;
      smileMouthMesh.position.y = normalMouthMesh.position.y;

      // 4. Blinking Animation (Squash Scale Y during blink)
      const targetScaleY = isBlinking ? 0.05 : 1.0;
      leftEyeContainer.scale.y = THREE.MathUtils.lerp(leftEyeContainer.scale.y, targetScaleY, 0.45);
      rightEyeContainer.scale.y = THREE.MathUtils.lerp(rightEyeContainer.scale.y, targetScaleY, 0.45);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(blinkTimer);
      triggerHappyFaceRef.current = null;
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleClick = () => {
    playRobotChirp();
    setActiveSpeech("Hi! How are you?");
    if (triggerHappyFaceRef.current) {
      triggerHappyFaceRef.current();
    }
    setTimeout(() => setActiveSpeech(null), 2800);
  };

  const isCompact = size === "compact";

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${
        isCompact ? "w-[200px] h-[210px]" : "w-[340px] sm:w-[380px] h-[380px]"
      } ${className}`}
      title="Click me to smile!"
    >
      {/* Interactive Speech Bubble */}
      {activeSpeech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-3 z-30 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#00f0ff]/40 text-gray-900 text-[11px] font-mono font-bold tracking-wide shadow-lg flex items-center gap-1.5 pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          {activeSpeech}
        </motion.div>
      )}

      {/* Ambient Radial Cyan Backdrop Glow */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-teal-400/10 to-blue-500/10 blur-3xl -z-10 pointer-events-none" />

      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center"
      />
    </div>
  );
}
