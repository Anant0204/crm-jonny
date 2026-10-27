import React from 'react';
import { Breadcrumb, Card, CardHeader, CardBody, Badge, Button } from '../../../components/ui';
import { Download, FileText } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const ErpReports = () => {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'ERP' }, { label: 'ERP Reports & Audits' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>ERP Executive Reports</h1>

      <div className="grid-responsive-2col">
        <Card className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FileText className="text-primary" size={24} />
            <h3 className="text-base font-semibold">Q1 Financial & Ledger Audit Report</h3>
          </div>
          <p className="text-xs text-secondary margin-0">Complete balance sheet, cash flows, and operating expenses summary.</p>
          <Button variant="outline" size="sm" icon={Download} onClick={() => addToast({ title: 'Downloading', message: 'Generated PDF report.', type: 'success' })}>Download PDF Report</Button>
        </Card>

        <Card className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FileText className="text-success" size={24} />
            <h3 className="text-base font-semibold">Supply Chain & Inventory Valuation</h3>
          </div>
          <p className="text-xs text-secondary margin-0">Warehouse stock valuation, turn rate, and freight SLAs.</p>
          <Button variant="outline" size="sm" icon={Download} onClick={() => addToast({ title: 'Downloading', message: 'Generated Excel report.', type: 'success' })}>Download Excel Report</Button>
        </Card>
      </div>
    </div>
  );
};
