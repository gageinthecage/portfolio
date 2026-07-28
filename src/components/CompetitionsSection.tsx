"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { competitions, sectionTitles, type CompetitionItem } from "@/content/site";

// Shared glass-card language (kept identical across Experience / Projects / Interests)
const GLASS_CARD =
  "border border-[var(--hairline)] bg-[var(--surface)] backdrop-blur-[6px] " +
  "transition-[border-color,background-color,box-shadow] duration-300 " +
  "hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-hover)] " +
  "hover:shadow-[0_0_0_1px_var(--accent-soft),0_8px_40px_rgba(0,0,0,0.5)]";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staticVariants: Variants = { hidden: {}, visible: {} };

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function CompetitionCard({
  item,
  reduce,
  variants,
}: {
  item: CompetitionItem;
  reduce: boolean;
  variants: Variants;
}) {
  return (
    <motion.article
      variants={variants}
      className={`${GLASS_CARD} rounded-xl p-6 sm:p-8`}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            {/* Subdued target glyph, matching the site's quiet-glyph language */}
            <svg
              viewBox="0 0 40 40"
              className="h-9 w-9 shrink-0"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="var(--foreground)"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
              <circle
                cx="20"
                cy="20"
                r="9.5"
                stroke="var(--foreground)"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
              <circle cx="20" cy="20" r="3.5" fill="var(--accent)" opacity="0.8" />
            </svg>
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-[color:var(--muted)]">
                {item.host} · {item.year}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--muted-strong)]">
            {item.blurb}
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <div className="font-display text-3xl font-medium text-[color:var(--foreground)]">
            {item.rank}
          </div>
          <div className="mt-1 text-sm text-[color:var(--muted)]">{item.field}</div>
          <span className="mt-3 inline-block rounded-full border border-[var(--hairline-strong)] bg-white/[0.06] px-3 py-1 text-xs font-medium text-[color:var(--accent)]">
            {item.percentile}
          </span>
        </div>
      </div>

      {/* Field-position bar: whole field on the left, first place on the right */}
      <div className="mt-6">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)] opacity-70"
            style={{ width: `${item.fieldPosition * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-[color:var(--muted)]">
          <span>Field</span>
          <span>1st</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function CompetitionsSection() {
  const reduce = useReducedMotion() ?? false;
  const fadeUp = reduce ? staticVariants : fadeUpVariants;

  return (
    <section id="competitions" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="font-display mb-12 text-3xl font-medium sm:text-4xl lg:text-5xl"
        >
          {sectionTitles.competitions}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="grid grid-cols-1 gap-6"
        >
          {competitions.map((item) => (
            <CompetitionCard
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
