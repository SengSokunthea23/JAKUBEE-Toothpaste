import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { frames } from './lib/anim';
import { ripple, softFade, split, wave, wipe } from './transitions/presentations';
import { SCENES, TransitionKind } from './timeline';

const PRESENTATIONS: Record<TransitionKind, () => ReturnType<typeof ripple>> = {
  ripple,
  wave,
  fade: softFade,
  split,
  wipe,
};

export type CommercialProps = {
  /** Optional Khmer voice-over in /public, e.g. "audio/voiceover.mp3". */
  voiceover?: string;
  /** Music level (0–1). Auto-ducks under a voice-over. */
  musicVolume?: number;
};

export const Commercial: React.FC<CommercialProps> = ({ voiceover, musicVolume }) => {
  const music = musicVolume ?? (voiceover ? 0.35 : 1);
  return (
    <AbsoluteFill style={{ backgroundColor: '#F5F5F2' }}>
      <TransitionSeries>
        {SCENES.map((scene, i) => {
          const next = SCENES[i + 1];
          // Pad each scene by the next transition so scene starts stay on the master clock.
          const length = frames(scene.duration) + (next?.transition ? frames(next.transition.duration) : 0);
          const Scene = scene.component;
          return (
            <React.Fragment key={scene.id}>
              {scene.transition && (
                <TransitionSeries.Transition
                  presentation={PRESENTATIONS[scene.transition.kind]()}
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
      <Audio src={staticFile('audio/soundtrack.wav')} volume={music} />
      {voiceover ? <Audio src={staticFile(voiceover)} /> : null}
    </AbsoluteFill>
  );
};
