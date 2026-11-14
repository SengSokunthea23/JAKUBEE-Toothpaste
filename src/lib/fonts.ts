import { loadFont } from '@remotion/fonts';
import { continueRender, delayRender, staticFile } from 'remotion';

const faces: { family: string; file: string; weight: string; style?: string }[] = [
  // editorial serif (Theme 05), OFL licence, from Google Fonts
  { family: 'DM Serif Display', file: 'DMSerifDisplay-Regular.ttf', weight: '400' },
  { family: 'DM Serif Display', file: 'DMSerifDisplay-Italic.ttf', weight: '400', style: 'italic' },
  { family: 'Manrope', file: 'Manrope-Medium.ttf', weight: '500' },
  { family: 'Manrope', file: 'Manrope-Bold.ttf', weight: '700' },
  { family: 'Manrope', file: 'Manrope-ExtraBold.ttf', weight: '800' },
  { family: 'Kantumruy Pro', file: 'KantumruyPro-Medium.ttf', weight: '500' },
  { family: 'Kantumruy Pro', file: 'KantumruyPro-SemiBold.ttf', weight: '600' },
  { family: 'Kantumruy Pro', file: 'KantumruyPro-Bold.ttf', weight: '700' },
];

/**
 * "Kantumruy Pro Label": the same Khmer font drawn 35% larger, Khmer characters only. Small label
 * styles put it after Manrope, so Khmer in small labels and chips stays readable while Latin
 * (Manrope) keeps its size. See `latinStack` in lib/theme.ts.
 */
export const KH_LABEL_FAMILY = 'Kantumruy Pro Label';
const labelFaces = [
  { file: 'KantumruyPro-SemiBold.ttf', weight: '500 600' },
  { file: 'KantumruyPro-Bold.ttf', weight: '700 900' },
];

const loadLabelFaces = async () => {
  const handle = delayRender('Loading Khmer label font');
  try {
    await Promise.all(
      labelFaces.map(async (f) => {
        const data = await fetch(staticFile(`fonts/${f.file}`)).then((r) => r.arrayBuffer());
        const descriptors = { weight: f.weight, unicodeRange: 'U+1780-17FF, U+19E0-19FF, U+200B-200D, U+25CC', sizeAdjust: '135%' };
        const face = new FontFace(KH_LABEL_FAMILY, data, descriptors as FontFaceDescriptors);
        await face.load();
        (document.fonts as unknown as { add: (f: FontFace) => void }).add(face);
      }),
    );
  } finally {
    continueRender(handle);
  }
};

/** Loads all local fonts; Remotion waits for them before rendering a frame. */
export const loadBrandFonts = () =>
  Promise.all([
    ...faces.map((f) => loadFont({ family: f.family, url: staticFile(`fonts/${f.file}`), weight: f.weight, style: f.style ?? 'normal', format: 'truetype' })),
    loadLabelFaces(),
  ]);
