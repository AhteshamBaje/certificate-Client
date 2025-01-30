import react from "react";

export function Input({ type = "text", value, onChange, className = "" }) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${className}`}
      />
    );
  }
  