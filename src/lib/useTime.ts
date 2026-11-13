import React, { createContext, useContext } from 'react';
import { useCurrentFrame } from 'remotion';
import { FPS } from './theme';

/** Playback speed for the scenes inside (1 = as authored). Lets a theme shorten a scene without re-timing it. */
const TimeScaleContext = createContext(1);

export const TimeScale: React.FC<{ speed: number; children: React.ReactNode }> = ({ speed, children }) =>
  React.createElement(TimeScaleContext.Provider, { value: speed }, children);

/** Current time in seconds, local to the enclosing scene/sequence (scaled by any TimeScale above). */
export const useTime = () => (useCurrentFrame() / FPS) * useContext(TimeScaleContext);
