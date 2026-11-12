import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Foam } from '../ui/Foam';
import { BeadField, Ring } from '../ui/Objects';
import { At, Eyebrow, KhLine } from '../ui/Type';
import { GREEN, ease } from '../theme';
import { BenefitStack } from './E03OilyAcne';

/** 06 — Dry skin & weak skin barrier: hydration rings around the green product, info panels. */
export const E06DrySkin: React.FC = () => {
  const t = useTime();
  const c = T.dry;
  const enter = ease.outExpo(prog(t, 0.6, 1.6));
  const PX = 180;
  const PY = 1080;
  return (
    <AbsoluteFill>
      <Backdrop mood="green" t={t} />
      <Cam t={t} dur={6.5} from={1} to={1.04}>
        <BeadField t={t} seed={601} n={12} tint={GREEN.sage} p={0.8} />
        {/* hydration ripples */}
        {[0, 1, 2].map((i) => {
          const k = (((t - 0.8) * 0.45 + i / 3) % 1 + 1) % 1;
          return t > 0.8 ? <Ring key={i} x={PX} y={PY} r={140 + 260 * k} p={1} color={`rgba(100,168,76,${0.35 * (1 - k)})`} width={2} /> : null;
        })}
        <Foam edition="green" x={PX} y={PY + 100 * (1 - enter)} height={720} rotate={-6} opacity={enter} />
      </Cam>
      <At x={990} y={290} align="right">
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={GREEN.fresh} />
      </At>
      <At x={990} y={380} align="right">
        <KhLine text={c.kh} t={t} at={0.4} size={80} />
      </At>
      <BenefitStack t={t} at={1.2} x={655} w={710} ys={[640, 810, 980, 1150]} cards={c.cards} strong={GREEN.botanical} light={GREEN.cream} />
    </AbsoluteFill>
  );
};
