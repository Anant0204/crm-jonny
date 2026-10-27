import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'Unable to load data due to a system network error.',
  onRetry,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 text-center rounded-md border-subtle"
      style={{
        backgroundColor: 'var(--error-light)',
        borderColor: 'var(--error-border)',
        margin: '1rem 0',
      }}
    >
      <AlertOctagon size={28} className="text-error" style={{ marginBottom: '0.5rem' }} />
      <h4 style={{ color: 'var(--error)', fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>{title}</h4>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{description}</p>
      {onRetry && (
        <Button variant="danger" size="sm" icon={RotateCcw} onClick={onRetry}>
          Retry Connection
        </Button>
      )}
    </div>
  );
};
