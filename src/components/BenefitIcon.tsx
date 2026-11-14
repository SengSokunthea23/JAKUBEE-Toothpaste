// Benefit icons: the original line icons (editorial/ui/Interface Glyph) set in a round porcelain badge
// with the JAKUBEE blue → green ring, the brand colours of the Zesty Lemon and Herbal Mint tubes.
import React from 'react';
import { Glyph, GlyphName } from '../editorial/ui/Interface';

export type BenefitKind = 'tooth' | 'drop' | 'shield' | 'bacteria' | 'spark' | 'wind';

/** Glow colour per icon (used for the soft glow behind an icon on the orbit). */
// colours taken from the tubes: Zesty Lemon aqua and lemon yellow, Herbal Mint green
export const BENEFIT_TILE: Record<BenefitKind, [string, string]> = {
  tooth: ['#8DDDF5', '#0FA4DB'], // Zesty aqua
  drop: ['#FFE07A', '#E5A200'], // lemon yellow
  shield: ['#9ED59A', '#2E8B4A'], // Herbal green
  bacteria: ['#8EE3D6', '#13998C'], // mint teal (between Zesty aqua and Herbal green), so no colour repeats on the cards
  spark: ['#FFE07A', '#E5A200'], // lemon yellow
  wind: ['#8DDDF5', '#0FA4DB'], // Zesty aqua
};

/** Porcelain badge with a blue → green ring and the original line icon in a tube colour. */
export const BenefitIcon: React.FC<{ kind: BenefitKind | string; size: number; t: number; style?: React.CSSProperties }> = ({ kind, size, style }) => {
  const [light, deep] = BENEFIT_TILE[(kind in BENEFIT_TILE ? kind : 'tooth') as BenefitKind];
  const ring = Math.max(2.5, size * 0.035);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        padding: ring,
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #20C9F4, #0879C9 45%, #64A84C)',
        boxShadow: `0 ${size * 0.08}px ${size * 0.22}px rgba(8,60,110,0.22)`,
        flex: 'none',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 28%, #FFFFFF 0%, #FFFFFF 45%, ${light}55 100%)`,
          boxShadow: 'inset 0 -3px 6px rgba(8,121,201,0.12), inset 0 2px 0 rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name={kind as GlyphName} size={size * 0.5} color={deep} stroke={2.4} />
      </div>
    </div>
  );
};
