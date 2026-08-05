export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const USER_ROLES = {
  ADMINISTRATOR: 'Administrator',
  LEGAL_MANAGER: 'Legal Manager',
  COMPLIANCE_OFFICER: 'Compliance Officer',
  CONTRACT_MANAGER: 'Contract Manager',
  DEPARTMENT_HEAD: 'Department Head',
  EMPLOYEE: 'Employee'
};

export const DEMO_ACCOUNTS = [
  {
    role: 'Administrator',
    email: 'admin@company.com',
    password: 'admin123'
  },
  {
    role: 'Legal Manager',
    email: 'legal@company.com',
    password: 'legal123'
  },
  {
    role: 'Compliance Officer',
    email: 'compliance@company.com',
    password: 'compliance123'
  },
  {
    role: 'Contract Manager',
    email: 'manager@company.com',
    password: 'manager123'
  }
];
