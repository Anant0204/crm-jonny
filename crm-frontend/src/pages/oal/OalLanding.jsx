import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Landmark,
  ShieldCheck,
  Zap,
  DollarSign,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Building2,
  Users,
  ChevronDown
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';

export const OalLanding = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does OAL Network calculate the AI Risk Score for borrowers?',
      a: 'OAL Network aggregates real-time corporate financial data, verified cash flows, credit histories, and supply chain invoices through a secure API bridge to produce a 300-850 AI Risk Rating.',
    },
    {
      q: 'How fast can a business receive funding after approval?',
      a: 'Once a borrower accepts a lender offer, capital transfer is initiated instantly via ACH or wire, typically settling within 24-48 hours.',
    },
    {
      q: 'What types of institutional lenders participate in the marketplace?',
      a: 'Our marketplace connects verified commercial banks, private debt funds, equipment leasing firms, and accredited institutional investors.',
    },
    {
      q: 'Is borrower data isolated and protected during bidding?',
      a: 'Yes. Sensitive legal entities and bank accounts are encrypted in an isolated vault. Lenders view anonymized financial metrics until an offer is formally accepted.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen background-surface text-primary">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 surface-card border-b border-subtle px-6 py-4 flex items-center justify-between">
        <div onClick={() => navigate('/oal')} className="flex items-center gap-2 cursor-pointer">
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
            }}
          >
            OA
          </div>
          <span className="font-bold text-lg font-display text-primary tracking-tight">OAL Network</span>
          <Badge variant="success" className="ml-1">Lending Marketplace</Badge>
        </div>

        <nav className="hidden-mobile flex items-center gap-6 text-sm font-medium text-secondary">
          <a href="#how-it-works" className="hover:text-primary">How It Works</a>
          <a href="#borrowers" className="hover:text-primary">Borrowers</a>
          <a href="#lenders" className="hover:text-primary">Lenders</a>
          <a href="#benefits" className="hover:text-primary">Benefits</a>
          <a href="#faq" className="hover:text-primary">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/oal/login')}>
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
            onClick={() => navigate('/oal/borrower/signup')}
          >
            Apply for Funding
          </Button>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="px-6 py-20 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto">
        <Badge variant="success" icon={Zap}>
          Instant Institutional Liquidity Gateway
        </Badge>

        <h1 style={{ fontSize: 'var(--text-4xl)', lineHeight: 1.15, fontWeight: 800 }} className="font-display">
          Next-Generation Commercial Lending & Capital Marketplace
        </h1>

        <p className="text-base text-secondary max-w-2xl margin-0">
          OAL Network connects growing corporate borrowers with accredited institutional lenders. AI-driven risk scoring, zero friction underwriting, and competitive funding offers.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
            onClick={() => navigate('/oal/borrower/signup')}
          >
            Borrower: Apply for Capital
          </Button>

          <Button
            variant="outline"
            size="lg"
            icon={Building2}
            onClick={() => navigate('/oal/lender/signup')}
          >
            Lender: Join Marketplace
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 text-xs text-tertiary mt-8 border-t border-subtle pt-6 w-full">
          <span><ShieldCheck size={14} className="inline mr-1 text-success" /> 256-bit Bank Grade Vault</span>
          <span><DollarSign size={14} className="inline mr-1 text-success" /> $250M+ Liquidity Pool</span>
          <span><Lock size={14} className="inline mr-1 text-success" /> Isolated Borrower Data</span>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section id="how-it-works" className="px-6 py-16 surface-secondary border-y border-subtle">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="text-center">
            <Badge variant="primary" className="mb-2">Automated Execution</Badge>
            <h2>How the Marketplace Works</h2>
            <p className="text-sm text-secondary">Four simple steps from application to capital disbursement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-5 flex flex-col gap-3">
              <span className="w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center text-sm">1</span>
              <h4 className="text-base">Submit Application</h4>
              <p className="text-xs text-secondary margin-0">Complete borrower profile and securely upload financial statements.</p>
            </Card>

            <Card className="p-5 flex flex-col gap-3">
              <span className="w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center text-sm">2</span>
              <h4 className="text-base">AI Risk Scoring</h4>
              <p className="text-xs text-secondary margin-0">AI engine analyzes credit metrics, revenue health, and collateral strength.</p>
            </Card>

            <Card className="p-5 flex flex-col gap-3">
              <span className="w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center text-sm">3</span>
              <h4 className="text-base">Lender Bidding</h4>
              <p className="text-xs text-secondary margin-0">Institutional lenders submit competitive loan terms and interest rates.</p>
            </Card>

            <Card className="p-5 flex flex-col gap-3">
              <span className="w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center text-sm">4</span>
              <h4 className="text-base">Capital Funded</h4>
              <p className="text-xs text-secondary margin-0">Accept preferred offer and receive direct wire transfer into your account.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: BORROWERS & LENDERS */}
      <section id="borrowers" className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Borrowers Column */}
          <div className="flex flex-col gap-4">
            <Badge variant="success" icon={DollarSign}>For Borrowers</Badge>
            <h3>Flexible Capital for Growth</h3>
            <p className="text-sm text-secondary">
              Access credit lines, equipment financing, and working capital loans ranging from $100,000 to $10,000,000+.
            </p>
            <ul className="flex flex-col gap-2 text-xs text-secondary">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Competitive APR rates from 4.8%</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Fast approval within 24-48 hours</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> No hidden origination fees</li>
            </ul>
            <Button
              variant="primary"
              size="md"
              style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', alignSelf: 'flex-start' }}
              onClick={() => navigate('/oal/borrower/signup')}
            >
              Apply as Borrower
            </Button>
          </div>

          {/* Lenders Column */}
          <div id="lenders" className="flex flex-col gap-4">
            <Badge variant="primary" icon={Building2}>For Institutional Lenders</Badge>
            <h3>High-Yield Institutional Deal Flow</h3>
            <p className="text-sm text-secondary">
              Deploy capital directly to pre-vetted corporate borrowers with transparent AI credit scoring and automated KYC.
            </p>
            <ul className="flex flex-col gap-2 text-xs text-secondary">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Direct access to verified corporate deals</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Comprehensive risk scoring & bank telemetry</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Automated loan servicing & repayments</li>
            </ul>
            <Button
              variant="outline"
              size="md"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => navigate('/oal/lender/signup')}
            >
              Register as Lender
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5: BENEFITS */}
      <section id="benefits" className="px-6 py-16 surface-secondary border-t border-subtle">
        <div className="max-w-5xl mx-auto text-center flex flex-col gap-8">
          <div>
            <Badge variant="info">Platform Benefits</Badge>
            <h2 className="mt-2">Why Enterprise Platforms Trust OAL Network</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-left flex flex-col gap-2">
              <ShieldCheck size={28} className="text-accent" />
              <h4 className="text-base">KYC Compliance Vault</h4>
              <p className="text-xs text-secondary margin-0">Encrypted document verification against global compliance databases.</p>
            </Card>

            <Card className="p-6 text-left flex flex-col gap-2">
              <TrendingUp size={28} className="text-accent" />
              <h4 className="text-base">AI Underwriting Engine</h4>
              <p className="text-xs text-secondary margin-0">Algorithmic risk evaluation analyzing cash flow stability and debt service capacity.</p>
            </Card>

            <Card className="p-6 text-left flex flex-col gap-2">
              <Lock size={28} className="text-accent" />
              <h4 className="text-base">CRM API Integration</h4>
              <p className="text-xs text-secondary margin-0">Seamless API bridge for CRM nErgy users to push financial records for instant credit lines.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section id="faq" className="px-6 py-16 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <Badge variant="default">Frequently Asked Questions</Badge>
          <h2 className="mt-2">Marketplace FAQ</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <Card key={idx} className="p-4 cursor-pointer" onClick={() => setOpenFaq(isOpen ? -1 : idx)}>
                <div className="flex items-center justify-between font-semibold text-sm">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && <p className="text-xs text-secondary mt-3 margin-0 border-t border-subtle pt-3">{faq.a}</p>}
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION 7 & 8: SUPPORT & CTA */}
      <section className="px-6 py-16 surface-secondary text-center border-t border-subtle">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2>Ready to Unlock Commercial Liquidity?</h2>
          <p className="text-sm text-secondary margin-0">
            Join thousands of corporate borrowers and institutional debt funds on the OAL Network marketplace.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
            <Button
              variant="primary"
              size="lg"
              style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
              onClick={() => navigate('/oal/borrower/signup')}
            >
              Apply as Borrower
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/oal/login')}>
              Sign In to Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 surface-card border-t border-subtle text-xs text-tertiary text-center flex flex-col gap-2">
        <div>© 2026 OAL Network Lending Marketplace. Isolated Business Domain & Financial Platform.</div>
        <div>Direct Secure API Gateway connected with CRM nErgy Platform.</div>
      </footer>
    </div>
  );
};
