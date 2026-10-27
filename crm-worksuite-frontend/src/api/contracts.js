import axiosInstance from './axiosInstance'

export const contractsAPI = {
  getAll: (params) => axiosInstance.get('/contracts', { params }),
  getById: (id, params) => axiosInstance.get(`/contracts/${id}`, { params }),
  getPDF: (id, params) => axiosInstance.get(`/contracts/${id}/pdf`, { params, responseType: 'blob' }),
  create: (data) => axiosInstance.post('/contracts', data),
  update: (id, data, params) => axiosInstance.put(`/contracts/${id}`, data, { params }),
  updateStatus: (id, data, params) => axiosInstance.put(`/contracts/${id}/status`, data, { params }),
  sendEmail: (id, data, params) => axiosInstance.post(`/contracts/${id}/send-email`, data, { params }),
  delete: (id, params) => axiosInstance.delete(`/contracts/${id}`, { params }),
}

export const contractTemplatesAPI = {
  getAll: (params) => axiosInstance.get('/contract-templates', { params }),
  getById: (id, params) => axiosInstance.get(`/contract-templates/${id}`, { params }),
  create: (data) => axiosInstance.post('/contract-templates', data),
  update: (id, data, params) => axiosInstance.put(`/contract-templates/${id}`, data, { params }),
  delete: (id, params) => axiosInstance.delete(`/contract-templates/${id}`, { params }),
  renderTemplate: (id, data, params) => axiosInstance.post(`/contract-templates/${id}/render`, data, { params }),
}

