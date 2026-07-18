"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";

type PreloaderProps = {
  onComplete: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [caption, setCaption] = useState("");
  const prefersReducedMotion = useReducedMotion();

  // Keep the latest callback without re-triggering the animation effect.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Pick the random caption on the client only, to avoid hydration mismatch.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const messages = site.loadingMessages;
      setCaption(messages[Math.floor(Math.random() * messages.length)]);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (prefersReducedMotion) {
      // Fast path: jump quickly (~300ms) to 100 and complete.
      const start = performance.now();
      const duration = 300;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setCount(Math.round(t * 100));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          onCompleteRef.current();
        }
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    const phaseOneDuration = 2200; // 0 -> 97, exponential ease-out
    const phaseTwoDuration = 400; // 97 -> 100, linear
    const start = performance.now();

    const runPhaseTwo = (phaseTwoStart: number) => {
      const tick = (now: number) => {
        const t = Math.min((now - phaseTwoStart) / phaseTwoDuration, 1);
        setCount(Math.round(97 + t * 3));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          timeout = setTimeout(() => onCompleteRef.current(), 200);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / phaseOneDuration, 1);
      const eased = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCount(Math.round(eased * 97));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        runPhaseTwo(now);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (timeout !== undefined) clearTimeout(timeout);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={count}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-2 bg-[var(--background)]"
    >
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="font-display text-6xl sm:text-7xl font-bold tabular-nums"
      >
        {count}%
      </motion.div>
      <p className="text-sm text-muted min-h-[1.25rem]">{caption}</p>
    </div>
  );
}
