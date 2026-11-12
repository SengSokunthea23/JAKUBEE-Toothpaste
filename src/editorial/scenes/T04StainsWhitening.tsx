import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Dust } from '../../cinematic/fx/Elements';
import { clamp, prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Bloom, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { Tooth3D } from '../ui/Lemon';
import { Ring } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, Headline, Highlight, KhLine, khmer } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

/** 04 — Reduces yellow stains; whiter, stronger, shinier teeth: illustrative tooth clears under a light sweep. */
export const T04StainsWhitening: React.FC = () => {
  const t = useTime();
  const c = T.stains;
  const stain = 1 - ease.inOut(prog(t, 1.6, 3.0));
  const shine = prog(t, 2.9, 3.8);
  const glow = ease.outExpo(prog(t, 3.0, 4.0));
  return (
    <AbsoluteFill>
      <Backdrop mood="white" t={t} />
      <Cam t={t} dur={6.5} from={1} to={1.05}>
        <Bloom x={540} y={1010} r={420} color="#FFFFFF" a={0.9 * glow} />
        <Ring x={540} y={1010} r={300} p={prog(t, 3.0, 4.0)} color="rgba(8,121,201,0.35)" width={2} />
        <Tooth3D x={540} y={1010} size={560} stain={stain} shine={shine} opacity={ease.outExpo(prog(t, 0.3, 1.2))} />
        <div style={{ position: 'absolute', inset: 0, opacity: glow }}>
          <Dust t={t} seed={401} n={22} color={BLUE.ice} />
        </div>
        <Product shot="tube" x={870} y={1200 + 100 * (1 - ease.outExpo(prog(t, 0.8, 1.8)))} height={480} rotate={10} opacity={ease.outExpo(prog(t, 0.8, 1.8))} />
      </Cam>
      <At x={90} y={280} align="left">
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      <At x={84} y={380} align="left">
        <Headline text={c.en} t={t} at={0.3} size={96} color={BLUE.navy} />
      </At>
      <At x={90} y={490} align="left">
        <KhLine text={c.kh1} t={t} at={0.7} size={42} />
      </At>
      <At x={90} y={560} align="left">
        <KhLine text={c.kh2} t={t} at={0.95} size={36} weight={600} color={INK.slate} />
      </At>
      <At x={330} y={1440}>
        <span style={{ opacity: clamp((t - 3.2) / 0.3) }}>
          <Highlight words={c.words} t={t} at={3.3} every={0.35} size={36} color={BLUE.royal} khmerFont />
        </span>
      </At>
      <Card x={540} y={1570} w={900} h={96} p={prog(t, 4.2, 4.8)} t={t} radius={48}>
        <span style={khmer(32, 700, INK.charcoal)}>{c.kh3}</span>
      </Card>
    </AbsoluteFill>
  );
};
