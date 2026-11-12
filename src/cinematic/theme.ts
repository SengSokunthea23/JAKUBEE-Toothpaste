// Cinematic theme — colour grading, lighting presets and motion curves.
// Brand palettes are the JAKUBEE Blue / Green Edition values.

export const BLUE = {
  navy: '#071D45',
  royal: '#0879C9',
  aqua: '#20C9F4',
  ice: '#8DDDF5',
  pale: '#DFF5FF',
  white: '#FFFFFF',
} as const;

export const GREEN = {
  forest: '#123B2A',
  botanical: '#247849',
  fresh: '#64A84C',
  sage: '#B9D99B',
  cream: '#F7FBF3',
  white: '#FFFFFF',
} as const;

/** Neutral studio tones for shared / pricing scenes. */
export const NOIR = {
  ink: '#04070F',
  deep: '#0A1222',
  slate: '#1A2436',
  silver: '#C9D3DE',
  mist: '#8C99A8',
} as const;

export type Tone = 'blue' | 'green' | 'dual' | 'noir';

/** Per-tone lighting: base gradient stops, key-light colour, rim colour, bokeh colours. */
export const LIGHT: Record<Tone, { core: string; mid: string; edge: string; key: string; rim: string; bokeh: string[] }> = {
  blue: { core: '#0D4A93', mid: BLUE.navy, edge: '#020817', key: BLUE.ice, rim: BLUE.aqua, bokeh: [BLUE.aqua, BLUE.ice, BLUE.pale] },
  green: { core: '#2A6B45', mid: GREEN.forest, edge: '#030E08', key: GREEN.sage, rim: '#9FE07A', bokeh: [GREEN.sage, GREEN.fresh, GREEN.cream] },
  dual: { core: '#163A5E', mid: '#0A1A30', edge: '#02060D', key: '#DCEBFF', rim: '#BFEFFF', bokeh: [BLUE.aqua, GREEN.sage, BLUE.ice] },
  noir: { core: '#1B2840', mid: NOIR.deep, edge: NOIR.ink, key: '#E8F0FA', rim: '#D6E6F5', bokeh: [BLUE.ice, GREEN.sage, '#FFFFFF'] },
};

export const GRAD = {
  ice: `linear-gradient(180deg, #FFFFFF 10%, ${BLUE.ice} 100%)`,
  sage: `linear-gradient(180deg, #FFFFFF 10%, ${GREEN.sage} 100%)`,
  brand: `linear-gradient(90deg, ${BLUE.aqua}, ${GREEN.sage})`,
  silver: `linear-gradient(180deg, #FFFFFF 0%, ${NOIR.silver} 100%)`,
};

/** Smooth cinematic curves. */
export const ease = {
  outExpo: (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inOutSine: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
  outQuint: (x: number) => 1 - Math.pow(1 - x, 5),
  inQuad: (x: number) => x * x,
};

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
