// Original music bed + sound effects for the Commercial theme (JakubeeCommercial).
// Node port of the former generate_soundtrack.py — no Python needed.
// Reads src/timing.json so every cue follows the picture.
// Run: npm run soundtrack   (add --cues to print the cue sheet)
//
// Music: 100 BPM (scene durations in timing.json are whole beats, so every cut is on the beat) — Fmaj9 · Am7(9) · Dm9 · Bbmaj7; soft pads, sub bass, eighth-note arps,
// light hats and kick from scene 02.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createKit, sceneStarts } from './lib/audio-kit.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const timing = JSON.parse(fs.readFileSync(path.join(here, '../src/timing.json'), 'utf8'));
const { start: START, total: TOTAL } = sceneStarts(timing);
// Scenes may play faster than authored (timing.json "speed"); cue offsets are authored at speed 1.
const SPEED = Object.fromEntries(timing.scenes.map((s) => [s.id, s.speed ?? 1]));
const T = (id, dt = 0) => START[id] + dt / SPEED[id];
// Transitions are not sped up: their cues use real seconds from the cut.
const TR = (id, dt = 0) => START[id] + dt;
const K = createKit({ seconds: TOTAL + 0.3, seed: 3 });
const { SR, N, mtof, clamp, bus, put, putPan, filterBus, rnd } = K;

const MUSIC = bus(), DRUMS = bus(), SFX = bus(), SEND = bus();

/* ---------------- music: 100 BPM, bar = 2.4 s ---------------- */
const BAR = 2.4, BEAT = BAR / 4;
const CHORDS = [[53, 57, 60, 64, 67], [57, 60, 64, 67, 71], [50, 53, 57, 60, 64], [46, 50, 53, 57, 62]];
const grooveStart = T('02-zesty-lemon');
const nBars = Math.ceil(TOTAL / BAR) + 1;
for (let b = 0; b < nBars; b++) {
  const ch = CHORDS[b % 4];
  const t0 = b * BAR;
  const pad = K.pad(ch, BAR * 1.15);
  put(MUSIC, pad, t0, 0.02, -0.2);
  put(MUSIC, pad, t0 + 0.01, 0.02, 0.2);
  put(SEND, pad, t0, 0.01);
  const f = mtof(ch[0] - 12);
  put(MUSIC, K.make(BAR * 1.15, (t) => Math.sin(2 * Math.PI * f * t) * Math.min(1, t / 0.05) * Math.exp(-t * 0.8)), t0, 0.1);
  const arp = [ch[0] + 12, ch[2] + 12, ch[1] + 12, ch[3] + 12, ch[2] + 12, ch[4] + 12, ch[3] + 12, ch[2] + 12];
  arp.forEach((m, k) => {
    const tt = t0 + (k * BEAT) / 2;
    if (tt < grooveStart - 0.2 || tt > TOTAL - 0.8) return;
    put(MUSIC, K.pluck(mtof(m), 0.6), tt, 0.035, k % 2 ? 0.35 : -0.35);
  });
  for (let k = 0; k < 8; k++) {
    const tt = t0 + (k * BEAT) / 2;
    if (tt < grooveStart || tt > TOTAL - 1.0) continue;
    put(DRUMS, K.hat(), tt, k % 2 ? 0.025 : 0.012, 0.3);
  }
  for (const k of [0, 2]) {
    const tt = t0 + k * BEAT;
    if (tt < grooveStart || tt > TOTAL - 1.0) continue;
    put(DRUMS, K.kick(), tt, 0.32);
  }
}
// every scene change is on the beat: mark it with a kick so cut and music hit together
for (const sc of timing.scenes.slice(1)) put(DRUMS, K.kick(), START[sc.id], 0.3);
filterBus(MUSIC, 'lp', 2400, 0.7);

/* ---------------- sound design ---------------- */
const cue = [];
const S = (label, sig, t, gain, pan = 0, send = 0.2) => { put(SFX, sig, t, gain, pan); if (send) put(SEND, sig, t, gain * send, pan); cue.push([t, label]); };
const W = (label, sig, t, gain, p0, p1) => { putPan(SFX, sig, t, gain, p0, p1); putPan(SEND, sig, t, gain * 0.2, p0, p1); cue.push([t, label]); };
const fizz = (d = 1.6) => K.filter(K.make(d, (t) => (rnd() < 0.02 ? rnd() * 2 - 1 : 0) * Math.sin((Math.PI * t) / d)), 'hp', 3000);

// transitions: a whoosh into every scene (peaks on the cut), droplets on ripple transitions
timing.scenes.forEach((sc, i) => {
  if (!sc.transition) return;
  W(`Transition — ${sc.transition.kind}`, K.whoosh(0.7), TR(sc.id, -0.3), 0.1, i % 2 ? -0.3 : 0.3, i % 2 ? 0.3 : -0.3);
  if (sc.transition.kind === 'ripple') { S('Ripple drop', K.droplet(900), TR(sc.id, 0.05), 0.2); S('Ripple drop', K.droplet(1200), TR(sc.id, 0.3), 0.1); }
});

// 01 — intro: tubes slide in, headline, Khmer line, light sweep, chips
W('Lemon tube slides in', K.whoosh(0.6), T('01-intro', 0.2), 0.07, -0.6, -0.2);
W('Herbal tube slides in', K.whoosh(0.6), T('01-intro', 0.4), 0.07, 0.6, 0.2);
[0.6, 0.8, 1.0].forEach((d, i) => S('Headline accent', K.pop(620 + i * 120), T('01-intro', d + 0.1), 0.08, -0.3 + i * 0.3));
S('Khmer line', K.pop(820), T('01-intro', 1.85), 0.08);
S('Light sweep', K.shimmer([84, 88, 91, 96]), T('01-intro', 2.0), 0.05, 0, 0.6);
[0, 1].forEach((i) => S('Chip pop', K.pop(760 + i * 120), T('01-intro', 2.2 + i * 0.15), 0.07, i ? 0.4 : -0.4));

// 02 / 03 — variant heroes (shared VariantHero timing)
const variant = (id, leaf) => {
  S('Tube reveal — impact', K.impact(0.55), T(id, 0.45), 0.24);
  S('Label accent', K.pop(700), T(id, 0.55), 0.07, -0.2);
  S('Title accent', K.pop(620), T(id, 0.75), 0.08);
  S('Title accent', K.pop(760), T(id, 0.9), 0.08);
  S('Khmer line', K.pop(840), T(id, 1.15), 0.08);
  S('Tube light sweep', K.shimmer(leaf ? [79, 83, 86, 91] : [84, 88, 91, 96]), T(id, 1.6), 0.05, 0, 0.6);
  S('Callout tick', K.click(2000), T(id, 2.3), 0.1, -0.4, 0);
  S('Callout tick', K.click(2400), T(id, 2.7), 0.1, 0.4, 0);
};
variant('02-zesty-lemon', false);
for (let k = 0; k < 4; k++) S('Ice / water droplet', K.droplet(800 + rnd() * 600), T('02-zesty-lemon', 0.4 + k * 0.5), 0.06, rnd() * 1.2 - 0.6, 0.4);
variant('03-herbal-mint', true);
S('Leaf drop', K.droplet(820), T('03-herbal-mint', 0.3), 0.12);

// 05 — fresh breath: toothpaste fizz
S('Fresh fizz', fizz(), T('05-fresh-breath', 0.2), 0.08, 0, 0.1);
S('Title accent', K.pop(680), T('05-fresh-breath', 0.35), 0.08);
S('Title accent', K.pop(800), T('05-fresh-breath', 0.5), 0.08);
S('Khmer line', K.pop(840), T('05-fresh-breath', 0.85), 0.08);
S('Shine', K.shimmer([84, 88, 91, 96]), T('05-fresh-breath', 1.2), 0.05, 0, 0.6);
S('Clean-teeth pill', K.pop(820), T('05-fresh-breath', 2.0), 0.1);

// 07 — whitening
S('Title accent', K.pop(700), T('07-whitening', 0.25), 0.07);
S('Tooth appears', K.impact(0.5), T('07-whitening', 0.4), 0.24);
S('Khmer line', K.pop(820), T('07-whitening', 0.6), 0.07);
W('Tubes rise', K.whoosh(0.5, 500, 2600), T('07-whitening', 0.8), 0.07, -0.5, 0.5);
S('Stains fade', fizz(1.4), T('07-whitening', 1.3), 0.07, 0, 0.1);
S('Enamel shine', K.shimmer([84, 88, 91, 96]), T('07-whitening', 2.6), 0.07, 0, 0.6);
S('Caption card', K.pop(760), T('07-whitening', 2.9), 0.1);

// 08 — tartar
S('Title accent', K.pop(700), T('08-tartar', 0.25), 0.07);
S('Khmer line', K.pop(820), T('08-tartar', 0.6), 0.07);
for (let i = 0; i < 3; i++) S(`Cause card ${i + 1}`, K.pop(620 + i * 100), T('08-tartar', 0.75 + i * 0.2), 0.1, -0.5 + i * 0.5);
W('Cleansing sweep', K.whoosh(0.9, 500, 5000), T('08-tartar', 2.5), 0.14, -0.8, 0.8);
S('Bubbles', fizz(1.4), T('08-tartar', 3.0), 0.06, 0, 0.1);
S('Tubes rise — impact', K.impact(0.7), T('08-tartar', 3.2), 0.3);
S('Tube light sweep', K.shimmer([86, 90, 93, 98]), T('08-tartar', 3.8), 0.04, 0, 0.6);

// 09 — fluoride
S('Label accent', K.pop(700), T('09-fluoride', 0.2), 0.07);
S('1500 badge impact', K.impact(0.8), T('09-fluoride', 0.4), 0.32);
S('Badge shimmer', K.shimmer([88, 92, 95]), T('09-fluoride', 1.2), 0.05, 0, 0.6);
for (let i = 0; i < 3; i++) S(`Benefit row ${i + 1}`, K.pop(680 + i * 90), T('09-fluoride', 1.05 + i * 0.35), 0.1);

// 10 — sensitivity & gums
S('Label accent', K.pop(700), T('10-gums', 0.25), 0.07);
W('Tubes rise', K.whoosh(0.6, 400, 2400), T('10-gums', 0.2), 0.08, -0.5, 0.5);
S('Panel pop', K.pop(700), T('10-gums', 1.35), 0.1, -0.2);
S('Panel pop', K.pop(820), T('10-gums', 1.85), 0.1, 0.2);
S('Tube light sweep', K.shimmer([84, 88, 91, 96]), T('10-gums', 1.6), 0.05, 0, 0.7);

// 11 — end card
S('Hero impact', K.impact(0.8), T('11-end-card', 0.4), 0.3);
[0.3, 0.45, 0.6].forEach((d, i) => S('Line accent', K.pop(640 + i * 110), T('11-end-card', d + 0.05), 0.07));
for (let k = 0; k < 4; k++) S(`Claim pill ${k + 1}`, K.pop(650 + k * 100), T('11-end-card', 1.25 + k * 0.12), 0.09, -0.6 + k * 0.4);
S('Tube light sweep', K.shimmer([84, 88, 91, 96]), T('11-end-card', 1.4), 0.04, 0, 0.6);
S('Hygiene line', K.pop(820), T('11-end-card', 1.95), 0.08);
S('CTA click', K.click(1400), T('11-end-card', 2.15), 0.14, 0, 0);
S('CTA chime', K.shimmer([79, 83, 86, 91]), T('11-end-card', 2.2), 0.06, 0, 0.6);

/* ---------------- reverb + master ---------------- */
const REV = [K.filter(K.reverb(SEND[0], 0), 'hp', 200), K.filter(K.reverb(SEND[1], 23), 'hp', 200)];
// master fade in/out on the music bed
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = clamp(t / 0.8) * clamp((TOTAL + 0.3 - t) / 1.2);
  MUSIC[0][i] *= g; MUSIC[1][i] *= g; DRUMS[0][i] *= g; DRUMS[1][i] *= g;
}
const OUT = path.join(here, '../public/audio/soundtrack.wav');
K.master([[MUSIC, 1], [DRUMS, 1], [SFX, 1], [REV, 0.8]], OUT);

const fmt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
console.log(`✓ ${path.relative(process.cwd(), OUT)}  ${TOTAL.toFixed(2)} s @ 100 BPM, peak −1 dBFS, ${cue.length} cues`);
if (process.argv.includes('--cues')) for (const [t, l] of cue.sort((a, b) => a[0] - b[0])) console.log(`  ${fmt(t)}  ${l}`);
