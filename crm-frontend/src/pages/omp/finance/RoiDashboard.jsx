import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart2,
  Car,
  Calendar,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';

export const RoiDashboard = () => {
  const [timeframe, setTimeframe] = useState('mtd');

  const soldVehicles = [
    {
      stock: 'STK-8492',
      vehicle: '2021 Ford F-150 Lariat',
      salePrice: '$34,990',
      trueCost: '$29,400',
      frontGross: '+$5,590',
      backGross: '+$1,450',
      totalGross: '+$7,040',
      roi: '23.9%',
      salesRep: 'Marcus Vance',
      daysOnLot: '14 Days',
    },
    {
      stock: 'STK-9102',
      vehicle: '2022 Honda CR-V EX-L',
      salePrice: '$27,850',
      trueCost: '$24,200',
      frontGross: '+$3,650',
      backGross: '+$1,200',
      totalGross: '+$4,850',
      roi: '20.0%',
      salesRep: 'Elena Rostova',
      daysOnLot: '9 Days',
    },
    {
      stock: 'STK-7721',
      vehicle: '2020 Chevrolet Silverado 1500',
      salePrice: '$31,400',
      trueCost: '$28,100',
      frontGross: '+$3,300',
      backGross: '+$850',
      totalGross: '+$4,150',
      roi: '14.7%',
      salesRep: 'James Sterling',
      daysOnLot: '28 Days',
    },
    {
      stock: 'STK-6610',
      vehicle: '2021 Tesla Model 3 Long Range',
      salePrice: '$28,900',
      trueCost: '$26,400',
      frontGross: '+$2,500',
      backGross: '+$600',
      totalGross: '+$3,100',
      roi: '11.7%',
      salesRep: 'Marcus Vance',
      daysOnLot: '34 Days',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.1))', color: 'var(--primary)', border: '1px solid var(--border)' }}>
              TASK E-16 • PILLAR 4
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gross Margin & Net Yield Analytics</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Real-Time ROI Profit Matrix
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Granular front-end gross margin, back-end finance reserve yields, and per-sold-unit return on capital tracking.
          </p>
        </div>

        {/* Timeframe Filter */}
        <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: 'var(--surface)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          {['Today', 'This Week', 'mtd', 'Last Quarter', 'YTD'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                backgroundColor: timeframe === t ? 'var(--primary)' : 'transparent',
                color: timeframe === t ? 'var(--text-on-primary, #fff)' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <span>Total Front-End Gross</span>
            <DollarSign size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '0.4rem' }}>
            $124,800
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
            Avg $2,189 / Unit sold
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <span>Total Back-End Gross (F&I)</span>
            <Award size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.4rem' }}>
            $47,850
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
            Avg $839 / Unit (Lender Reserve + GAP)
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <span>Average Lot Turn Time</span>
            <Calendar size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.4rem' }}>
            21.4 <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Days</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.3rem' }}>
            <ArrowDownRight size={13} style={{ display: 'inline' }} /> 4.2 days faster than national avg
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <span>Average Deal ROI</span>
            <TrendingUp size={18} color="#a855f7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7', marginTop: '0.4rem' }}>
            19.8%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.3rem' }}>
            Net return on capital deployed
          </div>
        </div>
      </div>

      {/* Sold Units Ledger & Breakdown */}
      <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Recent Vehicle Sales & Realized Profit Ledger
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
            Front vs Back profit breakdown per stock item delivered
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Stock # & Vehicle</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Sold Price</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>True Cost</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Front Gross</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Back (F&I)</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Total Profit</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Deal ROI</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Turn Days</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Salesperson</th>
              </tr>
            </thead>
            <tbody>
              {soldVehicles.map((v, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{v.vehicle}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>{v.stock}</div>
                  </td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{v.salePrice}</td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>{v.trueCost}</td>
                  <td style={{ padding: '1rem 1rem', color: '#10b981', fontWeight: 600 }}>{v.frontGross}</td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--primary)', fontWeight: 600 }}>{v.backGross}</td>
                  <td style={{ padding: '1rem 1rem', color: '#10b981', fontWeight: 800, fontSize: '0.95rem' }}>{v.totalGross}</td>
                  <td style={{ padding: '1rem 1rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                      {v.roi}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>{v.daysOnLot}</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-primary)' }}>{v.salesRep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoiDashboard;
