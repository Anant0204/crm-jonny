import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Printer,
  Download,
  Building,
  Info,
  ExternalLink
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const TitleSearch = () => {
  const navigate = useNavigate();
  const [vinQuery, setVinQuery] = useState('1G1YB2D47H5108491');
  const [searching, setSearching] = useState(false);

  const report = {
    vin: '1G1YB2D47H5108491',
    yearMakeModel: '2024 Chevrolet Corvette Stingray 2LT',
    titleNumber: 'CA-TL-84920194',
    issuingState: 'California DMV',
    titleIssueDate: 'January 14, 2024',
    titleStatus: 'CLEAN & UNENCUMBERED',
    activeLien: false,
    lienHolder: 'None (Paid in Full / Clean Title)',
    nmvtisBrandCheck: '0 Negative Brands Detected',
    brandAudit: [
      { brand: 'Salvage / Total Loss', status: 'PASS', passed: true },
      { brand: 'Flood / Water Damage', status: 'PASS', passed: true },
      { brand: 'Fire / Vandalism Brand', status: 'PASS', passed: true },
      { brand: 'Odometer Rollback / Exceeds Mechanical Limits', status: 'PASS', passed: true },
      { brand: 'Lemon Law Buyback', status: 'PASS', passed: true },
      { brand: 'Rebuilt / Reconstructed Title', status: 'PASS', passed: true },
    ],
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px 20px 80px',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                OMP Deals • Pillar 1 (Stock the Lot)
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>/</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Auto Lien & Title Search (Task E-04)</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Auto Lien & Title Search (ALTS)
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/omp/market-pricing')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={14} />
              <span>AIMP Pricing</span>
            </button>

            <button
              onClick={() => navigate('/omp/recon-center')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#0284c7',
                border: 'none',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>Next: Recon Center (E-05)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--background)', borderRadius: '8px', padding: '10px 14px', border: '1px solid var(--border)', gap: '10px' }}>
              <Search size={16} color="var(--text-tertiary)" />
              <input
                type="text"
                value={vinQuery}
                onChange={(e) => setVinQuery(e.target.value.toUpperCase())}
                placeholder="Enter VIN or State Title Number..."
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#0284c7', fontSize: '14px', fontWeight: 700, width: '100%', fontFamily: 'monospace' }}
              />
            </div>
            <button
              style={{ padding: '10px 20px', borderRadius: '8px', background: '#0284c7', border: 'none', color: '#ffffff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Search Registry
            </button>
          </div>
        </div>

        {/* Report Card */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '28px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase' }}>
                  ✓ NMVTIS & STATE DMV OFFICIAL RECORD
                </span>
                <span>•</span>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Verified Today</span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {report.yearMakeModel}
              </h2>
              <div style={{ fontSize: '13px', color: '#0284c7', fontFamily: 'monospace', marginTop: '2px', fontWeight: 600 }}>
                VIN: {report.vin}
              </div>
            </div>

            <div style={{ padding: '8px 16px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Active Lien Status</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>{report.titleStatus}</div>
            </div>
          </div>

          {/* Brand Audit Checklist */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px', color: 'var(--text-primary)' }}>
              NMVTIS 50-State Title Brand Checklist
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
              {report.brandAudit.map((b, i) => (
                <div key={i} style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{b.brand}</span>
                  <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} />
                    <span>{b.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleSearch;
