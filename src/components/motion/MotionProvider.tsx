"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const pathname = usePathname();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    const cleanupLenis = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        lenis = null;
      }
      setLenisInstance(null);
      document.documentElement.classList.remove("motion-ok", "lenis", "lenis-smooth");
    };

    const setup = () => {
      const isReduced = reduceQuery.matches;
      setReducedMotion(isReduced);
      cleanupLenis();

      if (isReduced) {
        document.documentElement.classList.add("reduced-motion");
        ScrollTrigger.refresh();
        return;
      }

      document.documentElement.classList.remove("reduced-motion");
      document.documentElement.classList.add("js", "motion-ok");

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      const activeLenis = lenis;
      activeLenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => {
        activeLenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      setLenisInstance(activeLenis);
      ScrollTrigger.refresh();
    };

    setup();
    reduceQuery.addEventListener("change", setup);

    return () => {
      reduceQuery.removeEventListener("change", setup);
      cleanupLenis();
    };
  }, []);

  // On route change: scroll to top immediately and refresh ScrollTrigger after fonts and images settle
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    const doRefresh = () => {
      ScrollTrigger.refresh();
    };

    const rafId = window.requestAnimationFrame(doRefresh);
    const timerId = window.setTimeout(doRefresh, 250);

    if (document.fonts?.ready) {
      void document.fonts.ready.then(doRefresh);
    }

    const images = Array.from(document.images).filter((img) => !img.complete);
    const handleImgLoad = () => {
      doRefresh();
    };
    images.forEach((img) => {
      img.addEventListener("load", handleImgLoad, { once: true });
      img.addEventListener("error", handleImgLoad, { once: true });
    });

    window.addEventListener("load", doRefresh, { once: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
      window.removeEventListener("load", doRefresh);
      images.forEach((img) => {
        img.removeEventListener("load", handleImgLoad);
        img.removeEventListener("error", handleImgLoad);
      });
    };
  }, [pathname, lenisInstance]);

  // Anchor links use lenis.scrollTo(target, { offset: -88 })
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetEl = event.target as HTMLElement | null;
      const anchor = targetEl?.closest<HTMLAnchorElement>('a[href^="#"], a[href*="/#"]');
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref === "#") return;

      let hash = "";
      if (rawHref.startsWith("#")) {
        hash = rawHref;
      } else {
        try {
          const url = new URL(rawHref, window.location.origin);
          if (url.pathname !== window.location.pathname) return;
          hash = url.hash;
        } catch {
          return;
        }
      }

      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      if (lenisInstance && !reducedMotion) {
        lenisInstance.scrollTo(target, { offset: -88 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
      }
      if (window.history?.pushState) {
        window.history.pushState(null, "", hash);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenisInstance, reducedMotion]);

  return (
    <MotionContext.Provider value={{ lenis: lenisInstance, reducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
