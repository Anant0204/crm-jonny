import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Settings, ArrowRight } from 'lucide-react';
import { Input, Select, Button, Card } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmCompanySetup = () => {
  const navigate = useNavigate();
  const { companyData, updateCompanyData } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    companyName: companyData.companyName || 'Apex Enterprise Global',
    legalName: companyData.legalName || 'Apex Enterprise Global Inc.',
    taxId: companyData.taxId || 'US-99201948',
    industry: companyData.industry || 'Logistics & Supply Chain',
    address: companyData.address || '100 Enterprise Way, Suite 400',
    city: companyData.city || 'Austin',
    state: companyData.state || 'TX',
    country: companyData.country || 'United States',
    zipCode: companyData.zipCode || '78701',
    timezone: companyData.timezone || 'UTC-6 (Central Time)',
    currency: companyData.currency || 'USD ($)',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateCompanyData(formData);
      addToast({
        title: 'Company Profile Saved',
        message: 'Company profile and regional preferences stored in tenant vault.',
        type: 'success',
      });
      setIsLoading(false);
      navigate('/crm/admin-setup');
    }, 500);
  };

  return (
    <Card className="p-6" style={{ maxWidth: '640px', margin: '0 auto' }}>
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
          nE
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Company Workspace Setup</h2>
        <p className="text-xs text-secondary margin-0">
          Step 4 of 6: Configure tenant business structure & financial localization
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Section 1: Company Info */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
            <Building2 size={14} className="text-primary" /> 1. Company Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              required
            />
            <Input
              label="Legal Entity Name"
              value={formData.legalName}
              onChange={(e) => handleChange('legalName', e.target.value)}
              required
            />
            <Input
              label="Tax ID / EIN"
              value={formData.taxId}
              onChange={(e) => handleChange('taxId', e.target.value)}
              placeholder="e.g. US-99201948"
            />
            <Select
              label="Industry Sector"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              options={[
                'Logistics & Supply Chain',
                'Technology & SaaS',
                'Financial Services & Lending',
                'Manufacturing & Industrial',
                'Healthcare & Life Sciences',
                'Retail & E-Commerce',
              ]}
            />
          </div>
        </div>

        {/* Section 2: Business Address */}
        <div className="flex flex-col gap-3 border-t border-subtle pt-4">
          <h4 className="text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" /> 2. Business Address
          </h4>
          <Input
            label="Street Address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input label="City" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} />
            <Input label="State" value={formData.state} onChange={(e) => handleChange('state', e.target.value)} />
            <Input label="Country" value={formData.country} onChange={(e) => handleChange('country', e.target.value)} />
            <Input label="Zip Code" value={formData.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} />
          </div>
        </div>

        {/* Section 3: Preferences */}
        <div className="flex flex-col gap-3 border-t border-subtle pt-4">
          <h4 className="text-xs font-semibold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
            <Settings size={14} className="text-primary" /> 3. Regional & Financial Localization
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Default Timezone"
              value={formData.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              options={[
                'UTC-8 (Pacific Time)',
                'UTC-6 (Central Time)',
                'UTC-5 (Eastern Time)',
                'UTC+0 (London GMT)',
                'UTC+5.5 (India IST)',
              ]}
            />
            <Select
              label="Base Currency"
              value={formData.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              options={['USD ($)', 'EUR (€)', 'GBP (£)', 'CAD ($)', 'AUD ($)', 'INR (₹)']}
            />
          </div>
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
          Save Profile & Create Primary Admin
        </Button>
      </form>
    </Card>
  );
};
