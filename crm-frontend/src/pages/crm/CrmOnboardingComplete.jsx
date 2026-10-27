import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, Building2, User, Users, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CrmOnboardingComplete = () => {
  const navigate = useNavigate();
  const { user, companyData, invitedEmployees } = useAuth();
  const { addToast } = useToast();

  const handleGoDashboard = () => {
    addToast({
      title: 'Workspace Active',
      message: 'Welcome to your isolated CRM nErgy AI company dashboard!',
      type: 'success',
    });
    navigate('/crm/dashboard');
  };

  return (
    <Card className="p-8 text-center" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div className="flex flex-col items-center gap-3 mb-6">
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--success-light)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem',
            border: '2px solid var(--success-border)',
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <Badge variant="success" icon={Sparkles}>
          Workspace Ready
        </Badge>

        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Company Onboarding Complete!</h1>

        <p className="text-sm text-secondary margin-0" style={{ maxWidth: '460px' }}>
          Your isolated multi-tenant company workspace is provisioned with 256-bit encryption and role-based access control.
        </p>
      </div>

      {/* Summary Breakdown Card */}
      <div className="surface-secondary p-4 rounded-md border-subtle flex flex-col gap-3 text-left mb-6 text-xs">
        <div className="flex items-center justify-between border-b border-subtle pb-2">
          <span className="flex items-center gap-2 font-semibold text-primary">
            <Building2 size={16} className="text-primary" /> Company Entity
          </span>
          <span className="font-bold text-primary">{companyData.companyName || 'nErgy Enterprise Logistics'}</span>
        </div>

        <div className="flex items-center justify-between border-b border-subtle pb-2">
          <span className="flex items-center gap-2 font-semibold text-primary">
            <ShieldCheck size={16} className="text-success" /> Tenant Vault ID
          </span>
          <code className="font-mono font-bold text-success">{user.tenantId || 'TNT-99201'}</code>
        </div>

        <div className="flex items-center justify-between border-b border-subtle pb-2">
          <span className="flex items-center gap-2 font-semibold text-primary">
            <User size={16} className="text-info" /> Primary Company Admin
          </span>
          <span className="text-secondary">{user.name} ({user.email})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold text-primary">
            <Users size={16} className="text-warning" /> Invited Team Members
          </span>
          <Badge variant="primary">{invitedEmployees.length} Members Invited</Badge>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        icon={LayoutDashboard}
        onClick={handleGoDashboard}
        className="w-full"
      >
        Go to CRM Dashboard
      </Button>
    </Card>
  );
};
