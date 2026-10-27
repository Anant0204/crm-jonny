import React from 'react';
import { cx } from '../../utils/classNames';

export const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'primary', // 'primary' | 'success' | 'warning' | 'error'
  showLabel = true,
  height = '8px',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div className={cx('w-full flex flex-col gap-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-medium text-secondary">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          backgroundColor: 'var(--surface-secondary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: `var(--${variant})`,
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-normal)',
          }}
        />
      </div>
    </div>
  );
};
