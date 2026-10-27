import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, languages } from '../locales'
import { settingsAPI } from '../api'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    return localStorage.getItem('app_language') || 'en'
  })

  const [direction, setDirection] = useState('ltr')
  const [isInitialized, setIsInitialized] = useState(false)

  // Fetch language from Settings API (Single Source of Truth)
  const fetchLanguageFromSettings = useCallback(async () => {
    try {
      const companyId = localStorage.getItem('companyId') || 1
      const response = await settingsAPI.getSingle('default_language', { company_id: companyId })
      
      if (response.data?.success && response.data.data?.setting_value) {
        const dbLanguage = response.data.data.setting_value
        if (translations[dbLanguage] && dbLanguage !== language) {
          applyLanguage(dbLanguage)
        }
      }
    } catch (error) {
      console.error('Error fetching language from settings:', error)
      // Fallback to localStorage if API fails
      const savedLang = localStorage.getItem('app_language') || 'en'
      if (savedLang !== language) {
        applyLanguage(savedLang)
      }
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Apply language changes (internal function)
  const applyLanguage = useCallback((langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode)
      localStorage.setItem('app_language', langCode)
      
      // Set direction for RTL languages (Arabic)
      const langInfo = languages.find(l => l.code === langCode)
      const newDirection = langInfo?.dir || 'ltr'
      setDirection(newDirection)
      
      // Apply direction to document and body
      document.documentElement.dir = newDirection
      document.documentElement.lang = langCode
      document.body.dir = newDirection
      document.body.className = document.body.className.replace(/rtl|ltr/g, '') + ' ' + newDirection
      
      // Add RTL class to root element
      if (newDirection === 'rtl') {
        document.documentElement.classList.add('rtl')
        document.body.classList.add('rtl')
      } else {
        document.documentElement.classList.remove('rtl')
        document.body.classList.remove('rtl')
      }
    }
  }, [])

  // Get translation function with fallback
  const t = useCallback((key, fallback = null) => {
    if (!key) return fallback || ''
    
    const keys = key.split('.')
    let value = translations[language]
    
    // Try to get value from current language
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        value = null
        break
      }
    }
    
    // Fallback to English if key not found
    if (!value || value === key) {
      value = translations['en']
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object') {
          value = value[fallbackKey]
        } else {
          return fallback || key
        }
      }
    }
    
    return value || fallback || key
  }, [language])

  // Change language (public function)
  const changeLanguage = useCallback(async (langCode) => {
    if (!translations[langCode]) {
      console.warn(`Language ${langCode} not found`)
      return
    }

    // Apply immediately for instant UI update
    applyLanguage(langCode)

    // Save to database via Settings API
    try {
      const companyId = localStorage.getItem('companyId') || 1
      await settingsAPI.update(
        { setting_key: 'default_language', setting_value: langCode },
        { params: { company_id: companyId } }
      )
    } catch (error) {
      console.error('Error saving language to settings:', error)
      // Language is already applied, just log the error
    }

    // Broadcast change to other tabs/windows
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }))
  }, [applyLanguage])

  // Initialize language on mount
  useEffect(() => {
    fetchLanguageFromSettings()
  }, [fetchLanguageFromSettings])

  // Apply direction and RTL styles when language changes
  useEffect(() => {
    if (!isInitialized) return

    const langInfo = languages.find(l => l.code === language)
    const dir = langInfo?.dir || 'ltr'
    setDirection(dir)
    
    document.documentElement.dir = dir
    document.documentElement.lang = language
    document.body.dir = dir
    
    // Update body classes
    document.body.className = document.body.className.replace(/rtl|ltr/g, '').trim() + ' ' + dir
    
    if (dir === 'rtl') {
      document.documentElement.classList.add('rtl')
      document.body.classList.add('rtl')
    } else {
      document.documentElement.classList.remove('rtl')
      document.body.classList.remove('rtl')
    }
  }, [language, isInitialized])

  // Listen for language changes from other tabs/windows
  useEffect(() => {
    const handleLanguageChange = (e) => {
      if (e.detail?.language && e.detail.language !== language) {
        applyLanguage(e.detail.language)
      }
    }

    const handleStorageChange = (e) => {
      if (e.key === 'app_language' && e.newValue && e.newValue !== language) {
        applyLanguage(e.newValue)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange)
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [language, applyLanguage])

  // Listen for settings updates (when settings are saved)
  useEffect(() => {
    const handleSettingsUpdate = () => {
      // Refresh language from settings when settings are updated
      fetchLanguageFromSettings()
    }

    window.addEventListener('settingsUpdated', handleSettingsUpdate)
    return () => window.removeEventListener('settingsUpdated', handleSettingsUpdate)
  }, [fetchLanguageFromSettings])

  const value = {
    language,
    direction,
    languages,
    t,
    changeLanguage,
    isRTL: direction === 'rtl',
    isInitialized
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
