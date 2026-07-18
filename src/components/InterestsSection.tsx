"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { interests, sectionTitles, type InterestItem } from "@/content/site";

// Shared glass-card language (kept identical across Experience / Projects / Interests)
const GLASS_CARD =
  "border border-[var(--hairline)] bg-[var(--surface)] backdrop-blur-[6px] " +
  "transition-[border-color,background-color,box-shadow] duration-300 " +
  "hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-hover)] " +
  "hover:shadow-[0_0_0_1px_var(--accent-soft),0_8px_40px_rgba(0,0,0,0.5)]";

const HOVER_SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;
const REVEAL_SPRING = { type: "spring", stiffness: 260, damping: 28 } as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staticVariants: Variants = { hidden: {}, visible: {} };

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// 20px monochrome icons (SVG or text glyph) for every icon key in the content type.
const ICONS: Record<InterestItem["icon"], ReactNode> = {
  chess: (
    <span aria-hidden="true" className="text-xl leading-none">
      ♞
    </span>
  ),
  poker: (
    <span aria-hidden="true" className="text-xl leading-none">
      ♠
    </span>
  ),
  mma: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 10V8a5 5 0 0 1 10 0v4a5 5 0 0 1-5 5h-1a4 4 0 0 1-4-4v-1z" />
      <path d="M7 10h3a2 2 0 0 1 0 4H8" />
      <path d="M9 17v3h6v-3" />
    </svg>
  ),
  book: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 6.5C10.4 5 8.2 4.5 5.5 4.5H4v13h1.5c2.7 0 4.9.5 6.5 2 1.6-1.5 3.8-2 6.5-2H20v-13h-1.5c-2.7 0-4.9.5-6.5 2z" />
      <path d="M12 6.5v13" />
    </svg>
  ),
  math: (
    <span aria-hidden="true" className="text-lg leading-none">
      ∑
    </span>
  ),
  music: (
    <span aria-hidden="true" className="text-xl leading-none">
      ♪
    </span>
  ),
};

function InterestTile({
  item,
  reduce,
  variants,
}: {
  item: InterestItem;
  reduce: boolean;
  variants: Variants;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      variants={variants}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      transition={HOVER_SPRING}
      className={`${GLASS_CARD} cursor-pointer rounded-2xl px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      <span className="flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[color:var(--muted-strong)]">
          {ICONS[item.icon]}
        </span>
        <span className="text-sm font-medium">{item.name}</span>
      </span>

      <motion.span
        aria-hidden={!open}
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.96,
        }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                height: REVEAL_SPRING,
                scale: REVEAL_SPRING,
                opacity: { duration: 0.2, ease: "easeOut" },
              }
        }
        className="block origin-top-left overflow-hidden"
      >
        <span className="block max-w-[16rem] pt-3 text-xs leading-relaxed text-[color:var(--muted)]">
          {item.note}
        </span>
      </motion.span>
    </motion.button>
  );
}

export default function InterestsSection() {
  const reduce = useReducedMotion() ?? false;
  const fadeUp = reduce ? staticVariants : fadeUpVariants;

  return (
    <section id="interests" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="mb-12 text-3xl font-medium sm:text-4xl lg:text-5xl"
        >
          {sectionTitles.interests}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="flex flex-wrap items-start gap-4"
        >
          {interests.map((item) => (
            <InterestTile
              key={item.name}
              item={item}
              reduce={reduce}
              variants={fadeUp}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
