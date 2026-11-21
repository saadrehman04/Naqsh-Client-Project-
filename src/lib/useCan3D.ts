"use client";

import { useEffect, useState, type RefObject } from "react";

interface NavigatorWithDeviceInfo extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
}

let cachedWebGL2Support: boolean | null = null;

export function checkWebGL2Support(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  if (cachedWebGL2Support !== null) {
    return cachedWebGL2Support;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", {
      powerPreference: "high-performance",
    });
    cachedWebGL2Support = Boolean(gl);
    if (gl) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    cachedWebGL2Support = false;
  }
  return cachedWebGL2Support;
}

export function evaluateCan3D(minWidth = 320): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  if (window.innerWidth < minWidth) {
    return false;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  if (document.documentElement.classList.contains("reduced-motion")) {
    return false;
  }
  const nav = navigator as NavigatorWithDeviceInfo;
  if (nav.connection?.saveData === true) {
    return false;
  }
  return checkWebGL2Support();
}

/**
 * Decides if real-time WebGL 3D may run for a scene at a given minimum viewport width.
 */
export function useCan3D(minWidth = 320): boolean {
  const [can3D, setCan3D] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setCan3D(evaluateCan3D(minWidth));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    mediaQuery.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mediaQuery.removeEventListener("change", update);
    };
  }, [minWidth]);

  return can3D;
}

/**
 * Resolves once the visitor first interacts (scroll, wheel, touch, click, key or mouse move),
 * then waits for an idle moment. 3D scenes are never above the fold, so loading the 3D library
 * (~280 KB) during page load only slowed the first seconds (Lighthouse TBT up to 3.3 s on phones).
 * Visitors who scroll still get the scene well before it is in view.
 */
let interactionPromise: Promise<void> | null = null;
function afterFirstInteraction(): Promise<void> {
  if (interactionPromise) return interactionPromise;
  interactionPromise = new Promise((resolve) => {
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown", "mousemove"] as const;
    const done = () => {
      events.forEach((e) => window.removeEventListener(e, done));
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback;
      if (idle) idle(() => resolve(), { timeout: 1200 });
      else window.setTimeout(resolve, 200);
    };
    events.forEach((e) => window.addEventListener(e, done, { passive: true, once: true }));
  });
  return interactionPromise;
}

/**
 * Mounts a 3D scene early (within ~2200px of the viewport) so shaders and geometries
 * warm up well before the user reaches the section, and pauses rendering (`isVisible = false`)
 * when off-screen so GPU load is zero when not visible.
 */
export function useSceneViewportLifecycle(
  wrapperRef: RefObject<HTMLElement | null>,
  can3D: boolean
): { shouldMount: boolean; isVisible: boolean } {
  const [shouldMount, setShouldMount] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!can3D || !el || typeof IntersectionObserver === "undefined") {
      setShouldMount(false);
      setIsVisible(false);
      return;
    }

    // Mount only after the first interaction (see afterFirstInteraction), unless the scene is
    // already on screen. Until then the scene's still fallback image is shown, as before.
    let interacted = false;
    let nearby = false;
    let cancelled = false;
    const maybeMount = () => {
      if (!cancelled && nearby && interacted) setShouldMount(true);
    };
    afterFirstInteraction().then(() => {
      interacted = true;
      maybeMount();
    });

    const checkBounds = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const withinPreload = rect.top <= vh + 3800 && rect.bottom >= -3800;
      const onScreen = rect.top <= vh + 180 && rect.bottom >= -180;
      if (onScreen) {
        setShouldMount(true);
      } else if (withinPreload) {
        nearby = true;
        maybeMount();
      }
      setIsVisible(onScreen);
    };

    checkBounds();

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          nearby = true;
          maybeMount();
        }
      },
      { rootMargin: "3800px 0px 3800px 0px", threshold: 0 }
    );

    const visibleObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "180px 0px 180px 0px", threshold: 0 }
    );

    mountObserver.observe(el);
    visibleObserver.observe(el);

    return () => {
      cancelled = true;
      mountObserver.disconnect();
      visibleObserver.disconnect();
    };
  }, [wrapperRef, can3D]);

  return { shouldMount: can3D && shouldMount, isVisible: can3D && isVisible };
}

/**
 * Shared normalized window pointer coordinates (-1..+1), updated via a single
 * passive window `pointermove` listener and disabled on touch input.
 */
export const pointerNormalized = {
  x: 0,
  y: 0,
};

let pointerListenerCount = 0;
let cleanupPointerListener: (() => void) | null = null;

export function useWindowPointerTilt(): typeof pointerNormalized {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    pointerListenerCount += 1;
    if (pointerListenerCount === 1) {
      const handleMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const w = Math.max(1, window.innerWidth);
        const h = Math.max(1, window.innerHeight);
        pointerNormalized.x = (event.clientX / w) * 2 - 1;
        pointerNormalized.y = -((event.clientY / h) * 2 - 1);
      };
      window.addEventListener("pointermove", handleMove, { passive: true });
      cleanupPointerListener = () => {
        window.removeEventListener("pointermove", handleMove);
      };
    }

    return () => {
      pointerListenerCount = Math.max(0, pointerListenerCount - 1);
      if (pointerListenerCount === 0 && cleanupPointerListener) {
        cleanupPointerListener();
        cleanupPointerListener = null;
        pointerNormalized.x = 0;
        pointerNormalized.y = 0;
      }
    };
  }, []);

  return pointerNormalized;
}
