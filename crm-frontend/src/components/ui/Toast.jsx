import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { cx } from '../../utils/classNames';

const toastIcons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

export const ToastItem = ({ toast }) => {
  const { removeToast } = useToast();
  const Icon = toastIcons[toast.type] || Info;

  return (
    <div
      className={cx(
        'surface-card',
        'p-3',
        'shadow-lg',
        'flex',
        'items-start',
        'gap-3',
        'border-subtle'
      )}
      style={{
        minWidth: '300px',
        maxWidth: '420px',
        borderLeft: `4px solid var(--${toast.type || 'info'})`,
        animation: 'fadeInDown 200ms ease-out',
      }}
    >
      <Icon size={20} className={`text-${toast.type || 'info'}`} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        {toast.title && <div className="font-semibold text-sm">{toast.title}</div>}
        {toast.message && <div className="text-secondary text-xs">{toast.message}</div>}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 'var(--z-toast)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
