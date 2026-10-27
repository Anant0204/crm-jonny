import apiClient from './apiClient';

class CommunicationService {
  async getMessages(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/communications${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async getMessageById(id) {
    const response = await apiClient.get(`/communications/${id}`);
    return response.data;
  }

  async sendMessage(data) {
    const response = await apiClient.post('/communications', data);
    return response;
  }
}

export default new CommunicationService();
