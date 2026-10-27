import React, { useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  LayoutDashboard,
  Move,
  CheckCircle2,
  Bookmark,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  Layers,
  Users,
  Bell,
  Eye,
  Sliders,
  ShieldCheck,
  Zap,
  ArrowLeft,
  PieChart,
  Boxes,
  Briefcase,
  Headphones,
  Settings,
  FolderKanban,
  FileText,
  DollarSign,
  Palette,
  ExternalLink,
  Plus
} from 'lucide-react';

export const CustomizableDashboardsPage = () => {
  const navigate = useNavigate();
  const { onOpenZunme, onOpenSales } = useOutletContext() || {};
  const { language, t } = useLanguage();
  const isEs = language === 'ES';

  // Active showcase tab: 'kanban' | 'widgets' | 'erp' | 'whitelabel'
  const [activeTab, setActiveTab] = useState('kanban');

  // Interactive Kanban Board State (Example 2 & 3)
  const initialKanbanColumns = {
    todo: {
      title: isEs ? 'Por Hacer' : 'To Do',
      color: '#f97316',
      items: [
        { id: 'k1', text: isEs ? 'Revisión SLA de Apex Logistics' : 'Apex Logistics SLA review', tag: 'SLA', color: '#ea580c' },
        { id: 'k2', text: isEs ? 'Actualizar contratos de proveedores' : 'Update vendor supplier contracts', tag: 'Legal', color: '#0284c7' }
      ]
    },
    requirement: {
      title: isEs ? 'Requisitos' : 'Requirement',
      color: '#eab308',
      items: [
        { id: 'k3', text: isEs ? 'Especificación de API bancaria' : 'Banking API specification draft', tag: 'API', color: '#10b981' }
      ]
    },
    design: {
      title: isEs ? 'Diseño' : 'Design',
      color: '#ea580c',
      items: [
        { id: 'k4', text: isEs ? 'Tablero ejecutivo UI dark mode' : 'Executive dark mode UI mockup', tag: 'UI/UX', color: '#8b5cf6' },
        { id: 'k5', text: isEs ? 'Paleta de colores del cliente' : 'Client brand color schema tokens', tag: 'Brand', color: '#06b6d4' }
      ]
    },
    development: {
      title: isEs ? 'Desarrollo' : 'Development',
      color: '#84cc16',
      items: [
        { id: 'k6', text: isEs ? 'Conector ERP webhook v2' : 'ERP webhook connector v2 build', tag: 'Core', color: '#3b82f6' }
      ]
    },
    testing: {
      title: isEs ? 'Pruebas' : 'Testing',
      color: '#f97316',
      items: [
        { id: 'k7', text: isEs ? 'Auditoría de seguridad SHA-256' : 'SHA-256 zBox security verification', tag: 'Audit', color: '#ef4444' }
      ]
    },
    acceptance: {
      title: isEs ? 'Aceptación' : 'Acceptance',
      color: '#eab308',
      items: [
        { id: 'k8', text: isEs ? 'Aprobación del director financiero' : 'CFO signature on deal discount', tag: 'Finance', color: '#10b981' }
      ]
    },
    deployment: {
      title: isEs ? 'Despliegue' : 'Deployment',
      color: '#ea580c',
      items: [
        { id: 'k9', text: isEs ? 'Pipeline de producción AWS v4' : 'Production cluster cluster sync v4', tag: 'Cloud', color: '#6366f1' }
      ]
    },
    launch: {
      title: isEs ? 'Lanzamiento' : 'Launch',
      color: '#10b981',
      items: [
        { id: 'k10', text: isEs ? 'Lanzamiento de módulo de IA Bestie' : 'Zunme AI v4.8 autonomous agent live', tag: 'Live', color: '#10b981' }
      ]
    }
  };

  const [kanbanData, setKanbanData] = useState(initialKanbanColumns);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedSourceCol, setDraggedSourceCol] = useState(null);

  const handleDragStart = (item, sourceColKey) => {
    setDraggedItem(item);
    setDraggedSourceCol(sourceColKey);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetColKey) => {
    if (!draggedItem || !draggedSourceCol) return;
    if (draggedSourceCol === targetColKey) return;

    setKanbanData(prev => {
      const sourceItems = prev[draggedSourceCol].items.filter(i => i.id !== draggedItem.id);
      const targetItems = [...prev[targetColKey].items, draggedItem];

      return {
        ...prev,
        [draggedSourceCol]: { ...prev[draggedSourceCol], items: sourceItems },
        [targetColKey]: { ...prev[targetColKey], items: targetItems }
      };
    });

    setDraggedItem(null);
    setDraggedSourceCol(null);
  };

  // Interactive Checklist State (Example 5)
  const [featureChecklist, setFeatureChecklist] = useState({
    userMgmt: true,
    salesAuto: true,
    mktTools: false,
    custSupport: true,
    repAnalytics: true
  });

  const [customizationChecklist, setCustomizationChecklist] = useState({
    branding: true,
    apiAccess: true,
    modConfig: false,
    workflowAuto: true,
    dataFields: true
  });

  // Portal Branding Interactive Color Picker
  const [brandColor, setBrandColor] = useState('#4f46e5');
  const [brandName, setBrandName] = useState('Acme Enterprise Suite');

  // Interactive To-Do List state for Widget tab (Example 4)
  const [todos, setTodos] = useState([
    { id: 1, text: isEs ? 'Revisión de auditoría de ingresos Q1' : 'Q1 Enterprise Revenue & MRR Audit', done: true, due: isEs ? 'Hoy' : 'Today' },
    { id: 2, text: isEs ? 'Seguimiento de prospecto Jordan Reed' : 'Follow-up with Jordan Reed at Apex Logistics', done: false, due: isEs ? 'Mañana' : 'Tomorrow' },
    { id: 3, text: isEs ? 'Escanear inventario de piezas bajo umbral ERP' : 'Scan ERP warehouse inventory threshold items', done: false, due: 'Feb 28' },
    { id: 4, text: isEs ? 'Aprobar cotización con descuento VIP' : 'Approve VIP Enterprise discount quote', done: false, due: 'Mar 02' }
  ]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Comparison of CRM Features (from User Text)
  const comparisonFeatures = [
    {
      featureEn: 'Drag-and-Drop Interface',
      featureEs: 'Interfaz Arrastrar y Soltar',
      icon: Move,
      descEn: 'Allows easy organization of tasks and contacts with visual manipulation.',
      descEs: 'Permite organizar fácilmente tareas y contactos con manipulación visual.',
      benefitsEn: 'User-friendly, efficient',
      benefitsEs: 'Fácil de usar, eficiente'
    },
    {
      featureEn: 'Intuitive Dashboard',
      featureEs: 'Tablero Intuitivo',
      icon: LayoutDashboard,
      descEn: 'Customizable view of key metrics, live telemetry, and prioritized tasks.',
      descEs: 'Vista personalizable de métricas clave, telemetría en vivo y tareas prioritarias.',
      benefitsEn: 'Quick access to important info',
      benefitsEs: 'Acceso rápido a información importante'
    },
    {
      featureEn: 'Streamlined Contact Management',
      featureEs: 'Gestión de Contactos Optimizada',
      icon: Users,
      descEn: 'Easy addition, timeline history, and 360° retrieval of contact information.',
      descEs: 'Fácil adición, historial cronológico y recuperación 360° de contactos.',
      benefitsEn: 'Saves time, reduces frustration',
      benefitsEs: 'Ahorra tiempo, reduce la frustración'
    },
    {
      featureEn: 'Task Reminders',
      featureEs: 'Recordatorios de Tareas',
      icon: Bell,
      descEn: 'Automated SLA notifications, scheduled alerts, and follow-up triggers.',
      descEs: 'Notificaciones automáticas de SLA, alertas programadas y disparadores de seguimiento.',
      benefitsEn: 'Ensures timely actions',
      benefitsEs: 'Garantiza acciones oportunas'
    },
    {
      featureEn: 'Pipeline Visibility',
      featureEs: 'Visibilidad del Embudo',
      icon: TrendingUp,
      descEn: 'Visual Kanban representation of active sales opportunities and deal velocity.',
      descEs: 'Representación visual Kanban de oportunidades activas y velocidad de cierre.',
      benefitsEn: 'Enhances tracking and management',
      benefitsEs: 'Mejora el seguimiento y la gestión'
    }
  ];

  // 10 ERP Modules (from Example 1)
  const erpModules = [
    { num: '01', titleEn: 'Planning', titleEs: 'Planificación', icon: Calendar, color: '#06b6d4' },
    { num: '02', titleEn: 'Production', titleEs: 'Producción', icon: Sliders, color: '#10b981' },
    { num: '03', titleEn: 'Procurement', titleEs: 'Adquisiciones', icon: Briefcase, color: '#0284c7' },
    { num: '04', titleEn: 'Reporting', titleEs: 'Informes', icon: FileText, color: '#3b82f6' },
    { num: '05', titleEn: 'Sales & Marketing', titleEs: 'Ventas y Marketing', icon: TrendingUp, color: '#1d4ed8' },
    { num: '06', titleEn: 'Human Resources', titleEs: 'Recursos Humanos', icon: Users, color: '#06b6d4' },
    { num: '07', titleEn: 'Inventory Management', titleEs: 'Gestión de Inventario', icon: Boxes, color: '#10b981' },
    { num: '08', titleEn: 'Finance & Accounting', titleEs: 'Finanzas y Contabilidad', icon: DollarSign, color: '#0284c7' },
    { num: '09', titleEn: 'Supply Chain Management', titleEs: 'Cadena de Suministro', icon: Layers, color: '#3b82f6' },
    { num: '10', titleEn: 'Customer Relationship', titleEs: 'Relación con el Cliente', icon: Headphones, color: '#1d4ed8' }
  ];

  // Smart Bookmarks Mock Data
  const bookmarks = [
    { label: isEs ? 'Embudo de Ventas' : 'Sales Pipeline', count: '12 Tratos', active: true },
    { label: isEs ? 'Auditorías SOX' : 'SOX Compliance', count: '100% OK' },
    { label: isEs ? 'Inventario ERP' : 'ERP Inventory', count: '34 SKUs' },
    { label: isEs ? 'Contactos Clave' : 'Key Contacts', count: '142 VIPs' },
    { label: isEs ? 'Bóveda zBox' : 'Secured zBox', count: '3 Canales' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      {/* ======================================================== */}
      {/* 1. HERO BANNER                                           */}
      {/* ======================================================== */}
      <section className="website-hero-section" style={{
        background: 'radial-gradient(ellipse at 50% -20%, rgba(79, 70, 229, 0.18) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 80%)'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          {/* Breadcrumb Back Link */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '0.25rem' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#4f46e5',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={16} />
              <span>{isEs ? 'Volver a la Página Principal' : 'Back to Home / Features'}</span>
            </Link>
          </div>

          {/* Feature Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '24px',
            background: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.3)',
            fontSize: '12.5px',
            fontWeight: 800,
            color: '#4f46e5',
            letterSpacing: '0.04em'
          }}>
            <Move size={15} style={{ color: '#f59e0b' }} />
            <span>{isEs ? 'Tableros Personalizables • [ Interfaz Arrastrar y Soltar ]' : 'Customizable Dashboards • [ Drag-and-Drop Interface ]'}</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--web-text-main)',
            margin: 0,
            textAlign: 'center'
          }}>
            {isEs ? 'Tableros Personalizables con Interfaz Drag-and-Drop' : 'Customizable Dashboards & Drag-and-Drop Interface'}
          </h1>

          {/* Primary Lead Paragraph (from User Text) */}
          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            fontWeight: 500,
            color: 'var(--web-text-muted)',
            lineHeight: 1.6,
            maxWidth: '860px',
            textAlign: 'center',
            margin: 0
          }}>
            {isEs
              ? 'CRM fácil de navegar, una interfaz limpia y optimizada para el usuario que le permite acceder rápidamente a las funciones que necesita sin perderse en menús complejos. Los tableros personalizables y los marcadores inteligentes mejoran la usabilidad y la eficiencia.'
              : 'Easy to navigate CRM, a clean and streamlined user friendly interface that allows users to quickly access the features they need without getting lost in complex menus. Customizable dashboards and smart bookmarks can enhance usability and efficiency.'}
          </p>

          {/* Action Buttons */}
          <div className="website-hero-cta-group">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('live-sandbox');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '10px',
                background: '#4f46e5',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(79, 70, 229, 0.35)'
              }}
            >
              <Move size={16} />
              <span>{isEs ? 'Probar Simulador Interactivo' : 'Try Live Interactive Sandbox'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: 'var(--web-surface)',
                border: '1px solid var(--web-border)',
                color: 'var(--web-text-main)',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <MessageSquare size={16} />
              <span>{isEs ? 'Hablar con Asesor' : 'Talk to Solutions Advisor'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CORE Q&A CALLOUT SECTION (Directly from User Text)     */}
      {/* ======================================================== */}
      <section className="website-section-container">
        <div style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(6, 182, 212, 0.06) 100%)',
          border: '1px solid rgba(79, 70, 229, 0.2)',
          borderRadius: '20px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              {isEs ? 'Visión Estratégica' : 'Executive Insights'}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>
              CRM nErgy AI • {isEs ? '“Haz de la IA Tu Mejor Amigo”' : '“Make AI Your Bestie”'}
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
            fontWeight: 900,
            color: 'var(--web-text-main)',
            margin: 0,
            lineHeight: 1.3
          }}>
            {isEs
              ? '¿Cómo mejoran los tableros personalizables la experiencia del usuario de CRM?'
              : 'How do customizable dashboards enhance CRM user experience?'}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Answer Card 1 */}
            <div style={{
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(79, 70, 229, 0.1)',
                  color: '#4f46e5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Move size={18} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--web-text-main)' }}>
                  {isEs ? 'Navegación Intuitiva y Mínimos Clics' : 'Intuitive Navigation & Minimal Clicks'}
                </h3>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {isEs
                  ? 'Las funciones de CRM de fácil navegación cuentan con una interfaz de arrastrar y soltar (Drag-and-Drop), lo que permite a los usuarios organizar y gestionar fácilmente contactos, tareas y embudos de ventas con el mínimo de clics. Este diseño intuitivo mejora la experiencia del usuario y la productividad al simplificar las tareas cotidianas.'
                  : 'Easy navigational CRM features Drag-and-Drop interface, which allows users to easily organize and manage contacts, tasks, and sales pipelines with minimal clicks. This intuitive design enhances user experience and productivity by simplifying common tasks.'}
              </p>
            </div>

            {/* Answer Card 2 */}
            <div style={{
              background: 'var(--web-surface)',
              border: '1px solid var(--web-border)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  color: '#06b6d4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sliders size={18} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--web-text-main)' }}>
                  {isEs ? 'Adaptación por Rol y Métricas Clave' : 'Role-Tailored Focus & Target KPIs'}
                </h3>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.6, margin: 0 }}>
                {isEs
                  ? 'Los tableros personalizables mejoran la experiencia del usuario de CRM al permitirles adaptar la interfaz a sus roles y responsabilidades específicos, presentando solo la información más relevante. Este enfoque específico mejora la productividad y ayuda a los usuarios a concentrarse en los indicadores clave de rendimiento que más importan para sus tareas.'
                  : 'Customizable dashboards enhance CRM user experience by allowing users to tailor the interface to their specific roles and responsibilities, presenting only the most relevant information. This targeted approach improves productivity and helps users focus on key performance indicators that matter most to their tasks.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. COMPARISON OF CRM FEATURES TABLE (From User Text)      */}
      {/* ======================================================== */}
      <section className="website-section-container" style={{ paddingTop: '0.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {isEs ? 'Evaluación y Matriz de Valor' : 'Feature Matrix & Business Value'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
            {isEs ? 'Comparación de Características de CRM' : 'Comparison of CRM Features'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.5 }}>
            {isEs
              ? 'Descubra cómo las interfaces modernas impulsan la adopción inmediata y ahorran horas operativas en equipos comerciales y directivos.'
              : 'Discover how modern interfaces accelerate adoption and save valuable hours across commercial and executive leadership teams.'}
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div style={{
          background: 'var(--web-surface)',
          border: '1px solid var(--web-border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
              <thead>
                <tr style={{ background: 'var(--web-surface-subtle)', borderBottom: '1px solid var(--web-border)' }}>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 800, color: 'var(--web-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isEs ? 'Característica (Feature)' : 'Feature'}
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 800, color: 'var(--web-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isEs ? 'Descripción (Description)' : 'Description'}
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 800, color: 'var(--web-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {isEs ? 'Beneficios (Benefits)' : 'Benefits'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => {
                  const Icon = row.icon;
                  return (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: idx < comparisonFeatures.length - 1 ? '1px solid var(--web-border)' : 'none',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '8px',
                            background: 'rgba(79, 70, 229, 0.1)',
                            color: '#4f46e5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Icon size={17} />
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--web-text-main)' }}>
                            {isEs ? row.featureEs : row.featureEn}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.5, verticalAlign: 'middle' }}>
                        {isEs ? row.descEs : row.descEn}
                      </td>
                      <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 12px',
                          borderRadius: '16px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#059669',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          border: '1px solid rgba(16, 185, 129, 0.25)'
                        }}>
                          <CheckCircle2 size={13} />
                          {isEs ? row.benefitsEs : row.benefitsEn}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Concluding Footer Callout (from User Text) */}
          <div style={{
            padding: '16px 24px',
            background: 'var(--web-surface-subtle)',
            borderTop: '1px solid var(--web-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <Sparkles size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <p style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--web-text-main)', margin: 0, lineHeight: 1.5 }}>
              {isEs
                ? 'Estas características contribuyen colectivamente a una experiencia de usuario más eficiente y agradable, haciendo que los CRM sean más fáciles de adoptar y utilizar de forma eficaz.'
                : 'These features collectively contribute to a more efficient and enjoyable user experience, making CRMs easier to adopt and use effectively.'}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. INTERACTIVE LIVE SANDBOX & EXAMPLES (User Screenshots) */}
      {/* ======================================================== */}
      <section id="live-sandbox" className="website-section-container" style={{ paddingTop: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {isEs ? 'Simulador en Vivo' : 'Live Interactive Architecture'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0 8px 0' }}>
            {isEs ? 'Experiencia Visual: Tableros, Kanban y Módulos ERP' : 'Visual Experience: Dashboards, Kanban & ERP Modules'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', maxWidth: '780px', margin: '0 auto', lineHeight: 1.5 }}>
            {isEs
              ? 'Interactúe directamente con nuestro tablero Kanban arrastrando tarjetas, pruebe el simulador de widgets ejecutivos y explore la arquitectura de los 10 módulos ERP.'
              : 'Directly drag and drop cards across our Kanban board, explore executive telemetry widgets, and examine our 10 connected ERP operational modules.'}
          </p>

          {/* Tab Selector for 4 Examples */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--web-surface-subtle)',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid var(--web-border)',
            gap: '4px',
            marginTop: '1.25rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('kanban')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'kanban' ? 700 : 500,
                background: activeTab === 'kanban' ? '#4f46e5' : 'transparent',
                color: activeTab === 'kanban' ? '#ffffff' : 'var(--web-text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FolderKanban size={15} />
              <span>{isEs ? 'Ejemplo 2: Tablero Kanban (Drag & Drop)' : 'Example 2: Kanban Board (Drag & Drop)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('widgets')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'widgets' ? 700 : 500,
                background: activeTab === 'widgets' ? '#4f46e5' : 'transparent',
                color: activeTab === 'widgets' ? '#ffffff' : 'var(--web-text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <BarChart3 size={15} />
              <span>{isEs ? 'Ejemplo 4: Reportes y Widgets' : 'Example 4: Reports & Widgets'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('erp')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'erp' ? '#4f46e5' : 'transparent',
                color: activeTab === 'erp' ? '#ffffff' : 'var(--web-text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Boxes size={15} />
              <span>{isEs ? 'Ejemplo 1: 10 Módulos ERP' : 'Example 1: 10 ERP Modules'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('whitelabel')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: activeTab === 'whitelabel' ? 700 : 500,
                background: activeTab === 'whitelabel' ? '#4f46e5' : 'transparent',
                color: activeTab === 'whitelabel' ? '#ffffff' : 'var(--web-text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Palette size={15} />
              <span>{isEs ? 'Ejemplo 5: Portal y Marca Blanca' : 'Example 5: Portal & White-Label'}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: KANBAN BOARD (EXAMPLE 2 & 3)                      */}
        {/* ======================================================== */}
        {activeTab === 'kanban' && (
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Kanban Header & Instruction */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: 'var(--web-text-main)' }}>
                  {isEs ? 'Tablero Kanban Interactivo (8 Etapas)' : 'Interactive Kanban Board (8 Stages)'}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--web-text-muted)' }}>
                  {isEs ? '⚡ Arrastre y suelte las tarjetas entre columnas para experimentar el flujo' : '⚡ Drag and drop cards between columns to test real-time fluid progression'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setKanbanData(initialKanbanColumns)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'var(--web-surface-subtle)',
                  border: '1px solid var(--web-border)',
                  color: 'var(--web-text-main)',
                  cursor: 'pointer'
                }}
              >
                {isEs ? 'Restablecer Tablero' : 'Reset Board'}
              </button>
            </div>

            {/* Kanban Columns Horizontal Scroll Track */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, minmax(160px, 1fr))',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '10px',
              minHeight: '340px'
            }}>
              {Object.entries(kanbanData).map(([colKey, col]) => (
                <div
                  key={colKey}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(colKey)}
                  style={{
                    background: 'var(--web-surface-subtle)',
                    borderRadius: '10px',
                    border: '1px dashed var(--web-border)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    minWidth: '150px'
                  }}
                >
                  {/* Column Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '6px',
                    borderBottom: `2px solid ${col.color}`
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--web-text-main)' }}>
                      {col.title}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      background: 'var(--web-surface)',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      border: '1px solid var(--web-border)'
                    }}>
                      {col.items.length}
                    </span>
                  </div>

                  {/* Cards inside column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                    {col.items.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item, colKey)}
                        style={{
                          background: 'var(--web-surface)',
                          border: '1px solid var(--web-border)',
                          borderRadius: '8px',
                          padding: '10px',
                          cursor: 'grab',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <span style={{
                          alignSelf: 'flex-start',
                          fontSize: '9.5px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          border: `1px solid ${item.color}30`
                        }}>
                          {item.tag}
                        </span>
                        <p style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--web-text-main)', margin: 0, lineHeight: 1.35 }}>
                          {item.text}
                        </p>
                      </div>
                    ))}

                    {col.items.length === 0 && (
                      <div style={{
                        height: '70px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed var(--web-border)',
                        borderRadius: '6px',
                        color: 'var(--web-text-muted)',
                        fontSize: '11px',
                        fontStyle: 'italic'
                      }}>
                        {isEs ? 'Soltar aquí' : 'Drop here'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: WIDGETS & ANALYTICS (EXAMPLE 4)                   */}
        {/* ======================================================== */}
        {activeTab === 'widgets' && (
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Smart Bookmarks Bar on top */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isEs ? 'Marcadores Inteligentes (Smart Bookmarks)' : 'Smart Bookmarks & Quick Filters'}
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {bookmarks.map((bm, bIdx) => (
                  <div
                    key={bIdx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: bm.active ? '#4f46e5' : 'var(--web-surface-subtle)',
                      color: bm.active ? '#ffffff' : 'var(--web-text-main)',
                      border: `1px solid ${bm.active ? '#4f46e5' : 'var(--web-border)'}`,
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Bookmark size={13} />
                    <span>{bm.label}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: bm.active ? 'rgba(255,255,255,0.2)' : 'var(--web-surface)',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                      {bm.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid of 4 Executive Telemetry Widgets */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {/* Widget 1: Revenue Velocity & MRR */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)' }}>
                    {isEs ? 'MRR y Transacciones' : 'Transactions & MRR'}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                    +24.6%
                  </span>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)' }}>
                  $128,450 <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--web-text-muted)' }}>/mo</span>
                </div>
                {/* Visual Bars Simulation */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '55px', paddingTop: '10px' }}>
                  {[35, 50, 45, 70, 65, 85, 95].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        backgroundColor: i === 6 ? '#4f46e5' : '#f97316',
                        borderRadius: '4px 4px 0 0',
                        opacity: 0.85
                      }}
                      title={`Week ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Widget 2: Win Rate Gauge */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)' }}>
                    {isEs ? 'Tasa de Conversión (Win Rate)' : 'Conversions Win Rate'}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                    SLA Tier 1
                  </span>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)' }}>
                  78.4%
                </div>
                {/* Progress bar gauge */}
                <div style={{ width: '100%', height: '10px', background: 'var(--web-border)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: '78.4%', height: '100%', background: 'linear-gradient(90deg, #06b6d4, #10b981)', borderRadius: '10px' }} />
                </div>
                <span style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>
                  {isEs ? '22 tratos ganados de 28 calificados este mes' : '22 deals closed won out of 28 qualified this cycle'}
                </span>
              </div>

              {/* Widget 3: Interactive To-Do List */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)' }}>
                    {isEs ? 'Lista de Tareas Ejecutivas' : 'Executive To-Do Checklist'}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>
                    {todos.filter(t => !t.done).length} {isEs ? 'Pendientes' : 'Pending'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      onClick={() => toggleTodo(todo.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        background: 'var(--web-surface)',
                        borderRadius: '6px',
                        border: '1px solid var(--web-border)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={todo.done}
                          onChange={() => {}}
                          style={{ cursor: 'pointer', accentColor: '#4f46e5' }}
                        />
                        <span style={{
                          fontSize: '11.5px',
                          color: todo.done ? 'var(--web-text-muted)' : 'var(--web-text-main)',
                          textDecoration: todo.done ? 'line-through' : 'none',
                          fontWeight: 600
                        }}>
                          {todo.text}
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--web-text-muted)' }}>
                        {todo.due}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Compliance & SLA */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--web-text-muted)' }}>
                    {isEs ? 'SLA y Cumplimiento SOX' : 'Compliance SLA & CSAT'}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                    Certificado
                  </span>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--web-text-main)' }}>
                  100%
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', fontWeight: 700 }}>
                    ISO 27001
                  </span>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', fontWeight: 700 }}>
                    AES-256 GCM
                  </span>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 700 }}>
                    Zero-Leakage
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>
                  {isEs ? 'Tokens de sesión encriptados con bóveda SEA activa' : 'Encrypted session tokens with active SEA vault responder'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ERP 10-MODULE ARCHITECTURE (EXAMPLE 1)            */}
        {/* ======================================================== */}
        {activeTab === 'erp' && (
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Enterprise Resource Planning
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0' }}>
                {isEs ? '10 Módulos Operativos de Alta Disponibilidad' : '10 Core Connected Operational ERP Modules'}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', margin: 0 }}>
                {isEs
                  ? 'Cada módulo interactúa en tiempo real con la base de datos centralizada de CRM nErgy sin redundancia de datos.'
                  : 'Every module connects in real time with the centralized CRM nErgy core engine without data redundancy.'}
              </p>
            </div>

            {/* 10 Tiles Grid matching Example 1 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginTop: '0.5rem'
            }}>
              {erpModules.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.num}
                    style={{
                      background: 'var(--web-surface-subtle)',
                      border: '1px solid var(--web-border)',
                      borderRadius: '12px',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      transition: 'transform 0.15s ease, border-color 0.15s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.borderColor = '#4f46e5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--web-border)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: `${m.color}15`,
                        color: m.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={20} />
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: m.color, fontFamily: 'var(--font-mono)' }}>
                        {m.num}
                      </span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--web-text-main)', margin: '0 0 2px 0' }}>
                        {isEs ? m.titleEs : m.titleEn}
                      </h4>
                      <span style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>
                        {isEs ? 'Sincronizado 100%' : '100% Synced Core'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: WHITE LABEL & PORTAL CHECKLIST (EXAMPLE 5)        */}
        {/* ======================================================== */}
        {activeTab === 'whitelabel' && (
          <div style={{
            background: 'var(--web-surface)',
            border: '1px solid var(--web-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                White Label CRM Evaluation Checklist
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--web-text-main)', margin: '4px 0' }}>
                {isEs ? 'Lista de Evaluación y Personalización de Marca Blanca' : 'White Label CRM & Customer Portal Branding'}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', margin: 0 }}>
                {isEs
                  ? 'Personalice la apariencia, logotipo, colores y permisos de su portal de clientes con independencia total.'
                  : 'Customize customer portal styles, header banners, logos, and permission scopes with zero coding.'}
              </p>
            </div>

            {/* Dual Column Checklist inspired by Example 5 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.25rem'
            }}>
              {/* Left Column: Feature Checklist */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--web-border)', paddingBottom: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: '#4f46e5' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                    FEATURE CHECKLIST
                  </h4>
                </div>

                {[
                  { key: 'userMgmt', labelEn: 'User Management (Roles, permissions, hierarchy)', labelEs: 'Gestión de Usuarios (Roles, permisos y jerarquías)' },
                  { key: 'salesAuto', labelEn: 'Sales Automation (Lead tracking, pipeline stages)', labelEs: 'Automatización de Ventas (Seguimiento de prospectos)' },
                  { key: 'mktTools', labelEn: 'Marketing Tools (Campaigns, segmentation, analytics)', labelEs: 'Herramientas de Marketing (Campañas y analítica)' },
                  { key: 'custSupport', labelEn: 'Customer Support (Ticketing, KB, live chat SLA)', labelEs: 'Atención al Cliente (Tickets, KB y chat en vivo)' },
                  { key: 'repAnalytics', labelEn: 'Reporting & Analytics (Customizable dashboards)', labelEs: 'Informes y Analítica (Tableros personalizables)' }
                ].map((item) => (
                  <label
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '12.5px',
                      color: 'var(--web-text-main)',
                      cursor: 'pointer',
                      padding: '4px 0'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={featureChecklist[item.key]}
                      onChange={() => setFeatureChecklist(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      style={{ accentColor: '#4f46e5', width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <span>{isEs ? item.labelEs : item.labelEn}</span>
                  </label>
                ))}
              </div>

              {/* Right Column: Customization Checklist */}
              <div style={{
                background: 'var(--web-surface-subtle)',
                border: '1px solid var(--web-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--web-border)', paddingBottom: '8px' }}>
                  <Settings size={18} style={{ color: '#06b6d4' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--web-text-main)', margin: 0 }}>
                    CUSTOMIZATION CHECKLIST
                  </h4>
                </div>

                {[
                  { key: 'branding', labelEn: 'Branding (Logo, color schemes, custom domain)', labelEs: 'Marca (Logotipo, esquema de colores, dominio propio)' },
                  { key: 'apiAccess', labelEn: 'API Access (Integrations with external systems)', labelEs: 'Acceso API (Integraciones con sistemas externos)' },
                  { key: 'modConfig', labelEn: 'Module Configuration (Enable/disable features)', labelEs: 'Configuración Modular (Activar/desactivar módulos)' },
                  { key: 'workflowAuto', labelEn: 'Workflow Automation (Custom triggers, rules)', labelEs: 'Automatización de Flujos (Reglas personalizadas)' },
                  { key: 'dataFields', labelEn: 'Data Fields (Add custom fields to all records)', labelEs: 'Campos de Datos (Campos personalizados en registros)' }
                ].map((item) => (
                  <label
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '12.5px',
                      color: 'var(--web-text-main)',
                      cursor: 'pointer',
                      padding: '4px 0'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={customizationChecklist[item.key]}
                      onChange={() => setCustomizationChecklist(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      style={{ accentColor: '#06b6d4', width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <span>{isEs ? item.labelEs : item.labelEn}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Live Interactive Branding Theme Preview */}
            <div style={{
              background: 'var(--web-surface)',
              border: `2px solid ${brandColor}`,
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: brandColor }}>
                  {isEs ? 'Vista Previa del Portal del Cliente con su Marca' : 'Live Customer Portal Branding Sandbox'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--web-text-muted)' }}>{isEs ? 'Color de Marca:' : 'Brand Accent:'}</span>
                  {['#4f46e5', '#10b981', '#06b6d4', '#f97316', '#8b5cf6'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setBrandColor(c)}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: c,
                        border: brandColor === c ? '2px solid #000' : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Portal Header Simulation */}
              <div style={{
                background: brandColor,
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={18} />
                  <span style={{ fontSize: '13.5px', fontWeight: 800 }}>{brandName}</span>
                </div>
                <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                  Client Portal Live
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 5. BOTTOM CTA SECTION                                    */}
      {/* ======================================================== */}
      <section style={{
        padding: '3rem clamp(1rem, 3vw, 1.25rem)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(79, 70, 229, 0.05) 100%)',
        borderTop: '1px solid var(--web-border)'
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 28px)', fontWeight: 900, color: 'var(--web-text-main)', margin: 0 }}>
            {isEs
              ? '¿Listo para optimizar su CRM con tableros interactivos y drag-and-drop?'
              : 'Ready to elevate your CRM experience with customizable drag-and-drop dashboards?'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--web-text-muted)', margin: 0, lineHeight: 1.6 }}>
            {isEs
              ? 'Conecte a su equipo con una plataforma limpia, rápida y personalizada a cada puesto de trabajo.'
              : 'Empower your team with a clean, fast interface tailored directly to your team’s roles and key performance indicators.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={onOpenSales}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '8px',
                background: '#4f46e5',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(79, 70, 229, 0.3)'
              }}
            >
              <MessageSquare size={16} />
              <span>{isEs ? 'Solicitar Demostración' : 'Request Enterprise Demo'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                background: 'var(--web-surface)',
                border: '1px solid var(--web-border)',
                color: 'var(--web-text-main)',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>{isEs ? 'Volver a Funciones' : 'Explore All Features'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
