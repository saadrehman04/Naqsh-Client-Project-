"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";

export const NAQSH_3D_PALETTE = {
  copper: "#AB6C49",
  terracotta: "#B64F3E",
  chestnut: "#7F3021",
  ivory: "#F7F1E7",
  ivoryDeep: "#EFE5DA",
  black: "#000000",
  khaki: "#C0A48E",
  sage: "#789675",
  pine: "#145240",
} as const;

export function disposeObject3D(root: THREE.Object3D | null | undefined) {
  if (!root) return;
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }
    if (mesh.material) {
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      for (const mat of materials) {
        if (!mat) continue;
        for (const value of Object.values(mat)) {
          if (value && typeof value === "object" && "isTexture" in value) {
            (value as THREE.Texture).dispose();
          }
        }
        mat.dispose();
      }
    }
  });
}

interface StudioLightingProps {
  ready?: boolean;
  onFirstFrame?: () => void;
}

/**
 * Procedural zero-network studio environment using `@react-three/drei`
 * `<Environment>` + `<Lightformer>` children:
 * 1. Large soft Ivory (#F7F1E7) rect from upper-left
 * 2. Small warm Copper (#AB6C49) strip from the right
 * 3. Dim Khaki (#C0A48E) fill from below
 * Plus one soft directional light and renderer cleanup on unmount.
 */
export function StudioLighting({
  ready = true,
  onFirstFrame,
}: StudioLightingProps) {
  const { gl, scene } = useThree();
  const firedRef = useRef(false);
  const frameCountRef = useRef(0);

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.08;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);

  useEffect(() => {
    // Expose active WebGL diagnostics on window for automated verification
    const win = window as Window & {
      __naqsh3DContexts?: Set<THREE.WebGLRenderer>;
    };
    if (!win.__naqsh3DContexts) {
      win.__naqsh3DContexts = new Set();
    }
    win.__naqsh3DContexts.add(gl);

    return () => {
      win.__naqsh3DContexts?.delete(gl);
      disposeObject3D(scene);
      try {
        gl.renderLists?.dispose();
        gl.dispose();
        gl.forceContextLoss();
      } catch {
        // Ignore if context already lost
      }
    };
  }, [gl, scene]);

  useFrame(() => {
    if (!ready || firedRef.current) return;
    frameCountRef.current += 1;
    if (frameCountRef.current >= 2) {
      firedRef.current = true;
      onFirstFrame?.();
    }
  });

  return (
    <>
      <ambientLight intensity={0.46} color={NAQSH_3D_PALETTE.ivory} />
      <directionalLight
        position={[-2.6, 4.2, 4.8]}
        intensity={1.35}
        color={NAQSH_3D_PALETTE.ivory}
      />
      <Environment resolution={128} frames={1}>
        {/* Large soft ivory rect from the upper left */}
        <Lightformer
          form="rect"
          intensity={2.6}
          color={NAQSH_3D_PALETTE.ivory}
          scale={[8.5, 6.5, 1]}
          position={[-4.5, 4.2, 4.0]}
          target={[0, 0, 0]}
        />
        {/* Small warm copper strip from the right */}
        <Lightformer
          form="rect"
          intensity={2.2}
          color={NAQSH_3D_PALETTE.copper}
          scale={[1.8, 5.8, 1]}
          position={[4.8, 0.8, 2.6]}
          target={[0, 0, 0]}
        />
        {/* Dim khaki fill from below */}
        <Lightformer
          form="rect"
          intensity={1.0}
          color={NAQSH_3D_PALETTE.khaki}
          scale={[7.5, 4.5, 1]}
          position={[0, -4.4, 1.8]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  );
}
