def get_dashboard_summary():
    return {
        "activeContracts": 25,
        "pendingObligations": 8,
        "upcomingRenewals": 5,
        "complianceScore": 96
    }


def get_recent_activities():
    return [
        {
            "id": 1,
            "title": "Contract Created",
            "time": "10 minutes ago"
        },
        {
            "id": 2,
            "title": "Profile Updated",
            "time": "1 hour ago"
        }
    ]


def get_notifications():
    return [
        {
            "id": 1,
            "message": "Contract renewal due tomorrow",
            "status": "Unread"
        }
    ]


def get_deadlines():
    return [
        {
            "id": 1,
            "title": "NDA Renewal",
            "date": "2026-07-20"
        }
    ]


def get_profile():
    return {
        "name": "Demo User",
        "role": "Legal Manager",
        "department": "Compliance"
    }