import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShoppingBag,
  Building2,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Filter,
  DollarSign,
  AlertCircle
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
  Modal,
  Input,
  Select
} from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';
import { useToast } from '../../../context/ToastContext';

export const ErpProcurement = () => {
  const { purchaseOrders, addPurchaseOrder, fetchErpData } = useErp();
  const { addToast } = useToast();

  useEffect(() => {
    if (fetchErpData) {
      fetchErpData();
    }
  }, [fetchErpData]);
  const [activeTab, setActiveTab] = useState('orders');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    vendor: '',
    items: '',
    amount: '$35,000',
    status: 'Pending Approval',
  });

  const vendors = [
    { id: 'VND-01', name: 'Apex Semiconductor Fab', rating: '99.2% Reliability', category: 'Silicon / Compute', spendYtd: '$480,000', status: 'Tier 1 Preferred' },
    { id: 'VND-02', name: 'Texas Optical Sensor Corp', rating: '96.8% Reliability', category: 'Optics & LiDAR', spendYtd: '$240,000', status: 'Tier 1 Preferred' },
    { id: 'VND-03', name: 'Global Logistics Cables Inc.', rating: '98.5% Reliability', category: 'Wiring & Harnesses', spendYtd: '$95,000', status: 'Approved Vendor' },
  ];

  const handleCreatePO = async (e) => {
    e.preventDefault();
    if (!formData.vendor || !formData.items) {
      addToast({ title: 'Validation Warning', message: 'Vendor name and item description required.', type: 'warning' });
      return;
    }
    await addPurchaseOrder(formData);
    addToast({ title: 'PO Requisition Created', message: `Submitted Purchase Order to ${formData.vendor}`, type: 'success' });
    setIsModalOpen(false);
    setFormData({ vendor: '', items: '', amount: '$35,000', status: 'Pending Approval' });
  };

  const totalSpend = purchaseOrders.reduce((sum, po) => {
    const val = typeof po.amount === 'number' ? po.amount : parseFloat(String(po.amount).replace(/[^0-9.-]+/g, '')) || 0;
    return sum + val;
  }, 0);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'ERP & Operations' }, { label: 'Procurement & Purchasing' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Procurement & Vendor Purchase Orders
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              Automated PO Requisitions
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Purchase requests, electronic PO approvals, supplier performance scorecards, and incoming delivery tracking.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Create Purchase Order
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Active Purchase Orders" value={`${purchaseOrders.length} Orders`} change={`$${totalSpend.toLocaleString()} Total Value`} changeType="positive" icon={ShoppingBag} />
        <KPICard title="Pending Sign-Off" value={`${purchaseOrders.filter(p => p.status === 'Pending Approval').length} Orders`} change="Requires Verification" changeType="warning" icon={Clock} />
        <KPICard title="Preferred Vendors" value={`${vendors.length} Suppliers`} change="98.4% On-Time Delivery" changeType="positive" icon={Building2} />
        <KPICard title="Total PO Spend" value={`$${totalSpend.toLocaleString()}`} change="Live Database Sum" changeType="positive" icon={DollarSign} />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          Purchase Orders (POs) ({purchaseOrders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('vendors')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'vendors'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          Approved Vendor Directory ({vendors.length})
        </button>
      </div>

      {/* Table Content */}
      {activeTab === 'orders' ? (
        <Card className="border shadow-sm">
          <CardHeader title="Purchase Order Requisitions" subtitle="Live tracking from requisition to warehouse receipt" />
          <CardBody className="p-0 overflow-x-auto">
            {purchaseOrders.length === 0 ? (
              <div className="py-12 text-center text-xs text-tertiary">
                <p>No purchase orders found.</p>
                <p className="mt-1 text-secondary">Click 'Create Purchase Order' to initiate vendor procurement.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>PO Number</TableCell>
                    <TableCell isHeader>Supplier Name</TableCell>
                    <TableCell isHeader>Items Ordered</TableCell>
                    <TableCell isHeader>Order Date</TableCell>
                    <TableCell isHeader>Amount</TableCell>
                    <TableCell isHeader>Estimated Arrival</TableCell>
                    <TableCell isHeader>Approval Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map((po) => (
                    <TableRow key={po.id}>
                      <TableCell><span className="font-mono text-xs font-bold text-sky-600">{po.poNumber || po.id}</span></TableCell>
                      <TableCell><span className="font-semibold text-primary">{po.vendor}</span></TableCell>
                      <TableCell><span className="text-xs text-secondary">{po.items}</span></TableCell>
                      <TableCell><span className="text-xs text-secondary">{po.date}</span></TableCell>
                      <TableCell><span className="font-bold text-sm text-primary">{po.amount}</span></TableCell>
                      <TableCell><span className="text-xs font-medium text-primary">{po.eta || 'Within 10 Days'}</span></TableCell>
                      <TableCell>
                        <Badge variant={po.status === 'Approved' || po.status === 'Delivered' ? 'success' : po.status === 'In Transit' ? 'primary' : 'warning'}>
                          {po.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      ) : (
        <Card className="border shadow-sm">
          <CardHeader title="Enterprise Vendor Directory" subtitle="Evaluated suppliers and annual spend tracking" />
          <CardBody className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Vendor Code</TableCell>
                  <TableCell isHeader>Company Name</TableCell>
                  <TableCell isHeader>Commodity Category</TableCell>
                  <TableCell isHeader>Reliability Score</TableCell>
                  <TableCell isHeader>YTD Total Spend</TableCell>
                  <TableCell isHeader>Supplier Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell><span className="font-mono text-xs font-bold text-primary">{v.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{v.name}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{v.category}</span></TableCell>
                    <TableCell><span className="font-bold text-emerald-600 text-xs">{v.rating}</span></TableCell>
                    <TableCell><span className="font-bold text-sm text-primary">{v.spendYtd}</span></TableCell>
                    <TableCell><Badge variant="success">{v.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Create PO Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Purchase Order Requisition"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Plus} onClick={handleCreatePO}>
              Submit PO Requisition
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreatePO} className="flex flex-col gap-4">
          <Input
            label="Supplier / Vendor Name"
            placeholder="e.g. Apex Semiconductor Fab"
            value={formData.vendor}
            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
            required
          />
          <Input
            label="Items Description & Quantity"
            placeholder="e.g. 500x Telemetry Sensor Gateways"
            value={formData.items}
            onChange={(e) => setFormData({ ...formData, items: e.target.value })}
            required
          />
          <Input
            label="Requisition Total Amount"
            placeholder="e.g. $45,000"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <Select
            label="Approval Workflow Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={['Pending Approval', 'Approved', 'In Transit']}
          />
        </form>
      </Modal>
    </div>
  );
};

export default ErpProcurement;
