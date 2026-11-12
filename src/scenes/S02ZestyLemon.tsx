import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BlueBg } from '../components/Backgrounds';
import { IceCube, LemonSlice, makeParticles, RisingBubbles, Sparkles } from '../components/Decor';
import { VariantHero } from '../components/VariantHero';
import { prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const BUBBLES = makeParticles(11, 34);
const DUST = makeParticles(13, 40);
const ICE = [
  { x: 905, y: 1330, s: 140, a0: 20, k: 1 },
  { x: 175, y: 840, s: 110, a0: -15, k: -1 },
  { x: 980, y: 1120, s: 80, a0: 40, k: 1 },
];

/** 02 — Zesty Lemon · Blue Edition. Water ripple in, bubbles, ice, citrus. */
export const S02ZestyLemon: React.FC = () => {
  const t = useTime();
  const c = COPY.lemon;
  return (
    <AbsoluteFill>
      <BlueBg />
      <Sparkles particles={DUST} t={t} color={COLORS.ice} opacity={0.8} />
      <LemonSlice x={140 + 8 * t} y={1520 - 6 * t} d={230} rotate={15 + t * 7} opacity={0.95 * prog(t, 0.3, 1.0)} />
      <LemonSlice x={950 - 6 * t} y={820 + 5 * t} d={170} rotate={-30 - t * 9} opacity={0.9 * prog(t, 0.5, 1.2)} />
      {ICE.map((i, k) => (
        <IceCube key={k} x={i.x} y={i.y + 12 * Math.sin(t * 1.4 + i.x)} s={i.s} rotate={i.a0 + i.k * t * 10} opacity={0.9 * prog(t, 0.4, 1.0)} />
      ))}
      <RisingBubbles particles={BUBBLES} t={t} opacity={0.9} />
      <VariantHero
        t={t}
        product="zesty-lemon-tube"
        label={c.label}
        title1={c.title1}
        title2={c.title2}
        kh={c.kh as [string, string]}
        accent={COLORS.ice}
        khColor={COLORS.softBlue}
        glow={COLORS.aqua}
        callouts={c.callouts}
        calloutY={[1210, 1020]}
      />
    </AbsoluteFill>
  );
};
