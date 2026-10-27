import React from 'react';
import { cx } from '../../utils/classNames';

export const Avatar = ({
  src,
  name = 'User',
  size = 'md', // 'sm' (28px), 'md' (36px), 'lg' (48px), 'xl' (64px)
  status,     // 'online' | 'offline' | 'busy' | 'away'
  className = '',
}) => {
  const getInitials = (n) => {
    if (!n || typeof n !== 'string') return 'U';
    const trimmed = n.trim();
    if (!trimmed) return 'U';
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const first = parts[0][0] || '';
      const last = parts[parts.length - 1][0] || '';
      return `${first}${last}`.toUpperCase();
    }
    return trimmed.slice(0, 2).toUpperCase();
  };

  const sizePx = size === 'sm' ? 28 : size === 'lg' ? 48 : size === 'xl' ? 64 : 36;
  const fontSize = size === 'sm' ? '11px' : size === 'lg' ? '16px' : size === 'xl' ? '20px' : '13px';

  return (
    <div style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cx('rounded-full', className)}
          style={{ width: `${sizePx}px`, height: `${sizePx}px`, objectFit: 'cover' }}
        />
      ) : (
        <div
          className={cx('rounded-full flex items-center justify-center font-bold', className)}
          style={{
            width: `${sizePx}px`,
            height: `${sizePx}px`,
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize,
            border: '1px solid var(--primary-border)',
          }}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor:
              status === 'online'
                ? 'var(--success)'
                : status === 'busy'
                ? 'var(--error)'
                : 'var(--warning)',
            border: '2px solid var(--surface)',
          }}
        />
      )}
    </div>
  );
};
