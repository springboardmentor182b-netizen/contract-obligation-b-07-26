/**
 * Application constants
 */

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// User Roles
export const USER_ROLES = {
  ADMINISTRATOR: 'Administrator',
  LEGAL_MANAGER: 'Legal Manager',
  COMPLIANCE_OFFICER: 'Compliance Officer',
  CONTRACT_MANAGER: 'Contract Manager',
  DEPARTMENT_HEAD: 'Department Head',
  EMPLOYEE: 'Employee'
};

// Contract Status
export const CONTRACT_STATUS = {
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  PENDING: 'Pending',
  TERMINATED: 'Terminated'
};

// Obligation Priority
export const OBLIGATION_PRIORITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

// Obligation Status
export const OBLIGATION_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue'
};

// Password Requirements
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRES_UPPERCASE: true,
  REQUIRES_LOWERCASE: true,
  REQUIRES_NUMBER: true,
  REQUIRES_SPECIAL_CHAR: true
};

// OTP Configuration
export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_MINUTES: 15,
  MAX_ATTEMPTS: 5
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_DATA: 'user',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_CODE: '/forgot-password/verify',
  RESET_PASSWORD: '/forgot-password/reset',
  DASHBOARD: '/dashboard',
  CONTRACTS: '/contracts',
  OBLIGATIONS: '/obligations',
  COMPLIANCE: '/compliance',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  PROFILE: '/profile'
};
