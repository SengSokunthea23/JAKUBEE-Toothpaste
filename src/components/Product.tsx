import React from 'react';
import { Img, staticFile } from 'remotion';

/**
 * Real JAKUBEE product photography (transparent cut-outs in /public/products).
 * Packaging is never redrawn — only positioned, scaled, rotated and lit.
 */
export type ProductName = 'zesty-lemon-tube' | 'herbal-mint-tube' | 'zesty-lemon-pack' | 'herbal-mint-pack';

const ASPECT: Record<ProductName, number> = {
  'zesty-lemon-tube': 695 / 1721,
  'herbal-mint-tube': 480 / 1217,
  'zesty-lemon-pack': 480 / 964,
  'herbal-mint-pack': 481 / 964,
};

type Props = {
  name: ProductName;
  x: number; // centre x
  y: number; // centre y
  height: number;
  rotate?: number;
  opacity?: number;
  /** 0→1 light-sweep position; outside (0,1) = no sweep */
  sweep?: number;
  shadow?: number; // shadow strength multiplier
};

export const Product: React.FC<Props> = ({ name, x, y, height, rotate = 0, opacity = 1, sweep = -1, shadow = 1 }) => {
  if (opacity <= 0) return null;
  const width = height * ASPECT[name];
  const src = staticFile(`products/${name}.png`);
  const pos = -20 + 140 * sweep;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - width / 2,
        top: y - height / 2,
        width,
        height,
        opacity,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          filter: `drop-shadow(18px 30px 26px rgba(10, 20, 35, ${Math.min(0.75, 0.38 * shadow)}))`,
        }}
      />
      {sweep > 0 && sweep < 1 ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(115deg, transparent ${pos - 14}%, rgba(255,255,255,0.6) ${pos}%, transparent ${pos + 14}%)`,
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            mixBlendMode: 'screen',
          }}
        />
      ) : null}
    </div>
  );
};
