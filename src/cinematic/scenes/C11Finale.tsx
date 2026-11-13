import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Icon } from '../../components/Icons';
import { clamp, prog } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Dust, FloorRipple } from '../fx/Elements';
import { HeroProduct } from '../fx/HeroProduct';
import { Glass } from '../fx/Panels';
import { Bokeh, Glow, Plane, Stage, hexA } from '../fx/Stage';
import { Eyebrow, Kh, KhIn, Lt, Pos, TitleIn } from '../fx/Type';
import { BLUE, GREEN, ease } from '../theme';

/** 11 — Hero end card: both editions, daily use + oral hygiene (script), pack claims, Khmer CTA. */
export const C11Finale: React.FC = () => {
  const t = useTime();
  const c = COPY.end;
  const cam = { x: 0, y: 0, z: 1.06 - 0.06 * ease.outQuint(prog(t, 0, 2.2)) };
  const halo = ease.outQuint(prog(t, 0.2, 1.4));
  const tubes = ease.outQuint(prog(t, 0.3, 1.4));
  const bob = 6 * Math.sin(t * 1.4);
  const sweep = prog(t, 1.6, 2.5);
  const xs = [140, 375, 640, 915];
  const ws = [210, 230, 280, 230];
  return (
    <AbsoluteFill>
      <Stage tone="dual" t={t} floorY={1190} focusY={900} />
      <Plane cam={cam} depth={0.3}>
        <Bokeh t={t} seed={111} n={16} colors={[BLUE.aqua, GREEN.sage, BLUE.ice]} blur={14} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Glow x={300} y={900} rx={300} ry={420} color={BLUE.royal} a={0.4} blur={60} />
        <Glow x={780} y={900} rx={300} ry={420} color={GREEN.botanical} a={0.4} blur={60} />
        {/* halo ring behind the hero pair */}
        <div
          style={{
            position: 'absolute',
            left: 540 - 330,
            top: 880 - 330,
            width: 660,
            height: 660,
            borderRadius: '50%',
            border: `2px solid ${hexA(BLUE.ice, 0.35 * halo)}`,
            boxShadow: `0 0 60px ${hexA(BLUE.aqua, 0.35 * halo)}, inset 0 0 60px ${hexA(GREEN.sage, 0.25 * halo)}`,
            transform: `scale(${0.85 + 0.15 * halo})`,
          }}
        />
        <HeroProduct name="zesty-lemon-tube" x={418} y={870 + bob + 80 * (1 - tubes)} height={640} rotate={-6} opacity={tubes} focus={10 * (1 - tubes)} rim={BLUE.aqua} rimStrength={1.2} reflect sweep={sweep} />
        <HeroProduct name="herbal-mint-tube" x={662} y={877 - bob + 80 * (1 - tubes)} height={628} rotate={6} opacity={tubes} focus={10 * (1 - tubes)} rim={GREEN.sage} rimStrength={1.2} reflect sweep={sweep - 0.1} />
        <FloorRipple t={t} at={1.0} x={540} y={1192} color={BLUE.ice} size={440} />
        <Dust t={t} seed={112} n={36} opacity={0.75} />
      </Plane>
      <Pos x={540} y={270}>
        <Eyebrow text={c.label} p={prog(t, 0.3, 1.0)} />
      </Pos>
      <Pos x={540} y={370}>
        <KhIn text={c.kh} t={t} at={0.45} size={54} />
      </Pos>
      <Pos x={540} y={478}>
        <TitleIn text={c.en} t={t} at={0.75} size={44} trackFrom={40} trackTo={16} fill={`linear-gradient(90deg, ${BLUE.ice}, ${GREEN.sage})`} />
      </Pos>
      {c.claims.map((cl, i) => (
        <Glass key={cl} x={xs[i]} y={1290} w={ws[i]} h={72} p={prog(t, 1.4 + i * 0.12, 2.0 + i * 0.12)} radius={36} tint={i % 2 ? GREEN.sage : BLUE.aqua}>
          <Lt size={18} weight={800} tracking={2}>
            {cl}
          </Lt>
        </Glass>
      ))}
      <Pos x={540} y={1390}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: clamp((t - 1.95) / 0.5) }}>
          <Icon name="tooth" size={40} color={GREEN.sage} />
          <Kh size={34} weight={600} color={GREEN.cream}>
            {c.hygiene}
          </Kh>
        </div>
      </Pos>
      <CineCta t={t} at={2.25} y={1500} label={c.cta} />
    </AbsoluteFill>
  );
};

/** Luminous gradient CTA with a breathing glow and repeating light sweep. */
const CineCta: React.FC<{ t: number; at: number; y: number; label: string }> = ({ t, at, y, label }) => {
  const p = clamp((t - at) / 0.6);
  if (p <= 0) return null;
  const e = ease.outQuint(p);
  const live = Math.max(0, t - at - 0.6);
  const breathe = 0.5 + 0.5 * Math.sin(live * 3.2);
  const sw = (live % 2.0) / 0.9;
  const pos = -25 + 150 * sw;
  return (
    <div
      style={{
        position: 'absolute',
        left: 540 - 390,
        top: y - 56,
        width: 780,
        height: 112,
        borderRadius: 56,
        opacity: clamp(p * 2),
        transform: `scale(${(0.88 + 0.12 * e) * (1 + 0.018 * breathe)})`,
        filter: e < 0.98 ? `blur(${10 * (1 - e)}px)` : undefined,
        background: `linear-gradient(90deg, ${BLUE.royal}, ${BLUE.aqua} 45%, ${GREEN.fresh})`,
        boxShadow: `0 0 ${30 + 30 * breathe}px ${hexA(BLUE.aqua, 0.45)}, inset 0 2px 0 rgba(255,255,255,0.45)`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
      }}
    >
      <Kh size={44} color="#FFFFFF" style={{ textShadow: '0 2px 10px rgba(7,29,69,0.35)' }}>
        {label}
      </Kh>
      <Icon name="arrow" size={38} />
      {sw > 0 && sw < 1 && (
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${pos - 10}%, rgba(255,255,255,0.45) ${pos}%, transparent ${pos + 10}%)` }} />
      )}
    </div>
  );
};
