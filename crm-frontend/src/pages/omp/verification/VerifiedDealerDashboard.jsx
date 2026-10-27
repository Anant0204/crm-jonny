import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  PhoneCall,
  RefreshCw,
  FileSpreadsheet,
  Flame,
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Car,
  ChevronRight,
  Eye,
  Sliders,
  Bell,
  ArrowUpRight,
  Shield,
  Layers,
  Search,
  Check,
  Zap,
  Clock,
  Phone,
  ArrowRight
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const VerifiedDealerDashboard = () => {
  const navigate = useNavigate();

  const [clickToCallActive, setClickToCallActive] = useState(true);
  const [carfaxAutoAttach, setCarfaxAutoAttach] = useState(true);
  const [prioritySearchBoost, setPrioritySearchBoost] = useState(true);
  const [dmsSyncing, setDmsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2 minutes ago');
  const [selectedTier, setSelectedTier] = useState('franchise');

  const handleManualSync = () => {
    setDmsSyncing(true);
    setTimeout(() => {
      setDmsSyncing(false);
      setLastSyncTime('Just now');
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '28px 20px 80px',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Top Navbar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                OMP Deals Verified Network
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>/</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Dealer Management Hub (Task V-02)</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Verified Auto Dealer Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Quick Tier Switcher */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--surface)',
                padding: '3px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
              }}
            >
              {[
                { id: 'small', label: 'Small Dealer' },
                { id: 'franchise', label: 'Franchise' },
                { id: 'large', label: 'Enterprise Group' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTier(t.id)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: 'none',
                    background: selectedTier === t.id ? '#0284c7' : 'transparent',
                    color: selectedTier === t.id ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('/omp/verify')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>Onboarding Flow</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* HERO CARD: Dealership Profile + Official ADP Verified Badge */}
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            padding: '28px',
            marginBottom: '28px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(14, 165, 233, 0.35)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Building2 size={34} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    Metro West Automotive Group
                  </h2>
                  <AdpVerifiedBadge tier={selectedTier} size="md" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                  <span>Lic: <strong>DL-984210-CA</strong></span>
                  <span>•</span>
                  <span>Fremont, California</span>
                  <span>•</span>
                  <span>DMS: <strong>DealerSocket (Live Feed)</strong></span>
                  <span>•</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>● Trust Score: 99.8%</span>
                </div>
              </div>
            </div>

            {/* Verification Status Quick Pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div
                onClick={() => navigate('/omp/feed-sync')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: 'rgba(2, 132, 199, 0.08)',
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>DMS Auto-Feed</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0284c7' }}>184 Synced ➔</div>
              </div>

              <div
                onClick={() => navigate('/omp/top-leads')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>AI Buyer Radar</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>3 Hot Leads ➔</div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: VERIFIED DEALER UNLOCKED BENEFITS (Task V-02) */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#0284c7" />
                <span>Verified Dealer Tool Suite & Benefits (Task V-02)</span>
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Exclusive functionality unlocked by the {'{ADP Verified}'} status on OMP Deals.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
            {/* Benefit 1: Click-to-Call Instant Buyer Communication */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(2, 132, 199, 0.1)', padding: '8px', borderRadius: '8px', color: '#0284c7' }}>
                    <PhoneCall size={20} />
                  </div>
                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={clickToCallActive}
                      onChange={(e) => setClickToCallActive(e.target.checked)}
                      style={{ display: 'none' }}
                    />
                    <div
                      style={{
                        width: '40px',
                        height: '22px',
                        borderRadius: '9999px',
                        background: clickToCallActive ? '#0284c7' : 'var(--border)',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          position: 'absolute',
                          top: '2px',
                          left: clickToCallActive ? '20px' : '2px',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>
                  </label>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                  Click-to-Call Direct Connect
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: 1.4 }}>
                  Connect car shoppers directly to your sales desk with 1-click on all marketplace listings.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Routing: (510) 555-0199</span>
                <span style={{ color: clickToCallActive ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                  {clickToCallActive ? 'Active' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Benefit 2: DMS Automatic Inventory Sync */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '8px', color: '#10b981' }}>
                    <RefreshCw size={20} className={dmsSyncing ? 'animate-spin' : ''} />
                  </div>
                  <button
                    onClick={() => navigate('/omp/feed-sync')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--surface-secondary)',
                      border: '1px solid var(--border)',
                      color: '#0284c7',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Manage Feed
                  </button>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                  DMS Auto-Feed Sync
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: 1.4 }}>
                  Zero manual data entry. Your inventory syncs automatically directly from your DMS.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Last Synced: {lastSyncTime}</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>184 Active Lots</span>
              </div>
            </div>

            {/* Benefit 3: Carfax Integration */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '8px', borderRadius: '8px', color: '#d97706' }}>
                    <FileSpreadsheet size={20} />
                  </div>
                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={carfaxAutoAttach}
                      onChange={(e) => setCarfaxAutoAttach(e.target.checked)}
                      style={{ display: 'none' }}
                    />
                    <div
                      style={{
                        width: '40px',
                        height: '22px',
                        borderRadius: '9999px',
                        background: carfaxAutoAttach ? '#d97706' : 'var(--border)',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          position: 'absolute',
                          top: '2px',
                          left: carfaxAutoAttach ? '20px' : '2px',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    </div>
                  </label>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                  Carfax VHR Reports
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: 1.4 }}>
                  Automatic Carfax badge and 1-click VHR report viewing attached to every listing.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Account: Connected</span>
                <span style={{ color: carfaxAutoAttach ? '#d97706' : 'var(--text-secondary)', fontWeight: 600 }}>
                  {carfaxAutoAttach ? 'Auto-Attach ON' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Benefit 4: Top Lead Indicator */}
            <div
              onClick={() => navigate('/omp/top-leads')}
              style={{
                background: 'var(--surface)',
                borderRadius: '14px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '8px', color: '#ef4444' }}>
                    <Flame size={20} />
                  </div>
                  <span style={{ background: '#ef4444', color: '#ffffff', padding: '2px 8px', borderRadius: '9999px', fontSize: '10.5px', fontWeight: 700 }}>
                    AI RADAR
                  </span>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>
                  Top Lead Indicator
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: 1.4 }}>
                  AI analyzes buyer behavior to prioritize immediate ready-to-buy shoppers.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>3 Hot Buyers</span>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>Open Radar ➔</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: LIVE VEHICLE INVENTORY WITH {ADP VERIFIED} BADGES */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Car size={18} color="#10b981" />
                <span>Live Verified Dealership Inventory (Preview)</span>
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Every vehicle card automatically inherits the official {'{ADP Verified}'} badge, Carfax report link, and Top Lead indicator.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {[
              {
                stock: 'STK-8491',
                year: '2024',
                make: 'BMW',
                model: 'M4 Competition xDrive',
                price: '$86,400',
                mileage: '3,200 mi',
                leadStatus: 'Top Lead',
                img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=60',
              },
              {
                stock: 'STK-9210',
                year: '2023',
                make: 'Porsche',
                model: 'Taycan 4S Electric',
                price: '$92,500',
                mileage: '8,450 mi',
                leadStatus: 'Top Lead',
                img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=60',
              },
              {
                stock: 'STK-7301',
                year: '2022',
                make: 'Mercedes-Benz',
                model: 'AMG G63 4MATIC',
                price: '$168,900',
                mileage: '14,100 mi',
                leadStatus: 'Hot Deal',
                img: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=600&auto=format&fit=crop&q=60',
              },
            ].map((v, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden', background: '#020617' }}>
                  <img
                    src={v.img}
                    alt={`${v.year} ${v.make} ${v.model}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <AdpVerifiedBadge tier={selectedTier} size="sm" />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Flame size={12} />
                    <span>{v.leadStatus}</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '10px',
                      background: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(6px)',
                      color: '#38bdf8',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {v.stock}
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {v.year} {v.make} {v.model}
                    </h4>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#10b981' }}>{v.price}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{v.mileage}</span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      borderTop: '1px solid var(--border)',
                      paddingTop: '12px',
                    }}
                  >
                    <button
                      style={{
                        padding: '7px 10px',
                        borderRadius: '6px',
                        background: 'rgba(2, 132, 199, 0.1)',
                        border: '1px solid rgba(2, 132, 199, 0.3)',
                        color: '#0284c7',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Phone size={13} />
                      <span>Click-to-Call</span>
                    </button>
                    <button
                      onClick={() => navigate('/omp/top-leads')}
                      style={{
                        padding: '7px 10px',
                        borderRadius: '6px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Flame size={13} />
                      <span>Top Leads</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedDealerDashboard;
