import { Eye } from "lucide-react";
import React from "react";

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  readOnly = false,
  placeholder,
  icon: Icon,
  showEditIcon = false,
  togglePass,
  className,
}) {
  return (
    <div className="block">
      <p>{label}</p>
      <div className="relative flex items-center">
        <Icon aria-hidden="true" className="w-5 h-5 absolute left-2" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`block w-full border border-blue-400 focus:outline-none rounded-md pl-8 pr-2 py-1.5 ${
            !readOnly && " focus:ring-2 focus:ring-blue-400"
          } ${className}`}
        />
        {showEditIcon && (
          <Eye
            onClick={togglePass}
            className="w-4 h-4 absolute right-2 hover:scale-110 duration-200 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
