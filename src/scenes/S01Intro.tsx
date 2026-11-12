import React from 'react';
import { AbsoluteFill } from 'remotion';
import { IvoryBg, GlowBlob } from '../components/Backgrounds';
import { GradientDot } from '../components/GlassCard';
import { Product } from '../components/Product';
import { At, GradientLatin, Khmer, Label, Latin, Reveal } from '../components/Typography';
import { easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

/** 01 — Two flavours, one brand. Blue enters left, green enters right. */
export const S01Intro: React.FC = () => {
  const t = useTime();
  const g = easeOut(prog(t, 0, 1.4));
  const p1 = easeOut(prog(t, 0.25, 1.5));
  const p2 = easeOut(prog(t, 0.45, 1.7));
  const bob = 8 * Math.sin(t * 1.7);
  const sweep = prog(t, 2.0, 2.9);
  const chips = prog(t, 2.2, 2.7);
  return (
    <AbsoluteFill>
      <IvoryBg />
      {/* animated editorial grid */}
      <svg width={1080} height={1920} style={{ position: 'absolute' }}>
        {[90, 540, 990].map((x) => (
          <line key={x} x1={x} y1={0} x2={x} y2={1920 * g} stroke="#E6E9EC" strokeWidth={2} />
        ))}
        {[240, 1580].map((y) => (
          <line key={y} x1={1080 * (1 - g)} y1={y} x2={1080} y2={y} stroke="#E6E9EC" strokeWidth={2} />
        ))}
      </svg>
      <GlowBlob x={540} y={1010} r={460} color="#FFFFFF" a={0.95} />
      <Product name="zesty-lemon-tube" x={-320 + 730 * p1} y={1010 + bob} height={820} rotate={-7 + 4 * (1 - p1)} sweep={sweep} />
      <Product name="herbal-mint-tube" x={1400 - 730 * p2} y={1030 - bob} height={820} rotate={7 - 4 * (1 - p2)} sweep={sweep} />
      <Reveal x={540} y={300} p={prog(t, 0.6, 1.1)}>
        <Label>{COPY.intro.label}</Label>
      </Reveal>
      <Reveal x={540} y={400} p={prog(t, 0.8, 1.4)}>
        <Latin size={104} color={COLORS.charcoal} tracking={1}>
          {COPY.intro.line1}
        </Latin>
      </Reveal>
      <Reveal x={540} y={512} p={prog(t, 1.0, 1.6)}>
        <GradientLatin size={104} tracking={1}>
          {COPY.intro.line2}
        </GradientLatin>
      </Reveal>
      <Reveal x={540} y={1500} p={prog(t, 1.8, 2.4)}>
        <Khmer size={58}>{COPY.intro.kh}</Khmer>
      </Reveal>
      <GradientDot x={470} y={1580} d={22} gradient={`linear-gradient(90deg, ${COLORS.aqua}, ${COLORS.royal})`} opacity={chips} />
      <GradientDot x={610} y={1580} d={22} gradient={`linear-gradient(90deg, ${COLORS.freshGreen}, ${COLORS.botanical})`} opacity={chips} />
      <At x={540} y={1578} opacity={chips}>
        <Latin size={30} weight={700} color={COLORS.grey}>
          +
        </Latin>
      </At>
    </AbsoluteFill>
  );
};
