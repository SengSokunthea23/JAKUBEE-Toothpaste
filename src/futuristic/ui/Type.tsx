// Theme 04 typography: kinetic headlines (mask rise + tracking), controlled glitch, technical labels,
// and the Khmer narration caption. Khmer is only ever split on spaces, never inside a word.
import React from 'react';
import { clamp, prog } from '../../lib/anim';
import { F, FONT, ease, hexA } from '../theme';
import { KH_LINE, hasKh } from '../../lib/kh';
import { latinStack } from '../../lib/theme';

export const latin = (size: number, weight: 500 | 700 | 800 = 800, color: string = F.white, tracking = 0): React.CSSProperties => ({
  fontFamily: latinStack(size),
  fontSize: size,
  fontWeight: weight,
  color,
  letterSpacing: tracking,
  lineHeight: 1.04,
  whiteSpace: 'nowrap',
});

/**
 * Small label style for copy that may be Khmer or Latin: Latin keeps its letter-spacing, Khmer gets
 * none (spacing pulls Khmer letters apart) and a comfortable line-height.
 */
export const label = (text: string, size: number, weight: 500 | 700 | 800 = 800, color: string = F.white, tracking = 0): React.CSSProperties =>
  hasKh(text) ? { ...latin(size, weight, color, 0), lineHeight: 1.4 } : latin(size, weight, color, tracking);

export const khmer = (size: number, weight: 500 | 600 | 700 = 600, color: string = F.white): React.CSSProperties => ({
  fontFamily: FONT.khmer,
  fontSize: size,
  fontWeight: weight,
  color,
  lineHeight: 1.6,
  whiteSpace: 'nowrap',
});

/** Absolute anchor: centre (or left/right edge) of its content sits at x, y. */
export const At: React.FC<{ x: number; y: number; align?: 'center' | 'left' | 'right'; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, align = 'center', children, style }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0'}, -50%)`,
      display: 'flex',
      ...style,
    }}
  >
    {children}
  </div>
);

/** One word rising from a mask. Padding is in the word's own font size so descenders are never clipped. */
const Rise: React.FC<{ p: number; style: React.CSSProperties; children: React.ReactNode; glow?: string }> = ({ p, style, children, glow }) => {
  const e = ease.outExpo(clamp(p));
  // The glow is a filter on the mask itself, so it is not clipped into a visible box.
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', fontSize: style.fontSize, padding: '0.16em 0.06em 0.28em', margin: '-0.16em -0.06em -0.28em', filter: glow ? `drop-shadow(0 0 0.18em ${glow})` : undefined }}>
      <span style={{ ...style, display: 'inline-block', transform: `translateY(${(1 - e) * 115}%)`, opacity: clamp(p * 3) }}>{children}</span>
    </span>
  );
};

/** Kinetic headline: words rise in a stagger while the letter-spacing tightens. `accent` words glow neon. */
export const Kinetic: React.FC<{
  text: string;
  t: number;
  at: number;
  size: number;
  color?: string;
  accent?: string[];
  accentColor?: string;
  weight?: 700 | 800;
  stagger?: number;
  track?: [number, number];
}> = ({ text, t, at, size, color = F.white, accent = [], accentColor = F.neon, weight = 800, stagger = 0.08, track = [0.12, 0.01] }) => {
  const k = ease.outExpo(prog(t, at, at + 1.1));
  const tracking = size * (track[0] + (track[1] - track[0]) * k);
  return (
    // mixed Khmer + Latin headlines share one line-height and baseline, so the words sit level
    <span style={{ display: 'inline-flex', gap: size * 0.26, alignItems: 'baseline' }}>
      {text.split(' ').map((w, i) => {
        const hot = accent.includes(w);
        const c = hot ? accentColor : color;
        return (
          <Rise key={i} p={(t - at - i * stagger) / 0.6} style={hasKh(text) ? { ...latin(size, weight, c, 0), lineHeight: KH_LINE } : latin(size, weight, c, tracking)} glow={hot ? hexA(accentColor, 0.5) : undefined}>
            {w}
          </Rise>
        );
      })}
    </span>
  );
};

/**
 * Controlled glitch on a single line: RGB-split ghosts and a sliced offset that only fire in a short window
 * after `at` (and lightly on a few later frames), then settle to clean type.
 */
export const GlitchText: React.FC<{ text: string; t: number; at: number; style: React.CSSProperties; window?: number }> = ({ text, t, at, style: st, window = 0.45 }) => {
  const style: React.CSSProperties = hasKh(text) ? { ...st, letterSpacing: 0, lineHeight: KH_LINE } : st;
  const local = t - at;
  if (local < 0) return null;
  const on = local < window || (local > 1.6 && local < 1.7);
  const j = on ? Math.sin(local * 97) * Math.cos(local * 53) : 0;
  const amp = on ? 14 * (local < window ? 1 - local / window : 0.4) : 0;
  const appear = clamp(local / 0.12);
  return (
    <span style={{ position: 'relative', display: 'inline-block', opacity: appear }}>
      {amp > 0 && (
        <>
          <span style={{ ...style, position: 'absolute', left: 0, top: 0, color: hexA(F.cyan, 0.8), transform: `translate(${-amp * 0.6 + j * 4}px, ${j * 2}px)`, mixBlendMode: 'screen' }}>{text}</span>
          <span style={{ ...style, position: 'absolute', left: 0, top: 0, color: hexA('#FF3B5C', 0.7), transform: `translate(${amp * 0.6 - j * 4}px, ${-j * 2}px)`, mixBlendMode: 'screen' }}>{text}</span>
          <span style={{ ...style, position: 'absolute', left: 0, top: 0, clipPath: `inset(${40 + 20 * j}% 0 ${35 - 15 * j}% 0)`, transform: `translateX(${amp * 1.4 * j}px)` }}>{text}</span>
        </>
      )}
      <span style={{ ...style, display: 'inline-block', clipPath: amp > 0 ? `inset(0 0 ${clamp(0.5 - j) * 8}% 0)` : undefined }}>{text}</span>
    </span>
  );
};

/** Technical label: tiny caps with a neon tick, e.g. "03 / 13 — STAIN CARE". */
export const TechLabel: React.FC<{ text: string; p: number; color?: string; dot?: string }> = ({ text, p, color = F.mist, dot = F.neon }) => {
  const e = ease.outExpo(clamp(p));
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, opacity: e, transform: `translateY(${10 * (1 - e)}px)` }}>
      <span style={{ width: 34 * e, height: 2, background: dot, boxShadow: `0 0 10px ${dot}` }} />
      <span style={hasKh(text) ? { ...latin(23, 700, color, 0), lineHeight: KH_LINE } : latin(19, 700, color, 6)}>{text}</span>
    </span>
  );
};

/**
 * Khmer words appearing one after another (split on spaces only). No mask: each word fades up from a
 * soft blur, so stacked consonants and vowel signs are always drawn complete.
 */
export const KhRise: React.FC<{ text: string; t: number; at: number; size: number; color?: string; weight?: 500 | 600 | 700; stagger?: number }> = ({ text, t, at, size, color = F.white, weight = 600, stagger = 0.08 }) => (
  <span style={{ display: 'inline-flex', gap: size * 0.28 }}>
    {text.split(' ').map((w, i) => {
      const e = ease.outExpo(clamp((t - at - i * stagger) / 0.55));
      return (
        <span key={i} style={{ ...khmer(size, weight, color), display: 'inline-block', opacity: e, transform: `translateY(${18 * (1 - e)}px)`, filter: e < 1 ? `blur(${6 * (1 - e)}px)` : undefined }}>
          {w}
        </span>
      );
    })}
  </span>
);

/**
 * The narration caption: a dark glass bar near the bottom carrying the script line(s) in Khmer,
 * with a neon progress hairline. Lines are given pre-split at spaces.
 */
export const Narration: React.FC<{ lines: string[]; t: number; at: number; y?: number; size?: number; hot?: string }> = ({ lines, t, at, y = 1640, size = 40, hot }) => {
  const p = ease.outExpo(prog(t, at - 0.15, at + 0.45));
  if (p <= 0) return null;
  const h = lines.length * size * 1.62 + 70;
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: y - h / 2,
        height: h,
        borderRadius: 28,
        background: 'linear-gradient(180deg, rgba(21,28,25,0.72), rgba(8,11,10,0.78))',
        border: `1px solid ${hexA(F.neon, 0.22)}`,
        boxShadow: `0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 ${hexA(F.white, 0.08)}`,
        backdropFilter: 'blur(18px)',
        opacity: p,
        transform: `translateY(${24 * (1 - p)}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, height: 2, width: `${100 * ease.inOut(prog(t, at, at + 2.2))}%`, background: `linear-gradient(90deg, ${F.neon}, ${F.lemon})`, boxShadow: `0 0 12px ${F.neon}` }} />
      {lines.map((l, i) => (
        <KhRise key={i} text={l} t={t} at={at + i * 0.18} size={size} color={hot && l.includes(hot) ? F.white : F.soft} weight={i === 0 ? 700 : 600} />
      ))}
    </div>
  );
};
