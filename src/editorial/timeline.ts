// Theme 03 timeline. Timing lives in timing.json (shared with the soundtrack generator).
import React from 'react';
import { frames } from '../lib/anim';
import timing from './timing.json';
import type { EdTransition } from './transitions';
import { E01TwoEditions } from './scenes/E01TwoEditions';
import { E02Blueberry } from './scenes/E02Blueberry';
import { E03OilyAcne } from './scenes/E03OilyAcne';
import { E04Cleansing } from './scenes/E04Cleansing';
import { E05Green } from './scenes/E05Green';
import { E06DrySkin } from './scenes/E06DrySkin';
import { E07DailyMakeup } from './scenes/E07DailyMakeup';
import { E08Foam } from './scenes/E08Foam';
import { E09Glow } from './scenes/E09Glow';
import { E10Price } from './scenes/E10Price';
import { E11Bundle } from './scenes/E11Bundle';
import { E12Wholesale } from './scenes/E12Wholesale';
import { E13Guarantee } from './scenes/E13Guarantee';
import { E14Finale } from './scenes/E14Finale';

const COMPONENTS: Record<string, React.FC> = {
  'e01-two-editions': E01TwoEditions,
  'e02-blueberry': E02Blueberry,
  'e03-oily-acne': E03OilyAcne,
  'e04-cleansing': E04Cleansing,
  'e05-green': E05Green,
  'e06-dry-skin': E06DrySkin,
  'e07-daily-makeup': E07DailyMakeup,
  'e08-foam': E08Foam,
  'e09-glow': E09Glow,
  'e10-price': E10Price,
  'e11-bundle': E11Bundle,
  'e12-wholesale': E12Wholesale,
  'e13-guarantee': E13Guarantee,
  'e14-finale': E14Finale,
};

export type EdScene = { id: string; component: React.FC; duration: number; transition?: { kind: EdTransition; duration: number } };

export const ED_SCENES: EdScene[] = timing.scenes.map((s) => {
  const component = COMPONENTS[s.id];
  if (!component) throw new Error(`No component for editorial scene "${s.id}"`);
  return { id: s.id, component, duration: s.duration, transition: s.transition as EdScene['transition'] };
});

export const ED_TOTAL_FRAMES = ED_SCENES.reduce((n, s) => n + frames(s.duration), 0);
