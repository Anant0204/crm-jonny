import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { cx } from '../../utils/classNames';
import { useLanguage } from '../../context/LanguageContext';

export const KPICard = ({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  changePeriod = '',
  icon: Icon,
  iconBg = 'rgba(99, 102, 241, 0.12)',
  iconColor = '#6366f1',
  isLoading = false,
  className = '',
  onClick,
  tooltip = '',
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div
        className={cx('kpi-card', className)}
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '1.1rem 1.25rem',
        }}
      >
        <Skeleton width="45%" height="11px" />
        <Skeleton width="60%" height="28px" style={{ margin: '8px 0' }} />
        <Skeleton width="50%" height="12px" />
      </div>
    );
  }

  const TrendIcon = changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : Minus;

  return (
    <div
      onClick={onClick}
      title={tooltip || (onClick ? `Click to view ${title}` : undefined)}
      className={cx('kpi-card group', className)}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.1rem 1.25rem',
        minHeight: '142px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-card)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        boxSizing: 'border-box',
        minWidth: 0,
        width: '100%',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = iconColor || 'var(--primary-border)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Decorative Top Accent Strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${iconColor || 'var(--primary)'} 0%, transparent 100%)`,
          opacity: 0.85,
        }}
      />

      {/* Header Row: Title on Left, Icon on Right */}
      <div className="flex items-center justify-between gap-2 min-w-0" style={{ paddingTop: '2px' }}>
        <span
          className="truncate"
          style={{
            fontSize: '11px',
            fontWeight: 750,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t ? t(title) : title}
        </span>

        {Icon && (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              backgroundColor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 2px 8px -2px ${iconBg}`,
            }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div
        className="truncate kpi-value"
        style={{
          fontSize: '1.65rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          fontVariantNumeric: 'tabular-nums',
          margin: '4px 0 2px 0',
        }}
      >
        {value}
      </div>

      {/* Contextual Growth Pill Line */}
      {(change || changePeriod) && (
        <div className="flex items-center gap-1.5 text-xs flex-wrap min-w-0" style={{ marginTop: 'auto', paddingTop: '0.25rem' }}>
          {change && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: '2.5px 8px',
                borderRadius: '9999px',
                backgroundColor:
                  changeType === 'negative'
                    ? 'rgba(239, 68, 68, 0.12)'
                    : changeType === 'positive'
                    ? 'rgba(16, 185, 129, 0.12)'
                    : 'rgba(100, 116, 139, 0.12)',
                color:
                  changeType === 'negative'
                    ? 'var(--error)'
                    : changeType === 'positive'
                    ? 'var(--success)'
                    : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                border: `1px solid ${
                  changeType === 'negative'
                    ? 'rgba(239, 68, 68, 0.2)'
                    : changeType === 'positive'
                    ? 'rgba(16, 185, 129, 0.2)'
                    : 'rgba(100, 116, 139, 0.2)'
                }`,
              }}
            >
              <TrendIcon size={11} />
              {change}
            </span>
          )}
          {changePeriod && (
            <span className="truncate" style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {t ? t(changePeriod) : changePeriod}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
