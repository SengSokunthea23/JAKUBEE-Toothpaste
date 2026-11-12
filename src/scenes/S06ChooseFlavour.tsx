import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BlueBg, GlowBlob, GreenBg } from '../components/Backgrounds';
import { Leaf, makeLeaves, makeParticles, RisingBubbles } from '../components/Decor';
import { GradientDot } from '../components/GlassCard';
import { Product } from '../components/Product';
import { Khmer, Label, Latin, Reveal } from '../components/Typography';
import { easeBack, easeOut, prog } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const BUBBLES = makeParticles(14, 18);
const LEAVES = makeLeaves(5, 6);

/** 06 — Blue vs Green split-screen comparison. */
export const S06ChooseFlavour: React.FC = () => {
  const t = useTime();
  const c = COPY.choose;
  const line = easeOut(prog(t, 0.6, 1.4));
  const or = prog(t, 1.0, 1.4);
  const sides = [
    { name: 'zesty-lemon-tube' as const, x: 270, col: COLORS.ice, ...c.left },
    { name: 'herbal-mint-tube' as const, x: 810, col: COLORS.sage, ...c.right },
  ];
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: 'inset(0 540px 0 0)' }}>
        <BlueBg cx={270} />
        <RisingBubbles particles={BUBBLES} t={t} opacity={0.8} xMax={520} />
      </AbsoluteFill>
      <AbsoluteFill style={{ clipPath: 'inset(0 0 0 540px)' }}>
        <GreenBg cx={810} />
        {LEAVES.map((lf, i) => {
          const x = 560 + (lf.x % 500);
          const y = lf.y + lf.vy * t;
          if ((x > 640 && x < 980 && y > 650 && y < 1500) || y < 560) return null;
          return <Leaf key={i} x={x} y={y} length={lf.length * 0.7} rotate={lf.a0 + lf.va * t} opacity={0.8} />;
        })}
      </AbsoluteFill>
      {sides.map((s, i) => {
        const q = prog(t, 0.5 + i * 0.2, 1.3 + i * 0.2);
        return (
          <React.Fragment key={s.name}>
            {q > 0 && <GlowBlob x={s.x} y={1080} r={260} color={s.col} a={0.45} />}
            <Product
              name={s.name}
              x={s.x}
              y={1075 + 50 * (1 - easeOut(q)) + 8 * Math.sin(t * 1.5 + i * 3)}
              height={780 * (0.92 + 0.08 * easeBack(q))}
              opacity={q}
              sweep={prog(t, 1.8 + i * 0.2, 2.6 + i * 0.2)}
              shadow={1.5}
            />
            <Reveal x={s.x} y={1530} p={prog(t, 1.2 + i * 0.15, 1.7 + i * 0.15)}>
              <Latin size={36} color="#FFFFFF" tracking={3}>
                {s.en}
              </Latin>
            </Reveal>
            <Reveal x={s.x} y={1590} p={prog(t, 1.35 + i * 0.15, 1.85 + i * 0.15)}>
              <Khmer size={34} weight={600} color={s.col}>
                {s.kh}
              </Khmer>
            </Reveal>
          </React.Fragment>
        );
      })}
      <div style={{ position: 'absolute', left: 539, top: 1080 - 420 * line, width: 2, height: 840 * line, background: '#FFFFFF' }} />
      <GradientDot x={540} y={1080} d={96} gradient="#FFFFFF" opacity={or} scale={0.5 + 0.5 * easeBack(or)}>
        <Khmer size={44}>{c.or}</Khmer>
      </GradientDot>
      <Reveal x={540} y={285} p={prog(t, 0.4, 0.9)}>
        <Label color="#FFFFFF" tracking={10}>
          {c.label}
        </Label>
      </Reveal>
      <Reveal x={540} y={380} p={prog(t, 0.55, 1.1)}>
        <Khmer size={76} color="#FFFFFF">
          {c.kh1}
        </Khmer>
      </Reveal>
      <Reveal x={540} y={478} p={prog(t, 0.7, 1.25)}>
        <Khmer size={46} weight={600} color="#FFFFFF">
          {c.kh2}
        </Khmer>
      </Reveal>
    </AbsoluteFill>
  );
};
