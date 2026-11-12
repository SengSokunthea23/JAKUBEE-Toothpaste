import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card, LiveDot, Pill } from '../ui/Card';
import { Glyph, Phone } from '../ui/Interface';
import { LemonField } from '../ui/Lemon';
import { Product } from '../ui/Product';
import { At, Eyebrow, KhLine, Underline, khmer, latin } from '../ui/Type';
import { BLUE, INK, ease } from '../theme';
import { LEMON } from './T01Intro';

/** 09 — Suitable for daily use, good oral hygiene: a floating phone shows a daily-care week. */
export const T09DailyCare: React.FC = () => {
  const t = useTime();
  const c = T.daily;
  const phone = prog(t, 0.6, 1.6);
  return (
    <AbsoluteFill>
      <Backdrop mood="warm" t={t} />
      <Cam t={t} dur={6} from={1.05} to={1}>
        <LemonField t={t} seed={901} n={3} p={prog(t, 0.6, 1.6)} area={{ x0: 0, x1: 1080, y0: 900, y1: 1500 }} size={[90, 160]} />
        <Phone x={540} y={1060} h={860} p={phone} t={t} tiltY={-10}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(170deg, #FFFFFF, ${BLUE.pale})` }} />
          <div style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center' }}>
            <span style={latin(16, 800, BLUE.navy, 6)}>JAKUBEE</span>
          </div>
          <Product shot="tube" x={210} y={330} height={380} shadow={false} sweep={prog(t, 2.4, 3.2)} />
          <div style={{ position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Glyph name="calendar" size={24} color={BLUE.royal} />
              <span style={latin(14, 800, BLUE.royal, 3)}>{c.en}</span>
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {c.days.map((d, i) => {
                const on = ease.outExpo(prog(t, 1.8 + i * 0.18, 2.1 + i * 0.18));
                return (
                  <div key={i} style={{ width: 42, height: 56, borderRadius: 14, background: on > 0.5 ? BLUE.royal : 'rgba(8,121,201,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, transform: `scale(${0.9 + 0.1 * on})` }}>
                    <span style={latin(13, 800, on > 0.5 ? '#FFFFFF' : BLUE.royal, 0)}>{d}</span>
                    <span style={{ opacity: on }}>
                      <Glyph name="check" size={16} color="#FFFFFF" stroke={3} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Phone>
      </Cam>
      <At x={540} y={280}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.2, 0.9)} dash={LEMON} />
      </At>
      <At x={540} y={380}>
        <Underline p={prog(t, 1.2, 1.8)} color={LEMON} thickness={8} offset={8}>
          <KhLine text={c.kh1} t={t} at={0.3} size={52} />
        </Underline>
      </At>
      <Card x={190} y={880} w={280} h={84} p={prog(t, 2.2, 2.8)} t={t} float={6} radius={42}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <LiveDot t={t} color={BLUE.royal} />
          <span style={latin(18, 800, INK.charcoal, 3)}>EVERY DAY</span>
        </span>
      </Card>
      <Card x={900} y={1250} w={260} h={84} p={prog(t, 2.5, 3.1)} t={t} float={6} radius={42}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <Glyph name="tooth" size={28} color={BLUE.royal} />
          <span style={latin(18, 800, INK.charcoal, 3)}>ORAL CARE</span>
        </span>
      </Card>
      <At x={540} y={1570}>
        <Pill size={26} style={{ opacity: prog(t, 2.9, 3.3) }} bg={BLUE.navy} border="rgba(255,255,255,0.2)">
          <span style={khmer(34, 700, '#FFFFFF')}>{c.kh2}</span>
        </Pill>
      </At>
    </AbsoluteFill>
  );
};
