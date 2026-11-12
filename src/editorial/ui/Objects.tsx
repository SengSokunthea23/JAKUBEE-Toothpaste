// Dimensional objects: blueberries, isometric pedestals, floating icon ecosystem,
// geometric shapes. Premium, soft-lit, never cartoonish.
import React from 'react';
import { Leaf } from '../../components/Decor';
import { hexA } from '../../cinematic/fx/Stage';
import { clamp, seeded } from '../../lib/anim';
import { BLUE, SHADOW, ease, lerp } from '../theme';
import { Glyph, GlyphName } from './Interface';

/** Photographic-style blueberry: dusty bloom, calyx crown, soft key light. */
export const Blueberry: React.FC<{ x: number; y: number; d: number; rotate?: number; blur?: number; opacity?: number }> = ({ x, y, d, rotate = 0, blur = 0, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - d / 2,
      top: y - d / 2,
      width: d,
      height: d * 0.94,
      borderRadius: '50%',
      opacity,
      transform: `rotate(${rotate}deg)`,
      background: [
        'radial-gradient(circle at 30% 26%, rgba(255,255,255,0.55) 0 6%, rgba(255,255,255,0) 22%)',
        'radial-gradient(circle at 50% 50%, rgba(170,180,215,0.35), rgba(170,180,215,0) 70%)', // bloom
        'radial-gradient(circle at 38% 34%, #4B5A9C 0%, #2A3170 42%, #141A45 78%, #0B0F2C 100%)',
      ].join(', '),
      boxShadow: `0 ${d * 0.12}px ${d * 0.25}px rgba(20,26,69,0.30)`,
      filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
    }}
  >
    {/* calyx crown */}
    <svg width={d * 0.34} height={d * 0.34} viewBox="0 0 20 20" style={{ position: 'absolute', left: '50%', top: '18%', marginLeft: -d * 0.17 }}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M10 10 L8.6 3.4 L10 2 L11.4 3.4 Z" fill="#1A1F4A" stroke="rgba(150,160,200,0.6)" strokeWidth={0.6} transform={`rotate(${a} 10 10)`} />
      ))}
      <circle cx={10} cy={10} r={2.2} fill="#0D1030" />
    </svg>
  </div>
);

type Spec = { x: number; y: number; s: number; depth: number; ph: number; v: number };
const specs = (seed: number, n: number, sizes: [number, number], area = { x0: 0, x1: 1080, y0: 0, y1: 1920 }): Spec[] => {
  const r = seeded(seed);
  return Array.from({ length: n }, () => ({
    x: area.x0 + r() * (area.x1 - area.x0),
    y: area.y0 + r() * (area.y1 - area.y0),
    s: sizes[0] + r() * (sizes[1] - sizes[0]),
    depth: r(),
    ph: r() * 6.28,
    v: 0.5 + r(),
  }));
};

/** Floating blueberries at several depths (shallow depth of field). */
export const BerryField: React.FC<{ t: number; seed: number; n: number; p?: number; area?: { x0: number; x1: number; y0: number; y1: number } }> = ({ t, seed, n, p = 1, area }) => (
  <>
    {specs(seed, n, [50, 130], area).map((b, i) => {
      const e = ease.outExpo(clamp(p * 1.3 - b.depth * 0.3));
      return (
        <Blueberry
          key={i}
          x={b.x + 14 * Math.sin(t * 0.6 * b.v + b.ph)}
          y={b.y + 18 * Math.cos(t * 0.5 * b.v + b.ph) + 120 * (1 - e)}
          d={b.s * (0.6 + b.depth * 0.7)}
          rotate={b.ph * 30 + t * 6 * b.v}
          blur={Math.abs(b.depth - 0.55) * 14}
          opacity={e}
        />
      );
    })}
  </>
);

/** Floating leaves at several depths. */
export const LeafCloud: React.FC<{ t: number; seed: number; n: number; p?: number; area?: { x0: number; x1: number; y0: number; y1: number } }> = ({ t, seed, n, p = 1, area }) => (
  <>
    {specs(seed, n, [110, 220], area).map((l, i) => {
      const e = ease.outExpo(clamp(p * 1.3 - l.depth * 0.3));
      return (
        <div key={i} style={{ position: 'absolute', inset: 0, filter: `blur(${Math.abs(l.depth - 0.55) * 14}px)`, opacity: e }}>
          <Leaf x={l.x + 20 * Math.sin(t * 0.5 + l.ph)} y={l.y + 20 * Math.cos(t * 0.45 + l.ph) + 100 * (1 - e)} length={l.s * (0.6 + 0.6 * l.depth)} rotate={l.ph * 57 + 10 * Math.sin(t * 0.7 + l.ph)} dark={i % 2 === 0} />
        </div>
      );
    })}
  </>
);

/** Clear water bead on light backgrounds. */
export const Bead: React.FC<{ x: number; y: number; r: number; tint?: string; opacity?: number; blur?: number }> = ({ x, y, r, tint = BLUE.ice, opacity = 1, blur = 0 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      opacity,
      background: [
        'radial-gradient(circle at 32% 26%, rgba(255,255,255,1) 0 10%, rgba(255,255,255,0) 22%)',
        `radial-gradient(circle at 55% 70%, ${hexA(tint, 0.0)} 0%, ${hexA(tint, 0.25)} 60%, ${hexA(tint, 0.55)} 100%)`,
      ].join(', '),
      border: `1px solid ${hexA(tint, 0.6)}`,
      boxShadow: `0 ${r * 0.3}px ${r * 0.6}px rgba(28,34,48,0.12), inset 0 -${r * 0.2}px ${r * 0.4}px rgba(255,255,255,0.7)`,
      filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
    }}
  />
);

export const BeadField: React.FC<{ t: number; seed: number; n: number; tint?: string; p?: number; rise?: number }> = ({ t, seed, n, tint, p = 1, rise = 18 }) => (
  <>
    {specs(seed, n, [6, 30]).map((b, i) => {
      const y = ((((b.y - rise * b.v * t) % 2040) + 2040) % 2040) - 60;
      return <Bead key={i} x={b.x + 12 * Math.sin(t * 0.7 + b.ph)} y={y} r={b.s * (0.5 + b.depth)} tint={tint} blur={Math.abs(b.depth - 0.5) * 8} opacity={p * (0.5 + 0.5 * b.depth)} />;
    })}
  </>
);

/**
 * Isometric block (pedestal) drawn as three faces. (cx, cy) = centre of the top face.
 * `rise` 0→1 grows the block up out of the floor (assembly).
 */
export const IsoBlock: React.FC<{ cx: number; cy: number; w: number; h: number; top: string; left: string; right: string; rise?: number; opacity?: number }> = ({
  cx,
  cy,
  w,
  h,
  top,
  left,
  right,
  rise = 1,
  opacity = 1,
}) => {
  const hh = h * ease.outExpo(clamp(rise));
  const dx = w / 2;
  const dy = w / 4; // 2:1 isometric
  const ty = cy + (h - hh); // top face moves up as it grows
  const pts = (arr: [number, number][]) => arr.map(([a, b]) => `${a},${b}`).join(' ');
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity }}>
      <polygon points={pts([[cx - dx, ty], [cx, ty + dy], [cx, ty + dy + hh], [cx - dx, ty + hh]])} fill={left} />
      <polygon points={pts([[cx + dx, ty], [cx, ty + dy], [cx, ty + dy + hh], [cx + dx, ty + hh]])} fill={right} />
      <polygon points={pts([[cx, ty - dy], [cx + dx, ty], [cx, ty + dy], [cx - dx, ty]])} fill={top} />
      <polyline points={pts([[cx - dx, ty], [cx, ty + dy], [cx + dx, ty]])} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1.5} />
    </svg>
  );
};

/** Isometric floor plate shadow under a block. */
export const IsoShadow: React.FC<{ cx: number; cy: number; w: number; opacity?: number }> = ({ cx, cy, w, opacity = 1 }) => (
  <div style={{ position: 'absolute', left: cx - w * 0.75, top: cy - w * 0.2, width: w * 1.5, height: w * 0.4, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(28,34,48,0.22), transparent 70%)', filter: 'blur(14px)', opacity }} />
);

/** Floating icon ecosystem: icon chips orbit/float around a centre with connecting lines. */
export const IconCloud: React.FC<{ t: number; p: number; cx: number; cy: number; r: number; icons: GlyphName[]; color: string; bg?: string; size?: number }> = ({
  t,
  p,
  cx,
  cy,
  r,
  icons,
  color,
  bg = 'rgba(255,255,255,0.92)',
  size = 84,
}) => (
  <>
    {icons.map((name, i) => {
      const a = (i / icons.length) * Math.PI * 2 + t * 0.25 - Math.PI / 2;
      const e = ease.outExpo(clamp(p * 1.4 - i * 0.08));
      const rr = r * lerp(0.6, 1, e);
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr * 0.62 + 8 * Math.sin(t * 1.4 + i);
      return (
        <React.Fragment key={i}>
          <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, opacity: 0.5 * e }}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth={1.2} strokeDasharray="3 8" />
          </svg>
          <div
            style={{
              position: 'absolute',
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              borderRadius: size / 2,
              background: bg,
              boxShadow: SHADOW.soft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${e})`,
              opacity: e,
            }}
          >
            <Glyph name={name} size={size * 0.46} color={color} stroke={2} />
          </div>
        </React.Fragment>
      );
    })}
  </>
);

/** Geometric primitives for assembly finales. */
export const Ring: React.FC<{ x: number; y: number; r: number; p: number; color: string; width?: number; dash?: string; rotate?: number }> = ({ x, y, r, p, color, width = 2, dash, rotate = 0 }) => {
  const c = 2 * Math.PI * r;
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dash ?? `${c}`}
        strokeDashoffset={dash ? 0 : c * (1 - ease.outExpo(clamp(p)))}
        opacity={dash ? clamp(p) : 1}
        transform={`rotate(${-90 + rotate} ${x} ${y})`}
      />
    </svg>
  );
};

export const Disc: React.FC<{ x: number; y: number; r: number; p: number; fill: string; shadow?: boolean }> = ({ x, y, r, p, fill, shadow }) => {
  const e = ease.outBack(clamp(p), 1.2);
  if (p <= 0) return null;
  return <div style={{ position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: fill, transform: `scale(${Math.max(0, e)})`, boxShadow: shadow ? SHADOW.card : undefined }} />;
};

export const Square: React.FC<{ x: number; y: number; s: number; p: number; fill: string; rotate?: number; radius?: number }> = ({ x, y, s, p, fill, rotate = 0, radius = 18 }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  return <div style={{ position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: radius, background: fill, opacity: e, transform: `rotate(${rotate + 90 * (1 - e)}deg) scale(${lerp(0.4, 1, e)})` }} />;
};

