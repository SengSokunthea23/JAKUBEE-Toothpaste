import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Dust } from '../../cinematic/fx/Elements';
import { hexA } from '../../cinematic/fx/Stage';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Bloom, Cam } from '../ui/Backdrop';
import { LemonField } from '../ui/Lemon';
import { BeadField, Ring } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Headline, KhLine, Underline } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

/** 08 — Fresh breath & a fresh, clear feeling: airy breath ribbons, lemon and water, glowing hero. */
export const T08FreshBreath: React.FC = () => {
  const t = useTime();
  const c = T.breath;
  const halo = ease.outExpo(prog(t, 0.5, 1.6));
  return (
    <AbsoluteFill>
      <Backdrop mood="lemon" t={t} />
      <Cam t={t} dur={5.5} from={1.06} to={1}>
        {/* airy breath ribbons */}
        <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
          {[0, 1, 2, 3].map((i) => {
            const y = 980 + i * 70;
            const ph = t * 1.4 + i;
            const d = `M -50 ${y} C 250 ${y - 90 * Math.sin(ph)}, 520 ${y + 90 * Math.cos(ph)}, 760 ${y - 40 * Math.sin(ph + 1)} S 1100 ${y + 60 * Math.sin(ph)}, 1150 ${y}`;
            const len = 1500;
            return <path key={i} d={d} fill="none" stroke={hexA(i % 2 ? BLUE.aqua : '#FFFFFF', 0.7)} strokeWidth={i % 2 ? 3 : 6} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - ease.outExpo(prog(t, 0.4 + i * 0.15, 1.6 + i * 0.15)))} style={{ filter: 'blur(1px)' }} />;
          })}
        </svg>
        <LemonField t={t} seed={801} n={4} p={prog(t, 0.2, 1.3)} area={{ x0: 0, x1: 1080, y0: 900, y1: 1750 }} size={[90, 180]} />
        <BeadField t={t} seed={802} n={16} tint={BLUE.aqua} />
        <Bloom x={540} y={1250} r={460} color="#FFFFFF" a={0.85 * halo} />
        <Ring x={540} y={1250} r={300} p={prog(t, 0.8, 1.8)} color="rgba(255,255,255,0.95)" width={3} />
        <Product shot="tube" x={540} y={1260 + 80 * (1 - halo)} height={640} rotate={-6} opacity={halo} sweep={prog(t, 1.8, 2.6)} />
        <div style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen' }}>
          <Dust t={t} seed={803} n={26} color="#FFFFFF" opacity={halo} />
        </div>
      </Cam>
      <At x={540} y={400}>
        <Headline text={c.line1} t={t} at={0.3} size={220} color={INK.charcoal} />
      </At>
      <At x={540} y={570}>
        <Underline p={prog(t, 1.2, 1.9)} color={LEMON} thickness={10} offset={-14}>
          <Headline text={c.line2} t={t} at={0.55} size={120} weight={700} color={BLUE.navy} />
        </Underline>
      </At>
      <At x={540} y={730}>
        <KhLine text={c.kh1} t={t} at={1.1} size={50} />
      </At>
      <At x={540} y={815}>
        <KhLine text={c.kh2} t={t} at={1.35} size={40} weight={600} color={INK.slate} />
      </At>
    </AbsoluteFill>
  );
};
