import React from 'react';
import { cx } from '../../utils/classNames';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  icon: Icon,
  dot = false,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <span
      className={cx('badge', `badge-${variant}`, className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.22rem 0.65rem',
        fontSize: '11px',
        fontWeight: 650,
        borderRadius: '9999px',
        lineHeight: 1.1,
        whiteSpace: 'nowrap',
        letterSpacing: '0.015em',
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      {Icon && <Icon size={12} className="flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
