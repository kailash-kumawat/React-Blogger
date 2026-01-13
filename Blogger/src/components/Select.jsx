import React, { useId } from "react";

function Select({ className = "", options, label, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 roundel-lg 
            bg-white text-black outline-none
            focus:bg-gray-50 duration-200
            border-gray-200 w-full 
            ${className}`}
      >
        {/* options are the array of option */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
