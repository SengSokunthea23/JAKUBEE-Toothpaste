import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { DropletField, LeafField } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { FloatLabel } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage } from '../fx/Stage';
import { Eyebrow, KhIn, Lt, Pos, TitleIn } from '../fx/Type';
import { GRAD, GREEN, ease } from '../theme';

/** 04 — Green Edition: soft botanical light, leaves drifting in slow motion. */
export const C04GreenEdition: React.FC = () => {
  const t = useTime();
  const c = COPY.herbal;
  const cam = { x: 30 * ease.inOutSine(prog(t, 0, 5.4)), y: 0, z: 1 + 0.06 * ease.inOutSine(prog(t, 0, 5.4)) };
  const enter = ease.outQuint(prog(t, 0.1, 1.5));
  const bob = 10 * Math.sin(t * 1.1 + 1);
  const PX = 360;
  const PY = 1150 + bob;
  return (
    <AbsoluteFill>
      <Stage tone="green" t={t} focusX={380} focusY={900} />
      <Plane cam={cam} depth={0.25}>
        <Bokeh t={t} seed={41} n={18} colors={[GREEN.sage, GREEN.fresh, GREEN.cream]} blur={12} drift={-8} />
      </Plane>
      <Plane cam={cam} depth={0.6}>
        <LeafField t={t} seed={42} n={9} focal={0.45} opacity={0.9} />
        <DropletField t={t} seed={43} n={14} tint={GREEN.sage} speed={22} focal={0.5} opacity={0.8} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Glow x={PX} y={PY} rx={360} ry={600} color={GREEN.fresh} a={0.32} blur={60} />
        <HeroProduct name="herbal-mint-tube" x={PX} y={PY + 90 * (1 - enter)} height={1100} rotate={4} turn={-16 * (1 - enter)} exposure={0.3 + 0.7 * enter} focus={14 * (1 - enter)} rim={GREEN.sage} rimStrength={1.3} sweep={prog(t, 2.0, 2.9)} shadow={false} />
        <FloatLabel t={t} at={2.3} ax={PX + 75} ay={PY + 90} lx={805} ly={980} color={GREEN.sage} w={360} h={112}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <Lt size={46} color="#FFFFFF">
              {c.callouts[0].big}
            </Lt>
            <Lt size={20} weight={700} color={GREEN.sage} tracking={3}>
              {c.callouts[0].small}
            </Lt>
          </div>
        </FloatLabel>
        <FloatLabel t={t} at={2.7} ax={PX + 128} ay={PY + 235} lx={805} ly={1170} color={GREEN.sage} w={360} h={112}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <Lt size={40} color="#FFFFFF">
              {c.callouts[1].big}
            </Lt>
            <Lt size={20} weight={700} color={GREEN.sage} tracking={3}>
              {c.callouts[1].small}
            </Lt>
          </div>
        </FloatLabel>
      </Plane>
      <Plane cam={cam} depth={1.5}>
        <LeafField t={t} seed={44} n={2} focal={-1.2} opacity={0.75} />
      </Plane>
      <Pos x={990} y={300} align="right">
        <Eyebrow text={c.label} p={prog(t, 0.6, 1.4)} color={GREEN.sage} lines={false} />
      </Pos>
      <Pos x={996} y={410} align="right">
        <TitleIn text={c.title1} t={t} at={0.8} size={150} trackFrom={30} trackTo={2} />
      </Pos>
      <Pos x={996} y={552} align="right">
        <TitleIn text={c.title2} t={t} at={1.05} size={150} trackFrom={30} trackTo={2} fill={GRAD.sage} />
      </Pos>
      <Pos x={990} y={1400} align="right">
        <KhIn text={c.kh[0]} t={t} at={1.7} size={70} />
      </Pos>
      <Pos x={990} y={1500} align="right">
        <KhIn text={c.kh[1]} t={t} at={1.95} size={56} weight={600} color={GREEN.sage} />
      </Pos>
    </AbsoluteFill>
  );
};
