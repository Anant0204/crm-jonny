import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Mail,
  MessageSquare,
  Share2,
  Calendar,
  Users,
  Target,
  Sparkles,
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
  BarChart3,
  Layers,
  Send,
  Zap
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Select, KPICard, ProgressBar } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import { useCrm } from '../../../context/CrmContext';
import { useLanguage } from '../../../context/LanguageContext';

export const AiMarketing = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const { refreshLeads } = useCrm();

  useEffect(() => {
    if (refreshLeads) refreshLeads();
  }, [refreshLeads]);

  const [activeTab, setActiveTab] = useState('campaigns');
  const [wizardStep, setWizardStep] = useState(1);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  // New Campaign Form State
  const [campaignData, setCampaignData] = useState({
    title: 'Q3 Enterprise Logistics Acceleration Campaign',
    channel: 'Omnichannel (Email + SMS)',
    audience: 'Tier-1 Logistics Operators & Fleet Directors',
    tone: 'Authoritative Enterprise Executive',
    scheduleDate: '2026-09-20',
  });

  const campaigns = [
    { id: 'CMP-101', name: 'Autumn Enterprise CRM Upgrade Outreach', channel: 'Email', status: 'Active', sent: 1420, openRate: '48.2%', clickRate: '18.4%', conversions: 38 },
    { id: 'CMP-102', name: 'Auto Dealer DMS Integration Push', channel: 'SMS + WhatsApp', status: 'Active', sent: 850, openRate: '92.1%', clickRate: '34.0%', conversions: 64 },
    { id: 'CMP-103', name: 'Commercial Lending API Webinar Invite', channel: 'LinkedIn + Social', status: 'Scheduled', sent: 2100, openRate: 'Pending', clickRate: 'Pending', conversions: 0 },
    { id: 'CMP-104', name: 'VIP Executive Demo Follow-up Drip', channel: 'Email', status: 'Completed', sent: 320, openRate: '64.5%', clickRate: '28.1%', conversions: 42 },
  ];

  const wizardSteps = ['Draft', 'Audience', 'Content', 'Schedule', 'Review', 'Launch'];

  const handleLaunchCampaign = () => {
    addToast({
      title: 'Campaign Queued for Dispatch',
      message: `"${campaignData.title}" is now active in AI dispatch engine.`,
      type: 'success',
    });
    setIsCreatingCampaign(false);
    setWizardStep(1);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: t('AI SuperHouse') }, { label: t('AI Marketing Hub') }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              {t('AI Marketing & Campaigns Hub')}
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              {t('Automated Lead Nurturing')}
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            {t('Plan, synthesize, and dispatch targeted omnichannel campaigns with automated AI copy, sentiment timing, and conversion analytics.')}
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsCreatingCampaign(true)}
          className="text-xs font-bold"
        >
          {t('Create AI Campaign')}
        </Button>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title={t('Total Reach')} value={`4,690 ${t('Leads')}`} change={t('+34% this month')} changeType="positive" icon={Users} />
        <KPICard title={t('Average Open Rate')} value="68.2%" change={t('Industry Benchmark 22%')} changeType="positive" icon={Mail} />
        <KPICard title={t('Conversions')} value={`144 ${t('Deals')}`} change={t('$2.4M Pipeline Value')} changeType="positive" icon={Target} />
        <KPICard title={t('AI Optimization Score')} value="96 / 100" change={t('Optimal Dispatch Timing')} changeType="positive" icon={Sparkles} />
      </div>

      {/* Campaign Creation Wizard Modal / Section */}
      {isCreatingCampaign ? (
        <Card className="border shadow-md border-sky-500/30">
          <CardHeader
            title="AI Campaign Creation Wizard"
            subtitle={`Step ${wizardStep} of 6: ${wizardSteps[wizardStep - 1]}`}
          />
          <CardBody className="p-6 flex flex-col gap-5">
            {/* Step Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {wizardSteps.map((s, idx) => (
                <div
                  key={s}
                  className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                    wizardStep === idx + 1
                      ? 'border-sky-500 bg-sky-500 text-white shadow-sm'
                      : wizardStep > idx + 1
                      ? 'border-emerald-500 text-emerald-600 bg-emerald-50/40'
                      : 'border-border text-tertiary bg-surface'
                  }`}
                >
                  <span>{idx + 1}. {s}</span>
                </div>
              ))}
            </div>

            {/* Wizard Step 1: Draft */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-primary mb-1 block">Campaign Title</label>
                  <input
                    type="text"
                    value={campaignData.title}
                    onChange={(e) => setCampaignData({ ...campaignData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-border bg-surface text-sm text-primary font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-primary mb-1 block">Channel Delivery Vehicle</label>
                  <Select
                    value={campaignData.channel}
                    onChange={(e) => setCampaignData({ ...campaignData, channel: e.target.value })}
                    options={[
                      { value: 'Omnichannel (Email + SMS)', label: 'Omnichannel (Email + SMS Combined)' },
                      { value: 'Direct Enterprise Email', label: 'Direct Enterprise Email (Dedicated Server)' },
                      { value: 'High-Priority SMS', label: 'High-Priority SMS / Text Campaign' },
                      { value: 'LinkedIn InMail Sequence', label: 'LinkedIn InMail B2B Sequence' },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Wizard Step 2: Audience */}
            {wizardStep === 2 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-primary block">Select Target Segmentation</label>
                {[
                  { name: 'Tier-1 Logistics Operators & Fleet Directors', count: '420 contacts', match: '98% High Match' },
                  { name: 'Franchise Auto Dealership General Managers', count: '310 contacts', match: '94% High Match' },
                  { name: 'Mid-Market CFOs Seeking Commercial Credit Lines', count: '180 contacts', match: '91% High Match' },
                ].map((aud, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border bg-surface flex items-center justify-between cursor-pointer hover:border-sky-400">
                    <div>
                      <span className="text-xs font-bold text-primary block">{aud.name}</span>
                      <span className="text-[11px] text-tertiary">{aud.count}</span>
                    </div>
                    <Badge variant="success">{aud.match}</Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Wizard Step 3: Content */}
            {wizardStep === 3 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-primary">AI Content Synthesizer</label>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Sparkles}
                    onClick={() => addToast({ title: 'AI Refinement', message: 'Copy optimized for 24% higher click-through.', type: 'info' })}
                  >
                    Auto-Optimize Copy
                  </Button>
                </div>
                <textarea
                  rows={6}
                  defaultValue="Hi {{FirstName}},\n\nAs enterprise operations expand, traditional CRM and manual spreadsheets create costly pipeline friction. CRM nErgy AI unifies your entire sales, desking, and ERP logistics into a single AI-native cockpit.\n\nWould Thursday at 2:00 PM work for a brief 10-minute executive walk-through?\n\nBest regards,\nAlexander Wright\nCEO, CRM nErgy AI"
                  className="w-full p-3 rounded-xl border border-border bg-surface text-sm text-primary font-mono"
                />
              </div>
            )}

            {/* Wizard Step 4: Schedule */}
            {wizardStep === 4 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-primary block">Smart AI Timing Dispatch</label>
                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-primary space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
                    <Zap size={16} />
                    <span>AI Recommended Window: Tuesday at 9:45 AM EST</span>
                  </div>
                  <p className="text-secondary text-[11px]">
                    Historical telemetry shows corporate decision-makers in your target segment have a 74% higher open rate on Tuesday mornings.
                  </p>
                </div>
              </div>
            )}

            {/* Wizard Step 5: Review */}
            {wizardStep === 5 && (
              <div className="p-4 rounded-xl bg-surface-secondary border border-border text-xs space-y-2">
                <h4 className="font-bold text-primary">Pre-Flight Campaign Check</h4>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-secondary">Campaign Name:</span>
                  <span className="font-bold text-primary">{campaignData.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-secondary">Vehicle:</span>
                  <span className="font-bold text-primary">{campaignData.channel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/50">
                  <span className="text-secondary">Spam & Compliance Score:</span>
                  <span className="font-bold text-emerald-500">99.4% (Zero Flagged Words)</span>
                </div>
              </div>
            )}

            {/* Wizard Step 6: Launch */}
            {wizardStep === 6 && (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <Send size={24} />
                </div>
                <h3 className="text-base font-bold text-primary">Ready for Live Dispatch</h3>
                <p className="text-xs text-secondary max-w-sm mx-auto">
                  Click Launch to queue automated outreach across all configured channels with real-time conversion monitoring.
                </p>
              </div>
            )}

            {/* Wizard Controls */}
            <div className="pt-3 border-t border-border flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (wizardStep === 1) setIsCreatingCampaign(false);
                  else setWizardStep((prev) => prev - 1);
                }}
              >
                {wizardStep === 1 ? 'Cancel' : 'Back'}
              </Button>

              {wizardStep < 6 ? (
                <Button variant="primary" size="sm" onClick={() => setWizardStep((prev) => prev + 1)}>
                  Next Step →
                </Button>
              ) : (
                <Button variant="primary" size="sm" icon={Send} onClick={handleLaunchCampaign}>
                  Confirm & Launch Campaign
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      ) : null}

      {/* Active Campaigns Table */}
      <Card className="border shadow-sm">
        <CardHeader
          title={t('Active Enterprise Marketing Campaigns')}
          subtitle={t('Real-time multi-channel engagement analytics')}
        />
        <CardBody className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-secondary text-secondary">
                <th className="p-3 font-bold">{t('Campaign ID & Title')}</th>
                <th className="p-3 font-bold">{t('Channel')}</th>
                <th className="p-3 font-bold">{t('Status')}</th>
                <th className="p-3 font-bold">{t('Total Sent')}</th>
                <th className="p-3 font-bold">{t('Open Rate')}</th>
                <th className="p-3 font-bold">{t('Click Rate')}</th>
                <th className="p-3 font-bold">{t('Conversions')}</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-surface-secondary transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-primary block">{t(c.name) || c.name}</span>
                    <span className="text-[10px] font-mono text-tertiary">{c.id}</span>
                  </td>
                  <td className="p-3 font-semibold text-secondary">{t(c.channel) || c.channel}</td>
                  <td className="p-3">
                    <Badge variant={c.status === 'Active' ? 'success' : c.status === 'Scheduled' ? 'warning' : 'default'}>
                      {t(c.status)}
                    </Badge>
                  </td>
                  <td className="p-3 font-bold text-primary">{c.sent.toLocaleString()}</td>
                  <td className="p-3 font-bold text-sky-600">{c.openRate}</td>
                  <td className="p-3 font-bold text-indigo-600">{c.clickRate}</td>
                  <td className="p-3 font-bold text-emerald-600">{c.conversions} {t('closed')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AiMarketing;
