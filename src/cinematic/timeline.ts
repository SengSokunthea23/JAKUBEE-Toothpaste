// Cinematic theme timeline. Timing lives in timing.json (shared with the soundtrack generator).
import React from 'react';
import { frames } from '../lib/anim';
import timing from './timing.json';
import type { CineTransition } from './transitions';
import { C01Hero } from './scenes/C01Hero';
import { C02BlueEdition } from './scenes/C02BlueEdition';
import { C03Macro } from './scenes/C03Macro';
import { C04GreenEdition } from './scenes/C04GreenEdition';
import { C05Benefits } from './scenes/C05Benefits';
import { C06Fresh } from './scenes/C06Fresh';
import { C07Price } from './scenes/C07Price';
import { C08Bundle } from './scenes/C08Bundle';
import { C09Wholesale } from './scenes/C09Wholesale';
import { C10Guarantee } from './scenes/C10Guarantee';
import { C11Finale } from './scenes/C11Finale';

const COMPONENTS: Record<string, React.FC> = {
  'c01-hero': C01Hero,
  'c02-blue-edition': C02BlueEdition,
  'c03-macro': C03Macro,
  'c04-green-edition': C04GreenEdition,
  'c05-benefits': C05Benefits,
  'c06-fresh': C06Fresh,
  'c07-price': C07Price,
  'c08-bundle': C08Bundle,
  'c09-wholesale': C09Wholesale,
  'c10-guarantee': C10Guarantee,
  'c11-finale': C11Finale,
};

export type CineScene = {
  id: string;
  component: React.FC;
  duration: number;
  transition?: { kind: CineTransition; duration: number };
};

export const CINE_SCENES: CineScene[] = timing.scenes.map((s) => {
  const component = COMPONENTS[s.id];
  if (!component) throw new Error(`No component for cinematic scene "${s.id}"`);
  return { id: s.id, component, duration: s.duration, transition: s.transition as CineScene['transition'] };
});

export const CINE_TOTAL_FRAMES = CINE_SCENES.reduce((n, s) => n + frames(s.duration), 0);
