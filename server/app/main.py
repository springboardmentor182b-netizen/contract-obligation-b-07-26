from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from .database import engine, get_db
from . import crud, schemas

app = FastAPI()

# Allow React frontend to access FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "FastAPI is running successfully!"}


@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"message": "Database connected successfully!"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/notifications", response_model=list[schemas.Notification])
def get_notifications(db: Session = Depends(get_db)):
    return crud.get_notifications(db)


@app.get("/notification-stats", response_model=schemas.NotificationStats)
def get_notification_stats(db: Session = Depends(get_db)):
    return crud.get_notification_stats(db)

@app.get("/notification-activity", response_model=list[schemas.NotificationActivity])
def get_notification_activity(db: Session = Depends(get_db)):
    return crud.get_notification_activity(db)


@app.get("/notification-preferences", response_model=list[schemas.NotificationPreference])
def get_notification_preferences(db: Session = Depends(get_db)):
    return crud.get_notification_preferences(db)