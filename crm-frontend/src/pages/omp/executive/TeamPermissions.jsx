import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Lock,
  Unlock,
  Plus,
  Save,
  Check,
  AlertCircle,
  Eye,
  DollarSign,
  FileText,
  UserCheck
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const TeamPermissions = () => {
  const [selectedRole, setSelectedRole] = useState('sales_rep');

  const roles = [
    { id: 'owner', name: 'Dealer Principal / Owner', usersCount: 2, level: 'Super Admin' },
    { id: 'gm', name: 'General Manager (GM)', usersCount: 4, level: 'Executive' },
    { id: 'finance_mgr', name: 'Finance / F&I Manager', usersCount: 6, level: 'Financial Admin' },
    { id: 'sales_rep', name: 'Sales Representative', usersCount: 18, level: 'Standard User' },
    { id: 'guest', name: 'Guest / Trainee', usersCount: 3, level: 'Restricted' },
  ];

  const [permissions, setPermissions] = useState({
    // Inventory & Costing
    view_inventory: { name: 'View Lot Inventory & Specs', sales_rep: true, gm: true, finance_mgr: true, guest: true, owner: true },
    view_true_cost: { name: 'View True Cost & Repair Invoices (ACV)', sales_rep: false, gm: true, finance_mgr: true, guest: false, owner: true },
    edit_inventory_price: { name: 'Modify Lot Listing & Sticker Price', sales_rep: false, gm: true, finance_mgr: false, guest: false, owner: true },
    
    // Desking & Financing
    access_deal_calculator: { name: 'Access 60-Second Deal Desking Tool', sales_rep: true, gm: true, finance_mgr: true, guest: true, owner: true },
    override_rate_markup: { name: 'Override Bank Interest Markup / APR Spread', sales_rep: false, gm: true, finance_mgr: true, guest: false, owner: true },
    approve_bhph_loans: { name: 'Approve In-House BHPH Credit Terms', sales_rep: false, gm: true, finance_mgr: true, guest: false, owner: true },
    submit_lender_app: { name: 'Submit Credit Apps to OAL Loan Marketplace', sales_rep: true, gm: true, finance_mgr: true, guest: false, owner: true },

    // E-Sign & Legal
    execute_esign_deals: { name: 'Execute Digital E-Sign Contract Jackets', sales_rep: false, gm: true, finance_mgr: true, guest: false, owner: true },
    export_deal_audit: { name: 'Export SHA-256 Deal Audit Trails', sales_rep: false, gm: true, finance_mgr: true, guest: false, owner: true },

    // Financial Reports & Central Office
    view_roi_dashboard: { name: 'View Real-Time ROI Profit Dashboard', sales_rep: false, gm: true, finance_mgr: true, guest: false, owner: true },
    central_office_admin: { name: 'Switch Franchise Branches & Central Office', sales_rep: false, gm: false, finance_mgr: false, guest: false, owner: true },
    manage_team_roles: { name: 'Manage Team Roles & User Permissions', sales_rep: false, gm: true, finance_mgr: false, guest: false, owner: true },
  });

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [selectedRole]: !prev[key][selectedRole],
      },
    }));
  };

  const handleSave = () => {
    toast.success('Security matrix updated for ' + roles.find(r => r.id === selectedRole)?.name);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.1))', color: 'var(--primary)', border: '1px solid var(--border)' }}>
              TASK E-19 • PILLAR 4
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Multi-User Security & Granular RBAC</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Team Roles & Permissions Matrix
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Enforce role-based access control (RBAC) across sales reps, finance managers, and store GMs to protect true vehicle costs and deal margins.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleSave}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <Save size={16} /> Save Security Profile
          </button>
        </div>
      </div>

      {/* Roles Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {roles.map((r) => {
          const isSelected = selectedRole === r.id;
          return (
            <div
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              style={{
                backgroundColor: isSelected ? 'var(--primary-subtle, rgba(56, 189, 248, 0.12))' : 'var(--surface)',
                border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                borderRadius: '10px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: isSelected ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {r.level}
                </span>
                <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--background)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                  {r.usersCount} Users
                </span>
              </div>
              <div style={{ fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-primary)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                {r.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Table for Selected Role */}
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-secondary)' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Configuring Permissions for: <span style={{ color: 'var(--primary)' }}>{roles.find(r => r.id === selectedRole)?.name}</span>
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
              Click on any permission toggle to enable or disable access in real-time.
            </p>
          </div>
        </div>

        <div style={{ padding: '0.5rem 1.25rem' }}>
          {Object.entries(permissions).map(([key, item]) => {
            const hasAccess = item[selectedRole];
            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: hasAccess ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: hasAccess ? '#10b981' : '#ef4444',
                    }}
                  >
                    {hasAccess ? <Unlock size={16} /> : <Lock size={16} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Permission Key: <code>{key}</code></div>
                  </div>
                </div>

                <button
                  onClick={() => togglePermission(key)}
                  style={{
                    backgroundColor: hasAccess ? 'rgba(16, 185, 129, 0.15)' : 'var(--background)',
                    color: hasAccess ? '#10b981' : 'var(--text-secondary)',
                    border: hasAccess ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    minWidth: '100px',
                    justifyContent: 'center',
                  }}
                >
                  {hasAccess ? <Check size={14} /> : null}
                  {hasAccess ? 'ALLOWED' : 'DENIED'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPermissions;
