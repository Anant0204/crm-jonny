import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Button } from '../../../components/ui';

export const OalAdminCms = () => {
  const cmsPages = [
    { id: 'CMS-1', title: 'OAL Network Landing Page', section: 'Public Landing', updated: '2026-02-24', status: 'Published' },
    { id: 'CMS-2', title: 'Borrower FAQ Accordion', section: 'FAQ', updated: '2026-02-20', status: 'Published' },
    { id: 'CMS-3', title: 'Institutional Lender Guide', section: 'Resources', updated: '2026-02-18', status: 'Published' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'CMS Content Manager' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Content Management System (CMS)</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>ID</TableCell>
                <TableCell isHeader>Page Title</TableCell>
                <TableCell isHeader>Section Category</TableCell>
                <TableCell isHeader>Last Updated</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cmsPages.map((p) => (
                <TableRow key={p.id}>
                  <TableCell><span className="font-mono text-xs">{p.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{p.title}</span></TableCell>
                  <TableCell><Badge variant="primary">{p.section}</Badge></TableCell>
                  <TableCell>{p.updated}</TableCell>
                  <TableCell><Badge variant="success">{p.status}</Badge></TableCell>
                  <TableCell align="right">
                    <Button variant="outline" size="sm">Edit Article</Button>
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

export const OalAdminAudit = () => {
  const auditLogs = [
    { timestamp: '2026-02-26 11:15:04', user: 'Admin Alexander Wright', action: 'Approved Lender Registration', entity: 'Vanguard Capital', status: 'Success' },
    { timestamp: '2026-02-26 10:48:12', user: 'Sarah Jenkins (Rep)', action: 'Updated Application Stage to Stage 8 (Accepted)', entity: 'BioGenix Labs', status: 'Success' },
    { timestamp: '2026-02-26 09:30:00', user: 'System AI Scoring', action: 'Evaluated Credit Risk Telemetry (792 Grade A+)', entity: 'BioGenix Labs', status: 'Success' },
    { timestamp: '2026-02-25 18:20:14', user: 'Dr. Aris Thorne', action: 'Uploaded Tax Returns 2025 PDF', entity: 'Document Vault', status: 'Success' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'Audit Logs Feed' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Immutable Marketplace Audit Feed</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Timestamp</TableCell>
                <TableCell isHeader>User / Agent</TableCell>
                <TableCell isHeader>Action Performed</TableCell>
                <TableCell isHeader>Target Entity</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell><span className="font-mono text-xs">{log.timestamp}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{log.user}</span></TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell><Badge variant="default">{log.entity}</Badge></TableCell>
                  <TableCell><Badge variant="success">{log.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
