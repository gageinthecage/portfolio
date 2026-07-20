"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  interests,
  sectionTitles,
  type InterestItem,
} from "@/content/site";

// Shared glass-card language (kept identical across Experience / Projects / Interests)
const GLASS_CARD =
  "border border-[var(--hairline)] bg-[var(--surface)] backdrop-blur-[6px] " +
  "transition-[border-color,background-color,box-shadow] duration-300 " +
  "hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-hover)] " +
  "hover:shadow-[0_0_0_1px_var(--accent-soft),0_8px_40px_rgba(0,0,0,0.5)]";

const HOVER_SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staticVariants: Variants = { hidden: {}, visible: {} };
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ---------------- small tile icons ---------------- */

const TILE_ICONS: Record<InterestItem["icon"], ReactNode> = {
  chess: (
    <span aria-hidden="true" className="text-2xl leading-none">
      ♞
    </span>
  ),
  poker: (
    <span aria-hidden="true" className="text-2xl leading-none">
      ♠
    </span>
  ),
  mma: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10V8a5 5 0 0 1 10 0v4a5 5 0 0 1-5 5h-1a4 4 0 0 1-4-4v-1z" />
      <path d="M7 10h3a2 2 0 0 1 0 4H8" />
      <path d="M9 17v3h6v-3" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6.5C10.4 5 8.2 4.5 5.5 4.5H4v13h1.5c2.7 0 4.9.5 6.5 2 1.6-1.5 3.8-2 6.5-2H20v-13h-1.5c-2.7 0-4.9.5-6.5 2z" />
      <path d="M12 6.5v13" />
    </svg>
  ),
};

/* ---------------- large header illustrations (one per interest) ---------------- */

const F = "var(--foreground)";
const A = "var(--accent)";

function ChessArt() {
  const squares = [];
  const n = 8;
  const s = 15;
  const originX = (240 - n * s) / 2;
  const originY = (150 - n * s) / 2;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const dark = (r + c) % 2 === 1;
      squares.push(
        <rect
          key={`${r}-${c}`}
          x={originX + c * s}
          y={originY + r * s}
          width={s}
          height={s}
          fill={dark ? "rgba(53,226,194,0.16)" : "rgba(210,240,232,0.06)"}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <g>{squares}</g>
      <rect
        x={originX}
        y={originY}
        width={n * s}
        height={n * s}
        fill="none"
        stroke="rgba(120,240,210,0.25)"
        strokeWidth="1"
      />
      <text x={originX + 2.5 * s} y={originY + 5 * s} fontSize="26" textAnchor="middle" fill={F} opacity="0.85">♞</text>
      <text x={originX + 5.5 * s} y={originY + 3 * s} fontSize="26" textAnchor="middle" fill={A} opacity="0.85">♚</text>
    </svg>
  );
}

function PokerArt() {
  const Card = ({ x, rot, suit, color }: { x: number; rot: number; suit: string; color: string }) => (
    <g transform={`translate(${x} 74) rotate(${rot})`}>
      <rect x="-32" y="-46" width="64" height="92" rx="8" fill="#f4f5f2" />
      <rect x="-32" y="-46" width="64" height="92" rx="8" fill="none" stroke="rgba(0,0,0,0.15)" />
      <text x="-24" y="-26" fontSize="16" fill={color} fontWeight="700">A</text>
      <text x="0" y="10" fontSize="34" textAnchor="middle" fill={color}>{suit}</text>
      <text x="24" y="40" fontSize="16" fill={color} fontWeight="700" transform="rotate(180 24 34)">A</text>
    </g>
  );
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <Card x={96} rot={-11} suit="♠" color="#12151a" />
      <Card x={140} rot={9} suit="♥" color="#b3123a" />
      {/* poker chip */}
      <g transform="translate(176 104)">
        <circle r="20" fill="rgba(53,226,194,0.14)" stroke={A} strokeWidth="1.5" />
        <circle r="13" fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
      </g>
    </svg>
  );
}

function MmaArt() {
  const Glove = ({ x, flip }: { x: number; flip: boolean }) => (
    <g transform={`translate(${x} 75) scale(${flip ? -1 : 1} 1)`}>
      {/* padded fist */}
      <path
        d="M-26 -20 q-14 0 -14 18 v12 q0 16 18 16 h20 q14 0 14 -16 v-24 q0 -14 -16 -14 z"
        fill="rgba(53,226,194,0.16)"
        stroke={A}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* thumb */}
      <path d="M-26 4 q-10 0 -10 8 q0 8 10 8 h4 v-16 z" fill="rgba(53,226,194,0.16)" stroke={A} strokeWidth="1.6" strokeLinejoin="round" />
      {/* knuckle seams */}
      <path d="M-6 -18 v22 M6 -18 v22" stroke={A} strokeWidth="1.2" opacity="0.55" />
      {/* cuff */}
      <path d="M6 -20 h10 q6 0 6 6 v24 q0 6 -6 6 h-10 z" fill="rgba(210,240,232,0.08)" stroke={A} strokeWidth="1.4" />
    </g>
  );
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <Glove x={96} flip={false} />
      <Glove x={150} flip />
    </svg>
  );
}

function LiteratureArt() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      {/* open book */}
      <path d="M120 44 C104 33 84 31 66 35 L66 108 C84 104 104 106 120 116 Z" fill="rgba(210,240,232,0.07)" stroke={F} strokeOpacity="0.5" strokeWidth="1.4" />
      <path d="M120 44 C136 33 156 31 174 35 L174 108 C156 104 136 106 120 116 Z" fill="rgba(210,240,232,0.07)" stroke={F} strokeOpacity="0.5" strokeWidth="1.4" />
      <path d="M120 44 V116" stroke={F} strokeOpacity="0.5" strokeWidth="1.4" />
      {/* text lines */}
      <g stroke={F} strokeOpacity="0.28" strokeWidth="1.4">
        <path d="M76 50 H108 M76 60 H108 M76 70 H108 M76 80 H108 M76 90 H104" />
        <path d="M132 50 H164 M132 60 H164 M132 70 H164 M132 80 H164 M136 90 H164" />
      </g>
      {/* bookmark ribbon */}
      <path d="M120 44 V126 L114 118 L108 126 V44 Z" fill={A} opacity="0.55" />
    </svg>
  );
}

const HEADER_ART: Record<InterestItem["art"], { gradient: string; art: ReactNode }> = {
  chess: { gradient: "from-[#0a2b24] to-[#04120e]", art: <ChessArt /> },
  poker: { gradient: "from-[#0c2a22] to-[#05130f]", art: <PokerArt /> },
  mma: { gradient: "from-[#11291f] to-[#06130d]", art: <MmaArt /> },
  literature: { gradient: "from-[#0a2622] to-[#050f0d]", art: <LiteratureArt /> },
};

/* ---------------- little book graphics (Literature) ---------------- */

function BookGraphic({
  title,
  author,
  tint,
  isbn,
}: {
  title: string;
  author: string;
  tint: string;
  isbn: string;
}) {
  // Real cover art, loaded by reference from the Open Library covers API
  // (default=false → 404s when no cover exists, triggering the styled fallback).
  const [failed, setFailed] = useState(false);
  const cover = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;

  return (
    <div className="flex w-full flex-col items-center gap-1.5">
      <div
        className="relative flex h-24 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--hairline-strong)] shadow-[0_6px_18px_rgba(0,0,0,0.5)]"
        style={
          failed
            ? { background: `linear-gradient(150deg, ${tint} 0%, rgba(3,13,10,0.92) 140%)` }
            : undefined
        }
      >
        {failed ? (
          <>
            <span className="absolute left-1 top-1 bottom-1 w-[3px] rounded-full bg-white/25" />
            <span className="px-1.5 text-center text-[9px] font-semibold leading-tight text-white/95">
              {title}
            </span>
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={`${title} cover`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <span className="max-w-[5rem] text-center text-[10px] leading-tight text-[color:var(--muted)]">
        {author}
      </span>
    </div>
  );
}

/* ---------------- modal ---------------- */

function InterestModal({
  item,
  onClose,
}: {
  item: InterestItem;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const header = HEADER_ART[item.art];

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="interest-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative z-10 max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--hairline-strong)] bg-[color:var(--background)]/92 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        {/* header illustration */}
        <div className={`relative h-40 w-full bg-gradient-to-br ${header.gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {header.art}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-black/40 text-foreground transition-colors hover:border-[var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <span className="flex items-center gap-2 text-[color:var(--accent)]">
            {TILE_ICONS[item.icon]}
            <h3 id="interest-modal-title" className="font-display text-2xl font-semibold text-foreground">
              {item.name}
            </h3>
          </span>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{item.tagline}</p>

          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--muted-strong)]">
            {item.body}
          </p>

          {item.books && (
            <div className="mt-6">
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                A few favorites
              </p>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {item.books.map((b) => (
                  <BookGraphic
                    key={b.title}
                    title={b.title}
                    author={b.author}
                    tint={b.tint}
                    isbn={b.isbn}
                  />
                ))}
              </div>
            </div>
          )}

          {item.quote && (
            <figure className="mt-6 border-l-2 border-[var(--accent-soft)] pl-4">
              <blockquote className="text-[15px] italic leading-relaxed text-[color:var(--muted-strong)]">
                &ldquo;{item.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--accent)]">
                — {item.quote.author}
              </figcaption>
            </figure>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- tile ---------------- */

function InterestTile({
  item,
  reduce,
  variants,
  onOpen,
}: {
  item: InterestItem;
  reduce: boolean;
  variants: Variants;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      variants={variants}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      transition={HOVER_SPRING}
      className={`${GLASS_CARD} flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl px-4 py-8 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      <span className="flex h-8 w-8 items-center justify-center text-[color:var(--muted-strong)]">
        {TILE_ICONS[item.icon]}
      </span>
      <span className="text-sm font-medium">{item.name}</span>
    </motion.button>
  );
}

/* ---------------- section ---------------- */

export default function InterestsSection() {
  const reduce = useReducedMotion() ?? false;
  const fadeUp = reduce ? staticVariants : fadeUpVariants;
  const [openName, setOpenName] = useState<string | null>(null);
  const openItem = interests.find((i) => i.name === openName) ?? null;

  return (
    <section id="interests" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="font-display mb-4 text-3xl font-medium sm:text-4xl lg:text-5xl"
        >
          {sectionTitles.interests}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="mb-10 text-sm text-[color:var(--muted)]"
        >
          A few things I care about outside the classroom — click any tile.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {interests.map((item) => (
            <InterestTile
              key={item.name}
              item={item}
              reduce={reduce}
              variants={fadeUp}
              onOpen={() => setOpenName(item.name)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {openItem && (
          <InterestModal item={openItem} onClose={() => setOpenName(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
