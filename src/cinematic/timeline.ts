// Cinematic theme timeline. Timing lives in timing.json (shared with the soundtrack generator).
import React from 'react';
import { frames } from '../lib/anim';
import timing from './timing.json';
import { TimeScale } from '../lib/useTime';
import type { CineTransition } from './transitions';
import { C01Hero } from './scenes/C01Hero';
import { C02BlueEdition } from './scenes/C02BlueEdition';
import { C04GreenEdition } from './scenes/C04GreenEdition';
import { C06Fresh } from './scenes/C06Fresh';
import { C07Whitening } from './scenes/C07Whitening';
import { C08Tartar } from './scenes/C08Tartar';
import { C09Fluoride } from './scenes/C09Fluoride';
import { C10Gums } from './scenes/C10Gums';
import { C11Finale } from './scenes/C11Finale';

const COMPONENTS: Record<string, React.FC> = {
  'c01-hero': C01Hero,
  'c02-blue-edition': C02BlueEdition,
  'c04-green-edition': C04GreenEdition,
  'c06-fresh': C06Fresh,
  'c07-whitening': C07Whitening,
  'c08-tartar': C08Tartar,
  'c09-fluoride': C09Fluoride,
  'c10-gums': C10Gums,
  'c11-finale': C11Finale,
};

export type CineScene = {
  id: string;
  component: React.FC;
  duration: number;
  speed: number;
  transition?: { kind: CineTransition; duration: number };
};

export const CINE_SCENES: CineScene[] = timing.scenes.map((s) => {
  const Scene = COMPONENTS[s.id];
  if (!Scene) throw new Error(`No component for cinematic scene "${s.id}"`);
  const speed = (s as { speed?: number }).speed ?? 1;
  // Each scene was authored at speed 1; `speed` plays its whole animation faster so it fits a shorter slot.
  const component: React.FC = () => React.createElement(TimeScale, { speed, children: React.createElement(Scene) });
  return { id: s.id, component, duration: s.duration, speed, transition: s.transition as CineScene['transition'] };
});

export const CINE_TOTAL_FRAMES = CINE_SCENES.reduce((n, s) => n + frames(s.duration), 0);
