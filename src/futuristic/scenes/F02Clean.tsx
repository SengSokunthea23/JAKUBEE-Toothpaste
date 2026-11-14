import React from 'react';
import { prog } from '../../lib/anim';
import { useTime } from '../../lib/useTime';
import { Glyph, GlyphName } from '../../editorial/ui/Interface';
import { FUT, chapter } from '../copy';
import { F, ease, hexA } from '../theme';
import { Frame } from '../ui/Frame';
import { AirTrails, Glass, Orbit, Tooth } from '../ui/Objects';
import { Cam, Particles } from '../ui/Stage';
import { label } from '../ui/Type';

/** 02 — Clean teeth & fresh breath: a metallic 3D tooth, cleansing particles in orbit, fresh air, a dark glass card. */
export const F02Clean: React.FC = () => {
  const t = useTime();
  const c = FUT.clean;
  const enter = ease.outExpo(prog(t, 0, 0.9));
  const rows: { icon: GlyphName; text: string; at: number; color: string }[] = [
    { icon: 'tooth', text: c.en, at: 0.9, color: F.white },
    { icon: 'wind', text: c.en2, at: 1.1, color: F.neon },
  ];
  return (
    <Frame t={t} label={chapter(3, c.label)} kh={c.kh} khAt={0.55} khSize={34} khY={1660} glows={[{ x: 540, y: 760, r: 520, color: F.ice, a: 0.18 }, { x: 540, y: 820, r: 300, color: F.neon, a: 0.14 }]}>
      <Cam t={t} dur={3.5} from={1} to={1.05}>
        <Particles t={t} seed={21} n={18} p={0.7} colors={[F.ice, F.white]} />
        <Orbit t={t} cx={540} cy={760} rx={400} ry={130} n={10} p={prog(t, 0.3, 1.2)} speed={0.9} colors={[F.neon, F.ice, F.white]} size={14} />
        <Tooth id="f02" x={540} y={760 + 60 * (1 - enter)} size={600} opacity={enter} rim={F.ice} shine={prog(t, 1.2, 2.2)} />
        <AirTrails t={t} p={prog(t, 0.6, 1.8)} y={1100} n={4} spread={44} amp={60} />
      </Cam>
      <Glass x={540} y={1290} w={900} h={170} p={prog(t, 0.7, 1.3)}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 30px' }}>
          {rows.map((r) => {
            const e = ease.outExpo(prog(t, r.at, r.at + 0.6));
            return (
              <div key={r.text} style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: e, transform: `translateY(${16 * (1 - e)}px)` }}>
                <div style={{ width: 70, height: 70, borderRadius: 20, background: hexA(r.color, 0.1), border: `1px solid ${hexA(r.color, 0.4)}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Glyph name={r.icon} size={40} color={r.color} stroke={2} />
                </div>
                <span style={label(r.text, 34, 800, r.color, 3)}>{r.text}</span>
              </div>
            );
          })}
        </div>
      </Glass>
    </Frame>
  );
};
