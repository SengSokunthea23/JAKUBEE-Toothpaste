import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { DeliveryRoute, litCount } from '../components/DeliveryRoute';
import { GlassCard, GradientDot } from '../components/GlassCard';
import { Icon } from '../components/Icons';
import { Product, ProductName } from '../components/Product';
import { At, GradientLatin, Khmer, Label, Latin, Reveal } from '../components/Typography';
import { easeBack, easeOut, prog } from '../lib/anim';
import { COPY, OFFER } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const TUBES: { name: ProductName; x: number; rot: number }[] = [
  { name: 'zesty-lemon-tube', x: 255, rot: -12 },
  { name: 'herbal-mint-tube', x: 445, rot: -4 },
  { name: 'zesty-lemon-tube', x: 635, rot: 4 },
  { name: 'herbal-mint-tube', x: 825, rot: 12 },
];

/** 08 — 4 tubes for $20 + free delivery to 25 provinces. */
export const S08BundleDelivery: React.FC = () => {
  const t = useTime();
  const c = COPY.bundle;
  const q = prog(t, 0.5, 1.1);
  const card = prog(t, 2.4, 3.0);
  const top = 1190 + 120 * (1 - easeOut(card));
  const route = prog(t, 3.0, 5.4);
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={300} y={900} r={520} color={COLORS.softBlue} a={0.6} />
      <GlowBlob x={780} y={900} r={520} color="#E9F4E2" a={0.6} />
      <Reveal x={540} y={285} p={prog(t, 0.2, 0.7)}>
        <Label size={26} tracking={12}>
          {c.label}
        </Label>
      </Reveal>
      <Reveal x={540} y={375} p={prog(t, 0.3, 0.85)}>
        <Khmer size={64}>{c.kh}</Khmer>
      </Reveal>
      <At x={540} y={545} opacity={Math.min(1, q * 2)} scale={0.6 + 0.4 * easeBack(q)}>
        <GradientLatin size={230} shine={prog(t, 1.4, 2.2)} style={{ lineHeight: 0.9 }}>
          {OFFER.bundlePrice}
        </GradientLatin>
      </At>
      <Reveal x={540} y={680} p={prog(t, 0.9, 1.3)}>
        <Label size={22} tracking={10}>
          {c.tubes}
        </Label>
      </Reveal>
      {TUBES.map((tb, i) => {
        const k = prog(t, 0.6 + i * 0.15, 1.2 + i * 0.15);
        return (
          <Product
            key={i}
            name={tb.name}
            x={tb.x}
            y={950 - 160 * (1 - easeBack(k)) + 6 * Math.sin(t * 1.6 + i)}
            height={440}
            rotate={tb.rot}
            opacity={Math.min(1, k * 2)}
          />
        );
      })}
      {card > 0 && (
        <>
          <GlassCard x={540} y={top + 165} w={960} h={330} radius={36} opacity={card} fill="rgba(255,255,255,0.92)" />
          <GradientDot x={150} y={top + 85} d={92} opacity={card}>
            <Icon name="truck" size={54} />
          </GradientDot>
          <div style={{ position: 'absolute', left: 222, top: top + 30, opacity: card }}>
            <Latin size={44} color={COLORS.charcoal} tracking={2}>
              {c.deliveryEn}
            </Latin>
            <div />
            <Khmer size={38} weight={600} color={COLORS.royal}>
              {c.deliveryKh}
            </Khmer>
          </div>
          <At x={985} y={top + 42} align="right" opacity={card}>
            <Latin size={20} weight={700} color={COLORS.grey} tracking={4}>
              {`${litCount(route, OFFER.provinces)} / ${OFFER.provinces} ${c.provincesLabel}`}
            </Latin>
          </At>
          <DeliveryRoute top={top + 245} progress={route} count={OFFER.provinces} opacity={card} />
        </>
      )}
    </AbsoluteFill>
  );
};
