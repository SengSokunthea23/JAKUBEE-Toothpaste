import React from 'react';
import { BRAND_GRADIENT, FONTS } from '../lib/theme';
import { easeOut } from '../lib/anim';

type LatinProps = {
  size: number;
  weight?: 500 | 700 | 800;
  color?: string;
  tracking?: number; // px
  outline?: string; // outline colour → hollow text
  gradient?: string; // CSS gradient → gradient-filled text
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/** Latin display type (Manrope). */
export const Latin: React.FC<LatinProps> = ({ size, weight = 800, color = '#252A30', tracking = 0, outline, gradient, children, style }) => (
  <span
    style={{
      fontFamily: FONTS.latin,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: tracking,
      lineHeight: 1,
      color: outline || gradient ? 'transparent' : color,
      WebkitTextStroke: outline ? `3px ${outline}` : undefined,
      backgroundImage: gradient,
      WebkitBackgroundClip: gradient ? 'text' : undefined,
      backgroundClip: gradient ? 'text' : undefined,
      whiteSpace: 'nowrap',
      display: 'inline-block',
      paddingRight: tracking ? 0 : undefined,
      marginRight: tracking ? -tracking : undefined, // optical centring with tracking
      ...style,
    }}
  >
    {children}
  </span>
);

/** Gradient-filled Latin type; `shine` (0→1) runs a light sweep across the letters. */
export const GradientLatin: React.FC<Omit<LatinProps, 'gradient'> & { from?: string; to?: string; shine?: number }> = ({ from, to, shine = -1, ...p }) => {
  const base = from && to ? `linear-gradient(90deg, ${from}, ${to})` : BRAND_GRADIENT;
  const pos = -20 + 140 * shine;
  const band = shine > 0 && shine < 1 ? `linear-gradient(115deg, transparent ${pos - 10}%, rgba(255,255,255,0.75) ${pos}%, transparent ${pos + 10}%), ` : '';
  return <Latin {...p} gradient={band + base} />;
};

/** Khmer type (Kantumruy Pro) — generous line-height so stacked glyphs never clip. */
export const Khmer: React.FC<{ size: number; weight?: 500 | 600 | 700; color?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  size,
  weight = 700,
  color = '#252A30',
  children,
  style,
}) => (
  <span style={{ fontFamily: FONTS.khmer, fontSize: size, fontWeight: weight, color, lineHeight: 1.55, whiteSpace: 'nowrap', display: 'inline-block', ...style }}>
    {children}
  </span>
);

/** Small uppercase tracked label. */
export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; tracking?: number }> = ({ children, color = '#6B7178', size = 24, tracking = 9 }) => (
  <Latin size={size} weight={700} color={color} tracking={tracking}>
    {children}
  </Latin>
);

/**
 * Editorial mask reveal: content slides up inside its own clipping box.
 * `p` is 0→1 progress. Position is the anchor point (centre by default).
 */
export const Reveal: React.FC<{
  x: number;
  y: number;
  p: number;
  align?: 'center' | 'left' | 'right';
  children: React.ReactNode;
}> = ({ x, y, p, align = 'center', children }) => {
  if (p <= 0) return null;
  const e = easeOut(p);
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0%';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(${tx}, -50%)`,
        overflow: 'hidden',
        padding: '0.28em 0.25em',
      }}
    >
      <div style={{ transform: `translateY(${(1 - e) * 115}%)`, opacity: Math.min(1, p * 1.6), whiteSpace: 'nowrap', textAlign: align }}>{children}</div>
    </div>
  );
};

/** Absolutely positioned element centred on (x, y). */
export const At: React.FC<{ x: number; y: number; children: React.ReactNode; opacity?: number; scale?: number; rotate?: number; align?: 'center' | 'left' | 'right' }> = ({
  x,
  y,
  children,
  opacity = 1,
  scale = 1,
  rotate = 0,
  align = 'center',
}) => {
  if (opacity <= 0) return null;
  const tx = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0%';
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity, transform: `translate(${tx}, -50%) rotate(${rotate}deg) scale(${scale})`, whiteSpace: 'nowrap' }}>
      {children}
    </div>
  );
};
