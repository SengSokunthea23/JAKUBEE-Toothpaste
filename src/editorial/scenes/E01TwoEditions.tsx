import React from 'react';
import { AbsoluteFill } from 'remotion';
import { clamp, prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { T } from '../copy';
import { Backdrop, Cam, Grid } from '../ui/Backdrop';
import { Card, Pill } from '../ui/Card';
import { Foam } from '../ui/Foam';
import { Disc, Ring, Square } from '../ui/Objects';
import { At, Eyebrow, KhLine, Underline, khmer, latin } from '../ui/Type';
import { BLUE, GREEN, INK, ease } from '../theme';

/** 01 — Two editions: gradient intro, floating product cards assembling into a hero layout. */
export const E01TwoEditions: React.FC = () => {
  const t = useTime();
  const c = T.intro;
  const cardA = prog(t, 0.5, 1.4);
  const cardB = prog(t, 0.7, 1.6);
  const hlP = prog(t, 2.0, 2.6);
  const geo = (a: number) => prog(t, a, a + 0.7);
  return (
    <AbsoluteFill>
      <Backdrop mood="warm" t={t} />
      <Grid p={prog(t, 0, 1.6)} />
      <Cam t={t} dur={5.5} from={1.04} to={1}>
        {/* geometric assembly pieces that lock in around the cards */}
        <Disc x={190} y={690} r={46} p={geo(1.3)} fill={`linear-gradient(135deg, ${BLUE.aqua}, ${BLUE.royal})`} shadow />
        <Disc x={900} y={1370} r={40} p={geo(1.45)} fill={`linear-gradient(135deg, ${GREEN.sage}, ${GREEN.botanical})`} shadow />
        <Square x={920} y={700} s={58} p={geo(1.55)} fill="rgba(255,255,255,0.95)" rotate={14} />
        <Ring x={540} y={1030} r={470} p={geo(1.1)} color="rgba(28,34,48,0.10)" width={2} />
        <Card x={318} y={1030} w={390} h={640} p={cardA} t={t} float={6} fill={`linear-gradient(170deg, #FFFFFF, ${BLUE.pale})`}>
          <Foam edition="blue" x={195} y={300} height={460} shadow={false} sweep={prog(t, 2.6, 3.4)} />
          <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <Pill size={20}>
              <span style={{ width: 14, height: 14, borderRadius: 7, background: BLUE.royal }} />
              <span style={latin(20, 800, INK.charcoal, 3)}>{c.blue}</span>
            </Pill>
          </div>
        </Card>
        <Card x={762} y={1030} w={390} h={640} p={cardB} t={t} float={6} fill={`linear-gradient(170deg, #FFFFFF, ${GREEN.cream})`}>
          <Foam edition="green" x={195} y={300} height={460} shadow={false} sweep={prog(t, 2.75, 3.55)} />
          <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <Pill size={20}>
              <span style={{ width: 14, height: 14, borderRadius: 7, background: GREEN.botanical }} />
              <span style={latin(20, 800, INK.charcoal, 3)}>{c.green}</span>
            </Pill>
          </div>
        </Card>
      </Cam>
      <At x={540} y={290}>
        <Eyebrow text={c.eyebrow} p={prog(t, 0.3, 1.0)} dash={GREEN.fresh} />
      </At>
      <At x={540} y={390}>
        <KhLine text={c.kh1} t={t} at={0.9} size={76} />
      </At>
      <At x={540} y={500}>
        <span style={{ display: 'inline-flex', gap: 22, alignItems: 'baseline' }}>
          <KhLine text="ឥឡូវមាន" t={t} at={1.3} size={76} weight={600} color={INK.slate} />
          <span style={{ opacity: clamp((t - 1.5) / 0.4) }}>
            <Underline p={hlP} color={GREEN.fresh} thickness={10} offset={10}>
              <span style={khmer(76, 700, INK.charcoal)}>{c.hl}</span>
            </Underline>
          </span>
        </span>
      </At>
      <At x={540} y={1460}>
        <span style={{ ...latin(24, 700, INK.mist, 10), opacity: ease.outExpo(prog(t, 2.4, 3.0)) }}>{c.en}</span>
      </At>
    </AbsoluteFill>
  );
};
