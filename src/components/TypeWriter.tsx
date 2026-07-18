"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type TypeWriterProps = {
  lines: string[];
  className?: string;
};

const TYPE_MS = 55; // base per-character typing speed
const TYPE_JITTER_MS = 40; // +/- 20ms random jitter
const DELETE_MS = 28;
const PAUSE_MS = 2000; // hold the full line before deleting
const NEXT_LINE_DELAY_MS = 350; // brief beat before typing the next line

export default function TypeWriter({ lines, className }: TypeWriterProps) {
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || lines.length === 0) return;

    const line = lines[lineIndex % lines.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charCount < line.length) {
        const jitter = Math.random() * TYPE_JITTER_MS - TYPE_JITTER_MS / 2;
        timeout = setTimeout(() => setCharCount((c) => c + 1), TYPE_MS + jitter);
      } else {
        timeout = setTimeout(() => setDeleting(true), PAUSE_MS);
      }
    } else if (charCount > 0) {
      timeout = setTimeout(() => setCharCount((c) => c - 1), DELETE_MS);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setLineIndex((i) => (i + 1) % lines.length);
      }, NEXT_LINE_DELAY_MS);
    }

    return () => clearTimeout(timeout);
  }, [charCount, deleting, lineIndex, lines, reducedMotion]);

  // Reduced motion: static first line, no cursor loop.
  if (reducedMotion) {
    return <span className={className}>{lines[0] ?? ""}</span>;
  }

  const currentLine = lines.length > 0 ? lines[lineIndex % lines.length] : "";
  const visibleText = currentLine.slice(0, charCount);

  return (
    <span className={className}>
      {/* Screen readers get the full line once, not per-character churn */}
      <span className="sr-only">{currentLine}</span>
      <span aria-hidden="true">
        {visibleText}
        <motion.span
          className="select-none"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          █
        </motion.span>
      </span>
    </span>
  );
}
