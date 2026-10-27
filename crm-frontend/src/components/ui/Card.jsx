import React from 'react';
import { cx } from '../../utils/classNames';

export const Card = ({ children, className = '', style = {}, ...props }) => (
  <div
    className={cx('surface-card', className)}
    style={{
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-card)',
      transition: 'box-shadow var(--transition-normal), border-color var(--transition-normal)',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, action, className = '', style = {} }) => (
  <div
    className={cx('flex items-center justify-between p-4 sm:p-5 border-b border-subtle', className)}
    style={{
      borderBottom: '1px solid var(--border)',
      padding: '1rem 1.25rem',
      backgroundColor: 'transparent',
      ...style,
    }}
  >
    <div className="flex flex-col gap-0.5 min-w-0">
      {title && (
        <h4
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.015em',
            margin: 0,
          }}
        >
          {title}
        </h4>
      )}
      {subtitle && (
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            margin: 0,
            fontWeight: 500,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
    {action && <div className="flex items-center gap-2 flex-shrink-0">{action}</div>}
  </div>
);

export const CardBody = ({ children, className = '', style = {} }) => (
  <div
    className={cx('p-4 sm:p-5', className)}
    style={{
      padding: '1.25rem',
      ...style,
    }}
  >
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', style = {} }) => (
  <div
    className={cx('p-4 border-t border-subtle flex items-center justify-end gap-2', className)}
    style={{
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--surface-secondary)',
      padding: '0.875rem 1.25rem',
      ...style,
    }}
  >
    {children}
  </div>
);
