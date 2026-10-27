import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  Shield,
  Layers,
  Search,
  Plus,
  Compass,
  CheckCircle2,
  ChevronRight,
  BarChart2,
  Briefcase,
  RefreshCw,
  AlertTriangle,
  Navigation,
  Route,
  WifiOff,
  Eye,
  Sliders,
  Map,
  Split,
  Calendar,
  Zap,
  Clock,
  Sparkles,
  ArrowUpRight,
  FileText
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Select,
  KPICard,
  Modal,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import { useLanguage } from '../../../context/LanguageContext';
import territoryService from '../../../services/territoryService';

export const TerritoryManagement = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'benefits' | 'territories'
  const [territories, setTerritories] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState('West Coast Metro');
  const [showProspectCounts, setShowProspectCounts] = useState(true);
  const [showDemographics, setShowDemographics] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [mapViewType, setMapViewType] = useState('roadmap'); // 'roadmap' | 'satellite' | 'terrain'

  // New Territory Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: 'North America',
    states: '',
    targetQuota: '',
    status: 'Active',
  });

  // Interactive mock territories with advanced CRM data (Prospects, Demographics, Reps, Routes)
  const interactiveZones = [
    {
      id: 'z-1',
      name: 'West Coast Metro',
      code: 'TER-WST-01',
      rep: 'Alexander Wright',
      repRole: 'Senior Commercial AE',
      prospectCount: 142,
      activeLeads: 48,
      avgDealSize: '$68,500',
      demographics: 'High-Tech & Renewable Energy Hub (GDP Index: 138)',
      quota: '$2,400,000',
      attainment: '84%',
      states: 'CA, WA, OR',
      optimizedRoute: 'San Francisco ➔ San Jose ➔ Oakland ➔ Sacramento',
      travelTimeSaved: '3.4 hrs/week',
      color: '#0ea5e9',
    },
    {
      id: 'z-2',
      name: 'Northeast Corridor',
      code: 'TER-EST-02',
      rep: 'Sarah Jenkins',
      repRole: 'Enterprise Fleet Specialist',
      prospectCount: 198,
      activeLeads: 62,
      avgDealSize: '$92,000',
      demographics: 'Financial Services & Logistics Enterprise (GDP Index: 144)',
      quota: '$3,100,000',
      attainment: '91%',
      states: 'NY, NJ, MA, PA',
      optimizedRoute: 'Boston ➔ Hartford ➔ New York ➔ Philadelphia',
      travelTimeSaved: '4.8 hrs/week',
      color: '#6366f1',
    },
    {
      id: 'z-3',
      name: 'Central Midwest Belt',
      code: 'TER-MID-03',
      rep: 'Marcus Vance',
      repRole: 'Industrial & Auto Lead',
      prospectCount: 115,
      activeLeads: 37,
      avgDealSize: '$54,000',
      demographics: 'Heavy Manufacturing & Freight Logistics (GDP Index: 112)',
      quota: '$1,850,000',
      attainment: '78%',
      states: 'IL, OH, MI, IN',
      optimizedRoute: 'Chicago ➔ Detroit ➔ Indianapolis ➔ Columbus',
      travelTimeSaved: '2.9 hrs/week',
      color: '#10b981',
    },
    {
      id: 'z-4',
      name: 'Southern Sunbelt Hub',
      code: 'TER-SOU-04',
      rep: 'David Chen',
      repRole: 'Regional Account Director',
      prospectCount: 167,
      activeLeads: 53,
      avgDealSize: '$76,000',
      demographics: 'Automotive Dealerships & Energy Corridors (GDP Index: 126)',
      quota: '$2,650,000',
      attainment: '88%',
      states: 'TX, FL, GA, NC',
      optimizedRoute: 'Austin ➔ Dallas ➔ Houston ➔ Atlanta',
      travelTimeSaved: '4.1 hrs/week',
      color: '#f59e0b',
    },
  ];

  const currentZone = interactiveZones.find((z) => z.name === selectedTerritory) || interactiveZones[0];

  // Client Requirement: Summary Table of Benefits
  const benefitsList = [
    {
      benefit: 'Organized Sales Data',
      description: 'Segments data by regions for better management.',
      impact: 'Eliminates fragmented spreadsheets with unified geographic tagging.',
      status: 'Active in CRM',
    },
    {
      benefit: 'Focused Coverage',
      description: 'Ensures all areas are adequately covered by sales reps.',
      impact: 'Eliminates cold spots; balances account distribution per rep capacity.',
      status: 'Enforced',
    },
    {
      benefit: 'Reduced Overlap',
      description: 'Minimizes confusion and resource wastage.',
      impact: 'Strict boundaries prevent duplicate outreach to identical accounts.',
      status: 'Guaranteed',
    },
    {
      benefit: 'Streamlined Reporting',
      description: 'Simplifies performance insights by territory.',
      impact: 'One-click executive rollups from Field Rep ➔ Territory ➔ Region.',
      status: 'Real-Time',
    },
    {
      benefit: 'Accurate Sales Projections',
      description: 'Enhances forecasting accuracy through performance analysis.',
      impact: 'Combines demographic capacity + historical quota attainment.',
      status: 'AI Assisted',
    },
    {
      benefit: 'Automated Lead Assignment',
      description: 'Saves time with automated routing of leads.',
      impact: 'Direct postal/GIS ingestion routes new leads in sub-second latency.',
      status: 'Instant Engine',
    },
    {
      benefit: 'Efficient Resource Use',
      description: 'Maximizes productivity by focusing on specific territories.',
      impact: 'Slashes rep travel fatigue while increasing customer face-time by 35%.',
      status: 'Optimized',
    },
  ];

  const fetchTerritories = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await territoryService.getTerritories(
        selectedRegion !== 'All Regions' ? { region: selectedRegion } : {}
      );
      setTerritories(data);
    } catch (err) {
      console.error('Failed to load territories:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedRegion]);

  useEffect(() => {
    fetchTerritories();
  }, [fetchTerritories]);

  const handleCreateTerritory = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.region) {
      addToast({ title: 'Validation Error', message: 'Territory name and region are required.', type: 'error' });
      return;
    }

    try {
      const created = await territoryService.createTerritory(formData);
      setTerritories((prev) => [...prev, created]);
      setIsModalOpen(false);
      setFormData({ name: '', region: 'North America', states: '', targetQuota: '', status: 'Active' });
      addToast({ title: 'Territory Defined', message: `Territory ${created.name} created.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to create territory.', type: 'error' });
    }
  };

  const totalQuota = territories.reduce((acc, t) => acc + (parseFloat(t.targetQuota) || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Page Header */}
      <div>
        <Breadcrumb items={[{ label: 'Dashboard', path: '/crm/dashboard' }, { label: 'Core Modules' }, { label: 'Territory Management', active: true }]} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 'var(--spacing-2)',
            flexWrap: 'wrap',
            gap: 'var(--spacing-4)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)',
                }}
              >
                <Compass size={24} color="#ffffff" />
              </div>
              <div>
                <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  {t('Territory Management & Field Optimization')}
                  <Badge variant="primary" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t('Google Maps Powered')}
                  </Badge>
                </h1>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: 'var(--font-sm)' }}>
                  {t('Geographic sales mapping, route optimization, field rep scheduling, and prospect demographics intelligence.')}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Button
              variant="outline"
              onClick={() => {
                setIsOfflineMode(!isOfflineMode);
                addToast({
                  title: isOfflineMode ? 'Online Sync Active' : 'Offline Mode Enabled',
                  message: isOfflineMode ? 'Reconnected to live GIS telemetry.' : 'Territory caches & rep schedules stored locally for field use.',
                  type: 'info',
                });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <WifiOff size={15} />
              {isOfflineMode ? t('Disable Offline') : t('Offline Field Mode')}
            </Button>

            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
            >
              <Plus size={16} /> {t('Define New Territory')}
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--spacing-4)' }}>
        <KPICard
          title={t('Active Operating Zones')}
          value={String(interactiveZones.length)}
          change={t('4 Regional Corridors')}
          changeType="positive"
          icon={Compass}
        />
        <KPICard
          title={t('Prospect Count Tracked')}
          value={`622 ${t('Accounts')}`}
          change={t('Demographics Synced')}
          changeType="positive"
          icon={Target}
        />
        <KPICard
          title={t('Travel Time Saved')}
          value={t('15.2 hrs/wk')}
          change={t('Route Optimization')}
          changeType="positive"
          icon={Route}
        />
        <KPICard
          title={t('Automated Routing')}
          value={t('100% Active')}
          change={t('Zero Overlap')}
          changeType="positive"
          icon={Zap}
        />
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          gap: 'var(--spacing-2)',
        }}
      >
        <button
          onClick={() => setActiveTab('map')}
          style={{
            padding: '10px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'map' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'map' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'map' ? 600 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 'var(--font-sm)',
          }}
        >
          <Map size={16} /> {t('Google Maps Geographic Visualizer & Routes')}
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          style={{
            padding: '10px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'benefits' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'benefits' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'benefits' ? 600 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 'var(--font-sm)',
          }}
        >
          <FileText size={16} /> {t('Summary Table of Benefits & CRM Features')}
        </button>
        <button
          onClick={() => setActiveTab('territories')}
          style={{
            padding: '10px 18px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'territories' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'territories' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'territories' ? 600 : 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 'var(--font-sm)',
          }}
        >
          <Layers size={16} /> {t('Defined Territories Database')} ({territories.length || 4})
        </button>
      </div>

      {/* TAB 1: Google Maps Geographic Visualizer & Route Optimization */}
      {activeTab === 'map' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          {/* Executive Overview Highlight Banner */}
          <Card
            style={{
              padding: 'var(--spacing-5) var(--spacing-6)',
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%), var(--surface)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(14, 165, 233, 0.15)',
                  color: '#0ea5e9',
                }}
              >
                <Compass size={20} />
              </div>
              <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, margin: 0 }}>
                {t('Google Maps in Territory Management')}
              </h2>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--font-sm)', lineHeight: 1.6 }}>
              {t('Google Maps is used in territory management to help visualize geographic areas for sales representatives, allowing for route optimization and efficient scheduling. While standard maps lack advanced CRM layers, CRM nErgy directly bridges this with prospect counts and demographic data, delivering an all-in-one spatial field operations suite.')}
            </p>
          </Card>

          {/* 3 Key Google Maps Features Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-4)' }}>
            <Card style={{ padding: 'var(--spacing-5)', borderTop: '4px solid #0ea5e9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ padding: 8, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' }}>
                  <Route size={18} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{t('Route Optimization')}</h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {t('Helps sales reps find the best routes to their appointments, saving time and reducing travel costs. Live turn-by-turn re-routing minimizes traffic bottlenecks.') || 'Helps sales reps find the best routes to their appointments, saving time and reducing travel costs. Live turn-by-turn re-routing minimizes traffic bottlenecks.'}
              </p>
            </Card>

            <Card style={{ padding: 'var(--spacing-5)', borderTop: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ padding: 8, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <MapPin size={18} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{t('Geographic Visualization')}</h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {t('Provides a clear view of the areas assigned to each sales rep, aiding in planning, balanced quota distribution, and seamless team organization.') || 'Provides a clear view of the areas assigned to each sales rep, aiding in planning, balanced quota distribution, and seamless team organization.'}
              </p>
            </Card>

            <Card style={{ padding: 'var(--spacing-5)', borderTop: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ padding: 8, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                  <WifiOff size={18} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{t('Offline Access')}</h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {t('Allows users to access maps without an internet connection, ensuring sales reps in remote or low-connectivity field areas never lose appointment details.') || 'Allows users to access maps without an internet connection, ensuring sales reps in remote or low-connectivity field areas never lose appointment details.'}
              </p>
            </Card>
          </div>

          {/* Main Visualizer: Google Maps Interactive Canvas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--spacing-6)' }}>
            {/* Left: Simulated Google Maps Interactive Canvas */}
            <Card
              style={{
                height: '520px',
                position: 'relative',
                overflow: 'hidden',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: mapViewType === 'satellite' ? '#0b1320' : '#0f172a',
                border: '1px solid var(--border)',
              }}
            >
              {/* Map Canvas Header Toolbar */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  right: 16,
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                {/* Territory Selector Pills */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 6px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {interactiveZones.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setSelectedTerritory(z.name)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        backgroundColor: selectedTerritory === z.name ? z.color : 'transparent',
                        color: selectedTerritory === z.name ? '#ffffff' : 'var(--text-muted)',
                        fontSize: '12px',
                        fontWeight: selectedTerritory === z.name ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {t(z.name)}
                    </button>
                  ))}
                </div>

                {/* Map Layer Controls */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <button
                    onClick={() => setMapViewType('roadmap')}
                    style={{
                      padding: '4px 8px',
                      background: 'none',
                      border: 'none',
                      color: mapViewType === 'roadmap' ? '#0ea5e9' : 'var(--text-muted)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {t('Map')}
                  </button>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <button
                    onClick={() => setMapViewType('satellite')}
                    style={{
                      padding: '4px 8px',
                      background: 'none',
                      border: 'none',
                      color: mapViewType === 'satellite' ? '#0ea5e9' : 'var(--text-muted)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {t('Satellite')}
                  </button>
                  <span style={{ color: 'var(--border)' }}>|</span>
                  <button
                    onClick={() => setShowProspectCounts(!showProspectCounts)}
                    style={{
                      padding: '4px 8px',
                      background: showProspectCounts ? 'rgba(14, 165, 233, 0.2)' : 'none',
                      border: 'none',
                      borderRadius: 4,
                      color: showProspectCounts ? '#38bdf8' : 'var(--text-muted)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {showProspectCounts ? t('Prospects: ON') : t('Prospects: OFF')}
                  </button>
                </div>
              </div>

              {/* Simulated Visual Vector Map Background */}
              <div
                style={{
                  flex: 1,
                  position: 'relative',
                  background:
                    mapViewType === 'satellite'
                      ? 'radial-gradient(circle at 50% 50%, #1e293b 0%, #090d16 100%)'
                      : 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Background Grid Roads & Vector Coordinates */}
                <svg
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0, opacity: mapViewType === 'satellite' ? 0.35 : 0.6 }}
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Curving Highway / Route Vectors */}
                  <path
                    d="M 80 380 Q 220 220 360 260 T 640 180"
                    fill="none"
                    stroke={currentZone.color}
                    strokeWidth="4"
                    strokeDasharray="6,4"
                    style={{ filter: 'drop-shadow(0 0 6px ' + currentZone.color + ')' }}
                  />
                  <path
                    d="M 120 140 Q 300 180 480 320 T 780 380"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="2"
                  />
                </svg>

                {/* Territory Boundary Polygon Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    width: '68%',
                    height: '62%',
                    borderRadius: '24px',
                    border: `2px solid ${currentZone.color}`,
                    backgroundColor: `${currentZone.color}18`,
                    boxShadow: `0 0 40px ${currentZone.color}25, inset 0 0 30px ${currentZone.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 800,
                      color: currentZone.color,
                      opacity: 0.65,
                    }}
                  >
                    ZONE POLYGON: {currentZone.name} ({currentZone.states})
                  </span>
                </div>

                {/* Waypoint Pins & Prospect Count Nodes */}
                {[
                  { x: '24%', y: '42%', label: 'Hub A: HQ Office', count: 48, status: 'Completed' },
                  { x: '46%', y: '36%', label: 'Hub B: Commercial Center', count: 62, status: 'Next Appt' },
                  { x: '68%', y: '48%', label: 'Hub C: Enterprise Logistics', count: 32, status: 'Scheduled' },
                ].map((pin, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      position: 'absolute',
                      top: pin.y,
                      left: pin.x,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5,
                    }}
                  >
                    <div
                      style={{
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: `1px solid ${currentZone.color}`,
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        marginBottom: 4,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <MapPin size={12} color={currentZone.color} />
                      {pin.label}
                      {showProspectCounts && (
                        <span
                          style={{
                            padding: '1px 5px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: `${currentZone.color}30`,
                            color: currentZone.color,
                            fontSize: '10px',
                          }}
                        >
                          {pin.count} Prospects
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: currentZone.color,
                        border: '3px solid #ffffff',
                        boxShadow: `0 0 14px ${currentZone.color}`,
                      }}
                    />
                  </div>
                ))}

                {/* Bottom Left: Live Optimized Route Tracker */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    zIndex: 10,
                  }}
                >
                  <Route size={16} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('Optimized Route:')}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>{currentZone.optimizedRoute}</div>
                  </div>
                  <div style={{ height: 24, width: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
                  <div>
                    <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>
                      ⚡ {currentZone.travelTimeSaved} {t('saved')}
                    </div>
                  </div>
                </div>

                {/* Bottom Right: Offline Status Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isOfflineMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    border: `1px solid ${isOfflineMode ? '#f59e0b' : '#10b981'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: isOfflineMode ? '#f59e0b' : '#10b981',
                    zIndex: 10,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: isOfflineMode ? '#f59e0b' : '#10b981',
                    }}
                  />
                  {isOfflineMode ? t('Offline Cache Active (Local GIS)') : t('Live Telemetry Connected')}
                </div>
              </div>
            </Card>

            {/* Right: Selected Zone & Demographic CRM Inspector */}
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', padding: 'var(--spacing-5)' }}>
              <div>
                <Badge variant="primary" style={{ backgroundColor: `${currentZone.color}20`, color: currentZone.color, marginBottom: 6 }}>
                  {currentZone.code}
                </Badge>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>{t(currentZone.name)}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{t('Coverage')}: {currentZone.states}</p>
              </div>

              <div style={{ height: 1, backgroundColor: 'var(--border)' }} />

              {/* Assigned Rep Details */}
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
                  {t('Assigned Field Representative')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: `${currentZone.color}25`,
                      color: currentZone.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {currentZone.rep.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{currentZone.rep}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t(currentZone.repRole) || currentZone.repRole}</div>
                  </div>
                </div>
              </div>

              {/* Advanced CRM Metric Layers (Prospect Counts + Demographics) */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('Active Prospect Count:')}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0ea5e9' }}>{currentZone.prospectCount} {t('accounts')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('Avg Deal Value:')}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{currentZone.avgDealSize}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('Revenue Quota:')}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{currentZone.quota} ({currentZone.attainment})</span>
                </div>
              </div>

              {/* Demographic & Industry Intelligence */}
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
                  {t('Demographic & Market Profile')}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>
                  {currentZone.demographics}
                </p>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Button
                  variant="primary"
                  onClick={() =>
                    addToast({
                      title: 'Route Dispatched',
                      message: `Optimized turn-by-turn route pushed to ${currentZone.rep}'s mobile device.`,
                      type: 'success',
                    })
                  }
                  style={{ width: '100%', fontSize: '12px', fontWeight: 600 }}
                >
                  Dispatch Optimized Route
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: Summary Table of Benefits */}
      {activeTab === 'benefits' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                padding: 'var(--spacing-4) var(--spacing-6)',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'var(--surface-hover)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, margin: 0 }}>
                  Summary Table of Benefits
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                  How CRM nErgy territory management optimizes sales strategies and improves overall business performance
                </p>
              </div>
              <Badge variant="success">7 Core Enterprise Benefits</Badge>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                    <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-muted)', width: '22%' }}>Benefit</th>
                    <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-muted)', width: '38%' }}>Description</th>
                    <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-muted)', width: '25%' }}>Business Impact</th>
                    <th style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-muted)', width: '15%' }}>CRM Execution</th>
                  </tr>
                </thead>
                <tbody>
                  {benefitsList.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0ea5e9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <CheckCircle2 size={16} color="#10b981" />
                          <span>{item.benefit}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text)', lineHeight: 1.5 }}>
                        {item.description}
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.5 }}>
                        {item.impact}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Strategic Takeaway Card */}
          <Card
            style={{
              padding: 'var(--spacing-5) var(--spacing-6)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%), var(--surface)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Sparkles size={18} color="#6366f1" />
              <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Business Impact & Executive Value</h4>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
              Territory management features are essential for optimizing sales strategies and improving overall business performance.
              By synchronizing Google Maps with prospect counts, route optimization, and automated lead routing, enterprise field teams achieve
              higher customer touchpoints while eliminating territory conflict and excessive travel expenses.
            </p>
          </Card>
        </div>
      )}

      {/* TAB 3: Defined Territories Database */}
      {activeTab === 'territories' && (
        <Card style={{ border: '1px solid var(--border)', padding: 0, overflow: 'hidden' }}>
          <CardHeader
            title="Defined Sales Territories"
            subtitle="All geographic territories managed under this company tenant"
          />
          <CardBody style={{ padding: 0, overflowX: 'auto' }}>
            {isLoading ? (
              <div style={{ padding: '48px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                Loading territories from database...
              </div>
            ) : territories.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Compass size={48} color="var(--text-muted)" style={{ marginBottom: 12 }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>No Custom Territories Created</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: 400, margin: '6px 0 16px 0' }}>
                  Interactive Google Maps zones are active. You can also define custom company-specific sales territory boundaries.
                </p>
                <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                  <Plus size={14} style={{ marginRight: 6 }} /> Define First Territory
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell header>Code</TableCell>
                    <TableCell header>Territory Name</TableCell>
                    <TableCell header>Region</TableCell>
                    <TableCell header>Assigned States / Jurisdictions</TableCell>
                    <TableCell header>Target Quota</TableCell>
                    <TableCell header>Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {territories.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell style={{ fontFamily: 'monospace', fontWeight: 700, color: '#38bdf8' }}>{t.code}</TableCell>
                      <TableCell style={{ fontWeight: 600 }}>{t.name}</TableCell>
                      <TableCell style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{t.region}</TableCell>
                      <TableCell style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{t.states || 'All Regional Zones'}</TableCell>
                      <TableCell style={{ fontWeight: 700 }}>${parseFloat(t.targetQuota || 0).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={t.status === 'Active' ? 'success' : 'warning'}>{t.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      )}

      {/* Create Territory Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Define Geographic Sales Territory"
        size="md"
      >
        <form onSubmit={handleCreateTerritory} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Input
            label="Territory Name *"
            placeholder="e.g. West Coast Commercial Corridor"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
            <Input
              label="Region *"
              placeholder="e.g. West Coast"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              required
            />
            <Input
              label="States / Coverage"
              placeholder="e.g. CA, OR, WA, NV"
              value={formData.states}
              onChange={(e) => setFormData({ ...formData, states: e.target.value })}
            />
          </div>
          <Input
            label="Target Revenue Quota ($)"
            type="number"
            placeholder="1500000"
            value={formData.targetQuota}
            onChange={(e) => setFormData({ ...formData, targetQuota: e.target.value })}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Territory
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TerritoryManagement;
