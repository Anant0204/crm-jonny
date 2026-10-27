import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cx } from '../../utils/classNames';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'left', // 'left' | 'right'
  width = '320px',
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className={cx('drawer-content', `drawer-${position}`, className)}
        style={{ width, maxWidth: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          {title && <h3 style={{ fontSize: 'var(--text-lg)' }}>{title}</h3>}
          <Button variant="ghost" size="sm" isIconOnly icon={X} onClick={onClose} />
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </div>
  );
};
