"use client";

import { useEffect } from "react";
import { useMotion } from "./MotionProvider";

export function MotionChrome() {
  const { lenis, reducedMotion } = useMotion();

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isDesktopFine = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    let cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const recomputeMaxScroll = () => {
      cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      updateProgress();
    };

    const updateProgress = () => {
      if (progress) {
        const ratio = Math.max(0, Math.min(1, window.scrollY / cachedMaxScroll));
        progress.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || isCoarse) return;

      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-cursor-label]"
        );
        cursor.classList.toggle("is-over", !!target);
        cursor.dataset.label = target?.dataset.cursorLabel ?? "";
      }

      if (!isDesktopFine) return;
      const magnetic = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        ".btn, .header-cta, [data-magnetic]"
      );
      if (magnetic) {
        const box = magnetic.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) * 0.16;
        const dy = (event.clientY - (box.top + box.height / 2)) * 0.16;
        const clampedX = Math.max(-8, Math.min(8, dx));
        const clampedY = Math.max(-8, Math.min(8, dy));
        magnetic.style.setProperty("--mag-x", `${clampedX.toFixed(2)}px`);
        magnetic.style.setProperty("--mag-y", `${clampedY.toFixed(2)}px`);
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        ".btn, .header-cta, [data-magnetic]"
      );
      if (!el) return;
      const related = event.relatedTarget as Node | null;
      if (related && el.contains(related)) return;
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
    };

    const settleTimer = window.setTimeout(recomputeMaxScroll, 400);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", recomputeMaxScroll);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);
    recomputeMaxScroll();

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", recomputeMaxScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [reducedMotion]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true" />
    </>
  );
}
