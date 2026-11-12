// Tiny dependency-free audio toolkit (synthesis, filters, reverb, WAV out).
// Used by the soundtrack generators. All times in seconds.
import fs from 'node:fs';

export const createKit = ({ seconds, sr = 48000, seed = 1234567 }) => {
  const SR = sr;
  const N = Math.ceil(seconds * SR);
  let s = seed;
  const rnd = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  const noise = () => rnd() * 2 - 1;
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const bus = () => [new Float32Array(N), new Float32Array(N)];

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
  const putPan = (b, sig, t0, gain, p0, p1) => {
    const i0 = Math.round(t0 * SR);
    for (let i = 0; i < sig.length; i++) {
      const j = i0 + i;
      if (j < 0 || j >= N) continue;
      const p = p0 + (p1 - p0) * (i / sig.length);
      b[0][j] += sig[i] * Math.cos(((p + 1) * Math.PI) / 4) * gain;
      b[1][j] += sig[i] * Math.sin(((p + 1) * Math.PI) / 4) * gain;
    }
  };

  /** RBJ biquad: type 'lp' | 'hp' | 'bp'; freq may be a function of time. */
  const filter = (sig, type, freq, q = 0.707) => {
    const out = new Float32Array(sig.length);
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0, b0 = 0, b1 = 0, b2 = 0, a1 = 0, a2 = 0;
    const set = (f) => {
      const w = (2 * Math.PI * clamp(f, 20, SR * 0.45)) / SR;
      const c = Math.cos(w), sn = Math.sin(w), al = sn / (2 * q), a0 = 1 + al;
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
    const o = new Float32Array(n);
    for (let i = 0; i < n; i++) o[i] = fn(i / SR, i, n);
    return o;
  };

  // band-limited saw wavetable
  const TBL = 4096;
  const SAW = new Float32Array(TBL);
  for (let h = 1; h <= 24; h++) for (let i = 0; i < TBL; i++) SAW[i] += Math.sin((2 * Math.PI * h * i) / TBL) / h;
  const sawAt = (ph) => { const x = (ph - Math.floor(ph)) * TBL; const i = x | 0; const f = x - i; return SAW[i] + (SAW[(i + 1) % TBL] - SAW[i]) * f; };

  /* ---- instruments & sound design ---- */
  const pad = (notes, len, bright = 1) => {
    const det = [-0.08, 0, 0.08];
    const out = new Float32Array(Math.round(len * SR));
    for (const m of notes) {
      const f = mtof(m);
      const ph = det.map(() => rnd());
      for (let i = 0; i < out.length; i++) {
        const t = i / SR;
        let v = 0;
        for (let j = 0; j < 3; j++) v += sawAt(ph[j] + f * Math.pow(2, det[j] / 12) * t);
        out[i] += (v / 3) * clamp(t / 0.6) * clamp((len - t) / 0.8) * bright;
      }
    }
    return out;
  };
  const pluck = (f, dur = 0.6, bright = 1) => make(dur, (t) => (Math.sin(2 * Math.PI * f * t) + 0.35 * bright * Math.sin(4 * Math.PI * f * t) + 0.1 * bright * Math.sin(6 * Math.PI * f * t)) * Math.exp(-t * 7) * clamp(t / 0.003));
  /** Soft electric-piano / mallet tone. */
  const keys = (f, dur = 1.2) => make(dur, (t) => (Math.sin(2 * Math.PI * f * t + 0.6 * Math.sin(2 * Math.PI * f * 2 * t) * Math.exp(-t * 6)) + 0.15 * Math.sin(2 * Math.PI * f * 3 * t) * Math.exp(-t * 9)) * Math.exp(-t * 2.6) * clamp(t / 0.004));
  const bell = (f, dur = 2.0) => make(dur, (t) => (Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 3)) * Math.exp(-t * 2.2) * clamp(t / 0.004));
  const kick = (punch = 1) => make(0.42, (t) => Math.sin(2 * Math.PI * (50 * t + (65 / 28) * (1 - Math.exp(-t * 28)))) * Math.exp(-t * 8) * punch + (t < 0.004 ? noise() * 0.25 : 0));
  const snap = () => filter(filter(make(0.22, (t) => noise() * (Math.exp(-t * 60) + 0.3 * Math.exp(-t * 18))), 'bp', 2200, 1.1), 'hp', 900);
  const hat = (open = false) => filter(make(open ? 0.22 : 0.05, (t) => noise() * Math.exp(-t * (open ? 16 : 90))), 'hp', 8000);
  const shaker = () => filter(make(0.08, (t) => noise() * Math.sin(Math.PI * clamp(t / 0.08)) ** 2), 'hp', 6500);
  const whoosh = (dur = 0.8, lo = 300, hi = 3200) => {
    const f = filter(make(dur, () => noise()), 'bp', (t) => lo + (hi - lo) * Math.sin(Math.PI * clamp(t / dur)), 1.2);
    return f.map((x, i) => x * Math.sin(Math.PI * clamp(i / f.length)) ** 2);
  };
  const riser = (dur = 1.0) => {
    const nz = filter(make(dur, () => noise()), 'bp', (t) => 250 * Math.pow(30, t / dur), 2);
    return make(dur, (t, i) => (nz[i] * 1.4 + Math.sin(2 * Math.PI * (220 * Math.pow(4, t / dur)) * t) * 0.18) * Math.pow(t / dur, 2.2));
  };
  const impact = (weight = 1) => {
    const body = make(1.4, (t) => Math.sin(2 * Math.PI * (44 * t + (60 / 14) * (1 - Math.exp(-t * 14)))) * Math.exp(-t * 3.4));
    const air = filter(make(1.4, (t) => noise() * Math.exp(-t * 7)), 'lp', 1600);
    return filter(body.map((x, i) => x * weight + air[i] * 0.35), 'hp', 38);
  };
  const shimmer = (notes = [81, 85, 88, 92, 95], dur = 2.4) => {
    const out = new Float32Array(Math.round(dur * SR));
    notes.forEach((m, k) => {
      const f = mtof(m), off = Math.round(k * 0.05 * SR);
      for (let i = off; i < out.length; i++) {
        const t = (i - off) / SR;
        out[i] += Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 1.7) * (0.75 + 0.25 * Math.sin(2 * Math.PI * 7 * t + k)) * clamp(t / 0.01);
      }
    });
    return out;
  };
  const droplet = (f0 = 900) => make(0.14, (t) => Math.sin(2 * Math.PI * f0 * (t + 9 * t * t)) * Math.exp(-t * 38) * clamp(t / 0.002));
  const pop = (f = 700) => make(0.09, (t) => Math.sin(2 * Math.PI * (f + 500 * (t / 0.09)) * t) * Math.exp(-t * 45));
  /** Soft UI click (two-layer: body + tick). */
  const click = (f = 1800) => make(0.04, (t) => (Math.sin(2 * Math.PI * f * t) * 0.6 + noise() * 0.4) * Math.exp(-t * 180));
  /** Keyboard keystroke. */
  const key = () => filter(make(0.03, (t) => noise() * Math.exp(-t * 220)), 'bp', 3200 + rnd() * 1200, 1.5);
  const thump = () => filter(make(0.32, (t) => Math.sin(2 * Math.PI * (60 * t + (40 / 30) * (1 - Math.exp(-t * 30)))) * Math.exp(-t * 12)), 'hp', 45);
  const swell = (notes, dur = 1.2) => make(dur, (t) => (notes.reduce((a, m) => a + Math.sin(2 * Math.PI * mtof(m) * t), 0) / notes.length) * Math.pow(t / dur, 3));

  const reverb = (inp, spread = 0, fb = 0.85, damp = 0.25) => {
    const sc = SR / 44100;
    const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((d) => ({ buf: new Float32Array(Math.round((d + spread) * sc)), i: 0, f: 0 }));
    const aps = [556, 441, 341, 225].map((d) => ({ buf: new Float32Array(Math.round((d + spread) * sc)), i: 0 }));
    const out = new Float32Array(N);
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

  /** Sum buses, soft-limit, normalise to -1 dBFS and write a 16-bit stereo WAV. */
  const master = (buses, outPath, fadeIn = 0.05) => {
    const L = new Float32Array(N), R = new Float32Array(N);
    for (const [b, g] of buses) for (let i = 0; i < N; i++) { L[i] += b[0][i] * g; R[i] += b[1][i] * g; }
    const Lh = filter(L, 'hp', 28), Rh = filter(R, 'hp', 28);
    let peak = 0;
    for (let i = 0; i < N; i++) {
      Lh[i] = Math.tanh(Lh[i] * 1.6) / 1.6;
      Rh[i] = Math.tanh(Rh[i] * 1.6) / 1.6;
      peak = Math.max(peak, Math.abs(Lh[i]), Math.abs(Rh[i]));
    }
    const norm = Math.pow(10, -1 / 20) / peak;
    const fi = Math.round(fadeIn * SR);
    const bytes = N * 4;
    const wav = Buffer.alloc(44 + bytes);
    wav.write('RIFF', 0); wav.writeUInt32LE(36 + bytes, 4); wav.write('WAVE', 8);
    wav.write('fmt ', 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
    wav.writeUInt32LE(SR, 24); wav.writeUInt32LE(SR * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34);
    wav.write('data', 36); wav.writeUInt32LE(bytes, 40);
    for (let i = 0; i < N; i++) {
      const g = norm * Math.min(1, i / fi);
      wav.writeInt16LE(Math.round(clamp(Lh[i] * g, -1, 1) * 32767), 44 + i * 4);
      wav.writeInt16LE(Math.round(clamp(Rh[i] * g, -1, 1) * 32767), 46 + i * 4);
    }
    fs.writeFileSync(outPath, wav);
  };

  return {
    SR, N, rnd, noise, mtof, clamp, bus, put, putPan, filter, filterBus, make, sawAt,
    pad, pluck, keys, bell, kick, snap, hat, shaker, whoosh, riser, impact, shimmer, droplet, pop, click, key, thump, swell, reverb, master,
  };
};

/** Scene start times (seconds) from a timing.json, matching the Remotion TransitionSeries padding. */
export const sceneStarts = (timing, fps = 30) => {
  const start = {};
  let f = 0;
  for (const s of timing.scenes) {
    start[s.id] = f / fps;
    f += Math.round(s.duration * fps);
  }
  return { start, total: f / fps };
};
