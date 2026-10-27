import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ShieldCheck,
  Truck,
  Building2,
  SlidersHorizontal,
  Flame,
  Heart,
  ChevronDown,
  Navigation,
  ArrowRight,
  ArrowLeft,
  Info,
  Phone,
  MessageCircle,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  Award,
  AlertTriangle
} from 'lucide-react';
import { AdpVerifiedBadge } from '../../../components/omp/AdpVerifiedBadge';

export const OmpMarketplace = () => {
  const navigate = useNavigate();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRadius, setSelectedRadius] = useState('50'); // 15 | 30 | 50 | Nationwide
  const [locationZip, setLocationZip] = useState('94538 (Fremont, CA)');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [shippingOnly, setShippingOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [policeSpotModal, setPoliceSpotModal] = useState(false);

  // Marketplace Listings (Hybrid OfferUp + Verified Dealers)
  const listings = [
    {
      id: 'LST-101',
      title: '2024 BMW M4 Competition xDrive',
      price: '$86,400',
      rawPrice: 86400,
      mileage: '3,200 mi',
      location: 'Fremont, CA (4 miles away)',
      seller: 'Metro West Auto Group',
      sellerType: 'ADP_VERIFIED',
      sellerTier: 'franchise',
      truYou: true,
      shippingEligible: true,
      shippingFee: '$850 (Nationwide Enclosed)',
      safeMeetupAvailable: true,
      carfaxClean: true,
      leadStatus: 'HOT DEAL',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&auto=format&fit=crop&q=70',
      posted: '2 hours ago',
    },
    {
      id: 'LST-102',
      title: '2023 Porsche Taycan 4S Electric',
      price: '$92,500',
      rawPrice: 92500,
      mileage: '8,450 mi',
      location: 'San Jose, CA (14 miles away)',
      seller: 'Silicon Valley Auto Vault',
      sellerType: 'ADP_VERIFIED',
      sellerTier: 'large',
      truYou: true,
      shippingEligible: true,
      shippingFee: '$920 (Nationwide Enclosed)',
      safeMeetupAvailable: true,
      carfaxClean: true,
      leadStatus: 'HOT DEAL',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=700&auto=format&fit=crop&q=70',
      posted: 'Today',
    },
    {
      id: 'LST-103',
      title: '2021 Ford Mustang Mach 1',
      price: '$49,990',
      rawPrice: 49990,
      mileage: '18,300 mi',
      location: 'Oakland, CA (22 miles away)',
      seller: 'Private Seller (Alex M.)',
      sellerType: 'PRIVATE',
      truYou: true, // TruYou Verified identity
      shippingEligible: false,
      shippingFee: 'Local Pickup Only',
      safeMeetupAvailable: true,
      carfaxClean: true,
      leadStatus: 'VERIFIED SELLER',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&auto=format&fit=crop&q=70',
      posted: 'Yesterday',
    },
    {
      id: 'LST-104',
      title: '2022 Mercedes-AMG G63 4MATIC',
      price: '$168,900',
      rawPrice: 168900,
      mileage: '14,100 mi',
      location: 'San Francisco, CA (28 miles away)',
      seller: 'Bay Area Prestige Motors',
      sellerType: 'ADP_VERIFIED',
      sellerTier: 'large',
      truYou: true,
      shippingEligible: true,
      shippingFee: '$1,200 (Nationwide)',
      safeMeetupAvailable: true,
      carfaxClean: true,
      leadStatus: 'RARE SPEC',
      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=700&auto=format&fit=crop&q=70',
      posted: '3 days ago',
    },
    {
      id: 'LST-105',
      title: '2023 Chevrolet Corvette Stingray 2LT',
      price: '$79,900',
      rawPrice: 79900,
      mileage: '4,100 mi',
      location: 'Pleasanton, CA (11 miles away)',
      seller: 'Tri-Valley Sports Cars',
      sellerType: 'ADP_VERIFIED',
      sellerTier: 'small',
      truYou: true,
      shippingEligible: true,
      shippingFee: '$800 (Nationwide)',
      safeMeetupAvailable: true,
      carfaxClean: true,
      leadStatus: 'HOT DEAL',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&auto=format&fit=crop&q=70',
      posted: 'Just now',
    },
    {
      id: 'LST-106',
      title: '2022 Toyota Tacoma TRD Pro 4x4',
      price: '$44,500',
      rawPrice: 44500,
      mileage: '24,600 mi',
      location: 'Hayward, CA (8 miles away)',
      seller: 'Private Seller (Dan K.)',
      sellerType: 'PRIVATE',
      truYou: true,
      shippingEligible: false,
      shippingFee: 'Local Pickup Only',
      safeMeetupAvailable: true,
      carfaxClean: true,
      leadStatus: '1-OWNER',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&auto=format&fit=crop&q=70',
      posted: '4 hours ago',
    },
  ];

  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (verifiedOnly && item.sellerType !== 'ADP_VERIFIED') return false;
    if (shippingOnly && !item.shippingEligible) return false;
    return true;
  });

  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '0.5rem 0.5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Top Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                OMP Deals Marketplace
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>•</span>
              <span style={{ fontSize: '11.5px', color: '#10b981', fontWeight: 600 }}>Hybrid OfferUp + Verified Dealers</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Buy & Sell Vehicles Locally or Nationwide
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => navigate('/omp/verified-dealer')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={14} />
              <span>Dealer Hub</span>
            </button>

            <button
              onClick={() => setPoliceSpotModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#10b981',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <ShieldCheck size={15} />
              <span>1,600+ Safe MeetUp Spots</span>
            </button>
          </div>
        </div>

        {/* SEARCH & GEO-RADIUS BAR (OfferUp Core O-01) */}
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            padding: '18px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          {/* Main Keyword Search */}
          <div
            style={{
              flex: 1,
              minWidth: '260px',
              display: 'flex',
              alignItems: 'center',
              background: 'var(--background)',
              borderRadius: '10px',
              padding: '10px 14px',
              border: '1px solid var(--border)',
              gap: '10px',
            }}
          >
            <Search size={18} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="Search make, model, or dealer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '14px',
                width: '100%',
              }}
            />
          </div>

          {/* Geo-Location & Radius Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--background)',
              borderRadius: '10px',
              padding: '10px 14px',
              border: '1px solid var(--border)',
              gap: '8px',
            }}
          >
            <MapPin size={16} color="var(--primary)" />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{locationZip}</span>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '13px',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
                marginLeft: '4px',
              }}
            >
              <option value="15" style={{ background: 'var(--surface)', color: 'var(--text-primary)' }}>Within 15 mi</option>
              <option value="30" style={{ background: 'var(--surface)', color: 'var(--text-primary)' }}>Within 30 mi</option>
              <option value="50" style={{ background: 'var(--surface)', color: 'var(--text-primary)' }}>Within 50 mi</option>
              <option value="nationwide" style={{ background: 'var(--surface)', color: 'var(--text-primary)' }}>Nationwide</option>
            </select>
          </div>

          {/* Quick Filter Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              style={{
                padding: '9px 14px',
                borderRadius: '8px',
                background: verifiedOnly ? 'var(--primary-subtle, rgba(14, 165, 233, 0.15))' : 'var(--background)',
                border: verifiedOnly ? '1px solid var(--primary)' : '1px solid var(--border)',
                color: verifiedOnly ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ShieldCheck size={14} />
              <span>ADP Verified Only</span>
            </button>

            <button
              onClick={() => setShippingOnly(!shippingOnly)}
              style={{
                padding: '9px 14px',
                borderRadius: '8px',
                background: shippingOnly ? 'rgba(16, 185, 129, 0.15)' : 'var(--background)',
                border: shippingOnly ? '1px solid #10b981' : '1px solid var(--border)',
                color: shippingOnly ? '#10b981' : 'var(--text-secondary)',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Truck size={14} />
              <span>Nationwide Shipping</span>
            </button>
          </div>
        </div>

        {/* TRUST BANNER: TruYou + Police Spots + Shipping Protection */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            marginBottom: '28px',
          }}
        >
          {/* Trust Feature 1: TruYou */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ background: 'var(--primary-subtle, rgba(14, 165, 233, 0.15))', padding: '8px', borderRadius: '8px', color: 'var(--primary)' }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>TruYou Identity Protected</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Confirmed real buyers & sellers</div>
            </div>
          </div>

          {/* Trust Feature 2: Safe Meetup */}
          <div
            onClick={() => setPoliceSpotModal(true)}
            style={{
              background: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '8px', borderRadius: '8px', color: '#10b981' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>1,600+ Police Safe Spots</div>
              <div style={{ fontSize: '11px', color: '#10b981' }}>Click to view Fremont PD spots ➔</div>
            </div>
          </div>

          {/* Trust Feature 3: Shipping */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ background: 'rgba(234, 179, 8, 0.15)', padding: '8px', borderRadius: '8px', color: '#eab308' }}>
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Buyer Protection & Shipping</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Insured nationwide doorstep delivery</div>
            </div>
          </div>
        </div>

        {/* LISTINGS GRID */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Vehicles for Sale ({filteredListings.length})
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Sorted by: Proximity & Verified Trust</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredListings.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/omp/marketplace/${item.id}`)}
                style={{
                  background: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Image & Badges */}
                <div style={{ position: 'relative', height: '190px', background: 'var(--surface-secondary)', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Top Left: Verified Badge */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    {item.sellerType === 'ADP_VERIFIED' ? (
                      <AdpVerifiedBadge tier={item.sellerTier} size="sm" />
                    ) : (
                      <span
                        style={{
                          background: 'rgba(16, 185, 129, 0.9)',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <ShieldCheck size={12} />
                        TruYou ID Verified
                      </span>
                    )}
                  </div>

                  {/* Top Right: Lead / Spec Status */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.leadStatus}
                  </div>

                  {/* Bottom Bar on Image: Shipping / Local */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '10px',
                      right: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(4px)',
                        color: '#38bdf8',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <MapPin size={11} />
                      {item.location}
                    </span>

                    {item.shippingEligible && (
                      <span
                        style={{
                          background: 'rgba(16, 185, 129, 0.85)',
                          color: '#ffffff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontWeight: 600,
                        }}
                      >
                        <Truck size={11} />
                        Shipping
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h3>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>{item.price}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.mileage}</div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    <span>Seller: <strong style={{ color: 'var(--text-primary)' }}>{item.seller}</strong></span>
                    <span style={{ color: 'var(--text-tertiary)' }}>{item.posted}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1,600+ POLICE SAFE MEETUP SPOTS MODAL (O-05) */}
        {policeSpotModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              zIndex: 9999,
            }}
          >
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xl)',
                padding: '28px',
                maxWidth: '600px',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={24} color="#10b981" />
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    1,600+ Police Department Safe MeetUp Spots
                  </h3>
                </div>
                <button
                  onClick={() => setPoliceSpotModal(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    fontSize: '18px',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                OMP Deals partners with local law enforcement across all 50 states to provide designated, well-lit, 24/7 video-surveilled parking spots at police stations for safe in-person car and marketplace transactions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  {
                    name: 'Fremont Police Headquarters MeetUp Spot',
                    address: '2000 Stevenson Blvd, Fremont, CA 94538',
                    distance: '2.8 miles away',
                    features: '24/7 Video Surveillance • Marked Spaces • Well-Lit Lot',
                  },
                  {
                    name: 'Newark Police Department Community Safe Zone',
                    address: '37101 Newark Blvd, Newark, CA 94560',
                    distance: '5.1 miles away',
                    features: 'Monitored Parking • Lobby Assistance Available',
                  },
                  {
                    name: 'Union City Police Safe Exchange Location',
                    address: '34009 Alvarado-Niles Rd, Union City, CA 94587',
                    distance: '7.4 miles away',
                    features: 'Direct station entrance parking with CCTV',
                  },
                ].map((spot, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--background)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{spot.name}</span>
                      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>{spot.distance}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{spot.address}</div>
                    <div style={{ fontSize: '11px', color: 'var(--primary)' }}>✓ {spot.features}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setPoliceSpotModal(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    background: '#10b981',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Got It, Safe MeetUp Ready
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OmpMarketplace;
