import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card, LiveDot, Pill } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { Glyph, Phone } from '../ui/Interface';
import { LeafCloud } from '../ui/Objects';
import { At, Eyebrow, KhLine, Underline, khmer, latin } from '../ui/Type';
import { GREEN, INK, ease } from '../theme';

/** 07 — Daily makeup: a floating phone plays the green-edition spot; kinetic Khmer copy. */
export const E07DailyMakeup: React.FC = () => {
  const t = useTime();
  const c = T.makeup;
  const phone = prog(t, 0.9, 1.9);
  const play = ease.inOut(prog(t, 1.6, 5.8));
  return (
    <AbsoluteFill>
      <Backdrop mood="warm" t={t} />
      <Cam t={t} dur={6} from={1.05} to={1}>
        <LeafCloud t={t} seed={701} n={4} p={prog(t, 0.6, 1.6)} area={{ x0: 0, x1: 1080, y0: 800, y1: 1600 }} />
        <Phone x={540} y={1080} h={860} p={phone} t={t} tiltY={-10}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(170deg, ${GREEN.cream}, ${GREEN.sage})` }} />
          <div style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
            <span style={latin(18, 800, GREEN.forest, 6)}>JAKUBEE</span>
          </div>
          <Foam edition="green" x={190} y={390} height={460} shadow={false} sweep={prog(t, 2.6, 3.4)} />
          <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <span style={khmer(30, 700, GREEN.forest)}>ពណ៌បៃតង</span>
          </div>
          {/* playback bar */}
          <div style={{ position: 'absolute', bottom: 70, left: 40, right: 40, height: 6, borderRadius: 3, background: 'rgba(18,59,42,0.15)' }}>
            <div style={{ width: `${100 * play}%`, height: '100%', borderRadius: 3, background: GREEN.botanical }} />
          </div>
        </Phone>
      </Cam>
      <At x={540} y={280}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={GREEN.fresh} />
      </At>
      <At x={540} y={370}>
        <KhLine text={c.kh1} t={t} at={0.3} size={52} weight={600} color={INK.slate} />
      </At>
      <At x={540} y={470}>
        <Underline p={prog(t, 1.3, 1.9)} color={GREEN.fresh} thickness={10} offset={10}>
          <KhLine text={c.kh2} t={t} at={0.6} size={66} />
        </Underline>
      </At>
      <Card x={190} y={860} w={260} h={84} p={prog(t, 2.0, 2.6)} t={t} float={6} radius={42}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <Glyph name="spark" size={28} color={GREEN.botanical} />
          <span style={latin(20, 800, INK.charcoal, 3)}>{c.en}</span>
        </span>
      </Card>
      <Card x={900} y={1250} w={260} h={84} p={prog(t, 2.3, 2.9)} t={t} float={6} radius={42}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <LiveDot t={t} color={GREEN.botanical} />
          <span style={latin(20, 800, INK.charcoal, 3)}>EVERY DAY</span>
        </span>
      </Card>
      <At x={540} y={1570}>
        <Pill size={26} style={{ opacity: prog(t, 2.8, 3.2) }} bg={GREEN.forest} border="rgba(255,255,255,0.2)">
          <KhLine text={c.kh3} t={t} at={2.8} size={36} color="#FFFFFF" />
        </Pill>
      </At>
    </AbsoluteFill>
  );
};
