import React from 'react';
import { Filter as FilterIcon, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

export const Filter = ({ activeCount = 0, onReset, children }) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" icon={FilterIcon}>
          Filters
        </Button>
        {activeCount > 0 && (
          <Badge variant="primary">
            {activeCount} Active
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {children}
      </div>

      {activeCount > 0 && onReset && (
        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
};
