// Theme 03 transition library — light, layered and continuous.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions';
import { clamp } from '../lib/anim';
import { HEIGHT, WIDTH } from '../lib/theme';
import { ease, lerp } from './theme';

type NoProps = Record<string, never>;
type P = TransitionPresentationComponentProps<NoProps>;
const io = ease.inOut;

/** Soft light-leak: warm + cool light blooms across frame; scenes cross under the glow. */
const LightLeak: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const glow = Math.sin(Math.PI * p);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `brightness(${1 + 0.35 * glow}) blur(${8 * io(p)}px)`, transform: `scale(${1 + 0.04 * io(p)})` }}>{children}</AbsoluteFill>;
  const x = lerp(-300, WIDTH + 300, io(p));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: io(clamp((p - 0.2) / 0.6)), filter: `blur(${10 * (1 - io(p))}px)` }}>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 520px 900px at ${x}px 700px, rgba(255,214,170,${0.85 * glow}), transparent 70%), radial-gradient(ellipse 420px 700px at ${x - 260}px 1300px, rgba(141,221,245,${0.6 * glow}), transparent 70%)`,
          mixBlendMode: 'screen',
          filter: 'blur(20px)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Soft gradient wipe: a feathered diagonal edge with a tinted leading band. */
const GradientWipe: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `translateX(${-80 * io(p)}px)` }}>{children}</AbsoluteFill>;
  const x = lerp(-600, WIDTH + 600, io(p));
  const m = `linear-gradient(115deg, black ${x - 300}px, transparent ${x + 100}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(115deg, transparent ${x - 200}px, rgba(255,255,255,0.65) ${x - 60}px, rgba(223,245,255,0.4) ${x}px, transparent ${x + 120}px)`, filter: 'blur(14px)' }} />
    </AbsoluteFill>
  );
};

/** Floating-card transition: the outgoing scene shrinks into a rounded card and lifts away; the new one rises in as a card and expands. */
const CardFlip: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') {
    const e = io(clamp(p * 1.3));
    return (
      <AbsoluteFill style={{ perspective: 2200, backgroundColor: '#ECEAE5' }}>
        <AbsoluteFill
          style={{
            transform: `translateY(${-260 * e}px) scale(${1 - 0.25 * e}) rotateX(${14 * e}deg)`,
            borderRadius: 60 * e,
            overflow: 'hidden',
            boxShadow: `0 ${60 * e}px ${120 * e}px rgba(28,34,48,${0.25 * e})`,
            opacity: 1 - clamp((p - 0.55) / 0.45),
          }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }
  const e = io(clamp((p - 0.3) / 0.7));
  return (
    <AbsoluteFill style={{ perspective: 2200 }}>
      <AbsoluteFill
        style={{
          transform: `translateY(${lerp(1100, 0, e)}px) scale(${lerp(0.75, 1, e)}) rotateX(${lerp(-12, 0, e)}deg)`,
          borderRadius: 60 * (1 - e),
          overflow: 'hidden',
          boxShadow: `0 40px 100px rgba(28,34,48,${0.25 * (1 - e)})`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Circular mask reveal from a product point. */
const Circle: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `scale(${1 + 0.06 * io(p)})` }}>{children}</AbsoluteFill>;
  const r = io(p) * 1400;
  const m = `radial-gradient(circle at 540px 980px, black ${Math.max(0, r - 60)}px, transparent ${r}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m }}>{children}</AbsoluteFill>
      {p < 1 && (
        <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute' }}>
          <circle cx={540} cy={980} r={Math.max(0, r - 30)} fill="none" stroke={`rgba(255,255,255,${0.9 * (1 - p)})`} strokeWidth={6} />
        </svg>
      )}
    </AbsoluteFill>
  );
};

/** Blur-to-focus: outgoing defocuses, incoming racks into focus. */
const Focus: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `blur(${24 * io(p)}px)`, transform: `scale(${1 + 0.05 * io(p)})` }}>{children}</AbsoluteFill>;
  const e = ease.outQuint(p);
  return <AbsoluteFill style={{ opacity: clamp(p * 2), filter: `blur(${24 * (1 - e)}px)`, transform: `scale(${lerp(0.96, 1, e)})` }}>{children}</AbsoluteFill>;
};

/** Split-screen reveal: two vertical panels slide in from top and bottom and meet. */
const Split: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `brightness(${1 - 0.2 * io(p)})` }}>{children}</AbsoluteFill>;
  const e = io(p);
  const a = HEIGHT * e;
  const path = `path('M0 0 H540 V${a} H0 Z M540 ${HEIGHT - a} H1080 V${HEIGHT} H540 Z')`;
  return <AbsoluteFill style={{ clipPath: path }}>{children}</AbsoluteFill>;
};

/** Colour transformation: blue world tints green through a soft light wash, green scene focuses in. */
const ColorMorph: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') {
    const e = io(clamp(p * 1.2));
    return (
      <AbsoluteFill style={{ filter: `blur(${12 * e}px)`, transform: `scale(${1 + 0.05 * e})` }}>
        {children}
        <AbsoluteFill style={{ background: `radial-gradient(circle at 540px 1000px, rgba(185,217,155,${0.75 * e}), rgba(100,168,76,${0.5 * e}) 80%)`, mixBlendMode: 'soft-light' }} />
      </AbsoluteFill>
    );
  }
  const e = io(clamp((p - 0.25) / 0.75));
  return <AbsoluteFill style={{ opacity: e, filter: `blur(${14 * (1 - e)}px)` }}>{children}</AbsoluteFill>;
};

/** Camera push: outgoing pushes in, incoming settles from overscale. */
const Push: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `scale(${1 + 0.18 * ease.inOut(p)})`, filter: `blur(${18 * p * p}px)` }}>{children}</AbsoluteFill>;
  const e = ease.outQuint(p);
  return <AbsoluteFill style={{ opacity: clamp(p * 2.5), transform: `scale(${lerp(1.12, 1, e)})`, filter: `blur(${16 * (1 - e)}px)` }}>{children}</AbsoluteFill>;
};

const make = (component: React.FC<P>) => (): TransitionPresentation<NoProps> => ({ component, props: {} as NoProps });

export const ED_TRANSITIONS = {
  lightLeak: make(LightLeak),
  gradientWipe: make(GradientWipe),
  card: make(CardFlip),
  circle: make(Circle),
  focus: make(Focus),
  split: make(Split),
  colorMorph: make(ColorMorph),
  push: make(Push),
};

export type EdTransition = keyof typeof ED_TRANSITIONS;
