"use client";

import "./patchThree";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { sceneProgress } from "@/lib/sceneProgress";
import { pointerNormalized } from "@/lib/useCan3D";
import { loadNormalizedEmblemShapes } from "./emblemShapes";
import { NAQSH_3D_PALETTE, StudioLighting } from "./StudioLighting";

const DIAMOND_COUNT = 36;

interface DiamondSeed {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  phase: number;
  rotSpeedX: number;
  rotSpeedY: number;
  parallaxFactor: number;
  isCopper: boolean;
}

function createDiamondSeeds(): DiamondSeed[] {
  const seeds: DiamondSeed[] = [];
  for (let i = 0; i < DIAMOND_COUNT; i++) {
    // Deterministic golden-angle spiral distribution around the emblem
    const t = i / DIAMOND_COUNT;
    const angle = i * 2.399963229728653;
    const radius = 0.72 + (i % 5) * 0.2 + t * 0.42;
    const x = Math.cos(angle) * radius * 0.95;
    const y = Math.sin(angle) * radius * 1.28;
    const z = ((i * 7) % 11 - 5) * 0.14;
    seeds.push({
      x,
      y,
      z,
      scale: 0.65 + ((i * 13) % 7) * 0.1,
      speed: 0.45 + ((i * 5) % 6) * 0.08,
      phase: i * 0.52,
      rotSpeedX: 0.12 + (i % 4) * 0.04,
      rotSpeedY: 0.16 + (i % 5) * 0.05,
      parallaxFactor: 0.5 + Math.abs(z) * 0.9,
      isCopper: i % 3 !== 0,
    });
  }
  return seeds;
}

function CopperEmblemActors({
  onReady,
}: {
  onReady: (ready: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const emblemMeshRef = useRef<THREE.Mesh>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const [emblemGeometry, setEmblemGeometry] =
    useState<THREE.ExtrudeGeometry | null>(null);

  const scaleRef = useRef(0.94);
  const parallaxOffsetRef = useRef({ x: 0, y: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => createDiamondSeeds(), []);

  // Build thin extruded diamond motif geometry for the 36 ambient instances
  const diamondGeometry = useMemo(() => {
    const r = 0.046;
    const shape = new THREE.Shape([
      new THREE.Vector2(0, r),
      new THREE.Vector2(-r, 0),
      new THREE.Vector2(0, -r),
      new THREE.Vector2(r, 0),
    ]);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.002,
      bevelSegments: 1,
      curveSegments: 4,
    });
    geom.center();
    return geom;
  }, []);

  useEffect(() => {
    let active = true;
    loadNormalizedEmblemShapes(3.0, 0.016)
      .then((shapes) => {
        if (!active) return;
        const geom = new THREE.ExtrudeGeometry(shapes, {
          depth: 0.14,
          bevelEnabled: true,
          bevelThickness: 0.012,
          bevelSize: 0.01,
          bevelSegments: 3,
          curveSegments: 16,
        });
        geom.translate(0, 0, -0.07);
        geom.computeVertexNormals();
        setEmblemGeometry(geom);
        onReady(true);
      })
      .catch(() => {
        // Fallback stays visible if loading fails
      });

    return () => {
      active = false;
    };
  }, [onReady]);

  useEffect(() => {
    return () => {
      emblemGeometry?.dispose();
      diamondGeometry.dispose();
    };
  }, [emblemGeometry, diamondGeometry]);

  // Initialize per-instance colors (Copper #AB6C49 and Khaki #C0A48E)
  useEffect(() => {
    const mesh = instancedRef.current;
    if (!mesh) return;
    const copperColor = new THREE.Color(NAQSH_3D_PALETTE.copper);
    const khakiColor = new THREE.Color(NAQSH_3D_PALETTE.khaki);
    seeds.forEach((seed, i) => {
      mesh.setColorAt(i, seed.isCopper ? copperColor : khakiColor);
    });
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [seeds]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const elapsed = state.clock.getElapsedTime();
    const progress = sceneProgress.vision;

    if (groupRef.current) {
      // Slow float: sin wave, ~0.08 units amplitude, 6s period, elevated +0.12 to sit higher in view
      const floatY = Math.sin((elapsed * Math.PI * 2) / 6.0) * 0.08 + 0.12;
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        floatY,
        4.0,
        dt
      );

      // Scroll-driven rotationY from -22° to +22° + pointer tilt up to 8°
      const scrollRotY = THREE.MathUtils.degToRad(-22 + progress * 44);
      const tiltY =
        pointerNormalized.x * THREE.MathUtils.degToRad(8);
      const tiltX =
        -pointerNormalized.y * THREE.MathUtils.degToRad(8);

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        scrollRotY + tiltY,
        4.2,
        dt
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        tiltX,
        4.2,
        dt
      );

      // Slight scale 0.94 -> 1.0 on enter
      scaleRef.current = THREE.MathUtils.damp(
        scaleRef.current,
        1.0,
        3.2,
        dt
      );
      groupRef.current.scale.setScalar(scaleRef.current);
    }

    // Update 36 ambient diamonds (drifting slowly + parallaxing against pointer)
    const instanced = instancedRef.current;
    if (instanced) {
      parallaxOffsetRef.current.x = THREE.MathUtils.damp(
        parallaxOffsetRef.current.x,
        -pointerNormalized.x * 0.16,
        3.5,
        dt
      );
      parallaxOffsetRef.current.y = THREE.MathUtils.damp(
        parallaxOffsetRef.current.y,
        -pointerNormalized.y * 0.12,
        3.5,
        dt
      );

      for (let i = 0; i < DIAMOND_COUNT; i++) {
        const s = seeds[i];
        const driftY = Math.sin(elapsed * s.speed + s.phase) * 0.065;
        const driftX = Math.cos(elapsed * (s.speed * 0.8) + s.phase) * 0.035;
        dummy.position.set(
          s.x + driftX + parallaxOffsetRef.current.x * s.parallaxFactor,
          s.y + driftY + parallaxOffsetRef.current.y * s.parallaxFactor,
          s.z
        );
        dummy.rotation.set(
          elapsed * s.rotSpeedX + s.phase,
          elapsed * s.rotSpeedY + progress * 0.6,
          0
        );
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        instanced.setMatrixAt(i, dummy.matrix);
      }
      instanced.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <group ref={groupRef} scale={0.94}>
        {emblemGeometry && (
          <mesh ref={emblemMeshRef} geometry={emblemGeometry}>
            <meshPhysicalMaterial
              color={NAQSH_3D_PALETTE.copper}
              metalness={1}
              roughness={0.32}
              clearcoat={0.25}
              clearcoatRoughness={0.35}
              envMapIntensity={1.2}
            />
          </mesh>
        )}
      </group>

      <instancedMesh
        ref={instancedRef}
        args={[diamondGeometry, undefined, DIAMOND_COUNT]}
      >
        <meshStandardMaterial
          metalness={0.72}
          roughness={0.48}
          envMapIntensity={0.85}
        />
      </instancedMesh>

      <ContactShadows
        position={[0, -1.78, 0]}
        opacity={0.42}
        scale={4.2}
        blur={2.4}
        far={3.2}
        resolution={256}
        frames={1}
        color={NAQSH_3D_PALETTE.black}
      />
    </>
  );
}

export interface EmblemSceneCanvasProps {
  isVisible: boolean;
  onFirstFrame: () => void;
}

export default function EmblemSceneCanvas({
  isVisible,
  onFirstFrame,
}: EmblemSceneCanvasProps) {
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
      <PerspectiveCamera makeDefault position={[0, 0, 5.1]} fov={34} />
      <StudioLighting ready={ready} onFirstFrame={onFirstFrame} />
      <CopperEmblemActors onReady={setReady} />
    </Canvas>
  );
}
