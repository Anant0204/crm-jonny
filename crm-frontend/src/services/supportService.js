import apiClient from './apiClient';

class SupportService {
  async getTickets(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/support/tickets${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async getTicketById(id) {
    const response = await apiClient.get(`/support/tickets/${id}`);
    return response.data;
  }

  async createTicket(data) {
    const response = await apiClient.post('/support/tickets', data);
    return response.data;
  }

  async updateTicket(id, data) {
    const response = await apiClient.put(`/support/tickets/${id}`, data);
    return response.data;
  }

  async deleteTicket(id) {
    return await apiClient.delete(`/support/tickets/${id}`);
  }

  async getArticles(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/support/articles${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async createArticle(data) {
    const response = await apiClient.post('/support/articles', data);
    return response.data;
  }
}

export default new SupportService();
