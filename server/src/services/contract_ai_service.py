"""OpenAI-backed assistance for ContractIQ contract intelligence."""

from __future__ import annotations

import json
import logging
from typing import Any

from fastapi import HTTPException, status

from ..config import OPENAI_API_KEY, OPENAI_MODEL


logger = logging.getLogger(__name__)


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
        from openai import (
            APIConnectionError,
            APIStatusError,
            AuthenticationError,
            NotFoundError,
            OpenAI,
            PermissionDeniedError,
            RateLimitError,
        )

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
    except AuthenticationError as exc:
        logger.warning("OpenAI authentication failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="OpenAI rejected the API key. Update OPENAI_API_KEY in server/.env and restart the API.",
        ) from exc
    except PermissionDeniedError as exc:
        logger.warning("OpenAI permission was denied: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="This OpenAI project is not permitted to use the configured model. Check the API project and model access.",
        ) from exc
    except NotFoundError as exc:
        logger.warning("Configured OpenAI model was not found: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"The configured OpenAI model '{OPENAI_MODEL}' is unavailable. Choose a model available to this API project.",
        ) from exc
    except RateLimitError as exc:
        logger.warning("OpenAI quota or rate limit reached: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="OpenAI API quota or rate limit was reached. Add API billing/credits or wait and try again.",
        ) from exc
    except APIConnectionError as exc:
        logger.warning("Could not connect to OpenAI: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="The server cannot reach OpenAI. Check that the EC2 instance has outbound internet access.",
        ) from exc
    except APIStatusError as exc:
        logger.warning("OpenAI returned status %s: %s", exc.status_code, exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="OpenAI rejected the request. Check the API key, billing, model access, and the server logs.",
        ) from exc
    except Exception as exc:
        logger.exception("Unexpected OpenAI integration error")
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
