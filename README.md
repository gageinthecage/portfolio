# Gage William Boyd — Portfolio

Single-page portfolio (Next.js 16 + Tailwind v4 + framer-motion + Vanta waves),
format modeled on ciangoon.dev, dark/classy aesthetic. Deployed on Vercel (soon).

## Run it

```bash
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Edit content

**All text and data live in `src/content/site.ts`** — name, taglines, summary,
links (GitHub/LinkedIn/email/phone), experience entries, projects, interests,
section titles, loading captions. Components never hardcode content.

Swap the placeholder headshot by replacing `public/headshot-placeholder.svg`
(and the `src` in `src/components/Hero.tsx`). Company logos live in `public/logos/`;
set `logoLight: true` on an experience item whose logo needs a white box.

## Re-theme

All colors route through CSS variables at the top of `src/app/globals.css`
(`--background`, `--accent`, glass surface/hairline tokens…). Fonts are wired in
`src/app/layout.tsx` → `--font-sans` / `--font-mono`.

## Structure

- `src/app/page.tsx` — assembles: Preloader → Vanta background → Navbar → Hero →
  Experience → Projects → Interests → Footer
- `DESIGN.md` — the binding visual spec (format + interaction language)
- Detail pages per project/job: planned, will be in-domain routes (`/work/...`, `/projects/...`)
