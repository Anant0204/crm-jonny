import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Car,
  FileCheck2,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Info,
  Check,
  Building,
  Phone,
  Mail,
  MapPin,
  Lock,
  FileText,
  AlertCircle
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const DealerVerificationFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    tier: 'franchise',
    dealershipName: 'Metro West Automotive Group',
    dba: 'Metro West Motors',
    licenseNumber: 'DL-984210-CA',
    state: 'California',
    ein: '95-4819203',
    address: '1420 Auto Mall Parkway, Suite 100',
    city: 'Fremont',
    zipCode: '94538',
    contactName: 'Robert Vance',
    contactRole: 'General Manager',
    phone: '(510) 555-0199',
    email: 'robert@metrowestauto.com',
    website: 'https://www.metrowestauto.com',
    inventoryCount: '150 - 300 vehicles',
    dmsProvider: 'DealerSocket / Reynolds & Reynolds',
  });

  const [documents] = useState({
    licenseDoc: { name: 'CA_DMV_Dealer_License_2026.pdf', size: '2.4 MB' },
    insuranceDoc: { name: 'Certificate_Of_Liability_Ins.pdf', size: '1.8 MB' },
    resaleCert: { name: 'State_Resale_Tax_Exemption.pdf', size: '1.1 MB' },
  });

  const [verificationProgress, setVerificationProgress] = useState({
    dmvCheck: false,
    einCheck: false,
    insuranceCheck: false,
    finalApproval: false,
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const tiers = [
    {
      id: 'small',
      name: 'Small / Independent Dealer',
      badgeTier: 'small',
      badgeDesc: 'Local & Independent Used Car Dealerships',
      monthly: '$299 / mo',
      features: [
        'Official {ADP Verified} Badge on all listings',
        'Direct DMS Automatic Inventory Sync',
        'Click-to-Call instant buyer connection',
        'Carfax report badge per vehicle',
        'Standard marketplace search presence',
      ],
      idealFor: '1 - 50 lot inventory capacity',
    },
    {
      id: 'franchise',
      name: 'Franchise Partner Group',
      badgeTier: 'franchise',
      badgeDesc: 'Multi-Location Brand Dealerships (OEM Partners)',
      recommended: true,
      monthly: '$699 / mo',
      features: [
        'All Independent Dealer features included',
        'Top Lead Indicator (AI Buyer Intent Scoring)',
        'Priority search ranking in OMP Marketplace',
        'Multi-Store Central Office dashboard',
        'AI Photo Genius & Studio Background tools',
        '1-Click AI Postmaster Multi-Lister',
      ],
      idealFor: '50 - 300 vehicles across 1-5 lots',
    },
    {
      id: 'large',
      name: 'Enterprise Auto Group',
      badgeTier: 'large',
      badgeDesc: 'Mega-Dealers & National Conglomerates',
      monthly: 'Custom Enterprise',
      features: [
        'All Franchise Group features included',
        'Nationwide Shipping logistics network integration',
        'Custom white-label marketplace portal',
        'Dedicated OMP Account Executive & 24/7 SLA',
        'Unlimited API feeds & multi-DMS routing',
        'Custom BHPH portfolio financing suite',
      ],
      idealFor: '300+ inventory across 5+ locations',
    },
  ];

  const handleStartVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setVerificationProgress((prev) => ({ ...prev, dmvCheck: true }));
    }, 800);

    setTimeout(() => {
      setVerificationProgress((prev) => ({ ...prev, einCheck: true }));
    }, 1600);

    setTimeout(() => {
      setVerificationProgress((prev) => ({ ...prev, insuranceCheck: true }));
    }, 2400);

    setTimeout(() => {
      setVerificationProgress((prev) => ({ ...prev, finalApproval: true }));
      setIsVerifying(false);
    }, 3200);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '32px 20px 80px',
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0284c7', fontWeight: 700 }}>
                OMP Deals • Auto Dealer Program
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>•</span>
              <AdpVerifiedBadge tier={formData.tier} size="sm" />
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Verified Auto Dealer Onboarding (ADP Verified)
            </h1>
            <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              Verify your automotive business, activate the official {'{ADP Verified}'} badge, and unlock the complete dealer tool suite.
            </p>
          </div>

          <button
            onClick={() => navigate('/omp/verified-dealer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            <span>View Verified Dealer Hub</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Stepper Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '36px' }}>
          {[
            { step: 1, title: 'Dealer Tier', desc: 'Select operation type' },
            { step: 2, title: 'Business Info', desc: 'DMV license & location' },
            { step: 3, title: 'Upload Docs', desc: 'State license & insurance' },
            { step: 4, title: 'AI Verification', desc: 'Audit & badge issuance' },
          ].map((item) => {
            const isActive = currentStep === item.step;
            const isDone = currentStep > item.step;

            return (
              <div
                key={item.step}
                onClick={() => isDone && setCurrentStep(item.step)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: isActive
                    ? 'rgba(2, 132, 199, 0.1)'
                    : isDone
                    ? 'rgba(16, 185, 129, 0.08)'
                    : 'var(--surface)',
                  border: isActive
                    ? '1px solid #0284c7'
                    : isDone
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : '1px solid var(--border)',
                  cursor: isDone ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: isDone ? '#10b981' : isActive ? '#0284c7' : 'var(--surface-secondary)',
                    color: isDone || isActive ? '#ffffff' : 'var(--text-secondary)',
                  }}
                >
                  {isDone ? <Check size={14} strokeWidth={3} /> : item.step}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: isActive ? '#0284c7' : isDone ? '#10b981' : 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Step 1: Choose Your Dealership Classification
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
                OMP Deals provides dedicated verification tiers tailored to independent used lots, franchise dealer groups, and nationwide auto retailers.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {tiers.map((t) => {
                const isSelected = formData.tier === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setFormData({ ...formData, tier: t.id })}
                    style={{
                      borderRadius: '16px',
                      padding: '24px',
                      background: isSelected
                        ? 'rgba(2, 132, 199, 0.08)'
                        : 'var(--surface)',
                      border: isSelected ? '2px solid #0284c7' : '1px solid var(--border)',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)' }}>{t.name}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{t.badgeDesc}</p>
                      </div>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? '6px solid #0284c7' : '2px solid var(--border)',
                          background: isSelected ? '#ffffff' : 'transparent',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <AdpVerifiedBadge tier={t.badgeTier} size="sm" />
                    </div>

                    <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>{t.monthly}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Capacity: {t.idealFor}</div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {t.features.map((f, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={15} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, tier: t.id });
                        setCurrentStep(2);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        border: 'none',
                        background: isSelected ? '#0284c7' : 'var(--surface-secondary)',
                        color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      }}
                    >
                      {isSelected ? 'Continue with this Tier' : 'Select Plan'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  background: '#0284c7',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <span>Proceed to Business Information</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Step 2: Dealership Registration & DMV Credentials
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
                To earn the {'{ADP Verified}'} badge, our compliance engine cross-checks your state motor vehicle dealer license and federal tax identification.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '28px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Dealership Legal Name *
                  </label>
                  <input
                    type="text"
                    value={formData.dealershipName}
                    onChange={(e) => setFormData({ ...formData, dealershipName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    State DMV Dealer License # *
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--background)', border: '1px solid #0284c7', color: '#0284c7', fontWeight: 600, fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Federal Tax EIN / TIN *
                  </label>
                  <input
                    type="text"
                    value={formData.ein}
                    onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Sales Desk Phone (Click-to-Call) *
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                style={{ padding: '12px 20px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer' }}
              >
                Back to Tiers
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                style={{ padding: '12px 24px', borderRadius: '10px', background: '#0284c7', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              >
                Proceed to Document Upload
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Step 3: Verification Documentation Upload
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
                Upload official regulatory records. OMP Deals verifies each document directly with state licensing records.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              {[
                { title: 'State Dealer License Certificate *', doc: documents.licenseDoc, status: 'Verified with DMV Records' },
                { title: 'Garage Liability Insurance (COI) *', doc: documents.insuranceDoc, status: '$1M Coverage Active' },
                { title: 'State Resale / Sales Tax Permit *', doc: documents.resaleCert, status: 'Good Standing' },
              ].map((d, i) => (
                <div key={i} style={{ background: 'var(--surface)', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>{d.title}</div>
                  <div style={{ border: '1px dashed rgba(16, 185, 129, 0.4)', borderRadius: '8px', padding: '14px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.04)', marginBottom: '10px' }}>
                    <CheckCircle2 size={22} color="#10b981" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#10b981' }}>{d.doc.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{d.doc.size}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{d.status}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                style={{ padding: '12px 20px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer' }}
              >
                Back to Business Info
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(4);
                  handleStartVerification();
                }}
                style={{ padding: '12px 24px', borderRadius: '10px', background: '#0284c7', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              >
                Run AI Verification Audit
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Step 4: Real-Time ADP Verification Audit
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
                The automated compliance engine checks state licensing registries and sets up your verified dealer account credentials.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px 24px', maxWidth: '680px', margin: '0 auto 32px', boxShadow: 'var(--shadow-sm)' }}>
              {/* Audit items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { name: 'State DMV Registry Query', detail: `License: ${formData.licenseNumber} (${formData.state})`, passed: verificationProgress.dmvCheck },
                  { name: 'Federal EIN & Entity Good Standing', detail: `EIN: ${formData.ein} matches ${formData.dealershipName}`, passed: verificationProgress.einCheck },
                  { name: 'Commercial Insurance Policy', detail: '$1M Garage liability satisfied', passed: verificationProgress.insuranceCheck },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: item.passed ? 'rgba(16, 185, 129, 0.08)' : 'var(--surface-secondary)',
                      border: item.passed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {item.passed ? <CheckCircle2 size={18} color="#10b981" /> : <Clock size={18} color="#0284c7" className="animate-spin" />}
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.detail}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: item.passed ? '#10b981' : '#0284c7' }}>
                      {item.passed ? 'PASSED / ACTIVE' : 'SCANNING...'}
                    </span>
                  </div>
                ))}
              </div>

              {verificationProgress.finalApproval ? (
                <div style={{ background: 'rgba(2, 132, 199, 0.08)', borderRadius: '14px', border: '1px solid rgba(2, 132, 199, 0.4)', padding: '24px', textAlign: 'center' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <AdpVerifiedBadge tier={formData.tier} size="lg" />
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                    🎉 Official ADP Verified Credential Issued!
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 18px' }}>
                    Congratulations! <strong>{formData.dealershipName}</strong> is certified under the <strong>OMP Deals Verified Auto Dealers Program</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/omp/verified-dealer')}
                    style={{ padding: '12px 24px', borderRadius: '10px', background: '#0284c7', border: 'none', color: '#ffffff', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Enter Verified Dealer Benefits Dashboard
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#0284c7', fontSize: '13px', fontWeight: 600 }}>
                  <Sparkles size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  Verifying DMV and registry databases...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerVerificationFlow;
