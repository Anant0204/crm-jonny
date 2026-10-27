import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 1. Check URL query parameters (e.g. from marketing website redirect: ?theme=light or ?theme=dark)
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const queryTheme = urlParams.get('theme');
        if (queryTheme === 'light' || queryTheme === 'dark') {
          localStorage.setItem('app_theme', queryTheme);
          return queryTheme;
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    // 2. Check saved theme in localStorage
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // 3. Fallback to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
