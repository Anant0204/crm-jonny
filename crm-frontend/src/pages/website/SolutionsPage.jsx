import React from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { CRM_SOLUTIONS_DATA } from '../../data/websiteNavData';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Layers,
  Bot
} from 'lucide-react';

export const SolutionsPage = () => {
  const navigate = useNavigate();
  const { onOpenSales, onOpenZunme, onSelectItem } = useOutletContext() || {};
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
            <span style={{ color: '#0284c7', fontWeight: 700 }}>{isEs ? 'Soluciones CRM' : 'CRM Solutions'}</span>
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

      {/* Hero Header with Custom Solutions Strategic Architecture Background */}
      <section style={{
        position: 'relative',
        padding: '3.5rem 1.25rem 2.5rem 1.25rem',
        backgroundImage: 'var(--web-hero-overlay), url("/bg-solutions.jpg")',
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
            color: '#0284c7',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: 'rgba(2, 132, 199, 0.1)',
            padding: '4px 14px',
            borderRadius: '16px',
            border: '1px solid rgba(2, 132, 199, 0.25)'
          }}>
            {t('Strategic Business Alignment')}
          </span>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            {t('CRM Solutions (4 Solution Groups)')}
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: 0
          }}>
            {t('Structured frameworks addressing 4 Types of CRM Software, Business CRM Software, Solutions for Entrepreneurs, and Third Party Integration. Explore each solution group below for tailored implementations.')}
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '8px',
                background: '#0284c7',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={14} />
              <span>{t('Contact Sales Team')}</span>
            </button>
            <button
              type="button"
              onClick={onOpenZunme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Bot size={14} />
              <span>{isEs ? 'Consultar con Zunme VA' : 'Ask Zunme VA'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{
        padding: '3rem clamp(1rem, 3vw, 1.25rem) 4.5rem clamp(1rem, 3vw, 1.25rem)',
        maxWidth: '1380px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* White Label Banner */}
        <div className="website-whitelabel-box" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#0284c7',
              letterSpacing: '0.06em'
            }}>
              {t('White Label Enterprise Opportunity')}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)' }}>
              {t('“Make AI Your Bestie”')}
            </span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.1rem, 2.2vw, 19px)', fontWeight: 800, color: 'var(--web-text-main)', margin: 0, lineHeight: 1.3 }}>
            {t('Build & Promote Your Brand with the White Label CRM or ERP Software')}
          </h3>

          <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '1080px' }}>
            {t('CRM nErgy White Label CRM or ERP software includes customizable branding, client portals, sales and marketing automation, project management tools and much more. These platforms help businesses create new revenue streams by reselling the CRM solution under their own brand.')}
          </p>

          <div className="website-whitelabel-bottom">
            <button
              type="button"
              onClick={() => navigate('/solutions/business-crm')}
              style={{
                background: 'none',
                border: 'none',
                color: '#0284c7',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textAlign: 'left'
              }}
            >
              <span>{t('READ MORE >> continue on the Business CRM Page')}</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '7px',
                background: '#0284c7',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>{t('Contact Us')}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* 4 Solutions Groups Mega Grid */}
        <div className="solutions-mega-grid">
          {CRM_SOLUTIONS_DATA.map((group, idx) => {
            const badge = (isEs && group.badgeEs) ? group.badgeEs : t(group.badge);
            const groupTitle = (isEs && group.groupTitleEs) ? group.groupTitleEs : t(group.groupTitle);
            const subtitle = (isEs && group.subtitleEs) ? group.subtitleEs : t(group.subtitle);

            return (
              <div
                key={idx}
                style={{
                  background: 'var(--web-surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--web-border)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ borderBottom: '1px solid var(--web-border)', paddingBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#0284c7',
                    letterSpacing: '0.06em'
                  }}>
                    {badge}
                  </span>
                  <h3
                    onClick={() => {
                      if (group.route) navigate(group.route);
                    }}
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: 'var(--web-text-main)',
                      margin: '2px 0 0 0',
                      cursor: group.route ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{groupTitle}</span>
                    {group.route && <ArrowRight size={14} style={{ color: '#0284c7' }} />}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: 'var(--web-text-muted)' }}>{subtitle}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const itemName = (isEs && item.nameEs) ? item.nameEs : t(item.name);
                    const itemDesc = (isEs && item.descEs) ? item.descEs : t(item.desc);

                    return (
                      <div
                        key={item.id}
                        className="dolibarr-card"
                        style={{ padding: '0.75rem' }}
                        onClick={() => {
                          if (item.route) {
                            navigate(item.route);
                          } else if (group.route) {
                            navigate(group.route);
                          } else {
                            navigate('/solutions/business-crm');
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '7px',
                            background: 'rgba(2, 132, 199, 0.1)',
                            color: '#0284c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Icon size={15} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                            {itemName}
                          </span>
                        </div>
                        <span className="dolibarr-desc">{itemDesc}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '11px', color: '#0284c7', fontWeight: 700 }}>
                          <span>{isEs ? 'Ver Detalles' : 'View Details'}</span>
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default SolutionsPage;
