"use client";

import "./patchThree";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { sceneProgress } from "@/lib/sceneProgress";
import { pointerNormalized } from "@/lib/useCan3D";
import { NAQSH_3D_PALETTE, StudioLighting } from "./StudioLighting";

function smoothstepRange(value: number, min: number, max: number): number {
  const x = THREE.MathUtils.clamp((value - min) / Math.max(0.0001, max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

interface ItemPose {
  basePos: [number, number, number];
  curatePos: [number, number, number];
  customizePos: [number, number, number];
  baseRot: [number, number, number];
  curateRot: [number, number, number];
  customizeRot: [number, number, number];
}

const ITEM_POSES: ItemPose[] = [
  // 0: Notebook (Terracotta)
  {
    basePos: [-0.45, 0.05, -0.18],
    curatePos: [-0.68, 0.96, -0.22],
    customizePos: [-0.52, 0.92, -0.15],
    baseRot: [0, 0.08, 0],
    curateRot: [0.22, 0.28, -0.12],
    customizeRot: [0.18, 0.2, -0.08],
  },
  // 1: Tumbler (Copper cylinder with Khaki ring)
  {
    basePos: [0.58, 0.12, -0.22],
    curatePos: [0.74, 1.18, -0.18],
    customizePos: [0.58, 1.1, -0.12],
    baseRot: [0, 0, Math.PI * 0.48],
    curateRot: [0.12, -0.24, 0.14],
    customizeRot: [0.08, -0.16, 0.08],
  },
  // 2: Pouch (Pine)
  {
    basePos: [-0.36, 0.1, 0.34],
    curatePos: [-0.48, 0.78, 0.42],
    customizePos: [-0.36, 0.76, 0.32],
    baseRot: [0, -0.12, 0],
    curateRot: [0.18, -0.22, 0.1],
    customizeRot: [0.14, -0.16, 0.06],
  },
  // 3: Card (Ivory) — receives the WaxSeal stamp in Customize (0.50-0.75)
  {
    basePos: [0.08, 0.16, 0.12],
    curatePos: [0.04, 1.24, 0.28],
    customizePos: [0.02, 1.18, 0.42],
    baseRot: [0, 0.04, 0],
    curateRot: [0.48, 0.05, -0.04],
    customizeRot: [0.62, 0.0, 0.0],
  },
  // 4: Pen (Black with Copper tip)
  {
    basePos: [0.24, 0.14, 0.42],
    curatePos: [0.46, 0.88, 0.46],
    customizePos: [0.36, 0.84, 0.36],
    baseRot: [0, 0.15, Math.PI * 0.5],
    curateRot: [0.28, -0.35, Math.PI * 0.36],
    customizeRot: [0.22, -0.25, Math.PI * 0.4],
  },
];

function GiftBoxActor({ onReady }: { onReady: (ready: boolean) => void }) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const lidGroupRef = useRef<THREE.Group>(null);
  const bodyRibbonRef = useRef<THREE.Group>(null);
  const lidRibbonRef = useRef<THREE.Group>(null);
  const miniSealGroupRef = useRef<THREE.Group>(null);
  const itemRefs = useRef<Array<THREE.Group | null>>([null, null, null, null, null]);

  const dampedProgressRef = useRef(sceneProgress.approach || 0);

  const materials = useMemo(() => {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.black,
      roughness: 0.68,
      metalness: 0.08,
      transparent: true,
      opacity: 1,
    });
    const linerMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.chestnut,
      roughness: 0.62,
      metalness: 0.05,
      transparent: true,
      opacity: 1,
    });
    const lidMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.ivoryDeep,
      roughness: 0.48,
      metalness: 0.04,
      transparent: true,
      opacity: 1,
    });
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.sage,
      roughness: 0.45,
      metalness: 0.06,
      transparent: true,
      opacity: 1,
    });
    const terracottaMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.terracotta,
      roughness: 0.5,
      metalness: 0.06,
    });
    const copperMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.copper,
      metalness: 0.92,
      roughness: 0.28,
    });
    const khakiMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.khaki,
      roughness: 0.55,
      metalness: 0.08,
    });
    const pineMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.pine,
      roughness: 0.58,
      metalness: 0.06,
    });
    const ivoryMat = new THREE.MeshStandardMaterial({
      color: NAQSH_3D_PALETTE.ivory,
      roughness: 0.52,
      metalness: 0.02,
    });

    return {
      bodyMat,
      linerMat,
      lidMat,
      ribbonMat,
      terracottaMat,
      copperMat,
      khakiMat,
      pineMat,
      ivoryMat,
    };
  }, []);

  useEffect(() => {
    onReady(true);
    return () => {
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [materials, onReady]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const targetP = sceneProgress.approach;
    dampedProgressRef.current = THREE.MathUtils.damp(
      dampedProgressRef.current,
      targetP,
      5.5,
      dt
    );
    const p = dampedProgressRef.current;

    // Step phases:
    // 0.00 - 0.25: Understand
    // 0.25 - 0.50: Curate
    // 0.50 - 0.75: Customize
    // 0.75 - 1.00: Deliver
    const pUnderstand = smoothstepRange(p, 0.0, 0.25);
    const pOpen = smoothstepRange(p, 0.25, 0.44);
    const pCustomize = smoothstepRange(p, 0.5, 0.72);
    const pClose = smoothstepRange(p, 0.76, 0.92);
    const pDeliver = smoothstepRange(p, 0.75, 1.0);

    // Lid elevation: lifts in Curate (0.25..0.44), stays open in Customize, closes in Deliver (0.76..0.92)
    const lidOpenAmount = pOpen * (1 - pClose);

    if (lidGroupRef.current) {
      lidGroupRef.current.position.y = 0.58 + lidOpenAmount * 1.48;
      lidGroupRef.current.position.z = -lidOpenAmount * 0.52;
      lidGroupRef.current.rotation.x =
        lidOpenAmount * THREE.MathUtils.degToRad(14);
    }

    // Ribbon wrap / tighten state
    const ribbonTightness = 1 + lidOpenAmount * 0.045 - pCustomize * 0.03;
    if (lidRibbonRef.current) {
      lidRibbonRef.current.scale.set(ribbonTightness, 1, ribbonTightness);
    }
    if (bodyRibbonRef.current) {
      const bodyRibbonVisible = 1 - lidOpenAmount * 0.35;
      bodyRibbonRef.current.scale.set(
        ribbonTightness,
        bodyRibbonVisible,
        ribbonTightness
      );
    }

    // Items rise with stagger 0.06 of progress in Curate, tighten in Customize, drop back in Deliver
    const itemsDrop = smoothstepRange(p, 0.75, 0.87);
    for (let i = 0; i < ITEM_POSES.length; i++) {
      const grp = itemRefs.current[i];
      if (!grp) continue;
      const pose = ITEM_POSES[i];
      const staggerStart = 0.25 + i * 0.038;
      const staggerEnd = staggerStart + 0.1;
      const rise = smoothstepRange(p, staggerStart, staggerEnd) * (1 - itemsDrop);

      const curX = THREE.MathUtils.lerp(
        pose.curatePos[0],
        pose.customizePos[0],
        pCustomize
      );
      const curY = THREE.MathUtils.lerp(
        pose.curatePos[1],
        pose.customizePos[1],
        pCustomize
      );
      const curZ = THREE.MathUtils.lerp(
        pose.curatePos[2],
        pose.customizePos[2],
        pCustomize
      );

      grp.position.set(
        THREE.MathUtils.lerp(pose.basePos[0], curX, rise),
        THREE.MathUtils.lerp(pose.basePos[1], curY, rise),
        THREE.MathUtils.lerp(pose.basePos[2], curZ, rise)
      );

      const rotX = THREE.MathUtils.lerp(
        pose.curateRot[0],
        pose.customizeRot[0],
        pCustomize
      );
      const rotY = THREE.MathUtils.lerp(
        pose.curateRot[1],
        pose.customizeRot[1],
        pCustomize
      );
      const rotZ = THREE.MathUtils.lerp(
        pose.curateRot[2],
        pose.customizeRot[2],
        pCustomize
      );

      grp.rotation.set(
        THREE.MathUtils.lerp(pose.baseRot[0], rotX, rise),
        THREE.MathUtils.lerp(pose.baseRot[1], rotY, rise),
        THREE.MathUtils.lerp(pose.baseRot[2], rotZ, rise)
      );
    }

    // Miniature WaxSeal stamp on the Ivory card during Customize (0.50 -> 0.75)
    // Keep mesh visible at all times and animate scale so zero shader compilation occurs mid-scroll
    const rawSealP =
      smoothstepRange(p, 0.51, 0.68) * (1 - smoothstepRange(p, 0.75, 0.84));
    if (miniSealGroupRef.current) {
      const s = Math.max(0.001, rawSealP * 0.13);
      miniSealGroupRef.current.scale.setScalar(s);
      miniSealGroupRef.current.position.y = 0.026 + (1 - rawSealP) * 0.08;
    }

    // Box rotation, slide, and fade across the 4 steps
    if (rootGroupRef.current) {
      // 0.00-0.25 Understand: -25° -> -10° Y
      // 0.25-0.75 Curate/Customize: -10° -> -4° Y
      // 0.75-1.00 Deliver: turns to front-three-quarter (+18° Y) and slides right
      let rotYDeg = -25 + pUnderstand * 15;
      if (p > 0.25 && p <= 0.75) {
        rotYDeg = -10 + ((p - 0.25) / 0.5) * 6;
      } else if (p > 0.75) {
        rotYDeg = -4 + pDeliver * 22;
      }

      const pointerYaw = pointerNormalized.x * 4;
      const pointerPitch = -pointerNormalized.y * 3;

      rootGroupRef.current.rotation.y = THREE.MathUtils.degToRad(
        rotYDeg + pointerYaw
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.degToRad(
        8 + pointerPitch
      );
      rootGroupRef.current.position.x = pDeliver * 0.22;
      rootGroupRef.current.position.y = -0.34;
    }

    // Slight fade in Deliver (1.0 -> 0.86)
    const deliverFade = 1 - pDeliver * 0.14;
    materials.bodyMat.opacity = deliverFade;
    materials.lidMat.opacity = deliverFade;
    materials.ribbonMat.opacity = deliverFade;
    materials.linerMat.opacity = deliverFade;

    // Camera gentle orbit tied to progress (max 12 degrees) + ease-in during Understand
    const orbitAngle = THREE.MathUtils.degToRad((p - 0.5) * 12);
    const camDist = 7.65 - pUnderstand * 0.32 + pDeliver * 0.2;
    state.camera.position.x = Math.sin(orbitAngle) * camDist;
    state.camera.position.z = Math.cos(orbitAngle) * camDist;
    state.camera.position.y = 1.65 + lidOpenAmount * 0.32;
    state.camera.lookAt(0, 0.14 + lidOpenAmount * 0.28, 0);
  });

  return (
    <>
      <group ref={rootGroupRef} position={[0, -0.25, 0]}>
        {/* BOX BODY: 2.4 x 1.1 x 1.8, radius 0.06 in Matte Black */}
        <group position={[0, 0, 0]}>
          <RoundedBox
            args={[2.4, 1.1, 1.8]}
            radius={0.06}
            smoothness={4}
            material={materials.bodyMat}
          />
          {/* Chestnut inner liner walls & recessed cavity */}
          <RoundedBox
            args={[2.26, 0.96, 1.66]}
            radius={0.04}
            smoothness={3}
            position={[0, 0.1, 0]}
            material={materials.linerMat}
          />
          {/* Inner dark floor well */}
          <mesh position={[0, 0.585, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.16, 1.56]} />
            <meshStandardMaterial
              color={NAQSH_3D_PALETTE.chestnut}
              roughness={0.75}
            />
          </mesh>

          {/* Sage ribbon running down the sides of the body */}
          <group ref={bodyRibbonRef}>
            <RoundedBox
              args={[2.43, 1.08, 0.22]}
              radius={0.02}
              smoothness={2}
              material={materials.ribbonMat}
            />
            <RoundedBox
              args={[0.24, 1.08, 1.83]}
              radius={0.02}
              smoothness={2}
              material={materials.ribbonMat}
            />
          </group>
        </group>

        {/* STAND-IN CONTENTS INSIDE THE BOX */}
        {/* 0: Notebook (Terracotta) */}
        <group
          ref={(el) => {
            itemRefs.current[0] = el;
          }}
        >
          <RoundedBox
            args={[0.84, 0.13, 1.08]}
            radius={0.025}
            smoothness={3}
            material={materials.terracottaMat}
          />
          <RoundedBox
            args={[0.8, 0.1, 1.04]}
            radius={0.01}
            smoothness={2}
            position={[0.02, 0, 0]}
            material={materials.ivoryMat}
          />
        </group>

        {/* 1: Tumbler (Copper cylinder with Khaki ring) */}
        <group
          ref={(el) => {
            itemRefs.current[1] = el;
          }}
        >
          <mesh material={materials.copperMat}>
            <cylinderGeometry args={[0.23, 0.2, 0.84, 32]} />
          </mesh>
          <mesh position={[0, 0.06, 0]} material={materials.khakiMat}>
            <cylinderGeometry args={[0.238, 0.232, 0.22, 32]} />
          </mesh>
          <mesh position={[0, 0.44, 0]} material={materials.bodyMat}>
            <cylinderGeometry args={[0.235, 0.235, 0.06, 32]} />
          </mesh>
        </group>

        {/* 2: Pouch (Pine) */}
        <group
          ref={(el) => {
            itemRefs.current[2] = el;
          }}
        >
          <RoundedBox
            args={[0.76, 0.2, 0.54]}
            radius={0.065}
            smoothness={4}
            material={materials.pineMat}
          />
          <mesh position={[0.36, 0.08, 0]} material={materials.copperMat}>
            <boxGeometry args={[0.08, 0.03, 0.04]} />
          </mesh>
        </group>

        {/* 3: Card (Ivory) + Lightweight Miniature Wax Seal */}
        <group
          ref={(el) => {
            itemRefs.current[3] = el;
          }}
        >
          <RoundedBox
            args={[0.76, 0.036, 0.54]}
            radius={0.01}
            smoothness={2}
            material={materials.ivoryMat}
          />
          {/* Thin copper card frame accent */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.22, 0.23, 4]} />
            <meshBasicMaterial color={NAQSH_3D_PALETTE.copper} />
          </mesh>
          {/* Miniature Wax Seal stamping onto the card during Customize */}
          <group
            ref={miniSealGroupRef}
            position={[0.14, 0.032, 0.06]}
            scale={0.001}
          >
            <mesh material={materials.terracottaMat}>
              <cylinderGeometry args={[0.95, 1.02, 0.16, 24]} />
            </mesh>
            <mesh position={[0, 0.09, 0]} material={materials.copperMat}>
              <cylinderGeometry args={[0.52, 0.52, 0.05, 16]} />
            </mesh>
          </group>
        </group>

        {/* 4: Pen (Black with Copper tip) */}
        <group
          ref={(el) => {
            itemRefs.current[4] = el;
          }}
        >
          <mesh material={materials.bodyMat}>
            <cylinderGeometry args={[0.038, 0.038, 0.88, 20]} />
          </mesh>
          <mesh
            position={[0, -0.49, 0]}
            rotation={[Math.PI, 0, 0]}
            material={materials.copperMat}
          >
            <coneGeometry args={[0.038, 0.12, 20]} />
          </mesh>
          <mesh position={[0, 0.05, 0]} material={materials.copperMat}>
            <cylinderGeometry args={[0.041, 0.041, 0.04, 20]} />
          </mesh>
        </group>

        {/* LID: 2.5 x 0.32 x 1.9 in Ivory-deep #EFE5DA + Crossing Sage Ribbons */}
        <group ref={lidGroupRef} position={[0, 0.58, 0]}>
          <RoundedBox
            args={[2.5, 0.32, 1.9]}
            radius={0.05}
            smoothness={4}
            material={materials.lidMat}
          />
          <group ref={lidRibbonRef}>
            <RoundedBox
              args={[2.54, 0.34, 0.24]}
              radius={0.02}
              smoothness={2}
              material={materials.ribbonMat}
            />
            <RoundedBox
              args={[0.26, 0.34, 1.94]}
              radius={0.02}
              smoothness={2}
              material={materials.ribbonMat}
            />
            {/* Tailored flat ribbon bow knot on top of lid */}
            <RoundedBox
              args={[0.52, 0.06, 0.26]}
              radius={0.02}
              smoothness={2}
              position={[0, 0.18, 0]}
              material={materials.ribbonMat}
            />
            <mesh
              position={[0, 0.215, 0]}
              rotation={[0, Math.PI / 4, 0]}
              material={materials.copperMat}
            >
              <boxGeometry args={[0.09, 0.03, 0.09]} />
            </mesh>
          </group>
        </group>
      </group>

      <ContactShadows
        position={[0, -0.92, 0]}
        opacity={0.44}
        scale={5.2}
        blur={2.0}
        far={3.4}
        resolution={128}
        frames={1}
        color={NAQSH_3D_PALETTE.black}
      />
    </>
  );
}

export interface GiftBoxSceneCanvasProps {
  isVisible: boolean;
  onFirstFrame: () => void;
}

export default function GiftBoxSceneCanvas({
  isVisible,
  onFirstFrame,
}: GiftBoxSceneCanvasProps) {
  const [ready, setReady] = useState(false);
  const [warmedUp, setWarmedUp] = useState(false);

  return (
    <Canvas
      dpr={[1, 1.25]}
      frameloop={isVisible || !warmedUp ? "always" : "never"}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <PerspectiveCamera makeDefault position={[0, 1.45, 6.2]} fov={32} />
      <StudioLighting
        ready={ready}
        onFirstFrame={() => {
          setWarmedUp(true);
          onFirstFrame();
        }}
      />
      <GiftBoxActor onReady={setReady} />
    </Canvas>
  );
}
