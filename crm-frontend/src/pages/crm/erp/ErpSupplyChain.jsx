import React from 'react';
import { Breadcrumb, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, ProgressBar } from '../../../components/ui';

export const ErpSupplyChain = () => {
  const shipments = [
    { id: 'SHP-701', origin: 'Austin Hub, TX', destination: 'Rotterdam Port, NL', carrier: 'Maersk Logistics', status: 'In Transit', eta: '2026-03-04' },
    { id: 'SHP-702', origin: 'Shanghai Port, CN', destination: 'Austin Hub, TX', carrier: 'DHL Global Forwarding', status: 'Delivered', eta: '2026-02-20' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'ERP' }, { label: 'Supply Chain & Freight' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Supply Chain & Freight Tracker</h1>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Shipment ID</TableCell>
                <TableCell isHeader>Origin</TableCell>
                <TableCell isHeader>Destination</TableCell>
                <TableCell isHeader>Carrier</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>ETA</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((s) => (
                <TableRow key={s.id}>
                  <TableCell><span className="font-mono text-xs">{s.id}</span></TableCell>
                  <TableCell>{s.origin}</TableCell>
                  <TableCell>{s.destination}</TableCell>
                  <TableCell><span className="font-semibold">{s.carrier}</span></TableCell>
                  <TableCell><Badge variant={s.status === 'Delivered' ? 'success' : 'primary'}>{s.status}</Badge></TableCell>
                  <TableCell>{s.eta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
