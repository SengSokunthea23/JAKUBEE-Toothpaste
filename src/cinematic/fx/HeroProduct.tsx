// Studio-lit product shot. The real JAKUBEE packaging image is never redrawn:
// it is only positioned, lit (rim + sweep), focused and reflected.
import React from 'react';
import { Img, staticFile } from 'remotion';
import type { ProductName } from '../../components/Product';
import { hexA } from './Stage';

const ASPECT: Record<ProductName, number> = {
  'zesty-lemon-tube': 695 / 1721,
  'herbal-mint-tube': 480 / 1217,
  'zesty-lemon-pack': 480 / 964,
  'herbal-mint-pack': 481 / 964,
};

export const productWidth = (name: ProductName, height: number) => height * ASPECT[name];

type Props = {
  name: ProductName;
  x: number;
  y: number;
  height: number;
  rotate?: number;
  /** subtle 3D turn (degrees). Kept small so the packaging stays accurate. */
  turn?: number;
  opacity?: number;
  /** depth-of-field blur in px */
  focus?: number;
  /** 0→1 exposure (emerging from darkness) */
  exposure?: number;
  /** rim light colour */
  rim?: string;
  rimStrength?: number;
  /** light sweep 0→1 (outside = none) */
  sweep?: number;
  /** floor reflection */
  reflect?: boolean;
  /** contact shadow on the floor */
  shadow?: boolean;
};

export const HeroProduct: React.FC<Props> = ({
  name,
  x,
  y,
  height,
  rotate = 0,
  turn = 0,
  opacity = 1,
  focus = 0,
  exposure = 1,
  rim = '#BFEFFF',
  rimStrength = 1,
  sweep = -1,
  reflect = false,
  shadow = true,
}) => {
  if (opacity <= 0) return null;
  const width = productWidth(name, height);
  const src = staticFile(`products/${name}.png`);
  const mask: React.CSSProperties = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' };
  const pos = -25 + 150 * sweep;
  const bright = 0.15 + 0.85 * exposure;
  const filters = [
    `brightness(${bright})`,
    `drop-shadow(0 0 1.5px ${hexA(rim, 0.55 * rimStrength)})`,
    `drop-shadow(0 0 26px ${hexA(rim, 0.32 * rimStrength * exposure)})`,
    focus > 0.3 ? `blur(${focus}px)` : '',
  ].join(' ');
  return (
    <div style={{ position: 'absolute', left: x - width / 2, top: y - height / 2, width, height, opacity, perspective: 2200 }}>
      {shadow && (
        <div
          style={{
            position: 'absolute',
            left: -width * 0.25,
            top: height * 0.96,
            width: width * 1.5,
            height: height * 0.08,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)',
            filter: 'blur(10px)',
            opacity: exposure,
          }}
        />
      )}
      {reflect && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: height,
            width,
            height: height * 0.45,
            overflow: 'hidden',
            opacity: 0.22 * exposure,
            transform: `rotate(${-rotate}deg)`,
            transformOrigin: '50% 0%',
            WebkitMaskImage: 'linear-gradient(180deg, black, transparent 80%)',
            maskImage: 'linear-gradient(180deg, black, transparent 80%)',
            filter: `blur(${3 + focus}px)`,
          }}
        >
          <Img src={src} style={{ width, height, transform: 'scaleY(-1)', transformOrigin: '50% 0%', display: 'block', position: 'absolute', top: 0 }} />
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, transform: `rotate(${rotate}deg) rotateY(${turn}deg)`, transformStyle: 'preserve-3d' }}>
        <Img src={src} style={{ width: '100%', height: '100%', display: 'block', filter: filters }} />
        {/* edge rim highlights shaped to the pack */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            ...mask,
            background: `linear-gradient(90deg, ${hexA(rim, 0.35 * rimStrength)} 0%, transparent 9%, transparent 88%, ${hexA(rim, 0.28 * rimStrength)} 100%)`,
            mixBlendMode: 'screen',
            opacity: exposure,
            filter: focus > 0.3 ? `blur(${focus}px)` : undefined,
          }}
        />
        {sweep > 0 && sweep < 1 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              ...mask,
              background: `linear-gradient(112deg, transparent ${pos - 12}%, rgba(255,255,255,0.55) ${pos}%, transparent ${pos + 12}%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}
      </div>
    </div>
  );
};
