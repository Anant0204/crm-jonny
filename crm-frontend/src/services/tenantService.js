import apiClient from './apiClient';

class TenantService {
  async getSubAccounts() {
    const response = await apiClient.get('/tenants/sub-accounts');
    return response.data || [];
  }

  async createSubAccount(data) {
    const response = await apiClient.post('/tenants/sub-accounts', data);
    return response.data;
  }

  async getSettings() {
    const response = await apiClient.get('/tenants/settings');
    return response.data;
  }

  async updateSettings(data) {
    const response = await apiClient.put('/tenants/settings', data);
    return response.data;
  }
}

export default new TenantService();
