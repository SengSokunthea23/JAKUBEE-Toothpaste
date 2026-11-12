// Minimal information panels and floating product labels (dark frosted glass).
import React from 'react';
import { clamp, easeOut } from '../../lib/anim';
import { ease, lerp } from '../theme';
import { hexA } from './Stage';

/** Dark frosted-glass panel with a top edge highlight. Centred on (x, y). */
export const Glass: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  p: number;
  radius?: number;
  tint?: string;
  children?: React.ReactNode;
  rise?: number;
  border?: string;
}> = ({ x, y, w, h, p, radius = 28, tint = '#FFFFFF', children, rise = 40, border }) => {
  if (p <= 0) return null;
  const e = ease.outQuint(clamp(p));
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - h / 2 + rise * (1 - e),
        width: w,
        height: h,
        borderRadius: radius,
        opacity: clamp(p * 2),
        filter: e < 0.98 ? `blur(${10 * (1 - e)}px)` : undefined,
        background: `linear-gradient(160deg, ${hexA(tint, 0.16)} 0%, ${hexA(tint, 0.05)} 100%)`,
        border: `1.5px solid ${border ?? hexA(tint, 0.24)}`,
        boxShadow: `inset 0 1.5px 0 ${hexA('#FFFFFF', 0.3)}, 0 24px 60px rgba(0,0,0,0.35)`,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Floating product label: a glowing anchor dot on the product, a leader line
 * that draws out, then a glass chip with the label.
 */
export const FloatLabel: React.FC<{
  t: number;
  at: number;
  ax: number;
  ay: number;
  lx: number;
  ly: number;
  color: string;
  children: React.ReactNode;
  w?: number;
  h?: number;
}> = ({ t, at, ax, ay, lx, ly, color, children, w = 330, h = 104 }) => {
  const p = clamp((t - at) / 0.5);
  if (p <= 0) return null;
  const line = easeOut(clamp((t - at - 0.1) / 0.45));
  const chip = clamp((t - at - 0.35) / 0.6);
  const bob = 5 * Math.sin(t * 1.4 + ax);
  // the leader stops at the chip's near edge, never under its text
  const edgeX = lx + (ax > lx ? w / 2 : -w / 2);
  const ex = lerp(ax, edgeX, line);
  const ey = lerp(ay, ly + bob, line);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <line x1={ax} y1={ay} x2={ex} y2={ey} stroke={hexA(color, 0.75)} strokeWidth={1.5} />
        <circle cx={ax} cy={ay} r={7 * easeOut(p)} fill="#FFFFFF" />
        <circle cx={ax} cy={ay} r={7 + 16 * ((t * 0.9) % 1)} fill="none" stroke={hexA(color, 0.7 * (1 - ((t * 0.9) % 1)))} strokeWidth={2} />
      </svg>
      <Glass x={lx} y={ly + bob} w={w} h={h} p={chip} radius={h / 2} rise={20} tint={color}>
        {children}
      </Glass>
    </>
  );
};
