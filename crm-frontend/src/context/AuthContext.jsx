import React, { createContext, useContext, useState, useEffect } from 'react';
import { isRouteAllowed, getRoleConfig, getDefaultRouteForRole, normalizeRoleId } from '../utils/rbac';

const AuthContext = createContext();

const defaultPermissionsMatrix = {
  Owner: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
  Admin: { View: true, Create: true, Edit: true, Delete: true, Export: true, Admin: true },
  Sales: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  HR: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  Finance: { View: true, Create: true, Edit: true, Delete: false, Export: true, Admin: false },
  Employee: { View: true, Create: false, Edit: false, Delete: false, Export: false, Admin: false },
};

export const crmRoles = [
  {
    id: 'business_owner',
    title: 'Business Owner / Executive',
    name: 'Alexander Wright',
    email: 'a.wright@nergy.io',
    role: 'Business Owners',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'customer',
    title: 'Client & Customer Portal',
    name: 'Dr. Aris Thorne',
    email: 'a.thorne@biogenix.org',
    role: 'Customer',
    company: 'BioGenix Labs Inc.',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'content_creator',
    title: 'AI Media & Video Creator',
    name: 'Leo Fontaine',
    email: 'l.fontaine@nergy.io',
    role: 'Content Creators',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'content_builder',
    title: 'Campaign & Content Builder',
    name: 'Maya Lin',
    email: 'm.lin@nergy.io',
    role: 'Content Builders',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'influencer',
    title: 'Brand Ambassador & Influencer',
    name: 'Chloe Rivera',
    email: 'c.rivera@nergy.io',
    role: 'Influencers',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'affiliate_partner',
    title: 'Affiliate Deal Partner',
    name: 'Julian Vance',
    email: 'j.vance@nergypartners.net',
    role: 'Affiliate Partners',
    company: 'Vance Capital Network',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'ai_marketing_pro',
    title: 'AI Marketing Specialist',
    name: 'Tanya Sterling',
    email: 't.sterling@nergy.io',
    role: 'AI Marketing Pros',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'hr',
    title: 'Human Resources Director',
    name: 'Elena Rostova',
    email: 'e.rostova@nergy.io',
    role: 'HR',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'admin_1',
    title: 'Operations & Sales Administrator',
    name: 'Sarah Jenkins',
    email: 's.jenkins@nergy.io',
    role: 'Admin I',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'admin_2',
    title: 'Finance & Compliance Administrator',
    name: 'David Chen',
    email: 'd.chen@nergy.io',
    role: 'Admin II',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'crm_pro',
    title: 'CRM & Pipeline Specialist',
    name: 'Marcus Vance',
    email: 'm.vance@nergy.io',
    role: 'CRM Pros',
    company: 'nErgy Enterprise Logistics',
    tenantId: 'TENANT-08492',
    avatar: null,
  },
  {
    id: 'super_admin',
    title: 'Master Super Administrator',
    name: 'Root Sovereign Admin',
    email: 'root.superadmin@nergy.io',
    role: 'Super Admin',
    company: 'nErgy Global Enterprise',
    tenantId: 'SUPER-ROOT-00001',
    avatar: null,
  },
];

export const oalRoles = [
  {
    id: 'borrower',
    title: 'Corporate Borrower',
    name: 'Dr. Aris Thorne',
    email: 'a.thorne@biogenix.org',
    role: 'Borrower Account',
    company: 'BioGenix Labs Inc.',
    tenantId: 'OAL-BORROWER-9910',
    avatar: null,
  },
  {
    id: 'lender',
    title: 'Institutional Lender',
    name: 'Marcus Sterling',
    email: 'm.sterling@vanguard.com',
    role: 'Lender Account',
    company: 'Vanguard Capital Debt Fund',
    tenantId: 'OAL-LENDER-9910',
    avatar: null,
  },
  {
    id: 'rep',
    title: 'Licensed OAL Representative',
    name: 'Sarah Jenkins',
    email: 'agent.sarah@oalnetwork.com',
    role: 'OAL Agent',
    company: 'OAL Network Services',
    tenantId: 'OAL-REP-9910',
    avatar: null,
  },
  {
    id: 'admin',
    title: 'Platform Master Admin',
    name: 'Alexander Wright',
    email: 'admin.alexander@oalnetwork.com',
    role: 'Master Admin',
    company: 'OAL Network Marketplace',
    tenantId: 'OAL-ADMIN-9910',
    avatar: null,
  },
];

import authService from '../services/authService';
import apiClient from '../services/apiClient';

const defaultCrmUser = crmRoles[0];
const defaultOalUser = oalRoles[0];

export const AuthProvider = ({ children }) => {
  const [crmUser, setCrmUser] = useState(() => {
    const saved = localStorage.getItem('crm_user');
    const parsed = saved ? JSON.parse(saved) : defaultCrmUser;
    if (parsed?.email) {
      const cachedAvatar = localStorage.getItem(`crm_avatar_${parsed.email}`);
      if (cachedAvatar) {
        parsed.avatar = cachedAvatar;
      }
    }
    return parsed;
  });

  const [oalUser, setOalUser] = useState(() => {
    const saved = localStorage.getItem('oal_user');
    const parsed = saved ? JSON.parse(saved) : defaultOalUser;
    if (parsed?.email) {
      const cachedAvatar = localStorage.getItem(`crm_avatar_${parsed.email}`);
      if (cachedAvatar) {
        parsed.avatar = cachedAvatar;
      }
    }
    return parsed;
  });

  const [isCrmAuthenticated, setIsCrmAuthenticated] = useState(() => {
    const token = localStorage.getItem('crm_token');
    return Boolean(token);
  });

  const [isOalAuthenticated, setIsOalAuthenticated] = useState(() => {
    const saved = localStorage.getItem('oal_is_authenticated');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('crm_company_setup');
    return saved ? JSON.parse(saved) : {
      companyName: 'nErgy Enterprise Logistics',
      legalName: 'nErgy Global Solutions Inc.',
      businessEmail: 'contact@nergy.io',
      phone: '+1 (555) 019-2834',
      taxId: 'US-99201948',
      industry: 'Logistics & Supply Chain',
      address: '100 Enterprise Way, Suite 400',
      city: 'Austin',
      state: 'TX',
      country: 'United States',
      zipCode: '78701',
      timezone: 'UTC-6 (Central Time)',
      currency: 'USD ($)',
    };
  });

  const [invitedEmployees, setInvitedEmployees] = useState(() => {
    const saved = localStorage.getItem('crm_invited_employees');
    return saved ? JSON.parse(saved) : [
      { name: 'Sarah Jenkins', email: 's.jenkins@nergy.io', role: 'Sales' },
      { name: 'David Chen', email: 'd.chen@nergy.io', role: 'Finance' },
      { name: 'Elena Rostova', email: 'e.rostova@nergy.io', role: 'HR' },
    ];
  });

  const [rolesPermissions, setRolesPermissions] = useState(() => {
    const saved = localStorage.getItem('crm_roles_permissions');
    return saved ? JSON.parse(saved) : defaultPermissionsMatrix;
  });

  // Safe setter that guarantees local avatar persistence across refreshes
  const setPersistedCrmUser = (updater) => {
    setCrmUser((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next?.email && next?.avatar) {
        localStorage.setItem(`crm_avatar_${next.email}`, next.avatar);
      }
      return next;
    });
  };

  // Verify and sync live session on app boot
  useEffect(() => {
    const syncSession = async () => {
      const token = localStorage.getItem('crm_token');
      if (token) {
        try {
          const profile = await authService.getMe();
          if (profile?.id) {
            const cachedAvatar = profile.email ? localStorage.getItem(`crm_avatar_${profile.email}`) : null;
            const effectiveAvatar = profile.avatar || cachedAvatar;
            if (effectiveAvatar && profile.email) {
              localStorage.setItem(`crm_avatar_${profile.email}`, effectiveAvatar);
            }

            setCrmUser((prev) => ({
              ...prev,
              id: profile.frontendRole || profile.id,
              userId: profile.id,
              name: profile.name,
              email: profile.email,
              role: profile.role,
              tenantId: profile.tenantId,
              avatar: effectiveAvatar || prev?.avatar,
            }));
            setIsCrmAuthenticated(true);
            if (profile.tenant) {
              setCompanyData((prev) => ({
                ...prev,
                companyName: profile.tenant.name || prev.companyName,
              }));
            }
          }
        } catch (err) {
          if (err?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('crm_token');
            setIsCrmAuthenticated(false);
          }
        }
      } else {
        setIsCrmAuthenticated(false);
      }
    };
    syncSession();
  }, []);

  useEffect(() => {
    localStorage.setItem('crm_user', JSON.stringify(crmUser));
    if (crmUser?.email && crmUser?.avatar) {
      localStorage.setItem(`crm_avatar_${crmUser.email}`, crmUser.avatar);
    }
  }, [crmUser]);

  useEffect(() => {
    localStorage.setItem('oal_user', JSON.stringify(oalUser));
    if (oalUser?.email && oalUser?.avatar) {
      localStorage.setItem(`crm_avatar_${oalUser.email}`, oalUser.avatar);
    }
  }, [oalUser]);

  useEffect(() => {
    localStorage.setItem('crm_is_authenticated', JSON.stringify(isCrmAuthenticated));
  }, [isCrmAuthenticated]);

  useEffect(() => {
    localStorage.setItem('oal_is_authenticated', JSON.stringify(isOalAuthenticated));
  }, [isOalAuthenticated]);

  useEffect(() => {
    localStorage.setItem('crm_company_setup', JSON.stringify(companyData));
  }, [companyData]);

  useEffect(() => {
    localStorage.setItem('crm_invited_employees', JSON.stringify(invitedEmployees));
  }, [invitedEmployees]);

  useEffect(() => {
    localStorage.setItem('crm_roles_permissions', JSON.stringify(rolesPermissions));
  }, [rolesPermissions]);

  const login = async (userDataOrCredentials, mode = 'crm') => {
    // If live credentials provided for CRM
    if (mode === 'crm' && userDataOrCredentials?.password && userDataOrCredentials?.email) {
      try {
        const res = await authService.login({
          email: userDataOrCredentials.email,
          password: userDataOrCredentials.password,
        });

        if (res?.user) {
          const cachedAvatar = res.user.email ? localStorage.getItem(`crm_avatar_${res.user.email}`) : null;
          const finalAvatar = res.user.avatar || cachedAvatar;
          if (finalAvatar && res.user.email) {
            localStorage.setItem(`crm_avatar_${res.user.email}`, finalAvatar);
          }

          const userObj = {
            id: res.user.frontendRole || 'business_owner',
            userId: res.user.id,
            name: res.user.name,
            email: res.user.email,
            role: res.user.role,
            company: res.tenant?.name || 'nErgy Enterprise Logistics',
            tenantId: res.user.tenantId,
            avatar: finalAvatar,
          };
          setCrmUser(userObj);
          setIsCrmAuthenticated(true);
          if (res.tenant) {
            setCompanyData((prev) => ({
              ...prev,
              companyName: res.tenant.name || prev.companyName,
            }));
          }
          return res;
        }
      } catch (err) {
        throw err;
      }
    }

    // Fallback / role switcher login
    let finalUser = userDataOrCredentials;
    if (userDataOrCredentials && !userDataOrCredentials.id) {
      const list = mode === 'crm' ? crmRoles : oalRoles;
      const matched = list.find((r) => r.email === userDataOrCredentials.email || r.name === userDataOrCredentials.name);
      if (matched) {
        finalUser = { ...matched, ...userDataOrCredentials, id: matched.id };
      }
    }

    if (finalUser?.email) {
      const cachedAvatar = localStorage.getItem(`crm_avatar_${finalUser.email}`);
      if (cachedAvatar && !finalUser.avatar) {
        finalUser.avatar = cachedAvatar;
      }
    }

    if (mode === 'crm') {
      setCrmUser(finalUser || defaultCrmUser);
      setIsCrmAuthenticated(true);
    } else {
      setOalUser(finalUser || defaultOalUser);
      setIsOalAuthenticated(true);
    }
  };

  const register = async (regData) => {
    const res = await authService.register(regData);
    if (res?.user) {
      const userObj = {
        id: res.user.frontendRole || 'business_owner',
        userId: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        company: res.tenant?.name || regData.companyName,
        tenantId: res.user.tenantId,
        avatar: null,
      };
      setCrmUser(userObj);
      setIsCrmAuthenticated(true);
      if (res.tenant) {
        setCompanyData((prev) => ({
          ...prev,
          companyName: res.tenant.name,
        }));
      }
    }
    return res;
  };

  const switchRole = (roleObj, mode = 'crm') => {
    const cachedAvatar = roleObj.email ? localStorage.getItem(`crm_avatar_${roleObj.email}`) : null;
    const newUser = {
      id: roleObj.id || (mode === 'crm' ? 'owner' : 'borrower'),
      name: roleObj.name,
      email: roleObj.email,
      role: roleObj.role || roleObj.title,
      company: roleObj.company || (mode === 'crm' ? 'nErgy Enterprise Logistics' : 'OAL Network Marketplace'),
      tenantId: roleObj.tenantId || (mode === 'crm' ? 'TENANT-08492' : `OAL-${(roleObj.id || 'ROLE').toUpperCase()}-9910`),
      avatar: roleObj.avatar || cachedAvatar || null,
    };
    if (mode === 'crm') {
      setCrmUser(newUser);
      setIsCrmAuthenticated(true);
    } else {
      setOalUser(newUser);
      setIsOalAuthenticated(true);
    }
    return newUser;
  };

  const logout = async (mode = 'crm') => {
    if (mode === 'crm') {
      try {
        await authService.logout();
      } catch (_) {}
      setIsCrmAuthenticated(false);
      setCrmUser(null);
      localStorage.removeItem('crm_token');
      localStorage.removeItem('crm_user');
      localStorage.removeItem('crm_is_authenticated');
    } else {
      setIsOalAuthenticated(false);
      setOalUser(null);
      localStorage.removeItem('oal_user');
      localStorage.removeItem('oal_is_authenticated');
    }
  };

  const updateCompanyData = (data) => {
    setCompanyData((prev) => ({ ...prev, ...data }));
  };

  const updateInvitedEmployees = (employees) => {
    setInvitedEmployees(employees);
  };

  const updateRolesPermissions = (matrix) => {
    setRolesPermissions(matrix);
  };

  const canAccess = (path, mode = 'crm') => {
    const targetUser = mode === 'crm' ? crmUser : oalUser;
    return isRouteAllowed(path, mode, targetUser);
  };

  const getActiveRoleConfig = (mode = 'crm') => {
    const targetUser = mode === 'crm' ? crmUser : oalUser;
    return getRoleConfig(targetUser, mode);
  };

  const getDefaultRoute = (mode = 'crm') => {
    const targetUser = mode === 'crm' ? crmUser : oalUser;
    return getDefaultRouteForRole(mode, targetUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user: crmUser,
        crmUser,
        oalUser,
        setUser: setCrmUser,
        setCrmUser,
        setOalUser,
        isCrmAuthenticated,
        isOalAuthenticated,
        companyData,
        updateCompanyData,
        invitedEmployees,
        updateInvitedEmployees,
        rolesPermissions,
        updateRolesPermissions,
        login,
        register,
        switchRole,
        logout,
        canAccess,
        getActiveRoleConfig,
        getDefaultRoute,
        normalizeRoleId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

