"use client";

import "./patchThree";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { pointerNormalized } from "@/lib/useCan3D";
import { loadNormalizedEmblemShapes } from "./emblemShapes";
import { NAQSH_3D_PALETTE, StudioLighting } from "./StudioLighting";

function outerWaxRadius(theta: number, baseRadius: number): number {
  // Subtle, symmetrical organic wax edge (no lopsided bulges)
  const n =
    0.006 * Math.cos(8 * theta) +
    0.004 * Math.sin(12 * theta);
  return baseRadius * (1 + n);
}

function buildWaxSealGeometries() {
  const segments = 128;
  const outerPts: THREE.Vector2[] = [];
  const rimOuterPts: THREE.Vector2[] = [];
  const rimInnerPts: THREE.Vector2[] = [];

  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const rOuter = outerWaxRadius(theta, 0.98);
    const rRimOut = outerWaxRadius(theta, 0.92);
    const rRimIn = 0.74;

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
    depth: 0.09,
    bevelEnabled: true,
    bevelThickness: 0.032,
    bevelSize: 0.03,
    bevelSegments: 5,
    curveSegments: 32,
  });
  discGeometry.translate(0, 0, -0.045);
  discGeometry.computeVertexNormals();

  // Raised outer wax cushion rim around the circular brass-stamped center well
  const rimShape = new THREE.Shape(rimOuterPts);
  const holePath = new THREE.Path([...rimInnerPts].reverse());
  rimShape.holes.push(holePath);

  const rimGeometry = new THREE.ExtrudeGeometry(rimShape, {
    depth: 0.042,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.022,
    bevelSegments: 4,
    curveSegments: 32,
  });
  rimGeometry.translate(0, 0, 0.038);
  rimGeometry.computeVertexNormals();

  // Recessed circular inner well floor
  const wellGeometry = new THREE.CircleGeometry(0.75, 64);

  // Raised 3D brass-gold inner bezel torus ring framing the stamp cavity
  const bezelGeometry = new THREE.TorusGeometry(0.715, 0.016, 16, 96);

  return { discGeometry, rimGeometry, wellGeometry, bezelGeometry };
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
  onReady,
}: WaxSealActorProps) {
  const sealGroupRef = useRef<THREE.Group>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const [emblemGeometry, setEmblemGeometry] =
    useState<THREE.ExtrudeGeometry | null>(null);

  const { discGeometry, rimGeometry, wellGeometry, bezelGeometry } = useMemo(
    () => buildWaxSealGeometries(),
    []
  );

  // Rich crimson-chestnut sealing wax material for the outer disc & cushion rim
  const waxMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8B291B",
        roughness: 0.34,
        metalness: 0.08,
        emissive: "#260804",
        emissiveIntensity: 0.22,
        transparent: true,
        opacity: 1,
      }),
    []
  );

  // Deeper recessed well material so the center cavity has rich shadow contrast
  const wellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4A130B",
        roughness: 0.52,
        metalness: 0.05,
        emissive: "#180402",
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 1,
      }),
    []
  );

  // Warm burnished gold-copper metallic relief for the stamped Naqsh emblem & inner bezel
  const emblemReliefMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ECC37E",
        roughness: 0.28,
        metalness: 0.48,
        emissive: "#6E4418",
        emissiveIntensity: 0.34,
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
    loadNormalizedEmblemShapes(1.06, 0.012)
      .then((shapes) => {
        if (!active) return;
        const geom = new THREE.ExtrudeGeometry(shapes, {
          depth: 0.036,
          bevelEnabled: true,
          bevelThickness: 0.005,
          bevelSize: 0.0035,
          bevelSegments: 2,
          curveSegments: 16,
        });
        geom.translate(0, 0, 0.052);
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
      bezelGeometry.dispose();
      emblemGeometry?.dispose();
      waxMaterial.dispose();
      wellMaterial.dispose();
      emblemReliefMaterial.dispose();
    };
  }, [
    discGeometry,
    rimGeometry,
    wellGeometry,
    bezelGeometry,
    emblemGeometry,
    waxMaterial,
    wellMaterial,
    emblemReliefMaterial,
  ]);

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
        0.08 - pointerNormalized.y * THREE.MathUtils.degToRad(5);
      const tiltY =
        pointerNormalized.x * THREE.MathUtils.degToRad(5);

      sealGroupRef.current.position.y = s.y * 0.35;
      sealGroupRef.current.scale.set(
        s.scaleX * 0.86,
        s.scaleY * 0.86,
        s.scaleZ * 0.86
      );
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
    wellMaterial.opacity = s.opacity;
    emblemReliefMaterial.opacity = s.opacity;

    if (ringMeshRef.current && ringMatRef.current) {
      ringMeshRef.current.scale.setScalar(s.ringScale * 0.86);
      ringMatRef.current.opacity = s.ringOpacity;
    }

    state.camera.position.x = s.shakeX;
    state.camera.position.y = s.shakeY;
  });

  return (
    <>
      <group ref={sealGroupRef} scale={0.86}>
        {/* Organic outer wax disc */}
        <mesh geometry={discGeometry} material={waxMaterial} />

        {/* Deep recessed circular brass-stamped cavity floor */}
        <mesh
          geometry={wellGeometry}
          material={wellMaterial}
          position={[0, 0, 0.052]}
        />

        {/* Raised outer wax cushion rim */}
        <mesh geometry={rimGeometry} material={waxMaterial} />

        {/* 3D gilded-brass inner stamp bezel ring framing the Naqsh emblem */}
        <mesh
          geometry={bezelGeometry}
          material={emblemReliefMaterial}
          position={[0, 0, 0.062]}
        />

        {/* Embossed gilded-copper Naqsh emblem in the center face */}
        {emblemGeometry && (
          <mesh geometry={emblemGeometry} material={emblemReliefMaterial} />
        )}

        {/* Warm front-angled key & fill lights for crisp relief legibility */}
        <pointLight
          position={[-1.1, 1.3, 2.2]}
          intensity={2.2}
          distance={5.5}
          color={NAQSH_3D_PALETTE.ivory}
        />
        <pointLight
          position={[1.2, -0.8, 2.4]}
          intensity={1.2}
          distance={5.0}
          color="#F5D096"
        />
      </group>

      {/* Expanding impact ring */}
      <mesh ref={ringMeshRef} position={[0, 0, -0.04]}>
        <ringGeometry args={[1.02, 1.06, 64]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color={NAQSH_3D_PALETTE.copper}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
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
      <PerspectiveCamera makeDefault position={[0, 0, 4.65]} fov={32} />
      <StudioLighting
        ready={ready}
        onFirstFrame={() => {
          setWarmedUp(true);
          onFirstFrame();
        }}
      />
      <WaxSealActor trigger={trigger} onReady={setReady} />
    </Canvas>
  );
}
