import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { clamp, easeOut, prog, seeded } from '../../lib/anim';
import { COPY } from '../../lib/copy';
import { useTime } from '../../lib/useTime';
import { Droplet } from '../fx/Elements';
import { Glass } from '../fx/Panels';
import { Bokeh, Stage, Vignette, hexA } from '../fx/Stage';
import { Lt } from '../fx/Type';
import { BLUE, ease, lerp } from '../theme';

// Source image is 695×1721; macro render scale.
const SRC_W = 695;
const SRC_H = 1721;
const H = 2600;
const W = (H * SRC_W) / SRC_H;
const K = H / SRC_H;

/** 03 — Macro: the camera glides down the real tube surface, shallow depth of field, condensation beads. */
export const C03Macro: React.FC = () => {
  const t = useTime();
  const pan = ease.inOutSine(prog(t, 0, 3.6));
  const left = 540 - W / 2;
  const top = lerp(700 - 290 * K, 1000 - 1095 * K, pan);
  const z = 1 + 0.05 * pan;
  const src = staticFile('products/zesty-lemon-tube.png');
  const rnd = seeded(31);
  const beads = Array.from({ length: 60 }, () => ({ x: 90 + rnd() * 520, y: 120 + rnd() * 1450, r: 2.5 + rnd() * rnd() * 9 }));
  // packaging text "Fluoride 1500ppm / Fresh Lemon" in source coords → screen
  const bx0 = left + 195 * K - 24;
  const bx1 = left + 505 * K + 24;
  const by0 = top + 1055 * K - 24;
  const by1 = top + 1135 * K + 24;
  const br = clamp((t - 2.7) / 0.5);
  const tube = (
    <div style={{ position: 'absolute', left, top, width: W, height: H }}>
      <Img src={src} style={{ width: W, height: H, display: 'block', filter: 'contrast(1.05) saturate(1.06)' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          background: `linear-gradient(90deg, ${hexA(BLUE.aqua, 0.35)} 0%, transparent 10%, rgba(255,255,255,0.12) 30%, transparent 45%, transparent 86%, ${hexA(BLUE.ice, 0.35)} 100%)`,
          mixBlendMode: 'screen',
        }}
      />
      {beads.map((b, i) => (
        <Droplet key={i} x={b.x * K} y={b.y * K} r={b.r} tint={BLUE.ice} opacity={0.9} />
      ))}
    </div>
  );
  return (
    <AbsoluteFill>
      <Stage tone="blue" t={t} beams={false} />
      <Bokeh t={t} seed={32} n={10} colors={[BLUE.aqua, BLUE.ice]} blur={18} size={[60, 160]} />
      <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: '540px 960px' }}>
        {tube}
        {/* tilt-shift: a defocused copy masked to the top and bottom of frame */}
        <AbsoluteFill
          style={{
            filter: 'blur(9px)',
            WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 32%, transparent 64%, black 100%)',
            maskImage: 'linear-gradient(180deg, black 0%, transparent 32%, transparent 64%, black 100%)',
          }}
        >
          {tube}
        </AbsoluteFill>
        {br > 0 && <FocusBrackets x0={bx0} y0={by0} x1={bx1} y1={by1} p={br} />}
      </AbsoluteFill>
      <Vignette strength={0.7} />
      <Glass x={540} y={1430} w={560} h={130} p={prog(t, 3.0, 3.6)} radius={65} tint={BLUE.aqua}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <Lt size={64} color="#FFFFFF">
            {COPY.benefits.badgeBig}
          </Lt>
          <Lt size={26} weight={700} color={BLUE.ice} tracking={4}>
            {COPY.benefits.badgeSmall}
          </Lt>
        </div>
      </Glass>
    </AbsoluteFill>
  );
};

/** Camera-viewfinder corner brackets that snap onto a detail. */
const FocusBrackets: React.FC<{ x0: number; y0: number; x1: number; y1: number; p: number }> = ({ x0, y0, x1, y1, p }) => {
  const e = easeOut(p);
  const pad = 40 * (1 - e);
  const L = 34;
  const a = [x0 - pad, y0 - pad, x1 + pad, y1 + pad];
  const s = { stroke: '#FFFFFF', strokeWidth: 3, fill: 'none', strokeLinecap: 'round' as const };
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, opacity: e, filter: `drop-shadow(0 0 8px ${hexA(BLUE.aqua, 0.9)})` }}>
      <path d={`M${a[0]} ${a[1] + L} V${a[1]} H${a[0] + L}`} {...s} />
      <path d={`M${a[2] - L} ${a[1]} H${a[2]} V${a[1] + L}`} {...s} />
      <path d={`M${a[0]} ${a[3] - L} V${a[3]} H${a[0] + L}`} {...s} />
      <path d={`M${a[2] - L} ${a[3]} H${a[2]} V${a[3] - L}`} {...s} />
    </svg>
  );
};
