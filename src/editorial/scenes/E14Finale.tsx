import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FONTS } from '../../lib/theme';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { Glyph } from '../ui/Interface';
import { Disc, Ring, Square } from '../ui/Objects';
import { At, Eyebrow, KhLine, khmer, latin } from '../ui/Type';
import { BLUE, GREEN, INK, SHADOW, ease } from '../theme';

/** 14 — Geometric brand finale: shapes assemble around both editions; offers + Khmer CTA. */
export const E14Finale: React.FC = () => {
  const t = useTime();
  const c = T.end;
  const g = (a: number) => prog(t, a, a + 0.8);
  const enter = ease.outExpo(prog(t, 0.5, 1.5));
  const cta = prog(t, 2.4, 3.0);
  const live = Math.max(0, t - 3.0);
  const sw = (live % 2.2) / 0.9;
  const pos = -25 + 150 * sw;
  return (
    <AbsoluteFill>
      <Backdrop mood="warm" t={t} />
      <Cam t={t} dur={6.5} from={1.05} to={1}>
        {/* geometric assembly */}
        <Disc x={540} y={930} r={330} p={g(0.1)} fill={`radial-gradient(circle at 40% 35%, #FFFFFF, ${BLUE.pale} 60%, ${GREEN.cream})`} shadow />
        <Ring x={540} y={930} r={380} p={g(0.4)} color="rgba(28,34,48,0.12)" width={2} />
        <Ring x={540} y={930} r={420} p={g(0.6)} color={GREEN.fresh} width={1.5} dash="2 14" rotate={t * 8} />
        <Disc x={200} y={700} r={44} p={g(0.9)} fill={`linear-gradient(135deg, ${BLUE.aqua}, ${BLUE.royal})`} shadow />
        <Disc x={890} y={1190} r={38} p={g(1.0)} fill={`linear-gradient(135deg, ${GREEN.sage}, ${GREEN.botanical})`} shadow />
        <Square x={880} y={640} s={56} p={g(1.1)} fill="#FFFFFF" rotate={12} />
        <Square x={210} y={1180} s={44} p={g(1.2)} fill={BLUE.ice} rotate={-10} radius={12} />
        <Foam edition="blue" x={430} y={940 + 120 * (1 - enter)} height={640} rotate={-6} opacity={enter} sweep={prog(t, 1.7, 2.5)} />
        <Foam edition="green" x={650} y={950 + 120 * (1 - enter)} height={630} rotate={6} opacity={enter} sweep={prog(t, 1.85, 2.65)} />
      </Cam>
      <At x={540} y={260}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={GREEN.fresh} />
      </At>
      <At x={540} y={360}>
        <KhLine text={c.kh} t={t} at={0.35} size={92} />
      </At>
      <At x={540} y={460}>
        <span style={{ ...latin(30, 800, BLUE.royal, 14), opacity: prog(t, 0.8, 1.3) }}>{c.en}</span>
      </At>
      {c.chips.map((chip, i) => (
        <Card key={chip} x={205 + i * 335} y={1350} w={300} h={88} p={prog(t, 1.5 + i * 0.15, 2.1 + i * 0.15)} t={t} radius={44}>
          <span style={khmer(36, 700, INK.charcoal)}>
            {chip.split('$')[0]}
            <span style={{ fontFamily: FONTS.latin, fontWeight: 800, color: i === 1 ? GREEN.botanical : BLUE.royal }}>${chip.split('$')[1]}</span>
          </span>
        </Card>
      ))}
      <At x={540} y={1450}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, opacity: prog(t, 2.1, 2.6) }}>
          <Glyph name="truck" size={34} color={GREEN.botanical} stroke={2} />
          <span style={khmer(30, 600, INK.slate)}>{c.delivery}</span>
        </span>
      </At>
      {cta > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 540 - 380,
            top: 1560 - 54,
            width: 760,
            height: 108,
            borderRadius: 54,
            background: INK.charcoal,
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
          <span style={khmer(42, 700, '#FFFFFF')}>{c.cta}</span>
          <span style={{ width: 52, height: 52, borderRadius: 26, background: `linear-gradient(135deg, ${BLUE.aqua}, ${GREEN.fresh})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="arrow" size={28} color="#FFFFFF" stroke={2.6} />
          </span>
          {sw > 0 && sw < 1 && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${pos - 10}%, rgba(255,255,255,0.25) ${pos}%, transparent ${pos + 10}%)` }} />}
        </div>
      )}
    </AbsoluteFill>
  );
};
