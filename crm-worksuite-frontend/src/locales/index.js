import en from './en.json'
import hi from './hi.json'
import ar from './ar.json'
import es from './es.json'
import fr from './fr.json'
import de from './de.json'

export const translations = {
  en,
  hi,
  ar,
  es,
  fr,
  de
}

export const languages = [
  { code: 'en', name: 'English (GB)', native: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl', flag: '🇸🇦' }
]

export default translations
