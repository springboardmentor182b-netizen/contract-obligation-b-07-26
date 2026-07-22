from pydantic import BaseModel, Field, field_validator
from src.database.core import get_connection
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from typing import List

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


@app.put("/obligations/{obligation_id}")
def update_obligation(obligation_id: str, updated: Obligation):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE obligations
        SET obligation=%s,
            contract=%s,
            owner=%s,
            priority=%s,
            status=%s,
            due_date=%s,
            description=%s
        WHERE id=%s
        """,
        (
            updated.obligation,
            updated.contract,
            updated.owner,
            updated.priority,
            updated.status,
            updated.dueDate,
            updated.description,
            obligation_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Obligation not found")

    cursor.close()
    conn.close()

    return {
        "message": "Obligation updated successfully",
        "data": updated,
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


# ==========================================================
# COMPLIANCE MONITORING — all data below is derived live from
# the real schema (contracts, obligations, compliance_records,
# users, audit_logs, contract_versions). No hardcoded values.
#
# compliance_level -> numeric score mapping used for scoring:
#   Compliant = 100, Pending = 70, Delayed = 50,
#   Non-Compliant = 20, High Risk = 10
# ==========================================================

SCORE_CASE_SQL = """
    CASE cr.compliance_level
        WHEN 'Compliant' THEN 100
        WHEN 'Pending' THEN 70
        WHEN 'Delayed' THEN 50
        WHEN 'Non-Compliant' THEN 20
        WHEN 'High Risk' THEN 10
        ELSE 50
    END
"""


@app.get("/api/compliance/overview")
def get_compliance_overview():
    conn = get_connection()
    cursor = conn.cursor()

    # latest compliance_level per contract
    cursor.execute(f"""
        SELECT DISTINCT ON (cr.contract_id)
            cr.contract_id, cr.compliance_level
        FROM compliance_records cr
        ORDER BY cr.contract_id, cr.checked_on DESC
    """)
    latest_rows = cursor.fetchall()

    breakdown = {}
    for _, level in latest_rows:
        breakdown[level] = breakdown.get(level, 0) + 1
    total = len(latest_rows)

    status_breakdown = [
        {
            "label": level,
            "count": count,
            "percentage": round((count / total) * 100) if total else 0,
        }
        for level, count in breakdown.items()
    ]

    score_map = {
        "Compliant": 100, "Pending": 70, "Delayed": 50,
        "Non-Compliant": 20, "High Risk": 10,
    }
    overall_score = (
        round(sum(score_map.get(level, 50) for _, level in latest_rows) / total)
        if total else 0
    )

    cursor.execute("""
        SELECT COUNT(*) FROM obligations
        WHERE priority IN ('High', 'Critical') AND status != 'Completed'
    """)
    open_risks = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*) FROM compliance_records
        WHERE compliance_level IN ('Non-Compliant', 'High Risk')
        AND checked_on >= CURRENT_DATE - INTERVAL '30 days'
    """)
    audit_findings = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*) FROM obligations
        WHERE due_date < CURRENT_DATE AND status != 'Completed'
    """)
    missed_obligations = cursor.fetchone()[0]

    cursor.execute("""
        SELECT u.department,
               100.0 * COUNT(*) FILTER (WHERE o.status = 'Completed') / NULLIF(COUNT(*), 0) AS score
        FROM obligations o
        JOIN users u ON u.id = o.assigned_to
        WHERE u.department IS NOT NULL
        GROUP BY u.department
    """)
    dept_rows = cursor.fetchall()
    dept_total = len(dept_rows)
    dept_compliant = sum(1 for _, score in dept_rows if (score or 0) >= 80)
    dept_avg_score = (
        round(sum((score or 0) for _, score in dept_rows) / dept_total)
        if dept_total else 0
    )

    cursor.execute("""
        SELECT COUNT(DISTINCT document_path) FROM contract_versions
        WHERE uploaded_at >= CURRENT_DATE - INTERVAL '30 days'
    """)
    reports_ready = cursor.fetchone()[0]

    cursor.execute(f"""
        SELECT to_char(date_trunc('month', cr.checked_on), 'Mon') AS month,
               AVG({SCORE_CASE_SQL}) AS score
        FROM compliance_records cr
        WHERE cr.checked_on >= CURRENT_DATE - INTERVAL '12 months'
        GROUP BY date_trunc('month', cr.checked_on), to_char(date_trunc('month', cr.checked_on), 'Mon')
        ORDER BY date_trunc('month', cr.checked_on)
    """)
    trend = [{"month": month, "score": round(float(score))} for month, score in cursor.fetchall()]

    cursor.close()
    conn.close()

    return {
        "overallScore": overall_score,
        "totalContracts": total,
        "statusBreakdown": status_breakdown,
        "kpis": {
            "complianceScore": overall_score,
            "openRisks": open_risks,
            "auditFindings": audit_findings,
            "missedObligations": missed_obligations,
            "deptAvgScore": dept_avg_score,
            "reportsReady": reports_ready,
        },
        "quickStats": {
            "openRisks": open_risks,
            "auditFindings": audit_findings,
            "missedObligations": missed_obligations,
            "compliantDepts": f"{dept_compliant}/{dept_total}",
        },
        "trend": trend,
    }


@app.get("/api/compliance/risk-indicators")
def get_risk_indicators():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT o.title, c.title AS contract_title, u.department, o.due_date, o.priority
        FROM obligations o
        JOIN contracts c ON c.id = o.contract_id
        LEFT JOIN users u ON u.id = o.assigned_to
        WHERE o.priority IN ('High', 'Critical') AND o.status != 'Completed'
        ORDER BY o.due_date ASC
        LIMIT 20
    """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return [
        {
            "title": title,
            "meta": f"{department or 'Unassigned'} \u00b7 {due_date}",
            "severity": "Critical" if priority == "Critical" else "High",
            "contract": contract_title,
        }
        for title, contract_title, department, due_date, priority in rows
    ]


@app.get("/api/compliance/audit-summary")
def get_audit_summary():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT COUNT(*) FROM compliance_records
        WHERE checked_on >= CURRENT_DATE - INTERVAL '90 days'
    """)
    audits_completed = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*) FROM compliance_records
        WHERE compliance_level IN ('Non-Compliant', 'High Risk', 'Delayed')
        AND checked_on >= CURRENT_DATE - INTERVAL '90 days'
    """)
    findings_raised = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*) FROM obligations
        WHERE status = 'Completed' AND completed_date >= CURRENT_DATE - INTERVAL '90 days'
    """)
    resolved_findings = cursor.fetchone()[0]

    open_findings = max(findings_raised - resolved_findings, 0)

    cursor.close()
    conn.close()

    return {
        "auditsCompleted": audits_completed,
        "findingsRaised": findings_raised,
        "resolvedFindings": resolved_findings,
        "openFindings": open_findings,
    }


@app.get("/api/compliance/departments")
def get_department_scores():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT u.department,
               ROUND(100.0 * COUNT(*) FILTER (WHERE o.status = 'Completed') / NULLIF(COUNT(*), 0)) AS score
        FROM obligations o
        JOIN users u ON u.id = o.assigned_to
        WHERE u.department IS NOT NULL
        GROUP BY u.department
        ORDER BY score DESC NULLS LAST
    """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return [
        {"department": department, "score": int(score) if score is not None else 0}
        for department, score in rows
    ]


@app.get("/api/compliance/missed-obligations")
def get_missed_obligations():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT o.title, o.due_date, u.first_name, u.last_name,
               (CURRENT_DATE - o.due_date) AS days_late
        FROM obligations o
        LEFT JOIN users u ON u.id = o.assigned_to
        WHERE o.due_date <= CURRENT_DATE AND o.status != 'Completed'
        ORDER BY o.due_date ASC
        LIMIT 20
    """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    result = []
    for title, due_date, first_name, last_name, days_late in rows:
        owner = f"{first_name or ''} {last_name or ''}".strip() or "Unassigned"
        status = "Due today" if days_late == 0 else f"{days_late}d late"
        result.append({
            "title": title,
            "due": f"Due {due_date}",
            "owner": owner,
            "status": status,
        })
    return result


@app.get("/api/compliance/history")
def get_compliance_history():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT cr.checked_on, c.title, o.title, cr.compliance_level, cr.remarks,
               u.first_name, u.last_name
        FROM compliance_records cr
        JOIN contracts c ON c.id = cr.contract_id
        JOIN obligations o ON o.id = cr.obligation_id
        LEFT JOIN users u ON u.id = cr.checked_by
        ORDER BY cr.checked_on DESC
        LIMIT 50
    """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return [
        {
            "checkedOn": str(checked_on),
            "contract": contract_title,
            "obligation": obligation_title,
            "complianceLevel": level,
            "remarks": remarks,
            "checkedBy": f"{first_name or ''} {last_name or ''}".strip() or "Unknown",
        }
        for checked_on, contract_title, obligation_title, level, remarks, first_name, last_name in rows
    ]


@app.get("/api/compliance/documents")
def get_compliance_documents():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT cv.document_path, cv.version_number, cv.uploaded_at, c.title,
               u.first_name, u.last_name
        FROM contract_versions cv
        JOIN contracts c ON c.id = cv.contract_id
        LEFT JOIN users u ON u.id = cv.uploaded_by
        ORDER BY cv.uploaded_at DESC
        LIMIT 50
    """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return [
        {
            "documentPath": path,
            "version": version,
            "uploadedAt": str(uploaded_at),
            "contract": contract_title,
            "uploadedBy": f"{first_name or ''} {last_name or ''}".strip() or "Unknown",
        }
        for path, version, uploaded_at, contract_title, first_name, last_name in rows
    ]


@app.get("/api/compliance/contracts")
def get_compliance_contracts():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT c.id, c.contract_no, c.title, c.category, c.status, c.end_date,
               latest.compliance_level
        FROM contracts c
        LEFT JOIN LATERAL (
            SELECT compliance_level FROM compliance_records cr
            WHERE cr.contract_id = c.id
            ORDER BY cr.checked_on DESC LIMIT 1
        ) latest ON true
        LEFT JOIN users owner ON owner.id = c.owner_id
        ORDER BY c.created_at DESC
        LIMIT 50
    """)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    risk_score_map = {
        "Compliant": 10, "Pending": 30, "Delayed": 50,
        "Non-Compliant": 75, "High Risk": 90,
    }
    result = []
    for contract_id, contract_no, title, category, lifecycle_status, end_date, level in rows:
        if lifecycle_status == "Expired":
            status = "Expired"
        elif level in ("Non-Compliant", "High Risk"):
            status = "At Risk"
        else:
            status = "Compliant"
        result.append({
            "id": contract_no,
            "name": title,
            "vendor": category or "\u2014",
            "owner": "\u2014",
            "status": status,
            "riskScore": risk_score_map.get(level, 30),
            "expiryDate": str(end_date) if end_date else "\u2014",
        })
    return result
