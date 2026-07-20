from app.schemas.obligation import (
    ObligationCreate,
    ObligationResponse,
    ObligationUpdate,
)


class ObligationService:
    def __init__(self):
        self._items = [
            {
                "id": "OBL-001",
                "obligation": "Quarterly Performance Report",
                "contract": "Enterprise SaaS",
                "priority": "High",
                "status": "Pending",
                "due_date": "2026-07-15",
                "owner": "P. Nair",
                "progress": 60,
            },
            {
                "id": "OBL-002",
                "obligation": "Security Audit Submission",
                "contract": "Data Processing",
                "priority": "High",
                "status": "Overdue",
                "due_date": "2026-06-30",
                "owner": "S. Reinholt",
                "progress": 25,
            },
            {
                "id": "OBL-003",
                "obligation": "Insurance Certificate Renewal",
                "contract": "Vendor Contract",
                "priority": "Medium",
                "status": "Completed",
                "due_date": "2026-07-01",
                "owner": "D. Okafor",
                "progress": 100,
            },
            {
                "id": "OBL-004",
                "obligation": "Monthly Usage Report",
                "contract": "Software License",
                "priority": "Low",
                "status": "Pending",
                "due_date": "2026-07-31",
                "owner": "M. Delgado",
                "progress": 40,
            },
            {
                "id": "OBL-005",
                "obligation": "SLA Compliance Review",
                "contract": "IT Infrastructure",
                "priority": "High",
                "status": "Pending",
                "due_date": "2026-08-05",
                "owner": "J. Whitfield",
                "progress": 15,
            },
            {
                "id": "OBL-006",
                "obligation": "Marketing Budget Reconciliation",
                "contract": "Marketing Pship",
                "priority": "Medium",
                "status": "Completed",
                "due_date": "2026-06-28",
                "owner": "T. Essien",
                "progress": 100,
            },
        ]

    def list_all(self):
        return [ObligationResponse(**item) for item in self._items]

    def get_by_id(self, obligation_id):
        item = next(
            (item for item in self._items if item["id"] == obligation_id),
            None,
        )

        if item is None:
            return None

        return ObligationResponse(**item)

    def create(self, payload: ObligationCreate):
        numeric_ids = [
            int(item["id"].split("-")[1])
            for item in self._items
        ]

        next_number = max(numeric_ids, default=0) + 1

        item = {
            "id": f"OBL-{next_number:03d}",
            **payload.model_dump(mode="json"),
        }

        self._items.append(item)
        return ObligationResponse(**item)

    def update(
        self,
        obligation_id: str,
        payload: ObligationUpdate,
    ):
        for index, item in enumerate(self._items):
            if item["id"] == obligation_id:
                updated_item = {
                    "id": obligation_id,
                    **payload.model_dump(mode="json"),
                }

                self._items[index] = updated_item
                return ObligationResponse(**updated_item)

        return None

    def delete(self, obligation_id):
        original_length = len(self._items)

        self._items = [
            item
            for item in self._items
            if item["id"] != obligation_id
        ]

        return len(self._items) < original_length


obligation_service = ObligationService()
