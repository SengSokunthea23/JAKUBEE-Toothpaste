// Original soundtrack + sound design for Theme 04 — Futuristic Dental Science (JAKUBEE Zesty Lemon + Herbal Mint, 9 chapters).
// Reads src/futuristic/timing.json so every cue follows the picture. All sounds are synthesised here.
// Run: npm run soundtrack:futuristic   (add --cues to print the cue sheet)
//
// Music: 120 BPM dark, clean electronic — Am9 · Fmaj9 · Cmaj7 · G6; sub bass, pulsing saw arps,
// tight kick/snap/hats with sidechain. Scene durations are whole beats, so every cut lands on the beat.
// SFX: glitch accents, digital whooshes, risers, deep impacts, neon sweeps, scanner tones,
// UI clicks, particle ticks, electronic pulses, water droplets, a lemon splash.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createKit, sceneStarts } from './lib/audio-kit.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const timing = JSON.parse(fs.readFileSync(path.join(here, '../src/futuristic/timing.json'), 'utf8'));
const { start: START, total: TOTAL } = sceneStarts(timing);
const SPEED = Object.fromEntries(timing.scenes.map((s) => [s.id, s.speed ?? 1]));
/** time of an animation moment `dt` (authored seconds) inside scene `id` */
const T = (id, dt = 0) => START[id] + dt / SPEED[id];
/** transitions are not sped up: real seconds from the cut */
const TR = (id, dt = 0) => START[id] + dt;
const K = createKit({ seconds: TOTAL + 0.4, seed: 4040 });
const { SR, N, rnd, noise, mtof, clamp, bus, put, putPan, filter, filterBus, make, sawAt } = K;

const MUSIC = bus(), DRUMS = bus(), SFX = bus(), SEND = bus(), ARP = bus();

/* ---------------- arrangement ---------------- */
const BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4;
const CHORDS = [
  { root: 33, notes: [57, 60, 64, 67, 71] }, // Am9
  { root: 29, notes: [53, 57, 60, 64, 67] }, // Fmaj9
  { root: 36, notes: [55, 60, 64, 67, 71] }, // Cmaj7
  { root: 31, notes: [55, 59, 62, 64, 67] }, // G6
];
const chordAt = (t) => CHORDS[Math.floor(t / BAR) % 4];

/** drums: 0 off, 0.5 hats only, 1 full */
const drumLevel = (t) => {
  if (t < T('f01-intro', 1.0)) return 0; // atmospheric opening
  if (t < T('f07-fluoride')) return 1;
  if (t < T('f09-gums')) return 0.5; // fluoride + enamel: scientific, lighter
  if (t < T('f13-finale', 0.2)) return 1;
  if (t < T('f13-finale', 2.5)) return 1;
  return 0; // finale resolves
};
/** saw-pulse arp: 0 off, 1 sparse, 2 full 16ths */
const arpLevel = (t) => {
  if (t < T('f01-intro', 0.5)) return 0;
  if (t < T('f02-clean')) return 1;
  if (t < T('f07-fluoride')) return 2;
  if (t < T('f09-gums')) return 1;
  if (t < T('f13-finale', 2.5)) return 2;
  return 0;
};

// pads (dark, filtered)
const nBars = Math.ceil(TOTAL / BAR) + 1;
for (let b = 0; b < nBars; b++) {
  const sig = K.pad(CHORDS[b % 4].notes, BAR + 0.9, 0.7);
  put(MUSIC, sig, b * BAR, 0.04, b % 2 ? 0.3 : -0.3);
  put(SEND, sig, b * BAR, 0.02);
}

// sub bass: off-beat pulse once the groove is in
for (let b = 0; b < nBars; b++) {
  const f = mtof(CHORDS[b % 4].root);
  for (let k = 0; k < 8; k++) {
    const tt = b * BAR + k * (BEAT / 2);
    if (drumLevel(tt) < 1) continue;
    const d = BEAT * 0.42;
    put(MUSIC, make(d, (t) => (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t)) * clamp(t / 0.006) * clamp((d - t) / 0.04)), tt, k % 2 ? 0.16 : 0.1);
  }
}

// pulsing saw arp through a filter + dotted-eighth delay
const SEQ = [0, 2, 4, 2, 1, 3, 4, 3, 0, 2, 4, 3, 1, 4, 2, 3];
for (let k = 0; k * (BEAT / 4) < TOTAL; k++) {
  const tt = k * (BEAT / 4);
  const lv = arpLevel(tt);
  if (!lv || (lv === 1 && k % 4)) continue;
  const f = mtof(chordAt(tt).notes[SEQ[k % 16]] + 12);
  const d = 0.12;
  const ph = rnd();
  put(ARP, make(d, (t) => sawAt(ph + f * t) * Math.exp(-t * 26) * clamp(t / 0.002)), tt, lv === 2 ? 0.05 : 0.07, k % 2 ? 0.4 : -0.4);
}
{
  filterBus(ARP, 'lp', (t) => 1400 + 1800 * (0.5 + 0.5 * Math.sin((t / (BAR * 2)) * 2 * Math.PI)), 1.4);
  const D = Math.round(BEAT * 0.75 * SR);
  for (let i = D; i < N; i++) { ARP[0][i] += ARP[1][i - D] * 0.3; ARP[1][i] += ARP[0][i - D] * 0.3; }
  for (let i = 0; i < N; i++) { MUSIC[0][i] += ARP[0][i]; MUSIC[1][i] += ARP[1][i]; SEND[0][i] += ARP[0][i] * 0.25; SEND[1][i] += ARP[1][i] * 0.25; }
}
filterBus(MUSIC, 'lp', (t) => 700 + 3800 * clamp((t - 0.3) / 3.5), 0.7);

// drums
const kicks = [];
const KICK = K.kick(1.1), SNAP = K.snap(), HAT = K.hat(), OHAT = K.hat(true);
for (let k = 0; k * (BEAT / 4) < TOTAL; k++) {
  const tt = k * (BEAT / 4);
  const lv = drumLevel(tt);
  if (!lv) continue;
  const st = k % 16;
  if (lv === 1 && (st === 0 || st === 8 || (st === 10 && Math.floor(k / 16) % 2))) { put(DRUMS, KICK, tt, 0.5); kicks.push(tt); }
  if (lv === 1 && (st === 4 || st === 12)) { put(DRUMS, SNAP, tt, 0.15, 0.06); put(SEND, SNAP, tt, 0.06); }
  if (st % 2 === 0) put(DRUMS, HAT, tt, st % 4 === 2 ? 0.05 : 0.025, 0.25);
  if (lv === 1 && st === 14) put(DRUMS, OHAT, tt, 0.03, 0.3);
}
// every scene change is on the beat: a kick marks each cut
for (const s of timing.scenes.slice(1)) {
  const tt = START[s.id];
  if (kicks.some((k) => Math.abs(k - tt) < 0.01)) continue;
  put(DRUMS, KICK, tt, 0.45); kicks.push(tt);
}
// sidechain
{
  const g = new Float32Array(N).fill(1);
  for (const tk of kicks) {
    const i0 = Math.round(tk * SR);
    for (let i = 0; i < SR * 0.3 && i0 + i < N; i++) g[i0 + i] = Math.min(g[i0 + i], 1 - 0.4 * Math.exp(-(i / SR) / 0.09));
  }
  for (let i = 0; i < N; i++) { MUSIC[0][i] *= g[i]; MUSIC[1][i] *= g[i]; }
}

/* ---------------- sound-design palette ---------------- */
/** short digital glitch: gated stutter of square tones + noise */
const glitch = (dur = 0.28) =>
  filter(make(dur, (t) => {
    const seg = Math.floor(t / 0.022);
    const gate = seg % 3 === 1 ? 0.15 : 1;
    const f = 220 + ((seg * 397) % 1700);
    return (Math.sign(Math.sin(2 * Math.PI * f * t)) * 0.45 + noise() * 0.55) * gate * Math.exp(-t * 7);
  }), 'hp', 500);
/** neon energy sweep: band-noise + saw rising */
const neonSweep = (dur = 0.8) => {
  const nz = filter(make(dur, () => noise()), 'bp', (t) => 400 * Math.pow(15, t / dur), 2.2);
  const ph = rnd();
  return make(dur, (t, i) => (nz[i] * 0.9 + sawAt(ph + 180 * Math.pow(4, t / dur) * t) * 0.12) * Math.sin(Math.PI * clamp(t / dur)) ** 1.5);
};
/** scanner: clean sine with fast vibrato gliding up */
const scanner = (dur = 1.2, f0 = 900, f1 = 1800) => make(dur, (t) => Math.sin(2 * Math.PI * (f0 + (f1 - f0) * (t / dur)) * t + 3 * Math.sin(2 * Math.PI * 22 * t)) * Math.sin(Math.PI * clamp(t / dur)) * 0.6);
/** electronic pulse: short low sine with a click */
const pulse = (f = 110) => make(0.18, (t) => (Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 18) + (t < 0.003 ? noise() * 0.4 : 0)));
/** particle tick: tiny high blip */
const tick = (f = 3200) => make(0.03, (t) => Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 200));
/** atmospheric texture: slow filtered noise swell */
const atmos = (dur = 3) => filter(make(dur, (t) => noise() * Math.sin(Math.PI * clamp(t / dur)) ** 2), 'bp', (t) => 300 + 500 * (t / dur), 0.6);
/** lemon-inspired liquid splash */
const splash = () => {
  const base = filter(make(0.6, (t) => noise() * (t < 0.012 ? t / 0.012 : Math.exp(-(t - 0.012) * 8))), 'bp', (t) => 2800 - 1500 * t, 0.8);
  const out = new Float32Array(base.length + SR / 2);
  out.set(base);
  for (let k = 0; k < 6; k++) {
    const d = K.droplet(700 + rnd() * 900);
    const o = Math.round((0.05 + rnd() * 0.4) * SR);
    for (let i = 0; i < d.length && o + i < out.length; i++) out[o + i] += d[i] * 0.5;
  }
  return out;
};

const cue = [];
const S = (label, sig, t, gain, pan = 0, send = 0.2) => { put(SFX, sig, t, gain, pan); if (send) put(SEND, sig, t, gain * send, pan); cue.push([t, label]); };
const W = (label, sig, t, gain, p0, p1) => { putPan(SFX, sig, t, gain, p0, p1); putPan(SEND, sig, t, gain * 0.2, p0, p1); cue.push([t, label]); };

/* ---------------- transitions ---------------- */
timing.scenes.forEach((s, i) => {
  if (!s.transition) return;
  const kind = s.transition.kind;
  const p = i % 2 ? 1 : -1;
  if (kind === 'glitch') { S('Glitch transition', glitch(0.32), TR(s.id, -0.06), 0.16, 0, 0.1); S('Low transition hit', pulse(70), TR(s.id), 0.3, 0, 0); }
  if (kind === 'dissolve') { for (let k = 0; k < 8; k++) S('Particle dissolve', tick(2600 + rnd() * 2400), TR(s.id, -0.1 + k * 0.06), 0.05, rnd() * 1.6 - 0.8, 0.4); W('Soft digital whoosh', K.whoosh(0.5, 900, 5000), TR(s.id, -0.15), 0.08, -p, p); }
  if (kind === 'focus') W('Focus whoosh', K.whoosh(0.6, 300, 2400), TR(s.id, -0.2), 0.14, p * 0.4, -p * 0.4);
  if (kind === 'zoom') { W('Zoom-through whoosh', K.whoosh(0.6, 200, 3600), TR(s.id, -0.25), 0.18, 0, 0); S('Low-frequency transition', pulse(55), TR(s.id, 0.05), 0.35, 0, 0); }
  if (kind === 'lightSweep') W('Neon energy sweep', neonSweep(0.8), TR(s.id, -0.3), 0.11, -0.8, 0.8);
  if (kind === 'push') W('Directional whoosh', K.whoosh(0.55, 250, 3000), TR(s.id, -0.2), 0.16, 0, 0);
});

/* ---------------- scene cues (dt = authored animation time) ---------------- */
// narration bar: a soft UI click as each Khmer caption arrives
const KH_AT = { 'f01-intro': 1.5, 'f01b-herbal': 1.3, 'f02-clean': 0.55, 'f03-stains': 0.6, 'f06-tartar': 0.8, 'f07-fluoride': 0.6, 'f09-gums': 0.6, 'f12-daily': 1.0, 'f13-finale': 1.3 };
for (const [id, at] of Object.entries(KH_AT)) S('Caption UI click', K.click(1500), T(id, at - 0.1), 0.06, 0, 0);

// 01 — cinematic lemon intro
S('Atmospheric introduction', atmos(3.2), 0, 0.09, 0, 0.5);
S('Reverse swell', K.swell([57, 64, 71], 1.0), 0, 0.05, 0, 0.6);
for (let k = 0; k < 5; k++) S('Water droplet', K.droplet(800 + rnd() * 700), T('f01-intro', 0.25 + k * 0.14), 0.05, rnd() * 1.2 - 0.6, 0.4);
W('Yellow-green light sweep', neonSweep(0.8), T('f01-intro', 0.5), 0.08, -0.8, 0.8);
S('Soft rising sweep', K.riser(0.8), T('f01-intro', 0.25), 0.12, 0, 0.3);
S('Elegant product reveal impact', K.impact(0.9), T('f01-intro', 1.05), 0.42);
S('Headline glitch', glitch(0.3), T('f01-intro', 1.1), 0.1, 0, 0.1);
S('Subtitle tick', tick(2400), T('f01-intro', 1.4), 0.08);
S('Tube light sweep', K.shimmer([81, 84, 88, 91]), T('f01-intro', 1.9), 0.05, 0, 0.6);

// 01b — Herbal Mint (Green Edition)
for (let k = 0; k < 4; k++) S('Leaf air', K.droplet(1000 + rnd() * 600), T('f01b-herbal', 0.15 + k * 0.16), 0.04, rnd() * 1.2 - 0.6, 0.4);
W('Green light sweep', neonSweep(0.8), T('f01b-herbal', 0.3), 0.08, -0.8, 0.8);
S('Elegant product reveal impact', K.impact(0.85), T('f01b-herbal', 0.65), 0.4);
S('Headline glitch', glitch(0.3), T('f01b-herbal', 0.7), 0.1, 0, 0.1);
S('Subtitle tick', tick(2400), T('f01b-herbal', 1.0), 0.08);
S('Tube light sweep', K.shimmer([81, 84, 88, 91]), T('f01b-herbal', 1.6), 0.05, 0, 0.6);

// 02 — clean teeth & fresh breath
S('Tooth appears — pulse', pulse(130), T('f02-clean', 0.1), 0.25);
for (let k = 0; k < 6; k++) S('Orbit particle', tick(2800 + k * 220), T('f02-clean', 0.35 + k * 0.14), 0.04, -0.6 + k * 0.24, 0.4);
W('Subtle airy whoosh', K.whoosh(1.2, 300, 1800), T('f02-clean', 0.6), 0.1, -0.8, 0.8);
S('Glass card in', K.pop(700), T('f02-clean', 0.75), 0.07);
S('Digital accent', K.click(2000), T('f02-clean', 0.95), 0.08, -0.3, 0);
S('Digital accent', K.click(2400), T('f02-clean', 1.15), 0.08, 0.3, 0);
S('Enamel glint', K.shimmer([84, 88, 91, 96]), T('f02-clean', 1.25), 0.04, 0, 0.6);

// 03 — surface stains
S('Grid pulse', pulse(90), T('f03-stains', 0.05), 0.2);
S('Headline accent', K.pop(640), T('f03-stains', 0.25), 0.07, -0.2);
S('Headline accent', K.pop(760), T('f03-stains', 0.35), 0.07, 0.2);
S('Pointer tick', tick(2200), T('f03-stains', 0.65), 0.08, -0.5);
S('Pointer tick', tick(2600), T('f03-stains', 0.85), 0.08, 0.5);
S('Clean scan', scanner(1.4, 700, 1500), T('f03-stains', 1.0), 0.05, 0, 0.3);

// 06 — tartar & stains
S('Headline accent', K.pop(700), T('f06-tartar', 0.2), 0.07);
[0, 1, 2].forEach((i) => S(`Cause card ${i + 1}`, K.pop(600 + i * 100), T('f06-tartar', 0.3 + i * 0.18), 0.08, -0.6 + i * 0.6));
S('Tooth appears — pulse', pulse(120), T('f06-tartar', 0.55), 0.18);
for (let k = 0; k < 10; k++) S('Stain particle drift', tick(1400 + rnd() * 900), T('f06-tartar', 0.95 + k * 0.12), 0.035, rnd() * 1.2 - 0.6, 0.3);
S('Clean scan', scanner(0.7, 900, 1700), T('f06-tartar', 1.9), 0.05, 0, 0.3);
W('Cards clear away', K.whoosh(0.6, 500, 3200), T('f06-tartar', 2.3), 0.1, -0.5, 0.5);
S('Clean product reveal impact', K.impact(0.7), T('f06-tartar', 2.65), 0.32);
S('Tube light sweep', K.shimmer([81, 84, 88, 91]), T('f06-tartar', 3.1), 0.04, 0, 0.6);

// 07 — fluoride
S('Headline impact', K.impact(0.45), T('f07-fluoride', 0.15), 0.2);
S('Luminous particles gather', K.swell([69, 76, 79, 83], 1.3), T('f07-fluoride', 0.1), 0.05, 0, 0.6);
S('Ring indicator sweep', scanner(1.3, 600, 1600), T('f07-fluoride', 0.7), 0.04, 0, 0.3);
S('Technical label', K.click(2200), T('f07-fluoride', 1.25), 0.08, 0, 0);
S('Protective shimmer', K.shimmer([83, 87, 90, 95]), T('f07-fluoride', 1.45), 0.05, 0, 0.7);

// 09 — gum care
S('Teeth settle — pulse', pulse(110), T('f09-gums', 0.1), 0.2);
S('Gumline highlight traces', scanner(1.0, 500, 900), T('f09-gums', 0.6), 0.04, -0.4, 0.3);
S('Glass card in', K.pop(700), T('f09-gums', 0.85), 0.07);
S('Check', K.click(1800), T('f09-gums', 1.05), 0.08, -0.3, 0);
S('Check', K.click(2100), T('f09-gums', 1.2), 0.08, 0.3, 0);

// 12 — daily oral hygiene
S('Product card in', K.pop(680), T('f12-daily', 0.25), 0.08);
W('Tube slides in', K.whoosh(0.5, 500, 2600), T('f12-daily', 0.4), 0.07, -0.6, -0.2);
S('Info row', K.click(1900), T('f12-daily', 0.75), 0.08, 0.3, 0);
S('Info row', K.click(2200), T('f12-daily', 0.95), 0.08, 0.3, 0);
S('Tube light sweep', K.shimmer([81, 84, 88, 91]), T('f12-daily', 1.0), 0.04, 0, 0.6);
for (let d = 0; d < 7; d++) S(`Day ${d + 1}`, tick(1800 + d * 180), T('f12-daily', 1.37 + d * 0.12), 0.07, -0.5 + d * 0.16);

// 13 — Zesty Lemon hero finale
S('Fresh cinematic sweep', K.riser(0.9), TR('f13-finale', -0.9), 0.14, 0, 0.3);
S('Soft product impact', K.impact(1.05), T('f13-finale', 0.35), 0.5);
S('Lemon splash', splash(), T('f13-finale', 0.4), 0.2, 0, 0.4);
for (let k = 0; k < 5; k++) S('Water droplet', K.droplet(800 + rnd() * 700), T('f13-finale', 0.5 + k * 0.15), 0.045, rnd() * 1.2 - 0.6, 0.4);
S('ZESTY LEMON type swell', K.swell([69, 76, 81], 1.0), T('f13-finale', 0.5), 0.05, 0, 0.6);
S('JAKUBEE glitch reveal', glitch(0.3), T('f13-finale', 1.0), 0.1, 0, 0.1);
S('Brand light sweep', K.shimmer([81, 85, 88, 93, 96]), T('f13-finale', 1.7), 0.06, 0, 0.8);
S('Elegant audio ending', make(3.4, (t) => ([57, 64, 67, 71, 76].reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / 5) * clamp(t / 0.05) * Math.exp(-t * 0.8)), T('f13-finale', 2.5), 0.09, 0, 0.8);

S('CTA reveal', K.pop(900), T('f13-finale', 2.45), 0.1, 0, 0.2);
S('CTA click', K.click(1600), T('f13-finale', 2.9), 0.09, 0, 0);

// caption-reading moments: quiet movement so the long captions never sit in silence
for (let k = 0; k < 4; k++) S('Orbit particle', tick(2600 + k * 260), T('f02-clean', 1.7 + k * 0.22), 0.035, -0.5 + k * 0.33, 0.4);
W('Air trail', K.whoosh(0.9, 600, 3200), T('f02-clean', 1.9), 0.06, 0.6, -0.6);
S('Scan complete', K.click(2600), T('f03-stains', 2.2), 0.06, 0.3, 0);
S('Clean shimmer', K.shimmer([86, 90, 93, 98]), T('f03-stains', 2.3), 0.04, 0, 0.6);
S('Gumline glow', K.shimmer([83, 87, 90, 95]), T('f09-gums', 1.5), 0.04, 0, 0.6);

// lead-in: a soft riser into every cut that has none yet, so no scene change arrives out of silence
for (const sc of timing.scenes.slice(1)) {
  const c = START[sc.id];
  if (cue.some(([t, l]) => /riser|swell/i.test(l) && t > c - 1.4 && t < c)) continue;
  S('Soft riser into cut', K.riser(0.7), c - 0.75, 0.06, 0, 0.35);
}

// very quiet atmospheric bed
put(SFX, filter(make(TOTAL, () => noise()), 'bp', (t) => 500 + 300 * Math.sin(t * 0.3), 0.5).map((x, i) => x * clamp(i / SR / 1.5)), 0, 0.012);

/* ---------------- reverb + master ---------------- */
const REV = [filter(K.reverb(SEND[0], 0), 'hp', 200), filter(K.reverb(SEND[1], 23), 'hp', 200)];
const OUT = path.join(here, '../public/audio/futuristic-soundtrack.wav');
K.master([[MUSIC, 1], [DRUMS, 1], [SFX, 1], [REV, 0.85]], OUT);

const fmt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
console.log(`✓ ${path.relative(process.cwd(), OUT)}  ${TOTAL.toFixed(2)} s @ ${BPM} BPM, peak −1 dBFS, ${cue.length} cues`);
if (process.argv.includes('--cues')) for (const [t, l] of cue.sort((a, b) => a[0] - b[0])) console.log(`  ${fmt(t)}  ${l}`);
