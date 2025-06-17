import React, { forwardRef } from 'react'

const Input = forwardRef(function Input({ 
    type = "text", 
    label,
    className = "",
    ...props
    }, ref) {
    return (
       <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        ref={ref}
        className="px-3 py-2 rounded-lg bg-white text-black text-center outline-none border border-gray-300 focus:border-blue-500 focus:bg-gray-50 transition duration-200 w-full"
        {...props}
      />
    </div>
    );
}) 
export default Input
