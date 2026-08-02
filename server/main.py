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