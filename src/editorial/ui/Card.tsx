// Floating rounded UI cards — white, soft-shadowed, with 3D entrances.
import React from 'react';
import { clamp } from '../../lib/anim';
import { SHADOW, ease, lerp } from '../theme';

type CardProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** entrance 0→1 */
  p: number;
  /** exit 0→1 */
  out?: number;
  radius?: number;
  t?: number;
  /** gentle floating bob amplitude (px) */
  float?: number;
  /** entrance direction: tilt from below with perspective */
  tilt?: number;
  fill?: string;
  border?: string;
  shadow?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  padding?: number | string;
  align?: 'center' | 'start';
};

export const Card: React.FC<CardProps> = ({
  x,
  y,
  w,
  h,
  p,
  out = 0,
  radius = 36,
  t = 0,
  float = 0,
  tilt = 18,
  fill = 'rgba(255,255,255,0.86)',
  border = 'rgba(255,255,255,0.95)',
  shadow = SHADOW.card,
  children,
  style,
  padding = 0,
  align = 'center',
}) => {
  if (p <= 0 || out >= 1) return null;
  const e = ease.outExpo(clamp(p));
  const o = ease.inOut(clamp(out));
  const bob = float * Math.sin(t * 1.3 + x * 0.01 + y * 0.003);
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, perspective: 1600 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: radius,
          background: fill,
          border: `1.5px solid ${border}`,
          boxShadow: shadow,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          opacity: clamp(p * 2.2) * (1 - o),
          filter: e < 0.98 || o > 0.02 ? `blur(${8 * (1 - e) + 10 * o}px)` : undefined,
          transform: `translateY(${lerp(80, 0, e) + bob - 40 * o}px) rotateX(${tilt * (1 - e)}deg) scale(${lerp(0.9, 1, e) * (1 - 0.05 * o)})`,
          transformOrigin: '50% 100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          padding,
          boxSizing: 'border-box',
          overflow: 'hidden',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Small pill label. */
export const Pill: React.FC<{ children: React.ReactNode; bg?: string; color?: string; border?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  bg = 'rgba(255,255,255,0.9)',
  color = '#1C2230',
  border = 'rgba(28,34,48,0.08)',
  size = 22,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: `${size * 0.45}px ${size * 0.95}px`,
      borderRadius: 999,
      background: bg,
      color,
      border: `1.5px solid ${border}`,
      boxShadow: SHADOW.soft,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Pulsing live indicator dot. */
export const LiveDot: React.FC<{ t: number; color: string; size?: number }> = ({ t, color, size = 12 }) => {
  const k = (t * 1.2) % 1;
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
      <span style={{ position: 'absolute', inset: -size * 0.8 * k, borderRadius: '50%', border: `2px solid ${color}`, opacity: 1 - k }} />
    </span>
  );
};
