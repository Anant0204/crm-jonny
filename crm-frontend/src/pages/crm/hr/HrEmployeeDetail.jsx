import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Mail,
  Building2,
  Briefcase,
  DollarSign,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  User,
  Hash
} from 'lucide-react';
import { Breadcrumb, Button, Card, Badge, Avatar, Modal, Input, Select } from '../../../components/ui';
import { useHr } from '../../../context/HrContext';
import { useToast } from '../../../context/ToastContext';

export const HrEmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useHr();
  const { addToast } = useToast();

  const emp = employees.find((e) => e.id === id) || employees[0];

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    dept: '',
    salary: '',
  });

  // Sync Form Data when employee changes or modal opens
  useEffect(() => {
    if (emp) {
      setFormData({
        name: emp.name || '',
        email: emp.email || '',
        role: emp.role || '',
        dept: emp.dept || 'Engineering',
        salary: emp.salary || '$130,000',
      });
    }
  }, [emp]);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast({ title: 'Validation Error', message: 'Employee name and email are required.', type: 'error' });
      return;
    }

    updateEmployee({
      id: emp.id,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      dept: formData.dept,
      salary: formData.salary,
      status: emp.status || 'Active',
    });

    addToast({
      title: 'Profile Updated Successfully',
      message: `Employee details for ${formData.name} have been updated.`,
      type: 'success',
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '860px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Top Navigation & Action Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Breadcrumb
            items={[
              { label: 'CRM nErgy AI' },
              { label: 'HR & Recruiting', href: '/crm/hr' },
              { label: 'Employees', href: '/crm/hr' },
              { label: emp.name },
            ]}
          />
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0, marginTop: '2px' }}>
            Employee Profile
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/crm/hr')}
          >
            Back to Directory
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Edit}
            onClick={() => setIsEditModalOpen(true)}
            style={{ borderRadius: '8px', padding: '0.6rem 1.25rem' }}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Main Profile Card (Box-Free & 2 Fields Per Line Layout) */}
      <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--surface)', padding: '2rem 1.75rem' }}>
        <div className="flex flex-col gap-6">
          
          {/* Top Hero Section */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-4">
              <Avatar name={emp.name} size="lg" status="online" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {emp.name}
                  </h2>
                  <Badge variant="success">Active</Badge>
                  <Badge variant="info">{emp.dept}</Badge>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {emp.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-tertiary font-bold uppercase tracking-wider">Employee ID:</span>
              <span className="font-mono text-xs font-bold text-primary px-3 py-1.5 surface-secondary rounded-lg border-subtle">
                {emp.id}
              </span>
            </div>
          </div>

          {/* Box-Free 2-Fields-Per-Line Grid Layout */}
          <div className="flex flex-col gap-6 pt-1">
            
            {/* Section 1: Employment Details */}
            <div className="flex flex-col gap-3">
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, marginBottom: '2px' }}>
                Employment Details
              </h3>

              <div className="grid-employee-fields">
                {/* Field 1: Full Name */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <User size={13} className="text-primary flex-shrink-0" /> Full Name
                  </span>
                  <span className="font-bold text-primary" style={{ fontSize: '13px', wordBreak: 'break-word' }}>{emp.name}</span>
                </div>

                {/* Field 2: Job Title / Role */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <Briefcase size={13} className="text-primary flex-shrink-0" /> Job Title / Role
                  </span>
                  <span className="font-semibold text-primary" style={{ fontSize: '13px', wordBreak: 'break-word' }}>{emp.role}</span>
                </div>

                {/* Field 3: Department Division */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <Building2 size={13} className="text-primary flex-shrink-0" /> Department Division
                  </span>
                  <span className="font-semibold text-secondary" style={{ fontSize: '13px', wordBreak: 'break-word' }}>{emp.dept}</span>
                </div>

                {/* Field 4: Governance Role */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <ShieldCheck size={13} className="text-primary flex-shrink-0" /> Governance Role
                  </span>
                  <span className="font-bold text-primary" style={{ fontSize: '13px', wordBreak: 'break-word' }}>Enterprise Super Admin</span>
                </div>
              </div>
            </div>

            {/* Section 2: Contact & Payroll Information */}
            <div className="flex flex-col gap-3 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, marginBottom: '2px' }}>
                Contact & Payroll Information
              </h3>

              <div className="grid-employee-fields">
                {/* Field 5: Corporate Email */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <Mail size={13} className="text-primary flex-shrink-0" /> Corporate Email
                  </span>
                  <span className="font-mono font-bold text-primary" style={{ fontSize: '12.5px', wordBreak: 'break-all' }}>{emp.email}</span>
                </div>

                {/* Field 6: Base Salary */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <DollarSign size={13} className="text-success flex-shrink-0" /> Base Salary
                  </span>
                  <span className="font-extrabold text-success" style={{ fontSize: '13px', wordBreak: 'break-word' }}>{emp.salary || '$130,000'}</span>
                </div>

                {/* Field 7: Office Location */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <MapPin size={13} className="text-primary flex-shrink-0" /> Office Location
                  </span>
                  <span className="font-medium text-secondary" style={{ fontSize: '13px', wordBreak: 'break-word' }}>San Francisco HQ (Hybrid)</span>
                </div>

                {/* Field 8: Date Joined */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-tertiary font-semibold flex items-center gap-1.5 uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    <Calendar size={13} className="text-primary flex-shrink-0" /> Date Joined
                  </span>
                  <span className="font-medium text-secondary" style={{ fontSize: '13px', wordBreak: 'break-word' }}>Jan 15, 2022</span>
                </div>
              </div>
            </div>

          </div>

          {/* Audit Verification Footer Bar */}
          <div className="pt-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-tertiary border-t" style={{ borderColor: 'var(--border)' }}>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={15} className="text-success" /> Security & background payroll credentials verified.
            </span>
            <span>Last Synced: Today at 02:30 PM</span>
          </div>

        </div>
      </Card>

      {/* Working Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Profile - ${emp.name}`}
      >
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          <Input
            label="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Corporate Email *"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Job Title / Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />

          <Select
            label="Department"
            value={formData.dept}
            onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
            options={[
              { value: 'Executive', label: 'Executive' },
              { value: 'Sales', label: 'Sales' },
              { value: 'Finance', label: 'Finance' },
              { value: 'Human Resources', label: 'Human Resources' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Operations', label: 'Operations' },
            ]}
          />

          <Input
            label="Annual Base Salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />

          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-subtle">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
