import React from 'react';
import { cx } from '../../utils/classNames';

export const Skeleton = ({
  width = '100%',
  height = '16px',
  borderRadius = 'var(--radius-sm)',
  className = '',
  circle = false,
}) => {
  return (
    <div
      className={cx(circle && 'rounded-full', className)}
      style={{
        width: circle ? height : width,
        height,
        borderRadius: circle ? '50%' : borderRadius,
        backgroundColor: 'var(--surface-secondary)',
        backgroundImage: 'linear-gradient(90deg, var(--surface-secondary) 0%, var(--surface-hover) 50%, var(--surface-secondary) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonPulse 1.5s ease-in-out infinite',
      }}
    />
  );
};
