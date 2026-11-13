import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F, ease } from '../theme';
import { Frame } from '../ui/Frame';
import { Tooth } from '../ui/Objects';
import { Cam, Particles } from '../ui/Stage';
import { At, Kinetic } from '../ui/Type';

/** 05 — Clean, bright, smooth: cinematic close-up of the tooth, a soft reflection sweep, sparkle particles. */
export const F05Bright: React.FC = () => {
  const t = useTime();
  const c = FUT.bright;
  const enter = ease.outExpo(prog(t, 0, 0.9));
  return (
    <Frame t={t} label={chapter(5, c.label)} kh={c.kh} khAt={0.9} glows={[{ x: 660, y: 1080, r: 600, color: F.ice, a: 0.16 }, { x: 300, y: 500, r: 300, color: F.lemon, a: 0.1 }]}>
      <Cam t={t} dur={3} from={1.12} to={1.02} dx={-30}>
        <Tooth id="f05" x={660} y={1110} size={1000} opacity={enter} rim={F.ice} shine={prog(t, 0.6, 1.7)} />
        <Particles t={t} seed={55} n={26} p={prog(t, 0.6, 1.4)} colors={[F.white, F.lemon, F.ice]} size={[3, 7]} area={{ x0: 220, x1: 1080, y0: 600, y1: 1500 }} />
      </Cam>
      {c.words.map((w, i) => (
        <At key={w} x={80} y={330 + i * 118} align="left">
          <Kinetic text={w} t={t} at={0.2 + i * 0.22} size={112} accent={i === 1 ? [w] : []} accentColor={F.lemon} />
        </At>
      ))}
    </Frame>
  );
};
