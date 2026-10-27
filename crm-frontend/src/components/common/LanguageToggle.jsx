import React from 'react';
import { Globe } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * LanguageToggle — 1-Click English ↔ Spanish UI Toggle
 * Clean segmented pill switcher without broken Windows flag emojis
 */
export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const { addToast } = useToast();

  const handleSelectLang = (newLang) => {
    if (newLang === language) return;
    setLanguage(newLang);
    addToast({
      title: newLang === 'ES' ? 'Idioma Cambiado a Español' : 'Switched to English',
      message: newLang === 'ES' ? 'CRM ERP y el portal web ahora están en Español.' : 'CRM ERP software and website switched to English.',
      type: 'success',
    });
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        borderRadius: '20px',
        backgroundColor: 'var(--web-surface-subtle, var(--surface-secondary, rgba(15, 23, 42, 0.06)))',
        border: '1px solid var(--web-border, var(--border, rgba(148, 163, 184, 0.25)))',
        gap: '2px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        height: '34px',
        boxSizing: 'border-box',
      }}
      role="group"
      aria-label="Language Selector"
      title="1-Click Language Switcher (EN / ES)"
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px 0 6px', color: '#0ea5e9', flexShrink: 0 }}>
        <Globe size={14} />
      </div>

      <button
        id="lang-toggle-en"
        type="button"
        aria-pressed={language === 'EN'}
        onClick={() => handleSelectLang('EN')}
        style={{
          border: 'none',
          outline: 'none',
          padding: '3px 9px',
          borderRadius: '14px',
          fontSize: '11.5px',
          fontWeight: 700,
          cursor: 'pointer',
          backgroundColor: language === 'EN' ? '#0ea5e9' : 'transparent',
          color: language === 'EN' ? '#ffffff' : 'var(--web-text-muted, var(--text-secondary, #64748b))',
          boxShadow: language === 'EN' ? '0 1px 4px rgba(14, 165, 233, 0.4)' : 'none',
          transition: 'all 0.18s ease',
          lineHeight: '1.2',
          flexShrink: 0,
        }}
        title="English"
      >
        EN
      </button>

      <button
        id="lang-toggle-es"
        type="button"
        aria-pressed={language === 'ES'}
        onClick={() => handleSelectLang('ES')}
        style={{
          border: 'none',
          outline: 'none',
          padding: '3px 9px',
          borderRadius: '14px',
          fontSize: '11.5px',
          fontWeight: 700,
          cursor: 'pointer',
          backgroundColor: language === 'ES' ? '#0ea5e9' : 'transparent',
          color: language === 'ES' ? '#ffffff' : 'var(--web-text-muted, var(--text-secondary, #64748b))',
          boxShadow: language === 'ES' ? '0 1px 4px rgba(14, 165, 233, 0.4)' : 'none',
          transition: 'all 0.18s ease',
          lineHeight: '1.2',
          flexShrink: 0,
        }}
        title="Español"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageToggle;
