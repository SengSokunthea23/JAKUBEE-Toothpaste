// Theme 05 timeline — Lavender Editorial. Timing lives in timing.json (shared with the soundtrack script).
import React from 'react';
import { frames } from '../lib/anim';
import { TimeScale } from '../lib/useTime';
import timing from './timing.json';
import type { LavTransition } from './transitions';
import * as S from './scenes';

const COMPONENTS: Record<string, React.FC> = {
  'l01-intro': S.L01Intro,
  'l02-clean': S.L02Clean,
  'l03-stains': S.L03Stains,
  'l04-strong': S.L04Strong,
  'l05-bright': S.L05Bright,
  'l06-tartar': S.L06Tartar,
  'l07-fluoride': S.L07Fluoride,
  'l08-enamel': S.L08Enamel,
  'l09-gums': S.L09Gums,
  'l10-bacteria': S.L10Bacteria,
  'l11-breath': S.L11Breath,
  'l12-daily': S.L12Daily,
  'l13-finale': S.L13Finale,
};

export type LavScene = { id: string; component: React.FC; duration: number; transition?: { kind: LavTransition; duration: number } };

export const LAV_SCENES: LavScene[] = timing.scenes.map((s) => {
  const Scene = COMPONENTS[s.id];
  if (!Scene) throw new Error(`No component for lavender scene "${s.id}"`);
  const speed = (s as { speed?: number }).speed ?? 1;
  const component: React.FC = speed === 1 ? Scene : () => React.createElement(TimeScale, { speed, children: React.createElement(Scene) });
  return { id: s.id, component, duration: s.duration, transition: s.transition as LavScene['transition'] };
});

export const LAV_TOTAL_FRAMES = LAV_SCENES.reduce((n, s) => n + frames(s.duration), 0);
