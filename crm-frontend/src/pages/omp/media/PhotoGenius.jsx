import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Download,
  RotateCcw,
  Zap,
  Eye
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const PhotoGenius = () => {
  const navigate = useNavigate();

  const [selectedAngle, setSelectedAngle] = useState('front_three_quarter');
  const [activeBackground, setActiveBackground] = useState('neon_vault');
  const [showOriginal, setShowOriginal] = useState(false);

  const angles = [
    { id: 'front_three_quarter', label: '1. Front 3/4 Angle (Hero)', completed: true },
    { id: 'side_profile', label: '2. Side Profile View', completed: true },
    { id: 'rear_three_quarter', label: '3. Rear 3/4 Angle', completed: true },
    { id: 'cockpit_interior', label: '4. Driver Cockpit & Dash', completed: true },
    { id: 'engine_bay', label: '5. Engine Bay & Wheels', completed: false },
  ];

  const backgrounds = [
    { id: 'neon_vault', name: 'Cyber Neon Auto Vault', color: '#0ea5e9' },
    { id: 'luxury_showroom', name: 'Modern Glass Showroom', color: '#10b981' },
    { id: 'clean_white', name: 'Ultra-Clean White Studio', color: '#f1f5f9' },
    { id: 'sunset_boulevard', name: 'California Coastal Sunset', color: '#f59e0b' },
    { id: 'dark_carbon', name: 'Dark Carbon Fiber Lounge', color: '#8b5cf6' },
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
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>AI Photo Genius & Multiverse BG (Task E-06)</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>AI Photo Genius & Multiverse Backgrounds</span>
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Mobile guided photo angles + 1-click 100+ professional studio background replacements.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/omp/recon-center')}
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
              <span>Recon Center</span>
            </button>

            <button
              onClick={() => navigate('/omp/postmaster')}
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
              <span>Next: AI Postmaster (E-07)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* MAIN STUDIO GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {/* Left: Studio Canvas Preview */}
          <div>
            <div
              style={{
                background: '#020617',
                borderRadius: '16px',
                height: '380px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '16px',
              }}
            >
              {/* Car Photo with Multiverse Studio Effect */}
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1000&auto=format&fit=crop&q=80"
                alt="Studio Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: showOriginal ? 'none' : 'contrast(1.08) brightness(1.03)',
                }}
              />

              {/* Multiverse Studio Lighting Overlay */}
              {!showOriginal && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      activeBackground === 'neon_vault'
                        ? 'radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.15) 0%, rgba(0, 0, 0, 0.6) 100%)'
                        : activeBackground === 'luxury_showroom'
                        ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)'
                        : 'none',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Floating ADP Badge */}
              <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                <AdpVerifiedBadge tier="franchise" size="sm" />
              </div>

              {/* Before/After Toggle Button */}
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '14px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Eye size={13} />
                <span>{showOriginal ? 'Showing Cluttered Lot (Original)' : 'Showing AI Multiverse Studio'}</span>
              </button>
            </div>

            {/* Background Selector Chips */}
            <div style={{ background: 'var(--surface)', borderRadius: '14px', border: '1px solid var(--border)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                Select 1-Click AI Studio Background:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      setActiveBackground(bg.id);
                      setShowOriginal(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: activeBackground === bg.id ? 'rgba(2, 132, 199, 0.12)' : 'var(--surface-secondary)',
                      border: activeBackground === bg.id ? '1px solid #0284c7' : '1px solid var(--border)',
                      color: activeBackground === bg.id ? '#0284c7' : 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Guided Mobile Angle Checklist */}
          <div>
            <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={18} color="#0284c7" />
                <span>AI Guided Photography Mobile Checklist</span>
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Step-by-step angle prompts ensure every vehicle meets high-converting marketplace standards.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {angles.map((ang) => {
                  const isSelected = selectedAngle === ang.id;

                  return (
                    <div
                      key={ang.id}
                      onClick={() => setSelectedAngle(ang.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        background: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'var(--surface-secondary)',
                        border: isSelected ? '1px solid #0284c7' : '1px solid var(--border)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 600, color: isSelected ? '#0284c7' : 'var(--text-primary)' }}>
                        {ang.label}
                      </span>
                      {ang.completed ? (
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700 }}>
                          <CheckCircle2 size={15} /> Captured
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Pending</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => alert('Exporting all studio photos with ADP badge to DMS lot...')}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: '#0284c7',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Save to Dealership Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGenius;
