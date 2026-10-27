import React, { useState } from 'react';
import { Building2, ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const OalAdminLenders = () => {
  const { addToast } = useToast();

  const [lenders, setLenders] = useState([
    { id: 'LND-501', name: 'Vanguard Capital Debt Fund', contact: 'Marcus Sterling', type: 'Private Debt Fund', aum: '$250M+', status: 'Approved', verified: true },
    { id: 'LND-502', name: 'Apex Global Credit Corp', contact: 'David Chen', type: 'Commercial Bank', aum: '$1B+', status: 'Approved', verified: true },
    { id: 'LND-503', name: 'Hyperion Debt Partners', contact: 'Laura Lin', type: 'Private Credit', aum: '$50M - $250M', status: 'Pending Approval', verified: false },
    { id: 'LND-504', name: 'Titan Asset Management', contact: 'Robert Vance', type: 'Equipment Leasing', aum: '$10M - $50M', status: 'Suspended', verified: true },
  ]);

  const updateLenderStatus = (id, newStatus) => {
    setLenders(
      lenders.map((l) => (l.id === id ? { ...l, status: newStatus, verified: newStatus === 'Approved' } : l))
    );
    addToast({ title: `Lender ${newStatus}`, message: `Updated institution status to ${newStatus}`, type: newStatus === 'Approved' ? 'success' : 'warning' });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'Lender Approvals & Verification' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Institutional Lender Verification & Queue</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Lender ID</TableCell>
                <TableCell isHeader>Institution Name</TableCell>
                <TableCell isHeader>Contact Officer</TableCell>
                <TableCell isHeader>Lender Category</TableCell>
                <TableCell isHeader>AUM Capacity</TableCell>
                <TableCell isHeader>KYC Verification</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lenders.map((l) => (
                <TableRow key={l.id}>
                  <TableCell><span className="font-mono text-xs">{l.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{l.name}</span></TableCell>
                  <TableCell>{l.contact}</TableCell>
                  <TableCell><Badge variant="default">{l.type}</Badge></TableCell>
                  <TableCell><span className="font-bold text-success">{l.aum}</span></TableCell>
                  <TableCell><Badge variant={l.verified ? 'success' : 'warning'}>{l.verified ? 'Verified' : 'Pending'}</Badge></TableCell>
                  <TableCell><Badge variant={l.status === 'Approved' ? 'success' : l.status === 'Suspended' ? 'error' : 'warning'}>{l.status}</Badge></TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      {l.status !== 'Approved' && (
                        <Button variant="outline" size="sm" icon={CheckCircle2} onClick={() => updateLenderStatus(l.id, 'Approved')}>
                          Approve
                        </Button>
                      )}
                      {l.status !== 'Rejected' && (
                        <Button variant="ghost" size="sm" icon={XCircle} onClick={() => updateLenderStatus(l.id, 'Rejected')}>
                          Reject
                        </Button>
                      )}
                      {l.status === 'Approved' && (
                        <Button variant="ghost" size="sm" icon={AlertTriangle} onClick={() => updateLenderStatus(l.id, 'Suspended')}>
                          Suspend
                        </Button>
                      )}
                    </div>
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
