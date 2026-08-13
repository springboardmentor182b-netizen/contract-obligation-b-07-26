from src.database.core import get_connection
from .models import (
    DashboardSummary,
    ComplianceLevel,
    ContractGrowth,
    ContractStatus,
    UpcomingRenewal,
    RecentContract,
    ContractByDepartment,
    RecentActivity,
    ComplianceSummaryItem,
)

def get_dashboard_summary():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            total_contracts,
            active_contracts,
            under_review,
            expiring_soon,
            pending_obligations,
            compliance_rate,
            high_risk
        FROM dashboard_summary
        ORDER BY id DESC
        LIMIT 1
    """)

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    return DashboardSummary(
        total_contracts=row[0],
        active_contracts=row[1],
        under_review=row[2],
        expiring_soon=row[3],
        pending_obligations=row[4],
        compliance_rate=float(row[5]),
        high_risk=row[6],
    )

def get_compliance_levels():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT name, value
        FROM compliance_levels
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        ComplianceLevel(
            name=row[0],
            value=row[1],
        )
        for row in rows
    ]


def get_contract_growth():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT month, total, active
        FROM contract_growth
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        ContractGrowth(
            month=row[0],
            total=row[1],
            active=row[2],
        )
        for row in rows
    ]

def get_contract_status():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT status, count
        FROM contract_status
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        ContractStatus(
            status=row[0],
            count=row[1],
        )
        for row in rows
    ]

def get_upcoming_renewals():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            name,
            owner,
            expiry,
            days,
            risk
        FROM upcoming_renewals
        ORDER BY expiry;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        UpcomingRenewal(
            name=row[0],
            owner=row[1],
            expiry=str(row[2]),
            days=row[3],
            risk=row[4],
        )
        for row in rows
    ]

def get_recent_contracts():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            contract_id,
            name,
            category,
            department,
            owner,
            status,
            renewal,
            renewal_version
        FROM recent_contracts
        ORDER BY contract_id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        RecentContract(
            contract_id=row[0],
            name=row[1],
            category=row[2],
            department=row[3],
            owner=row[4],
            status=row[5],
            renewal=str(row[6]),
            renewal_version=row[7],
        )
        for row in rows
    ]

def get_contracts_by_department():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT department, compliance
        FROM contracts_by_department
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        ContractByDepartment(
            department=row[0],
            compliance=row[1],
        )
        for row in rows
    ]

def get_recent_activity():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT title,
               description,
               activity_time,
               activity_type
        FROM recent_activity
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        RecentActivity(
            title=row[0],
            description=row[1],
            time=row[2],
            type=row[3],
        )
        for row in rows
    ]

def get_compliance_summary():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT name, value
        FROM compliance_summary
        ORDER BY id;
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        ComplianceSummaryItem(
            name=row[0],
            value=row[1],
        )
        for row in rows
    ]