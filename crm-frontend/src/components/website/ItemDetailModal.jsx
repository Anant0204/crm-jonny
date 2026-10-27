import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { X, Sparkles, MessageSquare, CheckCircle2, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

export const ItemDetailModal = ({ item, isOpen, onClose, onOpenSales, onOpenZunme }) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isEs = language === 'ES';
  const [expandedFaq, setExpandedFaq] = useState(null);

  if (!isOpen || !item) return null;

  const Icon = item.icon || Sparkles;

  return (
    <div className="website-modal-backdrop" onClick={onClose}>
      <div
        className="website-modal-window"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px', height: 'min(620px, 92dvh)', maxHeight: '92dvh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Modal Header */}
        <div className="website-modal-header" style={{
          background: 'var(--web-surface-subtle)',
          flexShrink: 0
        }}>
          <div className="website-modal-header-left">
            <div className="website-modal-header-icon" style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#4f46e5',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
              flexShrink: 0
            }}>
              <Icon size={22} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {(isEs && (item.categoryEs || item.groupTitleEs)) ? (item.categoryEs || item.groupTitleEs) : t(item.category || item.groupTitle || 'CRM nErgy Enterprise')}
              </span>
              <h3 className="website-modal-title" style={{ fontSize: '17px', fontWeight: 800, color: 'var(--web-text-main)', margin: '2px 0 0 0' }}>
                {(isEs && item.nameEs) ? item.nameEs : t(item.name)}
              </h3>
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

        {/* Modal Scrollable Body */}
        <div className="website-modal-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto' }}>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--web-text-main)', marginBottom: '6px' }}>
              {t('Module Overview')}
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--web-text-muted)', lineHeight: 1.55, margin: 0 }}>
              {(isEs && (item.clientOverviewEs || item.descEs)) ? (item.clientOverviewEs || item.descEs) : t(item.clientOverview || item.desc)}
            </p>
          </div>

          {/* Capabilities Section */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.15)',
            borderRadius: '10px',
            padding: '0.9rem'
          }}>
            <h5 style={{ fontSize: '12px', fontWeight: 700, color: '#4f46e5', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} />
              <span>{item.capabilities && item.capabilities.length > 0 ? `${item.name} ${t('uses CRM nErgy Software to:')}` : t('Included Capabilities')}</span>
            </h5>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '12px', color: 'var(--web-text-muted)', lineHeight: 1.6 }}>
              {item.capabilities && item.capabilities.length > 0 ? (
                item.capabilities.map((cap, cIdx) => (
                  <li key={cIdx} style={{ marginBottom: '4px' }}>{cap}</li>
                ))
              ) : (
                <>
                  <li>Autonomous AI Copilot Integration (ZUNME Engine)</li>
                  <li>Real-time telemetry, audit trails, and role-based permissions</li>
                  <li>High-throughput bi-directional API synchronization</li>
                  <li>Turnkey deployment ready for enterprise workloads</li>
                </>
              )}
            </ul>
          </div>

          {/* Enriched Industry Specific FAQs */}
          {item.clientFaqs && item.clientFaqs.length > 0 && (
            <div style={{
              background: 'var(--web-surface-subtle)',
              border: '1px solid var(--web-border)',
              borderRadius: '10px',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>
              <h5 style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={14} />
                <span>{t('Industry Specific FAQs')} ({item.clientFaqs.length})</span>
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
                {item.clientFaqs.map((faq, fIdx) => {
                  const isFaqOpen = expandedFaq === fIdx;
                  return (
                    <div key={fIdx} style={{
                      background: 'var(--web-surface)',
                      border: '1px solid var(--web-border)',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isFaqOpen ? null : fIdx)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--web-text-main)',
                          gap: '8px'
                        }}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown size={14} style={{
                          color: 'var(--web-text-muted)',
                          transform: isFaqOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.15s ease',
                          flexShrink: 0
                        }} />
                      </button>
                      {isFaqOpen && (
                        <div style={{
                          padding: '8px 10px',
                          fontSize: '11.5px',
                          color: 'var(--web-text-muted)',
                          lineHeight: 1.5,
                          borderTop: '1px solid var(--web-border)',
                          background: 'var(--web-surface-subtle)'
                        }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {item.route && (
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate(item.route);
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '8px',
                background: 'rgba(79, 70, 229, 0.08)',
                border: '1px solid rgba(79, 70, 229, 0.3)',
                color: '#4f46e5',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{t('Explore Dedicated Page')}</span>
              <ArrowRight size={15} />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.25rem' }}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSales();
              }}
              style={{
                flex: 1,
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <MessageSquare size={14} />
              <span>{t('Inquire in Sales zBox')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenZunme();
              }}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} />
              <span>{t('Ask My Zunme AI')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
