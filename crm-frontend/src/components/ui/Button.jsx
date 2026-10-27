import React from 'react';
import { Loader2 } from 'lucide-react';
import { cx } from '../../utils/classNames';

export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
      size = 'md',        // 'sm' | 'md' | 'lg'
      isLoading = false,
      isDisabled = false,
      icon: Icon,
      iconPosition = 'left',
      isIconOnly = false,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const disabled = isDisabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cx(
          'btn',
          `btn-${variant}`,
          `btn-${size}`,
          isIconOnly && 'btn-icon-only',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        {!isLoading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        {!isIconOnly && children && <span>{children}</span>}
        {!isLoading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      </button>
    );
  }
);

Button.displayName = 'Button';
