import React from 'react';
import { COLORS } from '../lib/theme';
import { GradientDot } from './GlassCard';
import { Icon } from './Icons';

const mix = (a: string, b: string, k: number) => {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - k) + ((pb >> s) & 255) * k);
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
};

/**
 * Stylised route with one dot per province. A delivery truck travels along it
 * and lights the dots (progress 0→1). Not a geographic map, on purpose.
 */
export const DeliveryRoute: React.FC<{ top: number; progress: number; count: number; opacity?: number }> = ({ top, progress, count, opacity = 1 }) => {
  const n = count - 1;
  const xs = Array.from({ length: count }, (_, i) => 110 + (i * 860) / n);
  const ys = Array.from({ length: count }, (_, i) => top + 18 * Math.sin(i * 0.7));
  const lit = progress * n;
  const i0 = Math.min(n - 1, Math.floor(lit));
  const f = Math.min(1, lit - i0);
  const tx = xs[i0] + (xs[i0 + 1] - xs[i0]) * f;
  const ty = ys[i0] + (ys[i0 + 1] - ys[i0]) * f;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <polyline points={xs.map((x, i) => `${x},${ys[i]}`).join(' ')} fill="none" stroke="#E3E7EB" strokeWidth={4} />
        {xs.slice(0, n).map((x, i) => {
          if (i >= lit) return null;
          const ff = Math.min(1, lit - i);
          return <line key={`l${i}`} x1={x} y1={ys[i]} x2={x + (xs[i + 1] - x) * ff} y2={ys[i] + (ys[i + 1] - ys[i]) * ff} stroke={mix(COLORS.royal, COLORS.botanical, i / n)} strokeWidth={4} />;
        })}
        {xs.map((x, i) => {
          const on = i <= lit && progress > 0;
          return <circle key={`d${i}`} cx={x} cy={ys[i]} r={on ? 8 : 6} fill={on ? mix(COLORS.royal, COLORS.botanical, i / n) : COLORS.silver} />;
        })}
      </svg>
      {progress > 0 && (
        <GradientDot x={tx} y={ty - 40} d={52} gradient={COLORS.charcoal}>
          <Icon name="truck" size={32} />
        </GradientDot>
      )}
    </div>
  );
};

export const litCount = (progress: number, count: number) => (progress > 0 ? Math.min(count, Math.round(progress * (count - 1)) + 1) : 0);
