import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Lock, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input, Button, Card, Badge } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export const CrmMfaSetup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [mfaCode, setMfaCode] = useState('482910');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mfaCode.length < 6) {
      addToast({ title: 'Invalid Code', message: 'Enter a valid 6-digit authenticator code.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addToast({ title: 'MFA Security Enabled', message: 'Authenticator App linked to corporate login.', type: 'success' });
      setIsLoading(false);
      navigate('/crm/company-setup');
    }, 500);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
          }}
        >
          <Lock size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Multi-Factor Authentication (MFA)</h2>
        <p className="text-xs text-secondary margin-0">
          Step 3 of 6: Link Google Authenticator, Authy, or 1Password
        </p>
      </div>

      {/* QR Code Placeholder Box */}
      <div className="flex flex-col items-center p-4 surface-secondary rounded-md border-subtle mb-4">
        <div
          style={{
            width: '140px',
            height: '140px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-strong)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            color: '#0f172a',
            marginBottom: '0.75rem',
          }}
        >
          <QrCode size={90} />
          <span style={{ fontSize: '9px', fontWeight: 700 }}>nErgy-MFA-KEY</span>
        </div>

        <span className="text-xs text-secondary mb-1">Secret Key for manual entry:</span>
        <code className="font-mono text-xs font-bold text-primary background-surface px-2 py-1 rounded border-subtle">
          NRGY - 9920 - 4821 - AUTH
        </code>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Authenticator Security Code (6-Digits)"
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
          startIcon={Key}
          maxLength={6}
          helperText="Demo Code: 482910"
          required
        />

        <Button
          variant="primary"
          size="lg"
          type="submit"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
          className="w-full mt-2"
        >
          Enable MFA & Configure Company Profile
        </Button>
      </form>
    </Card>
  );
};
