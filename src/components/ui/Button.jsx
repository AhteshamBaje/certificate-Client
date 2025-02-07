import react from "react";
export function Button({ children, onClick, className = "" }) {
    return (
      <button
      type="button"
        onClick={onClick}
        className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${className}`}
      >
        {children}
      </button>
    );
  }
  