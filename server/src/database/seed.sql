-- ==========================================================
-- ContractIQ Expanded Dataset
-- Target: 91% Overall Score, 7 Open Risks, 5 Findings, Full Charts
-- ==========================================================

TRUNCATE users, contracts, contract_versions, obligations, renewals, compliance_records, notifications, activities, reports, audit_logs RESTART IDENTITY CASCADE;

-- 1. USERS & DEPARTMENTS
INSERT INTO users (first_name, last_name, email, password_hash, role, department, phone, is_active) VALUES
('Jennifer', 'Davis', 'jennifer.davis@nexora.com', '.A7pX5A9z3hQ9mOu8bN.K8.yX2e1', 'Admin', 'Legal', '+1-555-0101', TRUE),
('Alex', 'Morgan', 'alex.morgan@nexora.com', '.A7pX5A9z3hQ9mOu8bN.K8.yX2e1', 'Legal Manager', 'IT', '+1-555-0102', TRUE),
('Marcus', 'Vance', 'marcus.vance@nexora.com', '.A7pX5A9z3hQ9mOu8bN.K8.yX2e1', 'Employee', 'HR', '+1-555-0103', TRUE),
('Elena', 'Rostova', 'elena.rostova@nexora.com', '.A7pX5A9z3hQ9mOu8bN.K8.yX2e1', 'Legal Manager', 'Operations', '+1-555-0104', TRUE),
('David', 'Kim', 'david.kim@nexora.com', '.A7pX5A9z3hQ9mOu8bN.K8.yX2e1', 'Employee', 'Marketing', '+1-555-0105', TRUE),
('Sarah', 'Jenkins', 'sarah.jenkins@nexora.com', '.A7pX5A9z3hQ9mOu8bN.K8.yX2e1', 'Employee', 'Finance', '+1-555-0106', TRUE);

-- 2. CONTRACTS (Active across all departments)
INSERT INTO contracts (contract_no, title, description, category, status, start_date, end_date, owner_id, created_by) VALUES
('CNT-2026-001', 'Enterprise Cloud Hosting Agreement', 'AWS Infrastructure hosting contract', 'IT Services', 'Active', '2026-01-01', '2027-01-01', 2, 1),
('CNT-2026-002', 'Global Software License Agreement', 'SaaS Licensing for corporate tools', 'Software', 'Active', '2025-06-15', '2026-06-15', 2, 1),
('CNT-2026-003', 'Office Building Lease Agreement', 'Corporate headquarters lease', 'Real Estate', 'Active', '2024-03-01', '2029-03-01', 4, 1),
('CNT-2026-004', 'Cybersecurity Audit & Penetration Testing', 'Third-party compliance testing', 'Consulting', 'Active', '2026-02-01', '2026-12-31', 2, 1),
('CNT-2026-005', 'Vendor Supply Master Agreement', 'Hardware procurement logistics', 'Procurement', 'Expired', '2025-01-01', '2026-01-01', 4, 1),
('CNT-2026-006', 'Global Health & Benefits Provider', 'Employee healthcare coverage', 'Human Resources', 'Active', '2026-01-01', '2027-01-01', 3, 1),
('CNT-2026-007', 'Digital Marketing Agency Retainer', 'Global brand campaigns', 'Marketing', 'Active', '2026-03-01', '2027-03-01', 5, 1),
('CNT-2026-008', 'Financial Audit & Tax Advisory', 'Quarterly financial compliance', 'Finance', 'Active', '2026-01-01', '2026-12-31', 6, 1),
('CNT-2026-009', 'Azure Cloud Infrastructure SLA', 'Microsoft Cloud backup services', 'IT Services', 'Active', '2025-09-01', '2026-09-01', 2, 1),
('CNT-2026-010', 'Regional Logistics & Distribution', 'Supply chain operations lease', 'Operations', 'Active', '2025-11-01', '2026-11-01', 4, 1);

-- 3. OBLIGATIONS (Produces 3 Missed Obligations & Open Risks)
INSERT INTO obligations (contract_id, title, description, obligation_type, assigned_to, due_date, completed_date, priority, status) VALUES
-- Compliant obligations
(1, 'SOC 2 Type II Annual Audit', 'Annual security verification', 'Regulatory', 2, '2026-06-30', '2026-06-25', 'High', 'Completed'),
(1, 'SLA Uptime Report Q1', 'Review 99.99% uptime compliance', 'Service Level', 2, '2026-03-31', '2026-03-28', 'Medium', 'Completed'),
(6, 'Employee Benefits Enrollment Review', 'Annual HIPAA & Benefits audit', 'Regulatory', 3, '2026-04-15', '2026-04-10', 'High', 'Completed'),
(7, 'Brand Compliance Review', 'Ensure marketing aligns with guidelines', 'Operational', 5, '2026-05-01', '2026-04-28', 'Low', 'Completed'),
(8, 'Q2 Tax Filings Audit', 'Internal tax compliance audit', 'Financial', 6, '2026-06-30', '2026-06-28', 'Critical', 'Completed'),

-- Missed / Overdue Obligations (Appears in Missed Obligations list)
(3, 'Office Lease Expiry Renewal Notice', 'Annual lease terms inspection report', 'Operational', 4, '2026-05-15', NULL, 'Critical', 'Overdue'),
(2, 'GDPR Article 30 Report Submission', 'Data handling compliance report', 'Legal', 1, '2026-06-01', NULL, 'High', 'Overdue'),
(9, 'Azure SLA Documentation Gap Verification', 'Backup disaster recovery check', 'Technical', 2, '2026-06-10', NULL, 'High', 'Overdue'),

-- Pending / Open Risks
(4, 'ISO 27001 Third-Party Security Review', 'Security policy gap review', 'Regulatory', 2, '2026-08-15', NULL, 'Critical', 'In Progress'),
(10, 'Facility Safety Inspection Report', 'Annual OSHA safety inspection', 'Operational', 4, '2026-09-01', NULL, 'Medium', 'Pending');

-- 4. COMPLIANCE RECORDS (Generates Overall 91% & Dept Breakdown)
INSERT INTO compliance_records (contract_id, obligation_id, compliance_level, remarks, checked_by, checked_on) VALUES
(1, 1, 'Compliant', 'SOC 2 report verified by security audit team.', 2, '2026-06-25'),
(1, 2, 'Compliant', 'SLA metrics verified at 99.995% uptime.', 2, '2026-03-28'),
(6, 3, 'Compliant', 'Full employee coverage verified.', 3, '2026-04-10'),
(7, 4, 'Compliant', 'Brand compliance guidelines approved.', 5, '2026-04-28'),
(8, 5, 'Compliant', 'Tax filing documents verified.', 6, '2026-06-28'),
(3, 6, 'Non-Compliant', 'Lease inspection report overdue by 68 days.', 4, '2026-05-16'),
(2, 7, 'Non-Compliant', 'GDPR Article 30 report pending legal review.', 1, '2026-06-02'),
(9, 8, 'Partially Compliant', 'Azure backup documentation missing secondary site logs.', 2, '2026-06-11'),
(4, 9, 'Partially Compliant', 'Initial assessment complete, pending final sign-off.', 2, '2026-07-01'),
(10, 10, 'Compliant', 'Safety pre-check completed.', 4, '2026-07-05');

-- 5. AUDIT LOGS & HISTORICAL DATA (Populates 12-Month Trend Line: Jan-Dec)
INSERT INTO audit_logs (user_id, action, entity_name, entity_id, old_value, new_value, ip_address, created_at) VALUES
(1, 'AUDIT_SCORE', 'compliance', 1, '78', '80', '127.0.0.1', '2026-01-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '80', '82', '127.0.0.1', '2026-02-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '82', '79', '127.0.0.1', '2026-03-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '79', '85', '127.0.0.1', '2026-04-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '85', '86', '127.0.0.1', '2026-05-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '86', '84', '127.0.0.1', '2026-06-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '84', '88', '127.0.0.1', '2026-07-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '88', '86', '127.0.0.1', '2026-08-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '86', '89', '127.0.0.1', '2026-09-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '89', '88', '127.0.0.1', '2026-10-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '88', '91', '127.0.0.1', '2026-11-15 10:00:00'),
(1, 'AUDIT_SCORE', 'compliance', 1, '91', '90', '127.0.0.1', '2026-12-15 10:00:00');

-- 6. ACTIVITIES (Populates Recent Activities list)
INSERT INTO activities (user_id, contract_id, activity, description, created_at) VALUES
(1, 1, 'Marked Compliant', 'Contract #104 marked compliant after audit review', '2026-07-14 14:30:00'),
(2, 2, 'Document Upload', 'New vendor agreement uploaded for SaaS License', '2026-07-14 11:15:00'),
(4, 3, 'Risk Alert', 'NDA Renewal due in 2 days for Office Lease', '2026-07-13 09:00:00'),
(1, 4, 'Audit Finished', 'Compliance audit completed for Cybersecurity Services', '2026-07-12 16:45:00'),
(2, 9, 'High Risk Detected', 'High risk contract detected: Azure SLA Gap', '2026-07-10 10:20:00');

