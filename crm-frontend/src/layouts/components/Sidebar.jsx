import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';
import { crmNavigation, oalNavigation } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { getFilteredNavigation, getRoleConfig } from '../../utils/rbac';

export const Sidebar = ({
  isCollapsed = false,
  product = 'crm',
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, crmUser, oalUser } = useAuth();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const currentUser = product === 'crm' ? crmUser : oalUser;
  const roleConfig = getRoleConfig(currentUser, product);
  const rawNavItems = product === 'crm' ? crmNavigation : oalNavigation;

  // Filter items permitted for the active role
  const permittedNavItems = getFilteredNavigation(rawNavItems, product, currentUser);

  // Group filtered items by section
  const groupedSections = permittedNavItems.reduce((acc, item) => {
    const sec = item.section || 'General';
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  const handleLogout = () => {
    logout(product);
    addToast({
      title: 'Logged Out',
      message: `Signed out of ${product === 'crm' ? 'CRM nErgy AI' : 'OAL Network'}.`,
      type: 'info',
    });
    if (onCloseMobile) onCloseMobile();
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  return (
    <aside
      style={{
        width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        transition: 'width var(--transition-normal)',
        overflow: 'hidden',
        zIndex: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Navigation Scrollable Body */}
      <div className="flex flex-col gap-4 p-3" style={{ overflowY: 'auto', flex: 1 }}>
        {Object.entries(groupedSections).map(([sectionTitle, items]) => (
          <div key={sectionTitle} className="flex flex-col gap-1">
            {!isCollapsed && (
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-tertiary)',
                  padding: '0.5rem 0.5rem 0.25rem 0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {t(sectionTitle)}
              </div>
            )}

            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/crm/dashboard' && item.path !== '/oal/borrower/dashboard' && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onCloseMobile}
                  title={isCollapsed ? t(item.label) : undefined}
                  style={({ isActive: isLinkActive }) => {
                    const currentActive = isLinkActive || isActive;
                    return {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: isCollapsed ? '0.65rem 0' : '0.65rem 0.95rem',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      borderRadius: '14px',
                      fontSize: '13px',
                      fontWeight: currentActive ? 700 : 500,
                      color: currentActive ? '#ffffff' : 'var(--text-secondary, #475569)',
                      background: currentActive
                        ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 30%, #ec4899 70%, #f97316 100%)'
                        : 'transparent',
                      boxShadow: currentActive
                        ? '0 8px 20px -4px rgba(124, 58, 237, 0.45), 0 4px 12px -2px rgba(249, 115, 22, 0.35)'
                        : 'none',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginBottom: '2px',
                    };
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive && location.pathname !== item.path) {
                      e.currentTarget.style.color = '#6366f1';
                      e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.08)';
                      const iconEl = e.currentTarget.querySelector('svg');
                      if (iconEl) iconEl.style.color = '#6366f1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && location.pathname !== item.path) {
                      e.currentTarget.style.color = 'var(--text-secondary, #475569)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                      const iconEl = e.currentTarget.querySelector('svg');
                      if (iconEl) iconEl.style.color = '#64748b';
                    }
                  }}
                >
                  <Icon
                    size={18}
                    className="flex-shrink-0"
                    style={{
                      color: (isActive || location.pathname === item.path) ? '#ffffff' : '#64748b',
                      transition: 'color 200ms ease',
                    }}
                  />
                  {!isCollapsed && <span>{t(item.label)}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer — SIGN OUT */}
      <div
        style={{
          padding: isCollapsed ? '0.75rem 0.35rem' : '0.75rem 0.85rem',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--surface-secondary, rgba(248, 250, 252, 0.6))',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 cursor-pointer transition-all"
          style={{
            backgroundColor: 'transparent',
            color: '#ef4444',
            borderRadius: '10px',
            border: '1px solid transparent',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            minHeight: '36px',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.color = '#ef4444';
          }}
          title={isCollapsed ? t(`Sign Out (${product.toUpperCase()})`) : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" style={{ color: '#ef4444' }} />
          {!isCollapsed && <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{t(`Sign Out (${product.toUpperCase()})`)}</span>}
        </button>
      </div>
    </aside>
  );
};
