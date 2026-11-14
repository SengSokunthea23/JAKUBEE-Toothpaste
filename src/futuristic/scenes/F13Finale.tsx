import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { LemonSlice3D } from '../../editorial/ui/Lemon';
import { FUT, chapter } from '../copy';
import { F, ease, hexA, lerp } from '../theme';
import { Frame } from '../ui/Frame';
import { Droplets, Hero, IceCube, MintLeaf } from '../ui/Objects';
import { Beam, Cam, Particles } from '../ui/Stage';
import { At, GlitchText, khmer, latin } from '../ui/Type';

/** 14 — Hero finale: lemon and mint environment, droplets, ice, oversized LEMON / MINT behind both tubes, JAKUBEE reveal. */
export const F13Finale: React.FC = () => {
  const t = useTime();
  const c = FUT.finale;
  const tube = ease.outExpo(prog(t, 0.1, 1.2));
  const env = ease.outExpo(prog(t, 0.2, 1.2));
  const word = ease.outExpo(prog(t, 0.5, 1.5));
  const sweepX = lerp(-300, 1380, ease.inOut(prog(t, 1.7, 2.5)));
  return (
    <Frame t={t} label={chapter(9, c.label)} kh={c.kh} khAt={1.3} khSize={32} khY={1690} glows={[{ x: 540, y: 900, r: 560, color: F.zest, a: 0.22 }, { x: 540, y: 1250, r: 420, color: F.neon, a: 0.16 }, { x: 900, y: 500, r: 260, color: F.lemon, a: 0.12 }]} floor>
      <Cam t={t} dur={5} from={1.08} to={1}>
        <Beam x={540} color={F.lemon} a={0.18 * env} />
        {/* oversized type behind the tube */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: word, transform: `scale(${1.08 - 0.08 * word})` }}>
          <span style={{ ...latin(170, 800, 'transparent', 6 + 10 * (1 - word)), WebkitTextStroke: `2px ${hexA(F.lemon, 0.75)}`, textShadow: `0 0 40px ${hexA(F.lemon, 0.25)}` }}>LEMON</span>
          <span style={{ ...latin(170, 800, hexA(F.mint, 0.95), 6 + 10 * (1 - word)), textShadow: `0 0 50px ${hexA(F.mint, 0.4)}` }}>MINT</span>
        </div>
        <Particles t={t} seed={131} n={26} p={env} colors={[F.lemon, F.neon, F.white]} />
        <LemonSlice3D x={170} y={760} d={230 * env} rotate={t * 10} tilt={30} blur={2} />
        <LemonSlice3D x={930} y={1240} d={260 * env} rotate={-t * 12} tilt={25} />
        <LemonSlice3D x={880} y={640} d={130 * env} rotate={t * 18} tilt={40} blur={4} />
        <IceCube x={200} y={1300} s={110} rotate={18 + t * 6} opacity={env * 0.9} />
        <IceCube x={960} y={950} s={80} rotate={-12 - t * 8} opacity={env * 0.8} blur={2} />
        <MintLeaf x={300} y={1420} len={140} rotate={-20 + 5 * Math.sin(t * 1.3)} opacity={env} />
        <Droplets t={t} seed={132} n={12} p={prog(t, 0.4, 1.3)} area={{ x0: 120, x1: 960, y0: 600, y1: 1450 }} />
        <MintLeaf x={850} y={1300} len={130} rotate={24 + 5 * Math.sin(t * 1.1)} opacity={env} />
        <Hero x={435} y={930 + 360 * (1 - tube)} height={740} opacity={tube} sweep={prog(t, 1.2, 2.0)} rim={F.lemon} rimA={0.7} rotate={-5} />
        <Hero flavour="herbal" x={650} y={938 + 360 * (1 - tube)} height={730} opacity={tube} sweep={prog(t, 1.35, 2.15)} rim={F.mint} rimA={0.7} rotate={5} />
      </Cam>
      {/* light sweep across the brand */}
      <At x={540} y={300}>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <GlitchText text={c.brand} t={t} at={1.0} style={{ ...latin(104, 800, F.white, 22), textShadow: `0 0 30px ${hexA(F.neon, 0.35)}` }} />
          <span style={{ position: 'absolute', inset: '-20px -40px', background: `linear-gradient(105deg, transparent ${sweepX - 120}px, ${hexA(F.white, 0.65)} ${sweepX}px, transparent ${sweepX + 120}px)`, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
        </span>
      </At>
      <At x={540} y={392}>
        <span style={{ ...latin(22, 700, F.lemon, 10), opacity: ease.outExpo(prog(t, 1.4, 2.0)) }}>{c.en}</span>
      </At>
      <NeonCta t={t} at={2.4} y={1450} label={c.cta} />
    </Frame>
  );
};

/** Order CTA (as in the Commercial theme): dark glass pill with a neon edge, a breathing glow and a light sweep. */
const NeonCta: React.FC<{ t: number; at: number; y: number; label: string }> = ({ t, at, y, label }) => {
  const p = ease.outExpo(prog(t, at, at + 0.6));
  if (p <= 0) return null;
  const live = Math.max(0, t - at - 0.6);
  const breathe = 0.5 + 0.5 * Math.sin(live * 3.2);
  const sw = (live % 1.8) / 0.9;
  const pos = -25 + 150 * sw;
  return (
    <div
      style={{
        position: 'absolute',
        left: 540 - 330,
        top: y - 56,
        width: 660,
        height: 112,
        borderRadius: 56,
        opacity: p,
        transform: `translateY(${30 * (1 - p)}px) scale(${1 + 0.015 * breathe})`,
        background: `linear-gradient(90deg, ${hexA(F.neon, 0.92)}, ${hexA(F.lemon, 0.92)})`,
        boxShadow: `0 0 ${24 + 26 * breathe}px ${hexA(F.neon, 0.5)}, inset 0 2px 0 rgba(255,255,255,0.5)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        overflow: 'hidden',
      }}
    >
      <span style={khmer(44, 700, F.obsidian)}>{label}</span>
      <span style={{ ...latin(40, 800, F.obsidian), lineHeight: 1 }}>→</span>
      {sw > 0 && sw < 1 && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${pos - 10}%, rgba(255,255,255,0.55) ${pos}%, transparent ${pos + 10}%)` }} />}
    </div>
  );
};
