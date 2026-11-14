import React from 'react';
import { CauseIcon } from '../../components/CauseIcon';
import { prog, seeded } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { FUT, chapter } from '../copy';
import { F, ease, lerp } from '../theme';
import { Frame } from '../ui/Frame';
import { Glass, Hero, Tooth } from '../ui/Objects';
import { Cam } from '../ui/Stage';
import { At, Kinetic, khmer } from '../ui/Type';

const CARD_X = [200, 540, 880];
const CARD_Y = 640;

/** 06 — Tartar from cigarettes, tea & coffee: three glass cause cards shed stain particles onto a tooth, a clean scan, then both tubes. */
export const F06Tartar: React.FC = () => {
  const t = useTime();
  const c = FUT.tartar;
  const out = ease.inOut(prog(t, 2.3, 2.9));
  const move = ease.inOut(prog(t, 2.3, 3.1));
  const tube = ease.outExpo(prog(t, 2.5, 3.4));
  const r = seeded(66);
  const specks = Array.from({ length: 24 }, (_, i) => ({ from: i % 3, dx: r() * 160 - 80, dy: r() * 120 - 60, d: r() * 0.5 }));
  return (
    <Frame t={t} label={chapter(5, c.label)} kh={c.kh} khAt={0.8} glows={[{ x: 540, y: 1050, r: 460, color: F.neon, a: 0.12 }, { x: 540, y: 640, r: 500, color: F.zest, a: 0.08 }]} floor>
      <Cam t={t} dur={4} from={1} to={1.04}>
        {/* stain particles drifting from the causes to the tooth */}
        {specks.map((s, i) => {
          const k = ease.inOut(prog(t, 0.9 + s.d, 1.9 + s.d));
          const gone = prog(t, 1.9, 2.5);
          const x = lerp(CARD_X[s.from] + s.dx * 0.5, 540 + s.dx, k);
          const y = lerp(CARD_Y + 120, 1020 + s.dy, k);
          return <div key={i} style={{ position: 'absolute', left: x - 5, top: y - 5, width: 10, height: 10, borderRadius: 5, background: '#C9A23A', boxShadow: '0 0 10px rgba(201,162,58,0.8)', opacity: k > 0 ? (1 - gone) * 0.9 : 0 }} />;
        })}
        <Tooth id="f06" x={lerp(540, 300, move)} y={1040} size={lerp(400, 330, move)} opacity={ease.outExpo(prog(t, 0.5, 1.2))} stain={prog(t, 1.4, 1.9)} scan={prog(t, 1.9, 2.5)} rim={F.neon} />
        <Hero x={640} y={1030 + 300 * (1 - tube)} height={580} opacity={tube} sweep={prog(t, 3.1, 3.9)} rim={F.lemon} rotate={4} />
        <Hero flavour="herbal" x={860} y={1040 + 300 * (1 - tube)} height={570} opacity={tube} sweep={prog(t, 3.25, 4.05)} rim={F.mint} rotate={8} />
      </Cam>
      {c.causes.map((cause, i) => (
        <Glass key={cause.en} x={CARD_X[i]} y={CARD_Y - 30 * out} w={290} h={260} p={Math.min(prog(t, 0.25 + i * 0.18, 0.85 + i * 0.18), 1 - out)} border={F.lemon}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <CauseIcon kind={cause.icon} size={104} t={t} variant="futuristic" />
            <span style={khmer(38, 700, F.white)}>{cause.kh}</span>
          </div>
        </Glass>
      ))}
      <At x={540} y={330}>
        <Kinetic text={c.en} t={t} at={0.15} size={104} accent={c.accent} />
      </At>
    </Frame>
  );
};
