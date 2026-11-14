// Theme 04 timeline — JAKUBEE Zesty Lemon + Herbal Mint, Futuristic Dental Science. Timing lives in timing.json
// (shared with scripts/generate-futuristic-soundtrack.mjs).
import React from 'react';
import { frames } from '../lib/anim';
import { TimeScale } from '../lib/useTime';
import timing from './timing.json';
import type { FutTransition } from './transitions';
import { F01Intro } from './scenes/F01Intro';
import { F01bHerbal } from './scenes/F01bHerbal';
import { F02Clean } from './scenes/F02Clean';
import { F03Stains } from './scenes/F03Stains';
import { F06Tartar } from './scenes/F06Tartar';
import { F07Fluoride } from './scenes/F07Fluoride';
import { F09Gums } from './scenes/F09Gums';
import { F12Daily } from './scenes/F12Daily';
import { F13Finale } from './scenes/F13Finale';

const COMPONENTS: Record<string, React.FC> = {
  'f01-intro': F01Intro,
  'f01b-herbal': F01bHerbal,
  'f02-clean': F02Clean,
  'f03-stains': F03Stains,
  'f06-tartar': F06Tartar,
  'f07-fluoride': F07Fluoride,
  'f09-gums': F09Gums,
  'f12-daily': F12Daily,
  'f13-finale': F13Finale,
};

export type FutScene = { id: string; component: React.FC; duration: number; transition?: { kind: FutTransition; duration: number } };

export const FUT_SCENES: FutScene[] = timing.scenes.map((s) => {
  const Scene = COMPONENTS[s.id];
  if (!Scene) throw new Error(`No component for futuristic scene "${s.id}"`);
  const speed = (s as { speed?: number }).speed ?? 1;
  const component: React.FC = speed === 1 ? Scene : () => React.createElement(TimeScale, { speed, children: React.createElement(Scene) });
  return { id: s.id, component, duration: s.duration, transition: s.transition as FutScene['transition'] };
});

export const FUT_TOTAL_FRAMES = FUT_SCENES.reduce((n, s) => n + frames(s.duration), 0);
