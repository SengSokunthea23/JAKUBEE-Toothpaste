// Theme 04 transition library: short, purposeful, digital.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions';
import { clamp } from '../lib/anim';
import { WIDTH } from '../lib/theme';
import { F, ease, hexA, lerp } from './theme';

type NoProps = Record<string, never>;
type P = TransitionPresentationComponentProps<NoProps>;
const io = ease.inOut;

/** Controlled glitch: sliced RGB-split bands and scanlines peak mid-cut, then the new scene locks in. */
const Glitch: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const exiting = presentationDirection === 'exiting';
  const peak = Math.sin(Math.PI * p);
  const show = exiting ? p < 0.5 : p >= 0.5;
  if (!show) return null;
  const j = Math.sin(p * 91) * Math.cos(p * 37);
  const bands = [
    [12, 22, 60],
    [38, 46, -90],
    [61, 70, 120],
    [82, 88, -60],
  ];
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateX(${18 * peak * j}px)`, filter: `saturate(${1 + peak}) contrast(${1 + 0.3 * peak})` }}>{children}</AbsoluteFill>
      {bands.map(([a, b, dx], i) => (
        <AbsoluteFill key={i} style={{ clipPath: `inset(${a + 4 * j}% 0 ${100 - b - 3 * j}% 0)`, transform: `translateX(${dx * peak * (i % 2 ? j : 1)}px)`, filter: `hue-rotate(${i % 2 ? 60 : -40}deg)`, opacity: peak }}>
          {children}
        </AbsoluteFill>
      ))}
      <AbsoluteFill style={{ opacity: peak * 0.7, background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 5px)' }} />
      <AbsoluteFill style={{ opacity: peak * 0.35, background: `linear-gradient(90deg, ${hexA(F.cyan, 0.4)}, transparent 30%, transparent 70%, ${hexA('#FF3B5C', 0.35)})`, mixBlendMode: 'screen' }} />
    </AbsoluteFill>
  );
};

/** Blur-to-focus: the old shot defocuses and brightens; the new one pulls into focus from a soft zoom. */
const Focus: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `blur(${22 * io(p)}px) brightness(${1 + 0.3 * io(p)})`, transform: `scale(${1 + 0.06 * io(p)})` }}>{children}</AbsoluteFill>;
  const e = io(p);
  return <AbsoluteFill style={{ opacity: clamp(p * 1.8), filter: `blur(${22 * (1 - e)}px)`, transform: `scale(${1.08 - 0.08 * e})` }}>{children}</AbsoluteFill>;
};

/** Neon light sweep: a lemon-green blade of light crosses the frame and wipes in the next scene. */
const LightSweep: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `brightness(${1 + 0.4 * Math.sin(Math.PI * p)})` }}>{children}</AbsoluteFill>;
  const x = lerp(-500, WIDTH + 500, io(p));
  const m = `linear-gradient(105deg, black ${x - 160}px, transparent ${x + 40}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(105deg, transparent ${x - 140}px, ${hexA(F.lemon, 0.55)} ${x - 40}px, ${hexA(F.white, 0.9)} ${x}px, ${hexA(F.neon, 0.4)} ${x + 30}px, transparent ${x + 120}px)`, filter: 'blur(10px)', mixBlendMode: 'screen' }} />
    </AbsoluteFill>
  );
};

/** Particle dissolve: the new scene appears through a field of growing dots, the old one falls away into them. */
const Dissolve: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `blur(${6 * io(p)}px)`, opacity: 1 - clamp((p - 0.6) / 0.4) }}>{children}</AbsoluteFill>;
  const r = 34 * io(p);
  const m = `radial-gradient(circle, black ${r}px, transparent ${r + 1.5}px)`;
  const m2 = `radial-gradient(circle, black ${r * 0.8}px, transparent ${r * 0.8 + 1.5}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ WebkitMaskImage: `${m}, ${m2}`, maskImage: `${m}, ${m2}`, WebkitMaskSize: '44px 44px, 31px 31px', maskSize: '44px 44px, 31px 31px', WebkitMaskPosition: '0 0, 13px 17px', maskPosition: '0 0, 13px 17px' }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Directional push with motion blur (a camera whip). */
const Push: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = io(p);
  const blur = 18 * Math.sin(Math.PI * p);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `translateY(${-1920 * 0.35 * e}px) scale(${1 - 0.06 * e})`, filter: `blur(${blur}px)`, opacity: 1 - e * 0.6 }}>{children}</AbsoluteFill>;
  return <AbsoluteFill style={{ transform: `translateY(${1920 * (1 - e)}px)`, filter: `blur(${blur}px)` }}>{children}</AbsoluteFill>;
};

/** Zoom-through: push into the old scene's centre while the new one scales down into place. */
const Zoom: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = io(p);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `scale(${1 + 1.4 * e})`, filter: `blur(${16 * e}px)`, opacity: 1 - clamp((p - 0.4) / 0.6) }}>{children}</AbsoluteFill>;
  return <AbsoluteFill style={{ transform: `scale(${1.5 - 0.5 * e})`, filter: `blur(${16 * (1 - e)}px)`, opacity: clamp(p * 2) }}>{children}</AbsoluteFill>;
};

const make = (C: React.FC<P>) => (): TransitionPresentation<NoProps> => ({ component: C, props: {} as NoProps });

export const FUT_TRANSITIONS = {
  glitch: make(Glitch),
  focus: make(Focus),
  lightSweep: make(LightSweep),
  dissolve: make(Dissolve),
  push: make(Push),
  zoom: make(Zoom),
};
export type FutTransition = keyof typeof FUT_TRANSITIONS;
