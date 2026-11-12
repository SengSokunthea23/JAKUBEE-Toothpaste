import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Dust } from '../../cinematic/fx/Elements';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Bloom, Cam } from '../ui/Backdrop';
import { Foam } from '../ui/Foam';
import { BeadField, Ring } from '../ui/Objects';
import { At, Headline, KhLine, Underline } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

/** 09 — Soft, moist, "glow glass skin": warm light, glow halo, editorial headline. */
export const E09Glow: React.FC = () => {
  const t = useTime();
  const c = T.glow;
  const halo = ease.outExpo(prog(t, 0.6, 1.8));
  return (
    <AbsoluteFill>
      <Backdrop mood="warm" t={t} />
      <Cam t={t} dur={5} from={1.06} to={1}>
        <Bloom x={540} y={1260} r={520} color="#FFFFFF" a={0.9 * halo} />
        <Bloom x={540} y={1260} r={380} color={BLUE.ice} a={0.35 * halo} />
        <Ring x={540} y={1260} r={330} p={prog(t, 0.8, 1.8)} color="rgba(255,255,255,0.95)" width={3} />
        <Ring x={540} y={1260} r={390} p={prog(t, 1.0, 2.0)} color="rgba(100,168,76,0.35)" width={1.5} dash="2 14" rotate={t * 10} />
        <BeadField t={t} seed={901} n={12} tint={BLUE.ice} p={0.8} />
        <Foam edition="blue" x={430} y={1270} height={600} rotate={-5} sweep={prog(t, 1.6, 2.4)} />
        <Foam edition="green" x={650} y={1280} height={590} rotate={5} sweep={prog(t, 1.75, 2.55)} />
        <div style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen' }}>
          <Dust t={t} seed={902} n={30} color="#FFFFFF" opacity={halo} />
        </div>
      </Cam>
      <At x={540} y={420}>
        <Headline text={c.line1} t={t} at={0.3} size={250} color={INK.charcoal} />
      </At>
      <At x={540} y={610}>
        <Underline p={prog(t, 1.2, 1.9)} color={GREEN.fresh} thickness={10} offset={-18}>
          <Headline text={c.line2} t={t} at={0.55} size={110} weight={700} color={BLUE.navy} />
        </Underline>
      </At>
      <At x={540} y={760}>
        <KhLine text={c.kh1} t={t} at={1.1} size={56} />
      </At>
      <At x={540} y={850}>
        <KhLine text={c.kh2} t={t} at={1.35} size={42} weight={600} color={INK.slate} />
      </At>
    </AbsoluteFill>
  );
};
