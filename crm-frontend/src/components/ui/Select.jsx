import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { cx } from '../../utils/classNames';

export const Select = React.forwardRef(
  (
    {
      label,
      options = [],
      placeholder,
      errorMessage,
      helperText,
      value,
      onChange,
      disabled,
      required,
      className = '',
      id,
      style = {},
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="form-group" style={{ margin: 0 }}>
        {label && (
          <label htmlFor={selectId} className="form-label">
            <span>
              {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
            </span>
          </label>
        )}

        <div className="form-control-wrapper" style={{ position: 'relative', width: '100%' }}>
          <select
            ref={ref}
            id={selectId}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={cx(
              'form-control',
              'form-control-has-icon-end',
              errorMessage && 'form-control-error',
              className
            )}
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              paddingRight: '2.25rem',
              ...style,
              ...props.style,
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>

          <span
            className="input-icon-end"
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronDown size={16} />
          </span>
        </div>

        {errorMessage ? (
          <div className="form-error-msg">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        ) : helperText ? (
          <div className="form-helper">{helperText}</div>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
