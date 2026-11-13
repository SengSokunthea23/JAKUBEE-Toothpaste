import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { Glyph } from '../../editorial/ui/Interface';
import { FUT, chapter } from '../copy';
import { F, ease, hexA } from '../theme';
import { Frame } from '../ui/Frame';
import { Glass, Hero } from '../ui/Objects';
import { Cam } from '../ui/Stage';
import { At, Kinetic, latin } from '../ui/Type';

/** 12 — Daily oral hygiene: a floating product information card — the tube, two benefit rows and a week of tooth icons lighting up. */
export const F12Daily: React.FC = () => {
  const t = useTime();
  const c = FUT.daily;
  const card = prog(t, 0.2, 0.9);
  const [a, b] = [c.en.split(' ').slice(0, 2).join(' '), c.en.split(' ').slice(2).join(' ')];
  return (
    <Frame t={t} label={chapter(12, c.label)} kh={c.kh} khAt={1.0} glows={[{ x: 540, y: 960, r: 560, color: F.neon, a: 0.12 }, { x: 300, y: 960, r: 300, color: F.lemon, a: 0.1 }]}>
      <Cam t={t} dur={3.5} from={1} to={1.03}>
        <Glass x={540} y={960} w={920} h={560} p={card} radius={40}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 360, background: `radial-gradient(circle at 50% 55%, ${hexA(F.lemon, 0.16)}, transparent 70%)` }} />
          <Hero x={190} y={280} height={480} rotate={-4} sweep={prog(t, 1.0, 1.8)} rim={F.lemon} reflect={false} opacity={ease.outExpo(prog(t, 0.4, 1.1))} />
          <div style={{ position: 'absolute', left: 380, top: 0, bottom: 0, right: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
            {c.items.map((it, i) => {
              const e = ease.outExpo(prog(t, 0.7 + i * 0.2, 1.3 + i * 0.2));
              return (
                <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: e, transform: `translateX(${24 * (1 - e)}px)` }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: hexA(F.neon, 0.1), border: `1px solid ${hexA(F.neon, 0.4)}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Glyph name={i ? 'calendar' : 'tooth'} size={36} color={F.neon} stroke={2} />
                  </div>
                  <span style={latin(30, 800, F.white, 3)}>{it}</span>
                </div>
              );
            })}
            {/* a week of tooth icons (daily use) */}
            <div style={{ display: 'flex', gap: 10, marginTop: 30 }}>
              {Array.from({ length: 7 }, (_, d) => {
                const on = prog(t, 1.3 + d * 0.12, 1.45 + d * 0.12);
                return (
                  <div key={d} style={{ width: 58, height: 58, borderRadius: 16, border: `1px solid ${hexA(on > 0.5 ? F.lemon : F.white, on > 0.5 ? 0.6 : 0.15)}`, background: hexA(F.lemon, 0.12 * on), display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: on > 0.5 ? `0 0 16px ${hexA(F.lemon, 0.3)}` : 'none' }}>
                    <Glyph name="tooth" size={30} color={on > 0.5 ? F.lemon : hexA(F.white, 0.3)} stroke={1.8} />
                  </div>
                );
              })}
            </div>
          </div>
        </Glass>
      </Cam>
      <At x={540} y={300}>
        <Kinetic text={a} t={t} at={0.1} size={100} />
      </At>
      <At x={540} y={408}>
        <Kinetic text={b} t={t} at={0.3} size={100} accent={b.split(' ')} />
      </At>
    </Frame>
  );
};
