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
  Bot
} from 'lucide-react';

export const BusinessCrmPage = () => {
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
      q: 'What is CRM Software?',
      a: 'CRM nErgy (Customer Relationship Management) (CRM) solutions are software applications designed to help businesses manage interactions with customers, organize customer data, and automate routine engagement activities. They enhance customer satisfaction and retention by streamlining processes related to customer relationships and providing valuable data analytics. A CRM\'s core features include contact and account management, lead and opportunity management, interaction tracking, workflow automation, analytics and reporting, and third-party integrations to connect tools like email, phone, and social media. These features provide a unified customer view and support sales, marketing, and service teams.'
    },
    {
      q: 'What is an ERP Software?',
      a: 'ERP nErgy (Enterprise Resource Planning (ERP) software is a type of integrated management software that helps organizations automate and streamline their business processes, such as accounting, procurement, and supply chain operations. It provides a central hub for data management, enabling better decision-making and efficiency across various departments.'
    },
    {
      q: 'What is an ERP – CRM integrated Software?',
      a: 'CRM–ERP integration links an ERP system with a CRM system so data stays in sync across both platforms creating AAI SynErgy (for example customers, products, orders, invoices, and service cases). It typically uses APIs to connect the systems, keeping records current and supporting workflows like quote-to-cash. CRM nErgy CRM ERP Business Solutions improve teamwork and customer satisfaction by offering a centralized hub for managing tasks, communication, and customer data. Secure file sharing, round-the-clock accessibility, and optimized workflows for increased productivity are important features.'
    },
    {
      q: 'What are the key benefits of using CRM and ERP software together?',
      a: 'CRM SynErgy software is unified perspective of customer interactions and back-office operations by integrating CRM nErgy CRM and ERP software, which improves operational efficiency and decision-making. Data silos are eliminated, workflows are streamlined, and departmental collaboration is enhanced through this integration, which eventually improves customer experience and business performance.'
    },
    {
      q: 'How do CRM and ERP software compare in terms of cost and implementation?',
      a: 'Depending on licensing models, implementation complexity, and continuous maintenance, the cost of CRM and ERP software can vary greatly. Compared to CRM nErgy CRM systems, which are frequently easier to implement and may have lower upfront costs, ERP systems typically have higher implementation costs because they require extensive customization and integration across various business functions.'
    },
    {
      q: 'What are the potential challenges of integrating CRM and ERP systems in a business?',
      a: 'Poor data governance, legacy system limitations, and the difficulty of coordinating disparate departmental procedures are some potential obstacles to integrating CRM and ERP systems. Operational efficiency may be hampered by these problems, which can result in data silos, inconsistent information, and more manual labor. The CRM SynErgy makes CRM and ERP integration a magical experience, it’s like riding a bicycle. You’re in control.'
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
        <div className="website-breadcrumb-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--web-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('Home')}</Link>
            <span>/</span>
            <Link to="/#solutions" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('CRM Solutions')}</Link>
            <span>/</span>
            <span style={{ color: '#0284c7', fontWeight: 700 }}>{t('Business CRM Software')}</span>
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
        background: 'radial-gradient(ellipse at 50% -10%, rgba(2, 132, 199, 0.12) 0%, transparent 70%)',
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
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#0284c7'
          }}>
            <Sparkles size={14} style={{ color: '#0284c7' }} />
            <span>{t('CRM SOLUTIONS EVERY BUSINESS NEEDS • ADVANCED ARTIFICIAL INTELLIGENCE', 'CRM SOLUTIONS EVERY BUSINESS NEEDS • ADVANCED ARTIFICIAL INTELLIGENCE')}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            {t('Business CRM Software')}
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#0284c7',
            fontWeight: 700,
            margin: 0
          }}>
            {t('“Make AI Your Bestie”')}
          </p>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.65,
            maxWidth: '820px',
            margin: '0.5rem 0 0 0'
          }}>
            Business Customer Relationship Management (CRM) represents a strategic methodology employed by CRM nErgy to help organizations oversee and improve their interactions with customers. This approach utilizes data-driven insights and specialized information systems to collect and analyze customer data, thereby promoting enhanced communication and collaboration among different departments, including sales, marketing, and customer service.
          </p>

          <p style={{
            fontSize: '14px',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: 0
          }}>
            CRM nErgy understands CRM systems and how crucial they are for organizations aiming to enhance customer engagement and foster growth by improving the management of customer relationships.
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
                background: '#0284c7',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
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
        padding: '1.5rem 1.25rem',
        backgroundColor: 'var(--web-surface-subtle)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--web-text-muted)', letterSpacing: '0.06em' }}>
            Understanding Business CRM and ERP Software: Dedicated Industry Tracks
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
                onClick={() => {
                  if (sol.path.startsWith('/#')) {
                    navigate(sol.path);
                  } else {
                    navigate(sol.path);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '20px',
                  background: 'var(--web-surface)',
                  border: '1px solid var(--web-border)',
                  color: 'var(--web-text-main)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{sol.name}</span>
                <span style={{ fontSize: '10px', color: '#0284c7', background: 'rgba(2, 132, 199, 0.08)', padding: '1px 6px', borderRadius: '10px' }}>
                  {sol.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Branding and Customization Section */}
      <section style={{ padding: '3.5rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.04) 0%, rgba(79, 70, 229, 0.04) 100%)',
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
              color: '#0284c7',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: 'rgba(2, 132, 199, 0.1)',
              padding: '3px 10px',
              borderRadius: '20px'
            }}>
              Branding and Customization
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)' }}>
              “Make AI Your Bestie”
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            Customizable CRM Architecture Powered by CRM nErgy
          </h2>

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
                background: '#0284c7',
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
          borderLeft: '4px solid #0284c7',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0284c7', letterSpacing: '0.06em' }}>
            White Label Opportunity
          </span>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            Build & Promote Your Brand with the White Label CRM or ERP Software
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '1050px' }}>
            CRM nErgy White Label CRM or ERP software includes customizable branding, client portals, sales and marketing automation, project management tools and much more. These platforms help businesses create new revenue streams by reselling the CRM solution under their own brand.
          </p>

          <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
            Companies can leverage both systems offered by the CRM synErgy to enhance customer relationships and optimize internal processes by understanding the distinct roles of CRM and ERP.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '0.5rem', borderTop: '1px solid var(--web-border)' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0284c7' }}>
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
                background: '#0284c7',
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

      {/* Comprehensive FAQs Section */}
      <section style={{
        padding: '3.5rem 1.25rem 4.5rem 1.25rem',
        backgroundColor: 'var(--web-surface-subtle)',
        borderTop: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Client Reference Guide & Architecture FAQs
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
              Business CRM & ERP Software Knowledge Base
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', maxWidth: '640px', margin: '0 auto' }}>
              In-depth explanations of White Label platforms, CRM vs. ERP roles, synergy benefits, and implementation guidelines.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--web-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--web-border)',
                  overflow: 'hidden',
                  transition: 'border-color 0.15s ease'
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
                      color: '#0284c7',
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
                          color: '#0284c7',
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
