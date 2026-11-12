// Cinematic environments: graded backdrop, volumetric beams, studio floor,
// caustics, bokeh, vignette and film grain. Everything is deterministic.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { seeded } from '../../lib/anim';
import { HEIGHT, WIDTH } from '../../lib/theme';
import { LIGHT, Tone } from '../theme';

/* ---------- camera ---------- */

export type Cam = { x: number; y: number; z: number };

/** A depth plane. depth 0 = locked to screen, 1 = moves fully with the camera, >1 = foreground. */
export const Plane: React.FC<{ cam: Cam; depth: number; children: React.ReactNode; blur?: number; style?: React.CSSProperties }> = ({
  cam,
  depth,
  children,
  blur = 0,
  style,
}) => (
  <AbsoluteFill
    style={{
      transform: `translate(${cam.x * depth}px, ${cam.y * depth}px) scale(${1 + (cam.z - 1) * depth})`,
      transformOrigin: '540px 960px',
      filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/* ---------- backdrop ---------- */

type StageProps = {
  tone: Tone;
  t: number;
  /** y of the studio floor horizon; omit for an open environment */
  floorY?: number;
  /** 0→1 master light level (fade up from darkness) */
  light?: number;
  beams?: boolean;
  caustics?: boolean;
  /** dual tone: blue key light from the left, green from the right */
  focusX?: number;
  focusY?: number;
};

export const Stage: React.FC<StageProps> = ({ tone, t, floorY, light = 1, beams = true, caustics = false, focusX = 540, focusY = 860 }) => {
  const L = LIGHT[tone];
  return (
    <AbsoluteFill style={{ backgroundColor: L.edge, overflow: 'hidden' }}>
      <AbsoluteFill style={{ opacity: light }}>
        {/* graded base */}
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 85% 60% at ${focusX}px ${focusY}px, ${L.core} 0%, ${L.mid} 55%, ${L.edge} 100%)`,
          }}
        />
        {tone === 'dual' && (
          <>
            <AbsoluteFill style={{ background: 'radial-gradient(ellipse 60% 55% at 0% 45%, rgba(8,121,201,0.55), transparent 70%)' }} />
            <AbsoluteFill style={{ background: 'radial-gradient(ellipse 60% 55% at 100% 55%, rgba(36,120,73,0.55), transparent 70%)' }} />
          </>
        )}
        {/* top key light */}
        <AbsoluteFill style={{ background: `radial-gradient(ellipse 55% 30% at 540px 0px, ${hexA(L.key, 0.28)}, transparent 75%)` }} />
        {beams && <Beams t={t} color={L.key} />}
        {caustics && <Caustics t={t} color={L.key} />}
        {floorY !== undefined && <Floor y={floorY} color={L.key} />}
      </AbsoluteFill>
      <Vignette />
    </AbsoluteFill>
  );
};

/** Slowly swaying volumetric light shafts from above. */
const Beams: React.FC<{ t: number; color: string }> = ({ t, color }) => {
  const shafts = [
    { x: 300, w: 260, a: -14, o: 0.16, ph: 0 },
    { x: 560, w: 180, a: -6, o: 0.12, ph: 1.7 },
    { x: 820, w: 300, a: 10, o: 0.14, ph: 3.1 },
  ];
  return (
    <>
      {shafts.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: s.x - s.w / 2,
            top: -200,
            width: s.w,
            height: 1700,
            transformOrigin: '50% 0%',
            transform: `rotate(${s.a + 2.2 * Math.sin(t * 0.35 + s.ph)}deg)`,
            background: `linear-gradient(180deg, ${hexA(color, s.o * (0.85 + 0.15 * Math.sin(t * 0.9 + s.ph)))} 0%, ${hexA(color, 0)} 85%)`,
            filter: 'blur(38px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </>
  );
};

/** Underwater light caustics — soft moving light pools. */
const Caustics: React.FC<{ t: number; color: string }> = ({ t, color }) => {
  const rnd = seeded(77);
  const pools = Array.from({ length: 9 }, () => ({ x: rnd() * WIDTH, y: rnd() * 1300, r: 140 + rnd() * 220, sx: 0.2 + rnd() * 0.3, ph: rnd() * 6 }));
  return (
    <>
      {pools.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x + 60 * Math.sin(t * p.sx + p.ph) - p.r,
            top: p.y + 40 * Math.cos(t * p.sx * 1.3 + p.ph) - p.r * 0.5,
            width: p.r * 2,
            height: p.r,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${hexA(color, 0.16)}, transparent 70%)`,
            filter: 'blur(24px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </>
  );
};

/** Seamless studio sweep: brighter floor plane with a soft horizon glow. */
const Floor: React.FC<{ y: number; color: string }> = ({ y, color }) => (
  <>
    <div style={{ position: 'absolute', left: 0, top: y, width: WIDTH, height: HEIGHT - y, background: `linear-gradient(180deg, ${hexA(color, 0.1)} 0%, rgba(0,0,0,0.35) 100%)` }} />
    <div style={{ position: 'absolute', left: 90, top: y - 30, width: WIDTH - 180, height: 60, background: `radial-gradient(ellipse, ${hexA(color, 0.3)}, transparent 70%)`, filter: 'blur(12px)' }} />
  </>
);

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.6 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 75% 62% at 50% 48%, transparent 55%, rgba(0,0,0,${strength}) 100%)`, pointerEvents: 'none' }} />
);

/** Fine animated film grain. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
      <svg width={WIDTH} height={HEIGHT}>
        <filter id={`grain-${frame % 6}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 6} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={WIDTH} height={HEIGHT} filter={`url(#grain-${frame % 6})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Out-of-focus light orbs at a given depth. */
export const Bokeh: React.FC<{ t: number; seed: number; n: number; colors: string[]; blur?: number; size?: [number, number]; opacity?: number; drift?: number }> = ({
  t,
  seed,
  n,
  colors,
  blur = 10,
  size = [30, 110],
  opacity = 1,
  drift = 12,
}) => {
  const rnd = seeded(seed);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = rnd() * WIDTH;
        const y = rnd() * HEIGHT;
        const r = size[0] + rnd() * (size[1] - size[0]);
        const ph = rnd() * 6.28;
        const a = (0.25 + rnd() * 0.45) * opacity * (0.75 + 0.25 * Math.sin(t * 0.8 + ph));
        const c = colors[i % colors.length];
        const yy = (((y - drift * t) % HEIGHT) + HEIGHT) % HEIGHT;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + 18 * Math.sin(t * 0.4 + ph) - r,
              top: yy - r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${hexA(c, 0.55)} 0%, ${hexA(c, 0.25)} 55%, ${hexA(c, 0)} 72%)`,
              border: `1px solid ${hexA(c, 0.25)}`,
              opacity: a,
              filter: `blur(${blur}px)`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </>
  );
};

/** Soft coloured light pool (used for rim fills and pedestals). */
export const Glow: React.FC<{ x: number; y: number; rx: number; ry?: number; color: string; a?: number; blur?: number }> = ({ x, y, rx, ry, color, a = 0.5, blur = 30 }) => {
  const h = ry ?? rx;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - rx,
        top: y - h,
        width: rx * 2,
        height: h * 2,
        borderRadius: '50%',
        background: `radial-gradient(ellipse, ${hexA(color, a)}, ${hexA(color, 0)} 70%)`,
        filter: `blur(${blur}px)`,
        mixBlendMode: 'screen',
      }}
    />
  );
};

/** '#RRGGBB' + alpha → rgba(). */
export const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
};
