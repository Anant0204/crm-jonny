import React, { useState } from 'react';
import { Users, Search, Edit, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Input, Select, Modal } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const OalAdminBorrowers = () => {
  const { addToast } = useToast();

  const [borrowers, setBorrowers] = useState([
    { id: 'BRW-101', name: 'Dr. Aris Thorne', company: 'BioGenix Labs Inc.', email: 'a.thorne@biogenix.org', score: 792, status: 'Active', stage: 'Offers Bidding' },
    { id: 'BRW-102', name: 'Marcus Vance', company: 'Apex Global Logistics', email: 'm.vance@apexglobal.com', score: 810, status: 'Active', stage: 'Funded' },
    { id: 'BRW-103', name: 'Elena Rostova', company: 'Nova Retail Automation', email: 'e.rostova@novaretail.io', score: 740, status: 'Active', stage: 'KYC Verified' },
  ]);

  const [search, setSearch] = useState('');
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = borrowers.filter(
    (b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.company.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setBorrowers(
      borrowers.map((b) =>
        b.id === id ? { ...b, status: b.status === 'Active' ? 'Suspended' : 'Active' } : b
      )
    );
    addToast({ title: 'Borrower Status Updated', type: 'info' });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Admin' }, { label: 'Borrower Directory' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Borrower Account Governance</h1>

      <Card className="p-4 flex items-center justify-between">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search borrower or corporate entity..."
          startIcon={Search}
          style={{ maxWidth: '340px', height: '36px' }}
        />
      </Card>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>ID</TableCell>
                <TableCell isHeader>Legal Contact</TableCell>
                <TableCell isHeader>Corporate Entity</TableCell>
                <TableCell isHeader>Email</TableCell>
                <TableCell isHeader>AI Credit Score</TableCell>
                <TableCell isHeader>Marketplace Stage</TableCell>
                <TableCell isHeader>Account Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell><span className="font-mono text-xs">{b.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{b.name}</span></TableCell>
                  <TableCell>{b.company}</TableCell>
                  <TableCell>{b.email}</TableCell>
                  <TableCell><Badge variant="success">{b.score} / 850</Badge></TableCell>
                  <TableCell><Badge variant="primary">{b.stage}</Badge></TableCell>
                  <TableCell><Badge variant={b.status === 'Active' ? 'success' : 'error'}>{b.status}</Badge></TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" icon={Eye} onClick={() => { setSelectedBorrower(b); setIsModalOpen(true); }}>Details</Button>
                      <Button variant="outline" size="sm" onClick={() => toggleStatus(b.id)}>
                        {b.status === 'Active' ? 'Suspend' : 'Activate'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Borrower Details — ${selectedBorrower?.company}`}>
        <div className="flex flex-col gap-3 text-xs">
          <div>Legal Contact: <strong>{selectedBorrower?.name}</strong></div>
          <div>Corporate Email: <strong>{selectedBorrower?.email}</strong></div>
          <div>AI Score: <Badge variant="success">{selectedBorrower?.score} / 850</Badge></div>
          <div>Stage: <Badge variant="primary">{selectedBorrower?.stage}</Badge></div>
        </div>
      </Modal>
    </div>
  );
};
