"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";
import { site } from "@/content/site";

const STEP = 0.15;

type IconLink = {
  label: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
};

const iconLinks: IconLink[] = [
  {
    label: "GitHub",
    href: site.links.github,
    external: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: site.links.linkedin,
    external: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${site.links.email}`,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: `tel:${site.links.phone.replace(/[^+\d]/g, "")}`,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const entrance = (step: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: step * STEP, ease: "easeOut" as const },
  });

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        <motion.div {...entrance(0)}>
          <Image
            src="/headshot-placeholder.svg"
            alt={site.name}
            width={176}
            height={176}
            unoptimized
            priority
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border border-[var(--hairline-strong)] ring-1 ring-offset-4 ring-offset-[var(--background)] ring-[var(--accent-soft)]"
          />
        </motion.div>

        <motion.h1
          {...entrance(1)}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          {site.name}
        </motion.h1>

        <motion.div
          {...entrance(2)}
          className="min-h-[5.25rem] sm:min-h-[3.5rem] lg:min-h-[4rem]"
        >
          <TypeWriter
            lines={site.taglines}
            className="text-lg sm:text-xl lg:text-2xl font-light bg-gradient-to-r from-white to-[#8fe8d2] bg-clip-text text-transparent"
          />
        </motion.div>

        <motion.p
          {...entrance(3)}
          className="text-sm uppercase tracking-[0.25em] text-muted"
        >
          {site.school}
        </motion.p>

        <motion.p
          {...entrance(4)}
          className="max-w-2xl text-muted-strong leading-relaxed text-base sm:text-lg"
        >
          {site.summary}
        </motion.p>

        <motion.div {...entrance(5)} className="flex items-center gap-6">
          {iconLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="rounded-md text-muted hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
