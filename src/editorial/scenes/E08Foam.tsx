import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Foam as FoamBank, MicroBubbles } from '../../cinematic/fx/Elements';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { GlyphName, IconBadge } from '../ui/Interface';
import { BeadField } from '../ui/Objects';
import { At, Eyebrow, khmer, latin } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

const ICONS: GlyphName[] = ['drop', 'cool', 'spark'];

/** 08 — The foam: milky white, cool feeling, lifts dust & makeup. Macro foam + three floating panels. */
export const E08Foam: React.FC = () => {
  const t = useTime();
  const c = T.makeup;
  const foam = ease.outQuint(prog(t, 0.2, 2.0));
  const enter = ease.outExpo(prog(t, 0.3, 1.3));
  return (
    <AbsoluteFill>
      <Backdrop mood="white" t={t} />
      <Cam t={t} dur={5.5} from={1} to={1.05} dy={-20}>
        <BeadField t={t} seed={801} n={14} tint={BLUE.ice} rise={26} />
        <Foam edition="blue" x={380} y={1130 + 80 * (1 - enter)} height={700} rotate={-24} opacity={enter} shadow={false} />
        <Foam edition="green" x={700} y={1150 + 80 * (1 - enter)} height={690} rotate={22} opacity={enter} shadow={false} />
        <MicroBubbles t={t} seed={802} n={24} fromY={1500} opacity={foam} />
        <FoamBank t={t} seed={803} n={140} y={1430} grow={foam} tint="#EEF4F8" />
      </Cam>
      <At x={540} y={280}>
        <Eyebrow text="THE FOAM" p={prog(t, 0.2, 0.9)} dash={GREEN.fresh} />
      </At>
      {c.foam.map((f, i) => (
        <Card key={f.en} x={540} y={420 + i * 150} w={860} h={124} p={prog(t, 0.6 + i * 0.35, 1.3 + i * 0.35)} t={t} float={4} radius={62} padding="0 28px" align="start">
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <IconBadge name={ICONS[i]} size={76} color={i === 1 ? BLUE.royal : GREEN.botanical} bg={i === 1 ? BLUE.pale : GREEN.cream} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={latin(18, 800, INK.mist, 3)}>{f.en}</span>
              <span style={{ ...khmer(32, 700, INK.charcoal), lineHeight: 1.5 }}>{f.kh}</span>
            </div>
          </div>
        </Card>
      ))}
    </AbsoluteFill>
  );
};
