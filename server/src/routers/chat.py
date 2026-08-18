"""
AI Chat Assistant — answers natural-language questions about contracts,
obligations, and renewals by grounding an LLM call in real data pulled
from PostgreSQL (same get_connection()/dict_row pattern used throughout
main.py — no new query style introduced).

Requires GROQ_API_KEY in server/.env (free, no credit card — get one at
console.groq.com). If it's missing, the endpoint returns a clear 500
instead of failing silently or crashing the whole app at import time.
"""
from __future__ import annotations

import os
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from psycopg.rows import dict_row
from pydantic import BaseModel

from ..auth.security import get_current_user
from ..database.users import get_connection

router = APIRouter(prefix="/api/chat", tags=["chat"])

# Groq retired llama-3.3-70b-versatile for free/developer accounts on
# 2026-08-16. Keep the current replacement configurable for each deployment.
DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b"


class ChatMessage(BaseModel):
    role: str  # 'user' | 'assistant'
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str


def gather_context(user_id: str) -> str:
    """
    Pulls a compact snapshot of contracts/obligations/renewals so the model
    answers from real data instead of guessing. Kept intentionally small
    (recent + upcoming records only) to stay well under context limits —
    if your dataset grows large, this is the place to add a search/filter
    step instead of dumping everything.
    """
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("""
                SELECT contract_id::text AS id, title, contract_number, category,
                       description AS counterparty, status, start_date, end_date
                FROM contracts
                ORDER BY created_at DESC NULLS LAST
                LIMIT 50
            """)
            contracts = cursor.fetchall()

            cursor.execute("""
                SELECT o.obligation_id::text AS id, o.title, o.obligation_type,
                       o.due_date, o.status, o.compliance_level,
                       COALESCE(c.title, c.contract_number) AS contract_name
                FROM obligations AS o
                LEFT JOIN contracts AS c ON c.contract_id = o.contract_id
                ORDER BY o.due_date ASC NULLS LAST
                LIMIT 50
            """)
            obligations = cursor.fetchall()

            cursor.execute("""
                SELECT r.renewal_id::text AS id, r.renewal_date, r.status,
                       COALESCE(c.title, c.contract_number) AS contract_name
                FROM renewals AS r
                LEFT JOIN contracts AS c ON c.contract_id = r.contract_id
                ORDER BY r.renewal_date ASC NULLS LAST
                LIMIT 50
            """)
            renewals = cursor.fetchall()

    def format_rows(rows: list[dict[str, Any]]) -> str:
        if not rows:
            return "(none)"
        return "\n".join(
            "- " + ", ".join(f"{key}: {value}" for key, value in row.items() if value is not None)
            for row in rows
        )

    return (
        f"CONTRACTS:\n{format_rows(contracts)}\n\n"
        f"OBLIGATIONS:\n{format_rows(obligations)}\n\n"
        f"RENEWALS:\n{format_rows(renewals)}"
    )


@router.post("/ask", response_model=ChatResponse)
def ask(payload: ChatRequest, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, str]:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GROQ_API_KEY is not configured. Add it to server/.env (get a free key at console.groq.com).",
        )

    try:
        from groq import Groq
    except ImportError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="The 'groq' package is not installed. Run: pip install groq",
        )

    context = gather_context(current_user["id"])

    system_prompt = (
        "You are the ContractIQ AI assistant. Answer questions about the "
        "organization's contracts, obligations, and renewals using ONLY the "
        "data provided below. If the answer isn't in the data, say so clearly "
        "rather than guessing. Be concise — a few sentences or a short list, "
        "not long paragraphs.\n\n" + context
    )

    # Groq's API follows the OpenAI chat-completions message format: the
    # system prompt is just the first message in the array, not a separate
    # parameter (unlike Anthropic's SDK).
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend({"role": m.role, "content": m.content} for m in payload.history)
    messages.append({"role": "user", "content": payload.message})

    client = Groq(api_key=api_key)
    model = os.getenv("GROQ_MODEL", DEFAULT_GROQ_MODEL).strip() or DEFAULT_GROQ_MODEL

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=1024,
        )
    except Exception as error:  # noqa: BLE001 — surface any provider error as a clean 502
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=f"AI request failed: {error}")

    reply_text = response.choices[0].message.content
    return {"reply": reply_text}
