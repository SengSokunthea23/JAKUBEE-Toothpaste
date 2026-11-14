import React from 'react';
import { AbsoluteFill } from 'remotion';
import { GlowBlob, IvoryBg } from '../components/Backgrounds';
import { Bubble, makeParticles } from '../components/Decor';
import { GlassCard } from '../components/GlassCard';
import { Product } from '../components/Product';
import { Khmer, Label, Reveal } from '../components/Typography';
import { CauseIcon } from '../components/CauseIcon';
import { Tooth3D } from '../editorial/ui/Lemon';
import { easeBack, easeInOut, easeOut, prog, seeded } from '../lib/anim';
import { COPY } from '../lib/copy';
import { COLORS } from '../lib/theme';
import { useTime } from '../lib/useTime';

const RISE = makeParticles(81, 16);
const WATER_BUBBLES = makeParticles(83, 22);

/** Mix two hex colours (k = 0 → a, 1 → b). */
const mix = (a: string, b: string, k: number) => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) + (((pb >> s) & 255) - ((pa >> s) & 255)) * k);
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
};

/**
 * Water band filling the bottom of the frame: tinted by the stains at first, it turns fresh aqua and
 * mint once the cleansing light passes (k = 0 → stained, 1 → clean). Two layered waves drift.
 */
const CleanWater: React.FC<{ t: number; rise: number; k: number }> = ({ t, rise, k }) => {
  const base = 1470 + 460 * (1 - rise);
  // the wave's top edge, then (for a filled shape) closed down to the bottom of the frame
  const edge = (amp: number, len: number, speed: number, off: number) => {
    let d = '';
    for (let x = 0; x <= 1080; x += 30) d += `${x === 0 ? 'M' : ' L'} ${x} ${base + off + amp * Math.sin((x / len) * Math.PI * 2 + t * speed)}`;
    return d;
  };
  const wave = (amp: number, len: number, speed: number, off: number) => `${edge(amp, len, speed, off)} L 1080 1920 L 0 1920 Z`;
  const top1 = mix('#D9C49A', '#BDEBFA', k), bot1 = mix('#B89B67', '#7FD3EE', k);
  const top2 = mix('#E6D5B3', '#D4F1F8', k), bot2 = mix('#C7AE80', '#8FD8C6', k);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="tw1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top1} stopOpacity={0.9} /><stop offset="1" stopColor={bot1} /></linearGradient>
        <linearGradient id="tw2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top2} stopOpacity={0.85} /><stop offset="1" stopColor={bot2} /></linearGradient>
      </defs>
      <path d={wave(16, 620, 1.4, 0)} fill="url(#tw1)" opacity={0.75} />
      <path d={wave(12, 460, -1.9, 34)} fill="url(#tw2)" opacity={0.9} />
      {/* bright waterline */}
      <path d={edge(12, 460, -1.9, 34)} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={4} />
    </svg>
  );
};

// stain specks drifting from each cause card down onto the tooth (cigarette, tea, coffee tones)
const STAIN_TONES = ['#8C7B5E', '#B07A36', '#6B4428'];
const SPECKS = (() => {
  const r = seeded(808);
  return Array.from({ length: 24 }, (_, i) => ({ from: i % 3, dx: r() * 150 - 75, tx: r() * 220 - 110, ty: r() * 150 - 60, d: r() * 0.5, s: 9 + r() * 9 }));
})();

/** 08 — Cleans tartar caused by cigarettes, tea and coffee: cause cards, a cleansing sweep, both tubes rise. */
/** Visual centre of the tooth (its outline spans ~964–1346 px). */
const TOOTH_CY = 1155;

/** Four-point sparkle star centred on (0, 0), radius 1. */
const STAR = 'M0 -1 C 0.12 -0.12, 0.12 -0.12, 1 0 C 0.12 0.12, 0.12 0.12, 0 1 C -0.12 0.12, -0.12 0.12, -1 0 C -0.12 -0.12, -0.12 -0.12, 0 -1 Z';
const SPARKS = Array.from({ length: 12 }, (_, i) => ({ a: (i / 12) * Math.PI * 2 + (i % 2) * 0.2, d: i % 3 === 0 ? 1 : i % 3 === 1 ? 0.78 : 0.6, s: i % 2 ? 26 : 40 }));

/**
 * The cleaning moment: three rings of fresh aqua-mint light ripple out from the tooth like a drop
 * in clean water, and sparkles burst outwards. b: 0 → 1.
 */
const FreshBurst: React.FC<{ t: number; b: number; cx: number; cy: number }> = ({ t, b, cx, cy }) => {
  if (b <= 0 || b >= 1) return null;
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id="burstRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#20C9F4" />
          <stop offset="1" stopColor="#64A84C" />
        </linearGradient>
        <radialGradient id="burstCore" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#DFF5FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#DFF5FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* soft white flash behind the tooth */}
      <circle cx={cx} cy={cy} r={180 + 260 * easeOut(b)} fill="url(#burstCore)" opacity={Math.sin(Math.PI * Math.min(1, b * 1.6))} />
      {[0, 1, 2].map((i) => {
        const k = prog(b, i * 0.14, 0.72 + i * 0.14);
        if (k <= 0 || k >= 1) return null;
        const e = easeOut(k);
        return <circle key={i} cx={cx} cy={cy} r={150 + 620 * e} fill="none" stroke="url(#burstRing)" strokeWidth={14 * (1 - e) + 2} opacity={0.85 * (1 - k)} />;
      })}
      {SPARKS.map((sp, i) => {
        const k = prog(b, 0.08 + (i % 4) * 0.04, 0.85);
        if (k <= 0 || k >= 1) return null;
        const e = easeOut(k);
        const r = 170 + 300 * sp.d * e;
        const size = sp.s * Math.sin(Math.PI * k);
        return (
          <path
            key={i}
            d={STAR}
            transform={`translate(${cx + Math.cos(sp.a) * r} ${cy + Math.sin(sp.a) * r * 0.85}) rotate(${t * 90 + i * 30}) scale(${size})`}
            fill={i % 3 ? '#FFFFFF' : '#8DDDF5'}
            style={{ filter: 'drop-shadow(0 0 6px rgba(32,201,244,0.8))' }}
          />
        );
      })}
    </svg>
  );
};

export const S08Tartar: React.FC = () => {
  const t = useTime();
  const c = COPY.tartar;
  const clear = prog(t, 2.5, 3.3);
  const p = easeOut(prog(t, 2.9, 3.9));
  // the stained tooth: appears, picks up stains from the causes, is cleaned by the sweep, then gives way to the tubes
  const toothIn = easeOut(prog(t, 0.6, 1.3));
  const toothOut = easeOut(prog(t, 3.0, 3.5));
  const stain = prog(t, 1.5, 2.4) * (1 - easeInOut(prog(t, 2.6, 3.2)));
  const fresh = easeInOut(prog(t, 2.55, 3.25)); // the water clears with the sweep
  return (
    <AbsoluteFill>
      <IvoryBg />
      <GlowBlob x={300} y={1150} r={420} color={COLORS.softBlue} a={0.7} />
      <GlowBlob x={780} y={1150} r={420} color="#E9F4E2" a={0.7} />
      <Reveal x={540} y={285} p={prog(t, 0.2, 0.7)}>
        <Label>{c.label}</Label>
      </Reveal>
      <Reveal x={540} y={380} p={prog(t, 0.35, 0.95)}>
        <Khmer size={60}>{c.kh1}</Khmer>
      </Reveal>
      <Reveal x={540} y={465} p={prog(t, 0.55, 1.15)}>
        <Khmer size={42} weight={600} color={COLORS.royal}>
          {c.kh2}
        </Khmer>
      </Reveal>
      {c.causes.map((cause, i) => {
        const q = prog(t, 0.7 + i * 0.2, 1.3 + i * 0.2);
        const out = easeOut(prog(t, 2.5 + i * 0.12, 3.1 + i * 0.12));
        const o = Math.min(1, q * 2) * (1 - out);
        if (o <= 0) return null;
        // the ripple pushes each card away from the tooth: outwards, upwards and smaller
        const x = 200 + i * 340 + (i - 1) * 140 * out;
        const y = 726 + 60 * (1 - easeOut(q)) - 110 * out; // title, cards, tooth and water are evenly spaced (~103 px gaps)
        const s = 1 - 0.25 * out;
        return (
          <div key={cause.en} style={{ position: 'absolute', inset: 0, transform: `scale(${s})`, transformOrigin: `${x}px ${y}px` }}>
            <GlassCard x={x} y={y} w={290} h={270} radius={36} opacity={o} fill="rgba(255,255,255,0.92)" />
            <div style={{ position: 'absolute', left: x - 145, top: y - 135, width: 290, height: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: o }}>
              <CauseIcon kind={cause.icon} size={118} t={t} variant="commercial" />
              <Khmer size={40}>{cause.kh}</Khmer>
            </div>
          </div>
        );
      })}
      {/* water band at the bottom: stained, then cleared by the sweep */}
      <CleanWater t={t} rise={easeOut(prog(t, 0.3, 1.2))} k={fresh} />
      {WATER_BUBBLES.map((b, i) => {
        const y = 1900 - ((b.speed * 1.6 * t + b.phase * 80) % 420);
        return <Bubble key={i} x={b.x + 8 * Math.sin(t * 2 + b.phase)} y={y} r={b.r * 0.7} opacity={(0.25 + 0.5 * fresh) * b.a * easeOut(prog(t, 0.8, 1.4))} />;
      })}
      {/* the tooth the stains land on */}
      <GlowBlob x={540} y={1165} r={300} color="#FFFFFF" a={0.9 * toothIn * (1 - toothOut)} />
      {/* the tooth pops a little as it comes clean */}
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1 + 0.09 * Math.sin(Math.PI * prog(t, 2.55, 3.05))})`, transformOrigin: `540px ${TOOTH_CY}px` }}>
        <Tooth3D x={540} y={1161 - 60 * toothOut + 40 * (1 - toothIn)} size={460} stain={stain} shine={prog(t, 2.85, 3.45)} opacity={toothIn * (1 - toothOut)} />
      </div>
      {SPECKS.map((s, i) => {
        const k = easeInOut(prog(t, 1.15 + s.d, 2.05 + s.d));
        if (k <= 0 || k >= 1) return null;
        const x0 = 200 + s.from * 340 + s.dx * 0.4;
        const y0 = 863;
        const x = x0 + (540 + s.tx - x0) * k;
        const y = y0 + (1110 + s.ty - y0) * k - 60 * Math.sin(Math.PI * k);
        return <div key={i} style={{ position: 'absolute', left: x - s.s / 2, top: y - s.s / 2, width: s.s, height: s.s, borderRadius: '50%', background: STAIN_TONES[s.from], opacity: 0.85 * Math.sin(Math.PI * k) + 0.15, boxShadow: `0 2px 6px ${STAIN_TONES[s.from]}66` }} />;
      })}
      {/* fresh ripple burst: clean light rings and sparkles spread out from the tooth */}
      <FreshBurst t={t} b={clear} cx={540} cy={TOOTH_CY} />
      {t > 3.0 &&
        RISE.map((b, i) => {
          const y = 1500 - ((b.speed * 2.4 * (t - 3.0) + b.phase * 60) % 900);
          return <Bubble key={i} x={b.x + 10 * Math.sin(t * 2 + b.phase)} y={y} r={b.r} opacity={0.5 * b.a * p} />;
        })}
      <Product name="zesty-lemon-tube" x={385} y={1150 + 160 * (1 - easeBack(prog(t, 2.9, 3.7)))} height={860} rotate={-8} opacity={p} sweep={prog(t, 3.8, 4.6)} />
      <Product name="herbal-mint-tube" x={695} y={1150 + 160 * (1 - easeBack(prog(t, 3.05, 3.85)))} height={860} rotate={8} opacity={p} sweep={prog(t, 3.95, 4.75)} />
    </AbsoluteFill>
  );
};
