import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Send, CheckCircle2, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardHeader, CardBody, Badge, Table, TableHeader, TableBody, TableRow, TableCell } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';

export const OalLenderDashboard = () => {
  const navigate = useNavigate();
  const { lenderLeads, offers } = useOal();

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Institutional Lender Portal' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Lender Portal Dashboard
          </h1>
          <p className="text-xs text-secondary margin-0 mt-0.5">
            Vanguard Capital Debt Fund — Bidding on pre-vetted corporate loan applications
          </p>
        </div>

        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            onClick={() => navigate('/oal/lender/leads')}
            style={{
              backgroundColor: 'var(--accent)',
              borderColor: 'var(--accent)',
              fontSize: '12px',
              padding: '6px 14px',
              width: 'auto',
              flexShrink: 0,
            }}
          >
            View Qualified Leads Pool
          </Button>
        </div>
      </div>

      {/* KPI Cards - Compact Sized 5-in-1 Line on Desktop, Responsive on Mobile */}
      <div className="grid-lender-kpi-5">
        <KPICard
          className="kpi-compact"
          title="Qualified Leads"
          value={lenderLeads.length}
          change="Grade A+ Match"
          changeType="positive"
          icon={Users}
          onClick={() => navigate('/oal/lender/leads')}
        />
        <KPICard
          className="kpi-compact"
          title="Applications"
          value="8 Active"
          change="KYC Verified"
          changeType="positive"
          icon={FileText}
          onClick={() => navigate('/oal/lender/applications')}
        />
        <KPICard
          className="kpi-compact"
          title="Offers Submitted"
          value={offers.length}
          change="Active Bids"
          changeType="positive"
          icon={Send}
          onClick={() => navigate('/oal/lender/offers')}
        />
        <KPICard
          className="kpi-compact"
          title="Accepted Offers"
          value="3 Deals"
          change="100% Match"
          changeType="positive"
          icon={CheckCircle2}
          onClick={() => navigate('/oal/lender/offers')}
        />
        <KPICard
          className="kpi-compact"
          title="Funded Capital"
          value="$4,200,000"
          change="Avg 5.4% APR"
          changeType="positive"
          icon={DollarSign}
          onClick={() => navigate('/oal/lender/analytics')}
        />
      </div>

      {/* Qualified Leads Table Preview */}
      <Card style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <CardHeader
          title="New High-Grade Borrower Leads"
          subtitle="Pre-vetted corporate entities seeking commercial debt lines"
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/oal/lender/leads')}
              style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '12px' }}
            >
              View All Leads
            </Button>
          }
        />
        <CardBody className="p-0">
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Lead Code</TableCell>
                  <TableCell isHeader>Borrower Entity</TableCell>
                  <TableCell isHeader>Loan Purpose</TableCell>
                  <TableCell isHeader>Requested Principal</TableCell>
                  <TableCell isHeader>AI Credit Score</TableCell>
                  <TableCell isHeader>Grade</TableCell>
                  <TableCell isHeader align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lenderLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell><span className="font-mono text-xs">{lead.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{lead.borrower}</span></TableCell>
                    <TableCell>{lead.loanType}</TableCell>
                    <TableCell><span className="font-bold text-success">{lead.amount}</span></TableCell>
                    <TableCell><Badge variant="success">{lead.score} / 850</Badge></TableCell>
                    <TableCell><Badge variant="primary">{lead.qual}</Badge></TableCell>
                    <TableCell align="right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={ArrowRight}
                        onClick={() => navigate(`/oal/lender/leads/${lead.id}`)}
                        style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '12px' }}
                      >
                        Submit Offer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
