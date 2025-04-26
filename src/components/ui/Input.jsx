import react from "react";

export function Input({ type = "text", value, onChange, className = "" , placeholder = "", required = false, disabled=false}) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`${placeholder}`}
        className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${className}`}
        required={required}
        disabled={disabled}
      />
    );
  }
  