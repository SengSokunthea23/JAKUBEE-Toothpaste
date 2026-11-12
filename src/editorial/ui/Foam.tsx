// Facial foam product. Uses the real photo from assets.ts when provided;
// otherwise a clearly marked image slot (no invented packaging, never toothpaste).
import React from 'react';
import { Img, staticFile } from 'remotion';
import { hexA } from '../../cinematic/fx/Stage';
import { FONTS } from '../../lib/theme';
import { Edition, FOAM } from '../assets';
import { BLUE, GREEN } from '../theme';

type Props = {
  edition: Edition;
  x: number;
  y: number;
  height: number;
  rotate?: number;
  /** subtle 3D turn in degrees (kept small to preserve the label) */
  turn?: number;
  opacity?: number;
  focus?: number;
  /** light sweep 0→1 */
  sweep?: number;
  shadow?: boolean;
  reflect?: boolean;
};

export const foamWidth = (e: Edition, h: number) => h * FOAM[e].aspect;

export const Foam: React.FC<Props> = ({ edition, x, y, height, rotate = 0, turn = 0, opacity = 1, focus = 0, sweep = -1, shadow = true, reflect = false }) => {
  if (opacity <= 0) return null;
  const w = foamWidth(edition, height);
  const cfg = FOAM[edition];
  const col = edition === 'blue' ? BLUE : GREEN;
  const strong = edition === 'blue' ? BLUE.royal : GREEN.botanical;
  const light = edition === 'blue' ? BLUE.ice : GREEN.sage;
  const pos = -25 + 150 * sweep;
  const src = cfg.file ? staticFile(cfg.file) : null;
  const body = src ? (
    <Img src={src} style={{ width: '100%', height: '100%', display: 'block' }} />
  ) : (
    <Slot w={w} h={height} strong={strong} light={light} pale={'pale' in col ? col.pale : GREEN.cream} name={cfg.name} />
  );
  const mask: React.CSSProperties = src
    ? { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }
    : { WebkitMaskImage: TUBE_MASK, maskImage: TUBE_MASK, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' };
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - height / 2, width: w, height, opacity, perspective: 2000 }}>
      {shadow && (
        <div
          style={{
            position: 'absolute',
            left: -w * 0.3,
            top: height * 0.95,
            width: w * 1.6,
            height: height * 0.09,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(28,34,48,0.32), transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      )}
      {reflect && (
        <div style={{ position: 'absolute', left: 0, top: height, width: w, height: height * 0.35, overflow: 'hidden', opacity: 0.18, WebkitMaskImage: 'linear-gradient(180deg, black, transparent 85%)', maskImage: 'linear-gradient(180deg, black, transparent 85%)', filter: 'blur(3px)' }}>
          <div style={{ width: w, height, transform: 'scaleY(-1)', transformOrigin: '50% 0%', position: 'absolute', top: 0 }}>{body}</div>
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `rotate(${rotate}deg) rotateY(${turn}deg)`,
          filter: [`drop-shadow(0 26px 30px rgba(28,34,48,0.22))`, focus > 0.3 ? `blur(${focus}px)` : ''].join(' '),
        }}
      >
        {body}
        {sweep > 0 && sweep < 1 && (
          <div style={{ position: 'absolute', inset: 0, ...mask, background: `linear-gradient(112deg, transparent ${pos - 12}%, rgba(255,255,255,0.7) ${pos}%, transparent ${pos + 12}%)`, mixBlendMode: 'screen' }} />
        )}
      </div>
    </div>
  );
};

// Generic squeeze-tube silhouette (crimp at the top, flip cap at the bottom) on a 100×330 box.
const TUBE_PATH = 'M6 6 H94 V20 L90 26 C88 120 84 230 80 278 H20 C16 230 12 120 10 26 L6 20 Z M18 280 H82 V318 Q82 326 74 326 H26 Q18 326 18 318 Z';
const TUBE_MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 330' preserveAspectRatio='none'><path d='${TUBE_PATH}' fill='black'/></svg>`)}")`;

/** Placeholder tube: frosted, dashed, labelled — obviously an image slot. */
const Slot: React.FC<{ w: number; h: number; strong: string; light: string; pale: string; name: string }> = ({ w, h, strong, light, pale, name }) => (
  <div style={{ position: 'relative', width: w, height: h }}>
    <svg width={w} height={h} viewBox="0 0 100 330" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id={`slot-${strong.slice(1)}`} x1="0" x2="1">
          <stop offset="0" stopColor={light} stopOpacity={0.55} />
          <stop offset="0.35" stopColor="#FFFFFF" stopOpacity={0.95} />
          <stop offset="0.7" stopColor={pale} stopOpacity={0.9} />
          <stop offset="1" stopColor={light} stopOpacity={0.6} />
        </linearGradient>
      </defs>
      <path d={TUBE_PATH} fill={`url(#slot-${strong.slice(1)})`} stroke={strong} strokeOpacity={0.55} strokeWidth={0.8} strokeDasharray="3 2.4" vectorEffect="non-scaling-stroke" />
    </svg>
    <div style={{ position: 'absolute', left: 0, right: 0, top: '38%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: h * 0.012 }}>
      <svg width={w * 0.28} height={w * 0.28} viewBox="0 0 24 24" fill="none" stroke={strong} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.7}>
        <rect x={3} y={4} width={18} height={16} rx={3} />
        <circle cx={9} cy={10} r={2} />
        <path d="M21 16 L15 11 L6 20" />
      </svg>
      <span style={{ fontFamily: FONTS.latin, fontWeight: 800, fontSize: Math.max(10, w * 0.075), letterSpacing: 2, color: hexA(strong, 0.75), textAlign: 'center', lineHeight: 1.3 }}>
        PRODUCT
        <br />
        IMAGE
      </span>
      <span style={{ fontFamily: FONTS.latin, fontWeight: 700, fontSize: Math.max(8, w * 0.05), letterSpacing: 1, color: hexA(strong, 0.55), textAlign: 'center', padding: '0 8%', lineHeight: 1.3, whiteSpace: 'normal' }}>{name}</span>
    </div>
  </div>
);
