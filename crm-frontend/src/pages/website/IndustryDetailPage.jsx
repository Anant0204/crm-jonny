import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INDUSTRIES_DATA } from '../../data/websiteNavData';
import { INDUSTRY_CLIENT_DETAILS } from '../../data/industryDetailsData';
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
  Car,
  Building,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Tv,
  Landmark,
  HeartPulse,
  Shield,
  Layers,
  ChevronRight,
  TrendingUp,
  Clock,
  Palette
} from 'lucide-react';

// Normalization map to map any URL variant to the primary data key
const SLUG_ALIASES = {
  'automotive': 'automotive',
  'construction': 'construction',
  'consulting': 'consulting-firms',
  'consulting-firms': 'consulting-firms',
  'e-commerce': 'e-commerce',
  'ecommerce': 'e-commerce',
  'education': 'education',
  'entertainment': 'entertainment',
  'financial-services': 'financial-services',
  'financial': 'financial-services',
  'financial-service': 'financial-services',
  'healthcare': 'healthcare',
  'healthcare-services': 'healthcare',
  'hospitality': 'hospitality',
  'insurance': 'insurance',
  'professional-services': 'professional-services'
};

// Fallback icon resolver
const ICON_BY_SLUG = {
  'automotive': Car,
  'construction': Building,
  'consulting-firms': Briefcase,
  'e-commerce': ShoppingCart,
  'education': GraduationCap,
  'entertainment': Tv,
  'financial-services': Landmark,
  'healthcare': HeartPulse,
  'hospitality': Compass,
  'insurance': Shield,
  'professional-services': Building2
};

export const IndustryDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { onOpenZunme, onOpenSales } = useOutletContext() || {};
  const { t, isEs } = useLanguage();

  const [openFaq, setOpenFaq] = useState(null);

  // Normalize slug to match canonical key
  const canonicalKey = useMemo(() => {
    if (!slug) return 'automotive';
    const lower = slug.toLowerCase();
    return SLUG_ALIASES[lower] || lower;
  }, [slug]);

  // Retrieve industry config from nav data and enriched details
  const navItem = useMemo(() => {
    return INDUSTRIES_DATA.find(i => i.id === canonicalKey) || INDUSTRIES_DATA[1];
  }, [canonicalKey]);

  const clientDetail = useMemo(() => {
    return INDUSTRY_CLIENT_DETAILS[canonicalKey] || null;
  }, [canonicalKey]);

  const IconComponent = navItem?.icon || ICON_BY_SLUG[canonicalKey] || Building2;

  // Toggle FAQ accordion item
  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  // Safe data extraction
  const pageTitle = clientDetail?.title || navItem?.name || 'Industry Solution';
  const pageTagline = clientDetail?.tagline || 'CRM Solutions Every Business Needs';
  const pageOverview = clientDetail?.overview || navItem?.desc || '';
  const subSectors = clientDetail?.subSectors || [];
  const capabilities = clientDetail?.capabilities || [];
  const faqs = clientDetail?.faqs || [];

  return (
    <div style={{
      backgroundColor: 'var(--web-bg)',
      color: 'var(--web-text-main)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* ======================================================== */}
      {/* 1. BREADCRUMB & BACK HEADER                              */}
      {/* ======================================================== */}
      <section style={{
        padding: '1.25rem clamp(1rem, 4vw, 2rem)',
        borderBottom: '1px solid var(--web-border)',
        backgroundColor: 'var(--web-surface)'
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
          {/* Breadcrumb path */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--web-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>
              {t('Home')}
            </Link>
            <ChevronRight size={14} />
            <Link to="/#industries" style={{ color: 'var(--web-text-muted)', textDecoration: 'none' }}>
              {t('Industries')}
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: '#10b981', fontWeight: 600 }}>{pageTitle}</span>
          </div>

          {/* Quick back button */}
          <button
            onClick={() => navigate('/#industries')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid var(--web-border)',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--web-text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={14} />
            {t('All 23 Industries')}
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section style={{
        padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(180deg, var(--web-surface) 0%, var(--web-bg) 100%)',
        borderBottom: '1px solid var(--web-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient glow accent */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '960px' }}>
            {/* Badges row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 800,
                color: '#10b981',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                <IconComponent size={14} />
                {pageTagline}
              </span>

              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#4f46e5',
                background: 'rgba(79, 70, 229, 0.08)',
                border: '1px solid rgba(79, 70, 229, 0.2)',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                {t('Advanced Artificial Intelligence')}
              </span>

              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                {t('“Make AI Your Friend”')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 4.5vw, 44px)',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 1.25rem 0',
              color: 'var(--web-text-main)'
            }}>
              CRM nErgy for the <span style={{
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{pageTitle}</span>
            </h1>

            {/* Overview Paragraph from Client Spec */}
            <p style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              lineHeight: 1.7,
              color: 'var(--web-text-muted)',
              margin: '0 0 2rem 0',
              maxWidth: '860px'
            }}>
              {pageOverview}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenSales && onOpenSales()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <span>{t('Contact Us')}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onOpenSales && onOpenSales()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--web-surface)',
                  color: 'var(--web-text-main)',
                  border: '1px solid var(--web-border)',
                  borderRadius: '10px',
                  padding: '12px 22px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              >
                <Sparkles size={16} color="#f59e0b" />
                <span>{t('Start FREE 90-Day Trial')}</span>
              </button>

              {onOpenZunme && (
                <button
                  onClick={onOpenZunme}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'transparent',
                    color: '#4f46e5',
                    border: '1px solid rgba(79, 70, 229, 0.25)',
                    borderRadius: '10px',
                    padding: '12px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Bot size={15} />
                  <span>{t('ZUNME AI Studio')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SUB-SECTORS SERVED (CLIENT SPECIFICATION)             */}
      {/* ======================================================== */}
      {subSectors.length > 0 && (
        <section style={{
          padding: '2.5rem clamp(1rem, 4vw, 2rem)',
          backgroundColor: 'var(--web-surface)',
          borderBottom: '1px solid var(--web-border)'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t('Sectors & Business Types We Empower')}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0 0', color: 'var(--web-text-main)' }}>
                {t('Tailored Architectures for Every Segment of')} {pageTitle}
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {subSectors.map((sec, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--web-bg)',
                    border: '1px solid var(--web-border)',
                    borderRadius: '10px',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    flexShrink: 0
                  }}>
                    <Check size={14} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--web-text-main)' }}>
                    {sec}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. BRANDING & CUSTOMIZATION (CLIENT SIGNATURE SPEC)      */}
      {/* ======================================================== */}
      <section style={{
        padding: '3rem clamp(1rem, 4vw, 2rem)',
        backgroundColor: 'var(--web-bg)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '1px solid rgba(79, 70, 229, 0.2)',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#4f46e5',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(79, 70, 229, 0.12)',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                {t('Branding and Customization')}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>
                {t('“Make AI Your Friend”')}
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--web-text-main)',
              margin: 0,
              lineHeight: 1.3
            }}>
              {t('It’s Your Business, Displaying Your Brand, powered by CRM nErgy Software Customization')}
            </h2>

            <p style={{
              fontSize: '14px',
              color: 'var(--web-text-muted)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '1040px'
            }}>
              {t('The CRM nErgy drag-and-drop feature in customizable CRM software greatly enhances usability and efficiency, enabling users to customize their systems according to their specific business processes without requiring any coding skills. This functionality is crucial for contemporary CRM solutions, rendering them more flexible and user-friendly.')}
            </p>

            {/* Customization Capability Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              marginTop: '0.5rem'
            }}>
              <div style={{ padding: '12px 16px', background: 'var(--web-surface)', borderRadius: '10px', border: '1px solid var(--web-border)' }}>
                <Sliders size={18} color="#4f46e5" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)' }}>Zero-Code Workflows</div>
                <div style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>Drag-and-drop form and stage designer</div>
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--web-surface)', borderRadius: '10px', border: '1px solid var(--web-border)' }}>
                <Palette size={18} color="#10b981" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)' }}>Custom Brand Identity</div>
                <div style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>Logos, custom domain, and corporate palettes</div>
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--web-surface)', borderRadius: '10px', border: '1px solid var(--web-border)' }}>
                <Layers size={18} color="#06b6d4" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)' }}>Role-Based Portals</div>
                <div style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>Client, vendor, and staff interfaces</div>
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--web-surface)', borderRadius: '10px', border: '1px solid var(--web-border)' }}>
                <Bot size={18} color="#f59e0b" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)' }}>AI Agents Embedded</div>
                <div style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>ZUNME automated dispatch & sentiment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CAPABILITIES GRID (CLIENT SPEC - ALL USE CASES)      */}
      {/* ======================================================== */}
      <section style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)',
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {pageTitle} {t('Uses CRM nErgy Software To:')}
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '6px 0 10px 0' }}>
              {t('Core Operational Capabilities & Enterprise Workflows')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
              {t('Explore how organizations across this sector deploy CRM nErgy to replace legacy fragmentation and drive peak performance.')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}>
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--web-bg)',
                  border: '1px solid var(--web-border)',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <CheckCircle2 size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>
                    Capability #{idx + 1}
                  </span>
                  <p style={{
                    fontSize: '13.5px',
                    fontWeight: 500,
                    lineHeight: 1.55,
                    color: 'var(--web-text-main)',
                    margin: 0
                  }}>
                    {cap}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHITE LABEL & OPERATIONAL IMPACT (CLIENT EXACT TEXT)  */}
      {/* ======================================================== */}
      <section style={{
        padding: '3rem clamp(1rem, 4vw, 2rem)',
        backgroundColor: 'var(--web-bg)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {/* White Label Box */}
          <div style={{
            backgroundColor: 'var(--web-surface)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#4f46e5',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                {t('Reseller & Agency Platform')}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                {t('Build & Promote Your Brand with the White Label CRM or ERP Software')}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {t('CRM nErgy White Label CRM or ERP software includes customizable branding, client portals, sales and marketing automation, project management tools and much more. These platforms help businesses create new revenue streams by reselling the CRM solution under their own brand.')}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenSales && onOpenSales()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <span>{t('Explore White Label Tiers')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Centralized Impact Box */}
          <div style={{
            backgroundColor: 'var(--web-surface)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#10b981',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                {t('Unified Single-Pane Architecture')}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                {t('Centralized Intelligence & Operational Cohesion')}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {t('By centralizing customer and industry information, CRM nErgy software helps these businesses improve communication, increase efficiency, and deliver a more consistent customer experience.')}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 16px',
              background: 'rgba(16, 185, 129, 0.08)',
              borderRadius: '10px'
            }}>
              <ShieldCheck size={24} color="#10b981" />
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--web-text-main)' }}>
                {t('Complete Data Privacy, Audit Trails, and Role Permissions Built-In')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. VERIFIED CLIENT FAQS ACCORDION                        */}
      {/* ======================================================== */}
      <section style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)',
        backgroundColor: 'var(--web-surface)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t('Common Inquiries')}
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '6px 0 8px 0' }}>
              {t('Frequently Asked Questions')} — {pageTitle}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--web-text-muted)' }}>
              {t('Detailed answers from our solution architects regarding implementation and capabilities.')}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--web-bg)',
                    border: isOpen ? '1px solid #10b981' : '1px solid var(--web-border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--web-text-main)'
                    }}
                  >
                    <span style={{ fontSize: '14.5px', fontWeight: 700, lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      color={isOpen ? '#10b981' : 'var(--web-text-muted)'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 20px 20px 20px',
                      borderTop: '1px solid var(--web-border)',
                      paddingTop: '16px'
                    }}>
                      <p style={{
                        fontSize: '13.5px',
                        lineHeight: 1.7,
                        color: 'var(--web-text-muted)',
                        margin: '0 0 12px 0'
                      }}>
                        {faq.a}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => onOpenSales && onOpenSales()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                            borderRadius: '6px',
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#10b981',
                            cursor: 'pointer'
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>{t('Contact Sales Team')}</span>
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

      {/* ======================================================== */}
      {/* 8. BROWSE OTHER INDUSTRIES CAROUSEL                      */}
      {/* ======================================================== */}
      <section style={{
        padding: '2.5rem clamp(1rem, 4vw, 2rem)',
        backgroundColor: 'var(--web-bg)',
        borderBottom: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t('Cross-Industry Coverage')}
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--web-text-main)', margin: '2px 0 0 0' }}>
                {t('Explore Other Industry Frameworks')}
              </h3>
            </div>
            <Link to="/#industries" style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', textDecoration: 'none' }}>
              {t('View All 23 Industries')} →
            </Link>
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '8px'
          }}>
            {INDUSTRIES_DATA.filter(i => i.id !== canonicalKey && i.id !== 'ind-home').slice(0, 10).map((ind) => {
              const IndIcon = ind.icon || Building2;
              return (
                <button
                  key={ind.id}
                  onClick={() => ind.route ? navigate(ind.route) : navigate(`/industries/${ind.id}`)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'var(--web-surface)',
                    border: '1px solid var(--web-border)',
                    borderRadius: '20px',
                    color: 'var(--web-text-main)',
                    fontSize: '12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <IndIcon size={14} color="#10b981" />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. BOTTOM CONVERSION CTA BANNER                          */}
      {/* ======================================================== */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem)',
        backgroundColor: 'var(--web-surface)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '20px',
            padding: '4px 14px',
            marginBottom: '1rem'
          }}>
            <Sparkles size={14} color="#10b981" />
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t('Make AI Your Friend')}
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 36px)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            margin: '0 0 1rem 0',
            color: 'var(--web-text-main)'
          }}>
            {t('Ready to Supercharge Your')} {pageTitle} {t('Operations?')}
          </h2>

          <p style={{
            fontSize: '15px',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            margin: '0 auto 2rem auto',
            maxWidth: '620px'
          }}>
            {t('Join innovative organizations leveraging CRM nErgy AI to automate workflows, delight customers, and drive recurring revenue. Free 90-day trial with full feature access.')}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenSales && onOpenSales()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
              }}
            >
              <span>{t('Start FREE 90-Day Trial')}</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onOpenSales && onOpenSales()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--web-surface)',
                color: 'var(--web-text-main)',
                border: '1px solid var(--web-border)',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={16} />
              <span>{t('Contact Sales Team')}</span>
            </button>
          </div>

          <div style={{ marginTop: '2rem', fontSize: '12px', fontWeight: 600, color: 'var(--web-text-muted)' }}>
            CRM, We create the nErgy in the workplace.
          </div>
        </div>
      </section>
    </div>
  );
};
