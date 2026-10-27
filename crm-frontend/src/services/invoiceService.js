import apiClient from './apiClient';

class InvoiceService {
  async getInvoices(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/invoices${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async getInvoiceById(id) {
    const response = await apiClient.get(`/invoices/${id}`);
    return response.data;
  }

  async createInvoice(data) {
    const response = await apiClient.post('/invoices', data);
    return response.data;
  }

  async updateInvoice(id, data) {
    const response = await apiClient.put(`/invoices/${id}`, data);
    return response.data;
  }

  async deleteInvoice(id) {
    return await apiClient.delete(`/invoices/${id}`);
  }
}

export default new InvoiceService();
