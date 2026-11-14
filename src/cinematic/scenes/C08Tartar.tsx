import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CauseIcon } from '../../components/CauseIcon';
import { clamp, prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust, FloorRipple, MicroBubbles } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage } from '../fx/Stage';
import { Eyebrow, Kh, KhIn, Pos } from '../fx/Type';
import { BLUE, GREEN, ease } from '../theme';

/** 08 — Cleans tartar caused by cigarettes, tea and coffee: cause panels are swept away, both tubes land. */
export const C08Tartar: React.FC = () => {
  const t = useTime();
  const c = COPY.tartar;
  const clear = prog(t, 2.5, 3.3);
  const land = (at: number) => ease.outQuint(prog(t, at, at + 0.55));
  const l1 = land(2.9);
  const l2 = land(3.05);
  return (
    <AbsoluteFill>
      <Stage tone="dual" t={t} floorY={1380} focusY={1000} />
      <Plane cam={{ x: 0, y: 0, z: 1 + 0.04 * ease.inOutSine(prog(t, 0, 5.6)) }} depth={1}>
        <Bokeh t={t} seed={801} n={12} colors={[BLUE.aqua, GREEN.sage]} blur={16} />
        <Glow x={340} y={1100} rx={260} ry={420} color={BLUE.royal} a={0.3 * l1} blur={60} />
        <Glow x={740} y={1100} rx={260} ry={420} color={GREEN.botanical} a={0.3 * l2} blur={60} />
        {c.causes.map((cause, i) => {
          const q = prog(t, 0.7 + i * 0.2, 1.3 + i * 0.2);
          const out = ease.outQuint(prog(t, 2.5 + i * 0.12, 3.1 + i * 0.12));
          if (q <= 0 || out >= 1) return null;
          const x = 200 + i * 340;
          return (
            <div key={cause.en} style={{ opacity: 1 - out, filter: out > 0 ? `blur(${14 * out}px)` : undefined, transform: `translateY(${-70 * out}px)` }}>
              <Glass x={x} y={790} w={290} h={270} p={q} radius={36}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <CauseIcon kind={cause.icon} size={118} t={t} variant="cinematic" />
                  <Kh size={40}>{cause.kh}</Kh>
                </div>
              </Glass>
            </div>
          );
        })}
        {/* cleansing light sweep */}
        {clear > 0 && clear < 1 && (
          <div
            style={{
              position: 'absolute',
              left: -300 + 1700 * ease.inOutSine(clear),
              top: 600,
              width: 260,
              height: 380,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), rgba(141,221,245,0.7), transparent)',
              filter: 'blur(20px)',
              transform: 'skewX(-12deg)',
              mixBlendMode: 'screen',
            }}
          />
        )}
        <HeroProduct name="zesty-lemon-tube" x={410} y={1100 - 240 * (1 - l1)} height={560} rotate={-7} rim={BLUE.aqua} opacity={clamp(l1 * 3)} reflect sweep={prog(t, 3.8, 4.6)} />
        <HeroProduct name="herbal-mint-tube" x={670} y={1105 - 240 * (1 - l2)} height={550} rotate={7} rim={GREEN.sage} opacity={clamp(l2 * 3)} reflect sweep={prog(t, 3.95, 4.75)} />
        <FloorRipple t={t} at={3.3} x={540} y={1382} color={BLUE.ice} size={420} />
        <MicroBubbles t={t} seed={802} n={20} fromY={1380} opacity={ease.outQuint(prog(t, 3.2, 4.0))} />
        <Dust t={t} seed={803} n={26} opacity={0.6} />
      </Plane>
      <Pos x={540} y={280}>
        <Eyebrow text={c.label} p={prog(t, 0.2, 0.9)} />
      </Pos>
      <Pos x={540} y={380}>
        <KhIn text={c.kh1} t={t} at={0.35} size={56} />
      </Pos>
      <Pos x={540} y={465}>
        <KhIn text={c.kh2} t={t} at={0.6} size={40} weight={600} color={BLUE.ice} stagger={0.08} />
      </Pos>
    </AbsoluteFill>
  );
};
