import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Lock, Key, ArrowRight } from 'lucide-react';
import { Input, Button, Card } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export const OalMfaSetup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [mfaCode, setMfaCode] = useState('772091');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mfaCode.length < 6) {
      addToast({ title: 'Invalid Code', message: 'Enter a valid 6-digit authenticator code.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addToast({ title: 'MFA Security Enabled', message: 'Authenticator linked to OAL Network login.', type: 'success' });
      setIsLoading(false);
      navigate('/oal/dashboard');
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
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
          }}
        >
          <Lock size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>OAL Multi-Factor Authentication</h2>
        <p className="text-xs text-secondary margin-0">Link Google Authenticator or 1Password for direct deal bidding</p>
      </div>

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
          <span style={{ fontSize: '9px', fontWeight: 700 }}>OAL-MFA-KEY</span>
        </div>

        <code className="font-mono text-xs font-bold text-accent background-surface px-2 py-1 rounded border-subtle">
          OALN - 7720 - 9914 - SAFE
        </code>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Authenticator Security Code (6-Digits)"
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
          startIcon={Key}
          maxLength={6}
          helperText="Demo Code: 772091"
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
          style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
        >
          Enable MFA & Launch OAL Dashboard
        </Button>
      </form>
    </Card>
  );
};
