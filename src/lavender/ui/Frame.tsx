// Shared scene chrome for Theme 05: lavender stage, content, a small chapter label and the Khmer caption.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { prog } from '../../lib/anim';
import { chapterNo } from '../copy';
import { Blob, Stage } from './Stage';
import { At, Caption, Label } from './Type';

export const Frame: React.FC<{
  t: number;
  n: number;
  label: string;
  kh: string[];
  khAt: number;
  khSize?: number;
  khY?: number;
  blobs?: Blob[];
  tone?: 'light' | 'deep';
  children: React.ReactNode;
}> = ({ t, n, label, kh, khAt, khSize, khY, blobs, tone = 'light', children }) => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <Stage t={t} blobs={blobs} tone={tone} />
    {children}
    <At x={84} y={190} align="left">
      <Label text={`${chapterNo(n)} — ${label}`} p={prog(t, 0.05, 0.6)} />
    </At>
    <Caption lines={kh} t={t} at={khAt} size={khSize} y={khY} dark={tone === 'deep'} />
  </AbsoluteFill>
);
