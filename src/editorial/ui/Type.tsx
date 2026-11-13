// Editorial typography: masked word reveals, animated underlines, kinetic
// highlighting, Khmer word-level reveals (never split inside a word).
import React from 'react';
import { clamp } from '../../lib/anim';
import { FONTS } from '../../lib/theme';
import { INK, ease, lerp } from '../theme';

type Align = 'center' | 'left' | 'right';

/** Anchor content at (x, y). */
export const At: React.FC<{ x: number; y: number; align?: Align; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, align = 'center', children, style }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0%'}, -50%)`,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

export const latin = (size: number, weight: 500 | 700 | 800 = 800, color: string = INK.charcoal, tracking = 0): React.CSSProperties => ({
  fontFamily: FONTS.latin,
  fontSize: size,
  fontWeight: weight,
  color,
  letterSpacing: tracking,
  lineHeight: 1.02,
  whiteSpace: 'nowrap',
});

export const khmer = (size: number, weight: 500 | 600 | 700 = 700, color: string = INK.charcoal): React.CSSProperties => ({
  fontFamily: FONTS.khmer,
  fontSize: size,
  fontWeight: weight,
  color,
  lineHeight: 1.6,
  whiteSpace: 'nowrap',
});

/** One word rising out of its own mask. */
const MaskWord: React.FC<{ p: number; children: React.ReactNode; style: React.CSSProperties }> = ({ p, children, style }) => {
  const e = ease.outExpo(clamp(p));
  return (
    // The mask is padded in the word's own font size (so descenders like "g" and Khmer subscripts are
    // not clipped), and the negative margins keep the layout exactly where it was.
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', fontSize: style.fontSize, padding: '0.14em 0.04em 0.26em', margin: '-0.14em -0.04em -0.26em' }}>
      <span style={{ ...style, display: 'inline-block', transform: `translateY(${(1 - e) * 110}%)`, opacity: clamp(p * 3) }}>{children}</span>
    </span>
  );
};

/** Large editorial headline: words rise from masks one after another. */
export const Headline: React.FC<{ text: string; t: number; at: number; size: number; color?: string; weight?: 500 | 700 | 800; stagger?: number; tracking?: number; gap?: number }> = ({
  text,
  t,
  at,
  size,
  color = INK.charcoal,
  weight = 800,
  stagger = 0.09,
  tracking = -size * 0.02,
  gap,
}) => (
  <span style={{ display: 'inline-flex', gap: gap ?? size * 0.24 }}>
    {text.split(' ').map((w, i) => (
      <MaskWord key={i} p={(t - at - i * stagger) / 0.7} style={latin(size, weight, color, tracking)}>
        {w}
      </MaskWord>
    ))}
  </span>
);

/** Khmer line revealed word by word (masked rise), split on spaces only. */
export const KhLine: React.FC<{ text: string; t: number; at: number; size: number; color?: string; weight?: 500 | 600 | 700; stagger?: number }> = ({
  text,
  t,
  at,
  size,
  color = INK.charcoal,
  weight = 700,
  stagger = 0.1,
}) => (
  <span style={{ display: 'inline-flex', gap: size * 0.26 }}>
    {text.split(' ').map((w, i) => (
      <MaskWord key={i} p={(t - at - i * stagger) / 0.7} style={khmer(size, weight, color)}>
        {w}
      </MaskWord>
    ))}
  </span>
);

/** Animated underline that draws beneath content (reference-style accent rule). */
export const Underline: React.FC<{ p: number; color: string; children: React.ReactNode; thickness?: number; offset?: number }> = ({ p, color, children, thickness = 8, offset = 4 }) => (
  <span style={{ position: 'relative', display: 'inline-block' }}>
    {children}
    <span
      style={{
        position: 'absolute',
        left: 0,
        bottom: offset,
        height: thickness,
        width: `${100 * ease.outExpo(clamp(p))}%`,
        background: color,
        borderRadius: thickness,
      }}
    />
  </span>
);

/**
 * Kinetic highlighting: a coloured marker sweeps behind each keyword in turn;
 * the active word turns white, earlier ones stay emphasised.
 */
export const Highlight: React.FC<{ words: string[]; t: number; at: number; every?: number; size: number; color: string; khmerFont?: boolean }> = ({
  words,
  t,
  at,
  every = 0.45,
  size,
  color,
  khmerFont = false,
}) => (
  <span style={{ display: 'inline-flex', gap: size * 0.6, alignItems: 'center' }}>
    {words.map((w, i) => {
      const p = clamp((t - at - i * every) / 0.35);
      const e = ease.outExpo(p);
      const base = khmerFont ? khmer(size, 700) : latin(size, 800, INK.charcoal, size * 0.04);
      return (
        <span key={i} style={{ position: 'relative', display: 'inline-block', padding: `${size * 0.12}px ${size * 0.32}px`, opacity: lerp(0.35, 1, clamp(p * 1.5)) }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: size * 0.3, background: color, transformOrigin: '0% 50%', transform: `scaleX(${e})` }} />
          <span style={{ ...base, position: 'relative', color: p > 0.4 ? '#FFFFFF' : INK.charcoal }}>{w}</span>
        </span>
      );
    })}
  </span>
);

/** Strong price typography with blur settle and a light sweep. */
export const Price: React.FC<{ text: string; t: number; at: number; size: number; color?: string; gradient?: string; sweepAt?: number }> = ({ text, t, at, size, color = INK.charcoal, gradient, sweepAt }) => {
  const p = clamp((t - at) / 0.8);
  if (p <= 0) return null;
  const e = ease.outExpo(p);
  const s = sweepAt !== undefined ? clamp((t - sweepAt) / 0.8) : 0;
  const pos = -25 + 150 * s;
  const band = s > 0 && s < 1 ? `linear-gradient(110deg, transparent ${pos - 8}%, rgba(255,255,255,0.95) ${pos}%, transparent ${pos + 8}%), ` : '';
  const fill = gradient ? band + gradient : band ? band + `linear-gradient(${color}, ${color})` : undefined;
  return (
    <span
      style={{
        ...latin(size, 800, color, -size * 0.045),
        lineHeight: 0.9,
        display: 'inline-block',
        opacity: clamp(p * 2.5),
        transform: `scale(${lerp(1.18, 1, e)})`,
        filter: e < 0.98 ? `blur(${18 * (1 - e)}px)` : undefined,
        backgroundImage: fill,
        WebkitBackgroundClip: fill ? 'text' : undefined,
        backgroundClip: fill ? 'text' : undefined,
        WebkitTextFillColor: fill ? 'transparent' : undefined,
        paddingRight: size * 0.05,
      }}
    >
      {text}
    </span>
  );
};

/** Small tracked eyebrow label with a leading accent dash. */
export const Eyebrow: React.FC<{ text: string; p: number; color?: string; dash?: string; size?: number }> = ({ text, p, color = INK.slate, dash, size = 22 }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16, opacity: clamp(p * 2) }}>
      {dash && <span style={{ width: 44 * e, height: 4, borderRadius: 2, background: dash }} />}
      <span style={latin(size, 700, color, lerp(14, 6, e))}>{text}</span>
    </span>
  );
};
