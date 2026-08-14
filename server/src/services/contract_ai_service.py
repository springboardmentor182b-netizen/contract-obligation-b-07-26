"""OpenAI-backed assistance for ContractIQ contract intelligence."""

from __future__ import annotations

import json
from typing import Any

from fastapi import HTTPException, status

from ..config import OPENAI_API_KEY, OPENAI_MODEL


SUMMARY_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "summary": {"type": "string"},
        "key_terms": {"type": "array", "items": {"type": "string"}},
        "risk_flags": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["summary", "key_terms", "risk_flags"],
}

OBLIGATIONS_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "suggestions": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "title": {"type": "string"},
                    "obligation_type": {"type": "string"},
                    "due_date": {"type": "string"},
                    "priority": {"type": "string", "enum": ["Low", "Medium", "High"]},
                    "description": {"type": "string"},
                },
                "required": ["title", "obligation_type", "due_date", "priority", "description"],
            },
        },
    },
    "required": ["suggestions"],
}


def is_configured() -> bool:
    return bool(OPENAI_API_KEY)


def _generate_json(prompt: str, schema_name: str, schema: dict[str, Any]) -> dict[str, Any]:
    if not is_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI is not configured. Add OPENAI_API_KEY to server/.env and restart the API.",
        )
    try:
        from openai import OpenAI

        response = OpenAI(api_key=OPENAI_API_KEY).responses.create(
            model=OPENAI_MODEL,
            input=prompt,
            max_output_tokens=700,
            text={
                "format": {
                    "type": "json_schema",
                    "name": schema_name,
                    "strict": True,
                    "schema": schema,
                }
            },
        )
        return json.loads(response.output_text)
    except HTTPException:
        raise
    except ImportError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="OpenAI package is not installed. Run pip install -r requirements.txt.",
        ) from exc
    except (json.JSONDecodeError, ValueError) as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="AI returned an invalid structured response. Please try again.") from exc
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="The AI service is unavailable. Please try again.") from exc


def summarize_contract(payload: dict[str, Any]) -> dict[str, Any]:
    details = json.dumps(payload, default=str)
    return _generate_json(
        "You are ContractIQ's contract analyst. Summarize the supplied contract in plain language. "
        "List key terms and practical review flags. Do not give legal advice. "
        f"Contract data: {details}",
        "contract_summary",
        SUMMARY_SCHEMA,
    )


def generate_obligations(contract: dict[str, Any]) -> list[dict[str, Any]]:
    details = json.dumps(contract, default=str)
    result = _generate_json(
        "You are ContractIQ's obligations analyst. Generate 3 to 5 practical, review-ready obligation drafts "
        "from this contract. Use ISO YYYY-MM-DD due dates. Use a date before the end_date for renewal work when an "
        "end_date exists. Do not invent legal requirements; phrase uncertain items as review tasks. "
        f"Contract data: {details}",
        "obligation_suggestions",
        OBLIGATIONS_SCHEMA,
    )
    return result["suggestions"]
