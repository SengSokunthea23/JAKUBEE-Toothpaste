// Original soundtrack + sound design for Theme 05 — Lavender Editorial × Symbolic 3D Storytelling.
// Reads src/lavender/timing.json so every cue follows the picture. All sounds are synthesised here
// (no samples, no copyrighted music). No reference audio was available, so the style follows the brief:
// elegant, cinematic, atmospheric, premium.
// Run: npm run soundtrack:lavender   (add --cues to print the cue sheet)
//
// Music: 120 BPM grid felt in half time — Dmaj9 · Bm11 · Gmaj9 · A6/9; airy pads, soft felt keys,
// a gentle bell motif, a soft kick on beat 1 and on every cut, light shaker. Builds after the intro,
// thins for the scientific scenes (fluoride, enamel), opens up for fresh breath, resolves on a held chord.
// SFX: soft impacts, elegant whooshes, reverse sweeps, shimmer, airy textures, liquid accents, delicate clicks.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createKit, sceneStarts } from './lib/audio-kit.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const timing = JSON.parse(fs.readFileSync(path.join(here, '../src/lavender/timing.json'), 'utf8'));
const { start: START, total: TOTAL } = sceneStarts(timing);
const SPEED = Object.fromEntries(timing.scenes.map((s) => [s.id, s.speed ?? 1]));
const T = (id, dt = 0) => START[id] + dt / SPEED[id];
const TR = (id, dt = 0) => START[id] + dt;
const K = createKit({ seconds: TOTAL + 0.4, seed: 5050 });
const { SR, N, rnd, noise, mtof, clamp, bus, put, putPan, filter, filterBus, make } = K;

const MUSIC = bus(), DRUMS = bus(), SFX = bus(), SEND = bus();

/* ---------------- arrangement ---------------- */
const BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4;
const CHORDS = [
  [50, 57, 61, 64, 66], // Dmaj9
  [47, 54, 57, 61, 64], // Bm11
  [43, 50, 54, 57, 62], // Gmaj9
  [45, 52, 56, 59, 61], // A6/9
];
/** energy: 0 intro (pads only), 1 light, 2 full (keys + kick + shaker) */
const energy = (t) => {
  if (t < T('l01-intro', 1.6)) return 0;
  if (t < T('l07-fluoride')) return 2;
  if (t < T('l09-gums')) return 1; // fluoride + enamel: lighter, scientific
  if (t < T('l13-finale', 2.4)) return 2;
  return 0; // finale resolves
};

const nBars = Math.ceil(TOTAL / BAR) + 1;
for (let b = 0; b < nBars; b++) {
  const ch = CHORDS[b % 4];
  const t0 = b * BAR;
  const p = K.pad(ch, BAR * 1.2, 0.6);
  put(MUSIC, p, t0, 0.028, -0.25);
  put(MUSIC, p, t0 + 0.012, 0.028, 0.25);
  put(SEND, p, t0, 0.02);
  // warm low root
  const f = mtof(ch[0] - 12);
  put(MUSIC, make(BAR * 1.1, (t) => Math.sin(2 * Math.PI * f * t) * clamp(t / 0.08) * Math.exp(-t * 0.6)), t0, 0.08);
  // felt keys: a slow broken chord on the off-beats
  [1, 3, 5, 7].forEach((k, j) => {
    const tt = t0 + k * (BEAT / 2);
    if (energy(tt) < 1 || tt > TOTAL - 1) return;
    put(MUSIC, K.keys(mtof(ch[(j + 1) % 5] + 12), 1.4), tt, 0.04, j % 2 ? 0.35 : -0.35);
    put(SEND, K.keys(mtof(ch[(j + 1) % 5] + 12), 1.4), tt, 0.02);
  });
  // bell motif every other bar
  if (b % 2 === 0 && energy(t0) === 2) put(MUSIC, K.bell(mtof(ch[4] + 12), 2.2), t0 + BEAT * 2, 0.02, 0.2);
}
filterBus(MUSIC, 'lp', (t) => 900 + 3200 * clamp((t - 0.4) / 3), 0.7);

// light rhythm: soft kick on beat 1, shaker on 8ths, all under the music
const kicks = [];
const KICK = K.kick(0.8), SHK = K.shaker();
for (let k = 0; k * (BEAT / 2) < TOTAL; k++) {
  const tt = k * (BEAT / 2);
  const lv = energy(tt);
  if (!lv) continue;
  if (lv === 2 && k % 8 === 0) { put(DRUMS, KICK, tt, 0.32); kicks.push(tt); }
  put(DRUMS, SHK, tt, lv === 2 ? (k % 2 ? 0.03 : 0.018) : 0.012, 0.3);
}
// every scene change is on the beat: a soft kick marks each cut
for (const s of timing.scenes.slice(1)) {
  const tt = START[s.id];
  if (kicks.some((k) => Math.abs(k - tt) < 0.01)) continue;
  put(DRUMS, KICK, tt, 0.28); kicks.push(tt);
}
// gentle sidechain
{
  const g = new Float32Array(N).fill(1);
  for (const tk of kicks) {
    const i0 = Math.round(tk * SR);
    for (let i = 0; i < SR * 0.35 && i0 + i < N; i++) g[i0 + i] = Math.min(g[i0 + i], 1 - 0.25 * Math.exp(-(i / SR) / 0.12));
  }
  for (let i = 0; i < N; i++) { MUSIC[0][i] *= g[i]; MUSIC[1][i] *= g[i]; }
}

/* ---------------- sound design ---------------- */
const cue = [];
const S = (label, sig, t, gain, pan = 0, send = 0.3) => { put(SFX, sig, t, gain, pan); if (send) put(SEND, sig, t, gain * send, pan); cue.push([t, label]); };
const W = (label, sig, t, gain, p0, p1) => { putPan(SFX, sig, t, gain, p0, p1); putPan(SEND, sig, t, gain * 0.3, p0, p1); cue.push([t, label]); };
const air = (dur = 1.2) => filter(make(dur, () => noise()), 'bp', (t) => 1200 + 2400 * Math.sin(Math.PI * clamp(t / dur)), 0.8).map((x, i) => x * Math.sin(Math.PI * clamp(i / SR / dur)) ** 2);
const reverseSwell = (notes, dur = 1.0) => make(dur, (t) => (notes.reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / notes.length) * Math.pow(t / dur, 3));

// transitions: an elegant whoosh peaking on each cut (a reverse swell into shape wipes)
timing.scenes.forEach((s, i) => {
  if (!s.transition) return;
  const { kind, duration } = s.transition;
  const p = i % 2 ? 0.5 : -0.5;
  W(`Transition — ${kind}`, K.whoosh(duration + 0.3, 300, 3400), TR(s.id, -duration * 0.6), 0.09, -p, p);
  if (kind === 'shape') S('Reverse swell into shape wipe', reverseSwell([62, 66, 69, 73], 0.8), TR(s.id, -0.8), 0.05, 0, 0.6);
  if (kind === 'lightSweep') S('Light sweep shimmer', K.shimmer([86, 90, 93, 97], 1.4), TR(s.id, -0.2), 0.04, 0, 0.7);
  if (kind === 'grid') for (let k = 0; k < 5; k++) S('Grid tick', K.click(2200 + k * 180), TR(s.id, k * 0.08), 0.035, -0.4 + k * 0.2, 0);
});

// 01 — lavender opening, lemon, product reveal
S('Atmospheric opening', air(2.4), 0, 0.06, 0, 0.6);
S('Reverse swell', reverseSwell([62, 69, 73, 76], 1.2), 0.1, 0.05, 0, 0.6);
for (let k = 0; k < 3; k++) S('Lemon droplet', K.droplet(900 + k * 160), T('l01-intro', 0.3 + k * 0.25), 0.05, -0.4 + k * 0.4, 0.5);
S('Headline accent', K.pop(640), T('l01-intro', 0.55), 0.06);
S('Soft product reveal impact', K.impact(0.8), T('l01-intro', 1.0), 0.3);
S('Tube light sweep', K.shimmer([81, 85, 88, 93]), T('l01-intro', 2.0), 0.045, 0, 0.7);

// 02 — tooth sculpture, waveform
S('Tooth appears', K.thump(), T('l02-clean', 0.15), 0.25);
W('Airflow', air(1.4), T('l02-clean', 0.4), 0.05, -0.7, 0.7);
S('Enamel glint', K.shimmer([88, 91, 95]), T('l02-clean', 1.4), 0.04, 0, 0.6);

// 03 — stains drift away
S('Callout tick', K.click(2000), T('l03-stains', 0.65), 0.06, -0.4, 0);
S('Callout tick', K.click(2400), T('l03-stains', 0.85), 0.06, 0.4, 0);
for (let k = 0; k < 6; k++) S('Stain particle', K.droplet(500 + rnd() * 300), T('l03-stains', 1.6 + k * 0.12), 0.035, rnd() * 1.2 - 0.6, 0.3);
S('Clean shine', K.shimmer([86, 90, 93, 98]), T('l03-stains', 2.3), 0.04, 0, 0.6);

// 04 — protective layers
[0, 1, 2].forEach((i) => S(`Protective layer ${i + 1}`, K.thump(), T('l04-strong', 0.35 + i * 0.18), 0.13, 0, 0.2));

// 05 — bright: light sweep + sparkles
S('Light sweep', K.shimmer([86, 90, 93, 97, 100]), T('l05-bright', 0.6), 0.055, 0, 0.8);
['សស្អាត', 'រឹងមាំ', 'ភ្លឺរលោង'].forEach((_, i) => S('Word accent', K.pop(680 + i * 110), T('l05-bright', 0.2 + i * 0.22), 0.05, -0.3 + i * 0.3));

// 06 — cigarette, tea, coffee; both tubes
[0, 1, 2].forEach((i) => S(`Cause card ${i + 1}`, K.pop(620 + i * 100), T('l06-tartar', 0.35 + i * 0.18), 0.06, -0.5 + i * 0.5));
W('Cards clear', K.whoosh(0.7, 500, 3800), T('l06-tartar', 1.9), 0.08, -0.5, 0.5);
S('Product entrance impact', K.impact(0.7), T('l06-tartar', 2.3), 0.26);
S('Tubes light sweep', K.shimmer([81, 85, 88, 93]), T('l06-tartar', 2.8), 0.04, 0, 0.6);

// 07 — fluoride particles gather, ring draws
S('Luminous particles gather', K.swell([69, 74, 78, 81], 1.2), T('l07-fluoride', 0.2), 0.04, 0, 0.6);
S('FLUORIDE headline', K.impact(0.45), T('l07-fluoride', 0.15), 0.16);
S('Protective ring', K.shimmer([83, 86, 90, 95]), T('l07-fluoride', 1.1), 0.045, 0, 0.7);

// 08 — enamel cross-section
[0, 1, 2].forEach((i) => S(`Layer ${i + 1}`, K.pop(560 + i * 90), T('l08-enamel', 0.15 + i * 0.15), 0.05, 0));
S('Enamel lights up', K.shimmer([86, 90, 93, 98]), T('l08-enamel', 1.2), 0.05, 0, 0.6);
S('Pointer tick', K.click(2300), T('l08-enamel', 1.35), 0.06, 0.4, 0);

// 09 — gum care
S('Gumline traced', air(1.0), T('l09-gums', 0.8), 0.04, 0, 0.5);
[0, 1].forEach((i) => S('Info pill', K.pop(700 + i * 120), T('l09-gums', 1.45 + i * 0.2), 0.06, -0.3 + i * 0.6));

// 10 — bacteria disperse, tubes
for (let k = 0; k < 6; k++) S('Microscopic particle', K.droplet(300 + rnd() * 200), T('l10-bacteria', 0.1 + k * 0.1), 0.04, rnd() * 1.2 - 0.6, 0.3);
W('Clean airflow', air(1.2), T('l10-bacteria', 0.9), 0.07, -0.8, 0.8);
S('Product entrance', K.impact(0.6), T('l10-bacteria', 1.45), 0.22);

// 11 — fresh breath: lemon orbit, droplets
W('Orbit whoosh', K.whoosh(1.6, 300, 2400), T('l11-breath', 0.1), 0.06, 0.8, -0.8);
S('Fresh shimmer', K.shimmer([83, 87, 90, 95, 99]), T('l11-breath', 0.8), 0.045, 0, 0.7);
for (let k = 0; k < 4; k++) S('Water droplet', K.droplet(900 + rnd() * 600), T('l11-breath', 1.0 + k * 0.4), 0.04, rnd() * 1.2 - 0.6, 0.5);

// 12 — daily card, silhouettes, week
S('Card in', K.pop(680), T('l12-daily', 0.25), 0.06);
[0, 1].forEach((i) => S('Info row', K.click(1900 + i * 300), T('l12-daily', 0.75 + i * 0.2), 0.06, 0.3, 0));
for (let d = 0; d < 7; d++) S(`Day ${d + 1}`, K.click(1700 + d * 160), T('l12-daily', 1.32 + d * 0.1), 0.045, -0.5 + d * 0.16, 0);
S('Silhouettes', air(1.0), T('l12-daily', 1.4), 0.035, 0, 0.5);

// 13 — final hero
S('Riser into finale', K.riser(0.9), TR('l13-finale', -0.9), 0.1, 0, 0.4);
S('Cinematic final impact', K.impact(1.05), T('l13-finale', 0.35), 0.42);
S('Lemon splash', make(0.5, (t) => noise() * Math.exp(-t * 9) * 0.8), T('l13-finale', 0.4), 0.06, 0, 0.5);
S('ZESTY LEMON type', K.swell([69, 74, 78], 1.0), T('l13-finale', 0.4), 0.04, 0, 0.6);
S('Logo reveal', K.shimmer([81, 85, 88, 93, 96]), T('l13-finale', 0.85), 0.055, 0, 0.8);
S('Final resolve chord', make(3.4, (t) => ([50, 57, 62, 66, 69].reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / 5) * clamp(t / 0.05) * Math.exp(-t * 0.8)), T('l13-finale', 2.4), 0.08, 0, 0.8);

// lead-in: a soft riser into every cut that has none yet
for (const sc of timing.scenes.slice(1)) {
  const c = START[sc.id];
  if (cue.some(([t, l]) => /riser|swell/i.test(l) && t > c - 1.4 && t < c)) continue;
  S('Soft riser into cut', K.riser(0.7), c - 0.75, 0.045, 0, 0.35);
}

// very quiet air bed
put(SFX, filter(make(TOTAL, () => noise()), 'bp', (t) => 900 + 300 * Math.sin(t * 0.3), 0.5).map((x, i) => x * clamp(i / SR / 1.5)), 0, 0.01);

/* ---------------- reverb + master ---------------- */
const REV = [filter(K.reverb(SEND[0], 0), 'hp', 200), filter(K.reverb(SEND[1], 23), 'hp', 200)];
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = clamp((TOTAL + 0.4 - t) / 1.4);
  MUSIC[0][i] *= g; MUSIC[1][i] *= g; DRUMS[0][i] *= g; DRUMS[1][i] *= g;
}
const OUT = path.join(here, '../public/audio/lavender-soundtrack.wav');
K.master([[MUSIC, 1], [DRUMS, 1], [SFX, 1], [REV, 0.9]], OUT);

const fmt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
console.log(`✓ ${path.relative(process.cwd(), OUT)}  ${TOTAL.toFixed(2)} s @ ${BPM} BPM, peak −1 dBFS, ${cue.length} cues`);
if (process.argv.includes('--cues')) for (const [t, l] of cue.sort((a, b) => a[0] - b[0])) console.log(`  ${fmt(t)}  ${l}`);
