import React, { useState } from 'react';
import { FileCheck, Trash2, Eye, UploadCloud, Sparkles } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, FileUpload } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerDocuments = () => {
  const { addToast } = useToast();

  const [docs, setDocs] = useState([
    { id: 'DOC-1', title: 'Corporate Tax Return 2025.pdf', size: '2.4 MB', date: '2026-02-15', status: 'AI Verified' },
    { id: 'DOC-2', title: 'Bank Statement Q4 2025.pdf', size: '1.8 MB', date: '2026-02-16', status: 'AI Verified' },
    { id: 'DOC-3', title: 'Articles of Incorporation.pdf', size: '940 KB', date: '2026-02-10', status: 'AI Verified' },
  ]);

  const handleDelete = (id) => {
    setDocs(docs.filter((d) => d.id !== id));
    addToast({ title: 'Document Removed', type: 'error' });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'Documents Vault' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Vault Document Manager</h1>

      <Card className="p-6">
        <FileUpload
          label="Upload Additional Financial Statements or Asset Deeds"
          onFilesSelected={(files) => {
            const newDoc = { id: `DOC-${Date.now()}`, title: files[0].name, size: '1.2 MB', date: 'Just now', status: 'AI Verified' };
            setDocs([newDoc, ...docs]);
            addToast({ title: 'Document Uploaded & Verified', type: 'success' });
          }}
        />
      </Card>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>ID</TableCell>
                <TableCell isHeader>Document Title</TableCell>
                <TableCell isHeader>Size</TableCell>
                <TableCell isHeader>Date Uploaded</TableCell>
                <TableCell isHeader>Verification Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((d) => (
                <TableRow key={d.id}>
                  <TableCell><span className="font-mono text-xs">{d.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{d.title}</span></TableCell>
                  <TableCell>{d.size}</TableCell>
                  <TableCell>{d.date}</TableCell>
                  <TableCell><Badge variant="success" icon={Sparkles}>{d.status}</Badge></TableCell>
                  <TableCell align="right">
                    <Button variant="ghost" size="sm" isIconOnly icon={Trash2} onClick={() => handleDelete(d.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
