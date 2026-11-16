"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

const MIN_THUMB = 56;
const IDLE_MS = 1200;

/**
 * Slim branded scroll indicator on the inline-end edge, replacing the hidden native scrollbar.
 * A faint khaki trace with a glowing terracotta thumb; it brightens while the page scrolls and
 * settles back when idle. Desktop pointers can drag the thumb or click the trace to jump.
 * Decorative for assistive tech (keyboard and wheel scrolling are unchanged).
 */
export function ScrollTrace() {
  const { lenis } = useMotion();
  const thumbRef = useRef<HTMLDivElement>(null);
  const geo = useRef({ thumbH: MIN_THUMB, travel: 0, max: 0 });
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);
  const [active, setActive] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    let frame = 0;
    let idle = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const thumbH = Math.max(MIN_THUMB, (vh * vh) / (max + vh));
      geo.current = { thumbH, travel: vh - thumbH, max };
      setScrollable(max > 8);
      if (thumbRef.current) thumbRef.current.style.height = `${thumbH}px`;
    };

    const paint = () => {
      frame = 0;
      const { travel, max } = geo.current;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (thumbRef.current) thumbRef.current.style.transform = `translate3d(0, ${progress * travel}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
      setActive(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        if (!drag.current) setActive(false);
      }, IDLE_MS);
    };

    const onResize = () => {
      measure();
      paint();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Page height changes (images, accordions, route changes) resize the thumb.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
    };
  }, []);

  const scrollToY = (y: number, immediate: boolean) => {
    const top = Math.min(geo.current.max, Math.max(0, y));
    if (lenis) lenis.scrollTo(top, { immediate });
    else window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
  };

  const onThumbDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: window.scrollY };
    setActive(true);
  };

  const onThumbMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const { travel, max } = geo.current;
    const ratio = travel > 0 ? max / travel : 0;
    scrollToY(drag.current.startScroll + (e.clientY - drag.current.startY) * ratio, true);
  };

  const onThumbUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
    window.setTimeout(() => setActive(false), IDLE_MS);
  };

  // Clicking the trace centres the thumb on that point.
  const onRailDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const { thumbH, travel, max } = geo.current;
    if (travel <= 0) return;
    const progress = (e.clientY - thumbH / 2) / travel;
    scrollToY(progress * max, false);
  };

  // Always rendered (refs must exist for measuring); hidden on pages too short to scroll.
  return (
    <div
      className={`scroll-trace${active ? " is-active" : ""}${scrollable ? "" : " is-hidden"}`}
      aria-hidden="true"
      onPointerDown={onRailDown}
    >
      <div
        ref={thumbRef}
        className="scroll-trace-thumb"
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
      />
    </div>
  );
}
