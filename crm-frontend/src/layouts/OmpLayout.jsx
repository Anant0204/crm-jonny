import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2,
  Inbox,
  PhoneCall,
  Calculator,
  Landmark,
  FileSignature,
  TrendingUp,
  Receipt,
  Wallet,
  ShieldCheck,
  Smartphone,
  ChevronDown,
  Sparkles,
  Store,
  Layers,
  CheckCircle2,
  Activity,
  Car,
  ShieldAlert,
  ShoppingBag,
  RefreshCw,
  Target,
  Camera,
  Wrench,
  Share2,
  Globe,
  X
} from 'lucide-react';
import { Topbar } from './components/Topbar';
import { Drawer } from '../components/ui/Drawer';
import { ToastContainer } from '../components/ui/Toast';
import { useResponsive } from '../hooks/useResponsive';

export const OmpLayout = () => {
  const { isMobile, isTablet } = useResponsive();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isTablet);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileDrawerOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  const stores = [
    { id: 'all', name: '🏢 All Locations (Consolidated)', city: 'National Umbrella', activeUnits: 142 },
    { id: 'dallas', name: '📍 Dallas Central Motors', city: 'Dallas, TX', activeUnits: 58 },
    { id: 'houston', name: '📍 Houston North Auto Mall', city: 'Houston, TX', activeUnits: 49 },
    { id: 'austin', name: '📍 Austin West Dealership', city: 'Austin, TX', activeUnits: 35 },
  ];

  const currentStoreObj = stores.find((s) => s.id === selectedStore) || stores[0];

  const navGroups = [
    {
      group: 'Marketplace & Verified Dealers',
      items: [
        { path: '/omp/marketplace', label: 'OfferUp Marketplace', icon: ShoppingBag, tag: 'B2C/B2B' },
        { path: '/omp/verified-dealer', label: 'Verified Dealer Hub', icon: ShieldCheck, tag: 'ADP' },
        { path: '/omp/verify', label: 'Dealer Onboarding', icon: CheckCircle2, tag: '4-Step' },
        { path: '/omp/feed-sync', label: 'DMS Feed Sync', icon: RefreshCw, tag: 'Auto' },
        { path: '/omp/top-leads', label: 'AI Top Lead Radar', icon: Target, badge: 'AI Hot' },
      ],
    },
    {
      group: 'Stock The Lot & Recon',
      items: [
        { path: '/omp/vin-scanner', label: 'VIN Scanner & Bookout', icon: Camera, tag: 'Optical' },
        { path: '/omp/market-pricing', label: 'AI RealPrice™ Matrix', icon: TrendingUp, tag: 'Matrix' },
        { path: '/omp/title-search', label: 'NMVTIS Title & Lien', icon: FileSignature, tag: '50-State' },
        { path: '/omp/recon-center', label: 'Recon & Repair ROM', icon: Wrench, tag: 'Cost' },
        { path: '/omp/photo-genius', label: 'PhotoGenius AI Media', icon: Sparkles, tag: '3D Walk' },
        { path: '/omp/postmaster', label: 'AI Postmaster Social', icon: Share2, tag: 'Syndicate' },
        { path: '/omp/web-builder', label: 'Dealer WebBuilder', icon: Globe, tag: 'Instant' },
      ],
    },
    {
      group: 'Desking & Sales CRM',
      items: [
        { path: '/omp/desking/calculator', label: '60s Deal Calculator', icon: Calculator, tag: '4-Square' },
        { path: '/omp/crm/inbox', label: 'Unified Omnichannel Inbox', icon: Inbox, badge: '5' },
        { path: '/omp/crm/ai-receptionist', label: '24/7 AI Receptionist', icon: PhoneCall, tag: 'Voice AI' },
        { path: '/omp/financing/lenders', label: 'Auto Loans Marketplace', icon: Landmark, tag: 'OAL' },
        { path: '/omp/deals/e-sign', label: 'Digital E-Sign Jackets', icon: FileSignature, tag: 'Legal' },
      ],
    },
    {
      group: 'In-House BHPH & Profit',
      items: [
        { path: '/omp/bhph/suite', label: 'BHPH Collections Suite', icon: Wallet, badge: '$14k' },
        { path: '/omp/finance/roi', label: 'ROI Profit Dashboard', icon: TrendingUp, tag: 'Gross' },
        { path: '/omp/finance/costs', label: 'Receipt & Cost Ledger', icon: Receipt, tag: 'VIN Cost' },
      ],
    },
    {
      group: 'Executive & Multi-Store',
      items: [
        { path: '/omp/executive/central-office', label: 'Central Office Umbrella', icon: Building2, tag: 'Franchise' },
        { path: '/omp/executive/permissions', label: 'Team Roles & RBAC', icon: ShieldAlert, tag: 'Security' },
        { path: '/omp/mobile', label: 'Smartphone Lot App', icon: Smartphone, tag: 'Field App' },
      ],
    },
  ];

  const renderSidebarLinks = (closeDrawerOnNavigate = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem 0' }}>
      {navGroups.map((group, gIdx) => (
        <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {(!isSidebarCollapsed || closeDrawerOnNavigate) && (
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', fontWeight: 700, padding: '0 0.5rem 0.25rem 0.5rem' }}>
              {group.group}
            </div>
          )}
          {group.items.map((item, iIdx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={iIdx}
                to={item.path}
                onClick={() => {
                  if (closeDrawerOnNavigate) setIsMobileDrawerOpen(false);
                }}
                title={isSidebarCollapsed && !closeDrawerOnNavigate ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSidebarCollapsed && !closeDrawerOnNavigate ? 'center' : 'space-between',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? 'var(--primary-subtle, rgba(2, 132, 199, 0.1))' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  borderLeft: (!isSidebarCollapsed || closeDrawerOnNavigate) && isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--background)';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <Icon size={17} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
                  {(!isSidebarCollapsed || closeDrawerOnNavigate) && <span>{item.label}</span>}
                </div>
                {(!isSidebarCollapsed || closeDrawerOnNavigate) && item.badge && (
                  <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
                {(!isSidebarCollapsed || closeDrawerOnNavigate) && item.tag && !item.badge && (
                  <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '4px', backgroundColor: 'var(--background)', color: 'var(--text-tertiary)', border: '1px solid var(--border)' }}>
                    {item.tag}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      ))}

      {/* Lot Stats Mini Summary */}
      {(!isSidebarCollapsed || closeDrawerOnNavigate) && (
        <div style={{ marginTop: 'auto', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            <span>Store Inventory</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{currentStoreObj.activeUnits} Cars</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            <span>MTD Profit</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>+$128.4k</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        height: '100vh',
        maxHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Exact Same Topbar as CRM nErgy AI (Same Logo, Same User, Same Search & Controls) */}
      <Topbar onToggleSidebar={handleToggleSidebar} product="crm" />

      {/* Responsive Sub-Header Bar with Store Switcher & Module Ticker */}
      <div
        style={{
          minHeight: '46px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0.4rem 0.75rem' : '0 1.25rem',
          flexShrink: 0,
          zIndex: 15,
          flexWrap: 'wrap',
          gap: '0.5rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: isMobile ? '0.75rem' : '0.82rem', fontWeight: 700, color: 'var(--primary)' }}>
            <Car size={16} />
            <span>OMP DEALS</span>
          </div>
          <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem', borderRadius: '9999px', backgroundColor: 'var(--primary-subtle, rgba(2, 132, 199, 0.1))', color: 'var(--primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>
            ⚡ OfferUp DMS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Store Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
            <Store size={13} color="var(--primary)" />
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.74rem', fontWeight: 600, outline: 'none', cursor: 'pointer', maxWidth: isMobile ? '130px' : '220px' }}
            >
              {stores.map((s) => (
                <option key={s.id} value={s.id} style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}>
                  {s.name} ({s.activeUnits})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => navigate('/crm/dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              padding: '0.25rem 0.55rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Layers size={12} /> {isMobile ? 'CRM' : 'Back to CRM'}
          </button>
        </div>
      </div>

      {/* Main Body Shell */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          height: 'calc(100vh - var(--topbar-height) - 46px)',
          maxHeight: 'calc(100vh - var(--topbar-height) - 46px)',
        }}
      >
        {/* Desktop / Tablet Left Sidebar */}
        {!isMobile && (
          <aside
            style={{
              width: isSidebarCollapsed ? '72px' : '260px',
              backgroundColor: 'var(--surface)',
              borderRight: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              padding: '0.85rem 0.6rem',
              flexShrink: 0,
              transition: 'width 0.2s ease',
            }}
          >
            {renderSidebarLinks(false)}
          </aside>
        )}

        {/* Mobile Slide-Out Drawer Navigation */}
        {isMobile && (
          <Drawer
            isOpen={isMobileDrawerOpen}
            onClose={() => setIsMobileDrawerOpen(false)}
            position="left"
            width="280px"
            title="OMP Deals Menu"
          >
            {renderSidebarLinks(true)}
          </Drawer>
        )}

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: 'var(--background)',
            padding: isMobile ? '0.875rem' : '1.5rem',
            boxSizing: 'border-box',
          }}
        >
          <Outlet context={{ selectedStore, currentStoreObj }} />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

