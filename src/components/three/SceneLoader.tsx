"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function SceneLoader({ scene, className = "" }: { scene: "emblem" | "box" | "seal"; className?: string }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lowPower = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const allow3d = !motion.matches && !small.matches && !connection?.saveData && !(lowPower && lowPower <= 4);
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && allow3d), { rootMargin: "180px" });
    const element = document.querySelector(`[data-scene="${scene}"]`);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [scene]);
  const poster = <div className={`scene-poster scene-poster-${scene}`} aria-hidden="true"><Image src="/brand/emblem-copper.svg" alt="" width={320} height={320} /></div>;
  return <div className={`scene-host ${className}`} data-scene={scene} aria-hidden="true">
    {poster}
    {active && <SceneBoundary fallback={null}><SceneCanvas scene={scene} /></SceneBoundary>}
  </div>;
}
