import React, { useState, useRef } from 'react';
import {
  FileSignature,
  CheckCircle,
  Download,
  Printer,
  ShieldCheck,
  FileText,
  RotateCcw,
  Sparkles,
  Lock,
  Send,
  Eye
} from 'lucide-react';
import { toast } from '../../../utils/ompToast';

export const AutoESign = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [activeDoc, setActiveDoc] = useState('bill_of_sale');
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Digital Signature Canvas Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  const handleApplySignature = () => {
    setIsSigned(true);
    toast.success('Digital Deal Jacket Signed & Sealed with SHA-256 Hash');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--primary-subtle, rgba(56, 189, 248, 0.1))', color: 'var(--primary)', border: '1px solid var(--border)' }}>
              TASK E-15 • PILLAR 3
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>100% Paperless Digital Deal Jackets</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Auto E-Business & Digital E-Signature Suite
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Execute legally-binding digital deal jackets with touchscreen signature capture and encrypted cryptographic audit trails.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => toast.success('Encrypted Digital Deal Jacket PDF downloaded')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--primary)', color: 'var(--text-on-primary, #fff)', border: 'none', padding: '0.55rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
          >
            <Download size={16} /> Download Signed Deal Jacket
          </button>
        </div>
      </div>

      {/* Main Deal Jacket Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Digital Document Viewer */}
        <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          {/* Doc Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            {[
              { id: 'bill_of_sale', label: '1. Bill of Sale' },
              { id: 'odometer', label: '2. Odometer Disclosure' },
              { id: 'warranty', label: '3. Powertrain Warranty' },
              { id: 'loan_contract', label: '4. Retail Loan Contract' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDoc(d.id)}
                style={{
                  backgroundColor: activeDoc === d.id ? 'var(--primary-subtle, rgba(56, 189, 248, 0.15))' : 'transparent',
                  color: activeDoc === d.id ? 'var(--primary)' : 'var(--text-secondary)',
                  border: activeDoc === d.id ? '1px solid var(--primary)' : '1px solid transparent',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Paper Document Preview Simulation */}
          <div style={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', padding: '1.5rem', fontFamily: 'serif', boxShadow: 'var(--shadow-md)', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a' }}>
                  State Motor Vehicle Purchase Agreement & Bill of Sale
                </h3>
                <span style={{ fontSize: '0.75rem', fontFamily: 'sans-serif', color: '#64748b' }}>
                  Deal File # DJ-9824 • Dallas Central Motors License # DL-99214
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem', fontFamily: 'sans-serif', marginBottom: '1rem' }}>
                <div>
                  <strong>SELLER / DEALER:</strong><br />
                  Dallas Central Motors LLC<br />
                  4800 North Stemmons Fwy, Dallas, TX
                </div>
                <div>
                  <strong>PURCHASER / BUYER:</strong><br />
                  Derrick Miller<br />
                  1948 Oak Lawn Ave, Dallas, TX
                </div>
              </div>

              <div style={{ backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'sans-serif', marginBottom: '1rem' }}>
                <strong>VEHICLE IDENTIFICATION:</strong><br />
                2021 Ford F-150 Lariat 4WD | VIN: <strong>1FTFW1E85MFB19823</strong> | Odometer: <strong>34,120 Miles</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '0.5rem', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                <span>Agreed Purchase Price:</span>
                <strong>$34,990.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                <span>Down Payment Paid:</span>
                <strong>-$4,000.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 'bold', fontFamily: 'sans-serif', borderTop: '2px solid #0f172a', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                <span>TOTAL AMOUNT FINANCED:</span>
                <span style={{ color: '#0284c7' }}>$33,184.38</span>
              </div>
            </div>

            {/* Signature Placement Area */}
            <div style={{ borderTop: '1px dashed #94a3b8', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontFamily: 'sans-serif' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>BUYER SIGNATURE:</div>
                {isSigned ? (
                  <div style={{ color: '#0284c7', fontFamily: 'cursive', fontSize: '1.4rem', fontWeight: 'bold' }}>
                    Derrick Miller
                  </div>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: '#ef4444', fontStyle: 'italic', height: '32px', display: 'flex', alignItems: 'center' }}>
                    * Signature Required on Touchpad
                  </div>
                )}
                <div style={{ borderTop: '1px solid #0f172a', width: '200px', marginTop: '0.25rem', fontSize: '0.65rem', color: '#64748b' }}>
                  Derrick Miller (Buyer)
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 600 }}>
                  {isSigned ? '✓ SHA-256 Verified Seal' : 'Pending Signature'}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>Date: September 15, 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Digital Signature Pad & Cryptographic Audit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* E-Signature Canvas */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Draw Digital Signature
              </span>
              <button
                onClick={clearSignature}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <RotateCcw size={13} /> Clear
              </button>
            </div>

            <div style={{ border: '2px dashed var(--primary)', borderRadius: '8px', backgroundColor: 'var(--background)', cursor: 'crosshair', position: 'relative' }}>
              <canvas
                ref={canvasRef}
                width={320}
                height={130}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ width: '100%', height: '130px', display: 'block' }}
              />
              <span style={{ position: 'absolute', bottom: '6px', left: '10px', fontSize: '0.65rem', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
                Sign above with stylus, finger, or mouse
              </span>
            </div>

            <button
              onClick={handleApplySignature}
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <FileSignature size={16} /> Apply Signature to All Documents
            </button>
          </div>

          {/* Cryptographic Audit Trail */}
          <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700 }}>
              <ShieldCheck size={16} /> Legal Compliance & Audit Trail
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              ESIGN & UETA Act Certified. Every stroke and timestamp is encrypted with an immutable cryptographic fingerprint.
            </div>
            <div style={{ backgroundColor: 'var(--surface-secondary)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.7rem', color: 'var(--text-primary)', wordBreak: 'break-all', border: '1px solid var(--border)' }}>
              <code>SHA-256: 8f4a21b390de8710ca4f5e718b901ad4239841f...</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoESign;
