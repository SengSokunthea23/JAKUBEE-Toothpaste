import React from 'react';

export type IconName = 'sparkle' | 'shield' | 'tooth' | 'bubbles' | 'truck' | 'arrow';

const star = (cx: number, cy: number, r: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.28;
    return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
  }).join(' ');

const TOOTH =
  'M20 12 C 28 6, 40 6, 50 14 C 60 6, 72 6, 80 12 C 90 20, 90 40, 84 52 C 79 62, 78 74, 75 88 C 73 95, 66 96, 63 88 C 60 78, 58 66, 50 66 C 42 66, 40 78, 37 88 C 34 96, 27 95, 25 88 C 22 74, 21 62, 16 52 C 10 40, 10 20, 20 12 Z';

/** Elegant line icons on a 100×100 grid. */
export const Icon: React.FC<{ name: IconName; size: number; color?: string }> = ({ name, size, color = '#FFFFFF' }) => {
  const s = { stroke: color, strokeWidth: 7, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
      {name === 'sparkle' && (
        <>
          <polygon points={star(42, 55, 36)} fill={color} />
          <polygon points={star(78, 22, 15)} fill={color} />
        </>
      )}
      {name === 'shield' && (
        <>
          <path d="M50 6 L88 20 L84 58 Q 74 82 50 94 Q 26 82 16 58 L12 20 Z" {...s} />
          <path d="M32 50 L46 64 L70 36" {...s} />
        </>
      )}
      {name === 'tooth' && (
        <>
          <path d={TOOTH} {...s} />
          <path d="M32 34 Q 34 24, 44 24" {...s} strokeWidth={5} />
        </>
      )}
      {name === 'bubbles' && (
        <>
          <circle cx={38} cy={58} r={26} {...s} />
          <circle cx={72} cy={34} r={15} {...s} />
          <circle cx={74} cy={74} r={10} {...s} />
        </>
      )}
      {name === 'truck' && (
        <>
          <rect x={4} y={26} width={58} height={44} rx={4} {...s} />
          <path d="M62 38 H80 L95 54 V70 H62" {...s} />
          <circle cx={24} cy={74} r={10} {...s} />
          <circle cx={78} cy={74} r={10} {...s} />
        </>
      )}
      {name === 'arrow' && <path d="M15 50 H82 M55 22 L84 50 L55 78" {...s} />}
    </svg>
  );
};
