// Khmer text helpers. On-screen words use Khmer from the script; the typography components check
// for Khmer so it gets no letter-spacing, a taller line-height and is never split inside a word.

const KHMER = /[ក-៿᧠-᧿]/;

/** True when the text contains Khmer characters. */
export const hasKh = (text: unknown): boolean => {
  if (typeof text === 'string') return KHMER.test(text);
  if (Array.isArray(text)) return text.some(hasKh);
  return false;
};

/** Line-height for Khmer, so vowels above and subscripts below are never clipped. */
export const KH_LINE = 1.5;

/** Khmer combining marks (vowel signs, signs) — a cut must never come just before one. */
const MARK = /[឴-៑៓៝]/;
const COENG = '្';

/**
 * Slices `text` to about `n` characters without cutting a Khmer cluster in half
 * (used where text is typed out character by character).
 */
export const safeSlice = (text: string, n: number): string => {
  let end = Math.max(0, Math.min(text.length, n));
  while (end > 0 && end < text.length && (MARK.test(text[end]) || text[end] === COENG || text[end - 1] === COENG)) end++;
  return text.slice(0, end);
};
