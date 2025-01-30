import react from 'react';

export function Label({ children, className = "" }) {
    return <label className={`font-medium text-gray-700 ${className}`}>{children}</label>;
  }
  