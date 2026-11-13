import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EndBg } from '../components/Backgrounds';
import { CtaButton } from '../components/CtaButton';
import { GlassCard } from '../components/GlassCard';
import { Icon } from '../components/Icons';
import { Product } from '../components/Product';
import { At, GradientLatin, Khmer, Label, Latin, Reveal } from '../components/Typography';
import { easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

/** 11 — End card: both variants, daily use + oral hygiene (script), pack claims, Khmer CTA. */
export const S11EndCard: React.FC = () => {
  const t = useTime();
  const c = COPY.end;
  const p = easeOut(prog(t, 0.2, 1.2));
  const bob = 6 * Math.sin(t * 1.5);
  const sweep = prog(t, 1.4, 2.3);
  const hyg = prog(t, 1.9, 2.4);
  const xs = [140, 375, 640, 915];
  const ws = [210, 230, 280, 230];
  return (
    <AbsoluteFill>
      <EndBg />
      <Reveal x={540} y={280} p={prog(t, 0.3, 0.8)}>
        <Label tracking={10}>{c.label}</Label>
      </Reveal>
      <Reveal x={540} y={375} p={prog(t, 0.45, 1.0)}>
        <Khmer size={58}>{c.kh}</Khmer>
      </Reveal>
      <Reveal x={540} y={470} p={prog(t, 0.6, 1.1)}>
        <GradientLatin size={40} tracking={14}>
          {c.en}
        </GradientLatin>
      </Reveal>
      <Product name="zesty-lemon-pack" x={295 - 140 * (1 - p)} y={880 + bob} height={630} opacity={p} sweep={sweep} />
      <Product name="herbal-mint-pack" x={785 + 140 * (1 - p)} y={880 - bob} height={630} opacity={p} sweep={sweep} />
      {c.claims.map((cl, i) => {
        const q = prog(t, 1.2 + i * 0.12, 1.7 + i * 0.12);
        const cy = 1265 + 30 * (1 - easeOut(q));
        return (
          <React.Fragment key={cl}>
            <GlassCard x={xs[i]} y={cy} w={ws[i]} h={70} radius={35} opacity={q} fill="rgba(255,255,255,0.94)" />
            <At x={xs[i]} y={cy} opacity={q}>
              <Latin size={18} color={COLORS.navy} tracking={2}>
                {cl}
              </Latin>
            </At>
          </React.Fragment>
        );
      })}
      <At x={540} y={1365} opacity={hyg}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon name="tooth" size={40} color={COLORS.royal} />
          <Khmer size={36} weight={600} color={COLORS.royal}>
            {c.hygiene}
          </Khmer>
        </div>
      </At>
      <CtaButton t={t} p={prog(t, 2.1, 2.6)} x={540} y={1475} label={c.cta} />
    </AbsoluteFill>
  );
};
