import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, User, Mail, Phone, Lock, ArrowRight, DollarSign } from 'lucide-react';
import { Input, Select, Button, Card } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export const OalLenderSignup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    contactPerson: '',
    email: '',
    phone: '',
    aum: '$50M - $250M',
    lenderType: 'Private Debt Fund',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email) {
      addToast({ title: 'Validation Error', message: 'Required fields missing.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addToast({ title: 'Lender Registration Submitted', message: 'OTP verification PIN dispatched.', type: 'success' });
      setIsLoading(false);
      navigate('/oal/verify');
    }, 500);
  };

  return (
    <Card className="p-6" style={{ maxWidth: '580px', margin: '0 auto' }}>
      <div className="flex flex-col items-center text-center mb-6">
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary)',
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
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Institutional Lender Registration</h2>
        <p className="text-xs text-secondary margin-0">Register your debt fund or commercial bank for direct marketplace deal flow</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Lender Institution Name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            startIcon={Building2}
            required
          />

          <Input
            label="Legal Entity Name"
            value={formData.legalName}
            onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
            startIcon={Building2}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Primary Contact Person"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            startIcon={User}
            required
          />

          <Input
            label="Institutional Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            startIcon={Mail}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Direct Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            startIcon={Phone}
            required
          />

          <Select
            label="Lender Institution Type"
            value={formData.lenderType}
            onChange={(e) => setFormData({ ...formData, lenderType: e.target.value })}
            options={['Private Debt Fund', 'Commercial Bank', 'Equipment Leasing Firm', 'Family Office / Private Credit']}
          />
        </div>

        <Select
          label="Lending Capacity / AUM"
          value={formData.aum}
          onChange={(e) => setFormData({ ...formData, aum: e.target.value })}
          options={['$10M - $50M', '$50M - $250M', '$250M - $1B', '$1B+']}
        />

        <Input
          label="Account Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          startIcon={Lock}
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
          Register Lender Entity & Verify
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t border-subtle text-center text-xs text-secondary">
        Already registered?{' '}
        <Link to="/oal/login" className="font-semibold text-primary">
          Sign in to Lender Portal
        </Link>
      </div>
    </Card>
  );
};
