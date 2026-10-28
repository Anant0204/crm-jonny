import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 relative'
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md hover:shadow-indigo-500/25 focus:ring-indigo-500 shadow-sm active:scale-[0.98]',
    secondary: 'bg-cyan-600 hover:bg-cyan-700 text-white hover:shadow-md hover:shadow-cyan-500/25 focus:ring-cyan-500 shadow-sm active:scale-[0.98]',
    outline: 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:ring-indigo-500 bg-white shadow-sm',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-indigo-500',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow-md focus:ring-rose-500 shadow-sm active:scale-[0.98]',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
