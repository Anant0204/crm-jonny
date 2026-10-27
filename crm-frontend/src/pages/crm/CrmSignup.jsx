import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Mail, Phone, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { Input, Button, Card, Stepper } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmSignup = () => {
  const navigate = useNavigate();
  const { register, updateCompanyData } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    businessEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.legalName.trim()) errs.legalName = 'Legal company name is required';
    if (!formData.businessEmail.trim() || !formData.businessEmail.includes('@')) {
      errs.businessEmail = 'Valid business email is required';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.password || formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast({ title: 'Validation Error', message: 'Please correct the highlighted form errors.', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      await register({
        companyName: formData.companyName.trim(),
        name: formData.legalName.split(' ')[0] || formData.companyName.trim(),
        email: formData.businessEmail.trim(),
        password: formData.password,
        role: 'BUSINESS_OWNER',
      });

      updateCompanyData({
        companyName: formData.companyName,
        legalName: formData.legalName,
        businessEmail: formData.businessEmail,
        phone: formData.phone,
      });

      addToast({
        title: 'Company Workspace Created',
        message: 'Account provisioned for ' + formData.businessEmail,
        type: 'success',
      });
      setIsLoading(false);
      navigate('/crm/verify');
    } catch (error) {
      setIsLoading(false);
      const msg = error.message || 'Registration failed. Please try again.';
      setErrors((prev) => ({ ...prev, businessEmail: msg }));
      addToast({ title: 'Registration Failed', message: msg, type: 'error' });
    }
  };

  return (
    <div className="w-full" style={{ maxWidth: '470px', margin: '0 auto', position: 'relative' }}>
      {/* Decorative Cyber Ambient Glow behind the card */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '10%',
        right: '10%',
        bottom: '-10px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(34, 211, 238, 0.2) 100%)',
        filter: 'blur(30px)',
        zIndex: 0,
        borderRadius: '24px',
        pointerEvents: 'none'
      }} />

      <style>{`
        .crm-signup-card {
          position: relative;
          z-index: 1;
          background: rgba(15, 23, 42, 0.88) !important;
          border: 1px solid rgba(139, 92, 246, 0.35) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.15) !important;
          border-radius: 18px !important;
        }
        .crm-signup-card .form-group {
          gap: 0.2rem;
        }
        .crm-signup-card .form-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: #cbd5e1 !important;
          letter-spacing: 0.02em;
        }
        .crm-signup-card .form-control {
          height: 38px;
          font-size: 0.84rem;
          padding: 0 0.85rem;
          background: rgba(7, 11, 22, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #f8fafc !important;
          border-radius: 9px !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .crm-signup-card .form-control:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2), 0 0 16px rgba(56, 189, 248, 0.25) !important;
          background: rgba(10, 16, 32, 0.95) !important;
        }
        .crm-signup-card .form-control-wrapper .input-icon-start {
          left: 0.75rem;
          color: #818cf8 !important;
        }
        .crm-signup-card .form-control-has-icon-start {
          padding-left: 2.3rem !important;
        }
        .crm-signup-card .form-helper {
          color: #94a3b8 !important;
          font-size: 0.7rem;
        }
        .crm-signup-submit-btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #7c3aed 100%) !important;
          border: 1px solid rgba(139, 92, 246, 0.5) !important;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .crm-signup-submit-btn:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 6px 25px rgba(139, 92, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
          filter: brightness(1.08);
        }
      `}</style>
      <Card
        className="crm-signup-card"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '1.25rem 1.65rem',
        }}
      >
        <div className="flex flex-col items-center text-center" style={{ marginBottom: '0.65rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '17px',
              fontFamily: 'var(--font-display)',
              marginBottom: '0.45rem',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            nE
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, marginBottom: '0.15rem', color: '#f8fafc', letterSpacing: '-0.015em' }}>
            Create Company Account
          </h2>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: '#a78bfa',
            background: 'rgba(139, 92, 246, 0.12)',
            padding: '3px 10px',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            marginTop: '3px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
            Step 1 of 6: Provision isolated company workspace
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '0.45rem' }}>
          <Input
            label="Company Name"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            startIcon={Building2}
            errorMessage={errors.companyName}
            required
          />

          <Input
            label="Legal Company Name"
            value={formData.legalName}
            onChange={(e) => handleChange('legalName', e.target.value)}
            startIcon={Building2}
            errorMessage={errors.legalName}
            required
          />

          <Input
            label="Business Email"
            type="email"
            value={formData.businessEmail}
            onChange={(e) => handleChange('businessEmail', e.target.value)}
            startIcon={Mail}
            errorMessage={errors.businessEmail}
            required
          />

          <Input
            label="Business Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            startIcon={Phone}
            errorMessage={errors.phone}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '0.45rem' }}>
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              startIcon={Lock}
              errorMessage={errors.password}
              helperText="Min 8 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              startIcon={Lock}
              errorMessage={errors.confirmPassword}
              required
            />
          </div>

          <Button
            variant="primary"
            size="md"
            type="submit"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full crm-signup-submit-btn"
            style={{ minHeight: '40px', height: '40px', fontSize: '13.5px', fontWeight: 800, marginTop: '0.4rem', borderRadius: '10px' }}
          >
            Create Account & Verify
          </Button>
        </form>

        <div
          className="border-t border-subtle text-center text-secondary"
          style={{ marginTop: '0.45rem', paddingTop: '0.35rem', fontSize: '11.5px' }}
        >
          Already registered?{' '}
          <Link to="/crm/login" className="font-semibold text-primary">
            Sign in to workspace
          </Link>
        </div>
      </Card>
    </div>
  );
};
