import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust, FloorRipple } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Bokeh, Glow, Plane, Stage } from '../fx/Stage';
import { Eyebrow, KhIn, Pos, TitleIn } from '../fx/Type';
import { BLUE, GRAD, GREEN, ease } from '../theme';

/** 01 — Dual-product reveal: both editions emerge from darkness under studio light. */
export const C01Hero: React.FC = () => {
  const t = useTime();
  const light = ease.inOutSine(prog(t, 0, 1.6));
  const cam = { x: 0, y: -20 * ease.inOutSine(prog(t, 0, 5)), z: 1 + 0.07 * ease.inOutSine(prog(t, 0, 5)) };
  const ex = ease.outQuint(prog(t, 0.5, 1.9));
  const focusL = 26 * (1 - ease.outQuint(prog(t, 0.7, 1.7)));
  const focusR = 26 * (1 - ease.outQuint(prog(t, 0.9, 1.9)));
  const rise = 90 * (1 - ex);
  const sweep = prog(t, 2.6, 3.5);
  return (
    <AbsoluteFill>
      <Stage tone="dual" t={t} light={light} floorY={1430} />
      <Plane cam={cam} depth={0.4}>
        <Bokeh t={t} seed={11} n={14} colors={[BLUE.aqua, GREEN.sage, BLUE.ice]} blur={14} opacity={light * 0.8} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Glow x={400} y={1040} rx={330} ry={520} color={BLUE.royal} a={0.45 * light} blur={50} />
        <Glow x={690} y={1040} rx={330} ry={520} color={GREEN.botanical} a={0.45 * light} blur={50} />
        <HeroProduct name="zesty-lemon-tube" x={410} y={1050 + rise} height={760} rotate={-6} focus={focusL} exposure={ex} rim={BLUE.aqua} reflect sweep={sweep} />
        <HeroProduct name="herbal-mint-tube" x={675} y={1058 + rise} height={745} rotate={6} focus={focusR} exposure={ex} rim={GREEN.sage} reflect sweep={sweep - 0.12} />
        <FloorRipple t={t} at={1.4} x={545} y={1432} color={BLUE.ice} size={480} />
        <Dust t={t} seed={4} n={40} opacity={light * 0.7} />
      </Plane>
      <Pos x={540} y={290}>
        <Eyebrow text={COPY.intro.label} p={prog(t, 1.0, 1.8)} />
      </Pos>
      <Pos x={540} y={400}>
        <TitleIn text={COPY.intro.line1} t={t} at={1.3} size={96} trackFrom={46} trackTo={3} />
      </Pos>
      <Pos x={540} y={508}>
        <TitleIn text={COPY.intro.line2} t={t} at={1.65} size={96} trackFrom={46} trackTo={3} fill={GRAD.brand} />
      </Pos>
      <Pos x={540} y={1530}>
        <KhIn text={COPY.intro.kh} t={t} at={2.3} size={56} />
      </Pos>
    </AbsoluteFill>
  );
};
