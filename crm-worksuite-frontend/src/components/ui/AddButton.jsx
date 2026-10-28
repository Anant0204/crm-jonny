import React from 'react'
import { IoAdd } from 'react-icons/io5'

const AddButton = ({ onClick, label, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-3.5 py-2 
        bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white 
        text-xs font-semibold rounded-lg
        transition-all duration-200
        hover:shadow-md hover:shadow-indigo-500/25 active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        shadow-sm
        ${className}
      `}
    >
      <IoAdd size={16} />
      <span>{label}</span>
    </button>
  )
}

export default AddButton
