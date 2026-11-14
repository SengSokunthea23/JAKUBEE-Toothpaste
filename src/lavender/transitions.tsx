// Theme 05 transitions: soft and editorial. Lavender fade, organic shape wipe, blur-to-focus,
// soft light sweep, grid wipe and a gentle camera push. No glitches, no spins.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions';
import { clamp } from '../lib/anim';
import { HEIGHT, WIDTH } from '../lib/theme';
import { blobPath } from './ui/Stage';
import { L, ease, hexA, lerp } from './theme';

type NoProps = Record<string, never>;
type P = TransitionPresentationComponentProps<NoProps>;
const io = ease.inOut;

/** Lavender gradient fade: the old shot washes into a lilac haze, the new one emerges from it. */
const Fade: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const haze = Math.sin(Math.PI * p);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ opacity: 1 - io(p) * 0.4 }}>{children}<AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, ${hexA(L.white, 0.9 * haze)}, ${hexA(L.lilac, 0.9 * haze)})` }} /></AbsoluteFill>;
  return <AbsoluteFill style={{ opacity: io(p) }}>{children}</AbsoluteFill>;
};

/** Organic shape wipe: a large soft purple blob grows across the frame and reveals the new scene inside it. */
const ShapeWipe: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `scale(${1 + 0.04 * io(p)})` }}>{children}</AbsoluteFill>;
  const r = lerp(0, 1500, io(p));
  const d = blobPath(WIDTH * 0.62, HEIGHT * 0.45, r, p * 6, 2, 0.16);
  const ring = blobPath(WIDTH * 0.62, HEIGHT * 0.45, r * 1.06 + 20, p * 6, 2, 0.16);
  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0 }}>
        <path d={ring} fill={hexA(L.violet, 0.55 * (1 - p))} />
      </svg>
      <AbsoluteFill style={{ clipPath: `path('${d}')` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Blur-to-focus. */
const Focus: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `blur(${18 * io(p)}px)`, transform: `scale(${1 + 0.05 * io(p)})` }}>{children}</AbsoluteFill>;
  const e = io(p);
  return <AbsoluteFill style={{ opacity: clamp(p * 1.8), filter: `blur(${18 * (1 - e)}px)`, transform: `scale(${1.06 - 0.06 * e})` }}>{children}</AbsoluteFill>;
};

/** Soft light sweep: a pale lilac-white band of light crosses diagonally and leaves the new scene behind it. */
const LightSweep: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `brightness(${1 + 0.2 * Math.sin(Math.PI * p)})` }}>{children}</AbsoluteFill>;
  const x = lerp(-500, WIDTH + 500, io(p));
  const m = `linear-gradient(110deg, black ${x - 200}px, transparent ${x + 60}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(110deg, transparent ${x - 180}px, ${hexA(L.lilac, 0.7)} ${x - 60}px, rgba(255,255,255,0.95) ${x}px, ${hexA(L.lemon, 0.35)} ${x + 40}px, transparent ${x + 160}px)`, filter: 'blur(14px)' }} />
    </AbsoluteFill>
  );
};

/** Grid wipe: the new scene appears cell by cell across a fine editorial grid. */
const GridWipe: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ opacity: 1 - clamp((p - 0.7) / 0.3) }}>{children}</AbsoluteFill>;
  const cols = 6, rows = 10;
  const cw = WIDTH / cols, ch = HEIGHT / rows;
  let d = '';
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
    const k = clamp((p * 1.8) - (c + r) / (cols + rows));
    if (k <= 0) continue;
    const s = io(k);
    const x = c * cw + (cw * (1 - s)) / 2, y = r * ch + (ch * (1 - s)) / 2;
    d += `M ${x} ${y} h ${cw * s} v ${ch * s} h ${-cw * s} Z `;
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: d ? `path('${d}')` : 'inset(50%)' }}>{children}</AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0, opacity: Math.sin(Math.PI * p) * 0.5 }}>
        {Array.from({ length: cols + 1 }, (_, i) => <line key={`v${i}`} x1={i * cw} y1={0} x2={i * cw} y2={HEIGHT} stroke={L.violet} strokeWidth={1} />)}
        {Array.from({ length: rows + 1 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * ch} x2={WIDTH} y2={i * ch} stroke={L.violet} strokeWidth={1} />)}
      </svg>
    </AbsoluteFill>
  );
};

/** Gentle camera push: the old scene drifts up and away, the new one rises in from below. */
const Push: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = io(p);
  const blur = 10 * Math.sin(Math.PI * p);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `translateY(${-HEIGHT * 0.25 * e}px) scale(${1 - 0.05 * e})`, filter: `blur(${blur}px)`, opacity: 1 - e * 0.7 }}>{children}</AbsoluteFill>;
  return <AbsoluteFill style={{ transform: `translateY(${HEIGHT * 0.6 * (1 - e)}px)`, filter: `blur(${blur}px)`, opacity: clamp(p * 2) }}>{children}</AbsoluteFill>;
};

const make = (C: React.FC<P>) => (): TransitionPresentation<NoProps> => ({ component: C, props: {} as NoProps });

export const LAV_TRANSITIONS = {
  fade: make(Fade),
  shape: make(ShapeWipe),
  focus: make(Focus),
  lightSweep: make(LightSweep),
  grid: make(GridWipe),
  push: make(Push),
};
export type LavTransition = keyof typeof LAV_TRANSITIONS;
