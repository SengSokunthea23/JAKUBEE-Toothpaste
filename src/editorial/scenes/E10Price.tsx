import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { OFFER, T } from '../copy';
import { Edition } from '../assets';
import { Backdrop, Bloom } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { BeadField, LeafCloud } from '../ui/Objects';
import { At, Eyebrow, KhLine, Price, khmer } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

const Half: React.FC<{ t: number; edition: Edition }> = ({ t, edition }) => {
  const blue = edition === 'blue';
  const x0 = blue ? 0 : 540;
  const cx = 270;
  const enter = ease.outExpo(prog(t, blue ? 0.6 : 0.75, blue ? 1.6 : 1.75));
  return (
    <div style={{ position: 'absolute', left: x0, top: 0, width: 540, height: 1920, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: -x0, top: 0, width: 1080, height: 1920 }}>
        <Backdrop mood={blue ? 'blue' : 'green'} t={t} />
      </div>
      {blue ? <BeadField t={t} seed={1001} n={10} tint={BLUE.aqua} /> : <LeafCloud t={t} seed={1002} n={3} p={prog(t, 0.4, 1.4)} area={{ x0: 0, x1: 540, y0: 1050, y1: 1500 }} />}
      <Bloom x={cx} y={1150} r={300} color={blue ? BLUE.aqua : GREEN.fresh} a={0.3} />
      <At x={cx} y={560}>
        <KhLine text={T.price.each} t={t} at={blue ? 1.0 : 1.15} size={44} weight={600} color={INK.slate} />
      </At>
      <At x={cx} y={720}>
        <Price text={OFFER.price1} t={t} at={blue ? 1.3 : 1.45} size={220} color={blue ? BLUE.navy : GREEN.forest} sweepAt={2.2} />
      </At>
      <Foam edition={edition} x={cx} y={1180 + 120 * (1 - enter)} height={620} opacity={enter} rotate={blue ? -4 : 4} reflect />
    </div>
  );
};

/** 10 — Price: blue vs green split screen, same $5 each. */
export const E10Price: React.FC = () => {
  const t = useTime();
  const c = T.price;
  const line = ease.outExpo(prog(t, 0.2, 1.0));
  return (
    <AbsoluteFill>
      <Half t={t} edition="blue" />
      <Half t={t} edition="green" />
      {/* centre seam */}
      <div style={{ position: 'absolute', left: 539, top: 960 - 960 * line, width: 2, height: 1920 * line, background: 'rgba(255,255,255,0.9)' }} />
      <Card x={540} y={320} w={720} h={180} p={prog(t, 0.1, 0.8)} t={t} radius={40}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Eyebrow text={c.eyebrow} p={prog(t, 0.3, 0.9)} />
          <KhLine text={c.kh} t={t} at={0.4} size={54} />
        </div>
      </Card>
      <Card x={540} y={1560} w={760} h={96} p={prog(t, 2.0, 2.6)} t={t} radius={48}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 20, height: 20, borderRadius: 10, background: BLUE.royal }} />
          <span style={{ width: 20, height: 20, borderRadius: 10, background: GREEN.botanical, marginLeft: -8 }} />
          <span style={khmer(34, 700, INK.charcoal)}>{c.same}</span>
        </span>
      </Card>
    </AbsoluteFill>
  );
};
