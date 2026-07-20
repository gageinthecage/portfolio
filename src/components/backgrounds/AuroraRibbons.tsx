"use client";

import { useEffect, useRef } from "react";

/**
 * AuroraRibbons — full-viewport animated background.
 *
 * Dark silk aesthetic: a handful of luminous, softly blurred wave ribbons in
 * deep teal sweep diagonally across a near-black field, undulating over
 * ~20–30s cycles. Intentionally very dim so foreground text stays readable.
 *
 * Pure canvas 2D + requestAnimationFrame. Colors are hardcoded (the site
 * retheme may be mid-flight); the canvas is cleared to transparent so the
 * body background shows through.
 */

interface RibbonSpec {
  /** Vertical anchor at mid-screen, as a fraction of viewport height. */
  base: number;
  /** Diagonal slope: vertical rise across the full width (fraction of height). */
  tilt: number;
  /** Amplitudes of the three sine terms (fractions of viewport height). */
  amps: [number, number, number];
  /** Spatial frequencies: full waves across the viewport width. */
  freqs: [number, number, number];
  /** Temporal phase speeds in radians/second (~2π/25 ≈ one cycle per ~25s). */
  speeds: [number, number, number];
  /** Static phase offsets in radians. */
  phases: [number, number, number];
  /** Half-thickness of the ribbon body (fraction of viewport height). */
  thickness: number;
  /** Peak alpha of the ribbon body — kept very low on purpose. */
  alpha: number;
  /** Resting position (0..1 along x) of the luminous part of the gradient. */
  glowCenter: number;
  /** Phase offset for the slow drift of the glow center. */
  glowPhase: number;
}

/** Deep silk shadow tone (#0a3d31). */
const TEAL_DEEP = "10, 61, 49";
/** Mid fold tone (#0d5f4a). */
const TEAL_MID = "13, 95, 74";
/** Mint highlight where the light catches (#17e0b8). */
const TEAL_MINT = "23, 224, 184";

const RIBBONS: readonly RibbonSpec[] = [
  {
    base: 0.2,
    tilt: -0.26,
    amps: [0.05, 0.026, 0.012],
    freqs: [1.3, 2.4, 4.2],
    speeds: [0.24, -0.17, 0.11],
    phases: [0.4, 2.1, 5.0],
    thickness: 0.085,
    alpha: 0.085,
    glowCenter: 0.34,
    glowPhase: 0.0,
  },
  {
    base: 0.45,
    tilt: -0.2,
    amps: [0.06, 0.03, 0.014],
    freqs: [1.1, 2.7, 3.8],
    speeds: [-0.2, 0.26, -0.13],
    phases: [3.6, 0.9, 1.7],
    thickness: 0.11,
    alpha: 0.075,
    glowCenter: 0.62,
    glowPhase: 2.4,
  },
  {
    base: 0.68,
    tilt: -0.3,
    amps: [0.055, 0.024, 0.011],
    freqs: [1.5, 2.2, 4.6],
    speeds: [0.19, -0.23, 0.15],
    phases: [5.2, 4.0, 2.8],
    thickness: 0.095,
    alpha: 0.08,
    glowCenter: 0.45,
    glowPhase: 4.1,
  },
  {
    base: 0.9,
    tilt: -0.22,
    amps: [0.045, 0.028, 0.01],
    freqs: [1.2, 2.9, 3.5],
    speeds: [-0.22, 0.18, -0.1],
    phases: [1.2, 5.7, 3.3],
    thickness: 0.075,
    alpha: 0.065,
    glowCenter: 0.55,
    glowPhase: 1.3,
  },
];

const TWO_PI = Math.PI * 2;
const FRAME_MS = 1000 / 30; // ~30fps cap
const SEGMENTS = 64;
/** Internal render scale relative to CSS pixels — low-res + blur = cheap softness. */
const RENDER_SCALE = 0.5;

/** Faint drifting mint specks that give the field depth. */
const PARTICLE_COUNT = 60;

interface Particle {
  /** Base position as viewport fractions. */
  x: number;
  y: number;
  /** Drift velocity in fractions/second (very slow). */
  vx: number;
  vy: number;
  /** Radius as a fraction of the smaller viewport dimension. */
  r: number;
  /** Resting alpha and twinkle parameters. */
  alpha: number;
  twSpeed: number;
  twPhase: number;
}

/** Big, very dim radial glows that slowly wander for atmosphere. */
interface Glow {
  x: number;
  y: number;
  /** Radius as a fraction of viewport width. */
  r: number;
  alpha: number;
  driftX: number;
  driftY: number;
  phase: number;
  color: string;
}

const GLOWS: readonly Glow[] = [
  { x: 0.22, y: 0.28, r: 0.42, alpha: 0.05, driftX: 0.05, driftY: 0.04, phase: 0.0, color: "23, 224, 184" },
  { x: 0.78, y: 0.44, r: 0.5, alpha: 0.04, driftX: 0.06, driftY: 0.05, phase: 2.2, color: "13, 95, 74" },
  { x: 0.5, y: 0.82, r: 0.46, alpha: 0.045, driftX: 0.04, driftY: 0.03, phase: 4.1, color: "23, 224, 184" },
];

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/** Deterministic-ish particle field (generated once, client-side). */
function makeParticles(): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    out.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.012,
      vy: -0.006 - Math.random() * 0.012, // gentle upward drift
      r: 0.0009 + Math.random() * 0.0022,
      alpha: 0.12 + Math.random() * 0.33,
      twSpeed: 0.5 + Math.random() * 1.3,
      twPhase: Math.random() * TWO_PI,
    });
  }
  return out;
}

export default function AuroraRibbons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect ctx.filter support (Safari < 18 lacks it); fall back to a CSS
    // blur on the whole canvas so edges stay soft either way.
    ctx.filter = "blur(2px)";
    const supportsCtxFilter =
      typeof ctx.filter === "string" && ctx.filter.includes("blur");
    ctx.filter = "none";
    if (!supportsCtxFilter) {
      canvas.style.filter = "blur(10px)";
    }

    let width = 0;
    let height = 0;

    const setSize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = dpr * RENDER_SCALE;
      width = Math.max(1, Math.ceil(canvas.clientWidth * scale));
      height = Math.max(1, Math.ceil(canvas.clientHeight * scale));
      canvas.width = width;
      canvas.height = height;
    };

    /** Centerline y of a ribbon at horizontal position u (0..1), time t (s). */
    const ribbonY = (spec: RibbonSpec, u: number, t: number): number => {
      let y = (spec.base + spec.tilt * (u - 0.5)) * height;
      for (let j = 0; j < 3; j++) {
        y +=
          spec.amps[j] *
          height *
          Math.sin(TWO_PI * spec.freqs[j] * u + spec.phases[j] + spec.speeds[j] * t);
      }
      return y;
    };

    const makeGradient = (
      spec: RibbonSpec,
      t: number,
      alpha: number
    ): CanvasGradient => {
      // The luminous region drifts very slowly along the ribbon.
      const c = clamp01(
        spec.glowCenter + 0.16 * Math.sin(t * 0.07 + spec.glowPhase)
      );
      const g = ctx.createLinearGradient(0, 0, width, 0);
      g.addColorStop(0, `rgba(${TEAL_DEEP}, 0)`);
      g.addColorStop(clamp01(c - 0.42), `rgba(${TEAL_DEEP}, 0)`);
      g.addColorStop(clamp01(c - 0.2), `rgba(${TEAL_MID}, ${alpha * 0.55})`);
      g.addColorStop(c, `rgba(${TEAL_MINT}, ${alpha})`);
      g.addColorStop(clamp01(c + 0.2), `rgba(${TEAL_MID}, ${alpha * 0.5})`);
      g.addColorStop(clamp01(c + 0.42), `rgba(${TEAL_DEEP}, 0)`);
      g.addColorStop(1, `rgba(${TEAL_DEEP}, 0)`);
      return g;
    };

    const drawRibbon = (
      spec: RibbonSpec,
      t: number,
      thicknessScale: number,
      alpha: number,
      blurPx: number
    ): void => {
      const margin = width * 0.08;
      const x0 = -margin;
      const span = width + margin * 2;

      const halfThickness = (u: number): number =>
        spec.thickness *
        thicknessScale *
        height *
        (0.65 + 0.35 * Math.sin(TWO_PI * 0.9 * u + spec.phases[0] + t * 0.12));

      if (supportsCtxFilter) {
        ctx.filter = `blur(${blurPx}px)`;
      }
      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const x = x0 + (span * i) / SEGMENTS;
        const u = x / width;
        const y = ribbonY(spec, u, t) - halfThickness(u);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let i = SEGMENTS; i >= 0; i--) {
        const x = x0 + (span * i) / SEGMENTS;
        const u = x / width;
        ctx.lineTo(x, ribbonY(spec, u, t) + halfThickness(u));
      }
      ctx.closePath();
      ctx.fillStyle = makeGradient(spec, t, alpha);
      ctx.fill();
    };

    const particles = makeParticles();

    const drawGlows = (t: number): void => {
      if (supportsCtxFilter) ctx.filter = "none";
      for (const g of GLOWS) {
        const cx = (g.x + g.driftX * Math.sin(t * 0.05 + g.phase)) * width;
        const cy = (g.y + g.driftY * Math.cos(t * 0.045 + g.phase)) * height;
        const rad = g.r * width;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, `rgba(${g.color}, ${g.alpha})`);
        grad.addColorStop(1, `rgba(${g.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, TWO_PI);
        ctx.fill();
      }
    };

    const drawParticles = (t: number): void => {
      if (supportsCtxFilter) ctx.filter = "none";
      const minDim = Math.min(width, height);
      for (const p of particles) {
        // Position drifts slowly and wraps around the viewport.
        const px = (((p.x + p.vx * t) % 1) + 1) % 1;
        const py = (((p.y + p.vy * t) % 1) + 1) % 1;
        const cx = px * width;
        const cy = py * height;
        const rad = Math.max(0.6, p.r * minDim);
        const a = p.alpha * (0.45 + 0.55 * Math.sin(t * p.twSpeed + p.twPhase));
        if (a <= 0.01) continue;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad * 3);
        grad.addColorStop(0, `rgba(${TEAL_MINT}, ${a})`);
        grad.addColorStop(1, `rgba(${TEAL_MINT}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad * 3, 0, TWO_PI);
        ctx.fill();
      }
    };

    const draw = (t: number): void => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      // Soft atmospheric glows sit deepest…
      drawGlows(t);
      const bodyBlur = Math.min(40, Math.max(4, Math.round(height * 0.03)));
      const coreBlur = Math.min(20, Math.max(2, Math.round(height * 0.012)));
      for (const spec of RIBBONS) {
        // Wide, dim body of the fold…
        drawRibbon(spec, t, 1, spec.alpha, bodyBlur);
        // …plus a narrower core where the silk catches the light.
        drawRibbon(spec, t, 0.38, spec.alpha * 1.3, coreBlur);
      }
      // …and fine mint specks drift on top.
      drawParticles(t);
      ctx.globalCompositeOperation = "source-over";
      if (supportsCtxFilter) ctx.filter = "none";
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let rafId: number | null = null;
    let last: number | null = null;
    let elapsed = 0; // animation clock in seconds

    const loop = (now: number): void => {
      rafId = window.requestAnimationFrame(loop);
      if (last === null) {
        last = now;
        return;
      }
      const dt = now - last;
      if (dt < FRAME_MS - 1) return; // cap around 30fps
      last = now;
      elapsed += Math.min(dt, 100) / 1000; // clamp so tab-switch gaps don't jump
      draw(elapsed);
    };

    const stop = (): void => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      last = null;
    };

    const start = (): void => {
      if (rafId !== null || motionQuery.matches || document.hidden) return;
      rafId = window.requestAnimationFrame(loop);
    };

    setSize();
    if (motionQuery.matches) {
      draw(12.5); // one static, hand-picked frame — no animation loop
    } else {
      draw(elapsed);
      start();
    }

    let resizeTimer: number | undefined;
    const onResize = (): void => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setSize();
        draw(motionQuery.matches ? 12.5 : elapsed);
      }, 150);
    };

    const onVisibility = (): void => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionChange = (): void => {
      if (motionQuery.matches) {
        stop();
        draw(12.5);
      } else {
        start();
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
