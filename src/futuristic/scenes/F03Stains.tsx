import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F, ease } from '../theme';
import { Frame } from '../ui/Frame';
import { Pointer, Tooth } from '../ui/Objects';
import { Cam, Grid } from '../ui/Stage';
import { At, Kinetic } from '../ui/Type';

/** 03 — Surface stains: abstract spots on the tooth surface, a clean scan line passes and clears them. */
export const F03Stains: React.FC = () => {
  const t = useTime();
  const c = FUT.stains;
  const enter = ease.outExpo(prog(t, 0, 0.8));
  return (
    <Frame t={t} label={chapter(3, c.label)} kh={c.kh} khAt={1.0} glows={[{ x: 540, y: 880, r: 520, color: F.lemon, a: 0.12 }, { x: 540, y: 1200, r: 380, color: F.neon, a: 0.1 }]}>
      <Grid t={t} p={prog(t, 0, 1.2)} y0={1180} opacity={0.35} />
      <Cam t={t} dur={3.5} from={1.04} to={1}>
        <Tooth id="f03" x={540} y={870} size={660} opacity={enter} stain={1} scan={prog(t, 1.0, 2.4)} rim={F.neon} />
      </Cam>
      <Pointer x={430} y={700} tx={230} ty={560} p={prog(t, 0.6, 1.2)} label={c.tags[0]} align="left" color={F.lemon} />
      <Pointer x={650} y={990} tx={790} ty={1190} p={prog(t, 0.8, 1.4)} label={c.tags[1]} />
      <At x={540} y={330}>
        <Kinetic text={c.en} t={t} at={0.2} size={112} accent={['STAIN']} accentColor={F.lemon} />
      </At>
    </Frame>
  );
};
