
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// CRM nErgy Enterprise Routing Hub
import { CrmLayout } from '../layouts/CrmLayout';
import { OalLayout } from '../layouts/OalLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { SHOW_OAL } from '../config/features';
import { getOmpFinanceRoutes } from './ompFinanceRoutes';

import { WebsiteLayout } from '../layouts/WebsiteLayout';
import { WebsiteHome } from '../pages/website/WebsiteHome';
import { BusinessCrmPage } from '../pages/website/BusinessCrmPage';
import { FranchiseCrmPage } from '../pages/website/FranchiseCrmPage';
import { StartupsCrmPage } from '../pages/website/StartupsCrmPage';
import { MidSizeCrmPage } from '../pages/website/MidSizeCrmPage';
import { ContactAiPage } from '../pages/website/ContactAiPage';
import { InfluencersCrmPage } from '../pages/website/InfluencersCrmPage';
import { AnalyticAccountingPage } from '../pages/website/AnalyticAccountingPage';
import { ProfessionalServicesPage } from '../pages/website/ProfessionalServicesPage';
import { CustomizableDashboardsPage } from '../pages/website/CustomizableDashboardsPage';
import { FeaturesPage } from '../pages/website/FeaturesPage';
import { SolutionsPage } from '../pages/website/SolutionsPage';
import { IndustriesPage } from '../pages/website/IndustriesPage';
import { FaqsPage } from '../pages/website/FaqsPage';
import { FeatureDetailPage } from '../pages/website/FeatureDetailPage';
import { IndustryDetailPage } from '../pages/website/IndustryDetailPage';

// Gateway Login Pages
import { UnifiedLogin } from '../pages/UnifiedLogin';

import { CrmSignup } from '../pages/crm/CrmSignup';
import { CrmForgotPassword } from '../pages/crm/CrmForgotPassword';
import { CrmVerify } from '../pages/crm/CrmVerify';
import { CrmMfaSetup } from '../pages/crm/CrmMfaSetup';
import { CrmCompanySetup } from '../pages/crm/CrmCompanySetup';
import { CrmAdminSetup } from '../pages/crm/CrmAdminSetup';
import { CrmEmployeeInvite } from '../pages/crm/CrmEmployeeInvite';
import { CrmRolesPermissions } from '../pages/crm/CrmRolesPermissions';
import { CrmOnboardingComplete } from '../pages/crm/CrmOnboardingComplete';

import { CrmDashboard } from '../pages/crm/CrmDashboard';
import { CrmContacts } from '../pages/crm/CrmContacts';
import { CrmContactDetail } from '../pages/crm/CrmContactDetail';
import { CrmLeads } from '../pages/crm/CrmLeads';
import { CrmPipeline } from '../pages/crm/CrmPipeline';
import { CrmTasks } from '../pages/crm/CrmTasks';
import { CrmCommunication } from '../pages/crm/CrmCommunication';

// Phase 4 ERP Pages
import { ErpDashboard } from '../pages/crm/erp/ErpDashboard';
import { ErpProjects } from '../pages/crm/erp/ErpProjects';
import { ErpProjectDetail } from '../pages/crm/erp/ErpProjectDetail';
import { ErpProcurement } from '../pages/crm/erp/ErpProcurement';
import { ErpSalesOrders } from '../pages/crm/erp/ErpSalesOrders';
import { ErpFinance } from '../pages/crm/erp/ErpFinance';
import { ErpInventory } from '../pages/crm/erp/ErpInventory';
import { ErpSupplyChain } from '../pages/crm/erp/ErpSupplyChain';
import { ErpManufacturing } from '../pages/crm/erp/ErpManufacturing';
import { ErpReports } from '../pages/crm/erp/ErpReports';

// Phase 4 HR Pages
import { HrDashboard } from '../pages/crm/hr/HrDashboard';
import { HrEmployees } from '../pages/crm/hr/HrEmployees';
import { HrEmployeeDetail } from '../pages/crm/hr/HrEmployeeDetail';
import { HrCandidates } from '../pages/crm/hr/HrCandidates';
import { HrJobs, HrInterviews, HrReports } from '../pages/crm/hr/HrJobs';

// Phase 4 Support Pages
import { SupportDashboard } from '../pages/crm/support/SupportDashboard';
import { SupportTickets } from '../pages/crm/support/SupportTickets';
import { SupportTicketDetail } from '../pages/crm/support/SupportTicketDetail';
import { SupportChat, SupportKb, SupportReports } from '../pages/crm/support/SupportChat';

// Phase 5 AI SuperHouse & Extended Modules
import { CrmAiStudio } from '../pages/crm/CrmAiStudio';
import { ZunmeAi } from '../pages/crm/ai/BestieAi';
import { AiVoiceAgent } from '../pages/crm/ai/AiVoiceAgent';
import { AiVideoAgent } from '../pages/crm/ai/AiVideoAgent';
import { AiMarketing } from '../pages/crm/ai/AiMarketing';
import { TerritoryManagement } from '../pages/crm/territory/TerritoryManagement';
import { MyFavApps } from '../pages/crm/myapps/MyFavApps';
import { InternalAiSearch } from '../pages/crm/search/InternalAiSearch';
import { KnowledgeBase } from '../pages/crm/support/KnowledgeBase';

import { CrmAnalytics } from '../pages/crm/CrmAnalytics';
import { CrmReports } from '../pages/crm/CrmReports';
import { CrmAdmin } from '../pages/crm/CrmAdmin';
import { CrmSettings } from '../pages/crm/CrmSettings';
import { SecuredEbox } from '../pages/admin/SecuredEbox';
import { DeveloWorkspace } from '../pages/crm/worksuite/DeveloWorkspace';

// Phase 6 OAL Public Pages
import { OalLanding } from '../pages/oal/OalLanding';
import { OalBorrowerSignup } from '../pages/oal/OalBorrowerSignup';
import { OalLenderSignup } from '../pages/oal/OalLenderSignup';
import { OalVerify } from '../pages/oal/OalVerify';
import { OalMfaSetup } from '../pages/oal/OalMfaSetup';

// Phase 7 Borrower Pages
import { OalBorrowerDashboard } from '../pages/oal/borrower/OalBorrowerDashboard';
import { OalBorrowerKyc } from '../pages/oal/borrower/OalBorrowerKyc';
import { OalBorrowerApplication } from '../pages/oal/borrower/OalBorrowerApplication';
import { OalBorrowerDocuments } from '../pages/oal/borrower/OalBorrowerDocuments';
import { OalBorrowerScore } from '../pages/oal/borrower/OalBorrowerScore';
import { OalBorrowerOffers } from '../pages/oal/borrower/OalBorrowerOffers';
import { OalBorrowerMessages } from '../pages/oal/borrower/OalBorrowerMessages';
import { OalBorrowerProfile } from '../pages/oal/borrower/OalBorrowerProfile';
import { OalBorrowerReferrals, OalBorrowerSupport, OalBorrowerSettings } from '../pages/oal/borrower/OalBorrowerReferrals';

// Phase 8 Lender Pages
import { OalLenderDashboard } from '../pages/oal/lender/OalLenderDashboard';
import { OalLenderLeads } from '../pages/oal/lender/OalLenderLeads';
import { OalLenderLeadDetail } from '../pages/oal/lender/OalLenderLeadDetail';
import { OalLenderApplications, OalLenderOffers, OalLenderAnalytics, OalLenderReports, OalLenderSettings } from '../pages/oal/lender/OalLenderApplications';

// Phase 8 OAL Rep Pages
import { OalRepDashboard } from '../pages/oal/rep/OalRepDashboard';
import { OalRepBorrowers } from '../pages/oal/rep/OalRepBorrowers';
import { OalRepApplications, OalRepDocuments, OalRepMessages, OalRepOffers, OalRepTasks } from '../pages/oal/rep/OalRepApplications';

// Phase 9 OAL Admin Pages
import { OalAdminDashboard } from '../pages/oal/admin/OalAdminDashboard';
import { OalAdminBorrowers } from '../pages/oal/admin/OalAdminBorrowers';
import { OalAdminLenders } from '../pages/oal/admin/OalAdminLenders';
import { OalAdminApplications } from '../pages/oal/admin/OalAdminApplications';
import { OalAdminVerification } from '../pages/oal/admin/OalAdminVerification';
import { OalAdminScoring } from '../pages/oal/admin/OalAdminScoring';
import { OalAdminPayments, OalAdminSubscriptions } from '../pages/oal/admin/OalAdminPayments';
import { OalAdminSupport } from '../pages/oal/admin/OalAdminSupport';
import { OalAdminCms, OalAdminAudit } from '../pages/oal/admin/OalAdminCms';

import { Showcase } from '../pages/Showcase';
import { useAuth } from '../context/AuthContext';
import { normalizeRoleId } from '../utils/rbac';

const OalDashboardDispatcher = () => {
  const { oalUser } = useAuth();
  const roleId = normalizeRoleId(oalUser, 'oal');
  if (roleId === 'lender') return <OalLenderDashboard />;
  if (roleId === 'rep') return <OalRepDashboard />;
  if (roleId === 'admin') return <OalAdminDashboard />;
  return <OalBorrowerDashboard />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* CRM nErgy Public Website Routes (Landing Page & Solutions) */}
      <Route element={<WebsiteLayout />}>
        {/* Main Landing / Homepage */}
        <Route path="/" element={<WebsiteHome />} />
        <Route path="/website" element={<WebsiteHome />} />

        {/* Dedicated Main Section Pages */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/faqs" element={<FaqsPage />} />

        {/* Dedicated Solutions Pages */}
        <Route path="/solutions/business-crm" element={<BusinessCrmPage />} />
        <Route path="/solutions/startups" element={<StartupsCrmPage />} />
        <Route path="/solutions/startups-crm" element={<StartupsCrmPage />} />
        <Route path="/solutions/midsize" element={<MidSizeCrmPage />} />
        <Route path="/solutions/mid-size" element={<MidSizeCrmPage />} />
        <Route path="/solutions/mid-size-crm" element={<MidSizeCrmPage />} />
        <Route path="/solutions/franchise" element={<FranchiseCrmPage />} />
        <Route path="/solutions/franchise-crm" element={<FranchiseCrmPage />} />
        <Route path="/solutions/contact-ai" element={<ContactAiPage />} />
        <Route path="/solutions/influencers" element={<InfluencersCrmPage />} />
        <Route path="/solutions/influencers-crm" element={<InfluencersCrmPage />} />

        {/* Dedicated Features Pages */}
        <Route path="/features/analytic-accounting" element={<AnalyticAccountingPage />} />
        <Route path="/features/customizable-dashboards" element={<CustomizableDashboardsPage />} />
        <Route path="/features/dashboards" element={<CustomizableDashboardsPage />} />
        <Route path="/features/:slug" element={<FeatureDetailPage />} />

        {/* Dedicated Industries Pages */}
        <Route path="/industries/professional-services" element={<ProfessionalServicesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
      </Route>

      {/* Gateway Login Pages */}
      <Route path="/login" element={<UnifiedLogin mode="crm" />} />
      <Route path="/crm/login" element={<UnifiedLogin mode="crm" />} />
      <Route path="/oal/login" element={<UnifiedLogin mode="oal" />} />

      <Route element={<CrmLayout />}>
        <Route path="/showcase" element={<Showcase />} />
      </Route>

      {/* Unified OMP Deals Suite (Verified Dealers, Desking & Executive Hub) */}
      <Route element={<ProtectedRoute product="crm" />}>
        {getOmpFinanceRoutes()}
      </Route>

      {/* CRM Auth Onboarding Routes */}
      <Route path="/crm" element={<Navigate to="/crm/dashboard" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/crm/signup" element={<CrmSignup />} />
        <Route path="/crm/forgot-password" element={<CrmForgotPassword />} />
        <Route path="/crm/verify" element={<CrmVerify />} />
        <Route path="/crm/mfa" element={<CrmMfaSetup />} />
        <Route path="/crm/company-setup" element={<CrmCompanySetup />} />
        <Route path="/crm/admin-setup" element={<CrmAdminSetup />} />
        <Route path="/crm/employee-invite" element={<CrmEmployeeInvite />} />
        <Route path="/crm/roles-permissions" element={<CrmRolesPermissions />} />
        <Route path="/crm/onboarding-complete" element={<CrmOnboardingComplete />} />
      </Route>

      {/* Protected CRM Application Routes */}
      <Route element={<ProtectedRoute product="crm" />}>
        <Route element={<CrmLayout />}>
          <Route path="/crm/dashboard" element={<CrmDashboard />} />
          <Route path="/crm/contacts" element={<CrmContacts />} />
          <Route path="/crm/contacts/:id" element={<CrmContactDetail />} />
          <Route path="/crm/leads" element={<CrmLeads />} />
          <Route path="/crm/pipeline" element={<CrmPipeline />} />
          <Route path="/crm/tasks" element={<CrmTasks />} />
          <Route path="/crm/communication" element={<CrmCommunication />} />

          {/* ERP Routes */}
          <Route path="/crm/erp" element={<ErpDashboard />} />
          <Route path="/crm/erp/projects" element={<ErpProjects />} />
          <Route path="/crm/erp/projects/:id" element={<ErpProjectDetail />} />
          <Route path="/crm/erp/procurement" element={<ErpProcurement />} />
          <Route path="/crm/erp/sales-orders" element={<ErpSalesOrders />} />
          <Route path="/crm/erp/finance" element={<ErpFinance />} />
          <Route path="/crm/erp/inventory" element={<ErpInventory />} />
          <Route path="/crm/erp/supply-chain" element={<ErpSupplyChain />} />
          <Route path="/crm/erp/manufacturing" element={<ErpManufacturing />} />
          <Route path="/crm/erp/reports" element={<ErpReports />} />

          {/* HR Routes */}
          <Route path="/crm/hr" element={<HrDashboard />} />
          <Route path="/crm/hr/employees" element={<HrEmployees />} />
          <Route path="/crm/hr/employees/:id" element={<HrEmployeeDetail />} />
          <Route path="/crm/hr/candidates" element={<HrCandidates />} />
          <Route path="/crm/hr/jobs" element={<HrJobs />} />
          <Route path="/crm/hr/interviews" element={<HrInterviews />} />
          <Route path="/crm/hr/reports" element={<HrReports />} />

          {/* Support Routes */}
          <Route path="/crm/support" element={<SupportDashboard />} />
          <Route path="/crm/support/tickets" element={<SupportTickets />} />
          <Route path="/crm/support/tickets/:id" element={<SupportTicketDetail />} />
          <Route path="/crm/support/chat" element={<SupportChat />} />
          <Route path="/crm/support/kb" element={<SupportKb />} />
          <Route path="/crm/support/reports" element={<SupportReports />} />

          {/* AI SuperHouse & Extended Modules */}
          <Route path="/crm/bestie" element={<ZunmeAi />} />
          <Route path="/crm/ai-voice" element={<AiVoiceAgent />} />
          <Route path="/crm/ai-studio" element={<CrmAiStudio />} />
          <Route path="/crm/ai-video" element={<AiVideoAgent />} />
          <Route path="/crm/marketing" element={<AiMarketing />} />
          <Route path="/crm/territory" element={<TerritoryManagement />} />
          <Route path="/crm/my-apps" element={<MyFavApps />} />
          <Route path="/crm/search" element={<InternalAiSearch />} />
          <Route path="/crm/knowledge-base" element={<KnowledgeBase />} />

          <Route path="/crm/analytics" element={<CrmAnalytics />} />
          <Route path="/crm/reports" element={<CrmReports />} />
          <Route path="/crm/admin" element={<CrmAdmin />} />
          <Route path="/crm/admin/ebox" element={<SecuredEbox />} />
          <Route path="/crm/ebox" element={<SecuredEbox />} />
          <Route path="/crm/settings" element={<CrmSettings />} />
          <Route path="/crm/profile" element={<CrmSettings />} />

          {/* Develo CRM Worksuite Integrated Cockpit */}
          <Route path="/crm/worksuite" element={<DeveloWorkspace />} />
          <Route path="/crm/worksuite/:module" element={<DeveloWorkspace />} />

          <Route path="/crm/*" element={<CrmDashboard />} />
        </Route>
      </Route>

      {/* OAL Network Routes (Active when SHOW_OAL is enabled) */}
      {SHOW_OAL ? (
        <>
          <Route path="/oal" element={<OalLanding />} />

          <Route element={<AuthLayout />}>
            <Route path="/oal/borrower/signup" element={<OalBorrowerSignup />} />
            <Route path="/oal/lender/signup" element={<OalLenderSignup />} />
            <Route path="/oal/verify" element={<OalVerify />} />
            <Route path="/oal/mfa" element={<OalMfaSetup />} />
          </Route>

          {/* Protected OAL Authenticated Personas */}
          <Route element={<ProtectedRoute product="oal" />}>
            <Route element={<OalLayout />}>
              {/* Borrower Routes */}
              <Route path="/oal/dashboard" element={<OalDashboardDispatcher />} />
              <Route path="/oal/borrower/dashboard" element={<OalBorrowerDashboard />} />
              <Route path="/oal/borrower/kyc" element={<OalBorrowerKyc />} />
              <Route path="/oal/borrower/application" element={<OalBorrowerApplication />} />
              <Route path="/oal/borrower/documents" element={<OalBorrowerDocuments />} />
              <Route path="/oal/borrower/score" element={<OalBorrowerScore />} />
              <Route path="/oal/borrower/offers" element={<OalBorrowerOffers />} />
              <Route path="/oal/borrower/messages" element={<OalBorrowerMessages />} />
              <Route path="/oal/borrower/referrals" element={<OalBorrowerReferrals />} />
              <Route path="/oal/borrower/support" element={<OalBorrowerSupport />} />
              <Route path="/oal/borrower/profile" element={<OalBorrowerProfile />} />
              <Route path="/oal/borrower/settings" element={<OalBorrowerProfile />} />

              {/* Lender Routes */}
              <Route path="/oal/lender/dashboard" element={<OalLenderDashboard />} />
              <Route path="/oal/lender/leads" element={<OalLenderLeads />} />
              <Route path="/oal/lender/leads/:id" element={<OalLenderLeadDetail />} />
              <Route path="/oal/lender/applications" element={<OalLenderApplications />} />
              <Route path="/oal/lender/offers" element={<OalLenderOffers />} />
              <Route path="/oal/lender/analytics" element={<OalLenderAnalytics />} />
              <Route path="/oal/lender/reports" element={<OalLenderReports />} />
              <Route path="/oal/lender/profile" element={<OalBorrowerProfile />} />
              <Route path="/oal/lender/settings" element={<OalLenderSettings />} />

              {/* OAL Rep Routes */}
              <Route path="/oal/rep/dashboard" element={<OalRepDashboard />} />
              <Route path="/oal/rep/borrowers" element={<OalRepBorrowers />} />
              <Route path="/oal/rep/applications" element={<OalRepApplications />} />
              <Route path="/oal/rep/documents" element={<OalRepDocuments />} />
              <Route path="/oal/rep/messages" element={<OalRepMessages />} />
              <Route path="/oal/rep/offers" element={<OalRepOffers />} />
              <Route path="/oal/rep/tasks" element={<OalRepTasks />} />
              <Route path="/oal/rep/profile" element={<OalBorrowerProfile />} />

              {/* Phase 9 OAL Admin Routes */}
              <Route path="/oal/admin/dashboard" element={<OalAdminDashboard />} />
              <Route path="/oal/admin/borrowers" element={<OalAdminBorrowers />} />
              <Route path="/oal/admin/lenders" element={<OalAdminLenders />} />
              <Route path="/oal/admin/applications" element={<OalAdminApplications />} />
              <Route path="/oal/admin/verification" element={<OalAdminVerification />} />
              <Route path="/oal/admin/scoring" element={<OalAdminScoring />} />
              <Route path="/oal/admin/documents" element={<OalAdminVerification />} />
              <Route path="/oal/admin/payments" element={<OalAdminPayments />} />
              <Route path="/oal/admin/subscriptions" element={<OalAdminSubscriptions />} />
              <Route path="/oal/admin/referrals" element={<OalAdminCms />} />
              <Route path="/oal/admin/ads" element={<OalAdminCms />} />
              <Route path="/oal/admin/cms" element={<OalAdminCms />} />
              <Route path="/oal/admin/support" element={<OalAdminSupport />} />
              <Route path="/oal/admin/reports" element={<OalAdminAudit />} />
              <Route path="/oal/admin/audit" element={<OalAdminAudit />} />
              <Route path="/oal/admin/profile" element={<OalBorrowerProfile />} />
              <Route path="/oal/admin/settings" element={<OalAdminDashboard />} />

              <Route path="/oal/profile" element={<OalBorrowerProfile />} />
              <Route path="/oal/*" element={<OalDashboardDispatcher />} />
            </Route>
          </Route>
        </>
      ) : (
        <Route path="/oal/*" element={<Navigate to="/crm/dashboard" replace />} />
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
