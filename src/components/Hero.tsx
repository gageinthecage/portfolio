"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";
import { site } from "@/content/site";

const STEP = 0.15;

/* ---------------- inline icons ---------------- */

const GitHubIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const EmailIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ResumeIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <polyline points="14 3 14 8 19 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

const CopyIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ---------------- click-to-reveal contact (email + phone share this) ---------------- */

function ContactReveal({
  label,
  value,
  icon,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Close on outside click / Escape while open.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the value is already visible to copy manually */
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={onToggle}
        className="rounded-md text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] aria-expanded:text-foreground"
      >
        {icon}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            role="dialog"
            aria-label={`${label} address`}
            className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-[var(--hairline-strong)] bg-[color:var(--background)]/85 px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                {label}
              </span>
              <span className="select-all font-mono text-sm text-foreground">
                {value}
              </span>
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Copied" : `Copy ${label.toLowerCase()}`}
                className="ml-1 inline-flex items-center gap-1 rounded-md border border-[var(--hairline)] px-1.5 py-1 text-[color:var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {copied ? CheckIcon : CopyIcon}
              </button>
            </div>
            {/* little pointer */}
            <span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[var(--hairline-strong)] bg-[color:var(--background)]/85" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- hero ---------------- */

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [openContact, setOpenContact] = useState<"email" | "phone" | null>(null);

  const entrance = (step: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: step * STEP, ease: "easeOut" as const },
  });

  const edu = site.education;
  const degreesLine = edu.degrees.join(" & ");

  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center px-4 pt-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <motion.div {...entrance(0)}>
          <Image
            src="/headshot.jpg"
            alt={site.name}
            width={176}
            height={176}
            priority
            className="h-36 w-36 rounded-full border border-[var(--hairline-strong)] object-cover ring-1 ring-[var(--accent-soft)] ring-offset-4 ring-offset-[var(--background)] sm:h-44 sm:w-44"
          />
        </motion.div>

        <motion.h1
          {...entrance(1)}
          className="font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          {site.name}
        </motion.h1>

        <motion.div
          {...entrance(2)}
          className="min-h-[5.25rem] sm:min-h-[3.5rem] lg:min-h-[4rem]"
        >
          <TypeWriter
            lines={site.taglines}
            className="bg-gradient-to-r from-white to-[#8fe8d2] bg-clip-text text-lg font-light text-transparent sm:text-xl lg:text-2xl"
          />
        </motion.div>

        {/* School + degrees + GPA + graduation */}
        <motion.div {...entrance(3)} className="flex flex-col items-center gap-2">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">
            {edu.school}
          </p>
          <p className="text-sm text-muted-strong sm:text-base">
            {degreesLine}
            <span className="mx-2 text-[color:var(--accent)]">·</span>
            GPA {edu.gpa}
            <span className="mx-2 text-[color:var(--accent)]">·</span>
            {edu.graduation}
          </p>
        </motion.div>

        <motion.p
          {...entrance(4)}
          className="max-w-2xl text-base leading-relaxed text-muted-strong sm:text-lg"
        >
          {site.summary}
        </motion.p>

        {/* Honors pills */}
        <motion.ul
          {...entrance(5)}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {edu.honors.map((h) => (
            <li
              key={h}
              className="rounded-full border border-[var(--hairline)] bg-white/[0.04] px-3 py-1 text-xs font-medium text-[color:var(--muted-strong)]"
            >
              {h}
            </li>
          ))}
        </motion.ul>

        <motion.div {...entrance(6)} className="flex items-center gap-6">
          <a
            href={site.links.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {GitHubIcon}
          </a>
          <a
            href={site.links.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {LinkedInIcon}
          </a>
          <ContactReveal
            label="Email"
            value={site.links.email}
            icon={EmailIcon}
            open={openContact === "email"}
            onToggle={() => setOpenContact((c) => (c === "email" ? null : "email"))}
            onClose={() => setOpenContact(null)}
          />
          <ContactReveal
            label="Phone"
            value={site.links.phone}
            icon={PhoneIcon}
            open={openContact === "phone"}
            onToggle={() => setOpenContact((c) => (c === "phone" ? null : "phone"))}
            onClose={() => setOpenContact(null)}
          />

          <a
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-white/[0.05] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {ResumeIcon}
            Résumé
          </a>
        </motion.div>
      </div>
    </section>
  );
}
