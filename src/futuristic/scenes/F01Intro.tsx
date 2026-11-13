import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { LemonSlice3D } from '../../editorial/ui/Lemon';
import { FUT, chapter } from '../copy';
import { F, ease, hexA, lerp } from '../theme';
import { Frame } from '../ui/Frame';
import { Droplets, Hero } from '../ui/Objects';
import { Beam, Cam, Particles } from '../ui/Stage';
import { At, GlitchText, Kinetic, latin } from '../ui/Type';

/** 01 — Cinematic lemon intro: a lemon slice turns in the dark, a yellow-green light sweep, the real tube rises. */
export const F01Intro: React.FC = () => {
  const t = useTime();
  const c = FUT.intro;
  const lemonIn = ease.outExpo(prog(t, 0, 0.8));
  const lift = ease.inOut(prog(t, 0.9, 1.9));
  const tube = ease.outExpo(prog(t, 0.9, 2.0));
  const sweepX = lerp(-500, 1580, ease.inOut(prog(t, 0.55, 1.35)));
  return (
    <Frame t={t} label={chapter(1, c.label)} kh={c.kh} khAt={1.5} glows={[{ x: 540, y: 820, r: 520, color: F.zest, a: 0.22 }, { x: 540, y: 1300, r: 460, color: F.neon, a: 0.16 }]} floor>
      <Cam t={t} dur={3.5} from={1.06} to={1}>
        <Beam x={540} color={F.lemon} a={0.16 * lemonIn} />
        <LemonSlice3D x={540} y={lerp(860, 600, lift)} d={lerp(430, 250, lift)} rotate={t * 16} tilt={lerp(20, 45, lift)} opacity={lemonIn} blur={4 * lift} />
        <Droplets t={t} seed={41} n={9} p={prog(t, 0.2, 1.0)} area={{ x0: 230, x1: 850, y0: 560, y1: 1150 }} />
        <Particles t={t} seed={42} n={22} p={0.8} />
        <Hero x={540} y={1090 + 420 * (1 - tube)} height={860} opacity={tube} sweep={prog(t, 1.9, 2.7)} rim={F.lemon} />
      </Cam>
      {/* yellow-green light sweep */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweepX - 220}px, ${hexA(F.lemon, 0.28)} ${sweepX - 60}px, ${hexA(F.neon, 0.18)} ${sweepX + 40}px, transparent ${sweepX + 200}px)`, mixBlendMode: 'screen', filter: 'blur(12px)' }} />
      <At x={540} y={330}>
        <GlitchText text={c.en} t={t} at={1.1} style={{ ...latin(124, 800, F.white, 2), textShadow: `0 0 40px ${hexA(F.lemon, 0.35)}` }} />
      </At>
      <At x={540} y={438}>
        <Kinetic text={c.sub} t={t} at={1.35} size={38} color={F.lemon} track={[0.6, 0.32]} weight={700} />
      </At>
    </Frame>
  );
};
