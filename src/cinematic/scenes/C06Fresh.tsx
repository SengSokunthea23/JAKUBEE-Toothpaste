import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { DropletField, Foam, MicroBubbles } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Glow, Plane, Stage, hexA } from '../fx/Stage';
import { Kh, KhIn, Lt, Pos, TitleIn } from '../fx/Type';
import { BLUE, GRAD, GREEN, ease } from '../theme';

/** 06 — Fresh breath & tartar removal: cool mist, creamy foam building around both tubes. */
export const C06Fresh: React.FC = () => {
  const t = useTime();
  const c = COPY.fresh;
  const cam = { x: 0, y: -40 * ease.inOutSine(prog(t, 0, 4.8)), z: 1 + 0.05 * ease.inOutSine(prog(t, 0, 4.8)) };
  const foam = ease.outQuint(prog(t, 0.3, 2.2));
  const pill = prog(t, 1.9, 2.6);
  return (
    <AbsoluteFill>
      <Stage tone="dual" t={t} beams focusY={1000} />
      {/* breath mist: large, slowly turning soft light veils */}
      <Plane cam={cam} depth={0.3}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 540 - 520,
              top: 760 - 220,
              width: 1040,
              height: 440,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${hexA(i === 1 ? GREEN.sage : BLUE.ice, 0.22)}, transparent 70%)`,
              transform: `rotate(${i * 60 + t * (8 + i * 4)}deg) scale(${1 + 0.1 * Math.sin(t + i)})`,
              filter: 'blur(30px)',
              mixBlendMode: 'screen',
            }}
          />
        ))}
        <DropletField t={t} seed={61} n={18} tint={BLUE.ice} speed={30} opacity={0.7} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Glow x={540} y={1420} rx={560} ry={260} color="#FFFFFF" a={0.25} blur={40} />
        <HeroProduct name="zesty-lemon-tube" x={380} y={1290} height={600} rotate={-56} rim={BLUE.aqua} shadow={false} sweep={prog(t, 2.6, 3.4)} />
        <HeroProduct name="herbal-mint-tube" x={705} y={1310} height={585} rotate={54} rim={GREEN.sage} shadow={false} sweep={prog(t, 2.75, 3.55)} />
        <MicroBubbles t={t} seed={62} n={34} fromY={1480} opacity={foam} />
        <Foam t={t} seed={63} n={150} y={1440} grow={foam} />
      </Plane>
      <Pos x={540} y={400}>
        <TitleIn text={c.line1} t={t} at={0.4} size={136} trackFrom={36} trackTo={4} />
      </Pos>
      <Pos x={540} y={575}>
        <TitleIn text={c.line2} t={t} at={0.65} size={136} trackFrom={36} trackTo={4} fill={GRAD.brand} />
      </Pos>
      <Pos x={540} y={735}>
        <KhIn text={c.kh} t={t} at={1.3} size={37} />
      </Pos>
      <Glass x={540} y={890} w={900} h={132} p={pill} radius={52} tint={BLUE.ice}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <Lt size={24} weight={800} color="#FFFFFF" tracking={4}>
            {c.pillEn}
          </Lt>
          <Kh size={32} weight={600} color={BLUE.pale}>
            {c.pillKh}
          </Kh>
        </div>
      </Glass>
    </AbsoluteFill>
  );
};
