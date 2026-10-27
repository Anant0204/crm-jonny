import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge } from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';

export const ErpSalesOrders = () => {
  const { salesOrders, isLoading } = useErp();

  return (
    <div className="flex flex-col gap-6">
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'ERP' }, { label: 'Sales & Orders' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Sales Orders Directory</h1>
          <p className="text-xs text-secondary margin-0">
            Live order fulfillment tracking, commercial deal scope, and delivery status
          </p>
        </div>
      </div>

      <Card>
        <CardBody className="p-0">
          {salesOrders.length === 0 ? (
            <div className="py-12 text-center text-xs text-tertiary">
              <p>No Sales Orders recorded yet.</p>
              <p className="mt-1 text-secondary">Winning an opportunity deal in the CRM Pipeline generates matching Sales Orders here.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>SO ID</TableCell>
                  <TableCell isHeader>Customer</TableCell>
                  <TableCell isHeader>Items Summary</TableCell>
                  <TableCell isHeader>Total Value</TableCell>
                  <TableCell isHeader>Fulfillment Status</TableCell>
                  <TableCell isHeader>Order Date</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesOrders.map((so) => (
                  <TableRow key={so.id}>
                    <TableCell><span className="font-mono text-xs font-semibold">{so.orderNumber || so.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{so.customer}</span></TableCell>
                    <TableCell>{so.items}</TableCell>
                    <TableCell><span className="font-bold text-success">{so.total}</span></TableCell>
                    <TableCell><Badge variant={so.status === 'Fulfilled' ? 'success' : 'primary'}>{so.status}</Badge></TableCell>
                    <TableCell>{so.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ErpSalesOrders;
