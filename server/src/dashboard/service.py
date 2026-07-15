from .models import (
    DashboardSummary,
    ComplianceLevel,
    ContractGrowth,
    ContractStatus,
    UpcomingRenewal,
    RecentContract,
)


def get_dashboard_summary():
    return DashboardSummary(
        total_contracts=214,
        active_contracts=182,
        expiring_soon=3,
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
            contract_id="CTR-1001",
            name="Cloud Service Agreement",
            department="IT",
            owner="Sarah Chen",
            status="Active",
            renewal_version="V2.1",
        ),
        RecentContract(
            contract_id="CTR-1002",
            name="Office Lease",
            department="Admin",
            owner="Tom Weston",
            status="Pending",
            renewal_version="V1.0",
        ),
    ]