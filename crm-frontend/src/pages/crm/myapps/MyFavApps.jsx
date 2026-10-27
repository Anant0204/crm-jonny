import React, { useState, useEffect } from 'react';
import {
  Grid,
  Star,
  Search,
  Maximize2,
  Minimize2,
  ExternalLink,
  Plus,
  Sparkles,
  Layers,
  MessageSquare,
  DollarSign,
  TrendingUp,
  FileText,
  Boxes,
  Compass,
  CheckCircle2,
  X,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Input } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import apiClient from '../../../services/apiClient';

export const MyFavApps = () => {
  const { addToast } = useToast();

  useEffect(() => {
    const fetchAppConfig = async () => {
      try {
        await apiClient.get('/tenants/settings');
      } catch (_) {}
    };
    fetchAppConfig();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isBigScreenOpen, setIsBigScreenOpen] = useState(false);
  const [activeApp, setActiveApp] = useState(null);

  const categoryDefs = [
    { id: 'All', label: 'All', icon: Grid },
    { id: 'Favorites', label: 'Favorites', icon: Star },
    { id: 'Business Operations', label: 'Business Operations', icon: Boxes },
    { id: 'Communication', label: 'Communication', icon: MessageSquare },
    { id: 'Finance & Payments', label: 'Finance & Payments', icon: DollarSign },
    { id: 'Productivity', label: 'Productivity', icon: FileText },
    { id: 'Analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const getCategoryCount = (catId) => {
    if (catId === 'All') return apps.length;
    if (catId === 'Favorites') return apps.filter((a) => a.isFavorite).length;
    return apps.filter((a) => a.category === catId).length;
  };

  const [apps, setApps] = useState([
    { id: 'app-1', name: 'Slack Workplace', category: 'Communication', isFavorite: true, icon: MessageSquare, color: '#4a154b', url: 'https://slack.com', desc: 'Team communication and alerts webhook' },
    { id: 'app-2', name: 'QuickBooks Online', category: 'Finance & Payments', isFavorite: true, icon: DollarSign, color: '#2ca01c', url: 'https://quickbooks.intuit.com', desc: 'Enterprise accounting, payroll & tax' },
    { id: 'app-3', name: 'DocuSign E-Signature', category: 'Productivity', isFavorite: true, icon: FileText, color: '#2b579a', url: 'https://docusign.com', desc: 'Cloud purchase contract and NDA e-signatures' },
    { id: 'app-4', name: 'Stripe Merchant Dashboard', category: 'Finance & Payments', isFavorite: false, icon: DollarSign, color: '#635bff', url: 'https://stripe.com', desc: 'Payment gateway and recurring billing telemetry' },
    { id: 'app-5', name: 'Google Workspace Docs', category: 'Productivity', isFavorite: true, icon: FileText, color: '#4285f4', url: 'https://docs.google.com', desc: 'Collaborative cloud documents and spreadsheets' },
    { id: 'app-6', name: 'Tableau Business Intelligence', category: 'Analytics', isFavorite: false, icon: TrendingUp, color: '#e97627', url: 'https://tableau.com', desc: 'Advanced corporate data visualization' },
    { id: 'app-7', name: 'Shopify Logistics Hub', category: 'Business Operations', isFavorite: false, icon: Boxes, color: '#96bf48', url: 'https://shopify.com', desc: 'Omnichannel inventory fulfillment' },
    { id: 'app-8', name: 'Zoom Enterprise Meetings', category: 'Communication', isFavorite: false, icon: MessageSquare, color: '#2d8cff', url: 'https://zoom.us', desc: 'HD video conferencing and team webinars' },
  ]);

  const toggleFavorite = (appId, e) => {
    e.stopPropagation();
    setApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, isFavorite: !app.isFavorite } : app))
    );
    addToast({ title: 'Favorites Updated', message: 'App preference saved.', type: 'info' });
  };

  const handleLaunchApp = (app) => {
    setActiveApp(app);
    setIsBigScreenOpen(true);
    addToast({
      title: `Launching ${app.name}`,
      message: 'Opening in Expandable Big Screen Viewport.',
      type: 'info',
    });
  };

  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Favorites'
        ? app.isFavorite
        : app.category === activeCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: 'My Ecosystem' }, { label: 'My Fav Apps' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              My Fav APPs Launcher & Big Screen
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              Expandable Viewport
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Organize daily external cloud tools, accounting software, and merchant portals with real-time in-app Big Screen simulation.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => addToast({ title: 'Add Application', message: 'Enter app URL and icon to bookmark.', type: 'info' })}
          className="text-xs font-bold"
        >
          Add New Application
        </Button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-surface border border-border rounded-2xl p-2.5 shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin flex-nowrap">
          {categoryDefs.map((cat) => {
            const Icon = cat.icon;
            const count = getCategoryCount(cat.id);
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex-shrink-0 select-none border ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white border-sky-600 shadow-sm shadow-blue-500/20'
                    : 'bg-surface text-secondary border-border hover:border-sky-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  size={14}
                  className={
                    isActive
                      ? 'text-white'
                      : cat.id === 'Favorites'
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-400'
                  }
                />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-tertiary font-semibold'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full xl:w-64 flex-shrink-0">
          <Input
            placeholder="Search apps..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredApps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.id}
              onClick={() => handleLaunchApp(app)}
              className="p-4 rounded-2xl border border-border bg-surface hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: app.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(app.id, e)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      app.isFavorite ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'
                    }`}
                    title={app.isFavorite ? 'Remove Favorite' : 'Mark as Favorite'}
                  >
                    <Star size={16} className={app.isFavorite ? 'fill-current' : ''} />
                  </button>
                </div>

                <h3 className="font-bold text-sm text-primary group-hover:text-sky-600 transition-colors">
                  {app.name}
                </h3>
                <span className="text-[11px] font-mono text-tertiary block mt-0.5">{app.category}</span>
                <p className="text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">
                  {app.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-sky-600">
                <span>Launch in Big Screen</span>
                <ExternalLink size={13} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Big Screen Viewport Modal */}
      {isBigScreenOpen && activeApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div className="w-full max-w-6xl h-[85vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden">
            {/* Big Screen Header */}
            <div className="px-5 py-3.5 border-b border-border bg-surface-secondary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: activeApp.color }}
                >
                  <activeApp.icon size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                    <span>{activeApp.name}</span>
                    <Badge variant="success" className="text-[10px]">Active Connected Session</Badge>
                  </h3>
                  <span className="text-[11px] font-mono text-tertiary">{activeApp.url}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={ExternalLink}
                  onClick={() => window.open(activeApp.url, '_blank')}
                >
                  Open External Tab
                </Button>
                <button
                  type="button"
                  onClick={() => setIsBigScreenOpen(false)}
                  className="p-1.5 rounded-lg text-tertiary hover:text-primary hover:bg-surface transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Big Screen Interactive Viewport Content */}
            <div className="flex-1 bg-slate-950 p-6 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl" style={{ backgroundColor: activeApp.color }}>
                <activeApp.icon size={32} />
              </div>
              <h2 className="text-xl font-bold font-display">{activeApp.name} Simulated Workspace</h2>
              <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
                Client roadmapped "Big Screen" viewport enables switching between external merchant apps directly inside the CRM nErgy AI unified cockpit without opening extra browser tabs.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Button variant="primary" size="sm" icon={Sparkles} onClick={() => addToast({ title: 'Bestie Sync', message: 'Extracted telemetry from ' + activeApp.name, type: 'success' })}>
                  Sync Telemetry with Zunme AI
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsBigScreenOpen(false)}>
                  Close Big Screen
                </Button>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Viewport Resolution: 1920 x 1080 (HD Container)</span>
                <span>Isolated Sandboxed Frame • 0ms Latency</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavApps;
