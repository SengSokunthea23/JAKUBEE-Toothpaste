import React from 'react';
import { AbsoluteFill } from 'remotion';
import type { ProductName } from '../../components/Product';
import { clamp, prog } from '../../lib/anim';
import { COPY, OFFER } from '../../lib/copy';
import { FONTS } from '../../lib/theme';
import { useTime } from '../../lib/useTime';
import { Dust } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Glow, Plane, Stage } from '../fx/Stage';
import { Eyebrow, Kh, KhIn, Pos, PriceFigure } from '../fx/Type';
import { BLUE, GRAD, GREEN, NOIR, ease } from '../theme';

type Slot = { name: ProductName; x: number; floor: number; h: number; back: boolean; d: number };

const SLOTS: Slot[] = [
  { name: 'herbal-mint-pack', x: 400, floor: 1290, h: 430, back: true, d: 0.0 },
  { name: 'zesty-lemon-pack', x: 680, floor: 1290, h: 430, back: true, d: 0.1 },
  { name: 'zesty-lemon-pack', x: 260, floor: 1400, h: 510, back: false, d: 0.25 },
  { name: 'herbal-mint-pack', x: 540, floor: 1400, h: 510, back: false, d: 0.35 },
  { name: 'zesty-lemon-pack', x: 820, floor: 1400, h: 510, back: false, d: 0.45 },
];

/** 09 — Wholesale: a two-row retail display with depth of field, gliding camera. */
export const C09Wholesale: React.FC = () => {
  const t = useTime();
  const c = COPY.wholesale;
  const cam = { x: 40 - 80 * ease.inOutSine(prog(t, 0, 4.4)), y: 0, z: 1.02 + 0.04 * ease.inOutSine(prog(t, 0, 4.4)) };
  return (
    <AbsoluteFill>
      <Stage tone="noir" t={t} floorY={1400} focusY={1150} />
      <Plane cam={cam} depth={0.7}>
        <Glow x={540} y={1150} rx={520} ry={360} color={NOIR.silver} a={0.18} blur={60} />
        {SLOTS.filter((s) => s.back).map((s, i) => {
          const q = ease.outQuint(prog(t, 0.6 + s.d, 1.3 + s.d));
          return (
            <HeroProduct key={i} name={s.name} x={s.x} y={s.floor - s.h / 2 + 60 * (1 - q)} height={s.h} opacity={clamp(q * 2)} focus={5} exposure={0.7} rim={i ? BLUE.ice : GREEN.sage} rimStrength={0.6} />
          );
        })}
      </Plane>
      <Plane cam={cam} depth={1}>
        {SLOTS.filter((s) => !s.back).map((s, i) => {
          const q = ease.outQuint(prog(t, 0.6 + s.d, 1.3 + s.d));
          return (
            <HeroProduct
              key={i}
              name={s.name}
              x={s.x}
              y={s.floor - s.h / 2 + 80 * (1 - q)}
              height={s.h}
              opacity={clamp(q * 2)}
              focus={6 * (1 - q)}
              rim={s.name === 'zesty-lemon-pack' ? BLUE.aqua : GREEN.sage}
              reflect
              sweep={prog(t, 1.9 + i * 0.12, 2.7 + i * 0.12)}
            />
          );
        })}
        <Dust t={t} seed={91} n={24} opacity={0.6} />
      </Plane>
      <Pos x={540} y={290}>
        <Eyebrow text={c.label} p={prog(t, 0.15, 0.8)} />
      </Pos>
      <Pos x={540} y={385}>
        <KhIn text={c.kh} t={t} at={0.3} size={62} />
      </Pos>
      <Pos x={540} y={600}>
        <PriceFigure text={OFFER.wholesalePrice} t={t} at={0.8} size={280} fill={GRAD.silver} glow="rgba(255,255,255,0.35)" sweepAt={1.8} />
      </Pos>
      <Glass x={540} y={1530} w={760} h={100} p={prog(t, 1.6, 2.2)} radius={50} tint={BLUE.ice}>
        <Kh size={40} weight={600}>
          {c.subBefore}
          <span style={{ fontFamily: FONTS.latin, fontWeight: 800, color: GREEN.sage }}>{OFFER.wholesalePrice}</span>
          {c.subAfter}
        </Kh>
      </Glass>
    </AbsoluteFill>
  );
};
