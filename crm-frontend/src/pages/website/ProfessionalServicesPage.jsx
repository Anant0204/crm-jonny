import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Clock,
  TrendingUp,
  Cpu,
  HelpCircle,
  ArrowLeft,
  Bot,
  Briefcase,
  Scale,
  Calculator,
  Compass,
  FileCheck,
  Headphones,
  Sliders,
  DollarSign,
  Palette,
  Users,
  Target
} from 'lucide-react';

export const ProfessionalServicesPage = () => {
  const navigate = useNavigate();
  const { onOpenZunme, onOpenSales } = useOutletContext() || {};
  const { t } = useLanguage();

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const businessTypes = [
    {
      type: 'Accounting Firms',
      support: 'Centralizes client records, financial details, deadlines, and compliance tasks.',
      icon: Calculator
    },
    {
      type: 'Law Firms',
      support: 'Organizes matters, client communications, documents, and billable activity.',
      icon: Scale
    },
    {
      type: 'Consulting Agencies',
      support: 'Tracks clients, engagements, projects, deliverables, and measurable results.',
      icon: Briefcase
    },
    {
      type: 'Engineering Companies',
      support: 'Coordinates project updates, timelines, technical deliverables, and team communication.',
      icon: Compass
    },
    {
      type: 'Architecture Firms',
      support: 'Manages design work, client feedback, revisions, approvals, and team collaboration.',
      icon: Building2
    },
    {
      type: 'IT Services',
      support: 'Handles service requests, support tickets, renewals, and project progress.',
      icon: Cpu
    },
    {
      type: 'Marketing Agencies',
      support: 'Tracks campaigns, client communication, performance metrics, approvals, and follow-ups.',
      icon: Target
    },
    {
      type: 'Healthcare Providers',
      support: 'Coordinates patient relationships, appointments, outreach, follow-ups, and compliance needs.',
      icon: Users
    }
  ];

  const whiteLabelBenefits = [
    {
      area: 'Custom Branding',
      help: 'Lets firms apply their logo, colors, and visual identity to the CRM.',
      icon: Palette
    },
    {
      area: 'Enhanced Client Experience',
      help: 'Creates a consistent, professional experience that supports client trust.',
      icon: ShieldCheck
    },
    {
      area: 'Cost-Effective',
      help: 'Reduces the need for extensive development resources, saving time and money.',
      icon: DollarSign
    },
    {
      area: 'Scalability',
      help: 'Easily adapts to the growing needs of a business, allowing for the addition of features as required.',
      icon: TrendingUp
    },
    {
      area: 'Revenue Generation',
      help: 'Agencies can resell the CRM under their brand, creating new revenue streams.',
      icon: Sparkles
    },
    {
      area: 'Focus on Core Services',
      help: 'Allows businesses to concentrate on their primary services rather than software development.',
      icon: Briefcase
    }
  ];

  const faqs = [
    {
      q: 'How does CRM software benefit accounting firms?',
      a: 'CRM nErgy software helps accounting firms centralize client information, improve communication, automate routine work, and protect sensitive financial data. These capabilities streamline workflows, improve service quality, and support stronger client retention. CRM, We create the nErgy in the room.'
    },
    {
      q: 'How should law firms select the right CRM software?',
      a: 'Law firms should choose CRM software that fits their workflows and growth goals, especially for client intake, relationship management, and automation. CRM nErgy is the right platform which provides support, improve client relationships and be practical for long-term use. We Are the nErgy in Teamwork make the CRM work!'
    },
    {
      q: 'Which CRM features are most useful for consulting agencies?',
      a: 'Consulting agencies benefit from CRM features for client and engagement tracking, project and task management, and resource planning. The CRM nErgy tools improve relationship management, streamline operations, and support stronger team collaboration. We Help You Create and Manage the nErgy In The workplace.'
    },
    {
      q: 'What are the main benefits of white label CRM software for professional services firms?',
      a: 'CRM nErgy White Label software lets professional services firms offer a branded platform, improve client engagement, and streamline operations. It also reduces development costs, allowing firms to focus more on their core services. We Are the nErgy in CRM, We Bring It Into the workplace.'
    },
    {
      q: 'How does white-label CRM software improve the client’s experience?',
      a: 'White Label CRM nErgy software lets agencies customize the platform with their own branding, creating a seamless and professional client experience. It also centralizes client interactions and project management, helping build trust and consistency. CRM, We create the nErgy in the room.'
    },
    {
      q: 'What customization options are available in white label CRM software for professional services?',
      a: 'CRM nErgy White Label platform offers custom logos, colors, domains, user interfaces, dashboards, and client portals. This helps firms match their brand and create a consistent client experience. We’re Here To Help You Elevate and Manage CRM nErgy In The workplace.'
    },
    {
      q: 'What are the key differences between Professional Services Automation and ERP software?',
      a: 'PSA software helps service businesses manage projects, resources, time, and billing, while ERP integrates broader functions such as accounting, procurement, and HR. PSA supports project profitability and client delivery; ERP manages overall operations.'
    },
    {
      q: 'How can Professional Services Automation improve project management for service firms?',
      a: 'PSA centralizes project management, time tracking, resources, and billing, improving visibility, efficiency, resource use, and profitability while reducing administrative work.'
    },
    {
      q: 'What industries benefit most from using ERP software for operations and finance?',
      a: 'Manufacturing, healthcare, retail, construction, and financial services use ERP to streamline operations, boost productivity, and improve financial management.'
    }
  ];

  const siblingIndustries = [
    { name: 'Consulting Firms', id: 'consulting-firms', desc: 'Billable hours & advisory' },
    { name: 'Financial Services', id: 'financial-services', desc: 'KYC & asset registries' },
    { name: 'Healthcare', id: 'healthcare', desc: 'HIPAA & patient scheduling' },
    { name: 'Construction', id: 'construction', desc: 'Jobsite bidding & subcontracts' },
    { name: 'Automotive', id: 'automotive', desc: 'Dealership & inventory sync' }
  ];

  const handleReadMoreClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('whitelabel-psa');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Breadcrumb Navigation Bar */}
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
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '12.5px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--web-text-muted)', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('Home')}</Link>
            <span>/</span>
            <Link to="/#industries" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>{t('Industries')}</Link>
            <span>/</span>
            <span style={{ color: '#0284c7', fontWeight: 700 }}>{t('Professional Service Firms')}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/#industries')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#0284c7',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            <ArrowLeft size={14} />
            <span>{t('Back to 23 Industries')}</span>
          </button>
        </div>
      </section>

      {/* 2. Hero Section: Professional Service Firms */}
      <section style={{
        padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1rem, 3vw, 1.25rem)',
        background: 'radial-gradient(ellipse at 50% -10%, rgba(2, 132, 199, 0.12) 0%, transparent 70%)',
        borderBottom: '1px solid var(--web-border)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '24px',
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            fontSize: 'clamp(11px, 2.5vw, 12.5px)',
            fontWeight: 700,
            color: '#0284c7'
          }}>
            <FileCheck size={14} style={{ color: '#0284c7' }} />
            <span>{t('CRM Solutions Every Business Needs')} &bull; {t('“Make AI Your Bestie”')}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--web-text-main)',
            margin: 0
          }}>
            {t('Professional Service Firms')}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            color: 'var(--web-text-main)',
            fontWeight: 600,
            lineHeight: 1.6,
            maxWidth: '860px',
            margin: 0
          }}>
            {t('CRM nErgy (PSA) software for Professional Services Automation helps manage projects, resources, and billing for accounting firms, law firms, consulting agencies, and engineering companies. This software is designed for product-centric businesses focusing on finance and operations.')}
          </p>

          {/* Action Button Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(2, 132, 199, 0.35)'
              }}
            >
              <MessageSquare size={16} />
              <span>{t('Contact Us')}</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={onOpenZunme}
              className="website-cta-zunme"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                fontSize: '14px'
              }}
            >
              <Bot size={17} style={{ color: '#fef08a' }} />
              <span>{t('Ask My Zunme — VA Assistant >>')}</span>
            </button>

            <a
              href="#whitelabel-psa"
              onClick={handleReadMoreClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '10px',
                background: 'var(--web-surface)',
                border: '1px solid var(--web-border)',
                color: 'var(--web-text-main)',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <span>{t('White Label CRM Overview')}</span>
              <ChevronDown size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Section: Why Choose CRM nErgy PSA */}
      <section style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 1.25rem)',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {t('Strategic Operating Framework')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
            {t('Why Choose CRM nErgy PSA')}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '680px', margin: '0 auto' }}>
            {t('Engineered specifically for expertise-driven practices requiring strict resource tracking and maximum client profitability.')}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '1.25rem'
        }}>
          {/* Card 1 */}
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(2, 132, 199, 0.1)',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Briefcase size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
              {t('Expertise & Project-Based Model')}
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
              {t('If your firm primarily sells expertise and operates on a project-based model.')}
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
              {t('Billable Hours & Consultant Availability')}
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
              {t('When you need to track billable hours and manage consultant availability.')}
            </p>
          </div>

          {/* Card 3 */}
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
              {t('Project Profitability & Resource Allocation')}
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
              {t('If your focus is on improving project profitability and resource allocation.')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Section: White Label CRM for Professional Services (Top Overview) */}
      <section style={{
        padding: '0 clamp(1rem, 3vw, 1.25rem) 3.5rem clamp(1rem, 3vw, 1.25rem)',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.06) 0%, rgba(99, 102, 241, 0.06) 100%)',
          border: '1px solid var(--web-border)',
          borderLeft: '4px solid #0284c7',
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
        }}>
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

          <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
            {t('White Label CRM for Professional Services')}
          </h3>

          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', lineHeight: 1.65, margin: 0, maxWidth: '1080px' }}>
            {t('White label CRM nErgy software allows businesses to offer a fully branded customer relationship management solutions without the need to develop their own software, enhancing client experience and retention. Agencies can also create new revenue by reselling the CRM or ERP under their own brand.')}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginTop: '0.5rem' }}>
            <a
              href="#whitelabel-psa"
              onClick={handleReadMoreClick}
              style={{
                color: '#0284c7',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none'
              }}
            >
              <span>{t('READ MORE >> continue on bottom page when click')}</span>
            </a>

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
      </section>

      {/* 5. Section: Professional Service Business Types Table */}
      <section style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 1.25rem)',
        backgroundColor: 'var(--web-surface-subtle)',
        borderTop: '1px solid var(--web-border)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t('CRM nErgy CRM Software for Professional Services')}
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
              {t('Professional Service Firms That Benefit from CRM nErgy Software')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '780px', margin: '0 auto', lineHeight: 1.6 }}>
              {t('CRM software helps service-based businesses centralize client information, track work, and coordinate communication. The following business types often rely on CRM nErgy systems to strengthen client service and simplify day-to-day operations.')}
            </p>
          </div>

          {/* 8 Business Types Table / Responsive Grid */}
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
            marginBottom: '1.75rem'
          }}>
            {/* Table Header */}
            <div
              className="website-responsive-table-grid website-responsive-table-header"
              style={{
                background: 'var(--web-surface-subtle)',
                borderBottom: '1px solid var(--web-border)',
                padding: '12px 18px',
                fontWeight: 800,
                fontSize: '12.5px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--web-text-main)'
              }}
            >
              <span>{t('Business Type')}</span>
              <span>{t('How CRM nErgy Supports Them')}</span>
            </div>

            {/* Table Rows */}
            {businessTypes.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="website-responsive-table-grid"
                  style={{
                    padding: '14px 18px',
                    borderBottom: idx === businessTypes.length - 1 ? 'none' : '1px solid var(--web-border)',
                    fontSize: '13.5px',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(2, 132, 199, 0.015)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(2, 132, 199, 0.1)',
                      color: '#0284c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={16} />
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--web-text-main)' }}>
                      {t(b.type)}
                    </span>
                  </div>
                  <div style={{ color: 'var(--web-text-muted)', lineHeight: 1.55 }}>
                    {t(b.support)}
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{
            fontSize: '13.5px',
            color: 'var(--web-text-muted)',
            textAlign: 'center',
            margin: '0 0 1.75rem 0',
            lineHeight: 1.6
          }}>
            {t('These firms utilize CRM nErgy systems to improve client relationships, enhance operational efficiency, and drive business growth.')}
          </p>

          {/* Section CTA Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            padding: '1rem',
            borderRadius: '12px',
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)'
          }}>
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} />
              <span>{t('“Make AI Your Bestie”')}</span>
            </span>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 20px',
                borderRadius: '8px',
                background: '#4f46e5',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={14} />
              <span>{t('Contact Us')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Section: White Label CRM Software for Professional Services */}
      <section id="whitelabel-psa" style={{
        padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1rem, 3vw, 1.25rem)',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {t('White Label CRM Software for Professional Services')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
            {t('Benefits of White Label CRM nErgy Software for Professional Service Industry')}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '820px', margin: '0 auto', lineHeight: 1.6 }}>
            {t('White label CRM nErgy software allows businesses to customize and brand a fully developed platform as their own, enhancing client experiences and building brand equity. CRM nErgy offers flexible, scalable solutions without extensive development resources.')}
          </p>
          <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', maxWidth: '820px', margin: '8px auto 0 auto', lineHeight: 1.6 }}>
            {t('White label CRM software gives professional services firms a ready-made platform they can brand as their own. CRM nErgy helps improve client experience, reduce development effort, and support growth without requiring a custom-built system.')}
          </p>
        </div>

        {/* 6 Key Benefits Table / Grid */}
        <div style={{
          background: 'var(--web-surface)',
          border: '1px solid var(--web-border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
          marginBottom: '2.5rem'
        }}>
          <div
            className="website-responsive-table-grid website-responsive-table-header"
            style={{
              background: 'var(--web-surface-subtle)',
              borderBottom: '1px solid var(--web-border)',
              padding: '12px 18px',
              fontWeight: 800,
              fontSize: '12.5px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--web-text-main)'
            }}
          >
            <span>{t('Benefit Area')}</span>
            <span>{t('How CRM nErgy Helps?')}</span>
          </div>

          {whiteLabelBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="website-responsive-table-grid"
                style={{
                  padding: '14px 18px',
                  borderBottom: idx === whiteLabelBenefits.length - 1 ? 'none' : '1px solid var(--web-border)',
                  fontSize: '13.5px',
                  backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(99, 102, 241, 0.015)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: '#4f46e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--web-text-main)' }}>
                    {t(item.area)}
                  </span>
                </div>
                <div style={{ color: 'var(--web-text-muted)', lineHeight: 1.55 }}>
                  {t(item.help)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Key Advantages */}
        <div style={{
          background: 'var(--web-surface-subtle)',
          border: '1px solid var(--web-border)',
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--web-text-main)', margin: '0 0 1rem 0', textAlign: 'center' }}>
            {t('Other Key Advantages')}
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Sliders size={16} />
                <span>{t('Flexibility')}</span>
              </span>
              <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', margin: 0, lineHeight: 1.55 }}>
                {t('Tailors CRMs to professional service needs.')}
              </p>
            </div>

            <div style={{
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Headphones size={16} />
                <span>{t('Technical Support')}</span>
              </span>
              <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', margin: 0, lineHeight: 1.55 }}>
                {t('Vendor help reduces internal troubleshooting.')}
              </p>
            </div>

            <div style={{
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Cpu size={16} />
                <span>{t('Integrations')}</span>
              </span>
              <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', margin: 0, lineHeight: 1.55 }}>
                {t('Tool connections extend CRM capabilities and make workflows smoother.')}
              </p>
            </div>
          </div>

          <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', textAlign: 'center', margin: '0 0 1.25rem 0', lineHeight: 1.6 }}>
            {t('With white label CRM nErgy software, professional services firms can work more efficiently, strengthen client relationships, and support business growth.')}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} />
              <span>{t('“Make AI Your Bestie”')}</span>
            </span>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 20px',
                borderRadius: '8px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={14} />
              <span>{t('Contact Us')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Section: Frequently Asked Questions (All 9 Client FAQs) */}
      <section style={{
        padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1rem, 3vw, 1.25rem)',
        backgroundColor: 'var(--web-surface)',
        borderTop: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t('Fact and Questions')}
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
              {t('Professional Service Firms FAQs (9 Questions)')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '640px', margin: '0 auto' }}>
              {t('Comprehensive guidance on Professional Services Automation (PSA), ERP differences, and white label deployment.')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid var(--web-border)',
                    borderRadius: '12px',
                    background: 'var(--web-surface)',
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
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '12px'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                      {t(faq.q)}
                    </span>
                    <ChevronDown size={18} style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      color: 'var(--web-text-muted)',
                      flexShrink: 0
                    }} />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.25rem 1.25rem 1.25rem',
                      fontSize: '13.5px',
                      color: 'var(--web-text-muted)',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--web-border)',
                      paddingTop: '0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      <p style={{ margin: 0 }}>{t(faq.a)}</p>
                      <div>
                        <button
                          type="button"
                          onClick={onOpenSales}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            background: '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>{t('Contact US')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Sibling Industries & Directory Links */}
      <section style={{
        padding: '3rem 1.25rem',
        backgroundColor: 'var(--web-surface-subtle)',
        borderTop: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                {t('Explore Other Industry Frameworks')}
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--web-text-muted)' }}>
                {t('CRM nErgy provides 23 tailored sector operating modules.')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/#industries')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--web-surface)',
                border: '1px solid var(--web-border)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: 'var(--web-text-main)',
                cursor: 'pointer'
              }}
            >
              <span>{t('View All 23 Industries')}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '12px'
          }}>
            {siblingIndustries.map((sib, sIdx) => (
              <div
                key={sIdx}
                onClick={() => navigate('/#industries')}
                style={{
                  background: 'var(--web-surface)',
                  border: '1px solid var(--web-border)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)', display: 'block' }}>
                    {t(sib.name)}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>
                    {t(sib.desc)}
                  </span>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--web-text-muted)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
