import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  PieChart,
  Database,
  TrendingUp,
  Zap,
  Users,
  BarChart3,
  ShieldCheck,
  Building,
  CheckCircle2,
  Bot,
  ArrowLeft
} from 'lucide-react';

export const AnalyticAccountingPage = () => {
  const navigate = useNavigate();
  const { onOpenZunme, onOpenSales } = useOutletContext() || {};
  const { t } = useLanguage();

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const pillars = [
    {
      title: 'Data Integration',
      icon: Database,
      items: [
        { label: 'Centralized client records', text: 'Connects with accounting software to keep client interactions, financial details, and service history in one place.' },
        { label: 'Real-time updates', text: 'Keeps client information current to reduce errors and improve responsiveness.' }
      ]
    },
    {
      title: 'Predictive Analytics',
      icon: TrendingUp,
      items: [
        { label: 'Revenue forecasting', text: 'Uses historical data to project future revenue and support planning.' },
        { label: 'At-risk client alerts', text: 'Reviews engagement patterns to identify clients who may need proactive attention.' }
      ]
    },
    {
      title: 'Workflow Automation',
      icon: Zap,
      items: [
        { label: 'Automated invoicing', text: 'Reduces manual work, improves accuracy, and speeds up billing.' },
        { label: 'Client onboarding', text: 'Uses templates, task flows, and e-signature options to simplify the onboarding process.' }
      ]
    },
    {
      title: 'Client Management',
      icon: Users,
      items: [
        { label: 'Complete interaction tracking', text: 'Monitors communication history, account updates, and client activity.' },
        { label: 'Client segmentation', text: 'Groups of clients by service type, engagement level, profitability, or other useful criteria.' }
      ]
    },
    {
      title: 'Reporting and Insights',
      icon: BarChart3,
      items: [
        { label: 'Custom dashboards', text: 'Displays key performance indicators in a clear visual format for faster analysis.' },
        { label: 'Trend analysis', text: 'Identifies patterns in client behavior and financial performance to guide strategy.' }
      ]
    },
    {
      title: 'Collaboration and Security',
      icon: ShieldCheck,
      items: [
        { label: 'Team coordination', text: 'Keeps staff aligned on client needs, tasks, and follow-ups.' },
        { label: 'Role-based permissions', text: 'Restricts sensitive client data to authorized users.' }
      ]
    }
  ];

  const businessTypes = [
    { type: 'Retail', help: 'Reveals purchasing patterns, improves customer targeting, and supports smarter inventory planning.' },
    { type: 'E-commerce', help: 'Tracks online behavior, personalizes marketing campaigns, and improves the digital customer journey.' },
    { type: 'Service Providers', help: 'Helps teams understand client needs, respond to feedback, and deliver more consistent service.' },
    { type: 'Financial Services', help: 'Analyzes client data to support better financial guidance, tailored offerings, and stronger relationships.' },
    { type: 'Healthcare', help: 'Uses data insights to improve patient communication, engagement, and service coordination.' },
    { type: 'Manufacturing', help: 'Improves supply chain visibility, strengthens customer relationships, and supports more accurate demand planning.' }
  ];

  const faqs = [
    {
      q: 'What is a White Label CRM?',
      a: 'A White Label CRM nErgy platform lets businesses customize, rebrand, and resell CRM software as their own. CRM nErgy’s client management tools support full branding control, including logos and custom domains, along with features for managing customer interactions, tracking leads, automating workflows, and integrating with other software. CRM, We create the nErgy in the workplace.'
    },
    {
      q: 'What are the key features of Analytic Accounting in CRM systems?',
      a: 'CRM nErgy Analytic Accounting software analyzes costs linked to customer data to support predictive insights and more personalized interactions. By tracking sales, marketing, and customer satisfaction metrics, it helps improve the customer experience and strengthen retention. CRM nErgy tools to power your Business.'
    },
    {
      q: 'What are the benefits of using Analytic Accounting in CRM for businesses?',
      a: 'CRM nErgy Analytic Accounting gives businesses clearer insight into customer activity and financial performance, helping them make better decisions and improve satisfaction. Through detailed data analysis, companies can forecast customer behavior, refine marketing strategies, and identify new sales opportunities. We Are the nErgy in Teamwork make the CRM work!'
    },
    {
      q: 'How does Analytic Accounting in CRM improve financial decision-making?',
      a: 'CRM nErgy’s Analytic Accounting provides a clearer view of financial health, helping businesses make stronger financial decisions, improve operational efficiency, and plan more strategically. It also supports faster, more proactive responses to market changes. CRM nErgy, keeping your team together and motivated'
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
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--web-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('Home')}</Link>
            <span>/</span>
            <Link to="/#features" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('CRM Features')}</Link>
            <span>/</span>
            <span style={{ color: '#6366f1', fontWeight: 700 }}>{t('Analytic Accounting ERP - CRM Features')}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/#features')}
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
            <span>{t('Back to 23 Features')}</span>
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
            <span>CRM SOLUTIONS EVERY BUSINESS NEEDS • ADVANCED ARTIFICIAL INTELLIGENCE</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            {t('Analytic Accounting ERP - CRM Features')}
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#6366f1',
            fontWeight: 700,
            margin: 0
          }}>
            {t('“Make AI Your Bestie”')}
          </p>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.65,
            maxWidth: '840px',
            margin: '0.5rem 0 0 0'
          }}>
            The CRM nErgy Analytic Accounting software within the ERP system evaluates customer-related costs, enabling predictive insights and more personalized interactions that improve customer experience and retention. It does this by tracking sales, marketing, and customer satisfaction metrics. By tracking financial data tied to specific projects or departments, businesses can strengthen financial oversight, improve decision-making, and drive better performance and profitability. This approach helps organizations make informed decisions based on comprehensive financial insights.
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
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)'
              }}
            >
              <Bot size={15} />
              <span>{t('Ask My Zunme AI')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Use CRM nErgy Analytic Accounting software? */}
      <section style={{ padding: '4rem 1.25rem 2rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6366f1', letterSpacing: '0.06em' }}>
            Multi-Dimensional Financial Telemetry
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
            Why Use CRM nErgy Analytic Accounting software?
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '1.5rem'
        }}>
          {pillars.map((p, idx) => {
            const Icon = p.icon;
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
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

      {/* Types of Businesses CRM nErgy Analytic Accounting Software Helps (Table Matrix) */}
      <section style={{ padding: '2rem 1.25rem 3rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--web-text-main)', margin: '0 0 6px 0' }}>
            Types of Businesses CRM nErgy Analytic Accounting Software Helps
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', maxWidth: '780px', margin: '0 auto' }}>
            Analytical CRM software can support a wide range of organizations by turning customer and operational data into clearer insights. Common use cases include:
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
            <div>{t('Business Type')}</div>
            <div>{t('How Analytical CRM Helps')}</div>
          </div>

          {businessTypes.map((b, idx) => (
            <div
              key={idx}
              className="website-responsive-table-grid"
              style={{
                padding: '14px 18px',
                borderBottom: idx === businessTypes.length - 1 ? 'none' : '1px solid var(--web-border)',
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

      {/* Key Analytical ERP Features for your Business */}
      <section style={{ padding: '0 1.25rem 3rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          padding: '1.5rem 1.75rem',
          borderRadius: '14px',
          background: 'rgba(99, 102, 241, 0.05)',
          border: '1px solid rgba(99, 102, 241, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            Key Analytical ERP Features for your Business
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
            Analytical ERP software helps accounting firms use client data to improve decisions, streamline daily operations, and strengthen client relationships. The most useful features typically fall into these areas: The Analytic Accounting feature in CRM nErgy’s software is essential for businesses that want stronger financial tracking and reporting to support more informed strategic decisions.
          </p>
        </div>
      </section>

      {/* Branding and Customization Section */}
      <section style={{ padding: '0 1.25rem 3rem 1.25rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(2, 132, 199, 0.04) 100%)',
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
              color: '#6366f1',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: 'rgba(99, 102, 241, 0.1)',
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
                background: '#6366f1',
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
          borderLeft: '4px solid #6366f1',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6366f1', letterSpacing: '0.06em' }}>
            White Label CRM Software for Analytic Accounting
          </span>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            Build & Promote Your Brand with the White Label CRM or ERP Software
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0, maxWidth: '1050px' }}>
            CRM nErgy White Label CRM software offers features like customizable branding, client portals, sales automation, marketing automation, and project management tools. These platforms allow businesses to rebrand and resell the CRM while providing a tailored experience for their clients.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '0.5rem', borderTop: '1px solid var(--web-border)' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#6366f1' }}>
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
                background: '#6366f1',
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
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Analytic Accounting & Financial Telemetry FAQs
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
              Frequently Asked Questions for Analytic Accounting
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
                      color: '#6366f1',
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
        </div>
      </section>

    </div>
  );
};
