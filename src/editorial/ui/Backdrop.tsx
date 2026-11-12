// Soft blurred gradient environments with drifting light blobs.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { hexA } from '../../cinematic/fx/Stage';
import { BLUE, GREEN, INK } from '../theme';

export type Mood = 'warm' | 'blue' | 'green' | 'dual' | 'white' | 'lemon';

const MOODS: Record<Mood, { base: string; blobs: [string, number, number, number, number][] }> = {
  // [colour, x, y, radius, alpha]
  warm: { base: INK.base, blobs: [[INK.warm, 860, 300, 560, 0.55], [BLUE.ice, 160, 1500, 620, 0.35], [GREEN.sage, 980, 1700, 420, 0.3], [INK.warmSoft, 200, 500, 420, 0.6]] },
  blue: { base: '#EEF6FB', blobs: [[BLUE.ice, 820, 380, 600, 0.75], [BLUE.aqua, 120, 1400, 560, 0.4], [INK.warmSoft, 200, 260, 380, 0.55], [BLUE.pale, 900, 1600, 520, 0.9]] },
  green: { base: '#F1F6EC', blobs: [[GREEN.sage, 220, 400, 620, 0.75], [GREEN.fresh, 960, 1450, 520, 0.35], [INK.warmSoft, 900, 260, 400, 0.6], [GREEN.cream, 160, 1650, 560, 0.9]] },
  dual: { base: INK.base, blobs: [[BLUE.ice, 120, 700, 620, 0.6], [GREEN.sage, 960, 1100, 620, 0.6], [INK.warm, 600, 180, 420, 0.4], [INK.warmSoft, 520, 1750, 480, 0.6]] },
  lemon: { base: '#F6F5EF', blobs: [['#FFE27A', 860, 360, 560, 0.55], [BLUE.ice, 160, 1450, 620, 0.55], [INK.warmSoft, 220, 380, 420, 0.7], [BLUE.pale, 900, 1650, 520, 0.9]] },
  white: { base: '#F7F6F3', blobs: [[INK.warmSoft, 860, 260, 520, 0.6], [BLUE.pale, 140, 1500, 560, 0.7], [GREEN.cream, 960, 1600, 500, 0.8]] },
};

/** Warm editorial environment. `drift` adds slow movement; `cam` is a 0→1 push factor for parallax. */
export const Backdrop: React.FC<{ mood: Mood; t: number; drift?: number; children?: React.ReactNode }> = ({ mood, t, drift = 1, children }) => {
  const m = MOODS[mood];
  return (
    <AbsoluteFill style={{ backgroundColor: m.base, overflow: 'hidden' }}>
      {m.blobs.map(([c, x, y, r, a], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x - r + 50 * drift * Math.sin(t * 0.35 + i * 1.7),
            top: y - r + 40 * drift * Math.cos(t * 0.3 + i * 2.1),
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${hexA(c, a)} 0%, ${hexA(c, a * 0.4)} 45%, ${hexA(c, 0)} 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}
      {children}
      {/* soft lens falloff */}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 65% at 50% 45%, transparent 60%, rgba(60,50,40,0.10) 100%)' }} />
    </AbsoluteFill>
  );
};

/** Faint editorial grid that draws itself. */
export const Grid: React.FC<{ p: number; color?: string }> = ({ p, color = 'rgba(28,34,48,0.06)' }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
    {[90, 360, 720, 990].map((x, i) => (
      <line key={x} x1={x} y1={0} x2={x} y2={1920 * Math.min(1, Math.max(0, p * 1.3 - i * 0.1))} stroke={color} strokeWidth={1.5} />
    ))}
    {[260, 1560].map((y, i) => (
      <line key={y} x1={0} y1={y} x2={1080 * Math.min(1, Math.max(0, p * 1.3 - i * 0.15))} y2={y} stroke={color} strokeWidth={1.5} />
    ))}
  </svg>
);

/** A wash of coloured light (used under heroes). */
export const Bloom: React.FC<{ x: number; y: number; r: number; color: string; a?: number }> = ({ x, y, r, color, a = 0.6 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${hexA(color, a)}, ${hexA(color, 0)} 68%)`,
      filter: 'blur(30px)',
    }}
  />
);

/** Camera rig: slow push-in (or pull-out) with optional parallax drift, around frame centre. */
export const Cam: React.FC<{ t: number; dur: number; from?: number; to?: number; dx?: number; dy?: number; children: React.ReactNode }> = ({ t, dur, from = 1, to = 1.05, dx = 0, dy = 0, children }) => {
  const k = Math.min(1, Math.max(0, t / dur));
  const e = -(Math.cos(Math.PI * k) - 1) / 2;
  return (
    <AbsoluteFill style={{ transform: `translate(${dx * e}px, ${dy * e}px) scale(${from + (to - from) * e})`, transformOrigin: '540px 960px' }}>{children}</AbsoluteFill>
  );
};
