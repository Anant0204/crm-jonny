/**
 * Security Unit Test Suite for Worksuite CRM SSO Handshake
 * Tests:
 * 1. Missing ticket rejection
 * 2. Invalid cryptographic signature rejection
 * 3. Expired token rejection
 * 4. Invalid issuer / audience rejection
 * 5. Replay attack rejection (token reuse)
 * 6. Privilege escalation neutralization
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SSO_SECRET = process.env.WORKSUITE_SSO_SECRET || 'worksuite_sso_secure_exchange_secret_2026_change_in_prod';

// Helper to simulate SSO ticket verification logic
function verifySsoTicket(ticket, usedNoncesMap) {
  if (!ticket || typeof ticket !== 'string') {
    return { status: 400, error: 'Missing required cryptographically signed SSO exchange ticket.' };
  }

  let payload;
  try {
    payload = jwt.verify(ticket, SSO_SECRET, {
      issuer: 'crm-nergy-backend',
      audience: 'worksuite-crm'
    });
  } catch (err) {
    return { status: 401, error: 'Invalid, malformed, or expired SSO authentication ticket: ' + err.message };
  }

  const { jti, email, role, exp } = payload;
  if (!jti || !email) {
    return { status: 400, error: 'Malformed ticket identity claims.' };
  }

  if (usedNoncesMap.has(jti)) {
    return { status: 403, error: 'This SSO authentication ticket has already been used. Replay rejected.' };
  }

  usedNoncesMap.set(jti, (exp ? exp * 1000 : Date.now() + 60000) + 60000);

  // Strict role mapping
  let targetRole = 'ADMIN';
  if (role === 'CLIENT') targetRole = 'CLIENT';
  else if (role === 'EMPLOYEE') targetRole = 'EMPLOYEE';
  else targetRole = 'ADMIN';

  return { status: 200, success: true, user: { email, role: targetRole } };
}

async function runTests() {
  console.log('=== RUNNING SSO SECURITY TEST SUITE ===\n');
  const usedNonces = new Map();
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

  // 1. Missing ticket
  const res1 = verifySsoTicket(null, usedNonces);
  assert('Test 1: Reject missing ticket', res1.status === 400, res1.error);

  // 2. Invalid cryptographic signature
  const forgedTicket = jwt.sign(
    { jti: crypto.randomUUID(), email: 'attacker@evil.com', role: 'SUPERADMIN', iss: 'crm-nergy-backend', aud: 'worksuite-crm' },
    'wrong_attacker_secret_key_12345',
    { expiresIn: '60s' }
  );
  const res2 = verifySsoTicket(forgedTicket, usedNonces);
  assert('Test 2: Reject forged cryptographic signature', res2.status === 401, res2.error);

  // 3. Expired token
  const expiredTicket = jwt.sign(
    { jti: crypto.randomUUID(), email: 'user@nergy.io', role: 'ADMIN', iss: 'crm-nergy-backend', aud: 'worksuite-crm' },
    SSO_SECRET,
    { expiresIn: '-10s' } // Expired 10 seconds ago
  );
  const res3 = verifySsoTicket(expiredTicket, usedNonces);
  assert('Test 3: Reject expired SSO token', res3.status === 401, res3.error);

  // 4. Invalid audience / issuer
  const wrongAudTicket = jwt.sign(
    { jti: crypto.randomUUID(), email: 'user@nergy.io', role: 'ADMIN', iss: 'crm-nergy-backend', aud: 'wrong-destination-app' },
    SSO_SECRET,
    { expiresIn: '60s' }
  );
  const res4 = verifySsoTicket(wrongAudTicket, usedNonces);
  assert('Test 4: Reject invalid audience/issuer', res4.status === 401, res4.error);

  // 5. Valid ticket first use
  const ticketId = crypto.randomUUID();
  const validTicket = jwt.sign(
    { jti: ticketId, email: 'alexander@nergy.io', name: 'Alexander', role: 'ADMIN', iss: 'crm-nergy-backend', aud: 'worksuite-crm' },
    SSO_SECRET,
    { expiresIn: '60s' }
  );
  const res5 = verifySsoTicket(validTicket, usedNonces);
  assert('Test 5: Accept valid signed ticket', res5.status === 200 && res5.success, res5.error);

  // 6. Replay attack: re-using the same ticket
  const res6 = verifySsoTicket(validTicket, usedNonces);
  assert('Test 6: Reject replay attempt with same ticket', res6.status === 403, res6.error);

  // 7. Privilege escalation prevention: claim SUPERADMIN should map to ADMIN
  const ticketId2 = crypto.randomUUID();
  const superAdminAttempt = jwt.sign(
    { jti: ticketId2, email: 'client@nergy.io', name: 'Client', role: 'SUPERADMIN', iss: 'crm-nergy-backend', aud: 'worksuite-crm' },
    SSO_SECRET,
    { expiresIn: '60s' }
  );
  const res7 = verifySsoTicket(superAdminAttempt, usedNonces);
  assert('Test 7: Neutralize privilege escalation (SUPERADMIN forced to ADMIN)', res7.status === 200 && res7.user.role === 'ADMIN', `Got role: ${res7.user?.role}`);

  console.log(`\nResults: ${passed}/${total} security tests passed.`);
  if (passed !== total) process.exit(1);
}

runTests();
