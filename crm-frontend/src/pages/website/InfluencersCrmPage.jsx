import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Building2,
  DollarSign,
  TrendingUp,
  Cpu,
  HelpCircle,
  ArrowLeft,
  Bot,
  Tv,
  Share2,
  Sliders,
  Users,
  BarChart3,
  Calendar
} from 'lucide-react';

export const InfluencersCrmPage = () => {
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
    { name: 'Startup Business', path: '/solutions/startups', tag: 'Growth' },
    { name: 'Small to Mid – Size Biz', path: '/solutions/mid-size', tag: 'Scale' }
  ];

  const faqs = [
    {
      q: 'What is a White Label CRM?',
      a: 'A White Label CRM nErgy platform lets businesses customize, rebrand, and resell CRM software as their own. CRM nErgy’s client management tools support full branding control, including logos and custom domains, along with features for managing customer interactions, tracking leads, automating workflows, and integrating with other software. CRM, We create the nErgy in the workplace.'
    },
    {
      q: 'What are the key features of CRM software for influencer management?',
      a: 'In addition to tracking previous collaborations and performance indicators, a CRM for influencer management centralizes creator data and facilitates workflows like outreach, campaign tracking, and payments. CRM nERgy software makes organizing content and engagement history to tailor future partnerships, it also facilitates relationship intelligence.'
    },
    {
      q: 'How does CRM software improve collaboration between brands and influencers?',
      a: 'CRM nERgy software streamlines the management of influencer relationships by centralizing data, tracking communications, and automating outreach, all of which enhance collaboration between brands and influencers. Campaign performance is eventually improved because of stronger collaborations and more effective workflows.'
    },
    {
      q: 'What are the best CRM software options for managing influencer relationships?',
      a: 'CRM nERgy Influencer Management software is one of the best CRM software options for managing influencer relationships, these platforms help streamline influencer discovery, manage communication, automate outreach, and track campaign performance effectively.'
    }
  ];

  const purposes = [
    {
      icon: Users,
      title: 'Relationship Management',
      points: [
        {
          label: 'Simplifying Communication',
          desc: 'Streamlining Communication: Facilitates easier communication between influencers and brands.'
        },
        {
          label: 'Monitoring Interactions',
          desc: 'Monitors all interactions to ensure that no vital information is overlooked.'
        }
      ]
    },
    {
      icon: BarChart3,
      title: 'Campaign Performance Analysis',
      points: [
        {
          label: 'Performance Metrics',
          desc: 'Assesses the effectiveness of influencer campaigns with granular conversion and reach telemetry.'
        },
        {
          label: 'Data-Driven Decisions',
          desc: 'Assists brands in making informed decisions based on comprehensive campaign analytics and historical data.'
        }
      ]
    },
    {
      icon: Calendar,
      title: 'Collaboration Optimization',
      points: [
        {
          label: 'Efficient Collaboration',
          desc: 'Enhances campaign coordination by fostering better cooperation between influencers and brands.'
        },
        {
          label: 'Resource Management',
          desc: 'Employing CRM software for influencer management allows brands to refine their marketing strategies, cultivate robust partnerships, and execute campaigns efficiently. Additionally, it aids in managing resources and timelines for influencer collaborations.'
        }
      ]
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
            <Link to="/#solutions" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('CRM Solutions')}</Link>
            <span>/</span>
            <span style={{ color: '#0284c7', fontWeight: 700 }}>{t('CRM for Influencers')}</span>
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
            <span>{t('Back to Solutions')}</span>
          </button>
        </div>
      </section>

      {/* Sibling Solution Track Navigation */}
      <nav aria-label="Solutions Navigation" style={{
        backgroundColor: 'var(--web-surface-subtle)',
        borderBottom: '1px solid var(--web-border)',
        padding: '0.75rem 1.25rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '8px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--web-text-muted)', letterSpacing: '0.06em', marginRight: '8px' }}>
            {t('CRM Solutions')}:
          </span>
          {siblingSolutions.map((item, idx) => {
            const isActive = item.name === 'Influencers';
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (item.path.startsWith('/#')) {
                    navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById(item.path.replace('/#', ''));
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    navigate(item.path);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? '#0284c7' : 'var(--web-surface)',
                  color: isActive ? '#ffffff' : 'var(--web-text-main)',
                  border: isActive ? '1px solid #0284c7' : '1px solid var(--web-border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{item.name}</span>
                <span style={{
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--web-surface-subtle)',
                  color: isActive ? '#ffffff' : 'var(--web-text-muted)',
                  fontWeight: 600
                }}>
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, var(--web-surface) 0%, var(--web-surface-subtle) 100%)',
        padding: '4rem 1.25rem 3.5rem 1.25rem',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            padding: '6px 16px',
            borderRadius: '24px',
            color: '#0284c7',
            fontSize: '12.5px',
            fontWeight: 700
          }}>
            <Tv size={15} />
            <span>{t('Advanced Artificial Intelligence')} • “{t('Make AI Your Bestie')}”</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: 'var(--web-text-main)',
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '920px'
          }}>
            {t('CRM Software for Influencer Management')}
          </h1>

          <p style={{
            fontSize: '16.5px',
            lineHeight: 1.65,
            color: 'var(--web-text-muted)',
            maxWidth: '820px',
            margin: 0
          }}>
            {t('CRM nErgy software simplifies relationship management, interaction tracking, and campaign performance analysis. This facilitates collaboration between brands and influencers, enhancing their marketing strategies.')}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
              }}
            >
              <MessageSquare size={16} />
              <span>{t('Contact Us')} / {t('SALES — chat zBox')}</span>
            </button>

            <button
              type="button"
              onClick={onOpenZunme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--web-surface)',
                color: 'var(--web-text-main)',
                border: '1px solid var(--web-border)',
                padding: '12px 22px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Sparkles size={16} style={{ color: '#4f46e5' }} />
              <span>{t('Ask My Zunme AI')}</span>
            </button>
          </div>

        </div>
      </section>

      {/* Branding and Customization Section */}
      <section style={{
        padding: '3.5rem 1.25rem',
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#4f46e5',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px'
            }}>
              <Sliders size={14} />
              <span>{t('Drag-and-Drop Architecture')}</span>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--web-text-main)', margin: '0 0 1rem 0' }}>
              {t('Branding and Customization')}
            </h2>
            <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--web-text-muted)', margin: 0 }}>
              {t('The CRM nErgy drag-and-drop feature in customizable CRM software greatly enhances usability and efficiency, enabling users to customize their systems according to their specific business processes without requiring any coding skills. This functionality is crucial for contemporary CRM solutions, rendering them more flexible and user-friendly.')}
            </p>
          </div>

          <div style={{
            background: 'var(--web-surface-subtle)',
            border: '1px solid var(--web-border)',
            borderRadius: '14px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                {t('Centralize creator directories, media kits, and rate cards')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                {t('Automate milestone deliverables, contracts, and payouts')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                {t('Unified multi-channel outreach tracking and engagement history')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* White Label Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        padding: '3rem 1.25rem',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              {t('White Label Opportunity')}
            </span>
          </div>

          <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
            {t('Build & Promote Your Brand with the White Label CRM or ERP Software')}
          </h3>

          <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)', margin: 0, maxWidth: '900px' }}>
            {t('CRM nErgy White Label CRM or ERP software includes customizable branding, client portals, sales and marketing automation, project management tools and much more. These platforms help businesses create new revenue streams by reselling the CRM solution under their own brand. READ MORE >> continue on the White Label Feature Page')}
          </p>
        </div>
      </section>

      {/* Comprehensive Overview & Key Purposes */}
      <section style={{
        padding: '4.5rem 1.25rem',
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0284c7', letterSpacing: '0.08em' }}>
              {t('Creator Economy Infrastructure')}
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--web-text-main)', margin: '6px 0 12px 0', letterSpacing: '-0.02em' }}>
              {t('A Comprehensive Overview of CRM Software for Influencer Management')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
              {t('CRM (Customer Relationship Management) software plays a crucial role for brands aiming to efficiently manage their relationships with influencers. It offers tools that facilitate communication, monitor interactions, and evaluate performance metrics.')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1.75rem'
          }}>
            {purposes.map((purpose, idx) => {
              const Icon = purpose.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--web-surface-subtle)',
                    border: '1px solid var(--web-border)',
                    borderRadius: '14px',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(2, 132, 199, 0.1)',
                      color: '#0284c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                      {t(purpose.title)}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {purpose.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0284c7' }}>
                          • {t(pt.label)}:
                        </span>
                        <p style={{ fontSize: '13px', lineHeight: 1.55, color: 'var(--web-text-muted)', margin: 0 }}>
                          {t(pt.desc)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concluding Quote Box */}
          <div style={{
            background: 'rgba(2, 132, 199, 0.05)',
            border: '1px solid rgba(2, 132, 199, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#0284c7', margin: 0 }}>
              “{t('The CRM nErgy Influencer Management software enhances the effectiveness of outreach efforts and cultivates stronger relationships, thereby boosting overall marketing efficiency.')}”
            </p>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{
        padding: '4.5rem 1.25rem',
        backgroundColor: 'var(--web-surface-subtle)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0284c7', letterSpacing: '0.08em' }}>
              {t('Influencer CRM Knowledge Base')}
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--web-text-main)', margin: '6px 0 0 0' }}>
              {t('Frequently Asked Questions')}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--web-surface)',
                    border: '1px solid var(--web-border)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '12px'
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: 'var(--web-text-muted)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.25rem 1.25rem 1.25rem',
                      borderTop: '1px solid var(--web-border)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'var(--web-text-muted)',
                      backgroundColor: 'var(--web-surface-subtle)'
                    }}>
                      <p style={{ margin: '1rem 0 0 0' }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Footer Bar */}
      <section style={{
        padding: '3rem 1.25rem',
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            {t('Ready to scale your brand with CRM nErgy Influencer Management?')}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', margin: 0, maxWidth: '640px' }}>
            {t('Centralize creator communications, automate contract agreements, and track multi-channel ROI effortlessly.')}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={15} />
              <span>{t('Contact Us')} / {t('SALES — chat zBox')}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/#solutions')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--web-surface-subtle)',
                color: 'var(--web-text-main)',
                border: '1px solid var(--web-border)',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <span>{t('Explore All CRM Solutions')}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
