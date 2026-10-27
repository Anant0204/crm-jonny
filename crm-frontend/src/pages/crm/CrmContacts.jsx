import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  Mail,
  Phone,
  Building2,
  ArrowUpDown,
  CheckSquare
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Search,
  Filter,
  Select,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Pagination,
  Modal,
  Input,
  ConfirmationDialog,
  Checkbox,
  Avatar
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmContacts = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { contacts, addContact, editContact, deleteContact, bulkDeleteContacts, refreshContacts } = useCrm();
  const { addToast } = useToast();

  useEffect(() => {
    if (refreshContacts) {
      refreshContacts();
    }
  }, [refreshContacts]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: 'Enterprise Client',
    owner: 'Alexander Wright',
    status: 'Active',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter & Sort Logic
  const filteredContacts = contacts
    .filter((c) => {
      const matchSearch =
        (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || c.type === filterType;
      const matchStatus = filterStatus === 'all' || c.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortField === 'company') return (a.company || '').localeCompare(b.company || '');
      return 0;
    });

  // Calculate pagination slice
  const totalPages = Math.ceil(filteredContacts.length / pageSize) || 1;
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, filterStatus]);

  // Bulk Selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Add Contact Handler
  const handleCreateContact = async (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    if (!name || !email) {
      addToast({ title: 'Validation Error', message: 'Name and email are required.', type: 'error' });
      return;
    }
    const created = await addContact({
      ...formData,
      name,
      email,
      company: formData.company?.trim() || '',
      phone: formData.phone?.trim() || '',
    });
    addToast({ title: 'Contact Created', message: `Added ${created?.name || name} to database.`, type: 'success' });
    setIsAddModalOpen(false);
    setFormData({ name: '', company: '', email: '', phone: '', type: 'Enterprise Client', owner: 'Alexander Wright', status: 'Active' });
  };

  // Edit Contact Handler
  const handleOpenEdit = (contact) => {
    setContactToEdit(contact);
    setFormData({
      name: contact.name,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      type: contact.type,
      owner: contact.owner,
      status: contact.status,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!contactToEdit) return;
    const name = formData.name.trim();
    const email = formData.email.trim();
    if (!name || !email) {
      addToast({ title: 'Validation Error', message: 'Name and email are required.', type: 'error' });
      return;
    }
    editContact(contactToEdit.id, {
      ...formData,
      name,
      email,
      company: formData.company?.trim() || '',
      phone: formData.phone?.trim() || '',
    });
    addToast({ title: 'Contact Updated', message: `Updated details for ${name}.`, type: 'success' });
    setIsEditModalOpen(false);
  };

  // Delete Handlers
  const handleOpenDelete = (contact) => {
    setContactToDelete(contact);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      addToast({ title: 'Contact Deleted', message: `Removed ${contactToDelete.name}.`, type: 'error' });
      setContactToDelete(null);
    }
    setIsDeleteConfirmOpen(false);
  };

  const handleBulkDelete = () => {
    bulkDeleteContacts(selectedIds);
    addToast({ title: 'Bulk Delete', message: `Removed ${selectedIds.length} contact records.`, type: 'error' });
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('Contacts') }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>{t('Contacts & Accounts Directory')}</h1>
        </div>

        <div className="header-actions-right">
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            className="w-full md:w-auto justify-center"
            onClick={() => {
              setFormData({ name: '', company: '', email: '', phone: '', type: 'Enterprise Client', owner: 'Alexander Wright', status: 'Active' });
              setIsAddModalOpen(true);
            }}
          >
            {t('+ Add New Contact')}
          </Button>
        </div>
      </div>

      {/* Search & Filter Bar (Clean Direct Layout) */}
      <div className="table-toolbar">
        <div className="table-toolbar-search">
          <Search
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder={t("Search by name, company, email address...")}
          />
        </div>

        <div className="table-toolbar-actions">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { label: t('All Contact Types'), value: 'all' },
              { label: 'Enterprise Client', value: 'Enterprise Client' },
              { label: 'Commercial Lead', value: 'Commercial Lead' },
              { label: 'Investor', value: 'Investor' },
              { label: 'Borrower Partner', value: 'Borrower Partner' },
              { label: 'Supplier', value: 'Supplier' },
            ]}
            style={{ height: '38px', fontSize: '13px' }}
          />

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'Active' },
              { label: 'Qualified', value: 'Qualified' },
              { label: 'Pending KYC', value: 'Pending KYC' },
              { label: 'Inactive', value: 'Inactive' },
            ]}
            style={{ height: '38px', fontSize: '13px' }}
          />

          <Button
            variant="outline"
            size="sm"
            icon={ArrowUpDown}
            onClick={() => setSortField((s) => (s === 'name' ? 'company' : 'name'))}
            style={{ height: '38px', whiteSpace: 'nowrap' }}
          >
            Sort: <strong className="ml-1 capitalize">{sortField}</strong>
          </Button>

          {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setFilterStatus('all');
              }}
              style={{ height: '38px', color: 'var(--text-tertiary)' }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 surface-secondary rounded-md border-subtle flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} item(s) selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Mail}
              onClick={() => addToast({ title: 'Bulk Email', message: `Prepared draft email for ${selectedIds.length} contacts.`, type: 'info' })}
            >
              Bulk Email
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Desktop / Tablet Contacts Table (Full Width 100% Seamless) */}
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
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="w-full text-left" style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', borderSpacing: 0 }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.875rem 1rem', width: '40px', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>
                  <Checkbox
                    checked={selectedIds.length > 0 && selectedIds.length === filteredContacts.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>Contact ID</th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>Full Name</th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>Company</th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>Type</th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>Status</th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>Owner</th>
                <th style={{ padding: '0.875rem 1rem', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right', backgroundColor: 'var(--surface-secondary)', borderRight: 'none', borderLeft: 'none' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-secondary text-sm">
                    No matching contacts found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                paginatedContacts.map((contact) => {
                  const isSelected = selectedIds.includes(contact.id);
                  return (
                    <tr
                      key={contact.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                        transition: 'background-color var(--transition-fast)',
                      }}
                      className="hover:bg-surface-hover"
                    >
                      <td style={{ padding: '0.875rem 1rem', borderRight: 'none', borderLeft: 'none' }}>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleSelectOne(contact.id)}
                        />
                      </td>
                      <td style={{ padding: '0.875rem 1rem', borderRight: 'none', borderLeft: 'none' }}>
                        <span className="font-mono text-xs font-semibold text-tertiary" title={`Database ID: ${contact.id}`} style={{ cursor: 'default' }}>
                          {contact.displayId || (contact.id ? `CNT-${String(filteredContacts.indexOf(contact) + 1).padStart(3, '0')}` : '-')}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', borderRight: 'none', borderLeft: 'none' }}>
                        <div className="flex items-center gap-3">
                          <div style={{ flexShrink: 0, minWidth: '28px' }}>
                            <Avatar name={contact.name} size="sm" />
                          </div>
                          <div className="flex flex-col text-left">
                            <Link to={`/crm/contacts/${contact.id}`} className="font-bold text-xs text-primary hover:underline">
                              {contact.name}
                            </Link>
                            <span className="text-tertiary text-xs" style={{ fontSize: '11px' }}>{contact.email}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', borderRight: 'none', borderLeft: 'none' }}>
                        <span className="text-xs text-secondary font-medium">{contact.company}</span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', borderRight: 'none', borderLeft: 'none' }}>
                        <Badge variant="default">{contact.type}</Badge>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', borderRight: 'none', borderLeft: 'none' }}>
                        <Badge
                          variant={
                            contact.status === 'Active'
                              ? 'success'
                              : contact.status === 'Pending KYC'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {contact.status}
                        </Badge>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', borderRight: 'none', borderLeft: 'none' }}>
                        <span className="text-xs text-secondary">{contact.owner}</span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', textAlign: 'right', borderRight: 'none', borderLeft: 'none' }}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            isIconOnly
                            icon={Eye}
                            onClick={() => navigate(`/crm/contacts/${contact.id}`)}
                            title="View Details"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            isIconOnly
                            icon={Edit}
                            onClick={() => handleOpenEdit(contact)}
                            title="Edit Contact"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            isIconOnly
                            icon={Trash2}
                            onClick={() => handleOpenDelete(contact)}
                            title="Delete Contact"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM FOOTER (Compact Pagination on RIGHT ONLY) */}
        <div
          style={{
            padding: '0.625rem 1rem',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredContacts.length}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Mobile Card List View (< 768px) */}
      <div className="visible-mobile flex flex-col gap-3.5" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="flex items-center justify-between px-1 text-xs text-secondary font-medium">
          <span>{filteredContacts.length} Contact(s) Found</span>
          <span>Sorted by {sortField}</span>
        </div>

        {paginatedContacts.map((contact) => (
          <Card
            key={contact.id}
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
            {/* Top row: Avatar + ID & Status Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar name={contact.name} size="sm" />
                <span className="font-mono text-xs font-semibold text-tertiary" title={`Database ID: ${contact.id}`}>
                  {contact.displayId || (contact.id ? `CNT-${String(filteredContacts.indexOf(contact) + 1).padStart(3, '0')}` : '-')}
                </span>
              </div>
              <Badge
                variant={
                  contact.status === 'Active'
                    ? 'success'
                    : contact.status === 'Pending KYC'
                    ? 'warning'
                    : contact.status === 'Qualified'
                    ? 'primary'
                    : 'info'
                }
              >
                {contact.status}
              </Badge>
            </div>

            {/* Middle: Full Name & Company */}
            <div className="flex flex-col gap-0.5">
              <Link to={`/crm/contacts/${contact.id}`} className="font-bold text-base text-primary hover:underline">
                {contact.name}
              </Link>
              <div className="text-xs text-secondary font-medium">{contact.company}</div>
            </div>

            {/* Email, Phone & Owner Details Box */}
            <div
              className="flex flex-col gap-1.5 text-xs text-tertiary"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                padding: '0.625rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center gap-2 truncate">
                <Mail size={13} className="text-secondary flex-shrink-0" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <Phone size={13} className="text-secondary flex-shrink-0" />
                <span className="truncate">{contact.phone || '+1 (555) 019-2834'}</span>
              </div>
              {contact.owner && (
                <div className="flex items-center gap-2 truncate text-tertiary" style={{ fontSize: '11px' }}>
                  <span>Owner: <strong className="text-secondary">{contact.owner}</strong></span>
                </div>
              )}
            </div>

            {/* Bottom Row: Type Badge & Action Buttons (Line-Free) */}
            <div className="flex items-center justify-between pt-1">
              <Badge variant="default">{contact.type}</Badge>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Button variant="outline" size="sm" icon={Eye} onClick={() => navigate(`/crm/contacts/${contact.id}`)}>
                  View
                </Button>
                <Button variant="ghost" size="sm" isIconOnly icon={Edit} onClick={() => handleOpenEdit(contact)} title="Edit" />
                <Button variant="ghost" size="sm" isIconOnly icon={Trash2} onClick={() => handleOpenDelete(contact)} title="Delete" />
              </div>
            </div>
          </Card>
        ))}

        {/* Mobile Pagination Footer */}
        <div
          className="p-3 surface-card rounded-lg border-subtle flex flex-col gap-2 items-center text-center"
          style={{ width: '100%', boxSizing: 'border-box' }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredContacts.length}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Add Contact Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Contact"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateContact}>
              Save Contact
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Eleanor Vance"
            required
          />
          <Input
            label="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Apex Global Technologies"
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. e.vance@apex.io"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +1 (555) 234-8901"
          />
          <Select
            label="Contact Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={['Enterprise Client', 'Commercial Lead', 'Investor', 'Borrower Partner', 'Supplier']}
          />
        </form>
      </Modal>

      {/* Edit Contact Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contact Record"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              Update Contact
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={['Active', 'Qualified', 'Pending KYC', 'Inactive']}
          />
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        isDanger
        title="Delete Contact Record?"
        description={`Are you sure you want to permanently delete ${contactToDelete?.name} (${contactToDelete?.company})? This action cannot be undone.`}
        confirmLabel="Delete Permanently"
      />
    </div>
  );
};
