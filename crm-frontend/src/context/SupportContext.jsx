import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supportService from '../services/supportService';
import { useAuth } from './AuthContext';

const SupportContext = createContext();

export const SupportProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [kbArticles, setKbArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isCrmAuthenticated } = useAuth();

  const fetchSupportData = useCallback(async () => {
    const token = localStorage.getItem('crm_token');
    if (!token) {
      setTickets([]);
      setKbArticles([]);
      return;
    }

    try {
      setIsLoading(true);
      const [tckRes, artRes] = await Promise.allSettled([
        supportService.getTickets(),
        supportService.getArticles(),
      ]);

      if (tckRes.status === 'fulfilled' && Array.isArray(tckRes.value)) {
        setTickets(tckRes.value);
      } else {
        setTickets([]);
      }

      if (artRes.status === 'fulfilled' && Array.isArray(artRes.value)) {
        setKbArticles(artRes.value);
      } else {
        setKbArticles([]);
      }
    } catch (error) {
      console.error('Failed to load support data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSupportData();
  }, [fetchSupportData, isCrmAuthenticated]);

  const addTicket = async (item) => {
    const created = await supportService.createTicket(item);
    setTickets((prev) => [created, ...prev]);
    return created;
  };

  const updateTicketStatus = async (id, newStatus) => {
    const updated = await supportService.updateTicket(id, { status: newStatus });
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    return updated;
  };

  const addArticle = async (item) => {
    const created = await supportService.createArticle(item);
    setKbArticles((prev) => [created, ...prev]);
    return created;
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        kbArticles,
        isLoading,
        fetchSupportData,
        addTicket,
        updateTicketStatus,
        addArticle,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => useContext(SupportContext);
