import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, MessageSquare, BookOpen, CheckCircle2, Plus, ArrowRight } from 'lucide-react';
import { Breadcrumb, Button, KPICard, Card, Badge } from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';
import { useLanguage } from '../../../context/LanguageContext';

export const SupportDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { tickets, kbArticles, fetchSupportData } = useSupport();

  useEffect(() => {
    if (fetchSupportData) {
      fetchSupportData();
    }
  }, [fetchSupportData]);

  const openCount = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  const subModules = [
    {
      id: 'tickets',
      label: 'Support Tickets',
      path: '/crm/support/tickets',
      icon: LifeBuoy,
      iconBg: 'rgba(37, 99, 235, 0.1)',
      iconColor: '#2563eb',
      badge: `${openCount} Active`,
      subtitle: 'Inbound Queue & SLA Tracking',
    },
    {
      id: 'chat',
      label: 'Live Support Chat',
      path: '/crm/support/chat',
      icon: MessageSquare,
      iconBg: 'rgba(22, 163, 74, 0.1)',
      iconColor: '#16a34a',
      badge: 'Live Gateway',
      subtitle: 'Direct Customer Messaging',
    },
    {
      id: 'kb',
      label: 'Knowledge Base',
      path: '/crm/support/kb',
      icon: BookOpen,
      iconBg: 'rgba(147, 51, 234, 0.1)',
      iconColor: '#9333ea',
      badge: `${kbArticles.length} Articles`,
      subtitle: 'Help Guides & FAQs',
    },
    {
      id: 'reports',
      label: 'Support Analytics',
      path: '/crm/support/reports',
      icon: CheckCircle2,
      iconBg: 'rgba(234, 88, 12, 0.1)',
      iconColor: '#ea580c',
      badge: '94.2% CSAT',
      subtitle: 'SLA & Resolution Metrics',
    },
  ];

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('Customer Support') }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
            {t('Customer Support Desk')}
          </h1>
        </div>
        <div className="header-actions-right">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => navigate('/crm/support/tickets')}
            style={{ borderRadius: '8px', padding: '0.6rem 1.25rem' }}
          >
            {t('Create Ticket')}
          </Button>
        </div>
      </div>

      {/* 2. KPI Cards Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title={t('ACTIVE TICKETS')}
          value={openCount}
          change="SLA 99.4%"
          changePeriod={t('vs last 7 days')}
          changeType="positive"
          icon={LifeBuoy}
          onClick={() => navigate('/crm/support/tickets')}
        />
        <KPICard
          title={t('RESOLVED')}
          value={resolvedCount}
          change="Avg 4.2h"
          changePeriod={t('vs last 7 days')}
          changeType="positive"
          icon={CheckCircle2}
          onClick={() => navigate('/crm/support/tickets')}
        />
        <KPICard
          title={t('SUPPORT CHAT')}
          value={t('Gateway')}
          change={t('Live 24/7')}
          changePeriod={t('vs last 7 days')}
          changeType="neutral"
          icon={MessageSquare}
          onClick={() => navigate('/crm/support/chat')}
        />
        <KPICard
          title={t('KNOWLEDGE BASE')}
          value={`${kbArticles.length} ${t('Articles')}`}
          change={`3,050 ${t('views')}`}
          changePeriod={t('vs last 7 days')}
          changeType="positive"
          icon={BookOpen}
          onClick={() => navigate('/crm/support/kb')}
        />
      </div>

      {/* 3. Support Suite Sub-Modules (Interactive Module Cards) */}
      <Card className="p-4 sm:p-6" style={{ borderRadius: '16px', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 800,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            {t('Support Suite Sub-Modules')}
          </h3>
          <span className="text-xs text-tertiary font-medium">{t('4 Active Modules')}</span>
        </div>

        <div className="support-submodules-grid">
          {subModules.map((mod) => {
            const ModIcon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className="surface-secondary rounded-xl p-3.5 sm:p-4 flex items-center justify-between cursor-pointer transition-all border-subtle"
                style={{
                  minHeight: '74px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease',
                  backgroundColor: 'var(--surface-secondary)',
                  boxSizing: 'border-box',
                  width: '100%',
                  minWidth: 0,
                  overflow: 'hidden',
                  gap: '0.75rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface)';
                  e.currentTarget.style.borderColor = 'var(--primary-border)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: mod.iconBg,
                      color: mod.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ModIcon size={19} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1" style={{ gap: '2px' }}>
                    <span className="font-bold text-xs sm:text-sm text-primary truncate" style={{ fontSize: '13.5px', lineHeight: 1.2 }}>
                      {t(mod.label)}
                    </span>
                    <span className="text-tertiary font-medium truncate" style={{ fontSize: '11.5px' }}>
                      {t(mod.subtitle)}
                    </span>
                  </div>
                </div>

                <Badge
                  variant="default"
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    marginLeft: 'auto',
                  }}
                >
                  {t(mod.badge)}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
