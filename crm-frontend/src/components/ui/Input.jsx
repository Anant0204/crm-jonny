import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { cx } from '../../utils/classNames';

export const Input = React.forwardRef(
  (
    {
      label,
      helperText,
      errorMessage,
      startIcon: StartIcon,
      endIcon: EndIcon,
      isClearable = false,
      onClear,
      value,
      onChange,
      className = '',
      id,
      disabled,
      required,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={inputId} className="form-label">
            <span>
              {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
            </span>
          </label>
        )}

        <div className="form-control-wrapper">
          {StartIcon && (
            <span className="input-icon-start">
              <StartIcon size={18} />
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={cx(
              'form-control',
              StartIcon && 'form-control-has-icon-start',
              (EndIcon || isClearable) && 'form-control-has-icon-end',
              errorMessage && 'form-control-error',
              className
            )}
            {...props}
          />

          {isClearable && value && (
            <button
              type="button"
              onClick={onClear}
              className="input-icon-end"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <X size={16} />
            </button>
          )}

          {!isClearable && EndIcon && (
            <span className="input-icon-end">
              <EndIcon size={18} />
            </span>
          )}
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

Input.displayName = 'Input';
