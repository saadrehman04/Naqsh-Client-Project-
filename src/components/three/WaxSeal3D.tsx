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
      {/* 2D Fallback: SVG wax seal disc with visible Gold-Copper Emblem and CSS stamp animation */}
      <div
        className={`scene-fallback wax-seal-fallback ${
          effectiveTrigger ? "is-stamped" : ""
        } ${hasDrawnFirstFrame ? "is-faded" : ""}`}
      >
        <svg
          viewBox="0 0 200 200"
          className="wax-seal-fallback-disc"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="naqsh-wax-grad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#9E3A2B" />
              <stop offset="55%" stopColor="#7A2619" />
              <stop offset="100%" stopColor="#4E140C" />
            </radialGradient>
            <radialGradient id="naqsh-wax-well" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#5E1B11" />
              <stop offset="100%" stopColor="#3D0E07" />
            </radialGradient>
            <linearGradient id="naqsh-gold-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0C792" />
              <stop offset="50%" stopColor="#C88D58" />
              <stop offset="100%" stopColor="#9A6234" />
            </linearGradient>
          </defs>
          {/* Balanced organic circular wax outer silhouette */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="url(#naqsh-wax-grad)"
            stroke="#5A180E"
            strokeWidth="2"
          />
          {/* Raised outer wax cushion ring */}
          <circle
            cx="100"
            cy="100"
            r="79"
            fill="none"
            stroke="#9E3A2B"
            strokeWidth="5"
            strokeOpacity="0.55"
          />
          {/* Recessed inner stamp well */}
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="url(#naqsh-wax-well)"
            stroke="url(#naqsh-gold-rim)"
            strokeWidth="2.5"
          />
          <circle
            cx="100"
            cy="100"
            r="62"
            fill="none"
            stroke="url(#naqsh-gold-rim)"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
        </svg>
        <img
          src="/brand/emblem-copper.svg"
          alt=""
          width={64}
          height={118}
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
