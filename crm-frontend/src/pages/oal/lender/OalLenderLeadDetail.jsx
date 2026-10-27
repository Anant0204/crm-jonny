import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Landmark, ArrowLeft, Save, Send, Edit, XCircle, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Input, Select } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalLenderLeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lenderLeads, addLenderOffer } = useOal();
  const { addToast } = useToast();

  const lead = lenderLeads.find((l) => l.id === id) || lenderLeads[0];

  const [formData, setFormData] = useState({
    amount: lead.amount || '$750,000',
    rate: '5.2% APR',
    term: '36 Months',
    originationFee: '1.0%',
    paymentEstimate: '$22,540 / month',
    conditions: 'Standard quarterly DSCR covenant audit >= 1.25x',
    expiration: '2026-03-15',
    notes: 'Competitive rate matching Vanguard Capital institutional debt fund thesis.',
  });

  const [offerStatus, setOfferStatus] = useState('Draft'); // Draft, Submitted, Withdrawn

  const handleSaveDraft = () => {
    setOfferStatus('Draft');
    addToast({ title: 'Offer Saved as Draft', message: 'Ready for internal fund review.', type: 'info' });
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    setOfferStatus('Submitted');
    addLenderOffer({
      id: `OFF-${Math.floor(100 + Math.random() * 900)}`,
      lender: 'Vanguard Capital Debt Fund',
      amount: formData.amount,
      rate: formData.rate,
      term: formData.term,
      monthlyPayment: formData.paymentEstimate,
      originationFee: formData.originationFee,
      status: 'Available',
      features: ['Institutional Bidding Match', 'Quarterly Audit Covenant', 'Direct Wire Disbursement'],
    });

    addToast({
      title: 'Formal Offer Submitted!',
      message: `Dispatched offer to borrower ${lead.borrower} via OAL Licensed Agent.`,
      type: 'success',
    });
  };

  const handleWithdraw = () => {
    setOfferStatus('Withdrawn');
    addToast({ title: 'Offer Withdrawn', message: 'Removed offer bid from marketplace.', type: 'warning' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Lender' }, { label: 'Leads', href: '/oal/lender/leads' }, { label: lead.borrower }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>{lead.borrower} — Underwriting & Offer</h1>
        </div>
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/oal/lender/leads')}>
          Back to Leads Pool
        </Button>
      </div>

      {/* COMPLIANCE COMPATIBILITY BANNER */}
      <Card className="p-3 surface-secondary border-subtle flex items-center gap-3 text-xs text-secondary">
        <Lock size={18} className="text-accent flex-shrink-0" />
        <div>
          <strong>Compliance Routing:</strong> All offers are dispatched directly to the assigned <strong>OAL Licensed Representative</strong> who presents terms to the borrower. Direct borrower contact is restricted.
        </div>
      </Card>

      <div className="grid-responsive-2col">
        {/* Left Column: Borrower AI Telemetry */}
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Borrower Risk Telemetry</h3>
          <div className="flex items-center justify-between p-3 surface-secondary rounded-sm">
            <span className="text-xs text-tertiary">AI Credit Rating:</span>
            <Badge variant="success" icon={Sparkles}>{lead.score} / 850 ({lead.qual})</Badge>
          </div>
          <div className="flex justify-between text-xs border-b border-subtle pb-2">
            <span className="text-tertiary">Loan Purpose:</span>
            <span className="font-semibold">{lead.loanType}</span>
          </div>
          <div className="flex justify-between text-xs border-b border-subtle pb-2">
            <span className="text-tertiary">Requested Principal:</span>
            <span className="font-bold text-success">{lead.amount}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-tertiary">Underwriting Status:</span>
            <Badge variant="primary">{lead.status}</Badge>
          </div>
        </Card>

        {/* Right Column: Formal Offer Creation Engine */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-subtle pb-3">
            <h3 className="text-base font-semibold">Formal Loan Term Sheet Engine</h3>
            <Badge variant={offerStatus === 'Submitted' ? 'success' : offerStatus === 'Withdrawn' ? 'error' : 'default'}>
              Offer Status: {offerStatus}
            </Badge>
          </div>

          <form onSubmit={handleSubmitOffer} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Proposed Loan Principal" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
              <Input label="Interest Rate (APR)" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: e.target.value })} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Loan Term" value={formData.term} onChange={(e) => setFormData({ ...formData, term: e.target.value })} options={['12 Months', '24 Months', '36 Months', '48 Months', '60 Months']} />
              <Input label="Origination Fee" value={formData.originationFee} onChange={(e) => setFormData({ ...formData, originationFee: e.target.value })} />
            </div>

            <Input label="Estimated Monthly Payment" value={formData.paymentEstimate} onChange={(e) => setFormData({ ...formData, paymentEstimate: e.target.value })} />
            <Input label="Covenants & Collateral Conditions" value={formData.conditions} onChange={(e) => setFormData({ ...formData, conditions: e.target.value })} />
            <Input label="Offer Expiration Date" type="date" value={formData.expiration} onChange={(e) => setFormData({ ...formData, expiration: e.target.value })} />

            {/* Actions: Save Draft, Submit, Edit, Withdraw */}
            <div className="flex items-center justify-between gap-2 border-t border-subtle pt-4 flex-wrap">
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" icon={Save} onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                {offerStatus === 'Submitted' && (
                  <Button type="button" variant="outline" size="sm" icon={XCircle} onClick={handleWithdraw}>
                    Withdraw Offer
                  </Button>
                )}
              </div>

              <Button type="submit" variant="primary" size="md" icon={Send} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
                Submit Formal Term Sheet
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
