import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, KPICard } from '../../../components/ui';
import { DollarSign } from 'lucide-react';

export const OalAdminPayments = () => {
  const transactions = [
    { id: 'TXN-801', borrower: 'BioGenix Labs', lender: 'Vanguard Capital', amount: '$750,000', originationFee: '$7,500 (1.0%)', date: '2026-02-24', status: 'Settled' },
    { id: 'TXN-802', borrower: 'Apex Global Logistics', lender: 'Apex Credit Corp', amount: '$1,200,000', originationFee: '$9,000 (0.75%)', date: '2026-02-20', status: 'Settled' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'Payments & Marketplace Fees' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Payments & Origination Fee Ledger</h1>

      <div className="grid-responsive-kpi">
        <KPICard title="Total Market Origination Volume" value="$18.4M" change="+24.8%" changeType="positive" icon={DollarSign} />
        <KPICard title="Marketplace Fees Revenue" value="$148,500" change="1.0% avg fee" changeType="positive" icon={DollarSign} />
      </div>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Txn ID</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Lender Entity</TableCell>
                <TableCell isHeader>Loan Principal</TableCell>
                <TableCell isHeader>Marketplace Fee</TableCell>
                <TableCell isHeader>Date Settled</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell><span className="font-mono text-xs">{tx.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{tx.borrower}</span></TableCell>
                  <TableCell>{tx.lender}</TableCell>
                  <TableCell><span className="font-bold text-success">{tx.amount}</span></TableCell>
                  <TableCell><span className="font-bold text-accent">{tx.originationFee}</span></TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell><Badge variant="success">{tx.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const OalAdminSubscriptions = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'Lender Subscriptions' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Institutional Lender Subscription Tiers</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Institutional Debt Fund License: $2,499/mo | Commercial Bank Tier: $4,999/mo with dedicated deal API.</p>
      </Card>
    </div>
  );
};
