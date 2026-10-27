import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Building2,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  CreditCard,
  MessageSquare,
  Users,
  Target,
  Kanban,
  CheckSquare,
  Boxes,
  UserCheck,
  ArrowRight,
  X,
  Layers,
  Sliders,
  FileCheck,
  Lock,
  DollarSign,
  Download,
  HelpCircle,
  Zap,
  Trash2,
  CheckCheck,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth, crmRoles, oalRoles } from '../../context/AuthContext';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from '../../components/ui/Dropdown';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { isRouteAllowed, getDefaultRouteForRole } from '../../utils/rbac';
import { AiEnergyLogo } from '../../components/common/AiEnergyLogo';
import { LanguageToggle } from '../../components/common/LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';
import iconLogo from '../../assets/crm_nergy_ai_icon.png';

export const Topbar = ({ onToggleSidebar, product = 'crm' }) => {
  const { theme, toggleTheme } = useTheme();
  const { crmUser, oalUser, switchRole, logout } = useAuth();
  const { activities = [], contacts = [], deals = [], leads = [] } = useCrm() || {};
  const { addToast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const currentUser = product === 'crm' ? crmUser : oalUser;
  const availableRoles = product === 'crm' ? crmRoles : oalRoles;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Notification clearance state (persisted per session)
  const [clearedNotificationIds, setClearedNotificationIds] = useState(() => {
    try {
      const saved = localStorage.getItem('crm_cleared_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const unreadNotifications = activities.filter((n) => !clearedNotificationIds.includes(n.id));

  const handleClearAllNotifications = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const allIds = activities.map((n) => n.id);
    setClearedNotificationIds(allIds);
    try {
      localStorage.setItem('crm_cleared_notifications', JSON.stringify(allIds));
    } catch (_) {}
    addToast({
      title: t('Notifications'),
      message: t('All notifications cleared.'),
      type: 'info',
    });
  };

  const handleDismissNotification = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const updated = [...new Set([...clearedNotificationIds, id])];
    setClearedNotificationIds(updated);
    try {
      localStorage.setItem('crm_cleared_notifications', JSON.stringify(updated));
    } catch (_) {}
  };

  const handleMarkAllAsRead = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const allIds = activities.map((n) => n.id);
    setClearedNotificationIds(allIds);
    try {
      localStorage.setItem('crm_cleared_notifications', JSON.stringify(allIds));
    } catch (_) {}
    addToast({
      title: t('Notifications'),
      message: t('All notifications marked as read.'),
      type: 'success',
    });
  };

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K to open Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Focus input on modal open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
      setActiveCategory('All');
    }
  }, [isSearchOpen]);

  const handleLogout = () => {
    logout(product);
    addToast({
      title: 'Logged Out',
      message: `Signed out of ${product === 'crm' ? 'CRM nErgy AI' : 'OAL Network'}.`,
      type: 'info',
    });
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  const handleSwitchRole = (roleObj) => {
    const updated = switchRole(roleObj, product);

    if (!isRouteAllowed(location.pathname, product, updated)) {
      const defaultRoute = getDefaultRouteForRole(product, updated);
      navigate(defaultRoute);
    }

    addToast({
      title: 'Role Switched Successfully',
      message: `Active profile: ${updated.name} (${updated.role})`,
      type: 'success',
    });
  };

  // Comprehensive Global Search Index Database (30+ searchable records)
  const getSearchDatabase = () => {
    if (product === 'crm') {
      return [
        { id: 'crm-dash', title: 'Executive Dashboard', subtitle: 'Revenue, Pipeline, Team KPI & Performance overview', category: 'Pages & Modules', icon: LayoutDashboard, path: '/crm/dashboard', tags: 'home main analytics kpi' },
        { id: 'crm-contacts', title: 'Contacts & Enterprise Accounts', subtitle: 'Global directory of corporate client accounts', category: 'Pages & Modules', icon: Users, path: '/crm/contacts', tags: 'customers clients phone email people' },
        { id: 'crm-leads', title: 'Inbound Leads Directory', subtitle: 'Prospect qualification, lead scoring & acquisition', category: 'Pages & Modules', icon: Target, path: '/crm/leads', tags: 'inbound prospects conversion deals' },
        { id: 'crm-pipeline', title: 'Sales Pipeline (Kanban)', subtitle: 'Visual deal Kanban stage manager & velocity tracking', category: 'Pages & Modules', icon: Kanban, path: '/crm/pipeline', tags: 'deals stages closing revenue' },
        { id: 'crm-tasks', title: 'Tasks & Workflow Reminders', subtitle: 'Assigned workflow items, deadlines & task alerts', category: 'Pages & Modules', icon: CheckSquare, path: '/crm/tasks', tags: 'todo deadlines calendar followups' },
        { id: 'crm-comm', title: 'Communication Hub', subtitle: 'Direct email, omnichannel inbox & client message center', category: 'Pages & Modules', icon: MessageSquare, path: '/crm/communication', tags: 'email chat inbox call messages' },
        { id: 'crm-erp', title: 'ERP & Operations Center', subtitle: 'Procurement, inventory tracking, bill of materials & sales orders', category: 'Pages & Modules', icon: Boxes, path: '/crm/erp', tags: 'inventory supply chain orders procurement' },
        { id: 'crm-hr', title: 'HR & Recruiting Directory', subtitle: 'Employee lifecycle, candidate interviews & staff roster', category: 'Pages & Modules', icon: UserCheck, path: '/crm/hr', tags: 'hiring employees payroll team staff' },
        { id: 'crm-ai', title: 'AI Content Studio & Agent Hub', subtitle: 'Generative CRM agent, email writer & workflow automations', category: 'Pages & Modules', icon: Sparkles, path: '/crm/ai-studio', tags: 'artificial intelligence prompts copy agent' },
        { id: 'crm-reports', title: 'Reports & Executive Analytics', subtitle: 'Executive financial summaries & audit reports', category: 'Pages & Modules', icon: FileText, path: '/crm/reports', tags: 'charts metrics exports pdf revenue' },
        { id: 'crm-profile', title: 'My Profile & Avatar Settings', subtitle: 'Personal account details, photo upload & credentials', category: 'Pages & Modules', icon: User, path: '/crm/profile', tags: 'profile photo picture name email password' },
        
        { id: 'deal-1', title: 'Apex Global SaaS Deal ($450,000)', subtitle: 'Negotiation Stage • Enterprise 3-Year Software Contract', category: 'Deals & ERP', icon: Target, path: '/crm/pipeline', tags: 'apex 450k saas negotiation' },
        { id: 'deal-2', title: 'Vanguard Capital Expansion ($1,200,000)', subtitle: 'Contract Signed • Tier 1 Financial Institutional Client', category: 'Deals & ERP', icon: Target, path: '/crm/pipeline', tags: 'vanguard 1.2m expansion closed' },
        { id: 'deal-3', title: 'Hyperion Logistics Automation ($850,000)', subtitle: 'Proposal Review • Supply Chain Enterprise Fleet', category: 'Deals & ERP', icon: Target, path: '/crm/pipeline', tags: 'hyperion 850k logistics proposal' },

        // Docs Category
        { id: 'doc-1', title: 'Master Services Agreement & Enterprise SLA', subtitle: 'Apex Global SaaS contract terms, uptime guarantees & liability', category: 'Docs', icon: FileText, path: '/crm/search', tags: 'doc document contract sla legal apex pdf' },
        { id: 'doc-2', title: 'Mutual NDA & Proprietary AI IP Protection Brief', subtitle: 'Trade secrets, neural gateway algorithms & diligence brief', category: 'Docs', icon: FileCheck, path: '/crm/search', tags: 'doc document nda legal attorney ip brief confidential' },
        { id: 'doc-3', title: 'Cryptographic Audit Certificate (AES-256 Vault)', subtitle: 'Super Executive Admin Secured zBox encryption audit seal', category: 'Docs', icon: ShieldCheck, path: '/crm/ebox', tags: 'doc document audit security vault ebox encryption' },

        // Tasks Category
        { id: 'task-1', title: 'Finalize Attorney Diligence Exhibits with KT Team', subtitle: 'Priority: High • Due today • Assigned to Johnny (SEA)', category: 'Tasks', icon: CheckSquare, path: '/crm/tasks', tags: 'task todo attorney ktt dev pitch sea exhibits' },
        { id: 'task-2', title: 'Follow up on Apex Global SaaS Contract Execution', subtitle: 'Priority: Urgent • Eleanor Vance procurement review', category: 'Tasks', icon: CheckSquare, path: '/crm/tasks', tags: 'task todo apex sales follow up' },
        { id: 'task-3', title: 'Execute Multi-Warehouse Stock Audit (SO-2026-402)', subtitle: 'Priority: Medium • Austin Central Warehouse inspection', category: 'Tasks', icon: Boxes, path: '/crm/tasks', tags: 'task todo erp warehouse stock audit' },

        // Files Category
        { id: 'file-1', title: 'Master_Roadmap_V3.pdf (2.4 MB)', subtitle: 'Q3/Q4 Enterprise software delivery timeline and sprint deck', category: 'Files', icon: FileText, path: '/crm/ebox', tags: 'file pdf roadmap download v3 presentation deck' },
        { id: 'file-2', title: 'Enterprise_Pricing_Matrix_2026.xlsx (1.2 MB)', subtitle: 'Tiered multi-seat enterprise software license matrix', category: 'Files', icon: DollarSign, path: '/crm/search', tags: 'file excel pricing rates matrix sheet' },
        { id: 'file-3', title: 'Logo_Brand_Asset_Pack_Digital_Glow.zip (14.8 MB)', subtitle: 'High-resolution digital plasma energy logos & marketing SVG/PNG', category: 'Files', icon: Download, path: '/crm/search', tags: 'file zip logo assets brand digital energy vector' },

        { id: 'contact-sarah', title: 'Sarah Jenkins (VP of Sales)', subtitle: 's.jenkins@nergy.io • Lead Manager & Deal Closer', category: 'Contacts', icon: Users, path: '/crm/contacts', tags: 'sarah sales vp email' },
        { id: 'contact-david', title: 'David Chen (Finance Director)', subtitle: 'd.chen@nergy.io • Lead Controller & Treasury Audit', category: 'Contacts', icon: Users, path: '/crm/contacts', tags: 'david finance director controller' },
        { id: 'contact-elena', title: 'Elena Rostova (HR Manager)', subtitle: 'e.rostova@nergy.io • Talent Acquisition Lead', category: 'Contacts', icon: Users, path: '/crm/contacts', tags: 'elena hr recruiting staff' },

        // Others Category
        { id: 'oth-search', title: 'Internal AI Search Cognitive Engine', subtitle: 'Deep semantic neural RAG search bar across all workspaces', category: 'Others', icon: Search, path: '/crm/search', tags: 'others search rag cognitive neural engine' },
        { id: 'oth-voice', title: 'AI Voice Agent Streaming Terminal', subtitle: 'Real-time STT ➔ LLM ➔ TTS speech streaming pipeline', category: 'Others', icon: Zap, path: '/crm/ai-voice', tags: 'others voice agent mic audio stream pipeline' },
        { id: 'act-theme', title: 'Switch Color Theme (Dark / Light)', subtitle: `Currently set to ${theme} mode`, category: 'Others', icon: Sun, action: toggleTheme, tags: 'theme dark light mode color' },
        { id: 'act-photo', title: 'Upload / Change Profile Picture', subtitle: 'Set custom avatar photo and update profile credentials', category: 'Others', icon: User, path: '/crm/profile', tags: 'pic photo avatar upload' },
      ];
    }

    // OAL Network Marketplace Search Index
    return [
      // 1. Pages & Core Modules
      { id: 'oal-dash', title: 'Borrower Overview Dashboard', subtitle: '11-Stage loan lifecycle & credit telemetry overview', category: 'Pages & Modules', icon: LayoutDashboard, path: '/oal/borrower/dashboard', tags: 'home main overview telemetry lifecycle' },
      { id: 'oal-kyc', title: 'KYC Vault & Corporate Identity', subtitle: 'Verified Delaware certificates, EIN & SHA-256 seal', category: 'Pages & Modules', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'fincen kyc documents certificate identity seal' },
      { id: 'oal-app', title: 'Commercial Loan Application', subtitle: 'Multi-stage debt borrowing request & collateral wizard', category: 'Pages & Modules', icon: FileText, path: '/oal/borrower/application', tags: 'apply borrow facility request application' },
      { id: 'oal-offers', title: 'Lender Offers Marketplace', subtitle: '3 competitive institutional term sheets (Vanguard, Apex, Hyperion)', category: 'Pages & Modules', icon: CreditCard, path: '/oal/borrower/offers', tags: 'proposals offers interest rate term sheet debt capital' },
      { id: 'oal-score', title: 'AI Risk Rating Scorecard (792 / 850)', subtitle: 'Grade A+ institutional creditworthiness rating & metrics', category: 'Pages & Modules', icon: Sparkles, path: '/oal/borrower/score', tags: 'ai score risk grade credit 792 rating telemetry' },
      { id: 'oal-messages', title: 'Messages & Underwriter Chat', subtitle: 'Direct real-time channel with Sarah Jenkins & deal desks', category: 'Pages & Modules', icon: MessageSquare, path: '/oal/borrower/messages', tags: 'chat agent underwriter sarah inbox talk conversation' },
      { id: 'oal-referrals', title: 'Broker Referrals & Partner Desk', subtitle: 'Invite corporate affiliates and track syndication commissions', category: 'Pages & Modules', icon: Users, path: '/oal/borrower/referrals', tags: 'referral partner commission broker' },
      { id: 'oal-support', title: 'Borrower Help & Underwriting Support', subtitle: 'Institutional SLA escalation desk & ticketing', category: 'Pages & Modules', icon: HelpCircle, path: '/oal/borrower/support', tags: 'help ticket support contact desk' },
      { id: 'oal-profile', title: 'My Profile & Corporate Signatory', subtitle: 'Dr. Aris Thorne • Photo upload & signatory credentials', category: 'Pages & Modules', icon: User, path: '/oal/borrower/profile', tags: 'profile photo signatory pic name aris email 2fa' },

      // 2. Active Institutional Loan Offers & Term Sheets
      { id: 'offer-1', title: 'Vanguard Capital Debt Fund ($750,000)', subtitle: '5.20% APR • 36 Months • Secured Senior Facility (Term Sheet #VC-9021)', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'vanguard 750k 750000 5.2% apr term sheet senior debt' },
      { id: 'offer-2', title: 'Apex Global Credit Desk ($1,200,000)', subtitle: '4.80% APR • 48 Months • Lowest Interest Term Sheet (#AG-4410)', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'apex 1.2m 1200000 4.8% lowest interest term sheet' },
      { id: 'offer-3', title: 'Hyperion Senior Debt Partners ($950,000)', subtitle: '5.60% APR • 24 Months • Equipment-Backed Liquidity (#HY-8120)', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'hyperion 950k 950000 5.6% equipment collateral debt' },
      { id: 'offer-4', title: 'BlueRock Commercial Credit Line ($500,000)', subtitle: '6.10% APR • 12 Months • Revolving Working Capital Line', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'bluerock 500k 500000 6.1% revolving credit' },
      { id: 'offer-5', title: 'Silicon Valley Debt Syndicate ($2,000,000)', subtitle: '5.00% APR • 60 Months • Multi-Facility Growth Debt', category: 'Loan Term Sheets', icon: CreditCard, path: '/oal/borrower/offers', tags: 'silicon valley 2m 2000000 5% growth debt facility' },

      // 3. 11-Stage Application Lifecycle Steps
      { id: 'stage-1', title: 'Stage 1: Entity Onboarding & Registration', subtitle: 'BioGenix Labs Inc. corporate account verification', category: 'Lifecycle Stages', icon: Layers, path: '/oal/borrower/dashboard', tags: 'stage 1 onboarding registration entity' },
      { id: 'stage-2', title: 'Stage 2: KYC & FinCEN Beneficial Ownership', subtitle: 'Verified cryptographic SHA-256 seal & compliance', category: 'Lifecycle Stages', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'stage 2 kyc fincen beneficial ownership' },
      { id: 'stage-3', title: 'Stage 3: Corporate Financial Audit & P&L', subtitle: 'FY 2024 Audited Statements by Deloitte', category: 'Lifecycle Stages', icon: FileText, path: '/oal/borrower/kyc', tags: 'stage 3 financials tax returns balance sheet' },
      { id: 'stage-4', title: 'Stage 4: Equipment & Collateral Appraisal', subtitle: '$4.2M Laboratory machinery & asset valuation', category: 'Lifecycle Stages', icon: Boxes, path: '/oal/borrower/application', tags: 'stage 4 appraisal equipment machinery collateral' },
      { id: 'stage-5', title: 'Stage 5: AI Risk Score Generation (792/850)', subtitle: 'Grade A+ credit telemetry computed in real time', category: 'Lifecycle Stages', icon: Sparkles, path: '/oal/borrower/score', tags: 'stage 5 ai risk score 792 rating credit' },
      { id: 'stage-6', title: 'Stage 6: Institutional Marketplace Syndication', subtitle: '3 competitive proposals submitted by Tier-1 lenders', category: 'Lifecycle Stages', icon: CreditCard, path: '/oal/borrower/offers', tags: 'stage 6 syndication lenders competing marketplace' },
      { id: 'stage-7', title: 'Stage 7: Term Sheet Negotiation & Covenants', subtitle: 'Inspecting legal covenants, APR & amortizations', category: 'Lifecycle Stages', icon: Sliders, path: '/oal/borrower/offers', tags: 'stage 7 covenants term sheet negotiation compare' },
      { id: 'stage-8', title: 'Stage 8: Underwriting Due Diligence & Approval', subtitle: 'Lead underwriter review by Sarah Jenkins', category: 'Lifecycle Stages', icon: UserCheck, path: '/oal/borrower/messages', tags: 'stage 8 underwriting approval due diligence desk' },
      { id: 'stage-9', title: 'Stage 9: Facility Digital Execution (DocuSign)', subtitle: 'Authorized digital signature by Dr. Aris Thorne', category: 'Lifecycle Stages', icon: FileCheck, path: '/oal/borrower/offers', tags: 'stage 9 execute docusign contract signature' },
      { id: 'stage-10', title: 'Stage 10: Perfection of Collateral & UCC-1', subtitle: 'State lien filing & institutional closing audit', category: 'Lifecycle Stages', icon: Lock, path: '/oal/borrower/dashboard', tags: 'stage 10 lien ucc-1 closing audit perfection' },
      { id: 'stage-11', title: 'Stage 11: Capital Disbursement & Wire Release', subtitle: 'Direct Fedwire funding to corporate treasury', category: 'Lifecycle Stages', icon: DollarSign, path: '/oal/borrower/dashboard', tags: 'stage 11 wire transfer disbursement funding release' },

      // 4. Contacts, Desks & Underwriters
      { id: 'agent-sarah', title: 'Sarah Jenkins (Assigned Lead Underwriter)', subtitle: 'OAL Licensed Representative • Status: Active & Online', category: 'Desks & Agents', icon: UserCheck, path: '/oal/borrower/messages', tags: 'sarah jenkins underwriter agent rep contact' },
      { id: 'contact-aris', title: 'Dr. Aris Thorne (CEO & Signatory)', subtitle: 'BioGenix Labs Inc. • Authorized Primary Signatory', category: 'Desks & Agents', icon: User, path: '/oal/borrower/profile', tags: 'aris thorne ceo founder borrower user' },
      { id: 'desk-vanguard', title: 'Vanguard Capital Syndication Desk', subtitle: 'Marcus Sterling (Managing Director) • Term Sheet #VC-9021', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages', tags: 'vanguard marcus sterling lender desk direct' },
      { id: 'desk-apex', title: 'Apex Global Credit Committee Desk', subtitle: 'Senior Underwriting Committee • Term Sheet #AG-4410', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages', tags: 'apex committee desk underwriter' },
      { id: 'desk-hyperion', title: 'Hyperion Debt Collateral Desk', subtitle: 'Asset & Equipment Evaluation Division', category: 'Desks & Agents', icon: Building2, path: '/oal/borrower/messages', tags: 'hyperion desk collateral asset' },

      // 5. Verified Corporate Legal Documents
      { id: 'doc-goodstanding', title: 'Certificate of Good Standing (Delaware)', subtitle: 'Delaware Division of Corporations • Entity File #7749201', category: 'Verified Documents', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'delaware certificate good standing entity state' },
      { id: 'doc-incorp', title: 'Articles of Incorporation (BioGenix Labs Inc.)', subtitle: 'Official State Certified Corporate Bylaws & Entity Seal', category: 'Verified Documents', icon: FileText, path: '/oal/borrower/kyc', tags: 'articles incorporation bylaws corporate charter' },
      { id: 'doc-fincen', title: 'FinCEN Beneficial Ownership Compliance Attestation', subtitle: 'Federal CDD Cryptographic SHA-256 Hash Verification', category: 'Verified Documents', icon: ShieldCheck, path: '/oal/borrower/kyc', tags: 'fincen cdd beneficial ownership compliance federal' },
      { id: 'doc-audit', title: 'Audited Balance Sheet & Financial Statements', subtitle: 'FY 2024 Comprehensive Audit by Deloitte LLP', category: 'Verified Documents', icon: FileCheck, path: '/oal/borrower/kyc', tags: 'deloitte audit balance sheet financials p&l tax' },
      { id: 'doc-appraisal', title: 'Clinical Equipment & Lab Machinery Appraisal', subtitle: '$4.2M Independent Certified Physical Asset Valuation', category: 'Verified Documents', icon: FileText, path: '/oal/borrower/application', tags: 'machinery lab equipment appraisal 4.2m valuation' },

      // 6. Quick System Actions
      { id: 'act-theme', title: 'Toggle Theme (Switch to ' + (theme === 'light' ? 'Dark' : 'Light') + ' Mode)', subtitle: 'Switch system appearance and contrast', category: 'Quick Actions', icon: Sun, action: toggleTheme, tags: 'theme dark light mode color sun moon' },
      { id: 'act-photo', title: 'Upload / Change My Profile Picture', subtitle: 'Upload new avatar photo and edit signatory credentials', category: 'Quick Actions', icon: User, path: '/oal/borrower/profile', tags: 'pic photo avatar upload picture profile' },
      { id: 'act-chat', title: 'Start Real-time Chat with Sarah Jenkins', subtitle: 'Open direct encrypted underwriting messaging channel', category: 'Quick Actions', icon: MessageSquare, path: '/oal/borrower/messages', tags: 'chat message talk sarah underwriter' },
      { id: 'act-offers', title: 'Compare Competitive Institutional Term Sheets', subtitle: 'Inspect Vanguard, Apex & Hyperion interest rates & APRs', category: 'Quick Actions', icon: CreditCard, path: '/oal/borrower/offers', tags: 'compare offers rate terms debt' },
      { id: 'act-kyc', title: 'Export KYC Verification Compliance Record', subtitle: 'Download certified cryptographic identity report', category: 'Quick Actions', icon: Download, path: '/oal/borrower/kyc', tags: 'export download pdf kyc certificate' },
    ];
  };

  const allRecords = getSearchDatabase();

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(allRecords.map((r) => r.category)))];

  // Filter records based on category & search query
  const filteredRecords = allRecords.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.tags && item.tags.toLowerCase().includes(q))
    );
  });

  const handleSelectResult = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
    setIsSearchOpen(false);
    setSearchQuery('');
    addToast({
      title: 'Opened ' + item.title,
      type: 'info',
    });
  };

  // Group search results by category
  const groupedResults = filteredRecords.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: 'var(--glass-surface)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Left: Navigation Menu Toggle + Brand Logo (Menu button at top-left corner) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          icon={Menu}
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
          style={{ flexShrink: 0 }}
        />

        <div
          onClick={() => navigate(product === 'crm' ? '/crm/dashboard' : '/oal/dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          {product === 'crm' ? (
            <AiEnergyLogo size={32} showText={false} />
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#0f766e',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '14px',
                fontFamily: 'var(--font-display)',
                flexShrink: 0,
              }}
            >
              OA
            </div>
          )}

          <div className="flex flex-col min-w-0">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '15px',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              {product === 'crm' ? 'CRM nErgy AI' : 'OAL Network'}
            </span>
            <span
              className="hidden-mobile"
              style={{
                fontSize: '10px',
                color: 'var(--text-tertiary)',
                fontWeight: 600,
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              {product === 'crm' ? 'Executive Platform' : 'Lending Marketplace'}
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Internal Search Engine Bar */}
      <div className="hidden-mobile flex-1" style={{ maxWidth: '480px', margin: '0 1.25rem' }}>
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between transition-all"
          style={{
            height: '38px',
            padding: '0 1rem',
            cursor: 'pointer',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-sm)',
            boxSizing: 'border-box',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary-border)';
            e.currentTarget.style.backgroundColor = 'var(--surface)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
          }}
          title="Internal Search Engine: Search docs, tasks, files and others with AI"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Search size={15} style={{ color: '#0ea5e9', flexShrink: 0 }} />
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Search docs, tasks, files and others with AI...
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                padding: '2px 5px',
                borderRadius: '4px',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
            >
              AI
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                backgroundColor: 'var(--surface)',
                padding: '2px 5px',
                borderRadius: '5px',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ⌘K
            </span>
          </div>
        </button>
      </div>

      {/* Right Actions: Bestie Quick Action, Language Toggle, Notifications, Theme Toggle, User Profile */}
      <div className="flex items-center gap-2.5 ml-auto" style={{ marginLeft: 'auto' }}>
        {/* Ask Zunme AI Quick Button */}
        {product === 'crm' && (
          <button
            type="button"
            onClick={() => navigate('/crm/bestie')}
            className="hidden-mobile"
            style={{
              display: 'inline-flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '7px',
              height: '36px',
              padding: '0 12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
              border: 'none',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 2px 8px -1px rgba(99, 102, 241, 0.45), 0 1px 3px rgba(236, 72, 153, 0.3)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(99, 102, 241, 0.6), 0 2px 8px rgba(236, 72, 153, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px -1px rgba(99, 102, 241, 0.45), 0 1px 3px rgba(236, 72, 153, 0.3)';
            }}
            title="Ask Zunme AI Agent"
          >
            <Sparkles size={14} style={{ color: '#fef08a', flexShrink: 0 }} />
            <span style={{ letterSpacing: '-0.01em', lineHeight: 1 }}>{t('Ask Zunme AI')}</span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                background: 'rgba(255, 255, 255, 0.22)',
                color: '#ffffff',
                padding: '2px 5px',
                borderRadius: '5px',
                backdropFilter: 'blur(4px)',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
            >
              AI
            </span>
          </button>
        )}

        {/* 1-Click Seamless Worksuite CRM Switcher (No Login Needed) */}
        <button
          type="button"
          onClick={() => {
            const userEmail = currentUser?.email || 'kavya@gmail.com';
            const userName = currentUser?.name || 'Administrator';
            const userRole = currentUser?.role || 'ADMIN';
            const token = localStorage.getItem('crm_token') || `sso_session_${Date.now()}`;
            const ssoUrl = `http://localhost:5174/sso-login?email=${encodeURIComponent(userEmail)}&name=${encodeURIComponent(userName)}&role=${encodeURIComponent(userRole)}&token=${encodeURIComponent(token)}`;
            window.open(ssoUrl, '_blank');
          }}
          className="hidden-mobile"
          style={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '7px',
            height: '36px',
            padding: '0 12px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)',
            border: 'none',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            boxShadow: '0 2px 8px -1px rgba(37, 99, 235, 0.45), 0 1px 3px rgba(79, 70, 229, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(37, 99, 235, 0.6), 0 2px 8px rgba(79, 70, 229, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px -1px rgba(37, 99, 235, 0.45), 0 1px 3px rgba(79, 70, 229, 0.3)';
          }}
          title="Open Worksuite CRM without logging in"
        >
          <Building2 size={14} style={{ color: '#bae6fd', flexShrink: 0 }} />
          <span style={{ letterSpacing: '-0.01em', lineHeight: 1 }}>Worksuite CRM</span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 800,
              background: 'rgba(255, 255, 255, 0.22)',
              color: '#ffffff',
              padding: '2px 5px',
              borderRadius: '5px',
              backdropFilter: 'blur(4px)',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            ↗
          </span>
        </button>

        {/* Mobile Search Button (< 768px) */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="visible-mobile"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Search"
          aria-label="Search"
        >
          <Search size={16} />
        </button>

        {/* 1-Click Language Switcher (Desktop only) */}
        <div className="hidden-mobile">
          <LanguageToggle />
        </div>

        {/* Notifications Dropdown */}
        <Dropdown
          trigger={
            <button
              type="button"
              className="flex items-center justify-center rounded-full transition-colors cursor-pointer"
              style={{
                width: '36px',
                height: '36px',
                position: 'relative',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotifications.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    fontSize: '9px',
                    fontWeight: 800,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    border: '2px solid var(--surface)',
                  }}
                >
                  {unreadNotifications.length}
                </span>
              )}
            </button>
          }
        >
          <DropdownHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>{t('System Notifications')} ({unreadNotifications.length})</span>
              {unreadNotifications.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllNotifications}
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#ef4444',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title={t('Clear all notifications')}
                >
                  <Trash2 size={11} />
                  <span>{t('Clear all')}</span>
                </button>
              )}
            </div>
          </DropdownHeader>

          {unreadNotifications.length === 0 ? (
            <div className="p-4 text-center text-xs text-tertiary flex flex-col items-center gap-1">
              <span style={{ fontSize: '13px' }}>✨</span>
              <span>{t('No unread notifications')}</span>
            </div>
          ) : (
            unreadNotifications.slice(0, 5).map((n) => (
              <div
                key={n.id}
                className="dropdown-item flex items-center justify-between gap-2"
                style={{ cursor: 'pointer' }}
                onClick={() => addToast({ title: 'Notification', message: n.title || n.subject, type: 'info' })}
              >
                <div className="flex flex-col gap-0.5" style={{ minWidth: 0, flex: 1 }}>
                  <span className="font-semibold text-xs text-primary truncate" style={{ maxWidth: '210px' }}>{n.title || n.subject}</span>
                  <span className="text-tertiary text-xs">{n.userName || 'System'}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleDismissNotification(n.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary, #94a3b8)',
                    cursor: 'pointer',
                    padding: '3px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.6,
                    transition: 'opacity 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.6';
                    e.currentTarget.style.color = 'var(--text-tertiary, #94a3b8)';
                  }}
                  title="Dismiss notification"
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}

          {unreadNotifications.length > 0 && (
            <>
              <DropdownDivider />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 10px' }}>
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary, #64748b)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    width: '100%',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary, #64748b)';
                  }}
                >
                  <CheckCheck size={13} />
                  <span>{t('Mark all as read')}</span>
                </button>
              </div>
            </>
          )}
        </Dropdown>

        {/* Theme Toggle Button - Prominent & Right next to Profile */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-full transition-colors cursor-pointer"
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            padding: 0,
          }}
          title={theme === 'light' ? t('Switch to Dark Mode') : t('Switch to Light Mode')}
        >
          {theme === 'light' ? (
            <Moon size={20} style={{ color: 'var(--text-primary)' }} />
          ) : (
            <Sun size={20} style={{ color: '#f59e0b' }} />
          )}
        </button>
        {/* User Profile Dropdown with Role Switcher */}
        <Dropdown
          trigger={
            <div
              className="flex items-center gap-1.5 cursor-pointer px-2 sm:px-3 py-1.5 rounded-lg transition-colors hover:bg-surface-hover"
              style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}
            >
              <div
                className="visible-mobile items-center justify-center rounded-full font-bold text-xs"
                style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #0284c7, #6366f1)',
                  color: '#ffffff',
                  fontSize: '11px',
                  display: 'none',
                  flexShrink: 0,
                }}
              >
                {(currentUser?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="hidden-mobile flex-col text-left">
                <span className="font-bold text-xs text-primary leading-tight">{currentUser?.name || 'Alexander Wright'}</span>
                <span className="text-tertiary text-xs leading-none" style={{ fontSize: '10px', marginTop: '2px' }}>
                  {t(currentUser?.role || 'Company Owner')}
                </span>
              </div>
              <ChevronDown size={14} className="text-tertiary ml-0.5 sm:ml-1 flex-shrink-0" />
            </div>
          }
        >
          <DropdownHeader>
            <div className="flex flex-col gap-1 py-0.5">
              <span className="font-bold text-xs text-primary">{currentUser?.name || 'Alexander Wright'}</span>
              <span className="text-tertiary text-xs">{currentUser?.company || 'nErgy Enterprise'}</span>
            </div>
          </DropdownHeader>

          <DropdownItem icon={User} onClick={() => navigate(product === 'crm' ? '/crm/profile' : '/oal/borrower/profile')}>
            {t('Account Profile')}
          </DropdownItem>
          <DropdownItem icon={Building2} onClick={() => addToast({ title: 'Tenant Vault', message: `Tenant ID: ${currentUser?.tenantId || 'TENANT-08492'}`, type: 'info' })}>
            {t('Workspace Vault')}
          </DropdownItem>
          <DropdownItem
            icon={Building2}
            onClick={() => {
              const userEmail = currentUser?.email || 'kavya@gmail.com';
              const userName = currentUser?.name || 'Administrator';
              const userRole = currentUser?.role || 'ADMIN';
              const token = localStorage.getItem('crm_token') || `sso_session_${Date.now()}`;
              const ssoUrl = `http://localhost:5174/sso-login?email=${encodeURIComponent(userEmail)}&name=${encodeURIComponent(userName)}&role=${encodeURIComponent(userRole)}&token=${encodeURIComponent(token)}`;
              window.open(ssoUrl, '_blank');
            }}
          >
            {t('Switch to Worksuite CRM')}
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem icon={LogOut} danger onClick={handleLogout}>
            {t(`Log Out (${product.toUpperCase()})`)}
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Massive Global Spotlight Search Modal / Command Palette */}
      {isSearchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '3.5rem 1rem 1rem 1rem',
          }}
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '82vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Top Search Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.1rem 1.25rem',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
              }}
            >
              <Search size={20} style={{ color: '#0ea5e9', flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs, tasks, files and others with AI..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              />
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                AI SEARCH
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* 2. Interactive Category Filter Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1rem',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--surface-secondary)',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--accent)' : 'var(--surface)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* 3. Comprehensive Results Body */}
            <div style={{ overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {Object.keys(groupedResults).length > 0 ? (
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between px-1">
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {category} ({items.length})
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      {items.map((item) => {
                        const Icon = item.icon || FileText;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectResult(item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.75rem',
                              padding: '0.7rem 0.85rem',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                              border: '1px solid transparent',
                              transition: 'all 0.15s ease',
                            }}
                            className="hover:surface-secondary"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                              e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.borderColor = 'transparent';
                            }}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                style={{
                                  width: '34px',
                                  height: '34px',
                                  borderRadius: '9px',
                                  backgroundColor: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'var(--accent)',
                                  flexShrink: 0,
                                }}
                              >
                                <Icon size={17} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                                  {item.title}
                                </span>
                                <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }} className="truncate">
                                  {item.subtitle}
                                </span>
                              </div>
                            </div>

                            <ArrowRight size={15} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <Search size={36} style={{ color: 'var(--text-tertiary)', margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    No matching records found for "{searchQuery}"
                  </div>
                  <div className="text-secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
                    Try searching for keywords like "KYC", "Loan", "750k", "Vanguard", "Sarah", "Appraisal", "Delaware", or "Score".
                  </div>
                </div>
              )}
            </div>

            {/* 4. Modal Footer with Keyboard Shortcuts Hint */}
            <div
              style={{
                padding: '0.75rem 1.25rem',
                borderTop: '1px solid var(--border)',
                backgroundColor: 'var(--surface-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11.5px',
                color: 'var(--text-tertiary)',
              }}
            >
              <div className="flex items-center gap-3 font-medium">
                <span>Select <strong>↵ Click</strong></span>
                <span>Filter <strong>Category Tabs</strong></span>
                <span>Close <strong>esc</strong></span>
              </div>
              <Badge variant="neutral" style={{ fontSize: '10px', fontWeight: 700 }}>
                {filteredRecords.length} Indexed System Records
              </Badge>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
