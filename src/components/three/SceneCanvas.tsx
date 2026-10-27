"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Emblem() {
  const svg = useLoader(SVGLoader, "/brand/emblem-copper.svg");
  const group = useRef<THREE.Group>(null);
  const shapes = useMemo(() => svg.paths.flatMap((path) => SVGLoader.createShapes(path)), [svg]);
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * 0.12; group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.06; } });
  return <group ref={group} scale={0.00065} position={[-0.7, 1.3, 0]} rotation={[Math.PI, 0, 0]}>
    {shapes.map((shape, i) => <mesh key={i} geometry={new THREE.ExtrudeGeometry(shape, { depth: 10, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 2, bevelThickness: 2 })}>
      <meshPhysicalMaterial color="#AB6C49" metalness={1} roughness={0.35} clearcoat={0.45} side={THREE.DoubleSide} />
    </mesh>)}
  </group>;
}

function BoxScene() {
  const lid = useRef<THREE.Mesh>(null);
  const box = useRef<THREE.Group>(null);
  const products = useRef<THREE.Group>(null);
  useFrame(() => {
    const section = document.querySelector<HTMLElement>("[data-approach-sequence]");
    const rect = section?.getBoundingClientRect();
    const progress = rect ? THREE.MathUtils.clamp((innerHeight - rect.top) / (rect.height + innerHeight), 0, 1) : 0;
    const open = Math.sin(progress * Math.PI);
    if (lid.current) lid.current.position.y = 0.62 + open * 0.52;
    if (products.current) products.current.position.y = open * 0.46;
    if (box.current) { box.current.position.x = progress > 0.88 ? (progress - 0.88) * 4 : 0; box.current.rotation.y = Math.sin(progress * Math.PI) * 0.08; }
  });
  return <group ref={box} rotation={[0.08, -0.2, 0]}>
    <mesh position={[0, 0, 0]}><boxGeometry args={[1.8, 1, 1.3]} /><meshStandardMaterial color="#000000" roughness={0.55} /></mesh>
    <mesh ref={lid} position={[0, 0.62, 0]}><boxGeometry args={[1.9, 0.2, 1.4]} /><meshStandardMaterial color="#F7F1E7" roughness={0.5} /></mesh>
    <mesh position={[0, 0.02, 0.67]}><boxGeometry args={[0.16, 1.1, 0.04]} /><meshStandardMaterial color="#789675" roughness={0.55} /></mesh>
    <mesh position={[0, 0.52, 0]}><boxGeometry args={[0.17, 0.16, 1.42]} /><meshStandardMaterial color="#789675" roughness={0.55} /></mesh>
    <group ref={products}>
      <mesh position={[-0.35, 0.8, 0]}><boxGeometry args={[0.34, 0.45, 0.34]} /><meshStandardMaterial color="#B64F3E" roughness={0.5} /></mesh>
      <mesh position={[0.3, 0.78, 0]}><cylinderGeometry args={[0.17, 0.17, 0.46, 24]} /><meshStandardMaterial color="#C0A48E" roughness={0.45} /></mesh>
    </group>
  </group>;
}

function SealScene() {
  const svg = useLoader(SVGLoader, "/brand/emblem-ivory.svg");
  const shapes = useMemo(() => svg.paths.flatMap((path) => SVGLoader.createShapes(path)), [svg]);
  return <group rotation={[0, 0, -0.12]}>
    <mesh><cylinderGeometry args={[0.8, 0.78, 0.16, 48]} /><meshStandardMaterial color="#B64F3E" roughness={0.5} /></mesh>
    <group scale={0.00019} position={[-0.2, 0.36, 0.09]} rotation={[Math.PI, 0, 0]}>
      {shapes.map((shape, i) => <mesh key={i} geometry={new THREE.ExtrudeGeometry(shape, { depth: 5, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 2, bevelThickness: 1 })}>
        <meshPhysicalMaterial color="#F7F1E7" roughness={0.55} metalness={0.08} side={THREE.DoubleSide} />
      </mesh>)}
    </group>
  </group>;
}

function Scene({ scene }: { scene: "emblem" | "box" | "seal" }) {
  if (scene === "emblem") return <Emblem />;
  if (scene === "box") return <BoxScene />;
  return <SealScene />;
}

export default function SceneCanvas({ scene }: { scene: "emblem" | "box" | "seal" }) {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 38 }} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.4} /><directionalLight position={[3, 4, 5]} intensity={3.2} color="#F7F1E7" /><pointLight position={[-3, -2, 3]} intensity={20} color="#AB6C49" />
    <Scene scene={scene} />
  </Canvas>;
}
