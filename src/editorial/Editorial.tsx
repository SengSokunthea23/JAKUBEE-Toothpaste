import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { Grain } from '../cinematic/fx/Stage';
import { frames } from '../lib/anim';
import { FPS } from '../lib/theme';
import { ED_SCENES, ED_TOTAL_FRAMES } from './timeline';
import { ED_TRANSITIONS } from './transitions';

export type EditorialProps = {
  /** Optional Khmer voice-over in /public, e.g. "audio/voiceover.mp3". */
  voiceover?: string;
  /** Music + SFX level (0–1). Defaults to 1, or 0.3 under a voice-over. */
  musicVolume?: number;
};

/** Theme 03 — Cinematic Editorial × Premium Digital Experience. */
export const Editorial: React.FC<EditorialProps> = ({ voiceover, musicVolume }) => {
  const level = musicVolume ?? (voiceover ? 0.3 : 1);
  const total = ED_TOTAL_FRAMES;
  return (
    <AbsoluteFill style={{ backgroundColor: '#F4F2EE' }}>
      <TransitionSeries>
        {ED_SCENES.map((scene, i) => {
          const next = ED_SCENES[i + 1];
          const length = frames(scene.duration) + (next?.transition ? frames(next.transition.duration) : 0);
          const Scene = scene.component;
          return (
            <React.Fragment key={scene.id}>
              {scene.transition && (
                <TransitionSeries.Transition presentation={ED_TRANSITIONS[scene.transition.kind]()} timing={linearTiming({ durationInFrames: frames(scene.transition.duration) })} />
              )}
              <TransitionSeries.Sequence durationInFrames={length} name={scene.id}>
                <Scene />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      <Grain opacity={0.035} />
      <FadeOut total={total} />
      <Audio src={staticFile('audio/editorial-soundtrack.wav')} volume={(f) => level * interpolate(f, [total - FPS * 0.7, total], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      {voiceover ? <Audio src={staticFile(voiceover)} /> : null}
    </AbsoluteFill>
  );
};

/** Fades the final 0.7 s to warm white. */
const FadeOut: React.FC<{ total: number }> = ({ total }) => {
  const a = interpolate(useCurrentFrame(), [total - FPS * 0.7, total - 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return a > 0 ? <AbsoluteFill style={{ backgroundColor: '#F4F2EE', opacity: a }} /> : null;
};
