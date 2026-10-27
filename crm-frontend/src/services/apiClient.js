/**
 * Centralized API Client for CRM nErgy
 * Automatically handles baseURL, headers, JWT bearer tokens, and standardized errors.
 */

// Automatic environment-aware API URL:
// 1. If explicit env variable is set and valid, use it.
// 2. If running in browser on localhost/127.0.0.1, use localhost:5000/api.
// 3. If deployed on Netlify or production domain, use live Railway backend.
function resolveApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]');

  if (isLocalhost) {
    return envUrl || 'http://localhost:5000/api';
  }

  // Production / Netlify deployment
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl;
  }

  return 'https://crm-energy-backend-production.up.railway.app/api';
}

const API_BASE_URL = resolveApiBaseUrl();

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  getToken() {
    return localStorage.getItem('crm_token') || '';
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('crm_token', token);
    } else {
      localStorage.removeItem('crm_token');
    }
  }

  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    if (options.params) {
      const queryString = new URLSearchParams(
        Object.entries(options.params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
      ).toString();
      if (queryString) {
        cleanEndpoint += (cleanEndpoint.includes('?') ? '&' : '?') + queryString;
      }
    }

    const url = `${this.baseUrl}${cleanEndpoint}`;

    const config = {
      ...options,
      headers: this.getHeaders(options.headers),
    };

    try {
      const response = await fetch(url, config);

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        // If 401 unauthorized, dispatch custom event if session expired
        if (response.status === 401 && data.code === 'TOKEN_EXPIRED') {
          window.dispatchEvent(new CustomEvent('auth:expired'));
        }

        const error = new Error(data.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      // Re-throw formatted error
      throw error;
    }
  }

  get(endpoint, params = {}, options = {}) {
    let url = endpoint;
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    ).toString();

    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }

    return this.request(url, { ...options, method: 'GET' });
  }

  post(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'DELETE',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
