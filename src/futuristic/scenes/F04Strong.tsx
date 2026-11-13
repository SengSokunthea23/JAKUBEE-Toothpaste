import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F, ease } from '../theme';
import { Frame } from '../ui/Frame';
import { HexShield, Tooth } from '../ui/Objects';
import { Cam, Particles } from '../ui/Stage';
import { At, Kinetic } from '../ui/Type';

/** 04 — Strong teeth: a dimensional tooth inside assembling hexagonal protective layers (a shield metaphor). */
export const F04Strong: React.FC = () => {
  const t = useTime();
  const c = FUT.strong;
  const enter = ease.outExpo(prog(t, 0, 0.8));
  const [l1, l2] = c.en.split(' ');
  return (
    <Frame t={t} label={chapter(4, c.label)} kh={c.kh} khAt={0.9} glows={[{ x: 540, y: 900, r: 480, color: F.neon, a: 0.2 }]}>
      <Cam t={t} dur={3} from={1} to={1.05}>
        <Particles t={t} seed={44} n={16} p={0.6} colors={[F.neon]} />
        <HexShield cx={540} cy={920} r={390} p={prog(t, 0.35, 1.4)} t={t} />
        <Tooth id="f04" x={540} y={920} size={500} opacity={enter} rim={F.neon} shine={prog(t, 1.3, 2.2)} />
      </Cam>
      <At x={540} y={300}>
        <Kinetic text={l1} t={t} at={0.15} size={80} />
      </At>
      <At x={540} y={400}>
        <Kinetic text={l2} t={t} at={0.3} size={120} accent={[l2]} />
      </At>
    </Frame>
  );
};
