import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { Button, Card, Tabs, Checkbox, Badge, Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const modulesList = [
  'Contacts & Accounts',
  'Leads & Sales Pipeline',
  'Deals & Proposals',
  'ERP & Procurement',
  'HR & Employee Records',
  'Customer Support Desk',
  'AI Content Studio',
  'Invoices & Billing',
  'Administration & Security',
];

const permissionKeys = ['View', 'Create', 'Edit', 'Delete', 'Export', 'Admin'];

export const CrmRolesPermissions = () => {
  const navigate = useNavigate();
  const { rolesPermissions, updateRolesPermissions } = useAuth();
  const { addToast } = useToast();

  const [activeRole, setActiveRole] = useState('Sales');
  const [matrix, setMatrix] = useState(rolesPermissions);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (role, perm) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm],
      },
    }));
  };

  const handleResetDefaults = () => {
    setMatrix({
      Owner: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
      Admin: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
      Sales: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
      HR: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
      Finance: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
      Employee: { View: true, Create: false, Edit: false, Delete: false, Export: false, Admin: false },
    });
    addToast({ title: 'Permissions Reset', message: 'Restored enterprise security defaults.', type: 'info' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateRolesPermissions(matrix);
      addToast({
        title: 'Security Policy Saved',
        message: 'Role-based Access Control (RBAC) rules stored in workspace vault.',
        type: 'success',
      });
      setIsLoading(false);
      navigate('/crm/onboarding-complete');
    }, 500);
  };

  return (
    <Card className="p-6" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          <Shield size={24} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Roles & Permission Policies</h2>
        <p className="text-xs text-secondary margin-0">
          Configure Role-Based Access Control (RBAC) for your company workspace
        </p>
      </div>

      {/* Role Selection Tabs */}
      <Tabs
        tabs={[
          { id: 'Owner', label: 'Owner' },
          { id: 'Admin', label: 'Admin' },
          { id: 'Sales', label: 'Sales' },
          { id: 'HR', label: 'HR' },
          { id: 'Finance', label: 'Finance' },
          { id: 'Employee', label: 'Employee' },
        ]}
        activeTab={activeRole}
        onChange={setActiveRole}
        className="mb-4"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Role: {activeRole}</Badge>
          <span className="text-xs text-secondary">
            Configuring system module privileges for {activeRole} users
          </span>
        </div>

        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleResetDefaults}>
          Reset Security Defaults
        </Button>
      </div>

      {/* Permissions Matrix Table */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>System Module</TableCell>
                {permissionKeys.map((perm) => (
                  <TableCell key={perm} isHeader align="center">
                    {perm}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {modulesList.map((mod) => (
                <TableRow key={mod}>
                  <TableCell><span className="font-semibold text-xs text-primary">{mod}</span></TableCell>
                  {permissionKeys.map((perm) => {
                    const isChecked = matrix[activeRole]?.[perm] ?? false;
                    return (
                      <TableCell key={perm} align="center">
                        <Checkbox
                          checked={isChecked}
                          onChange={() => handleToggle(activeRole, perm)}
                          disabled={activeRole === 'Owner'} // Owner has fixed super admin access
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-subtle pt-4">
          <span className="text-xs text-tertiary">
            Multi-tenant data isolation enforced automatically for all roles.
          </span>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Finalize Security & Complete Onboarding
          </Button>
        </div>
      </form>
    </Card>
  );
};
