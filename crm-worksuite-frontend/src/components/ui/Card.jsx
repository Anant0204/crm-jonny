import React from 'react'

const Card = ({ children, className = '', onClick, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/80 p-3 lg:p-4',
    elevated: 'bg-white rounded-xl shadow-md border border-slate-200/80 p-3 lg:p-4',
    flat: 'bg-white rounded-xl border border-slate-200 p-3 lg:p-4',
    compact: 'bg-white rounded-lg shadow-sm border border-slate-200/80 p-2.5',
  }

  return (
    <div
      className={`${variants[variant] || variants.default} ${onClick ? 'cursor-pointer hover:shadow-xl hover:border-gray-200 transition-all duration-200' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
