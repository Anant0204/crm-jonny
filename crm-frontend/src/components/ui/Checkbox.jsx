import React from 'react';
import { Check, Minus } from 'lucide-react';
import { cx } from '../../utils/classNames';

export const Checkbox = React.forwardRef(
  (
    {
      label,
      checked = false,
      indeterminate = false,
      onChange,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={inputId}
        className={cx('checkbox-label', disabled && 'opacity-50 cursor-not-allowed', className)}
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
        <div className="custom-checkbox">
          {indeterminate ? (
            <Minus size={14} strokeWidth={3} />
          ) : (
            checked && <Check size={14} strokeWidth={3} />
          )}
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
