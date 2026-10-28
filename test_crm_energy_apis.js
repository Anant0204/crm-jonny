/**
 * Functional Verification of CRM - Energy Native Backend APIs
 * Verifies that native CRM modules query crm-db and return proper JSON structures.
 */

const path = require('path');
require('./backend-crm/node_modules/dotenv').config({ path: path.join(__dirname, 'backend-crm', '.env') });

const prisma = require('./backend-crm/src/config/prisma');
const leadService = require('./backend-crm/src/services/leadService');
const contactService = require('./backend-crm/src/services/contactService');
const dealService = require('./backend-crm/src/services/dealService');
const taskService = require('./backend-crm/src/services/taskService');
const erpService = require('./backend-crm/src/services/erpService');
const hrService = require('./backend-crm/src/services/hrService');
const supportService = require('./backend-crm/src/services/supportService');

async function testNativeCrm() {
  console.log('====================================================');
  console.log('  TESTING CRM - ENERGY NATIVE CORE & ERP MODULES     ');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(name, condition, detail = '') {
    total++;
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} - Detail: ${detail}`);
    }
  }

  try {
    const tenant = await prisma.tenant.findFirst();
    const tenantId = tenant ? tenant.id : null;
    console.log(`Using Tenant ID: ${tenantId} (${tenant?.name || 'Default'})\n`);

    // 1. Leads
    const leads = await leadService.getAll(tenantId);
    assert('1. Native Leads service queries crm-db.leads', Array.isArray(leads));
    console.log(`   Found ${leads.length} leads in crm-db`);

    // 2. Contacts
    const contacts = await contactService.getAll(tenantId);
    assert('2. Native Contacts service queries crm-db.contacts', Array.isArray(contacts));
    console.log(`   Found ${contacts.length} contacts in crm-db`);

    // 3. Deals / Pipeline
    const deals = await dealService.getAll(tenantId);
    assert('3. Native Deals / Sales Pipeline service queries crm-db.deals', Array.isArray(deals));
    console.log(`   Found ${deals.length} deals in crm-db`);

    // 4. Tasks & Reminders
    const tasks = await taskService.getAll(tenantId);
    assert('4. Native Tasks service queries crm-db.tasks', Array.isArray(tasks));
    console.log(`   Found ${tasks.length} tasks in crm-db`);

    // 5. ERP Projects
    const erpProjects = await erpService.getProjects(tenantId);
    assert('5. Native ERP Projects service queries crm-db.erp_projects', Array.isArray(erpProjects));
    console.log(`   Found ${erpProjects.length} ERP projects in crm-db`);

    // 6. HR Employees
    const hrEmployees = await hrService.getEmployees(tenantId);
    assert('6. Native HR Employees service queries crm-db.hr_employees', Array.isArray(hrEmployees));
    console.log(`   Found ${hrEmployees.length} HR employees in crm-db`);

    // 7. Support Tickets
    const supportTickets = await supportService.getTickets(tenantId);
    assert('7. Native Support Tickets service queries crm-db.support_tickets', Array.isArray(supportTickets));
    console.log(`   Found ${supportTickets.length} support tickets in crm-db`);

    console.log(`\n====================================================`);
    console.log(`  CRM - ENERGY NATIVE MODULES: ${passed}/${total} PASSED  `);
    console.log(`====================================================\n`);

    if (passed !== total) process.exit(1);
  } catch (err) {
    console.error('Fatal error verifying native CRM modules:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testNativeCrm();
