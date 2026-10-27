import React from 'react';
import { Award, Sparkles, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';
import { Breadcrumb, Card, CardHeader, CardBody, Badge, ProgressBar } from '../../../components/ui';

export const OalBorrowerScore = () => {
  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <div>
        <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'AI Score Engine' }]} />
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          AI Credit Risk Rating
        </h1>
      </div>

      {/* Main Score Banner */}
      <Card
        className="text-center flex flex-col items-center gap-3"
        style={{
          padding: '1.75rem 1.25rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-secondary) 100%)',
          border: '1px solid var(--border)',
        }}
      >
        <Badge variant="success" icon={Sparkles}>Underwriting Grade A+</Badge>
        <div style={{ fontSize: '3.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--success)', lineHeight: 1 }}>
          792 <span style={{ fontSize: '1.25rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ 850</span>
        </div>
        <p className="text-xs text-secondary max-w-md margin-0" style={{ lineHeight: 1.5 }}>
          Your company profile ranks in the top 5% of commercial marketplace borrowers, qualifying for minimum APR interest rates.
        </p>
      </Card>

      {/* Score Factors Breakdown Grid */}
      <div className="grid-responsive-2col">
        <Card style={{ padding: '1.25rem', borderRadius: '12px' }} className="flex flex-col gap-3">
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            1. Cashflow Stability Rating
          </h3>
          <ProgressBar value={95} variant="success" />
          <p className="text-xs text-secondary margin-0" style={{ lineHeight: 1.45 }}>
            Average monthly revenue of $350,000 shows 95% consistency over 24 months.
          </p>
        </Card>

        <Card style={{ padding: '1.25rem', borderRadius: '12px' }} className="flex flex-col gap-3">
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            2. Debt Service Coverage Ratio (DSCR)
          </h3>
          <ProgressBar value={88} variant="success" />
          <p className="text-xs text-secondary margin-0" style={{ lineHeight: 1.45 }}>
            Operating income exceeds proposed monthly loan service obligations by 3.8x.
          </p>
        </Card>

        <Card style={{ padding: '1.25rem', borderRadius: '12px' }} className="flex flex-col gap-3">
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            3. Collateral & Equipment Coverage
          </h3>
          <ProgressBar value={90} variant="success" />
          <p className="text-xs text-secondary margin-0" style={{ lineHeight: 1.45 }}>
            Unencumbered corporate equipment & accounts receivable exceed requested loan principal.
          </p>
        </Card>

        <Card style={{ padding: '1.25rem', borderRadius: '12px' }} className="flex flex-col gap-3">
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            4. Trade Credit History
          </h3>
          <ProgressBar value={92} variant="success" />
          <p className="text-xs text-secondary margin-0" style={{ lineHeight: 1.45 }}>
            Zero historical defaults or supplier delinquencies across all trade accounts.
          </p>
        </Card>
      </div>
    </div>
  );
};
