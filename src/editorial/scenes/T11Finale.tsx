import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Glyph } from '../ui/Interface';
import { LemonSlice3D } from '../ui/Lemon';
import { Disc, Ring, Square } from '../ui/Objects';
import { Product } from '../ui/Product';
import { Leaf } from '../../components/Decor';
import { At, Eyebrow, KhLine, khmer, latin } from '../ui/Type';
import { BLUE, INK, SHADOW, ease } from '../theme';
import { LEMON } from './T01Intro';

/** 11 — Geometric brand finale: shapes assemble around both editions; the closing script line; Khmer CTA. */
export const T11Finale: React.FC = () => {
  const t = useTime();
  const c = T.end;
  const g = (a: number) => prog(t, a, a + 0.8);
  const enter = ease.outExpo(prog(t, 0.4, 1.4));
  const cta = prog(t, 3.0, 3.6);
  const live = Math.max(0, t - 3.6);
  const sw = (live % 2.2) / 0.9;
  const pos = -25 + 150 * sw;
  return (
    <AbsoluteFill>
      <Backdrop mood="lemon" t={t} />
      <Cam t={t} dur={7} from={1.05} to={1}>
        <Disc x={540} y={900} r={320} p={g(0.1)} fill={`radial-gradient(circle at 40% 35%, #FFFFFF, ${BLUE.pale} 60%, #FFF4C9)`} shadow />
        <Ring x={540} y={900} r={370} p={g(0.4)} color="rgba(28,34,48,0.12)" width={2} />
        <Ring x={540} y={900} r={410} p={g(0.6)} color={LEMON} width={1.5} dash="2 14" rotate={t * 8} />
        <Disc x={190} y={680} r={42} p={g(0.9)} fill={`linear-gradient(135deg, ${BLUE.aqua}, ${BLUE.royal})`} shadow />
        <Square x={900} y={1150} s={52} p={g(1.1)} fill="#FFFFFF" rotate={12} />
        <LemonSlice3D x={880} y={640} d={150 * ease.outExpo(g(1.0))} rotate={t * 12} tilt={30} />
        <div style={{ opacity: ease.outExpo(g(1.2)) }}>
          <Leaf x={205} y={1165} length={150} rotate={-30 + 6 * Math.sin(t * 1.2)} />
        </div>
        <Product shot="tube" x={425} y={920 + 140 * (1 - enter)} height={620} rotate={-6} opacity={enter} sweep={prog(t, 1.6, 2.4)} />
        <Product shot="herbal-tube" x={655} y={930 + 140 * (1 - enter)} height={610} rotate={6} opacity={enter} sweep={prog(t, 1.75, 2.55)} />
      </Cam>
      <At x={540} y={250}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      <At x={540} y={340}>
        <KhLine text={c.kh1} t={t} at={0.3} size={52} color={BLUE.navy} />
      </At>
      <At x={540} y={420}>
        <KhLine text={c.kh2} t={t} at={0.6} size={32} weight={600} color={INK.slate} stagger={0.06} />
      </At>
      <At x={540} y={480}>
        <KhLine text={c.kh3} t={t} at={0.9} size={32} weight={600} color={INK.slate} stagger={0.06} />
      </At>
      {/* pack claims (printed on the tube) */}
      <At x={540} y={1330}>
        <span style={{ display: 'inline-flex', gap: 12 }}>
          {c.claims.map((cl, i) => (
            <span
              key={cl}
              style={{
                ...latin(17, 800, BLUE.navy, 2),
                padding: '12px 16px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.92)',
                boxShadow: SHADOW.soft,
                opacity: clamp((t - 1.8 - i * 0.15) / 0.4),
                transform: `translateY(${20 * (1 - ease.outExpo(prog(t, 1.8 + i * 0.15, 2.4 + i * 0.15)))}px)`,
                display: 'inline-block',
              }}
            >
              {cl}
            </span>
          ))}
        </span>
      </At>
      {cta > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - 330,
            top: 1500 - 56,
            width: 660,
            height: 112,
            borderRadius: 56,
            background: BLUE.navy,
            boxShadow: SHADOW.lift,
            opacity: clamp(cta * 2),
            transform: `translateY(${40 * (1 - ease.outExpo(cta))}px) scale(${1 + 0.015 * Math.sin(live * 3.2)})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            overflow: 'hidden',
          }}
        >
          <span style={khmer(44, 700, '#FFFFFF')}>{c.cta}</span>
          <span style={{ width: 54, height: 54, borderRadius: 27, background: `linear-gradient(135deg, ${BLUE.aqua}, ${LEMON})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="arrow" size={28} color="#FFFFFF" stroke={2.6} />
          </span>
          {sw > 0 && sw < 1 && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${pos - 10}%, rgba(255,255,255,0.25) ${pos}%, transparent ${pos + 10}%)` }} />}
        </div>
      )}
    </AbsoluteFill>
  );
};
