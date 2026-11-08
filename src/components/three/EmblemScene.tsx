"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  useCan3D,
  useSceneViewportLifecycle,
  useWindowPointerTilt,
} from "@/lib/useCan3D";

const EmblemSceneCanvas = dynamic(() => import("./EmblemSceneCanvas"), {
  ssr: false,
});

export function EmblemScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const can3D = useCan3D(1024);
  const { shouldMount, isVisible } = useSceneViewportLifecycle(
    wrapperRef,
    can3D
  );
  const [hasDrawnFirstFrame, setHasDrawnFirstFrame] = useState(false);

  useWindowPointerTilt();

  useEffect(() => {
    if (can3D) {
      import("./EmblemSceneCanvas");
    }
  }, [can3D]);

  useEffect(() => {
    if (!shouldMount) {
      setHasDrawnFirstFrame(false);
    }
  }, [shouldMount]);

  return (
    <div
      ref={wrapperRef}
      className="emblem-scene-host scene-host"
      data-scene="emblem"
      data-3d-ready={hasDrawnFirstFrame ? "true" : "false"}
      aria-hidden="true"
      tabIndex={-1}
    >
      {/* 2D Fallback: renders first, fades out smoothly once WebGL draws its first frame */}
      <div
        className={`scene-fallback emblem-fallback ${
          hasDrawnFirstFrame ? "is-faded" : ""
        }`}
      >
        <picture className="scene-poster-picture">
          {shouldMount && (
            <img
              src="/3d/emblem.webp"
              alt=""
              width={340}
              height={425}
              loading="lazy"
              decoding="async"
              className="scene-poster-img"
            />
          )}
          <img
            src="/brand/emblem-copper.svg"
            alt=""
            width={340}
            height={635}
            decoding="async"
            className="emblem-fallback-svg"
          />
        </picture>
        <span className="emblem-fallback-diamond emblem-fallback-diamond--1" />
        <span className="emblem-fallback-diamond emblem-fallback-diamond--2" />
        <span className="emblem-fallback-diamond emblem-fallback-diamond--3" />
        <span className="emblem-fallback-diamond emblem-fallback-diamond--4" />
      </div>

      {/* Real-time 3D Canvas: mounted within 600px on >=1024px viewports */}
      {shouldMount && (
        <div
          className={`scene-canvas-layer ${
            hasDrawnFirstFrame ? "is-visible" : ""
          }`}
        >
          <EmblemSceneCanvas
            isVisible={isVisible}
            onFirstFrame={() => setHasDrawnFirstFrame(true)}
          />
        </div>
      )}
    </div>
  );
}
