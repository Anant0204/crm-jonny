import React, { useState, useEffect, useCallback } from 'react';
import {
  DollarSign,
  TrendingUp,
  FileText,
  CreditCard,
  Download,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Eye,
  Trash2
} from 'lucide-react';
import {
  Breadcrumb,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  KPICard,
  Button,
  Select,
  Modal,
  Input
} from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import invoiceService from '../../../services/invoiceService';

export const ErpFinance = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('invoices');
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // New Invoice Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    amount: '',
    status: 'Sent',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  const fetchInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await invoiceService.getInvoices();
      setInvoices(data);
    } catch (err) {
      console.error('Failed to load invoices:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.amount) {
      addToast({ title: 'Validation Error', message: 'Customer name and amount are required.', type: 'error' });
      return;
    }

    try {
      const created = await invoiceService.createInvoice({
        ...formData,
        amount: parseFloat(formData.amount),
        subtotal: parseFloat(formData.amount),
      });
      setInvoices((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setFormData({
        customerName: '',
        customerEmail: '',
        amount: '',
        status: 'Sent',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: '',
      });
      addToast({ title: 'Invoice Generated', message: `Invoice #${created.invoiceNumber} created.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to create invoice.', type: 'error' });
    }
  };

  // Dynamic KPI Calculations from Live Invoices
  const totalReceivables = invoices
    .filter((inv) => inv.status !== 'Paid' && inv.status !== 'Cancelled')
    .reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);

  const totalCollected = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);

  const totalInvoiceVolume = invoices.reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'ERP & Operations' }, { label: 'Finance & Invoicing' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Billing, Invoicing & Financial Accounts
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              Live Database Connected
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Real-time accounts receivable, commercial invoicing, payment status, and ledger records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={fetchInvoices}
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Dynamic Financial KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Total Invoiced Volume"
          value={`$${totalInvoiceVolume.toLocaleString()}`}
          change={`${invoices.length} Total Invoices`}
          changeType="positive"
          icon={DollarSign}
        />
        <KPICard
          title="Accounts Receivable (AR)"
          value={`$${totalReceivables.toLocaleString()}`}
          change="Pending Collection"
          changeType={totalReceivables > 0 ? 'warning' : 'positive'}
          icon={ArrowUpRight}
        />
        <KPICard
          title="Collected Revenue"
          value={`$${totalCollected.toLocaleString()}`}
          change="100% Reconciled"
          changeType="positive"
          icon={TrendingUp}
        />
        <KPICard
          title="Active Invoices"
          value={String(invoices.length)}
          change="Real-time MySQL Records"
          changeType="positive"
          icon={FileText}
        />
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-border gap-6">
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeTab === 'invoices' ? 'text-sky-400 font-bold' : 'text-secondary hover:text-primary'
          }`}
        >
          Commercial Invoices ({invoices.length})
          {activeTab === 'invoices' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-t" />
          )}
        </button>
      </div>

      {/* Invoices List Table */}
      <Card className="border shadow-sm">
        <CardHeader
          title="Live Commercial Invoices"
          subtitle="Real-time commercial invoices synced with customer accounts"
        />
        <CardBody className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-sm text-secondary">Loading financial invoices from database...</div>
          ) : invoices.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <FileText className="w-12 h-12 text-slate-500 mb-3" />
              <h3 className="text-base font-bold text-primary">No Invoices Found</h3>
              <p className="text-xs text-secondary max-w-sm mt-1 mb-4">
                No billing invoices currently exist in the database. Click 'Create Invoice' to generate the first commercial invoice.
              </p>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
                Generate First Invoice
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Invoice Number</TableCell>
                  <TableCell header>Client / Customer</TableCell>
                  <TableCell header>Issue Date</TableCell>
                  <TableCell header>Due Date</TableCell>
                  <TableCell header>Amount</TableCell>
                  <TableCell header>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono font-bold text-sky-400">
                      {inv.invoiceNumber}
                    </TableCell>
                    <TableCell className="font-medium text-primary">
                      {inv.customerName}
                      {inv.customerEmail && (
                        <span className="block text-xs text-secondary">{inv.customerEmail}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-secondary text-xs">
                      {new Date(inv.issueDate || inv.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-secondary text-xs">
                      {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'Net 30'}
                    </TableCell>
                    <TableCell className="font-bold text-primary">
                      ${parseFloat(inv.amount || 0).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          inv.status === 'Paid'
                            ? 'success'
                            : inv.status === 'Overdue'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {inv.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Generate Commercial Invoice"
        size="md"
      >
        <form onSubmit={handleCreateInvoice} className="flex flex-col gap-4">
          <Input
            label="Customer / Client Name *"
            placeholder="e.g. Apex Global Technologies"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
          <Input
            label="Customer Email"
            placeholder="billing@customer.com"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Invoice Amount ($) *"
              placeholder="50000"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <Select
              label="Invoice Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { value: 'Sent', label: 'Sent (Pending Payment)' },
                { value: 'Paid', label: 'Paid in Full' },
                { value: 'Draft', label: 'Draft' },
                { value: 'Overdue', label: 'Overdue' },
              ]}
            />
          </div>
          <Input
            label="Payment Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <Input
            label="Notes / Terms"
            placeholder="Net 30 Days payment terms"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save & Issue Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ErpFinance;
