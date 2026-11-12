// Slow-motion ingredient & atmosphere elements for the cinematic theme.
import React from 'react';
import { IceCube, LemonSlice, Leaf } from '../../components/Decor';
import { clamp, easeOut, prog, seeded } from '../../lib/anim';
import { HEIGHT, WIDTH } from '../../lib/theme';
import { hexA } from './Stage';

/** Realistic water bead: refraction, specular highlight and soft shadow. */
export const Droplet: React.FC<{ x: number; y: number; r: number; tint?: string; opacity?: number; blur?: number; stretch?: number }> = ({
  x,
  y,
  r,
  tint = '#8DDDF5',
  opacity = 1,
  blur = 0,
  stretch = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r * stretch,
      width: r * 2,
      height: r * 2 * stretch,
      borderRadius: '50%',
      opacity,
      background: [
        `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.95) 0 9%, rgba(255,255,255,0) 20%)`,
        `radial-gradient(circle at 62% 74%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 38%)`,
        `radial-gradient(circle at 50% 50%, ${hexA(tint, 0.06)} 0%, ${hexA(tint, 0.18)} 62%, ${hexA(tint, 0.5)} 100%)`,
      ].join(', '),
      boxShadow: `inset 0 -${r * 0.18}px ${r * 0.35}px ${hexA(tint, 0.35)}, 0 ${r * 0.25}px ${r * 0.5}px rgba(0,0,0,0.25)`,
      border: `1px solid rgba(255,255,255,0.35)`,
      filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
    }}
  />
);

type FieldItem = { x: number; y: number; s: number; depth: number; ph: number; spin: number; v: number };

const field = (seed: number, n: number, sizes: [number, number]): FieldItem[] => {
  const rnd = seeded(seed);
  return Array.from({ length: n }, () => ({
    x: rnd() * WIDTH,
    y: rnd() * HEIGHT,
    s: sizes[0] + rnd() * (sizes[1] - sizes[0]),
    depth: rnd(),
    ph: rnd() * 6.28,
    spin: -1 + rnd() * 2,
    v: 0.5 + rnd(),
  }));
};

/** Depth → blur (shallow depth of field: near and far both soft, mid sharp). */
const dof = (depth: number, focal = 0.5, amount = 14) => Math.abs(depth - focal) * amount * 2;

/** Rising slow-motion droplets with depth of field. */
export const DropletField: React.FC<{ t: number; seed: number; n: number; tint?: string; speed?: number; opacity?: number; focal?: number }> = ({
  t,
  seed,
  n,
  tint,
  speed = 40,
  opacity = 1,
  focal = 0.55,
}) => (
  <>
    {field(seed, n, [6, 34]).map((d, i) => {
      const scale = 0.5 + d.depth;
      const y = (((d.y - speed * d.v * scale * t) % (HEIGHT + 200)) + HEIGHT + 200) % (HEIGHT + 200) - 100;
      return (
        <Droplet
          key={i}
          x={d.x + 16 * Math.sin(t * 0.6 + d.ph)}
          y={y}
          r={d.s * scale}
          tint={tint}
          blur={dof(d.depth, focal, 10)}
          opacity={opacity * (0.55 + 0.45 * d.depth)}
        />
      );
    })}
  </>
);

/** Floating ice cubes tumbling in slow motion. */
export const IceField: React.FC<{ t: number; seed: number; n: number; opacity?: number }> = ({ t, seed, n, opacity = 1 }) => (
  <>
    {field(seed, n, [70, 170]).map((c, i) => (
      <div key={i} style={{ position: 'absolute', inset: 0, filter: `blur(${dof(c.depth, 0.5, 9)}px)` }}>
        <IceCube x={c.x + 30 * Math.sin(t * 0.3 + c.ph)} y={c.y - 22 * t * c.v} s={c.s * (0.6 + c.depth * 0.8)} rotate={c.ph * 50 + t * 12 * c.spin} opacity={opacity * 0.85} />
      </div>
    ))}
  </>
);

/** Lemon slices from the pack art, drifting deep in the background. */
export const LemonField: React.FC<{ t: number; seed: number; n: number; opacity?: number; blur?: number }> = ({ t, seed, n, opacity = 1, blur = 8 }) => (
  <div style={{ position: 'absolute', inset: 0, filter: `blur(${blur}px)` }}>
    {field(seed, n, [120, 220]).map((c, i) => (
      <LemonSlice key={i} x={c.x} y={c.y - 14 * t * c.v} d={c.s} rotate={c.ph * 40 + t * 8 * c.spin} opacity={opacity * 0.7} />
    ))}
  </div>
);

/** Botanical leaves falling in slow motion with depth of field. */
export const LeafField: React.FC<{ t: number; seed: number; n: number; opacity?: number; focal?: number }> = ({ t, seed, n, opacity = 1, focal = 0.5 }) => (
  <>
    {field(seed, n, [90, 230]).map((l, i) => {
      const y = (((l.y + 26 * l.v * t) % (HEIGHT + 300)) + HEIGHT + 300) % (HEIGHT + 300) - 150;
      return (
        <div key={i} style={{ position: 'absolute', inset: 0, filter: `blur(${dof(l.depth, focal, 12)}px)` }}>
          <Leaf
            x={l.x + 40 * Math.sin(t * 0.5 + l.ph)}
            y={y}
            length={l.s * (0.6 + l.depth * 0.7)}
            rotate={l.ph * 57 + 18 * Math.sin(t * 0.7 + l.ph) * l.spin}
            dark={i % 2 === 0}
            opacity={opacity * (0.6 + 0.4 * l.depth)}
          />
        </div>
      );
    })}
  </>
);

/** Fine glittering dust motes in the light. */
export const Dust: React.FC<{ t: number; seed: number; n: number; color?: string; opacity?: number }> = ({ t, seed, n, color = '#FFFFFF', opacity = 1 }) => (
  <>
    {field(seed, n, [1.5, 4]).map((d, i) => {
      const a = opacity * (0.3 + 0.7 * Math.max(0, Math.sin(t * 1.6 * d.v + d.ph)));
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: d.x + 30 * Math.sin(t * 0.25 + d.ph),
            top: d.y - 10 * t * d.v,
            width: d.s * 2,
            height: d.s * 2,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 ${d.s * 4}px ${color}`,
            opacity: a,
          }}
        />
      );
    })}
  </>
);

/** Expanding water ripple rings on the studio floor (product landing / drop). */
export const FloorRipple: React.FC<{ t: number; at: number; x: number; y: number; color?: string; size?: number }> = ({ t, at, x, y, color = '#FFFFFF', size = 520 }) => (
  <>
    {[0, 0.18, 0.36].map((d, i) => {
      const p = prog(t, at + d, at + d + 1.4);
      if (p <= 0 || p >= 1) return null;
      const r = size * easeOut(p);
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x - r,
            top: y - r * 0.16,
            width: r * 2,
            height: r * 0.32,
            borderRadius: '50%',
            border: `${3 - i}px solid ${hexA(color, 0.5 * (1 - p))}`,
          }}
        />
      );
    })}
  </>
);

/** Creamy micro-foam: clusters of soft white spheres with subsurface tint. */
export const Foam: React.FC<{ t: number; seed: number; n: number; y: number; spread?: number; grow?: number; tint?: string }> = ({ t, seed, n, y, spread = 1160, grow = 1, tint = '#DFF5FF' }) => {
  const rnd = seeded(seed);
  // Micro-foam: many small translucent bubbles over a dense creamy base.
  // Bubbles near the top edge are larger and clearer; deeper ones are small and milky.
  const balls = Array.from({ length: n }, () => {
    const depth = rnd();
    return { x: -40 + rnd() * spread, y: y + depth * 380, r: (6 + rnd() * rnd() * 46) * (1.15 - depth * 0.5), d: rnd(), ph: rnd() * 6, depth };
  }).sort((a, b) => a.y - b.y);
  const g0 = easeOut(clamp(grow));
  return (
    <>
      {/* dense creamy lather body */}
      <div
        style={{
          position: 'absolute',
          left: -120,
          top: y + 60 - 50 * g0,
          width: spread + 240,
          height: 700,
          borderRadius: '50% 50% 0 0 / 22% 22% 0 0',
          background: `linear-gradient(180deg, rgba(255,255,255,0.92) 0%, ${hexA(tint, 0.9)} 45%, rgba(170,205,230,0.85) 100%)`,
          filter: 'blur(14px)',
          opacity: g0,
        }}
      />
      {balls.map((b, i) => {
        const g = clamp(grow * 1.4 - b.d * 0.4);
        if (g <= 0) return null;
        const r = b.r * (0.35 + 0.65 * easeOut(g)) * (1 + 0.03 * Math.sin(t * 2.2 + b.ph));
        const clear = 1 - b.depth; // 1 = glassy bubble at the surface
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: b.x - r,
              top: b.y - 50 * easeOut(g) - r,
              width: r * 2,
              height: r * 2,
              borderRadius: '50%',
              background: [
                `radial-gradient(circle at 33% 28%, rgba(255,255,255,0.98) 0 12%, rgba(255,255,255,0) 26%)`,
                `radial-gradient(circle at 50% 50%, rgba(255,255,255,${0.25 + 0.5 * b.depth}) 0%, ${hexA(tint, 0.35 + 0.45 * b.depth)} 70%, rgba(150,190,220,${0.5 + 0.3 * clear}) 100%)`,
              ].join(', '),
              border: `${Math.max(1, r * 0.05)}px solid rgba(255,255,255,${0.55 + 0.35 * clear})`,
              boxShadow: `inset 0 -${r * 0.15}px ${r * 0.3}px rgba(60,110,160,${0.12 + 0.12 * clear})`,
              opacity: Math.min(1, g * 2),
            }}
          />
        );
      })}
    </>
  );
};

/** Tiny soap bubbles rising out of foam. */
export const MicroBubbles: React.FC<{ t: number; seed: number; n: number; fromY: number; opacity?: number }> = ({ t, seed, n, fromY, opacity = 1 }) => (
  <>
    {field(seed, n, [4, 16]).map((b, i) => {
      const life = ((t * 0.35 * b.v + b.ph / 6.28) % 1 + 1) % 1;
      const y = fromY - life * 900;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: b.x + 20 * Math.sin(t * 2 * b.v + b.ph) - b.s,
            top: y - b.s,
            width: b.s * 2,
            height: b.s * 2,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.8)',
            background: 'radial-gradient(circle at 32% 30%, rgba(255,255,255,0.9) 0 14%, rgba(255,255,255,0.05) 30%)',
            opacity: opacity * Math.sin(Math.PI * life),
          }}
        />
      );
    })}
  </>
);
