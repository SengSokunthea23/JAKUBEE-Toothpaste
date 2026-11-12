import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../lib/theme';

type Glow = { color: string; x: number; y: number; r: number; a?: number };

const glowLayer = (g: Glow) =>
  `radial-gradient(circle ${g.r}px at ${g.x}px ${g.y}px, ${hexA(g.color, g.a ?? 0.35)}, transparent)`;

export const hexA = (hex: string, a: number) => {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export const RadialBg: React.FC<{ inner: string; outer: string; cx?: number; cy?: number; glows?: Glow[]; style?: React.CSSProperties }> = ({
  inner,
  outer,
  cx = 540,
  cy = 1000,
  glows = [],
  style,
}) => (
  <AbsoluteFill
    style={{
      background: [...glows.map(glowLayer), `radial-gradient(ellipse 900px 1300px at ${cx}px ${cy}px, ${inner}, ${outer})`].join(', '),
      ...style,
    }}
  />
);

export const IvoryBg: React.FC<{ glows?: Glow[] }> = ({ glows }) => <RadialBg inner="#FFFFFF" outer={COLORS.ivory} cy={950} glows={glows} />;

export const BlueBg: React.FC<{ cx?: number }> = ({ cx = 540 }) => (
  <RadialBg inner={COLORS.royal} outer={COLORS.navy} cx={cx} cy={1050} glows={[{ color: COLORS.aqua, x: cx, y: 1080, r: 620 }]} />
);

export const GreenBg: React.FC<{ cx?: number }> = ({ cx = 540 }) => (
  <RadialBg inner={COLORS.botanical} outer={COLORS.forest} cx={cx} cy={1050} glows={[{ color: COLORS.freshGreen, x: cx, y: 1080, r: 620 }]} />
);

export const FreshBg: React.FC = () => (
  <AbsoluteFill
    style={{
      background: [
        `radial-gradient(circle 420px at 380px 1060px, ${hexA(COLORS.softBlue, 0.9)}, transparent)`,
        `radial-gradient(circle 420px at 700px 1060px, ${hexA('#E9F4E2', 0.9)}, transparent)`,
        'linear-gradient(180deg, #FFFFFF 0%, #F4F7F9 50%, #E6ECF0 100%)',
      ].join(', '),
    }}
  />
);

export const DarkBg: React.FC = () => <RadialBg inner="#3A414A" outer={COLORS.charcoal} cy={800} glows={[{ color: '#5A6470', x: 540, y: 640, r: 460, a: 0.45 }]} />;

export const EndBg: React.FC = () => (
  <AbsoluteFill
    style={{
      background: [
        'radial-gradient(circle 620px at 540px 900px, rgba(255,255,255,0.95), transparent)',
        `linear-gradient(90deg, ${COLORS.softBlue}, ${COLORS.cream})`,
      ].join(', '),
    }}
  />
);

/** Soft coloured glow blob. */
export const GlowBlob: React.FC<{ x: number; y: number; r: number; color: string; a?: number; scale?: number }> = ({ x, y, r, color, a = 0.6, scale = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${hexA(color, a)} 0%, transparent 70%)`,
      transform: `scale(${scale})`,
    }}
  />
);
