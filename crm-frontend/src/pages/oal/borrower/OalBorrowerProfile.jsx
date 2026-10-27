import React, { useState, useRef } from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  Input,
} from '../../../components/ui';
import {
  User,
  Camera,
  Upload,
  Trash2,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

export const OalBorrowerProfile = () => {
  const { oalUser, setOalUser } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  // Form State initialized from active user
  const [formData, setFormData] = useState({
    name: oalUser?.name || 'Dr. Aris Thorne',
    title: oalUser?.role === 'rep' ? 'Licensed Underwriting Representative' : oalUser?.role === 'lender' ? 'Managing Director & Capital Lead' : oalUser?.role === 'admin' ? 'Master Platform Administrator' : 'Chief Executive Officer & Founder',
    email: oalUser?.email || 'a.thorne@biogenix.org',
    phone: '+1 (555) 438-9201',
    company: oalUser?.company || (oalUser?.role === 'rep' ? 'OAL Network Underwriting Desk' : oalUser?.role === 'lender' ? 'Vanguard Capital Debt Fund' : 'BioGenix Labs Inc.'),
    ein: 'XX-XXX7201',
    address: '450 Innovation Parkway, Suite 800',
    cityState: 'Cambridge, MA 02142',
    bio: 'Lead representative managing commercial underwriting facilities and operations.',
  });

  const [avatarPreview, setAvatarPreview] = useState(oalUser?.avatar || null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Handle Photo Upload with native file picker
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast({
        title: 'Invalid File',
        message: 'Please upload an image file (PNG, JPG, or WEBP).',
        type: 'error',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      setAvatarPreview(result);
      // Immediately update auth context so topbar syncs in real-time
      if (setOalUser) {
        setOalUser((prev) => ({ ...prev, avatar: result }));
      }
      addToast({
        title: 'Photo Uploaded',
        message: 'Profile photo updated successfully.',
        type: 'success',
      });
    };
    reader.readAsDataURL(file);
  };

  // Remove Photo
  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    if (setOalUser) {
      setOalUser((prev) => ({ ...prev, avatar: null }));
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    addToast({
      title: 'Photo Removed',
      message: 'Profile picture reset to default avatar initials.',
      type: 'info',
    });
  };

  // Save full profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      if (setOalUser) {
        setOalUser((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          avatar: avatarPreview,
        }));
      }
      setIsSaving(false);
      addToast({
        title: 'Profile Saved',
        message: 'Your personal and corporate profile changes have been updated.',
        type: 'success',
      });
    }, 400);
  };

  // Get initials for fallback avatar
  const getInitials = (name) => {
    const parts = (name || 'Aris Thorne').split(' ').filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return (parts[0] || 'AT').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header Section */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'OAL Network' }, { label: 'Borrower Profile' }]} />
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0.25rem 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Account Profile & Identity
          </h1>
        </div>

        <div className="header-actions-right">
          <Badge variant="success" icon={ShieldCheck}>
            FinCEN CDD Verified
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
        {/* 2. Profile Photo & Core Identity Strip */}
        <div className="flex flex-col gap-2.5">
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Profile Picture & Avatar
          </h2>

          <Card style={{ padding: '1.25rem', borderRadius: '12px', width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full min-w-0">
              <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1 w-full">
                {/* Large Avatar Container with Overlay */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: avatarPreview ? 'transparent' : 'var(--accent)',
                      backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '18px',
                      border: '3px solid var(--surface-secondary)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    {!avatarPreview && getInitials(formData.name)}
                  </div>

                  {/* Camera icon badge */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--surface)',
                      border: '2px solid var(--surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    title="Upload new photo"
                  >
                    <Camera size={11} />
                  </button>
                </div>

                <div className="flex flex-col gap-1 min-w-0 flex-1" style={{ maxWidth: '100%' }}>
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formData.name}
                    </span>
                    <Badge variant="success" icon={CheckCircle2} style={{ fontSize: '11px', padding: '2px 8px', whiteSpace: 'nowrap' }}>
                      Verified Signatory
                    </Badge>
                  </div>
                  <span className="text-secondary" style={{ fontSize: '12px', lineHeight: 1.4, wordBreak: 'break-word' }}>
                    {formData.title} &bull; {formData.company}
                  </span>
                  <span className="text-tertiary" style={{ fontSize: '11px', lineHeight: 1.3 }}>
                    Allowed formats: JPG, PNG, WEBP (Max 5MB)
                  </span>
                </div>
              </div>

              {/* Upload & Remove Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={Upload}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ fontWeight: 600, fontSize: '12px' }}
                >
                  Upload Photo
                </Button>

                {avatarPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={handleRemovePhoto}
                    style={{ color: 'var(--error)', fontWeight: 600, fontSize: '12px' }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* 3. Personal Signatory Information (2x2 Systematic Grid) */}
        <div className="flex flex-col gap-2.5">
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Personal Signatory Information
          </h2>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div className="form-grid-2x2">
              <Input
                label="Full Legal Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                icon={User}
                placeholder="e.g. Dr. Aris Thorne"
                required
              />

              <Input
                label="Corporate Role / Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                icon={Building2}
                placeholder="e.g. Chief Executive Officer"
                required
              />

              <Input
                label="Primary Business Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={Mail}
                type="email"
                placeholder="e.g. a.thorne@biogenix.org"
                required
              />

              <Input
                label="Direct Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                icon={Phone}
                placeholder="e.g. +1 (555) 438-9201"
                required
              />
            </div>
          </Card>
        </div>

        {/* 4. Corporate Entity & Address (2x2 Systematic Grid) */}
        <div className="flex flex-col gap-2.5">
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Corporate Entity & Physical Address
          </h2>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div className="form-grid-2x2">
              <Input
                label="Registered Entity Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                icon={Building2}
                placeholder="e.g. BioGenix Labs Inc."
                required
              />

              <Input
                label="Corporate Tax ID / EIN"
                value={formData.ein}
                onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                placeholder="e.g. 84-2901842"
                readOnly
              />

              <Input
                label="Corporate Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. 450 Innovation Parkway, Suite 800"
                required
              />

              <Input
                label="City, State & ZIP Code"
                value={formData.cityState}
                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                placeholder="e.g. Cambridge, MA 02142"
                required
              />
            </div>
          </Card>
        </div>

        {/* 5. Security & Authentication Access */}
        <div className="flex flex-col gap-2.5">
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Security & Authentication
          </h2>

          <Card style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Lock size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Two-Factor Authentication (2FA)
                    </span>
                    <Badge variant={is2FAEnabled ? 'success' : 'neutral'}>
                      {is2FAEnabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>
                  <span className="text-secondary" style={{ fontSize: '12px' }}>
                    Hardware-grade verification required for executing binding term sheets and wire instructions.
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIs2FAEnabled(!is2FAEnabled);
                  addToast({
                    title: '2FA Updated',
                    message: `Two-factor authentication is now ${!is2FAEnabled ? 'enabled' : 'disabled'}.`,
                    type: 'info',
                  });
                }}
              >
                {is2FAEnabled ? 'Reconfigure 2FA' : 'Enable 2FA'}
              </Button>
            </div>
          </Card>
        </div>

        {/* 6. Form Submit Button Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Sparkles}
            isLoading={isSaving}
            style={{
              backgroundColor: 'var(--accent)',
              borderColor: 'var(--accent)',
              padding: '0 2rem',
              fontWeight: 700,
            }}
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
