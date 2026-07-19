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
    return DashboardSummary(
        total_contracts=214,
        active_contracts=182,
        under_review=31,
        expiring_soon=3,
        pending_obligations=43,
        compliance_rate=91.4,
        high_risk=6,
    )


def get_compliance_levels():
    return [
        ComplianceLevel(name="Compliant", value=142),
        ComplianceLevel(name="Pending", value=28),
        ComplianceLevel(name="Delayed", value=19),
        ComplianceLevel(name="Non-Compliant", value=11),
        ComplianceLevel(name="High Risk", value=6),
    ]


def get_contract_growth():
    return [
        ContractGrowth(month="Jan", total=42, active=38),
        ContractGrowth(month="Feb", total=55, active=49),
        ContractGrowth(month="Mar", total=74, active=61),
        ContractGrowth(month="Apr", total=88, active=75),
        ContractGrowth(month="May", total=102, active=88),
        ContractGrowth(month="Jun", total=118, active=101),
        ContractGrowth(month="Jul", total=132, active=114),
        ContractGrowth(month="Aug", total=145, active=126),
        ContractGrowth(month="Sep", total=160, active=140),
        ContractGrowth(month="Oct", total=174, active=153),
        ContractGrowth(month="Nov", total=190, active=167),
        ContractGrowth(month="Dec", total=214, active=182),
    ]


def get_contract_status():
    return [
        ContractStatus(status="Active", count=182),
        ContractStatus(status="Expired", count=14),
        ContractStatus(status="Pending", count=12),
        ContractStatus(status="Draft", count=6),
    ]


def get_upcoming_renewals():
    return [
        UpcomingRenewal(
            name="Office Lease – Floor 12 & 13",
            owner="Tom Weston",
            expiry="2024-12-31",
            days=26,
            risk="High Risk",
        ),
        UpcomingRenewal(
            name="Microsoft Azure Enterprise Agreement",
            owner="Sarah Chen",
            expiry="2025-03-15",
            days=52,
            risk="Medium Risk",
        ),
        UpcomingRenewal(
            name="Data Processing Agreement – EU",
            owner="James Park",
            expiry="2025-05-20",
            days=78,
            risk="Low Risk",
        ),
    ]

def get_recent_contracts():
    return [
        RecentContract(
            contract_id="CTR-2024-001",
            name="Microsoft Azure Enterprise Agreement",
            category="Vendor",
            department="IT",
            owner="Sarah Chen",
            status="Active",
            renewal="2025-03-15",
            renewal_version="v3.1",
        ),
        RecentContract(
            contract_id="CTR-2024-002",
            name="Goldman Sachs Advisory Services",
            category="Service",
            department="Finance",
            owner="Marcus Reid",
            status="Under Review",
            renewal="2025-06-22",
            renewal_version="v1.0",
        ),
        RecentContract(
            contract_id="CTR-2024-003",
            name="Senior VP Employment Agreement",
            category="Employment",
            department="HR",
            owner="Priya Nair",
            status="Active",
            renewal="2026-01-10",
            renewal_version="v2.0",
        ),
        RecentContract(
            contract_id="CTR-2024-004",
            name="Office Lease - Floor 12 & 13",
            category="Lease",
            department="Operations",
            owner="Tom Weston",
            status="Expired",
            renewal="2024-12-31",
            renewal_version="v1.2",
        ),
        RecentContract(
            contract_id="CTR-2024-005",
            name="Supplier NDA - Techparts Ltd",
            category="NDA",
            department="Procurement",
            owner="Dana Kim",
            status="Active",
            renewal="2025-09-01",
            renewal_version="v1.0",
        ),
        RecentContract(
            contract_id="CTR-2024-006",
            name="SaaS Platform License - Salesforce",
            category="Vendor",
            department="Sales",
            owner="Alex Ruiz",
            status="Active",
            renewal="2025-07-15",
            renewal_version="v4.0",
        ),
        RecentContract(
            contract_id="CTR-2024-007",
            name="Strategic Partnership - Deloitte",
            category="Partnership",
            department="Legal",
            owner="Nia Foster",
            status="Draft",
            renewal="2026-03-30",
            renewal_version="v0.3",
        ),
        RecentContract(
            contract_id="CTR-2024-008",
            name="Data Processing Agreement - EU",
            category="Compliance",
            department="Legal",
            owner="James Park",
            status="Active",
            renewal="2025-05-20",
            renewal_version="v2.1",
        ),
    ]

def get_contracts_by_department():
    return[
        ContractByDepartment(department="Legal",compliance=54),
        ContractByDepartment(department="Procurement",compliance=38),
        ContractByDepartment(department="HR",compliance=29),
        ContractByDepartment(department="Finance",compliance=43),
        ContractByDepartment(department="IT",compliance=22),
        ContractByDepartment(department="Operations",compliance=18),
    ]

def get_recent_activity():
    return [
        RecentActivity(
            title="Contract uploaded",
            description="Goldman Sachs Advisory Services uploaded by Marcus Reid",
            time="2 min ago",
            type="upload",
        ),
        RecentActivity(
            title="Contract approved",
            description="SaaS Platform License – Salesforce approved by CEO",
            time="18 min ago",
            type="approved",
        ),
        RecentActivity(
            title="Renewal reminder sent",
            description="Office Lease – Floor 12 & 13 renewal reminder dispatched",
            time="1 hr ago",
            type="reminder",
        ),
        RecentActivity(
            title="Compliance issue detected",
            description="Data Processing Agreement flagged for GDPR gap",
            time="3 hr ago",
            type="warning",
        ),
        RecentActivity(
            title="New user added",
            description="Priya Nair added as Contract Owner role",
            time="Yesterday",
            type="user",
        ),
        RecentActivity(
            title="Version updated",
            description="Senior VP Employment Agreement updated to v2.0",
            time="Yesterday",
            type="history",
        ),
    ]

def get_compliance_summary():
    return [
        ComplianceSummaryItem(name="Compliant", value=142),
        ComplianceSummaryItem(name="Pending", value=28),
        ComplianceSummaryItem(name="Delayed", value=19),
        ComplianceSummaryItem(name="Non-Compliant", value=11),
        ComplianceSummaryItem(name="High Risk", value=6),
    ]