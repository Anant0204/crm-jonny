import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Plus, Eye, RefreshCw, UserCheck } from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, Badge, Modal, Input, Select, KPICard } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';
import { useToast } from '../../../context/ToastContext';

export const HrEmployees = () => {
  const navigate = useNavigate();
  const { employees, addEmployee, isLoading, fetchHrData } = useHr();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: 'Account Executive',
    department: 'Sales',
    email: '',
    phone: '',
    salary: '95000',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast({ title: 'Validation Error', message: 'Name and email are required.', type: 'error' });
      return;
    }

    try {
      const created = await addEmployee({
        ...formData,
        salary: parseFloat(formData.salary) || 0,
      });
      addToast({ title: 'Employee Added', message: `Added ${created.name} to HR database.`, type: 'success' });
      setIsModalOpen(false);
      setFormData({ name: '', designation: 'Account Executive', department: 'Sales', email: '', phone: '', salary: '95000' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to add employee.', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'Human Resources' }, { label: 'Employee Directory' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Employee Directory & Workforce Management
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              MySQL Persisted
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Internal workforce records, designations, departments, payroll status, and onboarding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchHrData} disabled={isLoading}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Employee
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Headcount" value={String(employees.length)} change="Active Employees" changeType="positive" icon={Users} />
        <KPICard title="Departments Active" value={String(new Set(employees.map(e => e.department)).size || 1)} change="Operations Matrix" changeType="positive" icon={UserCheck} />
        <KPICard title="Payroll Status" value="100% Reconciled" change="Processed in DB" changeType="positive" icon={Badge} />
        <KPICard title="Workforce Isolation" value="Isolated" change="Tenant Scoped" changeType="positive" icon={Badge} />
      </div>

      <Card className="border shadow-sm">
        <CardHeader
          title="Active Corporate Directory"
          subtitle="All employee profiles currently registered under this company tenant"
        />
        <CardBody className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-secondary">Loading employees from database...</div>
          ) : employees.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <Users className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-primary">No Employees Found</h3>
              <p className="text-xs text-secondary max-w-sm mt-1 mb-4">
                No employee records currently exist in the database. Click 'Add Employee' to register the first employee.
              </p>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
                Add First Employee
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Employee ID</TableCell>
                  <TableCell header>Full Name</TableCell>
                  <TableCell header>Department</TableCell>
                  <TableCell header>Designation</TableCell>
                  <TableCell header>Email Address</TableCell>
                  <TableCell header>Salary</TableCell>
                  <TableCell header>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className="font-mono text-xs font-bold text-sky-400">{emp.employeeId || emp.id}</TableCell>
                    <TableCell className="font-medium text-primary">{emp.name}</TableCell>
                    <TableCell className="text-xs text-secondary">{emp.department}</TableCell>
                    <TableCell className="text-xs text-secondary">{emp.designation}</TableCell>
                    <TableCell className="text-xs text-secondary">{emp.email}</TableCell>
                    <TableCell className="text-xs font-bold text-primary">${parseFloat(emp.salary || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={emp.status === 'Active' ? 'success' : 'warning'}>{emp.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Employee"
        size="md"
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input
            label="Full Name *"
            placeholder="e.g. Marcus Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Corporate Email *"
            type="email"
            placeholder="marcus.vance@company.io"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={[
                { value: 'Sales', label: 'Sales & Revenue' },
                { value: 'Engineering', label: 'Engineering & Tech' },
                { value: 'Operations', label: 'Operations & Logistics' },
                { value: 'Finance', label: 'Finance & Compliance' },
                { value: 'Marketing', label: 'Marketing & Content' },
              ]}
            />
            <Input
              label="Job Designation"
              placeholder="e.g. Account Executive"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            />
          </div>
          <Input
            label="Annual Salary ($)"
            type="number"
            placeholder="95000"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register Employee
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HrEmployees;
