// Cinematic typography: blur-to-sharp, tracking animation, staggered words,
// sheen price figures. Khmer is never split below word level (keeps shaping intact).
import React from 'react';
import { clamp, easeOut } from '../../lib/anim';
import { FONTS } from '../../lib/theme';
import { ease, lerp } from '../theme';

type Align = 'center' | 'left' | 'right';
const tx = (a: Align) => (a === 'center' ? '-50%' : a === 'right' ? '-100%' : '0%');

/** Positions content with its anchor at (x, y). */
export const Pos: React.FC<{ x: number; y: number; align?: Align; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, align = 'center', children, style }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${tx(align)}, -50%)`, whiteSpace: 'nowrap', ...style }}>{children}</div>
);

/** Blur-to-sharp entrance for any content. p: 0→1. */
export const Focus: React.FC<{ p: number; children: React.ReactNode; blur?: number; rise?: number; scaleFrom?: number; out?: number }> = ({
  p,
  children,
  blur = 18,
  rise = 26,
  scaleFrom = 1.06,
  out = 0,
}) => {
  if (p <= 0) return null;
  const e = ease.outQuint(clamp(p));
  const o = clamp(p * 1.8) * (1 - clamp(out));
  const b = blur * (1 - e) + 14 * clamp(out);
  return (
    <div
      style={{
        display: 'inline-block',
        opacity: o,
        filter: b > 0.3 ? `blur(${b}px)` : undefined,
        transform: `translateY(${rise * (1 - e)}px) scale(${lerp(scaleFrom, 1, e)})`,
      }}
    >
      {children}
    </div>
  );
};

type LatinStyle = { size: number; weight?: 500 | 700 | 800; color?: string; fill?: string; stroke?: string };

const latinCss = ({ size, weight = 800, color = '#FFFFFF', fill, stroke }: LatinStyle): React.CSSProperties => ({
  fontFamily: FONTS.latin,
  fontSize: size,
  fontWeight: weight,
  lineHeight: 1,
  color: fill || stroke ? 'transparent' : color,
  backgroundImage: fill,
  WebkitBackgroundClip: fill ? 'text' : undefined,
  backgroundClip: fill ? 'text' : undefined,
  WebkitTextStroke: stroke ? `2px ${stroke}` : undefined,
});

/**
 * Headline that assembles letter by letter: each glyph sharpens from blur while
 * the tracking tightens from wide to final — the signature cinematic title move.
 */
export const TitleIn: React.FC<
  LatinStyle & { text: string; t: number; at: number; dur?: number; stagger?: number; trackFrom?: number; trackTo?: number; out?: number }
> = ({ text, t, at, dur = 0.9, stagger = 0.045, trackFrom = 40, trackTo = 2, out = 0, ...st }) => {
  const total = clamp((t - at) / (dur + stagger * text.length));
  if (t < at) return null;
  const track = lerp(trackFrom, trackTo, ease.outExpo(total));
  return (
    <span style={{ display: 'inline-block', letterSpacing: track, marginRight: -track, opacity: 1 - clamp(out), filter: out > 0 ? `blur(${12 * out}px)` : undefined }}>
      {Array.from(text).map((ch, i) => {
        const p = clamp((t - at - i * stagger) / dur);
        const e = ease.outQuint(p);
        return (
          <span
            key={i}
            style={{
              ...latinCss(st),
              display: 'inline-block',
              whiteSpace: 'pre',
              opacity: clamp(p * 2),
              filter: e < 0.99 ? `blur(${14 * (1 - e)}px)` : undefined,
              transform: `translateY(${30 * (1 - e)}px)`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};

/** Static Latin text in the theme style. */
export const Lt: React.FC<LatinStyle & { children: React.ReactNode; tracking?: number; style?: React.CSSProperties }> = ({ children, tracking = 0, style, ...st }) => (
  <span style={{ ...latinCss(st), letterSpacing: tracking, marginRight: -tracking, display: 'inline-block', whiteSpace: 'nowrap', ...style }}>{children}</span>
);

/** Small tracked label with a hairline on each side. */
export const Eyebrow: React.FC<{ text: string; p: number; color?: string; size?: number; lines?: boolean }> = ({ text, p, color = 'rgba(255,255,255,0.8)', size = 24, lines = true }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  const lw = 70 * e;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: clamp(p * 2) }}>
      {lines && <div style={{ width: lw, height: 1.5, background: `linear-gradient(90deg, transparent, ${color})` }} />}
      <Lt size={size} weight={700} color={color} tracking={lerp(22, 9, e)}>
        {text}
      </Lt>
      {lines && <div style={{ width: lw, height: 1.5, background: `linear-gradient(90deg, ${color}, transparent)` }} />}
    </div>
  );
};

/** Khmer line. Generous line-height so subscripts never clip. */
export const Kh: React.FC<{ size: number; weight?: 500 | 600 | 700; color?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  size,
  weight = 700,
  color = '#FFFFFF',
  children,
  style,
}) => (
  <span style={{ fontFamily: FONTS.khmer, fontSize: size, fontWeight: weight, color, lineHeight: 1.6, whiteSpace: 'nowrap', display: 'inline-block', ...style }}>{children}</span>
);

/** Khmer caption revealed word by word (split on spaces only), each word sharpening from blur. */
export const KhIn: React.FC<{ text: string; t: number; at: number; size: number; weight?: 500 | 600 | 700; color?: string; stagger?: number; shadow?: boolean }> = ({
  text,
  t,
  at,
  size,
  weight = 700,
  color = '#FFFFFF',
  stagger = 0.12,
  shadow = true,
}) => {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline-flex', gap: size * 0.28, textShadow: shadow ? '0 4px 24px rgba(0,0,0,0.45)' : undefined }}>
      {words.map((w, i) => (
        <Focus key={i} p={(t - at - i * stagger) / 0.7} blur={12} rise={18}>
          <Kh size={size} weight={weight} color={color}>
            {w}
          </Kh>
        </Focus>
      ))}
    </span>
  );
};

/** Big promotional figure: blur-in, scale settle, glow and a passing light sweep. */
export const PriceFigure: React.FC<{ text: string; t: number; at: number; size: number; fill: string; glow?: string; sweepAt?: number }> = ({ text, t, at, size, fill, glow = 'rgba(141,221,245,0.45)', sweepAt }) => {
  const p = clamp((t - at) / 0.9);
  if (p <= 0) return null;
  const e = ease.outExpo(p);
  const sw = sweepAt !== undefined ? clamp((t - sweepAt) / 0.9) : 0;
  const pos = -25 + 150 * sw;
  const band = sw > 0 && sw < 1 ? `linear-gradient(110deg, transparent ${pos - 9}%, rgba(255,255,255,0.95) ${pos}%, transparent ${pos + 9}%), ` : '';
  return (
    <div
      style={{
        display: 'inline-block',
        opacity: clamp(p * 2.5),
        transform: `scale(${lerp(1.25, 1, e)})`,
        filter: `blur(${24 * (1 - e)}px) drop-shadow(0 0 ${40 * e}px ${glow})`,
      }}
    >
      <span style={{ ...latinCss({ size, weight: 800, fill: band + fill }), letterSpacing: -size * 0.03, display: 'inline-block', lineHeight: 0.92, paddingRight: size * 0.03 }}>{text}</span>
    </div>
  );
};

/** Animated hairline rule. */
export const Hairline: React.FC<{ x: number; y: number; w: number; p: number; color?: string; align?: Align }> = ({ x, y, w, p, color = 'rgba(255,255,255,0.55)', align = 'center' }) => {
  const e = easeOut(clamp(p));
  if (e <= 0) return null;
  const width = w * e;
  const left = align === 'center' ? x - width / 2 : align === 'right' ? x - width : x;
  return <div style={{ position: 'absolute', left, top: y, width, height: 1.5, background: `linear-gradient(90deg, transparent, ${color} 20%, ${color} 80%, transparent)` }} />;
};
