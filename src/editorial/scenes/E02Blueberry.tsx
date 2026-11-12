import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Bloom, Cam } from '../ui/Backdrop';
import { Card, LiveDot, Pill } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { BeadField, BerryField } from '../ui/Objects';
import { At, Eyebrow, Headline, KhLine, khmer } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';

/** 02 — Blueberry edition: 3D ingredient environment, floating product and labels. */
export const E02Blueberry: React.FC = () => {
  const t = useTime();
  const c = T.blue;
  const enter = ease.outExpo(prog(t, 0.2, 1.4));
  const bob = 10 * Math.sin(t * 1.2);
  return (
    <AbsoluteFill>
      <Backdrop mood="blue" t={t} />
      <Cam t={t} dur={5.5} from={1} to={1.06} dx={-20}>
        {/* far layer */}
        <BerryField t={t} seed={201} n={5} p={prog(t, 0.1, 1.2)} area={{ x0: 0, x1: 1080, y0: 600, y1: 1700 }} />
        <BeadField t={t} seed={202} n={20} tint={BLUE.aqua} />
        <Bloom x={640} y={1060} r={420} color={BLUE.aqua} a={0.35} />
        <Foam edition="blue" x={640} y={1080 + bob + 120 * (1 - enter)} height={900} turn={14 * (1 - enter)} opacity={enter} focus={10 * (1 - enter)} sweep={prog(t, 2.0, 2.9)} reflect />
        {/* near layer */}
        <BerryField t={t} seed={203} n={3} p={prog(t, 0.4, 1.4)} area={{ x0: 700, x1: 1050, y0: 1350, y1: 1750 }} />
      </Cam>
      <At x={90} y={290} align="left">
        <Eyebrow text={c.eyebrow} p={prog(t, 0.3, 1.0)} dash={BLUE.royal} />
      </At>
      <At x={84} y={420} align="left">
        <Headline text={c.title} t={t} at={0.5} size={150} color={BLUE.navy} />
      </At>
      <Card x={250} y={760} w={330} h={92} p={prog(t, 1.4, 2.1)} t={t} float={5} radius={46}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <LiveDot t={t} color={BLUE.royal} />
          <span style={khmer(36, 700, BLUE.navy)}>{c.tag}</span>
        </span>
      </Card>
      <Card x={300} y={1240} w={440} h={92} p={prog(t, 1.8, 2.5)} t={t} float={5} radius={46}>
        <span style={khmer(32, 600, INK.charcoal)}>{c.note}</span>
      </Card>
      <At x={540} y={1530}>
        <Pill size={24} style={{ opacity: prog(t, 2.2, 2.6) }}>
          <KhLine text={c.kh} t={t} at={2.2} size={36} color={BLUE.navy} />
        </Pill>
      </At>
    </AbsoluteFill>
  );
};
