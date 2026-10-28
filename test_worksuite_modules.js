/**
 * Verification Script for Develo CRM (Worksuite) Modules & Database
 * Tests reads and table availability in crm_db for core Worksuite modules:
 * Projects, Tasks, Contracts, Invoices, Estimates, Attendance, Leaves, Tickets
 */

const path = require('path');
require('./backend-crm/node_modules/dotenv').config({ path: path.join(__dirname, 'crm-worksuite-backend', '.env') });
const pool = require('./crm-worksuite-backend/config/db');

async function testWorksuiteModules() {
  console.log('====================================================');
  console.log('  TESTING DEVELO CRM (WORKSUITE) DATABASE & MODULES   ');
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
    // 1. Projects
    const [projects] = await pool.execute('SELECT id, project_name, status FROM projects LIMIT 5');
    assert('1. Worksuite Projects module reads crm_db.projects', Array.isArray(projects));
    console.log(`   Sample projects: ${projects.length} found`);

    // 2. Tasks
    const [tasks] = await pool.execute('SELECT id, title, status, priority FROM tasks LIMIT 5');
    assert('2. Worksuite Tasks module reads crm_db.tasks', Array.isArray(tasks));
    console.log(`   Sample tasks: ${tasks.length} found`);

    // 3. Contracts
    const [contracts] = await pool.execute('SELECT id, title, amount, status FROM contracts LIMIT 5');
    assert('3. Worksuite Contracts module reads crm_db.contracts', Array.isArray(contracts));
    console.log(`   Sample contracts: ${contracts.length} found`);

    // 4. Invoices
    const [invoices] = await pool.execute('SELECT id, invoice_number, total, status FROM invoices LIMIT 5');
    assert('4. Worksuite Invoices module reads crm_db.invoices', Array.isArray(invoices));
    console.log(`   Sample invoices: ${invoices.length} found`);

    // 5. Estimates & Proposals
    const [estimates] = await pool.execute('SELECT id, estimate_number, total, status FROM estimates LIMIT 5');
    assert('5. Worksuite Estimates module reads crm_db.estimates', Array.isArray(estimates));
    console.log(`   Sample estimates: ${estimates.length} found`);

    // 6. Attendance
    const [attendance] = await pool.execute('SELECT id, user_id, clock_in, clock_out FROM attendance LIMIT 5');
    assert('6. Worksuite Attendance module reads crm_db.attendance', Array.isArray(attendance));
    console.log(`   Sample attendance records: ${attendance.length} found`);

    // 7. Leave Requests
    const [leaves] = await pool.execute('SELECT id, user_id, start_date, end_date, status FROM leave_requests LIMIT 5');
    assert('7. Worksuite Leaves module reads crm_db.leave_requests', Array.isArray(leaves));
    console.log(`   Sample leaves: ${leaves.length} found`);

    // 8. Tickets
    const [tickets] = await pool.execute('SELECT id, ticket_id, subject, status, priority FROM tickets LIMIT 5');
    assert('8. Worksuite Tickets module reads crm_db.tickets', Array.isArray(tickets));
    console.log(`   Sample tickets: ${tickets.length} found`);

    console.log(`\n====================================================`);
    console.log(`  WORKSUITE CRM MODULES: ${passed}/${total} PASSED   `);
    console.log(`====================================================\n`);

    if (passed !== total) process.exit(1);
  } catch (err) {
    console.error('Fatal error verifying Worksuite modules:', err);
    process.exit(1);
  } finally {
    try {
      await pool.end();
    } catch (_) {}
  }
}

testWorksuiteModules();
