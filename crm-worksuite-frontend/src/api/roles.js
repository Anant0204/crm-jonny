import axiosInstance from './axiosInstance';

const rolesAPI = {
    // Get all roles
    getAll: (params) => axiosInstance.get('/roles', { params }),
    
    // Get role by ID
    getById: (id, params) => axiosInstance.get(`/roles/${id}`, { params }),
    
    // Get all modules (dynamic)
    getModules: (params) => axiosInstance.get('/roles/modules', { params }),
    
    // Get role permissions
    getPermissions: (id, params) => axiosInstance.get(`/roles/${id}/permissions`, { params }),
    
    // Update role permissions
    updatePermissions: (id, permissions, params) => axiosInstance.put(`/roles/${id}/permissions`, { permissions }, { params }),
    
    // Create role
    create: (data, params) => axiosInstance.post('/roles', data, { params }),
    
    // Update role
    update: (id, data, params) => axiosInstance.put(`/roles/${id}`, data, { params }),
    
    // Delete role
    delete: (id, params) => axiosInstance.delete(`/roles/${id}`, { params }),
    
    // Get users with role
    getUsers: (id, params) => axiosInstance.get(`/roles/${id}/users`, { params }),
    
    // Assign role to user
    assignToUser: (id, data, params) => axiosInstance.post(`/roles/${id}/assign`, data, { params }),
    
    // Remove role from user
    removeFromUser: (id, userId, params) => axiosInstance.delete(`/roles/${id}/assign/${userId}`, { params }),
    
    // Get user's permissions (all roles combined)
    getUserPermissions: (params) => axiosInstance.get('/roles/user-permissions', { params }),
};

export default rolesAPI;
