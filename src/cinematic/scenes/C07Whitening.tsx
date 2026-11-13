import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Tooth3D } from '../../editorial/ui/Lemon';
import { prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Glow, Plane, Spotlight, Stage } from '../fx/Stage';
import { Eyebrow, Kh, KhIn, Pos, TitleIn } from '../fx/Type';
import { BLUE, GRAD, GREEN, ease } from '../theme';

/** 07 — Reduces yellow stains; whiter, stronger, shinier teeth: a tooth clears under the spotlight. */
export const C07Whitening: React.FC = () => {
  const t = useTime();
  const c = COPY.whitening;
  const spot = ease.inOutSine(prog(t, 0, 0.8));
  const tooth = ease.outQuint(prog(t, 0.3, 1.2));
  const stain = 1 - ease.inOutSine(prog(t, 1.3, 2.7));
  const glow = ease.outQuint(prog(t, 2.6, 3.6));
  const p = ease.outQuint(prog(t, 0.9, 1.8));
  return (
    <AbsoluteFill>
      <Stage tone="noir" t={t} beams={false} floorY={1400} focusY={900} />
      <Plane cam={{ x: 0, y: 0, z: 1 + 0.04 * ease.inOutSine(prog(t, 0, 5)) }} depth={1}>
        <Spotlight x={540} y={1400} w={460} p={spot} />
        <Glow x={540} y={880} rx={380} color={BLUE.ice} a={0.15 + 0.35 * glow} blur={50} />
        <Tooth3D x={540} y={880} size={500} stain={stain} shine={prog(t, 2.6, 3.4)} opacity={tooth} />
        <HeroProduct name="zesty-lemon-tube" x={175} y={1175 + 120 * (1 - p)} height={480} rotate={-9} rim={BLUE.aqua} opacity={p} reflect />
        <HeroProduct name="herbal-mint-tube" x={905} y={1180 + 120 * (1 - p)} height={470} rotate={9} rim={GREEN.sage} opacity={p} reflect />
        <Dust t={t} seed={701} n={34} opacity={0.3 + 0.6 * glow} />
      </Plane>
      <Pos x={540} y={280}>
        <Eyebrow text={c.label} p={prog(t, 0.2, 0.9)} />
      </Pos>
      <Pos x={540} y={375}>
        <KhIn text={c.kh1} t={t} at={0.35} size={52} />
      </Pos>
      <Pos x={540} y={455}>
        <KhIn text={c.kh2} t={t} at={0.6} size={38} weight={600} color="rgba(255,255,255,0.75)" stagger={0.08} />
      </Pos>
      <Pos x={540} y={1215}>
        <TitleIn text={c.en} t={t} at={2.7} size={84} trackFrom={40} trackTo={10} fill={GRAD.ice} />
      </Pos>
      <Glass x={540} y={1520} w={920} h={104} p={prog(t, 3.0, 3.6)} radius={52}>
        <Kh size={34} weight={600}>
          {c.kh3}
        </Kh>
      </Glass>
    </AbsoluteFill>
  );
};
