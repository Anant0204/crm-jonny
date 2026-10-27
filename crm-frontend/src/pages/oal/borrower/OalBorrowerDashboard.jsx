import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Landmark,
  ShieldCheck,
  Award,
  CreditCard,
  MessageSquare,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  Badge,
  Modal,
  Input
} from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerDashboard = () => {
  const navigate = useNavigate();
  const {
    applicationStage,
    stageNames,
    offers,
    acceptedOffer,
    acceptLenderOffer
  } = useOal();
  const { addToast } = useToast();

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentStageName = stageNames[applicationStage] || 'Offers';

  const handleInspectOffer = (offer) => {
    setSelectedOffer(offer);
    setIsOfferModalOpen(true);
  };

  const handleAcceptOffer = () => {
    if (selectedOffer) {
      acceptLenderOffer(selectedOffer);
      setIsOfferModalOpen(false);
      addToast({
        title: 'Offer Accepted!',
        message: `Accepted ${selectedOffer.amount} facility from ${selectedOffer.lender}. Proceeding to underwriting.`,
        type: 'success',
      });
    }
  };

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText('https://oalnetwork.com/ref?code=BIOGENIX-7749');
    setCopiedLink(true);
    addToast({
      title: 'Link Copied',
      message: 'Referral link copied to clipboard.',
      type: 'info',
    });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Borrower Dashboard' }]} />
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0.25rem 0 0 0', letterSpacing: '-0.02em' }}>
            Borrower Overview
          </h1>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={ShieldCheck}
            onClick={() => navigate('/oal/borrower/kyc')}
          >
            KYC Vault
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={CreditCard}
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
            onClick={() => navigate('/oal/borrower/offers')}
          >
            View Lender Offers ({offers.length})
          </Button>
        </div>
      </div>

      {/* 2. 11-Stage Application Lifecycle Stepper */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            11-Stage Marketplace Application Status
          </h2>
          <Badge variant="success" icon={Sparkles} style={{ display: 'inline-flex', width: 'auto' }}>
            Current Stage: {currentStageName}
          </Badge>
        </div>

        <Card style={{ padding: '1.25rem', borderRadius: '12px' }}>
          {/* Stepper Horizontal Scroll Container */}
          <div
            style={{
              overflowX: 'auto',
              padding: '0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '1rem',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              scrollbarWidth: 'none',
            }}
          >
          {stageNames.map((name, idx) => {
            const isCompleted = idx < applicationStage;
            const isActive = idx === applicationStage;

            return (
              <div
                key={name}
                onClick={() => {
                  if (name === 'KYC') navigate('/oal/borrower/kyc');
                  else if (name === 'Application') navigate('/oal/borrower/application');
                  else if (name === 'Documents') navigate('/oal/borrower/documents');
                  else if (name === 'AI Score') navigate('/oal/borrower/score');
                  else if (name === 'Offers' || name === 'Accepted') navigate('/oal/borrower/offers');
                  else navigate('/oal/borrower/dashboard');
                }}
                className="flex flex-col items-center cursor-pointer transition-all"
                style={{
                  minWidth: '68px',
                  flexShrink: 0,
                  opacity: isCompleted || isActive ? 1 : 0.45,
                }}
                title={`Click to view ${name}`}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: isCompleted
                      ? 'var(--success)'
                      : isActive
                      ? 'var(--accent)'
                      : 'var(--surface-secondary)',
                    color: isCompleted || isActive ? '#ffffff' : 'var(--text-secondary)',
                    border: isActive ? '2px solid var(--accent)' : '1px solid var(--border)',
                    boxShadow: isActive ? '0 0 0 3px rgba(37, 99, 235, 0.2)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={15} /> : idx + 1}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    marginTop: '0.35rem',
                    color: isActive ? 'var(--accent)' : isCompleted ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: isActive ? 700 : 500,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>

      {/* 3. Core 4 Clean Metric Cards */}
      <div className="grid-responsive-kpi">
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard
            title="APPLICATION STATUS"
            value={currentStageName}
            change="3 Offers Active"
            changeType="positive"
            icon={Landmark}
          />
        </div>
        <div onClick={() => navigate('/oal/borrower/score')} className="cursor-pointer">
          <KPICard
            title="AI CREDIT RATING"
            value="792 / 850"
            change="Grade A+ Verified"
            changeType="positive"
            icon={Award}
          />
        </div>
        <div onClick={() => navigate('/oal/borrower/offers')} className="cursor-pointer">
          <KPICard
            title="BEST INTEREST OFFER"
            value="4.8% APR"
            change="Apex Credit Corp"
            changeType="positive"
            icon={CreditCard}
          />
        </div>
        <div onClick={() => setIsReferralModalOpen(true)} className="cursor-pointer">
          <KPICard
            title="REFERRAL PROGRAM"
            value="$2,500 Bonus"
            change="1-Click Invite"
            changeType="positive"
            icon={Sparkles}
          />
        </div>
      </div>

      {/* 4. Section: Active Marketplace Offers (Static Executive Summary) */}
      <div className="flex flex-col gap-3">
        {/* Section Heading Outside the Card */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Active Marketplace Offers
          </h2>
          <Button
            variant="ghost"
            size="sm"
            icon={ChevronRight}
            onClick={() => navigate('/oal/borrower/offers')}
            style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '13px' }}
          >
            Manage in Offers Portal ({offers.length})
          </Button>
        </div>

        {/* Static Executive Table Card */}
        <Card style={{ padding: '0', borderRadius: '12px', overflow: 'hidden' }}>
          {acceptedOffer ? (
            <div className="p-4 surface-secondary flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Badge variant="success" icon={CheckCircle2}>Accepted Term Sheet</Badge>
                <span className="font-mono text-xs text-tertiary">{acceptedOffer.id}</span>
              </div>
              <div className="font-bold text-base text-primary">{acceptedOffer.lender}</div>
              <div className="text-sm font-bold text-success">{acceptedOffer.amount} at {acceptedOffer.rate}</div>
              <div className="flex justify-between text-xs text-secondary mt-1">
                <span>Monthly: <strong>{acceptedOffer.monthlyPayment}</strong></span>
                <span>Term: <strong>{acceptedOffer.term}</strong></span>
              </div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Lender Partner
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Facility Amount
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Interest APR
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Term Duration
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Est. Monthly ACH
                    </th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Match Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((off, idx) => {
                    const tagConfig = [
                      { label: '⚡ Best Match', bg: 'rgba(37, 99, 235, 0.08)', color: 'var(--accent)' },
                      { label: '🔥 Lowest APR', bg: 'rgba(22, 163, 74, 0.08)', color: 'var(--success)' },
                      { label: '💎 Max Capital', bg: 'rgba(147, 51, 234, 0.08)', color: '#9333ea' },
                    ][idx % 3];

                    const initials = off.lender.split(' ').slice(0, 2).map((w) => w[0]).join('');

                    return (
                      <tr
                        key={off.id}
                        onClick={() => navigate('/oal/borrower/offers')}
                        style={{
                          borderBottom: idx === offers.length - 1 ? 'none' : '1px solid var(--border)',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                        }}
                        className="hover:surface-secondary"
                      >
                        <td style={{ padding: '14px 16px' }}>
                          <div className="flex items-center gap-3">
                            <div
                              style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '12px',
                                flexShrink: 0,
                              }}
                            >
                              {initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{off.lender}</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{off.id} &bull; Direct Automated Wire</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--text-primary)', fontSize: '14px' }}>
                          {off.amount}
                        </td>

                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontWeight: 800, color: 'var(--success)', fontSize: '13px' }}>
                            {off.rate}
                          </span>
                        </td>

                        <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                          {off.term}
                        </td>

                        <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {off.monthlyPayment}
                        </td>

                        <td style={{ padding: '14px 16px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '4px',
                              backgroundColor: tagConfig.bg,
                              color: tagConfig.color,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {tagConfig.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* 6. Modal: Referral Program */}
      <Modal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        title="OAL Partner Referral Program"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsReferralModalOpen(false)}>
            Done
          </Button>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="p-3.5 surface-secondary rounded-md border-subtle flex flex-col gap-1">
            <span className="font-bold text-sm text-primary">Earn $2,500 for every business introduction</span>
            <span className="text-secondary">
              When a commercial enterprise you refer completes their first debt placement, you receive a direct wire cash bounty.
            </span>
          </div>

          <div>
            <label className="form-label mb-1">Your Personal Invitation Link</label>
            <div className="flex items-center gap-2">
              <Input
                value="https://oalnetwork.com/ref?code=BIOGENIX-7749"
                readOnly
                className="flex-1"
                style={{ height: '38px' }}
              />
              <Button
                variant={copiedLink ? 'primary' : 'outline'}
                size="sm"
                icon={copiedLink ? Check : Copy}
                onClick={handleCopyReferral}
                style={{ height: '38px' }}
              >
                {copiedLink ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
