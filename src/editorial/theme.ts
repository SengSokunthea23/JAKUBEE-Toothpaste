// Theme 03 — Cinematic Editorial × Premium Digital Experience.
// Light, warm, editorial environment; product identity stays blue / green.

export const BLUE = { navy: '#071D45', royal: '#0879C9', aqua: '#20C9F4', ice: '#8DDDF5', pale: '#DFF5FF' } as const;
export const GREEN = { forest: '#123B2A', botanical: '#247849', fresh: '#64A84C', sage: '#B9D99B', cream: '#F7FBF3' } as const;

export const INK = {
  base: '#F4F2EE', // warm studio white
  paper: '#FFFFFF',
  silver: '#D8DCE1',
  mist: '#8A919B',
  slate: '#4B525C',
  charcoal: '#1C2230',
  warm: '#F6C9A0', // atmospheric warm light only — never product identity
  warmSoft: '#FBE3CC',
} as const;

export const ED = { blue: BLUE, green: GREEN };

/** Edition accent pair: [strong, light]. */
export const accent = (e: 'blue' | 'green') => (e === 'blue' ? [BLUE.royal, BLUE.ice] : [GREEN.botanical, GREEN.sage]);

export const SHADOW = {
  card: '0 30px 70px rgba(28,34,48,0.13), 0 6px 18px rgba(28,34,48,0.06)',
  soft: '0 14px 34px rgba(28,34,48,0.10)',
  lift: '0 50px 90px rgba(28,34,48,0.18), 0 10px 24px rgba(28,34,48,0.08)',
};

export const ease = {
  outExpo: (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  outQuint: (x: number) => 1 - Math.pow(1 - x, 5),
  inOut: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
  outBack: (x: number, s = 1.4) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
};

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
