import React from 'react';
import { COLORS } from '../lib/theme';
import { easeOut } from '../lib/anim';
import { GlassCard, GradientDot } from './GlassCard';
import { Icon, IconName } from './Icons';
import { Khmer, Latin } from './Typography';

/** Infographic benefit card: gradient icon disc + English label + Khmer caption. */
export const BenefitCard: React.FC<{ p: number; y: number; icon: IconName; en: string; kh: string }> = ({ p, y, icon, en, kh }) => {
  if (p <= 0) return null;
  const e = easeOut(p);
  const x0 = 520 + 120 * (1 - e);
  return (
    <>
      <GlassCard x={x0 + 260} y={y} w={520} h={160} opacity={p} />
      <GradientDot x={x0 + 74} y={y} d={92} opacity={p}>
        <Icon name={icon} size={46} />
      </GradientDot>
      <div style={{ position: 'absolute', left: x0 + 140, top: y - 56, opacity: p, width: 360 }}>
        <Latin size={30} color={COLORS.charcoal} tracking={2}>
          {en}
        </Latin>
        <div style={{ height: 4 }} />
        <Khmer size={30} weight={600} color={COLORS.mid}>
          {kh}
        </Khmer>
      </div>
    </>
  );
};
