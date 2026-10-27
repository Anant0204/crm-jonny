import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed with this operation?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  isLoading = false,
}) => {
  const Icon = isDanger ? AlertTriangle : Info;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="460px"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} isDisabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div
          style={{
            padding: '10px',
            borderRadius: '50%',
            backgroundColor: isDanger ? 'var(--error-light)' : 'var(--info-light)',
            color: isDanger ? 'var(--error)' : 'var(--info)',
            flexShrink: 0,
          }}
        >
          <Icon size={20} />
        </div>
        <div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
};
