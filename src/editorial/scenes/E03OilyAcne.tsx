import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { IconBadge, GlyphName } from '../ui/Interface';
import { BeadField } from '../ui/Objects';
import { At, Eyebrow, Highlight, KhLine, khmer, latin } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';

/** Skin-type benefit panels shared by scenes 03 and 06. */
export const BenefitStack: React.FC<{ t: number; at: number; x: number; w: number; ys: number[]; cards: readonly { icon: string; en: string; kh: string }[]; strong: string; light: string }> = ({
  t,
  at,
  x,
  w,
  ys,
  cards,
  strong,
  light,
}) => (
  <>
    {cards.map((c, i) => (
      <Card key={c.en} x={x} y={ys[i]} w={w} h={150} p={prog(t, at + i * 0.32, at + 0.8 + i * 0.32)} t={t} float={4} radius={34} padding="0 30px" align="start">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, minWidth: 0 }}>
          <IconBadge name={c.icon as GlyphName} size={84} color={strong} bg={light} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
            <span style={latin(20, 800, strong, 3)}>{c.en}</span>
            <span style={{ ...khmer(30, 600, INK.charcoal), lineHeight: 1.55 }}>{c.kh}</span>
          </div>
        </div>
        {/* progress indicator stripe */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 5, width: `${100 * ease.outExpo(prog(t, at + 0.4 + i * 0.32, at + 1.4 + i * 0.32))}%`, background: strong, opacity: 0.8 }} />
      </Card>
    ))}
  </>
);

/** 03 — Oily & acne-prone skin: kinetic keywords + floating benefit panels. */
export const E03OilyAcne: React.FC = () => {
  const t = useTime();
  const c = T.oily;
  const enter = ease.outExpo(prog(t, 0.6, 1.6));
  return (
    <AbsoluteFill>
      <Backdrop mood="white" t={t} />
      <Cam t={t} dur={7} from={1} to={1.04}>
        <BeadField t={t} seed={301} n={10} tint={BLUE.ice} p={0.7} />
        <Foam edition="blue" x={905} y={1110 + 100 * (1 - enter)} height={720} rotate={6} opacity={enter} />
      </Cam>
      <At x={90} y={290} align="left">
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={BLUE.royal} />
      </At>
      <At x={90} y={380} align="left">
        <KhLine text={c.kh} t={t} at={0.4} size={80} />
      </At>
      <At x={80} y={495} align="left">
        <Highlight words={c.words} t={t} at={1.0} every={0.4} size={26} color={BLUE.royal} />
      </At>
      <BenefitStack t={t} at={1.6} x={425} w={710} ys={[700, 870, 1040, 1210]} cards={c.cards} strong={BLUE.royal} light={BLUE.pale} />
    </AbsoluteFill>
  );
};
