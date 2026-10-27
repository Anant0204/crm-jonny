import axiosInstance from './axiosInstance'

export const groupsAPI = {
  getAll: (params) => axiosInstance.get('/groups', { params }),
  getById: (id, params) => axiosInstance.get(`/groups/${id}`, { params }),
  getAvailableUsers: (params) => axiosInstance.get('/groups/available-users', { params }),
  create: (data) => axiosInstance.post('/groups', data),
  update: (id, data) => axiosInstance.put(`/groups/${id}`, data),
  addMembers: (id, data) => axiosInstance.post(`/groups/${id}/members`, data),
  removeMember: (groupId, memberId, params) => axiosInstance.delete(`/groups/${groupId}/members/${memberId}`, { params }),
  delete: (id, params) => axiosInstance.delete(`/groups/${id}`, { params }),
}

