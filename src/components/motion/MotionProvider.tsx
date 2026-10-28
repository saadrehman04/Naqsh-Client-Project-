"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
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
  const lenisRef = useRef<Lenis | null>(null);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    let tickerAttached = false;
    const attachTicker = () => {
      if (tickerAttached || !tickerFn) return;
      tickerAttached = true;
      gsap.ticker.add(tickerFn);
    };

    const cleanupLenis = () => {
      window.removeEventListener("wheel", attachTicker);
      window.removeEventListener("scroll", attachTicker);
      window.removeEventListener("touchstart", attachTicker);
      window.removeEventListener("keydown", attachTicker);
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      tickerAttached = false;
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        lenis = null;
      }
      lenisRef.current = null;
      setLenisInstance(null);
      document.documentElement.classList.remove("motion-ok", "lenis", "lenis-smooth");
    };

    const setup = () => {
      const isReduced = reduceQuery.matches;
      setReducedMotion(isReduced);
      cleanupLenis();

      if (isReduced) {
        document.documentElement.classList.add("reduced-motion");
        if (ScrollTrigger.getAll().length > 0) {
          ScrollTrigger.refresh();
        }
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
      gsap.ticker.lagSmoothing(0);
      window.addEventListener("wheel", attachTicker, { once: true, passive: true });
      window.addEventListener("scroll", attachTicker, { once: true, passive: true });
      window.addEventListener("touchstart", attachTicker, { once: true, passive: true });
      window.addEventListener("keydown", attachTicker, { once: true, passive: true });

      lenisRef.current = activeLenis;
      setLenisInstance(activeLenis);
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
    const isRouteChange =
      prevPathRef.current !== null && prevPathRef.current !== pathname;
    prevPathRef.current = pathname;

    if (isRouteChange) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    }

    let refreshTimer: number | null = null;
    const scheduleRefresh = () => {
      if (window.scrollY >= 40) return;
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (window.scrollY < 40 && ScrollTrigger.getAll().length > 0) {
          ScrollTrigger.refresh();
        }
      }, 120);
    };

    if (isRouteChange) {
      scheduleRefresh();
    }

    if (document.fonts && document.fonts.status !== "loaded") {
      void document.fonts.ready.then(scheduleRefresh);
    }

    const images = Array.from(document.images).filter((img) => !img.complete);
    images.forEach((img) => {
      img.addEventListener("load", scheduleRefresh, { once: true });
      img.addEventListener("error", scheduleRefresh, { once: true });
    });

    return () => {
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      images.forEach((img) => {
        img.removeEventListener("load", scheduleRefresh);
        img.removeEventListener("error", scheduleRefresh);
      });
    };
  }, [pathname]);

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
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        lenisInstance.scrollTo(target, { offset: -88 });
        window.scrollTo({ top, behavior: "smooth" });
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
