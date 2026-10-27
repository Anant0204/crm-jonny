import apiClient from './apiClient';

class EboxService {
  async getMessages() {
    const response = await apiClient.get('/ebox');
    return response.data || [];
  }

  async sendMessage(data) {
    const response = await apiClient.post('/ebox', data);
    return response.data;
  }
}

export default new EboxService();
