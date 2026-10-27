// Centralized API exports
export * from './auth'
export * from './dashboard'
export * from './leads'
export * from './clients'
export * from './companies'
export * from './projects'
export * from './tasks'
export * from './invoices'
export * from './estimates'
export * from './proposals'
export * from './payments'
export * from './expenses'
export * from './contracts'
export * from './subscriptions'
export * from './employees'
export * from './attendance'
export * from './timeTracking'
export * from './events'
export * from './departments'
export * from './positions'
export * from './tickets'
export * from './users'
export * from './customFields'
export * from './settings'
export * from './companyPackages'
export * from './documents'
export * from './socialMediaIntegrations'
export * from './reports'
export * from './emailTemplates'
export * from './financeTemplates'
export * from './projectTemplates'
export * from './creditNotes'
export * from './messages'
export * from './groups'
export * from './bankAccounts'
export * from './socialMediaLeads'
export * from './auditLogs'
export * from './leaveRequests'
export * from './notifications'
export * from './contacts'
export * from './notes'
export * from './orders'
export * from './items'
export * from './hr'

// Import individual APIs that don't use named exports
import notificationSettingsAPI from './notificationSettings'

// Import named exports
export { attendanceSettingsAPI } from './attendanceSettings';
export { leadCallsAPI } from './leadCalls';
export { notificationSettingsAPI };
export { leaveSettingsAPI } from './leaveSettings';

// Import individual APIs
import activitiesAPI from './activities';
import taskLabelsAPI from './taskLabels';

export { activitiesAPI, taskLabelsAPI };

