// JAKUBEE brand system — colours, type, layout constants.

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

export const COLORS = {
  // Blue Edition — Zesty Lemon
  navy: '#071D45',
  royal: '#0879C9',
  aqua: '#20C9F4',
  ice: '#8DDDF5',
  softBlue: '#DFF5FF',
  // Green Edition — Herbal Mint
  forest: '#123B2A',
  botanical: '#247849',
  freshGreen: '#64A84C',
  sage: '#B9D99B',
  cream: '#F7FBF3',
  // Shared
  white: '#FFFFFF',
  ivory: '#F5F5F2',
  silver: '#D9DEE3',
  charcoal: '#252A30',
  mid: '#4A5058',
  grey: '#6B7178',
  // Accent used only for lemon slice decor (matches pack art)
  lemonRind: '#F2B705',
  lemonFlesh: '#FFD43B',
  lemonPith: '#FFF6CF',
} as const;

export const FONTS = {
  latin: "'Manrope', 'Inter', 'Helvetica Neue', sans-serif",
  khmer: "'Kantumruy Pro', 'Noto Sans Khmer', sans-serif",
} as const;

/** Brand gradient used when both variants are presented together. */
export const BRAND_GRADIENT = `linear-gradient(90deg, ${COLORS.royal}, ${COLORS.botanical})`;

/** Meta / TikTok vertical safe zone — keep key copy inside it. */
export const SAFE = { top: 260, bottom: 1560 };
