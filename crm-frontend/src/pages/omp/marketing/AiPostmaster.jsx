import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Share2,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Layers,
  Copy,
  Check,
  Globe,
  Sliders
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const AiPostmaster = () => {
  const navigate = useNavigate();

  const [platforms, setPlatforms] = useState([
    { id: 'facebook', name: 'Facebook Marketplace', icon: 'FB', connected: true, selected: true, status: 'Ready to Post' },
    { id: 'cargurus', name: 'CarGurus Feed', icon: 'CG', connected: true, selected: true, status: 'Ready to Post' },
    { id: 'autotrader', name: 'AutoTrader / Cox', icon: 'AT', connected: true, selected: true, status: 'Ready to Post' },
    { id: 'craigslist', name: 'Craigslist Automated Post', icon: 'CL', connected: true, selected: true, status: 'Ready to Post' },
    { id: 'google_ads', name: 'Google Vehicle Ads', icon: 'G', connected: true, selected: true, status: 'Ready to Post' },
  ]);

  const [isPosting, setIsPosting] = useState(false);
  const [postedSuccess, setPostedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const [generatedCopy, setGeneratedCopy] = useState(
    `🔥 2024 CHEVROLET CORVETTE STINGRAY 2LT COUPE - 1-OWNER LOW MILES!

📍 AVAILABLE AT: Metro West Automotive Group (OMP {ADP Verified} Dealer)
📞 CALL / TEXT NOW: (510) 555-0199 (Direct Sales Desk)

⭐ VEHICLE HIGHLIGHTS:
• Stock #: STK-8491 | Mileage: Only 3,200 miles!
• Engine: 6.2L V8 DI HP Engine with 8-Speed Dual Clutch Transmission
• Color: Torch Red Exterior over Jet Black Mulan Leather
• Clean Carfax: Single Owner, Zero Accidents, California Clean Title!

💳 FINANCING & NATIONWIDE DELIVERY:
• In-House Financing & Prime Auto Loans available on OAL Network!
• 60-Second Instant Payment Desking available on our website.
• Nationwide Doorstep Shipping Available with full insurance.

🛡️ BUY WITH CONFIDENCE:
This vehicle has passed our rigorous 150-Point Inspection and is protected under the OMP Deals Verified Dealer Warranty Guarantee.`
  );

  const handlePostAll = () => {
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setPostedSuccess(true);
    }, 1600);
  };

  const handleCopyCopy = () => {
    navigator.clipboard?.writeText(generatedCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                OMP Deals • Pillar 2 (Attract Buyers)
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>/</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>AI Postmaster Multi-Lister (Task E-07)</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>AI Postmaster (AIPM) Multi-Lister</span>
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              1-Click simultaneous vehicle syndication across Facebook Marketplace, CarGurus, AutoTrader, and Craigslist.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/omp/photo-genius')}
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
              <span>Photo Genius</span>
            </button>

            <button
              onClick={() => navigate('/omp/web-builder')}
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
              <span>Next: Web Builder & 4K Video (E-08..E-10)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* MAIN POSTMASTER GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {/* Left: AI Generated Sales Description */}
          <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#0284c7" />
                <span>AI Generated Sales Listing Copy</span>
              </h3>
              <button
                onClick={handleCopyCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  color: copied ? '#10b981' : 'var(--text-primary)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <textarea
              value={generatedCopy}
              onChange={(e) => setGeneratedCopy(e.target.value)}
              rows={16}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                background: 'var(--background)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '12.5px',
                fontFamily: 'monospace',
                lineHeight: 1.5,
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Right: Multi-Platform Syndication Channels */}
          <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Target Marketplace Syndication Channels
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Select channels to syndicate this vehicle simultaneously in 1 click.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {platforms.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setPlatforms(
                      platforms.map((item) => (item.id === p.id ? { ...item, selected: !item.selected } : item))
                    );
                  }}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: p.selected ? 'rgba(2, 132, 199, 0.08)' : 'var(--surface-secondary)',
                    border: p.selected ? '1px solid #0284c7' : '1px solid var(--border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: '#0284c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '11px',
                      }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#10b981' }}>Connected (Auto-Sync Live)</div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: postedSuccess ? '#10b981' : p.selected ? '#0284c7' : 'var(--text-tertiary)',
                    }}
                  >
                    {postedSuccess ? 'Published ✓' : p.selected ? 'Selected' : 'Skip'}
                  </span>
                </div>
              ))}
            </div>

            {/* 1-Click Multi-Lister Button */}
            <button
              onClick={handlePostAll}
              disabled={isPosting}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                background: postedSuccess
                  ? '#10b981'
                  : '#0284c7',
                border: 'none',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: isPosting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Send size={16} className={isPosting ? 'animate-spin' : ''} />
              <span>
                {isPosting
                  ? 'Syndicating across 5 Platforms...'
                  : postedSuccess
                  ? 'Posted to All 5 Channels Successfully! ✓'
                  : '1-Click Multi-Post to All 5 Platforms'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPostmaster;
