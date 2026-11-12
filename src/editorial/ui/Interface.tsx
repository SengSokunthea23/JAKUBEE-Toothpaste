// Refined interface elements adapted to beauty advertising: search bar, phone, icons.
import React from 'react';
import { clamp } from '../../lib/anim';
import { INK, SHADOW, ease, lerp } from '../theme';
import { latin } from './Type';

export type GlyphName = 'drop' | 'dot' | 'spark' | 'sun' | 'crack' | 'shield' | 'leaf' | 'bubble' | 'check' | 'truck' | 'search' | 'store' | 'arrow' | 'cool';

/** Minimal line icons on a 24-grid. */
export const Glyph: React.FC<{ name: GlyphName; size: number; color?: string; stroke?: number }> = ({ name, size, color = INK.charcoal, stroke = 1.8 }) => {
  const s = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flex: 'none' }}>
      {name === 'drop' && <path d="M12 3 C 9 8, 6 11, 6 14.5 A6 6 0 0 0 18 14.5 C 18 11, 15 8, 12 3 Z" {...s} />}
      {name === 'dot' && (
        <>
          <circle cx={8} cy={9} r={2.4} {...s} />
          <circle cx={15.5} cy={14.5} r={3.4} {...s} />
          <circle cx={16} cy={6.5} r={1.4} {...s} />
        </>
      )}
      {name === 'spark' && <path d="M12 3 L13.8 10.2 L21 12 L13.8 13.8 L12 21 L10.2 13.8 L3 12 L10.2 10.2 Z" {...s} />}
      {name === 'sun' && (
        <>
          <circle cx={12} cy={12} r={4} {...s} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1={12 + 7 * Math.cos((a * Math.PI) / 180)} y1={12 + 7 * Math.sin((a * Math.PI) / 180)} x2={12 + 9.5 * Math.cos((a * Math.PI) / 180)} y2={12 + 9.5 * Math.sin((a * Math.PI) / 180)} {...s} />
          ))}
        </>
      )}
      {name === 'crack' && <path d="M4 5 L10 10 L8 14 L14 18 L12 21 M10 10 L16 7 M14 18 L20 16" {...s} />}
      {name === 'shield' && (
        <>
          <path d="M12 3 L19.5 6 L19 12.5 Q 17.5 18 12 21 Q 6.5 18 5 12.5 L4.5 6 Z" {...s} />
          <path d="M8.8 12 L11.2 14.4 L15.6 9.8" {...s} />
        </>
      )}
      {name === 'leaf' && (
        <>
          <path d="M5 19 C 5 10, 11 4, 20 4 C 20 13, 14 19, 5 19 Z" {...s} />
          <path d="M5 19 L 14 10" {...s} />
        </>
      )}
      {name === 'bubble' && (
        <>
          <circle cx={9} cy={14} r={5} {...s} />
          <circle cx={17} cy={7.5} r={3} {...s} />
        </>
      )}
      {name === 'check' && <path d="M5 12.5 L10 17 L19 7" {...s} />}
      {name === 'truck' && (
        <>
          <rect x={2.5} y={6} width={12} height={9.5} rx={1.5} {...s} />
          <path d="M14.5 9 H18.5 L21.5 12.5 V15.5 H14.5" {...s} />
          <circle cx={7} cy={17} r={2} {...s} />
          <circle cx={17.5} cy={17} r={2} {...s} />
        </>
      )}
      {name === 'search' && (
        <>
          <circle cx={10.5} cy={10.5} r={6} {...s} />
          <line x1={15} y1={15} x2={20} y2={20} {...s} />
        </>
      )}
      {name === 'store' && (
        <>
          <path d="M4 9 L5.5 4 H18.5 L20 9 Z" {...s} />
          <path d="M5 9 V20 H19 V9 M10 20 V14 H14 V20" {...s} />
        </>
      )}
      {name === 'arrow' && <path d="M5 12 H19 M13 6 L19 12 L13 18" {...s} />}
      {name === 'cool' && (
        <>
          <line x1={12} y1={3} x2={12} y2={21} {...s} />
          <line x1={4.2} y1={7.5} x2={19.8} y2={16.5} {...s} />
          <line x1={4.2} y1={16.5} x2={19.8} y2={7.5} {...s} />
        </>
      )}
    </svg>
  );
};

/** Round icon badge. */
export const IconBadge: React.FC<{ name: GlyphName; size: number; color: string; bg: string }> = ({ name, size, color, bg }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
    <Glyph name={name} size={size * 0.52} color={color} stroke={2} />
  </div>
);

/**
 * Search interface: the bar slides in, each query types out with a caret,
 * then is cleared for the next. `queries` cycle over the given window.
 */
export const SearchBar: React.FC<{ t: number; at: number; queries: string[]; x: number; y: number; w: number; accent: string; per?: number }> = ({ t, at, queries, x, y, w, accent, per = 1.1 }) => {
  const p = clamp((t - at) / 0.6);
  if (p <= 0) return null;
  const e = ease.outExpo(p);
  const local = t - at - 0.45;
  const idx = Math.max(0, Math.min(queries.length - 1, Math.floor(local / per)));
  const q = queries[idx];
  const inQ = local - idx * per;
  const last = idx === queries.length - 1;
  const typed = Math.max(0, Math.min(q.length, Math.floor(inQ / 0.045)));
  const erasing = !last && inQ > per - 0.22;
  const shown = erasing ? q.slice(0, Math.max(0, Math.floor(q.length * (1 - (inQ - (per - 0.22)) / 0.22)))) : q.slice(0, typed);
  const caret = Math.floor(t * 2.2) % 2 === 0;
  const h = 118;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - (w * lerp(0.6, 1, e)) / 2,
        top: y - h / 2,
        width: w * lerp(0.6, 1, e),
        height: h,
        borderRadius: h / 2,
        background: 'rgba(255,255,255,0.94)',
        border: '1.5px solid rgba(255,255,255,1)',
        boxShadow: SHADOW.lift,
        opacity: clamp(p * 2),
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '0 40px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Glyph name="search" size={44} color={accent} stroke={2.4} />
      <span style={{ ...latin(44, 700, INK.charcoal, 3) }}>
        {shown}
        <span style={{ display: 'inline-block', width: 3, height: 46, background: accent, marginLeft: 4, verticalAlign: -6, opacity: caret ? 1 : 0 }} />
      </span>
      <div style={{ marginLeft: 'auto', width: 64, height: 64, borderRadius: 32, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <Glyph name="arrow" size={32} color="#FFFFFF" stroke={2.4} />
      </div>
    </div>
  );
};

/** Generic floating smartphone (no third-party branding). Content renders inside the screen. */
export const Phone: React.FC<{ x: number; y: number; h: number; p: number; t: number; tiltY?: number; children: React.ReactNode }> = ({ x, y, h, p, t, tiltY = -12, children }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  const w = h * 0.49;
  const bob = 8 * Math.sin(t * 1.1);
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - h / 2 + bob, width: w, height: h, perspective: 2400, opacity: clamp(p * 2) }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translateY(${lerp(160, 0, e)}px) rotateY(${lerp(tiltY - 25, tiltY, e)}deg) rotateX(${lerp(14, 4, e)}deg) rotateZ(${lerp(-6, 0, e)}deg)`,
          transformStyle: 'preserve-3d',
          borderRadius: w * 0.16,
          background: 'linear-gradient(145deg, #F4F5F7, #C9CED5 45%, #EEF0F3)',
          boxShadow: `${SHADOW.lift}, inset 0 0 0 2px rgba(255,255,255,0.7)`,
          padding: w * 0.035,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: w * 0.13, background: '#0E1116', padding: w * 0.025, boxSizing: 'border-box' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: w * 0.11, overflow: 'hidden', background: '#FFFFFF' }}>
            {children}
            {/* speaker slot */}
            <div style={{ position: 'absolute', top: w * 0.035, left: '50%', width: w * 0.28, height: w * 0.07, marginLeft: -w * 0.14, borderRadius: w * 0.04, background: '#0E1116' }} />
            {/* glass reflection */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,255,255,0.28) 0%, transparent 32%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
