import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Plus, Search, Filter as FilterIcon, ArrowRight, ExternalLink, Sparkles, CheckCircle2, Briefcase } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Input, Select, Modal } from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { SHOW_OAL } from '../../config/features';

export const CrmLeads = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { leads, addLead, convertLeadToContact, refreshLeads } = useCrm();
  const { addToast } = useToast();

  useEffect(() => {
    if (refreshLeads) {
      refreshLeads();
    }
  }, [refreshLeads]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Add Lead Modal State
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '$250,000',
    score: 85,
    status: 'New',
  });

  // Convert Lead Modal State
  const [leadToConvert, setLeadToConvert] = useState(null);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Referral Modal State
  const [selectedLead, setSelectedLead] = useState(null);
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      (l.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.company || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!leadFormData.name || !leadFormData.company) {
      addToast({ title: 'Validation Error', message: 'Name and company name are required.', type: 'error' });
      return;
    }

    await addLead(leadFormData);
    addToast({ title: 'Lead Created', message: `Added Commercial Lead: ${leadFormData.company}`, type: 'success' });
    setIsAddLeadOpen(false);
    setLeadFormData({ name: '', company: '', email: '', value: '$250,000', score: 85, status: 'New' });
  };

  const handleOpenConvert = (lead) => {
    setLeadToConvert(lead);
    setIsConvertOpen(true);
  };

  const handleExecuteConvert = async () => {
    if (!leadToConvert) return;
    setIsConverting(true);
    try {
      const result = await convertLeadToContact(leadToConvert.id);
      addToast({
        title: 'Lead Converted Successfully',
        message: `Created Contact '${leadToConvert.name}' and added Deal to Sales Pipeline (Qualified Stage).`,
        type: 'success',
      });
      setIsConvertOpen(false);
      setLeadToConvert(null);
    } catch (err) {
      addToast({
        title: 'Conversion Failed',
        message: err.message || 'Could not convert lead.',
        type: 'error',
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleOpenReferral = (lead) => {
    setSelectedLead(lead);
    setIsReferralOpen(true);
  };

  const handleExecuteReferral = () => {
    addToast({
      title: 'OAL Marketplace Referral Dispatched',
      message: `Navigating ${selectedLead?.company} to OAL Borrower Registration...`,
      type: 'success',
    });
    setIsReferralOpen(false);
    navigate(`/oal/borrower/signup?ref=CRM-${selectedLead?.id}`);
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('Leads Directory') }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
            {t('Commercial Sales Leads')}
          </h1>
        </div>
        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddLeadOpen(true)}
          >
            {t('+ Add New Lead')}
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="table-toolbar">
        <div className="table-toolbar-search">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("Search leads by contact or company name...")}
            startIcon={Search}
            style={{ height: '36px' }}
          />
        </div>

        <div className="table-toolbar-actions">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: t('All Lead Statuses'), value: 'all' },
              { label: t('New'), value: 'New' },
              { label: t('Contacted'), value: 'Contacted' },
              { label: t('Qualified'), value: 'Qualified' },
              { label: t('Proposal'), value: 'Proposal' },
            ]}
            style={{ height: '36px', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* Desktop Leads Table (Full Width 100% Responsive) */}
      <div
        className="hidden-mobile flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: '100%',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table
            className="w-full text-left"
            style={{
              width: '100%',
              minWidth: '850px',
              borderCollapse: 'collapse',
              borderSpacing: 0,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '12%', minWidth: '95px' }}>
                  {t('Lead ID')}
                </th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '18%', minWidth: '150px' }}>
                  {t('Contact Name')}
                </th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '20%', minWidth: '160px' }}>
                  {t('Company Entity')}
                </th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '14%', minWidth: '120px' }}>
                  {t('Estimated Value')}
                </th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '12%', minWidth: '110px' }}>
                  {t('Lead Score')}
                </th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '10%', minWidth: '90px' }}>
                  {t('Status')}
                </th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right', width: '14%', minWidth: '130px' }}>
                  {t('Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--surface-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Briefcase size={22} className="text-secondary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          No Commercial Leads Found
                        </h4>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
                          {search || statusFilter !== 'all'
                            ? 'No leads matched your search query. Try resetting filters.'
                            : 'Your leads directory is currently empty. Click below to add your first lead.'}
                        </p>
                      </div>
                      {!search && statusFilter === 'all' && (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Plus}
                          onClick={() => setIsAddLeadOpen(true)}
                          style={{ marginTop: '0.5rem' }}
                        >
                          Add First Lead
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isConverted = lead.status === 'Won' || Boolean(lead.convertedToContactId);
                  return (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        transition: 'background-color var(--transition-fast)',
                      }}
                      className="hover:bg-surface-hover"
                    >
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span className="font-mono text-xs font-semibold text-tertiary" title={`Database ID: ${lead.id}`} style={{ cursor: 'default' }}>
                          {lead.displayId || (lead.id ? `LED-${String(filteredLeads.indexOf(lead) + 1).padStart(3, '0')}` : '-')}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span className="font-bold text-xs text-primary">{lead.name}</span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span className="text-xs text-secondary">{lead.company}</span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span className="font-bold text-xs text-success">{lead.value}</span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <Badge variant="success">{lead.score} / 100</Badge>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <Badge variant={isConverted ? 'success' : lead.status === 'Qualified' ? 'primary' : 'warning'}>
                          {isConverted ? 'Converted' : lead.status}
                        </Badge>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-2">
                          {!isConverted ? (
                            <Button
                              variant="primary"
                              size="sm"
                              icon={Briefcase}
                              onClick={() => handleOpenConvert(lead)}
                              title="Convert Lead into Contact, Deal & Task"
                            >
                              Convert to Deal
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={CheckCircle2}
                              onClick={() => navigate('/crm/pipeline')}
                              style={{ color: 'var(--success)' }}
                            >
                              In Pipeline
                            </Button>
                          )}
                          {SHOW_OAL && (
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Sparkles}
                              onClick={() => handleOpenReferral(lead)}
                              title="Refer to OAL Commercial Lending Marketplace"
                            >
                              Refer to OAL
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List View */}
      <div className="visible-mobile flex flex-col gap-3.5" style={{ width: '100%', boxSizing: 'border-box' }}>
        {filteredLeads.length === 0 ? (
          <Card style={{ padding: '2.5rem 1rem', textAlign: 'center', borderRadius: '14px' }}>
            <div className="flex flex-col items-center justify-center gap-3">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <Briefcase size={20} className="text-secondary" />
              </div>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                No Commercial Leads Found
              </h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                {search || statusFilter !== 'all'
                  ? 'No leads matched your search query.'
                  : 'Your leads directory is empty. Add your first lead.'}
              </p>
              {!search && statusFilter === 'all' && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  onClick={() => setIsAddLeadOpen(true)}
                  className="w-full justify-center mt-2"
                >
                  Add First Lead
                </Button>
              )}
            </div>
          </Card>
        ) : (
          filteredLeads.map((lead) => {
            const isConverted = lead.status === 'Won' || Boolean(lead.convertedToContactId);
            return (
              <Card
                key={lead.id}
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  boxShadow: 'var(--shadow-card)',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
            >
              <div
                className="flex items-center justify-between pb-2.5 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-mono text-xs font-semibold text-tertiary" title={`Database ID: ${lead.id}`}>
                  {lead.displayId || (lead.id ? `LED-${String(filteredLeads.indexOf(lead) + 1).padStart(3, '0')}` : '-')}
                </span>
                <Badge variant={isConverted ? 'success' : lead.status === 'Qualified' ? 'primary' : 'warning'}>
                  {isConverted ? 'Converted' : lead.status}
                </Badge>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <div className="font-bold text-base text-primary">{lead.name}</div>
                <div className="text-xs text-secondary font-medium">{lead.company}</div>
              </div>

              <div
                className="flex items-center justify-between p-2.5 rounded-lg"
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  borderRadius: '8px',
                }}
              >
                <span className="font-bold text-success" style={{ fontSize: '14px' }}>{lead.value}</span>
                <Badge variant="success" style={{ fontSize: '11px', padding: '2px 8px' }}>Score: {lead.score} / 100</Badge>
              </div>

              <div className="flex flex-col gap-2 pt-1 mt-0.5">
                {!isConverted ? (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Briefcase}
                    className="w-full justify-center"
                    onClick={() => handleOpenConvert(lead)}
                  >
                    Convert to Deal
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={CheckCircle2}
                    className="w-full justify-center"
                    onClick={() => navigate('/crm/pipeline')}
                  >
                    View in Pipeline
                  </Button>
                )}
                {SHOW_OAL && (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Sparkles}
                    className="w-full justify-center"
                    onClick={() => handleOpenReferral(lead)}
                  >
                    Refer to OAL
                  </Button>
                )}
              </div>
            </Card>
          );
        })
      )}
      </div>

      {/* Convert Lead Confirmation Modal */}
      <Modal
        isOpen={isConvertOpen}
        onClose={() => { if (!isConverting) setIsConvertOpen(false); }}
        title="Convert Commercial Lead to Deal & Contact"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              disabled={isConverting}
              onClick={() => setIsConvertOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              loading={isConverting}
              onClick={handleExecuteConvert}
            >
              Confirm & Convert Lead
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <p className="text-secondary margin-0">
            Converting this lead initiates an atomic CRM sales transaction across Contacts, Deals, Tasks, and Audit Streams:
          </p>

          <div
            className="p-3.5 rounded-lg border flex flex-col gap-2"
            style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-tertiary">Lead Entity:</span>
              <strong className="text-primary">{leadToConvert?.company}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-tertiary">Primary Contact:</span>
              <strong className="text-primary">{leadToConvert?.name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-tertiary">Deal Value:</span>
              <strong className="text-success">{leadToConvert?.value}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-tertiary">Initial Pipeline Stage:</span>
              <Badge variant="primary">Qualified</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30 text-secondary">
            <div className="font-semibold text-primary flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary" /> Automated Workflow Steps:
            </div>
            <ul className="margin-0 pl-4 space-y-1">
              <li>Creates permanent Contact profile in Directory.</li>
              <li>Adds opportunity deal to Sales Pipeline in <strong>Qualified</strong> stage.</li>
              <li>Auto-assigns follow-up task with high priority due in 3 days.</li>
              <li>Logs immutable activity timestamp to the audit stream.</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        title="Add Commercial Lead"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddLeadOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Plus} onClick={handleCreateLead}>
              Create Lead
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateLead} className="flex flex-col gap-4">
          <Input
            label="Contact Full Name"
            placeholder="e.g. Jordan Miller"
            value={leadFormData.name}
            onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
            required
          />
          <Input
            label="Company Entity"
            placeholder="e.g. Acme Solar Systems Inc."
            value={leadFormData.company}
            onChange={(e) => setLeadFormData({ ...leadFormData, company: e.target.value })}
            required
          />
          <Input
            label="Corporate Email"
            type="email"
            placeholder="e.g. j.miller@acme.com"
            value={leadFormData.email}
            onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
          />
          <Input
            label="Estimated Deal Value"
            placeholder="e.g. $250,000"
            value={leadFormData.value}
            onChange={(e) => setLeadFormData({ ...leadFormData, value: e.target.value })}
          />
          <Select
            label="Initial Pipeline Status"
            value={leadFormData.status}
            onChange={(e) => setLeadFormData({ ...leadFormData, status: e.target.value })}
            options={['New', 'Contacted', 'Qualified', 'Proposal']}
          />
        </form>
      </Modal>

      {/* OAL Referral Modal */}
      {SHOW_OAL && (
        <Modal
          isOpen={isReferralOpen}
          onClose={() => setIsReferralOpen(false)}
          title={`Refer ${selectedLead?.company} to OAL Network Marketplace`}
        >
          <div className="flex flex-col gap-4 text-xs">
            <p className="text-secondary margin-0">
              This action pre-fills <strong>{selectedLead?.company}</strong> into the OAL Network Borrower Onboarding Gateway for commercial debt line bidding.
            </p>

            <div className="p-3 surface-secondary rounded-md border-subtle flex flex-col gap-1">
              <div>Contact: <strong>{selectedLead?.name}</strong> ({selectedLead?.email})</div>
              <div>Estimated Facility Size: <strong className="text-success">{selectedLead?.value}</strong></div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => setIsReferralOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" icon={ExternalLink} onClick={handleExecuteReferral} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
                Launch OAL Borrower Gateway
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
