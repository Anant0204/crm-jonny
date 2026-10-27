import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Plus, Trash2, Mail, User, Shield, ArrowRight, Upload } from 'lucide-react';
import { Input, Select, Button, Card, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmEmployeeInvite = () => {
  const navigate = useNavigate();
  const { invitedEmployees, updateInvitedEmployees } = useAuth();
  const { addToast } = useToast();

  const [employees, setEmployees] = useState(
    invitedEmployees.length > 0
      ? invitedEmployees
      : [
          { name: 'Sarah Jenkins', email: 's.jenkins@nergy.io', role: 'Sales' },
          { name: 'David Chen', email: 'd.chen@nergy.io', role: 'Finance' },
          { name: 'Elena Rostova', email: 'e.rostova@nergy.io', role: 'HR' },
        ]
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleRowChange = (index, field, value) => {
    const updated = [...employees];
    updated[index][field] = value;
    setEmployees(updated);
  };

  const addRow = () => {
    setEmployees([...employees, { name: '', email: '', role: 'Employee' }]);
  };

  const removeRow = (index) => {
    if (employees.length <= 1) {
      addToast({ title: 'Minimum Invite', message: 'At least one team row must remain.', type: 'warning' });
      return;
    }
    const updated = employees.filter((_, idx) => idx !== index);
    setEmployees(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validInvites = employees.filter((emp) => emp.email && emp.email.includes('@'));

    setTimeout(() => {
      updateInvitedEmployees(validInvites);
      addToast({
        title: 'Team Invitations Dispatched',
        message: `Sent ${validInvites.length} invitation link(s) to company workspace.`,
        type: 'success',
      });
      setIsLoading(false);
      navigate('/crm/roles-permissions');
    }, 500);
  };

  return (
    <Card className="p-6" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div className="flex flex-col items-center text-center mb-6">
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
          }}
        >
          <UserPlus size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Invite Employees & Team Members</h2>
        <p className="text-xs text-secondary margin-0">
          Step 6 of 6: Provision role-based team invitations for your company workspace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">
            Team Member Invitations ({employees.length})
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={addRow}
          >
            Add Team Member
          </Button>
        </div>

        {/* Dynamic Invitation Rows */}
        <div className="flex flex-col gap-3">
          {employees.map((emp, idx) => (
            <div
              key={idx}
              className="p-3 surface-secondary rounded-md border-subtle flex flex-col md:flex-row items-center gap-3"
            >
              <div className="flex-1 w-full">
                <Input
                  placeholder="Full Name"
                  value={emp.name}
                  onChange={(e) => handleRowChange(idx, 'name', e.target.value)}
                  startIcon={User}
                />
              </div>

              <div className="flex-1 w-full">
                <Input
                  placeholder="Business Email"
                  type="email"
                  value={emp.email}
                  onChange={(e) => handleRowChange(idx, 'email', e.target.value)}
                  startIcon={Mail}
                />
              </div>

              <div style={{ minWidth: '130px' }} className="w-full md:w-auto">
                <Select
                  value={emp.role}
                  onChange={(e) => handleRowChange(idx, 'role', e.target.value)}
                  options={['Owner', 'Admin', 'Sales', 'HR', 'Finance', 'Employee']}
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                isIconOnly
                icon={Trash2}
                onClick={() => removeRow(idx)}
                title="Remove Member"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-subtle pt-4 mt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              updateInvitedEmployees([]);
              navigate('/crm/roles-permissions');
            }}
          >
            Skip Employee Invites
          </Button>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Configure Roles & Permissions Matrix
          </Button>
        </div>
      </form>
    </Card>
  );
};
