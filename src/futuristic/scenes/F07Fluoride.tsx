import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F, ease } from '../theme';
import { Frame } from '../ui/Frame';
import { Converge, RingIndicator, Tooth } from '../ui/Objects';
import { Cam } from '../ui/Stage';
import { At, Kinetic, TechLabel } from '../ui/Type';

/** 07 — Fluoride: luminous particles gather into a protective ring around the tooth; a circular indicator completes. */
export const F07Fluoride: React.FC = () => {
  const t = useTime();
  const c = FUT.fluoride;
  const enter = ease.outExpo(prog(t, 0.1, 0.9));
  return (
    <Frame t={t} label={chapter(6, c.label)} kh={c.kh} khAt={0.6} khSize={34} glows={[{ x: 540, y: 980, r: 520, color: F.cyan, a: 0.2 }, { x: 540, y: 980, r: 260, color: F.neon, a: 0.12 }]}>
      <Cam t={t} dur={3} from={1.04} to={1}>
        <RingIndicator x={540} y={980} r={300} p={prog(t, 0.7, 2.0)} t={t} color={F.ice} />
        <Converge t={t} seed={77} n={44} p={prog(t, 0, 1.4)} cx={540} cy={980} rx={360} ry={360} />
        <Tooth id="f07" x={540} y={980} size={430} opacity={enter} rim={F.cyan} shine={prog(t, 1.4, 2.3)} />
      </Cam>
      <At x={540} y={350}>
        <Kinetic text={c.en} t={t} at={0.1} size={150} accent={[c.en]} accentColor={F.ice} track={[0.3, 0.06]} />
      </At>
      <At x={540} y={1400}>
        <TechLabel text={`${c.label} · ${c.ring}`} p={prog(t, 1.2, 1.8)} dot={F.ice} />
      </At>
    </Frame>
  );
};
