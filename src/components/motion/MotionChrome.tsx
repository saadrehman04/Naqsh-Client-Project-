"use client";

import { useEffect } from "react";
import { useMotion } from "./MotionProvider";

export function MotionChrome() {
  const { lenis, reducedMotion } = useMotion();

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    let pointerX = -1;
    let pointerY = -1;

    const refreshCursorTarget = () => {
      if (!cursor || pointerX < 0 || reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
      const underPointer = document.elementFromPoint(pointerX, pointerY);
      const target =
        underPointer instanceof HTMLElement
          ? underPointer.closest<HTMLElement>("[data-cursor-label]")
          : null;
      cursor.classList.toggle("is-over", !!target);
      cursor.dataset.label = target?.dataset.cursorLabel ?? "";
    };

    const updateProgress = () => {
      if (progress) {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const ratio = Math.max(0, Math.min(1, window.scrollY / max));
        progress.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }
      refreshCursorTarget();
    };

    const canMagnetic = () =>
      !reducedMotion &&
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-cursor-label]"
        );
        cursor.classList.toggle("is-over", !!target);
        cursor.dataset.label = target?.dataset.cursorLabel ?? "";
      }

      if (!canMagnetic()) return;
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

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);
    if (lenis) {
      lenis.on("scroll", updateProgress);
    }
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      if (lenis) {
        lenis.off("scroll", updateProgress);
      }
    };
  }, [lenis, reducedMotion]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true" />
    </>
  );
}
