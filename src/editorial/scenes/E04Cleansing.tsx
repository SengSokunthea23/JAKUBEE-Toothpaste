import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card, Pill } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { Glyph, SearchBar } from '../ui/Interface';
import { BeadField } from '../ui/Objects';
import { At, Headline, KhLine, Underline, khmer, latin } from '../ui/Type';
import { BLUE, INK } from '../theme';

/** 04 — Cleansing: search interface types skincare keywords, a result card resolves into the product. */
export const E04Cleansing: React.FC = () => {
  const t = useTime();
  const c = T.clean;
  const res = prog(t, 3.2, 4.0);
  return (
    <AbsoluteFill>
      <Backdrop mood="blue" t={t} />
      <Cam t={t} dur={6} from={1.03} to={1}>
        <BeadField t={t} seed={401} n={26} tint={BLUE.aqua} rise={30} />
      </Cam>
      <At x={540} y={330}>
        <Headline text={c.title} t={t} at={0.2} size={110} color={BLUE.navy} />
      </At>
      <SearchBar t={t} at={0.5} queries={c.queries} x={540} y={520} w={900} accent={BLUE.royal} per={0.9} />
      {/* result card */}
      <Card x={540} y={1060} w={900} h={700} p={res} t={t} float={4} radius={44} padding={0}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 360, background: `linear-gradient(170deg, ${BLUE.pale}, #FFFFFF)` }} />
        <Foam edition="blue" x={180} y={350} height={560} shadow={false} sweep={prog(t, 4.2, 5.0)} />
        <div style={{ position: 'absolute', left: 400, top: 70, right: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <Glyph name="search" size={26} color={BLUE.royal} stroke={2.4} />
            <span style={latin(20, 800, BLUE.royal, 4)}>{c.queries[2]}</span>
          </span>
          <KhLine text={c.kh1} t={t} at={3.6} size={40} weight={600} color={INK.slate} />
          <Underline p={prog(t, 4.2, 4.8)} color={BLUE.aqua} thickness={8} offset={8}>
            <KhLine text={c.kh2} t={t} at={3.8} size={52} color={BLUE.navy} />
          </Underline>
        </div>
        <div style={{ position: 'absolute', left: 400, top: 380, opacity: prog(t, 4.4, 4.9) }}>
          <Pill size={22} bg={BLUE.pale} border="rgba(8,121,201,0.15)">
            <Glyph name="bubble" size={30} color={BLUE.royal} />
            <span style={khmer(30, 700, BLUE.navy)}>{c.chip}</span>
            <span style={latin(18, 800, BLUE.royal, 3)}>{c.chipEn}</span>
          </Pill>
        </div>
      </Card>
    </AbsoluteFill>
  );
};
