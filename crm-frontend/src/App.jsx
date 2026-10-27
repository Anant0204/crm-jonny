import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CrmProvider } from './context/CrmContext';
import { ErpProvider } from './context/ErpContext';
import { HrProvider } from './context/HrContext';
import { SupportProvider } from './context/SupportContext';
import { OalProvider } from './context/OalContext';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AppRoutes } from './routes/AppRoutes';
import { CallProvider } from './context/CallContext';
import { ActiveCallOverlay } from './components/call/ActiveCallOverlay';

import './styles/variables.css';
import './styles/global.css';
import './styles/utilities.css';
import './styles/components.css';
import './styles/responsive.css';

export function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <CurrencyProvider>
              <ToastProvider>
                <CrmProvider>
                  <ErpProvider>
                    <HrProvider>
                      <SupportProvider>
                        <OalProvider>
                          <CallProvider>
                            <AppRoutes />
                            <ActiveCallOverlay />
                          </CallProvider>
                        </OalProvider>
                      </SupportProvider>
                    </HrProvider>
                  </ErpProvider>
                </CrmProvider>
              </ToastProvider>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
