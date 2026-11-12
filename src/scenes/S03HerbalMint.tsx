import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GreenBg } from '../components/Backgrounds';
import { Leaf, makeLeaves, makeParticles, RisingBubbles, Sparkles } from '../components/Decor';
import { VariantHero } from '../components/VariantHero';
import { easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const LEAVES = makeLeaves(5, 11);
const DROPS = makeParticles(12, 22);
const DUST = makeParticles(13, 40);

/** 03 — Herbal Mint · Green Edition. Liquid wave in, floating botanical leaves. */
export const S03HerbalMint: React.FC = () => {
  const t = useTime();
  const c = COPY.herbal;
  return (
    <AbsoluteFill>
      <GreenBg />
      <Sparkles particles={DUST} t={t} color={COLORS.sage} opacity={0.7} />
      {LEAVES.map((lf, i) => {
        const a = prog(t, 0.2 + i * 0.05, 0.8 + i * 0.05);
        const x = lf.x + 18 * Math.sin(t * 0.9 + lf.phase);
        const y = lf.y + lf.vy * t - 40 * (1 - easeOut(a));
        // keep the product and the title zone clean
        if ((x > 340 && x < 740 && y > 640 && y < 1600) || y < 720) return null;
        return <Leaf key={i} x={x} y={y} length={lf.length} rotate={lf.a0 + lf.va * t} dark={lf.dark} opacity={a * 0.95} />;
      })}
      <RisingBubbles particles={DROPS} t={t} opacity={0.6} />
      <VariantHero
        t={t}
        product="herbal-mint-tube"
        label={c.label}
        title1={c.title1}
        title2={c.title2}
        kh={c.kh as [string, string]}
        accent={COLORS.sage}
        khColor={COLORS.cream}
        glow={COLORS.freshGreen}
        callouts={c.callouts}
        calloutY={[1230, 1050]}
      />
    </AbsoluteFill>
  );
};
