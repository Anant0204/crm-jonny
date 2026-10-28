import apiClient from './apiClient';

/**
 * Securely request a short-lived, cryptographically signed SSO ticket from CRM - Energy backend.
 * @returns {Promise<string|null>} Signed SSO Ticket
 */
export const getWorksuiteSsoTicket = async () => {
  try {
    const res = await apiClient.post('/auth/worksuite-sso-token');
    return res?.data?.ssoTicket || null;
  } catch (err) {
    console.error('[SSO Handshake Error] Failed to obtain ticket from backend:', err);
    return null;
  }
};

/**
 * Securely launches the standalone Worksuite CRM portal in a new tab using a cryptographic handoff ticket.
 * Strips raw user emails and roles from the browser URL.
 * @param {string} targetPath - Optional subpath inside Worksuite
 */
export const launchWorksuiteApp = async (targetPath = '') => {
  try {
    const ticket = await getWorksuiteSsoTicket();
    if (ticket) {
      const queryParams = new URLSearchParams({ ticket });
      if (targetPath) {
        queryParams.set('redirect', targetPath);
      }
      const ssoUrl = `http://localhost:5174/sso-login?${queryParams.toString()}`;
      window.open(ssoUrl, '_blank');
      return true;
    }
  } catch (err) {
    console.error('[SSO Launch Error]:', err);
  }
  // Secure fallback: if backend SSO handoff fails, direct to Worksuite login screen
  window.open('http://localhost:5174/login', '_blank');
  return false;
};
