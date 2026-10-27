PROJECT: CRM nErgy + OAL Network
TASK: Create a complete industry-standard LOW-FIDELITY UX WIREFRAME.

IMPORTANT:
Do NOT jump directly into visual UI design.
First create the complete information architecture, user flows,
navigation structure and low-fidelity wireframes.

This is a professional enterprise SaaS + lending marketplace platform.

The system consists of TWO SEPARATE SOFTWARE PRODUCTS:

PRODUCT 1:
CRM nErgy
CRM + ERP + AI Business Management Platform

PRODUCT 2:
OAL Network
Lending Marketplace / Loan Application Platform

These two applications must remain separate applications and separate
business/data domains.

They may communicate only through a SECURE API / INTEGRATION LAYER.

Do NOT merge the two applications into one dashboard or one database.

====================================================
PART 1 — DESIGN PRINCIPLES
====================================================

Create an industry-standard enterprise SaaS wireframe.

Use LOW-FIDELITY wireframe styling:

- White / light neutral canvas
- Grey borders
- Grey placeholders
- Black/dark text
- Simple boxes
- Simple icons
- No gradients
- No decorative illustrations
- No final branding
- No unnecessary colors
- No visual effects
- No excessive rounded cards
- Focus on structure and usability

The wireframe must clearly communicate:

1. Information hierarchy
2. Navigation
3. User roles
4. Page hierarchy
5. Forms
6. Tables
7. Filters
8. Search
9. CTAs
10. Modals
11. Side panels
12. Status indicators
13. Empty states
14. Error states
15. Success states
16. Loading states
17. Confirmation dialogs
18. Pagination
19. Breadcrumbs
20. Role-based permissions

Do NOT invent business functionality that is not specified.
Where functionality is not finalized, label it:

"TBD — CLIENT CONFIRMATION REQUIRED"

====================================================
PART 2 — APPLICATION ARCHITECTURE
====================================================

Create this top-level architecture:

CRM nErgy
    |
    | Secure API Layer
    |
OAL Network

CRM nErgy contains:
- CRM
- ERP
- AI
- HR / Recruiting
- Customer Support
- Analytics
- Reporting
- Mobile ecosystem
- Administration

OAL Network contains:
- Borrower
- Lender
- OAL Rep / Agent / Broker
- Admin
- Super Admin
- Support
- Lending Marketplace
- AI Scoring
- KYC / Verification
- Loan Applications
- Offers
- Funding
- Help Desk

====================================================
PART 3 — CRM nErgy USER ROLES
====================================================

Create role-based wireframes for:

1. Company Owner
2. Company Admin
3. Sales User
4. HR User
5. Finance User
6. Employees / Internal Users
7. Customer / Client Portal User

Multi-tenant architecture:

Company A
    - Owner
    - Admin
    - Sales
    - HR
    - Finance

Company B
    - Owner
    - Admin
    - Employees

Company C
    - Separate tenant

Company A must NEVER see Company B or Company C data.

Each company has isolated:
- Contacts
- Leads
- Employees
- Financial records
- Documents
- AI content
- Reports
- Settings
- Permissions

====================================================
PART 4 — CRM AUTHENTICATION & ONBOARDING
====================================================

Create these screens:

SCREEN CRM-001
Landing Page

Sections:
- Logo
- Product introduction
- CRM
- ERP
- AI
- Features
- Pricing
- Login CTA
- Sign Up CTA

SCREEN CRM-002
Login

Fields:
- Email
- Password
- Remember me
- Forgot password
- Login
- MFA verification

SCREEN CRM-003
Create Company Account

Fields:
- Company Name
- Legal Company Name
- Business Email
- Phone
- Password
- Confirm Password
- Terms & Conditions

CTA:
Create Company Account

SCREEN CRM-004
Email / Phone Verification

SCREEN CRM-005
MFA Setup

SCREEN CRM-006
Subscription Selection

Options:
- CRM Only
- ERP Only
- CRM + ERP

Show:
- Plan comparison
- Features
- Pricing
- Select Plan

SCREEN CRM-007
Company Workspace Creation

SCREEN CRM-008
Company Admin Creation

SCREEN CRM-009
Employee Invitation

SCREEN CRM-010
Roles & Permissions Setup

SCREEN CRM-011
Onboarding Complete

CTA:
Go to Dashboard

====================================================
PART 5 — CRM MAIN APP SHELL
====================================================

Create an enterprise application shell.

LEFT SIDEBAR:

- Dashboard
- CRM
- ERP
- HR / Recruiting
- Customer Support
- AI
- Analytics
- Reports
- Mobile / Apps
- Administration
- Settings

TOP BAR:

- Global Search
- AI Search
- Notifications
- Help
- Company Switcher
- User Profile

BOTTOM / FOOTER:
- Help
- Privacy
- Terms
- Version

Sidebar must be collapsible.

Navigation must change according to role permissions.

====================================================
PART 6 — CRM DASHBOARD
====================================================

SCREEN CRM-012
Main Dashboard

Header:
- Breadcrumb
- Dashboard title
- Date range
- Customize Dashboard
- Add Widget

KPI cards:
- Total Leads
- Qualified Leads
- Open Opportunities
- Revenue
- Pending Tasks
- Customer Count

Widgets:
- Sales Pipeline
- Revenue Analytics
- Lead Sources
- Upcoming Tasks
- Recent Activities
- Customer Activity
- Notifications

Dashboard must support:
- Role-specific widgets
- Customizable widgets
- Drag-and-drop layout
- Smart bookmarks
- Task/reminder functionality

====================================================
PART 7 — CRM CONTACT MANAGEMENT
====================================================

SCREEN CRM-013
Contacts List

Table columns:
- Name
- Company
- Email
- Phone
- Type
- Owner
- Status
- Last Activity
- Created Date
- Actions

Actions:
- Add Contact
- Import
- Export
- Search
- Filter
- Bulk Actions

SCREEN CRM-014
Create Contact

Sections:
Personal Information
Company Information
Contact Information
Address
Tags
Owner
Notes

SCREEN CRM-015
Contact Details

Tabs:
- Overview
- Activities
- Communications
- Deals
- Tasks
- Documents
- Invoices
- Projects
- Support
- Notes

====================================================
PART 8 — CRM LEADS
====================================================

SCREEN CRM-016
Lead Dashboard

KPI:
- New Leads
- Qualified
- Unqualified
- Converted
- Lost

SCREEN CRM-017
Lead List

Filters:
- Lead Source
- Territory
- Owner
- Status
- Date
- Score

SCREEN CRM-018
Create Lead

Fields:
- Name
- Company
- Email
- Phone
- Lead Source
- Territory
- Assigned Sales Rep
- Notes

SCREEN CRM-019
Lead Details

Show:
- Lead information
- Source
- Territory
- Sales Rep
- Lead score
- Activity timeline
- Follow-ups
- Communication
- Notes

CTA:
Convert to Contact

====================================================
PART 9 — CRM SALES PIPELINE
====================================================

SCREEN CRM-020
Pipeline / Kanban

Columns:

NEW LEAD
CONTACTED
QUALIFIED
OPPORTUNITY
PROPOSAL
NEGOTIATION
WON
LOST

Cards show:
- Customer
- Deal value
- Owner
- Next activity
- Probability
- Last activity

Actions:
- Drag card
- Add opportunity
- Edit
- Assign
- Follow-up

SCREEN CRM-021
Opportunity Details

Sections:
- Customer
- Deal value
- Probability
- Expected close date
- Activities
- Meetings
- Emails
- Proposal
- Documents

====================================================
PART 10 — CRM TASKS & COMMUNICATION
====================================================

SCREEN CRM-022
Tasks

Views:
- List
- Calendar

Filters:
- Assigned user
- Priority
- Status
- Due date

SCREEN CRM-023
Create Task

Fields:
- Task title
- Related contact
- Related deal
- Assigned user
- Due date
- Priority
- Reminder
- Notes

SCREEN CRM-024
Communication Center

Channels:
- Email
- SMS
- Internal Communication

Show:
- Conversation list
- Message panel
- Contact information
- Activity timeline

====================================================
PART 11 — CRM BILLING
====================================================

SCREEN CRM-025
Invoices

Table:
- Invoice ID
- Customer
- Amount
- Date
- Due Date
- Status

Statuses:
- Draft
- Sent
- Paid
- Overdue
- Cancelled

SCREEN CRM-026
Create Invoice

SCREEN CRM-027
Invoice Details

SCREEN CRM-028
Billing Dashboard

KPIs:
- Total Revenue
- Outstanding
- Paid
- Overdue

====================================================
PART 12 — ERP
====================================================

Create ERP navigation:

ERP
├── Projects
├── Procurement
├── Sales & Orders
├── Finance & Accounting
├── Inventory
├── Supply Chain
├── Manufacturing
└── Reports

Create wireframes for:

ERP Dashboard
Projects List
Project Details
Create Project
Procurement Dashboard
Purchase Orders
Sales Orders
Finance Dashboard
Inventory Dashboard
Inventory List
Supply Chain Dashboard
Manufacturing Dashboard
ERP Reports

Use standard enterprise table/detail/form layouts.

====================================================
PART 13 — HR / RECRUITING
====================================================

Create:

HR Dashboard
Employees
Employee Details
Add Employee
Candidates
Candidate Details
Job Openings
Applications
Interview Schedule
Recruitment Pipeline
HR Reports

====================================================
PART 14 — CUSTOMER SUPPORT
====================================================

Create:

Support Dashboard
Tickets
Create Ticket
Ticket Details
Customer Support Chat
Knowledge Base
Support Reports

Ticket statuses:
- Open
- In Progress
- Waiting
- Resolved
- Closed

====================================================
PART 15 — AI CONTENT STUDIO
====================================================

Create separate AI workspace.

SCREEN AI-001
AI Content Studio Dashboard

LEFT NAVIGATION:

- Bestie AI
- Text to Video
- Image to Video
- Text to Image
- AI Image
- AI Video
- AI Audio
- Music
- Voice
- 3D
- Workflow
- My Library

MAIN AREA:

Prompt input
Upload
Reference files
AI tools
Generate button

SCREEN AI-002
AI Generation Workspace

Layout:

LEFT:
Tool controls

CENTER:
Canvas / Preview

RIGHT:
Settings / Parameters

BOTTOM:
Chat refinement

Actions:
- Generate
- Regenerate
- Edit
- Save
- Export

SCREEN AI-003
AI Library

Tabs:
- Images
- Videos
- Audio
- Documents
- Projects

====================================================
PART 16 — CRM ADMINISTRATION
====================================================

Create:

Administration Dashboard
Users
Employees
Roles
Permissions
Teams
Company Settings
Branding
Custom Domain
Integrations
Notifications
Audit Logs
Security
Subscription
Billing

Roles & permissions must be clearly represented.

====================================================
PART 17 — OAL NETWORK PUBLIC EXPERIENCE
====================================================

Now create a COMPLETELY SEPARATE application.

Do not reuse CRM navigation visually as one application.

OAL Network:

SCREEN OAL-001
Landing Page

Sections:
- Hero
- How It Works
- Borrower
- Lender
- Marketplace
- Benefits
- FAQ
- Support
- Login
- Apply Now
- Become a Lender

====================================================
PART 18 — BORROWER AUTHENTICATION
====================================================

SCREEN OAL-002
Borrower Sign Up

Fields:
- Full Legal Name
- Email
- Phone
- Password
- Confirm Password

SCREEN OAL-003
Email Verification

SCREEN OAL-004
Phone Verification

SCREEN OAL-005
MFA

SCREEN OAL-006
Borrower ID / Account Setup

SCREEN OAL-007
Borrower Dashboard

====================================================
PART 19 — BORROWER DASHBOARD
====================================================

Create dashboard with:

Header:
- Notifications
- Help
- Profile

Sidebar:

- Dashboard
- My Application
- KYC
- Documents
- AI Score
- Offers
- Messages
- Notifications
- Referral Program
- Help / AI Help Desk
- Settings

Main dashboard:

KPI cards:
- Application Status
- AI Borrower Score
- Documents Status
- Offers Received

Application progress:

REGISTERED
↓
VERIFIED
↓
KYC
↓
APPLICATION
↓
DOCUMENTS
↓
AI SCORE
↓
QUALIFIED
↓
OFFERS
↓
ACCEPTED
↓
PROCESSING
↓
FUNDED

====================================================
PART 20 — BORROWER KYC
====================================================

SCREEN OAL-008
KYC Introduction

SCREEN OAL-009
KYC Form

SCREEN OAL-010
Identity Verification

SCREEN OAL-011
Verification Status

Statuses:
- Pending
- Verified
- Failed
- More Information Required

Do NOT invent exact KYC provider.

Mark provider-specific functionality:

"TBD — CLIENT CONFIRMATION REQUIRED"

====================================================
PART 21 — BORROWER LOAN APPLICATION
====================================================

Create a MULTI-STEP APPLICATION.

SCREEN OAL-012
Application Overview

Step indicator:

1 Personal Information
2 Business Information
3 Loan Details
4 Financial Information
5 Documents
6 Review
7 Submit

Each step must have:

- Form fields
- Save & Continue
- Save Draft
- Back
- Validation
- Error messages

SCREEN OAL-013
Personal Information

SCREEN OAL-014
Business Information

SCREEN OAL-015
Loan Details

SCREEN OAL-016
Financial Information

SCREEN OAL-017
Document Upload

SCREEN OAL-018
Application Review

SCREEN OAL-019
Application Submitted

====================================================
PART 22 — DOCUMENT MANAGEMENT
====================================================

SCREEN OAL-020
Documents Dashboard

Categories:
- Identity
- Business
- Financial
- Loan Documents
- Other

Each document shows:
- Name
- Type
- Upload date
- Status
- Verification
- Actions

Statuses:
- Pending Review
- Accepted
- Rejected
- Reupload Required

SCREEN OAL-021
Document Preview

SCREEN OAL-022
Upload / Re-upload

Include audit history.

====================================================
PART 23 — AI BORROWER SCORE
====================================================

SCREEN OAL-023
AI Score Dashboard

Show:

Borrower Score
Score Status
Qualification Status
Score Factors
Application Information
Verified Information

Flow:

Loan Application
+
Verified Information
+
Client Scoring Rules
        ↓
AI / Rules Scoring Engine
        ↓
Borrower Score
        ↓
Qualification
        ↓
Borrower Ranking

Do NOT invent score formula or weightages.

Mark:

"TBD — CLIENT CONFIRMATION REQUIRED"

====================================================
PART 24 — TWO SCORING ENGINES
====================================================

Create admin-controlled scoring architecture for:

1. Regular Applicant Score

2. Qualified Verified Investor Score

Admin should be able to manage separate scoring models/rules.

Do not invent the exact scoring formula.

====================================================
PART 25 — OAL OFFERS / WAITING ROOM
====================================================

SCREEN OAL-024
Offers / Waiting Room

Show:
- Application status
- Offers received
- Offer count
- Offer comparison

SCREEN OAL-025
Offer Comparison

Table:

Lender
Loan Amount
Rate
Term
Fees
Estimated Payment
Offer Status
Actions

Actions:
- View Offer
- Compare
- Accept

SCREEN OAL-026
Offer Details

SCREEN OAL-027
Accept Offer Confirmation

====================================================
PART 26 — LOAN PROCESSING
====================================================

SCREEN OAL-028
Loan Processing Status

Timeline:

Offer Accepted
↓
Lender + OAL Rep Notified
↓
Processing
↓
Lender Approval
↓
Funding
↓
Post-Funding

Clearly distinguish:

OAL Qualification
from
Actual Lender Approval.

====================================================
PART 27 — POST-FUNDING DASHBOARD
====================================================

SCREEN OAL-029

Show:

- Loan Status
- Funding Status
- Loan Summary
- Documents
- Notifications
- Rep Contact
- Support
- History

====================================================
PART 28 — OAL BORROWER COMMUNICATION
====================================================

IMPORTANT BUSINESS RULE:

Borrower ↔ OAL Rep = ALLOWED

Borrower ↔ Lender = NOT ALLOWED

Create:

SCREEN OAL-030
Messages

Layout:

Conversation list
+
Conversation panel
+
Borrower/Application context

Only allow communication with authorized OAL representatives.

====================================================
PART 29 — OAL REFERRAL PROGRAM
====================================================

SCREEN OAL-031
Referral Dashboard

Show:
- Referral Link
- Referrals
- Status
- Rewards / Earnings if applicable

Do not invent exact reward rules.

If not specified:
"TBD — CLIENT CONFIRMATION REQUIRED"

====================================================
PART 30 — LENDER REGISTRATION
====================================================

SCREEN OAL-032
Lender Landing / Registration

Fields:
- Company / Legal Name
- Contact Person
- Email
- Phone
- Business Information
- Credentials / Required Documents

SCREEN OAL-033
Lender Verification

SCREEN OAL-034
Lender Approval Status

Statuses:
- Registered
- Under Review
- Approved
- Rejected

Admin approval is required before lender access.

====================================================
PART 31 — LENDER DASHBOARD
====================================================

SCREEN OAL-035

Sidebar:

- Dashboard
- Qualified Leads
- AI Lead Alerts
- Loan Requests
- Borrower Ranking
- Saved Leads
- Offers
- Applications
- Analytics
- Reports
- Billing
- Subscription
- Profile
- Settings

Dashboard KPIs:

- New Qualified Leads
- Active Applications
- Offers Submitted
- Accepted Offers
- Funded Loans

====================================================
PART 32 — LENDER QUALIFIED LEADS
====================================================

SCREEN OAL-036
Qualified Leads

Table:

Lead ID
Borrower
Loan Type
Loan Amount
AI Score
Qualification
Date
Status
Actions

Filters:
- Score
- Loan Type
- Amount
- Location if applicable
- Date
- Status

====================================================
PART 33 — LENDER BORROWER DETAIL
====================================================

SCREEN OAL-037

Show only information the lender is authorized to access.

Sections:
- Borrower Summary
- Loan Request
- Qualification
- AI Score
- Required Documents
- Application Summary
- Offer Actions

Do NOT expose sensitive information unless permission allows it.

====================================================
PART 34 — LENDER OFFER CREATION
====================================================

SCREEN OAL-038
Create Offer

Fields:

- Loan Amount
- Interest Rate
- Term
- Fees
- Payment Estimate
- Conditions
- Expiration Date
- Notes

Actions:
- Save Draft
- Submit Offer
- Cancel

====================================================
PART 35 — OAL REP DASHBOARD
====================================================

SCREEN OAL-039

Sidebar:

- Dashboard
- Assigned Borrowers
- Qualified Leads
- Applications
- Documents
- Communication
- Offers
- Tasks
- Notifications
- Reports

Dashboard:

- Assigned Applications
- Pending Documents
- Applications Needing Action
- Offers
- Tasks
- Alerts

====================================================
PART 36 — OAL REP APPLICATION MANAGEMENT
====================================================

SCREEN OAL-040
Application List

Columns:

Application ID
Borrower
Status
AI Score
Assigned Rep
Documents
Offer Status
Last Updated
Actions

SCREEN OAL-041
Application Detail

Tabs:

- Overview
- Borrower
- KYC
- Documents
- AI Score
- Offers
- Communication
- Activity History

====================================================
PART 37 — OAL ADMIN PANEL
====================================================

Create a separate enterprise Admin application.

Sidebar:

Dashboard
Borrowers
Lenders
Loan Applications
AI Scoring Engine
Verification Center
Document Management
Lead Distribution
Notifications
Referral & Affiliates
Advertisements
Payments
Subscription Plans
CMS
Reports & Analytics
Support Tickets
Audit Logs
System Settings
Super Admin

====================================================
PART 38 — OAL ADMIN DASHBOARD
====================================================

SCREEN OAL-042

KPI Cards:

- Total Borrowers
- Active Applications
- Qualified Applications
- Active Lenders
- Offers
- Approved Loans
- Funded Loans
- Open Support Tickets

Charts:

- Applications Over Time
- Qualification Rate
- Funding Rate
- Loan Volume
- Lender Activity
- Support Tickets

====================================================
PART 39 — ADMIN BORROWER MANAGEMENT
====================================================

SCREEN OAL-043
Borrower List

Filters:
- Status
- KYC
- Application
- Qualification
- Funding

SCREEN OAL-044
Borrower Details

Tabs:
- Profile
- KYC
- Applications
- Documents
- AI Score
- Offers
- Activity
- Support

====================================================
PART 40 — ADMIN LENDER MANAGEMENT
====================================================

SCREEN OAL-045
Lender List

SCREEN OAL-046
Lender Application

SCREEN OAL-047
Lender Approval

SCREEN OAL-048
Lender Details

Actions:
- Approve
- Reject
- Suspend
- Review Documents

====================================================
PART 41 — ADMIN LOAN APPLICATION MANAGEMENT
====================================================

SCREEN OAL-049
Applications

Table with:

Application ID
Borrower
AI Score
Status
Rep
Lender
Offer
Funding
Created
Updated

Create filters and bulk actions.

====================================================
PART 42 — ADMIN VERIFICATION CENTER
====================================================

SCREEN OAL-050

Queue:

- KYC Pending
- Documents Pending
- Failed Verification
- More Information Required

Detail panel:

Applicant
Verification Data
Documents
Result
Reviewer
Audit History

====================================================
PART 43 — ADMIN AI SCORING ENGINE
====================================================

SCREEN OAL-051
Scoring Models

Models:

Regular Applicant
Qualified Verified Investor

SCREEN OAL-052
Scoring Rules

Allow admin to view/manage:

- Factors
- Rules
- Weightages
- Thresholds

Do not invent final values.

====================================================
PART 44 — LEAD DISTRIBUTION
====================================================

SCREEN OAL-053

Show:

Qualified Borrowers
Eligible Lenders
Matching Rules
Distribution Status
Assignment History

Do not invent final matching algorithm.

====================================================
PART 45 — PAYMENTS & SUBSCRIPTIONS
====================================================

SCREEN OAL-054
Payments Dashboard

SCREEN OAL-055
Transactions

SCREEN OAL-056
Subscription Plans

SCREEN OAL-057
Subscription Details

Do not invent payment provider or pricing.

====================================================
PART 46 — REFERRALS / AFFILIATES
====================================================

SCREEN OAL-058
Referral Dashboard

SCREEN OAL-059
Affiliate Management

Show:

Affiliate
Referral
Status
Conversion
Earnings if applicable

====================================================
PART 47 — ADVERTISEMENTS
====================================================

SCREEN OAL-060
Advertisement Management

Sections:
- Campaigns
- Ads
- Status
- Placement
- Analytics

====================================================
PART 48 — CMS
====================================================

SCREEN OAL-061
CMS Dashboard

Manage:
- Pages
- FAQ
- Content
- Resources
- Knowledge Base

====================================================
PART 49 — SUPPORT / AI HELP DESK
====================================================

Create:

SCREEN OAL-062
Help Center

SCREEN OAL-063
AI Help Desk

SCREEN OAL-064
Support Tickets

SCREEN OAL-065
Ticket Detail

Flow:

Borrower Needs Help
↓
Knowledge Base / Ask AI
↓
Answer Found?
YES → Continue Application

NO
↓
Ticket Created
↓
AI Category / Priority
↓
Support Agent
↓
Suggested Response
↓
Resolution
↓
Ticket Closed
↓
Borrower Continues Loan Journey

====================================================
PART 50 — KNOWLEDGE BASE
====================================================

SCREEN OAL-066

Categories
Search
Articles
FAQs
Resources

====================================================
PART 51 — NOTIFICATIONS
====================================================

Create notification center for:

- KYC updates
- Document status
- Application updates
- AI score
- Qualification
- Offers
- Loan processing
- Funding
- Support
- System notifications

Create:
SCREEN OAL-067
Notifications Center

====================================================
PART 52 — AUDIT LOGS
====================================================

SCREEN OAL-068

Show:

Timestamp
User
Role
Action
Entity
Old Value
New Value
IP / Session if applicable
Status

Provide filters and search.

====================================================
PART 53 — SYSTEM SETTINGS
====================================================

SCREEN OAL-069

Sections:

General
Security
MFA
Roles
Permissions
Notifications
Integrations
AI
Scoring
Audit
Platform Settings

====================================================
PART 54 — COMPLETE STATUS LIFECYCLE
====================================================

Use this status lifecycle consistently throughout OAL:

REGISTERED
↓
VERIFIED
↓
KYC PENDING
↓
KYC VERIFIED
↓
APPLICATION DRAFT
↓
APPLICATION SUBMITTED
↓
DOCUMENT REVIEW
↓
AI SCORED
↓
QUALIFIED
↓
REP ASSIGNED
↓
PUBLISHED TO NETWORK
↓
OFFER RECEIVED
↓
OFFER ACCEPTED
↓
PROCESSING
↓
APPROVED
↓
FUNDED

Possible exception statuses:

MORE INFORMATION REQUIRED
KYC FAILED
DOCUMENT REJECTED
NOT QUALIFIED
WITHDRAWN
EXPIRED

Do not create conflicting status names.

====================================================
PART 55 — CRM → OAL INTEGRATION
====================================================

Create an integration architecture screen, NOT a combined dashboard.

Flow:

CRM Lead
↓
Customer Interested in Business Funding
↓
Refer to OAL
↓
Secure OAL Registration
↓
Borrower Creates OAL Account
↓
Loan Application
↓
OAL Handles Lending Process

Create:

SCREEN INT-001
Integration Overview

SCREEN INT-002
CRM Referral to OAL

SCREEN INT-003
API Activity Log

SCREEN INT-004
Data Sharing Permissions

Only approved/necessary information should be shared.

Sensitive OAL data must remain permission-controlled.

Do NOT expose:
- KYC data
- Sensitive loan documents
- Sensitive financial records
- Sensitive borrower verification information
- Scoring inputs

to ordinary CRM users.

====================================================
PART 56 — OAL → CRM INTEGRATION
====================================================

Flow:

OAL Borrower
↓
Funded
↓
Approved CRM Sync
↓
CRM Contact / Customer
↓
Relationship Management
↓
Future Follow-Up

Only approved non-sensitive information may sync.

Create:

SCREEN INT-005
OAL to CRM Sync

SCREEN INT-006
Sync History

SCREEN INT-007
Data Permission Rules

====================================================
PART 57 — OAL → ERP ANALYTICS
====================================================

Create:

SCREEN INT-008
Cross-System Analytics

Purpose:
Display approved analytics/reporting data from OAL inside CRM/ERP reporting architecture.

Do not merge OAL business logic with ERP business logic.

====================================================
PART 58 — COMMON UX COMPONENTS
====================================================

Create reusable wireframe components:

- Top navigation
- Sidebar
- Breadcrumb
- Search
- Filter bar
- Data table
- Pagination
- Tabs
- Cards
- KPI cards
- Status badge
- Dropdown
- Date picker
- Modal
- Drawer
- Confirmation dialog
- Toast
- Form
- Multi-step form
- File upload
- Document preview
- Timeline
- Activity feed
- Chat
- Empty state
- Loading state
- Error state
- Success state
- Permission denied state

====================================================
PART 59 — RESPONSIVE WIREFRAMES
====================================================

For important screens create:

1. Desktop
2. Tablet
3. Mobile

Mobile priority screens:

CRM:
- Login
- Dashboard
- Leads
- Contacts
- Tasks
- Notifications

OAL:
- Login
- Borrower Dashboard
- Loan Application
- Document Upload
- Offers
- Messages
- Notifications

====================================================
PART 60 — MOBILE APP
====================================================

Create separate mobile wireframe architecture.

Bottom navigation:

Home
Applications
Messages
Notifications
Profile

Mobile screens:

- Login
- MFA
- Dashboard
- Application
- KYC
- Documents
- AI Score
- Offers
- Offer Details
- Messages
- Notifications
- Help
- Profile
- Settings

====================================================
PART 61 — ERROR / EDGE CASE WIREFRAMES
====================================================

Create wireframes for:

- Invalid login
- Forgot password
- MFA failure
- Verification failure
- KYC failure
- Document rejected
- Missing document
- Application incomplete
- Application expired
- No lender offers
- No qualified lenders
- Loan not approved
- Payment failure
- Session expired
- Permission denied
- Empty dashboard
- No search results
- API integration failure
- Network error

====================================================
PART 62 — WIREFRAME OUTPUT STRUCTURE
====================================================

Organize the final wireframe into these Figma pages:

PAGE 01
Cover / Project Map

PAGE 02
User Roles & Permissions

PAGE 03
CRM Information Architecture

PAGE 04
CRM Authentication & Onboarding

PAGE 05
CRM Dashboard

PAGE 06
CRM Contacts & Leads

PAGE 07
CRM Sales Pipeline

PAGE 08
CRM Communication & Tasks

PAGE 09
CRM Billing

PAGE 10
ERP

PAGE 11
HR / Recruiting

PAGE 12
Customer Support

PAGE 13
AI Content Studio

PAGE 14
CRM Administration

PAGE 15
OAL Information Architecture

PAGE 16
OAL Public / Authentication

PAGE 17
Borrower

PAGE 18
Borrower Loan Application

PAGE 19
Borrower KYC & Documents

PAGE 20
Borrower AI Score & Offers

PAGE 21
Borrower Post-Funding

PAGE 22
Lender

PAGE 23
OAL Rep

PAGE 24
OAL Admin

PAGE 25
Super Admin

PAGE 26
Support / AI Help Desk

PAGE 27
Payments / Subscription

PAGE 28
CMS / Referrals / Ads

PAGE 29
Reports / Analytics

PAGE 30
Integration / API

PAGE 31
Mobile

PAGE 32
Components / Design System

PAGE 33
Error / Empty / Loading States

====================================================
PART 63 — SCREEN NAMING CONVENTION
====================================================

Use consistent IDs:

CRM-001
CRM-002
CRM-003 ...

OAL-001
OAL-002
OAL-003 ...

INT-001
INT-002
INT-003 ...

MOB-001
MOB-002
MOB-003 ...

====================================================
PART 64 — IMPORTANT WIREFRAME RULE
====================================================

Do NOT skip screens just because they are similar.

For every major user journey show:

Entry
↓
Action
↓
Form
↓
Validation
↓
Confirmation
↓
Next step
↓
Success / Error

For every list screen show:

Search
Filter
Sort
Pagination
Bulk Action
Create CTA
View Detail
Edit
Delete / Archive where applicable

For every detail screen show:

Overview
Activity
Related Data
Actions
History

====================================================
PART 65 — FINAL USER JOURNEYS
====================================================

Create visual flow diagrams for these journeys:

JOURNEY 1
CRM Company Signup → Dashboard

JOURNEY 2
CRM Lead → Customer

JOURNEY 3
CRM Customer → Invoice

JOURNEY 4
CRM Customer → Project / Service

JOURNEY 5
CRM Lead → OAL Referral

JOURNEY 6
OAL Borrower Signup → Funding

JOURNEY 7
OAL Lender Registration → Approval

JOURNEY 8
OAL Qualified Borrower → Lender Offer

JOURNEY 9
OAL Offer → Funding

JOURNEY 10
OAL Help Request → Resolution

JOURNEY 11
OAL Funded Borrower → CRM Sync

====================================================
FINAL REQUIREMENT
====================================================

The final output must look like a professional UX designer's
complete enterprise software wireframe specification.

Prioritize:
- Clear navigation
- Role-based access
- Business workflow
- User journey
- Information hierarchy
- Usability
- Scalability
- Multi-tenant separation
- Security boundaries
- API integration boundaries

Do NOT create a flashy final UI.

Do NOT add random features.

Do NOT merge CRM nErgy and OAL Network.

Do NOT expose sensitive OAL information to ordinary CRM users.

Do NOT invent unspecified pricing, KYC providers, scoring formulas,
payment providers, matching algorithms or business rules.

Where the specification is incomplete, explicitly label:
"TBD — CLIENT CONFIRMATION REQUIRED"

First produce the COMPLETE LOW-FIDELITY WIREFRAME.
After the wireframe is approved, it can be converted into the
high-fidelity UI design.