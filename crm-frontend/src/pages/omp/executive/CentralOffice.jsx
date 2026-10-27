import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Building2,
  Store,
  TrendingUp,
  Car,
  DollarSign,
  Key,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Users,
  BarChart3,
  Activity,
  X,
  FileCheck,
  Download,
  Calendar,
  Sparkles
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';
import apiClient from '../../../services/apiClient';

export const CentralOffice = () => {
  const { selectedStore, currentStoreObj } = useOutletContext() || { selectedStore: 'all', currentStoreObj: { name: 'All Locations' } };
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchOmpDeals = async () => {
      try {
        await apiClient.get('/deals');
      } catch (_) {}
    };
    fetchOmpDeals();
  }, []);
  
  // Modals state
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditedStore, setAuditedStore] = useState(null);

  // New Store Form State
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCity, setNewStoreCity] = useState('');
  const [newStoreManager, setNewStoreManager] = useState('');
  const [newStoreUnits, setNewStoreUnits] = useState(40);
  const [newStoreTier, setNewStoreTier] = useState('Franchise Location Tier');

  const [branches, setBranches] = useState([
    {
      id: 'dallas',
      name: 'Dallas Central Motors',
      city: 'Dallas, TX',
      manager: 'Marcus Vance',
      licenseStatus: 'Active (Expires Oct 2027)',
      activeUnits: 58,
      soldMtd: 24,
      grossProfit: '$74,200',
      status: 'Healthy',
      turnoverDays: '22 Days',
      auditScore: '98/100 (Clean)',
      compliance: 'Fully Compliant with Texas DMV',
    },
    {
      id: 'houston',
      name: 'Houston North Auto Mall',
      city: 'Houston, TX',
      manager: 'Elena Rostova',
      licenseStatus: 'Active (Expires Nov 2027)',
      activeUnits: 49,
      soldMtd: 19,
      grossProfit: '$58,650',
      status: 'Healthy',
      turnoverDays: '26 Days',
      auditScore: '95/100 (Clean)',
      compliance: 'Fully Compliant with Texas DMV',
    },
    {
      id: 'austin',
      name: 'Austin West Dealership',
      city: 'Austin, TX',
      manager: 'James Sterling',
      licenseStatus: 'Renewal in 14 Days',
      activeUnits: 35,
      soldMtd: 14,
      grossProfit: '$39,800',
      status: 'Warning',
      turnoverDays: '31 Days',
      auditScore: '82/100 (Attention Needed)',
      compliance: 'State License Renewal Required by Oct 01',
    },
  ]);

  // Dynamic calculations based on live branches state
  const totalInventory = branches.reduce((sum, b) => sum + Number(b.activeUnits), 0);
  const totalSold = branches.reduce((sum, b) => sum + Number(b.soldMtd), 0);
  const allocatedLicenses = branches.length;

  // Filtered branches list
  const filteredBranches = branches.filter((b) => {
    if (selectedFilter === 'active') return b.status === 'Healthy';
    if (selectedFilter === 'audit') return b.status === 'Warning';
    return true; // 'all'
  });

  // Provision Store Handler
  const handleProvisionStore = (e) => {
    e.preventDefault();
    if (!newStoreName.trim() || !newStoreCity.trim()) {
      toast.error('Please enter store name and city/state');
      return;
    }

    const newBranchObj = {
      id: newStoreName.toLowerCase().replace(/\s+/g, '-'),
      name: newStoreName,
      city: newStoreCity,
      manager: newStoreManager || 'Store Manager Designated',
      licenseStatus: 'Active (Provisioned Today)',
      activeUnits: Number(newStoreUnits) || 30,
      soldMtd: 0,
      grossProfit: '$0',
      status: 'Healthy',
      turnoverDays: '1 Day',
      auditScore: '100/100 (New Provision)',
      compliance: 'New License Provisioned & Seeded',
    };

    setBranches([...branches, newBranchObj]);
    setIsProvisionModalOpen(false);
    setNewStoreName('');
    setNewStoreCity('');
    setNewStoreManager('');
    toast.success(`Store "${newBranchObj.name}" provisioned under Master Umbrella.`);
  };

  // Open Audit Modal Handler
  const handleOpenAudit = (store) => {
    setAuditedStore(store);
    setIsAuditModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '100%' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.1))', color: 'var(--primary)', border: '1px solid var(--border)' }}>
              TASK E-01 • PILLAR 4
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Umbrella Franchise Parent Management</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            OMP Executive Central Office
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Central headquarters control to manage multiple dealership franchise locations, license provisioning, and consolidated group P&L.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
          <button
            onClick={() => setIsProvisionModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--primary)', color: 'var(--text-on-primary, #fff)', border: 'none', padding: '0.55rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <Plus size={16} /> Provision New Store Location
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>Total Group Inventory</span>
            <Car size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            {totalInventory} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Vehicles</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            <ArrowUpRight size={14} /> Across {branches.length} Franchise Locations
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>Consolidated Gross MTD</span>
            <DollarSign size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '0.5rem' }}>
            $172,650
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            <ArrowUpRight size={14} /> Average $3,028 Gross / Unit
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>Total Units Sold MTD</span>
            <TrendingUp size={18} color="#a855f7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            {totalSold} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Cars Delivered</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            <Activity size={14} /> 74% Finance / 26% Cash
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500 }}>
            <span>Active Store Licenses</span>
            <Key size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            {allocatedLicenses} / 5 <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Allocated</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b', fontSize: '0.75rem', marginTop: '0.35rem' }}>
            <AlertTriangle size={14} /> 1 Store Renewal in 14 Days
          </div>
        </div>
      </div>

      {/* Multi-Location Performance Table */}
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Dealership Locations under Master Umbrella ({filteredBranches.length} Stores Shown)
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
              Real-time branch telemetry, license tiering, and individual profit breakdown
            </p>
          </div>
          
          {/* Interactive Filters */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { id: 'all', label: 'All Stores' },
              { id: 'active', label: 'Active Only' },
              { id: 'audit', label: 'Audit Risk' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                style={{
                  backgroundColor: selectedFilter === f.id ? 'var(--primary-subtle, rgba(56, 189, 248, 0.15))' : 'var(--background)',
                  color: selectedFilter === f.id ? 'var(--primary)' : 'var(--text-secondary)',
                  border: selectedFilter === f.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Location Name & City</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>General Manager</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Lot Inventory</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Sold MTD</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Gross Profit</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Turn Days</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>License Status</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.15s' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{b.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{b.city}</div>
                  </td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>{b.manager}</td>
                  <td style={{ padding: '1rem 1rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{b.activeUnits} Units</span>
                  </td>
                  <td style={{ padding: '1rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{b.soldMtd} cars</td>
                  <td style={{ padding: '1rem 1rem', fontWeight: 700, color: '#10b981' }}>{b.grossProfit}</td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>{b.turnoverDays}</td>
                  <td style={{ padding: '1rem 1rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: b.status === 'Healthy' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                        color: b.status === 'Healthy' ? '#10b981' : '#f59e0b',
                        border: b.status === 'Healthy' ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
                      }}
                    >
                      {b.status === 'Healthy' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      {b.licenseStatus}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenAudit(b)}
                      style={{ backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.12))', color: 'var(--primary)', border: '1px solid var(--border)', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}
                    >
                      Audit Store
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🚀 MODAL 1: PROVISION NEW STORE LOCATION DIALOG */}
      {/* ========================================================================= */}
      {isProvisionModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', width: '100%', maxWidth: '520px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-secondary)' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  🏢 Provision New Store Location
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Add new dealership franchise branch under master umbrella</span>
              </div>
              <button
                onClick={() => setIsProvisionModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProvisionStore} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Dealership Location Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., San Antonio South Motors"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    City & State *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., San Antonio, TX"
                    value={newStoreCity}
                    onChange={(e) => setNewStoreCity(e.target.value)}
                    style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    General Manager
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., David Martinez"
                    value={newStoreManager}
                    onChange={(e) => setNewStoreManager(e.target.value)}
                    style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Initial Lot Units
                  </label>
                  <input
                    type="number"
                    value={newStoreUnits}
                    onChange={(e) => setNewStoreUnits(e.target.value)}
                    style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    License Tier
                  </label>
                  <select
                    value={newStoreTier}
                    onChange={(e) => setNewStoreTier(e.target.value)}
                    style={{ width: '100%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.6rem', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none' }}
                  >
                    <option value="Franchise Location Tier">Franchise Location Tier</option>
                    <option value="Independent Dealer Tier">Independent Dealer Tier</option>
                    <option value="Mega Mall Enterprise Tier">Mega Mall Enterprise Tier</option>
                  </select>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.08))', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--primary)' }}>License Provisioning Note:</strong> This will generate a dedicated DMS token and allocate 1 license from your corporate umbrella quota (Available: {5 - allocatedLicenses} remaining).
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsProvisionModalOpen(false)}
                  style={{ backgroundColor: 'var(--background)', color: 'var(--text-secondary)', border: '1px solid var(--border)', padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--text-on-primary, #fff)', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                >
                  Provision Store & Issue License
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🔍 MODAL 2: AUDIT STORE COMPLIANCE & TELEMETRY */}
      {/* ========================================================================= */}
      {isAuditModalOpen && auditedStore && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', width: '100%', maxWidth: '580px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-secondary)' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Branch Compliance & Telemetry</div>
                <h3 style={{ margin: '0.15rem 0 0 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {auditedStore.name} ({auditedStore.city})
                </h3>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Score & Status Highlight */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--background)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Audit Compliance Score</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: auditedStore.status === 'Healthy' ? '#10b981' : '#f59e0b', marginTop: '0.2rem' }}>
                    {auditedStore.auditScore}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Inventory Health</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {auditedStore.activeUnits} Units ({auditedStore.turnoverDays} Avg Turn)
                  </div>
                </div>
              </div>

              {/* Checklist Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: 'var(--surface-secondary)', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>DMV Dealer License:</span>
                  <span style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle size={14} /> {auditedStore.licenseStatus}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: 'var(--surface-secondary)', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>DMS Auto Feed Sync:</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Active (Last Sync 4 mins ago)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: 'var(--surface-secondary)', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Gross Margin Realization:</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{auditedStore.grossProfit} MTD</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: 'var(--surface-secondary)', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>General Manager:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{auditedStore.manager}</span>
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    toast.success(`Full Audit Report PDF downloaded for ${auditedStore.name}`);
                  }}
                  style={{ flex: 1, backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.15))', color: 'var(--primary)', border: '1px solid var(--border)', padding: '0.65rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <Download size={15} /> Download Full Audit PDF
                </button>
                <button
                  onClick={() => {
                    toast.success(`License key renewed for ${auditedStore.name} (+1 Year Extended)`);
                    setIsAuditModalOpen(false);
                  }}
                  style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'var(--text-on-primary, #fff)', border: 'none', padding: '0.65rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <Key size={15} /> Renew License Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralOffice;
