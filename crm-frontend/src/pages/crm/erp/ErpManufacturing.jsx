import React, { useState, useEffect, useCallback } from 'react';
import {
  Factory,
  Cpu,
  Layers,
  CheckCircle2,
  Clock,
  Plus,
  Play,
  Settings,
  AlertTriangle,
  GitBranch,
  Boxes,
  RefreshCw
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
import { useToast } from '../../../context/ToastContext';
import manufacturingService from '../../../services/manufacturingService';

export const ErpManufacturing = () => {
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: 100,
    bomCode: '',
    status: 'Scheduled',
  });

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await manufacturingService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load production orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!formData.productName) {
      addToast({ title: 'Validation Error', message: 'Product name is required.', type: 'error' });
      return;
    }

    try {
      const created = await manufacturingService.createOrder({
        ...formData,
        quantity: parseInt(formData.quantity, 10) || 1,
      });
      setOrders((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setFormData({ productName: '', quantity: 100, bomCode: '', status: 'Scheduled' });
      addToast({ title: 'Work Order Scheduled', message: `Order #${created.orderNumber} placed on production floor.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to create production order.', type: 'error' });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await manufacturingService.updateOrder(id, { status: newStatus });
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      addToast({ title: 'Status Updated', message: `Order status set to ${newStatus}.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to update order.', type: 'error' });
    }
  };

  const totalUnits = orders.reduce((acc, o) => acc + (o.quantity || 0), 0);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'ERP & Operations' }, { label: 'Manufacturing & Assembly' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Manufacturing Assembly & Work Orders
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              Shop Floor Live
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Production scheduling, Bill of Materials (BOM), assembly line tracking, and quality control.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchOrders} disabled={isLoading}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Schedule Work Order
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Scheduled Work Orders" value={String(orders.length)} change="Active in Production" changeType="positive" icon={Factory} />
        <KPICard title="Total Unit Volume" value={String(totalUnits)} change="Production Target" changeType="positive" icon={Boxes} />
        <KPICard title="Quality Assurance" value="100% Passed" change="Zero Defects" changeType="positive" icon={CheckCircle2} />
        <KPICard title="BOM Active Specs" value={String(new Set(orders.map(o => o.bomCode)).size || 1)} change="Standardized" changeType="positive" icon={GitBranch} />
      </div>

      {/* Work Orders Table */}
      <Card className="border shadow-sm">
        <CardHeader
          title="Active Assembly Line Work Orders"
          subtitle="Real-time shop floor execution queue synced with ERP logistics"
        />
        <CardBody className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-secondary">Loading work orders from database...</div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <Factory className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-primary">No Work Orders Scheduled</h3>
              <p className="text-xs text-secondary max-w-sm mt-1 mb-4">
                No manufacturing orders are currently in the queue. Click 'Schedule Work Order' to start an assembly run.
              </p>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
                Schedule First Order
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Order #</TableCell>
                  <TableCell header>Product / Assembly</TableCell>
                  <TableCell header>BOM Code</TableCell>
                  <TableCell header>Batch Quantity</TableCell>
                  <TableCell header>Start Date</TableCell>
                  <TableCell header>Status</TableCell>
                  <TableCell header>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono font-bold text-xs text-sky-400">{o.orderNumber || o.id}</TableCell>
                    <TableCell className="font-medium text-primary">{o.productName}</TableCell>
                    <TableCell className="text-xs text-secondary font-mono">{o.bomCode || 'BOM-STD-01'}</TableCell>
                    <TableCell className="text-xs font-bold text-primary">{o.quantity} Units</TableCell>
                    <TableCell className="text-xs text-secondary">{new Date(o.startDate || o.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          o.status === 'Completed'
                            ? 'success'
                            : o.status === 'In Production'
                            ? 'info'
                            : o.status === 'Quality Check'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <select
                        className="bg-slate-900 border border-slate-700 text-[11px] rounded px-2 py-1 text-slate-200"
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Production">In Production</option>
                        <option value="Quality Check">Quality Check</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Schedule Work Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Manufacturing Work Order"
        size="md"
      >
        <form onSubmit={handleCreateOrder} className="flex flex-col gap-4">
          <Input
            label="Product Name / Assembly *"
            placeholder="e.g. Autonomous Vehicle Telemetry Unit v4"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Batch Quantity (Units) *"
              type="number"
              placeholder="250"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
            <Input
              label="Bill of Materials (BOM) Code"
              placeholder="e.g. BOM-TEL-04"
              value={formData.bomCode}
              onChange={(e) => setFormData({ ...formData, bomCode: e.target.value })}
            />
          </div>
          <Select
            label="Initial Production Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'Scheduled', label: 'Scheduled in Queue' },
              { value: 'In Production', label: 'In Production (Line Active)' },
              { value: 'Quality Check', label: 'Quality Assurance Testing' },
            ]}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Dispatch to Shop Floor
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ErpManufacturing;
