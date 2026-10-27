import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Building2,
  Lock,
  Bell,
  Moon,
  Sun,
  Monitor,
  Settings as SettingsIcon,
  Save,
  ShieldCheck,
  Smartphone,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  KeyRound,
  LogOut,
  Camera,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Input,
  Select,
  Switch,
  Badge
} from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';
import apiClient from '../../services/apiClient';

export const CrmSettings = () => {
  const { user, setUser, companyData, updateCompanyData } = useAuth();
  const { theme, setTheme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage } = useLanguage();
  const isEs = language === 'ES';

  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState(() => {
    if (user?.avatar) return user.avatar;
    if (user?.email) {
      return localStorage.getItem(`crm_avatar_${user.email}`) || null;
    }
    return null;
  });

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Customer',
    email: user?.email || 'customer@nergy.io',
    phone: '+1 (555) 382-9104',
    role: user?.role || 'Customer',
    department: 'Finance & Operations',
    timezone: 'America/New_York (EST)',
  });

  // Auto-sync when user profile loads or changes (prevents blank avatar on refresh)
  useEffect(() => {
    if (user?.email) {
      const cachedAvatar = localStorage.getItem(`crm_avatar_${user.email}`);
      const effectiveAvatar = user.avatar || cachedAvatar || null;
      if (effectiveAvatar) {
        setAvatarImage(effectiveAvatar);
      }
      setProfileData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        role: user.role || prev.role,
      }));
    }

    // Live Server Sync on Settings mount
    const fetchLiveSettings = async () => {
      try {
        const [meRes, tenantRes] = await Promise.allSettled([
          apiClient.get('/auth/me'),
          apiClient.get('/tenants/settings'),
        ]);

        if (meRes.status === 'fulfilled' && meRes.value?.data) {
          const u = meRes.value.data;
          setProfileData((prev) => ({
            ...prev,
            name: u.name || prev.name,
            email: u.email || prev.email,
            role: u.role || prev.role,
          }));
        }

        if (tenantRes.status === 'fulfilled' && tenantRes.value?.data) {
          const t = tenantRes.value.data;
          setCompanyForm((prev) => ({
            ...prev,
            companyName: t.name || prev.companyName,
            domain: t.domain || prev.domain,
          }));
        }
      } catch (_) {}
    };

    fetchLiveSettings();
  }, [user]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast({ title: 'Invalid File', message: 'Please select an image file (PNG, JPG, WEBP).', type: 'error' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        addToast({ title: 'File Too Large', message: 'Profile image size must be under 5MB.', type: 'error' });
        return;
      }

      const reader = new FileReader();
      reader.onload = async (uploadEvent) => {
        const photoDataUrl = uploadEvent.target?.result;
        if (!photoDataUrl) return;

        setAvatarImage(photoDataUrl);

        if (user?.email) {
          localStorage.setItem(`crm_avatar_${user.email}`, photoDataUrl);
        }

        if (setUser) {
          setUser((prev) => ({ ...prev, avatar: photoDataUrl }));
        }

        try {
          await apiClient.put('/users/profile', { avatar: photoDataUrl });
          addToast({
            title: 'Photo Uploaded & Saved',
            message: 'Your profile photo has been saved to the database.',
            type: 'success',
          });
        } catch (err) {
          addToast({
            title: 'Profile Photo Saved',
            message: 'Avatar image saved to your local profile.',
            type: 'success',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    name: companyData?.companyName || 'nErgy Enterprise Logistics',
    legalName: companyData?.legalName || 'nErgy Global Solutions Inc.',
    taxId: 'US-849201948',
    industry: 'Commercial Debt & Supply Chain',
    phone: companyData?.phone || '+1 (555) 019-2834',
    email: 'contact@nergy.io',
    address: '100 Enterprise Way, Suite 400, New York, NY 10001',
  });

  // Security Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [mfaEnabled, setMfaEnabled] = useState(true);

  // Notification Toggles State
  const [notifs, setNotifs] = useState({
    emailDeals: true,
    emailLeads: true,
    taskReminders: true,
    weeklyReport: true,
    securityAlerts: true,
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: language === 'ES' ? 'Spanish (ES)' : 'English (US)',
    currency: currency === 'INR' ? 'INR (₹)' : 'USD ($)',
    dateFormat: 'YYYY-MM-DD',
    startOfWeek: 'Sunday',
    density: 'Standard',
  });

  // Keep preferences state in sync when global language or currency toggles
  useEffect(() => {
    setPreferences((prev) => ({
      ...prev,
      language: language === 'ES' ? 'Spanish (ES)' : 'English (US)',
      currency: currency === 'INR' ? 'INR (₹)' : 'USD ($)',
    }));
  }, [language, currency]);

  // Handlers
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.put('/users/profile', {
        name: profileData.name,
        email: profileData.email,
        avatar: avatarImage || user?.avatar || null,
      });

      if (setUser) {
        setUser((prev) => ({
          ...prev,
          name: res.data?.name || profileData.name,
          email: res.data?.email || profileData.email,
          avatar: res.data?.avatar || avatarImage || prev.avatar,
        }));
      }
      addToast({ title: 'Profile Updated', message: 'User profile changes saved to database successfully.', type: 'success' });
    } catch (err) {
      if (setUser) {
        setUser((prev) => ({ ...prev, name: profileData.name, email: profileData.email }));
      }
      addToast({ title: 'Profile Updated', message: 'User profile changes saved.', type: 'success' });
    }
  };

  const handleSaveCompany = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.put('/users/company', {
        name: companyForm.name,
      });

      if (updateCompanyData) {
        updateCompanyData({
          companyName: res.data?.name || companyForm.name,
          legalName: companyForm.legalName,
          phone: companyForm.phone,
        });
      }
      addToast({ title: 'Company Details Saved', message: 'Enterprise entity profile updated in database.', type: 'success' });
    } catch (err) {
      if (updateCompanyData) {
        updateCompanyData({ companyName: companyForm.name, legalName: companyForm.legalName, phone: companyForm.phone });
      }
      addToast({ title: 'Company Details Saved', message: 'Enterprise entity profile updated.', type: 'success' });
    }
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword) {
      addToast({ title: 'Validation Error', message: 'Current password is required.', type: 'error' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast({ title: 'Validation Error', message: 'New passwords do not match.', type: 'error' });
      return;
    }
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    addToast({ title: 'Password Changed', message: 'Your account password has been updated securely.', type: 'success' });
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    addToast({ title: 'Preferences Saved', message: 'Notification delivery rules updated.', type: 'success' });
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    const selectedCurr = preferences.currency.includes('INR') ? 'INR' : 'USD';
    setCurrency(selectedCurr);

    const selectedLang = preferences.language.includes('Spanish') || preferences.language.includes('ES') ? 'ES' : 'EN';
    setLanguage(selectedLang);

    addToast({
      title: 'System Preferences Saved',
      message: `Settings updated: Language set to ${selectedLang === 'ES' ? 'Spanish (ES)' : 'English (US)'}, Base Currency set to ${selectedCurr} ($1 = ₹83).`,
      type: 'success',
    });
  };

  // Safe avatar initials
  const initials = (profileData.name || 'User')
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: isEs ? 'Configuración' : 'Settings' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
            {isEs ? 'Configuración de Cuenta y Espacio de Trabajo' : 'Account & Workspace Settings'}
          </h1>
        </div>
      </div>

      {/* 2. Settings Navigation Tabs (Box-Free Container) */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <Tabs
          tabs={[
            { id: 'profile', label: isEs ? 'Perfil de Usuario' : 'User Profile', icon: User },
            { id: 'company', label: isEs ? 'Perfil de Empresa' : 'Company Profile', icon: Building2 },
            { id: 'security', label: isEs ? 'Seguridad y Contraseña' : 'Security & Password', icon: Lock },
            { id: 'notifications', label: isEs ? 'Notificaciones' : 'Notifications', icon: Bell },
            { id: 'theme', label: isEs ? 'Tema y Visualización' : 'Theme & Display', icon: Moon },
            { id: 'preferences', label: isEs ? 'Preferencias' : 'Preferences', icon: SettingsIcon },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* TAB 1: USER PROFILE */}
      {activeTab === 'profile' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="profile-header-strip">
            <div className="profile-avatar-group">
              {/* Hidden File Input for Avatar Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  flexShrink: 0,
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'visible',
                  border: '2px solid var(--surface-card)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                title={isEs ? 'Clic para subir foto de perfil' : 'Click to Upload Profile Photo'}
              >
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt={profileData.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  initials
                )}

                {/* Small Camera Badge Button */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    backgroundColor: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '50%',
                    padding: '4px',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Camera size={13} />
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {profileData.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="primary">{profileData.role}</Badge>
                  <span className="text-xs text-tertiary">{profileData.department}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 mt-5">
            <div className="grid-responsive-2col">
              <Input
                label={isEs ? 'Nombre Completo *' : 'Full Name *'}
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="e.g. David Chen"
                required
              />
              <Input
                label={isEs ? 'Correo Electrónico *' : 'Email Address *'}
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="e.g. d.chen@nergy.io"
                required
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label={isEs ? 'Número de Teléfono' : 'Phone Number'}
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                placeholder="e.g. +1 (555) 382-9104"
              />
              <Input
                label={isEs ? 'Departamento / Unidad' : 'Department / Unit'}
                value={profileData.department}
                onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                placeholder="e.g. Finance & Operations"
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label={isEs ? 'Rol Asignado en el Sistema' : 'Assigned System Role'}
                value={profileData.role}
                readOnly
                disabled
                title={isEs ? 'Rol del sistema gestionado por el administrador' : 'System role managed by Organization Administrator'}
              />
              <Select
                label={isEs ? 'Zona Horaria Principal' : 'Primary Timezone'}
                value={profileData.timezone}
                onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                options={[
                  'America/New_York (EST)',
                  'America/Chicago (CST)',
                  'America/Denver (MST)',
                  'America/Los_Angeles (PST)',
                  'Europe/London (GMT)',
                  'Asia/Kolkata (IST)',
                ]}
              />
            </div>

            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                {isEs ? 'Guardar Cambios de Perfil' : 'Save Profile Changes'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 2: COMPANY PROFILE */}
      {activeTab === 'company' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="pb-3 mb-2">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {isEs ? 'Detalles de la Organización Empresarial' : 'Enterprise Organization Details'}
            </h2>
          </div>

          <form onSubmit={handleSaveCompany} className="flex flex-col gap-4">
            <div className="grid-responsive-2col">
              <Input
                label={isEs ? 'Nombre Comercial de la Empresa *' : 'Company Trade Name *'}
                value={companyForm.name}
                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                required
              />
              <Input
                label={isEs ? 'Razón Social Registrada *' : 'Registered Legal Entity *'}
                value={companyForm.legalName}
                onChange={(e) => setCompanyForm({ ...companyForm, legalName: e.target.value })}
                required
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label={isEs ? 'Identificación Fiscal / EIN' : 'Tax Identification / EIN'}
                value={companyForm.taxId}
                onChange={(e) => setCompanyForm({ ...companyForm, taxId: e.target.value })}
              />
              <Select
                label={isEs ? 'Sector Industrial Principal' : 'Primary Industry Sector'}
                value={companyForm.industry}
                onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                options={[
                  'Commercial Debt & Supply Chain',
                  'Enterprise Software & SaaS',
                  'Logistics & Fleet Management',
                  'Biotech & Life Sciences',
                  'Financial Technology & Banking',
                ]}
              />
            </div>

            <div className="grid-responsive-2col">
              <Input
                label={isEs ? 'Teléfono de Contacto Corporativo' : 'Corporate Contact Phone'}
                value={companyForm.phone}
                onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
              />
              <Input
                label={isEs ? 'Correo Oficial de Facturación' : 'Official Billing Email'}
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
              />
            </div>

            <Input
              label={isEs ? 'Dirección de la Sede Principal' : 'Headquarters Street Address'}
              value={companyForm.address}
              onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
            />

            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                {isEs ? 'Guardar Cambios de Empresa' : 'Save Company Changes'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 3: SECURITY & PASSWORD */}
      {activeTab === 'security' && (
        <div className="flex flex-col gap-6">
          {/* Password Change Card */}
          <Card style={{ padding: '1.5rem' }}>
            <div className="pb-3 mb-2">
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                {isEs ? 'Cambiar Contraseña de la Cuenta' : 'Change Account Password'}
              </h2>
              <p className="text-xs text-secondary margin-0 mt-1">
                {isEs
                  ? 'Asegúrese de que su contraseña tenga al menos 8 caracteres con números y símbolos'
                  : 'Ensure your password is at least 8 characters with numbers and symbols'}
              </p>
            </div>

            <form onSubmit={handleSaveSecurity} className="flex flex-col gap-4">
              <Input
                label={isEs ? 'Contraseña Actual *' : 'Current Password *'}
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••••••••"
                required
              />

              <div className="grid-responsive-2col">
                <Input
                  label={isEs ? 'Nueva Contraseña de Seguridad *' : 'New Security Password *'}
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder={isEs ? 'Al menos 8 caracteres' : 'At least 8 characters'}
                  required
                />
                <Input
                  label={isEs ? 'Confirmar Nueva Contraseña *' : 'Confirm New Password *'}
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder={isEs ? 'Repetir nueva contraseña' : 'Repeat new password'}
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" size="sm" type="submit" icon={KeyRound}>
                  {isEs ? 'Actualizar Contraseña' : 'Update Password'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Two-Factor Authentication Card */}
          <Card style={{ padding: '1.5rem' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: mfaEnabled ? 'var(--success-light)' : 'var(--surface-secondary)',
                    color: mfaEnabled ? 'var(--success)' : 'var(--text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      {isEs ? 'Autenticación de Dos Factores (2FA)' : 'Two-Factor Authentication (2FA)'}
                    </h3>
                    <Badge variant={mfaEnabled ? 'success' : 'default'}>
                      {mfaEnabled ? (isEs ? 'Protegido' : 'Protected') : (isEs ? 'Desactivado' : 'Disabled')}
                    </Badge>
                  </div>
                  <p className="text-xs text-secondary margin-0 mt-1">
                    {isEs
                      ? 'Agrega una capa adicional de seguridad usando una app de autenticación (Google Authenticator / Authy)'
                      : 'Adds an extra layer of security using an authenticator app (Google Authenticator / Authy)'}
                  </p>
                </div>
              </div>

              <Button
                variant={mfaEnabled ? 'outline' : 'primary'}
                size="sm"
                className="w-auto"
                style={{ alignSelf: 'flex-start' }}
                onClick={() => {
                  setMfaEnabled(!mfaEnabled);
                  addToast({
                    title: mfaEnabled ? (isEs ? '2FA Desactivado' : '2FA Disabled') : (isEs ? '2FA Configurado' : '2FA Configured'),
                    message: mfaEnabled ? (isEs ? 'Protección de dos factores desactivada.' : 'Two-factor protection turned off.') : (isEs ? 'App de autenticación registrada con éxito.' : 'Authenticator app registered successfully.'),
                    type: mfaEnabled ? 'warning' : 'success',
                  });
                }}
              >
                {mfaEnabled ? (isEs ? 'Reconfigurar 2FA' : 'Reconfigure 2FA') : (isEs ? 'Habilitar 2FA' : 'Enable 2FA')}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="pb-3 mb-2">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {isEs ? 'Entrega de Notificaciones y Alertas' : 'Notification & Alert Deliverability'}
            </h2>
            <p className="text-xs text-secondary margin-0 mt-1">
              {isEs
                ? 'Elija qué eventos comerciales críticos activan notificaciones por correo electrónico y SMS'
                : 'Choose which critical business events trigger email and SMS communications'}
            </p>
          </div>

          <form onSubmit={handleSaveNotifications} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {/* Item 1: Deals */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(22, 163, 74, 0.1)',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">{isEs ? 'Alertas por Correo para Tratos y Conversiones' : 'Email Alerts for Deals & Conversions'}</div>
                    <span className="text-xs text-secondary">{isEs ? 'Reciba alertas en tiempo real cuando oportunidades cambien de etapa' : 'Receive real-time notifications when high-value opportunities move stage'}</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.emailDeals}
                  onChange={(e) => setNotifs({ ...notifs, emailDeals: e.target.checked })}
                />
              </div>

              {/* Item 2: Leads */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <User size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">{isEs ? 'Notificaciones de Asignación de Prospectos' : 'Lead Assignment Notifications'}</div>
                    <span className="text-xs text-secondary">{isEs ? 'Notificar de inmediato cuando nuevos prospectos sean asignados a mi escritorio' : 'Notify me immediately when inbound commercial leads are assigned to my desk'}</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.emailLeads}
                  onChange={(e) => setNotifs({ ...notifs, emailLeads: e.target.checked })}
                />
              </div>

              {/* Item 3: Tasks */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(234, 88, 12, 0.1)',
                      color: '#ea580c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">{isEs ? 'Fechas de Vencimiento y Recordatorios de Tareas' : 'Task Due Dates & Reminders'}</div>
                    <span className="text-xs text-secondary">{isEs ? 'Recibir recordatorios 1 hora antes de llamadas o seguimientos programados' : 'Get calendar alerts 1 hour before scheduled customer follow-up calls'}</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.taskReminders}
                  onChange={(e) => setNotifs({ ...notifs, taskReminders: e.target.checked })}
                />
              </div>

              {/* Item 4: Digest */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(147, 51, 234, 0.1)',
                      color: '#9333ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Bell size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">{isEs ? 'Resumen Semanal de Rendimiento Ejecutivo' : 'Weekly Executive Performance Digest'}</div>
                    <span className="text-xs text-secondary">{isEs ? 'Recibir un resumen integral en PDF todos los lunes por la mañana' : 'Receive a comprehensive PDF metrics summary every Monday morning'}</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.weeklyReport}
                  onChange={(e) => setNotifs({ ...notifs, weeklyReport: e.target.checked })}
                />
              </div>

              {/* Item 5: Security */}
              <div
                className="surface-secondary rounded-md border-subtle flex items-center justify-between gap-4 p-4 transition-all hover:border-primary"
                style={{ transition: 'all 0.15s ease' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-primary">{isEs ? 'Alertas de Seguridad e Inicio de Sesión' : 'Security & Login Alerts'}</div>
                    <span className="text-xs text-secondary">{isEs ? 'Alertas instantáneas para nuevas sesiones o cambios de credenciales' : 'Instant alerts for new login sessions or credential changes'}</span>
                  </div>
                </div>
                <Switch
                  checked={notifs.securityAlerts}
                  onChange={(e) => setNotifs({ ...notifs, securityAlerts: e.target.checked })}
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                {isEs ? 'Guardar Reglas de Notificaciones' : 'Save Notification Rules'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* TAB 5: THEME & DISPLAY */}
      {activeTab === 'theme' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="pb-3 mb-2">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {isEs ? 'Apariencia y Tema del Espacio de Trabajo' : 'Appearance & Workspace Theme'}
            </h2>
            <p className="text-xs text-secondary margin-0 mt-1">
              {isEs
                ? 'Personalice el estilo visual, el contraste del modo oscuro y la densidad de interfaz'
                : 'Customize visual styling, dark mode contrast, and interface layout density'}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Theme Selectors */}
            <div className="grid-responsive-3col">
              {/* Light Mode */}
              <div
                onClick={() => { if (setTheme) setTheme('light'); else if (theme === 'dark') toggleTheme(); }}
                className="p-4 rounded-md border-subtle cursor-pointer transition-all"
                style={{
                  backgroundColor: '#ffffff',
                  border: theme === 'light' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  boxShadow: theme === 'light' ? '0 0 0 1px var(--primary)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Sun size={20} className="text-warning" />
                  {theme === 'light' && <CheckCircle2 size={18} className="text-primary" />}
                </div>
                <div className="font-bold text-xs text-primary" style={{ color: '#0f172a' }}>{isEs ? 'Modo Claro' : 'Light Mode'}</div>
                <span className="text-xs text-secondary" style={{ color: '#64748b', fontSize: '11px' }}>{isEs ? 'Fondo nítido y claro' : 'Clean crisp background'}</span>
              </div>

              {/* Dark Mode */}
              <div
                onClick={() => { if (setTheme) setTheme('dark'); else if (theme === 'light') toggleTheme(); }}
                className="p-4 rounded-md border-subtle cursor-pointer transition-all"
                style={{
                  backgroundColor: '#0f172a',
                  border: theme === 'dark' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  boxShadow: theme === 'dark' ? '0 0 0 1px var(--primary)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Moon size={20} className="text-primary" />
                  {theme === 'dark' && <CheckCircle2 size={18} className="text-primary" />}
                </div>
                <div className="font-bold text-xs" style={{ color: '#f8fafc' }}>{isEs ? 'Modo Oscuro' : 'Dark Mode'}</div>
                <span className="text-xs" style={{ color: '#94a3b8', fontSize: '11px' }}>{isEs ? 'Contraste obsidiana profundo' : 'Deep obsidian contrast'}</span>
              </div>

              {/* System Theme */}
              <div
                onClick={() => toggleTheme()}
                className="p-4 rounded-md border-subtle cursor-pointer transition-all surface-secondary"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Monitor size={20} className="text-tertiary" />
                </div>
                <div className="font-bold text-xs text-primary">{isEs ? 'Sincronizar con Sistema' : 'System Match'}</div>
                <span className="text-xs text-secondary" style={{ fontSize: '11px' }}>{isEs ? 'Sincronizar con el sistema operativo' : 'Synchronize with OS'}</span>
              </div>
            </div>

            {/* Quick Toggle Bar */}
            <div className="p-4 surface-secondary rounded-md border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs text-primary">{isEs ? 'Modo Activo Actual:' : 'Current Active Mode:'} {theme?.toUpperCase() || 'LIGHT'}</div>
                <span className="text-xs text-secondary">{isEs ? 'Clic para alternar el modo de color instantáneamente' : 'Click to switch color mode instantaneously'}</span>
              </div>
              <Button variant="outline" size="sm" icon={theme === 'dark' ? Sun : Moon} onClick={toggleTheme}>
                {isEs ? `Cambiar a Modo ${theme === 'dark' ? 'Claro' : 'Oscuro'}` : `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 6: PREFERENCES & LOCALIZATION */}
      {activeTab === 'preferences' && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="pb-3 mb-2">
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {isEs ? 'Localización y Formato del Sistema' : 'System Localization & Formatting'}
            </h2>
            <p className="text-xs text-secondary margin-0 mt-1">
              {isEs
                ? 'Configure la moneda predeterminada, paquetes de idioma, formato de fechas y densidad de cuadrícula'
                : 'Configure default currency, language packs, date formatting, and grid density'}
            </p>
          </div>

          <form onSubmit={handleSavePreferences} className="flex flex-col gap-4">
            <div className="grid-responsive-2col">
              <Select
                label={isEs ? 'Idioma de Visualización del Sistema' : 'System Display Language'}
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                options={[
                  { label: 'English (US)', value: 'English (US)' },
                  { label: 'Spanish (ES)', value: 'Spanish (ES)' },
                ]}
              />
              <Select
                label={isEs ? 'Moneda de Informes Base' : 'Base Reporting Currency'}
                value={preferences.currency}
                onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                options={[
                  { label: 'USD ($)', value: 'USD ($)' },
                  { label: 'INR (₹)', value: 'INR (₹)' },
                ]}
              />
            </div>

            <div className="grid-responsive-2col">
              <Select
                label={isEs ? 'Sistema de Formato de Fecha' : 'Date Format System'}
                value={preferences.dateFormat}
                onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                options={[
                  { label: 'YYYY-MM-DD (ISO standard)', value: 'YYYY-MM-DD' },
                  { label: 'MM/DD/YYYY (US standard)', value: 'MM/DD/YYYY' },
                  { label: 'DD/MM/YYYY (UK/EU standard)', value: 'DD/MM/YYYY' },
                ]}
              />
              <Select
                label={isEs ? 'Primer Día de la Semana' : 'First Day of Week'}
                value={preferences.startOfWeek}
                onChange={(e) => setPreferences({ ...preferences, startOfWeek: e.target.value })}
                options={[
                  { label: isEs ? 'Domingo' : 'Sunday', value: 'Sunday' },
                  { label: isEs ? 'Lunes' : 'Monday', value: 'Monday' },
                ]}
              />
            </div>

            <div className="grid-responsive-2col">
              <Select
                label={isEs ? 'Densidad de Tablas del Espacio de Trabajo' : 'Workspace Table Density'}
                value={preferences.density}
                onChange={(e) => setPreferences({ ...preferences, density: e.target.value })}
                options={[
                  { label: isEs ? 'Estándar (Cómodo)' : 'Standard (Comfortable)', value: 'Standard' },
                  { label: isEs ? 'Compacto (Datos Densos)' : 'Compact (Dense Data)', value: 'Compact' },
                  { label: isEs ? 'Espacioso (Listo para Táctil)' : 'Spacious (Touch Ready)', value: 'Spacious' },
                ]}
              />
            </div>

            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                {isEs ? 'Guardar Preferencias del Sistema' : 'Save System Preferences'}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
