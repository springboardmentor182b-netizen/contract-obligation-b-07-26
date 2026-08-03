from pydantic import BaseModel, Field, field_validator
from src.database.core import get_connection
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from typing import Optional

app = FastAPI(title="ContractIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Obligation(BaseModel):
    id: str

    obligation: str = Field(..., min_length=3)
    contract: str = Field(..., min_length=3)
    owner: str = Field(..., min_length=2)

    priority: str
    status: str

    dueDate: str

    description: str = ""

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value):
        allowed = ["High", "Medium", "Low"]
        if value not in allowed:
            raise ValueError("Priority must be High, Medium or Low")
        return value

    @field_validator("status")
    @classmethod
    def validate_status(cls, value):
        allowed = ["Pending", "In Progress", "Completed"]
        if value not in allowed:
            raise ValueError("Status must be Pending, In Progress or Completed")
        return value
class Profile(BaseModel):

    first_name: str = Field(..., min_length=2)

    last_name: str = Field(..., min_length=2)

    email: str

    phone: Optional[str] = None

    job_title: Optional[str] = None

    department: Optional[str] = None

    employee_id: Optional[str] = None

    bio: Optional[str] = None

    language: Optional[str] = None

    timezone: Optional[str] = None

    date_format: Optional[str] = None

    currency: Optional[str] = None


# obligations: List[Obligation] = [
#     Obligation(
#         id="OBL-001",
#         obligation="Review Vendor Contract",
#         contract="Vendor Agreement",
#         owner="John Smith",
#         priority="High",
#         status="Pending",
#         dueDate="2026-07-20",
#         description="Review legal clauses",
#     )
# ]


@app.get("/")
def home():
    return {"message": "ContractIQ API Running"}


@app.get("/obligations")
def get_obligations():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, obligation, contract, owner,
               priority, status, due_date, description
        FROM obligations
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "obligation": row[1],
            "contract": row[2],
            "owner": row[3],
            "priority": row[4],
            "status": row[5],
            "dueDate": str(row[6]),
            "description": row[7],
        }
        for row in rows
    ]

@app.get("/obligations/stats")
def get_obligation_stats():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE status = 'Pending') AS pending,
            COUNT(*) FILTER (WHERE status = 'In Progress') AS progress,
            COUNT(*) FILTER (WHERE status = 'Completed') AS completed,
            COUNT(*) FILTER (WHERE due_date < CURRENT_DATE AND status != 'Completed') AS overdue,
            COUNT(*) FILTER (WHERE priority = 'High') AS risk,
            COUNT(*) FILTER (WHERE due_date = CURRENT_DATE) AS due
        FROM obligations;
    """)

    row = cursor.fetchone()

    total = row[0] or 0
    completed = row[3] or 0

    compliance = (
        round((completed / total) * 100)
        if total > 0 else 0
    )

    cursor.close()
    conn.close()

    return {
        "total": total,
        "pending": row[1] or 0,
        "progress": row[2] or 0,
        "completed": completed,
        "overdue": row[4] or 0,
        "risk": row[5] or 0,
        "due": row[6] or 0,
        "compliance": compliance
    }


@app.post("/obligations")
def add_obligation(obligation: Obligation):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO obligations
        (id, obligation, contract, owner, priority, status, due_date, description)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            obligation.id,
            obligation.obligation,
            obligation.contract,
            obligation.owner,
            obligation.priority,
            obligation.status,
            obligation.dueDate,
            obligation.description,
        ),
    )

    conn.commit()
    cursor.close()
    conn.close()

    return {
        "message": "Obligation added successfully",
        "data": obligation,
    }


@app.put("/settings/profile/{profile_id}")
def update_profile(profile_id: int, profile: Profile):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE profile_settings
        SET
            first_name=%s,
            last_name=%s,
            email=%s,
            phone=%s,
            job_title=%s,
            department=%s,
            employee_id=%s,
            bio=%s,
            language=%s,
            timezone=%s,
            date_format=%s,
            currency=%s
        WHERE id=%s
        """,
        (
            profile.first_name,
            profile.last_name,
            profile.email,
            profile.phone,
            profile.job_title,
            profile.department,
            profile.employee_id,
            profile.bio,
            profile.language,
            profile.timezone,
            profile.date_format,
            profile.currency,
            profile_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Profile updated successfully"
    }


@app.delete("/obligations/{obligation_id}")
def delete_obligation(obligation_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM obligations WHERE id = %s",
        (obligation_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Obligation not found")

    cursor.close()
    conn.close()

    return {
        "message": "Obligation deleted successfully"
    }
@app.delete("/settings/profile/{profile_id}")
def delete_profile(profile_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM profile_settings WHERE id = %s",
        (profile_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Profile deleted successfully"
    }
@app.get("/settings/profile")
def get_profiles():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            job_title,
            department,
            employee_id,
            bio,
            language,
            timezone,
            date_format,
            currency
        FROM profile_settings
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "first_name": row[1],
            "last_name": row[2],
            "email": row[3],
            "phone": row[4],
            "job_title": row[5],
            "department": row[6],
            "employee_id": row[7],
            "bio": row[8],
            "language": row[9],
            "timezone": row[10],
            "date_format": row[11],
            "currency": row[12]
        }
        for row in rows
    ]


@app.get("/settings/profile/{profile_id}")
def get_profile(profile_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            job_title,
            department,
            employee_id,
            bio,
            language,
            timezone,
            date_format,
            currency
        FROM profile_settings
        WHERE id = %s
    """, (profile_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return {
        "id": row[0],
        "first_name": row[1],
        "last_name": row[2],
        "email": row[3],
        "phone": row[4],
        "job_title": row[5],
        "department": row[6],
        "employee_id": row[7],
        "bio": row[8],
        "language": row[9],
        "timezone": row[10],
        "date_format": row[11],
        "currency": row[12]
    }
@app.post("/settings/profile")
def add_profile(profile: Profile):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO profile_settings
        (
            first_name,
            last_name,
            email,
            phone,
            job_title,
            department,
            employee_id,
            bio,
            language,
            timezone,
            date_format,
            currency
        )
        VALUES
        (
            %s, %s, %s, %s, %s, %s,
            %s, %s, %s, %s, %s, %s
        )
        RETURNING id
        """,
        (
            profile.first_name,
            profile.last_name,
            profile.email,
            profile.phone,
            profile.job_title,
            profile.department,
            profile.employee_id,
            profile.bio,
            profile.language,
            profile.timezone,
            profile.date_format,
            profile.currency,
        ),
    )

    profile_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Profile created successfully",
        "id": profile_id
    }
class Organization(BaseModel):

    organization_name: str = Field(..., min_length=2)

    organization_email: str

    phone: Optional[str] = None

    website: Optional[str] = None

    industry: Optional[str] = None

    address: Optional[str] = None

    city: Optional[str] = None

    state: Optional[str] = None

    country: Optional[str] = None

    postal_code: Optional[str] = None
@app.get("/settings/organization")
def get_organizations():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            organization_name,
            organization_email,
            phone,
            website,
            industry,
            address,
            city,
            state,
            country,
            postal_code
        FROM organization_settings
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "organization_name": row[1],
            "organization_email": row[2],
            "phone": row[3],
            "website": row[4],
            "industry": row[5],
            "address": row[6],
            "city": row[7],
            "state": row[8],
            "country": row[9],
            "postal_code": row[10]
        }
        for row in rows
    ]
@app.get("/settings/organization/{organization_id}")
def get_organization(organization_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            organization_name,
            organization_email,
            phone,
            website,
            industry,
            address,
            city,
            state,
            country,
            postal_code
        FROM organization_settings
        WHERE id = %s
    """, (organization_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )

    return {
        "id": row[0],
        "organization_name": row[1],
        "organization_email": row[2],
        "phone": row[3],
        "website": row[4],
        "industry": row[5],
        "address": row[6],
        "city": row[7],
        "state": row[8],
        "country": row[9],
        "postal_code": row[10]
    }
@app.post("/settings/organization")
def add_organization(organization: Organization):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO organization_settings
        (
            organization_name,
            organization_email,
            phone,
            website,
            industry,
            address,
            city,
            state,
            country,
            postal_code
        )
        VALUES
        (
            %s, %s, %s, %s, %s,
            %s, %s, %s, %s, %s
        )
        RETURNING id
        """,
        (
            organization.organization_name,
            organization.organization_email,
            organization.phone,
            organization.website,
            organization.industry,
            organization.address,
            organization.city,
            organization.state,
            organization.country,
            organization.postal_code,
        ),
    )

    organization_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Organization created successfully",
        "id": organization_id
    }
@app.put("/settings/organization/{organization_id}")
def update_organization(
    organization_id: int,
    organization: Organization
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE organization_settings
        SET
            organization_name=%s,
            organization_email=%s,
            phone=%s,
            website=%s,
            industry=%s,
            address=%s,
            city=%s,
            state=%s,
            country=%s,
            postal_code=%s
        WHERE id=%s
        """,
        (
            organization.organization_name,
            organization.organization_email,
            organization.phone,
            organization.website,
            organization.industry,
            organization.address,
            organization.city,
            organization.state,
            organization.country,
            organization.postal_code,
            organization_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Organization updated successfully"
    }
@app.delete("/settings/organization/{organization_id}")
def delete_organization(organization_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM organization_settings WHERE id=%s",
        (organization_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Organization not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Organization deleted successfully"
    }
class Security(BaseModel):

    current_password: str

    new_password: str

    two_factor_enabled: bool = False

    session_timeout: int

    password_expiry_days: int

    login_alerts: bool = True
@app.get("/settings/security")
def get_security_settings():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            current_password,
            new_password,
            two_factor_enabled,
            session_timeout,
            password_expiry_days,
            login_alerts
        FROM security_settings
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "current_password": row[1],
            "new_password": row[2],
            "two_factor_enabled": row[3],
            "session_timeout": row[4],
            "password_expiry_days": row[5],
            "login_alerts": row[6]
        }
        for row in rows
    ]
@app.get("/settings/security/{security_id}")
def get_security_setting(security_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            current_password,
            new_password,
            two_factor_enabled,
            session_timeout,
            password_expiry_days,
            login_alerts
        FROM security_settings
        WHERE id = %s
    """, (security_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Security settings not found"
        )

    return {
        "id": row[0],
        "current_password": row[1],
        "new_password": row[2],
        "two_factor_enabled": row[3],
        "session_timeout": row[4],
        "password_expiry_days": row[5],
        "login_alerts": row[6]
    }
@app.post("/settings/security")
def add_security_setting(security: Security):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO security_settings
        (
            current_password,
            new_password,
            two_factor_enabled,
            session_timeout,
            password_expiry_days,
            login_alerts
        )
        VALUES
        (
            %s, %s, %s, %s, %s, %s
        )
        RETURNING id
        """,
        (
            security.current_password,
            security.new_password,
            security.two_factor_enabled,
            security.session_timeout,
            security.password_expiry_days,
            security.login_alerts,
        ),
    )

    security_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Security settings created successfully",
        "id": security_id
    }
@app.put("/settings/security/{security_id}")
def update_security_setting(
    security_id: int,
    security: Security
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE security_settings
        SET
            current_password=%s,
            new_password=%s,
            two_factor_enabled=%s,
            session_timeout=%s,
            password_expiry_days=%s,
            login_alerts=%s
        WHERE id=%s
        """,
        (
            security.current_password,
            security.new_password,
            security.two_factor_enabled,
            security.session_timeout,
            security.password_expiry_days,
            security.login_alerts,
            security_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Security settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Security settings updated successfully"
    }
@app.delete("/settings/security/{security_id}")
def delete_security_setting(security_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM security_settings WHERE id=%s",
        (security_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Security settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Security settings deleted successfully"
    }
class Notification(BaseModel):

    email_notifications: bool = True

    sms_notifications: bool = False

    push_notifications: bool = True

    contract_reminders: bool = True

    renewal_alerts: bool = True

    compliance_alerts: bool = True

    weekly_summary: bool = False
@app.get("/settings/notifications")
def get_notifications():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            email_notifications,
            sms_notifications,
            push_notifications,
            contract_reminders,
            renewal_alerts,
            compliance_alerts,
            weekly_summary
        FROM notification_settings
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "email_notifications": row[1],
            "sms_notifications": row[2],
            "push_notifications": row[3],
            "contract_reminders": row[4],
            "renewal_alerts": row[5],
            "compliance_alerts": row[6],
            "weekly_summary": row[7]
        }
        for row in rows
    ]
@app.get("/settings/notifications/{notification_id}")
def get_notification(notification_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            email_notifications,
            sms_notifications,
            push_notifications,
            contract_reminders,
            renewal_alerts,
            compliance_alerts,
            weekly_summary
        FROM notification_settings
        WHERE id=%s
    """, (notification_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Notification settings not found"
        )

    return {
        "id": row[0],
        "email_notifications": row[1],
        "sms_notifications": row[2],
        "push_notifications": row[3],
        "contract_reminders": row[4],
        "renewal_alerts": row[5],
        "compliance_alerts": row[6],
        "weekly_summary": row[7]
    }
@app.post("/settings/notifications")
def add_notification(notification: Notification):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO notification_settings
        (
            email_notifications,
            sms_notifications,
            push_notifications,
            contract_reminders,
            renewal_alerts,
            compliance_alerts,
            weekly_summary
        )
        VALUES
        (
            %s,%s,%s,%s,%s,%s,%s
        )
        RETURNING id
        """,
        (
            notification.email_notifications,
            notification.sms_notifications,
            notification.push_notifications,
            notification.contract_reminders,
            notification.renewal_alerts,
            notification.compliance_alerts,
            notification.weekly_summary,
        ),
    )

    notification_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Notification settings created successfully",
        "id": notification_id
    }
@app.put("/settings/notifications/{notification_id}")
def update_notification(
    notification_id: int,
    notification: Notification
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE notification_settings
        SET
            email_notifications=%s,
            sms_notifications=%s,
            push_notifications=%s,
            contract_reminders=%s,
            renewal_alerts=%s,
            compliance_alerts=%s,
            weekly_summary=%s
        WHERE id=%s
        """,
        (
            notification.email_notifications,
            notification.sms_notifications,
            notification.push_notifications,
            notification.contract_reminders,
            notification.renewal_alerts,
            notification.compliance_alerts,
            notification.weekly_summary,
            notification_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Notification settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Notification settings updated successfully"
    }
@app.delete("/settings/notifications/{notification_id}")
def delete_notification(notification_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM notification_settings WHERE id=%s",
        (notification_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Notification settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Notification settings deleted successfully"
    }
class Appearance(BaseModel):

    theme: str

    language: str

    font_size: str

    date_format: str

    time_format: str
@app.get("/settings/appearance")
def get_appearance_settings():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            theme,
            language,
            font_size,
            date_format,
            time_format
        FROM appearance_settings
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "theme": row[1],
            "language": row[2],
            "font_size": row[3],
            "date_format": row[4],
            "time_format": row[5]
        }
        for row in rows
    ]
@app.get("/settings/appearance/{appearance_id}")
def get_appearance_setting(appearance_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            theme,
            language,
            font_size,
            date_format,
            time_format
        FROM appearance_settings
        WHERE id=%s
    """, (appearance_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Appearance settings not found"
        )

    return {
        "id": row[0],
        "theme": row[1],
        "language": row[2],
        "font_size": row[3],
        "date_format": row[4],
        "time_format": row[5]
    }
@app.post("/settings/appearance")
def add_appearance_setting(appearance: Appearance):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO appearance_settings
        (
            theme,
            language,
            font_size,
            date_format,
            time_format
        )
        VALUES
        (
            %s,%s,%s,%s,%s
        )
        RETURNING id
        """,
        (
            appearance.theme,
            appearance.language,
            appearance.font_size,
            appearance.date_format,
            appearance.time_format,
        ),
    )

    appearance_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Appearance settings created successfully",
        "id": appearance_id
    }
@app.put("/settings/appearance/{appearance_id}")
def update_appearance_setting(
    appearance_id: int,
    appearance: Appearance
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE appearance_settings
        SET
            theme=%s,
            language=%s,
            font_size=%s,
            date_format=%s,
            time_format=%s
        WHERE id=%s
        """,
        (
            appearance.theme,
            appearance.language,
            appearance.font_size,
            appearance.date_format,
            appearance.time_format,
            appearance_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Appearance settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Appearance settings updated successfully"
    }
@app.delete("/settings/appearance/{appearance_id}")
def delete_appearance_setting(appearance_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM appearance_settings WHERE id=%s",
        (appearance_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Appearance settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Appearance settings deleted successfully"
    }

class Billing(BaseModel):

    billingName: str

    billingEmail: str

    taxId: str

    address: str
@app.get("/settings/billing")
def get_billing_settings():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            billing_name,
            billing_email,
            tax_id,
            address
        FROM billing_settings
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "billingName": row[1],
            "billingEmail": row[2],
            "taxId": row[3],
            "address": row[4]
        }
        for row in rows
    ]
@app.get("/settings/billing/{billing_id}")
def get_billing_setting(billing_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            id,
            billing_name,
            billing_email,
            tax_id,
            address
        FROM billing_settings
        WHERE id=%s
        """,
        (billing_id,)
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Billing settings not found"
        )

    return {
        "id": row[0],
        "billingName": row[1],
        "billingEmail": row[2],
        "taxId": row[3],
        "address": row[4]
    }
@app.get("/settings/billing/{billing_id}")
def get_billing_setting(billing_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            id,
            billing_name,
            billing_email,
            tax_id,
            address
        FROM billing_settings
        WHERE id=%s
        """,
        (billing_id,),
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Billing settings not found"
        )

    return {
        "id": row[0],
        "billingName": row[1],
        "billingEmail": row[2],
        "taxId": row[3],
        "address": row[4],
    }
@app.post("/settings/billing")
def add_billing_setting(billing: Billing):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO billing_settings
        (
            billing_name,
            billing_email,
            tax_id,
            address
        )
        VALUES
        (
            %s,%s,%s,%s
        )
        RETURNING id
        """,
        (
            billing.billingName,
            billing.billingEmail,
            billing.taxId,
            billing.address,
        ),
    )

    billing_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Billing settings created successfully",
        "id": billing_id
    }
@app.put("/settings/billing/{billing_id}")
def update_billing_setting(
    billing_id: int,
    billing: Billing
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE billing_settings
        SET
            billing_name=%s,
            billing_email=%s,
            tax_id=%s,
            address=%s
        WHERE id=%s
        """,
        (
            billing.billingName,
            billing.billingEmail,
            billing.taxId,
            billing.address,
            billing_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Billing settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Billing settings updated successfully"
    }
@app.delete("/settings/billing/{billing_id}")
def delete_billing_setting(billing_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM billing_settings WHERE id=%s",
        (billing_id,),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Billing settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Billing settings deleted successfully"
    }
class Compliance(BaseModel):

    complianceMode: str

    auditFrequency: str

    retentionPeriod: str

    autoArchive: bool

    complianceOfficer: str
@app.get("/settings/compliance")
def get_compliance_settings():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            compliance_mode,
            audit_frequency,
            retention_period,
            auto_archive,
            compliance_officer
        FROM compliance_settings
        ORDER BY id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "complianceMode": row[1],
            "auditFrequency": row[2],
            "retentionPeriod": row[3],
            "autoArchive": row[4],
            "complianceOfficer": row[5],
        }
        for row in rows
    ]
@app.get("/settings/compliance/{compliance_id}")
def get_compliance_setting(compliance_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            compliance_mode,
            audit_frequency,
            retention_period,
            auto_archive,
            compliance_officer
        FROM compliance_settings
        WHERE id=%s
    """, (compliance_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Compliance settings not found"
        )

    return {
        "id": row[0],
        "complianceMode": row[1],
        "auditFrequency": row[2],
        "retentionPeriod": row[3],
        "autoArchive": row[4],
        "complianceOfficer": row[5],
    }
@app.post("/settings/compliance")
def add_compliance_setting(compliance: Compliance):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO compliance_settings
        (
            compliance_mode,
            audit_frequency,
            retention_period,
            auto_archive,
            compliance_officer
        )
        VALUES
        (%s,%s,%s,%s,%s)
        RETURNING id
    """,
    (
        compliance.complianceMode,
        compliance.auditFrequency,
        compliance.retentionPeriod,
        compliance.autoArchive,
        compliance.complianceOfficer,
    ))

    compliance_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Compliance settings created successfully",
        "id": compliance_id
    }
@app.put("/settings/compliance/{compliance_id}")
def update_compliance_setting(
    compliance_id: int,
    compliance: Compliance
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE compliance_settings
        SET
            compliance_mode=%s,
            audit_frequency=%s,
            retention_period=%s,
            auto_archive=%s,
            compliance_officer=%s
        WHERE id=%s
    """,
    (
        compliance.complianceMode,
        compliance.auditFrequency,
        compliance.retentionPeriod,
        compliance.autoArchive,
        compliance.complianceOfficer,
        compliance_id,
    ))

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Compliance settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Compliance settings updated successfully"
    }
@app.delete("/settings/compliance/{compliance_id}")
def delete_compliance_setting(compliance_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM compliance_settings WHERE id=%s",
        (compliance_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Compliance settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Compliance settings deleted successfully"
    }
class ContractDefaults(BaseModel):

    defaultContractType: str

    defaultDuration: str

    renewalType: str

    reminderDays: int

    approvalRequired: bool

    defaultOwner: str
@app.get("/settings/contract-defaults")
def get_contract_defaults():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            default_contract_type,
            default_duration,
            renewal_type,
            reminder_days,
            approval_required,
            default_owner
        FROM contract_defaults
        ORDER BY id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "defaultContractType": row[1],
            "defaultDuration": row[2],
            "renewalType": row[3],
            "reminderDays": row[4],
            "approvalRequired": row[5],
            "defaultOwner": row[6]
        }
        for row in rows
    ]
@app.get("/settings/contract-defaults/{default_id}")
def get_contract_default(default_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            default_contract_type,
            default_duration,
            renewal_type,
            reminder_days,
            approval_required,
            default_owner
        FROM contract_defaults
        WHERE id=%s
    """, (default_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Contract defaults not found"
        )

    return {
        "id": row[0],
        "defaultContractType": row[1],
        "defaultDuration": row[2],
        "renewalType": row[3],
        "reminderDays": row[4],
        "approvalRequired": row[5],
        "defaultOwner": row[6]
    }
@app.post("/settings/contract-defaults")
def add_contract_default(defaults: ContractDefaults):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO contract_defaults
        (
            default_contract_type,
            default_duration,
            renewal_type,
            reminder_days,
            approval_required,
            default_owner
        )
        VALUES
        (%s,%s,%s,%s,%s,%s)
        RETURNING id
    """,
    (
        defaults.defaultContractType,
        defaults.defaultDuration,
        defaults.renewalType,
        defaults.reminderDays,
        defaults.approvalRequired,
        defaults.defaultOwner
    ))

    default_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Contract defaults created successfully",
        "id": default_id
    }
@app.put("/settings/contract-defaults/{default_id}")
def update_contract_default(
    default_id: int,
    defaults: ContractDefaults
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE contract_defaults
        SET
            default_contract_type=%s,
            default_duration=%s,
            renewal_type=%s,
            reminder_days=%s,
            approval_required=%s,
            default_owner=%s
        WHERE id=%s
    """,
    (
        defaults.defaultContractType,
        defaults.defaultDuration,
        defaults.renewalType,
        defaults.reminderDays,
        defaults.approvalRequired,
        defaults.defaultOwner,
        default_id
    ))

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        raise HTTPException(
            status_code=404,
            detail="Contract defaults not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Contract defaults updated successfully"
    }
@app.delete("/settings/contract-defaults/{default_id}")
def delete_contract_default(default_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM contract_defaults WHERE id=%s",
        (default_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:

        cursor.close()
        conn.close()

        raise HTTPException(
            status_code=404,
            detail="Contract defaults not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Contract defaults deleted successfully"
    }
class Integration(BaseModel):

    name: str

    icon: str

    description: str

    connected: bool

    connectedSince: str
@app.get("/settings/integrations")
def get_integrations():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            icon,
            description,
            connected,
            connected_since
        FROM integration_settings
        ORDER BY id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "name": row[1],
            "icon": row[2],
            "description": row[3],
            "connected": row[4],
            "connectedSince": row[5]
        }
        for row in rows
    ]
@app.get("/settings/integrations/{integration_id}")
def get_integration(integration_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            icon,
            description,
            connected,
            connected_since
        FROM integration_settings
        WHERE id=%s
    """, (integration_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Integration not found"
        )

    return {
        "id": row[0],
        "name": row[1],
        "icon": row[2],
        "description": row[3],
        "connected": row[4],
        "connectedSince": row[5]
    }
@app.post("/settings/integrations")
def add_integration(integration: Integration):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO integration_settings
        (
            name,
            icon,
            description,
            connected,
            connected_since
        )
        VALUES
        (%s,%s,%s,%s,%s)
        RETURNING id
    """,
    (
        integration.name,
        integration.icon,
        integration.description,
        integration.connected,
        integration.connectedSince
    ))

    integration_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Integration created successfully",
        "id": integration_id
    }
@app.put("/settings/integrations/{integration_id}")
def update_integration(
    integration_id: int,
    integration: Integration
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE integration_settings
        SET
            name=%s,
            icon=%s,
            description=%s,
            connected=%s,
            connected_since=%s
        WHERE id=%s
    """,
    (
        integration.name,
        integration.icon,
        integration.description,
        integration.connected,
        integration.connectedSince,
        integration_id
    ))

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        raise HTTPException(
            status_code=404,
            detail="Integration not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Integration updated successfully"
    }
@app.delete("/settings/integrations/{integration_id}")
def delete_integration(integration_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM integration_settings WHERE id=%s",
        (integration_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:

        cursor.close()
        conn.close()

        raise HTTPException(
            status_code=404,
            detail="Integration not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Integration deleted successfully"
    }
class DangerZone(BaseModel):

    accountStatus: str

    deleteRequested: bool

    deleteReason: str
@app.get("/settings/danger-zone")
def get_danger_zone():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            account_status,
            delete_requested,
            delete_reason
        FROM danger_zone
        ORDER BY id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "accountStatus": row[1],
            "deleteRequested": row[2],
            "deleteReason": row[3]
        }
        for row in rows
    ]
@app.get("/settings/danger-zone/{danger_id}")
def get_danger_zone_by_id(danger_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            account_status,
            delete_requested,
            delete_reason
        FROM danger_zone
        WHERE id=%s
    """, (danger_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Danger Zone settings not found"
        )

    return {
        "id": row[0],
        "accountStatus": row[1],
        "deleteRequested": row[2],
        "deleteReason": row[3]
    }
@app.post("/settings/danger-zone")
def add_danger_zone(data: DangerZone):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO danger_zone
        (
            account_status,
            delete_requested,
            delete_reason
        )
        VALUES
        (%s,%s,%s)
        RETURNING id
    """,
    (
        data.accountStatus,
        data.deleteRequested,
        data.deleteReason
    ))

    danger_id = cursor.fetchone()[0]

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Danger Zone settings created successfully",
        "id": danger_id
    }
@app.put("/settings/danger-zone/{danger_id}")
def update_danger_zone(
    danger_id: int,
    data: DangerZone
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE danger_zone
        SET
            account_status=%s,
            delete_requested=%s,
            delete_reason=%s
        WHERE id=%s
    """,
    (
        data.accountStatus,
        data.deleteRequested,
        data.deleteReason,
        danger_id
    ))

    conn.commit()

    if cursor.rowcount == 0:

        cursor.close()
        conn.close()

        raise HTTPException(
            status_code=404,
            detail="Danger Zone settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Danger Zone settings updated successfully"
    }
@app.delete("/settings/danger-zone/{danger_id}")
def delete_danger_zone(danger_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM danger_zone WHERE id=%s",
        (danger_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:

        cursor.close()
        conn.close()

        raise HTTPException(
            status_code=404,
            detail="Danger Zone settings not found"
        )

    cursor.close()
    conn.close()

    return {
        "message": "Danger Zone settings deleted successfully"
    }