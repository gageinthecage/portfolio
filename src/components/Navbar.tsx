"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { navItems } from "@/content/site";

export default function Navbar() {
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4">
      <motion.nav
        initial={reducedMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-4 sm:gap-8 rounded-full px-6 sm:px-8 py-3"
        style={{
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.35)" : "transparent",
          // blur(0px) instead of "none" so the blur radius actually interpolates
          backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
          border: scrolled
            ? "1px solid var(--hairline)"
            : "1px solid transparent",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.href}
            type="button"
            onClick={() => handleClick(item.href)}
            className="font-display cursor-pointer px-1 py-3 -my-3 text-xs sm:text-sm font-medium text-foreground/90 hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {item.name}
          </button>
        ))}
      </motion.nav>
    </div>
  );
}
