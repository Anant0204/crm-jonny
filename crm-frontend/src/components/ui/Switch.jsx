import React from 'react';
import { cx } from '../../utils/classNames';

export const Switch = React.forwardRef(
  (
    {
      label,
      checked = false,
      onChange,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <label
        htmlFor={inputId}
        className={cx('switch-label', disabled && 'opacity-50 cursor-not-allowed', className)}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          style={{ display: 'none' }}
          {...props}
        />
        <div className="switch-track">
          <div className="switch-thumb" />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
