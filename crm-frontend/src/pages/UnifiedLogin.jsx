import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Users,
  Landmark,
  Shield,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Video,
  Megaphone,
  Share2,
  Sliders,
  Kanban,
  ShieldAlert,
  Eye,
  EyeOff,
  Briefcase,
  UserCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SHOW_OAL } from '../config/features';
import { AiEnergyLogo } from '../components/common/AiEnergyLogo';

// 12 CRM Roles matching client specification and 2-column layout
const crmRoles = [
  // Column 1 (Left Column)
  {
    id: 'business_owner',
    title: 'Business Owners',
    subtitle: 'Executive Command Access',
    name: 'Business Owner',
    email: 'business.owner@nergy.io',
    password: '123456',
    role: 'Business Owners',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/dashboard',
    badge: 'Enterprise Control',
    description: 'Full executive oversight, revenue analytics, ERP modules, and autonomous AI engine configurations.',
    icon: Building2,
    column: 1,
    order: 1,
  },
  {
    id: 'content_creator',
    title: 'Content Creators',
    subtitle: 'AI Video & Media Creation',
    name: 'Content Creator',
    email: 'content.creator@nergy.io',
    password: '123456',
    role: 'Content Creators',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/ai-studio',
    badge: 'AI SuperHouse',
    description: 'Autonomous AI video agents, multimedia asset generators, and creative prompt pipelines.',
    icon: Video,
    column: 1,
    order: 2,
  },
  {
    id: 'influencer',
    title: 'Influencers',
    subtitle: 'Audience & Referral Tracking',
    name: 'Influencer',
    email: 'influencer@nergy.io',
    password: '123456',
    role: 'Influencers',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/leads',
    badge: 'Viral Growth Hub',
    description: 'Dedicated campaign affiliate tracking, audience engagement metrics, and social lead capture.',
    icon: Share2,
    column: 1,
    order: 3,
  },
  {
    id: 'ai_marketing_pro',
    title: 'AI Marketing Pros',
    subtitle: 'Growth & Autonomous Ads',
    name: 'AI Marketing Pro',
    email: 'ai.marketing@nergy.io',
    password: '123456',
    role: 'AI Marketing Pros',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/marketing',
    badge: 'Ad Intelligence',
    description: 'Multi-channel marketing automation, lead scoring algorithms, and autonomous ad distribution.',
    icon: Megaphone,
    column: 1,
    order: 4,
  },
  {
    id: 'admin_1',
    title: 'Admin I',
    subtitle: 'Operations & Pipeline Admin',
    name: 'Operations/Sales Admin',
    email: 'operations.admin@nergy.io',
    password: '123456',
    role: 'Admin I',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/leads',
    badge: 'Operations Desk',
    description: 'Central operations management, territory allocation, CRM pipelines, and team assignment.',
    icon: Shield,
    column: 1,
    order: 5,
  },
  {
    id: 'crm_pro',
    title: 'CRM Pros',
    subtitle: 'Pipeline & Deal Closing',
    name: 'CRM Pro',
    email: 'crm.pro@nergy.io',
    password: '123456',
    role: 'CRM Pros',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/pipeline',
    badge: 'Customer Relations',
    description: 'High-velocity lead pipelines, customer contact vaults, interaction history, and deal closings.',
    icon: Kanban,
    column: 1,
    order: 6,
  },

  // Column 2 (Right Column)
  {
    id: 'customer',
    title: 'Customer',
    subtitle: 'Self-Service Client Portal',
    name: 'Customer',
    email: 'customer@nergy.io',
    password: '123456',
    role: 'Customer',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/contacts',
    badge: 'Client Portal',
    description: 'Secure vault for client accounts, interaction history, support tickets, and service requests.',
    icon: Globe,
    column: 2,
    order: 1,
  },
  {
    id: 'content_builder',
    title: 'Content Builders',
    subtitle: 'Campaign & Asset Builder',
    name: 'Content Builder',
    email: 'content.builder@nergy.io',
    password: '123456',
    role: 'Content Builders',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/marketing',
    badge: 'Content Studio',
    description: 'Template creation, modular landing page builders, and automated asset generation suites.',
    icon: Zap,
    column: 2,
    order: 2,
  },
  {
    id: 'affiliate_partner',
    title: 'Affiliate Partners',
    subtitle: 'Commission & Deal Network',
    name: 'Affiliate Partner',
    email: 'affiliate.partner@nergy.io',
    password: '123456',
    role: 'Affiliate Partners',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/leads',
    badge: 'Partner Network',
    description: 'Partner network portal for lead origination, pipeline deal commissions, and partner links.',
    icon: TrendingUp,
    column: 2,
    order: 3,
  },
  {
    id: 'hr',
    title: 'HR',
    subtitle: 'Talent & Employee Lifecycle',
    name: 'HR',
    email: 'hr@nergy.io',
    password: '123456',
    role: 'HR',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/hr',
    badge: 'Human Resources',
    description: 'Employee directory, candidate recruiting pipelines, interviews, job postings, and onboarding.',
    icon: UserCheck,
    column: 2,
    order: 4,
  },
  {
    id: 'admin_2',
    title: 'Admin II',
    subtitle: 'Finance & Compliance Admin',
    name: 'Finance/Compliance Admin',
    email: 'finance.admin@nergy.io',
    password: '123456',
    role: 'Admin II',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/erp/finance',
    badge: 'ERP Controller',
    description: 'Financial ledger management, procurement approval, supply chain tracking, and compliance audits.',
    icon: Sliders,
    column: 2,
    order: 5,
  },
  {
    id: 'super_admin',
    title: 'Super Admin',
    subtitle: 'Master Root System Control',
    name: 'Super Admin',
    email: 'super.admin@nergy.io',
    password: '123456',
    role: 'Super Admin',
    company: 'nErgy Enterprise Logistics',
    target: '/crm/admin',
    badge: 'Root Sovereign',
    description: 'Full system control, tenant provisioning, security policies, and encrypted root zBox vault access.',
    icon: ShieldAlert,
    column: 2,
    order: 6,
    isSuperAdmin: true,
  },
];

const oalRoles = [
  {
    id: 'borrower',
    title: 'Corporate Borrower',
    subtitle: 'Borrower Onboarding Vault',
    name: 'Dr. Aris Thorne',
    email: 'a.thorne@biogenix.org',
    password: 'Borrower@2026',
    role: 'Borrower Account',
    company: 'BioGenix Labs Inc.',
    target: '/oal/borrower/dashboard',
    badge: 'Borrower Onboarding',
    description: 'Corporate loan applications, digital KYC verification, terms sheet comparison, and loan disbursement.',
    icon: Landmark,
  },
  {
    id: 'lender',
    title: 'Institutional Lender',
    subtitle: 'Capital Allocation & Bidding',
    name: 'Marcus Sterling',
    email: 'm.sterling@vanguard.com',
    password: 'Lender@2026',
    role: 'Lender Account',
    company: 'Vanguard Capital Debt Fund',
    target: '/oal/lender/dashboard',
    badge: 'Leads & Bidding Engine',
    description: 'Underwrite deals, issue structured debt offers, verify financial covenants, and manage capital portfolios.',
    icon: Building2,
  },
  {
    id: 'rep',
    title: 'Licensed OAL Representative',
    subtitle: 'Underwriting Desk & Loan Queue',
    name: 'Sarah Jenkins',
    email: 'agent.sarah@oalnetwork.com',
    password: 'Agent@2026',
    role: 'OAL Agent',
    company: 'OAL Network Services',
    target: '/oal/rep/dashboard',
    badge: 'Underwriting Desk',
    description: 'Manage borrower pipelines, review credit disclosures, coordinate between lenders and borrowers.',
    icon: Shield,
  },
  {
    id: 'admin',
    title: 'Platform Master Admin',
    subtitle: 'Master Governance & Scoring',
    name: 'Alexander Wright',
    email: 'admin.alexander@oalnetwork.com',
    password: 'Admin@2026',
    role: 'Master Admin',
    company: 'OAL Network Marketplace',
    target: '/oal/admin/dashboard',
    badge: 'Platform Governance',
    description: 'Full governance, risk engine parameters, compliance reporting, and marketplace liquidity controls.',
    icon: ShieldCheck,
  },
];

export const UnifiedLogin = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  const currentPlatform = !SHOW_OAL ? 'crm' : (mode || (location.pathname.includes('/oal') ? 'oal' : 'crm'));
  const roleList = currentPlatform === 'crm' ? crmRoles : oalRoles;

  const [selectedRole, setSelectedRole] = useState(roleList[0]);
  const [email, setEmail] = useState(roleList[0].email);
  const [password, setPassword] = useState(roleList[0].password);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuperAdminHidden, setIsSuperAdminHidden] = useState(false);

  useEffect(() => {
    const list = currentPlatform === 'crm' ? crmRoles : oalRoles;
    setSelectedRole(list[0]);
    setEmail(list[0].email);
    setPassword(list[0].password);
  }, [currentPlatform]);

  const handleSelectRole = (r) => {
    setSelectedRole(r);
    setEmail(r.email);
    setPassword(r.password);
  };

  const handleSwitchPlatform = () => {
    const targetPath = currentPlatform === 'crm' ? '/oal/login' : '/crm/login';
    navigate(targetPath);
  };

  const executeLogin = async (roleObj) => {
    setIsLoading(true);

    const loginEmail = email?.trim() || roleObj?.email;
    const loginPassword = password || roleObj?.password || '123456';

    try {
      if (currentPlatform === 'crm') {
        const res = await login(
          {
            email: loginEmail,
            password: loginPassword,
          },
          'crm'
        );

        const userName = res?.user?.name || roleObj?.name || 'User';
        addToast({
          title: `Welcome back, ${userName}!`,
          message: 'Authentication successful. Loading workspace...',
          type: 'success',
        });

        setIsLoading(false);
        navigate(roleObj?.target || '/crm/dashboard');
      } else {
        await login(
          {
            id: roleObj.id,
            name: roleObj.name,
            email: loginEmail,
            role: roleObj.role,
            company: roleObj.company,
            tenantId: `OAL-${roleObj.id.toUpperCase()}-9910`,
          },
          currentPlatform
        );

        addToast({
          title: `Authenticated as ${roleObj.title}`,
          message: `Welcome ${roleObj.name}! Navigating to portal...`,
          type: 'success',
        });

        setIsLoading(false);
        navigate(roleObj.target);
      }
    } catch (err) {
      setIsLoading(false);
      addToast({
        title: 'Authentication Failed',
        message: err.message || 'Invalid business email or password. Please verify your credentials.',
        type: 'error',
      });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    executeLogin(selectedRole);
  };

  // Group CRM roles into Column 1 and Column 2
  const col1Roles = crmRoles.filter((r) => r.column === 1);
  const col2Roles = crmRoles.filter((r) => r.column === 2 && (!r.isSuperAdmin || !isSuperAdminHidden));

  const SelectedIcon = selectedRole.icon || Building2;

  return (
    <div
      style={{
        minHeight: '100vh',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: isDark ? '#070b19' : '#f1f5f9',
        backgroundImage: isDark
          ? 'radial-gradient(circle at 15% 15%, rgba(14, 165, 233, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(59, 130, 246, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.95) 0%, #070b19 100%)'
          : 'radial-gradient(circle at 15% 15%, rgba(14, 165, 233, 0.1) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(59, 130, 246, 0.08) 0%, transparent 45%), radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%)',
        color: isDark ? '#f8fafc' : '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
      className="unified-login-root"
    >
      <style>{`
        @media (max-width: 992px) {
          .unified-login-root {
            height: auto !important;
            max-height: none !important;
            padding: 1.5rem 1rem !important;
          }
          .portal-login-main-container {
            grid-template-columns: 1fr !important;
          }
          .portal-left-panel {
            grid-column: span 1 !important;
            border-right: none !important;
            border-bottom: 1px solid ${isDark ? 'rgba(148, 163, 184, 0.12)' : '#e2e8f0'} !important;
            padding: 1.5rem 1.25rem !important;
          }
          .portal-right-panel {
            grid-column: span 1 !important;
            padding: 1.5rem 1.25rem !important;
          }
        }
        @media (max-width: 640px) {
          .portal-roles-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .portal-role-card:hover {
          background-color: ${isDark ? 'rgba(30, 41, 59, 0.85)' : '#e2e8f0'} !important;
          border-color: ${isDark ? 'rgba(56, 189, 248, 0.4)' : '#0284c7'} !important;
          transform: translateY(-1px);
        }
      `}</style>

      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
          margin: '0 auto',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            padding: '0 0.25rem',
          }}
        >
          {/* Logo Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AiEnergyLogo size={34} showText={false} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', letterSpacing: '-0.02em' }}>
                  CRM nErgy
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('AI POWERED')}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#64748b' }}>
                {t('Enterprise Portal Gateway')} &bull; {t('12 Autonomous User Hubs')}
              </span>
            </div>
          </div>

          {/* Action Bar (Super Admin toggle) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setIsSuperAdminHidden(!isSuperAdminHidden)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                backgroundColor: isSuperAdminHidden ? (isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)') : (isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff'),
                border: isSuperAdminHidden ? (isDark ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(239, 68, 68, 0.3)') : (isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #cbd5e1'),
                color: isSuperAdminHidden ? (isDark ? '#f87171' : '#dc2626') : (isDark ? '#cbd5e1' : '#334155'),
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title={isSuperAdminHidden ? t('Click to Show Super Admin Button') : t('Click to Hide Super Admin Button')}
            >
              {isSuperAdminHidden ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{t('Super Admin')}: {isSuperAdminHidden ? t('HIDDEN') : t('VISIBLE')}</span>
            </button>
          </div>
        </div>

        {/* Main SmartCare Style Screen (Left Live Form + Right 2-Col Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
            backdropFilter: 'blur(24px)',
            borderRadius: '16px',
            border: isDark ? '1px solid rgba(56, 189, 248, 0.2)' : '1px solid #e2e8f0',
            boxShadow: isDark
              ? '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(14, 165, 233, 0.08)'
              : '0 20px 45px -10px rgba(15, 23, 42, 0.1), 0 0 1px rgba(15, 23, 42, 0.05)',
            overflow: 'hidden',
          }}
          className="portal-login-main-container"
        >
          {/* LEFT PANEL: Exact Login Form from Reference Image (Compact Fit) */}
          <div
            style={{
              gridColumn: 'span 5 / span 5',
              borderRight: isDark ? '1px solid rgba(148, 163, 184, 0.12)' : '1px solid #e2e8f0',
              backgroundColor: isDark ? 'rgba(10, 17, 34, 0.75)' : '#f8fafc',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
            className="portal-left-panel"
          >
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Header: Logo Sphere + Brand Title */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '0.25rem',
                  paddingBottom: '0.625rem',
                  borderBottom: isDark ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid #e2e8f0',
                }}
              >
                <AiEnergyLogo size={52} showText={false} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', letterSpacing: '-0.01em' }}>
                    CRM nErgy
                  </span>
                  <span
                    style={{
                      fontSize: '8px',
                      fontWeight: 800,
                      backgroundColor: '#0284c7',
                      color: '#ffffff',
                      padding: '1px 4px',
                      borderRadius: '3px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    AI
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: isDark ? '#94a3b8' : '#64748b',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('ENTERPRISE CRM • ERP • AI SUPERHOUSE')}
                </span>
                <span style={{ fontSize: '11px', color: isDark ? '#64748b' : '#94a3b8', marginTop: '0.1rem' }}>
                  {t('Sign in to continue to your CRM workspace.')}
                </span>
              </div>

              {/* Input: Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: isDark ? '#e2e8f0' : '#334155' }}>
                  {t('Business Email')}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail
                    size={14}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      color: '#38bdf8',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('Enter email address')}
                    style={{
                      width: '100%',
                      height: '38px',
                      paddingLeft: '34px',
                      paddingRight: '12px',
                      borderRadius: '8px',
                      border: isDark ? '1px solid rgba(56, 189, 248, 0.28)' : '1px solid #cbd5e1',
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      fontSize: '12px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#0284c7'; }}
                    onBlur={(e) => { e.target.style.borderColor = isDark ? 'rgba(56, 189, 248, 0.28)' : '#cbd5e1'; }}
                  />
                </div>
              </div>

              {/* Input: Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: isDark ? '#e2e8f0' : '#334155' }}>
                  {t('Password')}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock
                    size={14}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      color: '#38bdf8',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={t('Enter password')}
                    style={{
                      width: '100%',
                      height: '38px',
                      paddingLeft: '34px',
                      paddingRight: '36px',
                      borderRadius: '8px',
                      border: isDark ? '1px solid rgba(56, 189, 248, 0.28)' : '1px solid #cbd5e1',
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      fontSize: '12px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#0284c7'; }}
                    onBlur={(e) => { e.target.style.borderColor = isDark ? 'rgba(56, 189, 248, 0.28)' : '#cbd5e1'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: isDark ? '#94a3b8' : '#64748b',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      borderRadius: '4px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#0284c7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? '#94a3b8' : '#64748b'; }}
                    tabIndex={-1}
                    title={showPassword ? t('Hide password') : t('Show password')}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Info Box: Authenticated As / Organization */}
              <div
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.55)' : '#ffffff',
                  border: isDark ? '1px solid rgba(148, 163, 184, 0.16)' : '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  fontSize: '11px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '10.5px' }}>{t('Authenticated as')}</span>
                  <span style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>{t(selectedRole.name)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '10.5px' }}>{t('Organization')}</span>
                  <span style={{ fontWeight: 600, color: isDark ? '#38bdf8' : '#0284c7' }}>{selectedRole.company}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{isLoading ? t('Signing In...') : `${t('Sign in with Selected Role')}: ${t(selectedRole.title)}`}</span>
                {!isLoading && <ArrowRight size={15} />}
              </button>
            </form>

            {/* Security Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                fontSize: '11px',
                color: isDark ? '#94a3b8' : '#64748b',
                paddingTop: '0.5rem',
                borderTop: isDark ? '1px solid rgba(148, 163, 184, 0.16)' : '1px solid #e2e8f0',
              }}
            >
              <ShieldCheck size={13} style={{ color: '#10b981' }} />
              <span>{t('Secure enterprise session • Tenant-isolated workspace')}</span>
            </div>
          </div>

          {/* RIGHT GRID PANEL: Select Portal (2-Column Grid of 12 Roles - Compact Fit) */}
          <div
            style={{
              gridColumn: 'span 7 / span 7',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
            className="portal-right-panel"
          >
            {/* Header */}
            <div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: isDark ? '#f8fafc' : '#0f172a',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {t('Select Your Business Role & Persona')}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: isDark ? '#94a3b8' : '#64748b',
                  margin: '2px 0 0 0',
                }}
              >
                {t('Quick One-Click Demo Access')}
              </p>
            </div>

            {/* 2-Column Role Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
              }}
              className="portal-roles-grid"
            >
              {/* Column 1 Roles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col1Roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole.id === role.id;

                  return (
                    <div
                      key={role.id}
                      onClick={() => handleSelectRole(role)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '9px',
                        backgroundColor: isSelected
                          ? (isDark ? 'rgba(14, 165, 233, 0.18)' : 'rgba(14, 165, 233, 0.12)')
                          : (isDark ? 'rgba(30, 41, 59, 0.55)' : '#f8fafc'),
                        border: isSelected
                          ? (isDark ? '1px solid #38bdf8' : '1px solid #0284c7')
                          : (isDark ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid #e2e8f0'),
                        boxShadow: isSelected
                          ? (isDark ? '0 0 12px rgba(56, 189, 248, 0.22)' : '0 2px 8px rgba(2, 132, 199, 0.15)')
                          : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      className="portal-role-card"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '7px',
                            backgroundColor: isSelected
                              ? '#0284c7'
                              : (isDark ? 'rgba(51, 65, 85, 0.7)' : '#e2e8f0'),
                            color: isSelected ? '#ffffff' : (isDark ? '#94a3b8' : '#64748b'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={15} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: isSelected ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? '#f8fafc' : '#0f172a'),
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {t(role.title)}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              color: isDark ? '#64748b' : '#94a3b8',
                              marginTop: '0px',
                            }}
                          >
                            {t('Secure Access')}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={14}
                        style={{
                          color: isSelected ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? '#475569' : '#cbd5e1'),
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Column 2 Roles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col2Roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole.id === role.id;

                  return (
                    <div
                      key={role.id}
                      onClick={() => handleSelectRole(role)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '9px',
                        backgroundColor: isSelected
                          ? (isDark ? 'rgba(14, 165, 233, 0.18)' : 'rgba(14, 165, 233, 0.12)')
                          : (isDark ? 'rgba(30, 41, 59, 0.55)' : '#f8fafc'),
                        border: isSelected
                          ? (isDark ? '1px solid #38bdf8' : '1px solid #0284c7')
                          : (isDark ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid #e2e8f0'),
                        boxShadow: isSelected
                          ? (isDark ? '0 0 12px rgba(56, 189, 248, 0.22)' : '0 2px 8px rgba(2, 132, 199, 0.15)')
                          : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      className="portal-role-card"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '7px',
                            backgroundColor: isSelected
                              ? '#0284c7'
                              : (isDark ? 'rgba(51, 65, 85, 0.7)' : '#e2e8f0'),
                            color: isSelected ? '#ffffff' : (isDark ? '#94a3b8' : '#64748b'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={15} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: isSelected ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? '#f8fafc' : '#0f172a'),
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {t(role.title)}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              color: isDark ? '#64748b' : '#94a3b8',
                              marginTop: '0px',
                            }}
                          >
                            {t('Secure Access')}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={14}
                        style={{
                          color: isSelected ? (isDark ? '#38bdf8' : '#0284c7') : (isDark ? '#475569' : '#cbd5e1'),
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.5rem',
                borderTop: isDark ? '1px solid rgba(148, 163, 184, 0.12)' : '1px solid #e2e8f0',
                fontSize: '11px',
                color: isDark ? '#64748b' : '#64748b',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={13} style={{ color: '#10b981' }} />
                <span>{t('Encrypted RBAC Security Layer Active')}</span>
              </div>
              <span style={{ color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 600 }}>
                {t('12 Roles Configured • Click to switch persona')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;

