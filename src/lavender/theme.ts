// Theme 05 — Editorial × Symbolic 3D Storytelling, in the product's own colours (the brief's lavender
// was replaced at the client's request). Palette, fonts and easing.
export const L = {
  // editorial environment, taken from the product (Zesty Lemon tube: aqua, cyan, lemon, silver, white)
  white: '#F3FBFE', // ice white
  lilac: '#CFEFF9', // pale aqua (soft shapes, haze)
  violet: '#4FC3E6', // fresh aqua (lines, rules, secondary text)
  purple: '#0789BF', // deep cyan (accent headlines)
  plum: '#123544', // deep sea navy (main text)
  // product accents (from the real packaging)
  lemon: '#F7D900',
  green: '#D8EF43',
  cyan: '#00BDEB',
  silver: '#D5D9DC',
  pure: '#FFFFFF',
  // supporting
  mint: '#7CC46A', // Herbal Mint leaf
  gum: '#F2B8C6', // soft gum pink
  ink: '#3A2A4D', // body text on lavender
};

export const FONT = {
  serif: '"DM Serif Display", "Kantumruy Pro", serif',
  sans: 'Manrope, "Kantumruy Pro", sans-serif',
  khmer: '"Kantumruy Pro", sans-serif',
};

export const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const ease = {
  outExpo: (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  outQuint: (x: number) => 1 - Math.pow(1 - x, 5),
  inOut: (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  inOutSine: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
  outBack: (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2),
};
