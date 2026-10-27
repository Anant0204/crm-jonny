import axiosInstance from './axiosInstance';

const taskLabelsAPI = {
    // Get all labels
    getAll: (params) => axiosInstance.get('/task-labels', { params }),
    
    // Create label
    create: (data, params) => axiosInstance.post('/task-labels', data, { params }),
    
    // Update label
    update: (id, data, params) => axiosInstance.put(`/task-labels/${id}`, data, { params }),
    
    // Delete label
    delete: (id, params) => axiosInstance.delete(`/task-labels/${id}`, { params }),
};

export default taskLabelsAPI;

