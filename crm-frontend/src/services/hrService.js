import apiClient from './apiClient';

class HrService {
  async getEmployees(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/hr/employees${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async getEmployeeById(id) {
    const response = await apiClient.get(`/hr/employees/${id}`);
    return response.data;
  }

  async createEmployee(data) {
    const response = await apiClient.post('/hr/employees', data);
    return response.data;
  }

  async updateEmployee(id, data) {
    const response = await apiClient.put(`/hr/employees/${id}`, data);
    return response.data;
  }

  async deleteEmployee(id) {
    return await apiClient.delete(`/hr/employees/${id}`);
  }

  async getCandidates(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/hr/candidates${query ? `?${query}` : ''}`;
    const response = await apiClient.get(endpoint);
    return response.data || [];
  }

  async createCandidate(data) {
    const response = await apiClient.post('/hr/candidates', data);
    return response.data;
  }

  async updateCandidate(id, data) {
    const response = await apiClient.put(`/hr/candidates/${id}`, data);
    return response.data;
  }

  async deleteCandidate(id) {
    return await apiClient.delete(`/hr/candidates/${id}`);
  }
}

export default new HrService();
