import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Bloom, Cam } from '../ui/Backdrop';
import { Card, LiveDot, Pill } from '../ui/Card';
import { LemonField, LemonSlice3D } from '../ui/Lemon';
import { BeadField } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, Headline, KhLine, latin } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

/** 02 — Zesty Lemon: 3D ingredient environment (lemon slices, water beads) around the hero tube. */
export const T02ZestyLemon: React.FC = () => {
  const t = useTime();
  const c = T.lemon;
  const enter = ease.outExpo(prog(t, 0.2, 1.4));
  const bob = 10 * Math.sin(t * 1.2);
  return (
    <AbsoluteFill>
      <Backdrop mood="lemon" t={t} />
      <Cam t={t} dur={5.5} from={1} to={1.06} dx={-20}>
        <LemonField t={t} seed={201} n={4} p={prog(t, 0.1, 1.2)} area={{ x0: 0, x1: 1080, y0: 650, y1: 1700 }} />
        <BeadField t={t} seed={202} n={18} tint={BLUE.aqua} />
        <Bloom x={650} y={1080} r={420} color={BLUE.aqua} a={0.3} />
        <Product shot="tube" x={650} y={1110 + bob + 120 * (1 - enter)} height={1000} turn={14 * (1 - enter)} opacity={enter} focus={10 * (1 - enter)} sweep={prog(t, 2.0, 2.9)} reflect />
        {/* near layer */}
        <LemonSlice3D x={930} y={1560} d={240} rotate={t * 10} tilt={40} blur={8} opacity={ease.outExpo(prog(t, 0.5, 1.5))} />
      </Cam>
      <At x={90} y={290} align="left">
        <Eyebrow text={c.eyebrow} p={prog(t, 0.3, 1.0)} dash={LEMON} />
      </At>
      <At x={84} y={410} align="left">
        <Headline text={c.title} t={t} at={0.5} size={124} color={BLUE.navy} />
      </At>
      <Card x={250} y={760} w={350} h={92} p={prog(t, 1.4, 2.1)} t={t} float={5} radius={46}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <LiveDot t={t} color={BLUE.royal} />
          <span style={latin(20, 800, BLUE.navy, 3)}>{c.chip1}</span>
        </span>
      </Card>
      <Card x={240} y={1240} w={330} h={92} p={prog(t, 1.8, 2.5)} t={t} float={5} radius={46}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: LEMON }} />
          <span style={latin(20, 800, INK.charcoal, 3)}>{c.chip2}</span>
        </span>
      </Card>
      <At x={540} y={1560}>
        <Pill size={24} style={{ opacity: prog(t, 2.2, 2.6) }}>
          <KhLine text={c.kh} t={t} at={2.2} size={34} color={BLUE.navy} />
        </Pill>
      </At>
    </AbsoluteFill>
  );
};
