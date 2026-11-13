import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { Sparkles, makeParticles } from '../components/Decor';
import { GlassCard } from '../components/GlassCard';
import { Product } from '../components/Product';
import { GradientLatin, Khmer, Label, Reveal } from '../components/Typography';
import { Tooth3D } from '../editorial/ui/Lemon';
import { easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const SPARK = makeParticles(71, 24);

/** 07 — Reduces yellow stains; whiter, stronger, shinier teeth (illustrative tooth clears under a light sweep). */
export const S07Whitening: React.FC = () => {
  const t = useTime();
  const c = COPY.whitening;
  const tooth = easeOut(prog(t, 0.3, 1.1));
  const stain = 1 - easeOut(prog(t, 1.3, 2.7));
  const shine = prog(t, 2.6, 3.4);
  const p = easeOut(prog(t, 0.8, 1.6));
  const card = prog(t, 2.9, 3.5);
  const cy = 1500 + 30 * (1 - easeOut(card));
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={540} y={900} r={460} color={COLORS.softBlue} a={0.85} />
      <Sparkles particles={SPARK} t={t} color={COLORS.aqua} opacity={easeOut(prog(t, 2.6, 3.4))} />
      <Reveal x={540} y={280} p={prog(t, 0.2, 0.7)}>
        <Label>{c.label}</Label>
      </Reveal>
      <Reveal x={540} y={375} p={prog(t, 0.35, 0.95)}>
        <Khmer size={54}>{c.kh1}</Khmer>
      </Reveal>
      <Reveal x={540} y={455} p={prog(t, 0.55, 1.15)}>
        <Khmer size={40} weight={600} color={COLORS.mid}>
          {c.kh2}
        </Khmer>
      </Reveal>
      <Tooth3D x={540} y={880} size={500} stain={stain} shine={shine} opacity={tooth} />
      <Reveal x={540} y={1180} p={prog(t, 2.7, 3.2)}>
        <GradientLatin size={84} tracking={10} shine={prog(t, 3.2, 4.0)}>
          {c.en}
        </GradientLatin>
      </Reveal>
      <Product name="zesty-lemon-tube" x={170} y={1180 + 80 * (1 - p)} height={500} rotate={-10} opacity={p} />
      <Product name="herbal-mint-tube" x={910} y={1180 + 80 * (1 - p)} height={500} rotate={10} opacity={p} />
      <GlassCard x={540} y={cy} w={920} h={104} radius={52} opacity={card} fill="rgba(255,255,255,0.94)" />
      {card > 0 && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: cy - 30, textAlign: 'center', opacity: card }}>
          <Khmer size={36} weight={600}>
            {c.kh3}
          </Khmer>
        </div>
      )}
    </AbsoluteFill>
  );
};
