import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  FileText,
  CheckCircle2,
  DollarSign,
  Send,
  LifeBuoy,
  TrendingUp,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  CardHeader,
  CardBody,
  Badge,
  ProgressBar
} from '../../../components/ui';

export const OalAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div>
        <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Platform Master Admin' }]} />
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          OAL Platform Governance Dashboard
        </h1>
      </div>

      {/* 8 KPI Cards */}
      <div className="grid-responsive-kpi" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div onClick={() => navigate('/oal/admin/borrowers')} className="cursor-pointer">
          <KPICard title="Total Borrowers" value="1,420" change="+14.2%" changeType="positive" icon={Users} />
        </div>
        <div onClick={() => navigate('/oal/admin/applications')} className="cursor-pointer">
          <KPICard title="Applications" value="280 Queue" change="86% Verified" changeType="positive" icon={FileText} />
        </div>
        <div onClick={() => navigate('/oal/admin/scoring')} className="cursor-pointer">
          <KPICard title="Qualified Pre-Scored" value="240 Grade A+" change="92% Match" changeType="positive" icon={CheckCircle2} />
        </div>
        <div onClick={() => navigate('/oal/admin/lenders')} className="cursor-pointer">
          <KPICard title="Active Lenders" value="85 Institutions" change="3 Pending" changeType="warning" icon={Building2} />
        </div>
        <div onClick={() => navigate('/oal/admin/applications')} className="cursor-pointer">
          <KPICard title="Total Offers" value="450 Submitted" change="Avg 4.8% APR" changeType="positive" icon={Send} />
        </div>
        <div onClick={() => navigate('/oal/admin/applications')} className="cursor-pointer">
          <KPICard title="Approved Loans" value="180 Executed" change="100% SLA" changeType="positive" icon={CheckCircle2} />
        </div>
        <div onClick={() => navigate('/oal/admin/payments')} className="cursor-pointer">
          <KPICard title="Funded Loan Volume" value="$18,400,000" change="+24.8%" changeType="positive" icon={DollarSign} />
        </div>
        <div onClick={() => navigate('/oal/admin/support')} className="cursor-pointer">
          <KPICard title="Support Tickets" value="4 Open" change="AI Desk Active" changeType="neutral" icon={LifeBuoy} />
        </div>
      </div>

      {/* Visual Analytics & Progress Breakdown Grid */}
      <div className="grid-responsive-2col">
        {/* Chart 1 & 2: Applications & Qualification */}
        <Card className="p-5 flex flex-col gap-4" style={{ borderRadius: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Application & Qualification Pipeline
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-secondary">Application Processing Speed (SLA &lt; 24h)</span>
                <span className="font-bold text-success">96%</span>
              </div>
              <ProgressBar value={96} variant="success" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-secondary">Grade A+ Qualified Borrowers (AI Score &gt; 780)</span>
                <span className="font-bold text-primary">84%</span>
              </div>
              <ProgressBar value={84} variant="primary" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-secondary">Grade B+ Qualified Borrowers (AI Score 720-779)</span>
                <span className="font-bold text-info">16%</span>
              </div>
              <ProgressBar value={16} variant="info" showLabel={false} />
            </div>
          </div>
        </Card>

        {/* Chart 3, 4 & 5: Funding, Loan Volume, Lender Activity */}
        <Card className="p-5 flex flex-col gap-4" style={{ borderRadius: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Funding Volume & Lender Bidding Telemetry
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-secondary">Fund Disbursement Settlement Rate ($18.4M)</span>
                <span className="font-bold text-success">92%</span>
              </div>
              <ProgressBar value={92} variant="success" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-secondary">Institutional Lender Bidding Participation</span>
                <span className="font-bold text-primary">88%</span>
              </div>
              <ProgressBar value={88} variant="primary" showLabel={false} />
            </div>
          </div>
        </Card>
      </div>

      {/* Admin Quick Module Links - Sleek Compact Working Tiles */}
      <Card style={{ padding: '1.25rem', borderRadius: '12px' }}>
        <div className="flex items-center justify-between mb-3">
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
            Master Platform Administration Modules
          </h4>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>8 Modules</span>
        </div>

        <div className="grid-admin-modules-4">
          {[
            { title: 'Borrower Directory', path: '/oal/admin/borrowers', icon: Users, desc: 'Manage borrower accounts' },
            { title: 'Lender Approvals', path: '/oal/admin/lenders', icon: Building2, desc: 'Review debt funds' },
            { title: 'Master Applications', path: '/oal/admin/applications', icon: FileText, desc: 'Underwriting pipelines' },
            { title: 'KYC Verification', path: '/oal/admin/verification', icon: ShieldCheck, desc: 'FinCEN CDD & documents' },
            { title: 'AI Scoring Rules', path: '/oal/admin/scoring', icon: TrendingUp, desc: 'Credit risk algorithm' },
            { title: 'Payments & Fees', path: '/oal/admin/payments', icon: DollarSign, desc: 'Origination & ledgers' },
            { title: 'AI Support Desk', path: '/oal/admin/support', icon: LifeBuoy, desc: 'Helpdesk ticket queues' },
            { title: 'Audit Log Feed', path: '/oal/admin/audit', icon: ArrowRight, desc: 'Security event stream' },
          ].map((mod) => {
            const ModIcon = mod.icon;
            return (
              <button
                key={mod.path}
                type="button"
                onClick={() => navigate(mod.path)}
                className="admin-module-card"
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(2, 132, 199, 0.1)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ModIcon size={16} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                    {mod.title}
                  </span>
                  <span className="text-secondary truncate" style={{ fontSize: '11px' }}>
                    {mod.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
