import math
from typing import Optional, List

# ---------------------------------------------------------------------------
# Mock data – replace with real DB queries when a database is connected
# ---------------------------------------------------------------------------

MOCK_USERS = [
    {"id": 1,  "name": "John Smith",       "email": "john.smith@company.com",       "role": "Admin",      "department": "Legal",      "status": "Active",   "last_login": "2 mins ago"},
    {"id": 2,  "name": "Sarah Johnson",    "email": "sarah.johnson@company.com",    "role": "Manager",    "department": "Compliance", "status": "Active",   "last_login": "10 mins ago"},
    {"id": 3,  "name": "David Miller",     "email": "david.miller@company.com",     "role": "Viewer",     "department": "Finance",    "status": "Inactive", "last_login": "Yesterday"},
    {"id": 4,  "name": "Emily Brown",      "email": "emily.brown@company.com",      "role": "Editor",     "department": "Contracts",  "status": "Active",   "last_login": "1 hour ago"},
    {"id": 5,  "name": "Michael Davis",    "email": "michael.davis@company.com",    "role": "Manager",    "department": "Legal",      "status": "Active",   "last_login": "30 mins ago"},
    {"id": 6,  "name": "Amanda Wilson",    "email": "amanda.wilson@company.com",    "role": "Viewer",     "department": "Finance",    "status": "Blocked",  "last_login": "3 days ago"},
    {"id": 7,  "name": "Robert Taylor",    "email": "robert.taylor@company.com",    "role": "Editor",     "department": "Compliance", "status": "Active",   "last_login": "5 mins ago"},
    {"id": 8,  "name": "Jessica Anderson", "email": "jessica.anderson@company.com", "role": "Admin",      "department": "Legal",      "status": "Active",   "last_login": "Just now"},
    {"id": 9,  "name": "Christopher Lee",  "email": "chris.lee@company.com",        "role": "Viewer",     "department": "Contracts",  "status": "Inactive", "last_login": "2 days ago"},
    {"id": 10, "name": "Natalie Martinez", "email": "natalie.m@company.com",        "role": "Manager",    "department": "Finance",    "status": "Active",   "last_login": "15 mins ago"},
    {"id": 11, "name": "Daniel White",     "email": "daniel.white@company.com",     "role": "Viewer",     "department": "Compliance", "status": "Active",   "last_login": "1 hour ago"},
    {"id": 12, "name": "Olivia Harris",    "email": "olivia.harris@company.com",    "role": "Editor",     "department": "Legal",      "status": "Blocked",  "last_login": "1 week ago"},
    {"id": 13, "name": "James Thompson",   "email": "james.t@company.com",          "role": "Viewer",     "department": "Finance",    "status": "Active",   "last_login": "45 mins ago"},
    {"id": 14, "name": "Sophia Garcia",    "email": "sophia.garcia@company.com",    "role": "Manager",    "department": "Contracts",  "status": "Active",   "last_login": "3 hours ago"},
    {"id": 15, "name": "William Jackson",  "email": "will.jackson@company.com",     "role": "Editor",     "department": "Compliance", "status": "Inactive", "last_login": "4 days ago"},
    {"id": 16, "name": "Ava Robinson",     "email": "ava.robinson@company.com",     "role": "Viewer",     "department": "Legal",      "status": "Active",   "last_login": "20 mins ago"},
    {"id": 17, "name": "Ethan Walker",     "email": "ethan.walker@company.com",     "role": "Admin",      "department": "Finance",    "status": "Active",   "last_login": "Just now"},
    {"id": 18, "name": "Isabella Lewis",   "email": "isabella.l@company.com",       "role": "Viewer",     "department": "Contracts",  "status": "Blocked",  "last_login": "5 days ago"},
    {"id": 19, "name": "Mason Allen",      "email": "mason.allen@company.com",      "role": "Editor",     "department": "Legal",      "status": "Active",   "last_login": "2 hours ago"},
    {"id": 20, "name": "Mia Young",        "email": "mia.young@company.com",        "role": "Manager",    "department": "Compliance", "status": "Active",   "last_login": "8 mins ago"},
    {"id": 21, "name": "Lucas Scott",      "email": "lucas.scott@company.com",      "role": "Viewer",     "department": "Finance",    "status": "Active",   "last_login": "1 day ago"},
    {"id": 22, "name": "Harper King",      "email": "harper.king@company.com",      "role": "Editor",     "department": "Contracts",  "status": "Inactive", "last_login": "6 days ago"},
    {"id": 23, "name": "Liam Wright",      "email": "liam.wright@company.com",      "role": "Viewer",     "department": "Legal",      "status": "Active",   "last_login": "3 hours ago"},
    {"id": 24, "name": "Charlotte Lopez",  "email": "charlotte.l@company.com",      "role": "Manager",    "department": "Finance",    "status": "Blocked",  "last_login": "2 weeks ago"},
    {"id": 25, "name": "Noah Hill",        "email": "noah.hill@company.com",        "role": "Admin",      "department": "Compliance", "status": "Active",   "last_login": "10 mins ago"},
]


def get_users(
    search: Optional[str] = None,
    role: Optional[str] = None,
    status: Optional[str] = None,
    department: Optional[str] = None,
    sort_by: str = "name",
    sort_order: str = "asc",
    page: int = 1,
    per_page: int = 10,
):
    data = MOCK_USERS[:]

    # Search
    if search:
        q = search.lower()
        data = [
            u for u in data
            if q in u["name"].lower() or q in u["email"].lower()
        ]

    # Filters
    if role and role != "all":
        data = [u for u in data if u["role"].lower() == role.lower()]
    if status and status != "all":
        data = [u for u in data if u["status"].lower() == status.lower()]
    if department and department != "all":
        data = [u for u in data if u["department"].lower() == department.lower()]

    # Sort
    reverse = sort_order.lower() == "desc"
    valid_sort_keys = {"name", "email", "role", "department", "status"}
    key = sort_by if sort_by in valid_sort_keys else "name"
    data.sort(key=lambda u: u[key].lower(), reverse=reverse)

    total = len(data)
    total_pages = max(1, math.ceil(total / per_page))
    start = (page - 1) * per_page
    paginated = data[start: start + per_page]

    return {
        "users": paginated,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
    }


def get_user_stats():
    total = len(MOCK_USERS)
    active = sum(1 for u in MOCK_USERS if u["status"] == "Active")
    blocked = sum(1 for u in MOCK_USERS if u["status"] == "Blocked")
    new_reg = 12  # Simulated: new registrations this month
    new_vs_last = 4  # Simulated: +4 vs last month

    return {
        "total_users": total,
        "active_users": active,
        "new_registrations": new_reg,
        "blocked_users": blocked,
        "active_percentage": round(active / total * 100, 1),
        "blocked_percentage": round(blocked / total * 100, 1),
        "new_vs_last_month": new_vs_last,
    }


def get_role_distribution():
    roles: dict[str, int] = {}
    for u in MOCK_USERS:
        roles[u["role"]] = roles.get(u["role"], 0) + 1

    colors = {
        "Admin": "#2563EB",
        "Manager": "#8B5CF6",
        "Editor": "#22C55E",
        "Viewer": "#F59E0B",
    }

    return [
        {"name": role, "value": count, "color": colors.get(role, "#CBD5E1")}
        for role, count in sorted(roles.items(), key=lambda x: -x[1])
    ]


def get_registration_trend():
    return [
        {"month": "Jan", "users": 8},
        {"month": "Feb", "users": 14},
        {"month": "Mar", "users": 11},
        {"month": "Apr", "users": 19},
        {"month": "May", "users": 24},
        {"month": "Jun", "users": 18},
        {"month": "Jul", "users": 32},
    ]
