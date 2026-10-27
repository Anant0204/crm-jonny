import React, { useState } from 'react';
import { cx } from '../../utils/classNames';

export const Tooltip = ({ children, content, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return children;

  const positionStyles = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-6px)' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(6px)' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-6px)' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(6px)' },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cx('tooltip-content', className)}
          style={{
            position: 'absolute',
            zIndex: 'var(--z-tooltip)',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--surface)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: 'var(--shadow-md)',
            ...positionStyles[position],
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
