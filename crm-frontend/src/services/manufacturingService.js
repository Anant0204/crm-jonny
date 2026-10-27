import apiClient from './apiClient';

class ManufacturingService {
  async getOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/manufacturing/orders${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async createOrder(data) {
    const response = await apiClient.post('/manufacturing/orders', data);
    return response.data;
  }

  async updateOrder(id, data) {
    const response = await apiClient.put(`/manufacturing/orders/${id}`, data);
    return response.data;
  }
}

export default new ManufacturingService();
