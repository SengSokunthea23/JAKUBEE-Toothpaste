import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FreshBg } from '../components/Backgrounds';
import { GlassCard, GradientDot } from '../components/GlassCard';
import { GuaranteeShield } from '../components/GuaranteeShield';
import { Icon } from '../components/Icons';
import { Product } from '../components/Product';
import { Khmer, Label, Reveal } from '../components/Typography';
import { easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

/** 10 — Less sensitivity and gum bleeding; gum care and fewer odour-causing bacteria. */
export const S10Gums: React.FC = () => {
  const t = useTime();
  const c = COPY.gums;
  const p = easeOut(prog(t, 0.2, 1.0));
  const cards = [
    { icon: 'tooth' as const, a: c.kh1, b: c.kh2, at: 1.3 },
    { icon: 'bubbles' as const, a: c.kh3, b: c.kh4, at: 1.8 },
  ];
  return (
    <AbsoluteFill>
      <FreshBg />
      <Reveal x={540} y={285} p={prog(t, 0.2, 0.7)}>
        <Label>{c.label}</Label>
      </Reveal>
      <Product name="zesty-lemon-tube" x={230} y={720 + 80 * (1 - p)} height={560} rotate={-8} opacity={p} sweep={prog(t, 1.6, 2.4)} />
      <Product name="herbal-mint-tube" x={850} y={720 + 80 * (1 - p)} height={560} rotate={8} opacity={p} sweep={prog(t, 1.75, 2.55)} />
      <GuaranteeShield t={t} x={540} y={690} size={240} />
      {cards.map((card, i) => {
        const q = prog(t, card.at, card.at + 0.6);
        if (q <= 0) return null;
        const y = 1170 + i * 210 + 30 * (1 - easeOut(q));
        return (
          <React.Fragment key={i}>
            <GlassCard x={540} y={y} w={940} h={180} radius={44} opacity={q} fill="rgba(255,255,255,0.93)" />
            <GradientDot x={140} y={y} d={92} opacity={q} gradient={i ? `linear-gradient(90deg, ${COLORS.freshGreen}, ${COLORS.botanical})` : undefined}>
              <Icon name={card.icon} size={46} />
            </GradientDot>
            <div style={{ position: 'absolute', left: 212, top: y - 66, opacity: q }}>
              <Khmer size={40}>{card.a}</Khmer>
              <div />
              <Khmer size={32} weight={600} color={COLORS.mid}>
                {card.b}
              </Khmer>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
