import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F, ease } from '../theme';
import { Frame } from '../ui/Frame';
import { AirTrails, Hero, Microbes } from '../ui/Objects';
import { Beam, Cam } from '../ui/Stage';
import { At, Kinetic } from '../ui/Type';

/** 10 — Bacteria & bad breath: abstract microscopic particles disperse as clean airflow passes; the tube takes the frame. */
export const F10Bacteria: React.FC = () => {
  const t = useTime();
  const c = FUT.bacteria;
  const tube = ease.outExpo(prog(t, 1.4, 2.3));
  return (
    <Frame t={t} label={chapter(10, c.label)} kh={c.kh} khAt={1.0} glows={[{ x: 540, y: 950, r: 520, color: F.lemon, a: 0.1 }, { x: 540, y: 1150, r: 420, color: F.neon, a: 0.14 * tube }]} floor>
      <Cam t={t} dur={3.5} from={1.05} to={1}>
        <Microbes t={t} seed={101} n={22} p={prog(t, 0, 0.8)} out={prog(t, 1.0, 2.2)} cx={540} cy={920} r={400} />
        <AirTrails t={t} p={prog(t, 0.9, 1.9)} y={920} n={5} spread={70} amp={110} color={F.ice} />
        <Beam x={540} color={F.neon} a={0.12 * tube} />
        <Hero x={540} y={1010 + 260 * (1 - tube)} height={760} opacity={tube} sweep={prog(t, 2.2, 3.0)} rim={F.neon} />
      </Cam>
      <At x={540} y={330}>
        <Kinetic text={c.en} t={t} at={0.15} size={104} accent={['FRESHER']} />
      </At>
    </Frame>
  );
};
