/**
 * Base URL Configuration
 * API base URL for all backend requests
 */

// API base URL configuration: prefers local backend on port 8001 during local development
const BaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'

export default BaseUrl; 