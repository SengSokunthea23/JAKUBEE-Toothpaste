import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { GlassCard } from '../components/GlassCard';
import { GuaranteeShield } from '../components/GuaranteeShield';
import { Khmer, Latin, Reveal } from '../components/Typography';
import { easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

/** 10 — Customer guarantee (worded exactly as the spoken promise). */
export const S10Guarantee: React.FC = () => {
  const t = useTime();
  const c = COPY.guarantee;
  const q = prog(t, 0.1, 0.6);
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={540} y={900} r={500} color={COLORS.softBlue} a={0.55} />
      <GlassCard x={540} y={960 + 40 * (1 - easeOut(q))} w={840} h={860} radius={48} opacity={q} fill="rgba(255,255,255,0.85)" />
      <GuaranteeShield t={t} x={540} y={770} size={240} />
      <Reveal x={540} y={990} p={prog(t, 0.7, 1.2)}>
        <Latin size={32} color={COLORS.charcoal} tracking={5}>
          {c.label}
        </Latin>
      </Reveal>
      <Reveal x={540} y={1095} p={prog(t, 0.9, 1.4)}>
        <Khmer size={64} color={COLORS.royal}>
          {c.kh}
        </Khmer>
      </Reveal>
      <Reveal x={540} y={1200} p={prog(t, 1.1, 1.6)}>
        <Khmer size={34} weight={500} color={COLORS.mid}>
          {c.sub}
        </Khmer>
      </Reveal>
    </AbsoluteFill>
  );
};
