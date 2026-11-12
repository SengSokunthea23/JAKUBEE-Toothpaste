// Master timeline. Change durations/transitions here; the soundtrack generator
// (scripts/generate_soundtrack.py) uses the same numbers.
import React from 'react';
import { frames } from './lib/anim';
import { S01Intro } from './scenes/S01Intro';
import { S02ZestyLemon } from './scenes/S02ZestyLemon';
import { S03HerbalMint } from './scenes/S03HerbalMint';
import { S04Benefits } from './scenes/S04Benefits';
import { S05FreshBreath } from './scenes/S05FreshBreath';
import { S06ChooseFlavour } from './scenes/S06ChooseFlavour';
import { S07Price } from './scenes/S07Price';
import { S08BundleDelivery } from './scenes/S08BundleDelivery';
import { S09Wholesale } from './scenes/S09Wholesale';
import { S10Guarantee } from './scenes/S10Guarantee';
import { S11EndCard } from './scenes/S11EndCard';

export type TransitionKind = 'ripple' | 'wave' | 'fade' | 'split' | 'wipe';

export type SceneDef = {
  id: string;
  component: React.FC;
  /** seconds this scene owns on the master clock (start-to-start) */
  duration: number;
  /** transition INTO this scene (overlaps the end of the previous one) */
  transition?: { kind: TransitionKind; duration: number };
};

export const SCENES: SceneDef[] = [
  { id: '01-intro', component: S01Intro, duration: 4.6 },
  { id: '02-zesty-lemon', component: S02ZestyLemon, duration: 5.2, transition: { kind: 'ripple', duration: 0.8 } },
  { id: '03-herbal-mint', component: S03HerbalMint, duration: 5.2, transition: { kind: 'wave', duration: 0.9 } },
  { id: '04-benefits', component: S04Benefits, duration: 7.0, transition: { kind: 'fade', duration: 0.6 } },
  { id: '05-fresh-breath', component: S05FreshBreath, duration: 4.6, transition: { kind: 'fade', duration: 0.5 } },
  { id: '06-choose-flavour', component: S06ChooseFlavour, duration: 4.4, transition: { kind: 'split', duration: 0.8 } },
  { id: '07-price', component: S07Price, duration: 4.2, transition: { kind: 'ripple', duration: 0.7 } },
  { id: '08-bundle-delivery', component: S08BundleDelivery, duration: 6.0, transition: { kind: 'wipe', duration: 0.6 } },
  { id: '09-wholesale', component: S09Wholesale, duration: 4.2, transition: { kind: 'fade', duration: 0.6 } },
  { id: '10-guarantee', component: S10Guarantee, duration: 3.4, transition: { kind: 'ripple', duration: 0.7 } },
  { id: '11-end-card', component: S11EndCard, duration: 6.4, transition: { kind: 'wave', duration: 0.8 } },
];

/** Total length in frames (transitions overlap, so scenes are padded — see Commercial.tsx). */
export const TOTAL_FRAMES = SCENES.reduce((n, s) => n + frames(s.duration), 0);
