import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MessageSquare, LogIn } from 'lucide-react';
import { AiEnergyLogo } from '../common/AiEnergyLogo';
import { useLanguage } from '../../context/LanguageContext';
import { getLoginUrl } from '../../config/portalConfig';

export const WebsiteFooter = ({ onOpenZunme, onOpenSales, onOpenSignup }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleAnchor = (hash) => {
    if (window.location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer style={{
      backgroundColor: 'var(--web-surface)',
      borderTop: '1px solid var(--web-border)',
      padding: '3.5rem clamp(1.25rem, 3.5vw, 2.5rem) 2rem clamp(1.25rem, 3.5vw, 2.5rem)',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Top Section: Brand & Executive Access */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--web-border)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AiEnergyLogo size={32} showText={false} />
              <span style={{ fontSize: '19px', fontWeight: 900, color: 'var(--web-text-main)', letterSpacing: '-0.02em' }}>
                CRM nErgy AI
              </span>
              <span style={{
                fontSize: '10.5px',
                fontWeight: 700,
                color: '#4f46e5',
                background: 'rgba(79, 70, 229, 0.08)',
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid rgba(79, 70, 229, 0.2)'
              }}>
                {t('Enterprise Platform')}
              </span>
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.55, margin: 0 }}>
              {t('The unified AI-driven Enterprise Operating System combining complete CRM, ERP, Accounting, Supply Chain, and ZUNME AI Studio. “Make AI Your Bestie”.')}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--web-text-muted)', marginTop: '2px' }}>
              <ShieldCheck size={16} style={{ color: '#10b981' }} />
              <span>{t('SHA-256 Vault Encryption • 99.99% Enterprise Uptime')}</span>
            </div>
          </div>

          <div className="website-footer-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '8px',
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                color: 'var(--web-text-main)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={14} style={{ color: '#0284c7' }} />
              <span>{t('SALES — chat zBox')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#0f2b5c',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '9px 18px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogIn size={14} />
              <span>{t('Customer & Executive Login')}</span>
            </button>
          </div>
        </div>

        {/* 4 Client-Specified Columns Exactly Matching Reference */}
        <div className="website-footer-columns">
          {/* Column 1: Help Center */}
          <div className="website-footer-col">
            <span style={{
              fontSize: '14px',
              fontWeight: 800,
              color: 'var(--web-text-main)',
              letterSpacing: '-0.01em',
              marginBottom: '6px'
            }}>
              {t('Help Center')}
            </span>
            <a href="#faqs" onClick={(e) => { e.preventDefault(); handleAnchor('#faqs'); }} style={linkStyle}>{t('Knowledge Base')}</a>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Academy')}</button>
            <a href="#faqs" onClick={(e) => { e.preventDefault(); handleAnchor('#faqs'); }} style={linkStyle}>{t('FAQs')}</a>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Support')}</button>
            <div style={{ margin: '0 0 2px 0' }}>
              <span style={{
                fontSize: '12.5px',
                color: 'var(--web-text-muted)'
              }}>
                {t('(Available now)')}
              </span>
            </div>
            <a href="#features" onClick={(e) => { e.preventDefault(); handleAnchor('#features'); }} style={linkStyle}>{t('Resources')}</a>
            <button type="button" onClick={onOpenZunme} style={btnLinkStyle}>
              {t('Virtual Assistant')}
            </button>
            <a href="/solutions/contact-ai" onClick={(e) => { e.preventDefault(); navigate('/solutions/contact-ai'); }} style={linkStyle}>{t('Contact Center AI')}</a>
          </div>

          {/* Column 2: Check It Out */}
          <div className="website-footer-col">
            <span style={{
              fontSize: '14px',
              fontWeight: 800,
              color: 'var(--web-text-main)',
              letterSpacing: '-0.01em',
              marginBottom: '6px'
            }}>
              {t('Check It Out')}
            </span>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('CRM nErgy Training')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Case studies')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Commission calculator')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Videos')}</button>
            <a href="/solutions/business-crm" onClick={(e) => { e.preventDefault(); navigate('/solutions/business-crm'); }} style={linkStyle}>{t('What’s White Label?')}</a>
            <a href="/solutions/business-crm" onClick={(e) => { e.preventDefault(); navigate('/solutions/business-crm'); }} style={linkStyle}>{t('What is a CRM?')}</a>
            <a href="/solutions/business-crm" onClick={(e) => { e.preventDefault(); navigate('/solutions/business-crm'); }} style={linkStyle}>{t('What is an ERP?')}</a>
            <a href="/solutions/business-crm" onClick={(e) => { e.preventDefault(); navigate('/solutions/business-crm'); }} style={linkStyle}>{t('What is an ERP – CRM?')}</a>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('CRM nErgy Events')}</button>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleAnchor('#about'); }} style={linkStyle}>{t('Reviews')}</a>
            <a href="#industries" onClick={(e) => { e.preventDefault(); handleAnchor('#industries'); }} style={linkStyle}>{t('Industries')}</a>
          </div>

          {/* Column 3: Business Solutions */}
          <div className="website-footer-col">
            <span style={{
              fontSize: '14px',
              fontWeight: 800,
              color: '#dc2626',
              letterSpacing: '-0.01em',
              marginBottom: '6px'
            }}>
              {t('Business Solutions')}
            </span>
            <a href="/solutions/business-crm" onClick={(e) => { e.preventDefault(); navigate('/solutions/business-crm'); }} style={linkStyle}>{t('4 Types of CRMs')}</a>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('AAI - Sales More')}</button>
            <button type="button" onClick={onOpenZunme} style={btnLinkStyle}>{t('Marketing Genius')}</button>
            <a href="/features/manufacturing" onClick={(e) => { e.preventDefault(); navigate('/features/manufacturing'); }} style={linkStyle}>{t('Manufacturing')}</a>
            <a href="/solutions/startups" onClick={(e) => { e.preventDefault(); navigate('/solutions/startups'); }} style={linkStyle}>{t('Generating Leads')}</a>
            <a href="/features/inventory-management" onClick={(e) => { e.preventDefault(); navigate('/features/inventory-management'); }} style={linkStyle}>{t('Inventory Management')}</a>
            <a href="/solutions/influencers" onClick={(e) => { e.preventDefault(); navigate('/solutions/influencers'); }} style={linkStyle}>{t('SM / Influencer Management')}</a>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Best Sales Commission')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Affiliate Marketing')}</button>
            <a href="/solutions/business-crm" onClick={(e) => { e.preventDefault(); navigate('/solutions/business-crm'); }} style={linkStyle}>{t('White Label Software')}</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); handleAnchor('#features'); }} style={linkStyle}>{t('Features')}</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleAnchor('#about'); }} style={linkStyle}>{t('Privacy and security')}</a>
            <a href="/solutions/business-crm" onClick={(e) => { e.preventDefault(); navigate('/solutions/business-crm'); }} style={linkStyle}>{t('Third Party Integration')}</a>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('API')}</button>
          </div>

          {/* Column 4: CRM nErgy */}
          <div className="website-footer-col">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '3px 8px',
              borderRadius: '3px',
              background: '#05070d',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'fit-content',
              marginBottom: '6px'
            }}>
              <span style={{ fontSize: '13.5px', fontWeight: 900, color: '#f59e0b', letterSpacing: '0.04em' }}>CRM</span>
              <span style={{ fontSize: '13.5px', fontWeight: 900, color: '#ef4444', letterSpacing: '0.04em', marginLeft: '3px' }}>n</span>
              <span style={{ fontSize: '13.5px', fontWeight: 900, color: '#06b6d4', letterSpacing: '0.04em' }}>Ergy</span>
            </div>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleAnchor('#about'); }} style={linkStyle}>{t('Company')}</a>
            <a href="#erp-showcase" onClick={(e) => { e.preventDefault(); handleAnchor('#erp-showcase'); }} style={linkStyle}>{t('Products')}</a>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Affiliate Partners')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Referral program')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Jobs')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Blog')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Pricing')}</button>
            <button type="button" onClick={onOpenSales} style={btnLinkStyle}>{t('Contact')}</button>
          </div>
        </div>

        {/* Bottom row: Copyright & Legal */}
        <div style={{
          borderTop: '1px solid var(--web-border)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: 'var(--web-text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} CRM nErgy AI & ZUNME AI SuperHouse. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => handleAnchor('#about')}>{t('Privacy Policy')}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleAnchor('#about')}>{t('Terms of Service')}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleAnchor('#about')}>{t('Security Architecture')}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleAnchor('#solutions')}>{t('Third Party Integration')}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => handleAnchor('#solutions')}>{t('API')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

const linkStyle = {
  fontSize: '13px',
  color: 'var(--web-text-muted)',
  textDecoration: 'none',
  lineHeight: 1.5,
  transition: 'color 0.15s ease',
  cursor: 'pointer'
};

const btnLinkStyle = {
  background: 'none',
  border: 'none',
  textAlign: 'left',
  padding: 0,
  fontSize: '13px',
  color: 'var(--web-text-muted)',
  cursor: 'pointer',
  lineHeight: 1.5,
  transition: 'color 0.15s ease'
};

