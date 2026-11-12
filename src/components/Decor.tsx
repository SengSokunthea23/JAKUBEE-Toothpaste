// Ingredient & atmosphere elements: bubbles, droplets, leaves, lemon slices, ice, foam.
import React from 'react';
import { COLORS, HEIGHT, WIDTH } from '../lib/theme';
import { easeBack, easeOut, prog, seeded } from '../lib/anim';

export type Particle = { x: number; y: number; r: number; speed: number; phase: number; a: number };

export const makeParticles = (seed: number, n: number): Particle[] => {
  const rnd = seeded(seed);
  const sizes = [4, 6, 8, 10, 14, 18, 24];
  return Array.from({ length: n }, () => ({
    x: rnd() * WIDTH,
    y: rnd() * HEIGHT,
    r: sizes[Math.floor(rnd() * sizes.length)],
    speed: 25 + rnd() * 65,
    phase: rnd() * Math.PI * 2,
    a: 0.35 + rnd() * 0.55,
  }));
};

/** Glassy water bubble. */
export const Bubble: React.FC<{ x: number; y: number; r: number; opacity?: number }> = ({ x, y, r, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      opacity,
      border: `${Math.max(1, r * 0.08)}px solid rgba(255,255,255,0.8)`,
      background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9) 0 12%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.14) 100%)',
    }}
  />
);

/** Field of rising bubbles. */
export const RisingBubbles: React.FC<{ particles: Particle[]; t: number; opacity?: number; xMin?: number; xMax?: number }> = ({
  particles,
  t,
  opacity = 1,
  xMin = 0,
  xMax = WIDTH,
}) => (
  <>
    {particles.map((p, i) => {
      const y = (((p.y - p.speed * t) % (HEIGHT + 120)) + HEIGHT + 120) % (HEIGHT + 120) - 60;
      const x = p.x + 14 * Math.sin(t * 1.3 + p.phase);
      if (x < xMin || x > xMax) return null;
      return <Bubble key={i} x={x} y={y} r={p.r} opacity={p.a * opacity} />;
    })}
  </>
);

/** Tiny twinkling particles. */
export const Sparkles: React.FC<{ particles: Particle[]; t: number; color: string; opacity?: number }> = ({ particles, t, color, opacity = 1 }) => (
  <>
    {particles.map((p, i) => {
      const y = (((p.y - p.speed * 0.4 * t) % HEIGHT) + HEIGHT) % HEIGHT;
      const r = p.r / 6;
      const a = p.a * opacity * (0.6 + 0.4 * Math.sin(t * 2 + p.phase));
      return <div key={i} style={{ position: 'absolute', left: p.x + 10 * Math.sin(t + p.phase) - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: color, opacity: a }} />;
    })}
  </>
);

/** Botanical leaf (SVG), two-tone with a midrib. */
export const Leaf: React.FC<{ x: number; y: number; length: number; rotate: number; dark?: boolean; opacity?: number }> = ({ x, y, length, rotate, dark, opacity = 1 }) => {
  const c1 = dark ? COLORS.botanical : COLORS.freshGreen;
  const c2 = dark ? COLORS.freshGreen : COLORS.sage;
  const h = length * 0.42;
  return (
    <svg
      width={length}
      height={h}
      viewBox="0 0 100 42"
      style={{ position: 'absolute', left: x - length / 2, top: y - h / 2, transform: `rotate(${rotate}deg)`, opacity, overflow: 'visible' }}
    >
      <path d="M1 21 C 20 -2, 70 -4, 99 21 C 70 42, 20 42, 1 21 Z" fill={c1} />
      <path d="M1 21 C 20 -2, 70 -4, 99 21 Z" fill={c2} />
      <path d="M2 21 L 95 21" stroke="rgba(255,255,255,0.5)" strokeWidth={1.4} />
      {[20, 36, 52, 68].map((v) => (
        <path key={v} d={`M${v} 21 L ${v + 9} ${21 - 12 * Math.sin((Math.PI * v) / 100)}`} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
      ))}
    </svg>
  );
};

export type LeafSpec = { x: number; y: number; length: number; a0: number; va: number; vy: number; phase: number; dark: boolean };

export const makeLeaves = (seed: number, n: number): LeafSpec[] => {
  const rnd = seeded(seed);
  const lens = [90, 120, 150, 190];
  return Array.from({ length: n }, () => ({
    x: 40 + rnd() * 1000,
    y: 200 + rnd() * 1600,
    length: lens[Math.floor(rnd() * 4)],
    a0: rnd() * 360,
    va: -14 + rnd() * 28,
    vy: 10 + rnd() * 20,
    phase: rnd() * 6,
    dark: rnd() < 0.5,
  }));
};

/** Lemon slice decor (matches the citrus art on the Zesty Lemon pack). */
export const LemonSlice: React.FC<{ x: number; y: number; d: number; rotate: number; opacity?: number }> = ({ x, y, d, rotate, opacity = 1 }) => (
  <svg width={d} height={d} viewBox="0 0 100 100" style={{ position: 'absolute', left: x - d / 2, top: y - d / 2, transform: `rotate(${rotate}deg)`, opacity, filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.25))' }}>
    <circle cx={50} cy={50} r={50} fill={COLORS.lemonRind} />
    <circle cx={50} cy={50} r={45} fill={COLORS.lemonPith} />
    <circle cx={50} cy={50} r={41.5} fill={COLORS.lemonFlesh} />
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4;
      return <line key={i} x1={50} y1={50} x2={50 + Math.cos(a) * 42} y2={50 + Math.sin(a) * 42} stroke={COLORS.lemonPith} strokeWidth={2.2} />;
    })}
    <circle cx={50} cy={50} r={5} fill={COLORS.lemonPith} />
  </svg>
);

/** Translucent ice cube. */
export const IceCube: React.FC<{ x: number; y: number; s: number; rotate: number; opacity?: number }> = ({ x, y, s, rotate, opacity = 1 }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ position: 'absolute', left: x - s / 2, top: y - s / 2, transform: `rotate(${rotate}deg)`, opacity }}>
    <rect x={2} y={2} width={96} height={96} rx={18} fill="rgba(210,240,255,0.37)" stroke="rgba(255,255,255,0.75)" strokeWidth={2.5} />
    <rect x={18} y={18} width={44} height={44} rx={10} fill="rgba(255,255,255,0.2)" />
    <line x1={22} y1={30} x2={30} y2={20} stroke="rgba(255,255,255,0.9)" strokeWidth={4} strokeLinecap="round" />
  </svg>
);

/** Creamy foam sphere for macro cleansing visuals. */
export const FoamBall: React.FC<{ x: number; y: number; r: number; opacity?: number }> = ({ x, y, r, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      opacity,
      background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FFFFFF 45%, #EEF2F6 75%, #DCE3EA 100%)',
      boxShadow: '0 6px 14px rgba(40,60,80,0.10)',
    }}
  />
);

export type FoamSpec = { x: number; y: number; r: number; delay: number; phase: number };

export const makeFoam = (seed: number, n: number): FoamSpec[] => {
  const rnd = seeded(seed);
  const sizes = [22, 30, 38, 48, 60, 74, 90];
  return Array.from({ length: n }, () => ({
    x: -40 + rnd() * 1160,
    y: 1440 + rnd() * 380,
    r: sizes[Math.floor(rnd() * sizes.length)],
    delay: rnd(),
    phase: rnd() * 6,
  })).sort((a, b) => a.y - b.y);
};

/** Foam bank that builds up with a soft overshoot. */
export const FoamBank: React.FC<{ foam: FoamSpec[]; t: number; start?: number }> = ({ foam, t, start = 0.2 }) => (
  <>
    {foam.map((f, i) => {
      const q = prog(t, start + f.delay, start + 0.6 + f.delay);
      if (q <= 0) return null;
      const r = Math.max(4, f.r * (0.3 + 0.7 * easeBack(q)) * (1 + 0.03 * Math.sin(t * 2 + f.phase)));
      return <FoamBall key={i} x={f.x + 6 * Math.sin(t + f.phase)} y={f.y - 30 * easeOut(q)} r={r} opacity={Math.min(1, q * 2)} />;
    })}
  </>
);
