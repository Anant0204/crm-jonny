// Rich metadata and enterprise detail for all CRM & ERP Core Modules & Features
export const CORE_MODULES_DETAILS = {
  // CRM / Contact Management Module
  "contact-management": {
    id: "contact-management",
    badge: "CORE ENTERPRISE CRM • INTELLIGENT PIPELINES",
    title: "CRM & Contact Management",
    titleEs: "CRM y Gestión Integral de Contactos",
    tagline: "“Make AI Your Bestie”",
    overview: "CRM nErgy Intelligent Contact Management provides an all-inclusive 360-degree timeline of corporate accounts, customer stakeholders, and deal communications. Integrated with automated lead qualification and conversational intelligence, it guarantees that every client touchpoint is tracked, scored, and seamlessly advanced through conversion pipelines.",
    overviewEs: "La gestión de contactos de CRM nErgy ofrece una cronología integral de 360 grados de cuentas corporativas, clientes y comunicaciones. Integrado con calificación automática de prospectos e inteligencia conversacional, garantiza que cada punto de contacto sea registrado y avanzado eficientemente.",
    stats: [
      { label: "Deal Velocity", value: "+42%", desc: "Faster sales cycle closure with automated staging" },
      { label: "Lead Response Time", value: "< 90s", desc: "Instant AI engagement & intelligent dispatch" },
      { label: "Contact Accuracy", value: "99.8%", desc: "Auto-deduplicated multi-channel records" },
      { label: "Pipeline Visibility", value: "100%", desc: "Full executive telemetry and deal tracking" }
    ],
    pillars: [
      {
        title: "360° Profile & Account Graph",
        icon: "Users",
        items: [
          { label: "Unified Relationship Graph", text: "Map parent companies, subsidiary branches, decision makers, and vendor relationships in a single interactive graph." },
          { label: "Real-time Interaction Feed", text: "Aggregates inbound emails, calls, WhatsApp chats, proposals, and meeting notes in a chronological live feed." }
        ]
      },
      {
        title: "Intelligent Lead Qualification",
        icon: "TrendingUp",
        items: [
          { label: "AI Lead Scoring", text: "Evaluates buyer intent, company firmographics, and engagement frequency to score leads dynamically from 1 to 100." },
          { label: "Automated Routing & SLA", text: "Dispatches qualified opportunities to dedicated account executives based on geography, industry, or workload." }
        ]
      },
      {
        title: "Multi-Stage Deal Progression",
        icon: "Zap",
        items: [
          { label: "Visual Kanban Pipelines", text: "Drag-and-drop deals across custom revenue stages with mandatory qualification gates and probability weightings." },
          { label: "Automated Follow-ups", text: "Triggers proactive follow-up emails, contract drafts, and reminder notifications when deals remain idle." }
        ]
      },
      {
        title: "Omnichannel Communications",
        icon: "MessageSquare",
        items: [
          { label: "VoIP & Two-way SMS", text: "Click-to-call, automated call transcription, sentiment analysis, and integrated SMS threads directly inside each contact card." },
          { label: "Email Sync & Tracking", text: "Bi-directional synchronization with Outlook, Gmail, and IMAP with real-time open and link-click alerts." }
        ]
      },
      {
        title: "Contract & Quote Generation",
        icon: "ShieldCheck",
        items: [
          { label: "1-Click PDF Estimates", text: "Generates custom branded quotes, multi-currency proposals, and discount approval workflows in seconds." },
          { label: "Embedded E-Signatures", text: "Native audit-trailed digital signatures legally binding under eIDAS and ESIGN standards." }
        ]
      },
      {
        title: "Executive Revenue Forecasting",
        icon: "BarChart3",
        items: [
          { label: "Predictive Win Probability", text: "Calculates anticipated monthly and quarterly closed-won revenue using machine learning models." },
          { label: "Quota & Commission Tracker", text: "Live leaderboard tracking rep quotas, incentive tiers, and commission payouts in real time." }
        ]
      }
    ],
    useCases: [
      { type: "B2B Technology & SaaS", help: "Tracks long sales cycles, multi-stakeholder evaluations, POC trials, and recurring enterprise annual contract values." },
      { type: "Professional & Legal Services", help: "Manages confidential client intakes, retainer agreements, billable time interactions, and partner conflicts of interest." },
      { type: "Real Estate & Brokerage", help: "Maintains property listings, buyer matching criteria, automated WhatsApp tours, and closing document vaults." },
      { type: "Wholesale & Distribution", help: "Tracks purchasing managers, repeat volume pricing tiers, credit line terms, and seasonal purchase orders." }
    ],
    faqs: [
      {
        q: "How does CRM nErgy lead management streamline sales teams?",
        a: "CRM nErgy centralizes inbound leads from websites, social channels, and incoming calls into a single prioritized pipeline. AI automates scoring, deduping, and routing, saving sales reps up to 15 hours a week in manual admin."
      },
      {
        q: "Can I migrate existing contacts and deals from Salesforce or HubSpot?",
        a: "Yes. CRM nErgy includes one-click migration utilities and CSV/API loaders that preserve custom fields, historical notes, activity logs, and deal stages without any data loss."
      },
      {
        q: "Is Contact Management fully integrated with the ERP Accounting and Invoicing module?",
        a: "Absolutely. Once a deal is marked 'Closed Won' in CRM nErgy, it can instantly generate a sales order, trigger invoice creation, and update the general ledger without double data entry."
      }
    ]
  },

  // HR / Recruitment & Talent Module
  "recruitment-onboarding": {
    id: "recruitment-onboarding",
    badge: "HUMAN RESOURCES ERP • TALENT & PAYROLL CORE",
    title: "HR, Recruitment & Talent Management",
    titleEs: "Recursos Humanos, Reclutamiento y Gestión de Talento",
    tagline: "“Make AI Your Bestie”",
    overview: "The CRM nErgy Human Resources & Talent Management module transforms workforce operations. From automated candidate sourcing and AI resume parsing to paperless onboarding, shift scheduling, performance reviews, and unified payroll calculation, empower your organization to build and retain world-class teams.",
    overviewEs: "El módulo de Recursos Humanos de CRM nErgy transforma la gestión de talento. Desde la selección automatizada y análisis de CV con IA hasta la integración digital, turnos, evaluaciones y nómina unificada.",
    stats: [
      { label: "Time-to-Hire", value: "-55%", desc: "Reduced candidate evaluation and screening cycle" },
      { label: "Onboarding Completion", value: "98%", desc: "Digital self-service compliance on day one" },
      { label: "Payroll Accuracy", value: "100%", desc: "Automated timesheet-to-ledger synchronization" },
      { label: "Employee Retention", value: "+28%", desc: "Improved engagement via continuous goal tracking" }
    ],
    pillars: [
      {
        title: "AI Candidate Sourcing & ATS",
        icon: "UserCheck",
        items: [
          { label: "Smart Resume Parsing", text: "Instantly extracts skills, certifications, and career history to match candidate profiles against open requisitions." },
          { label: "Multi-Job Board Publishing", text: "Distributes openings to LinkedIn, Indeed, and company career pages with unified applicant tracking." }
        ]
      },
      {
        title: "Digital Onboarding & e-Signatures",
        icon: "ShieldCheck",
        items: [
          { label: "Paperless Employee Portals", text: "New hires complete tax forms, direct deposit, policy acknowledgments, and emergency contacts before day one." },
          { label: "Automated IT & Asset Provisioning", text: "Notifies IT and operations to allocate laptops, software licenses, security badges, and company email." }
        ]
      },
      {
        title: "Time, Attendance & Shift Scheduling",
        icon: "Clock",
        items: [
          { label: "Geo-Fenced Clock-In", text: "Mobile clock-in/out with facial verification and GPS verification for remote or distributed branch teams." },
          { label: "Intelligent Shift Roster", text: "Algorithmically balances staff coverage, prevents overtime fatigue, and enables peer shift-swaps seamlessly." }
        ]
      },
      {
        title: "Performance & OKR Reviews",
        icon: "TrendingUp",
        items: [
          { label: "360-Degree Feedback", text: "Conducts quarterly peer appraisals, manager reviews, and self-assessments with transparent scoring matrices." },
          { label: "Goal Alignment Frameworks", text: "Cascades corporate OKRs down to team and individual milestones with visual progress tracking." }
        ]
      },
      {
        title: "Integrated Payroll & Benefits",
        icon: "DollarSign",
        items: [
          { label: "Direct Ledger Accounting", text: "Calculates gross-to-net wages, statutory withholdings, bonuses, and posts payroll expenses straight to Accounting." },
          { label: "Benefit Administration", text: "Manages health insurance tiers, 401(k) / pension contributions, PTO accruals, and expense reimbursements." }
        ]
      },
      {
        title: "Workforce Analytics & Compliance",
        icon: "BarChart3",
        items: [
          { label: "Headcount & Attrition Telemetry", text: "Monitors turnover risk, compensation parity, departmental costs, and diversity metrics." },
          { label: "Audit-Ready Document Vault", text: "Secure, role-protected storage for certifications, visas, disciplinary records, and contracts." }
        ]
      }
    ],
    useCases: [
      { type: "Fast-Growing Startups", help: "Quickly scale from 10 to 500+ employees with zero manual HR paperwork and automated compliance." },
      { type: "Retail & Hospitality Chains", help: "Coordinates hundreds of part-time shift workers, seasonal staff, and high-turnover onboarding seamlessly." },
      { type: "Corporate Enterprises", help: "Enforces strict organizational hierarchies, multi-tier approvals, and centralized multinational payroll." },
      { type: "Healthcare & Care Facilities", help: "Tracks mandatory medical license renewals, clinical shift coverage, and HIPAA-compliant HR records." }
    ],
    faqs: [
      {
        q: "How does CRM nErgy HR integrate with project billing and accounting?",
        a: "Timesheets submitted by team members automatically feed both payroll for employee compensation and client billing for billable project hours in the core Accounting ledger."
      },
      {
        q: "Can employees access their own paystubs and request time off?",
        a: "Yes. Every team member gets access to the self-service mobile app and web portal to view pay history, submit vacation requests, and download annual tax certificates."
      },
      {
        q: "Does the system support multinational or multi-state payroll requirements?",
        a: "Yes, CRM nErgy supports configurable tax rules, regional currency payouts, and local labor compliance requirements across global operating hubs."
      }
    ]
  },

  // Project Management Module
  "project-management": {
    id: "project-management",
    badge: "PROJECT ERP & OPERATIONS • TASKS & SPRINTS",
    title: "Project Management & Collaboration",
    titleEs: "Gestión de Proyectos y Colaboración",
    tagline: "“Make AI Your Bestie”",
    overview: "CRM nErgy Project Management unites task boards, Gantt timelines, resource allocation, and budget burn tracking into an agile operations hub. Deliver client deliverables on time, eliminate bottlenecks, and ensure every billable hour is accurately tracked and invoiced.",
    overviewEs: "La gestión de proyectos de CRM nErgy une tableros de tareas, diagramas de Gantt, asignación de recursos y control de presupuestos en un centro ágil de operaciones operativas.",
    stats: [
      { label: "Project On-Time Delivery", value: "94.6%", desc: "Milestone completion rate across enterprise sprints" },
      { label: "Resource Utilization", value: "+34%", desc: "Eliminated idle team capacity and over-allocation" },
      { label: "Budget Overrun Reduction", value: "-68%", desc: "Real-time budget burn telemetry and alerts" },
      { label: "Billable Hour Capture", value: "99.2%", desc: "Direct integration with client accounting invoices" }
    ],
    pillars: [
      {
        title: "Agile Kanban & Sprint Planning",
        icon: "FolderKanban",
        items: [
          { label: "Custom Workflows & Columns", text: "Configure multi-stage delivery lanes (Backlog, In Progress, Review, QA, Deployed) with WIP limits." },
          { label: "Sprint Retrospectives", text: "Track velocity burn-down charts, story point completions, and sprint retrospectives automatically." }
        ]
      },
      {
        title: "Interactive Gantt & Critical Paths",
        icon: "TrendingUp",
        items: [
          { label: "Dynamic Task Dependencies", text: "Link tasks with Finish-to-Start or Start-to-Start dependencies; shifting a milestone reschedules dependent timelines." },
          { label: "Critical Path Highlighting", text: "Instantly identify bottleneck tasks that directly influence the ultimate delivery deadline." }
        ]
      },
      {
        title: "Resource & Capacity Balancing",
        icon: "Users",
        items: [
          { label: "Team Workload Heatmaps", text: "Visual indicators showing who is over-allocated, on PTO, or available to take on immediate sprint tasks." },
          { label: "Skill-Based Task Assignment", text: "AI matches project work orders to the optimal engineers or consultants based on proven competencies." }
        ]
      },
      {
        title: "Milestone Tracking & Client Portals",
        icon: "CheckCircle2",
        items: [
          { label: "External Client Access", text: "Provide stakeholders with read-only branded portals to review deliverables, approve phases, and view progress." },
          { label: "Deliverable Sign-Offs", text: "Audit-trailed client approvals that trigger automatic phase-completion invoicing in Accounting." }
        ]
      },
      {
        title: "Budget Burn & Cost Accounting",
        icon: "DollarSign",
        items: [
          { label: "Real-time Profitability", text: "Tracks labor expenses, contractor invoices, and software expenses against the project's contracted revenue." },
          { label: "Burn Rate Alerts", text: "Proactive warnings when project expenditures reach 75%, 90%, or 100% of the allocated cap." }
        ]
      },
      {
        title: "Integrated Team Collaboration",
        icon: "MessageSquare",
        items: [
          { label: "In-Context Task Comments", text: "Mention colleagues, attach Figma/CAD assets, and record voice memos directly on individual task cards." },
          { label: "Automated Slack & Teams Sync", text: "Dispatches instant webhook alerts when critical bugs, approvals, or milestones are triggered." }
        ]
      }
    ],
    useCases: [
      { type: "Digital Agencies & Studios", help: "Coordinates client design sprints, video post-production, revision cycles, and hourly retainer drawdowns." },
      { type: "Software Engineering Teams", help: "Manages agile product backlogs, epic roadmaps, QA bug tracking, and automated CI/CD release notes." },
      { type: "Engineering & Construction", help: "Tracks architectural blueprints, subcontractor job progress, safety sign-offs, and procurement deliveries." },
      { type: "Consulting & Advisory", help: "Structures complex audit engagements, client deliverable schedules, billable consultant rates, and travel expense logs." }
    ],
    faqs: [
      {
        q: "Can clients log into the project board without seeing internal rates?",
        a: "Yes. Role-based security allows you to invite clients to a white-labeled portal where internal costs, employee wages, and private notes remain completely hidden."
      },
      {
        q: "Does the project tracker support both fixed-price and time-and-materials contracts?",
        a: "Yes. You can configure milestones for fixed-price contracts or use live timer timesheets to generate hourly invoices directly in Analytic Accounting."
      },
      {
        q: "How does Project Management link to Inventory and Manufacturing?",
        a: "Bills of Materials (BOM) and raw material requirements can be directly tied to project work orders, ensuring physical parts are staged before installation starts."
      }
    ]
  },

  // Inventory Management Module
  "inventory-management": {
    id: "inventory-management",
    badge: "SUPPLY CHAIN & LOGISTICS ERP • WAREHOUSING CORE",
    title: "Inventory & Warehouse Management",
    titleEs: "Gestión de Inventario y Almacenes",
    tagline: "“Make AI Your Bestie”",
    overview: "CRM nErgy Inventory & Warehousing equips enterprise businesses with real-time stock valuation, multi-warehouse tracking, serial/lot traceability, and automated replenishment. Eliminate stockouts, reduce carrying costs, and sync inventory seamlessly across your retail, wholesale, and e-commerce channels.",
    overviewEs: "El módulo de Inventario y Almacenamiento de CRM nErgy brinda control de stock en tiempo real, trazabilidad multialmacén, códigos de barra y reposición automática.",
    stats: [
      { label: "Stock Accuracy", value: "99.9%", desc: "Barcode-verified bin and warehouse locations" },
      { label: "Stockout Reduction", value: "-72%", desc: "Automated minimum-level reorder replenishment" },
      { label: "Carrying Cost Savings", value: "24%", desc: "Optimized inventory turnover & deadstock alerts" },
      { label: "Fulfillment Speed", value: "3x", desc: "Batch picking, wave packing & automated shipping labels" }
    ],
    pillars: [
      {
        title: "Multi-Warehouse & Bin Locations",
        icon: "Boxes",
        items: [
          { label: "Hierarchical Storage Zones", text: "Organize physical storage by Facility > Aisle > Rack > Shelf > Bin with visual warehouse floor maps." },
          { label: "Inter-Warehouse Transfers", text: "Create and track stock transfers in transit with customs documentation and automated receiving verifications." }
        ]
      },
      {
        title: "Automated Replenishment Rules",
        icon: "Zap",
        items: [
          { label: "Min / Max Threshold Triggers", text: "Automatically generates draft Purchase Orders to pre-approved suppliers when stock falls below reorder limits." },
          { label: "Lead-Time Demand Forecasting", text: "Considers supplier manufacturing lead times and seasonal demand spikes to optimize reorder schedules." }
        ]
      },
      {
        title: "Barcode & Mobile Scanning",
        icon: "Package",
        items: [
          { label: "High-Speed Mobile Scanner App", text: "Turn smartphones or rugged Zebra/Honeywell scanners into enterprise barcode readers for instant receiving and pick/pack." },
          { label: "GS1, QR & SKU Label Printing", text: "Generates standardized 1D/2D barcode labels for goods, pallets, and shipping packages in one click." }
        ]
      },
      {
        title: "Serial Number & Lot Tracking",
        icon: "ShieldCheck",
        items: [
          { label: "End-to-End Lot Traceability", text: "Tracks raw materials from vendor receiving through manufacturing assembly down to the specific customer invoice." },
          { label: "Expiration Date Monitoring", text: "First-Expired-First-Out (FEFO) routing for perishable foods, pharmaceuticals, and chemical products." }
        ]
      },
      {
        title: "Real-time Financial Valuation",
        icon: "DollarSign",
        items: [
          { label: "FIFO, LIFO & Weighted Average Cost", text: "Select your corporate valuation method; all inventory write-offs, scrap, and COGS automatically post to Accounting." },
          { label: "Landed Cost Calculations", text: "Incorporates ocean freight, import tariffs, customs duties, and insurance into the final unit cost." }
        ]
      },
      {
        title: "Omnichannel Channel Sync",
        icon: "TrendingUp",
        items: [
          { label: "Unified Stock Reservoir", text: "Centralizes inventory counts across Shopify, Amazon, WooCommerce, physical POS stores, and wholesale sales orders." },
          { label: "Zero-Overselling Guardrails", text: "Reserves inventory immediately when an online cart completes payment to prevent overselling." }
        ]
      }
    ],
    useCases: [
      { type: "Wholesale & B2B Distributors", help: "Manages heavy pallet movements, tiered volume discounts, freight forwarding, and customer credit terms." },
      { type: "E-Commerce & D2C Brands", help: "Syncs inventory instantly across Amazon FBA, Walmart Marketplace, and private online web stores." },
      { type: "Automotive Parts & Hardware", help: "Tracks tens of thousands of individual SKUs, OEM part cross-references, and multi-location branch stock." },
      { type: "Pharmaceutical & Food Supplies", help: "Complies with FDA regulations with strict batch recalls, temperature logs, and expiry alerts." }
    ],
    faqs: [
      {
        q: "Does CRM nErgy Inventory integrate with POS and barcode hardware?",
        a: "Yes. Our web and mobile interfaces support USB, Bluetooth, and wireless barcode scanners, allowing rapid cycle counts, picking, and receiving."
      },
      {
        q: "How does the system handle landed costs like ocean freight and duties?",
        a: "You can allocate additional freight, customs, and inspection bills directly to a receiving order, which automatically updates the unit cost and cost of goods sold (COGS)."
      },
      {
        q: "Can I manage multiple warehouses across different countries?",
        a: "Yes, multi-entity and multi-warehouse capabilities allow separate location ledgers, currency conversions, and automated transfer orders."
      }
    ]
  },

  // Manufacturing Module
  "manufacturing": {
    id: "manufacturing",
    badge: "MANUFACTURING ERP • BOM & SHOP FLOOR CONTROL",
    title: "Manufacturing & Production Management",
    titleEs: "Manufactura y Gestión de Producción",
    tagline: "“Make AI Your Bestie”",
    overview: "CRM nErgy Manufacturing bridges design, shop-floor operations, and accounting into an end-to-end production management suite. Handle multi-level Bills of Materials (BOM), work center routings, production orders, scrap tracking, and real-time job costing with supreme precision.",
    overviewEs: "El módulo de Manufactura de CRM nErgy une ingeniería, planta de producción y contabilidad en una suite integral con listas de materiales (BOM) multinivel y centros de trabajo.",
    stats: [
      { label: "Production Uptime", value: "98.7%", desc: "Optimized machine maintenance & work center allocation" },
      { label: "Scrap & Waste Reduction", value: "-45%", desc: "Precise material staging & real-time quality control" },
      { label: "BOM Cost Precision", value: "99.9%", desc: "Direct labor, machine overhead & component syncing" },
      { label: "Order Lead Time", value: "-38%", desc: "Automated MRP demand planning and assembly scheduling" }
    ],
    pillars: [
      {
        title: "Multi-Level Bill of Materials (BOM)",
        icon: "Factory",
        items: [
          { label: "Hierarchical Sub-Assemblies", text: "Create complex BOM structures with nested sub-assemblies, alternate component substitutions, and revision histories." },
          { label: "Dynamic Phantom BOMs", text: "Group components for engineering kits and assembly lines without creating unnecessary intermediate stock." }
        ]
      },
      {
        title: "Work Centers & Production Routings",
        icon: "Zap",
        items: [
          { label: "Machine & Labor Routing", text: "Define exact manufacturing steps (cutting, welding, assembly, painting, QA) with setup times and hourly operation costs." },
          { label: "Capacity Planning Telemetry", text: "Visual calendar showing machine availability, maintenance downtime, and operator shift schedules." }
        ]
      },
      {
        title: "Manufacturing Orders (MO) & Dispatch",
        icon: "Boxes",
        items: [
          { label: "Make-to-Stock & Make-to-Order", text: "Trigger production automatically from closed CRM sales orders or from low-stock inventory replenishment triggers." },
          { label: "Shop Floor Kiosk Tablet App", text: "Operators clock in, view digital PDF blueprints, record completed units, and log scrap with simple touch-screen tablets." }
        ]
      },
      {
        title: "Material Requirements Planning (MRP)",
        icon: "TrendingUp",
        items: [
          { label: "Automated Component Procurement", text: "Calculates exact raw material deficits required for upcoming production schedules and generates purchase orders." },
          { label: "Just-In-Time (JIT) Staging", text: "Schedules material arrivals to coincide with production setup, minimizing warehouse congestion." }
        ]
      },
      {
        title: "Quality Control & Compliance (QA)",
        icon: "ShieldCheck",
        items: [
          { label: "In-Process Quality Inspection", text: "Configurable pass/fail inspection gates at designated routing steps before components proceed down the line." },
          { label: "Non-Conformance & Quarantine", text: "Flag defective parts, isolate suspect lots in quarantine bins, and generate vendor return notes automatically." }
        ]
      },
      {
        title: "Comprehensive Job Costing & ERP Ledger",
        icon: "DollarSign",
        items: [
          { label: "Actual vs. Standard Costing", text: "Compares estimated engineering costs with actual material consumption, labor hours, and overhead for every production run." },
          { label: "Direct Financial Integration", text: "Work-in-progress (WIP) and finished goods inventory automatically post to the CRM nErgy general ledger." }
        ]
      }
    ],
    useCases: [
      { type: "Discrete Manufacturing", help: "Ideal for machinery, electronics, automotive components, and custom equipment assembly." },
      { type: "Batch & Process Manufacturing", help: "Formulations for chemicals, food & beverage, cosmetics, and pharmaceuticals with precise recipe scaling." },
      { type: "Make-to-Order & Custom Job Shops", help: "Handles custom engineering orders, bespoke architectural fabrication, and rapid prototyping runs." },
      { type: "Contract & OEM Manufacturers", help: "Tracks client-supplied components, customer revision approvals, and private-label contract packaging." }
    ],
    faqs: [
      {
        q: "Can CRM nErgy handle multi-tier sub-assemblies and variant BOMs?",
        a: "Yes. You can build multi-level BOMs with limitless sub-assemblies, and use variant rules to adjust components based on size, color, or technical specifications."
      },
      {
        q: "How does the system track worker time on the factory floor?",
        a: "Operators can use shop floor tablet kiosks or barcode badges to scan work orders and record active production time, which feeds directly into the job's labor costing."
      },
      {
        q: "Is CRM nErgy suitable for food or medical manufacturing with strict FDA/ISO standards?",
        a: "Yes. Full lot traceability, expiry monitoring, quality checkpoints, and automated quarantine workflows provide full compliance with ISO 9001, FDA, and GMP guidelines."
      }
    ]
  }
};
