/**
 * CRM nErgy Portal Configuration
 *
 * Configures portal URLs for unified single-SPA frontend application.
 * Both Website and CRM application are unified under this frontend.
 */

export function getPortalBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}

function getThemeQuery() {
  if (typeof window !== 'undefined') {
    const curTheme = localStorage.getItem('app_theme');
    if (curTheme === 'light' || curTheme === 'dark') {
      return `theme=${curTheme}`;
    }
  }
  return '';
}

export function getLoginUrl() {
  const tq = getThemeQuery();
  return tq ? `/login?${tq}` : `/login`;
}

export function getCrmLoginUrl() {
  const tq = getThemeQuery();
  return tq ? `/crm/login?${tq}` : `/crm/login`;
}

export function getSignupUrl() {
  const tq = getThemeQuery();
  return tq ? `/crm/signup?${tq}` : `/crm/signup`;
}

export function getOalUrl() {
  const tq = getThemeQuery();
  return tq ? `/oal?${tq}` : `/oal`;
}

export function getApiBaseUrl() {
  const envApi = import.meta.env.VITE_API_URL;
  if (envApi) return envApi.replace(/\/+$/, '');

  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]');

  if (isLocalhost) {
    return 'http://localhost:5000/api';
  }

  return 'https://crm-energy-backend-production.up.railway.app/api';
}
