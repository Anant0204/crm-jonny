import React, { useState, useRef, useEffect } from 'react';
import { cx } from '../../utils/classNames';

export const Dropdown = ({
  trigger,
  children,
  align = 'right', // 'left' | 'right'
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cx(
            'dropdown-menu',
            align === 'left' && 'dropdown-menu-left',
            className
          )}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children, icon: Icon, onClick, className = '', danger = false, ...props }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx('dropdown-item', danger && 'text-error', className)}
    {...props}
  >
    {Icon && <Icon size={16} className={danger ? 'text-error' : 'text-secondary'} />}
    <span>{children}</span>
  </button>
);

export const DropdownDivider = () => <div className="dropdown-divider" />;

export const DropdownHeader = ({ children }) => <div className="dropdown-header">{children}</div>;
