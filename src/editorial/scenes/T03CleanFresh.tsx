import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam } from '../ui/Backdrop';
import { Card, Pill } from '../ui/Card';
import { Glyph, SearchBar } from '../ui/Interface';
import { BeadField } from '../ui/Objects';
import { Product } from '../ui/Product';
import { At, Headline, KhLine, Underline, latin } from '../ui/Type';
import { BLUE, INK } from '../theme';
import { LEMON } from './T01Intro';

/** 03 — Cleans teeth & stops bad breath: search interface types keywords, a result card resolves into the product. */
export const T03CleanFresh: React.FC = () => {
  const t = useTime();
  const c = T.clean;
  const res = prog(t, 3.2, 4.0);
  return (
    <AbsoluteFill>
      <Backdrop mood="blue" t={t} />
      <Cam t={t} dur={6.5} from={1.03} to={1}>
        <BeadField t={t} seed={301} n={24} tint={BLUE.aqua} rise={30} />
      </Cam>
      <At x={540} y={330}>
        <Headline text={c.title} t={t} at={0.2} size={104} color={BLUE.navy} />
      </At>
      <SearchBar t={t} at={0.5} queries={c.queries} x={540} y={520} w={900} accent={BLUE.royal} per={0.9} />
      <Card x={540} y={1060} w={900} h={700} p={res} t={t} float={4} radius={44}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 330, background: `linear-gradient(170deg, ${BLUE.pale}, #FFFFFF)` }} />
        <Product shot="tube" x={165} y={350} height={600} shadow={false} sweep={prog(t, 4.3, 5.1)} />
        <div style={{ position: 'absolute', left: 370, top: 150, right: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <Glyph name="search" size={26} color={BLUE.royal} stroke={2.4} />
            <span style={latin(20, 800, BLUE.royal, 4)}>{c.queries[1]}</span>
          </span>
          <KhLine text={c.kh1} t={t} at={3.6} size={54} color={BLUE.navy} />
          <Underline p={prog(t, 4.3, 4.9)} color={LEMON} thickness={8} offset={8}>
            <KhLine text={c.kh2} t={t} at={3.8} size={44} />
          </Underline>
          <KhLine text={c.kh3} t={t} at={4.0} size={36} weight={600} color={INK.slate} />
          <div style={{ display: 'flex', gap: 12, marginTop: 18, opacity: prog(t, 4.6, 5.1) }}>
            <Pill size={18} bg={BLUE.pale} border="rgba(8,121,201,0.15)">
              <Glyph name="tooth" size={26} color={BLUE.royal} />
              <span style={latin(16, 800, BLUE.royal, 2)}>CLEAN TEETH</span>
            </Pill>
            <Pill size={18} bg={BLUE.pale} border="rgba(8,121,201,0.15)">
              <Glyph name="wind" size={26} color={BLUE.royal} />
              <span style={latin(16, 800, BLUE.royal, 2)}>FRESH BREATH</span>
            </Pill>
          </div>
        </div>
      </Card>
    </AbsoluteFill>
  );
};
