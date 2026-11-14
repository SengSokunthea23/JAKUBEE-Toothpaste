// Theme 05 symbolic objects: a porcelain 3D tooth sculpture, thin waveform lines, geometric protective
// layers, an enamel cross-section, a clean gumline, abstract particles, droplets, mint leaves, editorial
// callouts and minimal human silhouettes. Illustrative only: no measurements or lab results.
import React from 'react';
import { clamp, seeded } from '../../lib/anim';
import { HEIGHT, WIDTH } from '../../lib/theme';
import { FONT, L, ease, hexA } from '../theme';
import { hasKh } from '../../lib/kh';

export const TOOTH_PATH =
  'M70 35 C 45 35, 35 60, 40 90 C 45 120, 60 135, 65 170 C 70 200, 85 210, 93 185 L 103 152 C 108 138, 132 138, 137 152 L 147 185 C 155 210, 170 200, 175 170 C 180 135, 195 120, 200 90 C 205 60, 195 35, 170 35 C 150 35, 140 46, 120 46 C 100 46, 90 35, 70 35 Z';

const STAINS: [number, number, number][] = [[95, 80, 24], [150, 95, 20], [120, 122, 17], [80, 125, 13], [165, 68, 11], [135, 60, 9]];

/**
 * Porcelain tooth sculpture with lavender-tinted shading and a soft violet rim light.
 * `stain` 0..1 shows abstract yellow surface spots; `shine` 0..1 sweeps a highlight; `turn` fakes a slow rotation.
 */
export const Tooth: React.FC<{ id: string; x: number; y: number; size: number; opacity?: number; stain?: number; shine?: number; turn?: number }> = ({ id, x, y, size, opacity = 1, stain = 0, shine = -1, turn = 0 }) => {
  if (opacity <= 0) return null;
  const sw = -40 + 340 * shine;
  return (
    <svg width={size} height={size} viewBox="20 20 200 200" style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, opacity, overflow: 'visible', transform: `scaleX(${1 - 0.12 * Math.abs(Math.sin(turn))})`, filter: `drop-shadow(0 36px 40px ${hexA(L.purple, 0.22)})` }}>
      <defs>
        <radialGradient id={`${id}-body`} cx={0.36 + 0.08 * Math.sin(turn)} cy="0.28" r="0.85">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F2F9FC" />
          <stop offset="1" stopColor="#BCDDEA" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor={L.violet} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={TOOTH_PATH} />
        </clipPath>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity={0.95} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
        <filter id={`${id}-soft`}>
          <feGaussianBlur stdDeviation={5} />
        </filter>
      </defs>
      <path d={TOOTH_PATH} fill={`url(#${id}-body)`} stroke={`url(#${id}-rim)`} strokeWidth={2} />
      <g clipPath={`url(#${id}-clip)`}>
        <g filter={`url(#${id}-soft)`} opacity={clamp(stain)}>
          {STAINS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(222,178,64,0.62)" />)}
        </g>
        {shine > 0 && shine < 1 && <rect x={sw} y={0} width={70} height={260} fill={`url(#${id}-shine)`} transform={`rotate(18 ${sw + 35} 120)`} />}
        <ellipse cx={92 + 10 * Math.sin(turn)} cy={72} rx={15} ry={30} fill="rgba(255,255,255,0.9)" transform="rotate(-20 92 72)" filter={`url(#${id}-soft)`} />
      </g>
    </svg>
  );
};

/** Thin animated waveform lines (freshness / airflow), drawing in with p. */
export const Waveform: React.FC<{ t: number; p: number; y: number; n?: number; amp?: number; color?: string; spread?: number; x0?: number; x1?: number }> = ({ t, p, y, n = 5, amp = 50, color = L.cyan, spread = 22, x0 = 0, x1 = WIDTH }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      {Array.from({ length: n }, (_, k) => {
        let d = '';
        for (let x = x0; x <= x0 + (x1 - x0) * e; x += 12) {
          const env = Math.sin(Math.PI * ((x - x0) / (x1 - x0)));
          const yy = y + (k - (n - 1) / 2) * spread + amp * env * Math.sin(x / 70 + t * 2.2 + k * 0.7) * (0.5 + 0.5 * Math.sin(k + 1));
          d += `${d ? ' L' : 'M'} ${x} ${yy}`;
        }
        return <path key={k} d={d} fill="none" stroke={k % 2 ? L.violet : color} strokeWidth={k === (n - 1) / 2 ? 2.4 : 1.2} opacity={0.35 + 0.5 * (1 - Math.abs(k - (n - 1) / 2) / n)} />;
      })}
    </svg>
  );
};

/** Elegant protective geometric layers around a point: concentric rotating hexagons drawing in. */
export const ProtectLayers: React.FC<{ t: number; p: number; cx: number; cy: number; r: number; color?: string }> = ({ t, p, cx, cy, r, color = L.purple }) => {
  if (p <= 0) return null;
  const hex = (rr: number) => Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 3) * i - Math.PI / 2; return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`; }).join(' ');
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      {[0, 1, 2].map((i) => {
        const k = ease.outExpo(clamp((p - i * 0.18) / 0.6));
        if (k <= 0) return null;
        const rr = r * (0.82 + i * 0.16);
        return (
          <g key={i} transform={`rotate(${(i % 2 ? -1 : 1) * t * (6 + i * 3)} ${cx} ${cy})`}>
            <polygon points={hex(rr)} fill={i === 0 ? hexA(L.lilac, 0.18 * k) : 'none'} stroke={i === 2 ? L.lemon : color} strokeWidth={i === 0 ? 2.5 : 1.5} pathLength={100} strokeDasharray={i === 1 ? '2 3' : 100} strokeDashoffset={i === 1 ? 0 : 100 * (1 - k)} strokeOpacity={0.75 * (i === 1 ? k : 1)} />
          </g>
        );
      })}
    </svg>
  );
};

/** Editorial callout: a small ring pointer with a thin leader line and a label. */
export const Callout: React.FC<{ x: number; y: number; tx: number; ty: number; p: number; label: string; align?: 'left' | 'right'; color?: string }> = ({ x, y, tx, ty, p, label, align = 'right', color = L.purple }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  const kh = hasKh(label);
  return (
    <>
      <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <circle cx={x} cy={y} r={11 * e} fill="none" stroke={color} strokeWidth={2} />
        <circle cx={x} cy={y} r={4 * e} fill={color} />
        <polyline points={`${x},${y} ${x + (tx - x) * e},${y + (ty - y) * e} ${tx + (align === 'right' ? 40 : -40) * e},${ty}`} fill="none" stroke={color} strokeWidth={1.4} />
      </svg>
      <div style={{ position: 'absolute', left: align === 'right' ? tx + 52 : undefined, right: align === 'left' ? WIDTH - tx + 52 : undefined, top: ty - 22, opacity: clamp((p - 0.4) / 0.4), fontFamily: FONT.sans, fontWeight: 700, fontSize: kh ? 28 : 20, letterSpacing: kh ? 0 : 5, lineHeight: kh ? 1.5 : 2.2, color: L.plum, whiteSpace: 'nowrap' }}>{label}</div>
    </>
  );
};

/** Layered tooth cross-section: enamel (outer), inner layers in soft lilac, the enamel band lights up with `hot`. */
export const CrossSection: React.FC<{ x: number; y: number; size: number; p: number; hot: number }> = ({ x, y, size, p, hot }) => {
  if (p <= 0) return null;
  const layers = [
    { s: 1, fill: '#FFFFFF', stroke: L.violet },
    { s: 0.78, fill: '#E8F6FB', stroke: hexA(L.violet, 0.6) },
    { s: 0.5, fill: '#D3EEF8', stroke: hexA(L.violet, 0.5) },
  ];
  return (
    <svg width={size} height={size} viewBox="20 20 200 200" style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, overflow: 'visible', filter: `drop-shadow(0 30px 40px ${hexA(L.purple, 0.2)})` }}>
      {layers.map((l, i) => {
        const k = ease.outExpo(clamp((p - i * 0.15) / 0.6));
        return <path key={i} d={TOOTH_PATH} fill={l.fill} stroke={i === 0 ? (hot > 0 ? L.lemon : l.stroke) : l.stroke} strokeWidth={i === 0 ? 3 + 2.5 * hot : 1.5} opacity={k} transform={`translate(120 ${110 + i * 8}) scale(${l.s * (0.9 + 0.1 * k)}) translate(-120 -110)`} style={i === 0 && hot > 0 ? { filter: `drop-shadow(0 0 ${6 * hot}px ${hexA(L.lemon, 0.55)})` } : undefined} />;
      })}
    </svg>
  );
};

/** Clean, non-graphic gumline under three teeth; a soft highlight traces the gum with `trace`. */
export const Gumline: React.FC<{ id: string; cx: number; cy: number; w: number; p: number; trace: number }> = ({ id, cx, cy, w, p, trace }) => {
  if (p <= 0) return null;
  const e = ease.outExpo(clamp(p));
  const tw = w / 3.3;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: e }}>
      {[-1, 0, 1].map((k) => <Tooth key={k} id={`${id}-${k}`} x={cx + k * tw * 0.95} y={cy - tw * 0.28 + 40 * (1 - e)} size={tw * 1.2} />)}
      <svg width={WIDTH} height={HEIGHT} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <linearGradient id={`${id}-gum`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={L.gum} />
            <stop offset="1" stopColor="#E7A3B6" />
          </linearGradient>
        </defs>
        <path d={`M ${cx - w / 2} ${cy + 20} C ${cx - w / 3} ${cy - 10}, ${cx - w / 6} ${cy + 30}, ${cx} ${cy + 6} C ${cx + w / 6} ${cy + 30}, ${cx + w / 3} ${cy - 10}, ${cx + w / 2} ${cy + 20} L ${cx + w / 2} ${cy + 130} L ${cx - w / 2} ${cy + 130} Z`} fill={`url(#${id}-gum)`} opacity={0.95} />
        <path d={`M ${cx - w / 2} ${cy + 20} C ${cx - w / 3} ${cy - 10}, ${cx - w / 6} ${cy + 30}, ${cx} ${cy + 6} C ${cx + w / 6} ${cy + 30}, ${cx + w / 3} ${cy - 10}, ${cx + w / 2} ${cy + 20}`} fill="none" stroke={L.purple} strokeWidth={3} pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - ease.inOut(clamp(trace)))} style={{ filter: `drop-shadow(0 0 6px ${hexA(L.violet, 0.8)})` }} />
      </svg>
    </div>
  );
};

/** Soft floating particles (atmosphere), deterministic. */
export const Particles: React.FC<{ t: number; seed: number; n: number; p?: number; colors?: string[]; area?: { x0: number; x1: number; y0: number; y1: number }; size?: [number, number] }> = ({
  t, seed, n, p = 1, colors = [L.violet, L.lilac, '#FFFFFF'], area = { x0: 0, x1: WIDTH, y0: 0, y1: HEIGHT }, size = [3, 8],
}) => {
  const r = seeded(seed);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = area.x0 + r() * (area.x1 - area.x0);
        const y = area.y0 + r() * (area.y1 - area.y0);
        const s = size[0] + r() * (size[1] - size[0]);
        const ph = r() * 6;
        const c = colors[i % colors.length];
        return <div key={i} style={{ position: 'absolute', left: x + 12 * Math.sin(t * 0.8 + ph), top: y - 10 * t * (0.5 + r()), width: s, height: s, borderRadius: '50%', background: c, opacity: p * (0.35 + 0.35 * Math.sin(t * 1.6 + ph)), boxShadow: `0 0 ${s * 2}px ${hexA(c.startsWith('#') ? c : '#FFFFFF', 0.6)}` }} />;
      })}
    </>
  );
};

/** Abstract microscopic particles (soft membranes, no faces) that disperse outwards with `out`. */
export const Microbes: React.FC<{ t: number; seed: number; n: number; p: number; out: number; cx: number; cy: number; r: number }> = ({ t, seed, n, p, out, cx, cy, r }) => {
  const rnd = seeded(seed);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = rnd() * Math.PI * 2;
        const d = r * (0.2 + 0.8 * rnd());
        const s = 18 + rnd() * 26;
        const k = ease.outExpo(clamp(out));
        const x = cx + Math.cos(a) * d * (1 + 1.6 * k) + 8 * Math.sin(t + i);
        const y = cy + Math.sin(a) * d * (1 + 1.6 * k) + 8 * Math.cos(t * 1.2 + i);
        return <div key={i} style={{ position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '46% 54% 50% 50%', border: `1.5px solid ${hexA(L.violet, 0.6)}`, background: `radial-gradient(circle at 35% 30%, ${hexA(L.lilac, 0.7)}, ${hexA(L.violet, 0.25)})`, opacity: clamp(p) * (1 - k), transform: `rotate(${t * 30 + i * 40}deg)` }} />;
      })}
    </>
  );
};

/** Clear water droplets with a highlight. */
export const Droplets: React.FC<{ t: number; seed: number; n: number; p: number; area: { x0: number; x1: number; y0: number; y1: number } }> = ({ t, seed, n, p, area }) => {
  const r = seeded(seed);
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const x = area.x0 + r() * (area.x1 - area.x0);
        const y = area.y0 + r() * (area.y1 - area.y0);
        const s = 10 + r() * 22;
        const ph = r() * 6;
        return <div key={i} style={{ position: 'absolute', left: x, top: y + 14 * Math.sin(t * 0.9 + ph), width: s, height: s * 1.15, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: `radial-gradient(circle at 35% 30%, #FFFFFF, ${hexA(L.cyan, 0.25)} 55%, ${hexA(L.cyan, 0.08)})`, border: `1px solid ${hexA(L.cyan, 0.45)}`, opacity: clamp(p) * 0.9 }} />;
      })}
    </>
  );
};

/** Mint leaf accent. */
export const MintLeaf: React.FC<{ x: number; y: number; len: number; rotate: number; opacity?: number; blur?: number }> = ({ x, y, len, rotate, opacity = 1, blur = 0 }) => (
  <svg width={len} height={len * 0.5} viewBox="0 0 100 50" style={{ position: 'absolute', left: x - len / 2, top: y - len * 0.25, transform: `rotate(${rotate}deg)`, opacity, overflow: 'visible', filter: `drop-shadow(0 8px 10px ${hexA(L.purple, 0.18)})${blur > 0.3 ? ` blur(${blur}px)` : ''}` }}>
    <path d="M2 25 C 25 -4, 75 -4, 98 25 C 75 54, 25 54, 2 25 Z" fill={L.mint} />
    <path d="M2 25 C 25 -4, 75 -4, 98 25" fill="none" stroke={L.green} strokeWidth={2} opacity={0.6} />
    <path d="M6 25 L 94 25" stroke="rgba(255,255,255,0.6)" strokeWidth={1.6} />
  </svg>
);

/** Minimal person silhouette (symbolic, for daily routines). */
const Person: React.FC<{ x: number; y: number; h: number; color: string; opacity: number }> = ({ x, y, h, color, opacity }) => (
  <svg width={h * 0.45} height={h} viewBox="0 0 45 100" style={{ position: 'absolute', left: x - h * 0.225, top: y - h, opacity }}>
    <circle cx="22.5" cy="14" r="10" fill={color} />
    <path d="M6 100 L 8 44 C 8 32, 14 28, 22.5 28 C 31 28, 37 32, 37 44 L 39 100 Z" fill={color} />
  </svg>
);

/** A row of repeated minimal silhouettes, appearing one by one (people who care for their teeth every day). */
export const Silhouettes: React.FC<{ p: number; y: number; n?: number; h?: number }> = ({ p, y, n = 7, h = 130 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const k = ease.outExpo(clamp(p * n * 0.5 - i * 0.5));
      const x = WIDTH / 2 + (i - (n - 1) / 2) * h * 0.55;
      return <Person key={i} x={x} y={y + 20 * (1 - k)} h={h * (i === (n - 1) / 2 ? 1.12 : 1)} color={i === (n - 1) / 2 ? L.purple : L.violet} opacity={k * (i === (n - 1) / 2 ? 0.9 : 0.4)} />;
    })}
  </>
);
