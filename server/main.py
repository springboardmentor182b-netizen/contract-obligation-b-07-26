from pydantic import BaseModel, Field, field_validator
from src.database.core import get_connection
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from typing import Optional
import json

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

    firstName: str = Field(..., min_length=2)

    lastName: str = Field(..., min_length=2)

    email: str

    phone: Optional[str] = None

    jobTitle: Optional[str] = None

    department: Optional[str] = None

    employeeId: Optional[str] = None

    bio: Optional[str] = None

    language: Optional[str] = None

    timezone: Optional[str] = None

    dateFormat: Optional[str] = None

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
            "firstName": row[1],
            "lastName": row[2],
            "email": row[3],
            "phone": row[4],
            "jobTitle": row[5],
            "department": row[6],
            "employeeId": row[7],
            "bio": row[8],
            "language": row[9],
            "timezone": row[10],
            "dateFormat": row[11],
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
        WHERE id=%s
    """,(profile_id,))


    row = cursor.fetchone()


    cursor.close()
    conn.close()


    if not row:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )


    return [
    {
        "id": row[0],
        "firstName": row[1],
        "lastName": row[2],
        "email": row[3],
        "phone": row[4],
        "jobTitle": row[5],
        "department": row[6],
        "employeeId": row[7],
        "bio": row[8],
        "language": row[9],
        "timezone": row[10],
        "dateFormat": row[11],
        "currency": row[12]
    }
    for row in rows
]
@app.post("/settings/profile")
def add_profile(profile: Profile):

    conn = get_connection()
    cursor = conn.cursor()


    cursor.execute("""
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
            %s,%s,%s,%s,
            %s,%s,%s,%s,
            %s,%s,%s,%s
        )
        RETURNING id
    """,
    (
        profile.firstName,
        profile.lastName,
        profile.email,
        profile.phone,
        profile.jobTitle,
        profile.department,
        profile.employeeId,
        profile.bio,
        profile.language,
        profile.timezone,
        profile.dateFormat,
        profile.currency
    ))


    profile_id = cursor.fetchone()[0]

    conn.commit()


    cursor.close()
    conn.close()


    return {
        "message":"Profile created successfully",
        "id":profile_id
    }
@app.put("/settings/profile/{profile_id}")
def update_profile(
    profile_id:int,
    profile:Profile
):

    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute("""
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
        profile.firstName,
        profile.lastName,
        profile.email,
        profile.phone,
        profile.jobTitle,
        profile.department,
        profile.employeeId,
        profile.bio,
        profile.language,
        profile.timezone,
        profile.dateFormat,
        profile.currency,
        profile_id
    ))


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
        "message":"Profile updated successfully"
    }
@app.delete("/settings/profile/{profile_id}")
def delete_profile(profile_id:int):

    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute(
        """
        DELETE FROM profile_settings
        WHERE id=%s
        """,
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
        "message":"Profile deleted successfully"
    }
class Organization(BaseModel):

    organization_name: str = Field(..., min_length=2)

    legal_entity_name: str

    industry: str

    employees: str

    headquarters: str

    website: str

    tax_id: str
@app.get("/settings/organization")
def get_organizations():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            organization_name,
            legal_entity_name,
            industry,
            employees,
            headquarters,
            website,
            tax_id
        FROM organization_settings
        ORDER BY id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "organization_name": row[1],
            "legal_entity_name": row[2],
            "industry": row[3],
            "employees": row[4],
            "headquarters": row[5],
            "website": row[6],
            "tax_id": row[7]
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
            legal_entity_name,
            industry,
            employees,
            headquarters,
            website,
            tax_id
        FROM organization_settings
        WHERE id=%s
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
        "legal_entity_name": row[2],
        "industry": row[3],
        "employees": row[4],
        "headquarters": row[5],
        "website": row[6],
        "tax_id": row[7]
    }
@app.post("/settings/organization")
def add_organization(organization: Organization):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO organization_settings
        (
            organization_name,
            legal_entity_name,
            industry,
            employees,
            headquarters,
            website,
            tax_id
        )
        VALUES
        (
            %s,%s,%s,%s,%s,%s,%s
        )
        RETURNING id
    """,
    (
        organization.organization_name,
        organization.legal_entity_name,
        organization.industry,
        organization.employees,
        organization.headquarters,
        organization.website,
        organization.tax_id
    ))

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

    cursor.execute("""
        UPDATE organization_settings
        SET
            organization_name=%s,
            legal_entity_name=%s,
            industry=%s,
            employees=%s,
            headquarters=%s,
            website=%s,
            tax_id=%s
        WHERE id=%s
    """,
    (
        organization.organization_name,
        organization.legal_entity_name,
        organization.industry,
        organization.employees,
        organization.headquarters,
        organization.website,
        organization.tax_id,
        organization_id
    ))

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
            "currentPassword": row[1],
            "newPassword": row[2],
            "twoFactor": row[3],
            "sessionAlerts": row[4]
        }
        for row in rows
    ]
@app.get("/settings/security/{security_id}")
def get_security(security_id:int):

    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute("""
        SELECT
            id,
            current_password,
            new_password,
            two_factor_enabled,
            login_alerts
        FROM security_settings
        WHERE id=%s
    """,(security_id,))


    row=cursor.fetchone()


    cursor.close()
    conn.close()


    if not row:
        raise HTTPException(
            status_code=404,
            detail="Security not found"
        )


    return {

        "id":row[0],

        "currentPassword":row[1],

        "newPassword":row[2],

        "twoFactor":row[3],

        "sessionAlerts":row[4]

    }
@app.post("/settings/security")
def add_security(security:Security):

    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute("""
        INSERT INTO security_settings
        (
            current_password,
            new_password,
            two_factor_enabled,
            login_alerts
        )
        VALUES
        (%s,%s,%s,%s)
        RETURNING id
    """,
    (
        security.current_password,
        security.new_password,
        security.two_factor_enabled,
        security.login_alerts
    ))


    security_id=cursor.fetchone()[0]


    conn.commit()


    cursor.close()
    conn.close()


    return {

        "message":"Security saved successfully",

        "id":security_id

    }
@app.put("/settings/security/{security_id}")
def update_security(
    security_id:int,
    security:Security
):

    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute("""
        UPDATE security_settings
        SET
            current_password=%s,
            new_password=%s,
            two_factor_enabled=%s,
            login_alerts=%s
        WHERE id=%s

    """,
    (
        security.current_password,
        security.new_password,
        security.two_factor_enabled,
        security.login_alerts,
        security_id
    ))


    conn.commit()


    if cursor.rowcount==0:

        raise HTTPException(
            status_code=404,
            detail="Security not found"
        )


    cursor.close()
    conn.close()


    return {

        "message":"Security updated successfully"

    }
@app.delete("/settings/security/{security_id}")
def delete_security(security_id:int):

    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute(
        """
        DELETE FROM security_settings
        WHERE id=%s
        """,
        (security_id,)
    )


    conn.commit()


    if cursor.rowcount==0:

        raise HTTPException(
            status_code=404,
            detail="Security not found"
        )


    cursor.close()
    conn.close()


    return {

        "message":"Security deleted successfully"

    }
class Notification(BaseModel):
    renewal: bool
    obligation: bool
    approval: bool
    compliance: bool
    activity: bool
    security: bool
    system: bool
    inApp: bool
    email: bool
    slack: bool
    sms: bool
@app.get("/settings/notifications")
def get_notifications():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            renewal,
            obligation,
            approval,
            compliance,
            activity,
            security,
            system,
            in_app,
            email,
            slack,
            sms
        FROM notification_settings
        ORDER BY id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "renewal": row[1],
            "obligation": row[2],
            "approval": row[3],
            "compliance": row[4],
            "activity": row[5],
            "security": row[6],
            "system": row[7],
            "inApp": row[8],
            "email": row[9],
            "slack": row[10],
            "sms": row[11]
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
            renewal,
            obligation,
            approval,
            compliance,
            activity,
            security,
            system,
            in_app,
            email,
            slack,
            sms
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
        "renewal": row[1],
        "obligation": row[2],
        "approval": row[3],
        "compliance": row[4],
        "activity": row[5],
        "security": row[6],
        "system": row[7],
        "inApp": row[8],
        "email": row[9],
        "slack": row[10],
        "sms": row[11]
    }
@app.post("/settings/notifications")
def add_notification(notification: Notification):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO notification_settings
        (
            renewal,
            obligation,
            approval,
            compliance,
            activity,
            security,
            system,
            in_app,
            email,
            slack,
            sms
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING id
    """,
    (
        notification.renewal,
        notification.obligation,
        notification.approval,
        notification.compliance,
        notification.activity,
        notification.security,
        notification.system,
        notification.inApp,
        notification.email,
        notification.slack,
        notification.sms
    ))

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

    cursor.execute("""
        UPDATE notification_settings
        SET
            renewal=%s,
            obligation=%s,
            approval=%s,
            compliance=%s,
            activity=%s,
            security=%s,
            system=%s,
            in_app=%s,
            email=%s,
            slack=%s,
            sms=%s
        WHERE id=%s
    """,
    (
        notification.renewal,
        notification.obligation,
        notification.approval,
        notification.compliance,
        notification.activity,
        notification.security,
        notification.system,
        notification.inApp,
        notification.email,
        notification.slack,
        notification.sms,
        notification_id
    ))

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
    sidebarWidth: str
    tableDensity: str
    pageSize: str
    stickyHeader: bool
    avatars: bool
    animations: bool
    accent: str
@app.get("/settings/appearance")
def get_appearance_settings():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            theme,
            sidebar_width,
            table_density,
            page_size,
            sticky_header,
            avatars,
            animations,
            accent
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
            "sidebarWidth": row[2],
            "tableDensity": row[3],
            "pageSize": row[4],
            "stickyHeader": row[5],
            "avatars": row[6],
            "animations": row[7],
            "accent": row[8]
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
            sidebar_width,
            table_density,
            page_size,
            sticky_header,
            avatars,
            animations,
            accent
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
        "sidebarWidth": row[2],
        "tableDensity": row[3],
        "pageSize": row[4],
        "stickyHeader": row[5],
        "avatars": row[6],
        "animations": row[7],
        "accent": row[8]
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
            sidebar_width,
            table_density,
            page_size,
            sticky_header,
            avatars,
            animations,
            accent
        )
        VALUES
        (
            %s,%s,%s,%s,%s,%s,%s,%s
        )
        RETURNING id
        """,
        (
            appearance.theme,
            appearance.sidebarWidth,
            appearance.tableDensity,
            appearance.pageSize,
            appearance.stickyHeader,
            appearance.avatars,
            appearance.animations,
            appearance.accent,
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
            sidebar_width=%s,
            table_density=%s,
            page_size=%s,
            sticky_header=%s,
            avatars=%s,
            animations=%s,
            accent=%s
        WHERE id=%s
        """,
        (
            appearance.theme,
            appearance.sidebarWidth,
            appearance.tableDensity,
            appearance.pageSize,
            appearance.stickyHeader,
            appearance.avatars,
            appearance.animations,
            appearance.accent,
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


# Pydantic Model

class Integration(BaseModel):

    name: str

    icon: str

    description: str

    connected: bool

    since: Optional[str] = None



# GET ALL INTEGRATIONS

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
            since
        FROM integration_settings
        ORDER BY id;
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
            "since": row[5]
        }
        for row in rows
    ]



# GET SINGLE INTEGRATION

@app.get("/settings/integrations/{integration_id}")
def get_integration(integration_id:int):

    conn = get_connection()
    cursor = conn.cursor()


    cursor.execute("""
        SELECT
            id,
            name,
            icon,
            description,
            connected,
            since
        FROM integration_settings
        WHERE id=%s
    """,(integration_id,))


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
        "since": row[5]

    }



# CREATE INTEGRATION

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
            since
        )
        VALUES
        (
            %s,%s,%s,%s,%s
        )
        RETURNING id
    """,
    (
        integration.name,
        integration.icon,
        integration.description,
        integration.connected,
        integration.since
    ))


    integration_id = cursor.fetchone()[0]


    conn.commit()


    cursor.close()
    conn.close()


    return {

        "message":"Integration created successfully",

        "id":integration_id

    }



# UPDATE INTEGRATION

@app.put("/settings/integrations/{integration_id}")
def update_integration(
    integration_id:int,
    integration:Integration
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

            since=%s,

            updated_at=CURRENT_TIMESTAMP

        WHERE id=%s

    """,
    (
        integration.name,
        integration.icon,
        integration.description,
        integration.connected,
        integration.since,
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

        "message":"Integration updated successfully"

    }



# DELETE INTEGRATION

@app.delete("/settings/integrations/{integration_id}")
def delete_integration(integration_id:int):

    conn = get_connection()
    cursor = conn.cursor()


    cursor.execute("""
        DELETE FROM integration_settings
        WHERE id=%s
    """,
    (integration_id,))


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

        "message":"Integration deleted successfully"

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
    critical: str
    warning: str
    calculation: str
    frequency: str
    gdpr: bool
    sox: bool
    iso: bool
    hipaa: bool
    pci: bool
    ccpa: bool
@app.get("/settings/compliance")
def get_compliance_settings():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            critical,
            warning,
            calculation,
            frequency,
            gdpr,
            sox,
            iso,
            hipaa,
            pci,
            ccpa
        FROM compliance_settings
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "critical": row[1],
            "warning": row[2],
            "calculation": row[3],
            "frequency": row[4],
            "gdpr": row[5],
            "sox": row[6],
            "iso": row[7],
            "hipaa": row[8],
            "pci": row[9],
            "ccpa": row[10],
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
            critical,
            warning,
            calculation,
            frequency,
            gdpr,
            sox,
            iso,
            hipaa,
            pci,
            ccpa
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
        "critical": row[1],
        "warning": row[2],
        "calculation": row[3],
        "frequency": row[4],
        "gdpr": row[5],
        "sox": row[6],
        "iso": row[7],
        "hipaa": row[8],
        "pci": row[9],
        "ccpa": row[10],
    }
@app.post("/settings/compliance")
def add_compliance_setting(compliance: Compliance):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO compliance_settings
        (
            critical,
            warning,
            calculation,
            frequency,
            gdpr,
            sox,
            iso,
            hipaa,
            pci,
            ccpa
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING id
    """,
    (
        compliance.critical,
        compliance.warning,
        compliance.calculation,
        compliance.frequency,
        compliance.gdpr,
        compliance.sox,
        compliance.iso,
        compliance.hipaa,
        compliance.pci,
        compliance.ccpa,
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
            critical=%s,
            warning=%s,
            calculation=%s,
            frequency=%s,
            gdpr=%s,
            sox=%s,
            iso=%s,
            hipaa=%s,
            pci=%s,
            ccpa=%s
        WHERE id=%s
    """,
    (
        compliance.critical,
        compliance.warning,
        compliance.calculation,
        compliance.frequency,
        compliance.gdpr,
        compliance.sox,
        compliance.iso,
        compliance.hipaa,
        compliance.pci,
        compliance.ccpa,
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
    category: str
    status: str
    law: str
    numbering: str
    renewal: str
    reminder90: bool
    reminder60: bool
    reminder30: bool
    reminder14: bool
    autoArchive: bool
    workflow: list[str]
@app.get("/settings/contract-defaults")
def get_contract_defaults():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            category,
            status,
            law,
            numbering,
            renewal,
            reminder90,
            reminder60,
            reminder30,
            reminder14,
            auto_archive,
            workflow
        FROM contract_defaults
        ORDER BY id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "category": row[1],
            "status": row[2],
            "law": row[3],
            "numbering": row[4],
            "renewal": row[5],
            "reminder90": row[6],
            "reminder60": row[7],
            "reminder30": row[8],
            "reminder14": row[9],
            "autoArchive": row[10],
            "workflow": row[11]
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
            category,
            status,
            law,
            numbering,
            renewal,
            reminder90,
            reminder60,
            reminder30,
            reminder14,
            auto_archive,
            workflow
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
        "category": row[1],
        "status": row[2],
        "law": row[3],
        "numbering": row[4],
        "renewal": row[5],
        "reminder90": row[6],
        "reminder60": row[7],
        "reminder30": row[8],
        "reminder14": row[9],
        "autoArchive": row[10],
        "workflow": row[11]
    }
@app.post("/settings/contract-defaults")
def add_contract_default(defaults: ContractDefaults):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO contract_defaults
        (
            category,
            status,
            law,
            numbering,
            renewal,
            reminder90,
            reminder60,
            reminder30,
            reminder14,
            auto_archive,
            workflow
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING id
    """,
    (
        defaults.category,
        defaults.status,
        defaults.law,
        defaults.numbering,
        defaults.renewal,
        defaults.reminder90,
        defaults.reminder60,
        defaults.reminder30,
        defaults.reminder14,
        defaults.autoArchive,
        json.dumps(defaults.workflow)
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
            category=%s,
            status=%s,
            law=%s,
            numbering=%s,
            renewal=%s,
            reminder90=%s,
            reminder60=%s,
            reminder30=%s,
            reminder14=%s,
            auto_archive=%s,
            workflow=%s
        WHERE id=%s
    """,
    (
        defaults.category,
        defaults.status,
        defaults.law,
        defaults.numbering,
        defaults.renewal,
        defaults.reminder90,
        defaults.reminder60,
        defaults.reminder30,
        defaults.reminder14,
        defaults.autoArchive,
        json.dumps(defaults.workflow),
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