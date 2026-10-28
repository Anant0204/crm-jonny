import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  FileText,
  Receipt,
  CreditCard,
  FileSignature,
  Clock,
  UserCheck,
  Calendar,
  Building2,
  Boxes,
  LifeBuoy,
  Settings,
  ShoppingBag,
  Users,
  Target,
  BarChart3,
  CalendarDays
} from 'lucide-react';

/**
 * Returns role-tailored navigation items for Develo CRM
 * (replaces Core CRM dynamically based on the authenticated persona/role)
 */
export const getDeveloNavForRole = (currentUser) => {
  const roleStr = (
    currentUser?.role ||
    currentUser?.id ||
    currentUser?.roleId ||
    ''
  ).toLowerCase();

  // 1. SUPER ADMIN ROLE
  if (roleStr.includes('super')) {
    return [
      { id: 'dev-super-dash', label: 'SuperAdmin Dash', icon: LayoutDashboard, path: '/crm/worksuite/superadmin-dashboard', section: 'Develo CRM' },
      { id: 'dev-companies', label: 'Companies', icon: Building2, path: '/crm/worksuite/companies', section: 'Develo CRM' },
      { id: 'dev-packages', label: 'Company Packages', icon: Boxes, path: '/crm/worksuite/packages', section: 'Develo CRM' },
      { id: 'dev-billing', label: 'Billing & Plans', icon: Receipt, path: '/crm/worksuite/billing', section: 'Develo CRM' },
      { id: 'dev-offline-req', label: 'Offline Requests', icon: FileText, path: '/crm/worksuite/offline-requests', section: 'Develo CRM' },
      { id: 'dev-support-tickets', label: 'Support Tickets', icon: LifeBuoy, path: '/crm/worksuite/support-tickets', section: 'Develo CRM' },
      { id: 'dev-super-settings', label: 'System Settings', icon: Settings, path: '/crm/worksuite/superadmin-settings', section: 'Develo CRM' },
    ];
  }

  // 2. CLIENT / CUSTOMER ROLE (customer, client, influencer, affiliate_partner)
  if (
    roleStr.includes('customer') ||
    roleStr.includes('client') ||
    roleStr.includes('influencer') ||
    roleStr.includes('affiliate')
  ) {
    return [
      { id: 'dev-client-dash', label: 'Client Dashboard', icon: LayoutDashboard, path: '/crm/worksuite/client-dashboard', section: 'Develo CRM' },
      { id: 'dev-client-proj', label: 'My Projects', icon: FolderKanban, path: '/crm/worksuite/client-projects', section: 'Develo CRM' },
      { id: 'dev-client-prop', label: 'Proposals', icon: FileText, path: '/crm/worksuite/client-proposals', section: 'Develo CRM' },
      { id: 'dev-client-inv', label: 'Invoices & Billing', icon: Receipt, path: '/crm/worksuite/client-invoices', section: 'Develo CRM' },
      { id: 'dev-client-cont', label: 'Contracts', icon: FileSignature, path: '/crm/worksuite/client-contracts', section: 'Develo CRM' },
      { id: 'dev-client-store', label: 'Order Store', icon: ShoppingBag, path: '/crm/worksuite/client-store', section: 'Develo CRM' },
      { id: 'dev-client-tickets', label: 'Support Tickets', icon: LifeBuoy, path: '/crm/worksuite/client-tickets', section: 'Develo CRM' },
    ];
  }

  // 3. STAFF / EMPLOYEE ROLE (hr, content_creator, content_builder, ai_marketing, etc.)
  if (
    roleStr.includes('creator') ||
    roleStr.includes('builder') ||
    roleStr.includes('marketing') ||
    roleStr.includes('hr')
  ) {
    return [
      { id: 'dev-emp-dash', label: 'My Dashboard', icon: LayoutDashboard, path: '/crm/worksuite/employee-dashboard', section: 'Develo CRM' },
      { id: 'dev-emp-tasks', label: 'My Tasks', icon: CheckSquare, path: '/crm/worksuite/my-tasks', section: 'Develo CRM' },
      { id: 'dev-emp-proj', label: 'My Projects', icon: FolderKanban, path: '/crm/worksuite/my-projects', section: 'Develo CRM' },
      { id: 'dev-emp-time', label: 'Time Tracking', icon: Clock, path: '/crm/worksuite/time-tracking', section: 'Develo CRM' },
      { id: 'dev-emp-attend', label: 'Attendance', icon: UserCheck, path: '/crm/worksuite/attendance', section: 'Develo CRM' },
      { id: 'dev-emp-leaves', label: 'Leave Requests', icon: Calendar, path: '/crm/worksuite/leaves', section: 'Develo CRM' },
      { id: 'dev-emp-calendar', label: 'Team Calendar', icon: CalendarDays, path: '/crm/worksuite/calendar', section: 'Develo CRM' },
      { id: 'dev-emp-tickets', label: 'Tickets', icon: LifeBuoy, path: '/crm/worksuite/tickets', section: 'Develo CRM' },
    ];
  }

  // 4. ADMIN / BUSINESS OWNER ROLE (business_owner, admin_1, admin_2, crm_pro, default)
  return [
    { id: 'dev-admin-dash', label: 'Executive Dashboard', icon: LayoutDashboard, path: '/crm/worksuite/dashboard', section: 'Develo CRM' },
    { id: 'dev-leads', label: 'Leads & Inbound', icon: Target, path: '/crm/worksuite/leads', section: 'Develo CRM' },
    { id: 'dev-clients', label: 'Clients Directory', icon: Users, path: '/crm/worksuite/clients', section: 'Develo CRM' },
    { id: 'dev-projects', label: 'Projects Management', icon: FolderKanban, path: '/crm/worksuite/projects', section: 'Develo CRM' },
    { id: 'dev-tasks', label: 'Tasks & Boards', icon: CheckSquare, path: '/crm/worksuite/tasks', section: 'Develo CRM' },
    { id: 'dev-invoices', label: 'Invoices & Billing', icon: Receipt, path: '/crm/worksuite/invoices', section: 'Develo CRM' },
    { id: 'dev-estimates', label: 'Proposals & Estimates', icon: FileText, path: '/crm/worksuite/estimates', section: 'Develo CRM' },
    { id: 'dev-payments', label: 'Payments & Revenue', icon: CreditCard, path: '/crm/worksuite/payments', section: 'Develo CRM' },
    { id: 'dev-contracts', label: 'Legal Contracts', icon: FileSignature, path: '/crm/worksuite/contracts', section: 'Develo CRM' },
    { id: 'dev-attendance', label: 'HR & Attendance', icon: UserCheck, path: '/crm/worksuite/attendance', section: 'Develo CRM' },
    { id: 'dev-reports', label: 'Reports & Analytics', icon: BarChart3, path: '/crm/worksuite/reports', section: 'Develo CRM' },
  ];
};
