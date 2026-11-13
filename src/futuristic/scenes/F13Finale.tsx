import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { LemonSlice3D } from '../../editorial/ui/Lemon';
import { FUT, chapter } from '../copy';
import { F, ease, hexA, lerp } from '../theme';
import { Frame } from '../ui/Frame';
import { Droplets, Hero, IceCube, MintLeaf } from '../ui/Objects';
import { Beam, Cam, Particles } from '../ui/Stage';
import { At, GlitchText, latin } from '../ui/Type';

/** 13 — Zesty Lemon hero finale: lemon environment, droplets, ice and mint, oversized ZESTY LEMON behind the tube, JAKUBEE reveal. */
export const F13Finale: React.FC = () => {
  const t = useTime();
  const c = FUT.finale;
  const tube = ease.outExpo(prog(t, 0.1, 1.2));
  const env = ease.outExpo(prog(t, 0.2, 1.2));
  const word = ease.outExpo(prog(t, 0.5, 1.5));
  const sweepX = lerp(-300, 1380, ease.inOut(prog(t, 1.7, 2.5)));
  return (
    <Frame t={t} label={chapter(13, c.label)} kh={c.kh} khAt={1.6} khSize={34} khY={1665} glows={[{ x: 540, y: 900, r: 560, color: F.zest, a: 0.22 }, { x: 540, y: 1250, r: 420, color: F.neon, a: 0.16 }, { x: 900, y: 500, r: 260, color: F.lemon, a: 0.12 }]} floor>
      <Cam t={t} dur={5} from={1.08} to={1}>
        <Beam x={540} color={F.lemon} a={0.18 * env} />
        {/* oversized type behind the tube */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: word, transform: `scale(${1.08 - 0.08 * word})` }}>
          <span style={{ ...latin(170, 800, 'transparent', 6 + 10 * (1 - word)), WebkitTextStroke: `2px ${hexA(F.lemon, 0.75)}`, textShadow: `0 0 40px ${hexA(F.lemon, 0.25)}` }}>ZESTY</span>
          <span style={{ ...latin(170, 800, hexA(F.zest, 0.95), 6 + 10 * (1 - word)), textShadow: `0 0 50px ${hexA(F.zest, 0.4)}` }}>LEMON</span>
        </div>
        <Particles t={t} seed={131} n={26} p={env} colors={[F.lemon, F.neon, F.white]} />
        <LemonSlice3D x={170} y={760} d={230 * env} rotate={t * 10} tilt={30} blur={2} />
        <LemonSlice3D x={930} y={1240} d={260 * env} rotate={-t * 12} tilt={25} />
        <LemonSlice3D x={880} y={640} d={130 * env} rotate={t * 18} tilt={40} blur={4} />
        <IceCube x={200} y={1300} s={110} rotate={18 + t * 6} opacity={env * 0.9} />
        <IceCube x={960} y={950} s={80} rotate={-12 - t * 8} opacity={env * 0.8} blur={2} />
        <MintLeaf x={300} y={1420} len={140} rotate={-20 + 5 * Math.sin(t * 1.3)} opacity={env} />
        <Droplets t={t} seed={132} n={12} p={prog(t, 0.4, 1.3)} area={{ x0: 120, x1: 960, y0: 600, y1: 1450 }} />
        <Hero x={540} y={1010 + 360 * (1 - tube)} height={900} opacity={tube} sweep={prog(t, 1.2, 2.0)} rim={F.lemon} rimA={0.7} />
      </Cam>
      {/* light sweep across the brand */}
      <At x={540} y={300}>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <GlitchText text={c.brand} t={t} at={1.0} style={{ ...latin(104, 800, F.white, 22), textShadow: `0 0 30px ${hexA(F.neon, 0.35)}` }} />
          <span style={{ position: 'absolute', inset: '-20px -40px', background: `linear-gradient(105deg, transparent ${sweepX - 120}px, ${hexA(F.white, 0.65)} ${sweepX}px, transparent ${sweepX + 120}px)`, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
        </span>
      </At>
      <At x={540} y={392}>
        <span style={{ ...latin(22, 700, F.lemon, 10), opacity: ease.outExpo(prog(t, 1.4, 2.0)) }}>ZESTY LEMON TOOTHPASTE</span>
      </At>
    </Frame>
  );
};
