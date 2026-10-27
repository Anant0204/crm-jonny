import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { CORE_MODULES_DETAILS } from '../../data/coreModulesData';
import { CRM_FEATURES_DATA } from '../../data/websiteNavData';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Zap,
  Bot,
  Building2,
  ExternalLink,
  MessageSquare,
  Sliders,
  Award,
  Star,
  Compass,
  Check,
  Building,
  Briefcase,
  ShoppingCart,
  Landmark,
  TrendingUp,
  Clock,
  Users,
  Package,
  Boxes,
  Factory,
  FolderKanban,
  UserCheck,
  DollarSign,
  BarChart3,
  Database,
  PieChart,
  Headphones,
  FileSpreadsheet,
  Layers,
  LayoutDashboard
} from 'lucide-react';

// Map icon string or fallback to Lucide components
const ICON_MAP = {
  Users,
  UserCheck,
  FolderKanban,
  Package,
  Boxes,
  Factory,
  TrendingUp,
  Zap,
  MessageSquare,
  ShieldCheck,
  BarChart3,
  Clock,
  DollarSign,
  CheckCircle2,
  Database,
  PieChart,
  Headphones,
  FileSpreadsheet,
  Layers,
  LayoutDashboard,
  Building2,
  Building
};

// Slug mapping aliases
const SLUG_ALIASES = {
  'crm': 'contact-management',
  'contact-management': 'contact-management',
  'contacts': 'contact-management',
  'hr': 'recruitment-onboarding',
  'recruitment': 'recruitment-onboarding',
  'recruitment-onboarding': 'recruitment-onboarding',
  'project': 'project-management',
  'projects': 'project-management',
  'project-management': 'project-management',
  'inventory': 'inventory-management',
  'inventory-management': 'inventory-management',
  'warehousing': 'inventory-management',
  'manufacturing': 'manufacturing',
  'production': 'manufacturing'
};

export const FeatureDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { onOpenZunme, onOpenSales } = useOutletContext() || {};
  const { isEs, t } = useLanguage();

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(prev => (prev === idx ? null : idx));
  };

  // Resolve module data
  const normalizedSlug = SLUG_ALIASES[slug?.toLowerCase()] || slug?.toLowerCase();

  const moduleDetail = useMemo(() => {
    // 1. Look in CORE_MODULES_DETAILS
    if (CORE_MODULES_DETAILS[normalizedSlug]) {
      return CORE_MODULES_DETAILS[normalizedSlug];
    }

    // 2. Fallback to CRM_FEATURES_DATA from websiteNavData
    const foundFeature = CRM_FEATURES_DATA.find(f => f.id === normalizedSlug || f.id === slug);
    if (foundFeature) {
      return {
        id: foundFeature.id,
        badge: `${foundFeature.category ? foundFeature.category.toUpperCase() : 'ENTERPRISE MODULE'} • AI POWERED`,
        title: foundFeature.name,
        titleEs: foundFeature.nameEs || foundFeature.name,
        tagline: '“Make AI Your Bestie”',
        overview: foundFeature.desc + ' Designed for high-scale enterprise operations with automated data integrity, real-time reporting, and unified workflow orchestration.',
        overviewEs: (foundFeature.descEs || foundFeature.desc) + ' Diseñado para operaciones empresariales de alta escala con integridad de datos automatizada y orquestación de flujos de trabajo.',
        stats: [
          { label: 'Operational Efficiency', value: '+35%', desc: 'Streamlined end-to-end execution' },
          { label: 'Data Accuracy', value: '99.9%', desc: 'Real-time synchronization across modules' },
          { label: 'Automated Workflows', value: '100%', desc: 'Frictionless rule-based triggers' },
          { label: 'Cloud Availability', value: '99.99%', desc: 'Zero-downtime multi-tenant reliability' }
        ],
        pillars: [
          {
            title: 'Unified Operational Flow',
            icon: 'Zap',
            items: [
              { label: 'End-to-End Orchestration', text: 'Connects effortlessly with customer management, supply chain, and general ledger operations.' },
              { label: 'Real-Time Telemetry', text: 'Provides real-time visibility into transactions, updates, and organizational milestones.' }
            ]
          },
          {
            title: 'Automated Intelligence',
            icon: 'TrendingUp',
            items: [
              { label: 'Predictive Insights', text: 'Uses machine learning algorithms to highlight bottlenecks and suggest optimization actions.' },
              { label: 'Intelligent Alerts', text: 'Delivers proactive alerts to stakeholders when critical operational conditions are met.' }
            ]
          },
          {
            title: 'Enterprise Security & Governance',
            icon: 'ShieldCheck',
            items: [
              { label: 'Role-Based Permissions', text: 'Restricts granular actions and views to authorized roles with full immutable audit logs.' },
              { label: 'Data Encryption', text: 'End-to-end AES-256 encryption at rest and TLS 1.3 in transit.' }
            ]
          }
        ],
        useCases: [
          { type: 'High-Growth Tech Enterprises', help: 'Scale operations rapidly without adding administrative headcount or communication silos.' },
          { type: 'Commercial Service Providers', help: 'Deliver predictable, transparent client deliverables with precise accounting integration.' },
          { type: 'Retail & Multi-Channel Networks', help: 'Maintain real-time synchronization between front-end customer touchpoints and back-office ERP.' }
        ],
        faqs: [
          {
            q: `How does ${foundFeature.name} integrate with other CRM nErgy modules?`,
            a: `${foundFeature.name} is built directly on the unified CRM nErgy core database, ensuring zero lag and seamless two-way data sync across Accounting, CRM, Projects, and Inventory.`
          },
          {
            q: 'Can our team customize fields, stages, and approval workflows?',
            a: 'Yes. Full white-label and customization controls allow you to tailor schema fields, automated rules, and role permissions to match your exact business model.'
          }
        ]
      };
    }

    return null;
  }, [normalizedSlug, slug]);

  // If completely unknown, render safe fallback
  if (!moduleDetail) {
    return (
      <div style={{ padding: '6rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--web-text-main)' }}>
          {t('Module Not Found')}
        </h2>
        <p style={{ color: 'var(--web-text-muted)', margin: '1rem 0 2rem' }}>
          {t('The requested enterprise module could not be located.')}
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '8px',
            background: '#6366f1',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700
          }}
        >
          <ArrowLeft size={16} />
          <span>{t('Back to Home')}</span>
        </Link>
      </div>
    );
  }

  // Sibling module shortcuts for quick switching
  const siblingModules = [
    { name: 'Accounting', path: '/features/analytic-accounting', tag: 'Core Ledger' },
    { name: 'CRM', path: '/features/contact-management', tag: 'Pipelines & Leads' },
    { name: 'HR', path: '/features/recruitment-onboarding', tag: 'Talent & Payroll' },
    { name: 'Project', path: '/features/project-management', tag: 'Tasks & Sprints' },
    { name: 'Inventory', path: '/features/inventory-management', tag: 'Warehousing' },
    { name: 'Manufacturing', path: '/features/manufacturing', tag: 'BOM & Assembly' }
  ];

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* Top Breadcrumb & Quick Switcher Strip */}
      <section style={{
        padding: '0.85rem 1.25rem',
        background: 'var(--web-surface-subtle)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--web-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>
              {t('Home')}
            </Link>
            <span>/</span>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>
              {t('ERP Modules')}
            </Link>
            <span>/</span>
            <span style={{ color: '#6366f1', fontWeight: 700 }}>
              {isEs ? moduleDetail.titleEs : moduleDetail.title}
            </span>
          </div>

          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              fontSize: '12.5px',
              fontWeight: 600,
              color: 'var(--web-text-main)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={14} />
            <span>{t('Back to Hub')}</span>
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{
        padding: '3.5rem 1.25rem 2.5rem 1.25rem',
        background: 'radial-gradient(ellipse at 50% -10%, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
        borderBottom: '1px solid var(--web-border)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '24px',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#6366f1'
          }}>
            <Sparkles size={14} style={{ color: '#6366f1' }} />
            <span>{moduleDetail.badge}</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            {isEs ? moduleDetail.titleEs : moduleDetail.title}
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: '15px',
            color: '#6366f1',
            fontWeight: 700,
            margin: 0
          }}>
            {t(moduleDetail.tagline || '“Make AI Your Bestie”')}
          </p>

          {/* Overview text */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.65,
            maxWidth: '840px',
            margin: '0.5rem 0 0 0'
          }}>
            {isEs ? moduleDetail.overviewEs : moduleDetail.overview}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '8px',
                background: '#6366f1',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)'
              }}
            >
              <MessageSquare size={15} />
              <span>{t('Contact Us')}</span>
            </button>

            <button
              type="button"
              onClick={onOpenZunme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.25)'
              }}
            >
              <Bot size={15} />
              <span>{t('Ask Best Friend – VA >>')}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'var(--web-surface)',
                border: '1px solid var(--web-border)',
                color: 'var(--web-text-main)',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>{t('Explore All 12 Modules')}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Module Switcher Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px dashed var(--web-border)',
            width: '100%',
            maxWidth: '820px'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('Core Suite')}:
            </span>
            {siblingModules.map((s, idx) => {
              const isCurrent = s.path.includes(moduleDetail.id);
              return (
                <Link
                  key={idx}
                  to={s.path}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: isCurrent ? 800 : 600,
                    textDecoration: 'none',
                    background: isCurrent ? '#6366f1' : 'var(--web-surface)',
                    color: isCurrent ? '#ffffff' : 'var(--web-text-main)',
                    border: '1px solid',
                    borderColor: isCurrent ? '#6366f1' : 'var(--web-border)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {s.name}
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Enterprise Metrics Bar */}
      {moduleDetail.stats && moduleDetail.stats.length > 0 && (
        <section style={{
          padding: '2rem 1.25rem',
          background: 'var(--web-surface)',
          borderBottom: '1px solid var(--web-border)'
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            {moduleDetail.stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: 'var(--web-surface-subtle)',
                  border: '1px solid var(--web-border)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#6366f1', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--web-text-main)', marginTop: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--web-text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Six Pillars of Capability */}
      {moduleDetail.pillars && (
        <section style={{ padding: '3.5rem 1.25rem 2rem 1.25rem', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--web-text-main)', margin: '0 0 8px 0' }}>
              {t('Core Enterprise Capabilities')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '720px', margin: '0 auto' }}>
              {t('Unified architectures designed to automate workflows, ensure enterprise governance, and accelerate execution.')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {moduleDetail.pillars.map((p, idx) => {
              const PillarIcon = ICON_MAP[p.icon] || Zap;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--web-surface)',
                    borderRadius: '14px',
                    border: '1px solid var(--web-border)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                  className="hover:scale-101"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: '#6366f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <PillarIcon size={20} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                      {p.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {p.items.map((it, iIdx) => (
                      <div key={iIdx} style={{ fontSize: '13px', lineHeight: 1.55 }}>
                        <strong style={{ color: 'var(--web-text-main)' }}>{it.label}: </strong>
                        <span style={{ color: 'var(--web-text-muted)' }}>{it.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Industry / Business Use Cases */}
      {moduleDetail.useCases && (
        <section style={{ padding: '2rem 1.25rem 3rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--web-text-main)', margin: '0 0 6px 0' }}>
              {t('Who Benefits from')} {isEs ? moduleDetail.titleEs : moduleDetail.title}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', maxWidth: '780px', margin: '0 auto' }}>
              {t('Engineered to support specialized demands across diverse industry segments and operational models.')}
            </p>
          </div>

          <div style={{
            background: 'var(--web-surface)',
            borderRadius: '14px',
            border: '1px solid var(--web-border)',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
          }}>
            <div
              className="website-responsive-table-grid website-responsive-table-header"
              style={{
                background: 'var(--web-surface-subtle)',
                borderBottom: '1px solid var(--web-border)',
                padding: '12px 18px',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--web-text-main)'
              }}
            >
              <div>{t('Business Segment')}</div>
              <div>{t('Operational Impact & Value')}</div>
            </div>

            {moduleDetail.useCases.map((b, idx) => (
              <div
                key={idx}
                className="website-responsive-table-grid"
                style={{
                  padding: '14px 18px',
                  borderBottom: idx === moduleDetail.useCases.length - 1 ? 'none' : '1px solid var(--web-border)',
                  fontSize: '13.5px',
                  backgroundColor: idx % 2 === 1 ? 'var(--web-surface-subtle)' : 'var(--web-surface)'
                }}
              >
                <div style={{ fontWeight: 700, color: '#6366f1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span>{b.type}</span>
                </div>
                <div style={{ color: 'var(--web-text-muted)', lineHeight: 1.55 }}>
                  {b.help}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {moduleDetail.faqs && moduleDetail.faqs.length > 0 && (
        <section style={{
          padding: '2.5rem 1.25rem 4rem 1.25rem',
          background: 'var(--web-surface-subtle)',
          borderTop: '1px solid var(--web-border)'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#6366f1',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px'
              }}>
                <HelpCircle size={15} />
                <span>{t('Frequently Asked Questions')}</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--web-text-main)', margin: 0 }}>
                {t('Questions About')} {isEs ? moduleDetail.titleEs : moduleDetail.title}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {moduleDetail.faqs.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--web-surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--web-border)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: '#6366f1',
                        transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {openFaq === idx && (
                    <div style={{
                      padding: '0 1.25rem 1.1rem 1.25rem',
                      fontSize: '13.5px',
                      color: 'var(--web-text-muted)',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--web-border)',
                      paddingTop: '0.9rem'
                    }}>
                      <p style={{ margin: 0 }}>{item.a}</p>
                      <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={onOpenSales}
                          style={{
                            fontSize: '12px',
                            color: '#6366f1',
                            fontWeight: 700,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          {t('[ Contact US ]')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Final CTA Box */}
            <div style={{
              marginTop: '2.5rem',
              padding: '2rem',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.08) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                {t('Ready to Power Your Business with')} {isEs ? moduleDetail.titleEs : moduleDetail.title}?
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', maxWidth: '600px', margin: 0 }}>
                {t('Sign up for a FREE 90-day trial and bring CRM nErgy into your business. No credit card required.')}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={onOpenSales}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    background: '#6366f1',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t('Get Started Today')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    background: 'var(--web-surface)',
                    border: '1px solid var(--web-border)',
                    color: 'var(--web-text-main)',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  {t('Explore Full Suite')}
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
};
