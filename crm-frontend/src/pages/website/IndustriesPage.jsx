import React from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INDUSTRIES_DATA } from '../../data/websiteNavData';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ArrowLeft,
  Building2,
  Globe
} from 'lucide-react';

export const IndustriesPage = () => {
  const navigate = useNavigate();
  const { onOpenSales } = useOutletContext() || {};
  const { language, t } = useLanguage();
  const isEs = language === 'ES';

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Breadcrumb Navigation Bar */}
      <section style={{
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)',
        padding: '0.875rem 1.25rem'
      }}>
        <div className="website-breadcrumb-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--web-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('Home')}</Link>
            <span>/</span>
            <span style={{ color: '#10b981', fontWeight: 700 }}>{isEs ? 'Industrias' : 'Industries'}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: 'var(--web-text-muted)',
              fontSize: '12.5px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={14} />
            <span>{isEs ? 'Volver al Inicio' : 'Back to Home'}</span>
          </button>
        </div>
      </section>

      {/* Hero Header with Custom Global Industries Landscape Background */}
      <section style={{
        position: 'relative',
        padding: '3.5rem 1.25rem 2.5rem 1.25rem',
        backgroundImage: 'var(--web-hero-overlay), url("/bg-industries.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderBottom: '1px solid var(--web-border)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#10b981',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '4px 14px',
            borderRadius: '16px',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}>
            {t('Domain-Specific Solutions')}
          </span>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            {t('Industries Using the CRM nErgy Software (23 Sectors)')}
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: 0
          }}>
            {t('Some of the Industries that use the CRM nErgy Software. CRM software is essential for various industries to manage customer relationships and enhance operational efficiency. Click any industry card below to view its full dedicated page.')}
          </p>

          <button
            type="button"
            onClick={onOpenSales}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 20px',
              borderRadius: '8px',
              background: '#10b981',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
            }}
          >
            <MessageSquare size={14} />
            <span>{t('Inquire for Your Industry')}</span>
          </button>
        </div>
      </section>

      {/* 23 Industries Mega Grid Section */}
      <section className="website-section-container" style={{ paddingTop: '2.5rem', paddingBottom: '4.5rem' }}>
        <div className="industries-mega-grid">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = ind.icon;
            const indTitle = (isEs && ind.nameEs) ? ind.nameEs : t(ind.name);
            const indDesc = (isEs && ind.descEs) ? ind.descEs : t(ind.desc);

            return (
              <div
                key={ind.id}
                className="dolibarr-card"
                onClick={() => {
                  if (ind.route) {
                    navigate(ind.route);
                  } else {
                    navigate(`/industries/${ind.id}`);
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div className="dolibarr-icon-box" style={{
                    width: '38px',
                    height: '38px',
                    marginBottom: 0,
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}>
                    <Icon size={18} />
                  </div>
                  <span className="dolibarr-title" style={{ margin: 0, fontSize: '15px' }}>{indTitle}</span>
                </div>
                <span className="dolibarr-desc">{indDesc}</span>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#10b981'
                }}>
                  <span>{isEs ? 'Ver Página de Industria' : 'Explore Industry Page'}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default IndustriesPage;
