import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Icon } from '../../components/Icons';
import { clamp, prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage, hexA } from '../fx/Stage';
import { Eyebrow, Kh, KhIn, Lt, Pos } from '../fx/Type';
import { BLUE, GREEN, ease } from '../theme';

const OX = 540;
const OY = 860;
const RX = 430;
const RY = 120;

/** 05 — The four on-pack benefits: products inside a slow light orbit, glass info cards below. */
export const C05Benefits: React.FC = () => {
  const t = useTime();
  const b = COPY.benefits;
  const cam = { x: 0, y: 0, z: 1.04 - 0.04 * ease.inOutSine(prog(t, 0, 6.6)) };
  const ring = ease.outQuint(prog(t, 0.4, 1.6));
  const enter = ease.outQuint(prog(t, 0.0, 1.2));
  const tint = [BLUE.aqua, BLUE.ice, GREEN.sage, GREEN.fresh];
  const cards = [
    { x: 290, y: 1290 },
    { x: 790, y: 1290 },
    { x: 290, y: 1460 },
    { x: 790, y: 1460 },
  ];
  // orbiting light points: drawn behind (upper half of the ellipse) or in front (lower half)
  const orbiters = (front: boolean) =>
    [0, 1, 2, 3].map((i) => {
      const a = t * 0.9 + (i * Math.PI) / 2;
      const isFront = Math.sin(a) > 0;
      if (isFront !== front) return null;
      const x = OX + RX * Math.cos(a) * ring;
      const y = OY + 180 + RY * Math.sin(a) * ring;
      const s = 0.7 + 0.3 * Math.sin(a);
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x - 9 * s,
            top: y - 9 * s,
            width: 18 * s,
            height: 18 * s,
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: `0 0 24px 8px ${hexA(tint[i], 0.8)}`,
            opacity: ring,
          }}
        />
      );
    });
  return (
    <AbsoluteFill>
      <Stage tone="dual" t={t} floorY={1180} />
      <Plane cam={cam} depth={0.3}>
        <Bokeh t={t} seed={51} n={14} colors={[BLUE.aqua, GREEN.sage]} blur={14} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Glow x={OX} y={OY + 180} rx={RX + 60} ry={RY + 40} color="#FFFFFF" a={0.12 * ring} blur={20} />
        <svg width={1080} height={1920} style={{ position: 'absolute', overflow: 'visible' }}>
          <defs>
            <linearGradient id="orbit" x1="0" x2="1">
              <stop offset="0" stopColor={BLUE.aqua} />
              <stop offset="1" stopColor={GREEN.sage} />
            </linearGradient>
          </defs>
          <ellipse cx={OX} cy={OY + 180} rx={RX * ring} ry={RY * ring} fill="none" stroke="url(#orbit)" strokeOpacity={0.55} strokeWidth={2} />
          <ellipse cx={OX} cy={OY + 180} rx={RX * ring * 1.12} ry={RY * ring * 1.12} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="4 14" />
        </svg>
        {orbiters(false)}
        <HeroProduct name="zesty-lemon-tube" x={435} y={OY + 60 * (1 - enter)} height={630} rotate={-5} rim={BLUE.aqua} exposure={enter} sweep={prog(t, 1.4, 2.2)} />
        <HeroProduct name="herbal-mint-tube" x={645} y={OY + 8 + 60 * (1 - enter)} height={615} rotate={5} rim={GREEN.sage} exposure={enter} sweep={prog(t, 1.55, 2.35)} />
        {orbiters(true)}
        <Dust t={t} seed={52} n={24} opacity={0.6} />
      </Plane>
      <Pos x={540} y={290}>
        <Eyebrow text={b.label} p={prog(t, 0.3, 1.0)} />
      </Pos>
      <Pos x={540} y={385}>
        <KhIn text={b.kh} t={t} at={0.5} size={62} />
      </Pos>
      {b.items.map((it, i) => {
        const p = prog(t, 1.6 + i * 0.28, 2.3 + i * 0.28);
        const c = cards[i];
        return (
          <Glass key={it.en} x={c.x} y={c.y} w={470} h={148} p={p} radius={30} tint={tint[i]}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, width: '100%', padding: '0 26px' }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 38,
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `radial-gradient(circle at 35% 30%, ${hexA(tint[i], 0.9)}, ${hexA(tint[i], 0.35)})`,
                  boxShadow: `0 0 24px ${hexA(tint[i], 0.5)}`,
                  transform: `scale(${0.6 + 0.4 * ease.outQuint(clamp((p - 0.2) / 0.8))})`,
                }}
              >
                <Icon name={it.icon} size={40} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <Lt size={22} weight={800} color="#FFFFFF" tracking={2.5}>
                  {it.en}
                </Lt>
                <Kh size={28} weight={600} color="rgba(255,255,255,0.82)" style={{ lineHeight: 1.5 }}>
                  {it.kh}
                </Kh>
              </div>
            </div>
          </Glass>
        );
      })}
    </AbsoluteFill>
  );
};
