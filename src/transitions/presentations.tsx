// Custom brand transitions for @remotion/transitions' <TransitionSeries>.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions';
import { easeInOut } from '../lib/anim';
import { HEIGHT, WIDTH } from '../lib/theme';

type NoProps = Record<string, never>;
type P = TransitionPresentationComponentProps<NoProps>;

/** Water-ripple: circular reveal from the product centre with two fading rings. */
const Ripple: React.FC<P> = ({ children, presentationDirection, presentationProgress }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill>{children}</AbsoluteFill>;
  const e = easeInOut(presentationProgress);
  const r = e * 1250;
  const a = 1 - presentationProgress;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 540px 1000px)` }}>{children}</AbsoluteFill>
      {presentationProgress < 1 && (
        <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute' }}>
          <circle cx={540} cy={1000} r={r} fill="none" stroke={`rgba(255,255,255,${0.67 * a})`} strokeWidth={8} />
          <circle cx={540} cy={1000} r={r * 0.85} fill="none" stroke={`rgba(255,255,255,${0.35 * a})`} strokeWidth={3} />
        </svg>
      )}
    </AbsoluteFill>
  );
};

/** Liquid wave rising from the bottom. */
const Wave: React.FC<P> = ({ children, presentationDirection, presentationProgress }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill>{children}</AbsoluteFill>;
  const e = easeInOut(presentationProgress);
  const yb = HEIGHT - e * (HEIGHT + 160);
  const pts: string[] = [];
  for (let x = 0; x <= WIDTH; x += 20) pts.push(`${x}px ${yb + 50 * Math.sin(x / 140 + presentationProgress * 6)}px`);
  const poly = `polygon(${[...pts, `${WIDTH}px ${HEIGHT}px`, `0px ${HEIGHT}px`].join(', ')})`;
  return <AbsoluteFill style={{ clipPath: poly }}>{children}</AbsoluteFill>;
};

/** Split: left half drops from the top, right half rises from the bottom. */
const Split: React.FC<P> = ({ children, presentationDirection, presentationProgress }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill>{children}</AbsoluteFill>;
  const e = easeInOut(presentationProgress);
  const a = HEIGHT * e;
  const b = HEIGHT * (1 - e);
  const path = `path('M0 0 H540 V${a} H0 Z M540 ${b} H1080 V${HEIGHT} H540 Z')`;
  return <AbsoluteFill style={{ clipPath: path }}>{children}</AbsoluteFill>;
};

/** Diagonal directional wipe, left → right. */
const Wipe: React.FC<P> = ({ children, presentationDirection, presentationProgress }) => {
  if (presentationDirection === 'exiting') return <AbsoluteFill>{children}</AbsoluteFill>;
  const x = -500 + easeInOut(presentationProgress) * (WIDTH + 1000);
  return <AbsoluteFill style={{ clipPath: `polygon(0px 0px, ${x + 250}px 0px, ${x - 250}px ${HEIGHT}px, 0px ${HEIGHT}px)` }}>{children}</AbsoluteFill>;
};

/** Soft cross-dissolve. */
const Fade: React.FC<P> = ({ children, presentationDirection, presentationProgress }) => (
  <AbsoluteFill style={{ opacity: presentationDirection === 'entering' ? easeInOut(presentationProgress) : 1 }}>{children}</AbsoluteFill>
);

const make = (component: React.FC<P>) => (): TransitionPresentation<NoProps> => ({ component, props: {} as NoProps });

export const ripple = make(Ripple);
export const wave = make(Wave);
export const split = make(Split);
export const wipe = make(Wipe);
export const softFade = make(Fade);
