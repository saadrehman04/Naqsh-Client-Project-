"use client";

import { useEffect, useState } from "react";
import { ScrollEffects } from "./ScrollEffects";

export function ScrollEffectsGate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMounted(true);
    }, 16);
    return () => window.clearTimeout(id);
  }, []);

  return mounted ? <ScrollEffects /> : null;
}
