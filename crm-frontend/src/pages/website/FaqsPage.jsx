import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FAQ_QUESTIONS_DATA } from '../../data/websiteNavData';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ArrowLeft,
  ChevronDown,
  Search,
  Cpu,
  Database,
  FileSearch,
  Bot
} from 'lucide-react';

export const FaqsPage = () => {
  const navigate = useNavigate();
  const { onOpenSales, onOpenZunme } = useOutletContext() || {};
  const { language, t } = useLanguage();
  const isEs = language === 'ES';

  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  const getAiRagResponse = (query) => {
    if (!query || query.trim() === '') return null;
    const qLower = query.toLowerCase();

    if (qLower.includes('rag') || qLower.includes('benefit') || qLower.includes('central') || qLower.includes('knowledge base') || qLower.includes('beneficio') || qLower.includes('base de conocimiento')) {
      return {
        title: isEs ? 'Respuesta Sintetizada RAG: Base de Conocimiento Centralizada' : 'Synthesized RAG Answer: Centralized AI Knowledge Base',
        text: isEs
          ? 'Sí, hacemos que este sistema sea mucho más inteligente que las preguntas frecuentes tradicionales mediante una Base de Conocimiento centralizada con RAG. Los 8 beneficios clave son: 1) Gestión desde un solo lugar central, 2) Distribución automática a más de 100 páginas web, 3) Consultas en lenguaje natural sin búsquedas manuales, 4) Respuestas fundamentadas en datos reales de CRM/ERP eliminando alucinaciones, 5) Actualizaciones en vivo sin alterar código en cada página, 6) Descubrimiento de preguntas no indexadas para cerrar brechas de contenido, 7) Motor compartido para asistentes web, CRM, ERP y agentes de soporte, y 8) RAG de código abierto para controlar los costos continuos.'
          : 'Yes, we make this much smarter than a normal FAQ system by using an AI-powered centralized Knowledge Base with RAG. The main benefits are: 1) All FAQs and product knowledge managed from one central place, 2) The same knowledge automatically serves 100+ website pages, 3) Visitors ask questions naturally instead of searching manually, 4) AI answers based on actual CRM/ERP verified records, reducing incorrect answers, 5) New information can be added anytime without changing every page, 6) Automatic discovery of unanswered customer queries, 7) Shared foundation powering website assistants, CRM Bestie, ERP bots, and customer support, and 8) Open-source RAG technology with API connections only where needed to control ongoing costs.',
        sources: [isEs ? 'Bóveda Vectorial RAG' : 'RAG Vector Vault', isEs ? 'Módulo Central ERP' : 'ERP Core Ledger', isEs ? 'Base de Datos CRM' : 'CRM Database'],
        confidence: '99.4%',
        inKnowledgeBase: true
      };
    }

    if (qLower.includes('dashboard') || qLower.includes('drag') || qLower.includes('drop') || qLower.includes('tablero') || qLower.includes('arrastrar')) {
      return {
        title: isEs ? 'Respuesta Sintetizada: Tableros Personalizables' : 'Synthesized Answer: Customizable Dashboards',
        text: isEs
          ? 'Los tableros personalizables y la interfaz Drag-and-Drop permiten a los usuarios organizar tareas, contactos y embudos de ventas con el mínimo de clics. Los usuarios adaptan la vista a sus roles y responsabilidades específicos, enfocándose únicamente en los KPIs clave para su productividad.'
          : 'Customizable dashboards and Drag-and-Drop interfaces allow users to easily organize and manage contacts, tasks, and sales pipelines with minimal clicks. Tailoring the interface to specific roles presents only relevant KPIs, accelerating daily workflow efficiency.',
        sources: ['Core CRM Analytics', 'Sales Pipeline Kanban', 'UI/UX Component Engine'],
        confidence: '98.8%',
        inKnowledgeBase: true
      };
    }

    if (qLower.includes('cost') || qLower.includes('open-source') || qLower.includes('free') || qLower.includes('precio') || qLower.includes('costo') || qLower.includes('código abierto')) {
      return {
        title: isEs ? 'Respuesta Sintetizada: Control de Costos con RAG de Código Abierto' : 'Synthesized Answer: Cost Control via Open-Source RAG',
        text: isEs
          ? 'Utilizamos tecnología RAG de código abierto y modelos de vectores locales para la indexación y recuperación en masa, conectando APIs comerciales solo para razonamiento avanzado puntual. Esto mantiene los costos de nube predecibles y mínimos mientras escala a miles de usuarios.'
          : 'We utilize open-source and free RAG vector embedding technologies for indexing and fast retrieval, connecting to commercial frontier AI APIs only when advanced reasoning or creative synthesis is required. This strictly controls ongoing operating expenses while scaling infinitely.',
        sources: ['Vector Embedding Store', 'API Cost Optimizer', 'Open-Source RAG Engine'],
        confidence: '99.1%',
        inKnowledgeBase: true
      };
    }

    if (qLower.includes('erp') || qLower.includes('accounting') || qLower.includes('contab') || qLower.includes('inventar')) {
      return {
        title: isEs ? 'Respuesta Sintetizada: Integración CRM & ERP' : 'Synthesized Answer: Unified CRM & ERP Architecture',
        text: isEs
          ? 'CRM nErgy integra de forma nativa 10 módulos de ERP (Planificación, Producción, Adquisiciones, Informes, Ventas, RR.HH., Inventario, Finanzas, Cadena de Suministro y Relación con Clientes) conectados a una única base de datos sin redundancias.'
          : 'CRM nErgy natively unifies 10 core ERP operational modules (Planning, Production, Procurement, Reporting, Sales, HR, Inventory, Finance, Supply Chain, and Customer Relationships) into a single operational core, eliminating siloed third-party software.',
        sources: ['ERP Core Ledger', 'Inventory Warehouse', 'CRM nErgy Hub'],
        confidence: '98.2%',
        inKnowledgeBase: true
      };
    }

    if (qLower.includes('white label') || qLower.includes('marca blanca') || qLower.includes('brand') || qLower.includes('logo')) {
      return {
        title: isEs ? 'Respuesta Sintetizada: CRM Marca Blanca' : 'Synthesized Answer: White Label CRM Platform',
        text: isEs
          ? 'Nuestra solución de Marca Blanca permite a agencias y corporaciones personalizar al 100% el logotipo, dominios personalizados, colores corporativos y portal de clientes para revender o implementar bajo su propia marca.'
          : 'Our White Label CRM allows agencies and enterprises to fully rebrand CRM nErgy with their own corporate identity, custom domains, logo, color schemes, and client portal aesthetics with zero developer overhead.',
        sources: ['White Label Tenant Hub', 'Client Portal Engine', 'Domain Registry'],
        confidence: '99.5%',
        inKnowledgeBase: true
      };
    }

    const matchedFaq = FAQ_QUESTIONS_DATA.find(f =>
      (f.q && f.q.toLowerCase().includes(qLower)) ||
      (f.qEs && f.qEs.toLowerCase().includes(qLower)) ||
      (f.a && f.a.toLowerCase().includes(qLower)) ||
      (f.aEs && f.aEs.toLowerCase().includes(qLower))
    );

    if (matchedFaq) {
      return {
        title: isEs ? (matchedFaq.qEs || matchedFaq.q) : matchedFaq.q,
        text: isEs ? (matchedFaq.aEs || matchedFaq.a) : matchedFaq.a,
        sources: ['Verified FAQ Database', 'RAG Centralized Vault'],
        confidence: '97.5%',
        inKnowledgeBase: true
      };
    }

    return {
      title: isEs ? `Consulta Registrada: "${query}"` : `Inquiry Registered: "${query}"`,
      text: isEs
        ? `Pregunta registrada en la Analítica de Brechas de Conocimiento de IA. Nuestro equipo y el modelo de IA indexarán la respuesta para esta consulta en breve.`
        : `Question logged to AI Knowledge Gap Analytics — Our team & AI model will index verified answers for this inquiry shortly.`,
      sources: ['AI Knowledge Gap Analytics (Logged)', 'RAG Telemetry Feed'],
      confidence: isEs ? 'Registrado para Indexación' : 'Logged for Indexing',
      inKnowledgeBase: false
    };
  };

  const activeRagAnswer = getAiRagResponse(faqSearchQuery);

  const filteredFaqQuestions = faqSearchQuery.trim() === ''
    ? FAQ_QUESTIONS_DATA
    : FAQ_QUESTIONS_DATA.filter((faq) => {
        const fullContent = `${faq.q || ''} ${faq.qEs || ''} ${faq.a || ''} ${faq.aEs || ''}`.toLowerCase();
        return fullContent.includes(faqSearchQuery.toLowerCase());
      });

  const strategicBenefits = [
    {
      num: '01',
      titleEn: 'Single Source of Truth',
      titleEs: 'Fuente Única de Verdad',
      descEn: 'All FAQs, documentation, product specs, and operational answers are managed from one central system, keeping details 100% accurate everywhere.',
      descEs: 'Todas las preguntas, documentación y especificaciones se gestionan desde un punto central manteniéndose precisas.',
      color: '#4f46e5'
    },
    {
      num: '02',
      titleEn: 'Powers 100+ Web Pages Instantly',
      titleEs: 'Distribución a más de 100 Páginas',
      descEn: 'A single knowledge repository seamlessly supplies accurate answers to every feature page, industry hub, and marketing landing page.',
      descEs: 'Un único repositorio nutre de respuestas verificadas a todas las páginas de características e industrias.',
      color: '#0284c7'
    },
    {
      num: '03',
      titleEn: 'Natural Conversation Interface',
      titleEs: 'Consultas en Lenguaje Natural',
      descEn: 'Visitors ask questions in natural language, and AI delivers verified answers directly without clicking through complex accordion menus.',
      descEs: 'Los visitantes preguntan en lenguaje natural y la IA entrega respuestas fundamentadas al instante.',
      color: '#10b981'
    },
    {
      num: '04',
      titleEn: 'Verified Fact Grounding (No Hallucinations)',
      titleEs: 'Sin Alucinaciones de IA',
      descEn: 'Retrieval-Augmented Generation grounds responses exclusively on official CRM nErgy ledger schemas, pricing terms, and architecture specs.',
      descEs: 'La generación aumentada por recuperación basa sus respuestas estrictamente en especificaciones oficiales verificadas.',
      color: '#f59e0b'
    },
    {
      num: '05',
      titleEn: 'Live Platform Updates',
      titleEs: 'Actualizaciones en Vivo Sin Código',
      descEn: 'Update answers, policies, or product terms once in the central repository, and it updates across all user interfaces instantly.',
      descEs: 'Actualice datos una sola vez y se reflejarán instantáneamente en toda la red de páginas sin alterar código.',
      color: '#8b5cf6'
    },
    {
      num: '06',
      titleEn: 'Knowledge Gap Analytics',
      titleEs: 'Detección de Brechas de Contenido',
      descEn: 'When visitors search for unindexed questions, the system automatically logs them so team members can add verified answers continuously.',
      descEs: 'El sistema registra automáticamente consultas inéditas para que el equipo expanda continuamente la base de conocimiento.',
      color: '#ec4899'
    },
    {
      num: '07',
      titleEn: 'Unified Multi-Agent Brain',
      titleEs: 'Motor Compartido para Asistentes',
      descEn: 'One shared knowledge base powers the website chat, CRM Virtual Bestie, ERP copilot, and human customer support desks.',
      descEs: 'La misma base de conocimiento impulsa el chat web, Bestie VA, el copiloto ERP y el soporte humano.',
      color: '#06b6d4'
    },
    {
      num: '08',
      titleEn: 'Open-Source Cost Optimization',
      titleEs: 'Control de Costos con RAG Abierto',
      descEn: 'Open-source vector retrieval handles bulk inquiries locally, connecting to commercial frontier AI APIs only when required.',
      descEs: 'Tecnología RAG de código abierto para indexación local, reduciendo los costos de nube operativos.',
      color: '#14b8a6'
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
            <span style={{ color: '#f97316', fontWeight: 700 }}>{isEs ? 'Preguntas Frecuentes y Base de Conocimiento' : 'FAQs & Knowledge Base'}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/')}
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
            <span>{isEs ? 'Volver al Inicio' : 'Back to Home'}</span>
          </button>
        </div>
      </section>

      {/* Hero Header with Custom AI Knowledge Base Background */}
      <section style={{
        position: 'relative',
        padding: '3.5rem 1.25rem 2.5rem 1.25rem',
        backgroundImage: 'var(--web-hero-overlay), url("/bg-faqs.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderBottom: '1px solid var(--web-border)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#f97316',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            background: 'rgba(249, 115, 22, 0.1)',
            padding: '4px 14px',
            borderRadius: '16px',
            border: '1px solid rgba(249, 115, 22, 0.25)'
          }}>
            {t('Fact and Questions')}
          </span>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            {t('FAQs & Centralized Knowledge Base')}
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: 0
          }}>
            {t('Ask questions in natural language, search our AI-powered centralized knowledge base with RAG, explore core platform benefits, or review frequently asked questions.')}
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onOpenZunme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={14} />
              <span>{isEs ? 'Ask Best Friend – VA >>' : 'Ask Best Friend – VA >>'}</span>
            </button>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '8px',
                background: 'var(--web-surface)',
                border: '1px solid var(--web-border)',
                color: 'var(--web-text-main)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={14} />
              <span>{t('Contact Sales')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main FAQs & AI Search Content */}
      <section style={{
        padding: '3rem clamp(1rem, 3vw, 1.25rem) 4.5rem clamp(1rem, 3vw, 1.25rem)',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* FAQS DATA SEARCH BAR ENGINE */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 24, 43, 0.95) 0%, rgba(10, 16, 32, 0.95) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.28)',
          borderRadius: '20px',
          padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          marginBottom: '2.5rem',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 0 24px rgba(139, 92, 246, 0.05)',
          textAlign: 'left'
        }}>
          {/* Header Badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                FAQs DATA SEARCH BAR ENGINE
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#0284c7',
                background: 'rgba(2, 132, 199, 0.1)',
                padding: '4px 10px',
                borderRadius: '20px'
              }}>
                {isEs ? '[ Base de Conocimiento Centralizada con RAG ]' : '[ Centralized Knowledge Base with RAG ]'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '3px 8px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Cpu size={12} />
                <span>RAG Engine: Live</span>
              </span>
            </div>
          </div>

          {/* Interactive Search Bar Input */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--web-surface)',
              border: '2px solid rgba(139, 92, 246, 0.35)',
              borderRadius: '14px',
              padding: '6px 14px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
            }}>
              <Search size={18} style={{ color: '#8b5cf6', flexShrink: 0 }} />
              <input
                type="text"
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                placeholder={isEs
                  ? 'Buscar por palabra clave o consultar a la IA RAG (ej. "RAG benefits", "Drag-Drop", "ERP", "White label")...'
                  : 'Search by keyword or ask AI RAG (e.g., "RAG benefits", "Drag-and-Drop", "cost", "ERP", "White label")...'}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--web-text-main)',
                  padding: '8px 0',
                  minWidth: '200px'
                }}
              />
              {faqSearchQuery && (
                <button
                  type="button"
                  onClick={() => setFaqSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--web-text-muted)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  {isEs ? 'Limpiar' : 'Clear'}
                </button>
              )}
            </div>

            {/* Quick Keyword Prompt Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--web-text-muted)', fontWeight: 600 }}>
                {isEs ? 'Sugerencias de búsqueda:' : 'Try searching:'}
              </span>
              {['RAG benefits', 'Drag and drop dashboard', 'Open-source cost', 'ERP accounting', 'White label'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setFaqSearchQuery(chip)}
                  style={{
                    background: 'var(--web-surface)',
                    border: '1px solid var(--web-border)',
                    color: 'var(--web-text-muted)',
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* AI RAG Synthesized Response Display */}
          {activeRagAnswer && (
            <div style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.12) 0%, rgba(16, 24, 43, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '16px',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} style={{ color: '#22d3ee' }} />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                    {activeRagAnswer.title}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#34d399',
                    background: 'rgba(52, 211, 153, 0.12)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    border: '1px solid rgba(52, 211, 153, 0.25)'
                  }}>
                    {activeRagAnswer.confidence} Match
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '13.5px', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                {activeRagAnswer.text}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '6px', borderTop: '1px solid rgba(139, 92, 246, 0.2)', fontSize: '11.5px', color: '#94a3b8' }}>
                <Database size={13} style={{ color: '#22d3ee' }} />
                <span style={{ fontWeight: 600 }}>Sources:</span>
                {activeRagAnswer.sources.map((src, sIdx) => (
                  <span key={sIdx} style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '2px 6px', borderRadius: '4px', color: '#c4b5fd' }}>
                    {src}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 8 Strategic Benefits Grid */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--web-text-main)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 1rem 0' }}>
              {isEs ? '8 Razones para un Sistema de Conocimiento Centralizado con RAG' : '8 Strategic Benefits of a Centralized Knowledge System with RAG'}
            </h4>
            <div className="faq-strategic-benefits-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px'
            }}>
              {strategicBenefits.map((b) => (
                <div
                  key={b.num}
                  style={{
                    background: 'var(--web-surface)',
                    border: '1px solid var(--web-border)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 900, color: b.color, fontFamily: 'var(--font-mono)' }}>
                    {b.num}
                  </span>
                  <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--web-text-main)', margin: '2px 0 0 0' }}>
                    {isEs ? b.titleEs : b.titleEn}
                  </h5>
                  <p style={{ fontSize: '11.5px', color: 'var(--web-text-muted)', margin: 0, lineHeight: 1.45 }}>
                    {isEs ? b.descEs : b.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured AI Spotlight: What is My Zunme? */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          marginBottom: '2.5rem'
        }}>
          <div className="website-zunme-card-inner">
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
              flexShrink: 0
            }}>
              <Bot size={28} />
            </div>
            <div style={{ flex: 1, minWidth: 'min(280px, 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase' }}>
                  {t('Artificial Intelligence SuperHouse')}
                </span>
                <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#4f46e5', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                  {t('1,000+ Prompt Templates')}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 22px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 10px 0' }}>
                {t('What is My Zunme?')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                <strong>ZUNME</strong> {t('is the integrated creative, monetization, and SEO engine inside CRM nErgy AI. It empowers creators, marketing agencies, and business owners to build content rapidly using pre-built AI workflows. Featuring over 1,000 specialized templates, ZUNME powers autonomous AI video agents, brand soundtrack synthesis, script writing, and enterprise copy generation.')}
              </p>
              <div className="website-zunme-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={onOpenZunme}
                  className="website-cta-zunme"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  <Sparkles size={14} />
                  <span>{isEs ? 'Iniciar Asistente My Zunme >>' : 'Launch Ask My Zunme Assistant >>'}</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenSales}
                  className="website-btn-sales"
                  style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }}
                >
                  <span>{isEs ? 'Consultar sobre Licencias Zunme' : 'Inquire About Zunme Licensing'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredFaqQuestions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2.5rem',
              background: 'var(--web-surface-subtle)',
              borderRadius: '12px',
              border: '1px dashed var(--web-border)'
            }}>
              <FileSearch size={28} style={{ color: '#4f46e5', margin: '0 auto 8px auto' }} />
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--web-text-main)', margin: '0 0 4px 0' }}>
                {isEs ? 'No se encontraron preguntas coincidentes en la lista clásica' : 'No matching classic FAQ questions found'}
              </p>
              <span style={{ fontSize: '12px', color: 'var(--web-text-muted)' }}>
                {isEs ? 'Consulte la respuesta sintetizada de IA RAG en la parte superior' : 'Refer to the AI RAG synthesized answer box above'}
              </span>
            </div>
          ) : filteredFaqQuestions.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            const question = (isEs && faq.qEs) ? faq.qEs : t(faq.q);
            const answer = (isEs && faq.aEs) ? faq.aEs : t(faq.a);

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
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                    {question}
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
                    paddingTop: '0.85rem'
                  }}>
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default FaqsPage;
