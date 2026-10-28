"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  useCan3D,
  useSceneViewportLifecycle,
  useWindowPointerTilt,
} from "@/lib/useCan3D";

const WaxSealSceneCanvas = dynamic(() => import("./WaxSealSceneCanvas"), {
  ssr: false,
});

export interface WaxSeal3DProps {
  trigger?: boolean | number;
  size?: number;
  className?: string;
}

export function WaxSeal3D({
  trigger,
  size = 210,
  className = "",
}: WaxSeal3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const can3D = useCan3D(768);
  const { shouldMount, isVisible } = useSceneViewportLifecycle(
    wrapperRef,
    can3D
  );
  const [hasDrawnFirstFrame, setHasDrawnFirstFrame] = useState(false);
  const [enteredOnce, setEnteredOnce] = useState(false);

  useWindowPointerTilt();

  useEffect(() => {
    if (!shouldMount) {
      setHasDrawnFirstFrame(false);
    }
  }, [shouldMount]);

  useEffect(() => {
    if (trigger !== undefined) {
      setEnteredOnce(Boolean(trigger));
      return;
    }
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setEnteredOnce(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEnteredOnce(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  const effectiveTrigger = trigger !== undefined ? trigger : enteredOnce;

  return (
    <div
      ref={wrapperRef}
      className={`wax-seal-3d-host scene-host ${
        effectiveTrigger ? "is-stamped" : ""
      } ${className}`}
      style={{ width: size, height: size, aspectRatio: "1 / 1" }}
      data-scene="seal"
      data-wax-seal
      data-3d-ready={hasDrawnFirstFrame ? "true" : "false"}
      aria-hidden="true"
      tabIndex={-1}
    >
      {/* 2D Fallback: SVG wax seal disc with visible Ivory Emblem and CSS stamp animation */}
      <div
        className={`scene-fallback wax-seal-fallback ${
          effectiveTrigger ? "is-stamped" : ""
        } ${hasDrawnFirstFrame ? "is-faded" : ""}`}
      >
        {shouldMount && (
          <img
            src="/3d/seal.webp"
            alt=""
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            className="scene-poster-img"
          />
        )}
        <svg
          viewBox="0 0 200 200"
          className="wax-seal-fallback-disc"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="naqsh-wax-grad" cx="36%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#C86350" />
              <stop offset="58%" stopColor="#B64F3E" />
              <stop offset="100%" stopColor="#7F3021" />
            </radialGradient>
            <radialGradient id="naqsh-wax-well" cx="55%" cy="58%" r="55%">
              <stop offset="0%" stopColor="#9E3E2E" />
              <stop offset="100%" stopColor="#7F3021" />
            </radialGradient>
          </defs>
          {/* Organic perturbed wax outer silhouette */}
          <path
            d="M100,8 C124,7 148,16 166,33 C184,50 193,74 192,100 C191,126 181,150 163,167 C145,184 123,193 99,192 C74,191 50,182 33,164 C16,146 7,124 8,99 C9,74 18,50 36,33 C54,16 76,9 100,8 Z"
            fill="url(#naqsh-wax-grad)"
            stroke="#7F3021"
            strokeWidth="2.5"
          />
          {/* Raised inner rim */}
          <circle
            cx="100"
            cy="100"
            r="74"
            fill="url(#naqsh-wax-well)"
            stroke="#AB6C49"
            strokeWidth="3.5"
            strokeOpacity="0.65"
          />
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="none"
            stroke="#F7F1E7"
            strokeWidth="1"
            strokeOpacity="0.22"
          />
        </svg>
        <img
          src="/brand/emblem-ivory.svg"
          alt=""
          width={68}
          height={126}
          decoding="async"
          className="wax-seal-fallback-emblem"
        />
      </div>

      {/* Real-time 3D Canvas on >=768px viewports */}
      {shouldMount && (
        <div
          className={`scene-canvas-layer ${
            hasDrawnFirstFrame ? "is-visible" : ""
          }`}
        >
          <WaxSealSceneCanvas
            trigger={effectiveTrigger}
            isVisible={isVisible}
            onFirstFrame={() => setHasDrawnFirstFrame(true)}
          />
        </div>
      )}
    </div>
  );
}
