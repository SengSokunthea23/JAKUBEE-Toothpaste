// Theme 05 typography: oversized italic serif for Latin words from the script (Zesty Lemon, Fluoride,
// Enamel, Tartar), bold Kantumruy Pro for Khmer headlines, small tracked labels, an animated underline
// and the Khmer narration caption. Khmer is only split on spaces, never inside a word, and never italicised.
import React from 'react';
import { clamp, prog } from '../../lib/anim';
import { hasKh } from '../../lib/kh';
import { FONT, L, ease } from '../theme';

export const At: React.FC<{ x: number; y: number; align?: 'center' | 'left' | 'right'; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, align = 'center', children, style }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0'}, -50%)`, display: 'flex', whiteSpace: 'nowrap', ...style }}>{children}</div>
);

/** Style for one headline word: italic serif for Latin, bold Kantumruy for Khmer. */
const wordStyle = (w: string, size: number, color: string): React.CSSProperties =>
  hasKh(w)
    ? { fontFamily: FONT.khmer, fontWeight: 700, fontSize: size * 0.78, lineHeight: 1.5, color, whiteSpace: 'nowrap' }
    : { fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: size, lineHeight: 1.1, color, whiteSpace: 'nowrap', letterSpacing: -size * 0.01 };

/**
 * Editorial headline: words rise out of soft masks and sharpen from blur in a stagger. Latin words are
 * italic serif; Khmer words are bold Kantumruy. `accent` words take the accent colour.
 */
export const Headline: React.FC<{ text: string; t: number; at: number; size: number; color?: string; accent?: string[]; accentColor?: string; stagger?: number }> = ({
  text,
  t,
  at,
  size,
  color = L.plum,
  accent = [],
  accentColor = L.purple,
  stagger = 0.1,
}) => (
  <span style={{ display: 'inline-flex', gap: size * 0.24, alignItems: 'baseline' }}>
    {text.split(' ').map((w, i) => {
      const e = ease.outExpo(clamp((t - at - i * stagger) / 0.8));
      const c = accent.includes(w) ? accentColor : color;
      return (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', padding: '0.18em 0.08em 0.3em', margin: '-0.18em -0.08em -0.3em' }}>
          <span style={{ ...wordStyle(w, size, c), display: 'inline-block', transform: `translateY(${(1 - e) * 70}%)`, opacity: clamp(e * 1.6), filter: e < 1 ? `blur(${8 * (1 - e)}px)` : undefined }}>{w}</span>
        </span>
      );
    })}
  </span>
);

/** Small tracked label with a short purple rule, e.g. "02 — សម្អាតធ្មេញ". Khmer gets no letter-spacing. */
export const Label: React.FC<{ text: string; p: number; color?: string; rule?: string }> = ({ text, p, color = L.violet, rule = L.purple }) => {
  const e = ease.outExpo(clamp(p));
  const kh = hasKh(text);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, opacity: e, transform: `translateY(${10 * (1 - e)}px)` }}>
      <span style={{ width: 40 * e, height: 2, background: rule }} />
      <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: kh ? 26 : 20, letterSpacing: kh ? 0 : 6, color, lineHeight: kh ? 1.5 : 1, textTransform: kh ? undefined : 'uppercase' }}>{text}</span>
    </span>
  );
};

/** Hand-drawn style underline that draws in under its children, below the deepest Khmer subscript. */
export const Underline: React.FC<{ p: number; color?: string; children: React.ReactNode; gap?: number }> = ({ p, color = L.lemon, children, gap = 2 }) => (
  <span style={{ position: 'relative', display: 'inline-block' }}>
    {children}
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ position: 'absolute', left: '-2%', width: '104%', top: `calc(100% + ${gap}px)`, height: 14, overflow: 'visible' }}>
      <path d="M2 6 C 25 2, 50 9, 98 4" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - ease.outExpo(clamp(p)))} />
    </svg>
  </span>
);

/** Khmer words fading up from a soft blur, one after another (split on spaces only). */
const KhWords: React.FC<{ text: string; t: number; at: number; size: number; color: string; weight: 600 | 700 }> = ({ text, t, at, size, color, weight }) => (
  <span style={{ display: 'inline-flex', gap: size * 0.28 }}>
    {text.split(' ').map((w, i) => {
      const e = ease.outExpo(clamp((t - at - i * 0.07) / 0.5));
      return (
        <span key={i} style={{ fontFamily: FONT.khmer, fontSize: size, fontWeight: weight, color, lineHeight: 1.6, whiteSpace: 'nowrap', display: 'inline-block', opacity: e, transform: `translateY(${14 * (1 - e)}px)`, filter: e < 1 ? `blur(${5 * (1 - e)}px)` : undefined }}>
          {w}
        </span>
      );
    })}
  </span>
);

/**
 * Khmer narration as free editorial typography (no box): a short lemon rule draws in, then the lines
 * appear word by word, the first bold in deep navy, the rest in the accent colour, with a soft white
 * glow so they stay readable over the background.
 */
export const Caption: React.FC<{ lines: string[]; t: number; at: number; y?: number; size?: number; dark?: boolean }> = ({ lines, t, at, y = 1640, size = 40, dark = false }) => {
  const p = ease.outExpo(prog(t, at - 0.15, at + 0.45));
  if (p <= 0) return null;
  const glow = dark ? 'none' : '0 0 18px rgba(255,255,255,0.95), 0 0 6px rgba(255,255,255,0.9)';
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, top: y, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textShadow: glow }}>
      <div style={{ width: 90 * ease.outExpo(prog(t, at - 0.2, at + 0.5)), height: 5, borderRadius: 3, background: `linear-gradient(90deg, ${L.lemon}, ${L.green})`, marginBottom: 14 }} />
      {lines.map((l, i) => (
        <KhWords key={i} text={l} t={t} at={at + i * 0.16} size={i === 0 ? size : size * 0.88} color={dark ? (i === 0 ? L.pure : L.lilac) : i === 0 ? L.plum : L.purple} weight={i === 0 ? 700 : 600} />
      ))}
    </div>
  );
};
