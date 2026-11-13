// Commercial theme timeline. Timing lives in timing.json (shared with
// scripts/generate-commercial-soundtrack.mjs, so music and SFX follow the picture).
import React from 'react';
import { frames } from './lib/anim';
import timing from './timing.json';
import { TimeScale } from './lib/useTime';
import { S01Intro } from './scenes/S01Intro';
import { S02ZestyLemon } from './scenes/S02ZestyLemon';
import { S03HerbalMint } from './scenes/S03HerbalMint';
import { S05FreshBreath } from './scenes/S05FreshBreath';
import { S07Whitening } from './scenes/S07Whitening';
import { S08Tartar } from './scenes/S08Tartar';
import { S09Fluoride } from './scenes/S09Fluoride';
import { S10Gums } from './scenes/S10Gums';
import { S11EndCard } from './scenes/S11EndCard';

export type TransitionKind = 'ripple' | 'wave' | 'fade' | 'split' | 'wipe';

export type SceneDef = {
  id: string;
  component: React.FC;
  /** seconds this scene owns on the master clock (start-to-start) */
  duration: number;
  /** animation playback speed (1 = as authored) */
  speed: number;
  /** transition INTO this scene (overlaps the end of the previous one) */
  transition?: { kind: TransitionKind; duration: number };
};

const COMPONENTS: Record<string, React.FC> = {
  '01-intro': S01Intro,
  '02-zesty-lemon': S02ZestyLemon,
  '03-herbal-mint': S03HerbalMint,
  '05-fresh-breath': S05FreshBreath,
  '07-whitening': S07Whitening,
  '08-tartar': S08Tartar,
  '09-fluoride': S09Fluoride,
  '10-gums': S10Gums,
  '11-end-card': S11EndCard,
};

export const SCENES: SceneDef[] = timing.scenes.map((s) => {
  const Scene = COMPONENTS[s.id];
  if (!Scene) throw new Error(`No component for scene "${s.id}"`);
  const speed = (s as { speed?: number }).speed ?? 1;
  // Each scene was authored at speed 1; `speed` plays its whole animation faster so it fits a shorter slot.
  const component: React.FC = () => React.createElement(TimeScale, { speed, children: React.createElement(Scene) });
  return { id: s.id, component, duration: s.duration, speed, transition: s.transition as SceneDef['transition'] };
});

/** Total length in frames (transitions overlap, so scenes are padded — see Commercial.tsx). */
export const TOTAL_FRAMES = SCENES.reduce((n, s) => n + frames(s.duration), 0);
