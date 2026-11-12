import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { BenefitCard } from '../components/BenefitCard';
import { DashedRing, GlassCard } from '../components/GlassCard';
import { Product } from '../components/Product';
import { At, GradientLatin, Khmer, Label, Latin, Reveal } from '../components/Typography';
import { easeBack, easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

/** 04 — Four on-pack benefits as floating glass infographic cards. */
export const S04Benefits: React.FC = () => {
  const t = useTime();
  const c = COPY.benefits;
  const p = easeOut(prog(t, 0.1, 1.0));
  const line = easeOut(prog(t, 0.6, 1.3));
  const badge = prog(t, 2.9, 3.5);
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={260} y={1000} r={380} color={COLORS.softBlue} a={0.9} />
      <GlowBlob x={380} y={1150} r={330} color="#E8F3E0" a={0.9} />
      <Reveal x={540} y={290} p={prog(t, 0.2, 0.7)}>
        <Label>{c.label}</Label>
      </Reveal>
      <Reveal x={540} y={385} p={prog(t, 0.35, 0.95)}>
        <Khmer size={76}>{c.kh}</Khmer>
      </Reveal>
      <div style={{ position: 'absolute', left: 540 - 160 * line, top: 469, width: 320 * line, height: 3, background: COLORS.silver }} />
      <Product name="zesty-lemon-tube" x={150 + 6 * t - 60 * (1 - p)} y={1000} height={660} rotate={-5} opacity={p} />
      <Product name="herbal-mint-tube" x={385 - 4 * t - 30 * (1 - p)} y={1065} height={680} rotate={5} opacity={p} sweep={prog(t, 1.2, 2.1)} />
      {c.items.map((b, i) => (
        <BenefitCard key={b.en} p={prog(t, 0.8 + i * 0.45, 1.4 + i * 0.45)} y={640 + i * 190} icon={b.icon} en={b.en} kh={b.kh} />
      ))}
      {badge > 0 && (
        <>
          <GlassCard x={790} y={1440} w={220} h={220} radius={110} opacity={badge} />
          <DashedRing x={790} y={1440} r={100} color={COLORS.royal} rotate={t * 25} opacity={badge} />
          <At x={790} y={1426} opacity={badge} scale={0.8 + 0.2 * easeBack(badge)}>
            <GradientLatin size={58}>{c.badgeBig}</GradientLatin>
          </At>
          <At x={790} y={1474} opacity={badge}>
            <Latin size={17} weight={700} color={COLORS.grey} tracking={3}>
              {c.badgeSmall}
            </Latin>
          </At>
        </>
      )}
    </AbsoluteFill>
  );
};
