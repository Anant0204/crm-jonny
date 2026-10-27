import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Select } from './Select';

export const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  pageSize = 10,
  totalItems = 100,
  onPageChange,
  onPageSizeChange,
  className = '',
}) => {
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`flex items-center gap-4 text-xs ${className}`}>
      <div className="flex items-center gap-2 text-xs text-secondary">
        <span>Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> entries</span>
        {onPageSizeChange && (
          <div className="flex items-center gap-1 ml-4">
            <span>Rows:</span>
            <Select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              options={[10, 25, 50, 100]}
              style={{ height: '26px', padding: '0 0.4rem', fontSize: '11px' }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <Button
          variant="outline"
          size="sm"
          isIconOnly
          icon={ChevronLeft}
          isDisabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{ height: '28px', width: '28px', minWidth: '28px', padding: 0 }}
        />
        
        <span className="text-xs font-medium px-2 text-secondary whitespace-nowrap">
          Page <strong className="text-primary">{currentPage}</strong> of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          isIconOnly
          icon={ChevronRight}
          isDisabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{ height: '28px', width: '28px', minWidth: '28px', padding: 0 }}
        />
      </div>
    </div>
  );
};
