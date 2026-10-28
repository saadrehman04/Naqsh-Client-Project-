"use client";

import { useSyncExternalStore } from "react";

export type SceneId = "vision" | "approach" | "cta" | "portfolio" | string;

export interface SceneProgressState {
  vision: number;
  approach: number;
  cta: number;
  portfolio: number;
  [key: string]: number;
}

/**
 * Shared mutable progress store written by GSAP ScrollTrigger `onUpdate` callbacks
 * and read directly inside R3F `useFrame` loops without triggering React re-renders.
 */
export const sceneProgress: SceneProgressState = {
  vision: 0,
  approach: 0,
  cta: 0,
  portfolio: 0,
};

type Listener = (state: SceneProgressState) => void;
const listeners = new Set<Listener>();

export function setSceneProgress(
  scene: SceneId,
  value: number,
  element?: HTMLElement | null
) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  if (Math.abs((sceneProgress[scene] ?? -1) - clamped) < 0.0005) return;
  sceneProgress[scene] = clamped;
  if (element) {
    element.style.setProperty("--scene-progress", clamped.toFixed(4));
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(
      `--scene-progress-${scene}`,
      clamped.toFixed(4)
    );
  }
  if (listeners.size > 0) {
    listeners.forEach((listener) => listener(sceneProgress));
  }
}

export function getSceneProgress(scene: SceneId): number {
  return sceneProgress[scene] ?? 0;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function subscribeStore(listener: () => void): () => void {
  return subscribe(() => listener());
}

export function useSceneProgress(scene: SceneId): number {
  return useSyncExternalStore(
    subscribeStore,
    () => sceneProgress[scene] ?? 0,
    () => 0
  );
}
