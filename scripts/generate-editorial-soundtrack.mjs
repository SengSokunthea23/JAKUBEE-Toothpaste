// Original soundtrack + UI sound design for Theme 03 (Cinematic Editorial × Premium Digital).
// Reads src/editorial/timing.json so every cue follows the picture.
// Run: npm run soundtrack:editorial   (add --cues to print the cue sheet)
//
// Music: 110 BPM clean electronic pop — Emaj9 · C#m9 · Amaj9 · B6/9; airy pads,
// FM-style keys, light kick/snap/hats, gentle sidechain. SFX: UI clicks, keystrokes,
// card whooshes, droplets, bubbles, price impacts, shimmer.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createKit, sceneStarts } from './lib/audio-kit.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const timing = JSON.parse(fs.readFileSync(path.join(here, '../src/editorial/timing.json'), 'utf8'));
const { start: START, total: TOTAL } = sceneStarts(timing);
const T = (id, dt = 0) => START[id] + dt;
const K = createKit({ seconds: TOTAL + 0.3, seed: 31337 });
const { SR, N, rnd, mtof, clamp, bus, put, putPan, filterBus } = K;

const MUSIC = bus(), DRUMS = bus(), SFX = bus(), SEND = bus(), ARP = bus();

/* ---------------- arrangement ---------------- */
const BPM = 110, BEAT = 60 / BPM, BAR = BEAT * 4;
const CHORDS = [
  { root: 40, notes: [64, 68, 71, 75, 78] }, // Emaj9
  { root: 37, notes: [61, 64, 68, 71, 75] }, // C#m9
  { root: 45, notes: [57, 61, 64, 68, 71] }, // Amaj9
  { root: 47, notes: [59, 63, 66, 68, 73] }, // B6/9
];
const chordAt = (t) => CHORDS[Math.floor(t / BAR) % 4];

const drumLevel = (t) => {
  if (t < T('e02-blueberry', 0.2)) return 0;
  if (t < T('e04-cleansing')) return 1;
  if (t < T('e05-green', 0.3)) return 0.5; // search typing: hats only, keystrokes lead
  if (t < T('e09-glow')) return 1;
  if (t < T('e10-price', 0.3)) return 0; // glow: breathing room
  if (t < T('e13-guarantee')) return 1;
  if (t < T('e14-finale', 0.6)) return 0; // guarantee: drums out
  return t < TOTAL - 1.6 ? 1 : 0;
};
const keysLevel = (t) => {
  if (t < 1.0) return 0;
  if (t < T('e02-blueberry')) return 1;
  if (t < T('e09-glow')) return 2;
  if (t < T('e10-price')) return 1;
  if (t < T('e13-guarantee')) return 2;
  if (t < T('e14-finale')) return 1;
  return t < TOTAL - 1.2 ? 2 : 0;
};

// pads
const nBars = Math.ceil(TOTAL / BAR) + 1;
for (let b = 0; b < nBars; b++) {
  const ch = CHORDS[b % 4];
  const sig = K.pad(ch.notes, BAR + 0.9);
  put(MUSIC, sig, b * BAR, 0.045, b % 2 ? 0.25 : -0.25);
  put(SEND, sig, b * BAR, 0.02);
}
filterBus(MUSIC, 'lp', (t) => {
  let c = 900 + 2300 * clamp(t / 5);
  if (t > T('e09-glow') - 0.3 && t < T('e10-price')) c = 1700;
  if (t > T('e13-guarantee') && t < T('e14-finale')) c = 1500;
  return c;
}, 0.7);

// bass
for (let b = 0; b < nBars; b++) {
  const ch = CHORDS[b % 4];
  const f = mtof(ch.root);
  [0, 1.5, 2.5, 3].forEach((beat, k) => {
    const tt = b * BAR + beat * BEAT;
    if (drumLevel(tt) < 1) return;
    const d = BEAT * (k === 1 || k === 2 ? 0.45 : 0.85);
    put(MUSIC, K.make(d, (t) => (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t)) * clamp(t / 0.008) * clamp((d - t) / 0.05)), tt, k === 0 ? 0.13 : 0.09);
  });
}

// keys / arps through a dotted-eighth delay
const SEQ = [0, 2, 4, 1, 3, 4, 2, 1];
for (let k = 0; k * (BEAT / 2) < TOTAL; k++) {
  const tt = k * (BEAT / 2);
  const lv = keysLevel(tt);
  if (!lv) continue;
  const ch = chordAt(tt);
  if (lv === 2) {
    if (k % 8 === 3 || k % 8 === 7) continue; // syncopated gaps
    put(ARP, K.keys(mtof(ch.notes[SEQ[k % 8]] + 12), 0.9), tt, 0.04, k % 2 ? 0.35 : -0.35);
  } else if (k % 2 === 0) {
    put(ARP, K.bell(mtof(ch.notes[SEQ[(k / 2) % 8]] + 24)), tt, 0.02, (k / 2) % 2 ? 0.5 : -0.5);
  }
}
{
  const D = Math.round(BEAT * 0.75 * SR);
  for (let i = D; i < N; i++) { ARP[0][i] += ARP[1][i - D] * 0.33; ARP[1][i] += ARP[0][i - D] * 0.33; }
  filterBus(ARP, 'hp', 280);
  for (let i = 0; i < N; i++) { MUSIC[0][i] += ARP[0][i]; MUSIC[1][i] += ARP[1][i]; SEND[0][i] += ARP[0][i] * 0.3; SEND[1][i] += ARP[1][i] * 0.3; }
}

// drums
const kicks = [];
const KICK = K.kick(), SNAP = K.snap(), HAT = K.hat(), OHAT = K.hat(true), SHK = K.shaker();
for (let k = 0; k * (BEAT / 4) < TOTAL; k++) {
  const tt = k * (BEAT / 4);
  const lv = drumLevel(tt);
  if (!lv) continue;
  const st = k % 16;
  if (lv === 1 && (st === 0 || st === 10 || (st === 8 && Math.floor(k / 16) % 2 === 1))) { put(DRUMS, KICK, tt, st === 0 ? 0.5 : 0.38); kicks.push(tt); }
  if (lv === 1 && (st === 4 || st === 12)) { put(DRUMS, SNAP, tt, 0.15, 0.08); put(SEND, SNAP, tt, 0.07); }
  if (st % 2 === 0) put(DRUMS, HAT, tt, st % 4 === 2 ? 0.05 : 0.025, 0.25);
  if (lv === 1 && st === 14) put(DRUMS, OHAT, tt, 0.025, 0.3);
  if (lv === 1 && st % 2 === 1) put(DRUMS, SHK, tt, 0.014, -0.3);
}
{
  const g = new Float32Array(N).fill(1);
  for (const tk of kicks) {
    const i0 = Math.round(tk * SR);
    for (let i = 0; i < SR * 0.35 && i0 + i < N; i++) g[i0 + i] = Math.min(g[i0 + i], 1 - 0.32 * Math.exp(-(i / SR) / 0.1));
  }
  for (let i = 0; i < N; i++) { MUSIC[0][i] *= g[i]; MUSIC[1][i] *= g[i]; }
}

/* ---------------- sound design ---------------- */
const cue = [];
const S = (label, sig, t, gain, pan = 0, send = 0.2) => { put(SFX, sig, t, gain, pan); if (send) put(SEND, sig, t, gain * send, pan); cue.push([t, label]); };
const W = (label, sig, t, gain, p0, p1) => { putPan(SFX, sig, t, gain, p0, p1); putPan(SEND, sig, t, gain * 0.2, p0, p1); cue.push([t, label]); };
const cardWhoosh = (label, t, pan = 0) => { W(label, K.whoosh(0.55, 500, 2600), t, 0.14, pan - 0.3, pan + 0.3); };

// 01 — two editions
S('Reverse swell — gradient intro', K.swell([64, 71, 75], 1.0), 0.0, 0.06, 0, 0.5);
cardWhoosh('Product card A rises', T('e01-two-editions', 0.45), -0.4);
cardWhoosh('Product card B rises', T('e01-two-editions', 0.65), 0.4);
S('Soft impact — cards land', K.impact(0.55), T('e01-two-editions', 1.05), 0.3);
[1.3, 1.45, 1.55].forEach((d, i) => S('Geometric piece snaps in', K.pop(700 + i * 120), T('e01-two-editions', d + 0.2), 0.08, [-0.6, 0.6, 0.5][i]));
W('Underline draw', K.whoosh(0.4, 1500, 5000), T('e01-two-editions', 2.0), 0.08, -0.4, 0.4);
S('Shimmer — light sweep', K.shimmer(), T('e01-two-editions', 2.6), 0.06, 0, 0.6);

// 02 — blueberry (circle reveal)
W('Circle-reveal whoosh', K.whoosh(0.8, 300, 2800), T('e02-blueberry', -0.1), 0.24, 0, 0);
S('Product reveal impact', K.impact(0.8), T('e02-blueberry', 0.75), 0.36);
for (let k = 0; k < 6; k++) S('Water droplet', K.droplet(700 + rnd() * 700), T('e02-blueberry', 0.9 + k * 0.6 + rnd() * 0.2), 0.05, rnd() * 1.2 - 0.6, 0.4);
S('Label card pop', K.pop(760), T('e02-blueberry', 1.55), 0.08, -0.4);
S('Label card pop', K.pop(860), T('e02-blueberry', 1.95), 0.08, -0.3);
S('Shimmer — sweep', K.shimmer([88, 92, 95, 99]), T('e02-blueberry', 2.0), 0.045, 0.3, 0.6);

// 03 — oily / acne (floating-card transition)
W('Card transition — layered whoosh', K.whoosh(0.9, 250, 2200), T('e03-oily-acne', -0.1), 0.22, 0.2, -0.2);
[0, 1, 2].forEach((i) => S('Keyword highlight click', K.click(1600 + i * 200), T('e03-oily-acne', 1.0 + i * 0.4), 0.12, -0.3 + i * 0.3, 0));
[0, 1, 2, 3].forEach((i) => S(`Benefit panel ${i + 1}`, K.pop(620 + i * 80), T('e03-oily-acne', 1.75 + i * 0.32), 0.08, 0.2));

// 04 — cleansing: search interface
W('Gradient-wipe sweep', K.whoosh(0.8, 600, 4200), T('e04-cleansing', -0.1), 0.18, -0.7, 0.7);
cardWhoosh('Search bar slides in', T('e04-cleansing', 0.5));
{
  const qs = ['SKINCARE', 'FRESHNESS', 'DAILY CLEANSING'];
  qs.forEach((q, qi) => {
    for (let c = 0; c < q.length; c++) {
      const tt = T('e04-cleansing', 0.5 + 0.45 + qi * 0.9 + c * 0.045);
      if (q[c] !== ' ') S('Keystroke', K.key(), tt, 0.09, 0.1, 0);
    }
  });
}
S('Search enter click', K.click(1400), T('e04-cleansing', 3.05), 0.16, 0, 0);
cardWhoosh('Result card rises', T('e04-cleansing', 3.15));
S('Result lands', K.impact(0.45), T('e04-cleansing', 3.5), 0.22);
for (let k = 0; k < 10; k++) S('Bubbles', K.droplet(1200 + rnd() * 1300), T('e04-cleansing', 3.8 + rnd() * 1.6), 0.03, rnd() * 1.4 - 0.7, 0.3);

// 05 — green (colour morph)
S('Riser into colour change', K.riser(0.9), T('e05-green', -0.75), 0.14, 0, 0.4);
W('Colour-morph sweep', K.whoosh(1.2, 200, 1800), T('e05-green', 0.0), 0.2, 0.5, -0.5);
S('Shimmer — green light', K.shimmer([76, 80, 83, 87, 90]), T('e05-green', 0.5), 0.06, 0, 0.7);
S('Product reveal impact', K.impact(0.75), T('e05-green', 0.85), 0.32);
[1.25, 1.5, 1.95].forEach((d, i) => S('Badge pop', K.pop(700 + i * 100), T('e05-green', d), 0.08, 0.4));
S('Airy leaf texture', K.filter(K.make(2.4, (t) => K.noise() * Math.sin((Math.PI * t) / 2.4) ** 2), 'bp', (t) => 900 + 600 * Math.sin(t * 2), 0.6), T('e05-green', 0.6), 0.04, 0, 0.3);

// 06 — dry skin
W('Card transition — layered whoosh', K.whoosh(0.9, 250, 2200), T('e06-dry-skin', -0.1), 0.22, -0.2, 0.2);
for (let k = 0; k < 6; k++) S('Hydration ripple drop', K.droplet(820 + k * 30), T('e06-dry-skin', 0.85 + k * 0.74), 0.05, -0.5, 0.5);
[0, 1, 2, 3].forEach((i) => S(`Benefit panel ${i + 1}`, K.pop(620 + i * 80), T('e06-dry-skin', 1.35 + i * 0.32), 0.08, 0.3));

// 07 — daily makeup (phone)
W('Focus-pull sweep', K.whoosh(0.6, 400, 2400), T('e07-daily-makeup', -0.05), 0.16, 0, 0);
W('Phone rises — 3D whoosh', K.whoosh(0.9, 200, 2000), T('e07-daily-makeup', 0.85), 0.22, 0.4, -0.1);
S('Phone settles', K.thump(), T('e07-daily-makeup', 1.45), 0.18);
W('Underline draw', K.whoosh(0.4, 1500, 5000), T('e07-daily-makeup', 1.3), 0.07, -0.4, 0.4);
S('Chip pop', K.pop(780), T('e07-daily-makeup', 2.15), 0.08, -0.6);
S('Chip pop', K.pop(880), T('e07-daily-makeup', 2.45), 0.08, 0.6);
S('CTA pill pop', K.pop(700), T('e07-daily-makeup', 2.85), 0.09);

// 08 — foam
W('Camera push whoosh', K.whoosh(0.7, 400, 3600), T('e08-foam', -0.2), 0.22, 0.3, -0.3);
for (let k = 0; k < 30; k++) S('Foam bubbles', K.droplet(1200 + rnd() * 1500), T('e08-foam', 0.3 + rnd() * 2.0), 0.028, rnd() * 1.6 - 0.8, 0.3);
[0, 1, 2].forEach((i) => S(`Foam panel ${i + 1}`, K.pop(680 + i * 90), T('e08-foam', 0.75 + i * 0.35), 0.08));

// 09 — glow (light leak)
S('Light-leak swell', K.swell([76, 80, 83, 88], 1.0), T('e09-glow', -0.2), 0.06, 0, 0.7);
S('Glow impact', K.impact(0.6), T('e09-glow', 0.65), 0.28);
S('Glow shimmer', K.shimmer([83, 87, 90, 95, 99]), T('e09-glow', 0.7), 0.07, 0, 0.8);
S('Sparkle', K.shimmer([95, 99, 102]), T('e09-glow', 1.7), 0.04, 0.4, 0.7);

// 10 — price split screen
W('Split — panel down', K.whoosh(0.7, 300, 2400), T('e10-price', -0.05), 0.18, -0.7, -0.5);
W('Split — panel up', K.whoosh(0.7, 300, 2400), T('e10-price', 0.0), 0.18, 0.7, 0.5);
S('Short rising sweep', K.riser(0.5), T('e10-price', 1.0), 0.14);
S('Price impact — blue', K.impact(0.75), T('e10-price', 1.55), 0.34, -0.4);
S('Price impact — green', K.impact(0.75), T('e10-price', 1.7), 0.3, 0.4);
S('Price accent', K.shimmer([88, 92, 95]), T('e10-price', 2.2), 0.045, 0, 0.6);
S('Note pop', K.pop(820), T('e10-price', 2.1), 0.08);

// 11 — bundle
W('Card transition — layered whoosh', K.whoosh(0.9, 250, 2200), T('e11-bundle', -0.1), 0.22, 0.2, -0.2);
[0, 1, 2, 3].forEach((i) => S(`Tube card ${i + 1}`, K.pop([660, 740, 830, 990][i]), T('e11-bundle', 0.5 + i * 0.22 + 0.35), 0.1, -0.6 + i * 0.4));
S('Short rising sweep', K.riser(0.55), T('e11-bundle', 1.25), 0.15);
S('Bundle price impact', K.impact(0.8), T('e11-bundle', 1.85), 0.38);
cardWhoosh('Delivery card rises', T('e11-bundle', 2.6));
for (let k = 0; k < 12; k++) { const p = k / 11; S('Province counter tick', K.click(2000 + k * 70), T('e11-bundle', 2.9 + 1.1 * (1 - Math.sqrt(1 - p))), 0.07, 0, 0); }
S('Condition note pop', K.pop(640), T('e11-bundle', 3.45), 0.07);

// 12 — wholesale (isometric)
W('Gradient-wipe sweep', K.whoosh(0.8, 600, 4200), T('e12-wholesale', -0.1), 0.18, 0.7, -0.7);
[0.3, 0.5, 0.6].forEach((d, i) => S('Pedestal rises', K.thump(), T('e12-wholesale', d + 0.35), 0.14, [-0.4, 0, 0.4][i], 0.05));
[0.3, 0.5, 0.6].forEach((d, i) => S('Product lands', K.droplet(760 + i * 90), T('e12-wholesale', d + 1.0), 0.07, [-0.4, 0, 0.4][i], 0.3));
[0, 1, 2].forEach((i) => S('Place pill', K.click(1500 + i * 150), T('e12-wholesale', 0.65 + i * 0.15), 0.09, -0.4 + i * 0.4, 0));
S('Wholesale price impact', K.impact(0.8), T('e12-wholesale', 1.75), 0.36);
S('Shimmer — sweep', K.shimmer([86, 90, 93, 98]), T('e12-wholesale', 2.2), 0.045, 0, 0.6);
cardWhoosh('Offer card rises', T('e12-wholesale', 2.0));

// 13 — guarantee
W('Circle-reveal whoosh', K.whoosh(0.8, 300, 2400), T('e13-guarantee', -0.1), 0.2, 0, 0);
S('Ring draw swell', K.swell([69, 76, 81], 1.0), T('e13-guarantee', 0.4), 0.05, 0, 0.6);
S('Guarantee chime', K.shimmer([81, 85, 88, 93, 97]), T('e13-guarantee', 1.5), 0.08, 0, 0.8);
S('Soft impact', K.impact(0.45), T('e13-guarantee', 1.5), 0.2);
W('Underline draw', K.whoosh(0.4, 1500, 5000), T('e13-guarantee', 2.0), 0.07, -0.4, 0.4);

// 14 — finale
S('Riser into finale', K.riser(1.0), T('e14-finale', -0.9), 0.2, 0, 0.3);
S('Light-leak swell', K.swell([64, 71, 75, 78], 0.9), T('e14-finale', -0.3), 0.05, 0, 0.6);
[0.1, 0.9, 1.0, 1.1, 1.2].forEach((d, i) => S('Geometric piece snaps in', K.pop(600 + i * 90), T('e14-finale', d + 0.25), 0.07, -0.6 + i * 0.3));
S('Premium hero impact', K.impact(1.05), T('e14-finale', 0.85), 0.5);
S('Elegant shimmer', K.shimmer([80, 83, 87, 92, 95, 99]), T('e14-finale', 0.9), 0.065, 0, 0.8);
[0, 1, 2].forEach((i) => S(`Offer chip ${i + 1}`, K.pop(650 + i * 120), T('e14-finale', 1.65 + i * 0.15), 0.09, -0.5 + i * 0.5));
S('CTA click', K.click(1400), T('e14-finale', 2.45), 0.15, 0, 0);
S('CTA accent', K.impact(0.4), T('e14-finale', 2.5), 0.18);
S('CTA shimmer', K.shimmer([88, 92, 95, 100]), T('e14-finale', 2.5), 0.05, 0, 0.7);
S('Final resolve chord', K.make(3.0, (t) => ([64, 68, 71, 75, 80].reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / 5) * clamp(t / 0.05) * Math.exp(-t * 0.9)), TOTAL - 2.0, 0.08, 0, 0.8);

// very quiet air bed
put(SFX, K.filter(K.make(TOTAL, () => K.noise()), 'bp', (t) => 600 + 300 * Math.sin(t * 0.3), 0.5).map((x, i) => x * clamp(i / SR / 1.5)), 0, 0.01);

/* ---------------- reverb + master ---------------- */
const REV = [K.filter(K.reverb(SEND[0], 0), 'hp', 200), K.filter(K.reverb(SEND[1], 23), 'hp', 200)];
const OUT = path.join(here, '../public/audio/editorial-soundtrack.wav');
K.master([[MUSIC, 1], [DRUMS, 1], [SFX, 1], [REV, 0.85]], OUT);

const fmt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
console.log(`✓ ${path.relative(process.cwd(), OUT)}  ${TOTAL.toFixed(2)} s @ ${BPM} BPM, peak −1 dBFS, ${cue.length} cues`);
if (process.argv.includes('--cues')) for (const [t, l] of cue.sort((a, b) => a[0] - b[0])) console.log(`  ${fmt(t)}  ${l}`);
