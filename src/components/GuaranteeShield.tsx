import React from 'react';
import { COLORS } from '../lib/theme';
import { easeBack, easeOut, prog } from '../lib/anim';

/** Blue→green shield with a self-drawing checkmark and a pulse ring. */
export const GuaranteeShield: React.FC<{ t: number; x: number; y: number; size: number }> = ({ t, x, y, size }) => {
  const q = prog(t, 0.25, 0.8);
  if (q <= 0) return null;
  const check = prog(t, 0.7, 1.2);
  const pulse = prog(t, 0.8, 1.8);
  const s = 0.5 + 0.5 * easeBack(q);
  const checkLen = 210;
  return (
    <>
      {pulse > 0 && pulse < 1 && (
        <div
          style={{
            position: 'absolute',
            left: x - 150,
            top: y - 150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: `3px solid ${COLORS.aqua}`,
            transform: `scale(${0.8 + 0.5 * easeOut(pulse)})`,
            opacity: 1 - pulse,
          }}
        />
      )}
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `scale(${s})`, opacity: q }}>
        <defs>
          <linearGradient id="shieldGrad" x1="0" x2="1">
            <stop offset="0" stopColor={COLORS.aqua} />
            <stop offset="1" stopColor={COLORS.botanical} />
          </linearGradient>
        </defs>
        <path d="M50 3 L92 18 L88 58 Q 78 84 50 97 Q 22 84 12 58 L8 18 Z" fill="url(#shieldGrad)" />
        <path
          d="M27 50 L44 66 L74 34"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={checkLen}
          strokeDashoffset={checkLen * (1 - easeOut(check))}
          pathLength={checkLen}
        />
      </svg>
    </>
  );
};
