import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  User,
  LogOut,
  ChevronRight,
  Sparkles,
  Search,
  ShieldCheck,
  Building2,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../../components/common/LanguageToggle';
import { crmNavigation, oalNavigation } from '../../data/mockData';
import { getFilteredNavigation } from '../../utils/rbac';

export const CrmMobileAppDrawer = ({ isOpen, onClose, product = 'crm', onOpenSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crmUser, oalUser, logout } = useAuth();
  const { addToast } = useToast();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const currentUser = product === 'crm' ? crmUser : oalUser;
  const rawNavItems = product === 'crm' ? crmNavigation : oalNavigation;
  const permittedNavItems = getFilteredNavigation(rawNavItems, product, currentUser);

  // Group navigation items by section
  const groupedSections = permittedNavItems.reduce((acc, item) => {
    const sec = item.section || 'General';
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout(product);
    addToast({
      title: t('Logged Out'),
      message: `${t('Sign Out (' + product.toUpperCase() + ')')}.`,
      type: 'info',
    });
    onClose();
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  const handleSwitchRole = () => {
    onClose();
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  const displayName = currentUser?.name || currentUser?.role || 'Executive User';
  const displayRole = currentUser?.role || (product === 'crm' ? 'Business Owner' : 'Borrower');
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '85%',
          maxWidth: '320px',
          height: '100%',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '10px 0 35px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          animation: 'drawerSlideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes drawerSlideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Top Profile Banner */}
        <div
          style={{
            padding: '16px 14px',
            backgroundColor: 'var(--surface-secondary)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)',
                }}
              >
                {initial}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {displayName}
                </div>
                <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>
                  {t(displayRole)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close Drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Language Selector inside Drawer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Language / Idioma:
            </span>
            <LanguageToggle />
          </div>

          {/* Quick Search Bar Trigger */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={14} color="#38bdf8" />
                <span>{t('Search...')}</span>
              </div>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  backgroundColor: 'var(--surface-secondary)',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  color: 'var(--text-tertiary)',
                }}
              >
                ⌘K
              </span>
            </button>
          )}
        </div>

        {/* Scrollable Navigation Groups */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '14px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {Object.entries(groupedSections).map(([sectionTitle, items]) => (
            <div key={sectionTitle} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: 'var(--text-tertiary)',
                  padding: '4px 10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {t(sectionTitle)}
              </div>

              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/crm/dashboard' &&
                    item.path !== '/oal/borrower/dashboard' &&
                    location.pathname.startsWith(item.path));

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleLinkClick(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                      color: isActive ? '#38bdf8' : 'var(--text-primary)',
                      fontWeight: isActive ? 800 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={17} color={isActive ? '#38bdf8' : 'var(--text-secondary)'} />
                      <span>{t(item.label)}</span>
                    </div>

                    {item.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--surface-secondary)',
                          color: '#38bdf8',
                          fontWeight: 700,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Drawer Footer Actions (Switch Role & Logout) */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface-secondary)',
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={handleSwitchRole}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <User size={14} color="#38bdf8" />
            <span>Switch Role</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <LogOut size={14} />
            <span>{t(`Log Out (${product.toUpperCase()})`)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrmMobileAppDrawer;
