"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  useCan3D,
  useSceneViewportLifecycle,
  useWindowPointerTilt,
} from "@/lib/useCan3D";

const GiftBoxSceneCanvas = dynamic(() => import("./GiftBoxSceneCanvas"), {
  ssr: false,
});

export function GiftBoxScene({ className = "" }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const can3D = useCan3D(320);
  const { shouldMount, isVisible } = useSceneViewportLifecycle(
    wrapperRef,
    can3D
  );
  const [hasDrawnFirstFrame, setHasDrawnFirstFrame] = useState(false);

  useWindowPointerTilt();

  useEffect(() => {
    if (can3D) {
      import("./GiftBoxSceneCanvas");
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
      className={`gift-box-scene-host scene-host ${className}`}
      data-scene="box"
      data-3d-ready={hasDrawnFirstFrame ? "true" : "false"}
      aria-hidden="true"
      tabIndex={-1}
    >
      {/* 2D Fallback: layered isometric SVG illustration of the Naqsh gift box & contents */}
      <div
        className={`scene-fallback gift-box-fallback ${
          hasDrawnFirstFrame ? "is-faded" : ""
        }`}
      >
        <svg
          viewBox="0 0 420 380"
          className="gift-box-fallback-svg"
          aria-hidden="true"
        >
          {/* Soft ground contact shadow */}
          <ellipse
            cx="210"
            cy="322"
            rx="145"
            ry="24"
            fill="#000000"
            fillOpacity="0.16"
          />

          {/* Elevated Lid (Ivory-deep #EFE5DA with Sage #789675 ribbon) */}
          <g className="gift-box-fallback-lid">
            <path
              d="M92,98 L210,56 L328,98 L210,140 Z"
              fill="#EFE5DA"
              stroke="#C0A48E"
              strokeWidth="1.5"
            />
            <path
              d="M92,98 L210,140 L210,162 L92,120 Z"
              fill="#E5D8C8"
              stroke="#C0A48E"
              strokeWidth="1.2"
            />
            <path
              d="M328,98 L210,140 L210,162 L328,120 Z"
              fill="#D9C8B4"
              stroke="#C0A48E"
              strokeWidth="1.2"
            />
            {/* Crossing Sage ribbons on lid */}
            <path d="M144,79 L262,121 L276,116 L158,74 Z" fill="#789675" />
            <path d="M262,74 L144,116 L158,121 L276,79 Z" fill="#789675" />
            <rect
              x="203"
              y="91"
              width="14"
              height="14"
              transform="rotate(45 210 98)"
              fill="#AB6C49"
            />
          </g>

          {/* Curated Stand-In Contents Rising from the Box */}
          <g className="gift-box-fallback-items">
            {/* Terracotta Notebook */}
            <rect
              x="128"
              y="156"
              width="66"
              height="48"
              rx="4"
              transform="rotate(-8 161 180)"
              fill="#B64F3E"
              stroke="#7F3021"
              strokeWidth="1.5"
            />
            {/* Pine Pouch */}
            <rect
              x="156"
              y="178"
              width="58"
              height="36"
              rx="8"
              fill="#145240"
              stroke="#789675"
              strokeWidth="1.2"
            />
            {/* Copper Tumbler with Khaki Ring */}
            <rect
              x="236"
              y="142"
              width="34"
              height="68"
              rx="6"
              transform="rotate(7 253 176)"
              fill="#AB6C49"
            />
            <rect
              x="235"
              y="164"
              width="36"
              height="16"
              rx="2"
              transform="rotate(7 253 176)"
              fill="#C0A48E"
            />
            {/* Ivory Card with Terracotta Wax Seal */}
            <rect
              x="182"
              y="146"
              width="58"
              height="40"
              rx="3"
              fill="#F7F1E7"
              stroke="#C0A48E"
              strokeWidth="1.5"
            />
            <circle cx="222" cy="170" r="8" fill="#B64F3E" />
            <circle cx="222" cy="170" r="3" fill="#F7F1E7" />
          </g>

          {/* Matte Black Box Body with Chestnut #7F3021 Inner Liner */}
          <g className="gift-box-fallback-body">
            {/* Chestnut inner liner */}
            <path
              d="M98,214 L210,174 L322,214 L210,254 Z"
              fill="#7F3021"
              stroke="#AB6C49"
              strokeWidth="1.5"
            />
            {/* Left front wall (Black) */}
            <path d="M94,214 L210,256 L210,320 L94,278 Z" fill="#141413" />
            {/* Right front wall (Black) */}
            <path d="M326,214 L210,256 L210,320 L326,278 Z" fill="#000000" />
            {/* Sage ribbon on body sides */}
            <path d="M144,232 L160,238 L160,302 L144,296 Z" fill="#789675" />
            <path d="M260,238 L276,232 L276,296 L260,302 Z" fill="#688465" />
          </g>
        </svg>
      </div>

      {/* Real-time 3D Canvas on >=1024px viewports */}
      {shouldMount && (
        <div
          className={`scene-canvas-layer ${
            hasDrawnFirstFrame ? "is-visible" : ""
          }`}
        >
          <GiftBoxSceneCanvas
            isVisible={isVisible}
            onFirstFrame={() => setHasDrawnFirstFrame(true)}
          />
        </div>
      )}
    </div>
  );
}
