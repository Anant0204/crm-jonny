import axiosInstance from './axiosInstance'

export const tasksAPI = {
  // CRUD operations
  getAll: (params) => axiosInstance.get('/tasks', { params }),
  getById: (id, params) => axiosInstance.get(`/tasks/${id}`, { params }),
  create: (data, params) => axiosInstance.post('/tasks', data, { params }),
  createWithFile: (formData, params) => axiosInstance.post('/tasks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params
  }),
  update: (id, data, params) => axiosInstance.put(`/tasks/${id}`, data, { params }),
  updateWithFile: (id, formData, params) => axiosInstance.put(`/tasks/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params
  }),
  delete: (id, params) => axiosInstance.delete(`/tasks/${id}`, { params }),
  
  // Comments
  getComments: (id, params) => axiosInstance.get(`/tasks/${id}/comments`, { params }),
  addComment: (id, data, params) => axiosInstance.post(`/tasks/${id}/comments`, data, { params }),
  
  // Files
  getFiles: (id, params) => axiosInstance.get(`/tasks/${id}/files`, { params }),
  uploadFile: (id, formData, params) => axiosInstance.post(`/tasks/${id}/files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params
  }),
  
  // Email
  sendEmail: (id, data, params) => axiosInstance.post(`/tasks/${id}/send-email`, data, { params }),
  
  // Notes
  getNotes: (id, params) => axiosInstance.get(`/tasks/${id}/notes`, { params }),
  addNote: (id, data, params) => axiosInstance.post(`/tasks/${id}/notes`, data, { params }),
  updateNote: (id, noteId, data, params) => axiosInstance.put(`/tasks/${id}/notes/${noteId}`, data, { params }),
  deleteNote: (id, noteId, params) => axiosInstance.delete(`/tasks/${id}/notes/${noteId}`, { params }),
  
  // Subtasks
  getSubtasks: (id, params) => axiosInstance.get(`/tasks/${id}/subtasks`, { params }),
  addSubtask: (id, data, params) => axiosInstance.post(`/tasks/${id}/subtasks`, data, { params }),
  updateSubtask: (id, subtaskId, data, params) => axiosInstance.put(`/tasks/${id}/subtasks/${subtaskId}`, data, { params }),
  deleteSubtask: (id, subtaskId, params) => axiosInstance.delete(`/tasks/${id}/subtasks/${subtaskId}`, { params }),
}

