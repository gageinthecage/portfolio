"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { projects, sectionTitles, type ProjectItem } from "@/content/site";

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

// Muted duotone gradient + quiet glyph per art key — each distinct but subdued.
const ART: Record<ProjectItem["art"], { gradient: string; glyph: ReactNode }> = {
  ml: {
    gradient: "bg-gradient-to-br from-[#0c2434] to-[#061219]",
    glyph: (
      <svg viewBox="0 0 96 64" className="h-24 w-36" aria-hidden="true">
        <g
          stroke="var(--foreground)"
          strokeWidth="1.5"
          opacity="0.2"
          fill="none"
        >
          <path d="M18 12 L48 22 M18 32 L48 22 M18 52 L48 22 M18 12 L48 42 M18 32 L48 42 M18 52 L48 42 M48 22 L78 32 M48 42 L78 32" />
        </g>
        <g fill="var(--foreground)" opacity="0.2">
          <circle cx="18" cy="12" r="4" />
          <circle cx="18" cy="32" r="4" />
          <circle cx="18" cy="52" r="4" />
          <circle cx="48" cy="22" r="4" />
          <circle cx="48" cy="42" r="4" />
        </g>
        <circle cx="78" cy="32" r="4.5" fill="var(--accent)" opacity="0.6" />
      </svg>
    ),
  },
  web: {
    gradient: "bg-gradient-to-br from-[#0a2e26] to-[#051510]",
    glyph: (
      <svg
        viewBox="0 0 96 64"
        className="h-24 w-36"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g stroke="var(--foreground)" strokeWidth="4" opacity="0.2">
          <path d="M34 16 L14 32 L34 48" />
          <path d="M62 16 L82 32 L62 48" />
        </g>
        <path
          d="M53 14 L43 50"
          stroke="var(--accent)"
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>
    ),
  },
  math: {
    gradient: "bg-gradient-to-br from-[#12291a] to-[#08130c]",
    glyph: (
      <div className="relative" aria-hidden="true">
        <span className="block text-6xl font-light leading-none text-[color:var(--foreground)] opacity-20">
          ∮
        </span>
        <span className="absolute -right-3 top-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-60" />
      </div>
    ),
  },
  game: {
    gradient: "bg-gradient-to-br from-[#20261a] to-[#0f130a]",
    glyph: (
      <div className="relative" aria-hidden="true">
        <span className="block text-6xl leading-none text-[color:var(--foreground)] opacity-20">
          ♞
        </span>
        <span className="absolute -bottom-2 left-1/2 h-px w-10 -translate-x-1/2 bg-[var(--accent)] opacity-60" />
      </div>
    ),
  },
  data: {
    gradient: "bg-gradient-to-br from-[#0c2924] to-[#071412]",
    glyph: (
      <svg viewBox="0 0 96 64" className="h-24 w-36" aria-hidden="true">
        <g fill="var(--foreground)" opacity="0.2">
          <rect x="18" y="34" width="10" height="20" rx="2" />
          <rect x="34" y="24" width="10" height="30" rx="2" />
          <rect x="50" y="14" width="10" height="40" rx="2" />
        </g>
        <rect
          x="66"
          y="28"
          width="10"
          height="26"
          rx="2"
          fill="var(--accent)"
          opacity="0.6"
        />
      </svg>
    ),
  },
};

function ProjectCard({
  item,
  touch,
  reduce,
  variants,
}: {
  item: ProjectItem;
  touch: boolean;
  reduce: boolean;
  variants: Variants;
}) {
  const [hovered, setHovered] = useState(false);
  const open = touch || hovered;
  const art = ART[item.art];

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
      className={`${GLASS_CARD} flex h-full cursor-default flex-col overflow-hidden rounded-xl p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      {item.image ? (
        <div className="relative h-36 shrink-0">
          <Image
            src={item.image}
            alt={`${item.title} graphic`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={item.image.endsWith(".svg")}
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={`flex h-36 shrink-0 items-center justify-center ${art.gradient}`}
        >
          {art.glyph}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium">{item.title}</h3>
        {item.badge && (
          <span className="mt-2 w-fit rounded-full border border-[var(--hairline)] bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[color:var(--accent)]">
            {item.badge}
          </span>
        )}
        <p className="mt-2 text-sm text-[color:var(--muted-strong)]">
          {item.blurb}
        </p>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  height: REVEAL_SPRING,
                  opacity: { duration: 0.25, ease: "easeOut" },
                }
          }
          className="overflow-hidden"
        >
          <p className="pt-3 text-sm leading-relaxed text-[color:var(--muted)]">
            {item.details}
          </p>
        </motion.div>

        <div className="mt-auto pt-4">
          {(item.github || item.demo) && (
            <div className="mb-3 flex flex-wrap gap-2">
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} on GitHub`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-[color:var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub
                </a>
              )}
              {item.demo && (
                <a
                  href={item.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} live site`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline-strong)] bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-[color:var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live
                </a>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--hairline)] bg-white/[0.04] px-2.5 py-1 text-[10px] text-[color:var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const reduce = useReducedMotion() ?? false;
  const touch = useTouchDevice();
  const fadeUp = reduce ? staticVariants : fadeUpVariants;

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="font-display mb-12 text-3xl font-medium sm:text-4xl lg:text-5xl"
        >
          {sectionTitles.projects}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((item) => (
            <ProjectCard
              key={item.title}
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
