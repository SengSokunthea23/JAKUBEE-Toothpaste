// Lavender editorial environments: a soft lavender gradient, slow organic purple shapes, a fine
// editorial grid and a gentle camera. Everything is deterministic.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp } from '../../lib/anim';
import { HEIGHT, WIDTH } from '../../lib/theme';
import { L, ease, hexA } from '../theme';

export type Blob = { x: number; y: number; r: number; color: string; a: number };

/** Organic blob path (a soft, slowly morphing circle). */
export const blobPath = (cx: number, cy: number, r: number, t: number, seed = 0, wobble = 0.12) => {
  const n = 8;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + wobble * Math.sin(t * 0.7 + i * 1.9 + seed) + wobble * 0.5 * Math.cos(t * 0.45 + i * 2.7 + seed * 2);
    return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k];
  });
  let d = '';
  for (let i = 0; i < n; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % n];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += i === 0 ? `M ${(pts[n - 1][0] + x0) / 2} ${(pts[n - 1][1] + y0) / 2} Q ${x0} ${y0} ${mx} ${my}` : ` Q ${x0} ${y0} ${mx} ${my}`;
  }
  return d + ' Z';
};

/** Lavender backdrop with soft organic shapes that breathe slowly. */
export const Stage: React.FC<{ t: number; blobs?: Blob[]; tone?: 'light' | 'deep' }> = ({ t, blobs = [], tone = 'light' }) => (
  <AbsoluteFill
    style={{
      background:
        tone === 'deep'
          ? `radial-gradient(ellipse 110% 80% at 50% 40%, #1E4A5C 0%, ${L.plum} 75%)`
          : `radial-gradient(ellipse 120% 85% at 50% 35%, #FFFFFF 0%, ${L.white} 45%, ${L.lilac} 110%)`,
    }}
  >
    <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <filter id="blobBlur">
          <feGaussianBlur stdDeviation={40} />
        </filter>
      </defs>
      {blobs.map((b, i) => (
        <path key={i} d={blobPath(b.x + 30 * Math.sin(t * 0.3 + i), b.y + 24 * Math.cos(t * 0.25 + i), b.r, t, i * 3)} fill={hexA(b.color, b.a)} filter="url(#blobBlur)" />
      ))}
    </svg>
  </AbsoluteFill>
);

/** Fine editorial grid that draws itself in (p 0→1). */
export const Grid: React.FC<{ p: number; step?: number; color?: string; opacity?: number }> = ({ p, step = 90, color = L.violet, opacity = 0.18 }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  const cols = Math.ceil(WIDTH / step);
  const rows = Math.ceil(HEIGHT / step);
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0, opacity }}>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={i * step} y1={0} x2={i * step} y2={HEIGHT * e} stroke={color} strokeWidth={1} />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * step} x2={WIDTH * e} y2={i * step} stroke={color} strokeWidth={1} />
      ))}
    </svg>
  );
};

/** Slow camera push / drift for the layers inside. */
export const Cam: React.FC<{ t: number; dur: number; from?: number; to?: number; dx?: number; dy?: number; children: React.ReactNode }> = ({ t, dur, from = 1, to = 1.05, dx = 0, dy = 0, children }) => {
  const k = ease.inOutSine(clamp(t / dur));
  return <AbsoluteFill style={{ transform: `translate(${dx * k}px, ${dy * k}px) scale(${from + (to - from) * k})` }}>{children}</AbsoluteFill>;
};

/** Soft round light pool. */
export const Glow: React.FC<{ x: number; y: number; r: number; color: string; a?: number }> = ({ x, y, r, color, a = 0.5 }) => (
  <div style={{ position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: `radial-gradient(circle, ${hexA(color, a)} 0%, ${hexA(color, a * 0.3)} 45%, transparent 70%)`, filter: 'blur(20px)' }} />
);
