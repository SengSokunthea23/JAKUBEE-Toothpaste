// Theme 03 timeline — JAKUBEE Zesty Lemon + Herbal Mint Toothpaste. Timing lives in timing.json
// (shared with the soundtrack generator).
import React from 'react';
import { frames } from '../lib/anim';
import { TimeScale } from '../lib/useTime';
import timing from './timing.json';
import type { EdTransition } from './transitions';
import { T01Intro } from './scenes/T01Intro';
import { T02ZestyLemon } from './scenes/T02ZestyLemon';
import { T03HerbalMint } from './scenes/T03HerbalMint';
import { T04CleanFresh } from './scenes/T04CleanFresh';
import { T05StainsWhitening } from './scenes/T05StainsWhitening';
import { T06Tartar } from './scenes/T06Tartar';
import { T07FluorideEnamel } from './scenes/T07FluorideEnamel';
import { T08SensitivityGums } from './scenes/T08SensitivityGums';
import { T11Finale } from './scenes/T11Finale';

const COMPONENTS: Record<string, React.FC> = {
  't01-intro': T01Intro,
  't02-zesty-lemon': T02ZestyLemon,
  't03-herbal-mint': T03HerbalMint,
  't04-clean-fresh': T04CleanFresh,
  't05-stains-whitening': T05StainsWhitening,
  't06-tartar': T06Tartar,
  't07-fluoride-enamel': T07FluorideEnamel,
  't08-sensitivity-gums': T08SensitivityGums,
  't11-finale': T11Finale,
};

export type EdScene = { id: string; component: React.FC; duration: number; speed: number; transition?: { kind: EdTransition; duration: number } };

export const ED_SCENES: EdScene[] = timing.scenes.map((s) => {
  const Scene = COMPONENTS[s.id];
  if (!Scene) throw new Error(`No component for editorial scene "${s.id}"`);
  const speed = (s as { speed?: number }).speed ?? 1;
  // Each scene was authored at speed 1; `speed` plays its whole animation faster so it fits a shorter slot.
  const component: React.FC = () => React.createElement(TimeScale, { speed, children: React.createElement(Scene) });
  return { id: s.id, component, duration: s.duration, speed, transition: s.transition as EdScene['transition'] };
});

export const ED_TOTAL_FRAMES = ED_SCENES.reduce((n, s) => n + frames(s.duration), 0);
