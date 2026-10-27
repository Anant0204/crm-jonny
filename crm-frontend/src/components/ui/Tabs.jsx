import React from 'react';
import { cx } from '../../utils/classNames';

export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={cx('tabs-header', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cx('tab-btn', isActive && 'tab-btn-active')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: '0.5rem',
              cursor: 'pointer',
            }}
          >
            {Icon && (
              <Icon
                size={16}
                className="flex-shrink-0"
                style={{ color: isActive ? '#1d4ed8' : 'var(--text-secondary)' }}
              />
            )}
            <span style={{ fontSize: '13px' }}>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? 'rgba(29, 78, 216, 0.1)' : 'var(--surface-secondary)',
                  color: isActive ? '#1d4ed8' : 'var(--text-secondary)',
                  marginLeft: '2px',
                  lineHeight: 1,
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
