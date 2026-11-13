import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { DashedRing, GlassCard, GradientDot } from '../components/GlassCard';
import { Icon, IconName } from '../components/Icons';
import { Product } from '../components/Product';
import { At, GradientLatin, Khmer, Label, Latin, Reveal } from '../components/Typography';
import { easeBack, easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const ICONS: IconName[] = ['shield', 'tooth', 'sparkle'];

/** 09 — Fluoride 1500ppm against cavities, stronger enamel, strong teeth. */
export const S09Fluoride: React.FC = () => {
  const t = useTime();
  const c = COPY.strong;
  const badge = prog(t, 0.3, 0.9);
  const p = easeOut(prog(t, 0.6, 1.4));
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={540} y={560} r={360} color={COLORS.softBlue} a={0.85} />
      <Reveal x={540} y={275} p={prog(t, 0.15, 0.6)}>
        <Label>{c.label}</Label>
      </Reveal>
      {badge > 0 && (
        <>
          <GlassCard x={540} y={560} w={380} h={380} radius={190} opacity={badge} fill="rgba(255,255,255,0.85)" />
          <DashedRing x={540} y={560} r={172} color={COLORS.royal} rotate={t * 20} opacity={badge} />
          <At x={540} y={535} opacity={badge} scale={0.7 + 0.3 * easeBack(badge)}>
            <GradientLatin size={130} shine={prog(t, 1.2, 2.0)}>
              {c.big}
            </GradientLatin>
          </At>
          <At x={540} y={625} opacity={badge}>
            <Latin size={24} weight={700} color={COLORS.grey} tracking={5}>
              {c.small}
            </Latin>
          </At>
        </>
      )}
      <Product name="zesty-lemon-tube" x={175} y={640 + 80 * (1 - p)} height={480} rotate={-10} opacity={p} />
      <Product name="herbal-mint-tube" x={905} y={640 + 80 * (1 - p)} height={480} rotate={10} opacity={p} />
      {c.lines.map((l, i) => {
        const q = prog(t, 1.0 + i * 0.35, 1.6 + i * 0.35);
        if (q <= 0) return null;
        const y = 1010 + i * 165 + 30 * (1 - easeOut(q));
        return (
          <React.Fragment key={l.en}>
            <GlassCard x={540} y={y} w={940} h={140} radius={40} opacity={q} fill="rgba(255,255,255,0.92)" />
            <GradientDot x={135} y={y} d={84} opacity={q}>
              <Icon name={ICONS[i]} size={42} />
            </GradientDot>
            <div style={{ position: 'absolute', left: 200, top: y - 52, opacity: q }}>
              <Latin size={22} color={COLORS.royal} tracking={3}>
                {l.en}
              </Latin>
              <div />
              <Khmer size={34} weight={600}>
                {l.kh}
              </Khmer>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
