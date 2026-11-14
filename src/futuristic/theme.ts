// Theme 04 — Futuristic Dental Science × Cinematic Product Motion. Palette, fonts and easing.
export const F = {
  // primary
  obsidian: '#080B0A',
  charcoal: '#151C19',
  neon: '#A8F044',
  lemon: '#D9F32A',
  white: '#FFFFFF',
  // secondary (from the real packaging)
  cyan: '#00BCEB',
  ice: '#49DDF2',
  silver: '#D5D9DC',
  soft: '#F7F8FA',
  // warm lemon from the tube's printed lemon (kept recognisable throughout)
  zest: '#FFD43B',
  // Herbal Mint green (from the Herbal pack)
  mint: '#7EDB5A',
  herb: '#2E9E55',
  mist: 'rgba(247,248,250,0.62)',
};

export const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const FONT = { latin: 'Manrope, "Kantumruy Pro", sans-serif', khmer: '"Kantumruy Pro", sans-serif' };

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const ease = {
  outExpo: (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  outQuint: (x: number) => 1 - Math.pow(1 - x, 5),
  inOut: (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  inOutSine: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
  outBack: (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2),
};
