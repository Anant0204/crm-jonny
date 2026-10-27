import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Truck,
  Phone,
  MessageSquare,
  FileSpreadsheet,
  Share2,
  Heart,
  Calendar,
  Gauge,
  Zap,
  Info,
  DollarSign,
  Award,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const VehicleListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shippingZip, setShippingZip] = useState('75001 (Dallas, TX)');
  const [shippingCalculated, setShippingCalculated] = useState(true);
  const [shippingQuote, setShippingQuote] = useState('$850.00');
  const [inquirySent, setInquirySent] = useState(false);

  const vehicle = {
    id: id || 'LST-101',
    title: '2024 BMW M4 Competition xDrive Coupe',
    vin: 'WBA33AY05PFP92104',
    stock: 'STK-8491',
    price: '$86,400',
    estPayment: '$1,180 / mo (60s Desking)',
    mileage: '3,200 miles',
    engine: '3.0L BMW M TwinPower Turbo Inline 6-Cylinder',
    transmission: '8-Speed M Steptronic with Drivelogic',
    exteriorColor: 'Isle of Man Green Metallic',
    interiorColor: 'Kyalami Orange / Black Merino Leather',
    location: 'Fremont, CA (4 miles away)',
    seller: 'Metro West Automotive Group',
    sellerType: 'ADP_VERIFIED',
    sellerTier: 'franchise',
    sellerRating: '4.9 ★ (148 verified dealer reviews)',
    truYou: true,
    safeMeetupSpot: 'Fremont Police Dept - Safe Exchange Lot',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1000&auto=format&fit=crop&q=80',
    ],
  };

  const [activeImage, setActiveImage] = useState(0);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px 20px 80px',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => navigate('/omp/marketplace')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: '#0ea5e9',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Marketplace</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => navigate('/omp/verified-dealer')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '12.5px',
                cursor: 'pointer',
              }}
            >
              Dealer Hub
            </button>
            <button
              onClick={() => navigate('/omp/top-leads')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Lead Radar
            </button>
          </div>
        </div>

        {/* Main Grid: Gallery & Dealer Buy Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '32px' }}>
          {/* LEFT: Photo Gallery & Vehicle Highlights */}
          <div>
            {/* Big Main Image */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--surface)',
                height: '380px',
                marginBottom: '12px',
                border: '1px solid var(--border)',
                position: 'relative',
              }}
            >
              <img
                src={vehicle.images[activeImage]}
                alt={vehicle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                <AdpVerifiedBadge tier={vehicle.sellerTier} size="md" />
              </div>
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              {vehicle.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: '80px',
                    height: '60px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: activeImage === i ? '2px solid #0ea5e9' : '1px solid var(--border)',
                  }}
                >
                  <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Specifications Card */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                padding: '20px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px', color: 'var(--text-primary)' }}>
                Vehicle Specifications
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '13px' }}>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>VIN</div>
                  <div style={{ fontWeight: 600, color: '#0ea5e9', fontFamily: 'monospace' }}>{vehicle.vin}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Stock #</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{vehicle.stock}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Mileage</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{vehicle.mileage}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Engine</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{vehicle.engine}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Transmission</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{vehicle.transmission}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)' }}>Color</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{vehicle.exteriorColor}</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Price, Action Card, Shipping Calculator & Safe MeetUp */}
          <div>
            {/* Listing Summary Card */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                padding: '24px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase' }}>
                  ADP VERIFIED DEALER LISTING
                </span>
                <span>•</span>
                <span style={{ fontSize: '11.5px', color: '#10b981' }}>Clean Title • 1-Owner</span>
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 12px', color: 'var(--text-primary)' }}>
                {vehicle.title}
              </h2>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#10b981' }}>{vehicle.price}</div>
                <div style={{ fontSize: '13px', color: '#0ea5e9', fontWeight: 600 }}>
                  Est. {vehicle.estPayment}
                </div>
              </div>

              {/* Action Buttons: Click-to-Call + Message */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <button
                  onClick={() => alert('Connecting sales desk at (510) 555-0199...')}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'linear-gradient(90deg, #10b981, #059669)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Phone size={16} />
                  <span>Click-to-Call Dealer</span>
                </button>

                <button
                  onClick={() => setInquirySent(true)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'linear-gradient(90deg, #0284c7, #0ea5e9)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <MessageSquare size={16} />
                  <span>{inquirySent ? 'Message Sent ✓' : 'Send Offer / Inquiry'}</span>
                </button>
              </div>

              {/* Carfax Report Quick Button */}
              <div
                style={{
                  background: 'rgba(234, 179, 8, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileSpreadsheet size={20} color="#eab308" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Carfax Vehicle History Report</div>
                    <div style={{ fontSize: '11px', color: '#facc15' }}>No accidents reported • Single Owner</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Opening official Carfax verification report...')}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    background: '#eab308',
                    border: 'none',
                    color: '#000000',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  View VHR
                </button>
              </div>
            </div>

            {/* NATIONWIDE SHIPPING MODULE (Task O-03) */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Truck size={18} color="#10b981" />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Nationwide Doorstep Shipping & Protection (Task O-03)
                </h3>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Insured carrier transport directly to your driveway. Buyer protection guaranteed.
              </p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={shippingZip}
                  onChange={(e) => setShippingZip(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                  }}
                />
                <button
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: '#34d399',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Quote
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <span>Estimated Freight & Insurance:</span>
                <span style={{ fontWeight: 800, color: '#10b981' }}>{shippingQuote}</span>
              </div>
            </div>

            {/* POLICE SAFE MEETUP SPOT (Task O-05) */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={18} color="#10b981" />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Designated Police Safe MeetUp Location (Task O-05)
                </h3>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '2px' }}>
                {vehicle.safeMeetupSpot}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                2000 Stevenson Blvd, Fremont, CA 94538 (2.8 mi)
              </div>
              <div style={{ fontSize: '11px', color: '#10b981' }}>
                ✓ 24/7 Police Department video surveillance and marked transaction parking spots.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleListingDetail;
