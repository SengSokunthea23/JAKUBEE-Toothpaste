import React from 'react';
import { BRAND_GRADIENT } from '../lib/theme';

/** Floating translucent glass panel, centred on (x, y). */
export const GlassCard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  radius?: number;
  opacity?: number;
  fill?: string;
  border?: string;
  shadow?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ x, y, w, h, radius = 28, opacity = 1, fill = 'rgba(255,255,255,0.75)', border = 'rgba(255,255,255,0.92)', shadow = true, children, style }) => {
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        borderRadius: radius,
        background: fill,
        border: `2px solid ${border}`,
        boxShadow: shadow ? '0 18px 40px rgba(20,35,60,0.16)' : undefined,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Filled circle (brand gradient by default), centred on (x, y). */
export const GradientDot: React.FC<{ x: number; y: number; d: number; gradient?: string; opacity?: number; scale?: number; children?: React.ReactNode }> = ({
  x,
  y,
  d,
  gradient = BRAND_GRADIENT,
  opacity = 1,
  scale = 1,
  children,
}) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: 'absolute',
        left: x - d / 2,
        top: y - d / 2,
        width: d,
        height: d,
        borderRadius: '50%',
        background: gradient,
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );

/** Rotating dashed ring. */
export const DashedRing: React.FC<{ x: number; y: number; r: number; color: string; rotate?: number; opacity?: number; dashes?: number; width?: number }> = ({
  x,
  y,
  r,
  color,
  rotate = 0,
  opacity = 1,
  dashes = 36,
  width = 3,
}) => {
  const c = 2 * Math.PI * r;
  const seg = c / dashes;
  return (
    <svg width={r * 2 + 10} height={r * 2 + 10} style={{ position: 'absolute', left: x - r - 5, top: y - r - 5, transform: `rotate(${rotate}deg)`, opacity }}>
      <circle cx={r + 5} cy={r + 5} r={r} fill="none" stroke={color} strokeWidth={width} strokeDasharray={`${seg * 0.55} ${seg * 0.45}`} />
    </svg>
  );
};
