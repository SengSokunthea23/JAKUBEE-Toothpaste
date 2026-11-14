import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FreshBg } from '../components/Backgrounds';
import { Bubble, FoamBank, makeFoam, makeParticles } from '../components/Decor';
import { GlassCard, GradientDot } from '../components/GlassCard';
import { Icon } from '../components/Icons';
import { Product } from '../components/Product';
import { GradientLatin, Khmer, Latin, Reveal } from '../components/Typography';
import { easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const FOAM = makeFoam(9, 90);
const RISE = makeParticles(11, 20);

/** 05 — Fresh breath & tartar removal over a creamy macro foam bank. */
export const S05FreshBreath: React.FC = () => {
  const t = useTime();
  const c = COPY.fresh;
  const p = easeOut(prog(t, 0.1, 1.0));
  const sweep = prog(t, 1.5, 2.3);
  const pill = prog(t, 2.0, 2.6);
  const py = 1470 + 40 * (1 - easeOut(pill));
  return (
    <AbsoluteFill>
      <FreshBg />
      <Product name="zesty-lemon-tube" x={375} y={1010 + 80 * (1 - p)} height={720} rotate={-12} opacity={p} sweep={sweep} />
      <Product name="herbal-mint-tube" x={705} y={1010 + 80 * (1 - p)} height={720} rotate={12} opacity={p} sweep={sweep} />
      <FoamBank foam={FOAM} t={t} />
      {t > 0.6 &&
        RISE.map((b, i) => {
          const y = 1500 - ((b.speed * 2.2 * (t - 0.6) + b.phase * 60) % 1300);
          return <Bubble key={i} x={b.x + 10 * Math.sin(t * 2 + b.phase)} y={y} r={b.r} opacity={0.55 * b.a} />;
        })}
      <Reveal x={540} y={300} p={prog(t, 0.3, 0.9)}>
        <Latin size={124} color={COLORS.charcoal} tracking={4}>
          {c.line1}
        </Latin>
      </Reveal>
      <Reveal x={540} y={455} p={prog(t, 0.45, 1.05)}>
        <GradientLatin size={124} tracking={4} shine={prog(t, 1.2, 2.0)}>
          {c.line2}
        </GradientLatin>
      </Reveal>
      <Reveal x={540} y={598} p={prog(t, 0.8, 1.4)}>
        <Khmer size={37}>{c.kh}</Khmer>
      </Reveal>
      <GlassCard x={540} y={py} w={880} h={120} radius={60} opacity={pill} fill="rgba(255,255,255,0.92)" />
      <GradientDot x={170} y={py} d={76} opacity={pill} gradient={`linear-gradient(90deg, ${COLORS.aqua}, ${COLORS.freshGreen})`}>
        <Icon name="bubbles" size={40} />
      </GradientDot>
      {pill > 0 && (
        <div style={{ position: 'absolute', left: 230, top: py - 50, opacity: pill }}>
          <Latin size={28} color={COLORS.charcoal} tracking={3}>
            {c.pillEn}
          </Latin>
          <div />
          <Khmer size={30} weight={600} color={COLORS.royal}>
            {c.pillKh}
          </Khmer>
        </div>
      )}
    </AbsoluteFill>
  );
};
