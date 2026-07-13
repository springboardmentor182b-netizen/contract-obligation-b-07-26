export type UserRole =
  | 'administrator'
  | 'legal_manager'
  | 'compliance_officer'
  | 'contract_manager'
  | 'department_head'
  | 'employee';

export interface User {
  id: string;
  email: string;
  full_name: string;
  department?: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  last_login?: string;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RegisterRequest {
  email: string;
  full_name: string;
  password: string;
  department?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
