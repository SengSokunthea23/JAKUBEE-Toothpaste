import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Bloom, Cam } from '../ui/Backdrop';
import { Card, LiveDot, Pill } from '../ui/Card';
import { Glyph } from '../ui/Interface';
import { BeadField, LeafCloud } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, Headline, KhLine, khmer, latin } from '../ui/Type';
import { GREEN, INK, ease } from '../theme';

/** 10 — Herbal Mint (Green Edition): botanical environment, hero tube with its pack, floating labels. */
export const T10HerbalMint: React.FC = () => {
  const t = useTime();
  const c = T.herbal;
  const enter = ease.outExpo(prog(t, 0.3, 1.5));
  const pack = ease.outExpo(prog(t, 0.6, 1.7));
  const bob = 10 * Math.sin(t * 1.15 + 1);
  return (
    <AbsoluteFill>
      <Backdrop mood="green" t={t} />
      <Cam t={t} dur={6} from={1} to={1.06} dx={20}>
        <LeafCloud t={t} seed={1001} n={6} p={prog(t, 0.1, 1.3)} area={{ x0: 0, x1: 1080, y0: 600, y1: 1750 }} />
        <BeadField t={t} seed={1002} n={16} tint={GREEN.sage} />
        <Bloom x={440} y={1080} r={430} color={GREEN.fresh} a={0.28} />
        <Product shot="herbal-pack" x={600} y={1130 + 100 * (1 - pack)} height={620} opacity={pack} focus={3} />
        <Product shot="herbal-tube" x={420} y={1120 + bob + 120 * (1 - enter)} height={880} turn={-14 * (1 - enter)} opacity={enter} focus={10 * (1 - enter)} sweep={prog(t, 2.0, 2.9)} reflect />
        <LeafCloud t={t} seed={1003} n={2} p={prog(t, 0.4, 1.4)} area={{ x0: 0, x1: 300, y0: 1400, y1: 1750 }} />
      </Cam>
      <At x={990} y={290} align="right">
        <Eyebrow text={c.eyebrow} p={prog(t, 0.3, 1.0)} dash={GREEN.fresh} />
      </At>
      <At x={996} y={410} align="right">
        <Headline text={c.title} t={t} at={0.5} size={124} color={GREEN.forest} />
      </At>
      <Card x={820} y={720} w={330} h={92} p={prog(t, 1.3, 2.0)} t={t} float={5} radius={46}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <LiveDot t={t} color={GREEN.botanical} />
          <span style={latin(20, 800, GREEN.forest, 3)}>{c.chip1}</span>
        </span>
      </Card>
      <Card x={850} y={850} w={270} h={92} p={prog(t, 1.55, 2.25)} t={t} float={5} radius={46}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <Glyph name="leaf" size={26} color={GREEN.botanical} />
          <span style={latin(20, 800, INK.charcoal, 3)}>{c.chip2}</span>
        </span>
      </Card>
      <Card x={850} y={1300} w={300} h={150} p={prog(t, 1.9, 2.6)} t={t} float={5} radius={36}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {c.pack.map((p) => (
            <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Glyph name="check" size={22} color={GREEN.botanical} stroke={2.6} />
              <span style={latin(18, 800, INK.charcoal, 2)}>{p}</span>
            </span>
          ))}
        </div>
      </Card>
      <At x={540} y={1560}>
        <Pill size={24} style={{ opacity: prog(t, 2.3, 2.7) }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <KhLine text={c.kh1} t={t} at={2.3} size={36} color={GREEN.forest} />
            <span style={{ width: 8, height: 8, borderRadius: 4, background: GREEN.fresh }} />
            <span style={khmer(36, 700, GREEN.forest)}>
              <KhLine text={c.kh2} t={t} at={2.45} size={36} color={GREEN.forest} />
            </span>
          </span>
        </Pill>
      </At>
    </AbsoluteFill>
  );
};
