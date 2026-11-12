import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { OFFER, T } from '../copy';
import { Edition } from '../assets';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { Glyph } from '../ui/Interface';
import { At, Eyebrow, KhLine, Price, khmer, latin } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

const ROW: Edition[] = ['blue', 'green', 'blue', 'green'];

/** 11 — Four tubes = $20, free delivery to 25 provinces (condition shown: 2 tubes not included). */
export const E11Bundle: React.FC = () => {
  const t = useTime();
  const c = T.bundle;
  const cardAt = (i: number) => 0.5 + i * 0.22;
  const count = ROW.filter((_, i) => t > cardAt(i) + 0.3).length;
  const n = Math.round(OFFER.provinces * ease.outQuint(prog(t, 2.9, 4.1)));
  return (
    <AbsoluteFill>
      <Backdrop mood="dual" t={t} />
      <Cam t={t} dur={6.5} from={1} to={1.03}>
        {ROW.map((ed, i) => {
          const x = 187 + i * 235;
          return (
            <Card key={i} x={x} y={900} w={215} h={400} p={prog(t, cardAt(i), cardAt(i) + 0.7)} t={t} float={5} radius={32} fill={`linear-gradient(170deg, #FFFFFF, ${ed === 'blue' ? BLUE.pale : GREEN.cream})`}>
              <Foam edition={ed} x={107} y={190} height={320} shadow={false} sweep={prog(t, 1.8 + i * 0.1, 2.5 + i * 0.1)} />
              <div style={{ position: 'absolute', top: 14, right: 16, ...latin(18, 800, ed === 'blue' ? BLUE.royal : GREEN.botanical, 1) }}>0{i + 1}</div>
            </Card>
          );
        })}
      </Cam>
      <At x={540} y={280}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.1, 0.8)} dash={GREEN.fresh} />
      </At>
      <At x={540} y={370}>
        <KhLine text={c.kh} t={t} at={0.25} size={60} />
      </At>
      <At x={540} y={540}>
        <Price text={OFFER.bundle} t={t} at={1.5} size={210} color={INK.charcoal} sweepAt={2.3} />
      </At>
      <At x={540} y={1145}>
        <span style={{ display: 'inline-flex', gap: 12, alignItems: 'center', opacity: clamp(t / 0.6) }}>
          {ROW.map((ed, i) => (
            <span key={i} style={{ width: 14, height: 14, borderRadius: 7, background: i < count ? (ed === 'blue' ? BLUE.royal : GREEN.botanical) : 'rgba(28,34,48,0.15)' }} />
          ))}
          <span style={{ ...latin(22, 800, INK.slate, 6), marginLeft: 8 }}>{c.tubes}</span>
        </span>
      </At>
      <Card x={540} y={1330} w={920} h={180} p={prog(t, 2.6, 3.2)} t={t} radius={40} padding="0 40px" align="start">
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 150, flex: 'none' }}>
            <span style={{ ...latin(84, 800, GREEN.botanical, -2), fontVariantNumeric: 'tabular-nums' }}>{n}</span>
            <span style={latin(16, 800, INK.mist, 3)}>PROVINCES</span>
          </div>
          <div style={{ width: 2, height: 100, background: 'rgba(28,34,48,0.1)', flex: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <Glyph name="truck" size={34} color={GREEN.botanical} stroke={2} />
              <span style={latin(22, 800, INK.charcoal, 3)}>{c.deliveryEn}</span>
            </span>
            <span style={khmer(34, 700, INK.charcoal)}>{c.delivery}</span>
          </div>
        </div>
      </Card>
      <At x={540} y={1490}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, opacity: prog(t, 3.4, 3.9) }}>
          <span style={{ width: 26, height: 26, borderRadius: 13, border: `2px solid ${INK.mist}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...latin(16, 800, INK.mist) }}>i</span>
          <span style={khmer(28, 600, INK.slate)}>{c.condition}</span>
        </span>
      </At>
    </AbsoluteFill>
  );
};
