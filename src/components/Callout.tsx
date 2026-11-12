import React from 'react';
import { easeBack, easeOut, prog } from '../lib/anim';
import { Latin, Reveal } from './Typography';

/**
 * Circular product callout: marker on the product → animated leader line → two-line label.
 */
export const Callout: React.FC<{
  t: number;
  start: number;
  px: number;
  py: number;
  lx: number;
  ly: number;
  big: string;
  small: string;
  accent: string;
  side: 'left' | 'right';
}> = ({ t, start, px, py, lx, ly, big, small, accent, side }) => {
  const p1 = prog(t, start, start + 0.35);
  if (p1 <= 0) return null;
  const p2 = easeOut(prog(t, start + 0.2, start + 0.6));
  const ex = px + (lx - px) * p2;
  const ey = py + (ly - py) * p2;
  const s = 0.4 + 0.6 * easeBack(p1);
  const textX = side === 'left' ? lx - 12 : lx + 12;
  const align = side === 'left' ? 'right' : 'left';
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <line x1={px} y1={py} x2={ex} y2={ey} stroke="#FFFFFF" strokeWidth={2} />
        <g transform={`translate(${px} ${py}) scale(${s})`} opacity={p1}>
          <circle r={16} fill="none" stroke="#FFFFFF" strokeWidth={3} />
          <circle r={5} fill="#FFFFFF" />
        </g>
      </svg>
      <Reveal x={textX} y={ly - 26} p={prog(t, start + 0.45, start + 0.9)} align={align}>
        <Latin size={46} color="#FFFFFF">
          {big}
        </Latin>
      </Reveal>
      <Reveal x={textX} y={ly + 20} p={prog(t, start + 0.55, start + 1.0)} align={align}>
        <Latin size={20} weight={700} color={accent} tracking={6}>
          {small}
        </Latin>
      </Reveal>
    </>
  );
};
