import React, { useState } from 'react';
import { TrendingUp, DollarSign, Target, Users, Activity, Download } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, CardHeader, CardBody, Tabs, Badge, ProgressBar } from '../../components/ui';
import { useToast } from '../../context/ToastContext';
import { SHOW_OAL } from '../../config/features';

export const CrmAnalytics = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('revenue');

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'Analytics' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>Enterprise Analytics & Intelligence</h1>
          <p className="text-xs text-secondary margin-0">
            Real-time business performance, revenue projections, and conversion funnels
          </p>
        </div>

        <div className="dashboard-actions-grid w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            className="w-full md:w-auto justify-center"
            onClick={() => addToast({ title: 'Analytics Export', message: 'Exported executive metrics to PDF.', type: 'success' })}
          >
            Export Analytics PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-responsive-kpi">
        <KPICard title="Total MRR Revenue" value="$482,900" change="+19.8%" changeType="positive" icon={DollarSign} />
        <KPICard title="Sales Volume" value="142 Closed Deals" change="+12.4%" changeType="positive" icon={TrendingUp} />
        <KPICard title="Lead Conversion" value="32.4%" change="+3.2%" changeType="positive" icon={Target} />
        <KPICard title="Customer LTV" value="$48,500" change="High Retention" changeType="positive" icon={Users} />
      </div>

      {/* Analytics Category Tabs */}
      <Card>
        <CardBody className="p-2">
          <Tabs
            tabs={[
              { id: 'revenue', label: 'Revenue Analytics', icon: DollarSign },
              { id: 'sales', label: 'Sales Metrics', icon: TrendingUp },
              { id: 'leads', label: 'Lead Conversion Funnel', icon: Target },
              { id: 'customers', label: 'Customer Retention', icon: Users },
              { id: 'performance', label: 'System Performance', icon: Activity },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </CardBody>
      </Card>

      {/* TAB 1: REVENUE */}
      {activeTab === 'revenue' && (
        <div className="grid-responsive-2col">
          <Card className="p-6 flex flex-col gap-4">
            <h3 className="text-base font-semibold">Monthly Recurring Revenue (MRR) Projections</h3>
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Q1 2026 Achieved ($1.42M Target)</span>
                  <span className="font-bold text-success">88%</span>
                </div>
                <ProgressBar value={88} variant="success" showLabel={false} />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Enterprise Subscriptions ARR ($4.80M)</span>
                  <span className="font-bold text-primary">74%</span>
                </div>
                <ProgressBar value={74} variant="primary" showLabel={false} />
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col gap-4">
            <h3 className="text-base font-semibold">Revenue Stream Distribution</h3>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between p-2 surface-secondary rounded-sm">
                <span>CRM nErgy AI Enterprise Licenses</span>
                <span className="font-bold">$290,000 (60%)</span>
              </div>
              <div className="flex justify-between p-2 surface-secondary rounded-sm">
                <span>{SHOW_OAL ? 'OAL Lending Marketplace Fees' : 'Enterprise Logistics Services'}</span>
                <span className="font-bold">$120,000 (25%)</span>
              </div>
              <div className="flex justify-between p-2 surface-secondary rounded-sm">
                <span>ERP & AI Compute Add-ons</span>
                <span className="font-bold">$72,900 (15%)</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: SALES */}
      {activeTab === 'sales' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Sales Performance by Representative</h3>
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-3 surface-secondary rounded-sm flex items-center justify-between">
              <span className="font-bold text-primary">Alexander Wright (Owner & Enterprise)</span>
              <Badge variant="success">$680,000 Closed Won</Badge>
            </div>
            <div className="p-3 surface-secondary rounded-sm flex items-center justify-between">
              <span className="font-bold text-primary">Sarah Jenkins (VP of Sales)</span>
              <Badge variant="primary">$420,000 Closed Won</Badge>
            </div>
            <div className="p-3 surface-secondary rounded-sm flex items-center justify-between">
              <span className="font-bold text-primary">David Chen (Finance Account Lead)</span>
              <Badge variant="info">$180,000 Closed Won</Badge>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: LEADS */}
      {activeTab === 'leads' && (
        <Card className="p-6 flex flex-col gap-4">
          <h3 className="text-base font-semibold">Lead Conversion Funnel Stages</h3>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>1. New Leads Acquired (2,845)</span>
                <span className="font-bold text-primary">100%</span>
              </div>
              <ProgressBar value={100} variant="primary" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>2. Contacted & Verified (1,920)</span>
                <span className="font-bold text-info">67%</span>
              </div>
              <ProgressBar value={67} variant="info" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>3. Qualified Opportunities (920)</span>
                <span className="font-bold text-warning">32%</span>
              </div>
              <ProgressBar value={32} variant="warning" showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>4. Closed Won Customers (480)</span>
                <span className="font-bold text-success">17%</span>
              </div>
              <ProgressBar value={17} variant="success" showLabel={false} />
            </div>
          </div>
        </Card>
      )}

      {/* TAB 4: CUSTOMERS */}
      {activeTab === 'customers' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-2">Customer Retention & Churn Analytics</h3>
          <p className="text-xs text-secondary mb-4">Gross Renewal Rate: 98.4% | Net Dollar Retention: 114%</p>
          <Badge variant="success">Zero Critical Churn Risk Accounts</Badge>
        </Card>
      )}

      {/* TAB 5: PERFORMANCE */}
      {activeTab === 'performance' && (
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-2">System Infrastructure Performance</h3>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between p-2 surface-secondary rounded-sm">
              <span>API Gateway Latency</span>
              <span className="font-bold text-success">14 ms avg</span>
            </div>
            <div className="flex justify-between p-2 surface-secondary rounded-sm">
              <span>Multi-Tenant DB Query Speed</span>
              <span className="font-bold text-success">8 ms avg</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
