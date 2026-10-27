"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type Lenis from "lenis";

interface MotionContextValue {
  lenis: Lenis | null;
  reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  lenis: null,
  reducedMotion: false,
});

export function useMotion() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const isReduced = mediaQuery.matches;
    queueMicrotask(() => setReducedMotion(isReduced));

    if (isReduced || !desktopQuery.matches) {
      document.documentElement.classList.remove("motion-ok");
      return;
    }

    let destroyed = false;
    let lenis: Lenis | null = null;
    let removeTicker: (() => void) | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;
    void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(([lenisModule, gsapModule, triggerModule]) => {
      if (destroyed) return;
      const Lenis = lenisModule.default;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false });
      setLenisInstance(lenis);
      document.documentElement.classList.add("motion-ok");
      lenis.on("scroll", ScrollTrigger.update);
      const tickerCallback = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      removeTicker = () => gsap.ticker.remove(tickerCallback);
      safetyTimer = setTimeout(() => document.documentElement.classList.remove("motion-ok"), 2800);
    });
    return () => {
      destroyed = true;
      if (safetyTimer) clearTimeout(safetyTimer);
      removeTicker?.();
      lenis?.destroy();
      document.documentElement.classList.remove("motion-ok");
      setLenisInstance(null);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ lenis: lenisInstance, reducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
