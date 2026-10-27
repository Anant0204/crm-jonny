import apiClient from './apiClient';

export const erpService = {
  // CRM Deal -> ERP Handoff
  async handoffFromDeal(dealId) {
    const res = await apiClient.post(`/erp/handoff-deal/${dealId}`);
    return res.data;
  },

  // Projects
  async getProjects(params = {}) {
    const res = await apiClient.get('/erp/projects', params);
    return res.data || [];
  },

  async getProject(id) {
    const res = await apiClient.get(`/erp/projects/${id}`);
    return res.data;
  },

  async createProject(projectData) {
    const res = await apiClient.post('/erp/projects', projectData);
    return res.data;
  },

  async updateProject(id, projectData) {
    const res = await apiClient.put(`/erp/projects/${id}`, projectData);
    return res.data;
  },

  // Sales Orders
  async getSalesOrders(params = {}) {
    const res = await apiClient.get('/erp/sales-orders', params);
    return res.data || [];
  },

  // Purchase Orders
  async getPurchaseOrders(params = {}) {
    const res = await apiClient.get('/erp/purchase-orders', params);
    return res.data || [];
  },

  async createPurchaseOrder(poData) {
    const res = await apiClient.post('/erp/purchase-orders', poData);
    return res.data;
  },

  // Inventory
  async getInventory(params = {}) {
    const res = await apiClient.get('/erp/inventory', params);
    return res.data || [];
  },

  async createInventoryItem(itemData) {
    const res = await apiClient.post('/erp/inventory', itemData);
    return res.data;
  },
};

export default erpService;
