# Gage Boyd Portfolio — Design Contract

This is the binding spec for all components. The FORMAT is copied from ciangoon.dev
(reverse-engineered from its production bundle). The AESTHETIC is "dark and classy,
easy on the eyes, NOT hacker/cyber" — a refined near-black monochrome with glass
surfaces and one restrained accent. An aesthetic reference image arrives later, so
ALL colors/fonts route through CSS variables in `globals.css` for easy re-theming.

## Stack & conventions

- Next.js 16 App Router, TypeScript, Tailwind v4 (CSS-first: `@import "tailwindcss"` + `@theme inline` in globals.css — there is NO tailwind.config file), framer-motion 12.
- IMPORTANT: repo AGENTS.md says Next 16 has breaking changes vs training data. Consult `node_modules/next/dist/docs/01-app/` if unsure about an API.
- All components are client components (`"use client"`) except none need SSR data.
- All content/data imports come from `@/content/site` (already written — read it first; do NOT edit it).
- `src/app/page.tsx` (already written — do NOT edit) imports these default exports:
  - `@/components/Preloader` — props `{ onComplete: () => void }`
  - `@/components/VantaBackground` — no props
  - `@/components/Navbar` — no props
  - `@/components/Hero` — no props
  - `@/components/ExperienceSection` — no props
  - `@/components/ProjectsSection` — no props
  - `@/components/InterestsSection` — no props
  - `@/components/Footer` — no props
- Never use `window`/`document` outside `useEffect`.
- Respect `prefers-reduced-motion`: gate looping/large animations with a `useReducedMotion()` check from framer-motion where cheap to do (Vanta + typewriter at minimum: render static fallback).

## Design tokens (define in globals.css exactly once)

```css
:root {
  --background: #050505;          /* near-black */
  --foreground: #f5f5f2;          /* warm off-white */
  --muted: #a3a3ab;               /* secondary text (gray.400 equiv) */
  --muted-strong: #cfcfd6;        /* gray.300 equiv */
  --surface: rgba(255, 255, 255, 0.05);        /* glass card bg */
  --surface-hover: rgba(255, 255, 255, 0.09);
  --hairline: rgba(255, 255, 255, 0.10);       /* 1px borders */
  --hairline-strong: rgba(255, 255, 255, 0.22); /* hover border */
  --accent: #c8b283;              /* muted champagne — use SPARINGLY */
  --accent-soft: rgba(200, 178, 131, 0.35);
}
```

Expose to Tailwind via `@theme inline` (`--color-background`, `--color-foreground`,
`--color-muted`, `--color-muted-strong`, `--color-accent` etc.) so utilities like
`text-muted`, `border-hairline` work; otherwise use arbitrary values
(`bg-[var(--surface)]`). Keep the Geist font variables from the scaffold BUT switch
the loaded fonts in layout.tsx to Inter (`--font-sans`) + Geist_Mono (`--font-mono`),
matching the reference (Inter everywhere, mono only for footer/small captions).
Body: `background: var(--background); color: var(--foreground); font-family: var(--font-sans)`.
Set `html { scroll-behavior: smooth; }` and `color-scheme: dark`.

## Shared visual language ("glass card")

Used by experience cards, project cards, interest tiles:

- bg `var(--surface)`, border `1px solid var(--hairline)`, `backdrop-blur-[6px]`,
  rounded-xl (cards) / rounded-full (pills).
- Hover (the user's explicit ask — "highlight the edges and expand"):
  - scale to ~1.02–1.03 (framer-motion `whileHover`, spring stiffness 300 damping 22)
  - border color → `var(--hairline-strong)`
  - soft outer glow: `box-shadow: 0 0 0 1px var(--accent-soft), 0 8px 40px rgba(0,0,0,0.5)`
    (glow uses the accent at LOW opacity — classy, not neon)
  - bg → `var(--surface-hover)`
- Scroll entrance: fade-up (`initial {opacity:0, y:20}`, `whileInView {opacity:1, y:0}`,
  `viewport {amount: 0.3, once: false}`), stagger children by 0.05–0.08s.

## Section shell (every section)

`<section id="…" className="py-20 px-4 sm:px-6 lg:px-8">` wrapping a
`max-w-6xl mx-auto` container. Section heading: left-aligned, `text-3xl sm:text-4xl
lg:text-5xl font-medium`, `mb-10`–`mb-14`, fade-up on scroll (same as reference).

## Components

### 1. Preloader (`src/components/Preloader.tsx`)
Copy of reference behavior:
- Fixed inset-0, bg `var(--background)`, z-[1000], flex-center, column, gap 2.
- Huge percent: `text-6xl sm:text-7xl font-bold` counting 0→97 over ~2.2s with
  exponential ease-out (`1 - 2^(-10t)` via requestAnimationFrame), then 98→100 over
  ~400ms linear tween, then 200ms pause → call `onComplete()`.
- Below: small `text-sm text-muted` caption = random pick from `site.loadingMessages`
  (pick in `useEffect` to avoid hydration mismatch; initial "").
- Subtle scale spring on the number container (0.98 → 1).
- Reduced motion: jump quickly (~300ms) to 100 and complete.

### 2. VantaBackground (`src/components/VantaBackground.tsx`)
Reference uses VANTA.WAVES. Deps `three@0.125.2` + `vanta` are installed.
- `"use client"`; a `div ref` fixed inset-0 z-0 pointer-events-none... NOTE: Vanta
  waves reacts to mouse; reference has it interactive. Put it `position: fixed; inset: 0; z-index: 0`
  WITHOUT pointer-events-none on the vanta el (content sits at z-10 anyway).
- In `useEffect`: `const THREE = await import("three"); const WAVES = (await import("vanta/dist/vanta.waves.min")).default;`
  then `WAVES({ el, THREE: THREE (module namespace works; if typing fights, cast to any), mouseControls: true, touchControls: true,
  gyroControls: false, minHeight: 200, minWidth: 200, scale: 1, scaleMobile: 1,
  color: 0x08090c, shininess: 30, waveHeight: 14, waveSpeed: 0.25, zoom: 0.75 })`
  — slightly darker/slower than reference for the classier feel.
- Destroy on unmount (`effect.destroy()`). Wrap init in try/catch — on failure (or
  reduced motion) render nothing; the body background covers it. Add
  `src/types/vanta.d.ts` with `declare module "vanta/dist/vanta.waves.min";`.
- Behind the vanta div, this component also renders nothing else.

### 3. Navbar (`src/components/Navbar.tsx`)
Exact reference format — floating centered pill:
- `<div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4">` containing
  `<motion.nav>` pill: `rounded-full px-6 sm:px-8 py-3`, entrance `initial {opacity:0, y:-20}` → animate.
- Scroll state (`window.scrollY > 10` listener): scrolled → bg `rgba(0,0,0,0.35)` +
  `backdrop-blur-xl` + border `1px solid var(--hairline)`; top → transparent, no border.
  Transition `all .3s ease`.
- Items from `navItems`: ghost buttons `text-sm font-medium text-foreground/90`,
  hover → `text-accent` (subtle), click → `document.querySelector(href)?.scrollIntoView({behavior:"smooth"})`.
- Gap 4 on mobile / 8 desktop; the 4 labels must fit on a 360px screen (shrink text to xs if needed).
- NO name/logo in the navbar (user requirement: name lives in hero only, tabs accompany scrolling).

### 4. Hero (`src/components/Hero.tsx`) — section id="home"
Resume-style centered hero, min-h-screen flex-center, pt-16:
- Stack (gap ~6), all centered, entrance = fade-up cascade (0 / 0.15 / 0.3 / 0.45s delays):
  1. Headshot: `next/image` of `/headshot-placeholder.svg` (Image with `unoptimized` for svg or plain `img` — either fine), circular
     `w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover`, ring: `border border-[var(--hairline-strong)]`
     plus a 2nd offset ring via `ring-1 ring-offset-4 ring-offset-[var(--background)] ring-[var(--accent-soft)]` — elegant, thin.
  2. Name: `Gage William Boyd` — `text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight`.
  3. Typewriter line (component below): `text-lg sm:text-xl lg:text-2xl font-light`,
     gradient text white→gray like reference (`bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent`),
     fixed min-height so layout doesn't jump.
  4. School: `text-sm uppercase tracking-[0.25em] text-muted` — "Northern Arizona University".
  5. Summary: `site.summary`, `max-w-2xl text-muted-strong leading-relaxed text-base sm:text-lg`.
  6. Icon row (gap 6): GitHub, LinkedIn, Email (mailto:), Phone (tel:) — inline SVG icons
     (24px, stroke/fill `currentColor`), `text-muted hover:text-foreground transition-colors`,
     aria-labels. Draw the four icons as small inline SVG paths (use simple, recognizable
     glyphs; GitHub octocat mark, LinkedIn "in", envelope, phone handset).

### 5. TypeWriter (`src/components/TypeWriter.tsx`)
Loop-typing effect like reference: types `site.taglines[i]` char-by-char (~55ms,
slight random jitter), pauses 2s, deletes (~28ms), next line. Block cursor "█"
blinking (opacity 0↔1, 0.5s, framer-motion or CSS keyframes). Props:
`{ lines: string[]; className?: string }`. Reduced motion → render `lines[0]` static.
(Hero passes `site.taglines`.)

### 6. ExperienceSection (`src/components/ExperienceSection.tsx`) — id="experience"
Heading "Experience". Grid `grid-cols-1 md:grid-cols-2 gap-6` (2 items).
Each card ("floating box" per user):
- Glass card (shared language), `p-6 sm:p-8`, h-full.
- Layout: top row = logo box (56–64px square, `bg-white/[0.06] rounded-lg p-2` with
  `next/image` logo `object-contain`) + title (`font-medium text-lg`) + company
  (`text-sm text-muted`).
- Always visible below: `blurb` (one line, `text-muted-strong text-sm`).
- HOVER EXPAND (user's key ask): the card scales (~1.02) + edge highlight (shared
  language) AND a hidden details block animates open: period + location line
  (`text-xs uppercase tracking-wider text-muted`) then `details` bullets
  (`text-sm text-muted-strong leading-relaxed`). Use framer-motion
  `onHoverStart/End` state (or CSS `grid-template-rows` trick) — animate
  height with `motion.div` `animate={{height: open ? "auto" : 0, opacity}}`,
  `overflow-hidden`, spring ~ stiffness 260 damping 28.
  On touch devices (no hover), details default OPEN (media `(hover: none)` check via
  `matchMedia` in effect) so content is never unreachable.
- NO click navigation yet (detail pages come later) — cards are divs, cursor-default.

### 7. ProjectsSection (`src/components/ProjectsSection.tsx`) — id="projects"
Heading "Projects". Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
Card = glass card, p-0 overflow-hidden flex column:
- Art header ~h-36: CSS gradient + large centered glyph keyed by `art`
  (ml → neural-net node/edges inline SVG; web → angle brackets; math → "∮" or "Σ";
  game → knight; data → bar glyph). Gradients: subtle dark duotones, e.g.
  ml: `from-[#141a24] to-[#0a0d12]`, web: `from-[#1a1420] to-[#0d0a12]`,
  math: `from-[#12190f]→…` — muted, classy, each distinct but quiet; glyph in
  `text-foreground/20` very large (text-6xl) + small `text-accent/60` accent element.
- Body p-6: title (`font-medium text-lg`), blurb (`text-sm text-muted-strong`),
  hover-reveal details paragraph (same height-animate mechanism as experience),
  then mt-auto tag pills row (`rounded-full border border-hairline bg-white/[0.04]
  px-2.5 py-1 text-[10px] text-muted`).
- Same hover expand + edge highlight. No click-through yet.

### 8. InterestsSection (`src/components/InterestsSection.tsx`) — id="interests"
Heading "Interests". A wrapping row (`flex flex-wrap gap-4`) of SMALL tiles:
- Tile: glass pill-ish card `rounded-2xl px-5 py-4`, icon (inline SVG 20px:
  chess knight ♞ / card suit ♠ / boxing glove or crossed fists / open book —
  text glyphs acceptable: ♞ ♠ 🥊→ use SVG or unicode in `text-xl`) + `font-medium text-sm`.
- CLICK to expand slightly (user ask): expands in place revealing `note`
  (`text-xs text-muted max-w-[16rem]`) with height+scale animation; click again to
  collapse; only one open at a time is fine (local state per-tile also acceptable).
  Keyboard accessible: `<button>` semantics with `aria-expanded`.
- Hover: same edge-highlight language, scale 1.03.

### 9. Footer (`src/components/Footer.tsx`)
`py-8 text-center font-mono text-sm text-muted`: `© {new Date().getFullYear()} Gage William Boyd`.
(compute year in render is fine — client component.)

### 10. Layout (`src/app/layout.tsx`) — EDIT the existing file
- Load `Inter` (variable `--font-sans`) + keep `Geist_Mono` as `--font-mono`.
- Metadata: title "Gage William Boyd", description "Computer Science & Mathematics
  student at Northern Arizona University — machine learning research, projects, and interests."
- Keep `antialiased`, dark scrollbar-friendly: add `className="scroll-smooth"` on html ok.
- Body keeps `min-h-full flex flex-col`, add `bg-background text-foreground`.

## Acceptance checklist (reviewers verify)

- [ ] `npm run build` passes clean (no TS/ESLint errors).
- [ ] Preloader counts up smoothly and hands off with a fade; no hydration warnings.
- [ ] Nav pill floats centered, glassifies on scroll, smooth-scrolls to all 4 sections; works at 360px width.
- [ ] Name is NOT in the navbar; name only in hero.
- [ ] Vanta waves render behind content; site still renders fine if Vanta throws (try/catch), and with reduced motion.
- [ ] Cards: hover expands + edge highlight + description reveal (mouse); details visible by default on touch.
- [ ] Interests expand on click, keyboard accessible.
- [ ] All text sourced from `src/content/site.ts` — zero hardcoded content strings in components.
- [ ] No pure-white large surfaces; contrast ≥ WCAG AA for body text (muted on #050505 passes).
- [ ] Responsive: 360px, 768px, 1440px all clean; no horizontal scroll.
