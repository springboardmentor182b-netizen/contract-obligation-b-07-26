export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const ROLES = {
  ADMINISTRATOR: 'Administrator',
  LEGAL_MANAGER: 'Legal Manager',
  COMPLIANCE_OFFICER: 'Compliance Officer',
  CONTRACT_MANAGER: 'Contract Manager',
  DEPARTMENT_HEAD: 'Department Head',
  EMPLOYEE: 'Employee'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMINISTRATOR]: ['all'],
  [ROLES.LEGAL_MANAGER]: ['view_contracts', 'edit_contracts', 'view_users'],
  [ROLES.COMPLIANCE_OFFICER]: ['view_contracts', 'edit_compliance', 'view_reports'],
  [ROLES.CONTRACT_MANAGER]: ['view_contracts', 'edit_contracts', 'create_contracts'],
  [ROLES.DEPARTMENT_HEAD]: ['view_contracts', 'view_reports'],
  [ROLES.EMPLOYEE]: ['view_own_contracts']
};

export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed'
};
