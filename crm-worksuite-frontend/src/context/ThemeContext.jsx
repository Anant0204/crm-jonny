import { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

const ThemeContext = createContext(null)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

const defaultTheme = {
  // Colors aligned with CRM nErgy AI design system
  primaryDark: '#0f172a',
  primaryAccent: '#4f46e5',
  secondaryAccent: '#06b6d4',
  mainBg: '#f8fafc',
  primaryText: '#0f172a',
  secondaryText: '#475569',
  mutedText: '#94a3b8',
  warning: '#f59e0b',
  danger: '#ef4444',

  // Fonts
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: {
    base: '15px',
    sm: '13px',
    lg: '17px',
    xl: '19px',
    '2xl': '23px',
    '3xl': '28px',
  },

  // Theme mode
  mode: 'light', // 'light' or 'dark'
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 1. Check URL query parameters (e.g. from parent cockpit: &theme=light or &theme=dark)
    const urlTheme = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('theme')
      : null;

    // 2. Load theme from localStorage or use default
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('appTheme') : null;
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        // Force cleanup of obsolete green theme (#102D2C / #217E45)
        if (parsed.primaryAccent === '#217E45' || parsed.primaryDark === '#102D2C') {
          localStorage.removeItem('appTheme');
        } else {
          return {
            ...defaultTheme,
            ...parsed,
            mode: urlTheme || parsed.mode || 'light'
          };
        }
      } catch (e) {
        console.error(e);
      }
    }
    return { ...defaultTheme, mode: urlTheme || defaultTheme.mode };
  });

  const [isLoadingSettings, setIsLoadingSettings] = useState(true)

  // Load theme settings from database on mount
  useEffect(() => {
    const loadThemeFromSettings = async () => {
      try {
        const companyId = localStorage.getItem('companyId') || 1
        const response = await axiosInstance.get('/settings', { params: { company_id: companyId } })
        if (response.data.success) {
          const settingsData = response.data.data || []
          const settingsObj = {}

          // Transform settings array to object
          settingsData.forEach(setting => {
            settingsObj[setting.setting_key] = setting.setting_value
          })

          // Apply theme settings from database
          const themeUpdates = {}
          if (settingsObj.theme_mode) {
            themeUpdates.mode = settingsObj.theme_mode
          }
          if (settingsObj.font_family) {
            themeUpdates.fontFamily = settingsObj.font_family
          }
          if (settingsObj.primary_color) {
            themeUpdates.primaryAccent = settingsObj.primary_color
          }
          if (settingsObj.secondary_color) {
            themeUpdates.secondaryAccent = settingsObj.secondary_color
          }

          // Update theme if any settings were found
          if (Object.keys(themeUpdates).length > 0) {
            setTheme(prev => ({ ...prev, ...themeUpdates }))
          }
        }
      } catch (error) {
        console.error('Error loading theme from settings:', error)
        // Continue with localStorage theme if API fails
      } finally {
        setIsLoadingSettings(false)
      }
    }

    loadThemeFromSettings()
  }, [])

  // Apply theme to CSS variables and dark mode
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    // Apply dark mode class to html element
    if (theme.mode === 'dark') {
      root.classList.add('dark')
      // Dark mode color overrides - comprehensive
      root.style.setProperty('--color-main-bg', '#1a1a1a')
      root.style.setProperty('--color-primary-text', '#ffffff')
      root.style.setProperty('--color-secondary-text', '#b0b0b0')
      root.style.setProperty('--color-muted-text', '#808080')
      root.style.setProperty('--color-card-bg', '#2d2d2d')
      root.style.setProperty('--color-sidebar-bg', '#1e1e1e')
      root.style.setProperty('--color-input-bg', '#333333')
      root.style.setProperty('--color-border', '#404040')
      root.style.setProperty('--color-hover-bg', '#3a3a3a')
      body.style.backgroundColor = '#1a1a1a'
      body.style.color = '#ffffff'
    } else {
      root.classList.remove('dark')
      // Light mode colors
      root.style.setProperty('--color-main-bg', theme.mainBg || '#f8fafc')
      root.style.setProperty('--color-primary-text', theme.primaryText || '#0f172a')
      root.style.setProperty('--color-secondary-text', theme.secondaryText || '#475569')
      root.style.setProperty('--color-muted-text', theme.mutedText || '#94a3b8')
      root.style.setProperty('--color-card-bg', '#ffffff')
      root.style.setProperty('--color-sidebar-bg', '#0f172a')
      root.style.setProperty('--color-input-bg', '#ffffff')
      root.style.setProperty('--color-border', '#e2e8f0')
      root.style.setProperty('--color-hover-bg', '#f1f5f9')
      body.style.backgroundColor = theme.mainBg || '#f8fafc'
      body.style.color = theme.primaryText || '#0f172a'
    }

    // Set CSS variables (always apply, dark mode will override some)
    root.style.setProperty('--color-primary-dark', theme.primaryDark || '#0f172a')
    root.style.setProperty('--color-primary-accent', theme.primaryAccent || '#4f46e5')
    root.style.setProperty('--color-secondary-accent', theme.secondaryAccent || '#06b6d4')
    root.style.setProperty('--color-warning', theme.warning || '#f59e0b')
    root.style.setProperty('--color-danger', theme.danger || '#ef4444')

    // Apply font family - use the value directly as it comes from settings
    // Values are like 'Poppins, sans-serif' or 'Inter, sans-serif'
    let fontFamily = theme.fontFamily || "'Inter', sans-serif"

    // If it's just a font name without fallback, add sans-serif
    if (fontFamily && !fontFamily.includes(',')) {
      fontFamily = `'${fontFamily}', sans-serif`
    }

    // Dynamic Google Font Loading
    const fontName = fontFamily.split(',')[0].replace(/['"]/g, '').trim()
    const googleFonts = {
      'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'Poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
      'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      'Open Sans': 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
      'Lato': 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
      'Montserrat': 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
    }

    if (googleFonts[fontName]) {
      let link = document.getElementById('dynamic-google-font')
      if (!link) {
        link = document.createElement('link')
        link.id = 'dynamic-google-font'
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      }
      // Only update if changed to prevent flickering/reloading
      if (link.href !== googleFonts[fontName]) {
        link.href = googleFonts[fontName]
      }
    }

    root.style.setProperty('--font-family', fontFamily)
    root.style.setProperty('--font-size-base', theme.fontSize.base)

    // Apply font family to body and all elements
    body.style.fontFamily = fontFamily

    // Also apply to html element for full coverage
    root.style.fontFamily = fontFamily

    // Save to localStorage
    localStorage.setItem('appTheme', JSON.stringify(theme))
  }, [theme])

  const updateTheme = (updates) => {
    setTheme(prev => {
      const newTheme = { ...prev, ...updates }
      return newTheme
    })
  }

  const resetTheme = () => {
    setTheme(defaultTheme)
  }

  const value = {
    theme,
    updateTheme,
    resetTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext

