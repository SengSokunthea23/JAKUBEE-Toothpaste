import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { GlassCard, GradientDot } from '../components/GlassCard';
import { Product } from '../components/Product';
import { At, GradientLatin, Khmer, Label, Latin, Reveal } from '../components/Typography';
import { easeBack, easeOut, prog } from '../lib/anim';
import { COPY, OFFER } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

/** 07 — Premium price reveal: one tube, same price for both flavours. */
export const S07Price: React.FC = () => {
  const t = useTime();
  const c = COPY.price;
  const q = prog(t, 0.4, 1.1);
  const tag = prog(t, 1.0, 1.4);
  const card = prog(t, 1.1, 1.6);
  const cy = 975 + 30 * (1 - easeOut(card));
  const p = easeOut(prog(t, 0.6, 1.5));
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={380} y={720} r={460} color={COLORS.softBlue} a={0.7} />
      <GlowBlob x={700} y={720} r={460} color="#E9F4E2" a={0.7} />
      <Reveal x={540} y={290} p={prog(t, 0.2, 0.7)}>
        <Label size={26} tracking={12}>
          {c.label}
        </Label>
      </Reveal>
      <Reveal x={540} y={385} p={prog(t, 0.3, 0.85)}>
        <Khmer size={64}>{c.kh}</Khmer>
      </Reveal>
      <At x={540} y={700} opacity={Math.min(1, q * 2)} scale={0.6 + 0.4 * easeBack(q)}>
        <GradientLatin size={440} shine={prog(t, 1.3, 2.1)} style={{ lineHeight: 0.9 }}>
          {OFFER.pricePerTube}
        </GradientLatin>
      </At>
      <At x={860} y={520} opacity={tag} rotate={8} scale={0.6 + 0.4 * easeBack(tag)}>
        <div style={{ background: COLORS.charcoal, borderRadius: 26, padding: '14px 26px' }}>
          <Latin size={24} color="#FFFFFF" tracking={4}>
            {c.tag}
          </Latin>
        </div>
      </At>
      <GlassCard x={540} y={cy} w={640} h={96} radius={48} opacity={card} fill="rgba(255,255,255,0.9)" />
      <GradientDot x={278} y={cy} d={26} gradient={`linear-gradient(90deg, ${COLORS.aqua}, ${COLORS.royal})`} opacity={card} />
      <GradientDot x={306} y={cy} d={26} gradient={`linear-gradient(90deg, ${COLORS.freshGreen}, ${COLORS.botanical})`} opacity={card} />
      <At x={340} y={cy} opacity={card} align="left">
        <Khmer size={40} weight={600}>
          {c.same}
        </Khmer>
      </At>
      <Product name="zesty-lemon-tube" x={400} y={1310 + 200 * (1 - p)} height={500} rotate={-8} opacity={p} />
      <Product name="herbal-mint-tube" x={680} y={1310 + 200 * (1 - p)} height={500} rotate={8} opacity={p} />
    </AbsoluteFill>
  );
};
