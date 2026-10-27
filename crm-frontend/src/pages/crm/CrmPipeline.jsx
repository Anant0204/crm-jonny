import React, { useState, useEffect } from 'react';
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Briefcase,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Target,
  CheckCircle2,
  Kanban,
  Filter,
  Layers,
  Building2,
  ExternalLink
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  Modal,
  Input,
  Select,
  KPICard
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useErp } from '../../context/ErpContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const pipelineColumns = [
  'New Lead',
  'Contacted',
  'Qualified',
  'Opportunity',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];

export const CrmPipeline = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { deals, addDeal, moveDealStage, refreshDeals } = useCrm();
  const { projects: erpProjects, createFromDeal } = useErp();
  const { addToast } = useToast();
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    if (refreshDeals) {
      refreshDeals();
    }
  }, [refreshDeals]);

  const [selectedMobileStage, setSelectedMobileStage] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    value: '$300,000',
    stage: 'Opportunity',
    owner: 'Alexander Wright',
  });

  // ERP Handoff Modal State
  const [isErpHandoffOpen, setIsErpHandoffOpen] = useState(false);
  const [dealForErp, setDealForErp] = useState(null);
  const [isCreatingErp, setIsCreatingErp] = useState(false);

  // Calculate Pipeline Metrics
  const totalPipelineValue = deals.reduce((sum, d) => {
    const valNum = parseInt(String(d.value || 0).replace(/[^0-9]/g, '')) || 0;
    return sum + valNum;
  }, 0);

  const weightedPipelineValue = deals.reduce((sum, d) => {
    const valNum = parseInt(String(d.value || 0).replace(/[^0-9]/g, '')) || 0;
    const prob = parseInt(String(d.probability || 50).replace(/[^0-9]/g, '')) || 50;
    return sum + Math.round(valNum * (prob / 100));
  }, 0);

  const totalDealsCount = deals.length;
  const wonDealsCount = deals.filter((d) => d.stage === 'Won').length;
  const winRate = totalDealsCount > 0 ? Math.round((wonDealsCount / totalDealsCount) * 100) : 0;

  const handleCreateDeal = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.customer) {
      addToast({ title: 'Validation Error', message: 'Deal title and customer name required.', type: 'error' });
      return;
    }
    await addDeal(formData);
    addToast({ title: 'Opportunity Created', message: `Added ${formData.title} to ${formData.stage}.`, type: 'success' });
    setIsAddModalOpen(false);
    setFormData({ title: '', customer: '', value: '$300,000', stage: 'Opportunity', owner: 'Alexander Wright' });
  };

  const handleMoveStage = (dealId, currentStage, direction) => {
    const currentIndex = pipelineColumns.indexOf(currentStage);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < pipelineColumns.length) {
      const newStage = pipelineColumns[newIndex];
      moveDealStage(dealId, newStage);
      addToast({ title: 'Deal Moved', message: `Moved deal to ${newStage}`, type: 'info' });

      // If moving to WON, prompt for ERP handoff
      if (newStage === 'Won') {
        const targetDeal = deals.find((d) => d.id === dealId);
        if (targetDeal) {
          setDealForErp(targetDeal);
          setIsErpHandoffOpen(true);
        }
      }
    }
  };

  const handleConfirmErpHandoff = async () => {
    if (!dealForErp) return;
    setIsCreatingErp(true);
    try {
      const result = await createFromDeal(dealForErp.id);
      addToast({
        title: 'ERP Project & Sales Order Generated',
        message: result.message || `Successfully created ERP Project for ${dealForErp.title}`,
        type: 'success',
      });
      setIsErpHandoffOpen(false);
      setDealForErp(null);
    } catch (err) {
      addToast({
        title: 'ERP Handoff Failed',
        message: err.message || 'Could not create ERP records.',
        type: 'error',
      });
    } finally {
      setIsCreatingErp(false);
    }
  };

  const kanbanScrollRef = React.useRef(null);
  const columnRefs = React.useRef({});

  const handleSelectStage = (stage) => {
    setSelectedMobileStage(stage);
    if (stage === 'All') {
      if (kanbanScrollRef.current) {
        kanbanScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    } else if (columnRefs.current[stage]) {
      columnRefs.current[stage].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('Sales Pipeline') }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>{t('Commercial Sales Pipeline')}</h1>
        </div>

        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            className="w-full md:w-auto justify-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            {t('+ Add New Opportunity')}
          </Button>
        </div>
      </div>

      {/* 2. Pipeline Summary Metrics Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title={t('TOTAL PIPELINE VALUE')}
          value={`$${(totalPipelineValue / 1000000).toFixed(2)}M`}
          change="18.4%"
          changeType="positive"
          changePeriod={t('across 8 stages')}
          icon={TrendingUp}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
        />
        <KPICard
          title={t('WEIGHTED VALUE')}
          value={`$${(weightedPipelineValue / 1000000).toFixed(2)}M`}
          change="52% Avg"
          changeType="neutral"
          changePeriod={t('prob. adj.')}
          icon={DollarSign}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
        />
        <KPICard
          title={t('TOTAL ACTIVE DEALS')}
          value={`${totalDealsCount}`}
          change={`3 ${t('Deals')}`}
          changeType="positive"
          changePeriod={t('this month')}
          icon={Kanban}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
        />
        <KPICard
          title={t('WIN CONVERSION')}
          value={`${winRate}%`}
          change="4.2%"
          changeType="positive"
          changePeriod={t('closed deals')}
          icon={CheckCircle2}
          iconBg="rgba(234, 88, 12, 0.1)"
          iconColor="#ea580c"
        />
      </div>

      {/* 3. Mobile/Tablet Stage Quick Jump Selector */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-1 visible-mobile"
        style={{ width: '100%', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}
      >
        <span className="text-xs font-bold text-secondary flex items-center gap-1 flex-shrink-0">
          <Filter size={14} /> {t('Stage:')}
        </span>
        {['All', ...pipelineColumns].map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={() => handleSelectStage(stage)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid var(--border)',
              backgroundColor: selectedMobileStage === stage ? 'var(--primary)' : 'var(--surface)',
              color: selectedMobileStage === stage ? '#ffffff' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
          >
            {stage === 'All' ? t('All') : t(stage)}
          </button>
        ))}
      </div>

      {/* 4. 8-Column Responsive Kanban Board Grid with Full Horizontal Scroll & Swipe */}
      <div
        ref={kanbanScrollRef}
        className="kanban-board-scroll"
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: '1.25rem',
          minHeight: '540px',
          width: '100%',
          maxWidth: '100%',
          WebkitOverflowScrolling: 'touch',
          boxSizing: 'border-box',
          scrollBehavior: 'smooth',
          touchAction: 'pan-x',
        }}
      >
        {pipelineColumns.map((col) => {
          const colDeals = deals.filter((d) => d.stage === col);
          const totalColValue = colDeals.reduce((sum, d) => {
            const valNum = d.rawValue !== undefined ? d.rawValue : (parseInt(String(d.value).replace(/[^0-9]/g, '')) || 0);
            return sum + valNum;
          }, 0);

          return (
            <div
              key={col}
              ref={(el) => { columnRefs.current[col] = el; }}
              className="kanban-column"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '16px',
                border: selectedMobileStage === col ? '2px solid var(--primary)' : '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: 'var(--shadow-sm)',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary">{t(col)}</span>
                  <Badge variant={col === 'Won' ? 'success' : col === 'Lost' ? 'error' : 'primary'}>
                    {colDeals.length}
                  </Badge>
                </div>
                <div className="text-xs font-bold text-success">
                  {formatCurrency(totalColValue)}
                </div>
              </div>

              {/* Column Cards Container */}
              <div className="p-2.5 flex flex-col gap-2.5 overflow-y-auto flex-1">
                {colDeals.length === 0 ? (
                  <div
                    className="text-center p-4 text-xs text-tertiary rounded-md"
                    style={{ border: '1px dashed var(--border)', backgroundColor: 'var(--surface)' }}
                  >
                    {t('No deals in')} {t(col)}
                  </div>
                ) : (
                  colDeals.map((deal) => (
                    <div
                      key={deal.id}
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '14px',
                        padding: '0.9rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        boxShadow: 'var(--shadow-card)',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-border)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                      }}
                    >
                      {/* Top ID & Probability */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-tertiary" style={{ fontSize: '11px' }} title={`Database ID: ${deal.id}`}>
                          {deal.displayId || (deal.id ? `DEL-${String(deals.indexOf(deal) + 1).padStart(3, '0')}` : '-')}
                        </span>
                        <Badge variant="default" style={{ fontSize: '10px' }}>{deal.probability || '50%'} {t('Prob')}</Badge>
                      </div>

                      {/* Deal Title */}
                      <div className="font-bold text-xs text-primary" style={{ fontSize: '13px', lineHeight: 1.3 }}>
                        {deal.title}
                      </div>

                      {/* Customer & Value */}
                      <div className="flex items-center justify-between text-xs pt-0.5">
                        <span className="text-secondary truncate max-w-[150px]" style={{ fontSize: '11px' }}>{deal.customer}</span>
                        <span className="font-bold text-success">{deal.value}</span>
                      </div>

                      {/* Owner Info */}
                      <div className="text-tertiary" style={{ fontSize: '11px' }}>
                        {t('Owner:')} <strong className="text-secondary">{deal.owner}</strong>
                      </div>

                      {/* ERP Handoff Action on Won Deals */}
                      {(col === 'Won' || deal.stage === 'Won') && (
                        <div
                          className="pt-2 flex items-center justify-between"
                          style={{ borderTop: '1px solid var(--border)', marginTop: '2px' }}
                        >
                          {erpProjects.some((p) => p.dealId === deal.id) ? (
                            <div className="flex items-center justify-between w-full">
                              <span className="text-tertiary" style={{ fontSize: '11px' }}>{t('ERP Operations:')}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={ExternalLink}
                                onClick={() => navigate('/crm/erp/projects')}
                                style={{ color: 'var(--success)', fontSize: '11px', padding: '2px 6px' }}
                              >
                                {t('Project Active')}
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="primary"
                              size="sm"
                              icon={Layers}
                              className="w-full justify-center"
                              style={{ fontSize: '11px', height: '28px' }}
                              onClick={() => {
                                setDealForErp(deal);
                                setIsErpHandoffOpen(true);
                              }}
                            >
                              {t('Create ERP Project')}
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Clean Move Stage Action Bar */}
                      <div
                        className="flex items-center justify-between pt-2 text-xs"
                        style={{ borderTop: '1px solid var(--border)', marginTop: '2px' }}
                      >
                        <button
                          type="button"
                          disabled={pipelineColumns.indexOf(col) === 0}
                          onClick={() => handleMoveStage(deal.id, col, 'prev')}
                          className="flex items-center gap-1 text-tertiary hover:text-primary disabled:opacity-30 cursor-pointer font-medium"
                          style={{ background: 'none', border: 'none', padding: 0, fontSize: '11px' }}
                          title="Move to Previous Stage"
                        >
                          <ArrowLeft size={12} /> {t('Prev')}
                        </button>
                        <span className="text-tertiary font-semibold" style={{ fontSize: '10px' }}>{t('Move Stage')}</span>
                        <button
                          type="button"
                          disabled={pipelineColumns.indexOf(col) === pipelineColumns.length - 1}
                          onClick={() => handleMoveStage(deal.id, col, 'next')}
                          className="flex items-center gap-1 text-primary hover:text-primary disabled:opacity-30 cursor-pointer font-semibold"
                          style={{ background: 'none', border: 'none', padding: 0, fontSize: '11px' }}
                          title="Move to Next Stage"
                        >
                          {t('Next')} <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ERP Handoff Confirmation Modal */}
      <Modal
        isOpen={isErpHandoffOpen}
        onClose={() => { if (!isCreatingErp) setIsErpHandoffOpen(false); }}
        title={t("Create ERP Project & Sales Order")}
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              disabled={isCreatingErp}
              onClick={() => setIsErpHandoffOpen(false)}
            >
              {t("Skip for Now")}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              loading={isCreatingErp}
              onClick={handleConfirmErpHandoff}
            >
              {t("Generate ERP Project & Order")}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <p className="text-secondary margin-0">
            This deal has been marked <strong>Closed Won</strong>. Initiating ERP operations generates the delivery project and sales fulfillment order in MySQL with strict tenant isolation:
          </p>

          <div
            className="p-3.5 rounded-lg border flex flex-col gap-2"
            style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-tertiary">{t('Opportunity:')}</span>
              <strong className="text-primary">{dealForErp?.title}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-tertiary">{t('Client Account:')}</span>
              <strong className="text-primary">{dealForErp?.customer}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-tertiary">{t('Contract Value / Budget:')}</span>
              <strong className="text-success">{dealForErp?.value}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-tertiary">{t('Assigned Delivery Manager:')}</span>
              <strong className="text-primary">{dealForErp?.owner || 'Alexander Wright'}</strong>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30 text-secondary">
            <div className="font-semibold text-primary flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary" /> {t('Automated ERP Delivery Workflow:')}
            </div>
            <ul className="margin-0 pl-4 space-y-1">
              <li>Creates <strong>ERP Project</strong> in directory with allocated budget and milestone roadmap.</li>
              <li>Generates matching <strong>Sales Order</strong> for logistics and inventory tracking.</li>
              <li>Links back directly to CRM Contact 360 profile and Deal history.</li>
              <li>Logs permanent handover timestamp to audit stream.</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Add Opportunity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t("Add New Opportunity")}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateDeal}>
              {t("Create Opportunity")}
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label={t("Opportunity Title")}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder={t("e.g. Enterprise Fleet Expansion")}
            required
          />
          <Input
            label={t("Customer / Account")}
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            placeholder={t("e.g. Apex Global Technologies")}
            required
          />
          <Input
            label={t("Estimated Deal Value ($)")}
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
          <Select
            label={t("Target Stage")}
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            options={pipelineColumns.map((c) => ({ label: t(c), value: c }))}
          />
        </form>
      </Modal>
    </div>
  );
};
