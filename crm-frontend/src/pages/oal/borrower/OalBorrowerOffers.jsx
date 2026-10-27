import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Landmark,
  CheckCircle2,
  ArrowRight,
  Check,
  X,
  Sparkles,
  CreditCard,
  ShieldCheck,
  MessageSquare,
  FileText,
  Calculator,
  Download,
  Building2,
  TrendingDown,
  Clock,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Sliders,
  Filter,
  CheckCheck
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Input
} from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerOffers = () => {
  const navigate = useNavigate();
  const { offers, acceptedOffer, acceptLenderOffer } = useOal();
  const { addToast } = useToast();

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [inspectOffer, setInspectOffer] = useState(null);
  const [calculatorOffer, setCalculatorOffer] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [calcAmount, setCalcAmount] = useState(750000);
  const [signName, setSignName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Sorting/Filtering offers
  const filteredOffers = offers.filter((off) => {
    if (activeFilter === 'lowest-apr') return off.rate.includes('4.8%');
    if (activeFilter === 'max-capital') return off.amount.includes('1,000,000');
    return true;
  });

  const handleOpenAccept = (offer) => {
    setSelectedOffer(offer);
    setSignName('Dr. Aris Thorne');
    setAgreeTerms(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmAccept = () => {
    if (!agreeTerms) {
      addToast({
        title: 'Agreement Required',
        message: 'Please check the box to confirm acceptance of loan covenants.',
        type: 'warning'
      });
      return;
    }
    if (selectedOffer) {
      acceptLenderOffer(selectedOffer);
      addToast({
        title: 'Term Sheet Accepted & Executed!',
        message: `Accepted ${selectedOffer.amount} facility from ${selectedOffer.lender}. Wire transfer underwriting initiated.`,
        type: 'success',
      });
      setIsConfirmOpen(false);
    }
  };

  const handleDownloadPDF = (offer) => {
    addToast({
      title: 'Term Sheet PDF Generated',
      message: `Downloaded formal term sheet for ${offer.lender} (${offer.id}).`,
      type: 'info'
    });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Lending Offers Marketplace' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Lender Offers Marketplace
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={() => setIsBenchmarkOpen(true)}
            style={{ fontSize: '12px' }}
          >
            AI Rate Benchmark
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={Sliders}
            onClick={() => setIsCompareOpen(true)}
            style={{ fontSize: '12px' }}
          >
            Compare All ({offers.length})
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={MessageSquare}
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', fontSize: '12px' }}
            onClick={() => navigate('/oal/borrower/messages')}
          >
            Chat with Underwriter
          </Button>
        </div>
      </div>

      {/* 2. Success Banner If Offer Accepted */}
      {acceptedOffer && (
        <Card
          style={{
            padding: '1.25rem 1.5rem',
            border: '2px solid var(--success)',
            borderRadius: '12px',
            backgroundColor: 'rgba(22, 163, 74, 0.05)',
          }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(22, 163, 74, 0.15)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-base text-primary">
                  Executed Term Sheet: {acceptedOffer.lender}
                </span>
                <Badge variant="success">Wire Underwriting Active</Badge>
              </div>
              <p className="text-xs text-secondary margin-0 mt-0.5">
                Facility amount of <strong>{acceptedOffer.amount}</strong> locked at <strong>{acceptedOffer.rate}</strong> for {acceptedOffer.term}. Legal syndication initiated.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={FileText}
            onClick={() => handleDownloadPDF(acceptedOffer)}
            style={{ fontWeight: 600, flexShrink: 0, fontSize: '12px' }}
          >
            Download Executed PDF
          </Button>
        </Card>
      )}

      {/* 3. Marketplace Highlights KPI Strip (Compact 4 in 1 Line) */}
      <div className="kpi-strip-4col">
        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            LOWEST MARKET APR
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)' }}>4.8% APR</span>
            <span className="text-xs text-secondary">Apex Global</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            MAX CAPITAL FACILITY
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>$1,000,000</span>
            <span className="text-xs text-secondary">Hyperion Debt</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            AVERAGE CLOSE TIME
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)' }}>24-48 Hours</span>
            <span className="text-xs text-secondary">Direct Wire</span>
          </div>
        </Card>

        <Card style={{ padding: '0.75rem 1rem', borderRadius: '10px' }} className="flex flex-col gap-0.5">
          <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}>
            COMPETING LENDERS
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>3 Verified Bids</span>
            <span className="text-xs text-secondary">Grade A+ Match</span>
          </div>
        </Card>
      </div>

      {/* 4. Filter Toolbar - Touch Scrollable on Mobile */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div
          className="flex items-center gap-1.5 p-1 surface-secondary rounded-lg border-subtle"
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            maxWidth: '100%',
            scrollbarWidth: 'none',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              backgroundColor: activeFilter === 'all' ? 'var(--surface)' : 'transparent',
              color: activeFilter === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeFilter === 'all' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            All Proposals ({offers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('lowest-apr')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              backgroundColor: activeFilter === 'lowest-apr' ? 'var(--surface)' : 'transparent',
              color: activeFilter === 'lowest-apr' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeFilter === 'lowest-apr' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            Lowest APR (4.8%)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('max-capital')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              backgroundColor: activeFilter === 'max-capital' ? 'var(--surface)' : 'transparent',
              color: activeFilter === 'max-capital' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeFilter === 'max-capital' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            Max Capital ($1.0M)
          </button>
        </div>

        <span className="text-xs text-secondary">
          Showing <strong>{filteredOffers.length}</strong> vetted institutional proposals
        </span>
      </div>

      {/* 5. Executive Offer Cards List */}
      <div className="flex flex-col gap-4">
        {filteredOffers.map((offer, idx) => {
          const isThisAccepted = acceptedOffer?.id === offer.id;
          const tagConfig = [
            { label: '⚡ Best Overall Match', bg: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: 'rgba(37, 99, 235, 0.25)' },
            { label: '🔥 Lowest Market APR', bg: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', border: 'rgba(22, 163, 74, 0.25)' },
            { label: '💎 Maximum Capital', bg: 'rgba(147, 51, 234, 0.1)', color: '#9333ea', border: 'rgba(147, 51, 234, 0.25)' },
          ][idx % 3];

          const initials = offer.lender.split(' ').slice(0, 2).map((w) => w[0]).join('');

          return (
            <Card
              key={offer.id}
              style={{
                padding: '1.5rem',
                borderRadius: '12px',
                border: isThisAccepted ? '2px solid var(--success)' : '1px solid var(--border)',
                transition: 'all 0.2s ease',
              }}
              className="flex flex-col gap-4"
            >
              {/* Card Header Row: Lender, Badge & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                        {offer.lender}
                      </h3>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: tagConfig.bg,
                          color: tagConfig.color,
                          border: `1px solid ${tagConfig.border}`,
                        }}
                      >
                        {tagConfig.label}
                      </span>
                    </div>

                    <div className="text-xs text-secondary mt-0.5">
                      Loan Facility Ref: <code className="font-mono">{offer.id}</code> &bull; Direct Automated Wire
                    </div>
                  </div>
                </div>

                <Badge variant={isThisAccepted ? 'success' : 'neutral'} style={{ padding: '4px 10px', fontSize: '12px', flexShrink: 0 }}>
                  {isThisAccepted ? '● Accepted Facility' : '● Available for Execution'}
                </Badge>
              </div>

              {/* Four Key Financial Metrics Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 surface-secondary rounded-lg border-subtle">
                <div>
                  <span className="text-xs text-tertiary">Loan Principal</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {offer.amount}
                  </div>
                  <span className="text-xs text-secondary">100% Non-Dilutive</span>
                </div>

                <div>
                  <span className="text-xs text-tertiary">Interest APR</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)', marginTop: '2px' }}>
                    {offer.rate}
                  </div>
                  <span className="text-xs text-secondary">Fixed Rate Facility</span>
                </div>

                <div>
                  <span className="text-xs text-tertiary">Term Duration</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {offer.term}
                  </div>
                  <span className="text-xs text-secondary">Amortized Monthly</span>
                </div>

                <div>
                  <span className="text-xs text-tertiary">Est. Monthly Payment</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {offer.monthlyPayment}
                  </div>
                  <span className="text-xs text-secondary">Origination: {offer.originationFee}</span>
                </div>
              </div>

              {/* Feature Badges Strip */}
              <div className="flex items-center gap-3 text-xs text-secondary flex-wrap">
                {offer.features.map((feat, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-subtle">
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => setInspectOffer(offer)}
                    style={{ fontSize: '12px', height: '36px' }}
                  >
                    Inspect Term Sheet
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    icon={Calculator}
                    onClick={() => {
                      setCalculatorOffer(offer);
                      setCalcAmount(Number(offer.amount.replace(/[^0-9]/g, '')) || 750000);
                    }}
                    style={{ fontSize: '12px', height: '36px' }}
                  >
                    Calculate Payments
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    icon={MessageSquare}
                    onClick={() => navigate('/oal/borrower/messages')}
                    style={{ fontSize: '12px', height: '36px' }}
                  >
                    Negotiate with Rep
                  </Button>
                </div>

                <div>
                  {isThisAccepted ? (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Download}
                      onClick={() => handleDownloadPDF(offer)}
                      style={{ height: '36px', borderColor: 'var(--success)', color: 'var(--success)', fontWeight: 600 }}
                    >
                      Download Agreement
                    </Button>
                  ) : !acceptedOffer ? (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => handleOpenAccept(offer)}
                      style={{
                        backgroundColor: 'var(--success)',
                        borderColor: 'var(--success)',
                        height: '36px',
                        padding: '0 20px',
                        fontWeight: 700,
                        fontSize: '13px',
                      }}
                    >
                      Accept Offer Terms
                    </Button>
                  ) : (
                    <span className="text-xs text-tertiary italic">Other proposal locked</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* MODAL 1: Side-by-Side Comparison Table */}
      <Modal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        title="Side-by-Side Term Sheet Matrix"
        maxWidth="800px"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs text-secondary margin-0">
            Compare all active institutional term sheets submitted by competing lenders for your capital expansion request.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Lender Entity</TableCell>
                <TableCell isHeader>Principal</TableCell>
                <TableCell isHeader>APR Rate</TableCell>
                <TableCell isHeader>Term Length</TableCell>
                <TableCell isHeader>Monthly Payment</TableCell>
                <TableCell isHeader>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>
                    <span className="font-bold text-primary">{o.lender}</span>
                    <div className="text-xs text-tertiary">{o.id}</div>
                  </TableCell>
                  <TableCell><strong className="text-primary">{o.amount}</strong></TableCell>
                  <TableCell><span className="font-bold text-success">{o.rate}</span></TableCell>
                  <TableCell>{o.term}</TableCell>
                  <TableCell><strong className="text-primary">{o.monthlyPayment}</strong></TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsCompareOpen(false);
                        handleOpenAccept(o);
                      }}
                      style={{ fontSize: '11px', height: '28px', padding: '0 8px' }}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Modal>

      {/* MODAL 2: Full Term Sheet Inspector */}
      <Modal
        isOpen={!!inspectOffer}
        onClose={() => setInspectOffer(null)}
        title={inspectOffer ? `${inspectOffer.lender} — Official Term Sheet` : 'Term Sheet Inspector'}
        maxWidth="760px"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setInspectOffer(null)}>
              Close
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={() => handleDownloadPDF(inspectOffer)}
            >
              Export PDF
            </Button>
            {!acceptedOffer && (
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
                onClick={() => {
                  const target = inspectOffer;
                  setInspectOffer(null);
                  handleOpenAccept(target);
                }}
              >
                Proceed to Acceptance
              </Button>
            )}
          </>
        }
      >
        {inspectOffer && (
          <div className="flex flex-col gap-4 text-xs">
            {/* Header Strip */}
            <div className="p-3.5 surface-secondary rounded-lg border-subtle flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-primary">{inspectOffer.lender}</span>
                <div className="text-secondary">Facility ID: {inspectOffer.id} &bull; Security: First Lien on Equipment</div>
              </div>
              <Badge variant="success">{inspectOffer.status}</Badge>
            </div>

            {/* Financial Clauses Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 surface-secondary rounded-lg border-subtle">
              <div>
                <span className="text-tertiary">Facility Principal</span>
                <div className="font-bold text-sm text-primary">{inspectOffer.amount}</div>
              </div>
              <div>
                <span className="text-tertiary">Fixed APR</span>
                <div className="font-bold text-sm text-success">{inspectOffer.rate}</div>
              </div>
              <div>
                <span className="text-tertiary">Amortization</span>
                <div className="font-bold text-sm text-primary">{inspectOffer.term}</div>
              </div>
              <div>
                <span className="text-tertiary">Monthly ACH</span>
                <div className="font-bold text-sm text-primary">{inspectOffer.monthlyPayment}</div>
              </div>
            </div>

            {/* Legal Covenants */}
            <div>
              <h4 className="font-bold text-xs text-primary uppercase mb-2">Legal Covenants & Wire Terms</h4>
              <div className="flex flex-col gap-2">
                {inspectOffer.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-secondary">
                    <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-secondary">
                  <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                  <span>Origination Fee capped at {inspectOffer.originationFee} (deducted from gross funding wire)</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                  <span>Funds disbursed directly via Federal Reserve Fedwire within 24 business hours of closing</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 3: Interactive Payment Calculator */}
      <Modal
        isOpen={!!calculatorOffer}
        onClose={() => setCalculatorOffer(null)}
        title="Interactive Loan Repayment Simulator"
        maxWidth="640px"
        footer={
          <Button variant="primary" size="sm" onClick={() => setCalculatorOffer(null)}>
            Done
          </Button>
        }
      >
        {calculatorOffer && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-3.5 surface-secondary rounded-lg border-subtle">
              <span className="font-bold text-sm text-primary">{calculatorOffer.lender} Simulator</span>
              <div className="text-secondary mt-0.5">
                Simulating interest payments based on locked APR rate of <strong>{calculatorOffer.rate}</strong> ({calculatorOffer.term}).
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-primary">Simulated Loan Principal:</span>
                <span className="font-bold text-sm text-accent">${calcAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="250000"
                max="1500000"
                step="25000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div className="flex justify-between text-tertiary mt-1" style={{ fontSize: '10px' }}>
                <span>$250,000</span>
                <span>$750,000</span>
                <span>$1,500,000</span>
              </div>
            </div>

            {/* Calculated Output Strip */}
            <div className="grid grid-cols-3 gap-3 p-3.5 surface-secondary rounded-lg border-subtle text-center">
              <div>
                <span className="text-tertiary">Est. Monthly ACH</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  ${Math.round((calcAmount * 1.052) / 36).toLocaleString()} / mo
                </div>
              </div>
              <div>
                <span className="text-tertiary">Total Interest Cost</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)', marginTop: '2px' }}>
                  ${Math.round(calcAmount * 0.052 * 3).toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-tertiary">Total Repayment</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  ${Math.round(calcAmount * 1.156).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 4: AI Rate Benchmark Analysis */}
      <Modal
        isOpen={isBenchmarkOpen}
        onClose={() => setIsBenchmarkOpen(false)}
        title="OAL AI Rate Benchmark Analysis"
        maxWidth="640px"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsBenchmarkOpen(false)}>
            Close Analysis
          </Button>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="p-3.5 surface-secondary rounded-lg border-subtle flex items-center gap-3">
            <Sparkles size={28} className="text-accent flex-shrink-0" />
            <div>
              <span className="font-bold text-sm text-primary">BioGenix Labs AI Rating: Grade A+ (792/850)</span>
              <div className="text-secondary mt-0.5">
                Your strong cash flow telemetry qualified you for institutional debt pricing 1.8% below the current market prime benchmark.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center p-2 surface-secondary rounded">
              <span>Federal Prime Rate Benchmark</span>
              <strong className="text-tertiary">8.50% APR</strong>
            </div>
            <div className="flex justify-between items-center p-2 surface-secondary rounded">
              <span>Standard Commercial SME Average</span>
              <strong className="text-tertiary">6.90% APR</strong>
            </div>
            <div className="flex justify-between items-center p-2 surface-secondary rounded" style={{ border: '1px solid var(--success)' }}>
              <span>Your OAL Marketplace Best Offer (Apex Global)</span>
              <strong className="text-success" style={{ fontSize: '14px' }}>4.80% APR (Save $42,500)</strong>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL 5: Formal Execution & Acceptance */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title={selectedOffer ? `Execute Loan Acceptance: ${selectedOffer.lender}` : 'Acceptance'}
        maxWidth="600px"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
              onClick={handleConfirmAccept}
            >
              Execute Acceptance & Wire
            </Button>
          </>
        }
      >
        {selectedOffer && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-3.5 surface-secondary rounded-lg border-subtle">
              <span className="font-bold text-sm text-primary">Commercial Term Sheet Execution</span>
              <div className="text-secondary mt-1">
                You are formally accepting a <strong>{selectedOffer.amount}</strong> commercial credit facility at <strong>{selectedOffer.rate}</strong> for <strong>{selectedOffer.term}</strong> with {selectedOffer.lender}.
              </div>
            </div>

            <div>
              <label className="form-label mb-1">Authorized Borrower Legal Signature</label>
              <Input
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
                placeholder="Type your full legal name..."
                style={{ height: '38px', fontSize: '13px' }}
              />
              <span className="text-tertiary" style={{ fontSize: '10px' }}>
                Digitally bound signature as Authorized Officer of BioGenix Labs Inc.
              </span>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer p-3 surface-secondary rounded-lg border-subtle">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ marginTop: '2px' }}
              />
              <span className="text-secondary">
                I hereby accept the lending covenants, authorized ACH debit terms of <strong>{selectedOffer.monthlyPayment}</strong>/month, and direct OAL to issue wire instructions.
              </span>
            </label>
          </div>
        )}
      </Modal>
    </div>
  );
};
