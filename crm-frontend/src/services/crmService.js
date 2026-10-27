import apiClient from './apiClient';

export const crmService = {
  // ==========================================
  // LEADS
  // ==========================================
  async getLeads(params = {}) {
    const res = await apiClient.get('/leads', params);
    return res.data || [];
  },

  async getLead(id) {
    const res = await apiClient.get(`/leads/${id}`);
    return res.data;
  },

  async createLead(leadData) {
    const res = await apiClient.post('/leads', leadData);
    return res.data;
  },

  async updateLead(id, leadData) {
    const res = await apiClient.put(`/leads/${id}`, leadData);
    return res.data;
  },

  async deleteLead(id) {
    const res = await apiClient.delete(`/leads/${id}`);
    return res;
  },

  async convertLead(id) {
    const res = await apiClient.post(`/leads/${id}/convert`);
    return res.data;
  },

  // ==========================================
  // CONTACTS
  // ==========================================
  async getContacts(params = {}) {
    const res = await apiClient.get('/contacts', params);
    return res.data || [];
  },

  async getContact(id) {
    const res = await apiClient.get(`/contacts/${id}`);
    return res.data;
  },

  async createContact(contactData) {
    const res = await apiClient.post('/contacts', contactData);
    return res.data;
  },

  async updateContact(id, contactData) {
    const res = await apiClient.put(`/contacts/${id}`, contactData);
    return res.data;
  },

  async deleteContact(id) {
    const res = await apiClient.delete(`/contacts/${id}`);
    return res;
  },

  async bulkDeleteContacts(ids) {
    const res = await apiClient.post('/contacts/bulk-delete', { ids });
    return res.data;
  },

  // ==========================================
  // DEALS & PIPELINE
  // ==========================================
  async getDeals(params = {}) {
    const res = await apiClient.get('/deals', params);
    return res.data || [];
  },

  async getDeal(id) {
    const res = await apiClient.get(`/deals/${id}`);
    return res.data;
  },

  async createDeal(dealData) {
    const res = await apiClient.post('/deals', dealData);
    return res.data;
  },

  async updateDeal(id, dealData) {
    const res = await apiClient.put(`/deals/${id}`, dealData);
    return res.data;
  },

  async deleteDeal(id) {
    const res = await apiClient.delete(`/deals/${id}`);
    return res;
  },

  // ==========================================
  // TASKS
  // ==========================================
  async getTasks(params = {}) {
    const res = await apiClient.get('/tasks', params);
    return res.data || [];
  },

  async getTask(id) {
    const res = await apiClient.get(`/tasks/${id}`);
    return res.data;
  },

  async createTask(taskData) {
    const res = await apiClient.post('/tasks', taskData);
    return res.data;
  },

  async updateTask(id, taskData) {
    const res = await apiClient.put(`/tasks/${id}`, taskData);
    return res.data;
  },

  async toggleTask(id) {
    const res = await apiClient.patch(`/tasks/${id}/toggle`);
    return res.data;
  },

  async deleteTask(id) {
    const res = await apiClient.delete(`/tasks/${id}`);
    return res;
  },

  // ==========================================
  // NOTES
  // ==========================================
  async getNotes(params = {}) {
    const res = await apiClient.get('/notes', params);
    return res.data || [];
  },

  async createNote(noteData) {
    const res = await apiClient.post('/notes', noteData);
    return res.data;
  },

  async updateNote(id, noteData) {
    const res = await apiClient.put(`/notes/${id}`, noteData);
    return res.data;
  },

  async deleteNote(id) {
    const res = await apiClient.delete(`/notes/${id}`);
    return res;
  },

  // ==========================================
  // ACTIVITIES
  // ==========================================
  async getActivities(params = {}) {
    const res = await apiClient.get('/activities', params);
    return res.data || [];
  },

  async createActivity(activityData) {
    const res = await apiClient.post('/activities', activityData);
    return res.data;
  },

  // ==========================================
  // USERS / TEAM
  // ==========================================
  async getUsers(params = {}) {
    const res = await apiClient.get('/users', params);
    return res.data || [];
  },
};

export default crmService;
