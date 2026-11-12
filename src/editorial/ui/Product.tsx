// JAKUBEE Zesty Lemon Toothpaste — the real product photos, studio-lit for a light set.
// Packaging is never redrawn: only positioned, turned slightly, focused, shadowed and swept with light.
import React from 'react';
import { Img, staticFile } from 'remotion';

export type Shot = 'tube' | 'pack';

const SHOTS: Record<Shot, { file: string; aspect: number }> = {
  tube: { file: 'products/zesty-lemon-tube.png', aspect: 695 / 1721 },
  pack: { file: 'products/zesty-lemon-pack.png', aspect: 480 / 964 },
};

export const shotWidth = (s: Shot, h: number) => h * SHOTS[s].aspect;

type Props = {
  shot?: Shot;
  x: number;
  y: number;
  height: number;
  rotate?: number;
  /** subtle 3D turn in degrees (kept small so the label stays accurate) */
  turn?: number;
  opacity?: number;
  focus?: number;
  /** light sweep 0→1 */
  sweep?: number;
  shadow?: boolean;
  reflect?: boolean;
};

export const Product: React.FC<Props> = ({ shot = 'tube', x, y, height, rotate = 0, turn = 0, opacity = 1, focus = 0, sweep = -1, shadow = true, reflect = false }) => {
  if (opacity <= 0) return null;
  const w = shotWidth(shot, height);
  const src = staticFile(SHOTS[shot].file);
  const pos = -25 + 150 * sweep;
  const mask: React.CSSProperties = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' };
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - height / 2, width: w, height, opacity, perspective: 2000 }}>
      {shadow && (
        <div
          style={{
            position: 'absolute',
            left: -w * 0.3,
            top: height * 0.95,
            width: w * 1.6,
            height: height * 0.08,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(28,34,48,0.32), transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      )}
      {reflect && (
        <div style={{ position: 'absolute', left: 0, top: height, width: w, height: height * 0.3, overflow: 'hidden', opacity: 0.16, WebkitMaskImage: 'linear-gradient(180deg, black, transparent 85%)', maskImage: 'linear-gradient(180deg, black, transparent 85%)', filter: 'blur(3px)' }}>
          <Img src={src} style={{ width: w, height, transform: 'scaleY(-1)', transformOrigin: '50% 0%', position: 'absolute', top: 0, display: 'block' }} />
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `rotate(${rotate}deg) rotateY(${turn}deg)`,
          filter: ['drop-shadow(0 26px 30px rgba(28,34,48,0.24))', focus > 0.3 ? `blur(${focus}px)` : ''].join(' '),
        }}
      >
        <Img src={src} style={{ width: '100%', height: '100%', display: 'block' }} />
        {sweep > 0 && sweep < 1 && (
          <div style={{ position: 'absolute', inset: 0, ...mask, background: `linear-gradient(112deg, transparent ${pos - 12}%, rgba(255,255,255,0.65) ${pos}%, transparent ${pos + 12}%)`, mixBlendMode: 'screen' }} />
        )}
      </div>
    </div>
  );
};
