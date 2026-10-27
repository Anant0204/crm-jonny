import React, { createContext, useContext, useState, useEffect } from 'react';

const OalContext = createContext();

export const stageNames = [
  'Registered',
  'Verified',
  'KYC',
  'Application',
  'Documents',
  'AI Score',
  'Qualified',
  'Offers',
  'Accepted',
  'Processing',
  'Funded',
];

export const OalProvider = ({ children }) => {
  const [applicationStage, setApplicationStage] = useState(0);

  const [applicationDraft, setApplicationDraft] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    taxId: '',
    yearsInBusiness: '',
    annualRevenue: '',
    loanAmount: '',
    loanTerm: '',
    loanPurpose: '',
    collateralType: '',
    monthlyRevenue: '',
    netOperatingIncome: '',
  });

  const [offers, setOffers] = useState([]);
  const [acceptedOffer, setAcceptedOffer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [lenderLeads, setLenderLeads] = useState([]);
  const [repTasks, setRepTasks] = useState([]);

  const updateDraft = (fields) => {
    setApplicationDraft((prev) => ({ ...prev, ...fields }));
  };

  const acceptLenderOffer = (offer) => {
    setAcceptedOffer(offer);
    setApplicationStage(8);
    setOffers((prev) =>
      prev.map((o) => (o.id === offer.id ? { ...o, status: 'Accepted' } : { ...o, status: 'Declined' }))
    );
  };

  const sendAgentMessage = (text) => {
    const newMsg = {
      id: Date.now().toString(),
      sender: 'Borrower',
      text,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const toggleSaveLead = (id) => {
    setLenderLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l))
    );
  };

  const addLenderOffer = (newOffer) => {
    setOffers((prev) => [newOffer, ...prev]);
  };

  const addRepTask = (task) => {
    const newTsk = { id: `TSK-${Date.now()}`, status: 'Pending', ...task };
    setRepTasks((prev) => [newTsk, ...prev]);
  };

  return (
    <OalContext.Provider
      value={{
        applicationStage,
        setApplicationStage,
        applicationDraft,
        updateDraft,
        offers,
        acceptedOffer,
        acceptLenderOffer,
        addLenderOffer,
        messages,
        sendAgentMessage,
        lenderLeads,
        toggleSaveLead,
        repTasks,
        addRepTask,
        stageNames,
      }}
    >
      {children}
    </OalContext.Provider>
  );
};

export const useOal = () => useContext(OalContext);
