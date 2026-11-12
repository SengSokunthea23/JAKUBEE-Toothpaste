// Cinematic transition library. Every transition moves the camera or the light,
// never just a cut-and-wipe: both outgoing and incoming scenes are animated.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions';
import { clamp } from '../lib/anim';
import { HEIGHT, WIDTH } from '../lib/theme';
import { ease, lerp } from './theme';

type NoProps = Record<string, never>;
type P = TransitionPresentationComponentProps<NoProps>;

const io = ease.inOutSine;

/** 1 — Camera push: the outgoing shot pushes in and defocuses, the incoming one settles from a slight overscale into focus. */
const FocusPush: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') {
    const e = ease.inQuad(p);
    return <AbsoluteFill style={{ transform: `scale(${1 + 0.22 * e})`, filter: `blur(${26 * e}px) brightness(${1 + 0.5 * e})` }}>{children}</AbsoluteFill>;
  }
  const e = ease.outQuint(p);
  return (
    <AbsoluteFill style={{ opacity: clamp(p * 2.2), transform: `scale(${lerp(1.14, 1, e)})`, filter: `blur(${22 * (1 - e)}px)` }}>{children}</AbsoluteFill>
  );
};

/** 2 — Liquid wipe: an organic water edge rises diagonally with a bright meniscus line. */
const Liquid: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = io(p);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `translateY(${-90 * e}px)`, filter: `blur(${6 * e}px)` }}>{children}</AbsoluteFill>;
  const edge = (x: number) => HEIGHT + 260 - e * (HEIGHT + 620) + (x / WIDTH) * 260 * (1 - e) + 46 * Math.sin(x / 120 + p * 7) + 22 * Math.sin(x / 47 - p * 11);
  const pts: string[] = [];
  for (let x = 0; x <= WIDTH; x += 18) pts.push(`${x},${edge(x).toFixed(1)}`);
  const poly = `polygon(${pts.map((s) => s.replace(',', 'px ') + 'px').join(', ')}, ${WIDTH}px ${HEIGHT}px, 0px ${HEIGHT}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: poly }}>{children}</AbsoluteFill>
      {p < 1 && (
        <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute' }}>
          <polyline points={pts.join(' ')} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={4} style={{ filter: 'blur(1.5px)' }} />
          <polyline points={pts.join(' ')} fill="none" stroke="rgba(141,221,245,0.5)" strokeWidth={26} style={{ filter: 'blur(14px)' }} />
        </svg>
      )}
    </AbsoluteFill>
  );
};

/**
 * 3 — Colour transformation: the blue key light is washed over by green light (a light wash,
 * never a hue shift — packaging colours stay true) while the green world grows up through it.
 */
const ColorShift: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === 'exiting') {
    const e = io(clamp(p * 1.2));
    return (
      <AbsoluteFill style={{ filter: `blur(${10 * e}px) brightness(${1 - 0.25 * e})`, transform: `scale(${1 + 0.06 * e})` }}>
        {children}
        <AbsoluteFill style={{ background: `radial-gradient(circle at 540px 1150px, rgba(100,168,76,${0.55 * e}), rgba(18,59,42,${0.6 * e}) 75%)`, mixBlendMode: 'soft-light' }} />
        <AbsoluteFill style={{ background: `radial-gradient(circle at 540px 1150px, rgba(185,217,155,${0.25 * e}), transparent 65%)`, mixBlendMode: 'screen' }} />
      </AbsoluteFill>
    );
  }
  const e = io(clamp((p - 0.15) / 0.85));
  const r = e * 1500;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          WebkitMaskImage: `radial-gradient(circle at 540px 1150px, black ${Math.max(0, r - 260)}px, transparent ${r}px)`,
          maskImage: `radial-gradient(circle at 540px 1150px, black ${Math.max(0, r - 260)}px, transparent ${r}px)`,
          filter: `blur(${12 * (1 - e)}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 540px 1150px, rgba(185,217,155,${0.45 * Math.sin(Math.PI * p)}), transparent 60%)`, mixBlendMode: 'screen' }} />
    </AbsoluteFill>
  );
};

/** 4 — Light sweep: a bright diagonal band of light crosses frame and leaves the new scene behind it. */
const LightSweep: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = io(p);
  const x = lerp(-700, WIDTH + 700, e);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ filter: `brightness(${1 + 0.4 * Math.sin(Math.PI * p)})` }}>{children}</AbsoluteFill>;
  const m = `linear-gradient(105deg, black ${x - 220}px, transparent ${x + 40}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m }}>{children}</AbsoluteFill>
      {p < 1 && (
        <AbsoluteFill
          style={{
            background: `linear-gradient(105deg, transparent ${x - 260}px, rgba(255,255,255,0.0) ${x - 160}px, rgba(255,255,255,0.75) ${x - 40}px, rgba(223,245,255,0.35) ${x + 30}px, transparent ${x + 160}px)`,
            mixBlendMode: 'screen',
            filter: 'blur(8px)',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

/** 5 — Iris: a soft circular lens opening from the product centre. */
const Iris: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = io(p);
  if (presentationDirection === 'exiting') return <AbsoluteFill style={{ transform: `scale(${1 + 0.08 * e})`, filter: `brightness(${1 - 0.5 * e}) blur(${4 * e}px)` }}>{children}</AbsoluteFill>;
  const r = e * 1350;
  const m = `radial-gradient(circle at 540px 960px, black ${Math.max(0, r - 120)}px, transparent ${r}px)`;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m, transform: `scale(${lerp(1.1, 1, e)})` }}>{children}</AbsoluteFill>
      {p < 1 && (
        <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute' }}>
          <circle cx={540} cy={960} r={Math.max(0, r - 60)} fill="none" stroke={`rgba(255,255,255,${0.5 * (1 - p)})`} strokeWidth={3} style={{ filter: 'blur(2px)' }} />
        </svg>
      )}
    </AbsoluteFill>
  );
};

/** Horizontal motion-blur SVG filter (CSS blur is radial only). */
const MotionBlur: React.FC<{ id: string; amount: number }> = ({ id, amount }) => (
  <svg width={0} height={0} style={{ position: 'absolute' }}>
    <filter id={id} x="-20%" y="0" width="140%" height="100%">
      <feGaussianBlur stdDeviation={`${amount.toFixed(1)} 0`} />
    </filter>
  </svg>
);

/** 6 — Directional blur slide: whip-pan feel with true horizontal motion blur. */
const BlurSlide: React.FC<P> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = io(p);
  const v = Math.sin(Math.PI * p); // speed curve → blur amount
  if (presentationDirection === 'exiting') {
    const id = `mb-out-${Math.round(p * 100)}`;
    return (
      <AbsoluteFill style={{ transform: `translateX(${-WIDTH * 0.6 * e}px)`, opacity: 1 - clamp((p - 0.5) * 2) }}>
        <MotionBlur id={id} amount={60 * v} />
        <AbsoluteFill style={{ filter: `url(#${id})` }}>{children}</AbsoluteFill>
      </AbsoluteFill>
    );
  }
  const id = `mb-in-${Math.round(p * 100)}`;
  return (
    <AbsoluteFill style={{ transform: `translateX(${WIDTH * 0.6 * (1 - e)}px)`, opacity: clamp(p * 2) }}>
      <MotionBlur id={id} amount={60 * v} />
      <AbsoluteFill style={{ filter: `url(#${id})` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

const make = (component: React.FC<P>) => (): TransitionPresentation<NoProps> => ({ component, props: {} as NoProps });

export const CINE_TRANSITIONS = {
  focusPush: make(FocusPush),
  liquid: make(Liquid),
  colorShift: make(ColorShift),
  lightSweep: make(LightSweep),
  iris: make(Iris),
  blurSlide: make(BlurSlide),
};

export type CineTransition = keyof typeof CINE_TRANSITIONS;
