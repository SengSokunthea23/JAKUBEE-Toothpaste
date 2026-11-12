// Zesty Lemon objects: refined lemon slices and a glossy dimensional tooth.
import React from 'react';
import { clamp, seeded } from '../../lib/anim';
import { ease } from '../theme';

/** Refined lemon slice: gradient rind, pith ring, translucent juicy segments, specular sheen. */
export const LemonSlice3D: React.FC<{ x: number; y: number; d: number; rotate?: number; blur?: number; opacity?: number; tilt?: number }> = ({
  x,
  y,
  d,
  rotate = 0,
  blur = 0,
  opacity = 1,
  tilt = 0,
}) => {
  const seg = Array.from({ length: 9 }, (_, i) => {
    const a0 = ((i * 40 + 3.5) * Math.PI) / 180;
    const a1 = (((i + 1) * 40 - 3.5) * Math.PI) / 180;
    const ri = 7;
    const ro = 40;
    const p = (r: number, a: number) => `${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
    return `M${p(ri, a0)} L${p(ro, a0)} A${ro} ${ro} 0 0 1 ${p(ro, a1)} L${p(ri, a1)} Z`;
  });
  if (opacity <= 0) return null;
  return (
    <svg
      width={d}
      height={d}
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        left: x - d / 2,
        top: y - d / 2,
        opacity,
        transform: `rotate(${rotate}deg) scaleY(${Math.cos((tilt * Math.PI) / 180).toFixed(3)})`,
        filter: `drop-shadow(0 ${d * 0.06}px ${d * 0.08}px rgba(120,90,0,0.22))${blur > 0.3 ? ` blur(${blur}px)` : ''}`,
        overflow: 'visible',
      }}
    >
      <defs>
        <radialGradient id="lemRind" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#FFE680" />
          <stop offset="0.7" stopColor="#F5C211" />
          <stop offset="1" stopColor="#D99A00" />
        </radialGradient>
        <radialGradient id="lemFlesh" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#FFF6B8" />
          <stop offset="0.6" stopColor="#FFE04D" />
          <stop offset="1" stopColor="#F7C625" />
        </radialGradient>
        <linearGradient id="lemSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.55} />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx={50} cy={50} r={50} fill="url(#lemRind)" />
      <circle cx={50} cy={50} r={45.5} fill="#FFF8DC" />
      <circle cx={50} cy={50} r={42} fill="#FFF1B0" />
      {seg.map((dd, i) => (
        <path key={i} d={dd} fill="url(#lemFlesh)" opacity={0.95} />
      ))}
      {seg.map((dd, i) => (
        <path key={`h${i}`} d={dd} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={0.8} />
      ))}
      <circle cx={50} cy={50} r={4} fill="#FFF8DC" />
      <circle cx={50} cy={50} r={50} fill="url(#lemSheen)" />
    </svg>
  );
};

/** Slow-floating lemon slices at several depths (shallow depth of field). */
export const LemonField: React.FC<{ t: number; seed: number; n: number; p?: number; area?: { x0: number; x1: number; y0: number; y1: number }; size?: [number, number] }> = ({
  t,
  seed,
  n,
  p = 1,
  area = { x0: 0, x1: 1080, y0: 0, y1: 1920 },
  size = [110, 230],
}) => {
  const r = seeded(seed);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = area.x0 + r() * (area.x1 - area.x0);
        const y = area.y0 + r() * (area.y1 - area.y0);
        const s = size[0] + r() * (size[1] - size[0]);
        const depth = r();
        const ph = r() * 6.28;
        const v = 0.5 + r();
        const e = ease.outExpo(clamp(p * 1.3 - depth * 0.3));
        return (
          <LemonSlice3D
            key={i}
            x={x + 16 * Math.sin(t * 0.5 * v + ph)}
            y={y + 18 * Math.cos(t * 0.45 * v + ph) + 120 * (1 - e)}
            d={s * (0.55 + depth * 0.7)}
            rotate={ph * 40 + t * 9 * v}
            tilt={20 + 35 * depth}
            blur={Math.abs(depth - 0.55) * 14}
            opacity={e}
          />
        );
      })}
    </>
  );
};

const TOOTH_PATH =
  'M70 35 C 45 35, 35 60, 40 90 C 45 120, 60 135, 65 170 C 70 200, 85 210, 93 185 L 103 152 C 108 138, 132 138, 137 152 L 147 185 C 155 210, 170 200, 175 170 C 180 135, 195 120, 200 90 C 205 60, 195 35, 170 35 C 150 35, 140 46, 120 46 C 100 46, 90 35, 70 35 Z';

/**
 * Glossy dimensional tooth (illustrative graphic). `stain` 1→0 fades the yellow spots;
 * `shine` 0→1 runs a light sweep across the enamel.
 */
export const Tooth3D: React.FC<{ x: number; y: number; size: number; stain?: number; shine?: number; opacity?: number }> = ({ x, y, size, stain = 0, shine = -1, opacity = 1 }) => {
  if (opacity <= 0) return null;
  const sw = -40 + 340 * shine;
  return (
    <svg
      width={size}
      height={size}
      viewBox="20 20 200 200"
      style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, opacity, overflow: 'visible', filter: 'drop-shadow(0 30px 40px rgba(28,34,48,0.18))' }}
    >
      <defs>
        <radialGradient id="toothBody" cx="0.38" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#F3F7FA" />
          <stop offset="1" stopColor="#C9D6E0" />
        </radialGradient>
        <clipPath id="toothClip">
          <path d={TOOTH_PATH} />
        </clipPath>
        <linearGradient id="toothShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity={0.95} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
        <filter id="stainBlur">
          <feGaussianBlur stdDeviation={6} />
        </filter>
        <filter id="glintBlur">
          <feGaussianBlur stdDeviation={4} />
        </filter>
      </defs>
      <path d={TOOTH_PATH} fill="url(#toothBody)" stroke="rgba(160,180,200,0.6)" strokeWidth={1.5} />
      <g clipPath="url(#toothClip)">
        <g filter="url(#stainBlur)" opacity={clamp(stain)}>
          {[
            [95, 80, 26],
            [150, 95, 22],
            [120, 122, 18],
            [80, 125, 14],
            [165, 68, 12],
          ].map(([cx, cy, rr], i) => (
            <circle key={i} cx={cx} cy={cy} r={rr} fill="rgba(214,170,70,0.6)" />
          ))}
        </g>
        {shine > 0 && shine < 1 && <rect x={sw} y={0} width={70} height={260} fill="url(#toothShine)" transform={`rotate(18 ${sw + 35} 120)`} />}
        <ellipse cx={92} cy={72} rx={16} ry={30} fill="rgba(255,255,255,0.85)" transform="rotate(-20 92 72)" filter="url(#glintBlur)" />
      </g>
    </svg>
  );
};
