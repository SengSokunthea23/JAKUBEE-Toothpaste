import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam, Grid } from '../ui/Backdrop';
import { Card, Pill } from '../ui/Card';
import { LemonSlice3D } from '../ui/Lemon';
import { Disc, Ring, Square } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, Headline, KhLine, Underline, khmer, latin } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

export const LEMON = '#F5C211';

/** 01 — JAKUBEE Toothpaste, two flavours: gradient intro, floating product cards assembling into a hero layout. */
export const T01Intro: React.FC = () => {
  const t = useTime();
  const c = T.intro;
  const geo = (a: number) => prog(t, a, a + 0.7);
  return (
    <AbsoluteFill>
      <Backdrop mood="lemon" t={t} />
      <Grid p={prog(t, 0, 1.6)} />
      <Cam t={t} dur={6} from={1.05} to={1}>
        <Ring x={540} y={1080} r={470} p={geo(1.1)} color="rgba(28,34,48,0.10)" width={2} />
        <Disc x={180} y={760} r={44} p={geo(1.4)} fill={`linear-gradient(135deg, ${BLUE.aqua}, ${BLUE.royal})`} shadow />
        <Square x={930} y={1460} s={54} p={geo(1.6)} fill="#FFFFFF" rotate={14} />
        <LemonSlice3D x={905} y={760} d={130 * ease.outExpo(geo(1.5))} rotate={t * 12} tilt={30} />
        {/* Herbal Mint card (back) and Zesty Lemon card (front) */}
        <Card x={710} y={1060} w={360} h={660} p={prog(t, 0.5, 1.4)} t={t} float={6} fill={`linear-gradient(170deg, #FFFFFF, ${GREEN.cream})`}>
          <Product shot="herbal-tube" x={180} y={300} height={520} shadow={false} sweep={prog(t, 2.8, 3.6)} />
          <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <Pill size={18}>
              <span style={{ width: 13, height: 13, borderRadius: 7, background: GREEN.botanical }} />
              <span style={latin(18, 800, INK.charcoal, 3)}>HERBAL MINT</span>
            </Pill>
          </div>
        </Card>
        <Card x={370} y={1110} w={360} h={660} p={prog(t, 0.75, 1.65)} t={t} float={6} fill={`linear-gradient(170deg, #FFFFFF, ${BLUE.pale})`}>
          <Product shot="tube" x={180} y={300} height={520} shadow={false} sweep={prog(t, 2.6, 3.4)} />
          <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <Pill size={18}>
              <span style={{ width: 13, height: 13, borderRadius: 7, background: LEMON }} />
              <span style={latin(18, 800, INK.charcoal, 3)}>ZESTY LEMON</span>
            </Pill>
          </div>
        </Card>
      </Cam>
      <At x={540} y={270}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      <At x={540} y={370}>
        <Headline text={c.en1} t={t} at={0.4} size={104} color={BLUE.navy} />
      </At>
      <At x={540} y={470}>
        <Headline text={c.en2} t={t} at={0.6} size={64} weight={700} color={INK.slate} tracking={8} />
      </At>
      <At x={540} y={580}>
        <span style={{ display: 'inline-flex', gap: 18, alignItems: 'baseline' }}>
          <KhLine text={c.kh1} t={t} at={1.2} size={44} weight={600} color={INK.slate} />
          <span style={{ opacity: clamp((t - 1.5) / 0.4) }}>
            <Underline p={prog(t, 2.0, 2.6)} color={LEMON} thickness={8} offset={8}>
              <span style={khmer(44, 700, INK.charcoal)}>{c.kh2}</span>
            </Underline>
          </span>
        </span>
      </At>
    </AbsoluteFill>
  );
};
