// ─────────────────────────────────────────────────────────────────────────────
// FACIAL FOAM PRODUCT IMAGES — the only thing to change when the photos arrive.
//
// 1. Put the transparent PNG cut-outs in  public/products/
// 2. Set `file` to the file name and `aspect` to width ÷ height of the image.
//
// While `file` is null, every scene shows a clearly marked image slot
// (never toothpaste, never invented packaging).
// ─────────────────────────────────────────────────────────────────────────────

export type Edition = 'blue' | 'green';

export const FOAM: Record<Edition, { file: string | null; aspect: number; name: string }> = {
  blue: { file: null, aspect: 0.3, name: 'Blueberry Facial Foam' }, // e.g. 'products/foam-blueberry.png'
  green: { file: null, aspect: 0.3, name: 'Green Facial Foam' }, // e.g. 'products/foam-green.png'
};
