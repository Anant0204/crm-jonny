import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, ArrowRight, RotateCcw } from 'lucide-react';
import { Input, Button, Card, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmVerify = () => {
  const navigate = useNavigate();
  const { companyData } = useAuth();
  const { addToast } = useToast();

  const [emailCode, setEmailCode] = useState('849201');
  const [phoneCode, setPhoneCode] = useState('592810');
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    addToast({ title: 'New Verification Codes Sent', message: 'Dispatched fresh 6-digit OTP codes.', type: 'info' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailCode.length < 6 || phoneCode.length < 6) {
      addToast({ title: 'Invalid PIN Code', message: 'Please enter 6-digit verification codes.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addToast({ title: 'Contact Verified', message: 'Email and Phone verified successfully.', type: 'success' });
      setIsLoading(false);
      navigate('/crm/mfa');
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
          <ShieldCheck size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Security Verification</h2>
        <p className="text-xs text-secondary margin-0">
          Step 2 of 6: Enter 6-digit OTP codes sent to your registered contacts
        </p>
      </div>

      <div className="surface-secondary p-3 rounded-md mb-4 border-subtle flex flex-col gap-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-tertiary">Email Contact:</span>
          <span className="font-semibold text-primary">{companyData.businessEmail || 'admin@company.com'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-tertiary">Phone Contact:</span>
          <span className="font-semibold text-primary">{companyData.phone || '+1 (555) 019-2834'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email Verification Code (6-Digit PIN)"
          value={emailCode}
          onChange={(e) => setEmailCode(e.target.value)}
          startIcon={Mail}
          maxLength={6}
          helperText="Demo Code: 849201"
          required
        />

        <Input
          label="Phone Verification Code (6-Digit PIN)"
          value={phoneCode}
          onChange={(e) => setPhoneCode(e.target.value)}
          startIcon={Phone}
          maxLength={6}
          helperText="Demo Code: 592810"
          required
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-tertiary">
            {countdown > 0 ? `Resend code in ${countdown}s` : 'Code expired'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={handleResend}
            isDisabled={countdown > 0}
          >
            Resend Codes
          </Button>
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
          className="w-full mt-2"
        >
          Verify & Continue to MFA
        </Button>
      </form>
    </Card>
  );
};
