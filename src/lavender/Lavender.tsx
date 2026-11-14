import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { Grain } from '../cinematic/fx/Stage';
import { frames } from '../lib/anim';
import { FPS } from '../lib/theme';
import { L } from './theme';
import { LAV_SCENES, LAV_TOTAL_FRAMES } from './timeline';
import { LAV_TRANSITIONS } from './transitions';

export type LavenderProps = {
  /** Optional Khmer narration in /public, e.g. "audio/voiceover.mp3". The music and effects duck under it. */
  voiceover?: string;
  /** Music + SFX level (0–1). Defaults to 1, or 0.3 under a voice-over. */
  musicVolume?: number;
};

/** Theme 05 — Lavender Editorial × Symbolic 3D Storytelling · JAKUBEE Zesty Lemon + Herbal Mint. */
export const Lavender: React.FC<LavenderProps> = ({ voiceover, musicVolume }) => {
  const level = musicVolume ?? (voiceover ? 0.3 : 1);
  const total = LAV_TOTAL_FRAMES;
  return (
    <AbsoluteFill style={{ backgroundColor: L.plum }}>
      <TransitionSeries>
        {LAV_SCENES.map((scene, i) => {
          const next = LAV_SCENES[i + 1];
          const length = frames(scene.duration) + (next?.transition ? frames(next.transition.duration) : 0);
          const Scene = scene.component;
          return (
            <React.Fragment key={scene.id}>
              {scene.transition && (
                <TransitionSeries.Transition presentation={LAV_TRANSITIONS[scene.transition.kind]()} timing={linearTiming({ durationInFrames: frames(scene.transition.duration) })} />
              )}
              <TransitionSeries.Sequence durationInFrames={length} name={scene.id}>
                <Scene />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      <Grain opacity={0.04} />
      <FadeOut total={total} />
      <Audio src={staticFile('audio/lavender-soundtrack.wav')} volume={(f) => level * interpolate(f, [total - FPS * 0.8, total], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      {voiceover ? <Audio src={staticFile(voiceover)} /> : null}
    </AbsoluteFill>
  );
};

/** Fades the final 0.8 s to deep plum. */
const FadeOut: React.FC<{ total: number }> = ({ total }) => {
  const a = interpolate(useCurrentFrame(), [total - FPS * 0.8, total - 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return a > 0 ? <AbsoluteFill style={{ backgroundColor: L.plum, opacity: a }} /> : null;
};
