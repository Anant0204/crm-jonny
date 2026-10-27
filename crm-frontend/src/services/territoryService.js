import apiClient from './apiClient';

class TerritoryService {
  async getTerritories(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/territories${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async getTerritoryById(id) {
    const response = await apiClient.get(`/territories/${id}`);
    return response.data;
  }

  async createTerritory(data) {
    const response = await apiClient.post('/territories', data);
    return response.data;
  }

  async updateTerritory(id, data) {
    const response = await apiClient.put(`/territories/${id}`, data);
    return response.data;
  }

  async deleteTerritory(id) {
    return await apiClient.delete(`/territories/${id}`);
  }
}

export default new TerritoryService();
