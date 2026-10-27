import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CurrencyContext = createContext();

// Commercial standard conversion rate: 1 USD = 83 INR
export const USD_TO_INR_RATE = 83;

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(() => {
    const saved = localStorage.getItem('crm_currency');
    return saved === 'INR' ? 'INR' : 'USD';
  });

  const setCurrency = useCallback((newCurr) => {
    const clean = String(newCurr).toUpperCase().includes('INR') ? 'INR' : 'USD';
    setCurrencyState(clean);
    localStorage.setItem('crm_currency', clean);
    window.dispatchEvent(new CustomEvent('crm:currency-changed', { detail: clean }));
  }, []);

  // Format any raw value (USD base) to current currency string
  const formatCurrency = useCallback((val, customCurrency = null) => {
    const activeCurrency = customCurrency || currency;
    if (val === undefined || val === null || val === '') {
      return activeCurrency === 'INR' ? '₹0' : '$0';
    }

    let num = 0;
    if (typeof val === 'number') {
      num = val;
    } else {
      const strVal = String(val).trim();
      const cleaned = strVal.replace(/[^0-9.-]+/g, '');
      const parsed = parseFloat(cleaned) || 0;
      
      // If string was already INR prefixed, don't multiply by rate again
      if (strVal.startsWith('₹')) {
        num = activeCurrency === 'USD' ? parsed / USD_TO_INR_RATE : parsed;
        if (activeCurrency === 'INR') {
          return '₹' + Math.round(parsed).toLocaleString('en-IN');
        }
        return '$' + Math.round(num).toLocaleString('en-US');
      }

      num = parsed;
    }

    if (activeCurrency === 'INR') {
      const inrVal = Math.round(num * USD_TO_INR_RATE);
      return '₹' + inrVal.toLocaleString('en-IN');
    }

    return '$' + Math.round(num).toLocaleString('en-US');
  }, [currency]);

  // Convert raw USD numeric value to display number in current currency
  const convertValue = useCallback((val) => {
    const raw = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^0-9.-]+/g, '')) || 0;
    return currency === 'INR' ? Math.round(raw * USD_TO_INR_RATE) : Math.round(raw);
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatCurrency,
        convertValue,
        currencySymbol: currency === 'INR' ? '₹' : '$',
        exchangeRate: USD_TO_INR_RATE,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    const fallbackCurrency = localStorage.getItem('crm_currency') === 'INR' ? 'INR' : 'USD';
    return {
      currency: fallbackCurrency,
      setCurrency: () => {},
      currencySymbol: fallbackCurrency === 'INR' ? '₹' : '$',
      formatCurrency: (val) => {
        const raw = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^0-9.-]+/g, '')) || 0;
        if (fallbackCurrency === 'INR') {
          return '₹' + Math.round(raw * USD_TO_INR_RATE).toLocaleString('en-IN');
        }
        return '$' + Math.round(raw).toLocaleString('en-US');
      },
      convertValue: (val) => {
        const raw = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^0-9.-]+/g, '')) || 0;
        return fallbackCurrency === 'INR' ? Math.round(raw * USD_TO_INR_RATE) : Math.round(raw);
      },
      exchangeRate: USD_TO_INR_RATE,
    };
  }
  return context;
};

export default CurrencyContext;
