// Dark cinematic environments: obsidian backdrop, coloured light pools, perspective grid,
// scanlines, neon particles and a slow camera. Everything is deterministic.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, seeded } from '../../lib/anim';
import { HEIGHT, WIDTH } from '../../lib/theme';
import { F, ease, hexA } from '../theme';

export type Glow = { x: number; y: number; r: number; color: string; a: number };

/** Obsidian backdrop with soft coloured light pools that breathe slowly. */
export const Stage: React.FC<{ t: number; glows?: Glow[]; floor?: boolean }> = ({ t, glows = [], floor = false }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 120% 80% at 50% 45%, ${F.charcoal} 0%, ${F.obsidian} 70%)` }}>
    {glows.map((g, i) => {
      const breathe = 1 + 0.06 * Math.sin(t * 1.1 + i * 1.7);
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: g.x - g.r * breathe,
            top: g.y - g.r * breathe,
            width: 2 * g.r * breathe,
            height: 2 * g.r * breathe,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${hexA(g.color, g.a)} 0%, ${hexA(g.color, g.a * 0.35)} 40%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
      );
    })}
    {floor && <Floor />}
  </AbsoluteFill>
);

/** Glossy floor: a dark reflective plane with a faint horizon line. */
const Floor: React.FC = () => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: 1380, bottom: 0, background: `linear-gradient(180deg, ${hexA(F.white, 0.05)}, transparent 40%)`, borderTop: `1px solid ${hexA(F.white, 0.08)}` }} />
);

/** Perspective grid that draws itself (p 0→1) and drifts forward. */
export const Grid: React.FC<{ t: number; p: number; color?: string; y0?: number; opacity?: number }> = ({ t, p, color = F.neon, y0 = 1150, opacity = 0.5 }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(p);
  const lines = 14;
  const drift = (t * 0.25) % 1;
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', left: 0, top: 0, opacity: opacity * e }}>
      <defs>
        <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity={0} />
          <stop offset="0.35" stopColor={color} stopOpacity={0.35} />
          <stop offset="1" stopColor={color} stopOpacity={0.08} />
        </linearGradient>
      </defs>
      {/* vanishing lines */}
      {Array.from({ length: 21 }, (_, i) => {
        const x = -1200 + i * 174;
        return <line key={`v${i}`} x1={540} y1={y0} x2={540 + (x - 540) * e} y2={HEIGHT + 200} stroke="url(#gridFade)" strokeWidth={1.2} />;
      })}
      {/* receding rows */}
      {Array.from({ length: lines }, (_, i) => {
        const k = (i + drift) / lines;
        const y = y0 + Math.pow(k, 2.2) * (HEIGHT + 200 - y0);
        return <line key={`h${i}`} x1={0} y1={y} x2={WIDTH * e} y2={y} stroke={color} strokeOpacity={0.05 + 0.25 * k} strokeWidth={1} />;
      })}
    </svg>
  );
};

/** Fine horizontal scanlines + a slow bright scan band. */
export const Scanlines: React.FC<{ t: number; opacity?: number }> = ({ t, opacity = 0.22 }) => {
  const band = ((t * 380) % (HEIGHT + 400)) - 200;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill style={{ opacity, background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: band, height: 140, background: `linear-gradient(180deg, transparent, ${hexA(F.neon, 0.035)}, transparent)` }} />
    </AbsoluteFill>
  );
};

/** Vignette that holds the eye on the centre. */
export const Vignette: React.FC<{ a?: number }> = ({ a = 0.75 }) => (
  <AbsoluteFill style={{ pointerEvents: 'none', background: `radial-gradient(ellipse 75% 60% at 50% 48%, transparent 55%, rgba(0,0,0,${a}) 100%)` }} />
);

/** Neon particle field: slow upward drift with twinkle. */
export const Particles: React.FC<{ t: number; seed: number; n: number; colors?: string[]; p?: number; area?: { x0: number; x1: number; y0: number; y1: number }; size?: [number, number]; rise?: number }> = ({
  t,
  seed,
  n,
  colors = [F.neon, F.lemon, F.ice],
  p = 1,
  area = { x0: 0, x1: WIDTH, y0: 0, y1: HEIGHT },
  size = [3, 8],
  rise = 26,
}) => {
  const r = seeded(seed);
  const H = area.y1 - area.y0;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: n }, (_, i) => {
        const x0 = area.x0 + r() * (area.x1 - area.x0);
        const y0 = area.y0 + r() * H;
        const s = size[0] + r() * (size[1] - size[0]);
        const c = colors[Math.floor(r() * colors.length)];
        const ph = r() * 6.28;
        const sp = 0.6 + r() * 0.8;
        const y = area.y0 + ((((y0 - area.y0 - rise * sp * t) % H) + H) % H);
        const x = x0 + 14 * Math.sin(t * 0.7 * sp + ph);
        const tw = 0.45 + 0.55 * Math.abs(Math.sin(t * 1.6 * sp + ph));
        return <div key={i} style={{ position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '50%', background: c, boxShadow: `0 0 ${s * 3}px ${c}`, opacity: p * tw }} />;
      })}
    </AbsoluteFill>
  );
};

/** Slow camera: push/pull + drift over a scene, applied to everything inside. */
export const Cam: React.FC<{ t: number; dur: number; from?: number; to?: number; dx?: number; dy?: number; rot?: number; children: React.ReactNode }> = ({ t, dur, from = 1, to = 1.06, dx = 0, dy = 0, rot = 0, children }) => {
  const k = ease.inOutSine(clamp(t / dur));
  return <AbsoluteFill style={{ transform: `translate(${dx * k}px, ${dy * k}px) scale(${from + (to - from) * k}) rotate(${rot * k}deg)` }}>{children}</AbsoluteFill>;
};

/** Volumetric light beam from above (soft cone). */
export const Beam: React.FC<{ x: number; color: string; a?: number; w?: number; top?: number; h?: number; tilt?: number }> = ({ x, color, a = 0.22, w = 560, top = -200, h = 1500, tilt = 0 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - w / 2,
      top,
      width: w,
      height: h,
      background: `linear-gradient(180deg, ${hexA(color, a)}, ${hexA(color, a * 0.25)} 60%, transparent)`,
      clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)',
      filter: 'blur(26px)',
      transform: `rotate(${tilt}deg)`,
      transformOrigin: '50% 0%',
      mixBlendMode: 'screen',
    }}
  />
);
