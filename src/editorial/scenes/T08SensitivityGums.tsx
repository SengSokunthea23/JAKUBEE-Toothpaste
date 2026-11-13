import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { GlyphName, IconBadge } from '../ui/Interface';
import { BeadField, IconCloud } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, KhLine, khmer, latin } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

/** 08 — Sensitivity, gum bleeding, gum care, odour bacteria: floating icon ecosystem + benefit panels. */
export const T08SensitivityGums: React.FC = () => {
  const t = useTime();
  const c = T.gums;
  const enter = ease.outExpo(prog(t, 0.4, 1.4));
  return (
    <AbsoluteFill>
      <Backdrop mood="white" t={t} />
      <Cam t={t} dur={7} from={1} to={1.04}>
        <BeadField t={t} seed={701} n={10} tint={BLUE.ice} p={0.7} />
        <IconCloud t={t} p={prog(t, 0.6, 1.6)} cx={540} cy={640} r={330} icons={['tooth', 'drop', 'shield', 'bacteria', 'spark', 'wind']} color={BLUE.royal} size={78} />
        <Product shot="tube" x={478} y={650 + 80 * (1 - enter)} height={410} rotate={-6} opacity={enter} shadow={false} sweep={prog(t, 1.6, 2.4)} />
        <Product shot="herbal-tube" x={602} y={655 + 80 * (1 - enter)} height={400} rotate={6} opacity={enter} shadow={false} sweep={prog(t, 1.75, 2.55)} />
      </Cam>
      <At x={540} y={270}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      <At x={540} y={350}>
        <KhLine text={c.kh} t={t} at={0.3} size={56} />
      </At>
      {c.cards.map((card, i) => (
        <Card key={card.en} x={540} y={1010 + i * 150} w={920} h={130} p={prog(t, 1.6 + i * 0.35, 2.4 + i * 0.35)} t={t} float={3} radius={36} padding="0 28px" align="start">
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <IconBadge name={card.icon as GlyphName} size={76} color={BLUE.royal} bg={BLUE.pale} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={latin(18, 800, BLUE.royal, 3)}>{card.en}</span>
              <span style={{ ...khmer(32, 700, INK.charcoal), lineHeight: 1.5 }}>{card.kh}</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 0, bottom: 0, height: 5, width: `${100 * ease.outExpo(prog(t, 2.0 + i * 0.35, 3.0 + i * 0.35))}%`, background: BLUE.royal, opacity: 0.8 }} />
        </Card>
      ))}
    </AbsoluteFill>
  );
};
