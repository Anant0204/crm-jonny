import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useCurrency } from './CurrencyContext';
import crmService from '../services/crmService';

const CrmContext = createContext();

export const CrmProvider = ({ children }) => {
  const { currency, formatCurrency } = useCurrency();
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);

  // Live Notes and Activities State (Source of truth: MySQL via REST API)
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live CRM data from backend
  const fetchCrmData = useCallback(async () => {
    const token = localStorage.getItem('crm_token');
    if (!token) {
      setContacts([]);
      setLeads([]);
      setDeals([]);
      setTasks([]);
      setNotes([]);
      setActivities([]);
      return;
    }

    try {
      setIsLoading(true);
      const [leadsRes, contactsRes, dealsRes, tasksRes, notesRes, activitiesRes] = await Promise.allSettled([
        crmService.getLeads(),
        crmService.getContacts(),
        crmService.getDeals(),
        crmService.getTasks(),
        crmService.getNotes(),
        crmService.getActivities(),
      ]);

      if (leadsRes.status === 'fulfilled' && Array.isArray(leadsRes.value)) {
        const mappedLeads = leadsRes.value.map((l, idx) => {
          const rawNum = typeof l.estimatedValue === 'number' ? l.estimatedValue : parseFloat(String(l.estimatedValue).replace(/[^0-9.-]+/g, '')) || 0;
          return {
            ...l,
            id: l.id,
            displayId: `LED-${String(idx + 1).padStart(3, '0')}`,
            rawEstimatedValue: rawNum,
            value: formatCurrency(rawNum),
            status: typeof l.status === 'string' ? l.status.charAt(0) + l.status.slice(1).toLowerCase() : 'New',
            owner: l.assignedUser?.name || 'Alexander Wright',
          };
        });
        setLeads(mappedLeads);
      } else {
        setLeads([]);
      }

      if (contactsRes.status === 'fulfilled' && Array.isArray(contactsRes.value)) {
        const mappedContacts = contactsRes.value.map((c, idx) => {
          const rawNum = typeof c.totalValue === 'number' ? c.totalValue : parseFloat(String(c.totalValue).replace(/[^0-9.-]+/g, '')) || 0;
          return {
            ...c,
            id: c.id,
            displayId: `CNT-${String(idx + 1).padStart(3, '0')}`,
            rawTotalValue: rawNum,
            totalValue: formatCurrency(rawNum),
            owner: c.assignedUser?.name || 'Alexander Wright',
            dealsCount: c._count?.deals || 0,
            notesCount: c._count?.notes || 0,
          };
        });
        setContacts(mappedContacts);
      } else {
        setContacts([]);
      }

      if (dealsRes.status === 'fulfilled' && Array.isArray(dealsRes.value)) {
        const mappedDeals = dealsRes.value.map((d, idx) => {
          const rawNum = typeof d.value === 'number' ? d.value : parseFloat(String(d.value).replace(/[^0-9.-]+/g, '')) || 0;
          return {
            ...d,
            id: d.id,
            displayId: `DEL-${String(idx + 1).padStart(3, '0')}`,
            rawValue: rawNum,
            value: formatCurrency(rawNum),
            owner: d.assignedUser?.name || 'Alexander Wright',
            probability: d.probability ? `${d.probability}%` : '50%',
            stage: typeof d.stage === 'string'
              ? d.stage
                .split('_')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ')
              : 'Qualified',
            contact: typeof d.contact === 'object' && d.contact !== null ? d.contact.name : (d.contact || ''),
            contactObj: d.contact,
          };
        });
        setDeals(mappedDeals);
      } else {
        setDeals([]);
      }

      if (tasksRes.status === 'fulfilled' && Array.isArray(tasksRes.value)) {
        const mappedTasks = tasksRes.value.map((t) => ({
          ...t,
          id: t.id,
          status:
            t.status === 'COMPLETED'
              ? 'Completed'
              : t.status === 'IN_PROGRESS'
              ? 'In Progress'
              : t.status === 'CANCELLED'
              ? 'Cancelled'
              : 'Pending',
          priority: typeof t.priority === 'string' ? t.priority.charAt(0) + t.priority.slice(1).toLowerCase() : 'Medium',
          assignedTo: t.assignedUser?.name || 'Alexander Wright',
          contact: typeof t.contact === 'object' && t.contact !== null ? t.contact.name : (t.contact || ''),
          lead: typeof t.lead === 'object' && t.lead !== null ? t.lead.name : (t.lead || ''),
          deal: typeof t.deal === 'object' && t.deal !== null ? t.deal.title : (t.deal || ''),
          contactObj: t.contact,
          leadObj: t.lead,
          dealObj: t.deal,
        }));
        setTasks(mappedTasks);
      } else {
        setTasks([]);
      }

      if (notesRes.status === 'fulfilled' && Array.isArray(notesRes.value)) {
        setNotes(notesRes.value);
      } else {
        setNotes([]);
      }

      if (activitiesRes.status === 'fulfilled' && Array.isArray(activitiesRes.value)) {
        const mappedActivities = activitiesRes.value.map((a) => ({
          ...a,
          userName: a.user?.name || 'Alexander Wright',
          leadName: a.lead?.name || '',
          contactName: a.contact?.name || '',
          dealTitle: a.deal?.title || '',
        }));
        setActivities(mappedActivities);
      } else {
        setActivities([]);
      }
    } catch (_) {
      setContacts([]);
      setLeads([]);
      setDeals([]);
      setTasks([]);
      setNotes([]);
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Granular route-level refresh methods for real-time SWR on-mount sync
  const refreshDeals = useCallback(async () => {
    try {
      const data = await crmService.getDeals();
      if (Array.isArray(data)) {
        const mappedDeals = data.map((d, idx) => ({
          ...d,
          id: d.id,
          displayId: `DEL-${String(idx + 1).padStart(3, '0')}`,
          value: formatCurrency(d.value),
          owner: d.assignedUser?.name || 'Alexander Wright',
          probability: d.probability ? `${d.probability}%` : '50%',
          stage: typeof d.stage === 'string'
            ? d.stage
                .split('_')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ')
            : 'Qualified',
          contact: typeof d.contact === 'object' && d.contact !== null ? d.contact.name : (d.contact || ''),
          contactObj: d.contact,
        }));
        setDeals(mappedDeals);
      }
    } catch (e) {
      console.warn('Live refresh deals error:', e);
    }
  }, [formatCurrency]);

  const refreshContacts = useCallback(async () => {
    try {
      const data = await crmService.getContacts();
      if (Array.isArray(data)) {
        const mappedContacts = data.map((c, idx) => ({
          ...c,
          id: c.id,
          displayId: `CNT-${String(idx + 1).padStart(3, '0')}`,
          totalValue: formatCurrency(c.totalValue),
          owner: c.assignedUser?.name || 'Alexander Wright',
          dealsCount: c._count?.deals || 0,
          notesCount: c._count?.notes || 0,
        }));
        setContacts(mappedContacts);
      }
    } catch (e) {
      console.warn('Live refresh contacts error:', e);
    }
  }, [formatCurrency]);

  const refreshLeads = useCallback(async () => {
    try {
      const data = await crmService.getLeads();
      if (Array.isArray(data)) {
        const mappedLeads = data.map((l, idx) => ({
          ...l,
          id: l.id,
          displayId: `LED-${String(idx + 1).padStart(3, '0')}`,
          value: formatCurrency(l.estimatedValue),
          status: typeof l.status === 'string' ? l.status.charAt(0) + l.status.slice(1).toLowerCase() : 'New',
          owner: l.assignedUser?.name || 'Alexander Wright',
        }));
        setLeads(mappedLeads);
      }
    } catch (e) {
      console.warn('Live refresh leads error:', e);
    }
  }, [formatCurrency]);

  const refreshTasks = useCallback(async () => {
    try {
      const data = await crmService.getTasks();
      if (Array.isArray(data)) {
        const mappedTasks = data.map((t) => ({
          ...t,
          id: t.id,
          status:
            t.status === 'COMPLETED'
              ? 'Completed'
              : t.status === 'IN_PROGRESS'
              ? 'In Progress'
              : t.status === 'CANCELLED'
              ? 'Cancelled'
              : 'Pending',
          priority: typeof t.priority === 'string' ? t.priority.charAt(0) + t.priority.slice(1).toLowerCase() : 'Medium',
          assignedTo: t.assignedUser?.name || 'Alexander Wright',
          contact: typeof t.contact === 'object' && t.contact !== null ? t.contact.name : (t.contact || ''),
          lead: typeof t.lead === 'object' && t.lead !== null ? t.lead.name : (t.lead || ''),
          deal: typeof t.deal === 'object' && t.deal !== null ? t.deal.title : (t.deal || ''),
          contactObj: t.contact,
          leadObj: t.lead,
          dealObj: t.deal,
        }));
        setTasks(mappedTasks);
      }
    } catch (e) {
      console.warn('Live refresh tasks error:', e);
    }
  }, []);

  const refreshActivities = useCallback(async () => {
    try {
      const data = await crmService.getActivities();
      if (Array.isArray(data)) {
        const mappedActivities = data.map((a) => ({
          ...a,
          userName: a.user?.name || 'Alexander Wright',
          leadName: a.lead?.name || '',
          contactName: a.contact?.name || '',
          dealTitle: a.deal?.title || '',
        }));
        setActivities(mappedActivities);
      }
    } catch (e) {
      console.warn('Live refresh activities error:', e);
    }
  }, []);

  const refreshNotes = useCallback(async () => {
    try {
      const data = await crmService.getNotes();
      if (Array.isArray(data)) {
        setNotes(data);
      }
    } catch (e) {
      console.warn('Live refresh notes error:', e);
    }
  }, []);

  const { isCrmAuthenticated, crmUser } = useAuth();

  // Initial load & trigger on login/auth change
  useEffect(() => {
    fetchCrmData();
  }, [fetchCrmData, isCrmAuthenticated, crmUser?.userId, crmUser?.email]);

  // Re-format all live CRM records dynamically whenever currency is switched (USD <-> INR)
  useEffect(() => {
    setLeads((prev) =>
      prev.map((l) => {
        const raw = l.rawEstimatedValue ?? (typeof l.estimatedValue === 'number' ? l.estimatedValue : parseFloat(String(l.value || l.estimatedValue).replace(/[^0-9.-]+/g, '')) || 0);
        return {
          ...l,
          rawEstimatedValue: raw,
          value: formatCurrency(raw),
        };
      })
    );
    setDeals((prev) =>
      prev.map((d) => {
        const raw = d.rawValue ?? (typeof d.value === 'number' ? d.value : parseFloat(String(d.value).replace(/[^0-9.-]+/g, '')) || 0);
        return {
          ...d,
          rawValue: raw,
          value: formatCurrency(raw),
        };
      })
    );
    setContacts((prev) =>
      prev.map((c) => {
        const raw = c.rawTotalValue ?? (typeof c.totalValue === 'number' ? c.totalValue : parseFloat(String(c.totalValue).replace(/[^0-9.-]+/g, '')) || 0);
        return {
          ...c,
          rawTotalValue: raw,
          totalValue: formatCurrency(raw),
        };
      })
    );
  }, [currency, formatCurrency]);

  // ============================================================================
  // Contacts CRUD
  // ============================================================================
  const addContact = async (newContact) => {
    const tempId = `CNT-${Math.floor(100 + Math.random() * 900)}`;
    const item = {
      id: tempId,
      createdDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      status: newContact.status || 'Active',
      type: newContact.type || 'Enterprise Client',
      owner: newContact.owner || 'Alexander Wright',
      notesCount: 0,
      dealsCount: 0,
      totalValue: formatCurrency(newContact.totalValue || 0),
      ...newContact,
    };

    setContacts((prev) => [item, ...prev]);

    // Live API call
    try {
      const created = await crmService.createContact({
        name: newContact.name,
        company: newContact.company,
        email: newContact.email,
        phone: newContact.phone,
        type: newContact.type,
        title: newContact.title,
        status: newContact.status,
        totalValue: newContact.totalValue,
      });
      if (created?.id) {
        setContacts((prev) =>
          prev.map((c) => (c.id === tempId ? { ...c, id: created.id, totalValue: formatCurrency(created.totalValue) } : c))
        );
        return created;
      }
    } catch (_) {
      // Local optimistic state kept
    }
    return item;
  };

  const editContact = async (id, updatedFields) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );

    try {
      await crmService.updateContact(id, updatedFields);
    } catch (_) { }
  };

  const deleteContact = async (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    try {
      await crmService.deleteContact(id);
    } catch (_) { }
  };

  const bulkDeleteContacts = async (ids) => {
    setContacts((prev) => prev.filter((c) => !ids.includes(c.id)));
    try {
      await crmService.bulkDeleteContacts(ids);
    } catch (_) { }
  };

  // ============================================================================
  // Leads CRUD
  // ============================================================================
  const addLead = async (newLead) => {
    const tempId = `LED-${Math.floor(200 + Math.random() * 900)}`;
    const item = {
      id: tempId,
      createdDate: new Date().toISOString().split('T')[0],
      status: newLead.status || 'New',
      score: parseInt(newLead.score, 10) || 75,
      value: formatCurrency(newLead.value || 100000),
      owner: newLead.owner || 'Alexander Wright',
      ...newLead,
    };

    setLeads((prev) => [item, ...prev]);

    // Live API call
    try {
      const created = await crmService.createLead({
        name: newLead.name,
        company: newLead.company,
        email: newLead.email,
        phone: newLead.phone,
        source: newLead.source,
        territory: newLead.territory,
        status: newLead.status,
        score: newLead.score,
        value: newLead.value,
      });
      if (created?.id) {
        setLeads((prev) =>
          prev.map((l) => (l.id === tempId ? { ...l, id: created.id, value: formatCurrency(created.estimatedValue) } : l))
        );
        return created;
      }
    } catch (_) { }
    return item;
  };

  const editLead = async (id, updatedFields) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l))
    );

    try {
      await crmService.updateLead(id, updatedFields);
    } catch (_) { }
  };

  const deleteLead = async (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    try {
      await crmService.deleteLead(id);
    } catch (_) { }
  };

  const convertLeadToContact = async (leadId) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return null;

    try {
      const res = await crmService.convertLead(leadId);
      if (res?.contact) {
        const mappedContact = {
          ...res.contact,
          id: res.contact.id,
          totalValue: formatCurrency(res.contact.totalValue || targetLead.value),
          owner: res.contact.assignedUser?.name || targetLead.owner || 'Alexander Wright',
          dealsCount: 1,
          notesCount: 0,
        };

        const mappedDeal = res.deal ? {
          ...res.deal,
          id: res.deal.id,
          value: formatCurrency(res.deal.value),
          owner: res.deal.assignedUser?.name || targetLead.owner || 'Alexander Wright',
          probability: res.deal.probability ? `${res.deal.probability}%` : '60%',
          stage: 'Qualified',
          contact: res.contact.name,
          contactId: res.contact.id,
          contactObj: res.contact,
        } : null;

        const mappedTask = res.task ? {
          ...res.task,
          id: res.task.id,
          status: 'Pending',
          priority: 'High',
          assignedTo: res.task.assignedUser?.name || targetLead.owner || 'Alexander Wright',
          contact: res.contact.name,
          contactId: res.contact.id,
          lead: targetLead.name,
          deal: mappedDeal?.title || '',
        } : null;

        // 1. Update Lead Status
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId
              ? { ...l, status: 'Won', convertedToContactId: res.contact.id }
              : l
          )
        );

        // 2. Add Contact if not already present
        setContacts((prev) => {
          if (prev.some((c) => c.id === mappedContact.id)) return prev;
          return [mappedContact, ...prev];
        });

        // 3. Add Deal if not already present
        if (mappedDeal) {
          setDeals((prev) => {
            if (prev.some((d) => d.id === mappedDeal.id)) return prev;
            return [mappedDeal, ...prev];
          });
        }

        // 4. Add Task if not already present
        if (mappedTask) {
          setTasks((prev) => {
            if (prev.some((t) => t.id === mappedTask.id)) return prev;
            return [mappedTask, ...prev];
          });
        }

        // 5. Add Activity if present
        if (res.activity) {
          setActivities((prev) => [
            {
              ...res.activity,
              userName: targetLead.owner || 'Alexander Wright',
              contactName: res.contact.name,
              dealTitle: mappedDeal?.title || '',
            },
            ...prev,
          ]);
        }

        return { contact: mappedContact, deal: mappedDeal, task: mappedTask };
      }
    } catch (_) {
      // Offline / Local State Fallback
    }

    // Local optimistic fallback
    const tempContactId = `CNT-${Math.floor(100 + Math.random() * 900)}`;
    const tempDealId = `DEAL-${Math.floor(300 + Math.random() * 900)}`;
    const tempTaskId = `TSK-${Math.floor(400 + Math.random() * 900)}`;

    const fallbackContact = {
      id: tempContactId,
      name: targetLead.name,
      company: targetLead.company,
      email: targetLead.email,
      phone: targetLead.phone,
      type: 'Converted Lead',
      owner: targetLead.owner || 'Alexander Wright',
      status: 'Active',
      totalValue: targetLead.value,
      dealsCount: 1,
      notesCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
    };

    const fallbackDeal = {
      id: tempDealId,
      title: `${targetLead.company || targetLead.name} - Commercial Contract`,
      customer: targetLead.name || targetLead.company,
      value: targetLead.value,
      stage: 'Qualified',
      probability: '60%',
      expectedClose: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: targetLead.owner || 'Alexander Wright',
      contactId: tempContactId,
      contact: targetLead.name,
    };

    const fallbackTask = {
      id: tempTaskId,
      title: `Follow up on Qualified Deal - ${targetLead.company || targetLead.name}`,
      priority: 'High',
      status: 'Pending',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reminder: '9:00 AM',
      assignedTo: targetLead.owner || 'Alexander Wright',
      contactId: tempContactId,
      contact: targetLead.name,
    };

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: 'Won', convertedToContactId: tempContactId } : l))
    );
    setContacts((prev) => [fallbackContact, ...prev]);
    setDeals((prev) => [fallbackDeal, ...prev]);
    setTasks((prev) => [fallbackTask, ...prev]);

    return { contact: fallbackContact, deal: fallbackDeal, task: fallbackTask };
  };

  // ============================================================================
  // Deals / Pipeline CRUD
  // ============================================================================
  const addDeal = async (newDeal) => {
    const tempId = `DEAL-${Math.floor(300 + Math.random() * 900)}`;
    const item = {
      id: tempId,
      stage: newDeal.stage || 'New Lead',
      probability: newDeal.probability ? `${newDeal.probability}%` : '50%',
      expectedClose: newDeal.expectedClose || new Date().toISOString().split('T')[0],
      value: formatCurrency(newDeal.value || 0),
      owner: newDeal.owner || 'Alexander Wright',
      ...newDeal,
    };

    setDeals((prev) => [item, ...prev]);

    try {
      const created = await crmService.createDeal({
        title: newDeal.title,
        customer: newDeal.customer,
        value: newDeal.value,
        stage: newDeal.stage,
        probability: parseInt(newDeal.probability, 10),
        expectedClose: newDeal.expectedClose,
        description: newDeal.description,
      });
      if (created?.id) {
        setDeals((prev) =>
          prev.map((d) => (d.id === tempId ? { ...d, id: created.id } : d))
        );
        return created;
      }
    } catch (_) { }
    return item;
  };

  const moveDealStage = async (dealId, newStage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d))
    );

    try {
      await crmService.updateDeal(dealId, { stage: newStage });
    } catch (_) { }
  };

  const deleteDeal = async (id) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
    try {
      await crmService.deleteDeal(id);
    } catch (_) { }
  };

  // ============================================================================
  // Tasks CRUD
  // ============================================================================
  const addTask = async (newTask) => {
    const tempId = `TSK-${Math.floor(400 + Math.random() * 900)}`;
    const item = {
      id: tempId,
      status: 'Pending',
      priority: newTask.priority || 'Medium',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      reminder: newTask.reminder || '9:00 AM',
      assignedTo: newTask.assignedTo || 'Alexander Wright',
      ...newTask,
    };

    setTasks((prev) => [item, ...prev]);

    try {
      const created = await crmService.createTask({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: 'PENDING',
        dueDate: newTask.dueDate,
        reminder: newTask.reminder,
        leadId: newTask.leadId,
        contactId: newTask.contactId,
        dealId: newTask.dealId,
      });
      if (created?.id) {
        setTasks((prev) =>
          prev.map((t) => (t.id === tempId ? { ...t, id: created.id } : t))
        );
        return created;
      }
    } catch (_) { }
    return item;
  };

  const toggleTaskCompletion = async (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
          : t
      )
    );

    try {
      await crmService.toggleTask(id);
    } catch (_) { }
  };

  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await crmService.deleteTask(id);
    } catch (_) { }
  };

  // ============================================================================
  // Notes CRUD (Live MySQL DB Integration)
  // ============================================================================
  const addNote = async (noteData) => {
    const tempId = `NOTE-${Date.now()}`;
    const optimisticNote = {
      id: tempId,
      content: noteData.content || '',
      contactId: noteData.contactId || null,
      leadId: noteData.leadId || null,
      dealId: noteData.dealId || null,
      createdAt: new Date().toISOString(),
      author: { name: 'Current User' },
    };

    setNotes((prev) => [optimisticNote, ...prev]);

    try {
      const created = await crmService.createNote({
        content: noteData.content,
        contactId: noteData.contactId,
        leadId: noteData.leadId,
        dealId: noteData.dealId,
      });
      if (created?.id) {
        setNotes((prev) =>
          prev.map((n) => (n.id === tempId ? created : n))
        );
        // Also refresh activities since note creation logs an activity
        crmService.getActivities().then((acts) => {
          if (Array.isArray(acts)) setActivities(acts);
        }).catch(() => { });
        return created;
      }
    } catch (err) {
      // Revert optimistic note on failure
      setNotes((prev) => prev.filter((n) => n.id !== tempId));
      throw err;
    }
    return optimisticNote;
  };

  const editNote = async (id, updatedFields) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updatedFields } : n))
    );

    try {
      const updated = await crmService.updateNote(id, updatedFields);
      if (updated?.id) {
        setNotes((prev) =>
          prev.map((n) => (n.id === id ? updated : n))
        );
        return updated;
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteNote = async (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    try {
      await crmService.deleteNote(id);
    } catch (err) {
      throw err;
    }
  };

  // ============================================================================
  // Activities CRUD (Live MySQL DB Integration)
  // ============================================================================
  const addActivity = async (activityData) => {
    const tempId = `ACT-${Date.now()}`;
    const optimisticActivity = {
      id: tempId,
      type: activityData.type || 'NOTE_ADDED',
      title: activityData.title || '',
      description: activityData.description || null,
      contactId: activityData.contactId || null,
      leadId: activityData.leadId || null,
      dealId: activityData.dealId || null,
      createdAt: new Date().toISOString(),
      user: { name: 'Current User' },
    };

    setActivities((prev) => [optimisticActivity, ...prev]);

    try {
      const created = await crmService.createActivity(activityData);
      if (created?.id) {
        setActivities((prev) =>
          prev.map((a) => (a.id === tempId ? created : a))
        );
        return created;
      }
    } catch (err) {
      setActivities((prev) => prev.filter((a) => a.id !== tempId));
      throw err;
    }
    return optimisticActivity;
  };

  // Helpers for filtering notes & activities per contact / entity
  const getContactNotes = (contactId) => {
    if (!contactId) return [];
    return notes.filter((n) => n.contactId === contactId);
  };

  const getContactActivities = (contactId) => {
    if (!contactId) return [];
    return activities.filter((a) => a.contactId === contactId);
  };

  // ============================================================================
  // Messages CRUD
  // ============================================================================
  const sendMessage = (newMsg) => {
    const item = {
      id: `MSG-${Math.floor(500 + Math.random() * 900)}`,
      timestamp: 'Just now',
      ...newMsg,
    };
    setMessages((prev) => [item, ...prev]);
    return item;
  };

  return (
    <CrmContext.Provider
      value={{
        contacts,
        addContact,
        editContact,
        deleteContact,
        bulkDeleteContacts,
        leads,
        addLead,
        editLead,
        deleteLead,
        convertLeadToContact,
        deals,
        addDeal,
        moveDealStage,
        deleteDeal,
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        notes,
        addNote,
        editNote,
        deleteNote,
        getContactNotes,
        activities,
        addActivity,
        getContactActivities,
        messages,
        sendMessage,
        isLoading,
        refetchCrmData: fetchCrmData,
        refreshDeals,
        refreshContacts,
        refreshLeads,
        refreshTasks,
        refreshActivities,
        refreshNotes,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};

export default CrmContext;
