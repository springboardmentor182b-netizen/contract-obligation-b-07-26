from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard/metrics")
def get_metrics():

    return {
        "overallCompliance": 50,
        "missedDeadlines": 3,
        "riskFlags": 5,
        "auditsCompleted": "18/22"
    }


@router.get("/dashboard/departments")
def get_departments():

    return [
        {
            "department": "Legal",
            "score": 98
        },
        {
            "department": "Finance",
            "score": 91
        },
        {
            "department": "HR",
            "score": 87
        },
        {
            "department": "IT",
            "score": 95
        },
        {
            "department": "Operations",
            "score": 80
        },
        {
            "department": "Procurement",
            "score": 89
        }
    ]
@router.get("/dashboard/risk-trend")
def get_risk_trend():

    return [
        {
            "month": "Jan",
            "risk": 85
        },
        {
            "month": "Feb",
            "risk": 78
        },
        {
            "month": "Mar",
            "risk": 45
        },
        {
            "month": "Apr",
            "risk": 70
        },
        {
            "month": "May",
            "risk": 75
        },
        {
            "month": "Jun",
            "risk": 65
        }
    ]
@router.get("/dashboard/audits")
def get_audits():

    return [
        {
            "audit": "Q2 Vendor Contracts Audit",
            "department": "Procurement",
            "auditor": "David Park",
            "status": "Completed",
            "score": 97
        },
        {
            "audit": "GDPR Compliance Audit",
            "department": "IT",
            "auditor": "Sarah Chen",
            "status": "In Progress",
            "score": 85
        },
        {
            "audit": "HR Policy Review",
            "department": "HR",
            "auditor": "John Smith",
            "status": "Terminated",
            "score": 60
        }
    ]
@router.get("/dashboard/risks")
def get_risks():

    return [
        {
            "title": "Expired Contracts",
            "level": "High",
            "count": 2
        },
        {
            "title": "Contracts Without Owner",
            "level": "Medium",
            "count": 7
        },
        {
            "title": "Past Due Obligations",
            "level": "High",
            "count": 3
        },
        {
            "title": "Missing Documentation",
            "level": "Medium",
            "count": 5
        },
        {
            "title": "Renewal Notices",
            "level": "Low",
            "count": 4
        }
    ]