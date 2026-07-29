from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app.renewals import schemas, services

router = APIRouter(prefix="/renewals", tags=["renewals"])


@router.get("/summary", response_model=schemas.RenewalsSummary)
def read_summary(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return services.get_summary(db)


@router.get("/activity-trend", response_model=schemas.ActivityTrendResponse)
def read_activity_trend(
    year: int = Query(default=None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    resolved_year = year or datetime.utcnow().year
    return services.get_activity_trend(db, resolved_year)


@router.get("/reminders", response_model=schemas.ReminderScheduleResponse)
def read_reminders(
    limit: int = Query(default=5, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return services.get_reminder_schedule(db, limit)


@router.get("/pipeline", response_model=schemas.RenewalPipelineResponse)
def read_pipeline(
    page: int = Query(default=1, ge=1),
    pageSize: int = Query(default=10, ge=1, le=100),
    status: str = Query(default=""),
    search: str = Query(default=""),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return services.get_pipeline(db, page=page, page_size=pageSize, status=status or None, search=search or None)


@router.post("", response_model=schemas.RenewalItem, status_code=201)
def create_renewal(payload: schemas.RenewalCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    renewal = services.create_renewal(db, payload)
    return services.to_item(renewal)


# IMPORTANT: these two static-path routes (/reminder-settings) must be
# registered BEFORE the dynamic /{renewal_id} routes below. FastAPI/Starlette
# matches routes in registration order, and since renewal_id is typed as
# UUID, a request to PATCH /renewals/reminder-settings would otherwise match
# the /{renewal_id} route first and fail UUID validation with a 422 instead
# of ever reaching this handler.

@router.get("/reminder-settings", response_model=schemas.ReminderSettingsResponse)
def read_reminder_settings(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    settings = services.get_or_create_reminder_settings(db)
    return schemas.ReminderSettingsResponse(thresholds=settings.thresholds)


@router.patch("/reminder-settings", response_model=schemas.ReminderSettingsResponse)
def update_reminder_settings(
    payload: schemas.ReminderSettingsUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    settings = services.update_reminder_settings(db, payload.thresholds)
    return schemas.ReminderSettingsResponse(thresholds=settings.thresholds)


@router.patch("/{renewal_id}", response_model=schemas.RenewalItem)
def update_renewal(
    renewal_id: UUID, payload: schemas.RenewalUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    try:
        renewal = services.update_renewal(db, renewal_id, payload)
    except services.RenewalNotFoundError:
        raise HTTPException(status_code=404, detail="Renewal not found")
    return services.to_item(renewal)


@router.post("/{renewal_id}/renew", response_model=schemas.RenewalItem)
def renew_contract(
    renewal_id: UUID, payload: schemas.RenewContractRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    try:
        renewal = services.renew_contract(db, renewal_id, payload)
    except services.RenewalNotFoundError:
        raise HTTPException(status_code=404, detail="Renewal not found")
    return services.to_item(renewal)


@router.delete("/{renewal_id}", status_code=204)
def delete_renewal(renewal_id: UUID, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    try:
        services.delete_renewal(db, renewal_id)
    except services.RenewalNotFoundError:
        raise HTTPException(status_code=404, detail="Renewal not found")
