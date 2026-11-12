import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

const faces: { family: string; file: string; weight: string }[] = [
  { family: 'Manrope', file: 'Manrope-Medium.ttf', weight: '500' },
  { family: 'Manrope', file: 'Manrope-Bold.ttf', weight: '700' },
  { family: 'Manrope', file: 'Manrope-ExtraBold.ttf', weight: '800' },
  { family: 'Kantumruy Pro', file: 'KantumruyPro-Medium.ttf', weight: '500' },
  { family: 'Kantumruy Pro', file: 'KantumruyPro-SemiBold.ttf', weight: '600' },
  { family: 'Kantumruy Pro', file: 'KantumruyPro-Bold.ttf', weight: '700' },
];

/** Loads all local fonts; Remotion waits for them before rendering a frame. */
export const loadBrandFonts = () =>
  Promise.all(
    faces.map((f) =>
      loadFont({ family: f.family, url: staticFile(`fonts/${f.file}`), weight: f.weight, format: 'truetype' }),
    ),
  );
