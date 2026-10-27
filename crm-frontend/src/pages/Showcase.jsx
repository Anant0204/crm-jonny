import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search as SearchIcon,
  Plus,
  Mail,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  Bell,
  Trash2,
  ExternalLink,
  ChevronRight,
  Target,
  Boxes,
  Bot,
  Video,
  UserCheck,
  LifeBuoy,
  MapPin,
  BookOpen,
  Lock,
  ArrowRight,
  Zap,
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Modal,
  Drawer,
  Tabs,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  KPICard,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Search,
  Filter,
  Breadcrumb,
  Avatar,
  Tooltip,
  LoadingSpinner,
  Skeleton,
  EmptyState,
  ErrorState,
  ConfirmationDialog,
  FileUpload,
  ProgressBar,
  Stepper,
  Timeline
} from '../components/ui';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from '../components/common/LanguageToggle';

export const Showcase = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  // State for interactive components
  const [activeTab, setActiveTab] = useState('pitch');
  const [inputValue, setInputValue] = useState('Enterprise Search Query');
  const [selectValue, setSelectValue] = useState('crm');
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('monthly');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeFilterCount, setActiveFilterCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [progressVal, setProgressVal] = useState(65);

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Top Banner */}
      <Card className="p-6" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-secondary) 100%)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary" icon={Sparkles}>
                Phase 1 Foundation Complete
              </Badge>
              <Badge variant="success">2026 SaaS Theme</Badge>
            </div>
            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '0.25rem' }}>
              Design System & Component Showcase
            </h1>
            <p className="text-sm text-secondary margin-0">
              Interactive test gallery for all 30 reusable UI components, light/dark themes, responsive rules, and tokens.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button variant="outline" onClick={toggleTheme}>
              Current Theme: <strong className="ml-1 uppercase">{theme}</strong>
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                addToast({
                  title: 'Toast System Active',
                  message: 'Global toast notification fired successfully!',
                  type: 'success',
                })
              }
            >
              Test Global Toast
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <Tabs
        tabs={[
          { id: 'pitch', label: '⭐ Attorney & Investor Pitch (AI vs Salesforce)' },
          { id: 'buttons', label: '1-6. Buttons & Inputs' },
          { id: 'overlays', label: '7-10. Dropdown, Modal, Drawer & Toast' },
          { id: 'cards', label: '11-15. Tabs, Badges, Cards & Table' },
          { id: 'nav', label: '16-20. Pagination, Search, Filter & Avatar' },
          { id: 'feedback', label: '21-25. Tooltip, Spinner, Skeleton & States' },
          { id: 'workflow', label: '26-30. Confirm, File, Progress, Stepper & Timeline' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* SECTION 0: ATTORNEY & INVESTOR PITCH (SALESFORCE VS CRM NERGY AI) */}
      {activeTab === 'pitch' && (
        <div className="flex flex-col gap-6">
          {/* Executive Overview Banner */}
          <Card className="border border-sky-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="bg-sky-500 text-white font-mono uppercase text-xs">
                    Legal & Patent Review Briefing
                  </Badge>
                  <span className="text-xs text-slate-300">Confidential Work Product</span>
                </div>
                <h2 className="text-2xl font-bold font-display">
                  Why CRM nErgy AI Disrupts Traditional Enterprise Software
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  A proprietary multi-modal platform fusing <strong>CRM + ERP + 15 AI Content Studios + 3D Video Storytelling + Native Commercial Lending (OAL Network)</strong> into an autonomous, non-fragmented business operating system.
                </p>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-center">
                  <span className="text-xs font-mono text-sky-400 block">Proprietary Technology</span>
                  <span className="text-base font-black">15 Sub-Studios</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Direct Head-to-Head Comparison Matrix */}
          <Card className="border shadow-sm">
            <CardHeader
              title="Salesforce vs. CRM nErgy AI: Architectural Comparison"
              subtitle="Core technological and business model differentiators"
            />
            <CardBody className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>Platform Capability</TableCell>
                    <TableCell isHeader>Traditional Salesforce</TableCell>
                    <TableCell isHeader>CRM nErgy AI SuperHouse</TableCell>
                    <TableCell isHeader>Enterprise Legal & Cost Impact</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      feature: 'AI Content & Video Creation',
                      salesforce: 'None (Requires separate Canva, Synthesia, Midjourney subscriptions)',
                      nergy: 'Native 15 AI Content Studios & 4-Step Video Agent (Say it -> See it -> Shape it -> Ship it)',
                      impact: 'Eliminates $2,400/seat/yr in fragmented 3rd party creative tools',
                    },
                    {
                      feature: 'Autonomous Business AI Agent',
                      salesforce: 'Einstein (Add-on bolt-on chatbot with heavy token billing)',
                      nergy: 'Zunme AI Agent natively wired to live CRM records & ERP supply chains',
                      impact: 'Real-time contextual action cards with zero per-prompt micro-fees',
                    },
                    {
                      feature: 'Integrated ERP & Supply Chain',
                      salesforce: 'Requires separate SAP, Oracle or expensive AppExchange connectors',
                      nergy: 'Native ERP module with Work Orders, BOM, Invoicing & Multi-Warehouse nodes',
                      impact: 'Zero middleware failure points; 100% unified general ledgers',
                    },
                    {
                      feature: 'Commercial Credit & Financing',
                      salesforce: 'Zero financing capability (Pure software only)',
                      nergy: 'Direct API bridge to OAL Network commercial lending marketplace & debt bidding',
                      impact: 'Enables client companies to secure working capital directly inside their CRM',
                    },
                    {
                      feature: 'Language & Field Mobility',
                      salesforce: 'Complex localization packs and rigid desktop interfaces',
                      nergy: '1-Click English/Spanish instant bilingual toggle + My Fav Apps Expandable Big Screen',
                      impact: 'Optimized for high-growth bilingual markets (e.g. California & Texas corridors)',
                    },
                  ].map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell><strong className="text-primary text-xs">{row.feature}</strong></TableCell>
                      <TableCell><span className="text-secondary text-xs">{row.salesforce}</span></TableCell>
                      <TableCell><span className="text-sky-600 font-bold text-xs">{row.nergy}</span></TableCell>
                      <TableCell><Badge variant="success" className="text-[11px]">{row.impact}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          {/* 9 Strategic Architectural Pillars & Interactive Demonstrator */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Core Architectural Pillars — Interactive Due Diligence
                </h3>
                <p className="text-xs text-secondary">
                  Click any verified enterprise module below to launch the live interface and inspect workflow completeness.
                </p>
              </div>
              <Badge variant="primary" icon={Zap}>9 Verified Workspaces</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Core CRM & Sales Velocity',
                  desc: 'Comprehensive multi-stage deals pipeline, verified contacts roster, lead scoring, and automated task reminders.',
                  icon: Target,
                  path: '/crm/pipeline',
                  badge: 'Pipeline Live',
                },
                {
                  title: 'Enterprise ERP & Supply Chain',
                  desc: 'General Ledger Chart of Accounts, live AR invoicing, multi-warehouse stock tracking, and shop-floor BOM manufacturing.',
                  icon: Boxes,
                  path: '/crm/erp/finance',
                  badge: 'ERP Suite Live',
                },
                {
                  title: 'AI SuperHouse (15 Sub-Studios)',
                  desc: 'Full creative tool cluster including AAI Muzik, Real Talk, Logo Generator, Film Maker, and Big Movies Lab.',
                  icon: Sparkles,
                  path: '/crm/ai-studio',
                  badge: '15 Sub-Studios',
                },
                {
                  title: 'Zunme AI Agent',
                  desc: 'Autonomous enterprise operating assistant with contextual action cards: Ask Zunme AI, Analyze, Automate, and Execute.',
                  icon: Bot,
                  path: '/crm/bestie',
                  badge: 'Operating Assistant',
                },
                {
                  title: 'AI Video Agent Pipeline',
                  desc: '4-step video creation engine: SAY IT → SEE IT → SHAPE IT → SHIP IT supporting script, image, and voice avatars.',
                  icon: Video,
                  path: '/crm/ai-video',
                  badge: '4-Step Pipeline',
                },
                {
                  title: 'HR & Recruiting ATS',
                  desc: 'Candidate talent roster, semantic AI skill match percentages, applicant tracking, and interactive candidate profile drawers.',
                  icon: UserCheck,
                  path: '/crm/hr/candidates',
                  badge: 'ATS Live',
                },
                {
                  title: 'Customer Support & SLA Desk',
                  desc: 'Enterprise ticket queue, SLA countdown timers, priority severity badges, and AI auto-response routing preview.',
                  icon: LifeBuoy,
                  path: '/crm/support/tickets',
                  badge: 'SLA Engine',
                },
                {
                  title: 'Territory Field Management',
                  desc: '5-tier hierarchy (Region → Territory → Manager → Rep → Customer) with interactive US geographic map and quota tracking.',
                  icon: MapPin,
                  path: '/crm/territory',
                  badge: 'Territory Map',
                },
                {
                  title: 'Secured zBox & Cognitive Search',
                  desc: 'Private SEA (Johnny) ↔ Kiaan Tech Team direct encrypted communications zBox and unified cognitive enterprise AI search.',
                  icon: Lock,
                  path: '/crm/admin/ebox',
                  badge: 'Private Channel',
                },
              ].map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={i}
                    onClick={() => navigate(pillar.path)}
                    className="p-4 rounded-xl border border-border bg-surface hover:border-sky-500/50 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center">
                          <Icon size={18} />
                        </div>
                        <Badge variant="default" className="text-[10px]">{pillar.badge}</Badge>
                      </div>
                      <h4 className="text-sm font-bold text-primary group-hover:text-sky-600 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-secondary leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-sky-600 pt-2 border-t border-subtle">
                      <span>Launch Verified Interface</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attorney Due Diligence & Architecture Readiness Summary Card */}
          <Card className="border border-border bg-surface-secondary/50 p-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-wide">
                  Enterprise Architecture Due Diligence
                </span>
                <h4 className="text-base font-bold text-primary">
                  Proprietary Unified SuperHouse IP Summary
                </h4>
                <p className="text-xs text-secondary max-w-2xl">
                  CRM nErgy AI is architected with strict multi-tenant isolation, clean presentation-layer separation, and modular sub-studios. Eliminates multi-vendor vendor lock-in while preserving enterprise compliance standards.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                onClick={() => navigate('/crm/dashboard')}
              >
                Enter Executive Dashboard
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* SECTION 1: BUTTONS & INPUTS */}
      {activeTab === 'buttons' && (
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="1. Button System" subtitle="6 Variants x 3 Sizes x Loading & Disabled States" />
            <CardBody className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="success">Success Button</Button>
              </div>

              <div className="flex items-center gap-3 flex-wrap border-t border-subtle pt-4">
                <Button variant="primary" size="sm" icon={Plus}>Small Icon</Button>
                <Button variant="primary" size="md" icon={Plus}>Medium Icon</Button>
                <Button variant="primary" size="lg" icon={Plus}>Large Icon</Button>
                <Button variant="primary" isLoading>Loading State</Button>
                <Button variant="primary" isDisabled>Disabled State</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="2 - 6. Input, Select, Checkbox, Radio & Switch Controls" />
            <CardBody className="grid-responsive-2col">
              <div className="flex flex-col gap-4">
                <Input
                  label="Standard Text Input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  startIcon={Mail}
                  isClearable
                  onClear={() => setInputValue('')}
                  helperText="Supports start/end icons and clear button."
                />

                <Input
                  label="Input with Error State"
                  value="invalid-email-address"
                  errorMessage="Please provide a valid corporate email domain."
                  required
                />

                <Select
                  label="Select Component"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={[
                    { label: 'CRM nErgy AI Enterprise', value: 'crm' },
                    { label: 'OAL Network Marketplace', value: 'oal' },
                  ]}
                  helperText="Custom styled enterprise dropdown select."
                />
              </div>

              <div className="flex flex-col gap-4 p-4 surface-secondary rounded-md">
                <h4 className="text-sm">Checkbox, Radio & Switch Toggles</h4>

                <Checkbox
                  label="Enable Two-Factor Multi-Tenant Security"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold">Billing Frequency:</span>
                  <div className="flex items-center gap-4">
                    <Radio
                      name="billing"
                      value="monthly"
                      label="Monthly Plan"
                      checked={radioValue === 'monthly'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <Radio
                      name="billing"
                      value="annual"
                      label="Annual (Save 20%)"
                      checked={radioValue === 'annual'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                  </div>
                </div>

                <Switch
                  label="Live System Event Stream"
                  checked={switchChecked}
                  onChange={(e) => setSwitchChecked(e.target.checked)}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* SECTION 2: OVERLAYS */}
      {activeTab === 'overlays' && (
        <Card>
          <CardHeader title="7 - 10. Dropdown Menu, Modal, Drawer & Toast Notifications" />
          <CardBody className="flex items-center gap-4 flex-wrap">
            <Dropdown trigger={<Button variant="outline">Open Dropdown Menu</Button>}>
              <DropdownHeader>Action Menu</DropdownHeader>
              <DropdownItem icon={User} onClick={() => addToast({ title: 'Profile Clicked', type: 'info' })}>
                View Profile
              </DropdownItem>
              <DropdownItem icon={Bell} onClick={() => addToast({ title: 'Settings Clicked', type: 'info' })}>
                Notification Rules
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem icon={Trash2} danger onClick={() => addToast({ title: 'Deleted', type: 'error' })}>
                Delete Record
              </DropdownItem>
            </Dropdown>

            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Animated Modal
            </Button>

            <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
              Open Sliding Drawer
            </Button>

            <Button
              variant="success"
              onClick={() =>
                addToast({
                  title: 'Success Notification',
                  message: 'Operation completed cleanly with 0 console warnings.',
                  type: 'success',
                })
              }
            >
              Fire Success Toast
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                addToast({
                  title: 'Error Alert',
                  message: 'Failed to communicate with legacy API server.',
                  type: 'error',
                })
              }
            >
              Fire Error Toast
            </Button>
          </CardBody>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Interactive Demo Modal"
            footer={
              <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                Got It
              </Button>
            }
          >
            <p className="text-sm text-secondary">
              This modal dialog locks body scroll, handles ESC key closing, backdrop clicking, and renders smoothly with CSS scale animation.
            </p>
          </Modal>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Sliding Drawer Panel"
            position="right"
          >
            <p className="text-sm text-secondary">
              Drawers can be positioned left or right, and support any content or navigation lists inside.
            </p>
          </Drawer>
        </Card>
      )}

      {/* SECTION 3: CARDS & TABLES */}
      {activeTab === 'cards' && (
        <div className="flex flex-col gap-6">
          <div className="grid-responsive-kpi">
            <KPICard title="Total Revenue" value="$1.28M" change="+18.4%" changeType="positive" icon={Sparkles} />
            <KPICard title="Active Loans" value="142" change="+4" changeType="positive" icon={FileText} />
            <KPICard title="Default Rate" value="0.42%" change="-0.1%" changeType="positive" icon={Shield} />
            <KPICard title="Pending Audit" value="12 Items" change="Action Needed" changeType="warning" icon={AlertTriangle} />
          </div>

          <Card>
            <CardHeader title="12. Badges System" />
            <CardBody className="flex items-center gap-2 flex-wrap">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="primary">Primary Tag</Badge>
              <Badge variant="success" icon={CheckCircle2}>Success Pill</Badge>
              <Badge variant="warning" icon={AlertTriangle}>Warning Status</Badge>
              <Badge variant="error">Error Alert</Badge>
              <Badge variant="info">Info Notice</Badge>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="15. Data Table Component" />
            <CardBody className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>ID</TableCell>
                    <TableCell isHeader>Tenant Module</TableCell>
                    <TableCell isHeader>Security Status</TableCell>
                    <TableCell isHeader align="right">Latency</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell><span className="font-mono text-xs">MOD-01</span></TableCell>
                    <TableCell><span className="font-semibold">CRM Contacts Database</span></TableCell>
                    <TableCell><Badge variant="success">Encrypted</Badge></TableCell>
                    <TableCell align="right"><span className="text-xs text-secondary">14 ms</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><span className="font-mono text-xs">MOD-02</span></TableCell>
                    <TableCell><span className="font-semibold">OAL Lending Engine</span></TableCell>
                    <TableCell><Badge variant="primary">Connected</Badge></TableCell>
                    <TableCell align="right"><span className="text-xs text-secondary">22 ms</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      )}

      {/* SECTION 4: NAV & SEARCH */}
      {activeTab === 'nav' && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h4 className="mb-2">19. Breadcrumb Bar</h4>
            <Breadcrumb items={[{ label: 'System Showcase' }, { label: 'Navigation Tools' }]} />
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">17 - 18. Search Input & Filter Bar</h4>
            <div className="flex flex-col gap-4">
              <Search
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue('')}
                showShortcut
              />

              <Filter
                activeCount={activeFilterCount}
                onReset={() => {
                  setActiveFilterCount(0);
                  addToast({ title: 'Filters Reset', type: 'info' });
                }}
              >
                <Select
                  value="all"
                  onChange={() => {}}
                  options={['All Departments', 'Sales', 'Finance', 'Engineering']}
                  style={{ height: '32px', fontSize: '12px' }}
                />
              </Filter>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">20. Avatars</h4>
            <div className="flex items-center gap-4">
              <Avatar name="Alexander Wright" size="sm" status="online" />
              <Avatar name="Sarah Jenkins" size="md" status="busy" />
              <Avatar name="Dr. Aris Thorne" size="lg" status="online" />
              <Avatar name="Enterprise Owner" size="xl" status="away" />
            </div>
          </Card>

          <Pagination
            currentPage={currentPage}
            totalPages={10}
            totalItems={100}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* SECTION 5: FEEDBACK & STATES */}
      {activeTab === 'feedback' && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h4 className="mb-4">21. Tooltip Hover Overlay</h4>
            <div className="flex items-center gap-6">
              <Tooltip content="Tooltip Placement Top" position="top">
                <Button variant="outline">Hover Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip Placement Bottom" position="bottom">
                <Button variant="outline">Hover Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip Placement Right" position="right">
                <Button variant="outline">Hover Right</Button>
              </Tooltip>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">22 - 23. Loading Spinner & Skeleton Shimmers</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <LoadingSpinner size="sm" label="Small spinner" />
                <LoadingSpinner size="md" label="Medium spinner" />
                <LoadingSpinner size="lg" label="Large spinner" />
              </div>

              <div className="flex flex-col gap-2 border-t border-subtle pt-4">
                <Skeleton width="40%" height="20px" />
                <Skeleton width="80%" height="14px" />
                <Skeleton width="60%" height="14px" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">24 - 25. Empty State & Error Banners</h4>
            <div className="grid-responsive-2col">
              <EmptyState
                title="Zero Deals Found"
                description="No matching sales pipeline opportunities available."
                actionLabel="Create Opportunity"
                onAction={() => addToast({ title: 'Action Clicked', type: 'info' })}
              />

              <ErrorState
                title="API Gateway Disconnected"
                description="Failed to retrieve live market interest rates."
                onRetry={() => addToast({ title: 'Retrying Connection', type: 'warning' })}
              />
            </div>
          </Card>
        </div>
      )}

      {/* SECTION 6: WORKFLOW */}
      {activeTab === 'workflow' && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h4 className="mb-4">26 - 27. Confirmation Dialog & File Upload</h4>
            <div className="flex items-center gap-4 mb-6">
              <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                Test Confirmation Dialog
              </Button>
            </div>

            <FileUpload
              label="Interactive Drag and Drop Uploader"
              onFilesSelected={(files) => addToast({ title: 'Files Attached', message: `${files.length} file(s) uploaded.`, type: 'success' })}
            />

            <ConfirmationDialog
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={() => {
                setIsConfirmOpen(false);
                addToast({ title: 'Action Confirmed', message: 'Destructive operation executed cleanly.', type: 'error' });
              }}
              isDanger
              title="Delete Tenant Database?"
              description="Are you sure you want to permanently erase all records for this test company?"
              confirmLabel="Delete Permanently"
            />
          </Card>

          <Card className="p-6 flex flex-col gap-6">
            <div>
              <h4 className="mb-2">28. Progress Bar Component</h4>
              <ProgressBar value={progressVal} variant="primary" showLabel />
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => setProgressVal((p) => Math.max(0, p - 15))}>
                  - 15%
                </Button>
                <Button variant="outline" size="sm" onClick={() => setProgressVal((p) => Math.min(100, p + 15))}>
                  + 15%
                </Button>
              </div>
            </div>

            <div>
              <h4 className="mb-4">29. Stepper Bar</h4>
              <Stepper
                currentStep={1}
                steps={[
                  { label: 'Project Setup', description: 'React + Vite' },
                  { label: 'Design System', description: 'Tokens & Themes' },
                  { label: 'Reusable Components', description: '30 Components' },
                  { label: 'Routing & QA', description: 'Verified Clean' },
                ]}
              />
            </div>

            <div>
              <h4 className="mb-4">30. Vertical Timeline Feed</h4>
              <Timeline
                items={[
                  { title: 'Design System Tokens Loaded', description: 'Defined primary, surface, and dark variables.', time: 'Step 1' },
                  { title: 'Built 30 Reusable Components', description: 'Buttons, Inputs, Table, Modal, Drawer, Toast, Stepper.', time: 'Step 2' },
                  { title: 'Verified Responsive & Theme Rules', description: 'Checked zero overflow across 320px to 1440px+ screens.', time: 'Step 3' },
                ]}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
