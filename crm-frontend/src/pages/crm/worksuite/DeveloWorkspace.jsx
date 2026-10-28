import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Building2,
  Layers,
  ShieldAlert,
} from 'lucide-react';
import { getWorksuiteSsoTicket, launchWorksuiteApp } from '../../../services/worksuiteSso';

const MODULE_ROUTE_MAP = {
  // Admin routes
  'dashboard': '/app/admin/dashboard',
  'leads': '/app/admin/leads',
  'clients': '/app/admin/clients',
  'projects': '/app/admin/projects',
  'tasks': '/app/admin/tasks',
  'invoices': '/app/admin/invoices',
  'estimates': '/app/admin/estimates',
  'payments': '/app/admin/payments',
  'contracts': '/app/admin/contracts',
  'attendance': '/app/admin/attendance',
  'reports': '/app/admin/reports',

  // Super Admin routes
  'superadmin-dashboard': '/app/superadmin/dashboard',
  'companies': '/app/superadmin/companies',
  'packages': '/app/superadmin/packages',
  'billing': '/app/superadmin/billing',
  'offline-requests': '/app/superadmin/offline-requests',
  'support-tickets': '/app/superadmin/support-tickets',
  'superadmin-settings': '/app/superadmin/settings',

  // Employee routes
  'employee-dashboard': '/app/employee/dashboard',
  'my-tasks': '/app/employee/my-tasks',
  'my-projects': '/app/employee/my-projects',
  'time-tracking': '/app/employee/time-tracking',
  'leaves': '/app/employee/leave-requests',
  'calendar': '/app/employee/calendar',
  'tickets': '/app/employee/tickets',

  // Client routes
  'client-dashboard': '/app/client/dashboard',
  'client-projects': '/app/client/projects',
  'client-proposals': '/app/client/proposals',
  'client-invoices': '/app/client/invoices',
  'client-contracts': '/app/client/contracts',
  'client-store': '/app/client/store',
  'client-tickets': '/app/client/tickets',
};

export const DeveloWorkspace = () => {
  const { module = 'dashboard' } = useParams();
  const location = useLocation();
  const { crmUser } = useAuth();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState(null);
  const [ticketError, setTicketError] = useState(null);
  const [hasAuthedSession, setHasAuthedSession] = useState(false);

  // Derive active module robustly from location pathname or params
  const currentModule = useMemo(() => {
    const parts = location.pathname.split('/crm/worksuite/');
    if (parts.length > 1 && parts[1]) {
      return parts[1].split('/')[0].split('?')[0];
    }
    return module || 'dashboard';
  }, [location.pathname, module]);

  // Determine target path in Develo CRM
  const targetSubpath = useMemo(() => {
    // If exact module matches in dictionary
    if (MODULE_ROUTE_MAP[currentModule]) {
      return MODULE_ROUTE_MAP[currentModule];
    }
    // Fallback based on user role
    const roleStr = (crmUser?.role || crmUser?.id || '').toLowerCase();
    if (roleStr.includes('super')) return '/app/superadmin/dashboard';
    if (roleStr.includes('customer') || roleStr.includes('client')) return '/app/client/dashboard';
    if (roleStr.includes('creator') || roleStr.includes('builder') || roleStr.includes('hr')) return '/app/employee/dashboard';
    return '/app/admin/dashboard';
  }, [currentModule, crmUser]);

  // Request a cryptographic SSO ticket from CRM - Energy backend
  useEffect(() => {
    let isCancelled = false;
    const fetchSsoTicket = async () => {
      setIsLoading(true);
      setTicketError(null);
      const ssoTicket = await getWorksuiteSsoTicket();
      if (!isCancelled) {
        if (ssoTicket) {
          setTicket(ssoTicket);
        } else {
          setTicketError('Unable to generate secure SSO ticket with CRM - Energy. Ensure you are signed in.');
        }
        setIsLoading(false);
      }
    };
    fetchSsoTicket();
    return () => {
      isCancelled = true;
    };
  }, [iframeKey]);

  // Construct iframe URL:
  // - Initial handshake uses /sso-login with the single-use cryptographic ticket
  // - Subsequent sidebar sub-navigation loads the target module directly without reusing spent tickets
  const iframeSrc = useMemo(() => {
    const activeTheme = isDark ? 'dark' : 'light';
    if (!hasAuthedSession) {
      if (!ticket) return '';
      return `http://localhost:5174/sso-login?ticket=${encodeURIComponent(ticket)}&embedded=true&theme=${activeTheme}&redirect=${encodeURIComponent(targetSubpath)}`;
    }
    return `http://localhost:5174${targetSubpath}?embedded=true&theme=${activeTheme}`;
  }, [hasAuthedSession, ticket, targetSubpath, isDark]);

  // Format module title for header
  const titleFormatted = useMemo(() => {
    const titleMap = {
      'dashboard': 'Executive Dashboard',
      'leads': 'Leads & Inbound',
      'clients': 'Clients Directory',
      'projects': 'Projects Management',
      'tasks': 'Tasks & Boards',
      'invoices': 'Invoices & Billing',
      'estimates': 'Proposals & Estimates',
      'payments': 'Payments & Revenue',
      'contracts': 'Legal Contracts',
      'attendance': 'HR & Attendance',
      'reports': 'Reports & Analytics',
      'superadmin-dashboard': 'SuperAdmin Dashboard',
      'companies': 'Companies Directory',
      'packages': 'Company Packages',
      'billing': 'Billing & Plans',
      'offline-requests': 'Offline Requests',
      'support-tickets': 'Support Tickets',
      'superadmin-settings': 'System Settings',
      'employee-dashboard': 'Employee Dashboard',
      'my-tasks': 'My Tasks',
      'my-projects': 'My Projects',
      'time-tracking': 'Time Tracking',
      'leaves': 'Leave Requests',
      'calendar': 'Team Calendar',
      'tickets': 'Support Tickets',
      'client-dashboard': 'Client Dashboard',
      'client-projects': 'Client Projects',
      'client-proposals': 'Client Proposals',
      'client-invoices': 'Client Invoices',
      'client-contracts': 'Client Contracts',
      'client-store': 'Order Store',
      'client-tickets': 'Client Tickets',
    };
    if (titleMap[currentModule]) return titleMap[currentModule];
    return currentModule
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [currentModule]);

  const handleReload = () => {
    setIsLoading(true);
    setHasAuthedSession(false);
    setTicket(null);
    setIframeKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    launchWorksuiteApp(targetSubpath);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isFullscreen ? '100vh' : 'calc(100vh - 75px)',
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        right: isFullscreen ? 0 : 'auto',
        bottom: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 99999 : 1,
        backgroundColor: isDark ? '#090d16' : '#f8fafc',
        overflow: 'hidden',
      }}
    >
      {/* Cockpit Navigation Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 18px',
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
          boxShadow: isDark ? '0 2px 6px rgba(0, 0, 0, 0.35)' : '0 1px 3px rgba(0, 0, 0, 0.04)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              color: '#ffffff',
              boxShadow: '0 2px 6px rgba(99, 102, 241, 0.35)',
            }}
          >
            <Layers size={18} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', letterSpacing: '-0.01em' }}>
                Develo CRM
              </span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>/</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#818cf8' : '#4f46e5' }}>
                {titleFormatted}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: isDark ? '#34d399' : '#059669',
                  backgroundColor: isDark ? 'rgba(52, 211, 153, 0.12)' : '#ecfdf5',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  border: isDark ? '1px solid rgba(52, 211, 153, 0.25)' : '1px solid #a7f3d0',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isDark ? '#10b981' : '#059669',
                  }}
                />
                Live Synced
              </span>
            </div>
            <div style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#64748b' }}>
              Connected as {crmUser?.name || 'Administrator'} ({crmUser?.role || 'Business Owner'})
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleReload}
            title="Refresh View"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              color: isDark ? '#cbd5e1' : '#475569',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
              borderRadius: '7px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
            <span className="hidden-mobile">Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Cockpit'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              color: isDark ? '#cbd5e1' : '#475569',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
              borderRadius: '7px',
              cursor: 'pointer',
            }}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span className="hidden-mobile">{isFullscreen ? 'Minimize' : 'Expand'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenExternal}
            title="Open in Separate Tab"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(79, 70, 229, 0.35)',
            }}
          >
            <ExternalLink size={13} />
            <span>Open in Tab</span>
          </button>
        </div>
      </div>

      {/* Embedded Iframe Viewport */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0f172a',
              zIndex: 10,
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTopColor: '#38bdf8',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
              Connecting Develo CRM Workspace...
            </span>
          </div>
        )}

        {ticketError && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDark ? '#0f172a' : '#f8fafc',
              zIndex: 20,
              gap: '12px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <ShieldAlert size={42} style={{ color: '#f43f5e' }} />
            <h3 style={{ color: isDark ? '#f8fafc' : '#0f172a', margin: 0, fontSize: '16px', fontWeight: 700 }}>
              Secure SSO Handshake Required
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '13px', maxWidth: '420px', margin: 0 }}>
              {ticketError}
            </p>
            <button
              onClick={handleReload}
              style={{
                marginTop: '6px',
                padding: '8px 16px',
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px',
              }}
            >
              Retry Secure Connection
            </button>
          </div>
        )}

        {iframeSrc && !ticketError && (
          <iframe
            key={iframeKey}
            src={iframeSrc}
            title={`Develo CRM - ${titleFormatted}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
            onLoad={() => {
              setIsLoading(false);
              setHasAuthedSession(true);
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}
      </div>
    </div>
  );
};

export default DeveloWorkspace;
