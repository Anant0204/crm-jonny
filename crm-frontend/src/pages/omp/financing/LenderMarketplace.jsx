import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  FileCheck,
  Send,
  Download,
  AlertCircle,
  ExternalLink,
  Zap
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const LenderMarketplace = () => {
  const [selectedApp, setSelectedApp] = useState('APP-8921');
  const [filterTier, setFilterTier] = useState('all');

  const creditApps = [
    {
      id: 'APP-8921',
      buyer: 'Marcus Thorne',
      creditScore: 685,
      tier: 'Near-Prime (Tier 2)',
      monthlyIncome: '$6,400',
      vehicle: '2022 Ford F-150 Lariat',
      amountRequested: '$32,000',
      downPayment: '$4,000',
      status: '3 Offers Received',
      lenderOffers: [
        {
          lenderName: 'Ally Auto Finance',
          type: 'Tier 1 Prime Bank',
          apr: '6.99%',
          term: '72 Mo',
          maxAdvance: '115% LTV',
          dealerReserve: '$1,250',
          monthlyPayment: '$545.20',
          stips: ['Proof of Income (W2)', 'Valid Driver License'],
          status: 'Approved',
          recommended: true,
        },
        {
          lenderName: 'OAL Network Direct Lending',
          type: 'OAL Marketplace Fintech',
          apr: '6.75%',
          term: '60 Mo',
          maxAdvance: '120% LTV',
          dealerReserve: '$1,400',
          monthlyPayment: '$630.15',
          stips: ['1 Paystub', 'Auto-Pay ACH Agreement'],
          status: 'Approved',
          recommended: false,
        },
        {
          lenderName: 'Westlake Financial',
          type: 'Subprime Auto Lender',
          apr: '10.49%',
          term: '60 Mo',
          maxAdvance: '110% LTV',
          dealerReserve: '$850',
          monthlyPayment: '$687.40',
          stips: ['Proof of Residence (Utility Bill)', '3 References'],
          status: 'Conditional Approval',
          recommended: false,
        },
      ],
    },
    {
      id: 'APP-8840',
      buyer: 'Samantha Davis',
      creditScore: 560,
      tier: 'Subprime / Special Finance',
      monthlyIncome: '$4,200',
      vehicle: '2019 Nissan Rogue',
      amountRequested: '$18,500',
      downPayment: '$2,000',
      status: '2 Subprime Offers',
      lenderOffers: [
        {
          lenderName: 'OAL Network Subprime Pool',
          type: 'OAL Special Finance',
          apr: '13.99%',
          term: '48 Mo',
          maxAdvance: '105% LTV',
          dealerReserve: '$900',
          monthlyPayment: '$492.10',
          stips: ['Bank Statements (3 Mo)', 'Phone Bill'],
          status: 'Approved',
          recommended: true,
        },
      ],
    },
  ];

  const currentApp = creditApps.find((a) => a.id === selectedApp) || creditApps[0];

  const handleSelectOffer = (lenderName) => {
    toast.success(`Selected offer from ${lenderName}. Contract ready for Digital E-Sign.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.1))', color: 'var(--primary)', border: '1px solid var(--border)' }}>
              TASK E-14 • PILLAR 3 & 4
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>OAL Network Direct Lending Portal</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Auto Loans & Lender Marketplace
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Broadcast credit applications across prime banks, subprime lenders, and OAL network capital with instant dealer reserve payout calculation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--primary)', color: 'var(--text-on-primary, #fff)', border: 'none', padding: '0.55rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <Zap size={16} /> Submit New Credit App to OAL
          </button>
        </div>
      </div>

      {/* Credit App Selector Header */}
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Applicant Credit Profile
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {currentApp.buyer} ({currentApp.id})
              </h2>
              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                FICO Score: {currentApp.creditScore}
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
              Vehicle: <strong style={{ color: 'var(--text-primary)' }}>{currentApp.vehicle}</strong> • Amount: <strong style={{ color: '#10b981' }}>{currentApp.amountRequested}</strong> • Down: <strong style={{ color: 'var(--text-primary)' }}>{currentApp.downPayment}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {creditApps.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedApp(a.id)}
                style={{
                  backgroundColor: selectedApp === a.id ? 'var(--primary-subtle, rgba(56, 189, 248, 0.15))' : 'var(--background)',
                  color: selectedApp === a.id ? 'var(--primary)' : 'var(--text-secondary)',
                  border: selectedApp === a.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {a.buyer} ({a.tier})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lender Approval Comparison Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Lender Approval Decision Matrix ({currentApp.lenderOffers.length} Offers Competing)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {currentApp.lenderOffers.map((offer, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--surface)',
                border: offer.recommended ? '2px solid var(--primary)' : '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.25rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {offer.recommended && (
                <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary)', color: 'var(--text-on-primary, #fff)', fontWeight: 700 }}>
                  BEST VALUE & PROFIT
                </span>
              )}

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>{offer.type}</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.15rem 0 0 0' }}>
                  {offer.lenderName}
                </h4>
              </div>

              {/* Financial Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', backgroundColor: 'var(--surface-secondary)', padding: '0.75rem', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>APR Interest</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>{offer.apr}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Monthly EMI</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{offer.monthlyPayment}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Dealer Reserve</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{offer.dealerReserve}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Term / Max LTV</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{offer.term} • {offer.maxAdvance}</div>
                </div>
              </div>

              {/* Required Stipulations */}
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Lender Stipulations (Stips):
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {offer.stips.map((s, i) => (
                    <div key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle size={12} color="#10b981" /> {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectOffer(offer.lenderName)}
                style={{
                  marginTop: 'auto',
                  backgroundColor: offer.recommended ? 'var(--primary)' : 'var(--background)',
                  color: offer.recommended ? 'var(--text-on-primary, #fff)' : 'var(--text-secondary)',
                  border: offer.recommended ? 'none' : '1px solid var(--border)',
                  padding: '0.6rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'background-color 0.15s',
                }}
              >
                Select & Send to E-Sign <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LenderMarketplace;
