import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderGit2, Plus, Eye } from 'lucide-react';
import { Breadcrumb, Button, Card, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Modal, Input, Select } from '../../../components/ui';
import { useErp } from '../../../context/ErpContext';
import { useToast } from '../../../context/ToastContext';

export const ErpProjects = () => {
  const navigate = useNavigate();
  const { projects, addProject, fetchErpData } = useErp();
  const { addToast } = useToast();

  useEffect(() => {
    if (fetchErpData) {
      fetchErpData();
    }
  }, [fetchErpData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', client: '', budget: '$300,000', manager: 'Alexander Wright', deadline: '2026-07-01' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.client) return;
    addProject(formData);
    addToast({ title: 'Project Created', message: `Added ERP project ${formData.name}`, type: 'success' });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'ERP' }, { label: 'Projects List' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>ERP Projects Directory</h1>
        </div>
        <div className="header-actions-right">
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>New Project</Button>
        </div>
      </div>

      <Card>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Project ID</TableCell>
                <TableCell isHeader>Project Name</TableCell>
                <TableCell isHeader>Client Account</TableCell>
                <TableCell isHeader>Budget</TableCell>
                <TableCell isHeader>Progress</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell><span className="font-mono text-xs">{p.id}</span></TableCell>
                  <TableCell><Link to={`/crm/erp/projects/${p.id}`} className="font-semibold text-primary">{p.name}</Link></TableCell>
                  <TableCell>{p.client}</TableCell>
                  <TableCell><span className="font-bold text-success">{p.budget}</span></TableCell>
                  <TableCell>{p.progress}%</TableCell>
                  <TableCell><Badge variant="primary">{p.status}</Badge></TableCell>
                  <TableCell align="right">
                    <Button variant="ghost" size="sm" icon={Eye} onClick={() => navigate(`/crm/erp/projects/${p.id}`)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New ERP Project">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Project Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Input label="Client Account" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} required />
          <Input label="Allocated Budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
          <Button variant="primary" type="submit">Create ERP Project</Button>
        </form>
      </Modal>
    </div>
  );
};
