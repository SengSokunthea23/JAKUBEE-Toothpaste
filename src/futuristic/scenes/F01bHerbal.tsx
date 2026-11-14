import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F, ease, hexA, lerp } from '../theme';
import { Frame } from '../ui/Frame';
import { Droplets, Hero, MintLeaf } from '../ui/Objects';
import { Beam, Cam, Particles } from '../ui/Stage';
import { At, GlitchText, Kinetic, latin } from '../ui/Type';

const LEAVES = [
  { x: 210, y: 760, len: 190, rot: -28, blur: 3, ph: 0 },
  { x: 880, y: 690, len: 150, rot: 32, blur: 0, ph: 1.3 },
  { x: 170, y: 1300, len: 160, rot: 18, blur: 0, ph: 2.1 },
  { x: 920, y: 1250, len: 210, rot: -36, blur: 2, ph: 0.7 },
  { x: 760, y: 560, len: 100, rot: 70, blur: 4, ph: 1.9 },
];

/** 02 — Herbal Mint (Green Edition): mint leaves drift in the dark, a green light sweep, the real Herbal tube rises. */
export const F01bHerbal: React.FC = () => {
  const t = useTime();
  const c = FUT.herbal;
  const env = ease.outExpo(prog(t, 0, 0.8));
  const tube = ease.outExpo(prog(t, 0.5, 1.6));
  const sweepX = lerp(-500, 1580, ease.inOut(prog(t, 0.3, 1.1)));
  return (
    <Frame t={t} label={chapter(2, c.label)} kh={c.kh} khAt={1.3} glows={[{ x: 540, y: 860, r: 520, color: F.herb, a: 0.28 }, { x: 540, y: 1300, r: 460, color: F.mint, a: 0.16 }]} floor>
      <Cam t={t} dur={3.5} from={1.06} to={1}>
        <Beam x={540} color={F.mint} a={0.16 * env} />
        {LEAVES.map((l, i) => (
          <MintLeaf key={i} x={l.x + 14 * Math.sin(t * 0.9 + l.ph)} y={l.y + 40 * (1 - env) - 12 * t} len={l.len} rotate={l.rot + 8 * Math.sin(t * 1.1 + l.ph)} opacity={env * 0.95} blur={l.blur} />
        ))}
        <Droplets t={t} seed={51} n={8} p={prog(t, 0.2, 1.0)} area={{ x0: 230, x1: 850, y0: 560, y1: 1150 }} />
        <Particles t={t} seed={52} n={22} p={0.8} colors={[F.mint, F.neon, F.white]} />
        <Hero flavour="herbal" x={540} y={1090 + 420 * (1 - tube)} height={860} opacity={tube} sweep={prog(t, 1.6, 2.4)} rim={F.mint} />
      </Cam>
      {/* green light sweep */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweepX - 220}px, ${hexA(F.mint, 0.26)} ${sweepX - 60}px, ${hexA(F.neon, 0.16)} ${sweepX + 40}px, transparent ${sweepX + 200}px)`, mixBlendMode: 'screen', filter: 'blur(12px)' }} />
      <At x={540} y={330}>
        <GlitchText text={c.en} t={t} at={0.7} style={{ ...latin(124, 800, F.white, 2), textShadow: `0 0 40px ${hexA(F.mint, 0.4)}` }} />
      </At>
      <At x={540} y={438}>
        <Kinetic text={c.sub} t={t} at={0.95} size={38} color={F.mint} track={[0.6, 0.32]} weight={700} />
      </At>
    </Frame>
  );
};
