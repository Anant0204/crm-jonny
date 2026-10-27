import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  CheckCircle2,
  Clock,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Plus,
  Car,
  AlertCircle,
  FileSpreadsheet,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const ReconCenter = () => {
  const navigate = useNavigate();

  const [activeStage, setActiveStage] = useState('all');

  const reconVehicles = [
    {
      stock: 'STK-8491',
      title: '2024 Chevrolet Corvette Stingray',
      vin: '1G1YB2D47H5108491',
      stage: 'Front-Lot Ready',
      stageIndex: 4,
      acquireCost: '$71,200',
      partsCost: '$450',
      laborCost: '$650',
      detailCost: '$250',
      totalCost: '$72,550',
      listPrice: '$81,500',
      estMargin: '+$8,950',
      roNumber: 'RO-49021',
      tech: 'Marcus (Lead Tech)',
      completedTasks: ['150-Point Mechanical Inspection', 'Oil & Filter Change', 'Paint Correction Detail'],
    },
    {
      stock: 'STK-9210',
      title: '2023 Porsche Taycan 4S Electric',
      vin: 'WBA33AY05PFP92104',
      stage: 'Detail / Clean',
      stageIndex: 3,
      acquireCost: '$76,000',
      partsCost: '$800',
      laborCost: '$550',
      detailCost: '$300',
      totalCost: '$77,650',
      listPrice: '$84,500',
      estMargin: '+$6,850',
      roNumber: 'RO-49022',
      tech: 'Sarah (Detail Specialist)',
      completedTasks: ['High-Voltage Battery Diagnostic', 'Cabin Filter Replacement'],
    },
    {
      stock: 'STK-7301',
      title: '2022 Mercedes-Benz AMG G63',
      vin: 'WP0AB2A99NS168902',
      stage: 'Mechanical Recon',
      stageIndex: 2,
      acquireCost: '$112,500',
      partsCost: '$1,800',
      laborCost: '$1,200',
      detailCost: '$0',
      totalCost: '$115,500',
      listPrice: '$124,900',
      estMargin: '+$9,400',
      roNumber: 'RO-49023',
      tech: 'David (Master Mercedes Tech)',
      completedTasks: ['Front Brake Rotors & Ceramic Pads'],
    },
  ];

  const stages = [
    { id: 1, name: '1. Purchased' },
    { id: 2, name: '2. Mechanical Recon' },
    { id: 3, name: '3. Detail / Clean' },
    { id: 4, name: '4. Front-Lot Ready' },
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
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                OMP Deals • Pillar 1 (Stock the Lot)
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>/</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Repair Order Management (Task E-05)</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>Reconditioning Center (ROM)</span>
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Track vehicle recon costs, repair orders (RO), and parts from purchase to front-lot ready.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/omp/title-search')}
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
              <span>Title Search</span>
            </button>

            <button
              onClick={() => navigate('/omp/photo-genius')}
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
              <span>Next: AI Photo Genius (E-06)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* PIPELINE CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reconVehicles.map((car) => (
            <div
              key={car.stock}
              style={{
                background: 'var(--surface)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                padding: '22px 24px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700 }}>{car.stock}</span>
                    <span>•</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{car.vin}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    {car.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    Active RO: <strong>{car.roNumber}</strong> • Assigned Tech: <strong>{car.tech}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Total Vehicle Investment</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>{car.totalCost}</div>
                  <div style={{ fontSize: '11.5px', color: '#10b981' }}>Projected Margin: {car.estMargin}</div>
                </div>
              </div>

              {/* Progress Stage Tracker */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {stages.map((st) => {
                  const isCurrent = car.stageIndex === st.id;
                  const isDone = car.stageIndex >= st.id;

                  return (
                    <div
                      key={st.id}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        background: isDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--surface-secondary)',
                        border: isCurrent
                          ? '1px solid #10b981'
                          : isDone
                          ? '1px solid rgba(16, 185, 129, 0.3)'
                          : '1px solid var(--border)',
                        textAlign: 'center',
                        fontSize: '11.5px',
                        fontWeight: isDone ? 700 : 500,
                        color: isDone ? '#10b981' : 'var(--text-tertiary)',
                      }}
                    >
                      {st.name}
                    </div>
                  );
                })}
              </div>

              {/* Cost Breakdown Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '8px',
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Buy Cost: </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{car.acquireCost}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Parts: </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{car.partsCost}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Labor: </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{car.laborCost}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Detail: </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{car.detailCost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReconCenter;
