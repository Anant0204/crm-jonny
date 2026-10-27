import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Button } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';

export const OalLenderApplications = () => {
  const { lenderLeads } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Lender' }, { label: 'Active Underwriting Applications' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Active Borrower Applications Queue</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>App ID</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>Loan Purpose</TableCell>
                <TableCell isHeader>Principal Amount</TableCell>
                <TableCell isHeader>Underwriting Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenderLeads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell><span className="font-mono text-xs">{l.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{l.borrower}</span></TableCell>
                  <TableCell>{l.loanType}</TableCell>
                  <TableCell><span className="font-bold text-success">{l.amount}</span></TableCell>
                  <TableCell><Badge variant="primary">{l.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const OalLenderOffers = () => {
  const { offers } = useOal();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Lender' }, { label: 'Submitted Offers Manager' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Submitted Lender Term Sheets</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Offer ID</TableCell>
                <TableCell isHeader>Lender Entity</TableCell>
                <TableCell isHeader>Principal</TableCell>
                <TableCell isHeader>Rate (APR)</TableCell>
                <TableCell isHeader>Term</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((o) => (
                <TableRow key={o.id}>
                  <TableCell><span className="font-mono text-xs">{o.id}</span></TableCell>
                  <TableCell><span className="font-semibold">{o.lender}</span></TableCell>
                  <TableCell><span className="font-bold text-success">{o.amount}</span></TableCell>
                  <TableCell>{o.rate}</TableCell>
                  <TableCell>{o.term}</TableCell>
                  <TableCell><Badge variant={o.status === 'Accepted' ? 'success' : 'primary'}>{o.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export const OalLenderAnalytics = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Lender' }, { label: 'Yield Analytics' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Lender Yield & Portfolio Analytics</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Total Deployed Capital: $4.20M | Average Portfolio Yield: 5.4% APR | Weighted Default Rate: 0.0%.</p>
      </Card>
    </div>
  );
};

export const OalLenderReports = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Lender' }, { label: 'Underwriting Reports' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Lender Audit & Tax Reports</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Export portfolio performance, interest yield accruals, and borrower covenant audit sheets.</p>
      </Card>
    </div>
  );
};

export const OalLenderSettings = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'Lender' }, { label: 'Fund Settings' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Institutional Fund Preferences</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Fund Name: Vanguard Capital Debt Fund LP | Primary Bidding Range: $500,000 to $10,000,000.</p>
      </Card>
    </div>
  );
};
