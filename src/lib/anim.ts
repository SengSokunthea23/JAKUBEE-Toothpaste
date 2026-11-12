// Small animation helpers. All times are in SECONDS, local to the scene.
import { FPS } from './theme';

export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

/** 0→1 progress between two times (seconds). */
export const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));

export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
/** Ease-out with a subtle overshoot. */
export const easeBack = (x: number, s = 1.25) => {
  const c3 = s + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
};

export const sec = (frame: number) => frame / FPS;
export const frames = (seconds: number) => Math.round(seconds * FPS);

/** Deterministic pseudo-random generator so every render is identical. */
export const seeded = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};
