import React from 'react';
import sphereLogo from '../../assets/crm_nergy_ai_sphere.png';

/**
 * CRM nErgy AI Official Quantum Synapse 3D Energy Sphere Logo
 * Renders the exact original Concept 1 3D Energy Sphere with zero background box (100% transparent PNG).
 */
export const CrmLogo = ({ size = 36, className = '', style = {} }) => {
  return (
    <img
      src={sphereLogo}
      alt="CRM nErgy AI"
      width={size}
      height={size}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        flexShrink: 0,
        display: 'inline-block',
        verticalAlign: 'middle',
        filter: 'drop-shadow(0 2px 10px rgba(56, 189, 248, 0.35))',
        ...style,
      }}
    />
  );
};

export default CrmLogo;
