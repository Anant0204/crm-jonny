import React from 'react';
import { ShieldCheck } from 'lucide-react';

/**
 * ADP Verified Badge Component
 * Official verification credential for OMP Deals Auto Dealers
 * Supported Tiers:
 *  - 'small' : Independent / Local Used Dealership
 *  - 'franchise' : Brand / Multi-Location Dealership
 *  - 'large' : Enterprise Auto Group / Conglomerate
 *
 * Sizes: 'sm' | 'md' | 'lg'
 */
export const AdpVerifiedBadge = ({
  tier = 'franchise',
  size = 'md',
  showTierLabel = true,
  className = '',
  interactive = true,
}) => {
  const tierConfig = {
    small: {
      label: 'Independent Dealer',
      badgeColor: '#10b981', // emerald
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.15) 100%)',
      border: '1px solid rgba(16, 185, 129, 0.4)',
      glow: '0 0 14px rgba(16, 185, 129, 0.25)',
      tierCode: 'ADP-IND',
    },
    franchise: {
      label: 'Franchise Partner',
      badgeColor: '#0ea5e9', // sky blue
      gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(2, 132, 199, 0.15) 100%)',
      border: '1px solid rgba(14, 165, 233, 0.4)',
      glow: '0 0 16px rgba(14, 165, 233, 0.3)',
      tierCode: 'ADP-FRAN',
    },
    large: {
      label: 'Enterprise Auto Group',
      badgeColor: '#8b5cf6', // purple / violet
      gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(109, 40, 217, 0.18) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.45)',
      glow: '0 0 18px rgba(139, 92, 246, 0.35)',
      tierCode: 'ADP-ENT',
    },
  };

  const current = tierConfig[tier] || tierConfig.franchise;

  const sizeConfig = {
    sm: {
      padding: '3px 8px',
      fontSize: '11px',
      iconSize: 13,
      gap: '5px',
      tierFontSize: '9px',
    },
    md: {
      padding: '5px 12px',
      fontSize: '12.5px',
      iconSize: 16,
      gap: '7px',
      tierFontSize: '10.5px',
    },
    lg: {
      padding: '8px 18px',
      fontSize: '14.5px',
      iconSize: 20,
      gap: '9px',
      tierFontSize: '12px',
    },
  };

  const s = sizeConfig[size] || sizeConfig.md;

  return (
    <div
      className={`inline-flex items-center select-none font-semibold ${className}`}
      title="OMP Deals Official Verified Dealer • State DMV & Identity Checked"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: current.gradient,
        border: current.border,
        boxShadow: current.glow,
        borderRadius: '9999px',
        padding: s.padding,
        gap: s.gap,
        color: '#ffffff',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        letterSpacing: '0.02em',
        transition: 'all 0.2s ease',
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: current.badgeColor,
        }}
      >
        <ShieldCheck size={s.iconSize} strokeWidth={2.5} />
      </span>

      <span
        style={{
          fontSize: s.fontSize,
          fontWeight: 700,
          color: '#ffffff',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        <span style={{ color: current.badgeColor }}>&#123;</span>
        <span>ADP Verified</span>
        <span style={{ color: current.badgeColor }}>&#125;</span>
      </span>

      {showTierLabel && (
        <span
          style={{
            fontSize: s.tierFontSize,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '1px 6px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {current.label}
        </span>
      )}
    </div>
  );
};

export default AdpVerifiedBadge;
