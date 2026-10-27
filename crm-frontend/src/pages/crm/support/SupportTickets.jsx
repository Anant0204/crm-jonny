import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LifeBuoy,
  Plus,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  Filter,
  Users,
  RefreshCw,
  Trash2
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Modal,
  Input,
  Select,
  KPICard
} from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';
import { useToast } from '../../../context/ToastContext';

const ticketStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

export const SupportTickets = () => {
  const navigate = useNavigate();
  const { tickets, addTicket, updateTicketStatus, isLoading, fetchSupportData } = useSupport();
  const { addToast } = useToast();

  useEffect(() => {
    if (fetchSupportData) {
      fetchSupportData();
    }
  }, [fetchSupportData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    priority: 'Medium',
    slaHours: 24,
  });

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch =
      (t.title && t.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.ticketNumber && t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      addToast({ title: 'Validation Error', message: 'Ticket title is required.', type: 'error' });
      return;
    }

    try {
      const created = await addTicket(formData);
      addToast({ title: 'Ticket Created', message: `Support ticket #${created.ticketNumber} submitted.`, type: 'success' });
      setIsModalOpen(false);
      setFormData({ title: '', description: '', category: 'Technical', priority: 'Medium', slaHours: 24 });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to create ticket.', type: 'error' });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTicketStatus(id, newStatus);
      addToast({ title: 'Status Updated', message: `Ticket status set to ${newStatus}.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to update ticket.', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'Customer Support' }, { label: 'Tickets Desk' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Customer Support Tickets & SLA Management
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              24/7 SLA Tracking
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Customer inquiries, technical tickets, escalation tiers, and real-time resolution SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchSupportData} disabled={isLoading}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Create Ticket
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Open Tickets" value={String(tickets.filter(t => t.status === 'Open').length)} change="Awaiting Action" changeType={tickets.filter(t => t.status === 'Open').length > 0 ? 'warning' : 'positive'} icon={LifeBuoy} />
        <KPICard title="In Progress" value={String(tickets.filter(t => t.status === 'In Progress').length)} change="Active Engineering" changeType="positive" icon={Clock} />
        <KPICard title="Resolved Tickets" value={String(tickets.filter(t => t.status === 'Resolved').length)} change="100% SLA Compliant" changeType="positive" icon={CheckCircle2} />
        <KPICard title="Average SLA Target" value="24 Hours" change="Guaranteed Tier" changeType="positive" icon={Sparkles} />
      </div>

      {/* Main Table Card */}
      <Card className="border shadow-sm">
        <CardHeader
          title="Active Support Cases"
          subtitle="All tickets registered across this company tenant"
        />
        <CardBody className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-secondary">Loading support tickets from database...</div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <LifeBuoy className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-primary">No Support Tickets Found</h3>
              <p className="text-xs text-secondary max-w-sm mt-1 mb-4">
                No support tickets currently exist in the database. Click 'Create Ticket' to open a new support case.
              </p>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
                Open First Ticket
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Ticket #</TableCell>
                  <TableCell header>Issue Title</TableCell>
                  <TableCell header>Category</TableCell>
                  <TableCell header>Priority</TableCell>
                  <TableCell header>SLA Window</TableCell>
                  <TableCell header>Status</TableCell>
                  <TableCell header>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono font-bold text-xs text-sky-400">{t.ticketNumber || t.id}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-primary">{t.title}</div>
                      <div className="text-xs text-secondary line-clamp-1">{t.description}</div>
                    </TableCell>
                    <TableCell className="text-xs text-secondary">{t.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          t.priority === 'Urgent' || t.priority === 'High'
                            ? 'danger'
                            : t.priority === 'Medium'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {t.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-secondary">{t.slaHours || 24}h Window</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          t.status === 'Resolved' || t.status === 'Closed'
                            ? 'success'
                            : t.status === 'In Progress'
                            ? 'info'
                            : 'warning'
                        }
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <select
                        className="bg-slate-900 border border-slate-700 text-[11px] rounded px-2 py-1 text-slate-200"
                        value={t.status}
                        onChange={(e) => handleStatusChange(t.id, e.target.value)}
                      >
                        {ticketStatuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Create Ticket Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Open Support Ticket"
        size="md"
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input
            label="Issue Subject / Title *"
            placeholder="e.g. Single Sign-On Gateway Handshake Error"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: 'Technical', label: 'Technical & System' },
                { value: 'Billing', label: 'Billing & Payments' },
                { value: 'Integration', label: 'API & Integrations' },
                { value: 'Account', label: 'Account & Access' },
              ]}
            />
            <Select
              label="Priority Level"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              options={[
                { value: 'Low', label: 'Low (48h SLA)' },
                { value: 'Medium', label: 'Medium (24h SLA)' },
                { value: 'High', label: 'High (12h SLA)' },
                { value: 'Urgent', label: 'Urgent (4h SLA)' },
              ]}
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              <span>Issue Details / Description</span>
            </label>
            <textarea
              className="form-control"
              style={{ minHeight: '100px', resize: 'vertical', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
              placeholder="Describe the problem, steps to reproduce, or error codes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SupportTickets;
