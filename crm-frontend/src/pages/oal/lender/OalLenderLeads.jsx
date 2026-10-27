import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bookmark, Search, Filter as FilterIcon, ArrowRight, Sparkles } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Input, Select } from '../../../components/ui';
import { useOal } from '../../../context/OalContext';
import { useToast } from '../../../context/ToastContext';

export const OalLenderLeads = () => {
  const navigate = useNavigate();
  const { lenderLeads, toggleSaveLead } = useOal();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterQual, setFilterQual] = useState('all');

  const filteredLeads = lenderLeads.filter((l) => {
    const matchSearch = l.borrower.toLowerCase().includes(searchTerm.toLowerCase()) || l.loanType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchQual = filterQual === 'all' || l.qual === filterQual;
    return matchSearch && matchQual;
  });

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Lender' }, { label: 'Qualified Leads Directory' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Pre-Scored Qualified Borrower Pool
          </h1>
        </div>
      </div>

      {/* Filter Bar: Left Search + Right Compact Select */}
      <Card style={{ padding: '0.85rem 1.25rem', borderRadius: '12px' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search borrower entity or loan type..."
            startIcon={Search}
            style={{ maxWidth: '360px', width: '100%', height: '38px', fontSize: '13px' }}
          />

          <div style={{ width: '220px', maxWidth: '100%', flexShrink: 0 }}>
            <Select
              value={filterQual}
              onChange={(e) => setFilterQual(e.target.value)}
              options={[
                { label: 'All Qualification Grades', value: 'all' },
                { label: 'Grade A+', value: 'Grade A+' },
                { label: 'Grade B+', value: 'Grade B+' },
              ]}
              style={{ height: '38px', fontSize: '13px', width: '100%' }}
            />
          </div>
        </div>
      </Card>

      {/* Leads Table */}
      <Card style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <CardBody className="p-0">
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Lead ID</TableCell>
                  <TableCell isHeader>Borrower Entity</TableCell>
                  <TableCell isHeader>Loan Purpose</TableCell>
                  <TableCell isHeader>Loan Amount</TableCell>
                  <TableCell isHeader>AI Score</TableCell>
                  <TableCell isHeader>Qualification</TableCell>
                  <TableCell isHeader>Date Added</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell><span className="font-mono text-xs">{lead.id}</span></TableCell>
                    <TableCell><Link to={`/oal/lender/leads/${lead.id}`} className="font-semibold text-primary">{lead.borrower}</Link></TableCell>
                    <TableCell>{lead.loanType}</TableCell>
                    <TableCell><span className="font-bold text-success">{lead.amount}</span></TableCell>
                    <TableCell><Badge variant="success" icon={Sparkles}>{lead.score} / 850</Badge></TableCell>
                    <TableCell><Badge variant="primary">{lead.qual}</Badge></TableCell>
                    <TableCell>{lead.date}</TableCell>
                    <TableCell><Badge variant="default">{lead.status}</Badge></TableCell>
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={Bookmark}
                          style={{ color: lead.saved ? 'var(--warning)' : 'var(--text-tertiary)' }}
                          onClick={() => {
                            toggleSaveLead(lead.id);
                            addToast({ title: lead.saved ? 'Removed from Saved' : 'Saved to Watchlist', type: 'info' });
                          }}
                        />
                        <Button variant="outline" size="sm" icon={ArrowRight} onClick={() => navigate(`/oal/lender/leads/${lead.id}`)}>
                          Create Offer
                        </Button>
                      </div>
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
