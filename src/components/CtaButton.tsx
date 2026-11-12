import React from 'react';
import { COLORS } from '../lib/theme';
import { easeBack } from '../lib/anim';
import { Icon } from './Icons';
import { Khmer } from './Typography';

/** Pulsing call-to-action pill with a repeating light sweep. */
export const CtaButton: React.FC<{ t: number; p: number; x: number; y: number; label: string }> = ({ t, p, x, y, label }) => {
  if (p <= 0) return null;
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, t - 2.6) * 5);
  const scale = (0.85 + 0.15 * easeBack(p)) * pulse;
  const sweep = t > 2.6 ? ((t - 2.6) % 2.2) / 1.0 : -1;
  const pos = -20 + 140 * sweep;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 400,
        top: y - 56,
        width: 800,
        height: 112,
        borderRadius: 56,
        background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.royal})`,
        boxShadow: '0 18px 40px rgba(7,29,69,0.30)',
        transform: `scale(${scale})`,
        opacity: p,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
      }}
    >
      <Khmer size={44} color="#FFFFFF">
        {label}
      </Khmer>
      <Icon name="arrow" size={40} />
      {sweep > 0 && sweep < 1 && (
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${pos - 10}%, rgba(255,255,255,0.35) ${pos}%, transparent ${pos + 10}%)` }} />
      )}
    </div>
  );
};
