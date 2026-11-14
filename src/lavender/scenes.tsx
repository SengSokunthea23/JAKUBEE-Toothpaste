// Theme 05 — Lavender Editorial × Symbolic 3D Storytelling. 13 scenes, one per line of the Khmer script.
import React from 'react';
import { CauseIcon } from '../components/CauseIcon';
import { LemonSlice3D } from '../editorial/ui/Lemon';
import { Product } from '../editorial/ui/Product';
import { clamp, prog, seeded } from '../lib/anim';
import { useTime } from '../lib/useTime';
import { LAV } from './copy';
import { FONT, L, ease, hexA, lerp } from './theme';
import { Frame } from './ui/Frame';
import { CrossSection, Callout, Droplets, Gumline, Microbes, MintLeaf, Particles, ProtectLayers, Silhouettes, Tooth, Waveform } from './ui/Objects';
import { Cam, Glow, Grid } from './ui/Stage';
import { At, Headline, Underline } from './ui/Type';

const LILAC_BLOBS = [
  { x: 180, y: 520, r: 380, color: L.lilac, a: 0.75 },
  { x: 930, y: 1300, r: 420, color: L.violet, a: 0.28 },
];

/** Two-line headline (Khmer or Latin), centred. */
const Head2: React.FC<{ t: number; lines: string[]; at?: number; size?: number; y?: number; accentLast?: boolean }> = ({ t, lines, at = 0.2, size = 104, y = 330, accentLast = true }) => (
  <>
    {lines.map((l, i) => (
      <At key={i} x={540} y={y + i * size * 1.05}>
        <Headline text={l} t={t} at={at + i * 0.18} size={size} color={i === lines.length - 1 && accentLast ? L.purple : L.plum} />
      </At>
    ))}
  </>
);

/* 01 — Zesty Lemon introduction */
export const L01Intro: React.FC = () => {
  const t = useTime();
  const c = LAV.intro;
  const lemon = ease.outExpo(prog(t, 0.1, 1.2));
  const tube = ease.outExpo(prog(t, 0.9, 2.0));
  return (
    <Frame t={t} n={1} label={c.label} kh={c.kh} khAt={1.4} blobs={LILAC_BLOBS}>
      <Cam t={t} dur={3.5} from={1.06} to={1}>
        <Particles t={t} seed={501} n={22} p={lemon} />
        <Glow x={540} y={1000} r={420} color={L.lemon} a={0.22 * tube} />
        <LemonSlice3D x={lerp(540, 820, tube)} y={lerp(980, 660, tube)} d={lerp(380, 220, tube)} rotate={t * 14} tilt={lerp(10, 40, tube)} opacity={lemon} />
        <LemonSlice3D x={250} y={1300} d={150 * tube} rotate={-t * 10} tilt={30} opacity={tube} blur={2} />
        <Product shot="tube" x={540} y={1060 + 360 * (1 - tube)} height={820} opacity={tube} sweep={prog(t, 2.0, 2.8)} />
      </Cam>
      <At x={540} y={360}>
        <Headline text={c.title} t={t} at={0.5} size={150} color={L.plum} accent={['Lemon']} />
      </At>
      <At x={540} y={480}>
        <Headline text={c.sub} t={t} at={0.85} size={64} color={L.violet} />
      </At>
    </Frame>
  );
};

/* 02 — Clean teeth and fresh breath */
export const L02Clean: React.FC = () => {
  const t = useTime();
  const c = LAV.clean;
  const tooth = ease.outExpo(prog(t, 0.1, 1.0));
  return (
    <Frame t={t} n={2} label={c.label} kh={c.kh} khAt={0.7} blobs={LILAC_BLOBS}>
      <Grid p={prog(t, 0, 1)} opacity={0.12} />
      <Cam t={t} dur={3} from={1} to={1.05}>
        <Glow x={540} y={900} r={380} color={L.lilac} a={0.7} />
        <Tooth id="l02" x={540} y={900 + 60 * (1 - tooth)} size={520} opacity={tooth} turn={t * 0.6} shine={prog(t, 1.4, 2.2)} />
        <Waveform t={t} p={prog(t, 0.4, 1.4)} y={1260} n={5} amp={46} />
        <Particles t={t} seed={502} n={14} colors={[L.cyan, '#FFFFFF']} area={{ x0: 200, x1: 880, y0: 600, y1: 1200 }} />
      </Cam>
      <Head2 t={t} lines={c.head} size={92} y={320} />
    </Frame>
  );
};

/* 03 — Surface stains */
export const L03Stains: React.FC = () => {
  const t = useTime();
  const c = LAV.stains;
  const tooth = ease.outExpo(prog(t, 0.0, 0.8));
  const fade = prog(t, 1.6, 2.6);
  const r = seeded(503);
  const specks = Array.from({ length: 26 }, () => ({ a: r() * Math.PI * 2, d: 120 + r() * 160, s: 6 + r() * 12, ph: r() }));
  return (
    <Frame t={t} n={3} label={c.label} kh={c.kh} khAt={0.6} blobs={LILAC_BLOBS}>
      <Cam t={t} dur={3} from={1.04} to={1}>
        <Tooth id="l03" x={540} y={930} size={520} opacity={tooth} stain={0.9 * (1 - ease.inOut(fade))} shine={prog(t, 2.3, 3.0)} />
        {/* abstract yellow stain particles drift away from the surface */}
        {specks.map((s, i) => {
          const k = ease.outExpo(clamp((fade - s.ph * 0.3) / 0.7));
          const d = s.d * (0.5 + 1.4 * k);
          return <div key={i} style={{ position: 'absolute', left: 540 + Math.cos(s.a) * d - s.s / 2, top: 900 + Math.sin(s.a) * d * 0.9 - s.s / 2, width: s.s, height: s.s, borderRadius: '50%', background: '#E2B84A', opacity: tooth * (0.75 - 0.75 * k), filter: 'blur(0.5px)' }} />;
        })}
        <Callout x={460} y={820} tx={240} ty={700} p={prog(t, 0.6, 1.2)} label={c.tags[0]} align="left" />
        <Callout x={620} y={1010} tx={830} ty={1150} p={prog(t, 0.8, 1.4)} label={c.tags[1]} />
      </Cam>
      <Head2 t={t} lines={c.head} size={92} y={320} />
    </Frame>
  );
};

/* 04 — Strong teeth */
export const L04Strong: React.FC = () => {
  const t = useTime();
  const c = LAV.strong;
  const tooth = ease.outExpo(prog(t, 0.0, 0.7));
  return (
    <Frame t={t} n={4} label={c.label} kh={c.kh} khAt={0.6} blobs={LILAC_BLOBS}>
      <Cam t={t} dur={2.5} from={1} to={1.05}>
        <Glow x={540} y={940} r={420} color={L.violet} a={0.25} />
        <ProtectLayers t={t} p={prog(t, 0.3, 1.6)} cx={540} cy={930} r={330} />
        <Tooth id="l04" x={540} y={930} size={430} opacity={tooth} turn={t * 0.5} />
      </Cam>
      <Head2 t={t} lines={c.head} size={92} y={320} />
    </Frame>
  );
};

/* 05 — Bright and clean teeth */
export const L05Bright: React.FC = () => {
  const t = useTime();
  const c = LAV.bright;
  const tooth = ease.outExpo(prog(t, 0.0, 0.7));
  const r = seeded(505);
  const stars = Array.from({ length: 10 }, () => ({ x: 300 + r() * 480, y: 700 + r() * 460, s: 10 + r() * 18, ph: r() * 6 }));
  return (
    <Frame t={t} n={5} label={c.label} kh={c.kh} khAt={0.6} blobs={LILAC_BLOBS}>
      <Cam t={t} dur={2.5} from={1.08} to={1}>
        <Glow x={540} y={930} r={420} color="#FFFFFF" a={0.95} />
        <Tooth id="l05" x={540} y={930} size={560} opacity={tooth} shine={prog(t, 0.6, 1.5)} />
        {stars.map((s, i) => {
          const tw = Math.max(0, Math.sin(t * 3 + s.ph));
          return (
            <svg key={i} width={s.s * 2} height={s.s * 2} viewBox="-1 -1 2 2" style={{ position: 'absolute', left: s.x - s.s, top: s.y - s.s, opacity: tw * clamp((t - 0.8) / 0.4), filter: `drop-shadow(0 0 6px ${hexA(L.lilac, 0.9)})` }}>
              <path d="M0 -1 C 0.1 -0.1, 0.1 -0.1, 1 0 C 0.1 0.1, 0.1 0.1, 0 1 C -0.1 0.1, -0.1 0.1, -1 0 C -0.1 -0.1, -0.1 -0.1, 0 -1 Z" fill="#FFFFFF" />
            </svg>
          );
        })}
      </Cam>
      <At x={540} y={350}>
        <span style={{ display: 'inline-flex', gap: 30, alignItems: 'baseline' }}>
          {c.words.map((w, i) => <Headline key={w} text={w} t={t} at={0.15 + i * 0.22} size={92} color={i === 2 ? L.purple : L.plum} />)}
        </span>
      </At>
    </Frame>
  );
};

/* 06 — Tartar from cigarettes, tea and coffee */
export const L06Tartar: React.FC = () => {
  const t = useTime();
  const c = LAV.tartar;
  const out = ease.inOut(prog(t, 1.9, 2.5));
  const tubes = ease.outExpo(prog(t, 2.1, 3.0));
  return (
    <Frame t={t} n={6} label={c.label} kh={c.kh} khAt={0.6} blobs={LILAC_BLOBS}>
      <Grid p={prog(t, 0, 1)} opacity={0.1} />
      {c.causes.map((cause, i) => {
        const q = ease.outBack(prog(t, 0.3 + i * 0.18, 0.9 + i * 0.18));
        const x = 220 + i * 320;
        const y = 820 - 60 * out;
        return (
          <div key={cause.icon} style={{ position: 'absolute', left: x - 120, top: y - 140, width: 240, height: 280, borderRadius: 40, background: 'rgba(255,255,255,0.75)', border: `1px solid ${hexA(L.violet, 0.25)}`, boxShadow: `0 20px 40px ${hexA(L.purple, 0.12)}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: clamp(q) * (1 - out), transform: `scale(${0.8 + 0.2 * q - 0.15 * out})` }}>
            <CauseIcon kind={cause.icon} size={120} t={t} variant="lavender" />
            <span style={{ fontFamily: FONT.khmer, fontWeight: 700, fontSize: 40, color: L.plum, lineHeight: 1.5 }}>{cause.kh}</span>
          </div>
        );
      })}
      <Cam t={t} dur={3.5} from={1.04} to={1}>
        <Glow x={540} y={1050} r={430} color={L.lemon} a={0.18 * tubes} />
        <Product shot="tube" x={420} y={1060 + 260 * (1 - tubes)} height={760} rotate={-6} opacity={tubes} sweep={prog(t, 2.8, 3.5)} />
        <Product shot="herbal-tube" x={660} y={1070 + 260 * (1 - tubes)} height={750} rotate={6} opacity={tubes} sweep={prog(t, 2.95, 3.6)} />
      </Cam>
      <At x={540} y={340}>
        <span style={{ display: 'inline-flex', gap: 22, alignItems: 'baseline' }}>
          <Headline text={c.head[0]} t={t} at={0.15} size={96} />
          <Headline text={c.head[1]} t={t} at={0.35} size={110} color={L.purple} />
        </span>
      </At>
    </Frame>
  );
};

/* 07 — Fluoride */
export const L07Fluoride: React.FC = () => {
  const t = useTime();
  const c = LAV.fluoride;
  const gather = ease.inOut(prog(t, 0.2, 1.4));
  const r = seeded(507);
  const pts = Array.from({ length: 30 }, () => ({ a: r() * Math.PI * 2, d: 380 + r() * 300, s: 5 + r() * 8 }));
  return (
    <Frame t={t} n={7} label={c.label} kh={c.kh} khAt={0.6} blobs={LILAC_BLOBS}>
      <Grid p={prog(t, 0, 0.8)} step={60} opacity={0.14} />
      <Cam t={t} dur={2.5} from={1} to={1.04}>
        {/* luminous particles gather into a protective ring around the tooth */}
        {pts.map((p, i) => {
          const d = lerp(p.d, 290, gather);
          const a = p.a + t * 0.3;
          return <div key={i} style={{ position: 'absolute', left: 540 + Math.cos(a) * d - p.s / 2, top: 960 + Math.sin(a) * d - p.s / 2, width: p.s, height: p.s, borderRadius: '50%', background: i % 3 ? L.violet : L.cyan, boxShadow: `0 0 ${p.s * 2}px ${hexA(i % 3 ? L.violet : L.cyan, 0.8)}`, opacity: 0.85 }} />;
        })}
        <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
          <circle cx={540} cy={960} r={290} fill="none" stroke={L.purple} strokeWidth={2.5} pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - ease.outExpo(prog(t, 1.0, 2.0)))} transform="rotate(-90 540 960)" />
        </svg>
        <Tooth id="l07" x={540} y={960} size={380} opacity={ease.outExpo(prog(t, 0.1, 0.8))} />
      </Cam>
      <At x={540} y={360}>
        <Headline text={c.title} t={t} at={0.1} size={170} color={L.purple} />
      </At>
      <At x={540} y={490}>
        <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, letterSpacing: 10, color: L.violet, opacity: ease.outExpo(prog(t, 0.6, 1.2)) }}>{c.sub}</span>
      </At>
    </Frame>
  );
};

/* 08 — Enamel cross-section */
export const L08Enamel: React.FC = () => {
  const t = useTime();
  const c = LAV.enamel;
  return (
    <Frame t={t} n={8} label={c.label} kh={c.kh} khAt={0.6} blobs={LILAC_BLOBS}>
      <Grid p={prog(t, 0, 1)} opacity={0.12} />
      <Cam t={t} dur={3} from={1.03} to={1}>
        <CrossSection x={500} y={940} size={560} p={prog(t, 0.1, 1.2)} hot={ease.inOut(prog(t, 1.2, 1.9))} />
        <Callout x={330} y={760} tx={820} ty={640} p={prog(t, 1.3, 1.9)} label="Enamel" color={L.purple} />
      </Cam>
      <At x={540} y={340}>
        <span style={{ display: 'inline-flex', gap: 22, alignItems: 'baseline' }}>
          <Headline text={c.head[0]} t={t} at={0.15} size={96} />
          <Underline p={prog(t, 1.2, 1.9)}>
            <Headline text={c.head[1]} t={t} at={0.35} size={130} color={L.purple} />
          </Underline>
        </span>
      </At>
    </Frame>
  );
};

/* 09 — Gum care */
export const L09Gums: React.FC = () => {
  const t = useTime();
  const c = LAV.gums;
  return (
    <Frame t={t} n={9} label={c.label} kh={c.kh} khAt={0.6} blobs={[{ x: 540, y: 1050, r: 420, color: L.gum, a: 0.35 }, ...LILAC_BLOBS]}>
      <Cam t={t} dur={3} from={1} to={1.04}>
        <Gumline id="l09" cx={540} cy={980} w={780} p={prog(t, 0.1, 0.9)} trace={prog(t, 0.8, 1.8)} />
      </Cam>
      {c.items.map((it, i) => {
        const e = ease.outExpo(prog(t, 1.4 + i * 0.2, 2.0 + i * 0.2));
        return (
          <div key={it} style={{ position: 'absolute', left: 170 + i * 390, top: 1250 + 20 * (1 - e), width: 350, height: 96, borderRadius: 48, background: 'rgba(255,255,255,0.85)', border: `1px solid ${hexA(L.violet, 0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: e, boxShadow: `0 14px 30px ${hexA(L.purple, 0.12)}` }}>
            <span style={{ width: 14, height: 14, borderRadius: 7, background: i ? L.gum : L.violet }} />
            <span style={{ fontFamily: FONT.khmer, fontWeight: 700, fontSize: 34, color: L.plum, lineHeight: 1.5 }}>{it}</span>
          </div>
        );
      })}
      <Head2 t={t} lines={c.head} size={104} y={340} accentLast={true} />
    </Frame>
  );
};

/* 10 — Bacteria and bad breath */
export const L10Bacteria: React.FC = () => {
  const t = useTime();
  const c = LAV.bacteria;
  const tubes = ease.outExpo(prog(t, 1.3, 2.2));
  return (
    <Frame t={t} n={10} label={c.label} kh={c.kh} khAt={0.6} blobs={LILAC_BLOBS}>
      <Cam t={t} dur={3} from={1.05} to={1}>
        <Microbes t={t} seed={510} n={20} p={prog(t, 0, 0.6)} out={prog(t, 0.9, 2.0)} cx={540} cy={950} r={360} />
        <Waveform t={t} p={prog(t, 0.8, 1.8)} y={950} n={5} amp={70} spread={30} />
        <Product shot="tube" x={430} y={1010 + 280 * (1 - tubes)} height={720} rotate={-5} opacity={tubes} sweep={prog(t, 2.1, 2.8)} />
        <Product shot="herbal-tube" x={650} y={1020 + 280 * (1 - tubes)} height={710} rotate={5} opacity={tubes} sweep={prog(t, 2.25, 2.95)} />
      </Cam>
      <Head2 t={t} lines={c.head} size={92} y={320} />
    </Frame>
  );
};

/* 11 — Fresh breath */
export const L11Breath: React.FC = () => {
  const t = useTime();
  const c = LAV.breath;
  const enter = ease.outExpo(prog(t, 0, 0.8));
  const lemons = [0, 1, 2].map((i) => {
    const a = t * 0.8 + (i * 2 * Math.PI) / 3;
    const depth = (Math.sin(a) + 1) / 2;
    return { i, x: 540 + 360 * Math.cos(a) * enter, y: 960 + 110 * Math.sin(a), d: 110 + 90 * depth, depth, rot: t * 30 + i * 70 };
  });
  const lemon = (l: (typeof lemons)[number]) => <LemonSlice3D key={l.i} x={l.x} y={l.y} d={l.d} rotate={l.rot} tilt={35} opacity={enter} blur={l.depth < 0.35 ? 3 : 0} />;
  return (
    <Frame t={t} n={11} label={c.label} kh={c.kh} khAt={0.6} blobs={[{ x: 540, y: 980, r: 460, color: L.cyan, a: 0.12 }, ...LILAC_BLOBS]}>
      <Cam t={t} dur={3} from={1.04} to={1}>
        <Waveform t={t} p={prog(t, 0.2, 1.2)} y={1260} n={5} amp={40} color={L.cyan} />
        {lemons.filter((l) => l.depth < 0.5).map(lemon)}
        <Product shot="tube" x={455} y={960} height={640} rotate={-5} sweep={prog(t, 0.8, 1.6)} />
        <Product shot="herbal-tube" x={630} y={968} height={630} rotate={5} sweep={prog(t, 0.95, 1.75)} />
        {lemons.filter((l) => l.depth >= 0.5).map(lemon)}
        <MintLeaf x={220} y={1320} len={150} rotate={-25 + 6 * Math.sin(t * 1.4)} opacity={enter} />
        <MintLeaf x={880} y={680} len={120} rotate={30 + 6 * Math.sin(t * 1.2)} opacity={enter} blur={2} />
        <Droplets t={t} seed={511} n={10} p={prog(t, 0.3, 1.0)} area={{ x0: 160, x1: 920, y0: 620, y1: 1350 }} />
      </Cam>
      <Head2 t={t} lines={c.head} size={92} y={320} />
    </Frame>
  );
};

/* 12 — Daily oral hygiene */
export const L12Daily: React.FC = () => {
  const t = useTime();
  const c = LAV.daily;
  const card = ease.outExpo(prog(t, 0.2, 0.9));
  return (
    <Frame t={t} n={12} label={c.label} kh={c.kh} khAt={0.7} blobs={LILAC_BLOBS}>
      <Cam t={t} dur={3.5} from={1} to={1.03}>
        <Silhouettes p={prog(t, 1.4, 2.6)} y={1440} n={7} h={120} />
        <div style={{ position: 'absolute', left: 90, top: 640 + 40 * (1 - card), width: 900, height: 560, borderRadius: 44, background: 'rgba(255,255,255,0.8)', border: `1px solid ${hexA(L.violet, 0.25)}`, boxShadow: `0 30px 60px ${hexA(L.purple, 0.14)}`, opacity: card, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 380, background: `radial-gradient(circle at 50% 55%, ${hexA(L.lemon, 0.22)}, transparent 70%)` }} />
          <Product shot="tube" x={150} y={290} height={440} rotate={-6} shadow={false} sweep={prog(t, 1.0, 1.8)} />
          <Product shot="herbal-tube" x={275} y={295} height={430} rotate={6} shadow={false} sweep={prog(t, 1.15, 1.95)} />
          <div style={{ position: 'absolute', left: 410, top: 0, bottom: 0, right: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
            {c.items.map((it, i) => {
              const e = ease.outExpo(prog(t, 0.7 + i * 0.2, 1.3 + i * 0.2));
              return (
                <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: e, transform: `translateX(${20 * (1 - e)}px)` }}>
                  <span style={{ width: 40, height: 2, background: i ? L.lemon : L.purple }} />
                  <span style={{ fontFamily: FONT.khmer, fontWeight: 700, fontSize: 32, color: L.plum, lineHeight: 1.5 }}>{it}</span>
                </div>
              );
            })}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {Array.from({ length: 7 }, (_, d) => {
                const on = prog(t, 1.3 + d * 0.1, 1.42 + d * 0.1);
                return <div key={d} style={{ width: 52, height: 52, borderRadius: 26, border: `1.5px solid ${on > 0.5 ? L.purple : hexA(L.violet, 0.35)}`, background: hexA(L.lilac, 0.6 * on), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, color: on > 0.5 ? L.purple : L.violet }}>✓</div>;
              })}
            </div>
          </div>
        </div>
      </Cam>
      <Head2 t={t} lines={c.head} size={88} y={320} />
    </Frame>
  );
};

/* 13 — Final Zesty Lemon hero */
export const L13Finale: React.FC = () => {
  const t = useTime();
  const c = LAV.finale;
  const tube = ease.outExpo(prog(t, 0.1, 1.2));
  const env = ease.outExpo(prog(t, 0.2, 1.2));
  const word = ease.outExpo(prog(t, 0.4, 1.4));
  return (
    <Frame t={t} n={13} label={c.label} kh={c.kh} khAt={1.4} khSize={32} khY={1680} blobs={[{ x: 540, y: 900, r: 480, color: L.lemon, a: 0.18 }, ...LILAC_BLOBS]}>
      <Cam t={t} dur={4.5} from={1.08} to={1}>
        {/* oversized italic ZESTY LEMON behind the tubes */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: word * 0.9, transform: `scale(${1.06 - 0.06 * word})` }}>
          <span style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 230, lineHeight: 0.95, color: 'transparent', WebkitTextStroke: `2px ${hexA(L.violet, 0.6)}` }}>Zesty</span>
          <span style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 230, lineHeight: 0.95, color: hexA(L.lilac, 0.95) }}>Lemon</span>
        </div>
        <Glow x={540} y={1020} r={440} color={L.lemon} a={0.22 * env} />
        <LemonSlice3D x={180} y={780} d={220 * env} rotate={t * 10} tilt={30} blur={2} />
        <LemonSlice3D x={920} y={1280} d={250 * env} rotate={-t * 12} tilt={25} />
        <LemonSlice3D x={880} y={640} d={120 * env} rotate={t * 18} tilt={40} blur={4} />
        <MintLeaf x={230} y={1380} len={140} rotate={-20 + 5 * Math.sin(t * 1.3)} opacity={env} />
        <Droplets t={t} seed={513} n={12} p={prog(t, 0.4, 1.2)} area={{ x0: 120, x1: 960, y0: 620, y1: 1420 }} />
        <Product shot="tube" x={440} y={1030 + 360 * (1 - tube)} height={820} rotate={-5} opacity={tube} sweep={prog(t, 1.2, 2.0)} />
        <Product shot="herbal-tube" x={650} y={1040 + 360 * (1 - tube)} height={810} rotate={5} opacity={tube} sweep={prog(t, 1.35, 2.15)} />
      </Cam>
      <At x={540} y={330}>
        <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 100, letterSpacing: lerp(40, 22, ease.outExpo(prog(t, 0.8, 1.8))), color: L.plum, opacity: ease.outExpo(prog(t, 0.8, 1.4)), marginRight: -22 }}>{c.brand}</span>
      </At>
      <At x={540} y={430}>
        <span style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 44, color: L.purple, opacity: ease.outExpo(prog(t, 1.2, 1.8)) }}>{c.names}</span>
      </At>
    </Frame>
  );
};
