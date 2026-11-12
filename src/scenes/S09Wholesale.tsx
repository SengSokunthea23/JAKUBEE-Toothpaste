import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DarkBg, GlowBlob } from '../components/Backgrounds';
import { Product } from '../components/Product';
import { At, GradientLatin, Khmer, Latin, Reveal } from '../components/Typography';
import { easeBack, easeOut, prog } from '../lib/anim';
import { COPY, OFFER } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const ROWS = [
  { cy: 1010, h: 300 },
  { cy: 1340, h: 300 },
];

/** 09 — Wholesale / reseller offer on a premium retail shelf. */
export const S09Wholesale: React.FC = () => {
  const t = useTime();
  const c = COPY.wholesale;
  const pill = prog(t, 0.2, 0.6);
  const q = prog(t, 0.5, 1.1);
  return (
    <AbsoluteFill>
      <DarkBg />
      <At x={540} y={290} opacity={pill}>
        <div style={{ border: `2px solid ${COLORS.silver}`, borderRadius: 32, padding: '16px 38px' }}>
          <Latin size={26} color="#FFFFFF" tracking={8}>
            {c.label}
          </Latin>
        </div>
      </At>
      <Reveal x={540} y={400} p={prog(t, 0.35, 0.9)}>
        <Khmer size={68} color="#FFFFFF">
          {c.kh}
        </Khmer>
      </Reveal>
      <At x={540} y={600} opacity={Math.min(1, q * 2)} scale={0.6 + 0.4 * easeBack(q)}>
        <GradientLatin size={260} from="#FFFFFF" to={COLORS.silver} shine={prog(t, 1.3, 2.1)} style={{ lineHeight: 0.9 }}>
          {OFFER.wholesalePrice}
        </GradientLatin>
      </At>
      <Reveal x={540} y={790} p={prog(t, 1.0, 1.5)}>
        <Khmer size={44} weight={600} color={COLORS.silver}>
          {c.subBefore}
          <span style={{ fontFamily: 'Manrope', fontWeight: 700 }}>{OFFER.wholesalePrice}</span>
          {c.subAfter}
        </Khmer>
      </Reveal>
      {ROWS.map((row, r) => {
        const g = easeOut(prog(t, 0.8 + r * 0.2, 1.5 + r * 0.2));
        const shelfY = row.cy + row.h / 2 + 6;
        return (
          <React.Fragment key={r}>
            <GlowBlob x={540} y={shelfY} r={200} color="#8A96A3" a={0.25} />
            <div style={{ position: 'absolute', left: 540 - 450 * g, top: shelfY - 1, width: 900 * g, height: 3, background: '#6C7682' }} />
            {[0, 1, 2, 3].map((i) => {
              const k = prog(t, 1.0 + r * 0.3 + i * 0.08, 1.5 + r * 0.3 + i * 0.08);
              return (
                <Product
                  key={i}
                  name={(i + r) % 2 === 0 ? 'zesty-lemon-tube' : 'herbal-mint-tube'}
                  x={240 + i * 200}
                  y={row.cy - 120 * (1 - easeBack(k))}
                  height={row.h}
                  opacity={Math.min(1, k * 2)}
                  shadow={1.6}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
