from __future__ import annotations

import json
import uuid
from copy import deepcopy
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

from .config import DATA_FILE, DATA_DIR
from .schemas import ComplianceLevel, ContractStatus, ObligationStatus, RenewalStatus, Role


TABLES = [
    "users",
    "contracts",
    "contract_versions",
    "obligations",
    "renewals",
    "notifications",
    "reports",
    "audit_logs",
    "activities",
]


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def new_id() -> str:
    return str(uuid.uuid4())


def _json_default(value: Any) -> str:
    if isinstance(value, (date, datetime)):
        return value.isoformat()
    raise TypeError(f"Object of type {type(value).__name__} is not JSON serializable")


class JsonStore:
    def __init__(self, path: Path = DATA_FILE):
        self.path = path
        self.data = self._load()

    def _load(self) -> dict[str, list[dict[str, Any]]]:
        if not self.path.exists():
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            seed = seed_data()
            self.path.write_text(json.dumps(seed, indent=2, default=_json_default), encoding="utf-8")
            return seed

        with self.path.open("r", encoding="utf-8") as file:
            data = json.load(file)

        for table in TABLES:
            data.setdefault(table, [])
        return data

    def save(self) -> None:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(self.data, indent=2, default=_json_default), encoding="utf-8")

    def list(self, table: str) -> list[dict[str, Any]]:
        return deepcopy(self.data[table])

    def get(self, table: str, record_id: str) -> dict[str, Any] | None:
        record = next((item for item in self.data[table] if item["id"] == record_id), None)
        return deepcopy(record) if record else None

    def create(self, table: str, payload: dict[str, Any]) -> dict[str, Any]:
        record = {"id": new_id(), "created_at": now(), "updated_at": now(), **payload}
        self.data[table].append(record)
        self.save()
        return deepcopy(record)

    def update(self, table: str, record_id: str, payload: dict[str, Any]) -> dict[str, Any] | None:
        for record in self.data[table]:
            if record["id"] == record_id:
                clean_payload = {key: value for key, value in payload.items() if value is not None}
                record.update(clean_payload)
                record["updated_at"] = now()
                self.save()
                return deepcopy(record)
        return None

    def delete(self, table: str, record_id: str) -> bool:
        before = len(self.data[table])
        self.data[table] = [item for item in self.data[table] if item["id"] != record_id]
        deleted = len(self.data[table]) != before
        if deleted:
            self.save()
        return deleted

    def audit(
        self,
        action: str,
        entity_type: str,
        entity_id: str | None = None,
        actor_id: str | None = None,
        metadata: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        log = self.create(
            "audit_logs",
            {
                "actor_id": actor_id,
                "action": action,
                "entity_type": entity_type,
                "entity_id": entity_id,
                "metadata": metadata or {},
            },
        )
        self.create(
            "activities",
            {
                "actor_id": actor_id,
                "message": f"{action} {entity_type}",
                "entity_type": entity_type,
                "entity_id": entity_id,
            },
        )
        return log


def seed_data() -> dict[str, list[dict[str, Any]]]:
    timestamp = now()
    admin_id = new_id()
    contract_id = new_id()
    obligation_id = new_id()

    return {
        "users": [
            {
                "id": admin_id,
                "name": "ContractIQ Administrator",
                "email": "admin@contractiq.local",
                "password_hash": "pbkdf2_sha256$260000$demo$2/P5s5WuPQH+J22VZTW5ngFenbO5gDrVexfrwR2IB0I=",
                "role": Role.administrator.value,
                "department": "Legal Operations",
                "is_active": True,
                "created_at": timestamp,
                "updated_at": timestamp,
            }
        ],
        "contracts": [
            {
                "id": contract_id,
                "title": "Master Vendor Services Agreement",
                "category": "Vendor Contracts",
                "counterparty": "Northwind Procurement Ltd",
                "owner_id": admin_id,
                "department": "Procurement",
                "status": ContractStatus.active.value,
                "effective_date": "2026-01-01",
                "expiry_date": "2026-12-31",
                "value": 125000,
                "document_name": "northwind-msa.pdf",
                "tags": ["vendor", "renewal-watch"],
                "created_at": timestamp,
                "updated_at": timestamp,
            }
        ],
        "contract_versions": [
            {
                "id": new_id(),
                "contract_id": contract_id,
                "version": "1.0",
                "summary": "Initial executed agreement.",
                "document_name": "northwind-msa-v1.pdf",
                "created_at": timestamp,
                "updated_at": timestamp,
            }
        ],
        "obligations": [
            {
                "id": obligation_id,
                "contract_id": contract_id,
                "title": "Quarterly compliance certificate",
                "obligation_type": "Reporting Requirements",
                "responsible_user_id": admin_id,
                "due_date": "2026-09-30",
                "status": ObligationStatus.pending.value,
                "compliance_level": ComplianceLevel.pending.value,
                "progress": 35,
                "notes": "Awaiting department evidence pack.",
                "created_at": timestamp,
                "updated_at": timestamp,
            }
        ],
        "renewals": [
            {
                "id": new_id(),
                "contract_id": contract_id,
                "renewal_date": "2026-11-30",
                "reminder_days": 45,
                "status": RenewalStatus.upcoming.value,
                "approval_owner_id": admin_id,
                "notes": "Review pricing before renewal approval.",
                "created_at": timestamp,
                "updated_at": timestamp,
            }
        ],
        "notifications": [
            {
                "id": new_id(),
                "recipient_user_id": admin_id,
                "channel": "In-App",
                "title": "Upcoming renewal review",
                "message": "Northwind MSA renewal review opens in November 2026.",
                "related_type": "contract",
                "related_id": contract_id,
                "read": False,
                "created_at": timestamp,
                "updated_at": timestamp,
            }
        ],
        "reports": [],
        "audit_logs": [],
        "activities": [
            {
                "id": new_id(),
                "actor_id": admin_id,
                "message": "Seeded ContractIQ demo workspace",
                "entity_type": "system",
                "entity_id": None,
                "created_at": timestamp,
                "updated_at": timestamp,
            }
        ],
    }


store = JsonStore()
