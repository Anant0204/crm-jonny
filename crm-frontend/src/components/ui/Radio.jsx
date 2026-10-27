import React from 'react';
import { cx } from '../../utils/classNames';

export const Radio = React.forwardRef(
  (
    {
      label,
      name,
      value,
      checked,
      onChange,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `radio-${name}-${value}`;

    return (
      <label
        htmlFor={inputId}
        className={cx('radio-label', disabled && 'opacity-50 cursor-not-allowed', className)}
      >
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          style={{ display: 'none' }}
          {...props}
        />
        <div className="custom-radio" />
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
