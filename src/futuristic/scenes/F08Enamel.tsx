import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F } from '../theme';
import { Frame } from '../ui/Frame';
import { Pointer, ToothSection } from '../ui/Objects';
import { Cam, Grid } from '../ui/Stage';
import { At, Kinetic } from '../ui/Type';

// Section geometry: size 700 centred on (540, 960) over a 200-unit viewBox → 3.5 px per unit.
const S = 3.5;
const X0 = 540 - 350 - 20 * S;
const Y0 = 960 - 350 - 20 * S;
const px = (vx: number) => X0 + vx * S;
const py = (vy: number) => Y0 + vy * S;

/** 08 — Enamel care: a stylised cross-section builds layer by layer; the enamel band lights up, thin pointers label it. */
export const F08Enamel: React.FC = () => {
  const t = useTime();
  const c = FUT.enamel;
  return (
    <Frame t={t} label={chapter(8, c.label)} kh={c.kh} khAt={1.0} glows={[{ x: 540, y: 960, r: 520, color: F.neon, a: 0.12 }, { x: 540, y: 960, r: 300, color: F.cyan, a: 0.1 }]}>
      <Grid t={t} p={prog(t, 0, 1)} y0={1250} opacity={0.3} />
      <Cam t={t} dur={3.5} from={1} to={1.04}>
        <ToothSection x={540} y={960} size={700} p={prog(t, 0.1, 1.3)} hot={prog(t, 1.2, 1.7)} t={t} />
      </Cam>
      <Pointer x={px(200)} y={py(90)} tx={880} ty={700} p={prog(t, 1.2, 1.8)} label={c.parts[0]} color={F.neon} />
      {/* points on the dentin / pulp outlines (see ToothSection's transforms) */}
      <Pointer x={px(120 + 0.78 * 77)} y={py(70 + 0.7 * 40)} tx={880} ty={1000} p={prog(t, 1.4, 2.0)} label={c.parts[1]} color={F.zest} />
      <Pointer x={px(120 + 0.42 * 77)} y={py(72 + 0.45 * 40)} tx={880} ty={1180} p={prog(t, 1.6, 2.2)} label={c.parts[2]} color={F.ice} />
      <At x={540} y={330}>
        <Kinetic text={c.en} t={t} at={0.15} size={108} accent={['ENAMEL']} />
      </At>
    </Frame>
  );
};
