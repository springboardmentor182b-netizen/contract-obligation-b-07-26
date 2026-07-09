# **Database Schema**
## **Contract Obligation Tracking & Compliance Management Platform**

---

# **1. Users**

Stores information about all system users, including administrators, managers, and employees.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| user_id | UUID | Unique user identifier | **PK** |
| full_name | VARCHAR(100) | Full name of the user | |
| email | VARCHAR(150) UNIQUE | Login email address | |
| password_hash | TEXT | Encrypted password | |
| role | ENUM | User role | |
| phone | VARCHAR(15) | Phone number | |
| department | VARCHAR(100) | Department name | |
| status | BOOLEAN | Active / Inactive status | |
| created_at | TIMESTAMP | Record creation timestamp | |
| updated_at | TIMESTAMP | Record last update timestamp | |

---

# **2. Contracts**

Stores contract information uploaded into the system.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| contract_id | UUID | Unique contract identifier | **PK** |
| title | VARCHAR(200) | Contract title | |
| contract_number | VARCHAR(100) | Contract reference number | |
| category | VARCHAR(100) | Contract category | |
| description | TEXT | Contract description | |
| start_date | DATE | Contract start date | |
| end_date | DATE | Contract end date | |
| status | ENUM | Current contract status | |
| uploaded_by | UUID | User who uploaded the contract | **FK → Users.user_id** |
| assigned_to | UUID | Assigned user | **FK → Users.user_id** |
| file_path | TEXT | Contract document path | |
| created_at | TIMESTAMP | Record creation timestamp | |
| updated_at | TIMESTAMP | Record last update timestamp | |

---

# **3. Contract Versions**

Stores version history for each contract.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| version_id | UUID | Unique version identifier | **PK** |
| contract_id | UUID | Related contract | **FK → Contracts.contract_id** |
| version_number | INTEGER | Version number | |
| document_path | TEXT | Version document path | |
| changes | TEXT | Summary of changes | |
| uploaded_by | UUID | Uploaded by user | **FK → Users.user_id** |
| created_at | TIMESTAMP | Record creation timestamp | |

---

# **4. Obligations**

Stores contract obligations assigned to users.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| obligation_id | UUID | Unique obligation identifier | **PK** |
| contract_id | UUID | Related contract | **FK → Contracts.contract_id** |
| title | VARCHAR(150) | Obligation title | |
| obligation_type | VARCHAR(100) | Obligation type | |
| assigned_to | UUID | Assigned user | **FK → Users.user_id** |
| due_date | DATE | Due date | |
| completion_date | DATE | Completion date | |
| status | ENUM | Current obligation status | |
| remarks | TEXT | Additional remarks | |
| created_at | TIMESTAMP | Record creation timestamp | |

---

# **5. Renewals**

Stores renewal information for contracts.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| renewal_id | UUID | Unique renewal identifier | **PK** |
| contract_id | UUID | Related contract | **FK → Contracts.contract_id** |
| renewal_date | DATE | Renewal date | |
| reminder_date | DATE | Reminder date | |
| status | ENUM | Renewal status | |
| approved_by | UUID | Approved by user | **FK → Users.user_id** |
| remarks | TEXT | Additional remarks | |

---

# **6. Notifications**

Stores notifications sent to users.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| notification_id | UUID | Unique notification identifier | **PK** |
| user_id | UUID | Recipient user | **FK → Users.user_id** |
| contract_id | UUID | Related contract | **FK → Contracts.contract_id** |
| message | TEXT | Notification message | |
| notification_type | ENUM | Notification type | |
| is_read | BOOLEAN | Read status | |
| created_at | TIMESTAMP | Record creation timestamp | |

---

# **7. Reports**

Stores generated reports.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| report_id | UUID | Unique report identifier | **PK** |
| report_name | VARCHAR(100) | Report name | |
| report_type | VARCHAR(100) | Report type | |
| generated_by | UUID | User who generated the report | **FK → Users.user_id** |
| file_path | TEXT | Report file path | |
| generated_at | TIMESTAMP | Report generation timestamp | |

---

# **8. Audit Logs**

Stores system audit information.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| audit_id | UUID | Unique audit identifier | **PK** |
| user_id | UUID | User who performed the action | **FK → Users.user_id** |
| action | VARCHAR(100) | Performed action | |
| module | VARCHAR(100) | Affected module | |
| old_value | JSONB | Previous value | |
| new_value | JSONB | Updated value | |
| ip_address | VARCHAR(50) | User IP address | |
| created_at | TIMESTAMP | Record creation timestamp | |

---

# **9. Activities**

Stores user activity history.

| **Column Name** | **Data Type** | **Description** | **Key** |
|-----------------|---------------|-----------------|---------|
| activity_id | UUID | Unique activity identifier | **PK** |
| user_id | UUID | User who performed the activity | **FK → Users.user_id** |
| contract_id | UUID | Related contract | **FK → Contracts.contract_id** |
| activity | TEXT | Activity description | |
| activity_time | TIMESTAMP | Activity timestamp | |

---

# **Table Relationships**

| **Parent Table** | **Relationship** | **Child Table** |
|------------------|------------------|-----------------|
| Users | 1 : M | Contracts |
| Contracts | 1 : M | Contract Versions |
| Contracts | 1 : M | Obligations |
| Contracts | 1 : M | Renewals |
| Users | 1 : M | Notifications |
| Users | 1 : M | Reports |
| Users | 1 : M | Audit Logs |
| Users | 1 : M | Activities |

