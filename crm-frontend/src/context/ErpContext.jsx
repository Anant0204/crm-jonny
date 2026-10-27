import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import erpService from '../services/erpService';
import { useAuth } from './AuthContext';

const ErpContext = createContext();

const formatCurrency = (val) => {
  if (typeof val === 'number') return '$' + val.toLocaleString('en-US');
  if (typeof val === 'string' && val.startsWith('$')) return val;
  const num = parseFloat(String(val).replace(/[^0-9.-]+/g, '')) || 0;
  return '$' + num.toLocaleString('en-US');
};

export const ErpProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isCrmAuthenticated } = useAuth();

  const fetchErpData = useCallback(async () => {
    const token = localStorage.getItem('crm_token');
    if (!token) return;

    try {
      setIsLoading(true);
      const [projRes, soRes, poRes, invRes] = await Promise.allSettled([
        erpService.getProjects(),
        erpService.getSalesOrders(),
        erpService.getPurchaseOrders(),
        erpService.getInventory(),
      ]);

      if (projRes.status === 'fulfilled' && Array.isArray(projRes.value)) {
        const mapped = projRes.value.map((p) => ({
          ...p,
          id: p.id,
          budget: formatCurrency(p.budget),
          spent: formatCurrency(p.spent),
          client: p.client || p.contact?.name || 'Enterprise Client',
          deadline: p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : '2026-08-30',
        }));
        setProjects(mapped);
      }

      if (soRes.status === 'fulfilled' && Array.isArray(soRes.value)) {
        const mapped = soRes.value.map((so) => ({
          ...so,
          id: so.id,
          orderNumber: so.orderNumber || so.id,
          total: formatCurrency(so.total),
          customer: so.customer || so.contact?.name || 'Enterprise Client',
          date: so.date ? new Date(so.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
        setSalesOrders(mapped);
      }

      if (poRes.status === 'fulfilled' && Array.isArray(poRes.value)) {
        const mapped = poRes.value.map((po) => ({
          ...po,
          id: po.id,
          amount: formatCurrency(po.amount),
          date: po.date ? new Date(po.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
        setPurchaseOrders(mapped);
      }

      if (invRes.status === 'fulfilled' && Array.isArray(invRes.value)) {
        const mapped = invRes.value.map((inv) => ({
          ...inv,
          id: inv.id,
          unitCost: formatCurrency(inv.unitCost),
        }));
        setInventory(mapped);
      }
    } catch (_) {
      // Keep existing state on transient error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchErpData();
  }, [fetchErpData, isCrmAuthenticated]);

  // ============================================================================
  // CRM DEAL -> ERP HANDOFF
  // ============================================================================
  const createFromDeal = async (dealId) => {
    try {
      const result = await erpService.handoffFromDeal(dealId);
      if (result?.project) {
        const mappedProj = {
          ...result.project,
          id: result.project.id,
          budget: formatCurrency(result.project.budget),
          spent: formatCurrency(result.project.spent || 0),
          client: result.project.client,
          deadline: result.project.deadline ? new Date(result.project.deadline).toISOString().split('T')[0] : '2026-08-30',
        };

        setProjects((prev) => {
          if (prev.some((p) => p.id === mappedProj.id)) return prev;
          return [mappedProj, ...prev];
        });

        if (result.salesOrder) {
          const mappedSO = {
            ...result.salesOrder,
            id: result.salesOrder.id,
            orderNumber: result.salesOrder.orderNumber || result.salesOrder.id,
            total: formatCurrency(result.salesOrder.total),
            customer: result.salesOrder.customer,
            date: new Date().toISOString().split('T')[0],
          };
          setSalesOrders((prev) => {
            if (prev.some((so) => so.id === mappedSO.id)) return prev;
            return [mappedSO, ...prev];
          });
        }
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  // ============================================================================
  // PROJECT ACTIONS
  // ============================================================================
  const addProject = async (item) => {
    const tempId = `PRJ-${Math.floor(100 + Math.random() * 900)}`;
    const optimisticProj = {
      id: tempId,
      name: item.name,
      client: item.client,
      budget: formatCurrency(item.budget),
      spent: '$0',
      progress: 0,
      status: item.status || 'In Progress',
      manager: item.manager || 'Alexander Wright',
      deadline: item.deadline || '2026-07-01',
    };

    setProjects((prev) => [optimisticProj, ...prev]);

    try {
      const created = await erpService.createProject({
        name: item.name,
        client: item.client,
        budget: item.budget,
        manager: item.manager,
        deadline: item.deadline,
        contactId: item.contactId,
        dealId: item.dealId,
      });
      if (created?.id) {
        setProjects((prev) =>
          prev.map((p) => (p.id === tempId ? { ...p, id: created.id, budget: formatCurrency(created.budget) } : p))
        );
        return created;
      }
    } catch (_) { }
    return optimisticProj;
  };

  // ============================================================================
  // PURCHASE ORDER ACTIONS
  // ============================================================================
  const addPurchaseOrder = async (item) => {
    const tempId = `PO-2026-${Math.floor(400 + Math.random() * 500)}`;
    const optimisticPO = {
      id: tempId,
      poNumber: tempId,
      vendor: item.vendor,
      items: item.items || item.item,
      amount: formatCurrency(item.amount),
      status: item.status || 'Pending Approval',
      eta: item.eta || 'Within 10 Days',
      date: new Date().toISOString().split('T')[0],
    };

    setPurchaseOrders((prev) => [optimisticPO, ...prev]);

    try {
      const created = await erpService.createPurchaseOrder({
        vendor: item.vendor,
        items: item.items || item.item,
        amount: item.amount,
        status: item.status,
        eta: item.eta,
      });
      if (created?.id) {
        setPurchaseOrders((prev) =>
          prev.map((po) => (po.id === tempId ? { ...po, id: created.id, poNumber: created.poNumber } : po))
        );
        return created;
      }
    } catch (_) { }
    return optimisticPO;
  };

  // ============================================================================
  // INVENTORY ACTIONS
  // ============================================================================
  const addInventoryItem = async (item) => {
    const tempId = `SKU-${Math.floor(8900 + Math.random() * 100)}`;
    const optimisticItem = {
      id: tempId,
      sku: item.sku || tempId,
      name: item.name,
      category: item.category || 'Hardware',
      warehouse: item.warehouse || 'Austin Central',
      quantity: parseInt(item.quantity || item.stock, 10) || 100,
      stock: parseInt(item.quantity || item.stock, 10) || 100,
      minThreshold: parseInt(item.minThreshold, 10) || 50,
      unitCost: formatCurrency(item.unitCost),
      status: item.status || 'Optimal',
    };

    setInventory((prev) => [optimisticItem, ...prev]);

    try {
      const created = await erpService.createInventoryItem({
        sku: optimisticItem.sku,
        name: item.name,
        category: item.category,
        warehouse: item.warehouse,
        quantity: optimisticItem.quantity,
        minThreshold: optimisticItem.minThreshold,
        unitCost: item.unitCost,
        status: item.status,
      });
      if (created?.id) {
        setInventory((prev) =>
          prev.map((inv) => (inv.id === tempId ? { ...inv, id: created.id } : inv))
        );
        return created;
      }
    } catch (_) { }
    return optimisticItem;
  };

  return (
    <ErpContext.Provider
      value={{
        projects,
        salesOrders,
        purchaseOrders,
        inventory,
        isLoading,
        fetchErpData,
        createFromDeal,
        addProject,
        addPurchaseOrder,
        addInventoryItem,
      }}
    >
      {children}
    </ErpContext.Provider>
  );
};

export const useErp = () => useContext(ErpContext);
