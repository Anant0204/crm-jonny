import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { WebsiteNavbar } from '../components/website/WebsiteNavbar';
import { WebsiteFooter } from '../components/website/WebsiteFooter';
import { AskMyZunmeModal } from '../components/website/AskMyZunmeModal';
import { SalesChatEboxModal } from '../components/website/SalesChatEboxModal';
import { ItemDetailModal } from '../components/website/ItemDetailModal';
import { SignupModal } from '../components/website/SignupModal';
import '../styles/website.css';

export const WebsiteLayout = () => {
  const [isZunmeOpen, setIsZunmeOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenZunme = () => setIsZunmeOpen(true);
  const handleOpenSales = () => setIsSalesOpen(true);
  const handleOpenSignup = () => setIsSignupOpen(true);
  const handleSelectItem = (item) => setSelectedItem(item);

  return (
    <div className="crm-website-theme">
      {/* Sticky Top Header Navigation */}
      <WebsiteNavbar
        onOpenZunme={handleOpenZunme}
        onOpenSales={handleOpenSales}
        onOpenSignup={handleOpenSignup}
        onSelectItem={handleSelectItem}
      />

      {/* Main Website Page Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet
          context={{
            onOpenZunme: handleOpenZunme,
            onOpenSales: handleOpenSales,
            onOpenSignup: handleOpenSignup,
            onSelectItem: handleSelectItem,
          }}
        />
      </main>

      {/* Website Footer */}
      <WebsiteFooter
        onOpenZunme={handleOpenZunme}
        onOpenSales={handleOpenSales}
        onOpenSignup={handleOpenSignup}
      />

      {/* Sign Up / Create Account Form Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />

      {/* Ask My Zunme — VA Virtual Assistant Modal */}
      <AskMyZunmeModal
        isOpen={isZunmeOpen}
        onClose={() => setIsZunmeOpen(false)}
        onOpenSales={handleOpenSales}
      />

      {/* SALES — chat eBox Modal */}
      <SalesChatEboxModal
        isOpen={isSalesOpen}
        onClose={() => setIsSalesOpen(false)}
      />

      {/* Module / Solution / Industry Detail Showcase Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onOpenSales={handleOpenSales}
        onOpenZunme={handleOpenZunme}
      />
    </div>
  );
};
