import React, { createContext, useContext } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

/** Playback speed for the scenes inside (1 = as authored). Lets a theme shorten a scene without re-timing it. */
const TimeScaleContext = createContext(1);

export const TimeScale: React.FC<{ speed: number; children: React.ReactNode }> = ({ speed, children }) =>
  React.createElement(TimeScaleContext.Provider, { value: speed }, children);

/**
 * Current time in seconds, local to the enclosing scene/sequence (scaled by any TimeScale above).
 * Uses the composition's real frame rate, so a theme rendered at 60 fps keeps the same timing as the soundtrack.
 */
export const useTime = () => {
  const { fps } = useVideoConfig();
  return (useCurrentFrame() / fps) * useContext(TimeScaleContext);
};
