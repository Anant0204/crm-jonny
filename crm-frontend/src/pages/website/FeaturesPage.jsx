import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { CRM_FEATURES_DATA } from '../../data/websiteNavData';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Move,
  LayoutDashboard,
  CheckCircle2,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const FeaturesPage = () => {
  const navigate = useNavigate();
  const { onOpenSales, onSelectItem } = useOutletContext() || {};
  const { language, t } = useLanguage();
  const isEs = language === 'ES';

  // Features filter tab
  const [featureCategory, setFeatureCategory] = useState('All');
  const featureCategories = [
    'All',
    'Core CRM',
    'ERP & Logistics',
    'Finance & Operations',
    'Sales & Growth',
    'Marketing & Web',
    'HR & Talent',
    'Governance & Security'
  ];

  const categoryMap = {
    'All': isEs ? 'Todo' : 'All',
    'Core CRM': isEs ? 'CRM Principal' : 'Core CRM',
    'ERP & Logistics': isEs ? 'ERP y Logística' : 'ERP & Logistics',
    'Finance & Operations': isEs ? 'Finanzas y Operaciones' : 'Finance & Operations',
    'Sales & Growth': isEs ? 'Ventas y Crecimiento' : 'Sales & Growth',
    'Marketing & Web': isEs ? 'Marketing y Web' : 'Marketing & Web',
    'HR & Talent': isEs ? 'RR.HH. y Talento' : 'HR & Talent',
    'Governance & Security': isEs ? 'Gobernanza y Seguridad' : 'Governance & Security'
  };

  const filteredFeatures = featureCategory === 'All'
    ? CRM_FEATURES_DATA
    : CRM_FEATURES_DATA.filter((f) => f.category === featureCategory);

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
            <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{isEs ? 'Características CRM' : 'CRM Features'}</span>
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

      {/* Hero Header with Custom AI Features Background */}
      <section style={{
        position: 'relative',
        padding: '3.5rem 1.25rem 2.5rem 1.25rem',
        backgroundImage: 'var(--web-hero-overlay), url("/bg-features.jpg")',
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
            color: '#c4b5fd',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: 'rgba(139, 92, 246, 0.12)',
            padding: '4px 14px',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.25)'
          }}>
            {t('CRM Solutions Every Business Needs')}
          </span>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            {t('CRM NERGY Software Features (23 Modules)')}
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: 0
          }}>
            {t('CRM software is essential for various industries to manage customer relationships and enhance operational efficiency. Click any feature card below to open its comprehensive dedicated module details.')}
          </p>

          {/* Category Filter Pills */}
          <div className="website-filter-pills" style={{ marginTop: '0.5rem' }}>
            {featureCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFeatureCategory(cat)}
                className={`website-filter-pill-btn ${featureCategory === cat ? 'active' : ''}`}
              >
                {categoryMap[cat] || t(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 23 Cards Grid Section */}
      <section className="website-section-container" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        <div className="features-mega-grid">
          {filteredFeatures.map((f) => {
            const Icon = f.icon;
            const title = (isEs && f.nameEs) ? f.nameEs : t(f.name);
            const desc = (isEs && f.descEs) ? f.descEs : t(f.desc);
            const tag = (isEs && f.tagEs) ? f.tagEs : t(f.tag);

            return (
              <div
                key={f.id}
                className="dolibarr-card"
                onClick={() => {
                  if (f.route) {
                    navigate(f.route);
                  } else {
                    navigate(`/features/${f.id}`);
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div className="dolibarr-icon-box">
                    <Icon size={20} />
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    background: 'var(--web-surface-subtle)',
                    color: '#8b5cf6',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid var(--web-border)'
                  }}>
                    {tag}
                  </span>
                </div>
                <span className="dolibarr-title">{title}</span>
                <span className="dolibarr-desc">{desc}</span>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#22d3ee'
                }}>
                  <span>{isEs ? 'Ver Detalle del Módulo' : 'View Module Details'}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Branding and Customization Banner */}
      <section style={{
        padding: '0 clamp(1rem, 3vw, 1.25rem) 3.5rem clamp(1rem, 3vw, 1.25rem)',
        maxWidth: '1380px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div className="website-branding-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#4f46e5',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: 'rgba(79, 70, 229, 0.1)',
              padding: '3px 10px',
              borderRadius: '20px'
            }}>
              {t('Branding and Customization')}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>
              {t('“Make AI Your Bestie”')}
            </span>
          </div>

          <h3 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
            fontWeight: 800,
            color: 'var(--web-text-main)',
            margin: 0,
            lineHeight: 1.3
          }}>
            {t('It’s Your Business, Displaying Your Brand, powered by CRM nErgy Software Customization')}
          </h3>

          <p style={{
            fontSize: '14px',
            color: 'var(--web-text-muted)',
            lineHeight: 1.65,
            margin: 0,
            maxWidth: '1020px'
          }}>
            {t('The CRM nErgy drag-and-drop feature in customizable CRM software greatly enhances usability and efficiency, enabling users to customize their systems according to their specific business processes without requiring any coding skills. This functionality is crucial for contemporary CRM solutions, rendering them more flexible and user-friendly.')}
          </p>

          <div className="website-branding-bottom">
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)' }}>
              CRM NERGY — {t('“Make AI Your Bestie”')}
            </span>

            <div className="website-branding-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => navigate('/features/white-label-crm')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: 'var(--web-surface)',
                  border: '1px solid var(--web-border)',
                  color: 'var(--web-text-main)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <span>{t('White Label Customization')}</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={onOpenSales}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                }}
              >
                <MessageSquare size={14} />
                <span>{t('Contact Us')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customizable Dashboards & Drag-and-Drop Matrix */}
      <section id="customizable-dashboards" className="website-section-container" style={{ paddingTop: '0', paddingBottom: '4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 24, 43, 0.95) 0%, rgba(10, 16, 32, 0.95) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.28)',
          borderRadius: '20px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 0 24px rgba(139, 92, 246, 0.06)'
        }}>
          {/* Header & Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#4f46e5',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(79, 70, 229, 0.1)',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                {isEs ? 'Tableros Personalizables' : 'Customizable Dashboards'}
              </span>
              <span style={{
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#0284c7',
                background: 'rgba(2, 132, 199, 0.1)',
                padding: '4px 10px',
                borderRadius: '20px'
              }}>
                {isEs ? '[ Interfaz Arrastrar y Soltar ]' : '[ Drag-and-Drop Interface ]'}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>
                {isEs ? '“Haz de la IA Tu Mejor Amigo”' : '“Make AI Your Bestie”'}
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--web-text-main)',
              margin: 0,
              lineHeight: 1.25
            }}>
              {isEs
                ? 'Tableros Personalizables con Interfaz Drag-and-Drop'
                : 'Customizable Dashboards [ Drag-and-Drop Interface ]'}
            </h2>

            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 15.5px)',
              color: 'var(--web-text-muted)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '980px'
            }}>
              {isEs
                ? 'CRM fácil de navegar, una interfaz limpia y optimizada para el usuario que le permite acceder rápidamente a las funciones que necesita sin perderse en menús complejos.'
                : 'Easy to navigate CRM, a clean and streamlined user friendly interface that allows users to quickly access the features they need without getting lost in complex menus.'}
            </p>
          </div>

          {/* Q&A Callout Box */}
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '16px',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              fontWeight: 800,
              color: 'var(--web-text-main)',
              margin: 0,
              lineHeight: 1.3
            }}>
              {isEs
                ? '¿Cómo mejoran los tableros personalizables la experiencia del usuario de CRM?'
                : 'How do customizable dashboards enhance CRM user experience?'}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              <div style={{
                background: 'var(--web-surface-subtle)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid var(--web-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Move size={16} style={{ color: '#4f46e5' }} />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--web-text-main)' }}>
                    {isEs ? 'Mínimos Clics y Simplicidad' : 'Minimal Clicks & Intuitive Design'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {isEs
                    ? 'Las funciones de CRM de fácil navegación cuentan con una interfaz de arrastrar y soltar (Drag-and-Drop), lo que permite a los usuarios organizar y gestionar fácilmente contactos, tareas y embudos de ventas con el mínimo de clics.'
                    : 'Easy navigational CRM features Drag-and-Drop interface, which allows users to easily organize and manage contacts, tasks, and sales pipelines with minimal clicks.'}
                </p>
              </div>

              <div style={{
                background: 'var(--web-surface-subtle)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid var(--web-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LayoutDashboard size={16} style={{ color: '#06b6d4' }} />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--web-text-main)' }}>
                    {isEs ? 'Enfoque en Roles y KPIs Relevantes' : 'Role Tailoring & Key Metrics'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {isEs
                    ? 'Los tableros personalizables mejoran la experiencia del usuario de CRM al permitirles adaptar la interfaz a sus roles y responsabilidades específicos, presentando solo la información más relevante.'
                    : 'Customizable dashboards enhance CRM user experience by allowing users to tailor the interface to their specific roles and responsibilities, presenting only the most relevant information.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)' }}>
              CRM NERGY AI — {isEs ? 'Tableros y Flujos Sin Código' : 'Code-Free Dynamic Dashboards'}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => navigate('/features/customizable-dashboards')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                }}
              >
                <span>{isEs ? 'Abrir Simulador Interactivo y Kanban' : 'Explore Interactive Sandbox & Kanban'}</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={onOpenSales}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: 'var(--web-surface)',
                  border: '1px solid var(--web-border)',
                  color: 'var(--web-text-main)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <MessageSquare size={14} />
                <span>{isEs ? 'Consultar Asesor' : 'Talk to Advisor'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FeaturesPage;
