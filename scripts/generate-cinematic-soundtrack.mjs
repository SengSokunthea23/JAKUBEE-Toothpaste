// Original soundtrack + sound design for the JAKUBEE cinematic theme.
// Pure Node (no dependencies). Reads src/cinematic/timing.json so every cue
// follows the picture.  Run: npm run soundtrack:cinematic
//
// Music: 100 BPM modern ambient-pop bed — Amaj9 · F#m9 · Dmaj9 · E6/9,
// wavetable pads, dotted-eighth delay plucks, light kick/clap/hats with
// gentle sidechain pump. SFX: risers, impacts, whooshes, water, shimmer, pops.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const timing = JSON.parse(fs.readFileSync(path.join(here, '../src/cinematic/timing.json'), 'utf8'));
const FPS = 30;
const SR = 48000;

const START = {};
let fr = 0;
for (const s of timing.scenes) {
  START[s.id] = fr / FPS;
  fr += Math.round(s.duration * FPS);
}
const TOTAL = fr / FPS;
const N = Math.ceil((TOTAL + 0.3) * SR);
const T = (id, dt = 0) => START[id] + dt;

/* ---------------- utilities ---------------- */
let seed = 1234567;
const rnd = () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
};
const noise = () => rnd() * 2 - 1;
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));

const bus = () => [new Float32Array(N), new Float32Array(N)];
const MUSIC = bus(); // ducked by the kick
const DRUMS = bus();
const SFX = bus();
const SEND = bus(); // reverb send
const ARP = bus(); // goes through the delay

/** Mix a mono signal into a stereo bus at time t0 (s) with equal-power pan (-1..1). */
const put = (b, sig, t0, gain = 1, pan = 0) => {
  const i0 = Math.round(t0 * SR);
  const gl = Math.cos(((pan + 1) * Math.PI) / 4) * gain;
  const gr = Math.sin(((pan + 1) * Math.PI) / 4) * gain;
  for (let i = 0; i < sig.length; i++) {
    const j = i0 + i;
    if (j < 0 || j >= N) continue;
    b[0][j] += sig[i] * gl;
    b[1][j] += sig[i] * gr;
  }
};
/** Same, with a pan that moves over the sound (for whooshes). */
const putPan = (b, sig, t0, gain, panFrom, panTo) => {
  const i0 = Math.round(t0 * SR);
  for (let i = 0; i < sig.length; i++) {
    const j = i0 + i;
    if (j < 0 || j >= N) continue;
    const p = panFrom + (panTo - panFrom) * (i / sig.length);
    b[0][j] += sig[i] * Math.cos(((p + 1) * Math.PI) / 4) * gain;
    b[1][j] += sig[i] * Math.sin(((p + 1) * Math.PI) / 4) * gain;
  }
};

/** RBJ biquad with optional per-block cutoff automation. */
const filter = (sig, type, freq, q = 0.707) => {
  const out = new Float32Array(sig.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  let b0 = 0, b1 = 0, b2 = 0, a1 = 0, a2 = 0;
  const set = (f) => {
    const w = (2 * Math.PI * clamp(f, 20, SR * 0.45)) / SR;
    const c = Math.cos(w), s = Math.sin(w), al = s / (2 * q), a0 = 1 + al;
    if (type === 'lp') { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; }
    else if (type === 'hp') { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = (1 + c) / 2; }
    else { b0 = al; b1 = 0; b2 = -al; }
    b0 /= a0; b1 /= a0; b2 /= a0; a1 = (-2 * c) / a0; a2 = (1 - al) / a0;
  };
  const dyn = typeof freq === 'function';
  if (!dyn) set(freq);
  for (let i = 0; i < sig.length; i++) {
    if (dyn && i % 64 === 0) set(freq(i / SR));
    const x = sig[i];
    const y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    out[i] = y;
  }
  return out;
};
const filterBus = (b, type, freq, q) => { b[0].set(filter(b[0], type, freq, q)); b[1].set(filter(b[1], type, freq, q)); };

const make = (dur, fn) => {
  const n = Math.round(dur * SR);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) s[i] = fn(i / SR, i, n);
  return s;
};

/* band-limited saw wavetable */
const TBL = 4096;
const SAW = new Float32Array(TBL);
for (let h = 1; h <= 24; h++) for (let i = 0; i < TBL; i++) SAW[i] += (Math.sin((2 * Math.PI * h * i) / TBL) / h) * (h % 2 ? 1 : 0.85);
const sawAt = (ph) => { const x = (ph - Math.floor(ph)) * TBL; const i = x | 0; const fr2 = x - i; return SAW[i] + (SAW[(i + 1) % TBL] - SAW[i]) * fr2; };

/* ---------------- arrangement ---------------- */
const BPM = 100;
const BEAT = 60 / BPM; // 0.6 s
const BAR = BEAT * 4; // 2.4 s
const CHORDS = [
  { root: 45, notes: [57, 61, 64, 68, 71] }, // Amaj9
  { root: 42, notes: [54, 57, 61, 64, 68] }, // F#m9
  { root: 38, notes: [50, 54, 57, 61, 64] }, // Dmaj9
  { root: 40, notes: [52, 56, 59, 61, 66] }, // E6/9
];
const chordAt = (t) => CHORDS[Math.floor(t / BAR) % 4];

/** Drum intensity by time: 0 off, 0.5 hats only, 1 full groove. */
const drumLevel = (t) => {
  if (t < T('c02-blue-edition', 0.4)) return 0;
  if (t < T('c03-macro')) return 1;
  if (t < T('c04-green-edition', 0.4)) return 0.5;
  if (t < T('c07-price')) return 1;
  if (t < T('c07-price', 0.9)) return 0; // breath before the price hit
  if (t < T('c10-guarantee')) return 1;
  if (t < T('c11-finale', 0.3)) return 0; // guarantee: drums out
  if (t < TOTAL - 1.4) return 1;
  return 0;
};
/** Arp density: 0 none, 1 quarter-note bells, 2 eighth-note plucks. */
const arpLevel = (t) => {
  if (t < T('c01-hero', 2.4)) return 0;
  if (t < T('c02-blue-edition')) return 1;
  if (t < T('c03-macro')) return 2;
  if (t < T('c04-green-edition')) return 1;
  if (t < T('c10-guarantee')) return 2;
  if (t < T('c11-finale')) return 1;
  return t < TOTAL - 1.2 ? 2 : 0;
};

/* ---- pads ---- */
const nBars = Math.ceil(TOTAL / BAR) + 1;
for (let b = 0; b < nBars; b++) {
  const t0 = b * BAR;
  const ch = CHORDS[b % 4];
  const len = BAR + 1.0;
  ch.notes.forEach((m, k) => {
    const f = mtof(m);
    const det = [-0.07, 0, 0.07];
    const ph = det.map(() => rnd());
    const sig = make(len, (t) => {
      const env = clamp(t / 0.7) * clamp((len - t) / 0.9);
      let s = 0;
      det.forEach((d, j) => { s += sawAt(ph[j] + f * Math.pow(2, d / 12) * t); });
      return (s / 3) * env;
    });
    put(MUSIC, sig, t0, 0.05, (k / (ch.notes.length - 1)) * 1.2 - 0.6);
    put(SEND, sig, t0, 0.02, 0);
  });
}
// pad brightness automation: dark intro → open; dips at the colour change and guarantee
const padCut = (t) => {
  const base = 600 + 1900 * clamp((t - 0.5) / 4.5);
  let c = base;
  const shift = T('c04-green-edition');
  if (t > shift - 1.2 && t < shift + 1.4) c *= 0.45 + 0.55 * Math.abs((t - shift) / 1.3);
  if (t > T('c10-guarantee') && t < T('c11-finale')) c *= 0.6;
  if (t > T('c11-finale')) c = 3200;
  return c;
};
filterBus(MUSIC, 'lp', padCut, 0.8);

/* ---- bass (enters with the groove) ---- */
for (let b = 0; b < nBars; b++) {
  const t0 = b * BAR;
  const ch = CHORDS[b % 4];
  const f = mtof(ch.root);
  [0, 1.5, 2, 3].forEach((beat, k) => {
    const tt = t0 + beat * BEAT;
    if (drumLevel(tt) < 1) return;
    const d = k === 1 ? BEAT * 0.45 : BEAT * 0.9;
    const sig = make(d, (t) => (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t)) * clamp(t / 0.01) * clamp((d - t) / 0.06));
    put(MUSIC, sig, tt, k === 1 ? 0.09 : 0.13);
  });
}

/* ---- arp / bells (through the delay) ---- */
const pluck = (f, dur = 0.7, bright = 1) =>
  make(dur, (t) => (Math.sin(2 * Math.PI * f * t) + 0.35 * bright * Math.sin(4 * Math.PI * f * t) + 0.12 * bright * Math.sin(6 * Math.PI * f * t)) * Math.exp(-t * 6) * clamp(t / 0.003));
const bell = (f, dur = 2.2) =>
  make(dur, (t) => (Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 3) + 0.2 * Math.sin(2 * Math.PI * f * 5.4 * t) * Math.exp(-t * 6)) * Math.exp(-t * 2.2) * clamp(t / 0.004));
const ARP_SEQ = [0, 2, 4, 3, 1, 4, 2, 3];
for (let k = 0; k * (BEAT / 2) < TOTAL; k++) {
  const tt = k * (BEAT / 2);
  const lv = arpLevel(tt);
  if (lv === 0) continue;
  const ch = chordAt(tt);
  if (lv === 2) {
    const m = ch.notes[ARP_SEQ[k % 8]] + 12;
    put(ARP, pluck(mtof(m)), tt, k % 2 ? 0.035 : 0.05, k % 2 ? 0.4 : -0.4);
  } else if (k % 2 === 0) {
    const m = ch.notes[ARP_SEQ[(k / 2) % 8]] + 24;
    put(ARP, bell(mtof(m)), tt, 0.022, ((k / 2) % 2 ? 0.5 : -0.5));
  }
}
// ping-pong dotted-eighth delay
{
  const D = Math.round(BEAT * 0.75 * SR);
  const [l, r] = ARP;
  for (let i = D; i < N; i++) {
    l[i] += r[i - D] * 0.38;
    r[i] += l[i - D] * 0.38;
  }
  filterBus(ARP, 'hp', 250);
  for (let i = 0; i < N; i++) { MUSIC[0][i] += l[i]; MUSIC[1][i] += r[i]; SEND[0][i] += l[i] * 0.3; SEND[1][i] += r[i] * 0.3; }
}

/* ---- drums ---- */
const kicks = [];
const kick = make(0.45, (t) => Math.sin(2 * Math.PI * (48 * t + (70 / 28) * (1 - Math.exp(-t * 28)))) * Math.exp(-t * 7.5) + (t < 0.004 ? noise() * 0.3 : 0));
const clap = (() => {
  const raw = make(0.35, (t) => {
    const bursts = [0, 0.011, 0.022].reduce((a, o) => a + (t >= o ? Math.exp(-(t - o) * (o === 0.022 ? 18 : 140)) : 0), 0);
    return noise() * bursts;
  });
  return filter(filter(raw, 'bp', 1400, 0.9), 'hp', 500);
})();
const hat = filter(make(0.06, (t) => noise() * Math.exp(-t * 85)), 'hp', 7500);
const shaker = filter(make(0.09, (t) => noise() * Math.sin(Math.PI * clamp(t / 0.09)) ** 2), 'hp', 6000);
for (let k = 0; k * (BEAT / 4) < TOTAL; k++) {
  const tt = k * (BEAT / 4);
  const lv = drumLevel(tt);
  if (lv === 0) continue;
  const step = k % 16;
  if (lv === 1 && (step === 0 || step === 8 || (step === 14 && Math.floor(k / 16) % 2 === 1))) {
    put(DRUMS, kick, tt, step === 14 ? 0.35 : 0.55);
    kicks.push(tt);
  }
  if (lv === 1 && (step === 4 || step === 12)) { put(DRUMS, clap, tt, 0.16, 0.05); put(SEND, clap, tt, 0.08); }
  if (step % 2 === 0) put(DRUMS, hat, tt, (step % 4 === 2 ? 0.06 : 0.03) * (lv === 1 ? 1 : 0.8), 0.25);
  if (lv === 1 && step % 2 === 1) put(DRUMS, shaker, tt, 0.018, -0.3);
}
// sidechain pump on the music bus
{
  const g = new Float32Array(N).fill(1);
  for (const tk of kicks) {
    const i0 = Math.round(tk * SR);
    for (let i = 0; i < SR * 0.4 && i0 + i < N; i++) g[i0 + i] = Math.min(g[i0 + i], 1 - 0.38 * Math.exp(-(i / SR) / 0.11));
  }
  for (let i = 0; i < N; i++) { MUSIC[0][i] *= g[i]; MUSIC[1][i] *= g[i]; }
}

/* ---------------- sound design ---------------- */
/** Filtered-noise whoosh with a rise-and-fall band and moving pan. */
const whoosh = (dur = 0.8, lo = 300, hi = 3200) => {
  const raw = make(dur, () => noise());
  const f = filter(raw, 'bp', (t) => lo + (hi - lo) * Math.sin(Math.PI * clamp(t / dur)), 1.2);
  return f.map((x, i) => x * Math.sin(Math.PI * clamp(i / f.length)) ** 2);
};
/** Rising tension sweep that ends exactly at its length. */
const riser = (dur = 1.0) => {
  const raw = make(dur, () => noise());
  const nz = filter(raw, 'bp', (t) => 250 * Math.pow(30, t / dur), 2);
  return make(dur, (t, i) => {
    const e = Math.pow(t / dur, 2.2);
    const tone = Math.sin(2 * Math.PI * (220 * Math.pow(4, t / dur)) * t) * 0.18;
    return (nz[i] * 1.4 + tone) * e;
  });
};
/** Deep, soft cinematic impact (kept above 35 Hz to avoid mud). */
const impact = (weight = 1) => {
  const body = make(1.6, (t) => Math.sin(2 * Math.PI * (42 * t + (60 / 14) * (1 - Math.exp(-t * 14)))) * Math.exp(-t * 3.2));
  const air = filter(make(1.6, (t) => noise() * Math.exp(-t * 6)), 'lp', 1400);
  const mixd = body.map((x, i) => x * weight + air[i] * 0.35);
  return filter(mixd, 'hp', 35);
};
/** Elegant shimmer: high chord partials with staggered entrances and tremolo. */
const shimmer = (notes = [81, 85, 88, 92, 95], dur = 2.6) => {
  const out = new Float32Array(Math.round(dur * SR));
  notes.forEach((m, k) => {
    const f = mtof(m), off = Math.round(k * 0.05 * SR);
    for (let i = off; i < out.length; i++) {
      const t = (i - off) / SR;
      out[i] += Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 1.6) * (0.75 + 0.25 * Math.sin(2 * Math.PI * 7 * t + k)) * clamp(t / 0.01);
    }
  });
  return out;
};
/** Water droplet "bloop". */
const droplet = (f0 = 900) => make(0.14, (t) => Math.sin(2 * Math.PI * f0 * (t + 9 * t * t)) * Math.exp(-t * 38) * clamp(t / 0.002));
/** Liquid splash: shaped band noise + a few droplets. */
const splash = () => {
  const base = filter(make(0.7, (t) => noise() * (t < 0.015 ? t / 0.015 : Math.exp(-(t - 0.015) * 7))), 'bp', (t) => 2600 - 1400 * t, 0.8);
  const out = new Float32Array(base.length + SR / 2);
  out.set(base);
  for (let k = 0; k < 6; k++) {
    const d = droplet(700 + rnd() * 900);
    const o = Math.round((0.05 + rnd() * 0.45) * SR);
    for (let i = 0; i < d.length && o + i < out.length; i++) out[o + i] += d[i] * 0.5;
  }
  return out;
};
/** Soft UI pop / text accent. */
const pop = (f = 700) => make(0.09, (t) => Math.sin(2 * Math.PI * (f + 500 * (t / 0.09)) * t) * Math.exp(-t * 45));
/** Tiny digital tick. */
const tick = (f = 2400) => make(0.025, (t) => Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 260));
/** Product landing: refined low thump + felt click. */
const thump = () => filter(make(0.35, (t) => Math.sin(2 * Math.PI * (55 * t + (40 / 30) * (1 - Math.exp(-t * 30)))) * Math.exp(-t * 11) + (t < 0.006 ? noise() * 0.25 : 0)), 'hp', 40);
/** Reverse swell into a reveal (pad chord growing, cut sharp). */
const reverseSwell = (notes, dur = 1.2) => make(dur, (t) => notes.reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / notes.length * Math.pow(t / dur, 3));

const cue = []; // printed cue sheet
const S = (label, sig, t, gain, pan = 0, send = 0.25) => {
  put(SFX, sig, t, gain, pan);
  if (send) put(SEND, sig, t, gain * send, pan);
  cue.push([t, label]);
};
const W = (label, sig, t, gain, p0, p1) => {
  putPan(SFX, sig, t, gain, p0, p1);
  putPan(SEND, sig, t, gain * 0.25, p0, p1);
  cue.push([t, label]);
};

// 01 — hero
S('Riser into dual reveal', riser(1.3), 0.15, 0.22, 0, 0.3);
S('Deep soft impact — products in focus', impact(1), T('c01-hero', 1.45), 0.55);
S('Reverse swell', reverseSwell([57, 64, 71], 0.9), T('c01-hero', 0.55), 0.07, 0, 0.5);
S('Text accent', pop(620), T('c01-hero', 1.35), 0.09, -0.2);
S('Text accent', pop(760), T('c01-hero', 1.7), 0.09, 0.2);
S('Floor ripple droplet', droplet(820), T('c01-hero', 1.5), 0.12);
S('Shimmer — light sweep', shimmer(), T('c01-hero', 2.6), 0.07, 0, 0.6);

// 02 — blue edition (liquid transition in)
W('Liquid whoosh', whoosh(0.9, 250, 2400), T('c02-blue-edition', -0.15), 0.32, -0.5, 0.4);
S('Splash', splash(), T('c02-blue-edition', 0.55), 0.22);
S('Title accent', pop(680), T('c02-blue-edition', 0.85), 0.08, -0.4);
S('Shimmer — sweep', shimmer([88, 92, 95, 100]), T('c02-blue-edition', 2.0), 0.05, 0.3, 0.6);
S('Label tick', tick(2200), T('c02-blue-edition', 2.35), 0.1, -0.5);
S('Label tick', tick(2600), T('c02-blue-edition', 2.75), 0.1, -0.5);
for (let k = 0; k < 7; k++) S('Water droplet', droplet(700 + rnd() * 700), T('c02-blue-edition', 1.2 + k * 0.55 + rnd() * 0.2), 0.06, rnd() * 1.4 - 0.7, 0.4);

// 03 — macro (camera push in)
W('Camera push whoosh', whoosh(0.7, 400, 3600), T('c03-macro', -0.2), 0.3, 0.3, -0.3);
S('Soft impact', impact(0.6), T('c03-macro', 0.35), 0.25);
for (let k = 0; k < 5; k++) S('Condensation droplet', droplet(1000 + rnd() * 600), T('c03-macro', 0.8 + k * 0.45), 0.05, rnd() - 0.5, 0.5);
S('Focus bracket — digital accent', tick(3000), T('c03-macro', 2.75), 0.14);
S('Focus bracket — digital accent', tick(3600), T('c03-macro', 2.83), 0.1);
S('Info chip pop', pop(820), T('c03-macro', 3.05), 0.09);

// 04 — blue → green colour shift
S('Riser into colour change', riser(1.0), T('c04-green-edition', -0.9), 0.18, 0, 0.4);
W('Colour-shift sweep', whoosh(1.4, 200, 2000), T('c04-green-edition', -0.1), 0.26, 0.5, -0.5);
S('Shimmer — green light', shimmer([76, 80, 83, 88, 90]), T('c04-green-edition', 0.3), 0.08, 0, 0.7);
S('Title accent', pop(640), T('c04-green-edition', 0.85), 0.08, 0.4);
S('Label tick', tick(2200), T('c04-green-edition', 2.35), 0.1, 0.5);
S('Label tick', tick(2600), T('c04-green-edition', 2.75), 0.1, 0.5);
S('Airy leaf texture', filter(make(2.5, (t) => noise() * Math.sin(Math.PI * t / 2.5) ** 2), 'bp', (t) => 900 + 600 * Math.sin(t * 2), 0.6), T('c04-green-edition', 1.0), 0.05, 0, 0.3);

// 05 — benefits (light sweep in)
W('Light-sweep whoosh', whoosh(0.8, 800, 5000), T('c05-benefits', -0.1), 0.24, -0.7, 0.7);
S('Shimmer', shimmer([81, 85, 88, 93]), T('c05-benefits', 0.3), 0.05, 0, 0.6);
for (let k = 0; k < 4; k++) S(`Benefit card ${k + 1} pop`, pop(600 + k * 90), T('c05-benefits', 1.75 + k * 0.28), 0.1, k % 2 ? 0.35 : -0.35);

// 06 — fresh (iris in)
W('Iris whoosh', whoosh(0.8, 300, 2600), T('c06-fresh', -0.1), 0.26, 0, 0);
for (let k = 0; k < 26; k++) S('Foam bubbles', droplet(1100 + rnd() * 1400), T('c06-fresh', 0.5 + rnd() * 2.2), 0.035, rnd() * 1.6 - 0.8, 0.3);
S('Title accent', pop(700), T('c06-fresh', 0.5), 0.08);
S('Pill pop', pop(860), T('c06-fresh', 2.0), 0.1);

// 07 — price (directional blur slide in)
W('Whip-pan whoosh', whoosh(0.6, 500, 4200), T('c07-price', -0.05), 0.34, 0.8, -0.8);
S('Short rising sweep', riser(0.55), T('c07-price', 0.45), 0.2, 0, 0.2);
S('Clean price impact', impact(0.85), T('c07-price', 1.0), 0.5);
S('Price accent', shimmer([88, 92, 95]), T('c07-price', 1.0), 0.05, 0, 0.6);
S('Tube landing', thump(), T('c07-price', 1.17), 0.3, -0.2, 0.1);
S('Tube landing', thump(), T('c07-price', 1.32), 0.26, 0.2, 0.1);
S('Floor ripple', droplet(760), T('c07-price', 1.35), 0.08);
S('Promotion tag pop', pop(900), T('c07-price', 1.65), 0.1, 0.5);
S('Shimmer — sweep', shimmer([93, 97, 100]), T('c07-price', 1.9), 0.04, 0, 0.6);

// 08 — bundle
W('Camera push whoosh', whoosh(0.7, 400, 3600), T('c08-bundle', -0.2), 0.28, -0.3, 0.3);
[0, 1, 2, 3].forEach((i) => {
  S(`Tube ${i + 1} landing`, thump(), T('c08-bundle', 0.5 + i * 0.22 + 0.17), 0.24, -0.6 + i * 0.4, 0.1);
  S(`Tube ${i + 1} note`, droplet([700, 830, 990, 1180][i]), T('c08-bundle', 0.5 + i * 0.22 + 0.2), 0.08, -0.6 + i * 0.4, 0.4);
});
S('Short rising sweep', riser(0.6), T('c08-bundle', 1.35), 0.2, 0, 0.2);
S('Clean price impact', impact(0.85), T('c08-bundle', 1.95), 0.48);
W('Panel whoosh', whoosh(0.5, 600, 3000), T('c08-bundle', 2.55), 0.16, -0.4, 0.4);
for (let k = 0; k < 12; k++) {
  const p = k / 11; // ticks slow down with the counter's ease-out
  S('Province counter tick', tick(2000 + k * 60), T('c08-bundle', 2.9 + 1.2 * (1 - Math.pow(1 - p, 0.5)) * 0.9), 0.07, 0, 0);
}
S('Counter lands', pop(980), T('c08-bundle', 4.0), 0.1);

// 09 — wholesale (liquid in)
W('Liquid whoosh', whoosh(0.8, 250, 2400), T('c09-wholesale', -0.1), 0.28, 0.5, -0.4);
S('Splash', splash(), T('c09-wholesale', 0.45), 0.16);
for (let i = 0; i < 5; i++) S('Pack settles', thump(), T('c09-wholesale', 0.85 + [0, 0.1, 0.25, 0.35, 0.45][i]), 0.12, -0.5 + i * 0.25, 0.05);
S('Clean price impact', impact(0.8), T('c09-wholesale', 1.2), 0.46);
S('Shimmer — sweep', shimmer([86, 90, 93, 98]), T('c09-wholesale', 1.8), 0.045, 0, 0.6);
S('Chip pop', pop(820), T('c09-wholesale', 1.7), 0.09);

// 10 — guarantee (iris in, music breathes)
W('Iris whoosh', whoosh(0.7, 300, 2200), T('c10-guarantee', -0.1), 0.22, 0, 0);
S('Ring draw swell', reverseSwell([69, 76, 81], 1.0), T('c10-guarantee', 0.2), 0.06, 0, 0.6);
S('Guarantee chime', shimmer([81, 85, 88, 93, 97]), T('c10-guarantee', 1.25), 0.09, 0, 0.8);
S('Soft impact', impact(0.5), T('c10-guarantee', 1.25), 0.22);

// 11 — finale
S('Riser into finale', riser(1.1), T('c11-finale', -1.0), 0.24, 0, 0.3);
W('Light-sweep whoosh', whoosh(0.8, 800, 5000), T('c11-finale', -0.1), 0.24, 0.7, -0.7);
S('Premium cinematic impact', impact(1.1), T('c11-finale', 0.3), 0.6);
S('Elegant shimmer', shimmer([81, 85, 88, 92, 95, 100]), T('c11-finale', 0.35), 0.07, 0, 0.8);
S('Floor ripple', droplet(800), T('c11-finale', 1.0), 0.08);
for (let i = 0; i < 3; i++) S(`Offer chip ${i + 1}`, pop(650 + i * 120), T('c11-finale', 1.5 + i * 0.15), 0.1, -0.5 + i * 0.5);
S('CTA accent', impact(0.4), T('c11-finale', 2.3), 0.2);
S('CTA shimmer', shimmer([88, 92, 95, 100]), T('c11-finale', 2.3), 0.06, 0, 0.7);
S('Final resolve chord', make(3.2, (t) => [57, 64, 68, 71, 76].reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / 5 * clamp(t / 0.05) * Math.exp(-t * 0.9)), TOTAL - 2.0, 0.09, 0, 0.8);

// ambient air bed (very quiet)
{
  const air = filter(make(TOTAL, () => noise()), 'bp', (t) => 500 + 300 * Math.sin(t * 0.3), 0.5);
  put(SFX, air.map((x, i) => x * clamp(i / SR / 1.5)), 0, 0.012, 0);
}

/* ---------------- reverb (Freeverb-style) ---------------- */
const reverb = (inp, spread) => {
  const sc = SR / 44100;
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((d) => ({ buf: new Float32Array(Math.round((d + spread) * sc)), i: 0, f: 0 }));
  const aps = [556, 441, 341, 225].map((d) => ({ buf: new Float32Array(Math.round((d + spread) * sc)), i: 0 }));
  const out = new Float32Array(N);
  const fb = 0.86, damp = 0.25;
  for (let n = 0; n < N; n++) {
    const x = inp[n] * 0.015;
    let y = 0;
    for (const c of combs) {
      const o = c.buf[c.i];
      c.f = o * (1 - damp) + c.f * damp;
      c.buf[c.i] = x + c.f * fb;
      c.i = (c.i + 1) % c.buf.length;
      y += o;
    }
    for (const a of aps) {
      const b = a.buf[a.i];
      a.buf[a.i] = y + b * 0.5;
      a.i = (a.i + 1) % a.buf.length;
      y = b - y;
    }
    out[n] = y;
  }
  return out;
};
const revL = filter(reverb(SEND[0], 0), 'hp', 180);
const revR = filter(reverb(SEND[1], 23), 'hp', 180);

/* ---------------- master ---------------- */
const L = new Float32Array(N);
const R = new Float32Array(N);
for (let i = 0; i < N; i++) {
  L[i] = MUSIC[0][i] + DRUMS[0][i] + SFX[0][i] + revL[i] * 0.9;
  R[i] = MUSIC[1][i] + DRUMS[1][i] + SFX[1][i] + revR[i] * 0.9;
}
const Lh = filter(L, 'hp', 28);
const Rh = filter(R, 'hp', 28);
// gentle soft-clip limiter, then normalise to -1 dBFS
let peak = 0;
for (let i = 0; i < N; i++) {
  Lh[i] = Math.tanh(Lh[i] * 1.6) / 1.6;
  Rh[i] = Math.tanh(Rh[i] * 1.6) / 1.6;
  peak = Math.max(peak, Math.abs(Lh[i]), Math.abs(Rh[i]));
}
const norm = Math.pow(10, -1 / 20) / peak;
// short master fade-in
const fadeIn = Math.round(0.05 * SR);

const dataBytes = N * 4;
const wav = Buffer.alloc(44 + dataBytes);
wav.write('RIFF', 0); wav.writeUInt32LE(36 + dataBytes, 4); wav.write('WAVE', 8);
wav.write('fmt ', 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(SR, 24); wav.writeUInt32LE(SR * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34);
wav.write('data', 36); wav.writeUInt32LE(dataBytes, 40);
for (let i = 0; i < N; i++) {
  const g = norm * Math.min(1, i / fadeIn);
  wav.writeInt16LE(Math.round(clamp(Lh[i] * g, -1, 1) * 32767), 44 + i * 4);
  wav.writeInt16LE(Math.round(clamp(Rh[i] * g, -1, 1) * 32767), 46 + i * 4);
}
const OUT = path.join(here, '../public/audio/cinematic-soundtrack.wav');
fs.writeFileSync(OUT, wav);

const fmt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
console.log(`✓ ${path.relative(process.cwd(), OUT)}  ${TOTAL.toFixed(2)} s @ ${BPM} BPM, peak −1 dBFS`);
if (process.argv.includes('--cues')) for (const [t, l] of cue.sort((a, b) => a[0] - b[0])) console.log(`  ${fmt(t)}  ${l}`);
