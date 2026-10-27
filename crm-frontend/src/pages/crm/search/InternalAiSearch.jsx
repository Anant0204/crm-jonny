import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Filter,
  Users,
  Target,
  FileText,
  Boxes,
  LifeBuoy,
  ChevronRight,
  Clock,
  ArrowUpRight,
  BookOpen,
  Bot,
  CheckSquare,
  FileCheck,
  Download,
  ShieldCheck,
  Zap,
  Tag,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import { useCrm } from '../../../context/CrmContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const InternalAiSearch = () => {
  const { addToast } = useToast();
  const { refreshContacts, refreshDeals } = useCrm();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (refreshContacts) refreshContacts();
    if (refreshDeals) refreshDeals();
  }, [refreshContacts, refreshDeals]);

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Exact client requested categories with Spanish labels
  const filterTabs = [
    { id: 'All', label: 'All', esLabel: 'Todo' },
    { id: 'Docs', label: 'Docs', esLabel: 'Documentos' },
    { id: 'Tasks', label: 'Tasks', esLabel: 'Tareas' },
    { id: 'Files', label: 'Files', esLabel: 'Archivos' },
    { id: 'Others', label: 'Others', esLabel: 'Otros' },
    { id: 'Contacts & Leads', label: 'Contacts & Leads', esLabel: 'Contactos y Prospectos' },
    { id: 'Deals & ERP', label: 'Deals & ERP', esLabel: 'Tratos y ERP' }
  ];

  const searchDatabase = [
    // 1. DOCS
    {
      id: 'doc-1',
      title: 'Master Services Agreement & Enterprise SLA Guarantee',
      titleEs: 'Acuerdo Maestro de Servicios y Garantía de SLA Empresarial',
      category: 'Docs',
      categoryEs: 'Documentos',
      icon: FileText,
      badgeColor: '#0ea5e9',
      snippet: 'Binding software agreement for Apex Global SaaS rollout ($450,000). Guarantees 99.98% uptime, tier-1 technical support escalation and data sovereignty.',
      snippetEs: 'Acuerdo vinculante de software para implementación de SaaS de Apex Global ($450,000). Garantiza 99.98% de disponibilidad, escalamiento de soporte técnico nivel 1 y soberanía de datos.',
      meta: 'Contract Type: Legal SaaS SLA • Format: Digital PDF • Verified: Active',
      metaEs: 'Tipo de Contrato: SLA Legal de SaaS • Formato: PDF Digital • Verificado: Activo',
      path: '/crm/pipeline',
      matchScore: '99% Match',
      matchScoreEs: '99% Coincidencia',
      date: 'Updated 2 hours ago',
      dateEs: 'Actualizado hace 2 horas',
      actionLabel: 'Open Document',
      actionLabelEs: 'Abrir Documento',
    },
    {
      id: 'doc-2',
      title: 'Mutual NDA & Proprietary AI IP Protection Brief',
      titleEs: 'NDA Mutuo e Informe de Protección de Propiedad Intelectual de IA',
      category: 'Docs',
      categoryEs: 'Documentos',
      icon: FileCheck,
      badgeColor: '#0ea5e9',
      snippet: 'Comprehensive non-disclosure and intellectual property brief covering CRM nErgy proprietary AI gateway pipelines, neural search RAG vectors, and attorney diligence.',
      snippetEs: 'Informe exhaustivo de confidencialidad y propiedad intelectual que cubre las pasarelas de IA propietarias de CRM nErgy, vectores RAG de búsqueda neuronal y diligencia legal.',
      meta: 'Signatories: Johnny (SEA) & Counsel • Encryption: AES-256 Vault',
      metaEs: 'Firmantes: Johnny (SEA) y Asesor Legal • Cifrado: Bóveda AES-256',
      path: '/crm/ebox',
      matchScore: '97% Match',
      matchScoreEs: '97% Coincidencia',
      date: 'Updated Sep 14',
      dateEs: 'Actualizado 14 de Sep',
      actionLabel: 'Open Document',
      actionLabelEs: 'Abrir Documento',
    },
    {
      id: 'doc-3',
      title: 'Cryptographic Audit Certificate (AES-256 zBox Vault)',
      titleEs: 'Certificado de Auditoría Criptográfica (Bóveda zBox AES-256)',
      category: 'Docs',
      categoryEs: 'Documentos',
      icon: ShieldCheck,
      badgeColor: '#0ea5e9',
      snippet: 'Third-party cybersecurity audit validating zero data leakage between Super Executive Admin (SEA) and KT software dev team. End-to-end encrypted messaging verified.',
      snippetEs: 'Auditoría de ciberseguridad externa que valida cero fuga de datos entre el Súper Administrador Ejecutivo (SEA) y el equipo de desarrollo de KT. Mensajería cifrada de extremo a extremo verificada.',
      meta: 'Audit ID: CERT-2026-X7 • Status: Verified Compliant',
      metaEs: 'ID de Auditoría: CERT-2026-X7 • Estado: Cumplimiento Verificado',
      path: '/crm/ebox',
      matchScore: '94% Match',
      matchScoreEs: '94% Coincidencia',
      date: 'Updated Sep 12',
      dateEs: 'Actualizado 12 de Sep',
      actionLabel: 'View Certificate',
      actionLabelEs: 'Ver Certificado',
    },

    // 2. TASKS
    {
      id: 'task-1',
      title: 'Finalize Attorney Diligence Presentation Exhibits with KT Dev Team',
      titleEs: 'Finalizar Presentaciones de Diligencia Legal con el Equipo de Desarrollo de KT',
      category: 'Tasks',
      categoryEs: 'Tareas',
      icon: CheckSquare,
      badgeColor: '#10b981',
      snippet: 'Priority: Urgent. Align 2-week timeline roadmap, verify live digital glowing energy logo animation, and confirm Secured zBox channel demonstration for investor legal diligence.',
      snippetEs: 'Prioridad: Urgente. Alinear la hoja de ruta de 2 semanas, verificar la animación del logotipo digital brillante y confirmar la demostración del canal Secured zBox para inversionistas.',
      meta: 'Assignee: Johnny (SEA) & Kiaan Tech Team • Deadline: Today, 5:00 PM',
      metaEs: 'Asignado: Johnny (SEA) y Equipo Kiaan Tech • Plazo: Hoy, 5:00 PM',
      path: '/crm/tasks',
      matchScore: '98% Match',
      matchScoreEs: '98% Coincidencia',
      date: 'Due in 4 hours',
      dateEs: 'Vence en 4 horas',
      actionLabel: 'View Task',
      actionLabelEs: 'Ver Tarea',
    },
    {
      id: 'task-2',
      title: 'Follow up on Apex Global SaaS Contract Final Execution',
      titleEs: 'Seguimiento de la Ejecución Final del Contrato SaaS de Apex Global',
      category: 'Tasks',
      categoryEs: 'Tareas',
      icon: CheckSquare,
      badgeColor: '#10b981',
      snippet: 'Priority: High. Schedule signature call with Eleanor Vance (VP of Procurement) and verify Austin central warehouse hardware terminal allocation.',
      snippetEs: 'Prioridad: Alta. Programar llamada de firma con Eleanor Vance (VP de Adquisiciones) y verificar la asignación de terminales en el almacén central de Austin.',
      meta: 'Assignee: Alexander Wright • Stage: Closing Negotiation',
      metaEs: 'Asignado: Alexander Wright • Etapa: Negociación de Cierre',
      path: '/crm/tasks',
      matchScore: '95% Match',
      matchScoreEs: '95% Coincidencia',
      date: 'Due Tomorrow',
      dateEs: 'Vence Mañana',
      actionLabel: 'View Task',
      actionLabelEs: 'Ver Tarea',
    },
    {
      id: 'task-3',
      title: 'Execute Multi-Warehouse Stock Audit for SO-2026-402',
      titleEs: 'Ejecutar Auditoría de Stock Multialmacén para SO-2026-402',
      category: 'Tasks',
      categoryEs: 'Tareas',
      icon: CheckSquare,
      badgeColor: '#10b981',
      snippet: 'Priority: Normal. Inspect 50 IoT gateway sensors staged at Central Freight Depot prior to field deployment in the West Coast Corridor.',
      snippetEs: 'Prioridad: Normal. Inspeccionar 50 sensores de puerta de enlace IoT en el Depósito Central de Carga antes del despliegue de campo en el Corredor de la Costa Oeste.',
      meta: 'Assignee: David Chen (ERP Controller) • Status: Pending Inspection',
      metaEs: 'Asignado: David Chen (Contralor ERP) • Estado: Pendiente de Inspección',
      path: '/crm/tasks',
      matchScore: '91% Match',
      matchScoreEs: '91% Coincidencia',
      date: 'Due Friday',
      dateEs: 'Vence el Viernes',
      actionLabel: 'View Task',
      actionLabelEs: 'Ver Tarea',
    },

    // 3. FILES
    {
      id: 'file-1',
      title: 'Master_Roadmap_V3.pdf (2.4 MB)',
      titleEs: 'Hoja_de_Ruta_Maestra_V3.pdf (2.4 MB)',
      category: 'Files',
      categoryEs: 'Archivos',
      icon: Download,
      badgeColor: '#f59e0b',
      snippet: 'Compiled Q3/Q4 engineering release milestones, AI Content Studio architecture, and Auto DMS dealership integration deck.',
      snippetEs: 'Hitos recopilados de lanzamiento de ingeniería de T3/T4, arquitectura del Estudio de Contenido IA y presentación de integración Auto DMS para concesionarios.',
      meta: 'File Size: 2.4 MB • Format: Adobe PDF • Download: Direct',
      metaEs: 'Tamaño: 2.4 MB • Formato: Adobe PDF • Descarga: Directa',
      path: '/crm/ebox',
      matchScore: '96% Match',
      matchScoreEs: '96% Coincidencia',
      date: 'Uploaded Sep 09',
      dateEs: 'Subido el 09 de Sep',
      actionLabel: 'Download File',
      actionLabelEs: 'Descargar Archivo',
    },
    {
      id: 'file-2',
      title: 'Enterprise_Pricing_Matrix_2026.xlsx (1.2 MB)',
      titleEs: 'Matriz_de_Precios_Empresarial_2026.xlsx (1.2 MB)',
      category: 'Files',
      categoryEs: 'Archivos',
      icon: Download,
      badgeColor: '#f59e0b',
      snippet: 'Comprehensive enterprise license calculations, per-seat tier pricing, automated commission splits, and regional auto dealership margin charts.',
      snippetEs: 'Cálculos exhaustivos de licencias empresariales, precios por nivel de usuario, división automática de comisiones y gráficos de margen regional para concesionarios.',
      meta: 'File Size: 1.2 MB • Format: Microsoft Excel • Access: Executive Only',
      metaEs: 'Tamaño: 1.2 MB • Formato: Microsoft Excel • Acceso: Solo Ejecutivos',
      path: '/crm/reports',
      matchScore: '93% Match',
      matchScoreEs: '93% Coincidencia',
      date: 'Uploaded 4 days ago',
      dateEs: 'Subido hace 4 días',
      actionLabel: 'Download File',
      actionLabelEs: 'Descargar Archivo',
    },
    {
      id: 'file-3',
      title: 'Logo_Brand_Asset_Pack_Digital_Glow.zip (14.8 MB)',
      titleEs: 'Paquete_de_Marca_Brillo_Digital.zip (14.8 MB)',
      category: 'Files',
      categoryEs: 'Archivos',
      icon: Download,
      badgeColor: '#f59e0b',
      snippet: 'Official high-resolution branding assets containing animated SVG plasma effects, dark mode gateway mockups, and client presentation icons.',
      snippetEs: 'Activos oficiales de marca de alta resolución con efectos de plasma SVG animados, maquetas de acceso en modo oscuro e iconos de presentación para clientes.',
      meta: 'File Size: 14.8 MB • Format: ZIP Archive • Resolution: 4K Vector',
      metaEs: 'Tamaño: 14.8 MB • Formato: Archivo ZIP • Resolución: Vectorial 4K',
      path: '/crm/ai-studio',
      matchScore: '90% Match',
      matchScoreEs: '90% Coincidencia',
      date: 'Uploaded 1 week ago',
      dateEs: 'Subido hace 1 semana',
      actionLabel: 'Download File',
      actionLabelEs: 'Descargar Archivo',
    },

    // 4. OTHERS
    {
      id: 'oth-1',
      title: 'AI Voice Agent Streaming Pipeline (STT ➔ LLM ➔ TTS)',
      titleEs: 'Canalización de Transmisión de Agente de Voz IA (STT ➔ LLM ➔ TTS)',
      category: 'Others',
      categoryEs: 'Otros',
      icon: Zap,
      badgeColor: '#a855f7',
      snippet: 'Real-time conversational voice agent terminal connected via Web Speech API, neural LLM prompt orchestration, and low-latency TTS natural voice synthesis.',
      snippetEs: 'Terminal de agente de voz conversacional en tiempo real conectado mediante Web Speech API, orquestación de prompts con LLM y síntesis de voz natural TTS de baja latencia.',
      meta: 'System: AI SuperHouse • Latency: ~218ms End-to-End',
      metaEs: 'Sistema: SuperCasa de IA • Latencia: ~218ms Extremo a Extremo',
      path: '/crm/ai-voice',
      matchScore: '98% Match',
      matchScoreEs: '98% Coincidencia',
      date: 'Active Real-Time',
      dateEs: 'Activo en Tiempo Real',
      actionLabel: 'Launch Voice Agent',
      actionLabelEs: 'Iniciar Agente de Voz',
    },
    {
      id: 'oth-2',
      title: 'Google Maps Territory Management & Field Optimization',
      titleEs: 'Gestión de Territorios en Google Maps y Optimización de Campo',
      category: 'Others',
      categoryEs: 'Otros',
      icon: Compass,
      badgeColor: '#a855f7',
      snippet: 'Spatial GIS engine providing route optimization, rep scheduling, prospect counts, offline access, and the 7-benefit summary matrix.',
      snippetEs: 'Motor SIG espacial que ofrece optimización de rutas, programación de representantes, recuento de prospectos, acceso fuera de línea y la matriz de 7 beneficios.',
      meta: 'Coverage: 4 Regional Corridors • Time Saved: 15.2 hrs/wk',
      metaEs: 'Cobertura: 4 Corredores Regionales • Tiempo Ahorrado: 15.2 hrs/sem',
      path: '/crm/territory',
      matchScore: '95% Match',
      matchScoreEs: '95% Coincidencia',
      date: 'Active Telemetry',
      dateEs: 'Telemetría Activa',
      actionLabel: 'Open Territory Map',
      actionLabelEs: 'Abrir Mapa de Territorio',
    },

    // 5. CONTACTS & LEADS
    {
      id: 'cont-1',
      title: 'Eleanor Vance (VP of Procurement, Apex Global)',
      titleEs: 'Eleanor Vance (VP de Adquisiciones, Apex Global)',
      category: 'Contacts & Leads',
      categoryEs: 'Contactos y Prospectos',
      icon: Users,
      badgeColor: '#38bdf8',
      snippet: 'Key executive decision maker for multi-year software procurement. Phone: +1 (555) 234-8901. Direct Email: e.vance@apex.io',
      snippetEs: 'Ejecutiva clave en la toma de decisiones para adquisiciones de software multianual. Teléfono: +1 (555) 234-8901. Correo: e.vance@apex.io',
      meta: 'Account: Apex Global • Lead Score: 98 • Status: Qualified',
      metaEs: 'Cuenta: Apex Global • Calificación: 98 • Estado: Calificado',
      path: '/crm/contacts',
      matchScore: '92% Match',
      matchScoreEs: '92% Coincidencia',
      date: 'Contacted Yesterday',
      dateEs: 'Contactado Ayer',
      actionLabel: 'View Contact',
      actionLabelEs: 'Ver Contacto',
    },

    // 6. DEALS & ERP
    {
      id: 'deal-1',
      title: 'Apex Global Technologies SaaS Contract ($450,000)',
      titleEs: 'Contrato SaaS de Apex Global Technologies ($450,000)',
      category: 'Deals & ERP',
      categoryEs: 'Tratos y ERP',
      icon: Target,
      badgeColor: '#ec4899',
      snippet: 'Contract Stage: Legal Review. SLA guarantee 99.98% uptime with dedicated tier-1 support desk. Executive sponsor Alexander Wright.',
      snippetEs: 'Etapa del Contrato: Revisión Legal. Garantía de SLA de 99.98% de disponibilidad con mesa de soporte dedicada de nivel 1. Patrocinador: Alexander Wright.',
      meta: 'Value: $450,000 • Margin: 72% • Stage: Negotiation',
      metaEs: 'Valor: $450,000 • Margen: 72% • Etapa: Negociación',
      path: '/crm/pipeline',
      matchScore: '94% Match',
      matchScoreEs: '94% Coincidencia',
      date: 'Closing This Month',
      dateEs: 'Cierre este Mes',
      actionLabel: 'View Deal',
      actionLabelEs: 'Ver Trato',
    },
  ];

  const filteredResults = searchDatabase.filter((item) => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    if (!matchesFilter) return false;

    if (!query || query.trim() === '') return true;

    const q = query.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.titleEs && item.titleEs.toLowerCase().includes(q)) ||
      item.snippet.toLowerCase().includes(q) ||
      (item.snippetEs && item.snippetEs.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q) ||
      (item.categoryEs && item.categoryEs.toLowerCase().includes(q)) ||
      item.meta.toLowerCase().includes(q) ||
      (item.metaEs && item.metaEs.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: 'CRM nErgy AI' },
              { label: t('Governance & Data') },
              { label: t('Internal AI Search') },
            ]}
          />
          <div className="flex items-center gap-3 mt-1">
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(14, 165, 233, 0.35)',
                color: '#ffffff',
                flexShrink: 0
              }}
            >
              <Search size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-display tracking-tight text-primary m-0">
                  {t('Internal Search Engine Bar')}
                </h1>
                <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
                  {t('AI Cognitive RAG')}
                </Badge>
              </div>
              <p className="text-xs text-secondary mt-0.5 mb-0">
                {t('Search docs, tasks, files and others with AI across your entire enterprise workspace.')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              color: '#0ea5e9',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <Sparkles size={14} />
            <span>{t('Neural Semantic Index Active')}</span>
          </div>
        </div>
      </div>

      {/* Main Search Engine Bar Container */}
      <Card
        className="border shadow-sm"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          border: '1px solid var(--border)',
          borderRadius: '16px'
        }}
      >
        {/* Large Prominent AI Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 18px',
            borderRadius: '12px',
            backgroundColor: 'var(--surface-secondary, rgba(15, 23, 42, 0.04))',
            border: '2px solid rgba(14, 165, 233, 0.35)',
            transition: 'border-color 0.2s',
          }}
        >
          <Search size={20} style={{ color: '#0ea5e9', flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search docs, tasks, files and others with AI...')}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '14.5px',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '12px',
                padding: '4px 8px',
                fontWeight: 600
              }}
            >
              {t('Clear')}
            </button>
          )}
          <Button
            variant="primary"
            onClick={() =>
              addToast({
                title: t('AI Search Dispatched', 'Búsqueda IA Enviada'),
                message: `${t('Deep neural scanning executed for', 'Escaneo neuronal profundo ejecutado para')} "${query || t('Todos los registros')}". ${t('Found', 'Encontrados')} ${filteredResults.length} ${t('Records', 'Registros')}.`,
                type: 'info',
              })
            }
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', fontWeight: 700, borderRadius: '8px' }}
          >
            <Sparkles size={16} />
            <span>{t('Search with AI')}</span>
          </Button>
        </div>

        {/* Category Filter Pills (Docs, Tasks, Files, Others, etc.) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: 2, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', marginRight: 4, letterSpacing: '0.04em' }}>
            {t('Filter by:')}
          </span>
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid #0ea5e9' : '1px solid var(--border)',
                  backgroundColor: isSelected ? '#0ea5e9' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(14, 165, 233, 0.3)' : 'none'
                }}
              >
                {language === 'ES' ? tab.esLabel : tab.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* AI Synthesized Executive Answer Summary */}
      <Card
        className="border shadow-sm"
        style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%), var(--surface-primary)',
          border: '1px solid rgba(14, 165, 233, 0.25)',
          borderRadius: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0ea5e9', fontWeight: 800, fontSize: '14px' }}>
            <Bot size={18} />
            <span>{t('AI Executive Synthesis & Knowledge RAG')}</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600 }}>
            {t('Generated in 184ms • Verified Sources: 6 Indexes')}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.65 }}>
          {language === 'ES' ? (
            <>
              Consultando en <strong>Documentos</strong>, <strong>Tareas</strong>, <strong>Archivos</strong> y <strong>Otros</strong> empresariales:
              Se encontraron documentos legales activos, incluidos el <strong>Acuerdo Maestro de Servicios ($450k)</strong> y el <strong>Certificado de Auditoría Criptográfica</strong>.
              Hay 3 tareas de alta prioridad asignadas a <strong>Johnny (SEA)</strong> y <strong>Alexander Wright</strong>, incluidas las próximas presentaciones con el equipo de desarrollo de KT.
              3 archivos de activos descargables (Hoja de Ruta V3, Matriz de Precios, Paquete de Marca) están listos para acceder.
            </>
          ) : (
            <>
              Querying across enterprise <strong>Docs</strong>, <strong>Tasks</strong>, <strong>Files</strong>, and <strong>Others</strong>:
              Found active legal documents including the <strong>Master Services Agreement ($450k)</strong> and <strong>Cryptographic Audit Certificate</strong>.
              There are 3 high-priority tasks assigned to <strong>Johnny (SEA)</strong> and <strong>Alexander Wright</strong>, including the upcoming attorney presentation exhibits with the KT dev team.
              3 downloadable asset files (Roadmap V3, Pricing Matrix, Brand Pack) are ready for access.
            </>
          )}
        </p>
      </Card>

      {/* Relevant Search Results Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
            {t('Search Results')} ({filteredResults.length} {t('Records')})
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            {t('Sorted by Neural RAG Match Relevance')}
          </span>
        </div>

        {filteredResults.map((item) => {
          const Icon = item.icon;
          const isES = language === 'ES';
          const title = isES && item.titleEs ? item.titleEs : item.title;
          const category = isES && item.categoryEs ? item.categoryEs : item.category;
          const snippet = isES && item.snippetEs ? item.snippetEs : item.snippet;
          const meta = isES && item.metaEs ? item.metaEs : item.meta;
          const date = isES && item.dateEs ? item.dateEs : item.date;
          const matchScore = isES && item.matchScoreEs ? item.matchScoreEs : item.matchScore;
          const actionLabel = isES && item.actionLabelEs ? item.actionLabelEs : item.actionLabel;

          return (
            <Card
              key={item.id}
              onClick={() => navigate(item.path)}
              className="border shadow-sm transition-all"
              style={{
                padding: '1.15rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                cursor: 'pointer',
                borderRadius: '12px',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0ea5e9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '10px',
                    backgroundColor: `${item.badgeColor}18`,
                    color: item.badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: `${item.badgeColor}22`,
                        color: item.badgeColor,
                      }}
                    >
                      {category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>{matchScore}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>• {date}</span>
                  </div>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 6px 0', lineHeight: 1.5, maxWidth: '840px' }}>
                    {snippet}
                  </p>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{meta}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0ea5e9', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                <span>{actionLabel}</span>
                <ArrowUpRight size={15} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InternalAiSearch;
