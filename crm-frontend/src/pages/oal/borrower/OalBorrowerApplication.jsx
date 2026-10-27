import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  User,
  Building2,
  DollarSign,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  Select,
  Badge,
  Stepper,
  FileUpload
} from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerApplication = () => {
  const navigate = useNavigate();
  const { applicationDraft, updateDraft, setApplicationStage } = useOal();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(applicationDraft || {
    fullName: 'Dr. Aris Thorne',
    email: 'aris.thorne@biogenixlabs.com',
    phone: '+1 (555) 392-8491',
    companyName: 'BioGenix Labs Inc.',
    taxId: '84-9201948',
    yearsInBusiness: '3-5 Years',
    loanAmount: '$2,500,000',
    loanTerm: '36 Months',
    loanPurpose: 'Equipment Purchase & Laboratory Expansion',
    collateralType: 'Corporate Receivables & Equipment',
    annualRevenue: '$8,400,000',
    monthlyRevenue: '$700,000',
    netOperatingIncome: '$1,850,000',
  });

  const steps = [
    { label: 'Personal' },
    { label: 'Business' },
    { label: 'Loan Details' },
    { label: 'Financials' },
    { label: 'Documents' },
    { label: 'Review' },
    { label: 'Submit' },
  ];

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveDraft = () => {
    updateDraft(formData);
    addToast({ title: 'Draft Saved', message: 'Loan application draft stored in local state.', type: 'info' });
  };

  const handleNext = () => {
    updateDraft(formData);
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    updateDraft(formData);
    setApplicationStage(5); // Advance to AI Score Stage
    addToast({
      title: 'Application Submitted!',
      message: 'Dispatched to OAL AI Scoring Engine & Underwriting.',
      type: 'success',
    });
    navigate('/oal/borrower/score');
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '920px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'Commercial Loan Application' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Commercial Loan Application
          </h1>
        </div>

        <Button variant="outline" size="sm" icon={Save} onClick={handleSaveDraft} style={{ fontSize: '12px' }}>
          Save Draft
        </Button>
      </div>

      {/* 2. Stepper Progress Bar - Smooth Horizontal Touch Scrolling on Mobile */}
      <div
        className="w-full pb-2"
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          scrollbarWidth: 'none',
        }}
      >
        <div style={{ minWidth: '580px', padding: '0.25rem 0' }}>
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* 3. STEP 1: PERSONAL INFORMATION */}
      {currentStep === 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              1. Authorized Signatory & Personal Information
            </h2>
            <span className="text-xs text-secondary font-semibold">Step 1 of 7</span>
          </div>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div className="form-grid-2x2 text-xs">
              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Full Legal Name</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Business Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Primary Contact Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Signatory Title</label>
                <Input
                  value="Chief Executive Officer (CEO)"
                  readOnly
                  style={{ height: '38px', fontSize: '13px' }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 4. STEP 2: BUSINESS INFORMATION */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              2. Commercial Entity & Registration Details
            </h2>
            <span className="text-xs text-secondary font-semibold">Step 2 of 7</span>
          </div>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div className="form-grid-2x2 text-xs">
              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Corporate Entity Name</label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Federal Tax ID / EIN</label>
                <Input
                  value={formData.taxId}
                  onChange={(e) => handleChange('taxId', e.target.value)}
                  style={{ height: '38px', fontSize: '13px', fontFamily: 'monospace' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Years Operating in Business</label>
                <Select
                  value={formData.yearsInBusiness}
                  onChange={(e) => handleChange('yearsInBusiness', e.target.value)}
                  options={['1-3 Years', '3-5 Years', '6-9 Years', '10+ Years']}
                  style={{ height: '38px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">State of Incorporation</label>
                <Input
                  value="Delaware (DE Corp - C-Corp)"
                  readOnly
                  style={{ height: '38px', fontSize: '13px' }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 5. STEP 3: LOAN DETAILS */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              3. Requested Debt Facility & Term Structure
            </h2>
            <span className="text-xs text-secondary font-semibold">Step 3 of 7</span>
          </div>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div className="form-grid-2x2 text-xs">
              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Requested Loan Facility Amount ($)</label>
                <Input
                  value={formData.loanAmount}
                  onChange={(e) => handleChange('loanAmount', e.target.value)}
                  style={{ height: '38px', fontSize: '13px', fontWeight: 700 }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Preferred Term Duration</label>
                <Select
                  value={formData.loanTerm}
                  onChange={(e) => handleChange('loanTerm', e.target.value)}
                  options={['12 Months', '24 Months', '36 Months', '48 Months', '60 Months']}
                  style={{ height: '38px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Use of Loan Proceeds</label>
                <Input
                  value={formData.loanPurpose}
                  onChange={(e) => handleChange('loanPurpose', e.target.value)}
                  placeholder="e.g. Equipment Purchase & Facility Expansion"
                  style={{ height: '38px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Primary Collateral Structure</label>
                <Select
                  value={formData.collateralType}
                  onChange={(e) => handleChange('collateralType', e.target.value)}
                  options={['Corporate Receivables & Equipment', 'Commercial Real Estate Asset', 'Unsecured Commercial Line']}
                  style={{ height: '38px', fontSize: '13px' }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 6. STEP 4: FINANCIALS */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              4. Corporate Financial Statements & Telemetry
            </h2>
            <span className="text-xs text-secondary font-semibold">Step 4 of 7</span>
          </div>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div className="form-grid-2x2 text-xs">
              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Annual Gross Revenue</label>
                <Input
                  value={formData.annualRevenue}
                  onChange={(e) => handleChange('annualRevenue', e.target.value)}
                  style={{ height: '38px', fontSize: '13px', fontWeight: 700 }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Average Monthly Gross Revenue</label>
                <Input
                  value={formData.monthlyRevenue}
                  onChange={(e) => handleChange('monthlyRevenue', e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Net Operating Income (NOI)</label>
                <Input
                  value={formData.netOperatingIncome}
                  onChange={(e) => handleChange('netOperatingIncome', e.target.value)}
                  style={{ height: '38px', fontSize: '13px' }}
                  required
                />
              </div>

              <div>
                <label className="form-label mb-1 font-semibold text-secondary">Estimated Debt Service Coverage (DSCR)</label>
                <Input
                  value="1.84x (Strong Coverage)"
                  readOnly
                  style={{ height: '38px', fontSize: '13px', color: 'var(--success)', fontWeight: 700 }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 7. STEP 5: DOCUMENTS */}
      {currentStep === 4 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              5. Financial Documents & Bank Verification
            </h2>
            <span className="text-xs text-secondary font-semibold">Step 5 of 7</span>
          </div>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }} className="flex flex-col gap-4">
            <FileUpload
              label="Upload Bank Statements & Audited Tax Returns (PDF)"
              maxFiles={3}
              onFilesSelected={() => addToast({ title: 'Attached Files Encrypted', message: 'Document files securely staged for underwriting.', type: 'success' })}
            />

            <div className="p-3 surface-secondary rounded-lg border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-success" />
                <span className="text-secondary">KYC Vault telemetry already pre-attached (6 documents verified)</span>
              </div>
              <Badge variant="success">Auto-Linked</Badge>
            </div>
          </Card>
        </div>
      )}

      {/* 8. STEP 6: REVIEW SUMMARY */}
      {currentStep === 5 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              6. Application Review Summary
            </h2>
            <span className="text-xs text-secondary font-semibold">Step 6 of 7</span>
          </div>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }} className="flex flex-col gap-4">
            <div className="p-4 surface-secondary rounded-lg border-subtle flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between border-b border-subtle pb-2">
                <span className="text-secondary">Borrower Signatory:</span>
                <strong className="text-primary">{formData.fullName}</strong>
              </div>
              <div className="flex justify-between border-b border-subtle pb-2">
                <span className="text-secondary">Corporate Entity:</span>
                <strong className="text-primary">{formData.companyName} (EIN: {formData.taxId})</strong>
              </div>
              <div className="flex justify-between border-b border-subtle pb-2">
                <span className="text-secondary">Requested Facility:</span>
                <strong className="text-success" style={{ fontSize: '14px' }}>{formData.loanAmount} &bull; {formData.loanTerm}</strong>
              </div>
              <div className="flex justify-between border-b border-subtle pb-2">
                <span className="text-secondary">Annual Gross Revenue:</span>
                <strong className="text-primary">{formData.annualRevenue}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Use of Proceeds:</span>
                <span className="font-semibold text-primary">{formData.loanPurpose}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 9. STEP 7: SUBMIT */}
      {currentStep === 6 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              7. Final Submission & AI Underwriting
            </h2>
            <span className="text-xs text-secondary font-semibold">Step 7 of 7</span>
          </div>

          <Card style={{ padding: '2rem 1.5rem', borderRadius: '12px' }} className="text-center flex flex-col items-center gap-3">
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Ready for Instant Underwriting
            </h3>
            <p className="text-xs text-secondary max-w-md margin-0" style={{ lineHeight: 1.5 }}>
              Submitting will initiate the AI Risk Scoring Engine and solicit competitive debt bids from top-tier institutional lenders across the OAL network.
            </p>
            <Button
              variant="primary"
              size="lg"
              icon={CheckCircle2}
              onClick={handleSubmitApplication}
              style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', minWidth: '240px', marginTop: '0.5rem' }}
            >
              Submit Application & Generate AI Score
            </Button>
          </Card>
        </div>
      )}

      {/* 10. Clean Navigation Buttons Bar (Zero Inner Box, Clean Flow) */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>

        {currentStep < 6 && (
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleNext}
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
          >
            Next Step
          </Button>
        )}
      </div>
    </div>
  );
};
