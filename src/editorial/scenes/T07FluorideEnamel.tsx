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
import { BLUE, INK, SHADOW, ease } from '../theme';
import { LEMON } from './T01Intro';

// Three stacked isometric layers (bottom → top) — a visual metaphor for protective layers.
const LAYERS = [
  { top: '#FFFFFF', left: BLUE.pale, right: BLUE.ice, h: 70 },
  { top: '#FFFFFF', left: '#E3F1FB', right: '#A9DDF3', h: 70 },
  { top: '#FFFFFF', left: '#FFF6D6', right: '#FFE27A', h: 70 },
];
const ICONS: GlyphName[] = ['shield', 'tooth', 'check'];

/**
 * Layer label: a glowing anchor dot on the layer's face, a connector that draws out to the right,
 * and a frosted-glass chip (swatch in the layer's colour + label) that slides in after it.
 */
const LayerCallout: React.FC<{ t: number; at: number; ax: number; y: number; color: string; label: string }> = ({ t, at, ax, y, color, label }) => {
  const dot = ease.outExpo(prog(t, at, at + 0.4));
  const line = ease.outExpo(prog(t, at + 0.1, at + 0.6));
  const chip = ease.outExpo(prog(t, at + 0.3, at + 0.9));
  const chipX = ax + 92;
  const pulse = 0.5 + 0.5 * Math.sin((t - at) * 3.2);
  return (
    <>
      {/* anchor: white core, layer-colour ring, soft halo */}
      <div
        style={{
          position: 'absolute',
          left: ax - 9,
          top: y - 9,
          width: 18,
          height: 18,
          borderRadius: 9,
          background: '#FFFFFF',
          border: `4px solid ${BLUE.royal}`,
          boxShadow: `0 0 0 ${6 + 6 * pulse}px rgba(8,121,201,${0.16 * dot})`,
          transform: `scale(${dot})`,
        }}
      />
      {/* connector */}
      <div style={{ position: 'absolute', left: ax + 9, top: y - 1, width: (chipX - ax - 9) * line, height: 2, background: `linear-gradient(90deg, ${BLUE.royal}, rgba(8,121,201,0.35))` }} />
      {/* glass chip */}
      <div
        style={{
          position: 'absolute',
          left: chipX + 24 * (1 - chip),
          top: y - 26,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 20px 0 14px',
          borderRadius: 26,
          background: 'rgba(255,255,255,0.88)',
          border: '1.5px solid rgba(255,255,255,1)',
          boxShadow: SHADOW.soft,
          opacity: chip,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ width: 24, height: 24, borderRadius: 12, background: `linear-gradient(135deg, #FFFFFF, ${color})`, border: '1.5px solid rgba(8,121,201,0.25)' }} />
        <span style={latin(17, 800, BLUE.navy, 3)}>{label}</span>
      </div>
    </>
  );
};

/** 07 — Fluoride against cavities, stronger enamel, strong teeth: isometric layers assemble under the tube. */
export const T07FluorideEnamel: React.FC = () => {
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
              <LayerCallout t={t} at={0.8 + i * 0.3} ax={CX + 150} y={BASE - STEP * i + 70} color={l.right} label={c.layers[i]} />
            </React.Fragment>
          );
        })}
        <Product shot="tube" x={CX - 85} y={stackTop - 270 + 18 - 160 * (1 - land)} height={540} rotate={-4} opacity={land} shadow={false} sweep={prog(t, 2.6, 3.4)} />
        <Product shot="herbal-tube" x={CX + 85} y={stackTop - 265 + 18 - 160 * (1 - land)} height={530} rotate={4} opacity={land} shadow={false} sweep={prog(t, 2.75, 3.55)} />
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
