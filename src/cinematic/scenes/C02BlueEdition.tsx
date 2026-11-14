import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { DropletField, IceField, LemonField } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { FloatLabel } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage } from '../fx/Stage';
import { Eyebrow, KhIn, Lt, Pos, TitleIn } from '../fx/Type';
import { BLUE, GRAD, ease } from '../theme';

/** 02 — Blue Edition in a cool underwater light environment. */
export const C02BlueEdition: React.FC = () => {
  const t = useTime();
  const c = COPY.lemon;
  const cam = { x: -30 * ease.inOutSine(prog(t, 0, 5.4)), y: 0, z: 1 + 0.06 * ease.inOutSine(prog(t, 0, 5.4)) };
  const enter = ease.outQuint(prog(t, 0.2, 1.6));
  const turn = 16 * (1 - enter);
  const bob = 10 * Math.sin(t * 1.2);
  const PX = 720;
  const PY = 1150 + bob;
  return (
    <AbsoluteFill>
      <Stage tone="blue" t={t} caustics focusX={700} focusY={900} />
      <Plane cam={cam} depth={0.25}>
        <LemonField t={t} seed={21} n={3} blur={12} opacity={0.5} />
        <Bokeh t={t} seed={22} n={16} colors={[BLUE.aqua, BLUE.ice, BLUE.pale]} blur={12} />
      </Plane>
      <Plane cam={cam} depth={0.6}>
        <IceField t={t} seed={23} n={5} />
        <DropletField t={t} seed={24} n={26} tint={BLUE.ice} speed={36} focal={0.45} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Glow x={PX} y={PY} rx={360} ry={600} color={BLUE.aqua} a={0.35} blur={60} />
        <HeroProduct name="zesty-lemon-tube" x={PX} y={PY + 90 * (1 - enter)} height={1120} rotate={-4} turn={turn} exposure={0.3 + 0.7 * enter} focus={14 * (1 - enter)} rim={BLUE.aqua} rimStrength={1.3} sweep={prog(t, 2.0, 2.9)} shadow={false} />
        <FloatLabel t={t} at={2.7} ax={PX - 150} ay={PY + 160} lx={275} ly={1170} color={BLUE.aqua} w={360} h={112}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <Lt size={46} color="#FFFFFF">
              {c.callouts[0].big}
            </Lt>
            <Lt size={20} weight={700} color={BLUE.ice} tracking={3}>
              {c.callouts[0].small}
            </Lt>
          </div>
        </FloatLabel>
        <FloatLabel t={t} at={2.3} ax={PX - 75} ay={PY + 40} lx={275} ly={980} color={BLUE.aqua} w={360} h={112}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <Lt size={40} color="#FFFFFF">
              {c.callouts[1].big}
            </Lt>
            <Lt size={20} weight={700} color={BLUE.ice} tracking={3}>
              {c.callouts[1].small}
            </Lt>
          </div>
        </FloatLabel>
      </Plane>
      {/* foreground: large defocused droplets drifting past the lens */}
      <Plane cam={cam} depth={1.5}>
        <DropletField t={t} seed={25} n={4} tint={BLUE.ice} speed={70} focal={-1} opacity={0.6} />
      </Plane>
      <Pos x={90} y={300} align="left">
        <Eyebrow text={c.label} p={prog(t, 0.6, 1.4)} color={BLUE.ice} lines={false} />
      </Pos>
      <Pos x={84} y={410} align="left">
        <TitleIn text={c.title1} t={t} at={0.8} size={150} trackFrom={30} trackTo={2} />
      </Pos>
      <Pos x={84} y={552} align="left">
        <TitleIn text={c.title2} t={t} at={1.05} size={150} trackFrom={30} trackTo={2} fill={GRAD.ice} />
      </Pos>
      <Pos x={90} y={1400} align="left">
        <KhIn text={c.khShort[0]} t={t} at={1.7} size={70} />
      </Pos>
      <Pos x={90} y={1500} align="left">
        <KhIn text={c.khShort[1]} t={t} at={1.95} size={56} weight={600} color={BLUE.ice} />
      </Pos>
    </AbsoluteFill>
  );
};
