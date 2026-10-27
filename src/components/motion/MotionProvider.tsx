"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReduced = mediaQuery.matches;
    setReducedMotion(isReduced);

    if (isReduced) {
      document.documentElement.classList.remove("motion-ok");
      return;
    }

    // Enable motion styles safely
    document.documentElement.classList.add("motion-ok");

    // Safety timeout: Ensure content is never stuck hidden if GSAP or Lenis stalls
    const safetyTimer = setTimeout(() => {
      document.documentElement.classList.remove("motion-ok");
    }, 2800);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    setLenisInstance(lenis);

    // Wire Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(safetyTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ lenis: lenisInstance, reducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
