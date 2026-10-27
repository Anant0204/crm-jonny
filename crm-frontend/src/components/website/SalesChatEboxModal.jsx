import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck, CheckCircle2, Lock, Sparkles, Building2, Mail, Phone } from 'lucide-react';

export const SalesChatEboxModal = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('Enterprise Demo');
  const [inquiryText, setInquiryText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });

  if (!isOpen) return null;

  const topics = [
    'Enterprise Demo',
    'Custom Pricing Quote',
    'White Label CRM Partnership',
    'Third-Party ERP Integration'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setInquiryText('');
    setFormData({ name: '', email: '', company: '', phone: '' });
  };

  return (
    <div className="website-modal-backdrop" onClick={onClose}>
      <div className="website-modal-window" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', height: 'min(640px, 92dvh)', maxHeight: '92dvh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="website-modal-header" style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)'
        }}>
          <div className="website-modal-header-left">
            <div className="website-modal-header-icon" style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)',
              flexShrink: 0
            }}>
              <MessageSquare size={20} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span className="website-modal-title" style={{ fontWeight: 800, fontSize: '15px', color: 'var(--web-text-main)' }}>
                  SALES — chat zBox
                </span>
                <span className="website-modal-badge" style={{
                  fontSize: '9.5px',
                  fontWeight: 800,
                  background: 'rgba(2, 132, 199, 0.12)',
                  color: '#0284c7',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  PUBLIC INQUIRY DESK
                </span>
              </div>
              <span className="website-modal-subtitle" style={{ fontSize: '11.5px', color: 'var(--web-text-muted)', display: 'block', lineHeight: 1.3 }}>
                Direct Consultations & Enterprise Deployment Team
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="website-modal-close-btn"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--web-text-muted)',
              padding: '6px',
              borderRadius: '6px',
              flexShrink: 0,
              marginLeft: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="website-modal-body" style={{ padding: '1.25rem', overflowY: 'auto' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--web-text-main)', marginBottom: '6px' }}>
                Inquiry Transmitted to Sales zBox
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--web-text-muted)', maxWidth: '380px', margin: '0 auto 1.5rem auto' }}>
                Thank you, <strong>{formData.name}</strong>. Our enterprise executive sales team has received your ticket regarding <strong>{topic}</strong>. We typically respond within 15 minutes during standard market hours.
              </p>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'rgba(2, 132, 199, 0.05)',
                border: '1px solid rgba(2, 132, 199, 0.2)',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '12px',
                color: 'var(--web-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Lock size={15} style={{ color: '#0284c7', flexShrink: 0 }} />
                <span>
                  This public zBox connects directly with CRM nErgy Enterprise Sales Specialists without accessing internal admin systems.
                </span>
              </div>

              {/* Inquiry Topic Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--web-text-main)', marginBottom: '6px' }}>
                  Select Consultation Topic:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      style={{
                        padding: '7px 10px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: topic === t ? 700 : 500,
                        backgroundColor: topic === t ? 'rgba(2, 132, 199, 0.12)' : 'var(--web-surface-subtle)',
                        color: topic === t ? '#0284c7' : 'var(--web-text-main)',
                        border: `1px solid ${topic === t ? '#0284c7' : 'var(--web-border)'}`,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--web-text-main)', marginBottom: '4px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Michael Vance"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--web-border)',
                      background: 'var(--web-surface)',
                      color: 'var(--web-text-main)',
                      fontSize: '12.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--web-text-main)', marginBottom: '4px' }}>
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. m.vance@company.com"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--web-border)',
                      background: 'var(--web-surface)',
                      color: 'var(--web-text-main)',
                      fontSize: '12.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--web-text-main)', marginBottom: '4px' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Global Logistics"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--web-border)',
                      background: 'var(--web-surface)',
                      color: 'var(--web-text-main)',
                      fontSize: '12.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--web-text-main)', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 (555) 019-2834"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--web-border)',
                      background: 'var(--web-surface)',
                      color: 'var(--web-text-main)',
                      fontSize: '12.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--web-text-main)', marginBottom: '4px' }}>
                  Project Needs / Estimated User Count
                </label>
                <textarea
                  rows={3}
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  placeholder="Tell us about your team size, expected implementation timeline, or modules required..."
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--web-border)',
                    background: 'var(--web-surface)',
                    color: 'var(--web-text-main)',
                    fontSize: '12.5px',
                    boxSizing: 'border-box',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--web-border)',
                    color: 'var(--web-text-muted)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                  }}
                >
                  <Send size={14} />
                  <span>Submit Inquiry to zBox</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
