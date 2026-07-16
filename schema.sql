-- ============================================================
-- CONTRACT MANAGEMENT SYSTEM - DATABASE SCHEMA
-- PostgreSQL Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM (
    'administrator',
    'legal_manager',
    'compliance_officer',
    'contract_manager',
    'department_head',
    'employee'
);

CREATE TYPE contract_category AS ENUM (
    'employment',
    'vendor',
    'service_agreement',
    'lease',
    'purchase',
    'partnership',
    'confidentiality'
);

CREATE TYPE contract_status AS ENUM (
    'draft',
    'under_review',
    'approved',
    'active',
    'expired',
    'terminated'
);

CREATE TYPE obligation_type AS ENUM (
    'payment',
    'delivery',
    'reporting',
    'renewal',
    'service_level_agreement',
    'legal_compliance'
);

CREATE TYPE obligation_status AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'overdue',
    'cancelled'
);

CREATE TYPE renewal_status AS ENUM (
    'upcoming',
    'in_progress',
    'renewed',
    'expired',
    'cancelled'
);

CREATE TYPE compliance_level AS ENUM (
    'compliant',
    'pending',
    'delayed',
    'non_compliant',
    'high_risk'
);

CREATE TYPE notification_type AS ENUM (
    'renewal_reminder',
    'obligation_due',
    'compliance_alert',
    'contract_approval',
    'system_alert'
);

CREATE TYPE notification_channel AS ENUM (
    'email',
    'sms',
    'in_app'
);

CREATE TYPE notification_status AS ENUM (
    'pending',
    'sent',
    'delivered',
    'failed',
    'read'
);

CREATE TYPE approval_action AS ENUM (
    'submitted',
    'approved',
    'rejected',
    'returned',
    'escalated'
);

CREATE TYPE audit_action AS ENUM (
    'create',
    'read',
    'update',
    'delete',
    'login',
    'logout',
    'upload',
    'download',
    'approve',
    'reject',
    'archive',
    'restore'
);

CREATE TYPE report_type AS ENUM (
    'contract',
    'compliance',
    'renewal',
    'obligation',
    'audit'
);

CREATE TYPE export_format AS ENUM (
    'pdf',
    'excel',
    'csv'
);

-- ============================================================
-- TABLE: users
-- ============================================================

CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id         VARCHAR(50) UNIQUE,
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100) NOT NULL,
    email               VARCHAR(255) UNIQUE NOT NULL,
    phone               VARCHAR(30),
    password_hash       TEXT NOT NULL,
    role                user_role NOT NULL DEFAULT 'employee',
    department_id       UUID,                          -- FK added after departments table
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    is_email_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url          TEXT,
    last_login_at       TIMESTAMPTZ,
    password_changed_at TIMESTAMPTZ,
    failed_login_count  INT NOT NULL DEFAULT 0,
    locked_until        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          UUID REFERENCES users(id) ON DELETE SET NULL,
    deleted_at          TIMESTAMPTZ                    -- soft delete
);

CREATE INDEX idx_users_email       ON users(email);
CREATE INDEX idx_users_role        ON users(role);
CREATE INDEX idx_users_department  ON users(department_id);
CREATE INDEX idx_users_is_active   ON users(is_active);

-- ============================================================
-- TABLE: departments
-- ============================================================

CREATE TABLE departments (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(150) NOT NULL UNIQUE,
    code        VARCHAR(30) UNIQUE,
    description TEXT,
    head_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    parent_id   UUID REFERENCES departments(id) ON DELETE SET NULL,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Back-fill the FK now that departments exists
ALTER TABLE users
    ADD CONSTRAINT fk_users_department
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL;

-- ============================================================
-- TABLE: user_sessions
-- ============================================================

CREATE TABLE user_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      TEXT NOT NULL UNIQUE,
    refresh_token_hash TEXT UNIQUE,
    ip_address      INET,
    user_agent      TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at      TIMESTAMPTZ
);

CREATE INDEX idx_sessions_user_id   ON user_sessions(user_id);
CREATE INDEX idx_sessions_token     ON user_sessions(token_hash);
CREATE INDEX idx_sessions_expires   ON user_sessions(expires_at);

-- ============================================================
-- TABLE: password_reset_tokens
-- ============================================================

CREATE TABLE password_reset_tokens (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash  TEXT NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    used_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_prt_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_prt_token   ON password_reset_tokens(token_hash);

-- ============================================================
-- TABLE: role_permissions
-- ============================================================

CREATE TABLE permissions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource    VARCHAR(100) NOT NULL,   -- e.g. 'contract', 'obligation'
    action      VARCHAR(50) NOT NULL,    -- e.g. 'create', 'read', 'update', 'delete'
    description TEXT,
    UNIQUE(resource, action)
);

CREATE TABLE role_permissions (
    role        user_role NOT NULL,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    granted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    granted_by  UUID REFERENCES users(id) ON DELETE SET NULL,
    PRIMARY KEY (role, permission_id)
);

-- ============================================================
-- TABLE: contracts
-- ============================================================

CREATE TABLE contracts (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_number     VARCHAR(100) UNIQUE NOT NULL,
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    category            contract_category NOT NULL,
    status              contract_status NOT NULL DEFAULT 'draft',
    counterparty_name   VARCHAR(255) NOT NULL,
    counterparty_email  VARCHAR(255),
    counterparty_phone  VARCHAR(30),
    counterparty_address TEXT,
    department_id       UUID REFERENCES departments(id) ON DELETE SET NULL,
    owner_id            UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    assigned_manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
    value               NUMERIC(18, 2),
    currency            CHAR(3) DEFAULT 'USD',
    start_date          DATE,
    end_date            DATE,
    signed_date         DATE,
    effective_date      DATE,
    auto_renew          BOOLEAN NOT NULL DEFAULT FALSE,
    renewal_notice_days INT DEFAULT 30,
    is_confidential     BOOLEAN NOT NULL DEFAULT FALSE,
    tags                TEXT[],
    metadata            JSONB,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          UUID REFERENCES users(id) ON DELETE SET NULL,
    deleted_at          TIMESTAMPTZ
);

CREATE INDEX idx_contracts_status      ON contracts(status);
CREATE INDEX idx_contracts_category    ON contracts(category);
CREATE INDEX idx_contracts_owner       ON contracts(owner_id);
CREATE INDEX idx_contracts_department  ON contracts(department_id);
CREATE INDEX idx_contracts_end_date    ON contracts(end_date);
CREATE INDEX idx_contracts_number      ON contracts(contract_number);
CREATE INDEX idx_contracts_tags        ON contracts USING GIN(tags);
CREATE INDEX idx_contracts_metadata    ON contracts USING GIN(metadata);
CREATE INDEX idx_contracts_search      ON contracts USING GIN(
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(counterparty_name,''))
);

-- ============================================================
-- TABLE: contract_versions
-- ============================================================

CREATE TABLE contract_versions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id     UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    version_number  INT NOT NULL,
    file_name       VARCHAR(255) NOT NULL,
    file_path       TEXT NOT NULL,
    file_size       BIGINT,
    file_mime_type  VARCHAR(100),
    checksum        VARCHAR(64),
    change_summary  TEXT,
    is_current      BOOLEAN NOT NULL DEFAULT FALSE,
    uploaded_by     UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(contract_id, version_number)
);

CREATE INDEX idx_cv_contract_id  ON contract_versions(contract_id);
CREATE INDEX idx_cv_is_current   ON contract_versions(contract_id, is_current);

-- ============================================================
-- TABLE: contract_approvals  (Approval Workflow)
-- ============================================================

CREATE TABLE approval_workflows (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(150) NOT NULL,
    description     TEXT,
    category        contract_category,      -- optional: tied to a category
    steps_count     INT NOT NULL DEFAULT 1,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE approval_workflow_steps (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id     UUID NOT NULL REFERENCES approval_workflows(id) ON DELETE CASCADE,
    step_order      INT NOT NULL,
    step_name       VARCHAR(150) NOT NULL,
    approver_role   user_role,
    approver_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    is_mandatory    BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE(workflow_id, step_order)
);

CREATE TABLE contract_approvals (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id     UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    workflow_id     UUID REFERENCES approval_workflows(id) ON DELETE SET NULL,
    step_id         UUID REFERENCES approval_workflow_steps(id) ON DELETE SET NULL,
    approver_id     UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    action          approval_action NOT NULL,
    comments        TEXT,
    acted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_approvals_contract ON contract_approvals(contract_id);
CREATE INDEX idx_approvals_approver ON contract_approvals(approver_id);

-- ============================================================
-- TABLE: obligations
-- ============================================================

CREATE TABLE obligations (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id         UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    title               VARCHAR(255) NOT NULL,
    description         TEXT,
    obligation_type     obligation_type NOT NULL,
    status              obligation_status NOT NULL DEFAULT 'pending',
    responsible_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    responsible_dept_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    due_date            DATE,
    reminder_days       INT DEFAULT 7,
    recurrence_rule     TEXT,           -- iCal RRULE string for recurring obligations
    amount              NUMERIC(18,2),  -- for payment obligations
    currency            CHAR(3),
    completion_date     DATE,
    completion_notes    TEXT,
    evidence_url        TEXT,
    priority            SMALLINT DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
    compliance_level    compliance_level DEFAULT 'pending',
    tags                TEXT[],
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          UUID REFERENCES users(id) ON DELETE SET NULL,
    deleted_at          TIMESTAMPTZ
);

CREATE INDEX idx_obligations_contract    ON obligations(contract_id);
CREATE INDEX idx_obligations_type        ON obligations(obligation_type);
CREATE INDEX idx_obligations_status      ON obligations(status);
CREATE INDEX idx_obligations_due_date    ON obligations(due_date);
CREATE INDEX idx_obligations_responsible ON obligations(responsible_user_id);
CREATE INDEX idx_obligations_compliance  ON obligations(compliance_level);

-- ============================================================
-- TABLE: obligation_progress
-- ============================================================

CREATE TABLE obligation_progress (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    obligation_id   UUID NOT NULL REFERENCES obligations(id) ON DELETE CASCADE,
    progress_pct    SMALLINT NOT NULL DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
    note            TEXT,
    recorded_by     UUID REFERENCES users(id) ON DELETE SET NULL,
    recorded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_op_obligation ON obligation_progress(obligation_id);

-- ============================================================
-- TABLE: renewals
-- ============================================================

CREATE TABLE renewals (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id         UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    renewal_number      INT NOT NULL DEFAULT 1,
    status              renewal_status NOT NULL DEFAULT 'upcoming',
    previous_end_date   DATE,
    new_start_date      DATE,
    new_end_date        DATE,
    new_value           NUMERIC(18,2),
    currency            CHAR(3),
    reminder_sent_at    TIMESTAMPTZ,
    reminder_days       INT DEFAULT 30,
    approved_by         UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at         TIMESTAMPTZ,
    notes               TEXT,
    renewal_doc_path    TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by          UUID REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE(contract_id, renewal_number)
);

CREATE INDEX idx_renewals_contract    ON renewals(contract_id);
CREATE INDEX idx_renewals_status      ON renewals(status);
CREATE INDEX idx_renewals_end_date    ON renewals(new_end_date);

-- ============================================================
-- TABLE: renewal_approvals
-- ============================================================

CREATE TABLE renewal_approvals (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    renewal_id  UUID NOT NULL REFERENCES renewals(id) ON DELETE CASCADE,
    approver_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    action      approval_action NOT NULL,
    comments    TEXT,
    acted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ra_renewal  ON renewal_approvals(renewal_id);
CREATE INDEX idx_ra_approver ON renewal_approvals(approver_id);

-- ============================================================
-- TABLE: compliance_records
-- ============================================================

CREATE TABLE compliance_records (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id         UUID REFERENCES contracts(id) ON DELETE CASCADE,
    obligation_id       UUID REFERENCES obligations(id) ON DELETE CASCADE,
    compliance_level    compliance_level NOT NULL DEFAULT 'pending',
    review_date         DATE NOT NULL,
    reviewed_by         UUID REFERENCES users(id) ON DELETE SET NULL,
    risk_score          SMALLINT CHECK (risk_score BETWEEN 0 AND 100),
    findings            TEXT,
    recommendations     TEXT,
    evidence_url        TEXT,
    next_review_date    DATE,
    is_resolved         BOOLEAN NOT NULL DEFAULT FALSE,
    resolved_at         TIMESTAMPTZ,
    resolved_by         UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_compliance_contract    ON compliance_records(contract_id);
CREATE INDEX idx_compliance_obligation  ON compliance_records(obligation_id);
CREATE INDEX idx_compliance_level       ON compliance_records(compliance_level);
CREATE INDEX idx_compliance_review_date ON compliance_records(review_date);

-- ============================================================
-- TABLE: notifications
-- ============================================================

CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type            notification_type NOT NULL,
    channel         notification_channel NOT NULL DEFAULT 'in_app',
    status          notification_status NOT NULL DEFAULT 'pending',
    subject         VARCHAR(255),
    body            TEXT NOT NULL,
    reference_type  VARCHAR(50),        -- 'contract', 'obligation', 'renewal'
    reference_id    UUID,               -- FK-like pointer (polymorphic)
    scheduled_at    TIMESTAMPTZ,
    sent_at         TIMESTAMPTZ,
    delivered_at    TIMESTAMPTZ,
    read_at         TIMESTAMPTZ,
    retry_count     INT NOT NULL DEFAULT 0,
    error_message   TEXT,
    metadata        JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user     ON notifications(user_id);
CREATE INDEX idx_notifications_type     ON notifications(type);
CREATE INDEX idx_notifications_status   ON notifications(status);
CREATE INDEX idx_notifications_ref      ON notifications(reference_type, reference_id);
CREATE INDEX idx_notifications_sched    ON notifications(scheduled_at);

-- ============================================================
-- TABLE: notification_templates
-- ============================================================

CREATE TABLE notification_templates (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(150) NOT NULL UNIQUE,
    type        notification_type NOT NULL,
    channel     notification_channel NOT NULL,
    subject     VARCHAR(255),
    body_html   TEXT,
    body_text   TEXT,
    variables   TEXT[],                 -- list of placeholders e.g. {{contract_title}}
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: reports
-- ============================================================

CREATE TABLE reports (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_type     report_type NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    parameters      JSONB,              -- filter criteria used to generate report
    export_format   export_format,
    file_path       TEXT,               -- path to generated file
    file_size       BIGINT,
    generated_by    UUID REFERENCES users(id) ON DELETE SET NULL,
    generated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ,
    download_count  INT NOT NULL DEFAULT 0,
    is_scheduled    BOOLEAN NOT NULL DEFAULT FALSE,
    schedule_cron   VARCHAR(100),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_type         ON reports(report_type);
CREATE INDEX idx_reports_generated_by ON reports(generated_by);
CREATE INDEX idx_reports_generated_at ON reports(generated_at);

-- ============================================================
-- TABLE: audit_logs
-- ============================================================

CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
    action          audit_action NOT NULL,
    resource_type   VARCHAR(100) NOT NULL,   -- e.g. 'contract', 'user', 'obligation'
    resource_id     UUID,
    resource_label  VARCHAR(255),            -- human-readable name at time of action
    old_values      JSONB,
    new_values      JSONB,
    ip_address      INET,
    user_agent      TEXT,
    session_id      UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
    request_id      VARCHAR(100),
    status_code     SMALLINT,               -- HTTP status, if applicable
    duration_ms     INT,                    -- request duration
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_user         ON audit_logs(user_id);
CREATE INDEX idx_audit_action       ON audit_logs(action);
CREATE INDEX idx_audit_resource     ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_created_at   ON audit_logs(created_at);

-- ============================================================
-- TABLE: activities  (lightweight activity feed / timeline)
-- ============================================================

CREATE TABLE activities (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id        UUID REFERENCES users(id) ON DELETE SET NULL,
    verb            VARCHAR(100) NOT NULL,   -- e.g. 'uploaded', 'approved', 'commented'
    object_type     VARCHAR(100) NOT NULL,
    object_id       UUID NOT NULL,
    object_label    VARCHAR(255),
    target_type     VARCHAR(100),            -- secondary object (e.g. contract a comment is on)
    target_id       UUID,
    target_label    VARCHAR(255),
    department_id   UUID REFERENCES departments(id) ON DELETE SET NULL,
    metadata        JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activities_actor     ON activities(actor_id);
CREATE INDEX idx_activities_object    ON activities(object_type, object_id);
CREATE INDEX idx_activities_dept      ON activities(department_id);
CREATE INDEX idx_activities_created   ON activities(created_at DESC);

-- ============================================================
-- TABLE: contract_comments
-- ============================================================

CREATE TABLE contract_comments (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    parent_id   UUID REFERENCES contract_comments(id) ON DELETE CASCADE,
    author_id   UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    body        TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);

CREATE INDEX idx_comments_contract ON contract_comments(contract_id);
CREATE INDEX idx_comments_author   ON contract_comments(author_id);

-- ============================================================
-- TABLE: contract_tags  (normalised tag registry)
-- ============================================================

CREATE TABLE tags (
    id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name  VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(7)
);

CREATE TABLE contract_tag_map (
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    tag_id      UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (contract_id, tag_id)
);

-- ============================================================
-- TABLE: document_archives
-- ============================================================

CREATE TABLE document_archives (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id     UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    version_id      UUID REFERENCES contract_versions(id) ON DELETE SET NULL,
    archived_by     UUID REFERENCES users(id) ON DELETE SET NULL,
    archive_reason  TEXT,
    storage_path    TEXT NOT NULL,
    checksum        VARCHAR(64),
    archived_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    restore_at      TIMESTAMPTZ,
    restored_by     UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_archives_contract ON document_archives(contract_id);

-- ============================================================
-- TABLE: system_settings
-- ============================================================

CREATE TABLE system_settings (
    key         VARCHAR(150) PRIMARY KEY,
    value       TEXT,
    description TEXT,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by  UUID REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================================
-- VIEWS (helper views for dashboards)
-- ============================================================

-- Active contracts summary
CREATE OR REPLACE VIEW vw_active_contracts AS
SELECT
    c.id,
    c.contract_number,
    c.title,
    c.category,
    c.status,
    c.counterparty_name,
    c.end_date,
    c.value,
    c.currency,
    d.name  AS department_name,
    u.first_name || ' ' || u.last_name AS owner_name,
    CASE
        WHEN c.end_date IS NOT NULL THEN (c.end_date - CURRENT_DATE)
        ELSE NULL
    END AS days_to_expiry
FROM contracts c
LEFT JOIN departments d ON d.id = c.department_id
LEFT JOIN users u ON u.id = c.owner_id
WHERE c.status = 'active'
  AND c.deleted_at IS NULL;

-- Upcoming renewals
CREATE OR REPLACE VIEW vw_upcoming_renewals AS
SELECT
    r.id             AS renewal_id,
    c.contract_number,
    c.title          AS contract_title,
    c.counterparty_name,
    r.status         AS renewal_status,
    r.new_end_date,
    (r.new_end_date - CURRENT_DATE) AS days_remaining,
    r.reminder_days,
    u.first_name || ' ' || u.last_name AS owner_name
FROM renewals r
JOIN contracts c ON c.id = r.contract_id
LEFT JOIN users u ON u.id = c.owner_id
WHERE r.status IN ('upcoming', 'in_progress')
  AND c.deleted_at IS NULL
ORDER BY r.new_end_date ASC;

-- Overdue obligations
CREATE OR REPLACE VIEW vw_overdue_obligations AS
SELECT
    o.id,
    o.title,
    o.obligation_type,
    o.due_date,
    (CURRENT_DATE - o.due_date) AS days_overdue,
    c.contract_number,
    c.title AS contract_title,
    u.first_name || ' ' || u.last_name AS responsible_person,
    d.name AS responsible_department
FROM obligations o
JOIN contracts c ON c.id = o.contract_id
LEFT JOIN users u ON u.id = o.responsible_user_id
LEFT JOIN departments d ON d.id = o.responsible_dept_id
WHERE o.status NOT IN ('completed', 'cancelled')
  AND o.due_date < CURRENT_DATE
  AND o.deleted_at IS NULL
ORDER BY days_overdue DESC;

-- Compliance summary per department
CREATE OR REPLACE VIEW vw_compliance_summary AS
SELECT
    d.id   AS department_id,
    d.name AS department_name,
    COUNT(cr.id)                                                FILTER (WHERE cr.compliance_level = 'compliant')      AS compliant_count,
    COUNT(cr.id)                                                FILTER (WHERE cr.compliance_level = 'pending')        AS pending_count,
    COUNT(cr.id)                                                FILTER (WHERE cr.compliance_level = 'delayed')        AS delayed_count,
    COUNT(cr.id)                                                FILTER (WHERE cr.compliance_level = 'non_compliant')  AS non_compliant_count,
    COUNT(cr.id)                                                FILTER (WHERE cr.compliance_level = 'high_risk')      AS high_risk_count,
    COUNT(cr.id)                                                                                                      AS total_count
FROM departments d
LEFT JOIN contracts c ON c.department_id = d.id AND c.deleted_at IS NULL
LEFT JOIN compliance_records cr ON cr.contract_id = c.id
GROUP BY d.id, d.name;

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at          BEFORE UPDATE ON users                 FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_departments_updated_at    BEFORE UPDATE ON departments            FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_contracts_updated_at      BEFORE UPDATE ON contracts              FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_obligations_updated_at    BEFORE UPDATE ON obligations            FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_renewals_updated_at       BEFORE UPDATE ON renewals               FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_compliance_updated_at     BEFORE UPDATE ON compliance_records     FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_comments_updated_at       BEFORE UPDATE ON contract_comments      FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_workflows_updated_at      BEFORE UPDATE ON approval_workflows     FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_notif_tpl_updated_at      BEFORE UPDATE ON notification_templates FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
