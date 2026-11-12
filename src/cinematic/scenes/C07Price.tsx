import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { COPY, OFFER } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust, FloorRipple } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Glow, Plane, Stage, hexA } from '../fx/Stage';
import { Eyebrow, Kh, KhIn, Lt, Pos, PriceFigure } from '../fx/Type';
import { BLUE, GRAD, GREEN, ease } from '../theme';

/** Theatrical spotlight cone from above onto a pedestal. */
export const Spotlight: React.FC<{ x: number; y: number; w: number; p: number; color?: string }> = ({ x, y, w, p, color = '#EAF6FF' }) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: x - w,
        top: -100,
        width: w * 2,
        height: y + 100,
        clipPath: `polygon(${w - 70}px 0, ${w + 70}px 0, ${w * 2}px 100%, 0 100%)`,
        background: `linear-gradient(180deg, ${hexA(color, 0.3 * p)} 0%, ${hexA(color, 0.08 * p)} 100%)`,
        filter: 'blur(26px)',
        mixBlendMode: 'screen',
      }}
    />
    <Glow x={x} y={y} rx={w * 0.95} ry={70} color={color} a={0.55 * p} blur={16} />
  </>
);

/** 07 — Price per tube under a spotlight; tubes land on the pedestal. */
export const C07Price: React.FC = () => {
  const t = useTime();
  const c = COPY.price;
  const spot = ease.inOutSine(prog(t, 0, 0.8));
  const land = (at: number) => ease.outQuint(prog(t, at, at + 0.55));
  const l1 = land(0.9);
  const l2 = land(1.05);
  const tag = clamp((t - 1.6) / 0.4);
  return (
    <AbsoluteFill>
      <Stage tone="noir" t={t} beams={false} floorY={1400} focusY={1100} />
      <Plane cam={{ x: 0, y: 0, z: 1 + 0.04 * ease.inOutSine(prog(t, 0, 4.4)) }} depth={1}>
        <Spotlight x={540} y={1400} w={430} p={spot} />
        <Glow x={340} y={1100} rx={260} ry={420} color={BLUE.royal} a={0.3} blur={60} />
        <Glow x={740} y={1100} rx={260} ry={420} color={GREEN.botanical} a={0.3} blur={60} />
        <HeroProduct name="zesty-lemon-tube" x={430} y={1115 - 260 * (1 - l1)} height={570} rotate={-7} rim={BLUE.aqua} opacity={clamp(l1 * 3)} reflect sweep={prog(t, 2.2, 3.0)} />
        <HeroProduct name="herbal-mint-tube" x={650} y={1120 - 260 * (1 - l2)} height={555} rotate={7} rim={GREEN.sage} opacity={clamp(l2 * 3)} reflect sweep={prog(t, 2.35, 3.15)} />
        <FloorRipple t={t} at={1.35} x={540} y={1402} color={BLUE.ice} size={420} />
        <Dust t={t} seed={71} n={30} opacity={spot * 0.8} />
      </Plane>
      <Pos x={540} y={290}>
        <Eyebrow text={c.label} p={prog(t, 0.2, 0.9)} />
      </Pos>
      <Pos x={540} y={385}>
        <KhIn text={c.kh} t={t} at={0.35} size={62} />
      </Pos>
      <Pos x={540} y={630}>
        <PriceFigure text={OFFER.pricePerTube} t={t} at={0.55} size={330} fill={GRAD.ice} sweepAt={1.9} />
      </Pos>
      <Pos x={820} y={505} style={{ transform: `translate(-50%, -50%) rotate(8deg) scale(${0.7 + 0.3 * ease.outQuint(tag)})`, opacity: tag }}>
        <div style={{ background: `linear-gradient(90deg, ${BLUE.aqua}, ${GREEN.fresh})`, borderRadius: 26, padding: '12px 26px', boxShadow: `0 0 30px ${hexA(BLUE.aqua, 0.5)}` }}>
          <Lt size={24} weight={800} color={BLUE.navy} tracking={4}>
            {c.tag}
          </Lt>
        </div>
      </Pos>
      <Glass x={540} y={1530} w={680} h={96} p={prog(t, 2.0, 2.6)} radius={48}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: `linear-gradient(135deg, ${BLUE.aqua}, ${BLUE.royal})` }} />
          <div style={{ width: 22, height: 22, borderRadius: 11, background: `linear-gradient(135deg, ${GREEN.sage}, ${GREEN.botanical})`, marginLeft: -10 }} />
          <Kh size={38} weight={600}>
            {c.same}
          </Kh>
        </div>
      </Glass>
    </AbsoluteFill>
  );
};
