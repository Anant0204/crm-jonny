import React from 'react';
import { Sparkles, Copy, Users } from 'lucide-react';
import { Breadcrumb, Button, Card, Input } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerReferrals = () => {
  const { addToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText('https://oalnetwork.com/apply?ref=BIOGENIX-792');
    addToast({ title: 'Referral Link Copied', message: 'Share link with business peers.', type: 'success' });
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '680px', margin: '0 auto' }}>
      <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'Referral Rewards' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Borrower Referral Program</h1>

      <Card className="p-6 flex flex-col gap-4 text-center items-center">
        <Sparkles size={40} className="text-accent" />
        <h3 className="text-lg">Earn $2,500 Credit Bonus</h3>
        <p className="text-xs text-secondary margin-0 max-w-md">
          Refer qualified commercial entities to OAL Network. When their loan principal is funded, both accounts receive a $2,500 origination fee credit.
        </p>

        <div className="flex gap-2 w-full max-w-md mt-2">
          <Input value="https://oalnetwork.com/apply?ref=BIOGENIX-792" readOnly />
          <Button variant="primary" icon={Copy} onClick={handleCopy} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
            Copy Link
          </Button>
        </div>
      </Card>
    </div>
  );
};

export const OalBorrowerSupport = () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'Help & Support' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Borrower Support Desk</h1>
      <Card className="p-6">
        <p className="text-xs text-secondary">Contact OAL Marketplace Desk: support@oalnetwork.com | Hotline: +1 (800) 555-OAL-NET</p>
      </Card>
    </div>
  );
};

export const OalBorrowerSettings = () => {
  const { addToast } = useToast();
  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '680px', margin: '0 auto' }}>
      <Breadcrumb items={[{ label: 'OAL Borrower' }, { label: 'Account Settings' }]} />
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Borrower Portal Settings</h1>
      <Card className="p-6 flex flex-col gap-4">
        <Input label="Borrower Name" value="Dr. Aris Thorne" readOnly />
        <Input label="Corporate Account" value="BioGenix Labs Inc." readOnly />
        <Button variant="primary" size="sm" onClick={() => addToast({ title: 'Settings Saved', type: 'success' })} style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}>
          Save Preferences
        </Button>
      </Card>
    </div>
  );
};
