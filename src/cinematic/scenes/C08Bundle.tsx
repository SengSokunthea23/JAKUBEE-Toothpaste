import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Icon } from '../../components/Icons';
import { clamp, prog } from '../../lib/anim';
import type { ProductName } from '../../components/Product';
import { COPY, OFFER } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust, FloorRipple } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage } from '../fx/Stage';
import { Eyebrow, Kh, KhIn, Lt, Pos, PriceFigure } from '../fx/Type';
import { BLUE, GRAD, GREEN, ease } from '../theme';
import { Spotlight } from './C07Price';

const TUBES: { name: ProductName; x: number; rot: number; rim: string }[] = [
  { name: 'zesty-lemon-tube', x: 270, rot: -12, rim: BLUE.aqua },
  { name: 'herbal-mint-tube', x: 450, rot: -4, rim: GREEN.sage },
  { name: 'zesty-lemon-tube', x: 630, rot: 4, rim: BLUE.aqua },
  { name: 'herbal-mint-tube', x: 810, rot: 12, rim: GREEN.sage },
];

/** 08 — Four tubes land one by one, $20 bundle price, then free delivery to 25 provinces. */
export const C08Bundle: React.FC = () => {
  const t = useTime();
  const c = COPY.bundle;
  const spot = ease.inOutSine(prog(t, 0, 0.7));
  const landAt = (i: number) => 0.5 + i * 0.22;
  const count = TUBES.filter((_, i) => t >= landAt(i) + 0.3).length;
  const panel = prog(t, 2.6, 3.2);
  const n = Math.round(OFFER.provinces * ease.outQuint(prog(t, 2.9, 4.1)));
  return (
    <AbsoluteFill>
      <Stage tone="noir" t={t} floorY={1290} focusY={1050} />
      <Plane cam={{ x: 0, y: 0, z: 1 + 0.04 * ease.inOutSine(prog(t, 0, 6)) }} depth={1}>
        <Bokeh t={t} seed={81} n={10} colors={[BLUE.aqua, GREEN.sage]} blur={16} />
        <Spotlight x={540} y={1290} w={520} p={spot} />
        <Glow x={300} y={1000} rx={260} ry={400} color={BLUE.royal} a={0.25} blur={60} />
        <Glow x={780} y={1000} rx={260} ry={400} color={GREEN.botanical} a={0.25} blur={60} />
        {TUBES.map((tb, i) => {
          const l = ease.outQuint(prog(t, landAt(i), landAt(i) + 0.5));
          if (l <= 0) return null;
          const h = tb.name === 'zesty-lemon-tube' ? 520 : 505;
          return (
            <HeroProduct
              key={i}
              name={tb.name}
              x={tb.x}
              y={1290 - h / 2 - 240 * (1 - l)}
              height={h}
              rotate={tb.rot}
              rim={tb.rim}
              opacity={clamp(l * 3)}
              focus={8 * (1 - l)}
              reflect
              sweep={prog(t, 1.9 + i * 0.1, 2.6 + i * 0.1)}
            />
          );
        })}
        {TUBES.map((tb, i) => (
          <FloorRipple key={i} t={t} at={landAt(i) + 0.3} x={tb.x} y={1292} color={tb.rim} size={170} />
        ))}
        <Dust t={t} seed={82} n={26} opacity={0.7} />
      </Plane>
      <Pos x={540} y={290}>
        <Eyebrow text={c.label} p={prog(t, 0.15, 0.8)} />
      </Pos>
      <Pos x={540} y={385}>
        <KhIn text={c.kh} t={t} at={0.3} size={62} />
      </Pos>
      <Pos x={540} y={565}>
        <PriceFigure text={OFFER.bundlePrice} t={t} at={1.5} size={250} fill={GRAD.ice} sweepAt={2.4} />
      </Pos>
      {/* live tube counter */}
      <Pos x={540} y={720}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', opacity: clamp(t / 0.6) }}>
          {TUBES.map((tb, i) => (
            <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: i < count ? tb.rim : 'rgba(255,255,255,0.18)', boxShadow: i < count ? `0 0 14px ${tb.rim}` : undefined }} />
          ))}
          <Lt size={26} weight={800} color="rgba(255,255,255,0.85)" tracking={6} style={{ marginLeft: 10 }}>
            {c.tubes}
          </Lt>
        </div>
      </Pos>
      <Glass x={540} y={1450} w={920} h={190} p={panel} radius={40} tint={GREEN.sage}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, width: '100%', padding: '0 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 170, flex: 'none' }}>
            <Lt size={92} color="#FFFFFF" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {n}
            </Lt>
            <Lt size={18} weight={700} color={GREEN.sage} tracking={4}>
              {c.provincesLabel}
            </Lt>
          </div>
          <div style={{ width: 2, height: 110, background: 'rgba(255,255,255,0.25)', flex: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="truck" size={38} color={GREEN.sage} />
              <Lt size={26} weight={800} color="#FFFFFF" tracking={3}>
                {c.deliveryEn}
              </Lt>
            </div>
            <Kh size={36} weight={600} color={GREEN.cream}>
              {c.deliveryKh}
            </Kh>
          </div>
        </div>
      </Glass>
    </AbsoluteFill>
  );
};
