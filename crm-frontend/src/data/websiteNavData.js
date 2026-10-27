import {
  Users,
  Target,
  Kanban,
  CheckSquare,
  MessageSquare,
  Boxes,
  UserCheck,
  LifeBuoy,
  Sparkles,
  ShieldCheck,
  Settings,
  DollarSign,
  Landmark,
  FileText,
  CreditCard,
  Building2,
  TrendingUp,
  History,
  BookOpen,
  MapPin,
  Bot,
  Video,
  Megaphone,
  Grid,
  Search,
  Car,
  Lock,
  Layers,
  Sliders,
  FileCheck,
  Download,
  HelpCircle,
  Zap,
  Globe,
  Briefcase,
  Smartphone,
  Factory,
  Package,
  ShoppingCart,
  PieChart,
  FolderKanban,
  ShoppingBag,
  Truck,
  FileSpreadsheet,
  Cpu,
  Radio,
  Tv,
  GraduationCap,
  HeartPulse,
  Compass,
  Store,
  Share2,
  Award,
  Shield,
  Plane,
  Building,
  Headphones,
  FileCode,
  Rocket
} from 'lucide-react';
import { INDUSTRY_CLIENT_DETAILS } from './industryDetailsData';

function LayoutDashboardIcon() {
  return Grid;
}

function LayoutGridIcon() {
  return Globe;
}

// 23 CRM FEATURES specified in client document (Dual English & Spanish)
export const CRM_FEATURES_DATA = [
  {
    id: 'industries-homepage',
    name: 'Industries Homepage',
    nameEs: 'Página de Industrias',
    category: 'Ecosystem & Overview',
    categoryEs: 'Ecosistema y Resumen',
    icon: Globe,
    desc: 'Centralized hub mapping industry-specific workflows, modules, and compliance templates.',
    descEs: 'Centro unificado que mapea flujos de trabajo específicos por industria, módulos y plantillas de cumplimiento.',
    tag: 'Overview',
    tagEs: 'Resumen'
  },
  {
    id: 'affiliate-management',
    name: 'Affiliate Management',
    nameEs: 'Gestión de Afiliados',
    category: 'Sales & Growth',
    categoryEs: 'Ventas y Crecimiento',
    icon: Award,
    desc: 'Multi-tiered partner referral tracking, commission payouts, and automated affiliate portal.',
    descEs: 'Seguimiento de referencias multinivel, liquidación de comisiones y portal de afiliados automatizado.',
    tag: 'Revenue',
    tagEs: 'Ingresos'
  },
  {
    id: 'analytic-accounting',
    name: 'Analytic Accounting',
    nameEs: 'Contabilidad Analítica',
    category: 'Finance & Operations',
    categoryEs: 'Finanzas y Operaciones',
    icon: PieChart,
    desc: 'Multi-dimensional cost center ledger, project margin tracking, and financial analytics.',
    descEs: 'Libro de centros de costos multidimensional, seguimiento de márgenes de proyectos y analítica financiera.',
    tag: 'Finance',
    tagEs: 'Finanzas',
    route: '/features/analytic-accounting'
  },
  {
    id: 'contact-management',
    name: 'Contact Management',
    nameEs: 'Gestión de Contactos',
    category: 'Core CRM',
    categoryEs: 'CRM Principal',
    icon: Users,
    desc: '360° corporate and individual profiles, interaction timeline, and communication history.',
    descEs: 'Perfiles corporativos e individuales 360°, cronología de interacción e historial de comunicaciones.',
    tag: 'Core',
    tagEs: 'Principal'
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    nameEs: 'Atención al Cliente',
    category: 'Support & Success',
    categoryEs: 'Soporte y Éxito',
    icon: Headphones,
    desc: 'Multi-channel SLA ticketing, automated escalations, and customer satisfaction tracking.',
    descEs: 'Emisión de tickets SLA multicanal, derivaciones automáticas y seguimiento de satisfacción del cliente.',
    tag: 'Support',
    tagEs: 'Soporte'
  },
  {
    id: 'customizable-dashboards',
    name: 'Customizable Dashboards',
    nameEs: 'Tableros Personalizables',
    category: 'Core CRM',
    categoryEs: 'CRM Principal',
    icon: LayoutDashboardIcon(),
    desc: 'Drag-and-drop KPI widgets, executive telemetry, and role-based real-time visualizations.',
    descEs: 'Widgets de KPI arrastrar y soltar, telemetría ejecutiva y visualizaciones en tiempo real por roles.',
    tag: 'Analytics',
    tagEs: 'Analítica',
    route: '/features/customizable-dashboards'
  },
  {
    id: 'data-management',
    name: 'Data Management',
    nameEs: 'Gestión de Datos',
    category: 'Governance & Security',
    categoryEs: 'Gobernanza y Seguridad',
    icon: Layers,
    desc: 'Enterprise data hygiene, deduplication, automated backups, and SHA-256 integrity checks.',
    descEs: 'Higiene de datos empresariales, deduplicación, copias de seguridad automáticas y comprobación SHA-256.',
    tag: 'Security',
    tagEs: 'Seguridad'
  },
  {
    id: 'financial-accounting',
    name: 'Financial Accounting',
    nameEs: 'Contabilidad Financiera',
    category: 'Finance & Operations',
    categoryEs: 'Finanzas y Operaciones',
    icon: DollarSign,
    desc: 'Double-entry general ledger, automated bank reconciliation, and GAAP/IFRS tax reporting.',
    descEs: 'Libro mayor de partida doble, conciliación bancaria automática e informes fiscales GAAP/IFRS.',
    tag: 'Finance',
    tagEs: 'Finanzas'
  },
  {
    id: 'inventory-management',
    name: 'Inventory Management',
    nameEs: 'Gestión de Inventario',
    category: 'ERP & Logistics',
    categoryEs: 'ERP y Logística',
    icon: Package,
    desc: 'Multi-warehouse stock tracking, automated reorder triggers, and SKU barcode syncing.',
    descEs: 'Control de existencias multialmacén, disparadores automáticos de reorden y sincronización de código de barras.',
    tag: 'Operations',
    tagEs: 'Operaciones'
  },
  {
    id: 'landing-page-creator',
    name: 'Landing Page Creator',
    nameEs: 'Creador de Landing Pages',
    category: 'Marketing & Web',
    categoryEs: 'Marketing y Web',
    icon: LayoutGridIcon(),
    desc: 'Intuitive drag-and-drop page builder for high-converting marketing campaigns and lead funnels.',
    descEs: 'Constructor visual de páginas de arrastrar y soltar para campañas de marketing y embudos de alta conversión.',
    tag: 'Growth',
    tagEs: 'Crecimiento'
  },
  {
    id: 'lead-management',
    name: 'Lead Management',
    nameEs: 'Gestión de Prospectos',
    category: 'Sales & Growth',
    categoryEs: 'Ventas y Crecimiento',
    icon: Target,
    desc: 'AI prospect scoring, automated qualification pipelines, and inbound capture automation.',
    descEs: 'Calificación de prospectos con IA, embudos automatizados y captura entrante omnicanal.',
    tag: 'Sales',
    tagEs: 'Ventas'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    nameEs: 'Fabricación y Manufactura',
    category: 'ERP & Logistics',
    categoryEs: 'ERP y Logística',
    icon: Factory,
    desc: 'Bill of Materials (BOM), work center scheduling, production orders, and QA routing.',
    descEs: 'Lista de materiales (BOM), programación de centros de trabajo, órdenes de producción y control de calidad.',
    tag: 'Operations',
    tagEs: 'Operaciones'
  },
  {
    id: 'marketing-automation',
    name: 'Marketing Automation',
    nameEs: 'Automatización de Marketing',
    category: 'Marketing & Web',
    categoryEs: 'Marketing y Web',
    icon: Megaphone,
    desc: 'Omnichannel drip campaigns, email/SMS sequences, and generative AI content personalization.',
    descEs: 'Campañas de goteo omnicanal, secuencias de email/SMS y personalización de contenido con IA generativa.',
    tag: 'Growth',
    tagEs: 'Crecimiento'
  },
  {
    id: 'mobile-access',
    name: 'Mobile Access',
    nameEs: 'Acceso Móvil',
    category: 'Core CRM',
    categoryEs: 'CRM Principal',
    icon: Smartphone,
    desc: 'Native-feel mobile responsive experience with offline sync and on-the-go deal management.',
    descEs: 'Experiencia móvil nativa receptiva con sincronización sin conexión y gestión de tratos en movimiento.',
    tag: 'Mobile',
    tagEs: 'Móvil'
  },
  {
    id: 'payroll-processing',
    name: 'Payroll Processing',
    nameEs: 'Procesamiento de Nómina',
    category: 'Finance & Operations',
    categoryEs: 'Finanzas y Operaciones',
    icon: FileSpreadsheet,
    desc: 'Automated salary calculation, direct deposit scheduling, and corporate tax withholding.',
    descEs: 'Cálculo automático de salarios, programación de depósitos directos y retención de impuestos corporativos.',
    tag: 'Finance',
    tagEs: 'Finanzas'
  },
  {
    id: 'project-management',
    name: 'Project Management',
    nameEs: 'Gestión de Proyectos',
    category: 'ERP & Logistics',
    categoryEs: 'ERP y Logística',
    icon: FolderKanban,
    desc: 'Gantt charts, milestone tracking, resource allocation, and budget burn telemetry.',
    descEs: 'Diagramas de Gantt, seguimiento de hitos, asignación de recursos y telemetría de consumo de presupuesto.',
    tag: 'Operations',
    tagEs: 'Operaciones'
  },
  {
    id: 'purchasing-management',
    name: 'Purchasing Management',
    nameEs: 'Gestión de Compras',
    category: 'ERP & Logistics',
    categoryEs: 'ERP y Logística',
    icon: ShoppingBag,
    desc: 'Purchase order approval routing, vendor price comparison, and automatic 3-way matching.',
    descEs: 'Aprobación de órdenes de compra, comparación de precios de proveedores y conciliación triple automática.',
    tag: 'Operations',
    tagEs: 'Operaciones'
  },
  {
    id: 'recruitment-onboarding',
    name: 'Recruitment and Onboarding',
    nameEs: 'Reclutamiento e Integración',
    category: 'HR & Talent',
    categoryEs: 'RR.HH. y Talento',
    icon: UserCheck,
    desc: 'Candidate pipeline tracking, AI resume parsing, automated interview scheduling, and e-signatures.',
    descEs: 'Embudo de candidatos, análisis de CV con IA, programación automática de entrevistas y firmas electrónicas.',
    tag: 'HR',
    tagEs: 'RR.HH.'
  },
  {
    id: 'sales-management',
    name: 'Sales Management',
    nameEs: 'Gestión de Ventas',
    category: 'Sales & Growth',
    categoryEs: 'Ventas y Crecimiento',
    icon: Kanban,
    desc: 'Kanban sales pipeline, contract quotation builder, and sales rep commission tracking.',
    descEs: 'Embudo de ventas Kanban, generador de presupuestos de contratos y seguimiento de comisiones comerciales.',
    tag: 'Sales',
    tagEs: 'Ventas'
  },
  {
    id: 'subscription-management',
    name: 'Subscription Management',
    nameEs: 'Gestión de Suscripciones',
    category: 'Sales & Growth',
    categoryEs: 'Ventas y Crecimiento',
    icon: CreditCard,
    desc: 'Recurring SaaS billing, automated dunning, upgrade/downgrade workflows, and MRR tracking.',
    descEs: 'Facturación SaaS recurrente, recobro automático, flujos de actualización y seguimiento de MRR.',
    tag: 'Revenue',
    tagEs: 'Ingresos'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    nameEs: 'Cadena de Suministro',
    category: 'ERP & Logistics',
    categoryEs: 'ERP y Logística',
    icon: Truck,
    desc: 'Freight routing, vendor SLA audits, multi-modal tracking, and customs compliance.',
    descEs: 'Enrutamiento de transporte de carga, auditorías de SLA a proveedores, rastreo multimodal y aduanas.',
    tag: 'Operations',
    tagEs: 'Operaciones'
  },
  {
    id: 'territory-management',
    name: 'Territory Management',
    nameEs: 'Gestión de Territorios',
    category: 'Sales & Growth',
    categoryEs: 'Ventas y Crecimiento',
    icon: MapPin,
    desc: 'Geographic sales territory assignment, quota distribution, and regional revenue maps.',
    descEs: 'Asignación geográfica de territorios de ventas, distribución de cuotas y mapas de ingresos regionales.',
    tag: 'Sales',
    tagEs: 'Ventas'
  },
  {
    id: 'white-label-crm',
    name: 'White Label CRM',
    nameEs: 'CRM Marca Blanca',
    category: 'Governance & Security',
    categoryEs: 'Gobernanza y Seguridad',
    icon: Sparkles,
    desc: 'Custom domain branding, company logo embedding, and bespoke client portal styling.',
    descEs: 'Identidad de marca con dominio propio, integración de logotipo y diseño a medida del portal de clientes.',
    tag: 'Enterprise',
    tagEs: 'Empresarial'
  }
];

// 4 CRM SOLUTIONS GROUPS with all 15 items (Dual English & Spanish)
export const CRM_SOLUTIONS_DATA = [
  {
    groupTitle: '4 Types of CRM Software',
    groupTitleEs: '4 Tipos de Software CRM',
    subtitle: 'Architectural Frameworks',
    subtitleEs: 'Marcos Arquitectónicos',
    badge: 'Frameworks',
    badgeEs: 'Marcos',
    items: [
      {
        id: 'analytical-crm',
        name: 'Analytical CRM',
        nameEs: 'CRM Analítico',
        icon: TrendingUp,
        desc: 'Advanced customer telemetry, cohort behavior models, and predictive lifetime value (LTV) calculation.',
        descEs: 'Telemetría avanzada de clientes, modelos de cohortes y cálculo predictivo de valor de por vida (LTV).'
      },
      {
        id: 'collaborative-crm',
        name: 'Collaborative CRM',
        nameEs: 'CRM Colaborativo',
        icon: Users,
        desc: 'Cross-departmental data synchronization between sales, customer service, marketing, and executives.',
        descEs: 'Sincronización interdepartamental de datos entre ventas, atención al cliente, marketing y directivos.'
      },
      {
        id: 'operational-crm',
        name: 'Operational CRM',
        nameEs: 'CRM Operativo',
        icon: Sliders,
        desc: 'Automation of daily front-office workflows including lead routing, sales orders, and customer ticketing.',
        descEs: 'Automatización de flujos diarios que incluye enrutamiento de prospectos, pedidos y soporte.'
      },
      {
        id: 'strategic-crm',
        name: 'Strategic CRM',
        nameEs: 'CRM Estratégico',
        icon: Target,
        desc: 'Long-term relationship optimization, customer retention programs, and value-maximization frameworks.',
        descEs: 'Optimización de relaciones a largo plazo, programas de retención y marcos de maximización de valor.'
      }
    ]
  },
  {
    groupTitle: 'Business CRM Software',
    groupTitleEs: 'Software CRM para Negocios',
    subtitle: 'Operational Scale',
    subtitleEs: 'Escala Operativa',
    badge: 'Business',
    badgeEs: 'Negocios',
    route: '/solutions/business-crm',
    items: [
      {
        id: 'crm-contact-ai',
        name: 'Contact AI',
        nameEs: 'Contact AI (Centro de Contacto con IA)',
        icon: Bot,
        desc: 'Intelligent omnichannel voice, chat, and automated customer routing powered by conversational AI.',
        descEs: 'Canales inteligentes de voz, chat y enrutamiento automatizado de clientes con IA conversacional.',
        route: '/solutions/contact-ai'
      },
      {
        id: 'crm-franchise',
        name: 'CRM Software for Franchise Businesses',
        nameEs: 'Software CRM para Franquicias',
        icon: Building2,
        desc: 'Multi-location inventory sync, centralized royalties tracking, and standardized brand operating procedures.',
        descEs: 'Control centralizado de sucursales, cálculo de regalías y procedimientos de marca estandarizados.',
        route: '/solutions/franchise'
      },
      {
        id: 'crm-startups',
        name: 'CRM Software for Startups',
        nameEs: 'Software CRM para Startups',
        icon: Zap,
        desc: 'Frictionless fast onboarding, ultra-low CAC pipelines, and automated growth engine for agile teams.',
        descEs: 'Incorporación ágil y rápida, embudos de bajo CAC y motor de crecimiento automatizado.',
        route: '/solutions/startups'
      },
      {
        id: 'crm-small-mid-size',
        name: 'CRM Software for Small to Mid-Size Businesses',
        nameEs: 'Software CRM para PyMEs',
        icon: Boxes,
        desc: 'Right-sized modular ERP + CRM suites engineered for scaling mid-market enterprises.',
        descEs: 'Suites modulares de ERP y CRM diseñadas para empresas medianas en fase de expansión.',
        route: '/solutions/mid-size'
      },
      {
        id: 'crm-professional-services',
        name: 'Professional Services CRM',
        nameEs: 'CRM para Servicios Profesionales',
        icon: Briefcase,
        desc: 'Hourly rate billing, milestone delivery schedules, and client retainer SLA governance.',
        descEs: 'Facturación por horas, cronogramas de entrega de hitos y acuerdos de nivel de servicio (SLA).',
        route: '/industries/professional-services'
      }
    ]
  },
  {
    groupTitle: 'CRM Software for Entrepreneurs',
    groupTitleEs: 'Software CRM para Emprendedores',
    subtitle: 'Tailored Personas',
    subtitleEs: 'Perfiles Personalizados',
    badge: 'Entrepreneurs',
    badgeEs: 'Emprendedores',
    items: [
      {
        id: 'crm-solopreneurs',
        name: 'CRM for Solopreneurs',
        nameEs: 'CRM para Solopreneurs',
        icon: UserCheck,
        desc: 'Single-operator command center merging calendar, lead capture, payments, and automated invoices.',
        descEs: 'Centro de comando para operadores individuales que une agenda, prospectos, cobros y facturas.'
      },
      {
        id: 'crm-freelancers',
        name: 'CRM for Freelancers',
        nameEs: 'CRM para Freelancers',
        icon: FileText,
        desc: 'Project-based retainer management, proposal generator, contract e-signatures, and time logging.',
        descEs: 'Gestión de proyectos independientes, generador de propuestas, firmas electrónicas y registro de tiempo.'
      },
      {
        id: 'crm-influencers',
        name: 'CRM for Influencers',
        nameEs: 'CRM para Influencers',
        icon: Sparkles,
        desc: 'Brand sponsorship contract pipelines, media kit distribution, affiliate tracking, and audience metrics.',
        descEs: 'Gestión de contratos de patrocinio, kit de medios, comisiones de afiliados y analítica de audiencia.',
        route: '/solutions/influencers'
      },
      {
        id: 'crm-real-estate-agents',
        name: 'CRM for Real Estate Agents',
        nameEs: 'CRM para Agentes Inmobiliarios',
        icon: Building,
        desc: 'Property listing synchronization, MLS integration, buyer-seller matching, and escrow milestones.',
        descEs: 'Sincronización de propiedades, listados MLS, cruce de compradores-vendedores y escrituración.'
      }
    ]
  },
  {
    groupTitle: 'Third Party Integration',
    groupTitleEs: 'Integración con Terceros',
    subtitle: 'Seamless Ecosystem',
    subtitleEs: 'Ecosistema Conectado',
    badge: 'Integrations',
    badgeEs: 'Integraciones',
    items: [
      {
        id: 'accounting-software-integration',
        name: 'Accounting Software Integration',
        nameEs: 'Integración con Software Contable',
        icon: DollarSign,
        desc: 'Certified connectors for QuickBooks, Xero, Sage, and SAP for bi-directional ledger synchronization.',
        descEs: 'Conectores certificados para QuickBooks, Xero, Sage y SAP con sincronización contable bidireccional.'
      },
      {
        id: 'marketing-automation-integration',
        name: 'Marketing Automation Integration',
        nameEs: 'Integración de Marketing',
        icon: Megaphone,
        desc: 'Real-time sync with Mailchimp, HubSpot, Klaviyo, and Meta Ads for continuous audience attribution.',
        descEs: 'Sincronización en tiempo real con Mailchimp, HubSpot, Klaviyo y Meta Ads para atribución de audiencias.'
      },
      {
        id: 'third-party-crm-erp-integration',
        name: 'Third-Party CRM ERP Integration',
        nameEs: 'Integración de CRM y ERP de Terceros',
        icon: Cpu,
        desc: 'High-throughput bi-directional data pipelines bridging external legacy systems with CRM nErgy.',
        descEs: 'Canalizaciones de datos bidireccionales de alto rendimiento para vincular sistemas externos con CRM nErgy.'
      }
    ]
  }
];

// 23 INDUSTRIES specified in client document (Dual English & Spanish)
const BASE_INDUSTRIES_DATA = [
  { id: 'ind-home', name: 'Industries Homepage', nameEs: 'Página de Industrias', icon: Globe, desc: 'Centralized directory of specialized sector frameworks.', descEs: 'Directorio centralizado de marcos especializados por sector empresarial.' },
  { id: 'automotive', name: 'Automotive', nameEs: 'Automotriz', icon: Car, desc: 'Dealership management, vehicle inventory sync, desking & repair center.', descEs: 'Gestión de concesionarios, sincronización de inventario de vehículos y taller de servicio.', route: '/industries/automotive' },
  { id: 'construction', name: 'Construction', nameEs: 'Construcción', icon: Building, desc: 'Jobsite bidding, subcontractor agreements, equipment and material logistics.', descEs: 'Licitaciones de obra, contratos de subcontratistas y logística de materiales y maquinaria.', route: '/industries/construction' },
  { id: 'consulting-firms', name: 'Consulting Firms', nameEs: 'Firmas de Consultoría', icon: Briefcase, desc: 'Billable hours, client milestone delivery, and multi-team advisory decks.', descEs: 'Horas facturables, entrega de hitos para clientes y asesoría integral de múltiples equipos.', route: '/industries/consulting-firms' },
  { id: 'e-commerce', name: 'E-commerce', nameEs: 'Comercio Electrónico', icon: ShoppingCart, desc: 'Cart abandonment recapture, fulfillment tracking, and customer loyalty retention.', descEs: 'Recuperación de carritos abandonados, trazabilidad de pedidos y fidelización de clientes.', route: '/industries/e-commerce' },
  { id: 'education', name: 'Education', nameEs: 'Educación', icon: GraduationCap, desc: 'Student enrollment admissions, faculty records, and curriculum management.', descEs: 'Admisiones e inscripciones de estudiantes, expedientes académicos y planes de estudio.', route: '/industries/education' },
  { id: 'entertainment', name: 'Entertainment', nameEs: 'Entretenimiento', icon: Tv, desc: 'Talent management, royalties distribution, and media production schedules.', descEs: 'Gestión de talento, distribución de regalías y calendarios de producción de medios.', route: '/industries/entertainment' },
  { id: 'financial-services', name: 'Financial Services', nameEs: 'Servicios Financieros', icon: Landmark, desc: 'FinCEN KYC compliance, institutional asset registries, and loan servicing.', descEs: 'Cumplimiento normativo KYC, registros de activos institucionales y administración de préstamos.', route: '/industries/financial-services' },
  { id: 'healthcare', name: 'Healthcare', nameEs: 'Salud y Clínicas', icon: HeartPulse, desc: 'HIPAA-compliant records, patient intake scheduling, and clinic operations.', descEs: 'Registros clínicos bajo norma HIPAA, programación de citas y operaciones médicas.', route: '/industries/healthcare' },
  { id: 'hospitality', name: 'Hospitality', nameEs: 'Hotelería y Turismo', icon: Compass, desc: 'Guest reservation engines, event booking, and concierge operations.', descEs: 'Motores de reserva de huéspedes, gestión de eventos y servicios de conserjería.', route: '/industries/hospitality' },
  { id: 'insurance', name: 'Insurance', nameEs: 'Seguros', icon: Shield, desc: 'Policy underwriting, claims processing, and broker commission settlements.', descEs: 'Suscripción de pólizas, tramitación de reclamos y liquidación de comisiones de corredores.', route: '/industries/insurance' },
  { id: 'manufacturing-ind', name: 'Manufacturing', nameEs: 'Fabricación y Manufactura', icon: Factory, desc: 'Shop floor telemetry, production lines, and raw material supply chain.', descEs: 'Telemetría de planta, líneas de producción continua y cadena de insumos industriales.', route: '/industries/manufacturing' },
  { id: 'marketing-ind', name: 'Marketing', nameEs: 'Marketing y Publicidad', icon: Megaphone, desc: 'Client account management, ad campaign analytics, and deliverable tracking.', descEs: 'Gestión de cuentas de clientes, analítica de campañas publicitarias y entregables.', route: '/industries/marketing' },
  { id: 'media-ind', name: 'Media', nameEs: 'Medios de Comunicación', icon: Radio, desc: 'Digital asset warehouses, broadcast syndication, and editorial calendars.', descEs: 'Bancos de activos digitales, sindicación de transmisiones y calendarios editoriales.', route: '/industries/media' },
  { id: 'non-profit', name: 'Non-Profit', nameEs: 'Organizaciones sin Fines de Lucro', icon: Award, desc: 'Donor management, charitable grant tracking, and fundraising campaigns.', descEs: 'Gestión de donantes, seguimiento de subvenciones benéficas y campañas de recaudación.', route: '/industries/non-profit' },
  { id: 'professional-services', name: 'Professional Services', nameEs: 'Servicios Profesionales', icon: FileCheck, desc: 'Client retainer billing, SLA tracking, and audit-ready reporting.', descEs: 'Facturación por honorarios fijos, cumplimiento de acuerdos SLA e informes auditables.', route: '/industries/professional-services' },
  { id: 'real-estate', name: 'Real Estate', nameEs: 'Bienes Raíces', icon: Building2, desc: 'Property listings, broker commission splits, and escrow pipeline.', descEs: 'Listado de propiedades inmobiliarias, división de comisiones y embudo notarial.', route: '/industries/real-estate' },
  { id: 'retail', name: 'Retail', nameEs: 'Comercio Minorista', icon: Store, desc: 'Omnichannel POS, in-store inventory balances, and loyalty programs.', descEs: 'Punto de venta (TPV) omnicanal, inventario físico en tiendas y programas de puntos.', route: '/industries/retail' },
  { id: 'software-dev', name: 'Software Development', nameEs: 'Desarrollo de Software', icon: FileCode, desc: 'Sprint planning, bug issue tracking, and client code delivery milestones.', descEs: 'Planificación de sprints ágiles, seguimiento de incidencias y entregas de código.', route: '/industries/software-development' },
  { id: 'technology', name: 'Technology', nameEs: 'Tecnología', icon: Cpu, desc: 'Hardware lifecycle, cloud license provisioning, and IT asset control.', descEs: 'Ciclo de vida de hardware, aprovisionamiento de licencias cloud y gestión de activos TI.', route: '/industries/technology' },
  { id: 'telecom', name: 'Telecom', nameEs: 'Telecomunicaciones', icon: Radio, desc: 'Subscriber billing, infrastructure maintenance, and service dispatch.', descEs: 'Facturación de suscriptores, mantenimiento de infraestructura de telecomunicaciones y despacho técnico.', route: '/industries/telecom' },
  { id: 'travel', name: 'Travel', nameEs: 'Viajes y Turismo', icon: Plane, desc: 'Itinerary builders, airline/hotel partner APIs, and traveler support.', descEs: 'Creador de itinerarios, integración de APIs de aerolíneas y hoteles, y atención al viajero.', route: '/industries/travel' },
  { id: 'unique-service-biz', name: 'Unique Service Business', nameEs: 'Negocios de Servicios Exclusivos', icon: Sparkles, desc: 'Bespoke custom workflow configurations for niche enterprise operations.', descEs: 'Configuraciones de flujo de trabajo personalizadas para operaciones comerciales de nicho.', route: '/industries/unique-service-biz' }
];

export const INDUSTRIES_DATA = BASE_INDUSTRIES_DATA.map(item => {
  const extra = INDUSTRY_CLIENT_DETAILS && INDUSTRY_CLIENT_DETAILS[item.id];
  if (extra) {
    return {
      ...item,
      title: extra.title || item.name,
      titleEs: extra.titleEs || item.nameEs,
      tagline: extra.tagline || 'CRM Solutions Every Business Needs',
      subSectors: extra.subSectors || [],
      clientOverview: extra.overview || item.desc,
      capabilities: extra.capabilities || [],
      clientFaqs: extra.faqs || []
    };
  }
  return item;
});

// FAQS DATA as required by client document (Dual English & Spanish)
export const FAQ_QUESTIONS_DATA = [
  {
    q: 'What is CRM nErgy AI and how is it different from traditional CRMs?',
    qEs: '¿Qué es CRM nErgy AI y en qué se diferencia de los CRM tradicionales?',
    a: 'CRM nErgy AI is a next-generation unified enterprise operating system combining comprehensive CRM, full ERP operations, HR, Customer Support, and the ZUNME AI Studio. Unlike legacy CRMs like Salesforce that require costly third-party add-ons, CRM nErgy integrates everything natively into one high-performance platform.',
    aEs: 'CRM nErgy AI es un sistema operativo empresarial unificado de última generación que combina CRM integral, operaciones ERP completas, RR.HH., soporte al cliente y el ZUNME AI Studio. A diferencia de CRM heredados que requieren costosos complementos externos, CRM nErgy integra todo de forma nativa en una plataforma de alto rendimiento.'
  },
  {
    q: 'What is My Zunme (AI Platform for Content & Warehouse)?',
    qEs: '¿Qué es My Zunme (Plataforma de IA para Contenido y Almacén)?',
    a: 'ZUNME is the integrated generative AI engine and 1,000+ template content warehouse inside CRM nErgy. It empowers creators, marketing agencies, and business owners to generate high-converting copy, cinematic video scripts, marketing campaigns, and SEO assets autonomously.',
    aEs: 'ZUNME es el motor de IA generativa integrado y el almacén de contenido con más de 1,000 plantillas dentro de CRM nErgy. Permite a creadores, agencias y propietarios generar textos de alta conversión, guiones de video cinemáticos, campañas de marketing y activos SEO de forma autónoma.'
  },
  {
    q: 'Can CRM nErgy replace our current accounting and ERP software?',
    qEs: '¿Puede CRM nErgy reemplazar nuestro software actual de contabilidad y ERP?',
    a: 'Yes. CRM nErgy includes enterprise-grade Analytic & Financial Accounting, General Ledger, Bill of Materials, Procurement, Inventory, and Supply Chain management, making external ERP systems redundant.',
    aEs: 'Sí. CRM nErgy incluye contabilidad analítica y financiera de nivel empresarial, libro mayor, lista de materiales, compras, inventario y gestión de la cadena de suministro, haciendo redundantes los sistemas ERP externos.'
  },
  {
    q: 'How does the SALES - chat zBox work?',
    qEs: '¿Cómo funciona el SALES - chat zBox?',
    a: 'SALES - chat zBox is our dedicated, secure sales consultation interface. Potential clients and enterprise buyers can instantly discuss pricing, customized white-label implementations, and schedule executive demonstrations with zero friction.',
    aEs: 'SALES - chat zBox es nuestra interfaz segura de consulta de ventas. Clientes potenciales y compradores corporativos pueden consultar precios al instante, coordinar implementaciones de marca blanca y programar demostraciones ejecutivas sin fricciones.'
  },
  {
    q: 'Is White Label CRM available for agencies and enterprise partners?',
    qEs: '¿Está disponible el CRM Marca Blanca para agencias y socios empresariales?',
    a: 'Yes. Our White Label solution allows agencies and enterprises to fully rebrand CRM nErgy with their own corporate identity, custom domains, logo, and client portal aesthetics.',
    aEs: 'Sí. Nuestra solución de Marca Blanca permite a agencias y empresas personalizar totalmente CRM nErgy con su propia identidad corporativa, dominios personalizados, logotipo y estética del portal de clientes.'
  },
  {
    q: 'Can we integrate CRM nErgy with our existing third-party applications?',
    qEs: '¿Podemos integrar CRM nErgy con nuestras aplicaciones de terceros existentes?',
    a: 'Absolutely. We provide certified high-throughput API connectors for Salesforce, QuickBooks, SAP, Stripe, Google Workspace, Microsoft 365, and custom webhooks.',
    aEs: 'Por supuesto. Ofrecemos conectores API certificados de alto rendimiento para Salesforce, QuickBooks, SAP, Stripe, Google Workspace, Microsoft 365 y webhooks personalizados.'
  },
  {
    q: 'How does the AI-powered centralized Knowledge Base with RAG enhance our FAQs?',
    qEs: '¿Cómo mejora nuestras preguntas frecuentes la Base de Conocimiento centralizada con IA y RAG?',
    a: 'Yes, we make FAQs much smarter than a normal FAQ system by using an AI-powered centralized Knowledge Base with RAG. All FAQs and product knowledge are managed from one central place, automatically serving 100+ website pages. Visitors ask questions naturally instead of searching manually, and AI answers based on your actual CRM/ERP verified data, reducing incorrect answers.',
    aEs: 'Sí, hacemos que las preguntas frecuentes sean mucho más inteligentes que un sistema convencional mediante una Base de Conocimiento centralizada con IA y RAG. Todas las preguntas frecuentes y el conocimiento del producto se gestionan desde un solo lugar central, atendiendo automáticamente a más de 100 páginas web. Los visitantes preguntan de forma natural y la IA responde basándose en datos reales de su CRM/ERP, eliminando respuestas incorrectas.'
  },
  {
    q: 'What are the main benefits of building one central AI knowledge system over a basic FAQ page?',
    qEs: '¿Cuáles son los principales beneficios de construir un sistema central de conocimiento con IA sobre una página de preguntas básica?',
    a: 'The key benefits are: 1) Centralized single-source management, 2) Automatic syndication to 100+ website pages, 3) Natural language inquiries, 4) Factual CRM/ERP grounding, 5) Instant live updates without altering pages, 6) Automatic discovery of unaddressed customer questions, 7) Shared foundation for website, CRM, ERP, and AI support agents, and 8) Open-source RAG technology with API connections only where needed to control ongoing costs.',
    aEs: 'Los beneficios clave son: 1) Gestión centralizada de fuente única, 2) Distribución automática a más de 100 páginas, 3) Consultas en lenguaje natural, 4) Fundamentación en datos reales de CRM/ERP, 5) Actualizaciones instantáneas sin cambiar páginas, 6) Detección de preguntas no respondidas para cerrar brechas, 7) Base compartida para asistentes web, CRM, ERP y agentes de soporte, y 8) Tecnología RAG de código abierto para controlar costos recurrentes.'
  },
  {
    q: 'Can we use open-source/free RAG technology to control ongoing AI costs?',
    qEs: '¿Podemos utilizar tecnología RAG de código abierto para controlar los costos continuos de IA?',
    a: 'Yes. We utilize high-efficiency open-source vector embeddings and local retrieval for the bulk of the system, connecting to commercial frontier AI APIs only when advanced reasoning or creative synthesis is required. This ensures maximum speed, complete data privacy, and minimal ongoing cloud expenses.',
    aEs: 'Sí. Utilizamos incrustaciones vectoriales de código abierto y recuperación local para la mayor parte del sistema, conectándonos a APIs comerciales de IA únicamente cuando se requiere síntesis avanzada. Esto garantiza máxima velocidad, privacidad absoluta y costos continuos mínimos.'
  }
];
