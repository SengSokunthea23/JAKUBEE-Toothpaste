import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Glyph, GlyphName } from '../../editorial/ui/Interface';
import { prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { DropletField } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage, hexA } from '../fx/Stage';
import { Eyebrow, Kh, Lt, Pos, PriceFigure } from '../fx/Type';
import { BLUE, GRAD, GREEN, ease } from '../theme';

const ICONS: GlyphName[] = ['shield', 'tooth', 'check'];

/** 09 — Fluoride 1500ppm against cavities, stronger enamel, strong teeth: underwater-light hero figure. */
export const C09Fluoride: React.FC = () => {
  const t = useTime();
  const c = COPY.strong;
  const cam = { x: 0, y: -20 * ease.inOutSine(prog(t, 0, 5)), z: 1 + 0.05 * ease.inOutSine(prog(t, 0, 5)) };
  const p = ease.outQuint(prog(t, 0.5, 1.5));
  const ring = ease.outQuint(prog(t, 0.2, 1.2));
  const R = 210;
  const circ = 2 * Math.PI * R;
  return (
    <AbsoluteFill>
      <Stage tone="blue" t={t} caustics focusY={640} />
      <Plane cam={cam} depth={0.4}>
        <Bokeh t={t} seed={901} n={14} colors={[BLUE.aqua, BLUE.ice]} blur={14} />
      </Plane>
      <Plane cam={cam} depth={0.7}>
        <DropletField t={t} seed={902} n={20} tint={BLUE.ice} speed={30} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Glow x={540} y={620} rx={330} color={BLUE.aqua} a={0.3} blur={50} />
        <svg width={1080} height={1920} style={{ position: 'absolute', overflow: 'visible' }}>
          <circle cx={540} cy={620} r={R} fill="none" stroke={BLUE.ice} strokeWidth={3} strokeDasharray={circ} strokeDashoffset={circ * (1 - ring)} transform="rotate(-90 540 620)" style={{ filter: `drop-shadow(0 0 10px ${hexA(BLUE.aqua, 0.9)})` }} />
          <g transform={`rotate(${t * 12} 540 620)`} opacity={ring * 0.6}>
            <circle cx={540} cy={620} r={R + 36} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeDasharray="2 16" />
          </g>
        </svg>
        <HeroProduct name="zesty-lemon-tube" x={160} y={760 + 120 * (1 - p)} height={480} rotate={-10} rim={BLUE.aqua} opacity={p} sweep={prog(t, 1.8, 2.6)} />
        <HeroProduct name="herbal-mint-tube" x={920} y={765 + 120 * (1 - p)} height={470} rotate={10} rim={GREEN.sage} opacity={p} sweep={prog(t, 1.95, 2.75)} />
      </Plane>
      <Pos x={540} y={280}>
        <Eyebrow text={c.label} p={prog(t, 0.2, 0.9)} color={BLUE.ice} />
      </Pos>
      <Pos x={540} y={600}>
        <PriceFigure text={c.big} t={t} at={0.45} size={190} fill={GRAD.ice} sweepAt={1.6} />
      </Pos>
      <Pos x={540} y={720}>
        <Lt size={24} weight={700} color={BLUE.ice} tracking={6} style={{ opacity: prog(t, 0.9, 1.4) }}>
          {c.small}
        </Lt>
      </Pos>
      {c.lines.map((l, i) => (
        <Glass key={l.en} x={540} y={1080 + i * 160} w={940} h={136} p={prog(t, 1.2 + i * 0.35, 1.8 + i * 0.35)} radius={40} tint={BLUE.aqua}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, width: '100%', padding: '0 30px' }}>
            <div style={{ width: 76, height: 76, borderRadius: 38, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(circle at 35% 30%, ${hexA(BLUE.aqua, 0.9)}, ${hexA(BLUE.royal, 0.5)})` }}>
              <Glyph name={ICONS[i]} size={40} color="#FFFFFF" stroke={2} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Lt size={20} weight={800} color={BLUE.ice} tracking={3}>
                {l.en}
              </Lt>
              <Kh size={32} weight={600} style={{ lineHeight: 1.5 }}>
                {l.kh}
              </Kh>
            </div>
          </div>
        </Glass>
      ))}
    </AbsoluteFill>
  );
};
