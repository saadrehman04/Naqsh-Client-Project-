"use client";

import { useSyncExternalStore } from "react";

export type SceneId = "vision" | "approach" | "portfolio" | string;

type SceneProgressMap = Record<SceneId, number>;

const progressState: SceneProgressMap = {
  vision: 0,
  approach: 0,
  portfolio: 0,
};

const listeners = new Set<() => void>();

export function setSceneProgress(scene: SceneId, value: number, element?: HTMLElement | null) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  const formatted = clamped.toFixed(4);
  if (element) {
    element.style.setProperty("--scene-progress", formatted);
  }
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(`--scene-progress-${scene}`, formatted);
  }
  if (Math.abs((progressState[scene] ?? 0) - clamped) < 0.0001) return;
  progressState[scene] = clamped;
  listeners.forEach((listener) => listener());
}

export function getSceneProgress(scene: SceneId): number {
  return progressState[scene] ?? 0;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSceneProgress(scene: SceneId): number {
  return useSyncExternalStore(
    subscribe,
    () => progressState[scene] ?? 0,
    () => 0
  );
}
