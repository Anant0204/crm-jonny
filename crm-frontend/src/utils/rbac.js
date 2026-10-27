/**
 * Role-Based Access Control (RBAC) Engine
 * CRM nErgy Enterprise + OAL Network Marketplace
 */

// CRM Role Definitions & Module Permissions for all 12 Roles
export const CRM_ROLE_CONFIG = {
  business_owner: {
    id: 'business_owner',
    title: 'Business Owner / Executive',
    roleName: 'Business Owners',
    badge: 'Executive Command Access',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'leads',
      'pipeline',
      'tasks',
      'communication',
      'territory',
      'erp',
      'bestie',
      'ai-voice',
      'ai',
      'ai-video',
      'marketing',
      'hr',
      'support',
      'knowledge-base',
      'my-apps',
      'search',
      'reports',
      'admin',
      'ebox',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/leads',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/territory',
      '/crm/erp',
      '/crm/bestie',
      '/crm/ai-voice',
      '/crm/ai-studio',
      '/crm/ai-video',
      '/crm/marketing',
      '/omp/executive/central-office',
      '/omp',
      '/crm/hr',
      '/crm/support',
      '/crm/knowledge-base',
      '/crm/my-apps',
      '/crm/search',
      '/crm/analytics',
      '/crm/reports',
      '/crm/admin',
      '/crm/admin/ebox',
      '/crm/ebox',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  customer: {
    id: 'customer',
    title: 'Client & Customer Portal',
    roleName: 'Customer',
    badge: 'Customer Self-Service Vault',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'support',
      'knowledge-base',
      'tasks',
      'communication',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/support',
      '/crm/support/tickets',
      '/crm/support/chat',
      '/crm/support/kb',
      '/crm/support/reports',
      '/crm/knowledge-base',
      '/crm/tasks',
      '/crm/communication',
      '/crm/bestie',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  content_creator: {
    id: 'content_creator',
    title: 'AI Media & Video Creator',
    roleName: 'Content Creators',
    badge: 'Creative AI SuperHouse',
    defaultRoute: '/crm/ai-studio',
    allowedNavIds: [
      'dashboard',
      'bestie',
      'ai',
      'ai-video',
      'my-apps',
      'tasks',
      'communication',
      'knowledge-base',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/ai-studio',
      '/crm/ai-video',
      '/crm/bestie',
      '/crm/my-apps',
      '/crm/tasks',
      '/crm/communication',
      '/crm/knowledge-base',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  content_builder: {
    id: 'content_builder',
    title: 'Campaign & Content Builder',
    roleName: 'Content Builders',
    badge: 'Marketing Asset Engine',
    defaultRoute: '/crm/marketing',
    allowedNavIds: [
      'dashboard',
      'marketing',
      'ai',
      'bestie',
      'my-apps',
      'tasks',
      'communication',
      'knowledge-base',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/marketing',
      '/crm/ai-studio',
      '/crm/bestie',
      '/crm/my-apps',
      '/crm/tasks',
      '/crm/communication',
      '/crm/knowledge-base',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  influencer: {
    id: 'influencer',
    title: 'Brand Ambassador & Influencer',
    roleName: 'Influencers',
    badge: 'Referral & Audience Hub',
    defaultRoute: '/crm/leads',
    allowedNavIds: [
      'dashboard',
      'leads',
      'tasks',
      'communication',
      'my-apps',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/leads',
      '/crm/tasks',
      '/crm/communication',
      '/crm/bestie',
      '/crm/my-apps',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  affiliate_partner: {
    id: 'affiliate_partner',
    title: 'Affiliate Deal Partner',
    roleName: 'Affiliate Partners',
    badge: 'Partner Network & Commissions',
    defaultRoute: '/crm/leads',
    allowedNavIds: [
      'dashboard',
      'leads',
      'territory',
      'pipeline',
      'tasks',
      'communication',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/leads',
      '/crm/territory',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/bestie',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  ai_marketing_pro: {
    id: 'ai_marketing_pro',
    title: 'AI Marketing Specialist',
    roleName: 'AI Marketing Pros',
    badge: 'AI Growth & Ad Engine',
    defaultRoute: '/crm/marketing',
    allowedNavIds: [
      'dashboard',
      'marketing',
      'leads',
      'pipeline',
      'tasks',
      'communication',
      'ai',
      'ai-video',
      'bestie',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/marketing',
      '/crm/leads',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/ai-studio',
      '/crm/ai-video',
      '/crm/bestie',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  hr: {
    id: 'hr',
    title: 'Human Resources Director',
    roleName: 'HR',
    badge: 'Talent & Employee Lifecycle',
    defaultRoute: '/crm/hr',
    allowedNavIds: [
      'dashboard',
      'hr',
      'tasks',
      'communication',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/tasks',
      '/crm/communication',
      '/crm/hr',
      '/crm/hr/employees',
      '/crm/hr/candidates',
      '/crm/hr/jobs',
      '/crm/hr/interviews',
      '/crm/hr/reports',
      '/crm/bestie',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  admin_1: {
    id: 'admin_1',
    title: 'Operations & Sales Administrator',
    roleName: 'Admin I',
    badge: 'Operations Desk Control',
    defaultRoute: '/crm/leads',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'leads',
      'pipeline',
      'tasks',
      'communication',
      'territory',
      'erp',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/leads',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/territory',
      '/crm/erp',
      '/crm/bestie',
      '/omp/executive/central-office',
      '/omp',
      '/crm/erp/projects',
      '/crm/erp/sales-orders',
      '/crm/erp/reports',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  admin_2: {
    id: 'admin_2',
    title: 'Finance & Compliance Administrator',
    roleName: 'Admin II',
    badge: 'ERP & Financial Controller',
    defaultRoute: '/crm/erp/finance',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'pipeline',
      'tasks',
      'erp',
      'search',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/erp',
      '/crm/bestie',
      '/omp/executive/central-office',
      '/omp',
      '/crm/erp/finance',
      '/crm/erp/procurement',
      '/crm/erp/sales-orders',
      '/crm/erp/inventory',
      '/crm/erp/supply-chain',
      '/crm/erp/manufacturing',
      '/crm/erp/reports',
      '/crm/erp/projects',
      '/crm/search',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  crm_pro: {
    id: 'crm_pro',
    title: 'CRM & Pipeline Specialist',
    roleName: 'CRM Pros',
    badge: 'Customer Relations Lead',
    defaultRoute: '/crm/pipeline',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'leads',
      'pipeline',
      'tasks',
      'communication',
      'support',
      'knowledge-base',
      'reports',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/leads',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/support',
      '/crm/support/tickets',
      '/crm/support/chat',
      '/crm/support/kb',
      '/crm/support/reports',
      '/crm/knowledge-base',
      '/crm/bestie',
      '/crm/analytics',
      '/crm/reports',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  super_admin: {
    id: 'super_admin',
    title: 'Master Super Administrator',
    roleName: 'Super Admin',
    badge: 'Root System & Vault Access',
    defaultRoute: '/crm/admin',
    allowedNavIds: [
      'dashboard',
      'contacts',
      'leads',
      'pipeline',
      'tasks',
      'communication',
      'territory',
      'erp',
      'bestie',
      'ai-voice',
      'ai',
      'ai-video',
      'marketing',
      'hr',
      'support',
      'knowledge-base',
      'my-apps',
      'search',
      'reports',
      'admin',
      'ebox',
      'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard',
      '/crm/contacts',
      '/crm/leads',
      '/crm/pipeline',
      '/crm/tasks',
      '/crm/communication',
      '/crm/territory',
      '/crm/erp',
      '/crm/bestie',
      '/crm/ai-voice',
      '/crm/ai-studio',
      '/crm/ai-video',
      '/crm/marketing',
      '/omp/executive/central-office',
      '/omp',
      '/crm/hr',
      '/crm/support',
      '/crm/knowledge-base',
      '/crm/my-apps',
      '/crm/search',
      '/crm/analytics',
      '/crm/reports',
      '/crm/admin',
      '/crm/admin/ebox',
      '/crm/ebox',
      '/admin/secured-ebox',
      '/crm/settings',
      '/crm/profile',
      '/showcase',
    ],
  },
  // Backward compatibility mappings
  owner: {
    id: 'business_owner',
    title: 'Business Owner / Executive',
    roleName: 'Business Owners',
    badge: 'Executive Command Access',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: [
      'dashboard', 'contacts', 'leads', 'pipeline', 'tasks', 'communication', 'territory',
      'erp', 'bestie', 'ai', 'ai-video', 'marketing', 'hr', 'support',
      'knowledge-base', 'my-apps', 'search', 'reports', 'admin', 'settings',
    ],
    allowedRoutes: [
      '/crm/dashboard', '/crm/contacts', '/crm/leads', '/crm/pipeline', '/crm/tasks',
      '/crm/communication', '/crm/territory', '/crm/erp', '/crm/bestie', '/crm/ai-studio',
      '/crm/ai-video', '/crm/marketing', '/omp/executive/central-office', '/omp', '/crm/hr',
      '/crm/support', '/crm/knowledge-base', '/crm/my-apps', '/crm/search', '/crm/analytics',
      '/crm/reports', '/crm/admin', '/crm/settings', '/crm/profile', '/showcase',
    ],
  },
  sales: {
    id: 'admin_1',
    title: 'Operations & Sales Administrator',
    roleName: 'Admin I',
    badge: 'Operations Desk Control',
    defaultRoute: '/crm/leads',
    allowedNavIds: ['dashboard', 'contacts', 'leads', 'pipeline', 'tasks', 'communication', 'erp', 'reports', 'settings'],
    allowedRoutes: ['/crm/dashboard', '/crm/contacts', '/crm/leads', '/crm/pipeline', '/crm/tasks', '/crm/communication', '/crm/erp', '/omp/executive/central-office', '/omp', '/crm/analytics', '/crm/reports', '/crm/settings', '/crm/profile', '/showcase'],
  },
  finance: {
    id: 'admin_2',
    title: 'Finance & Compliance Administrator',
    roleName: 'Admin II',
    badge: 'ERP & Financial Controller',
    defaultRoute: '/crm/erp/finance',
    allowedNavIds: ['dashboard', 'contacts', 'pipeline', 'tasks', 'erp', 'reports', 'settings'],
    allowedRoutes: ['/crm/dashboard', '/crm/contacts', '/crm/pipeline', '/crm/tasks', '/crm/erp', '/omp/executive/central-office', '/omp', '/crm/erp/finance', '/crm/erp/reports', '/crm/analytics', '/crm/reports', '/crm/settings', '/crm/profile', '/showcase'],
  },
  employee: {
    id: 'crm_pro',
    title: 'CRM & Pipeline Specialist',
    roleName: 'CRM Pros',
    badge: 'Customer Relations Lead',
    defaultRoute: '/crm/pipeline',
    allowedNavIds: ['dashboard', 'contacts', 'leads', 'pipeline', 'tasks', 'communication', 'support', 'knowledge-base', 'reports', 'settings'],
    allowedRoutes: ['/crm/dashboard', '/crm/contacts', '/crm/leads', '/crm/pipeline', '/crm/tasks', '/crm/communication', '/crm/support', '/crm/knowledge-base', '/crm/analytics', '/crm/reports', '/crm/settings', '/crm/profile', '/showcase'],
  },
};

// OAL Marketplace Role Definitions & Module Permissions
export const OAL_ROLE_CONFIG = {
  borrower: {
    id: 'borrower',
    title: 'Corporate Borrower',
    roleName: 'Borrower Account',
    badge: 'KYC Vault & Underwriting Offers',
    defaultRoute: '/oal/borrower/dashboard',
    allowedNavIds: [
      'borrower-dashboard',
      'borrower-kyc',
      'borrower-app',
      'borrower-offers',
      'borrower-score',
      'borrower-messages',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/borrower/dashboard',
      '/oal/borrower/kyc',
      '/oal/borrower/application',
      '/oal/borrower/documents',
      '/oal/borrower/score',
      '/oal/borrower/offers',
      '/oal/borrower/messages',
      '/oal/borrower/referrals',
      '/oal/borrower/support',
      '/oal/borrower/profile',
      '/oal/borrower/settings',
      '/showcase',
    ],
  },
  lender: {
    id: 'lender',
    title: 'Institutional Lender',
    roleName: 'Lender Account',
    badge: 'Capital Allocation & Term Sheets',
    defaultRoute: '/oal/lender/dashboard',
    allowedNavIds: [
      'lender-dashboard',
      'lender-leads',
      'lender-applications',
      'lender-offers',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/lender/dashboard',
      '/oal/lender/leads',
      '/oal/lender/applications',
      '/oal/lender/offers',
      '/oal/lender/analytics',
      '/oal/lender/reports',
      '/oal/lender/profile',
      '/oal/lender/settings',
      '/showcase',
    ],
  },
  rep: {
    id: 'rep',
    title: 'Licensed OAL Representative',
    roleName: 'OAL Agent',
    badge: 'Underwriting Desk & Loan Queue',
    defaultRoute: '/oal/rep/dashboard',
    allowedNavIds: [
      'rep-dashboard',
      'rep-borrowers',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/rep/dashboard',
      '/oal/rep/borrowers',
      '/oal/rep/applications',
      '/oal/rep/documents',
      '/oal/rep/messages',
      '/oal/rep/offers',
      '/oal/rep/tasks',
      '/oal/rep/profile',
      '/showcase',
    ],
  },
  admin: {
    id: 'admin',
    title: 'Platform Master Admin',
    roleName: 'Master Admin',
    badge: 'Master Governance & Scoring Config',
    defaultRoute: '/oal/admin/dashboard',
    allowedNavIds: [
      'admin-dashboard',
      'admin-lenders',
      'admin-scoring',
      'admin-support',
      'admin-audit',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/admin/dashboard',
      '/oal/admin/borrowers',
      '/oal/admin/lenders',
      '/oal/admin/applications',
      '/oal/admin/verification',
      '/oal/admin/scoring',
      '/oal/admin/documents',
      '/oal/admin/payments',
      '/oal/admin/subscriptions',
      '/oal/admin/referrals',
      '/oal/admin/ads',
      '/oal/admin/cms',
      '/oal/admin/support',
      '/oal/admin/reports',
      '/oal/admin/audit',
      '/oal/admin/profile',
      '/oal/admin/settings',
      '/showcase',
    ],
  },
};

/**
 * Normalizes any role input (object or string) into a standard role ID.
 */
export const normalizeRoleId = (roleInput, product = 'crm') => {
  if (!roleInput) return product === 'crm' ? 'business_owner' : 'borrower';

  if (typeof roleInput === 'object') {
    if (roleInput.id) return roleInput.id.toLowerCase();
    if (roleInput.roleId) return roleInput.roleId.toLowerCase();
    roleInput = roleInput.role || roleInput.title || '';
  }

  const normalized = String(roleInput).toLowerCase();

  // CRM 12-Role checks
  if (product === 'crm') {
    if (normalized.includes('super admin') || normalized === 'super_admin') return 'super_admin';
    if (normalized.includes('owner') || normalized.includes('ceo') || normalized.includes('business')) return 'business_owner';
    if (normalized.includes('customer') || normalized.includes('client')) return 'customer';
    if (normalized.includes('creator') || normalized.includes('video')) return 'content_creator';
    if (normalized.includes('builder')) return 'content_builder';
    if (normalized.includes('influencer')) return 'influencer';
    if (normalized.includes('affiliate') || normalized.includes('partner')) return 'affiliate_partner';
    if (normalized.includes('marketing')) return 'ai_marketing_pro';
    if (normalized.includes('hr')) return 'hr';
    if (normalized.includes('admin ii') || normalized.includes('admin 2') || normalized.includes('admin_2') || normalized.includes('finance')) return 'admin_2';
    if (normalized.includes('admin i') || normalized.includes('admin 1') || normalized.includes('admin_1') || normalized.includes('sales')) return 'admin_1';
    if (normalized.includes('crm') || normalized.includes('pro') || normalized.includes('employee') || normalized.includes('staff')) return 'crm_pro';
    return 'business_owner';
  }

  // OAL checks
  if (normalized.includes('borrower')) return 'borrower';
  if (normalized.includes('lender')) return 'lender';
  if (normalized.includes('rep') || normalized.includes('agent')) return 'rep';
  if (normalized.includes('admin')) return 'admin';

  return 'borrower';
};

/**
 * Returns role configuration for the active user.
 */
export const getRoleConfig = (userOrRoleId, product = 'crm') => {
  const roleId = normalizeRoleId(userOrRoleId, product);
  const configMap = product === 'crm' ? CRM_ROLE_CONFIG : OAL_ROLE_CONFIG;
  return configMap[roleId] || (product === 'crm' ? CRM_ROLE_CONFIG.owner : OAL_ROLE_CONFIG.borrower);
};

/**
 * Filters navigation items array to only include items permitted for the role.
 */
export const getFilteredNavigation = (rawItems, product = 'crm', userOrRoleId) => {
  const config = getRoleConfig(userOrRoleId, product);
  const allowedIds = new Set(config.allowedNavIds);
  return rawItems.filter((item) => allowedIds.has(item.id));
};

/**
 * Checks if a user has permission to visit a specific path.
 */
export const isRouteAllowed = (path, product = 'crm', userOrRoleId) => {
  if (!path) return true;
  const config = getRoleConfig(userOrRoleId, product);

  // If super owner of CRM, allow all CRM routes
  if (product === 'crm' && config.id === 'owner') return true;

  // Clean path (strip trailing slashes and query strings)
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';

  // Common shared CRM platform features accessible to all authenticated CRM roles
  if (product === 'crm' && (cleanPath === '/crm/bestie' || cleanPath === '/crm/profile' || cleanPath === '/showcase')) {
    return true;
  }

  // Check direct match or route prefix match
  return config.allowedRoutes.some((allowed) => {
    const cleanAllowed = allowed.replace(/\/$/, '');
    if (cleanPath === cleanAllowed) return true;
    // Allow nested IDs (e.g. /crm/contacts/123 matches /crm/contacts)
    if (cleanPath.startsWith(`${cleanAllowed}/`)) return true;
    return false;
  });
};

/**
 * Returns the default fallback route for a given role.
 */
export const getDefaultRouteForRole = (product = 'crm', userOrRoleId) => {
  const config = getRoleConfig(userOrRoleId, product);
  return config.defaultRoute;
};
