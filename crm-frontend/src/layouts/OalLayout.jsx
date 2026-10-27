import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { CrmMobileAppDrawer } from './components/CrmMobileAppDrawer';
import { ToastContainer } from '../components/ui/Toast';
import { useResponsive } from '../hooks/useResponsive';

export const OalLayout = () => {
  const { isMobile, isTablet } = useResponsive();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isTablet);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileDrawerOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        maxHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
      }}
    >
      {/* Fixed Topbar Header */}
      <Topbar onToggleSidebar={handleToggleSidebar} product="oal" />

      {/* Main Shell Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          height: 'calc(100vh - var(--topbar-height))',
          maxHeight: 'calc(100vh - var(--topbar-height))',
        }}
      >
        {/* Desktop / Tablet Sidebar (Fixed Height) */}
        {!isMobile && (
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
            product="oal"
          />
        )}

        {/* Main Content Area — ONLY THIS AREA SCROLLS */}
        <main
          className="main-content"
          style={{
            flex: 1,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            minWidth: 0,
            maxWidth: '100%',
            width: '100%',
            padding: isMobile ? '0.875rem' : '1.5rem',
            paddingBottom: isMobile ? '1rem' : '1.5rem',
            backgroundColor: 'var(--background)',
            boxSizing: 'border-box',
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Native Mobile App Slide-Out Touch Drawer (< 768px) */}
      <CrmMobileAppDrawer
        isOpen={isMobile && isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        product="oal"
      />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};
