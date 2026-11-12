import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust } from '../fx/Elements';
import { Bokeh, Glow, Stage, hexA } from '../fx/Stage';
import { KhIn, Pos, TitleIn } from '../fx/Type';
import { BLUE, GREEN, ease } from '../theme';

const CX = 540;
const CY = 800;

/** 10 — Customer guarantee (exact spoken promise) as a refined, self-drawing emblem. */
export const C10Guarantee: React.FC = () => {
  const t = useTime();
  const c = COPY.guarantee;
  const ring = ease.outQuint(prog(t, 0.15, 1.2));
  const shield = ease.inOutSine(prog(t, 0.4, 1.2));
  const check = ease.outQuint(prog(t, 1.0, 1.5));
  const glow = clamp((t - 1.3) / 0.6);
  const R = 230;
  const circ = 2 * Math.PI * R;
  return (
    <AbsoluteFill>
      <Stage tone="noir" t={t} focusY={CY} />
      <Bokeh t={t} seed={101} n={12} colors={[BLUE.aqua, GREEN.sage]} blur={16} />
      <Glow x={CX} y={CY} rx={420} color={BLUE.aqua} a={0.22 + 0.15 * glow} blur={50} />
      <svg width={1080} height={1920} style={{ position: 'absolute', overflow: 'visible' }}>
        <defs>
          <linearGradient id="gRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={BLUE.aqua} />
            <stop offset="1" stopColor={GREEN.sage} />
          </linearGradient>
        </defs>
        {/* fine rotating tick ring */}
        <g transform={`rotate(${t * 12} ${CX} ${CY})`} opacity={ring * 0.6}>
          <circle cx={CX} cy={CY} r={R + 42} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeDasharray="2 16" />
        </g>
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="url(#gRing)"
          strokeWidth={3}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - ring)}
          transform={`rotate(-90 ${CX} ${CY})`}
          style={{ filter: `drop-shadow(0 0 10px ${hexA(BLUE.aqua, 0.8)})` }}
        />
        <circle cx={CX} cy={CY} r={R - 18} fill={hexA('#FFFFFF', 0.04 * ring)} />
        {/* line-art shield + check */}
        <g transform={`translate(${CX - 110} ${CY - 120}) scale(2.2)`} style={{ filter: `drop-shadow(0 0 ${12 * glow}px ${hexA(GREEN.sage, 0.9)})` }}>
          <path
            d="M50 3 L92 18 L88 58 Q 78 84 50 97 Q 22 84 12 58 L8 18 Z"
            fill={hexA('#FFFFFF', 0.06 * shield)}
            stroke="#FFFFFF"
            strokeWidth={2.4}
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 * (1 - shield)}
          />
          <path d="M29 50 L45 65 L73 35" fill="none" stroke="url(#gRing)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - check)} />
        </g>
      </svg>
      <Dust t={t} seed={102} n={30} opacity={0.7} />
      <Pos x={540} y={1160}>
        <TitleIn text={c.label} t={t} at={1.1} size={34} weight={800} trackFrom={22} trackTo={7} fill={`linear-gradient(90deg, ${BLUE.ice}, ${GREEN.sage})`} />
      </Pos>
      <Pos x={540} y={1265}>
        <KhIn text={c.kh} t={t} at={1.35} size={70} />
      </Pos>
      <Pos x={540} y={1375}>
        <KhIn text={c.sub} t={t} at={1.6} size={38} weight={500} color="rgba(255,255,255,0.78)" stagger={0.08} />
      </Pos>
    </AbsoluteFill>
  );
};
