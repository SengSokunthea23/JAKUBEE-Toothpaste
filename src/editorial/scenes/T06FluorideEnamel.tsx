import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { GlyphName, IconBadge } from '../ui/Interface';
import { IsoBlock, IsoShadow } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Eyebrow, khmer, latin } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

// Three stacked isometric layers (bottom → top) — a visual metaphor for protective layers.
const LAYERS = [
  { top: '#FFFFFF', left: BLUE.pale, right: BLUE.ice, h: 70 },
  { top: '#FFFFFF', left: '#E3F1FB', right: '#A9DDF3', h: 70 },
  { top: '#FFFFFF', left: '#FFF6D6', right: '#FFE27A', h: 70 },
];
const ICONS: GlyphName[] = ['shield', 'tooth', 'check'];

/** 06 — Fluoride against cavities, stronger enamel, strong teeth: isometric layers assemble under the tube. */
export const T06FluorideEnamel: React.FC = () => {
  const t = useTime();
  const c = T.strong;
  const CX = 540;
  const BASE = 1050; // top face centre of the lowest layer
  const STEP = 70;
  const stackTop = BASE - STEP * (LAYERS.length - 1);
  const land = ease.outExpo(prog(t, 1.6, 2.4));
  return (
    <AbsoluteFill>
      <Backdrop mood="blue" t={t} />
      <Cam t={t} dur={6.5} from={1.04} to={1} dy={10}>
        <IsoShadow cx={CX} cy={BASE + 150} w={420} opacity={prog(t, 0.3, 1.0)} />
        {LAYERS.map((l, i) => {
          const rise = prog(t, 0.3 + i * 0.3, 1.1 + i * 0.3);
          return (
            <React.Fragment key={i}>
              <IsoBlock cx={CX} cy={BASE - STEP * i - 40 * (1 - ease.outExpo(rise))} w={420} h={l.h} rise={rise} top={l.top} left={l.left} right={l.right} opacity={Math.min(1, rise * 2)} />
              <At x={CX + 260} y={BASE - STEP * i + 80}>
                <span style={{ ...latin(18, 800, BLUE.royal, 4), opacity: prog(t, 0.8 + i * 0.3, 1.3 + i * 0.3) }}>— {c.layers[i]}</span>
              </At>
            </React.Fragment>
          );
        })}
        <Product shot="tube" x={CX} y={stackTop - 300 + 18 - 160 * (1 - land)} height={600} opacity={land} shadow={false} sweep={prog(t, 2.6, 3.4)} />
      </Cam>
      <At x={540} y={270}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      {c.lines.map((l, i) => (
        <Card key={l.en} x={540} y={1300 + i * 120} w={920} h={104} p={prog(t, 2.6 + i * 0.35, 3.3 + i * 0.35)} t={t} float={3} radius={52} padding="0 26px" align="start">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <IconBadge name={ICONS[i]} size={64} color={BLUE.royal} bg={BLUE.pale} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={latin(16, 800, BLUE.royal, 3)}>{l.en}</span>
              <span style={{ ...khmer(30, 700, INK.charcoal), lineHeight: 1.45 }}>{l.kh}</span>
            </div>
          </div>
        </Card>
      ))}
    </AbsoluteFill>
  );
};
