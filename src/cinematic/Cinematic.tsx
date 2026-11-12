import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { frames } from '../lib/anim';
import { FPS } from '../lib/theme';
import { Grain } from './fx/Stage';
import { CINE_SCENES } from './timeline';
import { CINE_TRANSITIONS } from './transitions';

export type CinematicProps = {
  /** Optional Khmer voice-over in /public, e.g. "audio/voiceover.mp3". */
  voiceover?: string;
  /** Music + SFX level (0–1). Defaults to 1, or 0.3 under a voice-over. */
  musicVolume?: number;
};

/** Premium cinematic theme: dark studio environments, light, depth and liquid transitions. */
export const Cinematic: React.FC<CinematicProps> = ({ voiceover, musicVolume }) => {
  const total = CINE_SCENES.reduce((n, s) => n + frames(s.duration), 0);
  const level = musicVolume ?? (voiceover ? 0.3 : 1);
  return (
    <AbsoluteFill style={{ backgroundColor: '#02060D' }}>
      <TransitionSeries>
        {CINE_SCENES.map((scene, i) => {
          const next = CINE_SCENES[i + 1];
          const length = frames(scene.duration) + (next?.transition ? frames(next.transition.duration) : 0);
          const Scene = scene.component;
          return (
            <React.Fragment key={scene.id}>
              {scene.transition && (
                <TransitionSeries.Transition
                  presentation={CINE_TRANSITIONS[scene.transition.kind]()}
                  timing={linearTiming({ durationInFrames: frames(scene.transition.duration) })}
                />
              )}
              <TransitionSeries.Sequence durationInFrames={length} name={scene.id}>
                <Scene />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      <Grain opacity={0.06} />
      <FadeBlack total={total} />
      <Audio src={staticFile('audio/cinematic-soundtrack.wav')} volume={(f) => level * interpolate(f, [total - FPS * 0.6, total], [1, 0.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      {voiceover ? <Audio src={staticFile(voiceover)} /> : null}
    </AbsoluteFill>
  );
};

/** Fades the last 0.6 s to black (the opening already rises out of darkness in scene 01). */
const FadeBlack: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [total - FPS * 0.6, total - 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (a <= 0) return null;
  return <AbsoluteFill style={{ backgroundColor: '#000', opacity: a, pointerEvents: 'none' }} />;
};
