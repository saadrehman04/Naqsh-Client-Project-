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
    const canHoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let activeTiltCard: HTMLElement | null = null;

    const resetTiltCard = (card: HTMLElement | null) => {
      if (!card) return;
      card.style.setProperty("--tilt-rx", "0deg");
      card.style.setProperty("--tilt-ry", "0deg");
      card.style.setProperty("--glare-opacity", "0");
      card.classList.remove("is-tilting");
    };
    let pointerX = -1;
    let pointerY = -1;
    let hasPointer = false;
    let isScrolling = false;
    let scrollIdleTimer = 0;
    let rafId = 0;

    const refreshCursorTarget = () => {
      rafId = 0;
      if (!cursor || !hasPointer || reducedMotion || isCoarse) return;
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      const underPointer = document.elementFromPoint(pointerX, pointerY);
      const target =
        underPointer instanceof HTMLElement
          ? underPointer.closest<HTMLElement>("[data-cursor-label]")
          : null;
      const interactiveControl =
        underPointer instanceof HTMLElement
          ? underPointer.closest<HTMLElement>("button:not([data-cursor-label]), input, select, textarea, .site-header")
          : null;
      const showExplore = Boolean(target) || (isScrolling && !interactiveControl);
      cursor.classList.toggle("is-over", showExplore);
      cursor.dataset.label = target?.dataset.cursorLabel || (showExplore ? "Explore" : "");
    };

    const scheduleCursorRefresh = () => {
      if (reducedMotion || isCoarse || !hasPointer || rafId) return;
      rafId = window.requestAnimationFrame(refreshCursorTarget);
    };

    const recomputeMaxScroll = () => {
      cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      updateProgress();
    };

    const updateProgress = () => {
      if (progress) {
        const ratio = Math.max(0, Math.min(1, window.scrollY / cachedMaxScroll));
        progress.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }
      if (!reducedMotion && !isCoarse && hasPointer) {
        isScrolling = true;
        window.clearTimeout(scrollIdleTimer);
        scrollIdleTimer = window.setTimeout(() => {
          isScrolling = false;
          scheduleCursorRefresh();
        }, 280);
        scheduleCursorRefresh();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (reducedMotion || isCoarse) return;
      if (event.clientX > 0 || event.clientY > 0) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        hasPointer = true;
      }
      isScrolling = true;
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        isScrolling = false;
        scheduleCursorRefresh();
      }, 280);
      scheduleCursorRefresh();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion || isCoarse) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      hasPointer = true;

      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-cursor-label]"
        );
        const interactiveControl = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          "button:not([data-cursor-label]), input, select, textarea, .site-header"
        );
        const showExplore = Boolean(target) || (isScrolling && !interactiveControl);
        cursor.classList.toggle("is-over", showExplore);
        cursor.dataset.label = target?.dataset.cursorLabel || (showExplore ? "Explore" : "");
      }

      if (canHoverFine) {
        const tiltCard = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          ".collection-gallery-item, .product-tile"
        );
        if (activeTiltCard && activeTiltCard !== tiltCard) {
          resetTiltCard(activeTiltCard);
          activeTiltCard = null;
        }
        if (tiltCard) {
          activeTiltCard = tiltCard;
          const rect = tiltCard.getBoundingClientRect();
          const nx = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)));
          const ny = Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)));
          const rotY = Math.max(-6, Math.min(6, (nx - 0.5) * 12));
          const rotX = Math.max(-6, Math.min(6, -(ny - 0.5) * 12));
          tiltCard.style.setProperty("--tilt-rx", `${rotX.toFixed(2)}deg`);
          tiltCard.style.setProperty("--tilt-ry", `${rotY.toFixed(2)}deg`);
          tiltCard.style.setProperty("--glare-x", `${(nx * 100).toFixed(1)}%`);
          tiltCard.style.setProperty("--glare-y", `${(ny * 100).toFixed(1)}%`);
          tiltCard.style.setProperty("--glare-opacity", "1");
          tiltCard.classList.add("is-tilting");
        }
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
      const tiltEl = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        ".collection-gallery-item, .product-tile"
      );
      if (tiltEl) {
        const related = event.relatedTarget as Node | null;
        if (!related || !tiltEl.contains(related)) {
          resetTiltCard(tiltEl);
          if (activeTiltCard === tiltEl) activeTiltCard = null;
        }
      }

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
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", recomputeMaxScroll);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);
    if (lenis) {
      lenis.on("scroll", updateProgress);
    }
    recomputeMaxScroll();

    return () => {
      window.clearTimeout(settleTimer);
      window.clearTimeout(scrollIdleTimer);
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", recomputeMaxScroll);
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
