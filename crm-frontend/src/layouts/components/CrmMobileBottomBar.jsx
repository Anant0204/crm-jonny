import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  Sparkles,
  Lock,
  Menu,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CrmMobileBottomBar = ({ onOpenDrawer, product = 'crm' }) => {
  const location = useLocation();
  const { t } = useLanguage();

  const isCrm = product === 'crm';

  const tabs = [
    {
      path: isCrm ? '/crm/dashboard' : '/oal/borrower/dashboard',
      label: t('Dashboard'),
      icon: LayoutDashboard,
    },
    {
      path: isCrm ? '/crm/leads' : '/oal/borrower/application',
      label: isCrm ? t('Leads Directory') : t('Loan Application'),
      icon: Target,
    },
    {
      path: '/crm/ai-studio',
      label: t('AI Content Studio'),
      icon: Sparkles,
      isAction: true,
    },
    {
      path: '/crm/ebox',
      label: t('Secured zBox (SEA)'),
      icon: Lock,
      badge: 'SEA',
    },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 90,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.25)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path);

        if (tab.isAction) {
          return (
            <NavLink
              key={idx}
              to={tab.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                position: 'relative',
                top: '-14px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 18px rgba(6, 182, 212, 0.5), 0 0 10px rgba(59, 130, 246, 0.4)',
                  border: '3px solid var(--surface)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <Sparkles size={24} strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 900,
                  color: '#38bdf8',
                  marginTop: '2px',
                  letterSpacing: '0.02em',
                }}
              >
                AI Studio
              </span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={idx}
            to={tab.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              textDecoration: 'none',
              color: isActive ? '#38bdf8' : 'var(--text-secondary)',
              position: 'relative',
              padding: '6px 10px',
              maxWidth: '80px',
            }}
          >
            <Icon size={19} color={isActive ? '#38bdf8' : 'var(--text-secondary)'} />
            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? 800 : 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '75px',
                textAlign: 'center',
              }}
            >
              {tab.label}
            </span>

            {tab.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '6px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  fontSize: '8.5px',
                  fontWeight: 900,
                  padding: '1px 4px',
                  borderRadius: '6px',
                }}
              >
                {tab.badge}
              </span>
            )}
          </NavLink>
        );
      })}

      {/* 5th Tab: All Tools Drawer Trigger */}
      <button
        type="button"
        onClick={onOpenDrawer}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '6px 10px',
        }}
        aria-label="Open Navigation Drawer"
      >
        <Menu size={20} />
        <span style={{ fontSize: '10px', fontWeight: 600 }}>
          {t('Menu', 'Menu')}
        </span>
      </button>
    </nav>
  );
};

export default CrmMobileBottomBar;
