import React from 'react'

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200/60',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    info: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
    none: '',
  }

  // Handle undefined/null/empty children gracefully
  const displayValue = children == null || children === '' ? '-' : children

  // Ensure variant is valid, fallback to default
  const validVariant = variants[variant] ? variant : 'default'

  return (
    <span
      className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${variants[validVariant]} ${className || ''}`}
    >
      {displayValue}
    </span>
  )
}

export default Badge
