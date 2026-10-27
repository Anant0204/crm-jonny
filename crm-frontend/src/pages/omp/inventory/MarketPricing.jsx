import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  Sliders,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  ExternalLink,
  Car,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const MarketPricing = () => {
  const navigate = useNavigate();

  const [vehicleQuery, setVehicleQuery] = useState('2024 Chevrolet Corvette Stingray 2LT');
  const [selectedStrategy, setSelectedStrategy] = useState('balanced'); // aggressive | balanced | premium
  const [lotPrice, setLotPrice] = useState(81500);

  const marketData = {
    lowestPrice: '$76,990',
    medianPrice: '$81,900',
    highestPrice: '$87,500',
    totalCompeting: 24,
    marketDaysSupply: '31 Days (High Velocity)',
    averageMileage: '3,800 miles',
    competingListings: [
      { dealer: 'NorCal Chevy Fremont', price: '$77,500', mileage: '4,500 mi', dist: '12 mi', rank: 'Lowest 15%' },
      { dealer: 'Silicon Valley Motors', price: '$81,900', mileage: '3,100 mi', dist: '18 mi', rank: 'Market Median' },
      { dealer: 'San Jose Exotic Auto', price: '$86,400', mileage: '1,900 mi', dist: '24 mi', rank: 'Premium 15%' },
    ],
  };

  const strategies = [
    {
      id: 'aggressive',
      title: 'Aggressive Quick-Turn',
      price: '$78,900',
      marketPercent: '96% of Market',
      estTurnTime: 'Turn in 7 - 12 days',
      margin: '+$7,700 Gross Profit',
    },
    {
      id: 'balanced',
      title: 'Balanced Optimal Margin',
      price: '$81,500',
      marketPercent: '99% of Market',
      recommended: true,
      estTurnTime: 'Turn in 18 - 25 days',
      margin: '+$10,300 Gross Profit',
    },
    {
      id: 'premium',
      title: 'Maximum Gross Profit',
      price: '$84,900',
      marketPercent: '103% of Market',
      estTurnTime: 'Turn in 35 - 45 days',
      margin: '+$13,700 Gross Profit',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px 20px 80px',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                OMP Deals • Pillar 1 (Stock the Lot)
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>/</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>AI RealPrice™ Market Pricing (Task E-03)</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>AI Market Pricing (AIMP)</span>
              <span style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                RealPrice™ Scanner
              </span>
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/omp/vin-scanner')}
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
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={14} />
              <span>VIN Scanner</span>
            </button>

            <button
              onClick={() => navigate('/omp/title-search')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#0284c7',
                border: 'none',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>Next: Auto Lien & Title (E-04)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 3 Price Markers: Lowest, Median, Highest */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {/* Lowest */}
          <div style={{ background: 'var(--surface)', borderRadius: '14px', border: '1px solid var(--border)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Lowest Market Price</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0284c7', marginBottom: '4px' }}>{marketData.lowestPrice}</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>Bottom 10% of radius listings</div>
          </div>

          {/* Median */}
          <div style={{ background: 'var(--surface)', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '12px', color: '#10b981', marginBottom: '4px', fontWeight: 600 }}>Median Market Price (Fair)</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>{marketData.medianPrice}</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>50th Percentile Market Benchmark</div>
          </div>

          {/* Highest */}
          <div style={{ background: 'var(--surface)', borderRadius: '14px', border: '1px solid var(--border)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Highest Market Price</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#f59e0b', marginBottom: '4px' }}>{marketData.highestPrice}</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>Top tier dealer pricing</div>
          </div>

          {/* Market Days Supply */}
          <div style={{ background: 'var(--surface)', borderRadius: '14px', border: '1px solid var(--border)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Market Velocity (MDS)</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{marketData.marketDaysSupply}</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>24 competing vehicles within 50 mi</div>
          </div>
        </div>

        {/* AI PRICING STRATEGY SELECTOR */}
        <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '24px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#0284c7" />
            <span>AI Recommended Lot Pricing Strategies</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {strategies.map((strat) => {
              const isSelected = selectedStrategy === strat.id;

              return (
                <div
                  key={strat.id}
                  onClick={() => setSelectedStrategy(strat.id)}
                  style={{
                    background: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'var(--surface-secondary)',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #0284c7' : '1px solid var(--border)',
                    padding: '20px',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {strat.recommended && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '16px',
                        background: '#0284c7',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                      }}
                    >
                      AI Recommended
                    </span>
                  )}

                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {strat.title}
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981', marginBottom: '8px' }}>
                    {strat.price}
                  </div>
                  <div style={{ fontSize: '12px', color: '#0284c7', marginBottom: '4px', fontWeight: 600 }}>{strat.marketPercent}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{strat.estTurnTime}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                    {strat.margin}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => alert('Updated DMS lot price to $81,500 successfully!')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: '#10b981',
                border: 'none',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <CheckCircle2 size={16} />
              <span>Apply Price to DMS & Marketplace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPricing;
