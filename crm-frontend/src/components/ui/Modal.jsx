import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cx } from '../../utils/classNames';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = '540px',
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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={cx('modal-content', className)}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 style={{ fontSize: 'var(--text-lg)' }}>{title}</h3>
          <Button variant="ghost" size="sm" isIconOnly icon={X} onClick={onClose} />
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
