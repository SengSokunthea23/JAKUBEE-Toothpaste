// Icons for the tartar causes (cigarette, tea, coffee), designed per theme so each matches its look:
//   commercial — circle filled with the JAKUBEE blue → green gradient, white line icon
//   cinematic  — frosted-glass disc with rim light, white line icon with a soft glow
//   editorial  — lemon-yellow blob behind a charcoal line icon, like a printed layout
//   futuristic — neon hexagon frame, neon line icon with a pulsing glow
import React from 'react';
import { Glyph, GlyphName } from '../editorial/ui/Interface';

export type CauseKind = 'cigarette' | 'tea' | 'coffee';
export type CauseVariant = 'commercial' | 'cinematic' | 'editorial' | 'futuristic' | 'lavender';

/** A colour per cause (cigarette ash grey, tea amber, coffee brown). */
const CAUSE_COLOR: Record<CauseKind, string> = { cigarette: '#5B6470', tea: '#D98A1C', coffee: '#7A4A26' };

export const CauseIcon: React.FC<{ kind: CauseKind | string; size: number; t: number; variant?: CauseVariant }> = ({ kind, size, t, variant = 'commercial' }) => {
  const k = (kind in CAUSE_COLOR ? kind : 'coffee') as CauseKind;
  const g = size * 0.5;

  if (variant === 'lavender') {
    // white porcelain disc with a lilac ring and a purple line icon
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', flex: 'none', padding: 3, boxSizing: 'border-box', background: 'linear-gradient(135deg, #8EE3F5, #0FA4DB)', boxShadow: '0 14px 30px rgba(7,137,191,0.18)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle at 35% 28%, #FFFFFF 0%, #FFFFFF 50%, #E6F6FC 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name={k as GlyphName} size={g} color="#0789BF" stroke={2} />
        </div>
      </div>
    );
  }

  if (variant === 'cinematic') {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          flex: 'none',
          background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 60%)',
          border: '1.5px solid rgba(255,255,255,0.45)',
          boxShadow: '0 0 24px rgba(141,221,245,0.35), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -10px 20px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ filter: 'drop-shadow(0 0 8px rgba(141,221,245,0.9))' }}>
          <Glyph name={k as GlyphName} size={g} color="#FFFFFF" stroke={1.8} />
        </div>
      </div>
    );
  }

  if (variant === 'editorial') {
    return (
      <div style={{ width: size, height: size, position: 'relative', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* organic lemon blob, slightly off-centre like a print accent */}
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
          <path
            d="M52 8 C 74 8, 92 24, 90 48 C 88 72, 72 90, 48 90 C 24 90, 10 74, 12 52 C 14 28, 30 8, 52 8 Z"
            fill="#FFD43B"
            opacity={0.85}
            transform={`rotate(${8 * Math.sin(t * 0.8)} 50 50) translate(4 3)`}
          />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1C2230" strokeWidth="1.5" strokeDasharray="2 6" opacity={0.35} />
        </svg>
        <div style={{ position: 'relative' }}>
          <Glyph name={k as GlyphName} size={g} color="#1C2230" stroke={2.2} />
        </div>
      </div>
    );
  }

  if (variant === 'futuristic') {
    const pulse = 0.6 + 0.4 * Math.sin(t * 3);
    const hex = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${50 + 44 * Math.cos(a)},${50 + 44 * Math.sin(a)}`;
    }).join(' ');
    return (
      <div style={{ width: size, height: size, position: 'relative', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <polygon points={hex} fill="rgba(168,240,68,0.08)" stroke="#A8F044" strokeWidth="2" style={{ filter: `drop-shadow(0 0 ${6 + 6 * pulse}px rgba(168,240,68,0.8))` }} />
          <polygon points={hex} fill="none" stroke="#D9F32A" strokeWidth="1" strokeDasharray="4 8" transform={`rotate(${t * 20} 50 50) scale(0.82) translate(11 11)`} opacity={0.6} />
        </svg>
        <div style={{ position: 'relative', filter: `drop-shadow(0 0 ${5 + 5 * pulse}px rgba(168,240,68,0.9))` }}>
          <Glyph name={k as GlyphName} size={g * 0.95} color="#D9F32A" stroke={2} />
        </div>
      </div>
    );
  }

  // commercial: a circle filled with the JAKUBEE blue → green gradient, white line icon
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        flex: 'none',
        background: 'linear-gradient(135deg, #20C9F4 0%, #0879C9 45%, #64A84C 100%)',
        boxShadow: `0 ${size * 0.08}px ${size * 0.22}px rgba(8,60,110,0.25), inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -4px 8px rgba(0,0,0,0.12)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Glyph name={k as GlyphName} size={g} color="#FFFFFF" stroke={2.2} />
    </div>
  );
};
