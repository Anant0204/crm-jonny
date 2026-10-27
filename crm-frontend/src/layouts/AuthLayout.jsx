import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from '../components/ui/Toast';

export const AuthLayout = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        height: '100vh',
        backgroundColor: '#060a16',
        backgroundImage: 'radial-gradient(circle at 50% 25%, rgba(139, 92, 246, 0.16) 0%, transparent 60%), radial-gradient(circle at 15% 75%, rgba(34, 211, 238, 0.12) 0%, transparent 50%), url("/auth-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1rem',
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <main style={{ width: '100%', maxWidth: '480px', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
};
