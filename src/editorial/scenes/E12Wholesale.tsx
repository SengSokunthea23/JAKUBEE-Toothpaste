import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FONTS } from '../../lib/theme';
import { OFFER, T } from '../copy';
import { Edition } from '../assets';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card, Pill } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { Glyph } from '../ui/Interface';
import { Blueberry, IsoBlock, IsoShadow } from '../ui/Objects';
import { Leaf } from '../../components/Decor';
import { At, Eyebrow, KhLine, Price, khmer } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

const BLOCKS: { cx: number; top: number; h: number; ed: Edition; ph: number }[] = [
  { cx: 280, top: 1220, h: 150, ed: 'blue', ph: 0.5 },
  { cx: 540, top: 1170, h: 230, ed: 'green', ph: 0.3 },
  { cx: 800, top: 1220, h: 150, ed: 'blue', ph: 0.6 },
];

/** 12 — Wholesale $26: isometric pedestals assemble and the products land on them. */
export const E12Wholesale: React.FC = () => {
  const t = useTime();
  const c = T.wholesale;
  return (
    <AbsoluteFill>
      <Backdrop mood="white" t={t} />
      <Cam t={t} dur={6} from={1.03} to={1} dx={-10}>
        {BLOCKS.map((b, i) => {
          const rise = prog(t, b.ph, b.ph + 0.9);
          const land = ease.outExpo(prog(t, b.ph + 0.6, b.ph + 1.4));
          const isGreen = b.ed === 'green';
          const ph = i === 1 ? 440 : 390;
          return (
            <React.Fragment key={i}>
              <IsoShadow cx={b.cx} cy={b.top + b.h + 70} w={250} opacity={rise} />
              <IsoBlock
                cx={b.cx}
                cy={b.top}
                w={250}
                h={b.h}
                rise={rise}
                top="#FFFFFF"
                left={isGreen ? GREEN.cream : BLUE.pale}
                right={isGreen ? GREEN.sage : BLUE.ice}
              />
              <Foam edition={b.ed} x={b.cx} y={b.top - ph / 2 + 18 - 140 * (1 - land)} height={ph} opacity={land} shadow={false} sweep={prog(t, 2.4 + i * 0.12, 3.1 + i * 0.12)} />
            </React.Fragment>
          );
        })}
        {/* ingredient props on small blocks */}
        <IsoBlock cx={130} cy={1420} w={110} h={60} rise={prog(t, 1.1, 1.8)} top="#FFFFFF" left={BLUE.pale} right={BLUE.ice} />
        <Blueberry x={130} y={1390} d={70 * ease.outExpo(prog(t, 1.5, 2.1))} />
        <IsoBlock cx={950} cy={1420} w={110} h={60} rise={prog(t, 1.2, 1.9)} top="#FFFFFF" left={GREEN.cream} right={GREEN.sage} />
        <div style={{ opacity: ease.outExpo(prog(t, 1.6, 2.2)) }}>
          <Leaf x={950} y={1385} length={120} rotate={-28} />
        </div>
      </Cam>
      <At x={540} y={270}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.1, 0.8)} dash={BLUE.royal} />
      </At>
      <At x={540} y={355}>
        <KhLine text={c.kh} t={t} at={0.25} size={62} />
      </At>
      <At x={540} y={445}>
        <span style={{ display: 'inline-flex', gap: 14 }}>
          {c.places.map((pl, i) => (
            <span key={pl} style={{ opacity: prog(t, 0.6 + i * 0.15, 1.0 + i * 0.15) }}>
              <Pill size={20}>
                <Glyph name="store" size={24} color={BLUE.royal} />
                <span style={khmer(28, 600, INK.charcoal)}>{pl}</span>
              </Pill>
            </span>
          ))}
        </span>
      </At>
      <At x={540} y={545}>
        <KhLine text={c.deal} t={t} at={1.2} size={38} weight={600} color={INK.slate} />
      </At>
      <At x={540} y={665}>
        <Price text={OFFER.wholesale} t={t} at={1.4} size={190} color={BLUE.navy} sweepAt={2.2} />
      </At>
      <Card x={540} y={1590} w={840} h={140} p={prog(t, 2.0, 2.6)} t={t} radius={40}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={khmer(40, 700, INK.charcoal)}>
            {c.deal} <span style={{ fontFamily: FONTS.latin, fontWeight: 800, color: BLUE.royal }}>{OFFER.wholesale}</span> {c.dealAfter}
          </span>
          <span style={khmer(26, 500, INK.slate)}>{c.any}</span>
        </div>
      </Card>
    </AbsoluteFill>
  );
};
