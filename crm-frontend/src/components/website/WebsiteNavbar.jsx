import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Bot,
  MessageSquare,
  Sun,
  Moon,
  LogIn,
  ArrowRight,
  ShieldCheck,
  Globe,
  ExternalLink,
  Layers,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../common/LanguageToggle';
import { AiEnergyLogo } from '../common/AiEnergyLogo';
import {
  CRM_FEATURES_DATA,
  CRM_SOLUTIONS_DATA,
  INDUSTRIES_DATA
} from '../../data/websiteNavData';
import { getLoginUrl, getSignupUrl, getOalUrl } from '../../config/portalConfig';

export const WebsiteNavbar = ({
  onOpenZunme,
  onOpenSales,
  onOpenSignup,
  onSelectItem,
  activeSection = ''
}) => {
  const { theme, toggleTheme } = useTheme();
  const { language, t } = useLanguage();
  const isEs = language === 'ES';
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(null); // 'features' | 'solutions' | 'industries' | 'more' | null
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const navRef = useRef(null);

  // Close mega-menus on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Prevent background page from scrolling while mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileDrawerOpen]);

  const toggleMenu = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const scrollToSection = (sectionId) => {
    setActiveMenu(null);
    setMobileDrawerOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFaq = () => scrollToSection('faqs');

  const handleLoginRedirect = () => {
    setActiveMenu(null);
    setMobileDrawerOpen(false);
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    setActiveMenu(null);
    setMobileDrawerOpen(false);
    if (onOpenSignup) {
      onOpenSignup();
    } else {
      navigate('/crm/signup');
    }
  };

  const handleCardClick = (item) => {
    setActiveMenu(null);
    setMobileDrawerOpen(false);
    if (item && item.route) {
      navigate(item.route);
      return;
    }
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  return (
    <header className="website-header-sticky" ref={navRef}>
      <div className="website-nav-inner">
        {/* Brand Block - Matching Reference Screenshot */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <AiEnergyLogo size={36} showText={false} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span className="website-brand-title" style={{
              fontSize: '17px',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              color: 'var(--web-text-main)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15
            }}>
              CRM nErgy
            </span>
            <span className="website-brand-tagline-ai" style={{
              fontSize: '10px',
              fontWeight: 800,
              color: '#22d3ee',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              lineHeight: 1.2
            }}>
              {isEs ? 'Inteligencia Artificial Avanzada' : 'Advanced Artificial Intelligence'}
            </span>
            <span className="website-brand-sub" style={{
              fontSize: '10.5px',
              fontWeight: 600,
              color: 'var(--web-text-muted)',
              lineHeight: 1.2
            }}>
              {isEs ? 'Soluciones CRM que Toda Empresa Necesita' : 'CRM Solutions Every Business Needs'}
            </span>
          </div>
        </div>

        {/* Desktop Main Navigation (Direct Section Page Routing) */}
        <nav className="website-main-nav">
          {/* 1. Features -> /features */}
          <button
            type="button"
            className={`website-nav-btn ${location.pathname === '/features' ? 'active' : ''}`}
            onClick={() => {
              setActiveMenu(null);
              navigate('/features');
            }}
          >
            <span>{isEs ? 'Características' : 'Features'}</span>
          </button>

          {/* 2. Solutions -> /solutions */}
          <button
            type="button"
            className={`website-nav-btn ${location.pathname === '/solutions' ? 'active' : ''}`}
            onClick={() => {
              setActiveMenu(null);
              navigate('/solutions');
            }}
          >
            <span>{isEs ? 'Soluciones' : 'Solutions'}</span>
          </button>

          {/* 3. Industries -> /industries */}
          <button
            type="button"
            className={`website-nav-btn ${location.pathname === '/industries' ? 'active' : ''}`}
            onClick={() => {
              setActiveMenu(null);
              navigate('/industries');
            }}
          >
            <span>{isEs ? 'Industrias' : 'Industries'}</span>
          </button>

          {/* 4. FAQs -> /faqs */}
          <button
            type="button"
            className={`website-nav-btn ${location.pathname === '/faqs' ? 'active' : ''}`}
            onClick={() => {
              setActiveMenu(null);
              navigate('/faqs');
            }}
          >
            <span>{isEs ? 'Preguntas Frecuentes' : 'FAQs'}</span>
          </button>

          {/* 5. Ask Best Friend – VA (Virtual Assistance) */}
          <button
            type="button"
            className="website-nav-btn website-cta-zunme"
            onClick={onOpenZunme}
            title={isEs ? 'Consultar a Mejor Amigo – Asistencia Virtual VA' : 'Ask Best Friend – VA (Virtual Assistance)'}
          >
            <Sparkles size={13} className="website-zunme-sparkle" style={{ color: '#4f46e5', flexShrink: 0, transition: 'color 0.2s ease' }} />
            <span className="website-va-full-label">{isEs ? 'Ask Best Friend – VA (Virtual Assistance)' : 'Ask Best Friend – VA (Virtual Assistance)'}</span>
            <span className="website-va-compact-label">{isEs ? 'Ask Best Friend – VA' : 'Ask Best Friend – VA'}</span>
            <span style={{ letterSpacing: '0.02em', fontWeight: 900, fontSize: '11px', flexShrink: 0, marginLeft: '2px' }}>&gt;&gt;</span>
          </button>

          {/* 6. SALES - chat zBox */}
          <button
            type="button"
            className="website-nav-btn website-btn-sales"
            onClick={onOpenSales}
            title="Open Sales Consultation chat zBox"
          >
            <MessageSquare size={13} />
            <span>{isEs ? 'VENTAS' : 'SALES'}</span>
          </button>

          {/* 7. MORE */}
          <button
            type="button"
            className={`website-nav-btn ${activeMenu === 'more' ? 'active' : ''}`}
            onClick={() => toggleMenu('more')}
            aria-expanded={activeMenu === 'more'}
          >
            <span>{isEs ? 'MÁS' : 'MORE'}</span>
            <ChevronDown size={13} style={{
              transform: activeMenu === 'more' ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease'
            }} />
          </button>
        </nav>

        {/* Right Side Controls: Language Switcher, Theme Toggle, Login & Sign Up */}
        <div className="website-header-right-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* 1-Click English ↔ Spanish Language Selector */}
          <div style={{ flexShrink: 0 }}>
            <LanguageToggle />
          </div>

          {/* DISTINCT [ Login / Create Account ] ACTION PILL (Matching Client Reference) */}
          <div className="website-header-account-pill" style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--web-surface-card)',
            border: '1px solid var(--web-border)',
            borderRadius: '9px',
            padding: '2px 4px',
            gap: '3px',
            boxShadow: 'var(--web-box-shadow-card)',
            flexShrink: 0
          }}>
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="website-signin-btn website-header-login-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--web-text-main)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '6px',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={isEs ? 'Iniciar Sesión en el Portal' : 'Login to Portal'}
            >
              <LogIn size={13} style={{ color: '#22d3ee' }} />
              <span>{isEs ? 'Iniciar Sesión' : 'Login'}</span>
            </button>
            <span style={{ color: 'var(--web-border-strong)', fontWeight: 300, fontSize: '12px' }}>/</span>
            <button
              type="button"
              onClick={handleSignupRedirect}
              className="website-signin-btn website-create-btn website-header-signup-btn"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 11px',
                fontSize: '12px',
                fontWeight: 800,
                borderRadius: '6px',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
              title={isEs ? 'Crear Nueva Cuenta' : 'Create New Account'}
            >
              <span>{isEs ? 'Crear Cuenta' : 'Create Account'}</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="website-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>






      {/* ======================================================== */}
      {/* 4. MORE DROPDOWN                                         */}
      {/* ======================================================== */}
      {activeMenu === 'more' && (
        <div style={{
          position: 'absolute',
          top: '72px',
          right: '80px',
          width: '280px',
          background: 'var(--web-surface)',
          border: '1px solid var(--web-border)',
          borderRadius: '12px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
          padding: '8px',
          zIndex: 95,
          animation: 'websiteMegaFadeIn 0.12s ease-out'
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--web-text-muted)',
            padding: '6px 10px',
            letterSpacing: '0.05em'
          }}>
            {t('Explore CRM nErgy')}
          </div>

          <div
            onClick={() => {
              setActiveMenu(null);
              navigate('/#about');
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--web-text-main)'
            }}
            className="hover:surface-secondary"
          >
            <ShieldCheck size={16} style={{ color: '#4f46e5' }} />
            <span>{t('Security & Compliance')}</span>
          </div>


          <div
            onClick={() => {
              setActiveMenu(null);
              onOpenSales();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--web-text-main)'
            }}
            className="hover:surface-secondary"
          >
            <MessageSquare size={16} style={{ color: '#0284c7' }} />
            <span>{t('Contact Executive Team')}</span>
          </div>

          <div
            onClick={() => {
              setActiveMenu(null);
              navigate('/login');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--web-text-main)',
              borderTop: '1px solid var(--web-border)',
              marginTop: '4px'
            }}
            className="hover:surface-secondary"
          >
            <LogIn size={16} style={{ color: '#0284c7' }} />
            <span>{t('Client Portal Login')}</span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MOBILE / TABLET SLIDE-OUT DRAWER                        */}
      {/* ======================================================== */}
      {mobileDrawerOpen && (
        <div className="website-mobile-drawer">
          <div className="website-drawer-backdrop" onClick={() => setMobileDrawerOpen(false)} />
          <div className="website-drawer-content">
            <div style={{
              padding: '1.25rem',
              borderBottom: '1px solid var(--web-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AiEnergyLogo size={28} showText={false} />
                <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--web-text-main)' }}>
                  CRM nErgy AI
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LanguageToggle />
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--web-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* 5. Ask Best Friend – VA (Virtual Assistance) */}
              <button
                type="button"
                className="website-cta-zunme"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenZunme();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px'
                }}
              >
                <Sparkles size={16} />
                <span>{isEs ? 'Ask Best Friend – VA (Virtual Assistance) >>' : 'Ask Best Friend – VA (Virtual Assistance) >>'}</span>
              </button>

              {/* 6. SALES */}
              <button
                type="button"
                className="website-btn-sales"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenSales();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '10px'
                }}
              >
                <MessageSquare size={16} />
                <span>{t('SALES — chat zBox')}</span>
              </button>

              <div style={{ height: '1px', background: 'var(--web-border)', margin: '8px 0' }} />

              {/* 1. Features */}
              <div
                onClick={() => {
                  setMobileDrawerOpen(false);
                  navigate('/features');
                }}
                style={{
                  padding: '10px 8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--web-text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{isEs ? 'Características' : 'Features'} (23)</span>
                <ArrowRight size={14} style={{ color: '#8b5cf6' }} />
              </div>

              {/* 2. Solutions */}
              <div
                onClick={() => {
                  setMobileDrawerOpen(false);
                  navigate('/solutions');
                }}
                style={{
                  padding: '10px 8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--web-text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{isEs ? 'Soluciones' : 'Solutions'} (4)</span>
                <ArrowRight size={14} style={{ color: '#0284c7' }} />
              </div>

              {/* 3. Industries */}
              <div
                onClick={() => {
                  setMobileDrawerOpen(false);
                  navigate('/industries');
                }}
                style={{
                  padding: '10px 8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--web-text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{isEs ? 'Industrias' : 'Industries'} (23)</span>
                <ArrowRight size={14} style={{ color: '#10b981' }} />
              </div>

              {/* 4. FAQs */}
              <div
                onClick={() => {
                  setMobileDrawerOpen(false);
                  navigate('/faqs');
                }}
                style={{
                  padding: '10px 8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--web-text-main)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{isEs ? 'Preguntas Frecuentes' : 'FAQs'}</span>
                <ArrowRight size={14} style={{ color: '#f97316' }} />
              </div>

              {/* 7. MORE */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'more' ? null : 'more')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 8px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--web-text-main)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>{isEs ? 'MÁS' : 'MORE'}</span>
                  <ChevronDown size={16} style={{
                    transform: mobileExpandedSection === 'more' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s'
                  }} />
                </button>
                {mobileExpandedSection === 'more' && (
                  <div style={{ paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div
                      onClick={() => {
                        setMobileDrawerOpen(false);
                        navigate('/#about');
                        const el = document.getElementById('about');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{ padding: '6px 8px', fontSize: '13px', color: 'var(--web-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <ShieldCheck size={15} style={{ color: '#4f46e5' }} />
                      <span>{t('Security & Compliance')}</span>
                    </div>
                    <div
                      onClick={() => {
                        setMobileDrawerOpen(false);
                        onOpenSales();
                      }}
                      style={{ padding: '6px 8px', fontSize: '13px', color: 'var(--web-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <MessageSquare size={15} style={{ color: '#0284c7' }} />
                      <span>{t('Contact Executive Team')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. FAQs */}
              <div
                onClick={() => {
                  setMobileDrawerOpen(false);
                  scrollToFaq();
                }}
                style={{
                  padding: '10px 8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--web-text-main)',
                  cursor: 'pointer'
                }}
              >
                {isEs ? 'Preguntas Frecuentes' : 'FAQs'}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--web-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleLoginRedirect}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid var(--web-border)',
                    color: 'var(--web-text-main)',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <LogIn size={15} />
                  <span>{isEs ? 'Iniciar Sesión en el Portal' : 'Login / Portal'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSignupRedirect}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{isEs ? 'Crear Cuenta' : 'Create Account'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
