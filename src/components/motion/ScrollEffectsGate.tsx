"use client";

import { useEffect, useState, type ComponentType } from "react";

type Effects = typeof import("./ScrollEffects").ScrollEffects;

export function ScrollEffectsGate() {
  const [EffectsComponent, setEffectsComponent] = useState<ComponentType | null>(null);
  useEffect(() => {
    if (matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) {
      let mounted = true;
      void import("./ScrollEffects").then((module) => { if (mounted) setEffectsComponent(() => module.ScrollEffects as Effects); });
      return () => { mounted = false; };
    }
  }, []);
  return EffectsComponent ? <EffectsComponent /> : null;
}
