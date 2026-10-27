import apiClient from './apiClient';

export const authService = {
  /**
   * Register a new organization and primary admin user.
   */
  async register(registrationData) {
    const res = await apiClient.post('/auth/register', registrationData);
    if (res.data?.token) {
      apiClient.setToken(res.data.token);
    }
    return res.data;
  },

  /**
   * Authenticate user credentials and store JWT token.
   */
  async login(credentials) {
    const res = await apiClient.post('/auth/login', credentials);
    if (res.data?.token) {
      apiClient.setToken(res.data.token);
    }
    return res.data;
  },

  /**
   * Fetch current authenticated user profile and tenant details.
   */
  async getMe() {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },

  /**
   * Logout user and clear local token.
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (_) {
      // Best-effort logout
    } finally {
      apiClient.setToken(null);
    }
  },
};

export default authService;
