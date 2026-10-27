import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  Store,
  Layers,
  TrendingUp,
  HeartHandshake,
  Database,
  Sliders,
  CheckCircle2,
  Bot,
  ArrowLeft
} from 'lucide-react';

export const MidSizeCrmPage = () => {
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
    { name: 'Small to Mid – Size Biz', path: '/solutions/mid-size', tag: 'Active' }
  ];

  const keyFunctions = [
    {
      num: '1',
      title: 'Structuring Client Information',
      icon: Database,
      points: [
        'Gathers client data for easy retrieval.',
        'Keeps records of communication, purchase history, and contact details.',
        'Facilitates understanding of customer needs and preferences.'
      ]
    },
    {
      num: '2',
      title: 'Streamlining Sales and Marketing Operations',
      icon: TrendingUp,
      points: [
        'Automates repetitive tasks such as follow-ups and email campaigns.',
        'Assists in overseeing sales pipelines and tracking leads.',
        'Enables the creation of targeted marketing campaigns based on customer data.'
      ]
    },
    {
      num: '3',
      title: 'Enhancing Customer Relationships',
      icon: HeartHandshake,
      points: [
        'Streamlines repetitive tasks such as follow-ups and email marketing.',
        'Assists in overseeing sales pipelines and tracking leads.',
        'Enables the creation of targeted marketing campaigns based on customer data.'
      ]
    }
  ];

  const faqs = [
    {
      q: 'What is a White Label CRM?',
      a: 'A White Label CRM nErgy platform lets businesses customize, rebrand, and resell CRM software as their own. CRM nErgy’s client management tools support full branding control, including logos and custom domains, along with features for managing customer interactions, tracking leads, automating workflows, and integrating with other software. CRM, We create the nErgy in the workplace.'
    },
    {
      q: 'What are the key benefits of CRM software for mid-size businesses?',
      a: 'CRM nErgy software improves data management, streamlines sales procedures, and strengthens customer relationships for mid-size businesses. Additionally, it promotes departmental cooperation, centralizes customer data, and automates tasks, all of which boosts customer satisfaction and growth.'
    },
    {
      q: 'How does CRM software improve customer relationships for mid-size businesses?',
      a: 'By centralizing customer data to provide a Bird’s Eye View, enabling personalized communications, and anticipating customer needs, using the CRM nErgy software enhances customer relationships for mid-size businesses. In fact; it automates workflows, simplifies sales and marketing procedures, and provides analytics to spot trends and expansion prospects.'
    },
    {
      q: 'What features should mid-size businesses look for in CRM software?',
      a: 'To effectively manage customer relationships and support growth, mid-size businesses should use the CRM nErgy CRM software which offers scalability, user-friendly interfaces, integration capabilities with current tools, and robust reporting features. Strong customer service and adaptable options are also crucial.'
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
            <span style={{ color: '#10b981', fontWeight: 700 }}>{t('CRM Software for Small to Mid-Size Businesses')}</span>
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
        background: 'radial-gradient(ellipse at 50% -10%, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
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
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#10b981'
          }}>
            <Sparkles size={14} style={{ color: '#10b981' }} />
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
            {t('CRM Software for Small to Mid-Size Businesses')}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.65,
            maxWidth: '820px',
            margin: '0.5rem 0 0 0'
          }}>
            CRM nErgy software improves customer relationships, streamlines sales and marketing processes, and assists small to mid-sized companies in managing customer information. Additionally, it enables departments to track team interactions and promote effective communication by centralizing data.
          </p>

          <p style={{
            fontSize: '14px',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: 0
          }}>
            CRM (Customer Relationship Management) software is designed to help small to mid-sized companies optimize various processes and oversee their customer interactions. The primary functions include improving customer relationships and boosting overall business efficiency.
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
                background: '#10b981',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
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
            Understanding CRM nErgy Software for Small to Mid-Size Businesses
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
                  background: sol.name === 'Small to Mid – Size Biz' ? '#10b981' : 'var(--web-surface)',
                  border: `1px solid ${sol.name === 'Small to Mid – Size Biz' ? '#10b981' : 'var(--web-border)'}`,
                  color: sol.name === 'Small to Mid – Size Biz' ? '#ffffff' : 'var(--web-text-main)',
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

      {/* Key Functions of CRM Software */}
      <section style={{ padding: '4rem 1.25rem 2rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.06em' }}>
            Operational Architecture
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
            Key Functions of CRM Software
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '1.5rem'
        }}>
          {keyFunctions.map((fn, idx) => {
            const Icon = fn.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--web-surface)',
                  borderRadius: '14px',
                  border: '1px solid var(--web-border)',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                    {fn.num}. {fn.title}
                  </h3>
                </div>

                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6 }}>
                  {fn.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ marginBottom: '6px' }}>{pt}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          background: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          fontSize: '13.5px',
          color: 'var(--web-text-main)',
          lineHeight: 1.6,
          textAlign: 'center'
        }}>
          CRM nErgy software enhances customer satisfaction and loyalty by providing a centralized database of customer information, thereby aiding mid-sized businesses in managing and nurturing their customer relationships.
        </div>
      </section>

      {/* Branding and Customization Section */}
      <section style={{ padding: '2rem 1.25rem 3.5rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(2, 132, 199, 0.04) 100%)',
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
              color: '#10b981',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: 'rgba(16, 185, 129, 0.1)',
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
                background: '#10b981',
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
          borderLeft: '4px solid #10b981',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.06em' }}>
            White Label Reseller Opportunities
          </span>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            Build & Promote Your Brand with the White Label CRM or ERP Software
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '1050px' }}>
            CRM nErgy White Label CRM or ERP software includes customizable branding, client portals, sales and marketing automation, project management tools and much more. These platforms help businesses create new revenue streams by reselling the CRM solution under their own brand.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '0.5rem', borderTop: '1px solid var(--web-border)' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#10b981' }}>
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
                background: '#10b981',
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
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Mid-Size Scale & Strategy
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
              Frequently Asked Questions for Mid-Size Enterprises
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
                      color: '#10b981',
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
                          color: '#10b981',
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
        </div>
      </section>

    </div>
  );
};
