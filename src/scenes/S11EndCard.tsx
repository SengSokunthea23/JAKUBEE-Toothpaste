import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EndBg } from '../components/Backgrounds';
import { CtaButton } from '../components/CtaButton';
import { GlassCard } from '../components/GlassCard';
import { Icon } from '../components/Icons';
import { Product } from '../components/Product';
import { At, GradientLatin, Khmer, Label, Reveal } from '../components/Typography';
import { easeOut, prog } from '../lib/anim';
import { COPY, OFFER } from '../lib/copy';
import { COLORS, FONTS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const L: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ fontFamily: FONTS.latin, fontWeight: 800 }}>{children}</span>;

/** 11 — Final conversion end card: both variants, offers, delivery, Khmer CTA. */
export const S11EndCard: React.FC = () => {
  const t = useTime();
  const c = COPY.end;
  const p = easeOut(prog(t, 0.2, 1.2));
  const bob = 6 * Math.sin(t * 1.5);
  const sweep = prog(t, 1.4, 2.3);
  const chips = [
    <>
      <L>{OFFER.pricePerTube}</L>
      {c.perTube}
    </>,
    <>
      {c.tubesKh}
      <L>{OFFER.bundlePrice}</L>
    </>,
    <>
      {c.wholesaleKh}
      <L>{OFFER.wholesalePrice}</L>
    </>,
  ];
  const xs = [215, 540, 865];
  const del = prog(t, 1.7, 2.2);
  return (
    <AbsoluteFill>
      <EndBg />
      <Reveal x={540} y={280} p={prog(t, 0.3, 0.8)}>
        <Label tracking={10}>{c.label}</Label>
      </Reveal>
      <Reveal x={540} y={380} p={prog(t, 0.45, 1.0)}>
        <Khmer size={96}>{c.kh}</Khmer>
      </Reveal>
      <Reveal x={540} y={480} p={prog(t, 0.6, 1.1)}>
        <GradientLatin size={40} tracking={14}>
          {c.en}
        </GradientLatin>
      </Reveal>
      <Product name="zesty-lemon-pack" x={295 - 140 * (1 - p)} y={880 + bob} height={630} opacity={p} sweep={sweep} />
      <Product name="herbal-mint-pack" x={785 + 140 * (1 - p)} y={880 - bob} height={630} opacity={p} sweep={sweep} />
      {chips.map((chip, i) => {
        const q = prog(t, 1.2 + i * 0.15, 1.7 + i * 0.15);
        const cy = 1265 + 30 * (1 - easeOut(q));
        return (
          <React.Fragment key={i}>
            <GlassCard x={xs[i]} y={cy} w={290} h={84} radius={42} opacity={q} fill="rgba(255,255,255,0.94)" />
            <At x={xs[i]} y={cy} opacity={q}>
              <Khmer size={40} weight={600}>
                {chip}
              </Khmer>
            </At>
          </React.Fragment>
        );
      })}
      <At x={540} y={1365} opacity={del}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon name="truck" size={44} color={COLORS.botanical} />
          <Khmer size={34} weight={600} color={COLORS.botanical}>
            {c.delivery[0]}
            <span style={{ fontFamily: FONTS.latin, margin: '0 14px' }}>·</span>
            {c.delivery[1]}
          </Khmer>
        </div>
      </At>
      <CtaButton t={t} p={prog(t, 2.1, 2.6)} x={540} y={1475} label={c.cta} />
    </AbsoluteFill>
  );
};
