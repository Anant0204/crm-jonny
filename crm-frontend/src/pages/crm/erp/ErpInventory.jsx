import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Package,
  AlertTriangle,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Warehouse,
  CheckCircle2,
  TrendingDown,
  ArrowDownRight
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
  Input,
  Modal
} from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';
import { useToast } from '../../../context/ToastContext';

export const ErpInventory = () => {
  const { inventory, addInventoryItem, fetchErpData } = useErp();
  const { addToast } = useToast();

  useEffect(() => {
    if (fetchErpData) {
      fetchErpData();
    }
  }, [fetchErpData]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Hardware',
    warehouse: 'Austin Central',
    quantity: 100,
    minThreshold: 20,
    unitCost: '$120.00',
    status: 'Optimal',
  });

  const warehouses = [
    { value: 'all', label: 'All Warehouses (Global Consolidated)' },
    { value: 'wh-austin', label: 'Austin Central Distribution Hub (Texas)' },
    { value: 'wh-dallas', label: 'Dallas Logistics & Freight Terminal' },
    { value: 'wh-houston', label: 'Houston Maritime Port Vault' },
  ];

  const filteredItems = inventory.filter((item) => {
    const matchesWarehouse = selectedWarehouse === 'all' || (item.warehouse || '').toLowerCase().includes(selectedWarehouse.replace('wh-', ''));
    const matchesSearch = (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (item.sku || item.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWarehouse && matchesSearch;
  });

  const handleCreateSKU = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) {
      addToast({ title: 'Validation Warning', message: 'SKU and product name are required.', type: 'warning' });
      return;
    }
    await addInventoryItem(formData);
    addToast({ title: 'SKU Added', message: `Added SKU ${formData.sku} to ${formData.warehouse}`, type: 'success' });
    setIsModalOpen(false);
    setFormData({ sku: '', name: '', category: 'Hardware', warehouse: 'Austin Central', quantity: 100, minThreshold: 20, unitCost: '$120.00', status: 'Optimal' });
  };

  const totalUnits = inventory.reduce((sum, item) => sum + (parseInt(item.quantity || item.stock, 10) || 0), 0);
  const lowStockCount = inventory.filter(i => (i.status || '').toLowerCase().includes('low') || (i.status || '').toLowerCase().includes('reorder')).length;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'ERP & Operations' }, { label: 'Inventory & Warehousing' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Warehouse Inventory & Multi-Hub Stock
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              Autonomous Replenishment
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Multi-location inventory tracking, automated minimum stock alerts, and direct procurement dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Add SKU Catalog Item
          </Button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Active SKUs" value={`${inventory.length} Items`} change="Consolidated Database" changeType="positive" icon={Boxes} />
        <KPICard title="Total Units in Stock" value={`${totalUnits.toLocaleString()} Units`} change="Across 3 Hubs" changeType="positive" icon={Package} />
        <KPICard title="Stock Reorder Triggers" value={`${lowStockCount} Items Low`} change={lowStockCount > 0 ? "Automated PR Prepared" : "Optimal Stock"} changeType={lowStockCount > 0 ? "warning" : "positive"} icon={AlertTriangle} />
        <KPICard title="Inventory Accuracy" value="99.8%" change="Barcode Scan Verified" changeType="positive" icon={CheckCircle2} />
      </div>

      {/* Warehouse Filter Bar */}
      <Card className="border shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full md:w-80">
            <label className="text-xs font-bold text-primary mb-1 block">Active Warehouse Node</label>
            <Select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              options={warehouses}
            />
          </div>

          <div className="w-full md:w-72">
            <label className="text-xs font-bold text-primary mb-1 block">Filter SKU / Part</label>
            <Input
              placeholder="Search by SKU or item name..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="border shadow-sm">
        <CardHeader
          title="Consolidated SKU Stock Positions"
          subtitle="Showing items matching selected warehouse and criteria"
        />
        <CardBody className="p-0 overflow-x-auto">
          {inventory.length === 0 ? (
            <div className="py-12 text-center text-xs text-tertiary">
              <p>No inventory items registered.</p>
              <p className="mt-1 text-secondary">Click 'Add SKU Catalog Item' to register parts and inventory items.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>SKU Code</TableCell>
                  <TableCell isHeader>Product Name</TableCell>
                  <TableCell isHeader>Category</TableCell>
                  <TableCell isHeader>Current Stock</TableCell>
                  <TableCell isHeader>Min Threshold</TableCell>
                  <TableCell isHeader>Warehouse Node</TableCell>
                  <TableCell isHeader>Unit Cost</TableCell>
                  <TableCell isHeader>Stock Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><span className="font-mono text-xs font-bold text-sky-600">{item.sku || item.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{item.name}</span></TableCell>
                    <TableCell><Badge variant="default">{item.category}</Badge></TableCell>
                    <TableCell><span className="font-black text-sm text-primary">{item.quantity ?? item.stock} units</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{item.minThreshold} units</span></TableCell>
                    <TableCell><span className="text-xs font-medium text-primary">{item.warehouse}</span></TableCell>
                    <TableCell><span className="font-mono text-xs font-bold text-primary">{item.unitCost}</span></TableCell>
                    <TableCell>
                      <Badge variant={(item.status || '').toLowerCase().includes('optimal') || (item.status || '').toLowerCase().includes('stock') ? 'success' : 'warning'}>
                        {item.status || 'Optimal'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Add SKU Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Inventory SKU Item"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Plus} onClick={handleCreateSKU}>
              Save SKU Item
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateSKU} className="flex flex-col gap-4">
          <Input
            label="SKU Part Code"
            placeholder="e.g. SKU-8920"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            required
          />
          <Input
            label="Product Name"
            placeholder="e.g. Telemetry CAN-Bus Transceiver"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Select
            label="Warehouse Hub Location"
            value={formData.warehouse}
            onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
            options={['Austin Central', 'Dallas Logistics', 'Houston Port']}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Initial Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            <Input
              label="Unit Cost ($)"
              value={formData.unitCost}
              onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ErpInventory;
