import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { Bubble, makeParticles } from '../components/Decor';
import { GlassCard } from '../components/GlassCard';
import { Product } from '../components/Product';
import { Khmer, Label, Latin, Reveal } from '../components/Typography';
import { Glyph, GlyphName } from '../editorial/ui/Interface';
import { easeBack, easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const RISE = makeParticles(81, 16);

/** 08 — Cleans tartar caused by cigarettes, tea and coffee: cause cards, a cleansing sweep, both tubes rise. */
export const S08Tartar: React.FC = () => {
  const t = useTime();
  const c = COPY.tartar;
  const clear = prog(t, 2.5, 3.3);
  const p = easeOut(prog(t, 2.9, 3.9));
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={300} y={1150} r={420} color={COLORS.softBlue} a={0.7} />
      <GlowBlob x={780} y={1150} r={420} color="#E9F4E2" a={0.7} />
      <Reveal x={540} y={285} p={prog(t, 0.2, 0.7)}>
        <Label>{c.label}</Label>
      </Reveal>
      <Reveal x={540} y={380} p={prog(t, 0.35, 0.95)}>
        <Khmer size={60}>{c.kh1}</Khmer>
      </Reveal>
      <Reveal x={540} y={465} p={prog(t, 0.55, 1.15)}>
        <Khmer size={42} weight={600} color={COLORS.royal}>
          {c.kh2}
        </Khmer>
      </Reveal>
      {c.causes.map((cause, i) => {
        const q = prog(t, 0.7 + i * 0.2, 1.3 + i * 0.2);
        const out = easeOut(prog(t, 2.5 + i * 0.12, 3.1 + i * 0.12));
        const o = Math.min(1, q * 2) * (1 - out);
        if (o <= 0) return null;
        const x = 200 + i * 340;
        const y = 770 + 60 * (1 - easeOut(q)) - 80 * out;
        return (
          <React.Fragment key={cause.en}>
            <GlassCard x={x} y={y} w={290} h={270} radius={36} opacity={o} fill="rgba(255,255,255,0.92)" />
            <div style={{ position: 'absolute', left: x - 145, top: y - 115, width: 290, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: o }}>
              <div style={{ width: 96, height: 96, borderRadius: 48, background: 'rgba(37,42,48,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Glyph name={cause.icon as GlyphName} size={54} color={COLORS.charcoal} />
              </div>
              <Khmer size={40}>{cause.kh}</Khmer>
              <Latin size={18} weight={700} color={COLORS.grey} tracking={3}>
                {cause.en}
              </Latin>
            </div>
          </React.Fragment>
        );
      })}
      {/* cleansing sweep */}
      {clear > 0 && clear < 1 && (
        <div
          style={{
            position: 'absolute',
            left: -300 + 1700 * clear,
            top: 600,
            width: 260,
            height: 360,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), rgba(141,221,245,0.6), transparent)',
            filter: 'blur(18px)',
            transform: 'skewX(-12deg)',
          }}
        />
      )}
      {t > 3.0 &&
        RISE.map((b, i) => {
          const y = 1500 - ((b.speed * 2.4 * (t - 3.0) + b.phase * 60) % 900);
          return <Bubble key={i} x={b.x + 10 * Math.sin(t * 2 + b.phase)} y={y} r={b.r} opacity={0.5 * b.a * p} />;
        })}
      <Product name="zesty-lemon-tube" x={400} y={1130 + 160 * (1 - easeBack(prog(t, 2.9, 3.7)))} height={720} rotate={-8} opacity={p} sweep={prog(t, 3.8, 4.6)} />
      <Product name="herbal-mint-tube" x={680} y={1130 + 160 * (1 - easeBack(prog(t, 3.05, 3.85)))} height={720} rotate={8} opacity={p} sweep={prog(t, 3.95, 4.75)} />
    </AbsoluteFill>
  );
};
