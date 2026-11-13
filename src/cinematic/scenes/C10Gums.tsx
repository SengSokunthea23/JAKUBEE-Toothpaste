import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Glyph } from '../../editorial/ui/Interface';
import { clamp, prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust, LeafField } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage, hexA } from '../fx/Stage';
import { Eyebrow, Kh, Pos } from '../fx/Type';
import { BLUE, GREEN, ease } from '../theme';

const CX = 540;
const CY = 700;

/** 10 — Less sensitivity and gum bleeding; gum care and fewer odour-causing bacteria: a self-drawing protective shield. */
export const C10Gums: React.FC = () => {
  const t = useTime();
  const c = COPY.gums;
  const ring = ease.outQuint(prog(t, 0.15, 1.2));
  const shield = ease.inOutSine(prog(t, 0.4, 1.2));
  const check = ease.outQuint(prog(t, 1.0, 1.5));
  const glow = clamp((t - 1.3) / 0.6);
  const p = ease.outQuint(prog(t, 0.4, 1.4));
  const R = 200;
  const circ = 2 * Math.PI * R;
  const cards = [
    { icon: 'tooth' as const, a: c.kh1, b: c.kh2, at: 1.5 },
    { icon: 'bacteria' as const, a: c.kh3, b: c.kh4, at: 1.95 },
  ];
  return (
    <AbsoluteFill>
      <Stage tone="green" t={t} focusY={CY} />
      <Plane cam={{ x: 0, y: 0, z: 1 + 0.04 * ease.inOutSine(prog(t, 0, 5.2)) }} depth={1}>
        <Bokeh t={t} seed={1001} n={12} colors={[GREEN.sage, BLUE.aqua]} blur={16} />
        <LeafField t={t} seed={1002} n={4} focal={0.3} opacity={0.6} />
        <Glow x={CX} y={CY} rx={380} color={GREEN.sage} a={0.2 + 0.15 * glow} blur={50} />
        <svg width={1080} height={1920} style={{ position: 'absolute', overflow: 'visible' }}>
          <defs>
            <linearGradient id="gGums" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={BLUE.aqua} />
              <stop offset="1" stopColor={GREEN.sage} />
            </linearGradient>
          </defs>
          <g transform={`rotate(${t * 12} ${CX} ${CY})`} opacity={ring * 0.6}>
            <circle cx={CX} cy={CY} r={R + 40} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeDasharray="2 16" />
          </g>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#gGums)" strokeWidth={3} strokeDasharray={circ} strokeDashoffset={circ * (1 - ring)} transform={`rotate(-90 ${CX} ${CY})`} style={{ filter: `drop-shadow(0 0 10px ${hexA(GREEN.sage, 0.8)})` }} />
          <g transform={`translate(${CX - 100} ${CY - 110}) scale(2)`} style={{ filter: `drop-shadow(0 0 ${12 * glow}px ${hexA(GREEN.sage, 0.9)})` }}>
            <path d="M50 3 L92 18 L88 58 Q 78 84 50 97 Q 22 84 12 58 L8 18 Z" fill={hexA('#FFFFFF', 0.06 * shield)} stroke="#FFFFFF" strokeWidth={2.4} strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - shield)} />
            <path d="M29 50 L45 65 L73 35" fill="none" stroke="url(#gGums)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - check)} />
          </g>
        </svg>
        <HeroProduct name="zesty-lemon-tube" x={165} y={780 + 120 * (1 - p)} height={460} rotate={-10} rim={BLUE.aqua} opacity={p} />
        <HeroProduct name="herbal-mint-tube" x={915} y={785 + 120 * (1 - p)} height={450} rotate={10} rim={GREEN.sage} opacity={p} />
        <Dust t={t} seed={1003} n={26} opacity={0.6} />
      </Plane>
      <Pos x={540} y={280}>
        <Eyebrow text={c.label} p={prog(t, 0.2, 0.9)} color={GREEN.sage} />
      </Pos>
      {cards.map((card, i) => (
        <Glass key={i} x={540} y={1140 + i * 220} w={940} h={190} p={prog(t, card.at, card.at + 0.6)} radius={44} tint={i ? GREEN.sage : BLUE.ice}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, width: '100%', padding: '0 32px' }}>
            <div style={{ width: 84, height: 84, borderRadius: 42, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(circle at 35% 30%, ${hexA(i ? GREEN.fresh : BLUE.aqua, 0.9)}, ${hexA(i ? GREEN.botanical : BLUE.royal, 0.5)})` }}>
              <Glyph name={card.icon} size={44} color="#FFFFFF" stroke={2} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Kh size={40} style={{ lineHeight: 1.5 }}>
                {card.a}
              </Kh>
              <Kh size={32} weight={600} color="rgba(255,255,255,0.78)" style={{ lineHeight: 1.5 }}>
                {card.b}
              </Kh>
            </div>
          </div>
        </Glass>
      ))}
    </AbsoluteFill>
  );
};
