import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Bloom, Cam } from '../ui/Backdrop';
import { Card, LiveDot, Pill } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { BeadField, LeafCloud } from '../ui/Objects';
import { At, Eyebrow, Headline, KhLine, khmer, latin } from '../ui/Type';
import { GREEN, INK, ease } from '../theme';

/** 05 — Green edition: botanical environment, "new in stock" badge, floating labels. */
export const E05Green: React.FC = () => {
  const t = useTime();
  const c = T.green;
  const enter = ease.outExpo(prog(t, 0.3, 1.5));
  const bob = 10 * Math.sin(t * 1.15 + 1);
  return (
    <AbsoluteFill>
      <Backdrop mood="green" t={t} />
      <Cam t={t} dur={5.5} from={1} to={1.06} dx={20}>
        <LeafCloud t={t} seed={501} n={6} p={prog(t, 0.1, 1.3)} area={{ x0: 0, x1: 1080, y0: 550, y1: 1750 }} />
        <BeadField t={t} seed={502} n={16} tint={GREEN.sage} />
        <Bloom x={440} y={1060} r={420} color={GREEN.fresh} a={0.28} />
        <Foam edition="green" x={440} y={1080 + bob + 120 * (1 - enter)} height={900} turn={-14 * (1 - enter)} opacity={enter} focus={10 * (1 - enter)} sweep={prog(t, 2.0, 2.9)} reflect />
        <LeafCloud t={t} seed={503} n={2} p={prog(t, 0.4, 1.4)} area={{ x0: 0, x1: 300, y0: 1350, y1: 1750 }} />
      </Cam>
      <At x={990} y={290} align="right">
        <Eyebrow text={c.eyebrow} p={prog(t, 0.3, 1.0)} dash={GREEN.fresh} />
      </At>
      <At x={996} y={420} align="right">
        <Headline text={c.title} t={t} at={0.5} size={150} color={GREEN.forest} />
      </At>
      <Card x={800} y={640} w={360} h={92} p={prog(t, 1.2, 1.9)} t={t} float={5} radius={46} fill={GREEN.forest} border="rgba(255,255,255,0.2)">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <LiveDot t={t} color={GREEN.sage} />
          <span style={latin(22, 800, '#FFFFFF', 4)}>{c.badge}</span>
        </span>
      </Card>
      <Card x={800} y={770} w={360} h={92} p={prog(t, 1.45, 2.15)} t={t} float={5} radius={46}>
        <span style={khmer(34, 700, GREEN.forest)}>{c.tag}</span>
      </Card>
      <Card x={800} y={900} w={360} h={92} p={prog(t, 1.7, 2.4)} t={t} float={5} radius={46}>
        <span style={khmer(32, 700, INK.charcoal)}>{c.hot}</span>
      </Card>
      <At x={540} y={1530}>
        <Pill size={24} style={{ opacity: prog(t, 2.3, 2.7) }}>
          <KhLine text={c.badgeKh} t={t} at={2.3} size={36} color={GREEN.forest} />
        </Pill>
      </At>
    </AbsoluteFill>
  );
};
