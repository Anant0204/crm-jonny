import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  Rocket,
  Database,
  Zap,
  HeartHandshake,
  TrendingUp,
  Sliders,
  DollarSign,
  Maximize2,
  Cpu,
  Bot,
  ArrowLeft
} from 'lucide-react';

export const StartupsCrmPage = () => {
  const navigate = useNavigate();
  const { onOpenZunme, onOpenSales } = useOutletContext() || {};
  const { t } = useLanguage();

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const siblingSolutions = [
    { name: 'Contact AI', path: '/solutions/contact-ai', tag: 'AI' },
    { name: 'Franchise', path: '/solutions/franchise', tag: 'Multi-Location' },
    { name: 'Influencers', path: '/solutions/influencers', tag: 'Creator' },
    { name: 'Startup Business', path: '/solutions/startups', tag: 'Active' },
    { name: 'Small to Mid – Size Biz', path: '/solutions/mid-size', tag: 'Scale' }
  ];

  const keyBenefits = [
    {
      title: 'Centralized Customer Data',
      desc: 'CRM systems combine customer data so team can easily access it.',
      icon: Database
    },
    {
      title: 'Sales Automation',
      desc: 'Teams can concentrate on closing more deals by automating repetitive tasks.',
      icon: Zap
    },
    {
      title: 'Better Customer Service',
      desc: 'Offers resources to monitor customer interactions to address problems.',
      icon: HeartHandshake
    },
    {
      title: 'Data-Driven Insights',
      desc: 'understanding analytics predicts customer behavior increases loyalty.',
      icon: TrendingUp
    }
  ];

  const selectionCriteria = [
    { title: 'Scalability', desc: 'Make sure the CRM can expand along with your company.', icon: Maximize2 },
    { title: 'Integration', desc: 'Check for interoperability with current platforms and tools.', icon: Cpu },
    { title: 'User Experience', desc: 'Team adoption can be improved by an interface that is easy to use.', icon: Sliders },
    { title: 'Cost', desc: 'Determine a solution that suits your budget by analyzing pricing plans.', icon: DollarSign }
  ];

  const faqs = [
    {
      q: 'What are the costs associated with implementing CRM software for startups?',
      a: 'Depending on customization, integration, and data complexity, other CRM system implementation costs for startups usually fall between $10,000 and $50,000. To assist startups in launching their Big Ideas, CRM nErgy offers a FREE CRM system subscription. Let’s Get Started'
    },
    {
      q: 'How do different CRM software options compare in features for startups?',
      a: 'Contact management, sales pipeline tracking, email integration, and automation tools to expedite customer interactions and growth are common CRM nErgy software features that’s available to startups.'
    },
    {
      q: 'What are the potential challenges startups face when using CRM software?',
      a: 'When using CRM software, startups may encounter difficulties like high implementation costs, staff training requirements, and implementation complexity. They may also have trouble guaranteeing user adoption among team members and integrating data. CRM nErgy works with startups and promotes small business ownerships and entrepreneurship. Let’s Get Started'
    }
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Breadcrumb Navigation Bar */}
      <section style={{
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)',
        padding: '0.875rem 1.25rem'
      }}>
        <div className="website-breadcrumb-bar" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--web-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('Home')}</Link>
            <span>/</span>
            <Link to="/solutions/business-crm" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('CRM Solutions')}</Link>
            <span>/</span>
            <span style={{ color: '#ec4899', fontWeight: 700 }}>{t('CRM Software for Startups')}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/#solutions')}
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
            <span>{t('Back to Solutions Overview')}</span>
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{
        padding: '3.5rem 1.25rem 2.5rem 1.25rem',
        background: 'radial-gradient(ellipse at 50% -10%, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
        borderBottom: '1px solid var(--web-border)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '24px',
            background: 'rgba(236, 72, 153, 0.08)',
            border: '1px solid rgba(236, 72, 153, 0.25)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#ec4899'
          }}>
            <Sparkles size={14} style={{ color: '#ec4899' }} />
            <span>ADVANCED ARTIFICIAL INTELLIGENCE • {t('“Make AI Your Bestie”')}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            {t('CRM Software for Startups')}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.65,
            maxWidth: '820px',
            margin: '0.5rem 0 0 0'
          }}>
            CRM nErgy software provides AI-powered insights and an integrated platform designed to assist startups in centralizing customer information, automating sales and marketing processes, and improving customer service.
          </p>

          <p style={{
            fontSize: '14px',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: 0
          }}>
            For startups to efficiently handle customer interactions, CRM (Customer Relationship Management) software is crucial. Through AI-driven insights, it improves customer service, centralizes customer data, and automates marketing and sales procedures.
          </p>

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
                background: '#ec4899',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.25)'
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
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)'
              }}
            >
              <Bot size={15} />
              <span>{t('Ask My Zunme AI')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sibling Solutions Sub-navigation */}
      <section style={{
        padding: '1.25rem 1.25rem',
        backgroundColor: 'var(--web-surface-subtle)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--web-text-muted)', letterSpacing: '0.06em' }}>
            Understanding CRM nErgy Software for Startup Businesses
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '0.75rem'
          }}>
            {siblingSolutions.map((sol) => (
              <button
                key={sol.name}
                type="button"
                onClick={() => navigate(sol.path)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '20px',
                  background: sol.name === 'Startup Business' ? '#ec4899' : 'var(--web-surface)',
                  border: `1px solid ${sol.name === 'Startup Business' ? '#ec4899' : 'var(--web-border)'}`,
                  color: sol.name === 'Startup Business' ? '#ffffff' : 'var(--web-text-main)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>{sol.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits of CRM for Startups */}
      <section style={{ padding: '4rem 1.25rem 2rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#ec4899', letterSpacing: '0.06em' }}>
            Startup Agility
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
            Key Benefits of CRM for Startups
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: '1.5rem'
        }}>
          {keyBenefits.map((item, idx) => {
            const Icon = item.icon;
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
                  gap: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(236, 72, 153, 0.1)',
                  color: '#ec4899',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.55, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consider the following when choosing a CRM System */}
      <section style={{ padding: '2rem 1.25rem 3rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--web-text-main)', margin: '0 0 6px 0' }}>
            Consider the following when choosing a CRM System
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: '1.25rem'
        }}>
          {selectionCriteria.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--web-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--web-border)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={16} style={{ color: '#ec4899' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '1.75rem',
          padding: '1.25rem',
          borderRadius: '12px',
          background: 'rgba(236, 72, 153, 0.05)',
          border: '1px solid rgba(236, 72, 153, 0.15)',
          fontSize: '13.5px',
          color: 'var(--web-text-main)',
          textAlign: 'center',
          fontWeight: 600
        }}>
          CRM nErgy enhances a startup's ability to manage client relationships, streamline operations, and promote expansion.
        </div>
      </section>

      {/* Branding and Customization Section */}
      <section style={{ padding: '0 1.25rem 3rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.04) 0%, rgba(79, 70, 229, 0.04) 100%)',
          border: '1px solid var(--web-border)',
          borderRadius: '16px',
          padding: '2rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#ec4899',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: 'rgba(236, 72, 153, 0.1)',
              padding: '3px 10px',
              borderRadius: '20px'
            }}>
              Branding and Customization
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)' }}>
              “Make AI Your Bestie”
            </span>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', lineHeight: 1.65, margin: 0, maxWidth: '1020px' }}>
            The CRM nErgy drag-and-drop feature in customizable CRM software greatly enhances usability and efficiency, enabling users to customize their systems according to their specific business processes without requiring any coding skills. This functionality is crucial for contemporary CRM solutions, rendering them more flexible and user-friendly.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '8px',
                background: '#ec4899',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={14} />
              <span>[ Contact Us ]</span>
            </button>
          </div>
        </div>
      </section>

      {/* White Label Banner */}
      <section style={{ padding: '0 1.25rem 3.5rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: 'var(--web-surface)',
          border: '1px solid var(--web-border)',
          borderLeft: '4px solid #ec4899',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#ec4899', letterSpacing: '0.06em' }}>
            White Label Startup Expansion
          </span>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            Build & Promote Your Brand with the White Label CRM or ERP Software
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '1050px' }}>
            CRM nErgy White Label CRM or ERP software includes customizable branding, client portals, sales and marketing automation, project management tools and much more. These platforms help businesses create new revenue streams by reselling the CRM solution under their own brand.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '0.5rem', borderTop: '1px solid var(--web-border)' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#ec4899' }}>
              {t('READ MORE >> continue on the White Label Feature Page')}
            </span>

            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '8px',
                background: '#ec4899',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>{t('[ Contact Us ]')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{
        padding: '3.5rem 1.25rem 4.5rem 1.25rem',
        backgroundColor: 'var(--web-surface-subtle)',
        borderTop: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Startup Questions & Pricing Transparency
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
              Frequently Asked Questions for Startup Founders
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((item, idx) => (
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
                    padding: '1.25rem 1.5rem',
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
                      color: '#ec4899',
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {openFaq === idx && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    fontSize: '13.5px',
                    color: 'var(--web-text-muted)',
                    lineHeight: 1.65,
                    borderTop: '1px solid var(--web-border)',
                    paddingTop: '1rem'
                  }}>
                    <p style={{ margin: 0 }}>{item.a}</p>
                    <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={onOpenSales}
                        style={{
                          fontSize: '12px',
                          color: '#ec4899',
                          fontWeight: 700,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        {t('Let’s Get Started')} {t('[ Contact Us ]')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
