import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 'md', color = 'var(--primary)', label }) => {
  const sizePx = size === 'sm' ? 16 : size === 'lg' ? 32 : size === 'xl' ? 48 : 24;

  return (
    <div className="flex items-center gap-2" style={{ color }}>
      <Loader2 className="animate-spin" size={sizePx} />
      {label && <span className="text-xs font-medium">{label}</span>}
    </div>
  );
};
