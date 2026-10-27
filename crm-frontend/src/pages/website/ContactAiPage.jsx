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
  Headphones,
  PhoneCall,
  Zap,
  Clock,
  Sliders,
  Users
} from 'lucide-react';

export const ContactAiPage = () => {
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
      q: 'What are the cost savings of implementing an AI call center for businesses?',
      a: 'By eliminating labor costs and cutting operational overhead, implementing an AI call center to work for you can result in cost savings of 50% to 85% when compared to traditional call centers. CRM nErgy AI call centers, for instance, can charge as little as $0.09 per minute, which is substantially less than the expenses related to using human agents.'
    },
    {
      q: 'How does an AI call center improve customer satisfaction compared to traditional call centers?',
      a: 'While traditional call centers frequently rely on static phone trees and manual processes that result in longer hold times and generic responses, CRM nErgy AI call centers improve customer satisfaction by lowering wait times through intelligent call routing, personalizing every interaction using caller history, and delivering consistent accuracy with real-time data retrieval.'
    },
    {
      q: 'What are the potential challenges of integrating AI call centers into existing business operations?',
      a: 'Lack of technical know-how, employee resistance to change, high implementation costs, and problems with data availability and quality are some of the possible obstacles to integrating AI call centers. Furthermore, a lot of AI projects fail because of unclear objectives and inadequate staff training. CRM nErgy AI call centers have the potential to greatly improve overall business performance, customer satisfaction, and operational efficiency.'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Automation of Routine Tasks',
      points: [
        {
          label: 'Efficiency',
          desc: 'AI technology can handle repetitive tasks, such as addressing frequently asked questions and managing simple requests. This reduces the workload for human agents.'
        },
        {
          label: 'Faster Service',
          desc: 'By managing routine inquiries, AI enhances the overall speed of service, leading to quicker response times.'
        }
      ]
    },
    {
      icon: PhoneCall,
      title: 'Improved Call Routing',
      points: [
        {
          label: 'Smart Routing',
          desc: 'AI systems analyze customer data and incoming calls to direct inquiries to the most suitable agent. This minimizes waiting times and ensures that clients are promptly connected to the right individual.'
        },
        {
          label: 'Enhanced Customer Experience',
          desc: 'Issues are resolved more swiftly, and effective call routing contributes to increased customer satisfaction.'
        }
      ]
    },
    {
      icon: Users,
      title: 'Enhanced Customer Interactions',
      points: [
        {
          label: 'Personalization',
          desc: 'AI can evaluate customer interactions and generate tailored responses based on historical behaviors and individual preferences, leading to a more personalized experience.'
        },
        {
          label: 'Real-Time Support',
          desc: 'By offering pertinent information and recommendations to human agents during calls, AI tools can enhance the quality of service.'
        }
      ]
    },
    {
      icon: Headphones,
      title: 'Focus on Complex Issues',
      points: [
        {
          label: 'Agent Support',
          desc: 'You can apply AI to manage routine tasks while human agents are able to dedicate their attention to more complex customer matters, thereby enhancing customer satisfaction and problem resolution.'
        },
        {
          label: 'Higher Satisfaction Rates',
          desc: 'By allowing agents to focus on high-value interactions, businesses can foster greater customer loyalty and retention.'
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
            <span style={{ color: '#0284c7', fontWeight: 700 }}>{t('Contact AI')}</span>
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
            const isActive = item.name === 'Contact AI';
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
            <Bot size={15} />
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
            {t('Contact AI - Call Center')}
          </h1>

          <p style={{
            fontSize: '16.5px',
            lineHeight: 1.65,
            color: 'var(--web-text-muted)',
            maxWidth: '820px',
            margin: 0
          }}>
            {t('CRM nErgy Contact AI Call Center software promotes the adoption of AI call centers by businesses to automate standard tasks, optimize call routing, and improve customer interactions, resulting in quicker service and increased customer satisfaction. Furthermore, AI can support human agents by managing repetitive inquiries, enabling them to concentrate on more intricate problems.')}
          </p>

          {/* Key Stat Cards: $0.09/min & 50%-85% Cost Reduction */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            width: '100%',
            maxWidth: '780px',
            marginTop: '1rem'
          }}>
            <div style={{
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
            }}>
              <span style={{ fontSize: '32px', fontWeight: 900, color: '#0284c7', lineHeight: 1 }}>
                $0.09 / min
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)', marginTop: '6px' }}>
                {t('Ultra-Low Call Rates')}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--web-text-muted)', textAlign: 'center', marginTop: '2px' }}>
                {t('Substantially less than human agent expenses')}
              </span>
            </div>

            <div style={{
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
            }}>
              <span style={{ fontSize: '32px', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>
                50% – 85%
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)', marginTop: '6px' }}>
                {t('Operational Cost Savings')}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--web-text-muted)', textAlign: 'center', marginTop: '2px' }}>
                {t('Eliminate overhead vs traditional call centers')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
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
                {t('Zero-code custom business workflows')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                {t('Intelligent caller data mapping and phone tree design')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                {t('Instant real-time dispatch and automated ticketing')}
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

      {/* Benefits of Using an AI Call Center */}
      <section style={{
        padding: '4.5rem 1.25rem',
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#0284c7', letterSpacing: '0.08em' }}>
              {t('Enterprise AI Telephony')}
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--web-text-main)', margin: '6px 0 12px 0', letterSpacing: '-0.02em' }}>
              {t('Benefits of Using an AI Call Center')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
              {t('Utilizing a CRM nErgy AI call center can significantly enhance customer satisfaction, operational efficiency, and overall business performance.')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '1.75rem'
          }}>
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
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
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                      {t(benefit.title)}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {benefit.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0284c7' }}>
                          {t(pt.label)}:
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
              “{t('Utilizing a CRM nErgy AI call center can significantly enhance customer satisfaction, operational efficiency, and overall business performance.')}”
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
              {t('Call Center Knowledge Base')}
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
            {t('Ready to transform your call center operations with CRM nErgy AI?')}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', margin: 0, maxWidth: '640px' }}>
            {t('Let’s Get Started. Deploy autonomous AI routing, cut support overhead by up to 85%, and deliver 24/7 client satisfaction.')}
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
