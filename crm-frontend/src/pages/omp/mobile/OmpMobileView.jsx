import React, { useState } from 'react';
import {
  Smartphone,
  Car,
  QrCode,
  Users,
  Calculator,
  CheckCircle2,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Camera
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const OmpMobileView = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [isScanning, setIsScanning] = useState(false);

  const inventory = [
    { stock: 'STK-8492', year: 2021, make: 'Ford', model: 'F-150 Lariat', price: '$34,990', days: 14, status: 'Lot Ready' },
    { stock: 'STK-9102', year: 2022, make: 'Honda', model: 'CR-V EX-L', price: '$27,850', days: 9, status: 'Test Drive Scheduled' },
    { stock: 'STK-7721', year: 2020, make: 'Chevy', model: 'Silverado 1500', price: '$31,400', days: 28, status: 'Lot Ready' },
  ];

  const leads = [
    { name: 'Derrick Miller', vehicle: '2021 Ford F-150', time: '10m ago', intent: 'High Intent' },
    { name: 'Sarah Jenkins', vehicle: '2022 Honda CR-V', time: '25m ago', intent: 'Pre-Approved' },
  ];

  const handleScanVin = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success('VIN Decoded: 2023 Chevrolet Tahoe Premier (Stock STK-9941)');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              TASK E-20 • PILLAR 1, 3 & 4
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Smartphone Lot Management Simulator</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            OMP Mobile Dealer App
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Full dealership operations in the palm of your hand: mobile VIN scanning, lot walk appraisal, and instant deal quotes.
          </p>
        </div>
      </div>

      {/* Simulated Smartphone Device Mockup */}
      <div
        style={{
          width: '380px',
          height: '740px',
          backgroundColor: '#020617',
          borderRadius: '40px',
          border: '8px solid #1e293b',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Phone Notch & Status Bar */}
        <div style={{ height: '32px', backgroundColor: '#020617', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', fontSize: '0.7rem', color: '#94a3b8', zIndex: 10 }}>
          <span>9:41 AM</span>
          <div style={{ width: '100px', height: '18px', backgroundColor: '#0f172a', borderRadius: '0 0 10px 10px', margin: '0 auto' }} />
          <span>5G ⚡ 100%</span>
        </div>

        {/* Mobile App Header */}
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090d16' }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: 700 }}>DALLAS MOTORS</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>OMP Mobile Lot</div>
          </div>
          <button
            onClick={handleScanVin}
            style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '0.4rem 0.65rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
          >
            <Camera size={13} /> Scan VIN
          </button>
        </div>

        {/* Mobile Screen Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {isScanning && (
            <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px dashed #38bdf8', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
              <Zap size={28} color="#38bdf8" style={{ margin: '0 auto 0.5rem auto', animation: 'spin 1s linear infinite' }} />
              <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.85rem' }}>Camera Scanning Barcode...</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Decoded via NHTSA & Carfax API</div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>Lot Inventory (58 Live)</span>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Filter</span>
              </div>

              {inventory.map((car, idx) => (
                <div key={idx} style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>
                      {car.year} {car.make} {car.model}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{car.stock} • {car.days} days on lot</div>
                    <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 600, display: 'inline-block', marginTop: '0.25rem' }}>
                      {car.status}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#38bdf8', fontSize: '0.95rem' }}>{car.price}</div>
                    <button style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#cbd5e1', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', marginTop: '0.25rem', cursor: 'pointer' }}>
                      Desk Quote
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'leads' && (
            <>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>Hot Marketplace Leads</span>
              {leads.map((lead, idx) => (
                <div key={idx} style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.85rem' }}>{lead.name}</span>
                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{lead.time}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '0.2rem' }}>{lead.vehicle}</div>
                  <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', backgroundColor: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', fontWeight: 700, display: 'inline-block', marginTop: '0.35rem' }}>
                    {lead.intent}
                  </span>
                </div>
              ))}
            </>
          )}

          {activeTab === 'quotes' && (
            <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
              <Calculator size={32} color="#38bdf8" style={{ margin: '0 auto 0.5rem auto' }} />
              <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.9rem' }}>Quick Payment Quote</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Text instant 4-square options to buyers on the lot</div>
              <button
                onClick={() => toast.success('Quote sent to customer SMS')}
                style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.75rem', cursor: 'pointer' }}
              >
                Send SMS Quote
              </button>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div style={{ height: '60px', backgroundColor: '#090d16', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10 }}>
          {[
            { id: 'inventory', label: 'Lot', icon: Car },
            { id: 'leads', label: 'Leads', icon: Users },
            { id: 'quotes', label: 'Quotes', icon: Calculator },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ background: 'transparent', border: 'none', color: isSelected ? '#38bdf8' : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 600 }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
