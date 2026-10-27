import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, ArrowRight, RotateCcw } from 'lucide-react';
import { Input, Button, Card } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export const OalVerify = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [emailCode, setEmailCode] = useState('992014');
  const [phoneCode, setPhoneCode] = useState('481029');
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailCode.length < 6 || phoneCode.length < 6) {
      addToast({ title: 'Invalid PIN', message: 'Enter 6-digit verification code.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addToast({ title: 'Contact Verified', message: 'OAL Security checks passed.', type: 'success' });
      setIsLoading(false);
      navigate('/oal/mfa');
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
          <ShieldCheck size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>OAL Security Verification</h2>
        <p className="text-xs text-secondary margin-0">Enter 6-digit OTP codes sent to your registered contacts</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email Verification Code (6-Digits)"
          value={emailCode}
          onChange={(e) => setEmailCode(e.target.value)}
          startIcon={Mail}
          maxLength={6}
          helperText="Demo Code: 992014"
          required
        />

        <Input
          label="Phone Verification Code (6-Digits)"
          value={phoneCode}
          onChange={(e) => setPhoneCode(e.target.value)}
          startIcon={Phone}
          maxLength={6}
          helperText="Demo Code: 481029"
          required
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-tertiary">
            {countdown > 0 ? `Resend code in ${countdown}s` : 'Code expired'}
          </span>
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={() => setCountdown(60)} isDisabled={countdown > 0}>
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
          style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
        >
          Verify & Continue to MFA
        </Button>
      </form>
    </Card>
  );
};
