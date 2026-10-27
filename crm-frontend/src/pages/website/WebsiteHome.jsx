import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Bot,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  CheckCircle2,
  Lock,
  ChevronDown,
  Building2,
  DollarSign,
  TrendingUp,
  Boxes,
  HelpCircle,
  Move,
  LayoutDashboard,
  Bell,
  Users,
  Search,
  Cpu,
  Database,
  Network,
  RefreshCw,
  FileSearch,
  LogIn,
  Landmark,
  FolderKanban,
  ShoppingCart,
  Store,
  BookOpen,
  UserCheck,
  Factory,
  Sun,
  Moon
} from 'lucide-react';
import {
  CRM_FEATURES_DATA,
  CRM_SOLUTIONS_DATA,
  INDUSTRIES_DATA,
  FAQ_QUESTIONS_DATA
} from '../../data/websiteNavData';
import { getLoginUrl, getSignupUrl } from '../../config/portalConfig';

export const WebsiteHome = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isEs = language === 'ES';
  const { onOpenZunme, onOpenSales, onOpenSignup, onSelectItem } = useOutletContext() || {};

  const erpModules = [
    {
      id: 'analytic-accounting',
      name: 'Accounting',
      nameEs: 'Contabilidad',
      tag: 'Core Ledger',
      icon: Landmark,
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)',
      desc: 'Multi-dimensional cost centers, analytical journal ledger, and automated financial statements.',
      descEs: 'Centros de costos multidimensionales, libro diario analítico y balances financieros automatizados.',
      route: '/features/analytic-accounting'
    },
    {
      id: 'crm',
      name: 'CRM',
      nameEs: 'CRM',
      tag: 'Pipelines & Leads',
      icon: Users,
      color: '#4f46e5',
      bg: 'rgba(79, 70, 229, 0.1)',
      desc: 'Lead qualification staging, 360° contact history, and deal progression workflows.',
      descEs: 'Calificación de prospectos, historial 360° de contactos y flujo de cierre de negocios.',
      route: '/features/contact-management'
    },
    {
      id: 'hr',
      name: 'HR',
      nameEs: 'Recursos Humanos',
      tag: 'Talent & Payroll',
      icon: UserCheck,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      desc: 'Candidate onboarding, multi-tier staff records, shift scheduling, and salary calculation.',
      descEs: 'Incorporación de personal, expedientes de colaboradores, turnos y nómina de sueldos.',
      route: '/features/recruitment-onboarding'
    },
    {
      id: 'project',
      name: 'Project',
      nameEs: 'Proyectos',
      tag: 'Tasks & Sprints',
      icon: FolderKanban,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      desc: 'Interactive Gantt charts, Kanban workboards, milestone delivery, and client billing time.',
      descEs: 'Diagramas de Gantt, tableros Kanban, entrega por hitos y facturación por horas.',
      route: '/features/project-management'
    },
    {
      id: 'inventory',
      name: 'Inventory',
      nameEs: 'Inventario',
      tag: 'Warehousing',
      icon: Boxes,
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.1)',
      desc: 'Real-time multi-warehouse valuation, serial/lot tracking, barcode scanner, and replenishment.',
      descEs: 'Valoración multialmacén en tiempo real, trazabilidad por lotes, código de barras y reposición.',
      route: '/features/inventory-management'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      nameEs: 'Producción',
      tag: 'BOM & Assembly',
      icon: Factory,
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.1)',
      desc: 'Multi-level Bill of Materials (BOM), routings, shop floor management, and costing models.',
      descEs: 'Listas de materiales multinivel (BOM), rutas de fabricación, órdenes de planta y costeo.',
      route: '/features/manufacturing'
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      nameEs: 'Comercio Electrónico',
      tag: 'Digital Sales',
      icon: ShoppingCart,
      color: '#ec4899',
      bg: 'rgba(236, 72, 153, 0.1)',
      desc: 'Synchronized online product catalogs, B2B customer pricing, and merchant checkout gateways.',
      descEs: 'Catálogos de productos sincronizados, listas de precios B2B y pasarelas de pago digitales.',
      action: 'features'
    },
    {
      id: 'pdm',
      name: 'PDM',
      nameEs: 'Gestión de Producto (PDM)',
      tag: 'Data Management',
      icon: Layers,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.1)',
      desc: 'Product Data Management tracking technical specs, design revisions, and item master files.',
      descEs: 'Control de versiones técnicas, especificaciones de ingeniería y archivo maestro de artículos.',
      action: 'features'
    },
    {
      id: 'km',
      name: 'KM',
      nameEs: 'Conocimiento (KM)',
      tag: 'AI Knowledge Base',
      icon: BookOpen,
      color: '#14b8a6',
      bg: 'rgba(20, 184, 166, 0.1)',
      desc: 'Knowledge Management powered by Centralized AI RAG, corporate wikis, and SOP indexing.',
      descEs: 'Gestión del conocimiento impulsada por RAG centralizado, wikis y manuales operativos indexados.',
      action: 'faqs'
    },
    {
      id: 'pos',
      name: 'POS',
      nameEs: 'Punto de Venta (POS)',
      tag: 'Retail Checkout',
      icon: Store,
      color: '#f97316',
      bg: 'rgba(249, 115, 22, 0.1)',
      desc: 'Point of sale registers supporting touch terminals, receipt printing, and cashier shifts.',
      descEs: 'Terminales punto de venta táctiles, impresión de recibos y arqueo de turnos de caja.',
      action: 'features'
    },
    {
      id: 'trade',
      name: 'Trade',
      nameEs: 'Comercio Exterior',
      tag: 'Global Logistics',
      icon: Globe,
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)',
      desc: 'Import/export customs logistics, multimodal shipping, multi-currency invoicing, and tariffs.',
      descEs: 'Logística de importación/exportación, transporte multimodal, facturación multidivisa y aranceles.',
      action: 'solutions'
    },
    {
      id: 'more',
      name: 'More',
      nameEs: 'Más Módulos',
      tag: 'Ecosystem & AI',
      icon: Sparkles,
      color: '#d97706',
      bg: 'rgba(217, 119, 6, 0.1)',
      desc: 'ZUNME AI content generator, 23 vertical packs, lending marketplace, and extensible open APIs.',
      descEs: 'Estudio generativo de IA ZUNME, 23 paquetes sectoriales, mercado de préstamos y APIs abiertas.',
      action: 'features'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      {/* ======================================================== */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* 1. HERO SECTION — IMMERSIVE FUTURISTIC AI EXPERIENCE    */}
      {/* ======================================================== */}
      <section
        className="website-hero-section"
        style={{
          position: 'relative',
          padding: '3.25rem 1rem 2rem 1rem',
          backgroundImage: 'var(--web-hero-overlay), url("/ai-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          borderBottom: '1px solid var(--web-border)',
          overflow: 'hidden'
        }}
      >
        {/* CENTERED HERO CONTENT CONTAINER (ORIGINAL APPROVED ORDER RESTORED) */}
        <div className="hero-main-content-wrap" style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.15rem',
          position: 'relative',
          zIndex: 3
        }}>
          {/* AMBIENT 3D ROTATING ORB IN BACKGROUND ("bg mee yee ball lightt krke round krwa doo") */}
          <div className="hero-ambient-orb-bg" aria-hidden="true">
            <div className="hero-ambient-orb-halo" />
            <div className="hero-ambient-orb-rings-outer" />
            <div className="hero-ambient-orb-rings-inner" />
            <img
              src="/hero-ai-orb.jpg"
              alt="AI Energy Sphere Rotating Background"
              className="hero-ambient-orb-img"
              loading="eager"
            />
          </div>
          {/* Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid var(--web-border-strong)',
            fontSize: '12px',
            fontWeight: 800,
            color: 'var(--web-accent-cyan)',
            letterSpacing: '0.02em',
            boxShadow: '0 0 16px rgba(139, 92, 246, 0.2)'
          }}>
            <Sparkles size={14} style={{ color: '#22d3ee', flexShrink: 0 }} />
            <span>{t('Next-Gen AI-Powered Business Platform • “Make AI Your Bestie”')}</span>
          </div>

          {/* Approved Hero Message (Centered Horizontally with High Contrast) */}
          <blockquote
            className="ai-hero-quote"
            style={{
              fontSize: 'clamp(1.4rem, 2.9vw, 2.2rem)',
              fontWeight: 800,
              fontStyle: 'normal',
              lineHeight: 1.45,
              maxWidth: '1040px',
              textAlign: 'center',
              margin: '0.25rem auto 0 auto',
              padding: '0 1rem',
              borderLeft: 'none',
              letterSpacing: '0.005em',
              wordSpacing: '0.03em',
              color: 'var(--web-text-main)'
            }}
          >
            {t('“Delivering the most relevant CRM ERP software for your business to thrive and honing our AAI development to effectively prepare you to scale.”')}
          </blockquote>

          <p style={{
            fontSize: 'clamp(0.92rem, 1.6vw, 1.05rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.75,
            maxWidth: '780px',
            margin: '0 auto',
            textAlign: 'center',
            letterSpacing: '0.015em'
          }}>
            {t('A complete enterprise operating system combining all 23 core CRM features, 4 tailored solution frameworks, and 23 industry modules with the autonomous power of the ZUNME AI Studio.')}
          </p>

          {/* Centered CTA Buttons with Universal Neon Glow on Hover */}
          <div className="website-hero-cta-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {/* Primary Neon CTA Button (Matching Reference Image) */}
            <button
              type="button"
              onClick={onOpenZunme}
              className="neon-energy-btn hero-cta-zunme"
              title={isEs ? 'Consultar a Mejor Amigo – Asistencia Virtual VA' : 'Ask Best Friend – VA (Virtual Assistance)'}
            >
              <Sparkles size={16} style={{ color: '#fef08a', flexShrink: 0 }} />
              <span>{isEs ? 'Ask Best Friend – VA >>' : 'Ask Best Friend – VA >>'}</span>
              <ArrowRight size={16} className="btn-arrow-icon" style={{ flexShrink: 0 }} />
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('erp-showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="frosted-hero-btn"
            >
              <LayoutDashboard size={16} style={{ color: '#22d3ee', flexShrink: 0 }} />
              <span>{isEs ? 'Ver Suite de 12 Módulos' : 'See How It Works'}</span>
            </button>

            {/* SALES chat zBox Button */}
            <button
              type="button"
              onClick={onOpenSales}
              className="website-btn-sales"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Open Sales Consultation chat zBox"
            >
              <MessageSquare size={17} style={{ flexShrink: 0 }} />
              <span>{isEs ? 'VENTAS — chat zBox' : 'SALES — chat zBox'}</span>
            </button>
          </div>
        </div>


        {/* Floating Bottom Trust / Metric Bar (Matching Reference Screenshot) */}
        <div className="hero-trust-bar-container">
          <div className="hero-trust-bar">
            {/* 1. Core Modules */}
            <div className="hero-trust-item">
              <div className="hero-trust-icon-box">
                <Boxes size={18} />
              </div>
              <div>
                <div className="hero-trust-metric">12+ Modules</div>
                <div className="hero-trust-label">{isEs ? 'CRM y ERP Integrados' : 'Core Business Suite'}</div>
              </div>
            </div>

            {/* 2. Platform Uptime */}
            <div className="hero-trust-item">
              <div className="hero-trust-icon-box">
                <TrendingUp size={18} />
              </div>
              <div>
                <div className="hero-trust-metric">99.99%</div>
                <div className="hero-trust-label">{isEs ? 'Disponibilidad Continua' : 'Platform Uptime'}</div>
              </div>
            </div>

            {/* 3. Security */}
            <div className="hero-trust-item">
              <div className="hero-trust-icon-box">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="hero-trust-metric">{isEs ? 'Bóveda SHA-256' : 'Enterprise Vault'}</div>
                <div className="hero-trust-label">{isEs ? 'Aislamiento de Datos' : 'Security & Compliance'}</div>
              </div>
            </div>

            {/* 4. Industries */}
            <div className="hero-trust-item">
              <div className="hero-trust-icon-box">
                <Globe size={18} />
              </div>
              <div>
                <div className="hero-trust-metric">23+ Verticals</div>
                <div className="hero-trust-label">{isEs ? 'Sectores Especializados' : 'Tailored Industries'}</div>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. CRM/ERP PRODUCT SHOWCASE (MATCHING REFERENCE SCREENSHOT) */}
        {/* ======================================================== */}
        <div className="website-product-showcase-container" style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '2rem auto 0 auto',
          borderRadius: '18px',
          background: 'var(--web-surface-card)',
          border: '1px solid var(--web-border)',
          boxShadow: 'var(--web-box-shadow-card)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Ambient Glow Bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--web-primary), var(--web-accent-cyan), transparent)'
          }} />

          {/* Top Showcase Branding: CRM nErgy / "Make AI Your Bestie" */}
          <div className="website-product-showcase-header" style={{
            padding: '1.1rem 1.5rem',
            borderBottom: '1px solid var(--web-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            background: 'var(--web-surface-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                fontWeight: 900,
                color: 'var(--web-text-main)',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-display)'
              }}>
                CRM nErgy
              </span>

              {/* Ultra Modern Holographic "Make AI Your Bestie" Pill */}
              <div className="ai-bestie-tagline-container">
                <Sparkles size={14} style={{ color: '#22d3ee', flexShrink: 0 }} />
                <span className="ai-bestie-tagline-text">
                  “Make AI Your Bestie”
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--web-accent-emerald)',
                background: 'rgba(52, 211, 153, 0.12)',
                padding: '4px 12px',
                borderRadius: '16px',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                {isEs ? 'ERP5 Núcleo Activo' : 'CRM ERP Central Hub v4.2'}
              </span>
            </div>
          </div>

          {/* Central Product Preview UI (ERP & CRM High-Tech Dashboard) */}
          <div style={{
            padding: 'clamp(1rem, 2.5vw, 1.75rem)',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
          }}>
            {/* Search / Command Bar inside Preview */}
            <div className="website-preview-command-bar" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '12px',
              padding: '9px 15px',
              marginBottom: '1rem',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: 'min(220px, 100%)' }}>
                <Search size={15} style={{ color: '#22d3ee' }} />
                <span style={{ fontSize: '12.5px', color: 'var(--web-text-muted)', fontWeight: 500 }}>
                  {isEs ? 'Buscar módulos de contabilidad, prospectos, inventario o consultar a Bestie VA...' : 'Search enterprise ledgers, contacts, supply chain, or consult Bestie VA...'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--web-text-muted)', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Cpu size={13} style={{ color: '#8b5cf6' }} />
                  {isEs ? 'IA Operativa' : 'Neural Core: Active'}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Database size={13} style={{ color: '#34d399' }} />
                  {isEs ? 'Base Central' : 'Unified Database: Connected'}
                </span>
              </div>
            </div>

            {/* Central Dashboard Command Capabilities Grid */}
            <div className="website-preview-command-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              textAlign: 'left'
            }}>
              {/* Box 1: AI Lead Qualification */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '12px 15px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--web-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isEs ? 'Calificación con IA' : 'AI Lead Qualification'}
                  </span>
                  <TrendingUp size={14} style={{ color: '#22d3ee' }} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--web-text-main)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                  {isEs ? 'Puntuación y Etapas Inteligentes' : 'Intelligent Stage Scoring'}
                </div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '3px' }}>
                  {isEs ? 'Flujos automatizados de avance de prospectos' : 'Automated deal progression pipelines'}
                </div>
              </div>

              {/* Box 2: Connected ERP Modules */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '12px 15px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--web-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isEs ? 'Módulos ERP Unificados' : 'Connected ERP Modules'}
                  </span>
                  <Boxes size={14} style={{ color: '#8b5cf6' }} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--web-text-main)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                  {isEs ? 'Suite Operativa de 12 Módulos' : '12 Unified Operating Modules'}
                </div>
                <div style={{ fontSize: '11px', color: '#06b6d4', fontWeight: 600, marginTop: '3px' }}>
                  {isEs ? 'Libro mayor y logística en tiempo real' : 'Real-time ledger, inventory & accounting'}
                </div>
              </div>

              {/* Box 3: Vault Encryption */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '12px 15px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--web-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isEs ? 'Arquitectura de Seguridad' : 'Security Architecture'}
                  </span>
                  <ShieldCheck size={14} style={{ color: '#10b981' }} />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--web-text-main)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                  {isEs ? 'Aislamiento Multi-Inquilino' : 'Isolated Multi-Tenant Vault'}
                </div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '3px' }}>
                  {isEs ? 'Control de acceso empresarial y auditoría' : 'Enterprise role-based access governance'}
                </div>
              </div>
            </div>
          </div>

          {/* WIDE SUBTLY-TINTED MODULE STRIP UNDERNEATH PREVIEW WITH EXACTLY 6 CARDS */}
          {/* Matching Reference: Accounting, CRM, HR, Project, Inventory, Manufacturing */}
          <div style={{
            background: 'var(--web-surface-subtle)',
            borderTop: '1px solid var(--web-border)',
            padding: '1.25rem clamp(1rem, 2vw, 1.5rem)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.85rem'
            }}>
              <span style={{
                fontSize: '11.5px',
                fontWeight: 800,
                color: 'var(--web-primary)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                {isEs ? 'Módulos Iniciales de la Suite' : 'Core Enterprise Modules'}
              </span>
              <a
                href="#erp-showcase"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('erp-showcase');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--web-accent-cyan)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{isEs ? 'Ver los 12 Módulos →' : 'View All 12 Modules Suite →'}</span>
              </a>
            </div>

            {/* Exactly 6 Visible Module Cards in Initial Showcase Row */}
            <div className="website-showcase-modules-row" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px'
            }}>
              {erpModules.slice(0, 6).map((mod) => {
                const ModIcon = mod.icon;
                return (
                  <div
                    key={mod.id}
                    onClick={() => {
                      if (mod.route) navigate(mod.route);
                      else {
                        const el = document.getElementById('erp-showcase');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    style={{
                      background: 'var(--web-surface-card)',
                      border: '1px solid var(--web-border)',
                      borderRadius: '10px',
                      padding: '12px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: 'var(--web-box-shadow-card)'
                    }}
                    className="hover:scale-102 hover:border-cyan-400"
                    title={isEs ? mod.descEs : mod.desc}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(139, 92, 246, 0.12)',
                      color: mod.color || 'var(--web-accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--web-border)'
                    }}>
                      <ModIcon size={18} />
                    </div>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      color: 'var(--web-text-main)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2
                    }}>
                      {isEs ? mod.nameEs : mod.name}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      color: 'var(--web-text-muted)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      {mod.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. PRIMARY NAVIGATION BAR — POSITIONED DIRECTLY BENEATH   */}
        {/*    THE SHOWCASE AS SPECIFIED IN REFERENCE SCREENSHOT    */}
        {/* ======================================================== */}
        <div className="website-showcase-nav-bar">
          <div className="website-showcase-nav-inner">
            {/* 1. Features */}
            <button
              type="button"
              onClick={() => navigate('/features')}
              className="website-showcase-nav-btn hover:surface-secondary"
            >
              <span>{isEs ? 'Características' : 'Features'}</span>
            </button>

            {/* 2. Solutions */}
            <button
              type="button"
              onClick={() => navigate('/solutions')}
              className="website-showcase-nav-btn hover:surface-secondary"
            >
              <span>{isEs ? 'Soluciones' : 'Solutions'}</span>
            </button>

            {/* 3. Industries */}
            <button
              type="button"
              onClick={() => navigate('/industries')}
              className="website-showcase-nav-btn hover:surface-secondary"
            >
              <span>{isEs ? 'Industrias' : 'Industries'}</span>
            </button>

            {/* 4. FAQs */}
            <button
              type="button"
              onClick={() => navigate('/faqs')}
              className="website-showcase-nav-btn hover:surface-secondary"
            >
              <span>{isEs ? 'Preguntas Frecuentes' : 'FAQs'}</span>
            </button>

            {/* 5. Ask Best Friend – VA (Virtual Assistance) */}
            <button
              type="button"
              onClick={onOpenZunme}
              className="website-showcase-nav-btn website-cta-zunme website-showcase-va-btn"
              title={isEs ? 'Consultar a Mejor Amigo – Asistencia Virtual VA' : 'Ask Best Friend – VA (Virtual Assistance)'}
            >
              <Sparkles size={14} className="website-zunme-sparkle" style={{ color: '#fef08a', flexShrink: 0 }} />
              <span className="website-va-full-label">{isEs ? 'Ask Best Friend – VA (Virtual Assistance)' : 'Ask Best Friend – VA (Virtual Assistance)'}</span>
              <span className="website-va-compact-label">{isEs ? 'Ask Best Friend – VA' : 'Ask Best Friend – VA'}</span>
              <span style={{ fontWeight: 900, flexShrink: 0 }}>&gt;&gt;</span>
            </button>

            {/* 6. SALES */}
            <button
              type="button"
              onClick={onOpenSales}
              className="website-showcase-nav-btn website-btn-sales website-showcase-sales-btn"
              title="Open Sales Consultation chat eBox"
            >
              <MessageSquare size={14} style={{ flexShrink: 0 }} />
              <span>{isEs ? 'VENTAS' : 'SALES'}</span>
            </button>

            {/* 7. MORE */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="website-showcase-nav-btn hover:surface-secondary"
            >
              <span>{isEs ? 'MÁS' : 'MORE'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 1.5 CLIENT 12-MODULE SHOWCASE (Reference: ERP5 Architecture) */}
      {/* ======================================================== */}
      <section id="erp-showcase" className="website-section-container" style={{ paddingTop: '1.5rem', paddingBottom: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '20px',
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            fontSize: '11px',
            fontWeight: 800,
            color: '#c4b5fd',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.75rem',
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.2)'
          }}>
            <Boxes size={14} style={{ color: '#22d3ee' }} />
            <span>{isEs ? 'Núcleo Operativo Empresarial Unificado' : 'Unified Enterprise Operating Core'}</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            letterSpacing: '-0.02em',
            margin: '0 0 0.75rem 0'
          }}>
            {isEs ? '12 Módulos de Software CRM y ERP' : '12-Module Enterprise Software Suite'}
          </h2>

          <p style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            color: 'var(--web-text-muted)',
            maxWidth: '820px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            {isEs
              ? 'Adoptado a nivel mundial para aplicaciones empresariales críticas y escalables. Su innovadora Arquitectura Unificada reduce la complejidad de configuración y amplía la flexibilidad operativa.'
              : 'Adopted worldwide for scalable mission-critical enterprise applications. Its innovative Unified Architecture reduces complexity of configuration and increases operational flexibility.'}
          </p>
        </div>

        {/* 12 Modules Grid */}
        <div className="erp-modules-container-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          maxWidth: '1240px',
          margin: '0 auto'
        }}>
          {erpModules.map((mod) => {
            const ModIcon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => {
                  if (mod.route) navigate(mod.route);
                  else if (mod.action === 'features') navigate('/features');
                  else if (mod.action === 'faqs') navigate('/faqs');
                  else if (mod.action === 'solutions') navigate('/solutions');
                  else navigate(`/features/${mod.id}`);
                }}
                style={{
                  background: 'var(--web-surface-card)',
                  border: '1px solid var(--web-border)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: 'var(--web-box-shadow-card)',
                  backdropFilter: 'blur(12px)',
                  position: 'relative'
                }}
                className="erp-module-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    className="erp-module-icon"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(139, 92, 246, 0.14)',
                      color: mod.color || '#22d3ee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--web-border)',
                      boxShadow: '0 0 10px rgba(139, 92, 246, 0.15)'
                    }}
                  >
                    <ModIcon size={20} />
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#22d3ee',
                    letterSpacing: '0.05em',
                    background: 'rgba(34, 211, 238, 0.08)',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(34, 211, 238, 0.2)'
                  }}>
                    {mod.tag}
                  </span>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    color: 'var(--web-text-main)',
                    margin: '0 0 4px 0'
                  }}>
                    {isEs ? mod.nameEs : mod.name}
                  </h3>
                  <p style={{
                    fontSize: '12.5px',
                    color: 'var(--web-text-muted)',
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    {isEs ? mod.descEs : mod.desc}
                  </p>
                </div>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#22d3ee'
                }}>
                  <span>{isEs ? 'Ver Módulo' : 'Explore Module'}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SECTION: ABOUT & SECURITY ARCHITECTURE (#about)       */}
      {/* ======================================================== */}
      <section id="about" style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 1.25rem)',
        backgroundColor: 'var(--web-surface-subtle)',
        borderTop: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {t('Enterprise Governance')}
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 26px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 12px 0' }}>
            {t('Security, Resilience & High-Throughput Architecture')}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '680px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            {t('Designed for institutional-grade reliability, CRM nErgy implements strict tenant isolation, cryptographic vault storage, and granular role-based access control.')}
          </p>

          <div className="website-security-grid">
            <div style={{ background: 'var(--web-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--web-border)', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Lock size={20} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--web-text-main)', margin: '0 0 6px 0' }}>
                {t('Tenant Vault Isolation')}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--web-text-muted)', lineHeight: 1.5, margin: 0 }}>
                {t('Every corporate subscriber operates within an encrypted tenant boundary ensuring proprietary deal flows and employee data remain isolated.')}
              </p>
            </div>

            <div style={{ background: 'var(--web-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--web-border)', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Boxes size={20} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--web-text-main)', margin: '0 0 6px 0' }}>
                {t('Real-Time Synchronous Sync')}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--web-text-muted)', lineHeight: 1.5, margin: 0 }}>
                {t('Sub-second data replication across inventory, sales orders, leads, and accounting ledgers eliminates batch reconciliation delays.')}
              </p>
            </div>

            <div style={{ background: 'var(--web-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--web-border)', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={20} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--web-text-main)', margin: '0 0 6px 0' }}>
                {t('Audit-Ready Compliance')}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--web-text-muted)', lineHeight: 1.5, margin: 0 }}>
                {t('Immutable audit logging on every administrative action, contract signature, and banking transaction prepared for GAAP/IFRS reviews.')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteHome;
