import react from 'react';

export function Label({ children, className = "" }) {
    return <label className={`font-medium text-gray-700 p-2 ${className}`}>{children}</label>;
  }
  