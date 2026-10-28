/**
 * End-to-End SSO Integration & Security Verification Script
 * Validates the complete flow across CRM - Energy backend and Develo CRM backend:
 * 1. Generates authentic SSO ticket from CRM - Energy (backend-crm) for a real user in crm-db
 * 2. Authenticates against Develo CRM backend (crm-worksuite-backend)
 * 3. Verifies issued Worksuite JWT token and role mapping
 * 4. Verifies replay protection (second attempt with same ticket is rejected)
 * 5. Verifies customer role mapping (CUSTOMER -> CLIENT)
 * 6. Verifies forged ticket rejection
 * 7. Verifies expired ticket rejection
 */

const path = require('path');
require('./backend-crm/node_modules/dotenv').config({ path: path.join(__dirname, 'backend-crm', '.env') });

const prisma = require('./backend-crm/src/config/prisma');
const authService = require('./backend-crm/src/services/authService');
const pool = require('./crm-worksuite-backend/config/db');
const jwt = require('./backend-crm/node_modules/jsonwebtoken');

// Ensure WORKSUITE_SSO_SECRET is consistent in process.env
process.env.WORKSUITE_SSO_SECRET = process.env.WORKSUITE_SSO_SECRET || 'worksuite_sso_secure_exchange_secret_2026_change_in_prod';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'worksuite_crm_jwt_secret_key_2025_change_in_production';

// Import Worksuite auth controller ssoLogin logic
const worksuiteAuthController = require('./crm-worksuite-backend/controllers/authController');

// Helper to simulate Express req/res
function mockReqRes(body) {
  return new Promise((resolve) => {
    const req = { body };
    const res = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        resolve({ status: this.statusCode, data });
      }
    };
    worksuiteAuthController.ssoLogin(req, res);
  });
}

async function runE2ETests() {
  console.log('====================================================');
  console.log('  STARTING REAL END-TO-END SSO INTEGRATION TESTS    ');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(testName, condition, detail = '') {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - Detail: ${detail}`);
    }
  }

  try {
    // Step 1: Find an actual Business Owner in CRM - Energy (crm-db)
    const boUser = await prisma.user.findFirst({
      where: { role: 'BUSINESS_OWNER' }
    });

    if (!boUser) {
      console.error('No BUSINESS_OWNER found in crm-db.');
      process.exit(1);
    }
    console.log(`Test Subject 1 (Business Owner): ${boUser.email} (ID: ${boUser.id})`);

    // Step 2: Generate genuine SSO Ticket from CRM - Energy backend service
    const ssoResult = await authService.generateWorksuiteSsoTicket(boUser.id);
    assert('1. CRM - Energy generates signed SSO ticket', !!ssoResult.ssoTicket, JSON.stringify(ssoResult));

    // Step 3: Present SSO Ticket to Worksuite backend ssoLogin
    const res1 = await mockReqRes({ ssoTicket: ssoResult.ssoTicket });
    assert(
      '2. Worksuite accepts valid ticket and returns token & user',
      res1.status === 200 && res1.data.success && !!res1.data.token,
      JSON.stringify(res1.data)
    );
    assert(
      '3. Business Owner role correctly mapped to ADMIN in Worksuite',
      res1.data.user?.role === 'ADMIN',
      `Got role: ${res1.data.user?.role}`
    );

    // Verify token issued by Worksuite is cryptographically valid
    const decodedWorksuiteToken = jwt.verify(
      res1.data.token,
      process.env.JWT_SECRET || 'worksuite_crm_jwt_secret_key_2025_change_in_production'
    );
    assert('4. Issued Worksuite token is cryptographically valid', !!decodedWorksuiteToken.userId);

    // Step 4: Replay attack test: attempt to use the exact same ticket again
    const resReplay = await mockReqRes({ ssoTicket: ssoResult.ssoTicket });
    assert(
      '5. Replay Protection: Re-using the same ticket is rejected (HTTP 403)',
      resReplay.status === 403 && !resReplay.data.success,
      `Status: ${resReplay.status}, error: ${resReplay.data.error}`
    );

    // Step 5: Test Customer role mapping
    const customerUser = await prisma.user.findFirst({
      where: { role: 'CUSTOMER' }
    });
    if (customerUser) {
      console.log(`\nTest Subject 2 (Customer): ${customerUser.email} (ID: ${customerUser.id})`);
      const custSso = await authService.generateWorksuiteSsoTicket(customerUser.id);
      const resCust = await mockReqRes({ ssoTicket: custSso.ssoTicket });
      assert(
        '6. Customer user role correctly mapped to CLIENT in Worksuite',
        resCust.status === 200 && resCust.data.user?.role === 'CLIENT',
        `Got role: ${resCust.data.user?.role}`
      );
    } else {
      console.log('[SKIP] No CUSTOMER user in crm-db to test');
    }

    // Step 6: Test forged ticket rejection
    const forgedTicket = jwt.sign(
      { jti: 'fake-nonce', email: 'hacker@evil.com', role: 'SUPERADMIN', iss: 'crm-nergy-backend', aud: 'worksuite-crm' },
      'wrong_secret_attacker',
      { expiresIn: '60s' }
    );
    const resForged = await mockReqRes({ ssoTicket: forgedTicket });
    assert(
      '7. Forged ticket with wrong secret is rejected (HTTP 401)',
      resForged.status === 401 && !resForged.data.success,
      `Status: ${resForged.status}`
    );

    // Step 7: Test expired ticket rejection
    const expiredTicket = jwt.sign(
      { jti: 'expired-nonce', email: boUser.email, role: 'ADMIN', iss: 'crm-nergy-backend', aud: 'worksuite-crm' },
      process.env.WORKSUITE_SSO_SECRET,
      { expiresIn: '-10s' }
    );
    const resExpired = await mockReqRes({ ssoTicket: expiredTicket });
    assert(
      '8. Expired ticket is rejected (HTTP 401)',
      resExpired.status === 401 && !resExpired.data.success,
      `Status: ${resExpired.status}`
    );

    // Step 8: Test missing ticket
    const resMissing = await mockReqRes({});
    assert(
      '9. Missing ticket is rejected (HTTP 400)',
      resMissing.status === 400 && !resMissing.data.success,
      `Status: ${resMissing.status}`
    );

    console.log(`\n====================================================`);
    console.log(`  E2E SSO INTEGRATION TEST RESULTS: ${passed}/${total} PASSED  `);
    console.log(`====================================================`);

    if (passed !== total) process.exit(1);
  } catch (error) {
    console.error('Fatal error during E2E SSO test:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    // pool disconnect
    try {
      await pool.end();
    } catch (_) {}
  }
}

runE2ETests();
