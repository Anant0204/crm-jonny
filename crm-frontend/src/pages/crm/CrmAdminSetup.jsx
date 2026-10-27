import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, User, Mail, Phone, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input, Button, Card, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmAdminSetup = () => {
  const navigate = useNavigate();
  const { setUser, companyData } = useAuth();
  const { addToast } = useToast();

  const [adminData, setAdminData] = useState({
    name: '',
    email: companyData.businessEmail || '',
    phone: companyData.phone || '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, val) => {
    setAdminData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!adminData.name.trim()) errs.name = 'Full name is required';
    if (!adminData.email.trim() || !adminData.email.includes('@')) errs.email = 'Valid email is required';
    if (!adminData.phone.trim()) errs.phone = 'Phone number is required';
    if (!adminData.password || adminData.password.length < 8) errs.password = 'Min 8 characters required';
    if (adminData.password !== adminData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast({ title: 'Validation Error', message: 'Please fix highlighted errors.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setUser({
        name: adminData.name,
        email: adminData.email,
        role: 'Company Owner & Super Admin',
        company: companyData.companyName || 'nErgy Enterprise Logistics',
        tenantId: 'TENANT-08492',
      });
      addToast({
        title: 'Primary Admin Provisioned',
        message: `${adminData.name} granted Super Admin permissions.`,
        type: 'success',
      });
      setIsLoading(false);
      navigate('/crm/employee-invite');
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
          <UserCheck size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Create Primary Company Admin</h2>
        <p className="text-xs text-secondary margin-0">
          Step 5 of 6: Assign root workspace ownership & security controls
        </p>
      </div>

      <div className="flex items-center justify-between p-3 surface-secondary rounded-md border-subtle mb-4 text-xs">
        <span className="text-tertiary">Target Company Tenant:</span>
        <Badge variant="primary" icon={ShieldCheck}>
          {companyData.companyName || 'nErgy Enterprise Logistics'}
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Admin Full Name"
          value={adminData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          startIcon={User}
          errorMessage={errors.name}
          required
        />

        <Input
          label="Admin Corporate Email"
          type="email"
          value={adminData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          startIcon={Mail}
          errorMessage={errors.email}
          required
        />

        <Input
          label="Direct Phone Number"
          type="tel"
          value={adminData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          startIcon={Phone}
          errorMessage={errors.phone}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Admin Security Password"
            type="password"
            value={adminData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            startIcon={Lock}
            errorMessage={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={adminData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
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
        >
          Create Admin & Invite Team Members
        </Button>
      </form>
    </Card>
  );
};
