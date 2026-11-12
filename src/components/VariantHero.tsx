import React from 'react';
import { Callout } from './Callout';
import { GlowBlob } from './Backgrounds';
import { Product, ProductName } from './Product';
import { Khmer, Label, Latin, Reveal } from './Typography';
import { easeBack, easeOut, prog } from '../lib/anim';

/** Shared hero layout for a single variant: title stack, cinematic tube reveal, callouts. */
export const VariantHero: React.FC<{
  t: number;
  product: ProductName;
  label: string;
  title1: string;
  title2: string;
  kh: [string, string];
  accent: string; // label + outline colour
  khColor: string;
  glow: string;
  callouts: { big: string; small: string }[];
  calloutY: [number, number];
}> = ({ t, product, label, title1, title2, kh, accent, khColor, glow, callouts, calloutY }) => {
  const p = prog(t, 0.35, 1.3);
  const s = 0.9 + 0.1 * easeBack(p);
  return (
    <>
      <GlowBlob x={540} y={1130} r={380} color={glow} a={0.6} scale={1 + 0.04 * Math.sin(t * 2.2)} />
      <Product
        name={product}
        x={540}
        y={1135 + 60 * (1 - easeOut(p)) + 10 * Math.sin(t * 1.6)}
        height={860 * s}
        opacity={p}
        sweep={prog(t, 1.6, 2.5)}
        shadow={1.6}
      />
      <Reveal x={540} y={290} p={prog(t, 0.5, 1.0)}>
        <Label color={accent}>{label}</Label>
      </Reveal>
      <Reveal x={540} y={395} p={prog(t, 0.7, 1.3)}>
        <Latin size={150} color="#FFFFFF" tracking={4}>
          {title1}
        </Latin>
      </Reveal>
      <Reveal x={540} y={540} p={prog(t, 0.85, 1.45)}>
        <Latin size={150} outline={accent} tracking={4}>
          {title2}
        </Latin>
      </Reveal>
      <Reveal x={540} y={650} p={prog(t, 1.1, 1.7)}>
        <Khmer size={46} weight={600} color={khColor}>
          {kh[0]}
          <span style={{ fontFamily: 'Manrope', margin: '0 18px' }}>·</span>
          {kh[1]}
        </Khmer>
      </Reveal>
      <Callout t={t} start={2.3} px={470} py={calloutY[0]} lx={300} ly={calloutY[0]} big={callouts[0].big} small={callouts[0].small} accent={accent} side="left" />
      <Callout t={t} start={2.7} px={610} py={calloutY[1]} lx={780} ly={calloutY[1]} big={callouts[1].big} small={callouts[1].small} accent={accent} side="right" />
    </>
  );
};
