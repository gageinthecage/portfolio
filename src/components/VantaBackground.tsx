"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type VantaEffect = {
  destroy: () => void;
};

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    let effect: VantaEffect | null = null;
    let cancelled = false;

    (async () => {
      try {
        const THREE = await import("three");
        const WAVES = (await import("vanta/dist/vanta.waves.min")).default;
        if (cancelled) return;
        effect = WAVES({
          el,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: 0x08090c,
          shininess: 30,
          waveHeight: 14,
          waveSpeed: 0.25,
          zoom: 0.75,
        }) as VantaEffect;
      } catch {
        // Vanta failed to load/init — the body background covers it.
        effect = null;
      }
    })();

    return () => {
      cancelled = true;
      try {
        effect?.destroy();
      } catch {
        // ignore teardown errors
      }
      effect = null;
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <div ref={containerRef} className="fixed inset-0 z-0" aria-hidden="true" />;
}
