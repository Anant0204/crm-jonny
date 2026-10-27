import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge } from '../../../components/ui';

export const OalAdminApplications = () => {
  const masterApps = [
    { id: 'APP-101', borrower: 'BioGenix Labs Inc.', score: '792 (Grade A+)', status: 'Offers Active', rep: 'Sarah Jenkins', lender: 'Vanguard Capital', offer: '$750k at 5.2%', funding: 'Pending Wire' },
    { id: 'APP-102', borrower: 'Apex Global Logistics', score: '810 (Grade A+)', status: 'Funded', rep: 'Sarah Jenkins', lender: 'Apex Credit Corp', offer: '$1.2M at 4.8%', funding: 'Disbursed' },
    { id: 'APP-103', borrower: 'Nova Retail Automation', score: '740 (Grade B+)', status: 'KYC Verified', rep: 'David Chen', lender: 'Unassigned', offer: 'N/A', funding: 'N/A' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'Master Application Queue' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Master Applications Directory</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>App ID</TableCell>
                <TableCell isHeader>Borrower Entity</TableCell>
                <TableCell isHeader>AI Score</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Assigned Rep</TableCell>
                <TableCell isHeader>Winning Lender</TableCell>
                <TableCell isHeader>Offer Terms</TableCell>
                <TableCell isHeader>Funding Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {masterApps.map((a) => (
                <TableRow key={a.id}>
                  <TableCell><span className="font-mono text-xs">{a.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{a.borrower}</span></TableCell>
                  <TableCell><Badge variant="success">{a.score}</Badge></TableCell>
                  <TableCell><Badge variant="primary">{a.status}</Badge></TableCell>
                  <TableCell>{a.rep}</TableCell>
                  <TableCell>{a.lender}</TableCell>
                  <TableCell><span className="font-bold text-success">{a.offer}</span></TableCell>
                  <TableCell><Badge variant={a.funding === 'Disbursed' ? 'success' : 'default'}>{a.funding}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
