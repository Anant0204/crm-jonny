import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Button } from '../../../components/ui';

export const OalAdminVerification = () => {
  const kycQueue = [
    { id: 'KYC-901', entity: 'BioGenix Labs Inc.', type: 'Passport & Articles', date: '2026-02-24', status: 'KYC Verified' },
    { id: 'KYC-902', entity: 'Quantum Energy Corp', type: 'Driver License', date: '2026-02-25', status: 'Pending Review' },
    { id: 'KYC-903', entity: 'Starlight Medical', type: 'Utility Bill / Address', date: '2026-02-22', status: 'More Information Requested' },
    { id: 'KYC-904', entity: 'Vortex Capital', type: 'Tax ID Unmatched', date: '2026-02-20', status: 'Failed Verification' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'KYC & Verification Desk' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>KYC & Document Verification Desk</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>KYC ID</TableCell>
                <TableCell isHeader>Corporate Entity</TableCell>
                <TableCell isHeader>Document Type</TableCell>
                <TableCell isHeader>Submission Date</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kycQueue.map((k) => (
                <TableRow key={k.id}>
                  <TableCell><span className="font-mono text-xs">{k.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{k.entity}</span></TableCell>
                  <TableCell>{k.type}</TableCell>
                  <TableCell>{k.date}</TableCell>
                  <TableCell>
                    <Badge variant={k.status === 'KYC Verified' ? 'success' : k.status === 'Failed Verification' ? 'error' : 'warning'}>
                      {k.status}
                    </Badge>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="outline" size="sm">Inspect Vault</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
