// Original soundtrack + UI sound design for Theme 03 — JAKUBEE Zesty Lemon + Herbal Mint Toothpaste.
// Reads src/editorial/timing.json so every cue follows the picture.
// Run: npm run soundtrack:editorial   (add --cues to print the cue sheet)
//
// Music: 120 BPM clean electronic pop (scene durations in timing.json are whole beats, so every cut is on the beat) — Emaj9 · C#m9 · Amaj9 · B6/9; airy pads,
// FM-style keys, light kick/snap/hats, gentle sidechain. SFX: UI clicks, keystrokes,
// card whooshes, droplets, layer thumps, shimmer, reveal impacts.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createKit, sceneStarts } from './lib/audio-kit.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const timing = JSON.parse(fs.readFileSync(path.join(here, '../src/editorial/timing.json'), 'utf8'));
const { start: START, total: TOTAL } = sceneStarts(timing);
// Scenes may play faster than authored (timing.json "speed"); cue offsets are authored at speed 1.
const SPEED = Object.fromEntries(timing.scenes.map((s) => [s.id, s.speed ?? 1]));
const T = (id, dt = 0) => START[id] + dt / SPEED[id];
// Transitions are not sped up: their cues use real seconds from the cut.
const TR = (id, dt = 0) => START[id] + dt;
const K = createKit({ seconds: TOTAL + 0.3, seed: 31337 });
const { SR, N, rnd, mtof, clamp, bus, put, putPan, filterBus } = K;

const MUSIC = bus(), DRUMS = bus(), SFX = bus(), SEND = bus(), ARP = bus();

/* ---------------- arrangement ---------------- */
const BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4;
const CHORDS = [
  { root: 40, notes: [64, 68, 71, 75, 78] }, // Emaj9
  { root: 37, notes: [61, 64, 68, 71, 75] }, // C#m9
  { root: 45, notes: [57, 61, 64, 68, 71] }, // Amaj9
  { root: 47, notes: [59, 63, 66, 68, 73] }, // B6/9
];
const chordAt = (t) => CHORDS[Math.floor(t / BAR) % 4];

const drumLevel = (t) => {
  if (t < T('t02-zesty-lemon', 0.2)) return 0;
  if (t < T('t04-clean-fresh')) return 1;
  if (t < T('t05-stains-whitening', 0.3)) return 0.5; // search typing: hats only, keystrokes lead
  if (t < T('t11-finale')) return 1;
  if (t < T('t11-finale', 0.3)) return 0; // breath before the finale lands
  if (t < TOTAL - 1.6) return 1;
  return 0;
};
const keysLevel = (t) => {
  if (t < 1.0) return 0;
  if (t < T('t02-zesty-lemon')) return 1;
  if (t < T('t11-finale')) return 2;
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
// every scene change is on the beat: mark it with a kick so cut and music hit together
for (const s of timing.scenes.slice(1)) {
  const tt = START[s.id];
  if (kicks.some((k) => Math.abs(k - tt) < 0.01)) continue;
  put(DRUMS, KICK, tt, 0.42); kicks.push(tt);
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

// 01 — intro: Zesty Lemon Toothpaste
S('Reverse swell — gradient intro', K.swell([64, 71, 75], 1.0), 0.0, 0.06, 0, 0.5);
[0.4, 0.6].forEach((d, i) => S('Headline word accent', K.pop(620 + i * 140), T('t01-intro', d + 0.15), 0.07, i ? 0.2 : -0.2));
cardWhoosh('Pack card rises', T('t01-intro', 0.45), 0.4);
cardWhoosh('Tube card rises', T('t01-intro', 0.7), -0.4);
S('Soft impact — cards land', K.impact(0.55), T('t01-intro', 1.15), 0.3);
[1.1, 1.4, 1.5, 1.6].forEach((d, i) => S('Geometric piece snaps in', K.pop(700 + i * 120), T('t01-intro', d + 0.1), 0.08, [0, -0.6, 0.6, 0.5][i]));
S('Khmer line', K.pop(820), T('t01-intro', 1.25), 0.06, 0);
W('Underline draw', K.whoosh(0.4, 1500, 5000), T('t01-intro', 2.0), 0.08, -0.4, 0.4);
S('Shimmer — light sweep', K.shimmer(), T('t01-intro', 2.6), 0.06, 0, 0.6);

// 02 — zesty lemon (circle reveal)
W('Circle-reveal whoosh', K.whoosh(0.6, 300, 2800), TR('t02-zesty-lemon', -0.1), 0.24, 0, 0);
S('Product reveal impact', K.impact(0.8), T('t02-zesty-lemon', 0.6), 0.36);
for (let k = 0; k < 6; k++) S('Water droplet', K.droplet(700 + rnd() * 700), T('t02-zesty-lemon', 0.9 + k * 0.6 + rnd() * 0.2), 0.05, rnd() * 1.2 - 0.6, 0.4);
S('Label card pop', K.pop(760), T('t02-zesty-lemon', 1.45), 0.08, -0.4);
S('Label card pop', K.pop(860), T('t02-zesty-lemon', 1.85), 0.08, -0.3);
S('Shimmer — sweep', K.shimmer([88, 92, 95, 99]), T('t02-zesty-lemon', 2.0), 0.045, 0.3, 0.6);
S('Khmer pill pop', K.pop(700), T('t02-zesty-lemon', 2.25), 0.08, 0);
S('Khmer pill pop', K.pop(800), T('t02-zesty-lemon', 2.65), 0.07, 0);

// 03 — clean & fresh: search interface
W('Gradient-wipe sweep', K.whoosh(0.6, 600, 4200), TR('t04-clean-fresh', -0.05), 0.18, -0.7, 0.7);
cardWhoosh('Search bar slides in', T('t04-clean-fresh', 0.5));
// same schedule as SearchBar / searchSchedule in src/editorial/ui/Interface.tsx (queries from src/editorial/copy.ts)
{
  const queries = ['ថ្នាំដុសធ្មេញល្អ', 'ថ្នាំដុសធ្មេញណាល្អបំផុត?', 'JAKUBEE Toothpaste'];
  const start = 0.95, until = 3.85, hold = 0.35, erase = 0.18;
  const rate = Math.max(0.02, (until - start - (queries.length - 1) * (hold + erase)) / queries.reduce((a, q) => a + q.length, 0));
  let s = start;
  queries.forEach((q, qi) => {
    // one key sound per visible keystroke (Khmer marks join the letter before them), at most every 70 ms
    let lastKey = -1;
    for (let c = 0; c < q.length; c++) {
      const tt = s + c * rate;
      if (q[c] === ' ' || /[឴-៓]/.test(q[c]) || tt - lastKey < 0.07) continue;
      S('Keystroke', K.key(), T('t04-clean-fresh', tt), 0.09, 0.1, 0); lastKey = tt;
    }
    if (qi < queries.length - 1) S('Clear search', K.click(2600), T('t04-clean-fresh', s + q.length * rate + hold), 0.05, 0.1, 0);
    s += q.length * rate + (qi < queries.length - 1 ? hold + erase : 0);
  });
}
S('Search enter click', K.click(1400), T('t04-clean-fresh', 3.95), 0.16, 0, 0);
cardWhoosh('Result card rises', T('t04-clean-fresh', 4.05));
S('Result lands', K.impact(0.45), T('t04-clean-fresh', 4.4), 0.22);
[0, 1, 2].forEach((i) => S('Khmer line', K.pop(680 + i * 90), T('t04-clean-fresh', 4.55 + i * 0.2), 0.06, 0.3));
[0, 1].forEach((i) => S('Keyword pill pop', K.pop(760 + i * 120), T('t04-clean-fresh', 5.55 + i * 0.12), 0.07, -0.2 + i * 0.4));

// 04 — stains & whitening (floating card)
W('Card transition — layered whoosh', K.whoosh(0.6, 250, 2200), TR('t05-stains-whitening', -0.05), 0.22, 0.2, -0.2);
S('Tooth appears', K.thump(), T('t05-stains-whitening', 0.45), 0.16);
W('Tubes rise', K.whoosh(0.5, 500, 2600), T('t05-stains-whitening', 0.8), 0.1, -0.5, 0.5);
S('Stains dissolve — soft fizz', K.filter(K.make(1.4, (t) => K.noise() * Math.sin((Math.PI * t) / 1.4) ** 2), 'bp', (t) => 2500 + 2000 * t, 0.8), T('t05-stains-whitening', 1.6), 0.05, 0, 0.3);
S('Enamel shine', K.shimmer([88, 92, 95, 100]), T('t05-stains-whitening', 2.95), 0.07, 0, 0.7);
[0, 1, 2].forEach((i) => S('Word highlight click', K.click(1600 + i * 200), T('t05-stains-whitening', 3.35 + i * 0.35), 0.12, -0.3 + i * 0.3, 0));
S('Caption pop', K.pop(700), T('t05-stains-whitening', 4.3), 0.08);

// 05 — tartar (camera push)
W('Camera push whoosh', K.whoosh(0.6, 400, 3600), TR('t06-tartar', -0.1), 0.22, 0.3, -0.3);
S('Khmer line', K.pop(700), T('t06-tartar', 0.35), 0.06, 0);
[0, 1, 2].forEach((i) => S(`Cause card ${i + 1}`, K.pop(600 + i * 90), T('t06-tartar', 0.95 + i * 0.25), 0.08, -0.5 + i * 0.5));
W('Cleansing sweep', K.whoosh(1.0, 500, 5200), T('t06-tartar', 3.2), 0.2, -0.8, 0.8);
S('Pack reveal impact', K.impact(0.7), T('t06-tartar', 3.6), 0.3);
S('Sparkle clean', K.shimmer([86, 90, 93, 98]), T('t06-tartar', 3.85), 0.05, 0, 0.6);

// 06 — fluoride & enamel (isometric layers)
W('Focus-pull sweep', K.whoosh(0.5, 400, 2400), TR('t07-fluoride-enamel', -0.05), 0.16, 0, 0);
[0, 1, 2].forEach((i) => S(`Layer ${i + 1} assembles`, K.thump(), T('t07-fluoride-enamel', 0.45 + i * 0.3), 0.14, 0, 0.05));
[0, 1, 2].forEach((i) => S('Layer label tick', K.click(1700 + i * 150), T('t07-fluoride-enamel', 0.9 + i * 0.3), 0.08, 0.5, 0));
S('Tube lands on the stack', K.impact(0.6), T('t07-fluoride-enamel', 1.85), 0.3);
[0, 1, 2].forEach((i) => S(`Benefit panel ${i + 1}`, K.pop(640 + i * 90), T('t07-fluoride-enamel', 2.75 + i * 0.35), 0.08));

// 07 — sensitivity & gums (floating card)
W('Card transition — layered whoosh', K.whoosh(0.6, 250, 2200), TR('t08-sensitivity-gums', -0.05), 0.22, -0.2, 0.2);
S('Khmer line', K.pop(720), T('t08-sensitivity-gums', 0.35), 0.06, 0);
W('Tubes rise', K.whoosh(0.5, 500, 2600), T('t08-sensitivity-gums', 0.4), 0.1, 0.4, -0.4);
for (let i = 0; i < 6; i++) S('Icon orbit pop', K.pop(820 + i * 60), T('t08-sensitivity-gums', 0.65 + i * 0.1), 0.05, -0.6 + i * 0.24);
[0, 1, 2, 3].forEach((i) => S(`Benefit panel ${i + 1}`, K.pop(620 + i * 80), T('t08-sensitivity-gums', 1.65 + i * 0.35), 0.08, 0.2));

// 03 — herbal mint (blue → green colour morph)
S('Riser into colour change', K.riser(0.9), TR('t03-herbal-mint', -0.6), 0.14, 0, 0.4);
W('Colour-morph sweep', K.whoosh(1.0, 200, 1800), TR('t03-herbal-mint', 0.0), 0.2, 0.5, -0.5);
S('Shimmer — green light', K.shimmer([76, 80, 83, 87, 90]), T('t03-herbal-mint', 0.5), 0.06, 0, 0.7);
S('Herbal reveal impact', K.impact(0.75), T('t03-herbal-mint', 0.75), 0.32);
S('Airy leaf texture', K.filter(K.make(2.4, (t) => K.noise() * Math.sin((Math.PI * t) / 2.4) ** 2), 'bp', (t) => 900 + 600 * Math.sin(t * 2), 0.6), T('t03-herbal-mint', 0.6), 0.04, 0, 0.3);
[1.35, 1.6, 1.95].forEach((d, i) => S('Label card pop', K.pop(700 + i * 100), T('t03-herbal-mint', d), 0.08, 0.4));
S('Caption pop', K.pop(760), T('t03-herbal-mint', 2.35), 0.08);

// 11 — finale
S('Riser into finale', K.riser(1.0), TR('t11-finale', -0.7), 0.2, 0, 0.3);
S('Light-leak swell', K.swell([64, 71, 75, 78], 0.9), TR('t11-finale', -0.3), 0.05, 0, 0.6);
S('Khmer line', K.pop(700), T('t11-finale', 0.35), 0.06, 0);
[0.1, 0.9, 1.0, 1.1, 1.2].forEach((d, i) => S('Geometric piece snaps in', K.pop(600 + i * 90), T('t11-finale', d + 0.1), 0.07, -0.6 + i * 0.3));
S('Premium hero impact', K.impact(1.05), T('t11-finale', 0.7), 0.5);
S('Elegant shimmer', K.shimmer([80, 83, 87, 92, 95, 99]), T('t11-finale', 0.85), 0.065, 0, 0.8);
[0, 1, 2, 3].forEach((i) => S(`Pack claim ${i + 1}`, K.pop(650 + i * 100), T('t11-finale', 1.85 + i * 0.15), 0.08, -0.6 + i * 0.4));
S('CTA click', K.click(1400), T('t11-finale', 2.05), 0.15, 0, 0);
S('CTA accent', K.impact(0.4), T('t11-finale', 2.1), 0.18);
S('CTA shimmer', K.shimmer([88, 92, 95, 100]), T('t11-finale', 2.1), 0.05, 0, 0.7);
S('CTA light sweep', K.shimmer([86, 90, 93, 98]), T('t11-finale', 3.6), 0.04, 0, 0.6);
S('Final resolve chord', K.make(3.0, (t) => ([64, 68, 71, 75, 80].reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / 5) * clamp(t / 0.05) * Math.exp(-t * 0.9)), T('t11-finale', 3.1), 0.08, 0, 0.8); // resolves with the CTA


// lead-in: a soft riser into every cut that has none yet, so no scene change arrives out of silence
for (const sc of timing.scenes.slice(1)) {
  const c = START[sc.id];
  if (cue.some(([t, l]) => /riser|swell/i.test(l) && t > c - 1.4 && t < c)) continue;
  S('Soft riser into cut', K.riser(0.7), c - 0.75, 0.06, 0, 0.35);
}

// very quiet air bed
put(SFX, K.filter(K.make(TOTAL, () => K.noise()), 'bp', (t) => 600 + 300 * Math.sin(t * 0.3), 0.5).map((x, i) => x * clamp(i / SR / 1.5)), 0, 0.01);

/* ---------------- reverb + master ---------------- */
const REV = [K.filter(K.reverb(SEND[0], 0), 'hp', 200), K.filter(K.reverb(SEND[1], 23), 'hp', 200)];
const OUT = path.join(here, '../public/audio/editorial-soundtrack.wav');
K.master([[MUSIC, 1], [DRUMS, 1], [SFX, 1], [REV, 0.85]], OUT);

const fmt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
console.log(`✓ ${path.relative(process.cwd(), OUT)}  ${TOTAL.toFixed(2)} s @ ${BPM} BPM, peak −1 dBFS, ${cue.length} cues`);
if (process.argv.includes('--cues')) for (const [t, l] of cue.sort((a, b) => a[0] - b[0])) console.log(`  ${fmt(t)}  ${l}`);
