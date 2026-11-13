import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { LemonSlice3D } from '../../editorial/ui/Lemon';
import { FUT, chapter } from '../copy';
import { F, ease } from '../theme';
import { Frame } from '../ui/Frame';
import { AirTrails, Hero, MintLeaf } from '../ui/Objects';
import { Cam, Particles } from '../ui/Stage';
import { At, Kinetic } from '../ui/Type';

const CX = 540;
const CY = 1010;

/** 11 — Fresh breath: a camera orbit — lemon slices circle the tube in depth, cool cyan particles, mint accents, air trails. */
export const F11Breath: React.FC = () => {
  const t = useTime();
  const c = FUT.breath;
  const enter = ease.outExpo(prog(t, 0, 0.8));
  const lemons = [0, 1, 2].map((i) => {
    const a = t * 0.9 + (i * 2 * Math.PI) / 3;
    const depth = (Math.sin(a) + 1) / 2;
    return { i, x: CX + 380 * Math.cos(a) * enter, y: CY - 40 + 120 * Math.sin(a), d: 120 + 90 * depth, depth, rot: t * 30 + i * 70 };
  });
  const lemon = (l: (typeof lemons)[number]) => <LemonSlice3D key={l.i} x={l.x} y={l.y} d={l.d} rotate={l.rot} tilt={35} opacity={enter} blur={l.depth < 0.35 ? 3 : 0} />;
  return (
    <Frame t={t} label={chapter(11, c.label)} kh={c.kh} khAt={0.9} glows={[{ x: 540, y: 980, r: 520, color: F.ice, a: 0.16 }, { x: 540, y: 1200, r: 360, color: F.lemon, a: 0.1 }]} floor>
      <Cam t={t} dur={3} from={1.05} to={1} rot={-1.5}>
        <Particles t={t} seed={111} n={30} p={0.9} colors={[F.ice, F.cyan, F.white]} rise={60} />
        {lemons.filter((l) => l.depth < 0.5).map(lemon)}
        <Hero x={CX} y={CY} height={740} rotate={-3 + 6 * ease.inOutSine(prog(t, 0, 3))} sweep={prog(t, 0.8, 1.6)} rim={F.ice} />
        {lemons.filter((l) => l.depth >= 0.5).map(lemon)}
        <MintLeaf x={230} y={1330} len={150} rotate={-25 + 6 * Math.sin(t * 1.4)} opacity={enter} />
        <MintLeaf x={860} y={700} len={120} rotate={30 + 6 * Math.sin(t * 1.2)} opacity={enter} blur={2} />
        <AirTrails t={t} p={prog(t, 0.3, 1.5)} y={1260} n={4} spread={40} amp={70} />
      </Cam>
      <At x={540} y={300}>
        <Kinetic text={c.en1} t={t} at={0.15} size={96} />
      </At>
      <At x={540} y={410}>
        <Kinetic text={c.en2} t={t} at={0.35} size={96} accent={['FRESH', 'FEELING.']} accentColor={F.ice} />
      </At>
    </Frame>
  );
};
