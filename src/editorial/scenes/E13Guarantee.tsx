import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { Ring } from '../ui/Objects';
import { At, Eyebrow, KhLine, Underline, khmer } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

/** 13 — Full refund guarantee, worded as spoken: no result → money back in full. */
export const E13Guarantee: React.FC = () => {
  const t = useTime();
  const c = T.guarantee;
  const check = ease.outExpo(prog(t, 1.2, 1.8));
  const shield = ease.inOut(prog(t, 0.6, 1.3));
  const side = ease.outExpo(prog(t, 0.4, 1.4));
  return (
    <AbsoluteFill>
      <Backdrop mood="dual" t={t} />
      <Cam t={t} dur={5} from={1} to={1.04}>
        <Foam edition="blue" x={150 - 80 * (1 - side)} y={1380} height={560} rotate={-14} opacity={side} />
        <Foam edition="green" x={930 + 80 * (1 - side)} y={1380} height={550} rotate={14} opacity={side} />
        <Card x={540} y={880} w={800} h={820} p={prog(t, 0.2, 1.0)} t={t} radius={56} />
        {/* emblem */}
        <Ring x={540} y={680} r={130} p={prog(t, 0.5, 1.4)} color={BLUE.royal} width={4} />
        <Ring x={540} y={680} r={160} p={prog(t, 0.7, 1.5)} color="rgba(100,168,76,0.5)" width={1.5} dash="2 12" rotate={t * 15} />
        <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, opacity: clamp((t - 0.6) / 0.3) }}>
          <defs>
            <linearGradient id="g13" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={BLUE.royal} />
              <stop offset="1" stopColor={GREEN.botanical} />
            </linearGradient>
          </defs>
          <g transform="translate(470 605) scale(1.4)">
            <path d="M50 3 L92 18 L88 58 Q 78 84 50 97 Q 22 84 12 58 L8 18 Z" fill="none" stroke="url(#g13)" strokeWidth={4} strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - shield)} />
            <path d="M30 50 L45 65 L72 36" fill="none" stroke="url(#g13)" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - check)} />
          </g>
        </svg>
      </Cam>
      <At x={540} y={330}>
        <Eyebrow text="JAKUBEE  ·  FACIAL FOAM" p={prog(t, 0.1, 0.8)} dash={GREEN.fresh} />
      </At>
      <At x={540} y={900}>
        <Eyebrow text={c.eyebrow} p={prog(t, 1.0, 1.6)} color={BLUE.royal} />
      </At>
      <At x={540} y={990}>
        <KhLine text={c.kh1} t={t} at={1.2} size={48} weight={600} color={INK.slate} />
      </At>
      <At x={540} y={1090}>
        <Underline p={prog(t, 2.0, 2.6)} color={GREEN.fresh} thickness={10} offset={10}>
          <KhLine text={c.kh2} t={t} at={1.45} size={64} />
        </Underline>
      </At>
      <At x={540} y={1195}>
        <span style={{ ...khmer(28, 500, INK.mist), opacity: prog(t, 1.9, 2.4) }}>{c.sub}</span>
      </At>
    </AbsoluteFill>
  );
};
