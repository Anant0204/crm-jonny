import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no items to display at this moment.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '220px' }}>
      <div
        style={{
          padding: '16px',
          borderRadius: '50%',
          backgroundColor: 'var(--surface-secondary)',
          color: 'var(--text-tertiary)',
          marginBottom: '1rem',
        }}
      >
        <Icon size={32} />
      </div>

      <h4 style={{ fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>{title}</h4>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', maxWidth: '320px', marginBottom: actionLabel ? '1rem' : 0 }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
