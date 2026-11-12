// Theme 03 timeline — JAKUBEE Zesty Lemon Toothpaste. Timing lives in timing.json
// (shared with the soundtrack generator).
import React from 'react';
import { frames } from '../lib/anim';
import timing from './timing.json';
import type { EdTransition } from './transitions';
import { T01Intro } from './scenes/T01Intro';
import { T02ZestyLemon } from './scenes/T02ZestyLemon';
import { T03CleanFresh } from './scenes/T03CleanFresh';
import { T04StainsWhitening } from './scenes/T04StainsWhitening';
import { T05Tartar } from './scenes/T05Tartar';
import { T06FluorideEnamel } from './scenes/T06FluorideEnamel';
import { T07SensitivityGums } from './scenes/T07SensitivityGums';
import { T08FreshBreath } from './scenes/T08FreshBreath';
import { T09DailyCare } from './scenes/T09DailyCare';
import { T10Finale } from './scenes/T10Finale';

const COMPONENTS: Record<string, React.FC> = {
  't01-intro': T01Intro,
  't02-zesty-lemon': T02ZestyLemon,
  't03-clean-fresh': T03CleanFresh,
  't04-stains-whitening': T04StainsWhitening,
  't05-tartar': T05Tartar,
  't06-fluoride-enamel': T06FluorideEnamel,
  't07-sensitivity-gums': T07SensitivityGums,
  't08-fresh-breath': T08FreshBreath,
  't09-daily-care': T09DailyCare,
  't10-finale': T10Finale,
};

export type EdScene = { id: string; component: React.FC; duration: number; transition?: { kind: EdTransition; duration: number } };

export const ED_SCENES: EdScene[] = timing.scenes.map((s) => {
  const component = COMPONENTS[s.id];
  if (!component) throw new Error(`No component for editorial scene "${s.id}"`);
  return { id: s.id, component, duration: s.duration, transition: s.transition as EdScene['transition'] };
});

export const ED_TOTAL_FRAMES = ED_SCENES.reduce((n, s) => n + frames(s.duration), 0);
