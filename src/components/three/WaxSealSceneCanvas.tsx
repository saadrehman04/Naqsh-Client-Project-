"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { pointerNormalized } from "@/lib/useCan3D";
import { loadNormalizedEmblemShapes } from "./emblemShapes";
import { NAQSH_3D_PALETTE, StudioLighting } from "./StudioLighting";

function perturbedRadius(theta: number, baseRadius: number): number {
  const n =
    0.024 * Math.sin(5 * theta + 0.4) +
    0.015 * Math.cos(7 * theta - 0.85) +
    0.009 * Math.sin(11 * theta + 1.3);
  return baseRadius * (1 + n);
}

function buildWaxSealGeometries() {
  const segments = 96;
  const outerPts: THREE.Vector2[] = [];
  const rimOuterPts: THREE.Vector2[] = [];
  const rimInnerPts: THREE.Vector2[] = [];

  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const rOuter = perturbedRadius(theta, 1.06);
    const rRimOut = perturbedRadius(theta, 0.97);
    const rRimIn = perturbedRadius(theta + 0.08, 0.74);

    outerPts.push(
      new THREE.Vector2(Math.cos(theta) * rOuter, Math.sin(theta) * rOuter)
    );
    rimOuterPts.push(
      new THREE.Vector2(Math.cos(theta) * rRimOut, Math.sin(theta) * rRimOut)
    );
    rimInnerPts.push(
      new THREE.Vector2(Math.cos(theta) * rRimIn, Math.sin(theta) * rRimIn)
    );
  }

  const discShape = new THREE.Shape(outerPts);
  const discGeometry = new THREE.ExtrudeGeometry(discShape, {
    depth: 0.11,
    bevelEnabled: true,
    bevelThickness: 0.026,
    bevelSize: 0.024,
    bevelSegments: 4,
    curveSegments: 24,
  });
  discGeometry.translate(0, 0, -0.055);
  discGeometry.computeVertexNormals();

  // Raised outer wax rim creating a slightly recessed center well
  const rimShape = new THREE.Shape(rimOuterPts);
  const holePath = new THREE.Path([...rimInnerPts].reverse());
  rimShape.holes.push(holePath);

  const rimGeometry = new THREE.ExtrudeGeometry(rimShape, {
    depth: 0.042,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 24,
  });
  rimGeometry.translate(0, 0, 0.048);
  rimGeometry.computeVertexNormals();

  // Subtle recessed inner floor for cavity shadow depth
  const wellGeometry = new THREE.CircleGeometry(0.75, 64);

  return { discGeometry, rimGeometry, wellGeometry };
}

interface WaxSealActorProps {
  trigger?: boolean | number;
  progressDrivenRef?: React.MutableRefObject<number> | null;
  hideShadows?: boolean;
  onReady: (ready: boolean) => void;
}

export function WaxSealActor({
  trigger = true,
  progressDrivenRef = null,
  hideShadows = false,
  onReady,
}: WaxSealActorProps) {
  const sealGroupRef = useRef<THREE.Group>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const [emblemGeometry, setEmblemGeometry] =
    useState<THREE.ExtrudeGeometry | null>(null);

  const { discGeometry, rimGeometry, wellGeometry } = useMemo(
    () => buildWaxSealGeometries(),
    []
  );

  // Shared wax material (Terracotta #B64F3E with Chestnut #7F3021 sheen)
  const waxMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: NAQSH_3D_PALETTE.terracotta,
        roughness: 0.45,
        metalness: 0.04,
        clearcoat: 0.3,
        clearcoatRoughness: 0.5,
        sheen: 0.3,
        sheenColor: new THREE.Color(NAQSH_3D_PALETTE.chestnut),
        transparent: true,
        opacity: 1,
      }),
    []
  );

  const animRef = useRef({
    y: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotateZ: 0,
    opacity: 1,
    ringScale: 0.9,
    ringOpacity: 0,
    shadowOpacity: 0.42,
    shakeX: 0,
    shakeY: 0,
  });

  useEffect(() => {
    let active = true;
    loadNormalizedEmblemShapes(1.18, 0.015)
      .then((shapes) => {
        if (!active) return;
        const geom = new THREE.ExtrudeGeometry(shapes, {
          depth: 0.03,
          bevelEnabled: true,
          bevelThickness: 0.008,
          bevelSize: 0.007,
          bevelSegments: 3,
          curveSegments: 16,
        });
        geom.translate(0, 0, 0.068);
        geom.computeVertexNormals();
        setEmblemGeometry(geom);
        onReady(true);
      })
      .catch(() => {
        onReady(true);
      });

    return () => {
      active = false;
    };
  }, [onReady]);

  useEffect(() => {
    return () => {
      discGeometry.dispose();
      rimGeometry.dispose();
      wellGeometry.dispose();
      emblemGeometry?.dispose();
      waxMaterial.dispose();
    };
  }, [discGeometry, rimGeometry, wellGeometry, emblemGeometry, waxMaterial]);

  // Stamp GSAP timeline whenever `trigger` fires
  useEffect(() => {
    if (progressDrivenRef !== null) return;
    if (!trigger) return;

    const s = animRef.current;
    s.y = 1.2;
    s.scaleX = 1.15;
    s.scaleY = 1.15;
    s.scaleZ = 1.15;
    s.rotateZ = THREE.MathUtils.degToRad(-6);
    s.opacity = 0;
    s.ringScale = 0.92;
    s.ringOpacity = 0;
    s.shadowOpacity = 0.14;
    s.shakeX = 0;
    s.shakeY = 0;

    const tl = gsap.timeline();

    // Fall from y +1.2 to y 0 in 0.5s (power3.in)
    tl.to(
      s,
      {
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
      },
      0
    );
    tl.to(
      s,
      {
        y: 0,
        rotateZ: 0,
        duration: 0.5,
        ease: "power3.in",
      },
      0
    );

    // On impact (0.5s): squash scaleY to 0.9 and scaleXZ to 1.04 for 0.12s
    tl.to(
      s,
      {
        scaleY: 0.9,
        scaleX: 1.04,
        scaleZ: 1.04,
        shadowOpacity: 0.52,
        duration: 0.12,
        ease: "power2.out",
      },
      0.5
    );

    // Settle back with elastic.out(1, 0.6)
    tl.to(
      s,
      {
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        shadowOpacity: 0.42,
        duration: 0.65,
        ease: "elastic.out(1, 0.6)",
      },
      0.62
    );

    // Thin ring mesh expands from the seal and fades (0.7s)
    tl.fromTo(
      s,
      { ringScale: 0.96, ringOpacity: 0.72 },
      {
        ringScale: 1.56,
        ringOpacity: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      0.5
    );

    // Tiny camera shake (0.01 units, 0.15s)
    tl.to(
      s,
      {
        shakeX: 0.01,
        shakeY: -0.01,
        duration: 0.035,
        yoyo: true,
        repeat: 3,
        ease: "sine.inOut",
        onComplete: () => {
          s.shakeX = 0;
          s.shakeY = 0;
        },
      },
      0.5
    );

    return () => {
      tl.kill();
    };
  }, [trigger, progressDrivenRef]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = animRef.current;

    if (progressDrivenRef !== null) {
      // Driven by scroll progress [0..1] via ref (e.g. inside Gift Box Customize step)
      const p = THREE.MathUtils.clamp(progressDrivenRef.current, 0, 1);
      const impact = p < 0.6 ? p / 0.6 : 1;
      s.y = (1 - impact) * 0.85;
      s.opacity = THREE.MathUtils.clamp(p * 2.5, 0, 1);
      const squash =
        p >= 0.55 && p <= 0.78 ? Math.sin(((p - 0.55) / 0.23) * Math.PI) : 0;
      s.scaleY = 1 + (1 - impact) * 0.15 - squash * 0.1;
      s.scaleX = 1 + (1 - impact) * 0.15 + squash * 0.04;
      s.scaleZ = s.scaleX;
      s.rotateZ = (1 - impact) * THREE.MathUtils.degToRad(-6);
    }

    if (sealGroupRef.current) {
      const tiltX =
        0.18 - pointerNormalized.y * THREE.MathUtils.degToRad(5);
      const tiltY =
        pointerNormalized.x * THREE.MathUtils.degToRad(5);

      sealGroupRef.current.position.y = s.y;
      sealGroupRef.current.scale.set(s.scaleX, s.scaleY, s.scaleZ);
      sealGroupRef.current.rotation.z = s.rotateZ;
      sealGroupRef.current.rotation.x = THREE.MathUtils.damp(
        sealGroupRef.current.rotation.x,
        tiltX,
        4.5,
        dt
      );
      sealGroupRef.current.rotation.y = THREE.MathUtils.damp(
        sealGroupRef.current.rotation.y,
        tiltY,
        4.5,
        dt
      );
    }

    waxMaterial.opacity = s.opacity;

    if (ringMeshRef.current && ringMatRef.current) {
      ringMeshRef.current.scale.setScalar(s.ringScale);
      ringMatRef.current.opacity = s.ringOpacity;
    }

    state.camera.position.x = s.shakeX;
    state.camera.position.y = s.shakeY;
  });

  return (
    <>
      <group ref={sealGroupRef}>
        {/* Organic perturbed wax disc */}
        <mesh geometry={discGeometry} material={waxMaterial} />

        {/* Slightly darker recessed cavity floor for realistic wax depth */}
        <mesh geometry={wellGeometry} position={[0, 0, 0.058]}>
          <meshStandardMaterial
            color={NAQSH_3D_PALETTE.chestnut}
            roughness={0.62}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Raised outer wax rim */}
        <mesh geometry={rimGeometry} material={waxMaterial} />

        {/* Embossed Naqsh emblem in the center face */}
        {emblemGeometry && (
          <mesh geometry={emblemGeometry} material={waxMaterial} />
        )}

        {/* Grazing warm key highlight on embossed emblem bevels */}
        <pointLight
          position={[-1.35, 1.55, 0.42]}
          intensity={1.35}
          distance={3.6}
          color={NAQSH_3D_PALETTE.ivory}
        />
      </group>

      {/* Expanding impact ring */}
      <mesh ref={ringMeshRef} position={[0, 0, -0.04]}>
        <ringGeometry args={[1.06, 1.11, 64]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color={NAQSH_3D_PALETTE.copper}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {!hideShadows && (
        <ContactShadows
          position={[0, -1.22, -0.2]}
          opacity={0.42}
          scale={3.4}
          blur={1.8}
          far={2.6}
          resolution={256}
          frames={1}
          color={NAQSH_3D_PALETTE.black}
        />
      )}
    </>
  );
}

export interface WaxSealSceneCanvasProps {
  trigger?: boolean | number;
  isVisible: boolean;
  onFirstFrame: () => void;
}

export default function WaxSealSceneCanvas({
  trigger = true,
  isVisible,
  onFirstFrame,
}: WaxSealSceneCanvasProps) {
  const [ready, setReady] = useState(false);

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={isVisible ? "always" : "never"}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 4.15]} fov={34} />
      <StudioLighting ready={ready} onFirstFrame={onFirstFrame} />
      <WaxSealActor trigger={trigger} onReady={setReady} />
    </Canvas>
  );
}
