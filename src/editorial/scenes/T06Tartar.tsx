import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { GlyphName, IconBadge } from '../ui/Interface';
import { BeadField } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, KhLine, Underline, khmer, latin } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

/** 06 — Tartar from cigarettes, tea & coffee: three cause cards float in, then a cleansing sweep clears them. */
export const T06Tartar: React.FC = () => {
  const t = useTime();
  const c = T.tartar;
  const clear = prog(t, 3.2, 4.2);
  const enter = ease.outExpo(prog(t, 3.4, 4.4));
  return (
    <AbsoluteFill>
      <Backdrop mood="lemon" t={t} />
      <Cam t={t} dur={6} from={1} to={1.04}>
        <BeadField t={t} seed={501} n={14} tint={BLUE.aqua} p={0.8} />
        <Product shot="pack" x={385} y={1210 + 140 * (1 - enter)} height={580} opacity={enter} sweep={prog(t, 4.4, 5.2)} reflect />
        <Product shot="herbal-pack" x={695} y={1215 + 160 * (1 - enter)} height={575} opacity={enter} sweep={prog(t, 4.55, 5.35)} reflect />
      </Cam>
      <At x={540} y={280}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      <At x={540} y={380}>
        <KhLine text={c.kh1} t={t} at={0.3} size={48} />
      </At>
      <At x={540} y={460}>
        <KhLine text={c.kh2} t={t} at={0.6} size={40} weight={600} color={INK.slate} />
      </At>
      {c.causes.map((cause, i) => {
        const x = 200 + i * 340;
        return (
          <Card key={cause.en} x={x} y={720} w={300} h={260} p={prog(t, 0.9 + i * 0.25, 1.6 + i * 0.25)} out={clear} t={t} float={6} radius={36}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <IconBadge name={cause.icon as GlyphName} size={96} color={INK.slate} bg="rgba(28,34,48,0.06)" />
              <span style={khmer(40, 700, INK.charcoal)}>{cause.kh}</span>
              <span style={latin(16, 800, INK.mist, 3)}>{cause.en}</span>
            </div>
          </Card>
        );
      })}
      {/* cleansing sweep across the cards */}
      {clear > 0 && clear < 1 && (
        <div
          style={{
            position: 'absolute',
            left: -300 + 1700 * ease.inOut(clear),
            top: 560,
            width: 260,
            height: 320,
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.95), rgba(141,221,245,0.6), transparent)`,
            filter: 'blur(18px)',
            transform: 'skewX(-12deg)',
          }}
        />
      )}
      <At x={540} y={740}>
        <span style={{ opacity: prog(t, 3.8, 4.3) }}>
          <Underline p={prog(t, 4.2, 4.8)} color={LEMON} thickness={10} offset={10}>
            <KhLine text={c.kh3} t={t} at={3.8} size={72} color={BLUE.navy} />
          </Underline>
        </span>
      </At>
    </AbsoluteFill>
  );
};
