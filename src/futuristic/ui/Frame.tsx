// Shared scene chrome: dark stage, content, vignette, scanlines, chapter label and the Khmer narration bar.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { F } from '../theme';
import { Glow, Scanlines, Stage, Vignette } from './Stage';
import { At, Narration, TechLabel } from './Type';

export const Frame: React.FC<{
  t: number;
  glows: Glow[];
  label: string;
  kh: string[];
  khAt: number;
  khSize?: number;
  khY?: number;
  floor?: boolean;
  children: React.ReactNode;
}> = ({ t, glows, label, kh, khAt, khSize, khY, floor, children }) => (
  <AbsoluteFill style={{ backgroundColor: F.obsidian, overflow: 'hidden' }}>
    <Stage t={t} glows={glows} floor={floor} />
    {children}
    <Vignette />
    <Scanlines t={t} />
    <At x={80} y={200} align="left">
      <TechLabel text={label} p={prog(t, 0.05, 0.6)} />
    </At>
    <Narration lines={kh} t={t} at={khAt} size={khSize} y={khY} />
  </AbsoluteFill>
);
