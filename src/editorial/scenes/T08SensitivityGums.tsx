import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BENEFIT_TILE, BenefitIcon } from '../../components/BenefitIcon';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { BeadField } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, KhLine, khmer, label } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

const ORBIT = { cx: 540, cy: 744, rx: 390, ry: 120, tilt: -8 }; // headline, tubes, cards and bottom edge are evenly spaced (~135 px)
const ORBIT_ICONS = ['tooth', 'drop', 'shield', 'bacteria', 'spark', 'wind'] as const;

/** Position on the tilted orbit for angle a; depth is 1 at the front (nearest), -1 at the back. */
const onOrbit = (a: number, grow: number) => {
  const x0 = Math.cos(a) * ORBIT.rx * grow;
  const y0 = Math.sin(a) * ORBIT.ry * grow;
  const r = (ORBIT.tilt * Math.PI) / 180;
  return { x: ORBIT.cx + x0 * Math.cos(r) - y0 * Math.sin(r), y: ORBIT.cy + x0 * Math.sin(r) + y0 * Math.cos(r), depth: Math.sin(a) };
};

/**
 * 3D orbit of benefit icons around the tubes: a tilted elliptical path, icons travelling along it with
 * depth (smaller and dimmer at the back, larger and brighter at the front) and a soft light trail.
 * `layer` draws only the back half (behind the tubes) or the front half (in front of them).
 */
const IconOrbit: React.FC<{ t: number; p: number; layer: 'back' | 'front' }> = ({ t, p, layer }) => {
  if (p <= 0) return null;
  const grow = ease.outExpo(p);
  const spin = t * 0.55;
  const path = Array.from({ length: 73 }, (_, i) => onOrbit((i / 72) * Math.PI * 2, grow));
  const half = path.filter((q) => (layer === 'front' ? q.depth >= 0 : q.depth <= 0));
  return (
    <>
      {/* the orbit line itself: brighter in front */}
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <linearGradient id={`orbitLine-${layer}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#20C9F4" stopOpacity="0" />
            <stop offset="0.5" stopColor={layer === 'front' ? '#20C9F4' : '#8DDDF5'} stopOpacity={layer === 'front' ? 0.9 : 0.45} />
            <stop offset="1" stopColor="#64A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* glowing orbit line: a soft blurred glow underneath a crisp gradient line */}
        <polyline points={half.map((q) => `${q.x},${q.y}`).join(' ')} fill="none" stroke={`url(#orbitLine-${layer})`} strokeWidth={layer === 'front' ? 14 : 8} strokeLinecap="round" opacity={0.5 * grow} style={{ filter: 'blur(7px)' }} />
        <polyline points={half.map((q) => `${q.x},${q.y}`).join(' ')} fill="none" stroke={`url(#orbitLine-${layer})`} strokeWidth={layer === 'front' ? 4 : 2.5} strokeLinecap="round" strokeDasharray={layer === 'front' ? undefined : '4 9'} opacity={grow} />
        {/* glowing points running along the line, faster than the icons */}
        {Array.from({ length: 16 }, (_, i) => {
          const a = t * 1.5 + (i / 16) * Math.PI * 2;
          const q = onOrbit(a, grow);
          if ((layer === 'front') !== q.depth >= 0) return null;
          const near = (q.depth + 1) / 2; // 0 back … 1 front
          const tail = Array.from({ length: 6 }, (__, k) => onOrbit(a - k * 0.03, grow));
          return (
            <g key={`pt${i}`} opacity={grow * (0.35 + 0.65 * near)}>
              <polyline points={tail.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#8DDDF5" strokeWidth={3 + 3 * near} strokeLinecap="round" opacity={0.5} />
              <circle cx={q.x} cy={q.y} r={5 + 5 * near} fill={i % 3 === 0 ? '#B9F1C4' : '#BDF1FF'} opacity={0.55} style={{ filter: 'blur(4px)' }} />
              <circle cx={q.x} cy={q.y} r={2.5 + 2.5 * near} fill="#FFFFFF" />
            </g>
          );
        })}
        {/* light trails behind each icon */}
        {ORBIT_ICONS.map((_, i) => {
          const a = spin + (i / ORBIT_ICONS.length) * Math.PI * 2;
          const head = onOrbit(a, grow);
          if ((layer === 'front') !== head.depth >= 0) return null;
          const pts = Array.from({ length: 10 }, (__, k) => onOrbit(a - k * 0.045, grow));
          return <polyline key={i} points={pts.map((q) => `${q.x},${q.y}`).join(' ')} fill="none" stroke="#FFFFFF" strokeWidth={7 + 4 * head.depth} strokeLinecap="round" opacity={0.55 * grow * (0.6 + 0.4 * head.depth)} style={{ filter: 'blur(3px)' }} />;
        })}
      </svg>
      {ORBIT_ICONS.map((kind, i) => {
        const a = spin + (i / ORBIT_ICONS.length) * Math.PI * 2;
        const q = onOrbit(a, grow);
        if ((layer === 'front') !== q.depth >= 0) return null;
        const pop = ease.outBack(prog(p, 0.15 + i * 0.1, 0.65 + i * 0.1));
        const scale = (0.72 + 0.32 * (q.depth + 1) / 2) * pop;
        const size = 96;
        return (
          <div
            key={kind}
            style={{
              position: 'absolute',
              left: q.x - size / 2,
              top: q.y - size / 2,
              transform: `scale(${scale})`,
              opacity: (0.55 + 0.45 * (q.depth + 1) / 2) * Math.min(1, pop * 1.5),
              filter: q.depth < -0.3 ? `blur(${1.5 * (-q.depth - 0.3)}px)` : undefined,
            }}
          >
            {/* soft glow in the icon's own colour, breathing gently */}
            <div
              style={{
                position: 'absolute',
                left: -size * 0.45,
                top: -size * 0.45,
                width: size * 1.9,
                height: size * 1.9,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${BENEFIT_TILE[kind][0]}AA 0%, ${BENEFIT_TILE[kind][1]}44 38%, transparent 68%)`,
                opacity: (0.55 + 0.45 * (q.depth + 1) / 2) * (0.75 + 0.25 * Math.sin(t * 3 + i)),
                filter: 'blur(6px)',
              }}
            />
            <BenefitIcon kind={kind} size={size} t={t} style={{ position: 'relative' }} />
          </div>
        );
      })}
    </>
  );
};

/** 08 — Sensitivity, gum bleeding, gum care, odour bacteria: benefit icons orbit both tubes in 3D + benefit panels. */
export const T08SensitivityGums: React.FC = () => {
  const t = useTime();
  const c = T.gums;
  const enter = ease.outExpo(prog(t, 0.4, 1.4));
  const orbit = prog(t, 0.5, 1.7);
  return (
    <AbsoluteFill>
      <Backdrop mood="white" t={t} />
      <Cam t={t} dur={7} from={1} to={1.04}>
        <BeadField t={t} seed={701} n={10} tint={BLUE.ice} p={0.7} />
        <IconOrbit t={t} p={orbit} layer="back" />
        <Product shot="tube" x={478} y={744 + 80 * (1 - enter)} height={410} rotate={-6} opacity={enter} shadow={false} sweep={prog(t, 1.6, 2.4)} />
        <Product shot="herbal-tube" x={602} y={749 + 80 * (1 - enter)} height={400} rotate={6} opacity={enter} shadow={false} sweep={prog(t, 1.75, 2.55)} />
        <IconOrbit t={t} p={orbit} layer="front" />
      </Cam>
      <At x={540} y={270}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      <At x={540} y={350}>
        <KhLine text={c.kh} t={t} at={0.3} size={56} />
      </At>
      {c.cards.map((card, i) => (
        <Card key={card.en} x={540} y={1150 + i * 150} w={920} h={130} p={prog(t, 1.6 + i * 0.35, 2.4 + i * 0.35)} t={t} float={3} radius={36} padding="0 28px" align="start">
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <BenefitIcon kind={card.icon} size={76} t={t} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={label(card.en, 18, 800, BENEFIT_TILE[card.icon][1], 3)}>{card.en}</span>
              <span style={{ ...khmer(32, 700, INK.charcoal), lineHeight: 1.5 }}>{card.kh}</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0, height: 5, width: `${100 * ease.outExpo(prog(t, 2.0 + i * 0.35, 3.0 + i * 0.35))}%`, background: `linear-gradient(90deg, ${BENEFIT_TILE[card.icon][1]}, ${BENEFIT_TILE[card.icon][0]})`, opacity: 0.9 }} />
        </Card>
      ))}
    </AbsoluteFill>
  );
};
