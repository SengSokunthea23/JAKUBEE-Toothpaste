import { useCurrentFrame } from 'remotion';
import { FPS } from './theme';

/** Current time in seconds, local to the enclosing scene/sequence. */
export const useTime = () => useCurrentFrame() / FPS;
