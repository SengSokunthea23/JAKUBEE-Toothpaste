import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { Glyph } from '../../editorial/ui/Interface';
import { FUT, chapter } from '../copy';
import { F, ease, hexA } from '../theme';
import { Frame } from '../ui/Frame';
import { Glass, Tooth } from '../ui/Objects';
import { Cam } from '../ui/Stage';
import { At, Kinetic, latin } from '../ui/Type';

const GUM = 'M90 1240 L90 1000 C 180 960, 240 1010, 300 985 C 370 955, 440 1012, 540 980 C 640 950, 710 1012, 780 985 C 845 958, 900 1005, 990 990 L990 1240 Z';
const GUM_EDGE = 'M90 1000 C 180 960, 240 1010, 300 985 C 370 955, 440 1012, 540 980 C 640 950, 710 1012, 780 985 C 845 958, 900 1005, 990 990';

/** 09 — Gum care: a clean, non-graphic gumline under three teeth; a soft green highlight traces it; a minimal card. */
export const F09Gums: React.FC = () => {
  const t = useTime();
  const c = FUT.gums;
  const enter = ease.outExpo(prog(t, 0, 0.8));
  const trace = ease.inOut(prog(t, 0.6, 1.6));
  const len = 1100;
  return (
    <Frame t={t} label={chapter(9, c.label)} kh={c.kh} khAt={0.9} glows={[{ x: 540, y: 1000, r: 520, color: F.neon, a: 0.14 }]}>
      <Cam t={t} dur={3} from={1.03} to={1}>
        {[300, 540, 780].map((x, i) => (
          <Tooth key={x} id={`f09${i}`} x={x} y={900 + 40 * (1 - enter)} size={300} opacity={enter} rim={F.neon} shine={prog(t, 1.2 + i * 0.1, 2.0 + i * 0.1)} />
        ))}
        <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, opacity: enter }}>
          <defs>
            {/* soft gum tone that fades out to the sides and downwards (no hard edges) */}
            <radialGradient id="gumFill" gradientUnits="userSpaceOnUse" cx={540} cy={985} r={460} gradientTransform="translate(540 985) scale(1 0.55) translate(-540 -985)">
              <stop offset="0" stopColor="#B07A82" stopOpacity={0.95} />
              <stop offset="0.55" stopColor="#7A4A52" stopOpacity={0.6} />
              <stop offset="1" stopColor="#3B2A2E" stopOpacity={0} />
            </radialGradient>
            <linearGradient id="gumEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={F.neon} stopOpacity={0} />
              <stop offset="0.2" stopColor={F.neon} />
              <stop offset="0.8" stopColor={F.neon} />
              <stop offset="1" stopColor={F.neon} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={GUM} fill="url(#gumFill)" />
          <path d={GUM_EDGE} fill="none" stroke="url(#gumEdge)" strokeWidth={10} strokeDasharray={len} strokeDashoffset={len * (1 - trace)} opacity={0.35} style={{ filter: 'blur(6px)' }} />
          <path d={GUM_EDGE} fill="none" stroke="url(#gumEdge)" strokeWidth={3} strokeDasharray={len} strokeDashoffset={len * (1 - trace)} />
        </svg>
      </Cam>
      <Glass x={540} y={1340} w={860} h={130} p={prog(t, 0.8, 1.4)}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          {c.items.map((it, i) => (
            <span key={it} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, opacity: ease.outExpo(prog(t, 1.0 + i * 0.15, 1.5 + i * 0.15)) }}>
              <span style={{ width: 44, height: 44, borderRadius: 22, background: hexA(F.neon, 0.12), border: `1px solid ${hexA(F.neon, 0.45)}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Glyph name="check" size={24} color={F.neon} stroke={2.6} />
              </span>
              <span style={latin(28, 800, F.white, 3)}>{it}</span>
            </span>
          ))}
        </div>
      </Glass>
      <At x={540} y={330}>
        <Kinetic text={c.en} t={t} at={0.15} size={120} accent={['GUM']} />
      </At>
    </Frame>
  );
};
