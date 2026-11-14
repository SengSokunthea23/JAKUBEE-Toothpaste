// Theme 04 objects: the real tube lit for a dark set, a metallic dimensional tooth, an enamel
// cross-section, dark glass cards, orbits, air trails, droplets, microscopic particles and
// minimal data graphics. Illustrative only: no measurements, percentages or lab results.
import React from 'react';
import { Img, staticFile } from 'remotion';
import { clamp, seeded } from '../../lib/anim';
import { F, ease, hexA } from '../theme';
import { latinStack } from '../../lib/theme';

/* ───────────────────────── product ───────────────────────── */

const SHOTS = {
  lemon: { tube: { file: 'products/zesty-lemon-tube.png', aspect: 695 / 1721 }, pack: { file: 'products/zesty-lemon-pack.png', aspect: 480 / 964 } },
  herbal: { tube: { file: 'products/herbal-mint-tube.png', aspect: 480 / 1217 }, pack: { file: 'products/herbal-mint-pack.png', aspect: 481 / 964 } },
};
export type Flavour = keyof typeof SHOTS;

/**
 * The real JAKUBEE tube (or pack), Zesty Lemon or Herbal Mint, never redrawn: positioned, rim-lit with neon/lemon,
 * reflected on a dark floor and swept with light.
 */
export const Hero: React.FC<{
  x: number;
  y: number;
  height: number;
  pack?: boolean;
  flavour?: Flavour;
  rotate?: number;
  opacity?: number;
  blur?: number;
  sweep?: number;
  rim?: string;
  rimA?: number;
  reflect?: boolean;
}> = ({ x, y, height, pack = false, flavour = 'lemon', rotate = 0, opacity = 1, blur = 0, sweep = -1, rim = F.neon, rimA = 0.55, reflect = true }) => {
  if (opacity <= 0) return null;
  const a = pack ? SHOTS[flavour].pack : SHOTS[flavour].tube;
  const w = height * a.aspect;
  const src = staticFile(a.file);
  const mask: React.CSSProperties = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' };
  const pos = -25 + 150 * sweep;
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - height / 2, width: w, height, opacity }}>
      {/* contact glow on the floor */}
      <div style={{ position: 'absolute', left: -w * 0.5, top: height * 0.93, width: w * 2, height: height * 0.12, borderRadius: '50%', background: `radial-gradient(ellipse, ${hexA(rim, 0.32)}, transparent 70%)`, filter: 'blur(12px)' }} />
      {reflect && (
        <div style={{ position: 'absolute', left: 0, top: height * 1.005, width: w, height: height * 0.35, overflow: 'hidden', opacity: 0.18, WebkitMaskImage: 'linear-gradient(180deg, black, transparent 80%)', maskImage: 'linear-gradient(180deg, black, transparent 80%)', filter: 'blur(4px)', transform: `rotate(${rotate}deg)` }}>
          <Img src={src} style={{ width: w, height, transform: 'scaleY(-1)', transformOrigin: '50% 0%', position: 'absolute', top: 0, display: 'block' }} />
        </div>
      )}
      <div style={{ position: 'absolute', inset: 0, transform: `rotate(${rotate}deg)`, filter: `drop-shadow(0 0 ${height * 0.035}px ${hexA(rim, rimA)}) drop-shadow(0 40px 50px rgba(0,0,0,0.6))${blur > 0.3 ? ` blur(${blur}px)` : ''}` }}>
        <Img src={src} style={{ width: '100%', height: '100%', display: 'block' }} />
        {/* cool top-light so the silver reads metallic on black */}
        <div style={{ position: 'absolute', inset: 0, ...mask, background: 'linear-gradient(100deg, rgba(255,255,255,0.10), transparent 35%, transparent 65%, rgba(0,0,0,0.22))' }} />
        {sweep > 0 && sweep < 1 && <div style={{ position: 'absolute', inset: 0, ...mask, background: `linear-gradient(112deg, transparent ${pos - 12}%, rgba(255,255,255,0.7) ${pos}%, transparent ${pos + 12}%)`, mixBlendMode: 'screen' }} />}
      </div>
    </div>
  );
};

/* ───────────────────────── tooth ───────────────────────── */

export const TOOTH_PATH =
  'M70 35 C 45 35, 35 60, 40 90 C 45 120, 60 135, 65 170 C 70 200, 85 210, 93 185 L 103 152 C 108 138, 132 138, 137 152 L 147 185 C 155 210, 170 200, 175 170 C 180 135, 195 120, 200 90 C 205 60, 195 35, 170 35 C 150 35, 140 46, 120 46 C 100 46, 90 35, 70 35 Z';

const STAINS: [number, number, number][] = [
  [92, 78, 13], [118, 64, 9], [148, 88, 12], [104, 108, 10], [160, 120, 8], [80, 126, 7], [132, 118, 9], [170, 70, 7], [124, 92, 6], [86, 100, 6],
];

/**
 * Metallic dimensional tooth on black: pearl body, silver edge light, neon rim glow.
 * `stain` 0..1 shows abstract surface spots; `scan` 0..1 runs a clean scan line down the tooth
 * and clears the spots above it; `shine` 0..1 sweeps a highlight.
 */
export const Tooth: React.FC<{ x: number; y: number; size: number; opacity?: number; rim?: string; stain?: number; scan?: number; shine?: number; id: string; rotate?: number }> = ({
  x,
  y,
  size,
  opacity = 1,
  rim = F.neon,
  stain = 0,
  scan = -1,
  shine = -1,
  id,
  rotate = 0,
}) => {
  if (opacity <= 0) return null;
  const scanY = 30 + 190 * clamp(scan);
  const sw = -40 + 340 * shine;
  return (
    <svg width={size} height={size} viewBox="20 20 200 200" style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, opacity, overflow: 'visible', transform: `rotate(${rotate}deg)` }}>
      <defs>
        <radialGradient id={`${id}b`} cx="0.36" cy="0.28" r="0.85">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#EEF3F5" />
          <stop offset="0.8" stopColor="#B9C4CA" />
          <stop offset="1" stopColor="#7E8B92" />
        </radialGradient>
        <linearGradient id={`${id}e`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="0.5" stopColor={F.silver} stopOpacity={0.4} />
          <stop offset="1" stopColor={rim} stopOpacity={0.9} />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <path d={TOOTH_PATH} />
        </clipPath>
        <filter id={`${id}g`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={9} />
        </filter>
        <filter id={`${id}s`}>
          <feGaussianBlur stdDeviation={2.2} />
        </filter>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* neon rim glow */}
      <path d={TOOTH_PATH} fill="none" stroke={rim} strokeWidth={6} opacity={0.55} filter={`url(#${id}g)`} />
      <path d={TOOTH_PATH} fill={`url(#${id}b)`} />
      <g clipPath={`url(#${id}c)`}>
        {stain > 0 && (
          <g filter={`url(#${id}s)`}>
            {STAINS.map(([cx, cy, r], i) => {
              const cleared = scan >= 0 && cy < scanY;
              return <circle key={i} cx={cx} cy={cy} r={r} fill="#C9A23A" opacity={stain * (cleared ? 0 : 0.55)} />;
            })}
          </g>
        )}
        {scan > 0 && scan < 1 && (
          <>
            <rect x={20} y={scanY - 26} width={200} height={26} fill={hexA(F.neon, 0.18)} />
            <rect x={20} y={scanY - 1.2} width={200} height={2.4} fill={F.neon} />
          </>
        )}
        {shine > 0 && shine < 1 && <rect x={sw} y={0} width={60} height={260} fill={`url(#${id}w)`} transform={`rotate(18 ${sw + 30} 120)`} />}
        <ellipse cx={88} cy={70} rx={13} ry={26} fill="rgba(255,255,255,0.9)" transform="rotate(-20 88 70)" filter={`url(#${id}s)`} />
      </g>
      <path d={TOOTH_PATH} fill="none" stroke={`url(#${id}e)`} strokeWidth={2.2} />
    </svg>
  );
};

/**
 * Stylised tooth cross-section (enamel / dentin / pulp) drawn as clean nested geometry.
 * `p` builds the layers, `hot` 0..1 lights the enamel band.
 */
export const ToothSection: React.FC<{ x: number; y: number; size: number; p: number; hot: number; t: number }> = ({ x, y, size, p, hot, t }) => {
  const e = ease.outExpo(clamp(p));
  const pulse = 0.65 + 0.35 * Math.sin(t * 4);
  return (
    <svg width={size} height={size} viewBox="20 20 200 200" style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, overflow: 'visible' }}>
      <defs>
        <filter id="secGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={6} />
        </filter>
      </defs>
      {/* enamel (outer) */}
      <g opacity={e}>
        <path d={TOOTH_PATH} fill={hexA(F.white, 0.1)} stroke={F.silver} strokeWidth={1.4} />
        <path d={TOOTH_PATH} fill="none" stroke={F.neon} strokeWidth={8} opacity={hot * pulse * 0.8} filter="url(#secGlow)" />
        <path d={TOOTH_PATH} fill="none" stroke={F.neon} strokeWidth={3} opacity={hot} />
      </g>
      {/* dentin (anchored near the crown and squashed vertically so its roots stay inside the enamel) */}
      <g transform={`translate(120 70) scale(${0.78 * ease.outExpo(clamp(p * 1.2 - 0.15))} ${0.7 * ease.outExpo(clamp(p * 1.2 - 0.15))}) translate(-120 -70)`}>
        <path d={TOOTH_PATH} fill={hexA(F.zest, 0.16)} stroke={hexA(F.zest, 0.7)} strokeWidth={1.4} />
      </g>
      {/* pulp */}
      <g transform={`translate(120 72) scale(${0.42 * ease.outExpo(clamp(p * 1.4 - 0.35))} ${0.45 * ease.outExpo(clamp(p * 1.4 - 0.35))}) translate(-120 -72)`}>
        <path d={TOOTH_PATH} fill={hexA(F.cyan, 0.22)} stroke={hexA(F.ice, 0.8)} strokeWidth={2.4} />
      </g>
    </svg>
  );
};

/* ───────────────────────── glass, data, pointers ───────────────────────── */

/** Dark glassmorphism card with a subtle neon border. */
export const Glass: React.FC<{ x: number; y: number; w: number; h: number; p: number; radius?: number; children?: React.ReactNode; border?: string; style?: React.CSSProperties }> = ({
  x,
  y,
  w,
  h,
  p,
  radius = 28,
  children,
  border = F.neon,
  style,
}) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        borderRadius: radius,
        background: 'linear-gradient(160deg, rgba(36,46,41,0.62), rgba(10,14,12,0.72))',
        border: `1px solid ${hexA(border, 0.3)}`,
        boxShadow: `0 30px 70px rgba(0,0,0,0.5), inset 0 1px 0 ${hexA(F.white, 0.1)}, 0 0 30px ${hexA(border, 0.08)}`,
        backdropFilter: 'blur(16px)',
        opacity: e,
        transform: `translateY(${40 * (1 - e)}px) scale(${0.94 + 0.06 * e})`,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Circular indicator (no numbers): a ring that sweeps round with ticks and a glowing head. */
export const RingIndicator: React.FC<{ x: number; y: number; r: number; p: number; t: number; color?: string; label?: string }> = ({ x, y, r, p, t, color = F.neon, label }) => {
  const e = ease.outExpo(clamp(p));
  const c = 2 * Math.PI * r;
  const ang = -90 + 360 * e;
  const hx = r * Math.cos((ang * Math.PI) / 180);
  const hy = r * Math.sin((ang * Math.PI) / 180);
  return (
    <div style={{ position: 'absolute', left: x - r - 20, top: y - r - 20, width: 2 * r + 40, height: 2 * r + 40, opacity: clamp(p * 3) }}>
      <svg width={2 * r + 40} height={2 * r + 40} style={{ position: 'absolute', overflow: 'visible' }}>
        <g transform={`translate(${r + 20} ${r + 20})`}>
          <circle r={r} fill="none" stroke={hexA(F.white, 0.1)} strokeWidth={6} />
          {Array.from({ length: 36 }, (_, i) => {
            const a = (i * 10 * Math.PI) / 180;
            return <line key={i} x1={(r + 12) * Math.cos(a)} y1={(r + 12) * Math.sin(a)} x2={(r + (i % 3 ? 16 : 22)) * Math.cos(a)} y2={(r + (i % 3 ? 16 : 22)) * Math.sin(a)} stroke={hexA(F.white, 0.22)} strokeWidth={1.4} />;
          })}
          <circle r={r} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeDasharray={`${c * e} ${c}`} transform="rotate(-90)" style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
          <circle cx={hx} cy={hy} r={9 + 2 * Math.sin(t * 6)} fill={F.white} style={{ filter: `drop-shadow(0 0 10px ${color})` }} opacity={e > 0.02 ? 1 : 0} />
          <circle r={r * 0.62} fill="none" stroke={hexA(color, 0.25)} strokeWidth={1.2} strokeDasharray="3 9" transform={`rotate(${t * 30})`} />
        </g>
      </svg>
      {label && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: latinStack(r * 0.2), fontWeight: 800, fontSize: r * 0.2, letterSpacing: /[\u1780-\u17FF]/.test(label) ? 0 : r * 0.03, color: F.white }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/** Animated curve on a faint grid (an illustrative trend line, no axes or values). */
export const Curve: React.FC<{ x: number; y: number; w: number; h: number; p: number; color?: string; seed?: number }> = ({ x, y, w, h, p, color = F.neon }) => {
  const e = ease.inOut(clamp(p));
  const pts = Array.from({ length: 40 }, (_, i) => {
    const k = i / 39;
    const yy = h * (0.8 - 0.6 * ease.inOutSine(k) + 0.06 * Math.sin(k * 14));
    return [k * w, yy] as const;
  });
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  const len = w * 1.4;
  return (
    <svg width={w} height={h} style={{ position: 'absolute', left: x, top: y, overflow: 'visible', opacity: clamp(p * 3) }}>
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={0} x2={w} y1={(h * i) / 4} y2={(h * i) / 4} stroke={hexA(F.white, 0.07)} />
      ))}
      <path d={`${d} L${w} ${h} L0 ${h} Z`} fill={hexA(color, 0.08)} opacity={e} />
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeDasharray={len} strokeDashoffset={len * (1 - e)} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
};

/** Thin animated pointer: dot on the subject, elbow line, small technical label. */
export const Pointer: React.FC<{ x: number; y: number; tx: number; ty: number; p: number; label: string; color?: string; align?: 'left' | 'right' }> = ({ x, y, tx, ty, p, label, color = F.neon, align = 'right' }) => {
  const e = ease.outExpo(clamp(p));
  if (e <= 0) return null;
  const ex = x + (tx - x) * e;
  const ey = y + (ty - y) * Math.min(1, e * 1.6);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }}>
        <circle cx={x} cy={y} r={7} fill={F.obsidian} stroke={color} strokeWidth={3} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
        <polyline points={`${x},${y} ${x + (tx - x) * 0.35 * e},${ey} ${ex},${ey}`} fill="none" stroke={hexA(color, 0.8)} strokeWidth={1.6} />
      </svg>
      <div style={{ position: 'absolute', left: tx, top: ty, transform: `translate(${align === 'right' ? '12px' : 'calc(-100% - 12px)'}, -50%)`, opacity: clamp((p - 0.35) * 2.5), whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: latinStack(20), fontWeight: 800, fontSize: 20, letterSpacing: /[\u1780-\u17FF]/.test(label) ? 0 : 5, color: F.white }}>{label}</span>
      </div>
    </>
  );
};

/* ───────────────────────── particles & atmosphere ───────────────────────── */

/** Small glowing elements orbiting a centre on a tilted ellipse (depth via scale/opacity). */
export const Orbit: React.FC<{ t: number; cx: number; cy: number; rx: number; ry: number; n: number; p: number; speed?: number; colors?: string[]; size?: number; phase?: number }> = ({
  t,
  cx,
  cy,
  rx,
  ry,
  n,
  p,
  speed = 0.5,
  colors = [F.neon, F.lemon, F.ice],
  size = 12,
  phase = 0,
}) => {
  const e = ease.outExpo(clamp(p));
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
        <ellipse cx={cx} cy={cy} rx={rx * e} ry={ry * e} fill="none" stroke={hexA(F.white, 0.12)} strokeWidth={1.2} strokeDasharray="2 10" />
      </svg>
      {Array.from({ length: n }, (_, i) => {
        const a = t * speed + phase + (i * 2 * Math.PI) / n;
        const depth = (Math.sin(a) + 1) / 2; // 0 back → 1 front
        const s = size * (0.55 + 0.7 * depth);
        const c = colors[i % colors.length];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: cx + rx * e * Math.cos(a) - s / 2,
              top: cy + ry * e * Math.sin(a) - s / 2,
              width: s,
              height: s,
              borderRadius: '50%',
              background: c,
              boxShadow: `0 0 ${s * 2}px ${c}`,
              opacity: e * (0.35 + 0.65 * depth),
              zIndex: depth > 0.5 ? 3 : 0,
            }}
          />
        );
      })}
    </>
  );
};

/** Flowing air trails (fresh-air metaphor) drawn as soft animated ribbons. */
export const AirTrails: React.FC<{ t: number; p: number; y: number; n?: number; color?: string; spread?: number; amp?: number }> = ({ t, p, y, n = 4, color = F.ice, spread = 70, amp = 90 }) => {
  const e = ease.outExpo(clamp(p));
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      {Array.from({ length: n }, (_, i) => {
        const yy = y + (i - (n - 1) / 2) * spread;
        const ph = t * 1.3 + i * 0.9;
        const d = `M -60 ${yy} C 240 ${yy - amp * Math.sin(ph)}, 520 ${yy + amp * Math.cos(ph)}, 760 ${yy - 0.5 * amp * Math.sin(ph + 1)} S 1100 ${yy + 0.6 * amp * Math.sin(ph)}, 1160 ${yy}`;
        const len = 1500;
        return <path key={i} d={d} fill="none" stroke={hexA(i % 2 ? color : F.white, i % 2 ? 0.55 : 0.35)} strokeWidth={i % 2 ? 2.5 : 5} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - e)} style={{ filter: 'blur(1px)' }} />;
      })}
    </svg>
  );
};

/** Water droplets: glassy beads with a highlight, gently bobbing. */
export const Droplets: React.FC<{ t: number; seed: number; n: number; p: number; area: { x0: number; x1: number; y0: number; y1: number }; size?: [number, number] }> = ({ t, seed, n, p, area, size = [10, 26] }) => {
  const r = seeded(seed);
  const e = ease.outExpo(clamp(p));
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = area.x0 + r() * (area.x1 - area.x0);
        const y = area.y0 + r() * (area.y1 - area.y0);
        const s = size[0] + r() * (size[1] - size[0]);
        const ph = r() * 6.28;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - s / 2,
              top: y - s / 2 + 8 * Math.sin(t * 1.4 + ph),
              width: s,
              height: s,
              borderRadius: '50%',
              background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${hexA(F.ice, 0.35)} 35%, ${hexA(F.cyan, 0.12)} 70%)`,
              border: `1px solid ${hexA(F.white, 0.35)}`,
              boxShadow: `0 0 ${s * 0.6}px ${hexA(F.ice, 0.35)}`,
              opacity: e * 0.9,
              transform: `scale(${0.4 + 0.6 * e})`,
            }}
          />
        );
      })}
    </>
  );
};

/** Ice-inspired glass cube. */
export const IceCube: React.FC<{ x: number; y: number; s: number; rotate: number; opacity?: number; blur?: number }> = ({ x, y, s, rotate, opacity = 1, blur = 0 }) => (
  <div
    style={{
      position: 'absolute',
      left: x - s / 2,
      top: y - s / 2,
      width: s,
      height: s,
      borderRadius: s * 0.18,
      background: `linear-gradient(135deg, rgba(255,255,255,0.35), ${hexA(F.ice, 0.12)} 50%, rgba(255,255,255,0.05))`,
      border: `1.5px solid ${hexA(F.white, 0.45)}`,
      boxShadow: `inset 0 0 ${s * 0.2}px ${hexA(F.white, 0.25)}, 0 0 ${s * 0.4}px ${hexA(F.ice, 0.18)}`,
      transform: `rotate(${rotate}deg)`,
      opacity,
      filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
    }}
  />
);

/** Mint leaf accent (vector). */
export const MintLeaf: React.FC<{ x: number; y: number; len: number; rotate: number; opacity?: number; blur?: number }> = ({ x, y, len, rotate, opacity = 1, blur = 0 }) => (
  <svg width={len} height={len * 0.5} viewBox="0 0 100 50" style={{ position: 'absolute', left: x - len / 2, top: y - len * 0.25, transform: `rotate(${rotate}deg)`, opacity, overflow: 'visible', filter: `drop-shadow(0 0 10px ${hexA(F.neon, 0.35)})${blur > 0.3 ? ` blur(${blur}px)` : ''}` }}>
    <defs>
      <linearGradient id="mintG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7EDB5A" />
        <stop offset="1" stopColor="#2E8B3E" />
      </linearGradient>
    </defs>
    <path d="M2 25 C 25 -4, 75 -4, 98 25 C 75 54, 25 54, 2 25 Z" fill="url(#mintG)" />
    <path d="M6 25 L 94 25" stroke="rgba(255,255,255,0.45)" strokeWidth={1.6} />
    {[22, 40, 58, 76].map((k) => (
      <path key={k} d={`M${k} 25 L ${k + 10} ${k % 36 ? 12 : 38}`} stroke="rgba(255,255,255,0.3)" strokeWidth={1.2} />
    ))}
  </svg>
);

/**
 * Abstract microscopic particles (soft membranes, no faces). `out` 0..1 disperses them away
 * from the centre and fades them, as airflow clears the frame.
 */
export const Microbes: React.FC<{ t: number; seed: number; n: number; p: number; out: number; cx: number; cy: number; r: number }> = ({ t, seed, n, p, out, cx, cy, r }) => {
  const rr = seeded(seed);
  const e = ease.outExpo(clamp(p));
  const o = ease.inOut(clamp(out));
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = rr() * 6.28;
        const d = r * Math.sqrt(rr());
        const s = 26 + rr() * 46;
        const ph = rr() * 6.28;
        const push = 1 + 1.6 * o;
        const x = cx + d * push * Math.cos(a) + 10 * Math.sin(t * 1.1 + ph);
        const y = cy + d * push * Math.sin(a) + 10 * Math.cos(t * 0.9 + ph);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - s / 2,
              top: y - s / 2,
              width: s,
              height: s,
              borderRadius: `${45 + 10 * Math.sin(ph)}% ${55 - 10 * Math.sin(ph)}% ${50 + 8 * Math.cos(ph)}% ${50 - 8 * Math.cos(ph)}%`,
              background: `radial-gradient(circle at 40% 35%, ${hexA(F.lemon, 0.35)}, ${hexA('#6E8F3A', 0.25)} 60%, transparent 75%)`,
              border: `1.5px solid ${hexA(F.lemon, 0.35)}`,
              opacity: e * (1 - o) * 0.85,
              transform: `scale(${(0.6 + 0.4 * e) * (1 - 0.4 * o)}) rotate(${t * 20 + ph * 50}deg)`,
            }}
          />
        );
      })}
    </>
  );
};

/** Hexagonal protective layers that assemble around a centre (shield metaphor). */
export const HexShield: React.FC<{ cx: number; cy: number; r: number; p: number; t: number; color?: string }> = ({ cx, cy, r, p, t, color = F.neon }) => {
  const hex = (rad: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = ((60 * i - 30) * Math.PI) / 180;
      return `${(rad * Math.cos(a)).toFixed(1)},${(rad * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }}>
      <g transform={`translate(${cx} ${cy})`}>
        {[1, 0.86, 0.72].map((k, i) => {
          const e = ease.outBack(clamp((p - i * 0.15) / 0.6));
          return (
            <polygon
              key={i}
              points={hex(r * k)}
              fill={i === 0 ? hexA(color, 0.05) : 'none'}
              stroke={i === 1 ? hexA(F.silver, 0.7) : color}
              strokeWidth={i === 0 ? 3 : 1.5}
              strokeDasharray={i === 2 ? '6 10' : undefined}
              opacity={clamp(e)}
              transform={`rotate(${(i % 2 ? -1 : 1) * t * 8}) scale(${0.85 + 0.15 * clamp(e)})`}
              style={{ filter: i === 0 ? `drop-shadow(0 0 14px ${color})` : undefined }}
            />
          );
        })}
      </g>
    </svg>
  );
};

/** Particles converging onto a ring (fluoride protective-layer metaphor). `p` 0 scattered → 1 on the ring. */
export const Converge: React.FC<{ t: number; seed: number; n: number; p: number; cx: number; cy: number; rx: number; ry: number; colors?: string[] }> = ({ t, seed, n, p, cx, cy, rx, ry, colors = [F.ice, F.neon, F.cyan] }) => {
  const r = seeded(seed);
  const e = ease.inOut(clamp(p));
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const sx = r() * 1080;
        const sy = 300 + r() * 1300;
        const a = (i / n) * 6.28 + t * 0.4;
        const tx = cx + rx * Math.cos(a);
        const ty = cy + ry * Math.sin(a);
        const x = sx + (tx - sx) * e;
        const y = sy + (ty - sy) * e;
        const s = 5 + r() * 6;
        const c = colors[i % colors.length];
        return <div key={i} style={{ position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '50%', background: c, boxShadow: `0 0 ${s * 2.5}px ${c}`, opacity: 0.4 + 0.6 * e }} />;
      })}
    </>
  );
};
