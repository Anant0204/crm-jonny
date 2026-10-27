import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { Input, Button, Card } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export const OalBorrowerSignup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full legal name required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email required';
    if (!formData.phone.trim()) errs.phone = 'Phone number required';
    if (!formData.password || formData.password.length < 8) errs.password = 'Min 8 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast({ title: 'Validation Error', message: 'Please correct highlighted errors.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addToast({ title: 'Borrower Account Created', message: 'OTP verification PIN sent.', type: 'success' });
      setIsLoading(false);
      navigate('/oal/verify');
    }, 500);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '20px',
            fontFamily: 'var(--font-display)',
            marginBottom: '0.75rem',
          }}
        >
          OA
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Borrower Registration</h2>
        <p className="text-xs text-secondary margin-0">Apply for commercial debt financing & credit lines</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Legal Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          startIcon={User}
          errorMessage={errors.fullName}
          required
        />

        <Input
          label="Business Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          startIcon={Mail}
          errorMessage={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          startIcon={Phone}
          errorMessage={errors.phone}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            startIcon={Lock}
            errorMessage={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            startIcon={Lock}
            errorMessage={errors.confirmPassword}
            required
          />
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
          Create Borrower Account & Verify
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-subtle text-center text-xs text-secondary">
        Already registered?{' '}
        <Link to="/oal/login" className="font-semibold text-accent">
          Sign in to OAL Portal
        </Link>
      </div>
    </Card>
  );
};
