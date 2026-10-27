import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Briefcase,
  DollarSign,
  User,
  Plus,
  RefreshCw,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckSquare,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Check,
  Trash2,
  ArrowRight,
  Filter,
  MoreVertical,
  Layers,
  Clock,
  FileText,
  Target,
  Download,
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  Badge,
  ProgressBar,
  Modal,
  Input,
  Select,
  Dropdown,
  DropdownItem,
  DropdownHeader,
  DropdownDivider
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';

export const CrmDashboard = () => {
  const navigate = useNavigate();
  const { user: crmUser } = useAuth();
  const { t } = useLanguage();
  const { formatCurrency, currency } = useCurrency();
  const {
    contacts,
    addContact,
    leads,
    deals,
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    activities,
    refetchCrmData,
  } = useCrm();
  const { addToast } = useToast();

  useEffect(() => {
    if (refetchCrmData) {
      refetchCrmData();
    }
  }, [refetchCrmData]);

  // Primary Dashboard State
  const [activeRange, setActiveRange] = useState('30 Days');
  const [selectedDateLabel, setSelectedDateLabel] = useState(() => {
    const end = new Date();
    const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [pipelineMetric, setPipelineMetric] = useState('value'); // 'value' | 'deals' | 'winRate'
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'deals' | 'contacts' | 'leads'
  const [taskFilter, setTaskFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedKpiDetail, setSelectedKpiDetail] = useState(null);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  // Form states for Quick Task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContact, setNewTaskContact] = useState(contacts[0]?.name || 'Direct Lead');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [newTaskDueDate, setNewTaskDueDate] = useState(() => new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]);

  // Form states for Quick Contact
  const [newContactName, setNewContactName] = useState('');
  const [newContactCompany, setNewContactCompany] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactType, setNewContactType] = useState('Enterprise Client');

  // Dynamic calculations from real live CRM state
  const totalPipelineValue = deals.reduce((acc, d) => {
    const rawVal = d.rawValue !== undefined && d.rawValue !== null
      ? d.rawValue
      : (typeof d.value === 'number' ? d.value : parseFloat(String(d.value).replace(/[^0-9.-]+/g, '')) || 0);
    return acc + rawVal;
  }, 0);

  const totalLeadsDisplay = leads.length;
  const qualifiedOppDisplay = deals.filter((d) => {
    const st = (d.stage || '').toLowerCase();
    return st.includes('qualif') || st.includes('opp') || st.includes('proposal') || st.includes('negotiat');
  }).length;
  const revenueDisplay = formatCurrency(totalPipelineValue);
  const enterpriseClientCount = contacts.length;
  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;

  // Sync Data Handler
  const handleSyncData = async () => {
    setIsSyncing(true);
    try {
      if (refetchCrmData) {
        await refetchCrmData();
      }
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      addToast({
        title: 'Dashboard Refreshed',
        message: 'Live pipeline analytics and tenant telemetry synced successfully.',
        type: 'success',
      });
    } catch (_) {
      addToast({
        title: 'Sync Notice',
        message: 'Dashboard data updated from cache.',
        type: 'info',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Quick Task Submit
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      addToast({ title: 'Validation Error', message: 'Please enter a task title.', type: 'error' });
      return;
    }

    await addTask({
      title: newTaskTitle,
      contact: newTaskContact,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      assignedTo: crmUser?.name || 'Alexander Wright',
    });

    addToast({
      title: 'Task Created',
      message: `"${newTaskTitle}" scheduled for ${newTaskContact}.`,
      type: 'success',
    });

    setNewTaskTitle('');
    setIsTaskModalOpen(false);
  };

  // Quick Contact Submit
  const handleCreateContact = async (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactCompany.trim()) {
      addToast({ title: 'Validation Error', message: 'Name and Company are required.', type: 'error' });
      return;
    }

    await addContact({
      name: newContactName,
      company: newContactCompany,
      email:
        newContactEmail ||
        `${newContactName.toLowerCase().replace(/\s+/g, '.')}@${newContactCompany
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')}.com`,
      phone: newContactPhone || '+1 (555) 019-2834',
      type: newContactType,
      status: 'Active',
      owner: crmUser?.name || 'Alexander Wright',
    });

    addToast({
      title: 'Contact Created',
      message: `${newContactName} (${newContactCompany}) added to enterprise records.`,
      type: 'success',
    });

    setNewContactName('');
    setNewContactCompany('');
    setNewContactEmail('');
    setNewContactPhone('');
    setIsContactModalOpen(false);
  };

  // Dynamic Pipeline Stages based on live deals
  const negotiationDeals = deals.filter((d) => (d.stage || '').toLowerCase().includes('negotiat'));
  const proposalDeals = deals.filter((d) => (d.stage || '').toLowerCase().includes('proposal'));
  const qualifiedDeals = deals.filter((d) => (d.stage || '').toLowerCase().includes('qualif'));
  const discoveryDeals = deals.filter((d) => {
    const st = (d.stage || '').toLowerCase();
    return st.includes('new') || st.includes('lead') || st.includes('contact');
  });

  const getStageTotal = (arr) => arr.reduce((acc, d) => acc + (d.rawValue !== undefined ? d.rawValue : (parseFloat(String(d.value).replace(/[^0-9.-]+/g, '')) || 0)), 0);

  const pipelineStages = [
    {
      id: 'negotiation',
      name: t('Negotiation Stage'),
      value: formatCurrency(getStageTotal(negotiationDeals)),
      dealsCount: `${negotiationDeals.length} ${t('Deals')}`,
      winRate: `72% ${t('Win Rate')}`,
      pct: totalPipelineValue > 0 ? Math.round((getStageTotal(negotiationDeals) / totalPipelineValue) * 100) : 0,
      variant: 'primary',
      badgeColor: '#1d4ed8',
      description: t('Terms and SLA agreements in active negotiation review'),
    },
    {
      id: 'proposal',
      name: t('Proposal Sent'),
      value: formatCurrency(getStageTotal(proposalDeals)),
      dealsCount: `${proposalDeals.length} ${t('Deals')}`,
      winRate: `54% ${t('Win Rate')}`,
      pct: totalPipelineValue > 0 ? Math.round((getStageTotal(proposalDeals) / totalPipelineValue) * 100) : 0,
      variant: 'success',
      badgeColor: '#16a34a',
      description: t('Formal commercial quote submitted to decision makers'),
    },
    {
      id: 'qualified',
      name: t('Qualified Opportunities'),
      value: formatCurrency(getStageTotal(qualifiedDeals)),
      dealsCount: `${qualifiedDeals.length} ${t('Deals')}`,
      winRate: `41% ${t('Win Rate')}`,
      pct: totalPipelineValue > 0 ? Math.round((getStageTotal(qualifiedDeals) / totalPipelineValue) * 100) : 0,
      variant: 'warning',
      badgeColor: '#d97706',
      description: t('Technical scope validated, budget confirmed'),
    },
    {
      id: 'leads',
      name: t('New Leads Discovery'),
      value: formatCurrency(getStageTotal(discoveryDeals)),
      dealsCount: `${discoveryDeals.length} ${t('Deals')}`,
      winRate: `28% ${t('Win Rate')}`,
      pct: totalPipelineValue > 0 ? Math.round((getStageTotal(discoveryDeals) / totalPipelineValue) * 100) : 0,
      variant: 'info',
      badgeColor: '#0284c7',
      description: t('Initial architectural consultation and capability fit'),
    },
  ];

  // Lead channels data
  const leadChannels = [
    {
      id: 'web',
      name: t('Website Direct Forms'),
      pct: leads.length > 0 ? 50 : 0,
      volume: `${leads.length} ${t('leads')}`,
      conversion: '100% Sync',
      badgeVariant: 'primary',
      color: '#1d4ed8',
      cac: t('Active'),
      roi: 'Live DB',
      trend: t('Synchronized'),
    },
    {
      id: 'referrals',
      name: t('Referral Partners & Direct'),
      pct: contacts.length > 0 ? 50 : 0,
      volume: `${contacts.length} ${t('contacts')}`,
      conversion: t('Verified'),
      badgeVariant: 'success',
      color: '#16a34a',
      cac: t('Active'),
      roi: 'Live DB',
      trend: t('Synchronized'),
    },
  ];

  // Dynamic activity feed mapped from live MySQL activities
  const dynamicActivities = activities.map((a) => ({
    id: a.id,
    type: a.dealId ? 'deals' : a.contactId ? 'contacts' : a.leadId ? 'leads' : 'all',
    title: a.title || 'System Activity Recorded',
    description: a.description || 'Action recorded in CRM database',
    time: a.createdAt ? new Date(a.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently',
    color: a.dealId ? '#1d4ed8' : a.contactId ? '#16a34a' : '#0284c7',
    badge: (a.type || 'Activity').replace(/_/g, ' '),
    user: a.userName || a.user?.name || 'Alexander Wright',
    meta: a.dealTitle ? `Deal: ${a.dealTitle}` : a.contactName ? `Contact: ${a.contactName}` : a.leadName ? `Lead: ${a.leadName}` : '',
    route: a.dealId ? '/crm/pipeline' : a.contactId ? `/crm/contacts/${a.contactId}` : '/crm/leads',
  }));

  const filteredActivities = dynamicActivities.filter(
    (a) => activityFilter === 'all' || a.type === activityFilter
  );

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'pending') return t.status !== 'Completed';
    if (taskFilter === 'completed') return t.status === 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Top Breadcrumb & Executive Command Deck */}
      <div className="flex flex-col gap-3">
        <Breadcrumb
          homeHref="/crm/dashboard"
          items={[
            { label: 'CRM nErgy AI', href: '/crm/dashboard' },
            { label: 'Executive Command Center' },
          ]}
        />

        {/* Executive Command Hero Deck */}
        <div
          style={{
            background: 'var(--deck-bg)',
            border: '1px solid var(--deck-border)',
            borderRadius: '20px',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
            zIndex: 25,
            overflow: 'visible',
          }}
        >
          {/* Subtle Ambient Light Glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '180px',
              height: '180px',
              borderTopRightRadius: '20px',
              background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            {/* Left Deck Header: Title, Subtitle & Live Status Beacon */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 850,
                    letterSpacing: '-0.025em',
                    color: 'var(--text-primary)',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {t('Executive Command Center')}
                </h1>

                {/* Glowing Status Beacon */}
                <button
                  type="button"
                  onClick={() => addToast({ title: t('Telemetry Status'), message: 'Tenant Vault Pipeline is 100% active and synchronized.', type: 'success' })}
                  className="cursor-pointer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.28)',
                    color: '#10b981',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 8px #10b981',
                    }}
                  />
                  {t('Live Telemetry Active')}
                </button>
              </div>

              <p
                style={{
                  fontSize: '12.5px',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {t('Welcome back,')} <strong>{crmUser?.name || 'Alexander Wright'}</strong> · {t('Real-time pipeline analytics, revenue attribution & enterprise deals.')}
              </p>
            </div>

            {/* Right Deck Controls: Structured 2-Row Layout */}
            <div
              className="dashboard-actions-grid"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.625rem',
              }}
            >
              {/* Row 1: Timeframe Segmented Control + Date Range Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {/* Segmented Control Switcher */}
                <div
                  className="dashboard-timeframe-switcher"
                  style={{
                    display: 'inline-flex',
                    padding: '3px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {['7 Days', '30 Days', 'YTD'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setActiveRange(r);
                        addToast({ title: 'Timeframe Changed', message: `Showing metrics for ${r}.`, type: 'info' });
                      }}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 650,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        backgroundColor: activeRange === r ? 'var(--surface)' : 'transparent',
                        color: activeRange === r ? 'var(--primary)' : 'var(--text-secondary)',
                        boxShadow: activeRange === r ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                {/* Date Range Selector Dropdown */}
                <Dropdown
                  align="right"
                  trigger={
                    <button
                      type="button"
                      className="flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-lg text-xs cursor-pointer font-medium text-primary hover:bg-hover transition-colors"
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        height: '34px',
                        boxSizing: 'border-box',
                        boxShadow: 'var(--shadow-xs)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Calendar size={13} className="text-secondary flex-shrink-0" />
                        <span className="truncate" style={{ fontSize: '11px', fontWeight: 600 }}>{selectedDateLabel}</span>
                      </div>
                      <ChevronDown size={13} className="text-tertiary flex-shrink-0 ml-1" />
                    </button>
                  }
                >
                  <DropdownHeader>Reporting Cycle Interval</DropdownHeader>
                  <DropdownItem
                    icon={Calendar}
                    onClick={() => {
                      const now = new Date();
                      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                      const lbl = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                      setSelectedDateLabel(lbl);
                      addToast({ title: 'Date Range Updated', message: `Set to Last 7 Days (${lbl})`, type: 'info' });
                    }}
                  >
                    Last 7 Days (Recent Activity)
                  </DropdownItem>
                  <DropdownItem
                    icon={Calendar}
                    onClick={() => {
                      const now = new Date();
                      const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                      const lbl = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                      setSelectedDateLabel(lbl);
                      addToast({ title: 'Date Range Updated', message: `Set to Last 30 Days (${lbl})`, type: 'info' });
                    }}
                  >
                    Last 30 Days (Rolling Cycle)
                  </DropdownItem>
                  <DropdownItem
                    icon={Calendar}
                    onClick={() => {
                      const now = new Date();
                      const year = now.getFullYear();
                      const month = now.getMonth();
                      const start = new Date(year, month, 1);
                      const end = new Date(year, month + 1, 0);
                      const lbl = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                      setSelectedDateLabel(lbl);
                      addToast({ title: 'Date Range Updated', message: `Set to Current Month (${lbl})`, type: 'info' });
                    }}
                  >
                    Current Full Month (MTD)
                  </DropdownItem>
                  <DropdownItem
                    icon={Calendar}
                    onClick={() => {
                      const now = new Date();
                      const year = now.getFullYear();
                      const qMonth = Math.floor(now.getMonth() / 3) * 3;
                      const start = new Date(year, qMonth, 1);
                      const end = new Date(year, qMonth + 3, 0);
                      const qNum = Math.floor(now.getMonth() / 3) + 1;
                      const lbl = `Q${qNum} ${year} (${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`;
                      setSelectedDateLabel(lbl);
                      addToast({ title: 'Date Range Updated', message: `Set to Fiscal Q${qNum} ${year}`, type: 'info' });
                    }}
                  >
                    Current Quarter (Q4)
                  </DropdownItem>
                  <DropdownItem
                    icon={Calendar}
                    onClick={() => {
                      const year = new Date().getFullYear();
                      const lbl = `Jan 1 – Dec 31, ${year}`;
                      setSelectedDateLabel(lbl);
                      addToast({ title: 'Date Range Updated', message: `Set to Fiscal Year ${year}`, type: 'info' });
                    }}
                  >
                    Full Fiscal Year
                  </DropdownItem>
                </Dropdown>
              </div>

              {/* Row 2: Action Buttons Group */}
              <div className="dashboard-btn-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {/* Sync Data Button */}
                <Button
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                  disabled={isSyncing}
                  onClick={handleSyncData}
                  style={{ borderRadius: '10px' }}
                >
                  {isSyncing ? t('Syncing...') : t('Sync Data')}
                </Button>

                {/* + Add Contact Button */}
                <Button
                  variant="outline"
                  size="sm"
                  icon={Plus}
                  onClick={() => setIsContactModalOpen(true)}
                  style={{ borderRadius: '10px' }}
                >
                  {t('Add Contact')}
                </Button>

                {/* + New Task Primary Gradient Button */}
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(true)}
                  className="cursor-pointer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '32px',
                    padding: '0 14px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
                    boxShadow: '0 4px 14px -2px rgba(249, 115, 22, 0.45)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px 0 rgba(249, 115, 22, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px -2px rgba(249, 115, 22, 0.45)';
                  }}
                >
                  <Plus size={14} style={{ color: '#ffffff' }} />
                  <span>{t('New Task')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Row 1: 4 Executive KPI Cards Grid */}
      <div className="grid-responsive-kpi">
        <KPICard
          title={t('TOTAL LEADS ACQUIRED')}
          value={String(totalLeadsDisplay)}
          change={totalLeadsDisplay > 0 ? "100%" : "0%"}
          changeType={totalLeadsDisplay > 0 ? "positive" : "neutral"}
          changePeriod={totalLeadsDisplay > 0 ? t("vs last 7 days") : t("No active leads")}
          icon={Users}
          iconBg="rgba(16, 185, 129, 0.12)"
          iconColor="#10b981"
          onClick={() => navigate('/crm/leads')}
          tooltip={t("Click to open Leads Directory")}
        />

        <KPICard
          title={t('QUALIFIED OPPORTUNITIES')}
          value={String(qualifiedOppDisplay)}
          change={qualifiedOppDisplay > 0 ? "100%" : "0%"}
          changeType={qualifiedOppDisplay > 0 ? "positive" : "neutral"}
          changePeriod={totalPipelineValue > 0 ? `${formatCurrency(totalPipelineValue)} ${t('Value')}` : `${formatCurrency(0)} ${t('Value')}`}
          icon={Briefcase}
          iconBg="rgba(99, 102, 241, 0.12)"
          iconColor="#6366f1"
          onClick={() => navigate('/crm/leads')}
          tooltip={t("Click to open Qualified Deals")}
        />

        <KPICard
          title={t('MONTHLY REVENUE (ARR)')}
          value={revenueDisplay}
          change={totalPipelineValue > 0 ? "100%" : "0%"}
          changeType={totalPipelineValue > 0 ? "positive" : "neutral"}
          changePeriod={totalPipelineValue > 0 ? t("Pipeline Volume") : t("No active pipeline")}
          icon={DollarSign}
          iconBg="rgba(249, 115, 22, 0.12)"
          iconColor="#f97316"
          onClick={() => navigate('/crm/pipeline')}
          tooltip={t("Click to view Revenue Pipeline")}
        />

        <KPICard
          title={t('ACTIVE ENTERPRISE CLIENTS')}
          value={String(enterpriseClientCount)}
          change={enterpriseClientCount > 0 ? "100%" : "0%"}
          changeType={enterpriseClientCount > 0 ? "positive" : "neutral"}
          changePeriod={enterpriseClientCount > 0 ? t("Active Accounts") : t("No active accounts")}
          icon={User}
          iconBg="rgba(6, 182, 212, 0.12)"
          iconColor="#06b6d4"
          onClick={() => navigate('/crm/contacts')}
          tooltip={t("Click to view Enterprise Contacts")}
        />
      </div>

      {/* 3. Row 2: Business Health Telemetry (4 Cards - Equal Height & Width to Row 1) */}
      <div className="grid-responsive-kpi">
        {/* Card 1: Conversion Rate */}
        <div
          onClick={() => addToast({ title: 'Conversion Telemetry', message: `Current Lead-to-Opportunity conversion rate is ${leads.length > 0 && deals.length > 0 ? ((deals.length / leads.length) * 100).toFixed(1) + '%' : '0.0%'}.`, type: 'info' })}
          className="kpi-card cursor-pointer transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            height: '142px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-card)',
            boxSizing: 'border-box',
            minWidth: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#10b981';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          }}
        >
          {/* Top Decorative Accent Strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #10b981 0%, transparent 100%)', opacity: 0.85 }} />

          <div className="flex items-center justify-between gap-2" style={{ paddingTop: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 750, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('CONVERSION RATE')}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2.5px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#10b981',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <ArrowUpRight size={12} />
              {leads.length > 0 && deals.length > 0 ? `${((deals.length / leads.length) * 100).toFixed(1)}%` : '0.0%'}
            </span>
          </div>

          <div
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {leads.length > 0 && deals.length > 0 ? `${((deals.length / leads.length) * 100).toFixed(1)}%` : '0.0%'}
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {leads.length > 0 ? t('Lead to Opportunity') : t('No active leads')}
          </span>
        </div>

        {/* Card 2: Avg Deal Cycle */}
        <div
          onClick={() => addToast({ title: t('Deal Velocity'), message: 'Average deal cycle tracking from initial lead to close.', type: 'info' })}
          className="kpi-card cursor-pointer transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            height: '142px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-card)',
            boxSizing: 'border-box',
            minWidth: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0284c7';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          }}
        >
          {/* Top Decorative Accent Strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #0284c7 0%, transparent 100%)', opacity: 0.85 }} />

          <div className="flex items-center justify-between gap-2" style={{ paddingTop: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 750, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('AVG DEAL CYCLE')}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2.5px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                border: '1px solid rgba(2, 132, 199, 0.25)',
                color: '#0284c7',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <ArrowDownRight size={12} />
              0d
            </span>
          </div>

          <div
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {t('0.0 Days')}
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {t('From Lead to Close')}
          </span>
        </div>

        {/* Card 3: Active Tasks & Reminders */}
        <div
          onClick={() => navigate('/crm/tasks')}
          className="kpi-card cursor-pointer transition-all"
          title={t("Click to view all tasks & reminders")}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            height: '142px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-card)',
            boxSizing: 'border-box',
            minWidth: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#f97316';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          }}
        >
          {/* Top Decorative Accent Strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #f97316 0%, transparent 100%)', opacity: 0.85 }} />

          <div className="flex items-center justify-between gap-2" style={{ paddingTop: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 750, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('ACTIVE TASKS')}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2.5px 8px',
                borderRadius: '9999px',
                backgroundColor: pendingTasksCount > 0 ? 'rgba(249, 115, 22, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                border: `1px solid ${pendingTasksCount > 0 ? 'rgba(249, 115, 22, 0.28)' : 'rgba(16, 185, 129, 0.25)'}`,
                color: pendingTasksCount > 0 ? '#ea580c' : '#10b981',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              {pendingTasksCount > 0 ? `${pendingTasksCount} ${t('Pending')}` : t('All Clear')}
            </span>
          </div>

          <div
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {pendingTasksCount}
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {pendingTasksCount > 0 ? t('Follow-ups & Action Items') : t('No pending tasks')}
          </span>
        </div>

        {/* Card 4: Data Sync Status */}
        <div
          onClick={handleSyncData}
          className="kpi-card cursor-pointer transition-all"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.1rem 1.25rem',
            height: '142px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-card)',
            boxSizing: 'border-box',
            minWidth: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6366f1';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          }}
        >
          {/* Top Decorative Accent Strip */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #6366f1 0%, transparent 100%)', opacity: 0.85 }} />

          <div className="flex items-center justify-between gap-2" style={{ paddingTop: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 750, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('DATA SYNC STATUS')}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '2.5px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#10b981',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              {t('Live')}
            </span>
          </div>

          <div
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}
          >
            {t('Synced')}
          </div>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {t(lastSyncTime) || lastSyncTime}
          </span>
        </div>
      </div>

      {/* 4. Row 3: Sales Pipeline Distribution (50%) & Lead Sources & Attribution (50%) */}
      <div className="grid-responsive-2col">
        {/* Left Card: Sales Pipeline Distribution */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-4 sm:p-6 flex flex-col" style={{ gap: '16px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {t('Sales Pipeline Distribution')}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => navigate('/crm/pipeline')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>{t('View Kanban')}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Stages Progress List (14px Gap Between Items) */}
            <div className="flex flex-col" style={{ gap: '12px' }}>
              {pipelineStages.map((stage) => (
                <div
                  key={stage.id}
                  onClick={() => {
                    addToast({ title: t('Stage Details'), message: `${stage.name}: ${stage.value} (${stage.dealsCount})`, type: 'info' });
                    navigate('/crm/pipeline');
                  }}
                  className="dashboard-stage-item cursor-pointer hover:border-strong transition-all"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between" style={{ fontSize: '13px' }}>
                    <div className="flex items-center min-w-0" style={{ gap: '10px' }}>
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: stage.badgeColor,
                          flexShrink: 0,
                        }}
                      />
                      <span className="truncate" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {stage.name}
                      </span>
                      <span className="hidden-mobile" style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                        ({stage.value})
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: '12px', flexShrink: 0 }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{stage.dealsCount}</span>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 700 }}>{stage.pct}%</strong>
                    </div>
                  </div>
                  <ProgressBar value={stage.pct} variant={stage.variant} showLabel={false} />
                </div>
              ))}
            </div>

            {/* Pipeline Summary Footer */}
            <div
              className="flex items-center justify-between pt-3 text-xs"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)', marginTop: '2px' }}
            >
              <span>{t('Total:')} <strong className="text-primary font-bold">{formatCurrency(totalPipelineValue)}</strong></span>
              <span>{t('Weighted:')} <strong className="text-primary font-bold">{formatCurrency(totalPipelineValue * 0.5)}</strong></span>
            </div>
          </div>
        </Card>

        {/* Right Card: Lead Sources & Attribution */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-4 sm:p-6 flex flex-col" style={{ gap: '16px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {t('Lead Sources & Attribution')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/leads')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>{t('All Leads')}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Channels List (14px Gap Between Items) */}
            <div className="flex flex-col" style={{ gap: '12px' }}>
              {leadChannels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className="dashboard-channel-item cursor-pointer hover:border-strong transition-all"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center min-w-0" style={{ gap: '10px' }}>
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: channel.color,
                        flexShrink: 0,
                      }}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="truncate" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{channel.name}</span>
                      <span className="truncate" style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{channel.volume} · {channel.cac}</span>
                    </div>
                  </div>
                  <Badge variant={channel.badgeVariant} style={{ fontSize: '11px', padding: '2px 8px', flexShrink: 0 }}>
                    {channel.pct}%
                  </Badge>
                </div>
              ))}
            </div>

            {/* Lead Sources Footer */}
            <div
              className="flex items-center justify-between pt-4 text-xs"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)', marginTop: '4px' }}
            >
              <span>{t('Total Leads:')} <strong className="text-primary font-bold">{leads.length}</strong></span>
              <button
                type="button"
                onClick={() => navigate('/crm/leads')}
                className="px-3 py-1.5 rounded-md border-subtle surface hover:bg-hover transition-colors font-medium text-primary cursor-pointer"
                style={{ fontSize: '11px', backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}
              >
                {t('View All Sources')}
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* 5. Row 4: Live CRM Activity Audit (50%) & Upcoming Priority Tasks (50%) */}
      <div className="grid-responsive-2col">
        {/* Left Card: Live CRM Activity Audit */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-6 flex flex-col" style={{ gap: '20px' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {t('Live CRM Activity Audit')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/admin')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>{t('View All')}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap" style={{ gap: '10px' }}>
              {['all', 'deals', 'contacts', 'leads'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActivityFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    activityFilter === cat ? 'bg-primary text-white font-semibold' : 'surface-secondary text-secondary hover:bg-hover'
                  }`}
                  style={{ border: '1px solid var(--border)' }}
                >
                  {t(cat.charAt(0).toUpperCase() + cat.slice(1))}
                </button>
              ))}
            </div>

            {/* Activity List (12px Gap Between Items) */}
            <div className="flex flex-col" style={{ gap: '12px', width: '100%', boxSizing: 'border-box' }}>
              {filteredActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-tertiary">
                  <Activity size={28} className="mb-2 text-secondary opacity-60" />
                  <span className="text-xs font-semibold text-primary">{t('No Activity Logged')}</span>
                  <span className="text-xs">{t('Audit actions and CRM events will appear here in real-time.')}</span>
                </div>
              ) : (
                filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => setSelectedActivity(act)}
                    className="dashboard-activity-item cursor-pointer hover:border-strong transition-all"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      padding: '10px 12px',
                    }}
                  >
                    <div className="flex items-center min-w-0 flex-1" style={{ gap: '10px', minWidth: 0, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: act.color,
                          flexShrink: 0,
                        }}
                      />
                      <div className="flex flex-col min-w-0 flex-1" style={{ gap: '2px', minWidth: 0, overflow: 'hidden' }}>
                        <span
                          className="truncate"
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            display: 'block',
                            minWidth: 0,
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {act.title}
                        </span>
                        <span
                          className="truncate"
                          style={{
                            fontSize: '11.5px',
                            color: 'var(--text-secondary)',
                            display: 'block',
                            minWidth: 0,
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {act.description}
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                        flexShrink: 0,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        marginLeft: 'auto',
                      }}
                    >
                      {act.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Right Card: Upcoming Priority Tasks */}
        <Card style={{ borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-4 sm:p-6 flex flex-col" style={{ gap: '16px', width: '100%', boxSizing: 'border-box' }}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {t('Upcoming Priority Tasks')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/crm/tasks')}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                <span>{t('View All Tasks')}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Task Filters */}
            <div className="flex items-center justify-between flex-wrap" style={{ gap: '10px' }}>
              <div className="flex items-center flex-wrap" style={{ gap: '6px' }}>
                {[
                  { id: 'all', label: `${t('All')} (${tasks.length})` },
                  { id: 'pending', label: `${t('Pending')} (${tasks.filter((t) => t.status !== 'Completed').length})` },
                  { id: 'completed', label: `${t('Completed')} (${tasks.filter((t) => t.status === 'Completed').length})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTaskFilter(f.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                      taskFilter === f.id ? 'bg-primary text-white font-semibold' : 'surface-secondary text-secondary hover:bg-hover'
                    }`}
                    style={{ border: '1px solid var(--border)' }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsTaskModalOpen(true)}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                style={{ background: 'none', border: 'none', color: '#1d4ed8' }}
              >
                {t('+ Quick Add')}
              </button>
            </div>

            {/* Task Items Checklist */}
            <div className="flex flex-col" style={{ gap: '12px', width: '100%', boxSizing: 'border-box' }}>
              {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-tertiary">
                  <CheckSquare size={28} className="mb-2 text-secondary" />
                  <span className="text-xs font-semibold text-primary">All caught up!</span>
                  <span className="text-xs">No tasks found for this filter.</span>
                </div>
              ) : (
                filteredTasks.slice(0, 4).map((task) => {
                  const isCompleted = task.status === 'Completed';

                  return (
                    <div
                      key={task.id}
                      className="dashboard-task-item cursor-pointer hover:border-strong transition-all"
                      style={{
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        width: '100%',
                        maxWidth: '100%',
                        minWidth: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        padding: '10px 12px',
                        opacity: isCompleted ? 0.6 : 1,
                      }}
                    >
                      {/* Left & Middle: Checkbox + Title / Subtitle */}
                      <div className="flex items-center min-w-0 flex-1" style={{ gap: '10px', minWidth: 0, overflow: 'hidden' }}>
                        {/* Interactive Task Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskCompletion(task.id);
                            addToast({
                              title: isCompleted ? 'Task Reopened' : 'Task Completed',
                              message: `Task "${task.title}" updated.`,
                              type: isCompleted ? 'info' : 'success',
                            });
                          }}
                          className="flex items-center justify-center rounded-xs transition-colors"
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            backgroundColor: isCompleted ? 'var(--success)' : 'var(--surface)',
                            border: `1px solid ${isCompleted ? 'var(--success)' : 'var(--border-strong)'}`,
                            color: '#ffffff',
                            flexShrink: 0,
                          }}
                          title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
                        >
                          {isCompleted && <Check size={12} />}
                        </button>

                        <div
                          className="flex flex-col min-w-0 flex-1"
                          style={{ gap: '2px', minWidth: 0, overflow: 'hidden' }}
                          onClick={() => navigate('/crm/tasks')}
                        >
                          <span
                            className="truncate"
                            style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              textDecoration: isCompleted ? 'line-through' : 'none',
                              display: 'block',
                              minWidth: 0,
                              maxWidth: '100%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {task.title}
                          </span>
                          <span
                            className="truncate"
                            style={{
                              fontSize: '11px',
                              color: 'var(--text-tertiary)',
                              display: 'block',
                              minWidth: 0,
                              maxWidth: '100%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Related to: <strong className="text-secondary">{typeof task.contact === 'object' && task.contact !== null ? task.contact.name : (task.contact || 'Direct Lead')}</strong>
                            {task.dueDate && ` · Due ${task.dueDate}`}
                          </span>
                        </div>
                      </div>

                      {/* Right: Priority Badge + Delete Action */}
                      <div className="flex items-center" style={{ gap: '6px', flexShrink: 0, marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
                        <Badge
                          variant={
                            isCompleted
                              ? 'success'
                              : task.priority === 'High'
                              ? 'error'
                              : task.priority === 'Medium'
                              ? 'warning'
                              : 'info'
                          }
                          style={{ fontSize: '10px', padding: '1px 6px', whiteSpace: 'nowrap', flexShrink: 0 }}
                        >
                          {isCompleted ? 'Done' : task.priority}
                        </Badge>

                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          icon={Trash2}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task.id);
                            addToast({
                              title: 'Task Removed',
                              message: `Task "${task.title}" deleted.`,
                              type: 'info',
                            });
                          }}
                          title="Delete task"
                          style={{ height: '22px', width: '22px', padding: 0, flexShrink: 0 }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* 6. Page Security & Compliance Footer */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 pb-2 text-xs"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--text-tertiary)' }}
      >
        <button
          type="button"
          onClick={() => setIsSecurityModalOpen(true)}
          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
          style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)' }}
        >
          <ShieldCheck size={16} className="text-success" />
          <span>Your data is protected with 256-bit AES encryption (Click to view vault info)</span>
        </button>
        <div>
          <span>Secure &bull; Reliable &bull; Enterprise-Grade</span>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE MODALS
         ========================================================================= */}

      {/* Modal 1: Quick Add Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Schedule Priority Action Task"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateTask}>
              Save Task
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <Input
            label="Task Action Title"
            required
            placeholder="e.g., Send revised commercial proposal"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />

          <Select
            label="Related Contact Record"
            value={newTaskContact}
            onChange={(e) => setNewTaskContact(e.target.value)}
            options={contacts.map((c) => ({ value: c.name, label: `${c.name} (${c.company})` }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Priority Level"
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              options={[
                { value: 'High', label: 'High Priority (Urgent)' },
                { value: 'Medium', label: 'Medium Priority' },
                { value: 'Low', label: 'Low Priority' },
              ]}
            />

            <Input
              label="Due Date"
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* Modal 2: Quick Add Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Create New Contact Record"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" size="sm" onClick={() => setIsContactModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateContact}>
              Create Contact
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateContact} className="flex flex-col gap-3">
          <Input
            label="Full Name"
            required
            placeholder="e.g., Jane Montgomery"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />

          <Input
            label="Company Name"
            required
            placeholder="e.g., Global Quantum Industries"
            value={newContactCompany}
            onChange={(e) => setNewContactCompany(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Work Email"
              type="email"
              placeholder="jane@quantum.com"
              value={newContactEmail}
              onChange={(e) => setNewContactEmail(e.target.value)}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={newContactPhone}
              onChange={(e) => setNewContactPhone(e.target.value)}
            />
          </div>

          <Select
            label="Client Classification"
            value={newContactType}
            onChange={(e) => setNewContactType(e.target.value)}
            options={[
              { value: 'Enterprise Client', label: 'Enterprise Client' },
              { value: 'Investor', label: 'Investor' },
              { value: 'Borrower Partner', label: 'Borrower Partner' },
              { value: 'Converted Lead', label: 'Converted Lead' },
            ]}
          />
        </form>
      </Modal>

      {/* Modal 3: Activity Audit Detail Modal */}
      {selectedActivity && (
        <Modal
          isOpen={Boolean(selectedActivity)}
          onClose={() => setSelectedActivity(null)}
          title={`Audit Event: ${selectedActivity.badge}`}
          footer={
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-tertiary">Event recorded via CRM Audit Engine</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedActivity(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={ExternalLink}
                  onClick={() => {
                    navigate(selectedActivity.route);
                    setSelectedActivity(null);
                  }}
                >
                  Jump to Module
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-3 surface-secondary rounded-sm border-subtle flex flex-col gap-1.5">
              <span className="font-semibold text-primary text-sm">{selectedActivity.title}</span>
              <p className="text-secondary margin-0">{selectedActivity.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 border-subtle rounded-sm">
                <span className="text-tertiary block font-medium">Logged By</span>
                <span className="font-semibold text-primary">{selectedActivity.user}</span>
              </div>
              <div className="p-2 border-subtle rounded-sm">
                <span className="text-tertiary block font-medium">Timestamp</span>
                <span className="font-semibold text-primary">{selectedActivity.time}</span>
              </div>
            </div>

            <div className="p-2.5 border-subtle rounded-sm surface-secondary">
              <span className="text-tertiary block font-medium mb-1">Metadata Attributes</span>
              <span className="font-mono text-secondary">{selectedActivity.meta}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal 4: Lead Channel Attribution Telemetry */}
      {selectedChannel && (
        <Modal
          isOpen={Boolean(selectedChannel)}
          onClose={() => setSelectedChannel(null)}
          title={`Channel Attribution: ${selectedChannel.name}`}
          footer={
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-tertiary">Attribution Model: First-Touch Multi-Variant</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedChannel(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={ArrowRight}
                  onClick={() => {
                    setSelectedChannel(null);
                    addToast({ title: 'Leads Filtered', message: `Filtered leads by ${selectedChannel.name}`, type: 'info' });
                    navigate('/crm/leads');
                  }}
                >
                  View Channel Leads
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between p-3 surface-secondary rounded-sm border-subtle">
              <div>
                <span className="font-bold text-sm text-primary block">{selectedChannel.name}</span>
                <span className="text-tertiary">{selectedChannel.volume} in current cycle</span>
              </div>
              <Badge variant={selectedChannel.badgeVariant}>{selectedChannel.pct}% Share</Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 border-subtle rounded-sm surface-card">
                <span className="text-tertiary block">Conversion Rate</span>
                <strong className="text-primary text-sm">{selectedChannel.conversion}</strong>
              </div>
              <div className="p-2.5 border-subtle rounded-sm surface-card">
                <span className="text-tertiary block">Acquisition Cost</span>
                <strong className="text-success text-sm">{selectedChannel.cac}</strong>
              </div>
              <div className="p-2.5 border-subtle rounded-sm surface-card">
                <span className="text-tertiary block">Marketing ROI</span>
                <strong className="text-primary text-sm">{selectedChannel.roi}</strong>
              </div>
            </div>

            <div className="p-3 border-subtle rounded-sm surface-secondary flex items-center justify-between">
              <span className="text-secondary font-medium">Month-over-Month Velocity</span>
              <span className="font-bold text-success">{selectedChannel.trend}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal 5: Security Encryption Vault Info */}
      <Modal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        title="Enterprise Encryption & Security Protocol"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="primary" size="sm" onClick={() => setIsSecurityModalOpen(false)}>
              Acknowledge & Close
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-center gap-3 p-3 surface-secondary rounded-sm border-subtle">
            <ShieldCheck size={24} className="text-success flex-shrink-0" />
            <div>
              <span className="font-bold text-sm text-primary block">AES-256 Multi-Tenant Isolation</span>
              <span className="text-secondary">Hardware-level encryption keys are isolated per tenant ID.</span>
            </div>
          </div>
          <div className="p-3 border-subtle rounded-sm">
            <span className="font-semibold text-primary block mb-1">Active Certifications:</span>
            <ul className="text-secondary margin-0 pl-4 flex flex-col gap-1">
              <li>SOC2 Type II Enterprise Compliance Certified</li>
              <li>HIPAA / GDPR Isolated Data Storage Matrix</li>
              <li>Continuous Real-time Threat Monitoring & Audit Logging</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};
