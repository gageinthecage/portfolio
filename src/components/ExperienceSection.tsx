"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { experience, sectionTitles, type ExperienceItem } from "@/content/site";

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

/** True on devices without hover (touch) — details default open there. */
function useTouchDevice() {
  // Lazy init: this component only renders client-side (after the preloader),
  // so first paint already knows whether hover exists — no open/close flash.
  const [touch, setTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setTouch(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return touch;
}

function ExperienceCard({
  item,
  touch,
  reduce,
  variants,
}: {
  item: ExperienceItem;
  touch: boolean;
  reduce: boolean;
  variants: Variants;
}) {
  const [hovered, setHovered] = useState(false);
  const open = touch || hovered;

  return (
    <motion.article
      variants={variants}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      transition={HOVER_SPRING}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`${GLASS_CARD} h-full cursor-default rounded-xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:p-8`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`h-14 w-14 shrink-0 rounded-lg p-2 sm:h-16 sm:w-16 ${
            item.logoLight ? "bg-white/90" : "bg-white/[0.06]"
          }`}
        >
          <Image
            src={item.logo}
            alt={`${item.company} logo`}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-medium">{item.title}</h3>
          <p className="text-sm text-[color:var(--muted)]">{item.company}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-[color:var(--muted-strong)]">
        {item.blurb}
      </p>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { height: REVEAL_SPRING, opacity: { duration: 0.25, ease: "easeOut" } }
        }
        className="overflow-hidden"
      >
        <div className="pt-4">
          <p className="text-xs uppercase tracking-wider text-[color:var(--muted)]">
            {item.period} · {item.location}
          </p>
          <ul className="mt-3 space-y-2">
            {item.details.map((detail) => (
              <li
                key={detail}
                className="flex gap-2 text-sm leading-relaxed text-[color:var(--muted-strong)]"
              >
                <span
                  aria-hidden="true"
                  className="select-none text-[color:var(--accent-soft)]"
                >
                  —
                </span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ExperienceSection() {
  const reduce = useReducedMotion() ?? false;
  const touch = useTouchDevice();
  const fadeUp = reduce ? staticVariants : fadeUpVariants;

  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="mb-12 text-3xl font-medium sm:text-4xl lg:text-5xl"
        >
          {sectionTitles.experience}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {experience.map((item) => (
            <ExperienceCard
              key={`${item.title}-${item.company}`}
              item={item}
              touch={touch}
              reduce={reduce}
              variants={fadeUp}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
