import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input, Button, Card } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export const CrmForgotPassword = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({ title: 'Invalid Email', message: 'Please enter a valid business email address.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      addToast({
        title: 'Recovery Link Sent',
        message: `Password reset instructions sent to ${email}`,
        type: 'success',
      });
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
          <Mail size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Reset Password</h2>
        <p className="text-xs text-secondary margin-0">
          Enter your corporate email address to receive password recovery instructions.
        </p>
      </div>

      {isSubmitted ? (
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <CheckCircle2 size={42} className="text-success" />
          <h4 style={{ fontSize: 'var(--text-base)' }}>Recovery Email Dispatched</h4>
          <p className="text-xs text-secondary margin-0">
            We sent a secure password reset link to <strong className="text-primary">{email}</strong>.
          </p>
          <Link to="/crm/login" className="w-full mt-2">
            <Button variant="primary" size="lg" className="w-full">
              Return to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Corporate Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. alexander@company.com"
            startIcon={Mail}
            required
          />

          <Button variant="primary" size="lg" type="submit" isLoading={isLoading} className="w-full mt-2">
            Send Reset Instructions
          </Button>

          <div className="text-center mt-2">
            <Link to="/crm/login" className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold hover:text-primary">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </Card>
  );
};
