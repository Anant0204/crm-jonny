import axiosInstance from './axiosInstance';

const activitiesAPI = {
    // Get all activities
    getAll: (params) => axiosInstance.get('/activities', { params }),
    
    // Create activity
    create: (data, params) => axiosInstance.post('/activities', data, { params }),
};

export default activitiesAPI;

