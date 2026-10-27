import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Users,
  Shield,
  Building2,
  Plug,
  Bell,
  History,
  Lock,
  CreditCard,
  CheckCircle2,
  ToggleRight,
  Sparkles,
  Plus,
  RefreshCw,
  Globe
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Tabs,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Input,
  Card,
  CardHeader,
  CardBody,
  Modal
} from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { SHOW_OAL } from '../../config/features';
import { SecuredEbox } from '../admin/SecuredEbox';
import tenantService from '../../services/tenantService';

export const CrmAdmin = () => {
  const { user, companyData } = useAuth();
  const { addToast } = useToast();
  const { language, t } = useLanguage();
  const isEs = language === 'ES';

  const [activeAdminTab, setActiveAdminTab] = useState('subaccounts');
  const [subAccounts, setSubAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sub-account Modal
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [subFormData, setSubFormData] = useState({
    name: '',
    domain: '',
    subscription: 'ACTIVE_PRO',
  });

  // Branding state
  const [branding, setBranding] = useState({
    workspaceTitle: companyData?.companyName || 'nErgy Enterprise Logistics',
    customDomain: 'crm.nergy-logistics.io',
    accentColor: '#1d4ed8',
  });

  const fetchTenantData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [subs, settings] = await Promise.allSettled([
        tenantService.getSubAccounts(),
        tenantService.getSettings(),
      ]);

      if (subs.status === 'fulfilled' && Array.isArray(subs.value)) {
        setSubAccounts(subs.value);
      }
      if (settings.status === 'fulfilled' && settings.value) {
        setBranding((prev) => ({
          ...prev,
          workspaceTitle: settings.value.name || prev.workspaceTitle,
          customDomain: settings.value.domain || prev.customDomain,
        }));
      }
    } catch (err) {
      console.error('Failed to load admin tenant data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenantData();
  }, [fetchTenantData]);

  const handleCreateSubAccount = async (e) => {
    e.preventDefault();
    if (!subFormData.name) {
      addToast({ title: 'Validation Error', message: 'Sub-account name is required.', type: 'error' });
      return;
    }

    try {
      const created = await tenantService.createSubAccount(subFormData);
      setSubAccounts((prev) => [created, ...prev]);
      setIsSubModalOpen(false);
      setSubFormData({ name: '', domain: '', subscription: 'ACTIVE_PRO' });
      addToast({ title: 'Sub-Account Provisioned', message: `Workspace created for ${created.name}`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to provision sub-account.', type: 'error' });
    }
  };

  const handleSaveBranding = async (e) => {
    e?.preventDefault();
    try {
      await tenantService.updateSettings({
        name: branding.workspaceTitle,
        domain: branding.customDomain,
      });
      addToast({ title: 'Settings Saved', message: 'Workspace branding persisted in MySQL.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message || 'Failed to save branding.', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy AI' }, { label: isEs ? 'Administración' : 'Administration' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              {isEs ? 'Administración del Sistema y Aprovisionamiento de Subcuentas' : 'System Administration & Sub-Account Provisioning'}
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-white font-bold text-xs uppercase tracking-wider">
              {isEs ? 'Gobernanza Raíz Activa' : 'Root Governance Active'}
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            {isEs
              ? 'Aislamiento de espacio de trabajo multi-inquilino, aprovisionamiento dinámico de subcuentas, integraciones API y seguridad raíz.'
              : 'Multi-tenant workspace isolation, dynamic sub-account provisioning, API integrations, and root security.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={fetchTenantData} disabled={isLoading}>
            {isEs ? 'Actualizar' : 'Refresh'}
          </Button>
          {activeAdminTab === 'subaccounts' && (
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsSubModalOpen(true)}>
              {isEs ? 'Aprovisionar Subcuenta' : 'Provision Sub-Account'}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6">
        <button
          onClick={() => setActiveAdminTab('subaccounts')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeAdminTab === 'subaccounts' ? 'text-sky-400 font-bold' : 'text-secondary hover:text-primary'
          }`}
        >
          {isEs ? 'Subcuentas y Multi-Inquilino' : 'Sub-Accounts & Multi-Tenant'} ({subAccounts.length})
          {activeAdminTab === 'subaccounts' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-t" />
          )}
        </button>
        <button
          onClick={() => setActiveAdminTab('branding')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeAdminTab === 'branding' ? 'text-sky-400 font-bold' : 'text-secondary hover:text-primary'
          }`}
        >
          {isEs ? 'Marca y Dominio Personalizado' : 'Branding & Custom Domain'}
          {activeAdminTab === 'branding' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-t" />
          )}
        </button>
        <button
          onClick={() => setActiveAdminTab('ebox')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeAdminTab === 'ebox' ? 'text-sky-400 font-bold' : 'text-secondary hover:text-primary'
          }`}
        >
          {isEs ? 'zBox de Comunicaciones Seguras' : 'Secured Communications zBox'}
          {activeAdminTab === 'ebox' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-t" />
          )}
        </button>
      </div>

      {/* Tab 1: Sub-Accounts & Multi-Tenant */}
      {activeAdminTab === 'subaccounts' && (
        <Card className="border shadow-sm">
          <CardHeader
            title={isEs ? 'Cuentas de Subempresas Aprovisionadas' : 'Provisioned Sub-Company Accounts'}
            subtitle={isEs ? 'Organizaciones secundarias operando en inquilinos de bases de datos aislados' : 'Child organizations operating in isolated database tenants'}
          />
          <CardBody className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="p-12 text-center text-xs text-secondary">
                {isEs ? 'Cargando subcuentas desde la base de datos...' : 'Loading sub-accounts from database...'}
              </div>
            ) : subAccounts.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <Building2 className="w-12 h-12 text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-primary">
                  {isEs ? 'No hay Subcuentas Aprovisionadas' : 'No Sub-Accounts Provisioned'}
                </h3>
                <p className="text-xs text-secondary max-w-sm mt-1 mb-4">
                  {isEs
                    ? "No se han creado organizaciones secundarias. Haga clic en 'Aprovisionar Subcuenta' para configurar un nuevo espacio aislado para clientes."
                    : "No child organizations have been created. Click 'Provision Sub-Account' to set up a new isolated client workspace."}
                </p>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsSubModalOpen(true)}>
                  {isEs ? 'Aprovisionar Primera Subcuenta' : 'Provision First Sub-Account'}
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell header>{isEs ? 'Nombre de la Organización' : 'Organization Name'}</TableCell>
                    <TableCell header>{isEs ? 'Dominio / CNAME' : 'Domain / CNAME'}</TableCell>
                    <TableCell header>{isEs ? 'Nivel de Suscripción' : 'Subscription Tier'}</TableCell>
                    <TableCell header>{isEs ? 'Usuarios' : 'Users'}</TableCell>
                    <TableCell header>{isEs ? 'Prospectos' : 'Leads'}</TableCell>
                    <TableCell header>{isEs ? 'Estado' : 'Status'}</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subAccounts.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-semibold text-primary">{sub.name}</TableCell>
                      <TableCell className="text-xs text-secondary font-mono">{sub.domain || (isEs ? 'Autoasignado' : 'Auto-allocated')}</TableCell>
                      <TableCell className="text-xs text-secondary">{sub.subscription}</TableCell>
                      <TableCell className="text-xs text-secondary">{sub._count?.users || 1}</TableCell>
                      <TableCell className="text-xs text-secondary">{sub._count?.leads || 0}</TableCell>
                      <TableCell>
                        <Badge variant="success">{sub.status || (isEs ? 'ACTIVO' : 'ACTIVE')}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      )}

      {/* Tab 2: Branding & Domain */}
      {activeAdminTab === 'branding' && (
        <Card className="border shadow-sm max-w-2xl">
          <CardHeader
            title={isEs ? 'Identidad de la Empresa y Dominio Personalizado' : 'Company Identity & Custom Domain'}
            subtitle={isEs ? 'Configure la marca empresarial y la personalización del espacio de trabajo' : 'Configure enterprise workspace branding and white-labeling'}
          />
          <CardBody className="p-6">
            <form onSubmit={handleSaveBranding} className="flex flex-col gap-4">
              <Input
                label={isEs ? 'Título de la Organización del Espacio de Trabajo' : 'Workspace Organization Title'}
                value={branding.workspaceTitle}
                onChange={(e) => setBranding({ ...branding, workspaceTitle: e.target.value })}
              />
              <Input
                label={isEs ? 'Subdominio / CNAME Personalizado' : 'Custom Subdomain / CNAME'}
                placeholder="crm.yourbrand.io"
                value={branding.customDomain}
                onChange={(e) => setBranding({ ...branding, customDomain: e.target.value })}
              />
              <div className="flex justify-end mt-2">
                <Button variant="primary" type="submit">
                  {isEs ? 'Guardar Configuración de Marca' : 'Save Branding Settings'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Tab 3: Secured zBox */}
      {activeAdminTab === 'ebox' && <SecuredEbox />}

      {/* Sub-Account Modal */}
      <Modal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        title={isEs ? 'Aprovisionar Espacio de Trabajo de Subempresa' : 'Provision Sub-Company Workspace'}
        size="md"
      >
        <form onSubmit={handleCreateSubAccount} className="flex flex-col gap-4">
          <Input
            label={isEs ? 'Nombre de Organización / Empresa *' : 'Organization / Company Name *'}
            placeholder={isEs ? 'ej. Centro de Concesionarios de la Costa del Pacífico' : 'e.g. Pacific Coast Dealership Hub'}
            value={subFormData.name}
            onChange={(e) => setSubFormData({ ...subFormData, name: e.target.value })}
            required
          />
          <Input
            label={isEs ? 'Dominio / Subdominio Personalizado' : 'Custom Domain / Subdomain'}
            placeholder="e.g. pacific.crmnergy.io"
            value={subFormData.domain}
            onChange={(e) => setSubFormData({ ...subFormData, domain: e.target.value })}
          />
          <Input
            label={isEs ? 'Plan de Licencia de Suscripción' : 'Subscription License Plan'}
            value={subFormData.subscription}
            onChange={(e) => setSubFormData({ ...subFormData, subscription: e.target.value })}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" type="button" onClick={() => setIsSubModalOpen(false)}>
              {isEs ? 'Cancelar' : 'Cancel'}
            </Button>
            <Button variant="primary" type="submit">
              {isEs ? 'Aprovisionar Espacio' : 'Provision Workspace'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CrmAdmin;
